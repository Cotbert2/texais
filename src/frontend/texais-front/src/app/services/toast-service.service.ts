import { Injectable } from '@angular/core';
import { AppComponent } from '../app.component';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})

export class ToastServiceService {

  constructor(

  ) { }

  newMessage(kind : string, sumary : string, datail : string) : void {
  }
}
