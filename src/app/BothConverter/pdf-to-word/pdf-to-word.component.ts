import { Component } from '@angular/core';
import { ConverterService } from '../../services/converter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pdf-to-word',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pdf-to-word.component.html',
  styleUrl: './pdf-to-word.component.css'
})
export class PdfToWordComponent {
  constructor(private converterService: ConverterService, private route: Router){}
  
    isLoader = false;
    isDragging = false;
    PdfToWordselectedFile: File | undefined;
    convertedResponse: any = [];
    convertedFile: any = [];
  
    onDragOver(event: DragEvent) {
      event.preventDefault();
      this.isDragging = true;
    }
  
    onDragLeave(event: DragEvent) {
      event.preventDefault();
      this.isDragging = false;
    }
  
    onDrop(event: DragEvent) {
      event.preventDefault();
      this.isDragging = false;
  
      if (event.dataTransfer?.files.length) {
        this.PdfToWordselectedFile = (event.dataTransfer.files[0] as File);
        console.log('Dropped file:', this.PdfToWordselectedFile);
      }
    }
  
    onFileSelected(event: any) {
      this.PdfToWordselectedFile = event.target.files[0];
      console.log('Selected file:', this.PdfToWordselectedFile?.name);
    }
  
    file(selectedFile : any){
      console.log("form selector : ",selectedFile);
    }
  
    onSubmit() {
      this.isLoader = true;
      if(this.PdfToWordselectedFile){
        this.converterService.convertPdfToDocx(this.PdfToWordselectedFile)
        .subscribe({
          next: (res:any)=>{
            console.log(res);
            this.convertedResponse = res.Files[0];
            this.convertedFile = res.Files[0].FileName;
            this.isLoader = false;
          },
          error: (err)=>{
            alert(`Select Only PDF File`);
            this.isLoader = false;
          }
        });
      }
    }

    fileDelete(){
      this.PdfToWordselectedFile = undefined;
      this.convertedFile = [];
    }
  
    OnDownload(){
      const wordUrl = this.convertedResponse.Url;
      window.open(wordUrl, '_blank');
    }

    back(){
      this.route.navigateByUrl('converter')
    }
}
