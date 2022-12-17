import { bobranchmasterService } from './../../../service/bobranchmaster.service';
import { bobranchmaster } from './../../../model/bobranchmaster.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-biz-app/src/app/custom/duration.component';
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
import { bobranchholiday } from './../../../model/bobranchholiday.model';
import { bobranchholidayComponent } from './../../../pages/forms/bobranchholiday/bobranchholiday.component';
import { bobranchholidayService } from './../../../service/bobranchholiday.service';
import { bouserbranchaccess } from './../../../model/bouserbranchaccess.model';
import { bouserbranchaccessComponent } from './../../../pages/forms/bouserbranchaccess/bouserbranchaccess.component';
import { bouserbranchaccessService } from './../../../service/bouserbranchaccess.service';
import { bobranchlocation } from './../../../model/bobranchlocation.model';
import { bobranchlocationComponent } from './../../../pages/forms/bobranchlocation/bobranchlocation.component';
import { bousermasterComponent } from './../../../pages/forms/bousermaster/bousermaster.component';

import { bobranchlocationService } from './../../../service/bobranchlocation.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-biz-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
  selector: 'app-bobranchmaster',
  templateUrl: './bobranchmaster.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class bobranchmasterComponent implements OnInit {
  Insertbouserbranchaccesses: any;
  formData: bobranchmaster;
  list: bobranchmaster[];
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
  @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  p_menuid: any;
  p_currenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  maindata: any;

  bfilterPopulate_bobranchmasters: boolean = false;
  bfilterPopulate_bobranchholidays: boolean = false;
  bfilterPopulate_bouserbranchaccesses: boolean = false;
  bfilterPopulate_bobranchlocations: boolean = false;
  bobranchmaster_menuactions: any = []
  bobranchholiday_menuactions: any = []
  @ViewChild('tbl_bobranchholidays', { static: false }) tbl_bobranchholidays: Ng2SmartTableComponent;
  bouserbranchaccess_menuactions: any = []
  @ViewChild('tbl_bouserbranchaccesses', { static: false }) tbl_bouserbranchaccesses: Ng2SmartTableComponent;
  bobranchlocation_menuactions: any = []
  @ViewChild('tbl_bobranchlocations', { static: false }) tbl_bobranchlocations: Ng2SmartTableComponent;

  bobranchmaster_Form: FormGroup;

  countryid_List: DropDownValues[];
  countryid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  stateid_List: DropDownValues[];
  stateid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  cityid_List: DropDownValues[];
  cityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  locationid_List: DropDownValues[];
  locationid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  weekoff1_List: DropDownValues[];
  weekoff2_List: DropDownValues[];
  resourceallocation_List: DropDownValues[];
  growthopportunity_List: DropDownValues[];
  salesdirector_List: DropDownValues[];
  salesdirector_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  customersuccessdirector_List: DropDownValues[];
  customersuccessdirector_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showFormType: any;
  formid: any;
  pkcol: any;
  customFieldJson: any;
  customFieldVisible: boolean = true;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentFieldJson: any[] = [];
  attachmentVisible: boolean = true;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;



  bobranchholidays_visiblelist: any;
  bobranchholidays_hidelist: any;
  bouserbranchaccesses_visiblelist: any;
  bouserbranchaccesses_hidelist: any;
  bobranchlocations_visiblelist: any;
  bobranchlocations_hidelist: any;

  Deleted_bobranchholiday_IDs: string = "";
  bobranchholidays_ID: string = "1";
  bobranchholidays_selectedindex: any;
  Deleted_bouserbranchaccess_IDs: string = "";
  bouserbranchaccesses_ID: string = "2";
  bouserbranchaccesses_selectedindex: any;
  Deleted_bobranchlocation_IDs: string = "";
  bobranchlocations_ID: string = "3";
  bobranchlocations_selectedindex: any;


  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private bobranchmaster_service: bobranchmasterService,
    private bobranchholiday_service: bobranchholidayService,
    //private bousermaster_service: bousermasterService,
    private bobranchlocation_service: bobranchlocationService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private customfieldservice: customfieldconfigurationService,
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
    this.bobranchmaster_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      branchid: [null],
      branchcode: [null, Validators.compose([Validators.required])],
      branchname: [null, Validators.compose([Validators.required])],
      thumbnail: [null],
      address1: [null, Validators.compose([Validators.required])],
      address2: [null],
      countryid: [null],
      countryiddesc: [null],
      stateid: [null],
      stateiddesc: [null],
      cityid: [null],
      cityiddesc: [null],
      locationid: [null],
      locationiddesc: [null],
      pin: [null],
      latlong: [null],
      starttime: [null, Validators.compose([Validators.required])],
      endtime: [null, Validators.compose([Validators.required])],
      weekoff1: [null],
      weekoff1desc: [null],
      weekoff2: [null],
      weekoff2desc: [null],
      remarks: [null],
      totalregions: [null],
      accounts: [null],
      salespeople: [null],
      resourceallocation: [null],
      resourceallocationdesc: [null],
      growthopportunity: [null],
      growthopportunitydesc: [null],
      salesdirector: [null],
      salesdirectordesc: [null],
      customersuccessdirector: [null],
      customersuccessdirectordesc: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.bobranchmaster_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.bobranchmaster_Form.dirty && this.bobranchmaster_Form.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  //check Unique fields

  branchcodeexists(e: any) {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.branchcode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

    if (pos >= 0 && this.pkList[pos].branchid.toString() != this.formid.toString()) {
      if (confirm("This Branch Code value exists in the database.Do you want to display the record ? ")) {
        this.PopulateScreen(this.pkList[pos].pkcol);
        return true;
      }
      else {
        e.stopPropagation();
        e.preventDefault();
        e.target.focus();
        e.target.markAsDirty();
        return false;
      }
    }
    return true;
  }
  branchnameexists(e: any) {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.branchname.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

    if (pos >= 0 && this.pkList[pos].branchid.toString() != this.formid.toString()) {
      if (confirm("This Branch Name value exists in the database.Do you want to display the record ? ")) {
        this.PopulateScreen(this.pkList[pos].pkcol);
        return true;
      }
      else {
        e.stopPropagation();
        e.preventDefault();
        e.target.focus();
        e.target.markAsDirty();
        return false;
      }
    }
    return true;
  }


  //navigation buttons
  first() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
  }

  last() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
  }

  prev() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.branchid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.branchid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.branchid && pkDetail) {
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
    let bobranchmasterid = null;

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
    this.formid = bobranchmasterid;
    //alert(bobranchmasterid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.Set_bobranchholidays_TableConfig();
      setTimeout(() => {
        //this.Set_bobranchholidays_TableDropDownConfig();
      });

      this.Set_bouserbranchaccesses_TableConfig();
      setTimeout(() => {
        //this.Set_bouserbranchaccesses_TableDropDownConfig();
      });

      this.Set_bobranchlocations_TableConfig();
      setTimeout(() => {
        //this.Set_bobranchlocations_TableDropDownConfig();
      });

      this.FillCustomField();
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }
    this.bobranchmaster_service.getDefaultData().then(res => {
      this.countryid_List = res.list_countryid.value;
      this.weekoff1_List = res.list_weekoff1.value;
      this.weekoff2_List = res.list_weekoff2.value;
      this.resourceallocation_List = res.list_resourceallocation.value;
      this.growthopportunity_List = res.list_growthopportunity.value;
      this.salesdirector_List = res.list_salesdirector.value;
      this.customersuccessdirector_List = res.list_customersuccessdirector.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.bobranchmaster_service.get_bobranchmasters_List().then(res => {
      this.pkList = res as bobranchmaster[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched 
    this.bobranchmaster_Form.markAsUntouched();
    this.bobranchmaster_Form.markAsPristine();
  }
  onSelected_countryid(countryidDetail: any) {
    if (countryidDetail.value && countryidDetail) {
      this.bobranchmaster_Form.patchValue({
        countryid: countryidDetail.value,
        countryiddesc: countryidDetail.label,

      });
      this.bobranchmaster_service.getList_stateid(countryidDetail.value).then(res => {
        this.stateid_List = res as DropDownValues[]
      }).catch((err) => { this.spinner.hide(); console.log(err); });

    }
  }

  onSelected_stateid(stateidDetail: any) {
    if (stateidDetail.value && stateidDetail) {
      this.bobranchmaster_Form.patchValue({
        stateid: stateidDetail.value,
        stateiddesc: stateidDetail.label,

      });
      this.bobranchmaster_service.getList_cityid(stateidDetail.value).then(res => {
        this.cityid_List = res as DropDownValues[]
      }).catch((err) => { this.spinner.hide(); console.log(err); });

    }
  }

  onSelected_cityid(cityidDetail: any) {
    if (cityidDetail.value && cityidDetail) {
      this.bobranchmaster_Form.patchValue({
        cityid: cityidDetail.value,
        cityiddesc: cityidDetail.label,

      });
      this.bobranchmaster_service.getList_locationid(cityidDetail.value).then(res => {
        this.locationid_List = res as DropDownValues[]
      }).catch((err) => { this.spinner.hide(); console.log(err); });

    }
  }

  onSelected_locationid(locationidDetail: any) {
    if (locationidDetail.value && locationidDetail) {
      this.bobranchmaster_Form.patchValue({
        locationid: locationidDetail.value,
        locationiddesc: locationidDetail.label,

      });

    }
  }

  onSelected_salesdirector(salesdirectorDetail: any) {
    if (salesdirectorDetail.value && salesdirectorDetail) {
      this.bobranchmaster_Form.patchValue({
        salesdirector: salesdirectorDetail.value,
        salesdirectordesc: salesdirectorDetail.label,

      });

    }
  }

  onSelected_customersuccessdirector(customersuccessdirectorDetail: any) {
    if (customersuccessdirectorDetail.value && customersuccessdirectorDetail) {
      this.bobranchmaster_Form.patchValue({
        customersuccessdirector: customersuccessdirectorDetail.value,
        customersuccessdirectordesc: customersuccessdirectorDetail.label,

      });

    }
  }




  resetForm() {
    if (this.bobranchmaster_Form != null)
      this.bobranchmaster_Form.reset();
    this.bobranchmaster_Form.patchValue({
      salesdirector: this.sessionData.userid,
      salesdirectordesc: this.sessionData.username,
      customersuccessdirector: this.sessionData.userid,
      customersuccessdirectordesc: this.sessionData.username,
    });
    setTimeout(() => {
      this.bobranchholidays_LoadTable();
      this.Insertbouserbranchaccesses = [];
      this.bouserbranchaccesses_LoadTable();
      this.bobranchlocations_LoadTable();
    });
    this.customfieldservice.reset(document);
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let branchid = this.bobranchmaster_Form.get('branchid').value;
    if (branchid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.bobranchmaster_service.delete_bobranchmaster(branchid).then(res => {
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
    this.bobranchmaster_Form.patchValue({
      branchid: null
    });
    if (this.formData.branchid != null) this.formData.branchid = null;
    for (let i = 0; i < this.tbl_bobranchholidays.source.length; i++) {
      this.tbl_bobranchholidays.source[i].branchholidayid = null;
    }
    for (let i = 0; i < this.tbl_bouserbranchaccesses.source.length; i++) {
      this.tbl_bouserbranchaccesses.source[i].accessid = null;
    }
    for (let i = 0; i < this.tbl_bobranchlocations.source.length; i++) {
      this.tbl_bobranchlocations.source[i].locationid = null;
    }
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
          else if (key == "starttime")
            this.bobranchmaster_Form.patchValue({ "starttime": new Time(mainscreendata[key]) });
          else if (key == "endtime")
            this.bobranchmaster_Form.patchValue({ "endtime": new Time(mainscreendata[key]) });
          else if (ctrltype == "string") {
            this.bobranchmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.bobranchmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.bobranchmaster_Form.controls[key] != undefined) {
                this.bobranchmaster_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("bobranchmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
      this.customFieldServiceList = res;
      if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
      return res;
    });


  }
  onClose() {
    this.dialogRef.close(this.objvalues);
  }

  onSubmitAndWait() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.branchname != null) {
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
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.branchname != null) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  countryid_onChange(evt: any) {
    let e = evt.value;
  }
  stateid_onChange(evt: any) {
    let e = evt.value;
  }
  cityid_onChange(evt: any) {
    let e = evt.value;
  }
  locationid_onChange(evt: any) {
    let e = evt.value;
  }
  weekoff1_onChange(evt: any) {
    let e = this.f.weekoff1.value as any;
    this.bobranchmaster_Form.patchValue({ weekoff1desc: evt.options[evt.options.selectedIndex].text });
  }
  weekoff2_onChange(evt: any) {
    let e = this.f.weekoff2.value as any;
    this.bobranchmaster_Form.patchValue({ weekoff2desc: evt.options[evt.options.selectedIndex].text });
  }
  resourceallocation_onChange(evt: any) {
    let e = this.f.resourceallocation.value as any;
    this.bobranchmaster_Form.patchValue({ resourceallocationdesc: evt.options[evt.options.selectedIndex].text });
  }
  growthopportunity_onChange(evt: any) {
    let e = this.f.growthopportunity.value as any;
    this.bobranchmaster_Form.patchValue({ growthopportunitydesc: evt.options[evt.options.selectedIndex].text });
  }
  salesdirector_onChange(evt: any) {
    let e = evt.value;
  }
  customersuccessdirector_onChange(evt: any) {
    let e = evt.value;
  }
  attachmentuploader(e: any) {
    for (let i = 0; i < e.files.length; i++) {
      this.fileAttachmentList.push(e.files[i]);
      let max = 0;
      let attachmentobj = null;
      if (this.attachmentFieldJson == null) this.attachmentFieldJson = [];
      max = Array.of(this.attachmentFieldJson).length; attachmentobj = new KeyValuePair((this.attachmentFieldJson.length + 1 + max).toString(), e.files[i].name);
      this.attachmentFieldJson.push(attachmentobj);
      max = 0;
      if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
      this.attachmentlist.push(attachmentobj);
    }
  }



  edit_bobranchmasters() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.bobranchmaster_service.get_bobranchmasters_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.bobranchmaster;
      let formproperty = res.bobranchmaster.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.bobranchmaster.pkcol;
      this.formid = res.bobranchmaster.branchid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.bobranchmaster;
    this.formid = res.bobranchmaster.branchid;
    this.pkcol = res.bobranchmaster.pkcol;
    this.bmyrecord = false;
    if ((res.bobranchmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    var starttimeTime = new Time(res.bobranchmaster.starttime);
    var endtimeTime = new Time(res.bobranchmaster.endtime);
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.bobranchmaster_Form.patchValue({
      branchid: res.bobranchmaster.branchid,
      branchcode: res.bobranchmaster.branchcode,
      branchname: res.bobranchmaster.branchname,
      thumbnail: res.bobranchmaster.thumbnail,
      address1: res.bobranchmaster.address1,
      address2: res.bobranchmaster.address2,
      countryid: res.bobranchmaster.countryid,
      countryiddesc: res.bobranchmaster.countryiddesc,
      stateid: res.bobranchmaster.stateid,
      stateiddesc: res.bobranchmaster.stateiddesc,
      cityid: res.bobranchmaster.cityid,
      cityiddesc: res.bobranchmaster.cityiddesc,
      locationid: res.bobranchmaster.locationid,
      locationiddesc: res.bobranchmaster.locationiddesc,
      pin: res.bobranchmaster.pin,
      latlong: res.bobranchmaster.latlong,
      starttime: starttimeTime,
      endtime: endtimeTime,
      weekoff1: res.bobranchmaster.weekoff1,
      weekoff1desc: res.bobranchmaster.weekoff1desc,
      weekoff2: res.bobranchmaster.weekoff2,
      weekoff2desc: res.bobranchmaster.weekoff2desc,
      remarks: res.bobranchmaster.remarks,
      totalregions: res.bobranchmaster.totalregions,
      accounts: res.bobranchmaster.accounts,
      salespeople: res.bobranchmaster.salespeople,
      resourceallocation: res.bobranchmaster.resourceallocation,
      resourceallocationdesc: res.bobranchmaster.resourceallocationdesc,
      growthopportunity: res.bobranchmaster.growthopportunity,
      growthopportunitydesc: res.bobranchmaster.growthopportunitydesc,
      salesdirector: res.bobranchmaster.salesdirector,
      salesdirectordesc: res.bobranchmaster.salesdirectordesc,
      customersuccessdirector: res.bobranchmaster.customersuccessdirector,
      customersuccessdirectordesc: res.bobranchmaster.customersuccessdirectordesc,
      customfield: res.bobranchmaster.customfield,
      attachment: JSON.parse(res.bobranchmaster.attachment),
      status: res.bobranchmaster.status,
      statusdesc: res.bobranchmaster.statusdesc,
    });
    this.bobranchmaster_menuactions = res.bobranchmaster_menuactions;
    this.bobranchholiday_menuactions = res.bobranchholiday_menuactions;
    this.bobranchholidays_visiblelist = res.bobranchholidays_visiblelist;
    this.bouserbranchaccess_menuactions = res.bouserbranchaccess_menuactions;
    this.bouserbranchaccesses_visiblelist = res.bouserbranchaccesses_visiblelist;
    this.bobranchlocation_menuactions = res.bobranchlocation_menuactions;
    this.bobranchlocations_visiblelist = res.bobranchlocations_visiblelist;
    if (this.bobranchmaster_Form.get('customfield').value != null && this.bobranchmaster_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.bobranchmaster_Form.get('customfield').value);
    this.FillCustomField();
    if (this.bobranchmaster_Form.get('attachment').value != null && this.bobranchmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.bobranchmaster_Form.get('attachment').value);
    setTimeout(() => {
      if (this.f.countryid.value && this.f.countryid.value != "" && this.f.countryid.value != null) this.bobranchmaster_service.getList_stateid(this.f.countryid.value).then(res => {
        this.stateid_List = res as DropDownValues[];
      }).catch((err) => { console.log(err); });
    });
    setTimeout(() => {
      if (this.f.stateid.value && this.f.stateid.value != "" && this.f.stateid.value != null) this.bobranchmaster_service.getList_cityid(this.f.stateid.value).then(res => {
        this.cityid_List = res as DropDownValues[];
      }).catch((err) => { console.log(err); });
    });
    setTimeout(() => {
      if (this.f.cityid.value && this.f.cityid.value != "" && this.f.cityid.value != null) this.bobranchmaster_service.getList_locationid(this.f.cityid.value).then(res => {
        this.locationid_List = res as DropDownValues[];
      }).catch((err) => { console.log(err); });
    });
    //Child Tables if any
    this.Set_bobranchholidays_TableConfig();
    this.bobranchholidays_LoadTable(res.bobranchholidays);
    this.Set_bouserbranchaccesses_TableConfig();
    this.bouserbranchaccesses_LoadTable(res.bouserbranchaccesses);
    this.Insertbouserbranchaccesses = [];
    this.Set_bobranchlocations_TableConfig();
    this.bobranchlocations_LoadTable(res.bobranchlocations);
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.bobranchmaster_Form.controls) {
      let val = this.bobranchmaster_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.bobranchmaster_Form.controls[key] != null) {
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
    if (!this.bobranchmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.bobranchmaster_Form.getRawValue();
    obj.starttime = (this.bobranchmaster_Form.get('starttime').value == null ? 0 : this.bobranchmaster_Form.get('starttime').value.hour) + ':' + (this.bobranchmaster_Form.get('starttime').value == null ? 0 : this.bobranchmaster_Form.get('starttime').value.minute + ":00");
    obj.endtime = (this.bobranchmaster_Form.get('endtime').value == null ? 0 : this.bobranchmaster_Form.get('endtime').value.hour) + ':' + (this.bobranchmaster_Form.get('endtime').value == null ? 0 : this.bobranchmaster_Form.get('endtime').value.minute + ":00");
    if (customfields != null) obj.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(obj);
    if (!confirm('Do you want to want to save?')) {
      return;
    }
    await this.sharedService.upload(this.fileAttachmentList);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
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
    // Object.keys(this.bobranchmaster_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.bobranchmaster_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += ' ' + key + '' + keyError + '';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.bobranchmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.bobranchmaster_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.bobranchmaster_Form.controls[key] != null) {
            this.formData[key] = this.bobranchmaster_Form.controls[key].value;
          }
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    this.formData.starttime = (this.bobranchmaster_Form.get('starttime').value == null ? 0 : this.bobranchmaster_Form.get('starttime').value.hour) + ':' + (this.bobranchmaster_Form.get('starttime').value == null ? 0 : this.bobranchmaster_Form.get('starttime').value.minute + ":00");
    this.formData.endtime = (this.bobranchmaster_Form.get('endtime').value == null ? 0 : this.bobranchmaster_Form.get('endtime').value.hour) + ':' + (this.bobranchmaster_Form.get('endtime').value == null ? 0 : this.bobranchmaster_Form.get('endtime').value.minute + ":00");
    if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.formData.Deleted_bobranchholiday_IDs = this.Deleted_bobranchholiday_IDs;
    this.formData.Deleted_bouserbranchaccess_IDs = this.Deleted_bouserbranchaccess_IDs;
    this.formData.Deleted_bobranchlocation_IDs = this.Deleted_bobranchlocation_IDs;
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.bobranchmaster_service.saveOrUpdate_bobranchmasters(this.formData, this.tbl_bobranchholidays?.source?.data, this.tbl_bouserbranchaccesses?.source?.data, this.Insertbouserbranchaccesses, this.tbl_bobranchlocations?.source?.data,).subscribe(
      async res => {
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        if (this.tbl_bobranchholidays.source) {
          for (let i = 0; i < this.tbl_bobranchholidays.source.data.length; i++) {
            if (this.tbl_bobranchholidays.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bobranchholidays.source.data[i].fileAttachmentList);
          }
        }
        if (this.tbl_bouserbranchaccesses.source) {
          for (let i = 0; i < this.tbl_bouserbranchaccesses.source.data.length; i++) {
            if (this.tbl_bouserbranchaccesses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bouserbranchaccesses.source.data[i].fileAttachmentList);
          }
        }
        if (this.tbl_bobranchlocations.source) {
          for (let i = 0; i < this.tbl_bobranchlocations.source.data.length; i++) {
            if (this.tbl_bobranchlocations.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bobranchlocations.source.data[i].fileAttachmentList);
          }
        }
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).bobranchmaster);
        if (!bclear) this.showview = true;
        if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
        if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          this.dialogRef.close(this.objvalues);
          return;
        }
        else {
          if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
        }
        this.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.objvalues.push((res as any).bobranchmaster);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.bobranchmaster_Form.markAsUntouched();
        this.bobranchmaster_Form.markAsPristine();
      },
      err => {
        debugger;
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }




  //dropdown edit from the screen itself -> One screen like Reportviewer
  clearList() {
    this.tbl_bobranchholidays.source = new LocalDataSource();
    this.tbl_bouserbranchaccesses.source = new LocalDataSource();
    this.tbl_bobranchlocations.source = new LocalDataSource();
  }

  AddOrEdit_bobranchholiday(event: any, branchholidayid: any, branchid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(bobranchholidayComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, branchholidayid, branchid, visiblelist: this.bobranchholidays_visiblelist, hidelist: this.bobranchholidays_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_bobranchholidays.source.add(res[i]);
          }
          this.tbl_bobranchholidays.source.refresh();
        }
        else {
          this.tbl_bobranchholidays.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_bobranchholiday(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_bobranchholiday_IDs += childID + ",";
    this.tbl_bobranchholidays.source.splice(i, 1);
    //this.updateGrandTotal();
  }

  AddOrEdit_bobranchlocation(event: any, locationid: any, branchid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(bobranchlocationComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, locationid, branchid, visiblelist: this.bobranchlocations_visiblelist, hidelist: this.bobranchlocations_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_bobranchlocations.source.add(res[i]);
          }
          this.tbl_bobranchlocations.source.refresh();
        }
        else {
          this.tbl_bobranchlocations.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_bobranchlocation(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_bobranchlocation_IDs += childID + ",";
    this.tbl_bobranchlocations.source.splice(i, 1);
    //this.updateGrandTotal();
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes bobranchholidays
  bobranchholidays_settings: any;

  show_bobranchholidays_Checkbox() {
    debugger;
    if (this.tbl_bobranchholidays.source.settings['selectMode'] == 'multi') this.tbl_bobranchholidays.source.settings['selectMode'] = 'single';
    else
      this.tbl_bobranchholidays.source.settings['selectMode'] = 'multi';
    this.tbl_bobranchholidays.source.initGrid();
  }
  delete_bobranchholidays_All() {
    this.tbl_bobranchholidays.source.settings['selectMode'] = 'single';
  }
  show_bobranchholidays_Filter() {
    setTimeout(() => {
      //  this.Set_bobranchholidays_TableDropDownConfig();
    });
    if (this.tbl_bobranchholidays.source.settings != null) this.tbl_bobranchholidays.source.settings['hideSubHeader'] = !this.tbl_bobranchholidays.source.settings['hideSubHeader'];
    this.tbl_bobranchholidays.source.initGrid();
  }
  show_bobranchholidays_InActive() {
  }
  enable_bobranchholidays_InActive() {
  }
  async Set_bobranchholidays_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_bobranchholidays) {

      var clone = this.sharedService.clone(this.tbl_bobranchholidays.source.settings);
      if (clone.columns['financialyearid'] != undefined) clone.columns['financialyearid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchholidays_financialyearid.value)), }, };
      if (clone.columns['financialyearid'] != undefined) clone.columns['financialyearid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchholidays_financialyearid.value)), }, };
      this.tbl_bobranchholidays.source.settings = clone;
      this.tbl_bobranchholidays.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_bobranchholidays.source.settings);
      if (clone.columns['holidayday'] != undefined) clone.columns['holidayday'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchholidays_holidayday.value)), }, };
      if (clone.columns['holidayday'] != undefined) clone.columns['holidayday'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchholidays_holidayday.value)), }, };
      this.tbl_bobranchholidays.source.settings = clone;
      this.tbl_bobranchholidays.source.initGrid();
    }
    this.bfilterPopulate_bobranchholidays = true;
  }
  async bobranchholidays_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_bobranchholidays_TableConfig() {
    this.bobranchholidays_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        add: !this.showview,
        edit: true, // true,
        delete: !this.showview,
        position: 'left',
        custom: this.bobranchholiday_menuactions
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        financialyeariddesc: {
          title: 'Financial Year',
          type: 'html',
          filter: true,
        },
        holidaydate: {
          title: 'Holiday Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        holidaydaydesc: {
          title: 'Holiday Day',
          type: 'html',
          filter: true,
        },
        reason: {
          title: 'Reason',
          type: '',
          filter: true,
        },
      },
    };
  }
  bobranchholidays_LoadTable(bobranchholidays = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchholidays_ID) >= 0) {
      if (this.tbl_bobranchholidays != undefined) this.tbl_bobranchholidays.source = new LocalDataSource();
      if (this.tbl_bobranchholidays != undefined) this.tbl_bobranchholidays.source.load(bobranchholidays as any as LocalDataSource);
      if (this.tbl_bobranchholidays != undefined) this.tbl_bobranchholidays.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  bobranchholidays_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.bobranchmaster_service.bobranchholidays.length == 0)
  {
      this.tbl_bobranchholidays.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new bobranchholiday();
      this.bobranchmaster_service.bobranchholidays.push(obj);
      this.tbl_bobranchholidays.source.refresh();
      if ((this.bobranchmaster_service.bobranchholidays.length / this.tbl_bobranchholidays.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bobranchholidays.source.getPaging().page)
      {
          this.tbl_bobranchholidays.source.setPage((this.bobranchmaster_service.bobranchholidays.length / this.tbl_bobranchholidays.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_bobranchholidays.source.grid.edit(this.tbl_bobranchholidays.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_bobranchholidays.source.data.indexOf(event.data);
  this.onDelete_bobranchholiday(event,event.data.branchholidayid,((this.tbl_bobranchholidays.source.getPaging().page-1) *this.tbl_bobranchholidays.source.getPaging().perPage)+index);
  this.tbl_bobranchholidays.source.refresh();
  break;
  }
  }
  
  */
  bobranchholidays_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_bobranchholiday(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_bobranchholiday(event, event.data.branchholidayid, this.formid);
        break;
      case 'delete':
        this.onDelete_bobranchholiday(event, event.data.branchholidayid, ((this.tbl_bobranchholidays.source.getPaging().page - 1) * this.tbl_bobranchholidays.source.getPaging().perPage) + event.index);
        this.tbl_bobranchholidays.source.refresh();
        break;
    }
  }
  bobranchholidays_onDelete(obj) {
    let branchholidayid = obj.data.branchholidayid;
    if (confirm('Are you sure to delete this record ?')) {
      this.bobranchmaster_service.delete_bobranchmaster(branchholidayid).then(res =>
        this.bobranchholidays_LoadTable()
      );
    }
  }
  async onCustom_bobranchholidays_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "bobranchholidays");
    let formname = (objbomenuaction as any).actionname;




  }
  bobranchholidays_Paging(val) {
    debugger;
    this.tbl_bobranchholidays.source.setPaging(1, val, true);
  }

  handle_bobranchholidays_GridSelected(event: any) {
    this.bobranchholidays_selectedindex = this.tbl_bobranchholidays.source.findIndex(i => i.branchholidayid === event.data.branchholidayid);
  }
  Is_bobranchholidays_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchholidays_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes bobranchholidays
  //start of Grid Codes bouserbranchaccesses
  async onCustom_bouserbranchaccesses_Action(event: any) {
    debugger;
    switch (event.action) {
      case 'viewrecord':
        let val = event.data.pkcol;

        this.dialog.open(bousermasterComponent,
          {
            data: { showview: false, pkcol: val, ScreenType: 2 },
          }
        ).onClose.subscribe(res => {
        });
        break;
    }
    let objbomenuaction = await this.sharedService.onCustomAction(event, "bouserbranchaccesses");
    let formname = (objbomenuaction as any).actionname;
  }
  bouserbranchaccesses_settings: any;

  show_bouserbranchaccesses_Checkbox() {
    debugger;
    if (this.tbl_bouserbranchaccesses.source.settings['selectMode'] == 'multi') this.tbl_bouserbranchaccesses.source.settings['selectMode'] = 'single';
    else
      this.tbl_bouserbranchaccesses.source.settings['selectMode'] = 'multi';
    this.tbl_bouserbranchaccesses.source.initGrid();
  }
  delete_bouserbranchaccesses_All() {
    this.tbl_bouserbranchaccesses.source.settings['selectMode'] = 'single';
  }
  show_bouserbranchaccesses_Filter() {
    setTimeout(() => {
      //  this.Set_bouserbranchaccesses_TableDropDownConfig();
    });
    if (this.tbl_bouserbranchaccesses.source.settings != null) this.tbl_bouserbranchaccesses.source.settings['hideSubHeader'] = !this.tbl_bouserbranchaccesses.source.settings['hideSubHeader'];
    this.tbl_bouserbranchaccesses.source.initGrid();
  }
  show_bouserbranchaccesses_InActive() {
  }
  enable_bouserbranchaccesses_InActive() {
  }
  async Set_bouserbranchaccesses_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_bouserbranchaccesses) {
    }
    this.bfilterPopulate_bouserbranchaccesses = true;
  }
  async bouserbranchaccesses_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_bouserbranchaccesses_TableConfig() {
    this.bouserbranchaccesses_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'multi',
      actions: {
        columnTitle: '',
        width: '300px',
        add: false,
        edit: false,
        delete: false,
        position: 'right',
        custom: [
          { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>' }
        ],
      },
      columns: {
        accessid: {
          title: 'Access',
          type: '',
        },
        userid: {
          title: 'User',
          type: '',
        },
        usercode: {
          title: 'Usercode',
          type: '',
        },
        username: {
          title: 'Username',
          type: '',
        },
      },
    };
  }
  bouserbranchaccesses_LoadTable(bouserbranchaccesses = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bouserbranchaccesses_ID) >= 0) {
      if (this.tbl_bouserbranchaccesses != undefined) this.tbl_bouserbranchaccesses.source = new LocalDataSource();
      if (this.tbl_bouserbranchaccesses != undefined) this.tbl_bouserbranchaccesses.source.load(bouserbranchaccesses as any as LocalDataSource);
      setTimeout(() => {
        if (this.tbl_bouserbranchaccesses.source != null) {
          this.tbl_bouserbranchaccesses.source.grid.getRows().forEach((row: any) => {
            if (row.data.accessid != null && row.data.accessid != "") {
              this.Insertbouserbranchaccesses.push(row.data);
              this.tbl_bouserbranchaccesses.source.grid.multipleSelectRow(row);
            }
          });
        }
      });
    }
  }

  //external to inline
  /*
  bouserbranchaccesses_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.bobranchmaster_service.bouserbranchaccesses.length == 0)
  {
      this.tbl_bouserbranchaccesses.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new bouserbranchaccess();
      this.bobranchmaster_service.bouserbranchaccesses.push(obj);
      this.tbl_bouserbranchaccesses.source.refresh();
      if ((this.bobranchmaster_service.bouserbranchaccesses.length / this.tbl_bouserbranchaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bouserbranchaccesses.source.getPaging().page)
      {
          this.tbl_bouserbranchaccesses.source.setPage((this.bobranchmaster_service.bouserbranchaccesses.length / this.tbl_bouserbranchaccesses.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_bouserbranchaccesses.source.grid.edit(this.tbl_bouserbranchaccesses.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_bouserbranchaccesses.source.data.indexOf(event.data);
  this.onDelete_bouserbranchaccess(event,event.data.accessid,((this.tbl_bouserbranchaccesses.source.getPaging().page-1) *this.tbl_bouserbranchaccesses.source.getPaging().perPage)+index);
  this.tbl_bouserbranchaccesses.source.refresh();
  break;
  }
  }
  
  */
  bouserbranchaccesses_Paging(val) {
    debugger;
    this.tbl_bouserbranchaccesses.source.setPaging(1, val, true);
  }

  handle_bouserbranchaccesses_GridSelected(event: any) {
    debugger;

    if (event.isSelected) {
      if (event.data.accessid == null || event.data.accessid == "") {
        var obj = { branchid: this.formid, userid: event.data.userid }
        this.Insertbouserbranchaccesses.push(obj as any);
      }
      else {
        var deletedids = this.Deleted_bouserbranchaccess_IDs.split(',');

        let i: number = 0;
        deletedids.forEach(id => {
          if (id == event.data.accessid) {
            deletedids.splice(i, 1);
          }
          i++;
        });
        deletedids.join(",");
      }
    }
    else {
      if (event.data.accessid != null && event.data.accessid != "") this.Deleted_bouserbranchaccess_IDs += event.data.accessid + ",";
    }
  }
  Is_bouserbranchaccesses_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bouserbranchaccesses_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes bouserbranchaccesses
  //start of Grid Codes bobranchlocations
  bobranchlocations_settings: any;

  show_bobranchlocations_Checkbox() {
    debugger;
    if (this.tbl_bobranchlocations.source.settings['selectMode'] == 'multi') this.tbl_bobranchlocations.source.settings['selectMode'] = 'single';
    else
      this.tbl_bobranchlocations.source.settings['selectMode'] = 'multi';
    this.tbl_bobranchlocations.source.initGrid();
  }
  delete_bobranchlocations_All() {
    this.tbl_bobranchlocations.source.settings['selectMode'] = 'single';
  }
  show_bobranchlocations_Filter() {
    setTimeout(() => {
      //  this.Set_bobranchlocations_TableDropDownConfig();
    });
    if (this.tbl_bobranchlocations.source.settings != null) this.tbl_bobranchlocations.source.settings['hideSubHeader'] = !this.tbl_bobranchlocations.source.settings['hideSubHeader'];
    this.tbl_bobranchlocations.source.initGrid();
  }
  show_bobranchlocations_InActive() {
  }
  enable_bobranchlocations_InActive() {
  }
  async Set_bobranchlocations_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_bobranchlocations) {

      var clone = this.sharedService.clone(this.tbl_bobranchlocations.source.settings);
      if (clone.columns['locationcode'] != undefined) clone.columns['locationcode'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchlocations_locationcode.value)), }, };
      if (clone.columns['locationcode'] != undefined) clone.columns['locationcode'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchlocations_locationcode.value)), }, };
      this.tbl_bobranchlocations.source.settings = clone;
      this.tbl_bobranchlocations.source.initGrid();
    }
    this.bfilterPopulate_bobranchlocations = true;
  }
  async bobranchlocations_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_bobranchlocations_TableConfig() {
    this.bobranchlocations_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        add: !this.showview,
        edit: true, // true,
        delete: !this.showview,
        position: 'left',
        custom: this.bobranchlocation_menuactions
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
        confirmDelete: true,
      },
      columns: {
        locationcodedesc: {
          title: 'Location Code',
          type: 'html',
          filter: true,
        },
        locationname: {
          title: 'Location Name',
          type: '',
          filter: true,
        },
        tag: {
          title: 'Tag',
          type: '',
          filter: true,
        },
      },
    };
  }
  bobranchlocations_LoadTable(bobranchlocations = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchlocations_ID) >= 0) {
      if (this.tbl_bobranchlocations != undefined) this.tbl_bobranchlocations.source = new LocalDataSource();
      if (this.tbl_bobranchlocations != undefined) this.tbl_bobranchlocations.source.load(bobranchlocations as any as LocalDataSource);
      if (this.tbl_bobranchlocations != undefined) this.tbl_bobranchlocations.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  bobranchlocations_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.bobranchmaster_service.bobranchlocations.length == 0)
  {
      this.tbl_bobranchlocations.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new bobranchlocation();
      this.bobranchmaster_service.bobranchlocations.push(obj);
      this.tbl_bobranchlocations.source.refresh();
      if ((this.bobranchmaster_service.bobranchlocations.length / this.tbl_bobranchlocations.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bobranchlocations.source.getPaging().page)
      {
          this.tbl_bobranchlocations.source.setPage((this.bobranchmaster_service.bobranchlocations.length / this.tbl_bobranchlocations.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_bobranchlocations.source.grid.edit(this.tbl_bobranchlocations.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_bobranchlocations.source.data.indexOf(event.data);
  this.onDelete_bobranchlocation(event,event.data.locationid,((this.tbl_bobranchlocations.source.getPaging().page-1) *this.tbl_bobranchlocations.source.getPaging().perPage)+index);
  this.tbl_bobranchlocations.source.refresh();
  break;
  }
  }
  
  */
  bobranchlocations_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_bobranchlocation(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_bobranchlocation(event, event.data.locationid, this.formid);
        break;
      case 'delete':
        this.onDelete_bobranchlocation(event, event.data.locationid, ((this.tbl_bobranchlocations.source.getPaging().page - 1) * this.tbl_bobranchlocations.source.getPaging().perPage) + event.index);
        this.tbl_bobranchlocations.source.refresh();
        break;
    }
  }
  bobranchlocations_onDelete(obj) {
    let locationid = obj.data.locationid;
    if (confirm('Are you sure to delete this record ?')) {
      this.bobranchmaster_service.delete_bobranchmaster(locationid).then(res =>
        this.bobranchlocations_LoadTable()
      );
    }
  }
  async onCustom_bobranchlocations_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "bobranchlocations");
    let formname = (objbomenuaction as any).actionname;




  }
  bobranchlocations_Paging(val) {
    debugger;
    this.tbl_bobranchlocations.source.setPaging(1, val, true);
  }

  handle_bobranchlocations_GridSelected(event: any) {
    this.bobranchlocations_selectedindex = this.tbl_bobranchlocations.source.findIndex(i => i.locationid === event.data.locationid);
  }
  Is_bobranchlocations_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchlocations_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes bobranchlocations

}



