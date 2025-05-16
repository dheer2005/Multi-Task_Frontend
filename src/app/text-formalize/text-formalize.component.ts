import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-text-formalize',
  standalone: true,
  imports: [RouterLink, CommonModule, FormsModule],
  templateUrl: './text-formalize.component.html',
  styleUrl: './text-formalize.component.css'
})
export class TextFormalizeComponent {
  inputText: string = '';
  outputText: string = '';


  constructor(private toastrSvc: ToastrService){ }

  convertToUpperCase() {
    this.inputText = this.inputText.toUpperCase();
  }

  convertToLowerCase() {
    this.inputText = this.inputText.toLowerCase();
  }

  convertToTitleCase() {
    this.inputText = this.inputText.replace(/\b\w/g, (char) => char.toUpperCase());
  }

  convertToSentenceCase() {
  this.inputText = this.inputText
    .toLowerCase().replace(/(^\s*\w|[\.\!\?]\s*\w)/g, (match) => match.toUpperCase());
}

  removeExtraSpace(){
    this.inputText = this.inputText.replace(/\s+/g, ' ').trim();
  }

  clearText() {
    this.inputText = '';
  }

  copyText(){
    if(this.inputText != ''){
      this.toastrSvc.success("Text copied", "Success");
      navigator.clipboard.writeText(this.inputText);
    }else{
      this.toastrSvc.error("Empty", "Warning");
    }
    
  }

  get wordCount(): number{
    if(!this.inputText.trim()){
      return 0;
    }
    return this.inputText.trim().split(/\s+/).length;
  }

  get lineCount(): number{
    if(!this.inputText){
      return 0;
    }
    return Math.floor(this.inputText.split(/\n/).length + this.inputText.length / 120);
  }

  get charCount(): number{
    if(!this.inputText.trim()){
      return 0;
    }
    return this.inputText.trim().length;
  }

  get minuteRead() :number{
    if (this.inputText.length ==0 ) {
      return 0;
    }
    var  res = this.inputText.trim().split(/\s+/).length; 
    return res *0.008;
  }

  logLineCount() {
    // const lineHeight = parseInt(window.getComputedStyle(textArea).lineHeight || '20', 10);
    // const lines = Math.floor(textArea.scrollHeight / lineHeight);
    // this.lineCount = lines;
  }


  
}