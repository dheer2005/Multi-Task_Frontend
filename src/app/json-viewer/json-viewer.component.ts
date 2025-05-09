import { Component, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AceEditorModule } from 'ngx-ace-editor-wrapper';
import { NgxJsonViewerModule } from 'ngx-json-viewer';


@Component({
  selector: 'app-json-viewer',
  standalone: true,
  imports: [AceEditorModule, NgxJsonViewerModule, RouterLink],
  templateUrl: './json-viewer.component.html',
  styleUrl: './json-viewer.component.css'
})
export class JSONViewerComponent {
  public data = {  };
  code: any = '';

  view(){
    try {
      this.data = JSON.parse(this.code);
    } catch (e) {
      alert('Invalid JSON');
    }
  }

  copy(){
    navigator.clipboard.writeText(JSON.stringify(this.data))
    .then(()=>{alert("Copied text!")})
    .catch(err=>alert(err));
  }

}
