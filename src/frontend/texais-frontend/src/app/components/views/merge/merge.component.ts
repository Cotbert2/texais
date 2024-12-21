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

  uploadedFiles: any[] = [];
  currentFiles : any[] = [];

  ngOnInit(): void {
  }

  onUpload(event : any) : void {
    console.log('upload files', event);
  }

  onSelect(event : any) : void {
    console.log('upload files', event);
    this.currentFiles = event.currentFiles;
    console.log('current files', this.currentFiles);

  }

  onRemove(event : any) : void {
    console.log('upload delete files', event);
    this.currentFiles = this.currentFiles.filter(file => file.name !== event.file.name);
    console.log('current files', this.currentFiles);
  }


}
