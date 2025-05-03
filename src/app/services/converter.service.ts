import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

interface ConvertApiResponse {
  Files: { FileName: string; Url: string; }[];
}



@Injectable({
  providedIn: 'root'
})
export class ConverterService {
  private readonly API_SECRET = 'secret_lFzuK0MjdPSnDtny';
  private readonly PdfToDocENDPOINT = `https://v2.convertapi.com/convert/pdf/to/docx?Secret=${this.API_SECRET}`;

  private readonly DocToPdfENDPOINT = `https://v2.convertapi.com/convert/docx/to/pdf?Secret=${this.API_SECRET}`

  constructor(private http: HttpClient) { }

  convertPdfToDocx(file: File): Observable<ConvertApiResponse> {
    const form = new FormData();
    form.append('File', file);
    form.append('StoreFile', 'true');
    return this.http.post<ConvertApiResponse>(this.PdfToDocENDPOINT, form);
  }

  convertDocxToPdf(file: File): Observable<ConvertApiResponse> {
    const form = new FormData();
    form.append('File', file);
    form.append('StoreFile', 'true');
    return this.http.post<ConvertApiResponse>(this.DocToPdfENDPOINT, form);
  }


}
