import { Component, EventEmitter, Output } from '@angular/core';
import { FrameLogoComponent } from "../../frame-logo/frame-logo.component";
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { PdfServiceService } from '../../../services/pdf-service.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppComponent } from '../../../app.component';
import { ProgressBar } from 'primeng/progressbar';
import { CardModule } from 'primeng/card';
import { InputNumberModule } from 'primeng/inputnumber';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-enumerate',
  imports: [FrameLogoComponent,
    FormsModule,
    FileUploadModule,
    CommonModule,
    ButtonModule,
    TableModule,
    ProgressBar,
    CardModule,
    InputNumberModule
  ],
  templateUrl: './enumerate.component.html',
  styleUrl: './enumerate.component.scss'
})
export class EnumerateComponent {

  constructor(
    private pdfService: PdfServiceService,
    private appComponent: AppComponent,
  ) { }

  uploadedFiles: any[] = [];
  currentFile: any;
  currentImage: any;
  cols: any[] = [];
  products: any[] = [];
  isEnumerating: boolean = false;
  progress: number = 0;
  isFileAvailableToDownload: boolean = false;
  fileToDownload: any;
  startPage: number = 1;
  numberToStart: number = 1;

    @Output() showWarning = new EventEmitter<boolean>();
  

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

  onUploadFile(event: any): void {
    console.log('upload files', event);
    this.showWarningEvent();
  }

  onSelectFile(event: any): void {
    console.log('upload file', event);
    this.currentFile = event.currentFiles[0];
    console.log('current file', this.currentFile);
    this.showWarningEvent();
  }

  onRemoveFile(event: any): void {
    console.log('upload delete file', event);
    this.currentFile = null;
    console.log('current file', this.currentFile);
    this.showWarningEvent();
  }

  enumerateFile(): void {

    //validate if the file is selected

    if (!this.currentFile) {
      this.appComponent.newMessage('warn', 'Warn', 'No file selected');
      return;
    }



    this.isEnumerating = true;
  
    const formData = new FormData();
  
    if (this.currentFile) {
      const blob = new Blob([this.currentFile], { type: 'application/pdf' });
      formData.append('pdf', blob, this.currentFile.name);
    } else {
      console.error('No file selected');
    }

    try {
      if (this.startPage) {
        formData.append('start', this.startPage.toString());
      }
      if (this.numberToStart) {
        formData.append('number', this.numberToStart.toString());
      }
    } catch (err) {
      console.error('Error adding start page and number to start to form data:', err);
    }

    formData.append('output', 'enumerated.pdf');
  
    this.pdfService.enumeratePDF(formData).subscribe({
      next: (event) => {
        console.log('Evento:', event);
        if (event.type === 4) {
          this.isFileAvailableToDownload = true;
          const blob = new Blob([event.body], { type: 'application/pdf' });
          this.fileToDownload = window.URL.createObjectURL(blob);
          this.appComponent.newMessage('success', 'Success', 'PDFs enumerated successfully');
        }
      },
      error: (err) => {
        console.error('Error enumerating PDFs:', err);
      }
    });
  }   

  uploadProducts(): void {
    this.isEnumerating = false;
  }

  downloadFile(): void {
    const link = document.createElement('a');
    link.href = this.fileToDownload;
    link.download = 'enumerated.pdf';
    link.click();
  }


  showWarningEvent(): void {
    if(this.currentFile.length != 0) this.showWarning.emit(true);
    else this.showWarning.emit(false);
  }
}
