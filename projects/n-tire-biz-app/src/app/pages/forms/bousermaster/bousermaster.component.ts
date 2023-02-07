import { bousermasterService } from './../../../service/bousermaster.service';
import { bousermaster } from './../../../model/bousermaster.model';
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
//hyperlinks services
/*
import { hrmsemployee} from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeComponent } from '../../../../../../n-tire-hrms-app/src/app/pages/forms/hrmsemployee/hrmsemployee.component';
*/
//FK field services

//detail table services
import { bousermenuaccess } from './../../../model/bousermenuaccess.model';
import { bousermenuaccessComponent } from './../../../pages/forms/bousermenuaccess/bousermenuaccess.component';
import { bousermenuaccessService } from './../../../service/bousermenuaccess.service';
import { bomenumasterComponent } from './../bomenumaster/bomenumaster.component';
import { bomenumasterService } from './../../../service/bomenumaster.service';
import { bouserbranchaccess } from './../../../model/bouserbranchaccess.model';
import { bouserbranchaccessComponent } from './../../../pages/forms/bouserbranchaccess/bouserbranchaccess.component';

import { bobranchmasterComponent } from './../../../pages/forms/bobranchmaster/bobranchmaster.component';
import { bouserbranchaccessService } from './../../../service/bouserbranchaccess.service';
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
  selector: 'app-bousermaster',
  templateUrl: './bousermaster.component.html',
  styles: [`
  @media only screen and (max-width: 600px) {
        .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
        .mobile_btn{
          position: relative !important;
          bottom: 5px !important;
        }
      }
  `],
  providers: [KeyboardShortcutsService]
})



export class bousermasterComponent implements OnInit {
  formData: bousermaster;
  list: bousermaster[];

  Insertbouserbranchaccesses: any;
  Insertbousermenuaccesses: any;

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

  bfilterPopulate_bousermasters: boolean = false;
  bfilterPopulate_bousermenuaccesses: boolean = false;
  bfilterPopulate_bouserbranchaccesses: boolean = false;
  bousermaster_menuactions: any = []
  bousermenuaccess_menuactions: any = []
  @ViewChild('tbl_bousermenuaccesses', { static: false }) tbl_bousermenuaccesses: Ng2SmartTableComponent;
  bouserbranchaccess_menuactions: any = []
  @ViewChild('tbl_bouserbranchaccesses', { static: false }) tbl_bouserbranchaccesses: Ng2SmartTableComponent;

  bousermaster_Form: FormGroup;

  userroleid_List: DropDownValues[];
  branchid_List: DropDownValues[];
  branchid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  departmentid_List: DropDownValues[];
  designation_List: DropDownValues[];
  reportingto_List: DropDownValues[];
  reportingto_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  role_List: DropDownValues[];
  role_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  educationid_List: DropDownValues[];
  defaultlanguage_List: DropDownValues[];
  gender_List: DropDownValues[];
  nationality_List: DropDownValues[];
  bloodgroup_List: DropDownValues[];
  religion_List: DropDownValues[];
  maritalstatus_List: DropDownValues[];
  countryid_List: DropDownValues[];
  countryid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  stateid_List: DropDownValues[];
  stateid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  cityid_List: DropDownValues[];
  cityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  approvallevel_List: DropDownValues[];
  approvallevel_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  approvallevel1_List: DropDownValues[];
  approvallevel1_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  approvallevel2_List: DropDownValues[];
  approvallevel2_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  approvallevel3_List: DropDownValues[];
  approvallevel3_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  approvallevel4_List: DropDownValues[];
  approvallevel4_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  approvallevel5_List: DropDownValues[];
  approvallevel5_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  approvalleveltype1_List: DropDownValues[];
  approvalleveltype2_List: DropDownValues[];
  approvalleveltype3_List: DropDownValues[];
  approvalleveltype4_List: DropDownValues[];
  approvalleveltype5_List: DropDownValues[];

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
  @ViewChild('userphoto', { static: false }) userphoto: AttachmentComponent;
  @ViewChild('usersignature', { static: false }) usersignature: AttachmentComponent;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;



  bousermenuaccesses_visiblelist: any;
  bousermenuaccesses_hidelist: any;
  bouserbranchaccesses_visiblelist: any;
  bouserbranchaccesses_hidelist: any;

