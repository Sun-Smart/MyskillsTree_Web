import { Component, Input, OnInit, AfterViewInit, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ViewContainerRef, ViewChild, ReflectiveInjector, ComponentFactoryResolver } from '@angular/core';
import { BrowserModule, DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
@Component({
  selector: 'dynamic-form-builder',
  template: `
    <form  [formGroup]="form" class="form-horizontal" [ngClass]="theme">
    <div class="form-group row">
    <div class="row">
    <div [innerHTML]="formhtml"></div>
    </div>
    <div class="input-group row" *ngIf="templatehtml==''">
      <ng-container *ngFor="let field of fields; let i = index">
      <div class="w-100" *ngIf="i!=0 && i%cols==0"></div>
      <div class="w-100" *ngIf="i!=0 && i%cols!=0 && field.type=='text' && field.multiline"></div>
      <div class="sticky" *ngIf="field.type=='sec'">{{field.name}}</div>
      <ng-container  *ngIf="field.type!='sec'">
          <div class="col">
            <field-builder [field]="field" [form]="form"></field-builder>
          </div>
      </ng-container>    
      </ng-container>
    </div>  
    <div class="row" *ngIf="templatehtml!=''">

    <div [innerHTML]="templatehtml"></div>
    </div>
    </div>  
    </form>
  `,
})
export class DynamicFormBuilderComponent implements OnInit {
  @Output() onSubmit = new EventEmitter();//

  @Input() customfields: any;
  fields: any[] = [];
  formhtml: string;
  cols: number;
  templatehtml: SafeHtml;
  form: FormGroup;
  theme: string;
  constructor(private domSanitizer: DomSanitizer, private themeService: ThemeService, public sessionService: SessionService) {
    debugger;

  }
  ngOnChanges(changes) {
    debugger;
    this.ngOnInit1();
  }
  //OnInit,AfterViewInit
  ngOnInit() {
    debugger;
    this.theme = this.sessionService.getItem('selected-theme');

    this.themeService.theme.subscribe((val: string) => {
      debugger;
      this.theme = val;
    });

    this.ngOnInit1();
  }
  checkrequired() {

  }
  ngAfterViewInit() {
    debugger;
    //   setTimeout(() => {
    this.ngOnInit1();
    //  },3000);
  }

  ngOnInit1() {
    debugger;
    this.fields = this.customfields.fields;
    this.formhtml = "";
    if (this.customfields.formhtml != null && this.customfields.formhtml != "") this.formhtml = this.customfields.formhtml;
    this.cols = 1;
    console.log("cols");
    console.log(this.customfields.cols);
    if (this.customfields.cols != null && this.customfields.cols != "" && this.customfields.cols != "0") this.cols = this.customfields.cols;


    for (let fld of this.fields) {
      var re = new RegExp('##' + fld.label + '##', 'g');
      let replace = "";
      if (fld.type == "text")
        replace = "<input type='text'></input>";
      else if (fld.type == "dropdown")
        replace = "<select></select>";
      else if (fld.type == "checkbox")
        replace = "<input  class='form-check-input' type='checkbox'></input>";
      else if (fld.type == "radio")
        replace = "<input type='radio'></input>";
      else if (fld.type == "file")
        replace = "<input type='file'></input>";

      if (this.customfields.templatehtml != null && this.customfields.templatehtml != "") this.customfields.templatehtml = this.customfields.templatehtml.replace('##' + fld.label + '##', replace);
    }
    this.templatehtml = "";

    if (this.customfields.templatehtml != null && this.customfields.templatehtml != "") this.templatehtml = this.domSanitizer.bypassSecurityTrustHtml(this.customfields.templatehtml);


    console.log('this.fields');
    console.log(this.fields);
    let fieldsCtrls = {};



    for (let f of this.fields) {
      if (f.type != 'checkbox') {
        if (f.required)
          fieldsCtrls[f.name] = new FormControl(f.value || '', Validators.required)
        else
          fieldsCtrls[f.name] = new FormControl(f.value || '')
      } else {
        let opts = {};
        for (let opt of f.options) {
          opts[opt.key] = new FormControl(opt.value);
        }
        fieldsCtrls[f.name] = new FormGroup(opts)
      }
    }

    this.form = new FormGroup(fieldsCtrls);


  }
}
