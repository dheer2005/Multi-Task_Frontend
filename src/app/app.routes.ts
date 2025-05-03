import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { CalculatorComponent } from './calculator/calculator.component';
import { JSONViewerComponent } from './json-viewer/json-viewer.component';
import { ConverterComponent } from './converter/converter.component';
import { PdfToWordComponent } from './BothConverter/pdf-to-word/pdf-to-word.component';
import { WordToPdfComponent } from './BothConverter/word-to-pdf/word-to-pdf.component';

export const routes: Routes = [
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'calculator',
        component: CalculatorComponent
    },
    {
        path: 'json',
        component: JSONViewerComponent
    },
    {
        path: 'converter',
        component: ConverterComponent
    },
    {
        path: 'pdf-to-word',
        component: PdfToWordComponent
    },
    {
        path: 'word-to-pdf',
        component: WordToPdfComponent
    },
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'        
    }
];
