import { Component, CSP_NONCE, EventEmitter, OnInit, Output } from '@angular/core';
import { FrameLogoComponent } from "../../frame-logo/frame-logo.component";
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { PdfServiceService } from '../../../services/pdf-service.service';
import { HttpClientXsrfModule } from '@angular/common/http';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppComponent } from '../../../app.component';
import { ProgressBar } from 'primeng/progressbar';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ToastServiceService } from '../../../services/toast-service.service';

import { IMergeRequest } from '../../../shared/interfaces';

@Component({
  standalone: true,
  selector: 'app-merge',
  imports: [FrameLogoComponent,
    FileUploadModule,
    CommonModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    ProgressBar
  ],
  providers: [],
  templateUrl: './merge.component.html',
  styleUrl: './merge.component.scss'
})
export class MergeComponent implements OnInit {
  constructor(
    private pdfService: PdfServiceService,
    private toastService: ToastServiceService,
    private appComponent: AppComponent,
    private http: HttpClient
  ) { }

  @Output() showWarning = new EventEmitter<boolean>();

  uploadedFiles: any[] = [];
  currentFiles: any[] = [];
  cols: any[] = [];
  products: any[] = [];
  isMerging: boolean = false;
  progress: number = 0;
  isFileAvailableToDownload: boolean = false;
  fileToDownload: any;

  ngOnInit(): void {

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ];
    this.startProgress();

  }

  startProgress(): void {
    setInterval(() => {
      if (this.isFileAvailableToDownload) this.progress = 100;
      else if (this.progress < 70) {
        this.progress += 1;
      }
    }, 100);
  }

  onUpload(event: any): void {
    console.log('upload files', event);
    this.showWarningEvent();
  }

  onSelect(event: any): void {
    console.log('upload files', event);
    this.currentFiles = [...this.currentFiles, ...event.files];
    console.log('current files', this.currentFiles);
    this.uploadProducts();
    this.showWarningEvent();
  }

  onRemove(event: any): void {
    console.log('upload delete files', event);
    //this.currentFiles = this.currentFiles.filter(file => file.name !== event.file.name);
    this.currentFiles = this.currentFiles.filter(file => file !== event.file);
    console.log('current files', this.currentFiles);
    this.uploadProducts();
    this.showWarningEvent();
  }


  mergeFiles(): void {
    if (this.currentFiles.length < 2) {
      this.appComponent.newMessage('warn', 'Cannot Merge', 'You need to select at least 2 files to merge');
      return;
    }

    this.isMerging = true;

    console.log('current files:', this.currentFiles);
    console.log('products:', this.products);


    const formData = new FormData();

    for (let file of this.currentFiles) formData.append('pdf', file, file.name);

    formData.append('output', 'merged');

    console.log('formData:', formData);

    this.pdfService.mergePdf(formData).subscribe({
      next: (event) => {
        console.log('Evento:', event);
        if (event.type === 4) {
          this.isFileAvailableToDownload = true;
          const blob = new Blob([event.body], { type: 'application/pdf' });
          this.fileToDownload = window.URL.createObjectURL(blob);
          this.appComponent.newMessage('success', 'Success', 'PDFs merged successfully');
        }
      },
      error: (err) => {
        console.error('Error al unir los PDFs:', err);

      }
    },);
  }

  uploadProducts(): void {
    this.isMerging = false;
    this.products = this.currentFiles.map((currentFile: any) => {
      return {
        name: currentFile.name,
        size: currentFile.size,
        type: currentFile.type
      };
    });
  }

  downloadFile(): void {
    const link = document.createElement('a');
    link.href = this.fileToDownload;
    link.download = 'merged.pdf';
    link.click();
  }

  showWarningEvent(): void {
    if(this.currentFiles.length != 0) this.showWarning.emit(true);
    else this.showWarning.emit(false);
  }


}
