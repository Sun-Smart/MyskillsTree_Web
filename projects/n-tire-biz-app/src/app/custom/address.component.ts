
import { Component, forwardRef, EventEmitter, Output, HostListener, ViewChild, Input } from '@angular/core';
import { FormBuilder, ControlValueAccessor, FormGroup, FormControl, NG_VALUE_ACCESSOR, Validators } from "@angular/forms";

import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { bocountry } from './../model/bocountry.model';
import { bocountryService } from './../service/bocountry.service';
import { bostate } from './../model/bostate.model';
import { bostateService } from './../service/bostate.service';
import { bocity } from './../model/bocity.model';
import { bocityService } from './../service/bocity.service';
import { SharedService } from './../service/shared.service';

@Component({
  selector: 'app-address',
  template: `
    <form [formGroup]="addressForm">
    <div  class="input-group">
    <div  class="col-6"  >
          <input (change)="updateval()"   *ngIf="!showview"  id="address1"  formControlName="address1" class="form-control"
          placeholder="{{'Address1' | translate}}">
        <label *ngIf="showview"  class="form-control labelview">{{f.address1?.value}}</label>
    </div>

    <div   class="col-2" >
  <app-popupselect (change)="updateval()"   *ngIf="!showview"  [options]="countryidList"  [optionsEvent]="countryidoptionsEvent" [form]="bocountry" (selectItem)="onSelectedcountryid($event)"  [reportid]= 18 [menuid]=18 formControlName="countryid" id="countryid" desc="name" ></app-popupselect>
  <div class="input-group">
  </div>
        <label *ngIf="showview"  class="form-control labelview">{{f.countryiddesc?.value}}</label>
    </div>
    <div   class="col-2" >
    <app-popupselect (change)="updateval()"  *ngIf="!showview"  [options]="stateidList"  [optionsEvent]="stateidoptionsEvent" [form]="bostate" (selectItem)="onSelectedstateid($event)"  [reportid]= 19 [menuid]=19 formControlName="stateid" id="stateid" desc="name" ></app-popupselect>
    <div class="input-group">
    </div>
          <label *ngIf="showview"  class="form-control labelview">{{f.stateiddesc?.value}}</label>
      </div>
      <div   class="col-2" >
    <app-popupselect (change)="updateval()"   *ngIf="!showview"  [options]="cityidList"  [optionsEvent]="cityidoptionsEvent" [form]="bocity" (selectItem)="onSelectedcityid($event)"  [reportid]= 20 [menuid]=20 formControlName="cityid" id="cityid" desc="name" ></app-popupselect>
    <div class="input-group">
    </div>
          <label *ngIf="showview"  class="form-control labelview">{{f.cityiddesc?.value}}</label>
      </div>
    <div  class="col-6"  >
         <input (change)="updateval()"   *ngIf="!showview"  id="address2"  formControlName="address2" class="form-control"
          placeholder="{{'Address2' | translate}}">
        <label *ngIf="showview"  class="form-control labelview">{{f.address2?.value}}</label>
    </div>
    
    <div  class="col-2"  >
         <input (change)="updateval()"   *ngIf="!showview"  id="district"  formControlName="district" class="form-control"
          placeholder="{{'District' | translate}}">
        <label *ngIf="showview"  class="form-control labelview">{{f.district?.value}}</label>
    </div>
      
      <div  class="col-2"  >
          <input  (change)="updateval()"  *ngIf="!showview"  id="pin"  formControlName="pin" class="form-control"
            placeholder="{{'P I N' | translate}}">
          <label *ngIf="showview"  class="form-control labelview">{{f.pin?.value}}</label>
      </div>
    </div>
    </form>
  `,
  providers: [{
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => addressComponent),
    multi: true
  }]
})
export class addressComponent implements ControlValueAccessor {

  onChange: Function;

  onTouched: Function;

  addressForm: FormGroup;

  private _value: any;
  @Output() private onchange = new EventEmitter<any>();

  countryidList: bocountry[];
  countryidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  countryid_bocountriesForm: FormGroup;
  countryid_bocountriesoptions: any;
  countryid_bocountriesformatter: any;
  stateidList: bostate[];
  stateidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  stateid_bostatesForm: FormGroup;
  stateid_bostatesoptions: any;
  stateid_bostatesformatter: any;
  cityidList: bocity[];
  cityidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  cityid_bocitiesForm: FormGroup;
  cityid_bocitiesoptions: any;
  cityid_bocitiesformatter: any;
  address1: any;
  address2: any;
  district: any;
  countryid: any;
  countryiddesc: any;
  stateid: any;
  stateiddesc: any;
  cityid: any;
  cityiddesc: any;
  pin: any;

