import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AlarmService {
  private apiUrl = 'https://multitask.bsite.net/api/Job/';
  constructor(private router: Router, private http: HttpClient) { }
  

  getAllAlarms(){
    return this.http.get(`${this.apiUrl}getAllAlarms`);
  }

  deleteAlarm(id: number){
    return this.http.delete(`${this.apiUrl}DeleteAlarm/${id}`);
  }

  createNewAlarm(data: any){
    return this.http.post(`${this.apiUrl}create`, data)
  }

  updateAlarm(id: number,data: any){
    return this.http.put(`${this.apiUrl}UpdateSchedule/${id}`, data);
  }



}
