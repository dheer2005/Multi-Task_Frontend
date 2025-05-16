import { Component, OnInit } from '@angular/core';
import { CurrencyService } from '../../services/currency.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';


import { registerLocaleData } from '@angular/common';
import localeFr from '@angular/common/locales/fr';
import { ToastrService } from 'ngx-toastr';

// Register French locale
registerLocaleData(localeFr, 'fr');



@Component({
  selector: 'app-currency-converter',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  providers: [CurrencyPipe],
  templateUrl: './currency-converter.component.html',
  styleUrl: './currency-converter.component.css'
})
export class CurrencyConverterComponent implements OnInit {
  rates: any;
  amount?: number | null = null;
  fromCurrency: string = '';
  toCurrency: string = '';
  ConvertedAmount?: number;
  displayAmount: string = '';
  formattedConvertedAmount: string = '';
  rotation = 0;


  constructor(private currencySvc: CurrencyService, private currencyPipe: CurrencyPipe, private toastSvc: ToastrService){}

  ngOnInit(): void {
      this.currencySvc.getExchangeRates().subscribe((data)=>{
        this.rates = data.conversion_rates;
      });
  }

  convert(): void{
    console.log("amount is:",this.amount)
    if(this.fromCurrency && this.toCurrency && this.amount){
      const rate = this.rates[this.toCurrency] / this.rates[this.fromCurrency];
      this.ConvertedAmount = this.amount * rate;
      this.formattedConvertedAmount = this.formatCurrency(this.ConvertedAmount, this.toCurrency);
    }else if(this.amount == null && this.fromCurrency == '' && this.toCurrency == ''){
      this.toastSvc.error("All fields are empty", "Error");
      return;
    }else if(this.toCurrency == '' && this.amount && this.fromCurrency){
      this.toastSvc.error("To field can't be empty", "Error");
      return;
    }else if(this.amount == null && this.fromCurrency && this.toCurrency){
      this.toastSvc.error("Please provide Amount", "Error");
      return;
    }else if(this.fromCurrency == '' && this.toCurrency && this.amount){
      this.toastSvc.error("From field can't be empty", "Error");
      return;
    }else if(this.fromCurrency && this.toCurrency == '' && this.amount == null){
      this.toastSvc.error("Amount and To fields are empty", "Error");
      return;
    }else if(this.toCurrency && this.fromCurrency == '' && this.amount == null){
      this.toastSvc.error("Amount and From fields are empty", "Error");
      return;
    }
  }


  formatCurrency(value: number, currencyCode: string): string {
    return this.currencyPipe.transform(value, currencyCode, 'symbol', '1.0', 'en-US') || '';
  }

  onAmountInput(data: any): void {
    const value = data.target.value;
    const cleaned = value.replace(/[^0-9.,-]/g, '');
    const parsed = parseFloat(cleaned);
    this.amount = isNaN(parsed) ? null : parsed;
    this.displayAmount = value;
}



  onFromCurrencyChange(): void {
    if (this.amount !== null) {
      this.displayAmount = this.formatCurrency(this.amount!, this.fromCurrency);
    }
  }


  rotateImage(){
    if(this.fromCurrency != '' && this.toCurrency != ''){
      this.rotation += 180;
      const temp = this.fromCurrency;
      this.fromCurrency = this.toCurrency;
      this.toCurrency = temp;
      this.formattedConvertedAmount = "";
    }
    
  }

}
