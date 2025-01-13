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
      {
        observe: 'events',
        responseType: 'blob',
      }
    );
  }

  blockPDF(files : any) : Observable<any> {
    console.log('merge pdf service');
    return this.http.post(Routes.API_END_POINT + Routes.BLOCK, files, 
      {
        observe: 'events',
        responseType: 'blob',
      }
    );
  }

  unblockPDF(files : any) : Observable<any> {
    console.log('merge pdf service');
    return this.http.post(Routes.API_END_POINT + Routes.UNBLOCK, files, 
      {
        observe: 'events',
        responseType: 'blob',
      }
    );
  }

  watermarkPDF(files : any) : Observable<any> {
    console.log('watermark pdf service');
    return this.http.post(Routes.API_END_POINT + Routes.WATERMARK, files, 
      {
        observe: 'events',
        responseType: 'blob',
      }
    );
  }

  enumeratePDF(files : any) : Observable<any> {
    console.log('enumerate pdf service');
    return this.http.post(Routes.API_END_POINT + Routes.ENUMERATE, files, 
      {
        observe: 'events',
        responseType: 'blob',
      }
    );
  }
}
