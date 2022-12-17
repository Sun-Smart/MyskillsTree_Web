import { Component, forwardRef, Input, OnInit, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import { Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { Time } from '../shared/general.validator';


@Component({
  template: `
  <form [formGroup]="smarttablepopupselectForm">
  <div  class="input-group">
  <app-popupselect #dur (onEdited)="onEdit($event)" (selectItem)="OnselectItem($event)"  [options]="cell.getColumn().getConfig()?.list" [optionsEvent]="optionsEvent"  [id]="cell.getColumn().getConfig()?.id" [desc]="cell.getColumn().getConfig()?.desc" form="form" [menuid]="cell.getColumn().getConfig()?.menuid" [reportid]="cell.getColumn().getConfig()?.reportid" formControlName="inputValue" ></app-popupselect>
  </div>
  </form>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => SmartTablepopupselectComponent),
    multi: true,

  }]
})
export class SmartTablepopupselectComponent extends DefaultEditor implements ControlValueAccessor, OnInit, AfterViewInit {
  @ViewChild('dur', { static: false }) dur: ElementRef;
  smarttablepopupselectForm: FormGroup;
  private _value: any;
  //onChange: Function;

  //onTouched: Function;
  @Input() id: string;
  @Input() desc: string;
  @Input() form: string;
  @Input() menuid: number;
  @Input() reportid: number;

  @Output() optionsEvent: EventEmitter<any> = new EventEmitter<any>();
  popupselectForm: FormGroup;

  resultsoptions: any;
  resultsformatter: any;

  constructor(private fb: FormBuilder) {
    super();
  }

  onChange = (value: any) => {

  };
  onTouched = () => { };

  ngOnInit() {
    debugger;
    this.smarttablepopupselectForm = this.fb.group({
      'inputValue': new FormControl(null)
    });
  }

  ngAfterViewInit() {
    debugger;
    let x = this.cell.getColumn().editor.config.list;
    this.optionsEvent.emit(this.cell.getColumn().getConfig().list);
    if (this.cell.newValue !== '') {
      //this.dur.nativeElement.value = this.getpopupselect();
      this.smarttablepopupselectForm.patchValue({ inputValue: this.cell.newValue });
    }

  }
  onEdit() {
    debugger;
    return false;
  }
  OnselectItem(item) {
    debugger;
    this._value = item.value;
    this.cell.setValue(item.value);

    //this.cell.newValue =item.value;
    //this.cell.newValue =item[this.cell.getColumn().getConfig().desc];
    /*
    if (this.onChange) {
        this.onChange(item.value);
    }
    */
  }
  get value() {
    debugger;
    return this._value;
  }
  updateValue() {
    debugger;
    this.cell.newValue = this.dur.nativeElement.value;
    this._value = this.cell.newValue;
    if (this.onChange) {
      this.onChange(this._value);
    }
  }
  onchange($event) {
    debugger;
    this._value = $event;
    this.cell.newValue = this._value;

    if (this.onChange) {
      this.onChange(this._value);
    }
    this.smarttablepopupselectForm.patchValue({ inputValue: this._value });
  }
  getpopupselect(): string {
    debugger;
    return this.dur.nativeElement.innerText;
  }

  set value(value: string) {
    debugger;
    this._value = value;


    if (this.onChange) {
      this.onChange(value);
    }
    this.smarttablepopupselectForm.patchValue({ inputValue: this._value });
  }

  writeValue(obj: any): void {
    debugger;
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    debugger;
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
    debugger;
    this.onTouched = fn;
  }

}

@Component({
  template: `{{renderValue}}`,
})
export class SmartTablepopupselectRenderComponent implements ViewCell, OnInit {

  renderValue: any;

  @Input() value: any;
  @Input() description: any;
  @Input() rowData: any;

  ngOnInit() {
    debugger;
    this.renderValue = this.value;
  }

}