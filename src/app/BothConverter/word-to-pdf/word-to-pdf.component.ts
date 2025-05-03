import { Component } from '@angular/core';
import { ConverterService } from '../../services/converter.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-word-to-pdf',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './word-to-pdf.component.html',
  styleUrl: './word-to-pdf.component.css'
})
export class WordToPdfComponent {
  constructor(private converterService: ConverterService, private router: Router){}
    isLoader = false;
    isDragging = false;
    selectedFile: File | undefined;
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
        this.selectedFile = (event.dataTransfer.files[0] as File);
        console.log('Dropped file:', this.selectedFile);
      }
    }
  
    onFileSelected(event: any) {
      this.selectedFile = event.target.files[0];
      console.log('Selected file:', this.selectedFile?.name);
    }
  
    file(selectedFile : any){
      console.log("form selector : ",selectedFile);
    }
  
    onSubmit() {
      this.isLoader = true;
      if(this.selectedFile){
        this.converterService.convertDocxToPdf(this.selectedFile)
          .subscribe({
            next: (res:any)=>{
              console.log(res);
              this.convertedResponse = res.Files[0];
              this.convertedFile = res.Files[0].FileName;
              this.isLoader = false;
            },
            error: (err)=>{
              alert("Select only Word File");
              this.isLoader = false;

            }
          });

      }
    }

    fileDelete(){
      this.selectedFile = undefined;
      this.convertedFile = [];
    }

    OnDownload(){
      const pdfUrl = this.convertedResponse.Url;
      window.open(pdfUrl, '_blank');
      this.convertedResponse.FileName = undefined;
    }

    back(){
      this.router.navigateByUrl('converter');
    }
}
