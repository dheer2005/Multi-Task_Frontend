import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private apiurl = `https://multitask.bsite.net/api/InternetSpeed/`
  constructor(private http: HttpClient){ }

  measureDownload(): Observable<string> {
    const start = performance.now();
    return this.http.get(`${this.apiurl}download`, { responseType: 'blob' }).pipe(
      map(blob => {
        const duration = (performance.now() - start) / 1000;
        const bits = blob.size * 8;
        return (bits / duration / 1024 / 1024).toFixed(2); 
      })
    );
  }

  measureUpload(): Observable<string> {
    const data = new Blob([new ArrayBuffer(5 * 1024 * 1024)]); 
    const start = performance.now();
    return this.http.post(`${this.apiurl}upload`, data).pipe(
      map(() => {
        const duration = (performance.now() - start) / 1000;
        const bits = data.size * 8;
        return (bits / duration / 1024 / 1024).toFixed(2); 
      })
    );
  }

}
