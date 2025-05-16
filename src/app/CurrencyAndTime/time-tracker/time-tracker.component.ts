import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { CurrencyService } from '../../services/currency.service';
import { TimezoneConversionRequest } from '../../Model/TimeZoneConversionModel.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-time-tracker',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './time-tracker.component.html',
  styleUrl: './time-tracker.component.css'
})
export class TimeTrackerComponent implements OnInit {
  zones: any[] =[];
  currentTime: string = '';
  fromZone: string = '';
  toZone: string = '';
  ConvertedTime?: Date;
  beforeConvert?: Date;
  rotation = 0;


  rotateImage(){
    if(this.fromZone != '' && this.toZone != ''){
      this.rotation += 180;
      const temp = this.fromZone;
      this.fromZone = this.toZone;
      this.toZone = temp;
      this.ConvertedTime = undefined;
    }
    
  }


  constructor(private currencySvc: CurrencyService, private toastSVC: ToastrService){}

  ngOnInit(): void {
    this.currencySvc.getTimZones().subscribe((data) => {
      console.log(data);
      this.zones = data.map((zone: any) => (
        zone.id
      ));
    });
  }

  convert(){
    const convertTimeZoneData: TimezoneConversionRequest = {
    dateTime: this.currentTime,
    fromTimezone: this.fromZone,
    toTimezone: this.toZone,
  };
  if(this.currentTime && this.fromZone && this.toZone){
    // console.log("this os :",convertTimeZoneData)
    this.currencySvc.convertTimeZone(convertTimeZoneData).subscribe((data:any)=>{
      this.ConvertedTime = data.dateTime;
    });
  }else if(this.currentTime == '' && this.fromZone == '' && this.toZone == ''){
    this.toastSVC.error("Please provide CurrentTime, FromZone and ToZone", "Error");
    return;
  }else if(this.fromZone == ''){
    this.toastSVC.error("Please provide the FromZone");
    return;
  }else if(this.toZone == ''){
    this.toastSVC.error("Please provide ToZone", "Error");
    return;
  }else if(this.currentTime == ''){
    this.toastSVC.error("Please provide CurrentTime", "Error");
    return;
  }else if(this.fromZone == '' && this.currentTime && this.toZone){
    this.toastSVC.error("Please provide CurrentTime and ToTimezone", "Error");
    return;
  }else if(this.toZone == '' && this.fromZone && this.currentTime){
    this.toastSVC.error("Please provide FromTimeZone and CurrentTime", "Error");
    return;
  }else if(this.currentTime == '' && this.fromZone && this.toZone){
    this.toastSVC.error("Please provide FromTimeZone and TotimeZone", "Error");
    return;
  }
  
  }

}
