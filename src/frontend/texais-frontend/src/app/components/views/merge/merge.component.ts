import { Component, OnInit } from '@angular/core';
import { FrameLogoComponent } from "../../frame-logo/frame-logo.component";
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { PdfServiceService } from '../../../services/pdf-service.service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-merge',
  imports: [FrameLogoComponent, FileUploadModule, CommonModule, HttpClientModule],
  templateUrl: './merge.component.html',
  styleUrl: './merge.component.scss'
})
export class MergeComponent implements OnInit{
  constructor(private pdfService: PdfServiceService) { }

  uploadedFiles?: any[];

  ngOnInit(): void {
  }

  onUpload(event : any) : void {
    console.log('files uploaded', event);
  }

  onSelect(event : any) : void {
    console.log('files uploaded', event);
    this.uploadedFiles = event.files;
    console.log('uploaded files', this.uploadedFiles); 

  }

  onRemove(event : any) : void {
    console.log('files uploaded', event);
    this.uploadedFiles = event.file;
    console.log('file removed', event);
    console.log('uploaded files', this.uploadedFiles); 
  }


}
