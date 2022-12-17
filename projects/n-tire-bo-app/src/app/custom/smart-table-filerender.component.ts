import { Component, ViewChild, ElementRef, AfterViewInit, Input, Output } from '@angular/core';

import { Cell, DefaultEditor, Editor } from 'ng2-smart-table';

@Component({
selector: 'smarttablefilecomponent',
template: `
<form [formGroup]="smarttablefileForm">
<div  class="input-group">
<input type="file" [ngClass]="inputClass" #fileInput id="fileInput" class="form-control short-input" [name]="cell.getId()" (change)="updateValue($event)" [disabled]="!cell.isEditable()" [placeholder]="cell.getTitle()" />
</div>
</form>
`,
})
export class SmartTableFileRenderComponent extends DefaultEditor implements AfterViewInit {

@ViewChild('fileInput') fileInputVariable: any;
@ViewChild('name') name: ElementRef;

constructor() {
    super();
}

ngAfterViewInit() {
    //if (this.cell.newValue !== '') {
    //    //   this.name.nativeElement.value = this.getUrlName();
    //}
}
updateValue(e: any) {
    debugger;
    this.cell.newValue = this.fileInputVariable.nativeElement.files;
}
}