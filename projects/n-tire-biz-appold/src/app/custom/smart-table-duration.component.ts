import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Output, EventEmitter, ViewChild, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { DefaultEditor, ViewCell } from 'ng2-smart-table';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


import { Time } from '../shared/general.validator';


@Component({
  template: `
  <form [formGroup]="smarttabledurationForm">
  <div  class="input-group">
  <app-duration #dur (onchange)="onchange($event)" formControlName="inputValue"></app-duration>
  </div>
  </form>
  `,
})
export class SmartTableDurationComponent extends DefaultEditor implements OnInit, AfterViewInit {
  @ViewChild('dur', { static: false }) dur: ElementRef;
  smarttabledurationForm: FormGroup;
  private _value: any;
  onChange: Function;

  onTouched: Function;


  constructor(private fb: FormBuilder) {
    super();
  }

  ngOnInit() {

    this.smarttabledurationForm = this.fb.group({
      'inputValue': new FormControl(null)
    });
  }

  ngAfterViewInit() {
    debugger;
    if (this.cell.newValue !== '') {
      //this.dur.nativeElement.value = this.getDuration();
      this.smarttabledurationForm.patchValue({ inputValue: this.cell.newValue });
    }
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
    this.smarttabledurationForm.patchValue({ inputValue: this._value });
  }
  getDuration(): string {
    debugger;
    return this.dur.nativeElement.innerText;
  }

  set value(value: string) {
    debugger;
    this._value = value;


    if (this.onChange) {
      this.onChange(value);
    }
    this.smarttabledurationForm.patchValue({ inputValue: this._value });
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
export class SmartTableDurationRenderComponent implements ViewCell, OnInit {

  renderValue: any;

  @Input() value: any;
  @Input() rowData: any;

  ngOnInit() {
    //debugger;
    this.renderValue = new Time(this.value);
  }

}