  constructor(
    private fb: FormBuilder,
    private bocountryservice: bocountryService,
    private bostateservice: bostateService,
    private bocityservice: bocityService, private sharedService: SharedService
  ) {
    this.addressForm = this.fb.group({
      address1: [null],
      address2: [null],
      district: [null],
      countryid: [null],
      countryiddesc: [null],
      stateid: [null],
      stateiddesc: [null],
      cityid: [null],
      cityiddesc: [null],
      pin: [null],

    });
  }
  async ngOnInit() {
    this.bocountryservice.get_bocountries_List().then((res: any) => {
      this.countryidList = res as bocountry[];
      if (this.countryid) {
        this.countryidoptionsEvent.emit(this.countryidList);
        this.addressForm.patchValue({
          countryid: this.countryid,
          countryiddesc: this.countryiddesc,
        });
      }
    }
    );
    this.countryid_bocountriesoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.countryidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.countryid_bocountriesformatter = (result: any) => result.name;
    setTimeout(() => {
      if (this.countryid != null) this.bostateservice.getListBy_countryid(this.countryid).then((res: any) => {
        this.stateidList = res as bostate[];
        if (this.stateid) {
          this.addressForm.patchValue({
            stateid: this.stateid,
            stateiddesc: this.stateiddesc,
          });
        }
      });
    });
    this.stateid_bostatesoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.stateidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.stateid_bostatesformatter = (result: any) => result.name;
    setTimeout(() => {
      if (this.stateid != null) this.bocityservice.getListBy_stateid(this.stateid).then((res: any) => {
        this.cityidList = res as bocity[];
        if (this.cityid) {
          this.addressForm.patchValue({
            cityid: this.cityid,
            cityiddesc: this.cityiddesc,
          });
        }
      });
    });
    this.cityid_bocitiesoptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.cityidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.cityid_bocitiesformatter = (result: any) => result.name;
  }

  get value() {
    debugger;
    return this._value;
  }


  updateval() {
    debugger;
    let address1 = "";
    let address2 = "";
    let district = "";
    let countryid = "";
    let countryiddesc = "";
    let stateid = "";
    let stateiddesc = "";
    let cityid = "";
    let cityiddesc = "";
    let pin = "";
    if (this.addressForm.invalid) {
      console.log("error");
      this.sharedService.alert("error")
    }
    else {

      if (this.addressForm.controls["address1"].value != undefined) address1 = this.addressForm.controls["address1"].value;
      if (this.addressForm.controls["address2"].value != undefined) address2 = this.addressForm.controls["address2"].value;
      if (this.addressForm.controls["district"].value != undefined) district = this.addressForm.controls["district"].value;
      if (this.addressForm.controls["countryid"].value != undefined) countryid = this.addressForm.controls["countryid"].value;
      if (this.addressForm.controls["countryiddesc"].value != undefined) countryiddesc = this.addressForm.controls["countryiddesc"].value;
      if (this.addressForm.controls["stateid"].value != undefined) stateid = this.addressForm.controls["stateid"].value;
      if (this.addressForm.controls["stateiddesc"].value != undefined) stateiddesc = this.addressForm.controls["stateiddesc"].value;
      if (this.addressForm.controls["cityid"].value != undefined) cityid = this.addressForm.controls["cityid"].value;
      if (this.addressForm.controls["cityiddesc"].value != undefined) cityiddesc = this.addressForm.controls["cityiddesc"].value;
      if (this.addressForm.controls["pin"].value != undefined) pin = this.addressForm.controls["pin"].value;


      this._value = '{"a1":"' + address1 + '","a2":"' + address2 + '","dt":"' + district + '","cd":"' + countryid + '","cds":"' + countryiddesc + '","sd":"' + stateid + '","sds":"' + stateiddesc + '","ct":"' + cityid + '","cts":"' + cityiddesc + '","pin":"' + pin + '"}';


    }
    //debugger;
    if (this.onChange) {
      this.onChange(this._value);
    }
    this.onchange.emit(this._value);
  }

  set value(value: string) {
    debugger;
    if (value != null) {
      let json = JSON.parse(value);
      this.addressForm.patchValue({
        address1: json.a1,
        address2: json.a2,
        district: json.dt,
        countryid: json.cd,
        countryiddesc: json.cds,
        stateid: json.sd,
        stateiddesc: json.sds,
        cityid: json.ct,
        cityiddesc: json.cts,
        pin: json.pin,
      });
      this.address1 = json.a1;
      this.address2 = json.a2;
      this.district = json.dt;
      this.countryid = json.cd;
      this.countryiddesc = json.cds;
      this.stateid = json.sd;
      this.stateiddesc = json.sds;
      this.cityid = json.ct;
      this.cityiddesc = json.cts;
      this.pin = json.pin;
    }






    this._value = value;


    if (this.onChange) {
      this.onChange(value);
    }
  }



  onSelectedcountryid(countryidDetail: any) {
    if (countryidDetail.countryid && countryidDetail) {
      this.addressForm.patchValue({
        countryid: countryidDetail.countryid,
        countryiddesc: countryidDetail.name,

      });
      this.bostateservice.getListBy_countryid(countryidDetail.countryid).then((res: any) => {
        this.stateidList = res as bostate[]
      });

    }
  }

  onSelectedstateid(stateidDetail: any) {
    if (stateidDetail.stateid && stateidDetail) {
      this.addressForm.patchValue({
        stateid: stateidDetail.stateid,
        stateiddesc: stateidDetail.name,

      });
      this.bocityservice.getListBy_stateid(stateidDetail.stateid).then((res: any) => {
        this.cityidList = res as bocity[]
      });

    }
  }

  onSelectedcityid(cityidDetail: any) {
    if (cityidDetail.cityid && cityidDetail) {
      this.addressForm.patchValue({
        cityid: cityidDetail.cityid,
        cityiddesc: cityidDetail.name,

      });

    }
  }



  writeValue(obj: any): void {
    this.value = obj;
  }

  registerOnChange(fn: any): void {
    //debugger;
    this.onChange = fn;
  }


  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}