import { Component } from '@angular/core';
import { FrameLogoComponent } from "../../frame-logo/frame-logo.component";
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { PdfServiceService } from '../../../services/pdf-service.service';
import { ButtonModule } from 'primeng/button';
import { TableModule } from 'primeng/table';
import { AppComponent } from '../../../app.component';
import { ProgressBar } from 'primeng/progressbar';
import { HttpClient } from '@angular/common/http';
import { ToastServiceService } from '../../../services/toast-service.service';

@Component({
  standalone: true,
  selector: 'app-watermark',
  imports: [FrameLogoComponent,
    FileUploadModule,
    CommonModule,
    ButtonModule,
    TableModule,
    ProgressBar
  ],
  templateUrl: './watermark.component.html',
  styleUrl: './watermark.component.scss'
})
export class WatermarkComponent {
  constructor(
    private pdfService: PdfServiceService,
    private appComponent: AppComponent,
  ) { }

  uploadedFiles: any[] = [];
  currentFile: any;
  currentImage: any;
  cols: any[] = [];
  products: any[] = [];
  isWatermarking: boolean = false;
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

  onUploadFile(event: any): void {
    console.log('upload files', event);
  }

  onSelectFile(event: any): void {
    console.log('upload file', event);
    this.currentFile = event.currentFiles[0];
    console.log('current file', this.currentFile);
  }

  onRemoveFile(event: any): void {
    console.log('upload delete file', event);
    this.currentFile = null;
    console.log('current file', this.currentFile);
  }

  onUploadImage(event: any): void {
    console.log('upload files', event);
  }

  onSelectImage(event: any): void {
    console.log('upload files', event);
    this.currentImage = event.currentFiles[0];
    console.log('current files', this.currentImage);
  }

  onRemoveImage(event: any): void {
    console.log('upload delete files', event);
    this.currentImage = null;
    console.log('current files', this.currentImage);
  }

  watermarkFile(): void {

    //validate for image and pdf
    if (!this.currentFile) {
      this.appComponent.newMessage('warn', 'Cannot Watermark', 'You need to select a PDF file');
      return;
    }

    if (!this.currentImage) {
      this.appComponent.newMessage('warn', 'Cannot Watermark', 'You need to select an Image file');
      return;
    }


    this.isWatermarking = true;
  
    const formData = new FormData();
  
    if (this.currentFile) {
      const blob = new Blob([this.currentFile], { type: 'application/pdf' });
      formData.append('pdf', blob, this.currentFile.name);
    } else {
      console.error('No file selected');
    }

    if (this.currentImage) {
      const blob = new Blob([this.currentImage], { type: 'image/png' });
      formData.append('watermark', blob, this.currentImage.name);
    } else {
      console.error('No Image selected');
    } 
  
    formData.append('output', 'watermarked.pdf');
  
    this.pdfService.watermarkPDF(formData).subscribe({
      next: (event) => {
        console.log('Evento:', event);
        if (event.type === 4) {
          this.isFileAvailableToDownload = true;
          const blob = new Blob([event.body], { type: 'application/pdf' });
          this.fileToDownload = window.URL.createObjectURL(blob);
          this.appComponent.newMessage('success', 'Success', 'PDFs watermarked successfully');
        }
      },
      error: (err) => {
        console.error('Error adding watermark to PDFs:', err);
      }
    });
  }   

  uploadProducts(): void {
    this.isWatermarking = false;
  }

  downloadFile(): void {
    const link = document.createElement('a');
    link.href = this.fileToDownload;
    link.download = 'watermarked.pdf';
    link.click();
  }


}
