import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CurrencyService {
  private apiKey = 'd15d503b5d89096a584cda64';
  private apiUrl = `https://v6.exchangerate-api.com/v6/${this.apiKey}/latest/USD`;
  private timeZoneUrl = `https://api.opentimezone.com/timezones`;

  constructor(private http: HttpClient) {  }

  getExchangeRates(): Observable<any>{
    return this.http.get(this.apiUrl);
  }


  getTimZones(): Observable<any>{
    return this.http.get(this.timeZoneUrl);
  }


  fromTimeZone(from: string){
    return this.http.get(`https://api.opentimezone.com/timezone/${from}`);
  }

  toTimeZone(to: string){
    return this.http.get(`https://api.opentimezone.com/timezone/${to}`);
  }

  convertTimeZone(data: any){
    return this.http.post(`https://api.opentimezone.com/convert`, data, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    });
  }
}
