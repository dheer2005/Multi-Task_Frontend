import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {
  private apiurl = ``
  constructor(private http: HttpClient){ }

  measureDownload(): Observable<string> {
    const start = performance.now();
    return this.http.get('https://localhost:7068/api/InternetSpeed/download', { responseType: 'blob' }).pipe(
      map(blob => {
        // console.log("blob",blob);
        const duration = (performance.now() - start) / 1000;
        const bits = blob.size * 8;
        return (bits / duration / 1024 / 1024).toFixed(2); 
      })
    );
  }

  measureUpload(): Observable<string> {
    const data = new Blob([new ArrayBuffer(5 * 1024 * 1024)]); 
    const start = performance.now();
    return this.http.post('https://localhost:7068/api/InternetSpeed/upload', data).pipe(
      map(() => {
        // console.log("upload data: ",data);
        const duration = (performance.now() - start) / 1000;
        // console.log(duration);
        const bits = data.size * 8;
        return (bits / duration / 1024 / 1024).toFixed(2); 
      })
    );
  }

}
