import { bocompanyregistrationService } from '../../../service/bocompanyregistration.service';
import { bocompanyregistration } from '../../../model/bocompanyregistration.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../core/services/theme.service';
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
  viewHtml: any = '';//stores html view of the screen
  showview: boolean = false;//view or edit mode
  theme: string = "";//current theme
  //formdata: any;//current form data
  shortcuts: ShortcutInput[] = [];//keyboard keys
  showSubmit: boolean = true;//button to show
  showGoWorkFlow: boolean = false;
  pkList: any;//stores values - used in search, prev, next
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
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
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;
  submenus1: boolean = false;


  showSpinner: boolean = false;


  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig, private http: HttpClient,
    public dialog: DialogService,
    private bocompanyregistration_service: bocompanyregistrationService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private sanitizer: DomSanitizer,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.translate = this.sharedService.translate;
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;
    this.keyboard.add([
      {
        key: 'cmd l',
        command: () => this.router.navigate(["/home/" + this.p_currenturl]),
        preventDefault: true
      },
      {
        key: 'cmd s',
        command: () => this.onSubmitData(false),
        preventDefault: true
      },
      {
        key: 'cmd f',
        command: () => this.resetForm(),
        preventDefault: true
      }
    ]);
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
      // agreement: ['', Validators.required],
      // mobilenumber: ['', Validators.required],
      category: ['', Validators.required],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.bocompanyregistration_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.bocompanyregistration_Form.dirty && this.bocompanyregistration_Form.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  //check Unique fields

  //navigation buttons
  first() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
  }

  last() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
  }

  prev() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.registrationid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.registrationid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.registrationid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }


  // initialize
  async ngOnInit() {
    //session & theme

    this.themeService.theme.subscribe((val: string) => {
      this.theme = val;
    });

    this.sessionData = this.sessionService.getSession();
    if (this.sessionData != null) {
      this.SESSIONUSERID = this.sessionData.userid;
    }

    this.theme = this.sessionService.getItem('selected-theme');
    //this.viewHtml=this.sessionService.getViewHtml();

    debugger;
    //getting data - from list page, from other screen through dialog
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
      this.maindata = this.data;
    }
    if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null) this.showview = this.maindata.showview;
    if (this.maindata != null && this.maindata.ScreenType != undefined && this.maindata.ScreenType != null) {
      this.viewHtml = '';
    }
    if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
    if (this.currentRoute.snapshot.paramMap.get('sourceKey') != null) {
      this.sourceKey = this.currentRoute.snapshot.paramMap.get('sourceKey');
    }
    let bocompanyregistrationid = null;

    //if view button(eye) is clicked
    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
      //this.viewHtml=this.sessionService.getViewHtml();
    }
    else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
      this.pkcol = this.sessionService.getItem('usersource');
    }
    else if (this.data != null && this.data.pkcol != null) {
      this.pkcol = this.data.pkcol;
    }
    else {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
      this.showFormType = this.currentRoute.snapshot.paramMap.get('showFormType');
    }
    //copy the data from previous dialog
    this.viewHtml = ``;
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
    }
    this.formid = bocompanyregistrationid;
    //alert(bocompanyregistrationid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.bocompanyregistration_service.getDefaultData().then(res => {
      this.companytype_List = res.list_companytype.value;
      this.designation_List = res.list_designation.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.bocompanyregistration_service.get_bocompanyregistrations_List().then(res => {
      this.pkList = res as bocompanyregistration[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched
    this.bocompanyregistration_Form.markAsUntouched();
    this.bocompanyregistration_Form.markAsPristine();


  }



  resetForm() {
    if (this.bocompanyregistration_Form != null)
      this.bocompanyregistration_Form.reset();
    this.bocompanyregistration_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let registrationid = this.bocompanyregistration_Form.get('registrationid').value;
    if (registrationid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.bocompanyregistration_service.delete_bocompanyregistration(registrationid).then(res => {
          this.resetForm();
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
      }
    }
    else {
      this.toastr.addSingle("error", "", "select a record");
    }
  }
  onCopy() {
    this.bocompanyregistration_Form.patchValue({
      registrationid: null
    });
    if (this.formData.registrationid != null) this.formData.registrationid = null;
  }
  PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (ctrltype == "string") {
            this.bocompanyregistration_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.bocompanyregistration_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.bocompanyregistration_Form.controls[key] != undefined) {
                this.bocompanyregistration_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  onClose() {
    this.dialogRef.close(this.objvalues);
  }

  onSubmitAndWait() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(false);
    }
    else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      this.onSubmitDataDlg(false);
    }
    else {
      this.onSubmitData(false);
    }
  }
  onSubmit() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  companytype_onChange(evt: any) {
    let e = this.f.companytype.value as any;
    this.bocompanyregistration_Form.patchValue({ companytypedesc: evt.options[evt.options.selectedIndex].text });
  }
  designation_onChange(evt: any) {
    let e = evt.value;
    this.bocompanyregistration_Form.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
  }

  edit_bocompanyregistrations() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.bocompanyregistration_service.get_bocompanyregistrations_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.bocompanyregistration;
      let formproperty = res.bocompanyregistration.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.bocompanyregistration.pkcol;
      this.formid = res.bocompanyregistration.registrationid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.bocompanyregistration;
    this.formid = res.bocompanyregistration.registrationid;
    this.pkcol = res.bocompanyregistration.pkcol;
    this.bmyrecord = false;
    if ((res.bocompanyregistration as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.bocompanyregistration_Form.patchValue({
      registrationid: res.bocompanyregistration.registrationid,
      companyname: res.bocompanyregistration.companyname,
      companytype: res.bocompanyregistration.companytype,
      companytypedesc: res.bocompanyregistration.companytypedesc,
      firstname: res.bocompanyregistration.firstname,
      lastname: res.bocompanyregistration.lastname,
      designation: res.bocompanyregistration.designation,
      designationdesc: res.bocompanyregistration.designationdesc,
      emailid: res.bocompanyregistration.emailid,
      mobilenumber: res.bocompanyregistration.mobilenumber,
      status: res.bocompanyregistration.status,
      statusdesc: res.bocompanyregistration.statusdesc,
    });
    this.bocompanyregistration_menuactions = res.bocompanyregistration_menuactions;
    //Child Tables if any
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.bocompanyregistration_Form.controls) {
      let val = this.bocompanyregistration_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.bocompanyregistration_Form.controls[key] != null) {
        if (false) {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
        }
        else if (false) {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='Stars' style='--rating:" + this.formData[key] + "></div>");
        }
        else if (false) {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='progress--circle progress--" + this.formData[key] + "'><div class='progress__number'>" + this.formData[key] + "%</div></div>");
        }
        else
          ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
      }
    }
    var re = /##(\w+)##/g;
    ret = ret.replace(re, '');
    return ret;
  }

  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.bocompanyregistration_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.bocompanyregistration_Form.getRawValue();
    console.log(obj);
    this.objvalues.push(obj);
    this.dialogRef.close(this.objvalues);
    setTimeout(() => {
      //this.dialogRef.destroy();
    }, 200);
  }

  //This has to come from bomenuactions & procedures
  afterAction(mode: any) {
    let formname = "";
    let query = "";
    if (mode == "new")
      this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if (mode == "refresh")
      this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
  }



  async onSubmitData(bclear: any) {
    debugger;
    this.isSubmitted = true;
    let strError = "";
    this.showSpinner = true;
    console.log(this.bocompanyregistration_Form.value);

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
        /* other options here */
        responseType: 'text'
      }
      return this.http.post(AppConstants.ntirebizURL + '/bocompanyregistration', data, requestOptions).subscribe((res: any) => {
        console.log(res.status);
        this.spinner.hide();
        this.showSpinner = false;
        if (res == 'Email already exist') {
          this.showSpinner = false;
          // this.toastr.addSingle("error", "", "Email already exist");
          alert("Email already exist");
          return;
        } else {
          this.showSpinner = false;
          // this.toastr.addSingle("success", "", "Successfully Registered.Check your mail for the login credentials");
          alert("Successfully Registered.Check your mail for the login credentials");
          this.objvalues.push((res as any).bocompanyregistration)
          this.bocompanyregistration_Form.reset(this.bocompanyregistration_Form.value);
          this.bocompanyregistration_Form.reset();
          this.bocompanyregistration_Form.markAllAsTouched();
        }
        debugger
      }, (error: HttpErrorResponse) => {
        console.log(error.error);
        if (error.error == "Email already exist") {
          this.showSpinner = false;
          alert('Email already exist');
        }
      });
      // this.bocompanyregistration_service.saveOrUpdate_bocompanyregistrations(this.formData).subscribe(
      //     async res => {
      //         this.spinner.hide();
      //         debugger;
      //         if (res == 'Email already exist') {
      //             // this.toastr.addSingle("error", "", "Email already exist");
      //             alert("Email already exist");
      //         }
      //         else {
      //             // this.toastr.addSingle("success", "", "Successfully Registered.Check your mail for the login credentials");
      //             alert("Successfully Registered.Check your mail for the login credentials");
      //             this.objvalues.push((res as any).bocompanyregistration);
      //             //if(!bclear)this.showview=true;
      //             // if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
      //             // if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      //             //     this.dialogRef.close(this.objvalues);
      //             //     return;
      //             // }
      //             // else {
      //             //     if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
      //             // }
      //             // this.clearList();
      //             // if (bclear) {
      //             //     this.resetForm();
      //             // }
      //             // else {
      //             //     if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      //             //         this.objvalues.push((res as any).bocompanyregistration);
      //             //         this.dialogRef.close(this.objvalues);
      //             //     }
      //             //     else {
      //             //         this.FillData(res);
      //             //     }
      //             // }
      //             this.bocompanyregistration_Form.markAsUntouched();
      //             this.bocompanyregistration_Form.markAsPristine();
      //         }

      //     },
      //     err => {
      //         debugger;
      //         this.spinner.hide();
      //         this.toastr.addSingle("error", "", "Email already exist");
      //         console.log(err);
      //     }
      // )

    }
  }




  //dropdown edit from the screen itself -> One screen like Reportviewer
  clearList() {
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  onItemChange(value) {
    console.log(" Value is : ", value);
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
    debugger;
    console.log(ev)
    if (ev == 'Special') {
      this.submenus1 = true;
    } else {
      this.submenus1 = false;
    }

    //this.userRoleID = ev;
  }
  closedrop(data: any) {
    debugger
    console.log(data)

  }
  // closedrop(){
  //   this.drophide=false;
  // }


}