  Deleted_bousermenuaccess_IDs: string = "";
  bousermenuaccesses_ID: string = "1";
  bousermenuaccesses_selectedindex: any;
  Deleted_bouserbranchaccess_IDs: string = "";
  bouserbranchaccesses_ID: string = "2";
  bouserbranchaccesses_selectedindex: any;


  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private bousermaster_service: bousermasterService,
    private bomenumaster_service: bomenumasterService,
    //private bobranchmaster_service: bobranchmasterService,
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
    this.bousermaster_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      userid: [null],
      sourcefield: [null],
      sourcereference: [null],
      userroleid: [null],
      userroleiddesc: [null],
      branchid: [null],
      branchiddesc: [null],
      departmentid: [null],
      departmentiddesc: [null],
      usercode: [null],
      username: [null],
      shortname: [null],
      bio: [null],
      avatar: [null],
      designation: [null],
      designationdesc: [null],
      reportingto: [null],
      reportingtodesc: [null],
      role: [null],
      roledesc: [null],
      emailid: [null],
      mobilenumber: [null],
      password: [null],
      nextloginchangepassword: [null],
      validityfrom: [null],
      validityto: [null],
      educationid: [null],
      educationiddesc: [null],
      usersignature: [null],
      userphoto: [null],
      thumbnail: [null],
      emailpassword: [null],
      emailsignature: [null],
      dateofbirth: [null],
      defaultpage: [null],
      defaultlanguage: [null],
      defaultlanguagedesc: [null],
      layoutpage: [null],
      theme: [null],
      gender: [null],
      genderdesc: [null],
      nationality: [null],
      nationalitydesc: [null],
      bloodgroup: [null],
      bloodgroupdesc: [null],
      religion: [null],
      religiondesc: [null],
      maritalstatus: [null],
      maritalstatusdesc: [null],
      referencenumber: [null],
      address1: [null],
      address2: [null],
      countryid: [null],
      countryiddesc: [null],
      stateid: [null],
      stateiddesc: [null],
      cityid: [null],
      cityiddesc: [null],
      zipcode: [null],
      emergencycontactperson: [null],
      relationship: [null],
      cpphonenumber: [null],
      emailnotifications: [null],
      whatsappnotifications: [null],
      employeespecificapproval: [null],
      autoapproval: [null],
      approvallevel: [null],
      approvalleveldesc: [null],
      approvallevel1: [null],
      approvallevel1desc: [null],
      approvallevel2: [null],
      approvallevel2desc: [null],
      approvallevel3: [null],
      approvallevel3desc: [null],
      approvallevel4: [null],
      approvallevel4desc: [null],
      approvallevel5: [null],
      approvallevel5desc: [null],
      approvalleveltype1: [null],
      approvalleveltype1desc: [null],
      approvalleveltype2: [null],
      approvalleveltype2desc: [null],
      approvalleveltype3: [null],
      approvalleveltype3desc: [null],
      approvalleveltype4: [null],
      approvalleveltype4desc: [null],
      approvalleveltype5: [null],
      approvalleveltype5desc: [null],
      twitter: [null],
      facebook: [null],
      linkedin: [null],
      skype: [null],
      googleplus: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
      employeeid: [null],
    });
  }

  get f() { return this.bousermaster_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.bousermaster_Form.dirty && this.bousermaster_Form.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  //check Unique fields
  emailidexists(e: any) {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.emailid.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

    if (pos >= 0 && this.pkList[pos].userid.toString() != this.formid.toString()) {
      if (confirm("This Email value exists in the database.Do you want to display the record ? ")) {
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
  mobilenumberexists(e: any) {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.mobilenumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

    if (pos >= 0 && this.pkList[pos].userid.toString() != this.formid.toString()) {
      if (confirm("This Mobile Number value exists in the database.Do you want to display the record ? ")) {
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
  usercodeexists(e: any) {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.usercode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

    if (pos >= 0 && this.pkList[pos].userid.toString() != this.formid.toString()) {
      if (confirm("This User Code value exists in the database.Do you want to display the record ? ")) {
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
    let pos = this.pkList.map(function (e: any) { return e.userid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.userid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.userid && pkDetail) {
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
    let bousermasterid = null;

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
    this.formid = bousermasterid;
    //alert(bousermasterid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.Set_bousermenuaccesses_TableConfig();
      setTimeout(() => {
        //this.Set_bousermenuaccesses_TableDropDownConfig();
      });

      this.Set_bouserbranchaccesses_TableConfig();
      setTimeout(() => {
        //this.Set_bouserbranchaccesses_TableDropDownConfig();
      });

      this.FillCustomField();
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.bousermaster_service.getDefaultData().then(res => {
      this.userroleid_List = res.list_userroleid.value;
      this.branchid_List = res.list_branchid.value;
      this.departmentid_List = res.list_departmentid.value;
      this.designation_List = res.list_designation.value;
      this.reportingto_List = res.list_reportingto.value;
      this.role_List = res.list_role.value;
      this.educationid_List = res.list_educationid.value;
      this.defaultlanguage_List = res.list_defaultlanguage.value;
      this.gender_List = res.list_gender.value;
      this.nationality_List = res.list_nationality.value;
      this.bloodgroup_List = res.list_bloodgroup.value;
      this.religion_List = res.list_religion.value;
      this.maritalstatus_List = res.list_maritalstatus.value;
      this.countryid_List = res.list_countryid.value;
      this.stateid_List = res.list_stateid.value;
      this.cityid_List = res.list_cityid.value;
      this.approvallevel_List = res.list_approvallevel.value;
      this.approvallevel1_List = res.list_approvallevel1.value;
      this.approvallevel2_List = res.list_approvallevel2.value;
      this.approvallevel3_List = res.list_approvallevel3.value;
      this.approvallevel4_List = res.list_approvallevel4.value;
      this.approvallevel5_List = res.list_approvallevel5.value;
      this.approvalleveltype1_List = res.list_approvalleveltype1.value;
      this.approvalleveltype2_List = res.list_approvalleveltype2.value;
      this.approvalleveltype3_List = res.list_approvalleveltype3.value;
      this.approvalleveltype4_List = res.list_approvalleveltype4.value;
      this.approvalleveltype5_List = res.list_approvalleveltype5.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.bousermaster_service.get_bousermasters_List().then(res => {
      this.pkList = res as bousermaster[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched
    this.bousermaster_Form.markAsUntouched();
    this.bousermaster_Form.markAsPristine();
  }
  onSelected_branchid(branchidDetail: any) {
    if (branchidDetail.value && branchidDetail) {
      this.bousermaster_Form.patchValue({
        branchid: branchidDetail.value,
        branchiddesc: branchidDetail.label,

      });

    }
  }

  onSelected_reportingto(reportingtoDetail: any) {
    if (reportingtoDetail.value && reportingtoDetail) {
      this.bousermaster_Form.patchValue({
        reportingto: reportingtoDetail.value,
        reportingtodesc: reportingtoDetail.label,

      });

    }
  }

  onSelected_role(roleDetail: any) {
    if (roleDetail.value && roleDetail) {
      this.bousermaster_Form.patchValue({
        role: roleDetail.value,
        roledesc: roleDetail.label,

      });

    }
  }

  onSelected_countryid(countryidDetail: any) {
    if (countryidDetail.value && countryidDetail) {
      this.bousermaster_Form.patchValue({
        countryid: countryidDetail.value,
        countryiddesc: countryidDetail.label,

      });

    }
  }

  onSelected_stateid(stateidDetail: any) {
    if (stateidDetail.value && stateidDetail) {
      this.bousermaster_Form.patchValue({
        stateid: stateidDetail.value,
        stateiddesc: stateidDetail.label,

      });

    }
  }

  onSelected_cityid(cityidDetail: any) {
    if (cityidDetail.value && cityidDetail) {
      this.bousermaster_Form.patchValue({
        cityid: cityidDetail.value,
        cityiddesc: cityidDetail.label,

      });

    }
  }

  onSelected_approvallevel(approvallevelDetail: any) {
    if (approvallevelDetail.value && approvallevelDetail) {
      this.bousermaster_Form.patchValue({
        approvallevel: approvallevelDetail.value,
        approvalleveldesc: approvallevelDetail.label,

      });

    }
  }

  onSelected_approvallevel1(approvallevel1Detail: any) {
    if (approvallevel1Detail.value && approvallevel1Detail) {
      this.bousermaster_Form.patchValue({
        approvallevel1: approvallevel1Detail.value,
        approvallevel1desc: approvallevel1Detail.label,

      });

    }
  }

  onSelected_approvallevel2(approvallevel2Detail: any) {
    if (approvallevel2Detail.value && approvallevel2Detail) {
      this.bousermaster_Form.patchValue({
        approvallevel2: approvallevel2Detail.value,
        approvallevel2desc: approvallevel2Detail.label,

      });

    }
  }

  onSelected_approvallevel3(approvallevel3Detail: any) {
    if (approvallevel3Detail.value && approvallevel3Detail) {
      this.bousermaster_Form.patchValue({
        approvallevel3: approvallevel3Detail.value,
        approvallevel3desc: approvallevel3Detail.label,

      });

    }
  }

  onSelected_approvallevel4(approvallevel4Detail: any) {
    if (approvallevel4Detail.value && approvallevel4Detail) {
      this.bousermaster_Form.patchValue({
        approvallevel4: approvallevel4Detail.value,
        approvallevel4desc: approvallevel4Detail.label,

      });

    }
  }

  onSelected_approvallevel5(approvallevel5Detail: any) {
    if (approvallevel5Detail.value && approvallevel5Detail) {
      this.bousermaster_Form.patchValue({
        approvallevel5: approvallevel5Detail.value,
        approvallevel5desc: approvallevel5Detail.label,

      });

    }
  }




  getuserphoto() {
    debugger;
    if (this.userphoto.getAttachmentList().length > 0) {
      let file = this.userphoto.getAttachmentList()[0];
      this.sharedService.geturl(file.filekey, file.type);
    }
  }
  getusersignature() {
    debugger;
    if (this.usersignature.getAttachmentList().length > 0) {
      let file = this.usersignature.getAttachmentList()[0];
      this.sharedService.geturl(file.filekey, file.type);
    }
  }
  resetForm() {
    if (this.bousermaster_Form != null)
      this.bousermaster_Form.reset();
    this.bousermaster_Form.patchValue({
      branchid: this.sessionData.branchid,
      branchiddesc: this.sessionData.branchiddesc,
      reportingto: this.sessionData.userid,
      reportingtodesc: this.sessionData.username,
      approvallevel: this.sessionData.userid,
      approvalleveldesc: this.sessionData.username,
      approvallevel1: this.sessionData.userid,
      approvallevel1desc: this.sessionData.username,
      approvallevel2: this.sessionData.userid,
      approvallevel2desc: this.sessionData.username,
      approvallevel3: this.sessionData.userid,
      approvallevel3desc: this.sessionData.username,
      approvallevel4: this.sessionData.userid,
      approvallevel4desc: this.sessionData.username,
      approvallevel5: this.sessionData.userid,
      approvallevel5desc: this.sessionData.username,
    });
    this.bousermaster_Form.patchValue({
      validityfrom: this.ngbDateParserFormatter.parse(new Date().toString()),
      validityto: this.ngbDateParserFormatter.parse(this.sharedService.addMonths(new Date(), 6).toString()),
      educationid: 6,
      dateofbirth: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      defaultlanguage: 11,
    });
    setTimeout(() => {
      this.Insertbousermenuaccesses = [];
      this.bousermenuaccesses_LoadTable();
      this.Insertbouserbranchaccesses = [];
      this.bouserbranchaccesses_LoadTable();
    });
    this.customfieldservice.reset(document);
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    if (this.data != null) {
      this.bousermaster_Form.patchValue({
        sourcefield: this.data.sourcefield, sourcereference: this.data.sourcereference
      });
    }
  }

  onDelete() {
    let userid = this.bousermaster_Form.get('userid').value;
    if (userid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.bousermaster_service.delete_bousermaster(userid).then(res => {
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
    this.bousermaster_Form.patchValue({
      userid: null
    });
    if (this.formData.userid != null) this.formData.userid = null;
    for (let i = 0; i < this.tbl_bousermenuaccesses.source.length; i++) {
      this.tbl_bousermenuaccesses.source[i].usermenuaccessid = null;
    }
    for (let i = 0; i < this.tbl_bouserbranchaccesses.source.length; i++) {
      this.tbl_bouserbranchaccesses.source[i].accessid = null;
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
          else if (key == "validityfrom")
            this.bousermaster_Form.patchValue({ "validityfrom": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "validityto")
            this.bousermaster_Form.patchValue({ "validityto": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "dateofbirth")
            this.bousermaster_Form.patchValue({ "dateofbirth": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (ctrltype == "string") {
            this.bousermaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.bousermaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.bousermaster_Form.controls[key] != undefined) {
                this.bousermaster_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("bousermasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
      this.customFieldServiceList = res;
      if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
      return res;
    });


  }
  onClose() {
    this.dialogRef.close(this.objvalues);
  }
  goBack(){

    this.router.navigate(['/home/boreportviewer/e99kq']);

}
  onSubmitAndWait() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.username != null) {
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
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.username != null) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  userroleid_onChange(evt: any) {
    let e = evt.value;
    this.bousermaster_Form.patchValue({ userroleiddesc: evt.options[evt.options.selectedIndex].text });
  }
  branchid_onChange(evt: any) {
    let e = evt.value;
  }
  departmentid_onChange(evt: any) {
    let e = evt.value;
    this.bousermaster_Form.patchValue({ departmentiddesc: evt.options[evt.options.selectedIndex].text });
  }
  designation_onChange(evt: any) {
    let e = evt.value;
    this.bousermaster_Form.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
  }
  reportingto_onChange(evt: any) {
    let e = evt.value;
  }
  role_onChange(evt: any) {
    let e = evt.value;
  }
  educationid_onChange(evt: any) {
    let e = evt.value;
    this.bousermaster_Form.patchValue({ educationiddesc: evt.options[evt.options.selectedIndex].text });
  }
  defaultlanguage_onChange(evt: any) {
    let e = evt.value;
    this.bousermaster_Form.patchValue({ defaultlanguagedesc: evt.options[evt.options.selectedIndex].text });
  }
  gender_onChange(evt: any) {
    let e = this.f.gender.value as any;
    this.bousermaster_Form.patchValue({ genderdesc: evt.options[evt.options.selectedIndex].text });
  }
  nationality_onChange(evt: any) {
    let e = this.f.nationality.value as any;
    this.bousermaster_Form.patchValue({ nationalitydesc: evt.options[evt.options.selectedIndex].text });
  }
  bloodgroup_onChange(evt: any) {
    let e = this.f.bloodgroup.value as any;
    this.bousermaster_Form.patchValue({ bloodgroupdesc: evt.options[evt.options.selectedIndex].text });
  }
  religion_onChange(evt: any) {
    let e = this.f.religion.value as any;
    this.bousermaster_Form.patchValue({ religiondesc: evt.options[evt.options.selectedIndex].text });
  }
  maritalstatus_onChange(evt: any) {
    let e = this.f.maritalstatus.value as any;
    this.bousermaster_Form.patchValue({ maritalstatusdesc: evt.options[evt.options.selectedIndex].text });
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
  approvallevel_onChange(evt: any) {
    let e = evt.value;
  }
  approvallevel1_onChange(evt: any) {
    let e = evt.value;
  }
  approvallevel2_onChange(evt: any) {
    let e = evt.value;
  }
  approvallevel3_onChange(evt: any) {
    let e = evt.value;
  }
  approvallevel4_onChange(evt: any) {
    let e = evt.value;
  }
  approvallevel5_onChange(evt: any) {
    let e = evt.value;
  }
  approvalleveltype1_onChange(evt: any) {
    let e = this.f.approvalleveltype1.value as any;
    this.bousermaster_Form.patchValue({ approvalleveltype1desc: evt.options[evt.options.selectedIndex].text });
  }
  approvalleveltype2_onChange(evt: any) {
    let e = this.f.approvalleveltype2.value as any;
    this.bousermaster_Form.patchValue({ approvalleveltype2desc: evt.options[evt.options.selectedIndex].text });
  }
  approvalleveltype3_onChange(evt: any) {
    let e = this.f.approvalleveltype3.value as any;
    this.bousermaster_Form.patchValue({ approvalleveltype3desc: evt.options[evt.options.selectedIndex].text });
  }
  approvalleveltype4_onChange(evt: any) {
    let e = this.f.approvalleveltype4.value as any;
    this.bousermaster_Form.patchValue({ approvalleveltype4desc: evt.options[evt.options.selectedIndex].text });
  }
  approvalleveltype5_onChange(evt: any) {
    let e = this.f.approvalleveltype5.value as any;
    this.bousermaster_Form.patchValue({ approvalleveltype5desc: evt.options[evt.options.selectedIndex].text });
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



  edit_bousermasters() {
    this.showview = false;
    setTimeout(() => {
      if (this.userphoto != null && this.userphoto != undefined) this.userphoto.setattachmentlist(this.bousermaster_Form.get('userphoto').value);
      if (this.usersignature != null && this.usersignature != undefined) this.usersignature.setattachmentlist(this.bousermaster_Form.get('usersignature').value);
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.bousermaster_service.get_bousermasters_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.bousermaster;
      let formproperty = res.bousermaster.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.bousermaster.pkcol;
      this.formid = res.bousermaster.userid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.bousermaster;
    this.formid = res.bousermaster.userid;
    this.pkcol = res.bousermaster.pkcol;
    this.bmyrecord = false;
    if ((res.bousermaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.bousermaster_Form.patchValue({
      userid: res.bousermaster.userid,
      sourcefield: res.bousermaster.sourcefield,
      sourcereference: res.bousermaster.sourcereference,
      userroleid: res.bousermaster.userroleid,
      userroleiddesc: res.bousermaster.userroleiddesc,
      branchid: res.bousermaster.branchid,
      branchiddesc: res.bousermaster.branchiddesc,
      departmentid: res.bousermaster.departmentid,
      departmentiddesc: res.bousermaster.departmentiddesc,
      usercode: res.bousermaster.usercode,
      username: res.bousermaster.username,
      shortname: res.bousermaster.shortname,
      bio: res.bousermaster.bio,
      avatar: res.bousermaster.avatar,
      designation: res.bousermaster.designation,
      designationdesc: res.bousermaster.designationdesc,
      reportingto: res.bousermaster.reportingto,
      reportingtodesc: res.bousermaster.reportingtodesc,
      role: res.bousermaster.role,
      roledesc: res.bousermaster.roledesc,
      emailid: res.bousermaster.emailid,
      mobilenumber: res.bousermaster.mobilenumber,
      password: res.bousermaster.password,
      nextloginchangepassword: res.bousermaster.nextloginchangepassword,
      validityfrom: this.ngbDateParserFormatter.parse(res.bousermaster.validityfrom),
      validityto: this.ngbDateParserFormatter.parse(res.bousermaster.validityto),
      educationid: res.bousermaster.educationid,
      educationiddesc: res.bousermaster.educationiddesc,
      usersignature: JSON.parse(res.bousermaster.usersignature),
      userphoto: JSON.parse(res.bousermaster.userphoto),
      thumbnail: res.bousermaster.thumbnail,
      emailpassword: res.bousermaster.emailpassword,
      emailsignature: res.bousermaster.emailsignature,
      dateofbirth: this.ngbDateParserFormatter.parse(res.bousermaster.dateofbirth),
      defaultpage: res.bousermaster.defaultpage,
      defaultlanguage: res.bousermaster.defaultlanguage,
      defaultlanguagedesc: res.bousermaster.defaultlanguagedesc,
      layoutpage: res.bousermaster.layoutpage,
      theme: res.bousermaster.theme,
      gender: res.bousermaster.gender,
      genderdesc: res.bousermaster.genderdesc,
      nationality: res.bousermaster.nationality,
      nationalitydesc: res.bousermaster.nationalitydesc,
      bloodgroup: res.bousermaster.bloodgroup,
      bloodgroupdesc: res.bousermaster.bloodgroupdesc,
      religion: res.bousermaster.religion,
      religiondesc: res.bousermaster.religiondesc,
      maritalstatus: res.bousermaster.maritalstatus,
      maritalstatusdesc: res.bousermaster.maritalstatusdesc,
      referencenumber: res.bousermaster.referencenumber,
      address1: res.bousermaster.address1,
      address2: res.bousermaster.address2,
      countryid: res.bousermaster.countryid,
      countryiddesc: res.bousermaster.countryiddesc,
      stateid: res.bousermaster.stateid,
      stateiddesc: res.bousermaster.stateiddesc,
      cityid: res.bousermaster.cityid,
      cityiddesc: res.bousermaster.cityiddesc,
      zipcode: res.bousermaster.zipcode,
      emergencycontactperson: res.bousermaster.emergencycontactperson,
      relationship: res.bousermaster.relationship,
      cpphonenumber: res.bousermaster.cpphonenumber,
      emailnotifications: res.bousermaster.emailnotifications,
      whatsappnotifications: res.bousermaster.whatsappnotifications,
      employeespecificapproval: res.bousermaster.employeespecificapproval,
      autoapproval: res.bousermaster.autoapproval,
      approvallevel: res.bousermaster.approvallevel,
      approvalleveldesc: res.bousermaster.approvalleveldesc,
      approvallevel1: res.bousermaster.approvallevel1,
      approvallevel1desc: res.bousermaster.approvallevel1desc,
      approvallevel2: res.bousermaster.approvallevel2,
      approvallevel2desc: res.bousermaster.approvallevel2desc,
      approvallevel3: res.bousermaster.approvallevel3,
      approvallevel3desc: res.bousermaster.approvallevel3desc,
      approvallevel4: res.bousermaster.approvallevel4,
      approvallevel4desc: res.bousermaster.approvallevel4desc,
      approvallevel5: res.bousermaster.approvallevel5,
      approvallevel5desc: res.bousermaster.approvallevel5desc,
      approvalleveltype1: res.bousermaster.approvalleveltype1,
      approvalleveltype1desc: res.bousermaster.approvalleveltype1desc,
      approvalleveltype2: res.bousermaster.approvalleveltype2,
      approvalleveltype2desc: res.bousermaster.approvalleveltype2desc,
      approvalleveltype3: res.bousermaster.approvalleveltype3,
      approvalleveltype3desc: res.bousermaster.approvalleveltype3desc,
      approvalleveltype4: res.bousermaster.approvalleveltype4,
      approvalleveltype4desc: res.bousermaster.approvalleveltype4desc,
      approvalleveltype5: res.bousermaster.approvalleveltype5,
      approvalleveltype5desc: res.bousermaster.approvalleveltype5desc,
      twitter: res.bousermaster.twitter,
      facebook: res.bousermaster.facebook,
      linkedin: res.bousermaster.linkedin,
      skype: res.bousermaster.skype,
      googleplus: res.bousermaster.googleplus,
      customfield: res.bousermaster.customfield,
      attachment: JSON.parse(res.bousermaster.attachment),
      status: res.bousermaster.status,
      statusdesc: res.bousermaster.statusdesc,
      employeeid: res.bousermaster.employeeid,
    });
    this.bousermaster_menuactions = res.bousermaster_menuactions;
    this.bousermenuaccess_menuactions = res.bousermenuaccess_menuactions;
    this.bousermenuaccesses_visiblelist = res.bousermenuaccesses_visiblelist;
    this.bouserbranchaccess_menuactions = res.bouserbranchaccess_menuactions;
    this.bouserbranchaccesses_visiblelist = res.bouserbranchaccesses_visiblelist;
    if (this.bousermaster_Form.get('customfield').value != null && this.bousermaster_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.bousermaster_Form.get('customfield').value);
    this.FillCustomField();
    if (this.bousermaster_Form.get('userphoto').value != null && this.bousermaster_Form.get('userphoto').value != "" && this.userphoto != null && this.userphoto != undefined) this.userphoto.setattachmentlist(this.bousermaster_Form.get('userphoto').value);
    if (this.bousermaster_Form.get('usersignature').value != null && this.bousermaster_Form.get('usersignature').value != "" && this.usersignature != null && this.usersignature != undefined) this.usersignature.setattachmentlist(this.bousermaster_Form.get('usersignature').value);
    if (this.bousermaster_Form.get('attachment').value != null && this.bousermaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.bousermaster_Form.get('attachment').value);
    //Child Tables if any
    this.Set_bousermenuaccesses_TableConfig();
    this.bousermenuaccesses_LoadTable(res.bousermenuaccesses);
    this.Insertbousermenuaccesses = [];
    this.Set_bouserbranchaccesses_TableConfig();
    this.bouserbranchaccesses_LoadTable(res.bouserbranchaccesses);
    this.Insertbouserbranchaccesses = [];
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.bousermaster_Form.controls) {
      let val = this.bousermaster_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.bousermaster_Form.controls[key] != null) {
        if (key == "userphoto" || key == "usersignature") {
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
    if (!this.bousermaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.bousermaster_Form.getRawValue();
    obj.validityfrom = new Date(this.bousermaster_Form.get('validityfrom').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('validityfrom').value) + '  UTC' : null);
    obj.validityto = new Date(this.bousermaster_Form.get('validityto').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('validityto').value) + '  UTC' : null);
    obj.dateofbirth = new Date(this.bousermaster_Form.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('dateofbirth').value) + '  UTC' : null);
    if (customfields != null) obj.customfield = JSON.stringify(customfields);
    if (this.userphoto.getAttachmentList() != null) obj.userphoto = JSON.stringify(this.userphoto.getAttachmentList());
    if (this.userphoto.getAttachmentList() != null) obj.userphoto = JSON.stringify(this.userphoto.getAttachmentList());
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(obj);
    if (!confirm('Do you want to want to save?')) {
      return;
    }
    await this.sharedService.upload(this.userphoto.getAllFiles());
    await this.sharedService.upload(this.usersignature.getAllFiles());
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
    // Object.keys(this.bousermaster_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.bousermaster_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.bousermaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.bousermaster_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.bousermaster_Form.controls[key] != null) {
            this.formData[key] = this.bousermaster_Form.controls[key].value;
          }
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    this.formData.validityfrom = new Date(this.bousermaster_Form.get('validityfrom').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('validityfrom').value) + '  UTC' : null);
    this.formData.validityto = new Date(this.bousermaster_Form.get('validityto').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('validityto').value) + '  UTC' : null);
    this.formData.usersignature = this.bousermaster_Form.get('usersignature').value;
    this.formData.userphoto = this.bousermaster_Form.get('userphoto').value;
    this.formData.dateofbirth = new Date(this.bousermaster_Form.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('dateofbirth').value) + '  UTC' : null);
    if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.formData.Deleted_bousermenuaccess_IDs = this.Deleted_bousermenuaccess_IDs;
    this.formData.Deleted_bouserbranchaccess_IDs = this.Deleted_bouserbranchaccess_IDs;
    if (this.userphoto.getAttachmentList() != null) this.formData.userphoto = JSON.stringify(this.userphoto.getAttachmentList());
    if (this.userphoto.getAttachmentList() != null) this.formData.userphoto = JSON.stringify(this.userphoto.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.bousermaster_service.saveOrUpdate_bousermasters(this.formData, this.tbl_bousermenuaccesses?.source?.data, this.Insertbousermenuaccesses, this.tbl_bouserbranchaccesses?.source?.data, this.Insertbouserbranchaccesses,).subscribe(
      async res => {
        await this.sharedService.upload(this.userphoto.getAllFiles());
        await this.sharedService.upload(this.usersignature.getAllFiles());
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        if (this.tbl_bousermenuaccesses.source) {
          for (let i = 0; i < this.tbl_bousermenuaccesses.source.data.length; i++) {
            if (this.tbl_bousermenuaccesses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bousermenuaccesses.source.data[i].fileAttachmentList);
          }
        }
        if (this.tbl_bouserbranchaccesses.source) {
          for (let i = 0; i < this.tbl_bouserbranchaccesses.source.data.length; i++) {
            if (this.tbl_bouserbranchaccesses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bouserbranchaccesses.source.data[i].fileAttachmentList);
          }
        }
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).bousermaster);
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
            this.objvalues.push((res as any).bousermaster);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.bousermaster_Form.markAsUntouched();
        this.bousermaster_Form.markAsPristine();
      },
      err => {
        debugger;
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }




  viewemployeeid() {
    /*
    this.dialog.open(hrmsemployeeComponent,
      {
        data: { showview: false,save:true,pkcol:this.sharedService.pk_encode(this.bousermaster_Form.get('employeeid').value), ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
    });
    */
  }
  //dropdown edit from the screen itself -> One screen like Reportviewer
  clearList() {
    this.tbl_bousermenuaccesses.source = new LocalDataSource();
    this.tbl_bouserbranchaccesses.source = new LocalDataSource();
  }



  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes bousermenuaccesses
  async onCustom_bousermenuaccesses_Action(event: any) {
    debugger;
    switch (event.action) {
      case 'viewrecord':
        let val = event.data.pkcol;
        this.dialog.open(bomenumasterComponent,
          {
            data: { showview: false, pkcol: val, ScreenType: 2 },
          }
        ).onClose.subscribe(res => {
        });
        break;
    }
    let objbomenuaction = await this.sharedService.onCustomAction(event, "bousermenuaccesses");
    let formname = (objbomenuaction as any).actionname;
  }
  bousermenuaccesses_settings: any;

  show_bousermenuaccesses_Checkbox() {
    debugger;
    if (this.tbl_bousermenuaccesses.source.settings['selectMode'] == 'multi') this.tbl_bousermenuaccesses.source.settings['selectMode'] = 'single';
    else
      this.tbl_bousermenuaccesses.source.settings['selectMode'] = 'multi';
    this.tbl_bousermenuaccesses.source.initGrid();
  }
  delete_bousermenuaccesses_All() {
    this.tbl_bousermenuaccesses.source.settings['selectMode'] = 'single';
  }
  show_bousermenuaccesses_Filter() {
    setTimeout(() => {
      //  this.Set_bousermenuaccesses_TableDropDownConfig();
    });
    if (this.tbl_bousermenuaccesses.source.settings != null) this.tbl_bousermenuaccesses.source.settings['hideSubHeader'] = !this.tbl_bousermenuaccesses.source.settings['hideSubHeader'];
    this.tbl_bousermenuaccesses.source.initGrid();
  }
  show_bousermenuaccesses_InActive() {
  }
  enable_bousermenuaccesses_InActive() {
  }
  async Set_bousermenuaccesses_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_bousermenuaccesses) {
    }
    this.bfilterPopulate_bousermenuaccesses = true;
  }
  async bousermenuaccesses_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_bousermenuaccesses_TableConfig() {
    this.bousermenuaccesses_settings = {
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
        usermenuaccessid: {
          title: 'User Menu Access',
          type: '',
        },
        menuid: {
          title: 'Menu',
          type: '',
        },
        menudescription: {
          title: 'Menudescription',
          type: '',
        },
        menuurl: {
          title: 'Menuurl',
          type: '',
        },
        parentid: {
          title: 'Parentid',
          type: '',
        },
      },
    };
  }
  bousermenuaccesses_LoadTable(bousermenuaccesses = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousermenuaccesses_ID) >= 0) {
      if (this.tbl_bousermenuaccesses != undefined) this.tbl_bousermenuaccesses.source = new LocalDataSource();
      if (this.tbl_bousermenuaccesses != undefined) this.tbl_bousermenuaccesses.source.load(bousermenuaccesses as any as LocalDataSource);
      setTimeout(() => {
        if (this.tbl_bousermenuaccesses.source != null) {
          this.tbl_bousermenuaccesses.source.grid.getRows().forEach((row: any) => {
            if (row.data.usermenuaccessid != null && row.data.usermenuaccessid != "") {
              this.Insertbousermenuaccesses.push(row.data);
              this.tbl_bousermenuaccesses.source.grid.multipleSelectRow(row);
            }
          });
        }
      });
    }
  }

  //external to inline
  /*
  bousermenuaccesses_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.bousermaster_service.bousermenuaccesses.length == 0)
  {
      this.tbl_bousermenuaccesses.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new bousermenuaccess();
      this.bousermaster_service.bousermenuaccesses.push(obj);
      this.tbl_bousermenuaccesses.source.refresh();
      if ((this.bousermaster_service.bousermenuaccesses.length / this.tbl_bousermenuaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bousermenuaccesses.source.getPaging().page)
      {
          this.tbl_bousermenuaccesses.source.setPage((this.bousermaster_service.bousermenuaccesses.length / this.tbl_bousermenuaccesses.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_bousermenuaccesses.source.grid.edit(this.tbl_bousermenuaccesses.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_bousermenuaccesses.source.data.indexOf(event.data);
  this.onDelete_bousermenuaccess(event,event.data.usermenuaccessid,((this.tbl_bousermenuaccesses.source.getPaging().page-1) *this.tbl_bousermenuaccesses.source.getPaging().perPage)+index);
  this.tbl_bousermenuaccesses.source.refresh();
  break;
  }
  }

  */
  bousermenuaccesses_Paging(val) {
    debugger;
    this.tbl_bousermenuaccesses.source.setPaging(1, val, true);
  }

  handle_bousermenuaccesses_GridSelected(event: any) {
    debugger;

    if (event.isSelected) {
      if (event.data.usermenuaccessid == null || event.data.usermenuaccessid == "") {
        var obj = { userid: this.formid, menuid: event.data.menuid }
        this.Insertbousermenuaccesses.push(obj as any);
      }
      else {
        var deletedids = this.Deleted_bousermenuaccess_IDs.split(',');

        let i: number = 0;
        deletedids.forEach(id => {
          if (id == event.data.usermenuaccessid) {
            deletedids.splice(i, 1);
          }
          i++;
        });
        deletedids.join(",");
      }
    }
    else {
      if (event.data.usermenuaccessid != null && event.data.usermenuaccessid != "") this.Deleted_bousermenuaccess_IDs += event.data.usermenuaccessid + ",";
    }
  }
  Is_bousermenuaccesses_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousermenuaccesses_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes bousermenuaccesses
  //start of Grid Codes bouserbranchaccesses
  async onCustom_bouserbranchaccesses_Action(event: any) {
    debugger;
    switch (event.action) {
      case 'viewrecord':
        let val = event.data.pkcol;
        this.dialog.open(bobranchmasterComponent,
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
        branchid: {
          title: 'Branch',
          type: '',
        },
        branchcode: {
          title: 'Branchcode',
          type: '',
        },
        branchname: {
          title: 'Branchname',
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
  if (this.bousermaster_service.bouserbranchaccesses.length == 0)
  {
      this.tbl_bouserbranchaccesses.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new bouserbranchaccess();
      this.bousermaster_service.bouserbranchaccesses.push(obj);
      this.tbl_bouserbranchaccesses.source.refresh();
      if ((this.bousermaster_service.bouserbranchaccesses.length / this.tbl_bouserbranchaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bouserbranchaccesses.source.getPaging().page)
      {
          this.tbl_bouserbranchaccesses.source.setPage((this.bousermaster_service.bouserbranchaccesses.length / this.tbl_bouserbranchaccesses.source.getPaging().perPage).toFixed(0) + 1);
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
        var obj = { userid: this.formid, branchid: event.data.branchid }
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

}



