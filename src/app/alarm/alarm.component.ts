import { CommonModule, DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { AlarmService } from '../services/alarm.service';
import { AlarmModel } from '../Model/AlarmModel.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-alarm',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule, DatePipe],
  templateUrl: './alarm.component.html',
  styleUrl: './alarm.component.css'
})
export class AlarmComponent implements OnInit {
  alarmList: any[] = [];
  alarmTitle: string = "";
  created!: string | null;
  time: string = "";
  updateTitle: string = "";
  updateCreated!: string | null;
  updateTime: string = "";
  updateId?: number;
  diffList: {} = {} ;
  audio: HTMLAudioElement | null = null;
  filtered: any[] = [];
  filteredIds: any[] = [];
  playedAlarms: Set<number> = new Set();
  hide:boolean = true;
  
  currentTime: string = new Date(new Date().getTime()+19800000).toISOString().split('.')[0];
  currentTimeInt: number =  new Date(this.currentTime).getTime();
  secondTimeUpdated: string = this.time.toString();
  secondTimeUpdatedint: number = new Date(this.time).getTime();

  constructor(private alarmSvc: AlarmService, private toastSvc: ToastrService){}
  
  ngOnInit(): void {
    this.alarmListLoader();
    this.polling();
  }

  playSound(){
    if (this.audio && !this.audio.paused) return;

    this.audio = new Audio('https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3');
    this.audio.play().catch(error => {
      console.error("Audio playback failed:", error);
    });

    setTimeout(() => {
      this.stopSound();
    }, 50000);
  }

  stopSound(){
    if (this.audio) {
      this.audio.pause();
      this.audio.currentTime = 0; 
      this.audio = null;      
    }
  }

  stopSound2(alarmId: number){
    if (this.audio) {
      this.playedAlarms.delete(alarmId);
      this.audio.pause();
      this.audio.currentTime = 0; 
      this.audio = null;   
    }
  }


  isAlarmFiltered(alarmId: number): boolean {
   const shouldPlay = this.filteredIds.some(f => f.id === alarmId);
    if (shouldPlay && !this.playedAlarms.has(alarmId)) {
      this.hide = false;
      this.playedAlarms.add(alarmId);
      this.playSound();

      setTimeout(() => {
        this.playedAlarms.delete(alarmId);
      }, 50000);
    }
    return shouldPlay;
}

  polling(){
    setInterval(() => {
      this.currentTime = new Date(new Date().getTime() + 19800000).toISOString().split('.')[0];
      this.currentTimeInt = new Date(this.currentTime).getTime();

      let count = 0;
      this.diffList = this.alarmList.reduce((acc: any, x: any) => {
        const datePart = x.created.split('T')[0];
        const then = new Date(`${datePart}T${x.from}`).getTime();
        const diff = then - this.currentTimeInt;
        acc[count++] = {
          id: x.id,
          difference: diff
        };
        return acc;
      }, {} as { id: number, difference: number });

      this.filtered = Object.values(this.diffList).filter((x: any) =>
        x.difference == 0
      );
      this.filteredIds = this.filtered.map((x: any) => ({ id: x.id }));
    }, 1000);
  }

  delete(id: number){
    this.alarmSvc.deleteAlarm(id).subscribe((res:any)=>{
      this.toastSvc.success("Successfully deleted", "Success");
      this.alarmListLoader();
    });
  }

  createAlarm(){
    const createAlarmModel: AlarmModel = {
      title: this.alarmTitle,
      created: this.created,
      from: this.time,
      isActive: true
    }
    if(this.created && this.time){
      this.alarmSvc.createNewAlarm(createAlarmModel).subscribe({
        next: (res:any)=>{
          this.toastSvc.success("Successfully created", "Success");
          this.alarmListLoader();
          this.alarmTitle = "";
          this.created = "";
          this.time = "";
        },
      error: (err)=>{console.log(err);}
      });
    }else if((this.created == undefined || this.created == "") && this.time == ""){
      this.toastSvc.error("Please provide Date and Time", "Error");
      this.alarmTitle = "";
      this.created = "";
      this.time = "";
    }else if(this.time == "" && this.created){
      this.toastSvc.error("Please provide Time", "Error");
      this.alarmTitle = "";
      this.created = "";
      this.time = "";
    }else if((this.created == undefined || this.created == "") && this.time){
      this.toastSvc.error("Please provide date", "Error");
      this.alarmTitle = "";
      this.created = "";
      this.time = "";
    }
  }

  alarmListLoader(){
    let count = 0;
    this.alarmSvc.getAllAlarms().subscribe((data:any)=>{
        this.alarmList = data;
        console.log("alarm list data: ",this.alarmList);
        this.diffList = data.reduce((acc:any, x:any) => {
          const datePart = x.created.split('T')[0];
          const then = new Date(`${datePart}T${x.from}`).getTime();
          const diff = then - this.currentTimeInt;
           acc[count++] = {
            id: x.id,
           difference: diff
           }
          return acc;
        }, {} as {id:number, difference:number});
      });
  }

  alarmForUpdate(alarm: any){
    this.updateId = alarm.id;
    this.updateTitle = alarm.title;
    this.updateCreated = new Date(new Date(alarm.created).getTime()+19800000).toISOString().split('T')[0];
    this.updateTime = alarm.from;
  }

  update(id:number){
    const createAlarmModel: AlarmModel = {
      title: this.updateTitle,
      created: this.updateCreated,
      from: this.updateTime,
      isActive: true
    }
    if(this.updateCreated && this.updateTime){
      this.alarmSvc.updateAlarm(id, createAlarmModel).subscribe((res:any)=>{
        this.toastSvc.success("Successfully updated","Success");
        this.alarmListLoader();
      });
    }else if(this.updateCreated == "" && this.updateTime == ""){
      this.toastSvc.error("Please provide Date and Time", "Error");
    }else if(this.updateTime == "" && this.updateCreated){
      this.toastSvc.error("Please provide Time", "Error");
    }else if( this.updateCreated == "" && this.updateTime){
      this.toastSvc.error("Please provide date", "Error");
    }
  }
}
