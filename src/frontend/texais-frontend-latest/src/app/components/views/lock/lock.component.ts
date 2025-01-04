import { Component, CSP_NONCE, OnInit } from '@angular/core';
import { FrameLogoComponent } from '../../frame-logo/frame-logo.component';
import { InputSwitchModule } from 'primeng/inputswitch';
import { FileUploadModule } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { PdfServiceService } from '../../../services/pdf-service.service';
import { AppComponent } from '../../../app.component';


@Component({
  standalone: true,
  selector: 'app-lock',
  imports: [FrameLogoComponent,
    InputSwitchModule,
    FileUploadModule,
    CommonModule,
    FloatLabelModule,
    InputTextModule,
    ButtonModule,
    FormsModule
  ],
  templateUrl: './lock.component.html',
  styleUrl: './lock.component.scss'
})

export class LockComponent implements OnInit {
  ngOnInit(): void {

  }
  constructor(
    private pdfService: PdfServiceService,
    private appComponent: AppComponent
  ) { }


  uploadedFiles: any[] = [];
  currentFiles: any[] = [];


  onUpload(event: any): void {
    console.log('upload files', event);
  }

  onSelect(event: any): void {
    console.log('upload files', event);
    this.currentFiles = [...this.currentFiles, ...event.files];
    console.log('current files', this.currentFiles);

  }

  onRemove(event: any): void {
    console.log('upload delete files', event);

    this.currentFiles = this.currentFiles.filter(file => file !== event.file);
    console.log('current files', this.currentFiles);
  }

  fileType: string = 'password';
  iconVisiblity: string = 'pi pi-eye';
  actionLabel: string = "Let's put a password on it!";
  isUnlock: boolean = false;
  isFileAvailableToDownload: boolean = false;
  fileToDownload: any;
  isDoingSecureAction: boolean = false;
  password: string = '';

  changePasswordVisibility(): void {
    console.log('chaneging visiblity');
    this.fileType = this.fileType === 'password' ? 'text' : 'password';
    this.iconVisiblity = this.iconVisiblity === 'pi pi-eye' ? 'pi pi-eye-slash' : 'pi pi-eye';
  }

  securityAction(): void {

    if (this.currentFiles.length == 0) {
      this.appComponent.newMessage('warn', 'Warn', 'Please upload a file first');
      return;
    }

    if (this.password === '') {
      this.appComponent.newMessage('warn', 'Warn', 'Please enter a password');
      return;
    }

    const formData = new FormData();
    console.log('file to send', this.currentFiles[0]);
    formData.append('pdf', this.currentFiles[0], this.currentFiles[0].name);
    formData.append('password', this.password);
    console.log('should unlock');

    if (this.isUnlock) {
      this.pdfService.unblockPDF(formData).subscribe({
        next: event => {
          if (event.type === 4) {
            this.isFileAvailableToDownload = true;
            const blob = new Blob([event.body], { type: 'application/pdf' });
            this.fileToDownload = window.URL.createObjectURL(blob);
            this.appComponent.newMessage('success', 'Success', 'PDF set a password successfully');
          }
        },
        error: error => {
          console.error('There was an error!', error);
          this.appComponent.newMessage('error', 'Error', 'There was an error!');
        }
      })
    } else {

      this.pdfService.blockPDF(formData).subscribe({
        next: event => {

          if (event.type === 4) {
            this.isFileAvailableToDownload = true;
            const blob = new Blob([event.body], { type: 'application/pdf' });
            this.fileToDownload = window.URL.createObjectURL(blob);
            this.appComponent.newMessage('success', 'Success', 'PDFs merged successfully');
          }
        },
        error: error => {
          console.error('There was an error!', error);
          this.appComponent.newMessage('error', 'Error', 'There was an error!');
        }
      })
    }
  }

}
