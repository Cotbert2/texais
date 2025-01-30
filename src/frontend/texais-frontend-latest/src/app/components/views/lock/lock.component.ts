import { Component, CSP_NONCE, EventEmitter, OnInit, Output } from '@angular/core';
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
import { ProgressBarModule } from 'primeng/progressbar';

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
    FormsModule,
    ProgressBarModule
  ],
  templateUrl: './lock.component.html',
  styleUrl: './lock.component.scss'
})

export class LockComponent implements OnInit {
  ngOnInit(): void {
    this.startProgress();

  }
  constructor(
    private pdfService: PdfServiceService,
    private appComponent: AppComponent
  ) { }

    @Output() showWarning = new EventEmitter<boolean>();
  


  uploadedFiles: any[] = [];
  currentFiles: any[] = [];
  progress: number = 0;


  onUpload(event: any): void {
    console.log('upload files', event);
    this.showWarningEvent();
  }

  onSelect(event: any): void {
    console.log('upload files', event);
    this.isDoingSecureAction = false;
    this.currentFiles = [...this.currentFiles, ...event.files];
    console.log('current files', this.currentFiles);
    this.showWarningEvent();

  }

  onRemove(event: any): void {
    console.log('upload delete files', event);
    this.isDoingSecureAction = false;
    this.currentFiles = this.currentFiles.filter(file => file !== event.file);
    console.log('current files', this.currentFiles);
    this.showWarningEvent();
  }

  fileType: string = 'password';
  iconVisiblity: string = 'pi pi-eye';
  actionLabel: string = "Let's put a password on it!";
  isUnlock: boolean = false;
  isFileAvailableToDownload: boolean = false;
  fileToDownload: any;
  isDoingSecureAction: boolean = false;
  fileAvailableToDownload: boolean = false;
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

    this.isDoingSecureAction = true;

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
          this.isDoingSecureAction = false;
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
          this.isDoingSecureAction = false;
          console.error('There was an error!', error);
          this.appComponent.newMessage('error', 'Error', 'There was an error!');
        }
      })
    }
  }

  downloadFile(): void {
    const link = document.createElement('a');
    link.href = this.fileToDownload;
    link.download = this.currentFiles[0].name;
    link.click();
  }

  startProgress(): void {
    setInterval(() => {
      if (this.isFileAvailableToDownload) this.progress = 100;
      else if (this.progress < 70) {
        this.progress += 1;
      }
    }, 100);
  }

  showWarningEvent(): void {
    if(this.currentFiles.length != 0) this.showWarning.emit(true);
    else this.showWarning.emit(false);
  }
}
