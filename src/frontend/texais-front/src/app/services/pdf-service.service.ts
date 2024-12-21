import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class PdfServiceService {

  constructor(
    private http: HttpClient
  ) { }

  mergePdf(files : any[]) : void {
    console.log('Merging pdf files');
  }

}
