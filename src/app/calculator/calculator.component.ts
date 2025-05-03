import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-calculator',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './calculator.component.html',
  styleUrl: './calculator.component.css'
})
export class CalculatorComponent {
  output:string = '';
  finalResult: string = '';

  insert(event: any){
    const value = event.target.value;
    this.output += value;
  }

  back(){
    this.output = this.output.substring(0, this.output.length - 1);
  }

  clear(){
    this.output = "";
    this.finalResult = "";
  }

  answer() {
    try {
      const sanitized = this.output.replace(/[^-+*/().%\d]/g, '');
      const result = Function(`"use strict"; return (${sanitized})`)();
      this.finalResult = result.toString();
    } catch (err) {
      this.finalResult = 'Error';
    }
  }
}
