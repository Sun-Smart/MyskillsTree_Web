import { bocompanyregistrationService } from './../../../service/bocompanyregistration.service';
import { bocompanyregistration } from './../../../model/bocompanyregistration.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
import { boconfigvalue } from './../../../model/boconfigvalue.model';
import { boconfigvalueService } from './../../../service/boconfigvalue.service';

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-filerender.component';

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
import { bouserrolemaster } from './../../../model/bouserrolemaster.model';
import { bouserrolemasterComponent } from './../../../pages/forms/bouserrolemaster/bouserrolemaster.component';
import { bouserrolemasterService } from './../../../service/bouserrolemaster.service';
//popups
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
//custom fields & attachments

@Component({
  selector: 'app-bocompanyregistration',
  templateUrl: './bocompanyregistration.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class bocompanyregistrationComponent implements OnInit {
  hidelist: any = [];
  viewhtml: any = '';//stores html view of the screen
  showview: boolean = false;//view or edit mode
  theme: string = "";//current theme
  //formdata: any;//current form data
  shortcuts: ShortcutInput[] = [];//keyboard keys
  showsubmit: boolean = true;//button to show
  showGoWorkFlow: boolean = false;
  pkList: any;//stores values - used in search, prev, next
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
  pk_tblForm: FormGroup;//pk - autocomplete
  pk_tbloptions: any;//pk - autocomplete
  pk_tblformatter: any;//pk - autocomplete
  toolbarvisible: boolean = true;
  customfieldservicelist: any;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  pmenuid: any;
  pcurrenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  maindata: any;
  data3: any = [];
  bfilterPopulatebocompanyregistrations: boolean = false;
  databocompanyregistrationscompanytype3: any = [];
  databocompanyregistrationsdesignation3: any = [];
  bocompanyregistrationForm: FormGroup;
  companytypeList: boconfigvalue[];
  designationList: bouserrolemaster[];
  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showformtype: any;
  formid: any;
  pkcol: any;
  SESSIONUSERID: any;//current user
  bocompanyregistrationshowOption: boolean;
  sessiondata: any;
  sourcekey: any;






  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private bocompanyregistrationservice: bocompanyregistrationService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    //private dialog: NbDialogService,
    private configservice: boconfigvalueService,
    private bouserrolemasterservice: bouserrolemasterService,
    private currentRoute: ActivatedRoute) {
    this.translate = this.sharedService.translate;
    this.data = dynamicconfig;
    this.pmenuid = sharedService.menuid;
    this.pcurrenturl = sharedService.currenturl;
    this.keyboard.add([
      {
        key: 'cmd l',
        command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
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
    this.bocompanyregistrationForm = this.fb.group({
      pk: [null],
      registrationid: [null],
      companyname: [null],
      companytype: [null],
      companytypedesc: [null],
      firstname: [null],
      lastname: [null],
      designation: [null],
      designationdesc: [null],
      emailid: [null],
      mobilenumber: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.bocompanyregistrationForm.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarvisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.bocompanyregistrationForm.dirty && this.bocompanyregistrationForm.touched) {
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
    this.sessiondata = this.sessionService.getSession();
    if (this.sessiondata != null) {
      this.SESSIONUSERID = this.sessiondata.userid;
    }

    this.theme = this.sessionService.getItem('selected-theme');
    this.viewhtml = this.sessionService.getViewHtml();

    debugger;
    //getting data - from list page, from other screen through dialog
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
      this.maindata = this.data;
    }
    if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null) this.showview = this.maindata.showview;
    if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
    if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
      this.sourcekey = this.currentRoute.snapshot.paramMap.get('sourcekey');
    }
    let bocompanyregistrationid = null;

    //if view button(eye) is clicked
    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
      //this.viewhtml=this.sessionService.getViewHtml();
    }
    else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
      this.pkcol = this.sessionService.getItem('usersource');
    }
    else if (this.data != null && this.data.pkcol != null) {
      this.pkcol = this.data.pkcol;
    }
    else {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
      this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
    }
    //copy the data from previous dialog 
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
    }
    this.formid = bocompanyregistrationid;
    //this.sharedService.alert(bocompanyregistrationid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }
    this.configservice.getList("companytype").then(res => this.companytypeList = res as boconfigvalue[]);
    this.bouserrolemasterservice.getbouserrolemastersList().then(res => {
      this.designationList = res as bouserrolemaster[];
    }
    ).catch((err) => { console.log(err); });

    //autocomplete
    this.bocompanyregistrationservice.getbocompanyregistrationsList().then(res => {
      this.pkList = res as bocompanyregistration[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { console.log(err); });
    this.pk_tbloptions = (text$: Observable<string>) =>
      text$.pipe(
        debounceTime(200),
        map(value => value.length < 2 ? []
          : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
      );
    this.pk_tblformatter = (result: any) => result.pkcol;

    //setting the flag that the screen is not touched 
    this.bocompanyregistrationForm.markAsUntouched();
    this.bocompanyregistrationForm.markAsPristine();
  }



  resetForm() {
    if (this.bocompanyregistrationForm != null)
      this.bocompanyregistrationForm.reset();
    this.bocompanyregistrationForm.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let registrationid = this.bocompanyregistrationForm.get('registrationid').value;
    if (registrationid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.bocompanyregistrationservice.deletebocompanyregistration(registrationid).then(res => {
          this.resetForm();
        }
        ).catch((err) => { console.log(err); });
      }
    }
    else {
      this.toastr.addSingle("error", "", "select a record");
    }
  }
  onCopy() {
    this.bocompanyregistrationForm.patchValue({
      registrationid: null
    });
    if (this.bocompanyregistrationservice.formData.registrationid != null) this.bocompanyregistrationservice.formData.registrationid = null;
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
            this.bocompanyregistrationForm.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.bocompanyregistrationForm.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.bocompanyregistrationForm.controls[key] != undefined) {
                this.bocompanyregistrationForm.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  onClose() {
    this.dialogRef.close();
  }

  onSubmitAndWait() {
    if (this.maindata == undefined || this.maindata.save == true) {
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
    if (this.pkcol == null || (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  registrationidonChange(evt: any) {
    let e = evt.value;
  }
  companynameonChange(evt: any) {
    let e = evt.value;
  }
  companytypeonChange(evt: any) {
    let e = this.f.companytype.value as any;
    this.bocompanyregistrationForm.patchValue({ companytypedesc: evt.options[evt.options.selectedIndex].text });
  }
  firstnameonChange(evt: any) {
    let e = evt.value;
  }
  lastnameonChange(evt: any) {
    let e = evt.value;
  }
  designationonChange(evt: any) {
    let e = evt.value;
    this.bocompanyregistrationForm.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
  }
  emailidonChange(evt: any) {
    let e = evt.value;
  }
  mobilenumberonChange(evt: any) {
    let e = evt.value;
  }
  statusonChange(evt: any) {
    let e = evt.value;
  }

  editbocompanyregistrations() {
    this.showview = false;
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.bocompanyregistrationservice.getbocompanyregistrationsByEID(pkcol).then(res => {

      this.bocompanyregistrationservice.formData = res.bocompanyregistration;
      let formproperty = res.bocompanyregistration.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.bocompanyregistration.pkcol;
      this.formid = res.bocompanyregistration.registrationid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formid = res.bocompanyregistration.registrationid;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.bocompanyregistrationForm.patchValue({
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
    //Child Tables if any
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.bocompanyregistrationForm.controls) {
      if (this.bocompanyregistrationForm.controls[key] != null) {
        if (false) {
          if (this.bocompanyregistrationservice.formData != null && this.bocompanyregistrationservice.formData[key] != null && this.bocompanyregistrationservice.formData[key] != '[]' && this.bocompanyregistrationservice.formData[key] != undefined && this.bocompanyregistrationservice.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "http://localhost:5002/" + JSON.parse(this.bocompanyregistrationservice.formData[key])[0]["name"]);
        }
        else if (false) {
          if (this.bocompanyregistrationservice.formData != null && this.bocompanyregistrationservice.formData[key] != null && this.bocompanyregistrationservice.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='Stars' style='--rating:" + this.bocompanyregistrationservice.formData[key] + "></div>");
        }
        else if (false) {
          if (this.bocompanyregistrationservice.formData != null && this.bocompanyregistrationservice.formData[key] != null && this.bocompanyregistrationservice.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='progress--circle progress--" + this.bocompanyregistrationservice.formData[key] + "'><div class='progress__number'>" + this.bocompanyregistrationservice.formData[key] + "%</div></div>");
        }
        else
          ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.bocompanyregistrationForm.controls[key].value);
      }
    }
    return ret;
  }

  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.bocompanyregistrationForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.bocompanyregistrationForm.value;
    console.log(obj);
    this.dialogRef.close(obj);
    setTimeout(() => {
      //this.dialogRef.destroy();
    }, 200);
  }

  //This has to come from bomenuactions & procedures
  afteraction(mode: any) {
    let formname = "";
    let query = "";
    if (mode == "new")
      this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if (mode == "refresh")
      this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
  }

  private bocompanyregistrationtoggleOption() {
    this.bocompanyregistrationshowOption = this.bocompanyregistrationshowOption === true ? false : true;
  }



  async onSubmitData(bclear: any) {
    debugger;
    this.isSubmitted = true;
    let strError = "";
    // Object.keys(this.bocompanyregistrationForm.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.bocompanyregistrationForm.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.bocompanyregistrationForm.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.bocompanyregistrationservice.formData = this.bocompanyregistrationForm.value;
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.bocompanyregistrationForm.controls[key] != null) {
            this.bocompanyregistrationservice.formData[key] = this.bocompanyregistrationForm.controls[key].value;
          }
        }
      }
    }
    console.log(this.bocompanyregistrationservice.formData);
    this.bocompanyregistrationservice.formData = this.bocompanyregistrationForm.value;
    this.bocompanyregistrationservice.saveOrUpdatebocompanyregistrations().subscribe(
      async res => {
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.showview = true;
        document.getElementById("contentArea1").scrollTop = 0;
        if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          this.dialogRef.close((res as any).bocompanyregistration);
          return;
        }
        else {
          document.getElementById("contentArea1").scrollTop = 0;
        }
        this.bocompanyregistrationservice.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.dialogRef.close((res as any).bocompanyregistration);
          }
          else {
            this.FillData(res);
          }
        }
        this.bocompanyregistrationForm.markAsUntouched();
        this.bocompanyregistrationForm.markAsPristine();
      },
      err => {
        debugger;
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }




  //dropdown edit from the screen itself -> One screen like Reportviewer

  AddOrEditdesignation(userroleid) {
    /*let ScreenType='2';
    this.dialog.open(bouserrolemasterComponent, 
    {
    data: {userroleid:this.bocompanyregistrationForm.get('designation').value, ScreenType:2 }
    } 
    ).onClose.subscribe(res => {
    });*/
  }



  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }

}



