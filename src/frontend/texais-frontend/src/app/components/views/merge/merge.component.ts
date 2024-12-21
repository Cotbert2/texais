import { Component, CSP_NONCE, OnInit } from '@angular/core';
import { FrameLogoComponent } from "../../frame-logo/frame-logo.component";
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { PdfServiceService } from '../../../services/pdf-service.service';
import { HttpClientModule } from '@angular/common/http';
import { Button, ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppComponent } from '../../../app.component';
import { ProgressBar } from 'primeng/progressbar';

import { ToastServiceService } from '../../../services/toast-service.service';

@Component({
  selector: 'app-merge',
  imports: [FrameLogoComponent,
    FileUploadModule,
    CommonModule,
    HttpClientModule,
    ButtonModule,
    TableModule,
    ProgressBar
  ],
  templateUrl: './merge.component.html',
  styleUrl: './merge.component.scss'
})
export class MergeComponent implements OnInit{
  constructor(
    private pdfService: PdfServiceService,
    private toastService: ToastServiceService,
    private appComponent: AppComponent
  ) { }

  uploadedFiles: any[] = [];
  currentFiles : any[] = [];
  cols : any[] = [];
  products : any[] = [];
  isMerging : boolean = false;
  progress : number = 0;
  isFileAvailableToDownload : boolean = false;

  ngOnInit(): void {

    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'size', header: 'Size' },
      { field: 'type', header: 'Type' }
    ];
    this.startProgress();

  }

  startProgress() : void {
    setInterval(() => {
      if (this.progress < 70) {
        this.progress += 1;
      }
    }, 100);
  }

  onUpload(event : any) : void {
    console.log('upload files', event);
  }

  onSelect(event : any) : void {
    console.log('upload files', event);
    this.currentFiles = event.currentFiles;
    console.log('current files', this.currentFiles);
    this.uploadProducts();

  }

  onRemove(event : any) : void {
    console.log('upload delete files', event);
    this.currentFiles = this.currentFiles.filter(file => file.name !== event.file.name);
    console.log('current files', this.currentFiles);
    this.uploadProducts();
  }


  mergeFiles() : void {
    console.log('merge files');
    console.log('current files', this.products);
    console.log('sould merge files');
    if (this.currentFiles.length < 2) {
      this.appComponent.newMessage('warn', 'Cannot Merge', 'You need to select at least 2 files to merge');
    }
  }

  uploadProducts() : void {
    this.products = this.currentFiles.map((currentFile : any ) => {
      return {
        name: currentFile.name,
        size: currentFile.size,
        type: currentFile.type
      };
    });
  }


}
