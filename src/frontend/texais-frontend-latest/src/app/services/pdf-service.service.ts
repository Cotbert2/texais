import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { Routes } from './routes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor(
    private http: HttpClient,
    private http2: HttpClientModule
  ) { }

  mergePdf(files : any) : Observable<any> {
    console.log('merge pdf service');
    return this.http.post(Routes.API_END_POINT + Routes.MERGE, files, 
      //headers for the request because use files
      {
        observe: 'events',
        responseType: 'blob',
      }
    );
  }

}
