import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { JSONViewerComponent } from './json-viewer/json-viewer.component';
import { ConverterComponent } from './converter/converter.component';
import { PdfToWordComponent } from './BothConverter/pdf-to-word/pdf-to-word.component';
import { WordToPdfComponent } from './BothConverter/word-to-pdf/word-to-pdf.component';
import { ConverterHomeComponent } from './CurrencyAndTime/converter-home/converter-home.component';
import { CurrencyConverterComponent } from './CurrencyAndTime/currency-converter/currency-converter.component';
import { TimeTrackerComponent } from './CurrencyAndTime/time-tracker/time-tracker.component';
import { TextFormalizeComponent } from './text-formalize/text-formalize.component';
import { AlarmComponent } from './alarm/alarm.component';
import { SpeedTestComponent } from './speed-test/speed-test.component';

export const routes: Routes = [
    { path: 'home', component: HomeComponent },
    { path: 'calculator', component: CalculatorComponent },
    { path: 'json', component: JSONViewerComponent },
    { path: 'converter', component: ConverterComponent },
    { path: 'pdf-to-word', component: PdfToWordComponent },
    { path: 'word-to-pdf', component: WordToPdfComponent },
    { path: 'converterHome', component: ConverterHomeComponent },
    { path: 'currency', component: CurrencyConverterComponent },
    { path: 'time', component: TimeTrackerComponent },
    { path: 'textFormalize', component: TextFormalizeComponent },
    { path: 'alarm', component: AlarmComponent},
    { path: 'speedTest', component: SpeedTestComponent },
    { path: '', redirectTo: 'home',  pathMatch: 'full' }
];
