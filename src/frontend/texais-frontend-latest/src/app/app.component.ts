import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MainComponent } from "./main/main.component";
import { FooterComponent } from "./components/footer/footer.component";
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { PdfServiceService } from './services/pdf-service.service';

@Component({
  standalone: true,
  selector: 'app-root',
  imports: [
    HttpClientModule,
    RouterOutlet,
    NavbarComponent,
    MainComponent,
    FooterComponent,
    ToastModule,
    


],
providers: [MessageService, PdfServiceService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {

  ngOnInit(): void {
    console.log('app component');
  }

  constructor(
    private messageService: MessageService,
    private http: HttpClient,
  ){}


  title = 'texais-frontend';
  activeItem : string = 'home';


  changeActiveTabService(service : string ) : void {
    this.activeItem = service;
  }

  newMessage(kind : string, sumary : string, datail : string) : void {
    this.messageService.add({severity: kind, summary: sumary, detail: datail});
  }
}
