import { Component, OnInit } from '@angular/core';
import { NetworkService } from '../services/network.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { concatMap, take, tap } from 'rxjs/operators';
import { interval, Observable } from 'rxjs';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-speed-test',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './speed-test.component.html',
  styleUrl: './speed-test.component.css'
})
export class SpeedTestComponent{
  downloadSpeeds: number[] = [];
  uploadSpeeds: number[] = [];
  downloadAvg?: number;
  uploadAvg?: number ;
  downloadRotation = 0;
  uploadRotation = 0;

  constructor(private networkService: NetworkService) {}

  getDownloadSpeedAvg(): Observable<any> {
  this.downloadSpeeds = [];
  return interval(300).pipe(
    take(20),
    concatMap(() => this.networkService.measureDownload()),
    tap(speed => {
      const numericSpeed = parseFloat(speed);
      this.downloadSpeeds.push(numericSpeed);
      const sum = this.downloadSpeeds.reduce((acc, val) => acc + val, 0);
      this.downloadAvg = parseFloat((sum / this.downloadSpeeds.length).toFixed(2));
      this.downloadRotation =((this.downloadAvg/1000)* 180 <= 180) ? (this.downloadAvg/1000)* 180 : 180;
    })
  );
}

  getUploadSpeedAvg(): Observable<any> {
    this.uploadSpeeds = [];
    return interval(300).pipe(
      take(20),
      concatMap(() => this.networkService.measureUpload()),
      tap(speed => {
        const numericSpeed = parseFloat(speed);
        this.uploadSpeeds.push(numericSpeed);
        const sum = this.uploadSpeeds.reduce((acc, val) => acc + val, 0);
        this.uploadAvg = parseFloat((sum / this.uploadSpeeds.length).toFixed(2));
        this.uploadRotation =((this.uploadAvg/1000)* 180 <= 180) ? (this.uploadAvg/1000)* 180 : 180;
      })
    );
  }

  testSpeeds() {
    this.downloadAvg = undefined;
    this.uploadAvg = undefined;
    this.getDownloadSpeedAvg().subscribe({
      complete: () => {
        this.getUploadSpeedAvg().subscribe();
      }
    });
  }
}
