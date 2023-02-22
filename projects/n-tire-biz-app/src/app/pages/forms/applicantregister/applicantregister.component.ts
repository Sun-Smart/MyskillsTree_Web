import { bocompanyregistrationService } from '../../../service/bocompanyregistration.service';
import { bocompanyregistration } from '../../../model/bocompanyregistration.model';
import {  Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { ShortcutInput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { NgxSpinnerService } from 'ngx-spinner';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../shared/helper';
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-applicantregister',
  templateUrl: './applicantregister.component.html',
  styleUrls: ['./applicantregister.component.scss'],
  providers: [KeyboardShortcutsService]
})
export class ApplicantregisterComponent implements OnInit {
  formData: bocompanyregistration;
  list: bocompanyregistration[];
  bmyrecord: boolean = false;
  hidelist: any = [];
  objvalues: any = [];
  viewHtml: any = '';
  showview: boolean = false;
  theme: string = "";
  shortcuts: ShortcutInput[] = [];
  showSubmit: boolean = true;
  showGoWorkFlow: boolean = false;
  pkList: any;
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
  toolbarVisible: boolean = true;
  customFieldServiceList: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  p_menuid: any;
  p_currenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  maindata: any;
  category: any;
  bfilterPopulate_bocompanyregistrations: boolean = false;
  bocompanyregistration_menuactions: any = []
  bocompanyregistration_Form: FormGroup;
  companytype_List: DropDownValues[];
  designation_List: DropDownValues[];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showFormType: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;
  sessionData: any;
  sourceKey: any;
  submenus1: boolean = false;
  showSpinner: boolean = false;
  constructor(private router: Router,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig, private http: HttpClient,
    public dialog: DialogService,
    private bocompanyregistration_service: bocompanyregistrationService,
    private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.data = dynamicconfig;
    this.bocompanyregistration_Form = this.fb.group({
      pk: [null],
      registrationid: [null],
      companyname: ['', Validators.required],
      companytype: ['', Validators.required],
      companytypedesc: ['', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      designation: [null],
      designationdesc: [null],
      emailid: ['', [Validators.email, Validators.required]],
      mobilenumber: ['', Validators.required],
      category: ['', Validators.required],
      status: [null],
      statusdesc: [null],
    });
  }
  get f() { return this.bocompanyregistration_Form.controls; }
  // initialize
  async ngOnInit() {
    let bocompanyregistrationid = null;
    this.formid = bocompanyregistrationid;
    this.bocompanyregistration_service.getDefaultData().then(res => {
      this.companytype_List = res.list_companytype.value;
      this.designation_List = res.list_designation.value;
    }).catch((err) => { this.spinner.hide();});
    this.bocompanyregistration_service.get_bocompanyregistrations_List().then(res => {
      this.pkList = res as bocompanyregistration[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); });
    this.bocompanyregistration_Form.markAsUntouched();
    this.bocompanyregistration_Form.markAsPristine();
  }
  companytype_onChange(evt: any) {
    let e = this.f.companytype.value as any;
    this.bocompanyregistration_Form.patchValue({ companytypedesc: evt.options[evt.options.selectedIndex].text });
  }
  designation_onChange(evt: any) {
    let e = evt.value;
    this.bocompanyregistration_Form.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
  }
  onSubmitData(bclear: any) {
    this.isSubmitted = true;
    this.showSpinner = true;
    if (this.bocompanyregistration_Form.value.companyname == "" || this.bocompanyregistration_Form.value.companytype == "-Select-" ||
      this.bocompanyregistration_Form.value.designation == "-Select-" || this.bocompanyregistration_Form.value.emailid == "" ||
      this.bocompanyregistration_Form.value.firstname == "" || this.bocompanyregistration_Form.value.lastname == "" ||
      this.bocompanyregistration_Form.value.mobilenumber == "") {
      alert('All fields are required');
      return;
    } else {
      let data = {
        pk: null,
        registrationid: null,
        companyname: this.bocompanyregistration_Form.value.companyname,
        companytype: this.bocompanyregistration_Form.value.companytype,
        companytypedesc: this.bocompanyregistration_Form.value.companytypedesc,
        firstname: this.bocompanyregistration_Form.value.firstname,
        lastname: this.bocompanyregistration_Form.value.lastname,
        designation: this.bocompanyregistration_Form.value.designation,
        designationdesc: this.bocompanyregistration_Form.value.designationdesc,
        emailid: this.bocompanyregistration_Form.value.emailid,
        mobilenumber: this.bocompanyregistration_Form.value.mobilenumber,
        usercategory: this.bocompanyregistration_Form.value.category,
        status: null,
        statusdesc: null,
      }
      let options = new HttpHeaders().set('Content-Type', 'application/json');
      const requestOptions: Object = {
        responseType: 'text'
      }
      return this.http.post(AppConstants.ntirebizURL + '/bocompanyregistration', data, requestOptions).subscribe((res: any) => {
        this.spinner.hide();
        this.showSpinner = false;
        if (res == 'Email already exist') {
          this.showSpinner = false;
          return;
        } else {
          this.showSpinner = false;
          alert("Successfully Registered.Check your mail for the login credentials");
          this.objvalues.push((res as any).bocompanyregistration)
          this.bocompanyregistration_Form.reset(this.bocompanyregistration_Form.value);
          this.bocompanyregistration_Form.reset();
          this.bocompanyregistration_Form.markAllAsTouched();
        }
      }, (error: HttpErrorResponse) => {
        if (error.error == "Email already exist") {
          this.showSpinner = false;
          alert('Email already exist');
        }
      });
    }
  }
  onItemChange(value) {
    if (value == "provider") {
      this.router.navigate(['registernew']);
    } else if (value == "availer") {
      this.router.navigate(['applicantregister']);
      this.category = this.category;
    } else if (value == "enhancer") {
      this.router.navigate(['enhancer']);
    } else if (value == "certifier") {
      this.router.navigate(['certifier']);
    }
  }
  gotoLogin() {
    this.router.navigate(['login']);
  }
  opendrop(ev: any) {
    if (ev == 'Special') {
      this.submenus1 = true;
    } else {
      this.submenus1 = false;
    }
  }
  closedrop(data: any) {
  }
}

