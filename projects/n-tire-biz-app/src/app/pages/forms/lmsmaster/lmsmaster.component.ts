import { lmsmasterService } from './../../../service/lmsmaster.service';
import { lmsmaster } from './../../../model/lmsmaster.model';
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
import { lmsopportunity } from './../../../model/lmsopportunity.model';
import { lmsopportunityComponent } from './../../../pages/forms/lmsopportunity/lmsopportunity.component';
import { lmsopportunityService } from './../../../service/lmsopportunity.service';
import { lmscall } from './../../../model/lmscall.model';
import { lmscallComponent } from './../../../pages/forms/lmscall/lmscall.component';
import { lmscallService } from './../../../service/lmscall.service';
import { lmscorporatesecondarycontact } from './../../../model/lmscorporatesecondarycontact.model';
import { lmscorporatesecondarycontactComponent } from './../../../pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.component';
import { lmscorporatesecondarycontactService } from './../../../service/lmscorporatesecondarycontact.service';
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
  selector: 'app-lmsmaster',
  templateUrl: './lmsmaster.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class lmsmasterComponent implements OnInit {
  formData: lmsmaster;
  list: lmsmaster[];
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

  bfilterPopulate_lmsmasters: boolean = false;
  bfilterPopulate_lmsopportunities: boolean = false;
  bfilterPopulate_lmscalls: boolean = false;
  bfilterPopulate_lmscorporatesecondarycontacts: boolean = false;
  lmsmaster_menuactions: any = []
  lmsopportunity_menuactions: any = []
  @ViewChild('tbl_lmsopportunities', { static: false }) tbl_lmsopportunities: Ng2SmartTableComponent;
  lmscall_menuactions: any = []
  @ViewChild('tbl_lmscalls', { static: false }) tbl_lmscalls: Ng2SmartTableComponent;
  lmscorporatesecondarycontact_menuactions: any = []
  @ViewChild('tbl_lmscorporatesecondarycontacts', { static: false }) tbl_lmscorporatesecondarycontacts: Ng2SmartTableComponent;

  lmsmaster_Form: FormGroup;

  branchid_List: any[];
  branchid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  branchlocationid_List: DropDownValues[];
  branchlocationid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  iscorporate_List: DropDownValues[];
  leadowner_List: DropDownValues[];
  leadowner_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  companytypeid_List: DropDownValues[];
  categoryid_List: DropDownValues[];
  subcategoryid_List: DropDownValues[];
  groupname_List: DropDownValues[];
  salutation_List: DropDownValues[];
  designation_List: DropDownValues[];
  leadtype_List: DropDownValues[];
  leadsource_List: DropDownValues[];
  campaignid_List: DropDownValues[];
  segment_List: DropDownValues[];
  businessvertical_List: DropDownValues[];
  revenue_List: DropDownValues[];
  employees_List: DropDownValues[];
  language_List: DropDownValues[];
  paymentterms_List: DropDownValues[];
  leadstatus_List: DropDownValues[];

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
  @ViewChild('photo', { static: false }) photo: AttachmentComponent;
  @ViewChild('thumbnail', { static: false }) thumbnail: AttachmentComponent;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;

  companynamevisible: boolean = false;
  websitevisible: boolean = false;
  secondarycontactsvisible: boolean = false;


  lmsopportunities_visiblelist: any;
  lmsopportunities_hidelist: any;
  lmscalls_visiblelist: any;
  lmscalls_hidelist: any;
  lmscorporatesecondarycontacts_visiblelist: any;
  lmscorporatesecondarycontacts_hidelist: any;

  Deleted_lmsopportunity_IDs: string = "";
  lmsopportunities_ID: string = "1";
  lmsopportunities_selectedindex: any;
  Deleted_lmscall_IDs: string = "";
  lmscalls_ID: string = "2";
  lmscalls_selectedindex: any;
  Deleted_lmscorporatesecondarycontact_IDs: string = "";
  lmscorporatesecondarycontacts_ID: string = "3";
  lmscorporatesecondarycontacts_selectedindex: any;


  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private lmsmaster_service: lmsmasterService,
    private lmsopportunity_service: lmsopportunityService,
    private lmscall_service: lmscallService,
    private lmscorporatesecondarycontact_service: lmscorporatesecondarycontactService,
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
    this.lmsmaster_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      branchid: [null],
      branchiddesc: [null],
      branchlocationid: [null],
      branchlocationiddesc: [null],
      leadid: [null],
      iscorporate: [null],
      iscorporatedesc: [null],
      companyname: [null],
      leadowner: [null],
      leadownerdesc: [null],
      firstname: [null, Validators.compose([Validators.required])],
      lastname: [null, Validators.compose([Validators.required])],
      emailid: [null, Validators.compose([Validators.required])],
      companytypeid: [null],
      companytypeiddesc: [null],
      categoryid: [null],
      categoryiddesc: [null],
      subcategoryid: [null],
      subcategoryiddesc: [null],
      groupname: [null],
      groupnamedesc: [null],
      salutation: [null],
      salutationdesc: [null],
      designation: [null],
      designationdesc: [null],
      contactno: [null],
      address: [null],
      website: [null],
      datecreated: [null],
      leadtype: [null],
      leadtypedesc: [null],
      leadsource: [null],
      leadsourcedesc: [null],
      leaddate: [null],
      nextcontactduedate: [null],
      campaignid: [null],
      campaigniddesc: [null],
      rating: [null],
      segment: [null],
      segmentdesc: [null],
      businessvertical: [null],
      businessverticaldesc: [null],
      revenue: [null],
      revenuedesc: [null],
      employees: [null],
      employeesdesc: [null],
      language: [null],
      languagedesc: [null],
      crosssellopportunity: [null],
      successrate: [null],
      businessvalue: [null],
      subscribedemail: [null],
      shippingaddress: [null],
      billingaddress: [null],
      photo: [null],
      thumbnail: [null],
      paymentterms: [null],
      paymenttermsdesc: [null],
      socialmedia: [null],
      leadstatus: [null],
      leadstatusdesc: [null],
      notes: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.lmsmaster_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.lmsmaster_Form.dirty && this.lmsmaster_Form.touched) {
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

    if (pos >= 0 && this.pkList[pos].leadid.toString() != this.formid.toString()) {
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

  //navigation buttons
  first() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
  }

  last() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
  }

  prev() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.leadid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.leadid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.leadid && pkDetail) {
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
    let lmsmasterid = null;

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
    this.formid = lmsmasterid;
    //alert(lmsmasterid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.Set_lmsopportunities_TableConfig();
      setTimeout(() => {
        //this.Set_lmsopportunities_TableDropDownConfig();
      });

      this.Set_lmscalls_TableConfig();
      setTimeout(() => {
        //this.Set_lmscalls_TableDropDownConfig();
      });

      this.Set_lmscorporatesecondarycontacts_TableConfig();
      setTimeout(() => {
        //this.Set_lmscorporatesecondarycontacts_TableDropDownConfig();
      });

      this.FillCustomField();
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }
    this.lmsmaster_service.getDefaultData().then(res => {
      this.branchid_List = res.list_branchid.value;
      this.iscorporate_List = res.list_iscorporate.value;
      this.leadowner_List = res.list_leadowner.value;
      this.companytypeid_List = res.list_companytypeid.value;
      this.categoryid_List = res.list_categoryid.value;
      this.groupname_List = res.list_groupname.value;
      this.salutation_List = res.list_salutation.value;
      this.designation_List = res.list_designation.value;
      this.leadtype_List = res.list_leadtype.value;
      this.leadsource_List = res.list_leadsource.value;
      this.campaignid_List = res.list_campaignid.value;
      this.segment_List = res.list_segment.value;
      this.businessvertical_List = res.list_businessvertical.value;
      this.revenue_List = res.list_revenue.value;
      this.employees_List = res.list_employees.value;
      this.language_List = res.list_language.value;
      this.paymentterms_List = res.list_paymentterms.value;
      this.leadstatus_List = res.list_leadstatus.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.lmsmaster_service.get_lmsmasters_List().then(res => {
      this.pkList = res as lmsmaster[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched 
    this.lmsmaster_Form.markAsUntouched();
    this.lmsmaster_Form.markAsPristine();
  }
  onSelected_branchid(branchidDetail: any) {
    if (branchidDetail.value && branchidDetail) {
      this.lmsmaster_Form.patchValue({
        branchid: branchidDetail.value,
        branchiddesc: branchidDetail.label,

      });
      this.lmsmaster_service.getList_branchlocationid(branchidDetail.value).then(res => {
        this.branchlocationid_List = res as DropDownValues[]
      }).catch((err) => { this.spinner.hide(); console.log(err); });

    }
  }

  onSelected_branchlocationid(branchlocationidDetail: any) {
    if (branchlocationidDetail.value && branchlocationidDetail) {
      this.lmsmaster_Form.patchValue({
        branchlocationid: branchlocationidDetail.value,
        branchlocationiddesc: branchlocationidDetail.label,

      });

    }
  }

  onSelected_leadowner(leadownerDetail: any) {
    if (leadownerDetail.value && leadownerDetail) {
      this.lmsmaster_Form.patchValue({
        leadowner: leadownerDetail.value,
        leadownerdesc: leadownerDetail.label,

      });

    }
  }




  getphoto() {
    debugger;
    if (this.photo.getAttachmentList().length > 0) {
      let file = this.photo.getAttachmentList()[0];
      this.sharedService.geturl(file.filekey, file.type);
    }
  }
  getthumbnail() {
    debugger;
    if (this.thumbnail.getAttachmentList().length > 0) {
      let file = this.thumbnail.getAttachmentList()[0];
      this.sharedService.geturl(file.filekey, file.type);
    }
  }
  resetForm() {
    if (this.lmsmaster_Form != null)
      this.lmsmaster_Form.reset();
    this.lmsmaster_Form.patchValue({
      branchid: this.sessionData.branchid,
      branchiddesc: this.sessionData.branchiddesc,
      leadowner: this.sessionData.userid,
      leadownerdesc: this.sessionData.username,
    });
    this.lmsmaster_Form.patchValue({
      leadowner: this.sessionData.userid,
      datecreated: this.ngbDateParserFormatter.parse(new Date().toString()),
      leaddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      nextcontactduedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
    });
    setTimeout(() => {
      this.lmsopportunities_LoadTable();
      this.lmscalls_LoadTable();
      this.lmscorporatesecondarycontacts_LoadTable();
    });
    this.customfieldservice.reset(document);
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    this.companynamevisible = false;
    this.websitevisible = false;
    this.secondarycontactsvisible = false;
  }

  onDelete() {
    let leadid = this.lmsmaster_Form.get('leadid').value;
    if (leadid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.lmsmaster_service.delete_lmsmaster(leadid).then(res => {
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
    this.lmsmaster_Form.patchValue({
      leadid: null
    });
    if (this.formData.leadid != null) this.formData.leadid = null;
    for (let i = 0; i < this.tbl_lmsopportunities.source.length; i++) {
      this.tbl_lmsopportunities.source[i].opportunityid = null;
    }
    for (let i = 0; i < this.tbl_lmscalls.source.length; i++) {
      this.tbl_lmscalls.source[i].callid = null;
    }
    for (let i = 0; i < this.tbl_lmscorporatesecondarycontacts.source.length; i++) {
      this.tbl_lmscorporatesecondarycontacts.source[i].secondarycontactid = null;
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
          else if (key == "datecreated")
            this.lmsmaster_Form.patchValue({ "datecreated": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "leaddate")
            this.lmsmaster_Form.patchValue({ "leaddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "nextcontactduedate")
            this.lmsmaster_Form.patchValue({ "nextcontactduedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "shippingaddress")
            this.lmsmaster_Form.patchValue({ "shippingaddress": mainscreendata[key] });
          else if (key == "billingaddress")
            this.lmsmaster_Form.patchValue({ "billingaddress": mainscreendata[key] });
          else if (ctrltype == "string") {
            this.lmsmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.lmsmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.lmsmaster_Form.controls[key] != undefined) {
                this.lmsmaster_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("lmsmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
      this.customFieldServiceList = res;
      if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
      return res;
    });


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
  branchid_onChange(evt: any) {
    let e = evt.value;
  }
  branchlocationid_onChange(evt: any) {
    let e = evt.value;
  }
  iscorporate_onChange(evt: any) {
    let e = this.f.iscorporate.value as any;
    this.secondarycontactsvisible = false;
    if (this.f.iscorporate.value == 'Y') this.secondarycontactsvisible = true;
    this.lmsmaster_Form.patchValue({ iscorporatedesc: evt.options[evt.options.selectedIndex].text });
  }
  leadowner_onChange(evt: any) {
    let e = evt.value;
  }
  companytypeid_onChange(evt: any) {
    let e = evt.value;
    this.lmsmaster_Form.patchValue({ companytypeiddesc: evt.options[evt.options.selectedIndex].text });
  }
  categoryid_onChange(evt: any) {
    let e = evt.value;
    this.lmsmaster_Form.patchValue({ categoryiddesc: evt.options[evt.options.selectedIndex].text });
    setTimeout(() => {
      if (this.f.categoryid.value && this.f.categoryid.value != "" && this.f.categoryid.value != null) this.lmsmaster_service.getList_subcategoryid(this.f.categoryid.value).then(res => this.subcategoryid_List = res as DropDownValues[]);
    });
  }
  subcategoryid_onChange(evt: any) {
    let e = evt.value;
    this.lmsmaster_Form.patchValue({ subcategoryiddesc: evt.options[evt.options.selectedIndex].text });
  }
  groupname_onChange(evt: any) {
    let e = this.f.groupname.value as any;
    this.lmsmaster_Form.patchValue({ groupnamedesc: evt.options[evt.options.selectedIndex].text });
  }
  salutation_onChange(evt: any) {
    let e = this.f.salutation.value as any;
    this.lmsmaster_Form.patchValue({ salutationdesc: evt.options[evt.options.selectedIndex].text });
  }
  designation_onChange(evt: any) {
    let e = evt.value;
    this.lmsmaster_Form.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
  }
  leadtype_onChange(evt: any) {
    let e = this.f.leadtype.value as any;
    this.lmsmaster_Form.patchValue({ leadtypedesc: evt.options[evt.options.selectedIndex].text });
  }
  leadsource_onChange(evt: any) {
    let e = this.f.leadsource.value as any;
    this.lmsmaster_Form.patchValue({ leadsourcedesc: evt.options[evt.options.selectedIndex].text });
  }
  campaignid_onChange(evt: any) {
    let e = evt.value;
    this.lmsmaster_Form.patchValue({ campaigniddesc: evt.options[evt.options.selectedIndex].text });
  }
  segment_onChange(evt: any) {
    let e = this.f.segment.value as any;
    this.lmsmaster_Form.patchValue({ segmentdesc: evt.options[evt.options.selectedIndex].text });
  }
  businessvertical_onChange(evt: any) {
    let e = this.f.businessvertical.value as any;
    this.lmsmaster_Form.patchValue({ businessverticaldesc: evt.options[evt.options.selectedIndex].text });
  }
  revenue_onChange(evt: any) {
    let e = this.f.revenue.value as any;
    this.lmsmaster_Form.patchValue({ revenuedesc: evt.options[evt.options.selectedIndex].text });
  }
  employees_onChange(evt: any) {
    let e = this.f.employees.value as any;
    this.lmsmaster_Form.patchValue({ employeesdesc: evt.options[evt.options.selectedIndex].text });
  }
  language_onChange(evt: any) {
    let e = this.f.language.value as any;
    this.lmsmaster_Form.patchValue({ languagedesc: evt.options[evt.options.selectedIndex].text });
  }
  paymentterms_onChange(evt: any) {
    let e = this.f.paymentterms.value as any;
    this.lmsmaster_Form.patchValue({ paymenttermsdesc: evt.options[evt.options.selectedIndex].text });
  }
  leadstatus_onChange(evt: any) {
    let e = this.f.leadstatus.value as any;
    this.lmsmaster_Form.patchValue({ leadstatusdesc: evt.options[evt.options.selectedIndex].text });
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



  edit_lmsmasters() {
    this.showview = false;
    setTimeout(() => {
      if (this.photo != null && this.photo != undefined) this.photo.setattachmentlist(this.lmsmaster_Form.get('photo').value);
      if (this.thumbnail != null && this.thumbnail != undefined) this.thumbnail.setattachmentlist(this.lmsmaster_Form.get('thumbnail').value);
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.lmsmaster_service.get_lmsmasters_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.lmsmaster;
      let formproperty = res.lmsmaster.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.lmsmaster.pkcol;
      this.formid = res.lmsmaster.leadid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.lmsmaster;
    this.formid = res.lmsmaster.leadid;
    this.pkcol = res.lmsmaster.pkcol;
    this.bmyrecord = false;
    if ((res.lmsmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.lmsmaster_Form.patchValue({
      branchid: res.lmsmaster.branchid,
      branchiddesc: res.lmsmaster.branchiddesc,
      branchlocationid: res.lmsmaster.branchlocationid,
      branchlocationiddesc: res.lmsmaster.branchlocationiddesc,
      leadid: res.lmsmaster.leadid,
      iscorporate: res.lmsmaster.iscorporate,
      iscorporatedesc: res.lmsmaster.iscorporatedesc,
      companyname: res.lmsmaster.companyname,
      leadowner: res.lmsmaster.leadowner,
      leadownerdesc: res.lmsmaster.leadownerdesc,
      firstname: res.lmsmaster.firstname,
      lastname: res.lmsmaster.lastname,
      emailid: res.lmsmaster.emailid,
      companytypeid: res.lmsmaster.companytypeid,
      companytypeiddesc: res.lmsmaster.companytypeiddesc,
      categoryid: res.lmsmaster.categoryid,
      categoryiddesc: res.lmsmaster.categoryiddesc,
      subcategoryid: res.lmsmaster.subcategoryid,
      subcategoryiddesc: res.lmsmaster.subcategoryiddesc,
      groupname: res.lmsmaster.groupname,
      groupnamedesc: res.lmsmaster.groupnamedesc,
      salutation: res.lmsmaster.salutation,
      salutationdesc: res.lmsmaster.salutationdesc,
      designation: res.lmsmaster.designation,
      designationdesc: res.lmsmaster.designationdesc,
      contactno: res.lmsmaster.contactno,
      address: res.lmsmaster.address,
      website: res.lmsmaster.website,
      datecreated: this.ngbDateParserFormatter.parse(res.lmsmaster.datecreated),
      leadtype: res.lmsmaster.leadtype,
      leadtypedesc: res.lmsmaster.leadtypedesc,
      leadsource: res.lmsmaster.leadsource,
      leadsourcedesc: res.lmsmaster.leadsourcedesc,
      leaddate: this.ngbDateParserFormatter.parse(res.lmsmaster.leaddate),
      nextcontactduedate: this.ngbDateParserFormatter.parse(res.lmsmaster.nextcontactduedate),
      campaignid: res.lmsmaster.campaignid,
      campaigniddesc: res.lmsmaster.campaigniddesc,
      rating: res.lmsmaster.rating,
      segment: res.lmsmaster.segment,
      segmentdesc: res.lmsmaster.segmentdesc,
      businessvertical: res.lmsmaster.businessvertical,
      businessverticaldesc: res.lmsmaster.businessverticaldesc,
      revenue: res.lmsmaster.revenue,
      revenuedesc: res.lmsmaster.revenuedesc,
      employees: res.lmsmaster.employees,
      employeesdesc: res.lmsmaster.employeesdesc,
      language: res.lmsmaster.language,
      languagedesc: res.lmsmaster.languagedesc,
      crosssellopportunity: res.lmsmaster.crosssellopportunity,
      successrate: res.lmsmaster.successrate,
      businessvalue: res.lmsmaster.businessvalue,
      subscribedemail: res.lmsmaster.subscribedemail,
      shippingaddress: JSON.parse(res.lmsmaster.shippingaddress),
      billingaddress: JSON.parse(res.lmsmaster.billingaddress),
      photo: JSON.parse(res.lmsmaster.photo),
      thumbnail: JSON.parse(res.lmsmaster.thumbnail),
      paymentterms: res.lmsmaster.paymentterms,
      paymenttermsdesc: res.lmsmaster.paymenttermsdesc,
      socialmedia: res.lmsmaster.socialmedia,
      leadstatus: res.lmsmaster.leadstatus,
      leadstatusdesc: res.lmsmaster.leadstatusdesc,
      notes: res.lmsmaster.notes,
      customfield: res.lmsmaster.customfield,
      attachment: JSON.parse(res.lmsmaster.attachment),
      status: res.lmsmaster.status,
      statusdesc: res.lmsmaster.statusdesc,
    });
    this.companynamevisible = false;
    this.websitevisible = false;
    this.secondarycontactsvisible = false;
    //hide list
    if (res.visiblelist != undefined && res.visiblelist.indexOf("companyname") >= 0) this.companynamevisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("companyname") >= 0) this.companynamevisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("website") >= 0) this.websitevisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("website") >= 0) this.websitevisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("secondarycontacts") >= 0) this.secondarycontactsvisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("secondarycontacts") >= 0) this.secondarycontactsvisible = false;
    this.lmsmaster_menuactions = res.lmsmaster_menuactions;
    this.lmsopportunity_menuactions = res.lmsopportunity_menuactions;
    this.lmsopportunities_visiblelist = res.lmsopportunities_visiblelist;
    this.lmscall_menuactions = res.lmscall_menuactions;
    this.lmscalls_visiblelist = res.lmscalls_visiblelist;
    this.lmscorporatesecondarycontact_menuactions = res.lmscorporatesecondarycontact_menuactions;
    this.lmscorporatesecondarycontacts_visiblelist = res.lmscorporatesecondarycontacts_visiblelist;
    if (this.lmsmaster_Form.get('customfield').value != null && this.lmsmaster_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.lmsmaster_Form.get('customfield').value);
    this.FillCustomField();
    if (this.lmsmaster_Form.get('photo').value != null && this.lmsmaster_Form.get('photo').value != "" && this.photo != null && this.photo != undefined) this.photo.setattachmentlist(this.lmsmaster_Form.get('photo').value);
    if (this.lmsmaster_Form.get('thumbnail').value != null && this.lmsmaster_Form.get('thumbnail').value != "" && this.thumbnail != null && this.thumbnail != undefined) this.thumbnail.setattachmentlist(this.lmsmaster_Form.get('thumbnail').value);
    if (this.lmsmaster_Form.get('attachment').value != null && this.lmsmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.lmsmaster_Form.get('attachment').value);
    setTimeout(() => {
      if (this.f.branchid.value && this.f.branchid.value != "" && this.f.branchid.value != null) this.lmsmaster_service.getList_branchlocationid(this.f.branchid.value).then(res => {
        this.branchlocationid_List = res as DropDownValues[];
      }).catch((err) => { console.log(err); });
    });
    setTimeout(() => {
      if (this.f.categoryid.value && this.f.categoryid.value != "" && this.f.categoryid.value != null) this.lmsmaster_service.getList_subcategoryid(this.f.categoryid.value).then(res => {
        this.subcategoryid_List = res as DropDownValues[];
      }).catch((err) => { console.log(err); });
    });
    //Child Tables if any
    this.Set_lmsopportunities_TableConfig();
    this.lmsopportunities_LoadTable(res.lmsopportunities);
    this.Set_lmscalls_TableConfig();
    this.lmscalls_LoadTable(res.lmscalls);
    this.Set_lmscorporatesecondarycontacts_TableConfig();
    this.lmscorporatesecondarycontacts_LoadTable(res.lmscorporatesecondarycontacts);
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.lmsmaster_Form.controls) {
      let val = this.lmsmaster_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.lmsmaster_Form.controls[key] != null) {
        if (key == "photo" || key == "thumbnail") {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
        }
        else if (key == "rating") {
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
    if (!this.lmsmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.lmsmaster_Form.getRawValue();
    obj.datecreated = new Date(this.lmsmaster_Form.get('datecreated').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('datecreated').value) + '  UTC' : null);
    obj.leaddate = new Date(this.lmsmaster_Form.get('leaddate').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('leaddate').value) + '  UTC' : null);
    obj.nextcontactduedate = new Date(this.lmsmaster_Form.get('nextcontactduedate').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('nextcontactduedate').value) + '  UTC' : null);
    if (this.lmsmaster_Form.get('shippingaddress').value != null) obj.shippingaddress = JSON.stringify(this.lmsmaster_Form.get('shippingaddress').value);
    if (this.lmsmaster_Form.get('billingaddress').value != null) obj.billingaddress = JSON.stringify(this.lmsmaster_Form.get('billingaddress').value);
    if (customfields != null) obj.customfield = JSON.stringify(customfields);
    if (this.photo.getAttachmentList() != null) obj.photo = JSON.stringify(this.photo.getAttachmentList());
    if (this.photo.getAttachmentList() != null) obj.photo = JSON.stringify(this.photo.getAttachmentList());
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(obj);
    if (!confirm('Do you want to want to save?')) {
      return;
    }
    await this.sharedService.upload(this.photo.getAllFiles());
    await this.sharedService.upload(this.thumbnail.getAllFiles());
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
    // Object.keys(this.lmsmaster_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.lmsmaster_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.lmsmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.lmsmaster_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.lmsmaster_Form.controls[key] != null) {
            this.formData[key] = this.lmsmaster_Form.controls[key].value;
          }
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    this.formData.datecreated = new Date(this.lmsmaster_Form.get('datecreated').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('datecreated').value) + '  UTC' : null);
    this.formData.leaddate = new Date(this.lmsmaster_Form.get('leaddate').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('leaddate').value) + '  UTC' : null);
    this.formData.nextcontactduedate = new Date(this.lmsmaster_Form.get('nextcontactduedate').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('nextcontactduedate').value) + '  UTC' : null);
    if (this.lmsmaster_Form.get('shippingaddress').value != null) this.formData.shippingaddress = JSON.stringify(this.lmsmaster_Form.get('shippingaddress').value);
    if (this.lmsmaster_Form.get('billingaddress').value != null) this.formData.billingaddress = JSON.stringify(this.lmsmaster_Form.get('billingaddress').value);
    this.formData.photo = this.lmsmaster_Form.get('photo').value;
    this.formData.thumbnail = this.lmsmaster_Form.get('thumbnail').value;
    if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.formData.Deleted_lmsopportunity_IDs = this.Deleted_lmsopportunity_IDs;
    this.formData.Deleted_lmscall_IDs = this.Deleted_lmscall_IDs;
    this.formData.Deleted_lmscorporatesecondarycontact_IDs = this.Deleted_lmscorporatesecondarycontact_IDs;
    if (this.photo.getAttachmentList() != null) this.formData.photo = JSON.stringify(this.photo.getAttachmentList());
    if (this.photo.getAttachmentList() != null) this.formData.photo = JSON.stringify(this.photo.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.lmsmaster_service.saveOrUpdate_lmsmasters(this.formData, this.tbl_lmsopportunities?.source?.data, this.tbl_lmscalls?.source?.data, this.tbl_lmscorporatesecondarycontacts?.source?.data,).subscribe(
      async res => {
        await this.sharedService.upload(this.photo.getAllFiles());
        await this.sharedService.upload(this.thumbnail.getAllFiles());
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        if (this.tbl_lmsopportunities.source) {
          for (let i = 0; i < this.tbl_lmsopportunities.source.data.length; i++) {
            if (this.tbl_lmsopportunities.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmsopportunities.source.data[i].fileAttachmentList);
          }
        }
        if (this.tbl_lmscalls.source) {
          for (let i = 0; i < this.tbl_lmscalls.source.data.length; i++) {
            if (this.tbl_lmscalls.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmscalls.source.data[i].fileAttachmentList);
          }
        }
        if (this.tbl_lmscorporatesecondarycontacts.source) {
          for (let i = 0; i < this.tbl_lmscorporatesecondarycontacts.source.data.length; i++) {
            if (this.tbl_lmscorporatesecondarycontacts.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmscorporatesecondarycontacts.source.data[i].fileAttachmentList);
          }
        }
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).lmsmaster);
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
            this.objvalues.push((res as any).lmsmaster);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.lmsmaster_Form.markAsUntouched();
        this.lmsmaster_Form.markAsPristine();
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
    this.tbl_lmsopportunities.source = new LocalDataSource();
    this.tbl_lmscalls.source = new LocalDataSource();
    this.tbl_lmscorporatesecondarycontacts.source = new LocalDataSource();
  }

  AddOrEdit_lmsopportunity(event: any, opportunityid: any, leadid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(lmsopportunityComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, opportunityid, leadid, visiblelist: this.lmsopportunities_visiblelist, hidelist: this.lmsopportunities_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_lmsopportunities.source.add(res[i]);
          }
          this.tbl_lmsopportunities.source.refresh();
        }
        else {
          this.tbl_lmsopportunities.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_lmsopportunity(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_lmsopportunity_IDs += childID + ",";
    this.tbl_lmsopportunities.source.splice(i, 1);
    //this.updateGrandTotal();
  }

  AddOrEdit_lmscall(event: any, callid: any, leadid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(lmscallComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, callid, leadid, visiblelist: this.lmscalls_visiblelist, hidelist: this.lmscalls_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_lmscalls.source.add(res[i]);
          }
          this.tbl_lmscalls.source.refresh();
        }
        else {
          this.tbl_lmscalls.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_lmscall(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_lmscall_IDs += childID + ",";
    this.tbl_lmscalls.source.splice(i, 1);
    //this.updateGrandTotal();
  }

  AddOrEdit_lmscorporatesecondarycontact(event: any, secondarycontactid: any, leadid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(lmscorporatesecondarycontactComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, secondarycontactid, leadid, visiblelist: this.lmscorporatesecondarycontacts_visiblelist, hidelist: this.lmscorporatesecondarycontacts_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_lmscorporatesecondarycontacts.source.add(res[i]);
          }
          this.tbl_lmscorporatesecondarycontacts.source.refresh();
        }
        else {
          this.tbl_lmscorporatesecondarycontacts.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_lmscorporatesecondarycontact(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_lmscorporatesecondarycontact_IDs += childID + ",";
    this.tbl_lmscorporatesecondarycontacts.source.splice(i, 1);
    //this.updateGrandTotal();
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes lmsopportunities
  lmsopportunities_settings: any;

  show_lmsopportunities_Checkbox() {
    debugger;
    if (this.tbl_lmsopportunities.source.settings['selectMode'] == 'multi') this.tbl_lmsopportunities.source.settings['selectMode'] = 'single';
    else
      this.tbl_lmsopportunities.source.settings['selectMode'] = 'multi';
    this.tbl_lmsopportunities.source.initGrid();
  }
  delete_lmsopportunities_All() {
    this.tbl_lmsopportunities.source.settings['selectMode'] = 'single';
  }
  show_lmsopportunities_Filter() {
    setTimeout(() => {
      //  this.Set_lmsopportunities_TableDropDownConfig();
    });
    if (this.tbl_lmsopportunities.source.settings != null) this.tbl_lmsopportunities.source.settings['hideSubHeader'] = !this.tbl_lmsopportunities.source.settings['hideSubHeader'];
    this.tbl_lmsopportunities.source.initGrid();
  }
  show_lmsopportunities_InActive() {
  }
  enable_lmsopportunities_InActive() {
  }
  async Set_lmsopportunities_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_lmsopportunities) {

      var clone = this.sharedService.clone(this.tbl_lmsopportunities.source.settings);
      if (clone.columns['leadby'] != undefined) clone.columns['leadby'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_leadby.value)), }, };
      if (clone.columns['leadby'] != undefined) clone.columns['leadby'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_leadby.value)), }, };
      this.tbl_lmsopportunities.source.settings = clone;
      this.tbl_lmsopportunities.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmsopportunities.source.settings);
      if (clone.columns['possibilityofclosure'] != undefined) clone.columns['possibilityofclosure'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_possibilityofclosure.value)), }, };
      if (clone.columns['possibilityofclosure'] != undefined) clone.columns['possibilityofclosure'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_possibilityofclosure.value)), }, };
      this.tbl_lmsopportunities.source.settings = clone;
      this.tbl_lmsopportunities.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmsopportunities.source.settings);
      if (clone.columns['nextstep'] != undefined) clone.columns['nextstep'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_nextstep.value)), }, };
      if (clone.columns['nextstep'] != undefined) clone.columns['nextstep'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_nextstep.value)), }, };
      this.tbl_lmsopportunities.source.settings = clone;
      this.tbl_lmsopportunities.source.initGrid();
    }
    this.bfilterPopulate_lmsopportunities = true;
  }
  async lmsopportunities_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_lmsopportunities_TableConfig() {
    this.lmsopportunities_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        add: false,
        edit: false,
        delete: false,
        position: 'right',
      },
      columns: {
        opportunitydetail: {
          title: 'Opportunity Detail',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        possibilityofclosuredesc: {
          title: 'Possibility Of Closure',
          type: 'html',
          filter: true,
        },
      },
    };
  }
  lmsopportunities_LoadTable(lmsopportunities = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsopportunities_ID) >= 0) {
      if (this.tbl_lmsopportunities != undefined) this.tbl_lmsopportunities.source = new LocalDataSource();
      if (this.tbl_lmsopportunities != undefined) this.tbl_lmsopportunities.source.load(lmsopportunities as any as LocalDataSource);
      if (this.tbl_lmsopportunities != undefined) this.tbl_lmsopportunities.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  lmsopportunities_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.lmsmaster_service.lmsopportunities.length == 0)
  {
      this.tbl_lmsopportunities.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new lmsopportunity();
      this.lmsmaster_service.lmsopportunities.push(obj);
      this.tbl_lmsopportunities.source.refresh();
      if ((this.lmsmaster_service.lmsopportunities.length / this.tbl_lmsopportunities.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsopportunities.source.getPaging().page)
      {
          this.tbl_lmsopportunities.source.setPage((this.lmsmaster_service.lmsopportunities.length / this.tbl_lmsopportunities.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_lmsopportunities.source.grid.edit(this.tbl_lmsopportunities.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_lmsopportunities.source.data.indexOf(event.data);
  this.onDelete_lmsopportunity(event,event.data.opportunityid,((this.tbl_lmsopportunities.source.getPaging().page-1) *this.tbl_lmsopportunities.source.getPaging().perPage)+index);
  this.tbl_lmsopportunities.source.refresh();
  break;
  }
  }
  
  */
  lmsopportunities_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_lmsopportunity(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_lmsopportunity(event, event.data.opportunityid, this.formid);
        break;
      case 'delete':
        this.onDelete_lmsopportunity(event, event.data.opportunityid, ((this.tbl_lmsopportunities.source.getPaging().page - 1) * this.tbl_lmsopportunities.source.getPaging().perPage) + event.index);
        this.tbl_lmsopportunities.source.refresh();
        break;
    }
  }
  lmsopportunities_onDelete(obj) {
    let opportunityid = obj.data.opportunityid;
    if (confirm('Are you sure to delete this record ?')) {
      this.lmsmaster_service.delete_lmsmaster(opportunityid).then(res =>
        this.lmsopportunities_LoadTable()
      );
    }
  }
  async onCustom_lmsopportunities_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsopportunities");
    let formname = (objbomenuaction as any).actionname;




  }
  lmsopportunities_Paging(val) {
    debugger;
    this.tbl_lmsopportunities.source.setPaging(1, val, true);
  }

  handle_lmsopportunities_GridSelected(event: any) {
    this.lmsopportunities_selectedindex = this.tbl_lmsopportunities.source.findIndex(i => i.opportunityid === event.data.opportunityid);
  }
  Is_lmsopportunities_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsopportunities_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes lmsopportunities
  //start of Grid Codes lmscalls
  lmscalls_settings: any;

  show_lmscalls_Checkbox() {
    debugger;
    if (this.tbl_lmscalls.source.settings['selectMode'] == 'multi') this.tbl_lmscalls.source.settings['selectMode'] = 'single';
    else
      this.tbl_lmscalls.source.settings['selectMode'] = 'multi';
    this.tbl_lmscalls.source.initGrid();
  }
  delete_lmscalls_All() {
    this.tbl_lmscalls.source.settings['selectMode'] = 'single';
  }
  show_lmscalls_Filter() {
    setTimeout(() => {
      //  this.Set_lmscalls_TableDropDownConfig();
    });
    if (this.tbl_lmscalls.source.settings != null) this.tbl_lmscalls.source.settings['hideSubHeader'] = !this.tbl_lmscalls.source.settings['hideSubHeader'];
    this.tbl_lmscalls.source.initGrid();
  }
  show_lmscalls_InActive() {
  }
  enable_lmscalls_InActive() {
  }
  async Set_lmscalls_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_lmscalls) {

      var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
      if (clone.columns['branchid'] != undefined) clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_branchid.value)), }, };
      if (clone.columns['branchid'] != undefined) clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_branchid.value)), }, };
      this.tbl_lmscalls.source.settings = clone;
      this.tbl_lmscalls.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
      if (clone.columns['leadid'] != undefined) clone.columns['leadid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadid.value)), }, };
      if (clone.columns['leadid'] != undefined) clone.columns['leadid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadid.value)), }, };
      this.tbl_lmscalls.source.settings = clone;
      this.tbl_lmscalls.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
      if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_opportunityid.value)), }, };
      if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_opportunityid.value)), }, };
      this.tbl_lmscalls.source.settings = clone;
      this.tbl_lmscalls.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
      if (clone.columns['callid'] != undefined) clone.columns['callid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_callid.value)), }, };
      if (clone.columns['callid'] != undefined) clone.columns['callid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_callid.value)), }, };
      this.tbl_lmscalls.source.settings = clone;
      this.tbl_lmscalls.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
      if (clone.columns['campaignid'] != undefined) clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_campaignid.value)), }, };
      if (clone.columns['campaignid'] != undefined) clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_campaignid.value)), }, };
      this.tbl_lmscalls.source.settings = clone;
      this.tbl_lmscalls.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
      if (clone.columns['leadby'] != undefined) clone.columns['leadby'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadby.value)), }, };
      if (clone.columns['leadby'] != undefined) clone.columns['leadby'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadby.value)), }, };
      this.tbl_lmscalls.source.settings = clone;
      this.tbl_lmscalls.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
      if (clone.columns['currentowner'] != undefined) clone.columns['currentowner'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_currentowner.value)), }, };
      if (clone.columns['currentowner'] != undefined) clone.columns['currentowner'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_currentowner.value)), }, };
      this.tbl_lmscalls.source.settings = clone;
      this.tbl_lmscalls.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
      if (clone.columns['activitytype'] != undefined) clone.columns['activitytype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_activitytype.value)), }, };
      if (clone.columns['activitytype'] != undefined) clone.columns['activitytype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_activitytype.value)), }, };
      this.tbl_lmscalls.source.settings = clone;
      this.tbl_lmscalls.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
      if (clone.columns['nextaction'] != undefined) clone.columns['nextaction'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_nextaction.value)), }, };
      if (clone.columns['nextaction'] != undefined) clone.columns['nextaction'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_nextaction.value)), }, };
      this.tbl_lmscalls.source.settings = clone;
      this.tbl_lmscalls.source.initGrid();
    }
    this.bfilterPopulate_lmscalls = true;
  }
  async lmscalls_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_lmscalls_TableConfig() {
    this.lmscalls_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        add: false,
        edit: false,
        delete: false,
        position: 'right',
      },
      columns: {
        eventdate: {
          title: 'Event Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        activitytypedesc: {
          title: 'Activity Type',
          type: 'html',
          filter: true,
        },
        attendedusers: {
          title: 'Attended Users',
          type: '',
          filter: true,
          valuePrepareFunction: (cell, row) => {
            let ret = this.sharedService.ParseUserAccess(cell);
            return ret;
          },
        },
        nextcalldate: {
          title: 'Next Call Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        nextactiondesc: {
          title: 'Next Action',
          type: 'html',
          filter: true,
        },
        score: {
          title: 'Score',
          type: 'number',
          filter: true,
        },
      },
    };
  }
  lmscalls_LoadTable(lmscalls = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscalls_ID) >= 0) {
      if (this.tbl_lmscalls != undefined) this.tbl_lmscalls.source = new LocalDataSource();
      if (this.tbl_lmscalls != undefined) this.tbl_lmscalls.source.load(lmscalls as any as LocalDataSource);
      if (this.tbl_lmscalls != undefined) this.tbl_lmscalls.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  lmscalls_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.lmsmaster_service.lmscalls.length == 0)
  {
      this.tbl_lmscalls.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new lmscall();
      this.lmsmaster_service.lmscalls.push(obj);
      this.tbl_lmscalls.source.refresh();
      if ((this.lmsmaster_service.lmscalls.length / this.tbl_lmscalls.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscalls.source.getPaging().page)
      {
          this.tbl_lmscalls.source.setPage((this.lmsmaster_service.lmscalls.length / this.tbl_lmscalls.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_lmscalls.source.grid.edit(this.tbl_lmscalls.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_lmscalls.source.data.indexOf(event.data);
  this.onDelete_lmscall(event,event.data.callid,((this.tbl_lmscalls.source.getPaging().page-1) *this.tbl_lmscalls.source.getPaging().perPage)+index);
  this.tbl_lmscalls.source.refresh();
  break;
  }
  }
  
  */
  lmscalls_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_lmscall(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_lmscall(event, event.data.callid, this.formid);
        break;
      case 'delete':
        this.onDelete_lmscall(event, event.data.callid, ((this.tbl_lmscalls.source.getPaging().page - 1) * this.tbl_lmscalls.source.getPaging().perPage) + event.index);
        this.tbl_lmscalls.source.refresh();
        break;
    }
  }
  lmscalls_onDelete(obj) {
    let callid = obj.data.callid;
    if (confirm('Are you sure to delete this record ?')) {
      this.lmsmaster_service.delete_lmsmaster(callid).then(res =>
        this.lmscalls_LoadTable()
      );
    }
  }
  async onCustom_lmscalls_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "lmscalls");
    let formname = (objbomenuaction as any).actionname;




  }
  lmscalls_Paging(val) {
    debugger;
    this.tbl_lmscalls.source.setPaging(1, val, true);
  }

  handle_lmscalls_GridSelected(event: any) {
    this.lmscalls_selectedindex = this.tbl_lmscalls.source.findIndex(i => i.callid === event.data.callid);
  }
  Is_lmscalls_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscalls_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes lmscalls
  //start of Grid Codes lmscorporatesecondarycontacts
  lmscorporatesecondarycontacts_settings: any;

  show_lmscorporatesecondarycontacts_Checkbox() {
    debugger;
    if (this.tbl_lmscorporatesecondarycontacts.source.settings['selectMode'] == 'multi') this.tbl_lmscorporatesecondarycontacts.source.settings['selectMode'] = 'single';
    else
      this.tbl_lmscorporatesecondarycontacts.source.settings['selectMode'] = 'multi';
    this.tbl_lmscorporatesecondarycontacts.source.initGrid();
  }
  delete_lmscorporatesecondarycontacts_All() {
    this.tbl_lmscorporatesecondarycontacts.source.settings['selectMode'] = 'single';
  }
  show_lmscorporatesecondarycontacts_Filter() {
    setTimeout(() => {
      //  this.Set_lmscorporatesecondarycontacts_TableDropDownConfig();
    });
    if (this.tbl_lmscorporatesecondarycontacts.source.settings != null) this.tbl_lmscorporatesecondarycontacts.source.settings['hideSubHeader'] = !this.tbl_lmscorporatesecondarycontacts.source.settings['hideSubHeader'];
    this.tbl_lmscorporatesecondarycontacts.source.initGrid();
  }
  show_lmscorporatesecondarycontacts_InActive() {
  }
  enable_lmscorporatesecondarycontacts_InActive() {
  }
  async Set_lmscorporatesecondarycontacts_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_lmscorporatesecondarycontacts) {

      var clone = this.sharedService.clone(this.tbl_lmscorporatesecondarycontacts.source.settings);
      if (clone.columns['designation'] != undefined) clone.columns['designation'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscorporatesecondarycontacts_designation.value)), }, };
      if (clone.columns['designation'] != undefined) clone.columns['designation'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscorporatesecondarycontacts_designation.value)), }, };
      this.tbl_lmscorporatesecondarycontacts.source.settings = clone;
      this.tbl_lmscorporatesecondarycontacts.source.initGrid();
    }
    this.bfilterPopulate_lmscorporatesecondarycontacts = true;
  }
  async lmscorporatesecondarycontacts_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_lmscorporatesecondarycontacts_TableConfig() {
    this.lmscorporatesecondarycontacts_settings = {
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
        custom: this.lmscorporatesecondarycontact_menuactions
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
        emailid: {
          title: 'Email',
          type: '',
          filter: true,
        },
        lastname: {
          title: 'Last Name',
          type: '',
          filter: true,
        },
        companyname: {
          title: 'Company Name',
          type: '',
          filter: true,
        },
        designationdesc: {
          title: 'Designation',
          type: 'html',
          filter: true,
        },
        officephone: {
          title: 'Office Phone',
          type: '',
          filter: true,
        },
        mobile: {
          title: 'Mobile',
          type: '',
          filter: true,
        },
      },
    };
  }
  lmscorporatesecondarycontacts_LoadTable(lmscorporatesecondarycontacts = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscorporatesecondarycontacts_ID) >= 0) {
      if (this.tbl_lmscorporatesecondarycontacts != undefined) this.tbl_lmscorporatesecondarycontacts.source = new LocalDataSource();
      if (this.tbl_lmscorporatesecondarycontacts != undefined) this.tbl_lmscorporatesecondarycontacts.source.load(lmscorporatesecondarycontacts as any as LocalDataSource);
      if (this.tbl_lmscorporatesecondarycontacts != undefined) this.tbl_lmscorporatesecondarycontacts.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  lmscorporatesecondarycontacts_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.lmsmaster_service.lmscorporatesecondarycontacts.length == 0)
  {
      this.tbl_lmscorporatesecondarycontacts.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new lmscorporatesecondarycontact();
      this.lmsmaster_service.lmscorporatesecondarycontacts.push(obj);
      this.tbl_lmscorporatesecondarycontacts.source.refresh();
      if ((this.lmsmaster_service.lmscorporatesecondarycontacts.length / this.tbl_lmscorporatesecondarycontacts.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscorporatesecondarycontacts.source.getPaging().page)
      {
          this.tbl_lmscorporatesecondarycontacts.source.setPage((this.lmsmaster_service.lmscorporatesecondarycontacts.length / this.tbl_lmscorporatesecondarycontacts.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_lmscorporatesecondarycontacts.source.grid.edit(this.tbl_lmscorporatesecondarycontacts.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  if (confirm('Do you want to want to delete?')) {
  let index = this.tbl_lmscorporatesecondarycontacts.source.data.indexOf(event.data);
  this.onDelete_lmscorporatesecondarycontact(event,event.data.secondarycontactid,((this.tbl_lmscorporatesecondarycontacts.source.getPaging().page-1) *this.tbl_lmscorporatesecondarycontacts.source.getPaging().perPage)+index);
  this.tbl_lmscorporatesecondarycontacts.source.refresh();
  }
  break;
  }
  }
  
  */
  lmscorporatesecondarycontacts_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_lmscorporatesecondarycontact(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_lmscorporatesecondarycontact(event, event.data.secondarycontactid, this.formid);
        break;
      case 'delete':
        if (confirm('Do you want to want to delete?')) {
          this.onDelete_lmscorporatesecondarycontact(event, event.data.secondarycontactid, ((this.tbl_lmscorporatesecondarycontacts.source.getPaging().page - 1) * this.tbl_lmscorporatesecondarycontacts.source.getPaging().perPage) + event.index);
          this.tbl_lmscorporatesecondarycontacts.source.refresh();
        }
        break;
    }
  }
  lmscorporatesecondarycontacts_onDelete(obj) {
    let secondarycontactid = obj.data.secondarycontactid;
    if (confirm('Are you sure to delete this record ?')) {
      this.lmsmaster_service.delete_lmsmaster(secondarycontactid).then(res =>
        this.lmscorporatesecondarycontacts_LoadTable()
      );
    }
  }
  async onCustom_lmscorporatesecondarycontacts_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "lmscorporatesecondarycontacts");
    let formname = (objbomenuaction as any).actionname;




  }
  lmscorporatesecondarycontacts_Paging(val) {
    debugger;
    this.tbl_lmscorporatesecondarycontacts.source.setPaging(1, val, true);
  }

  handle_lmscorporatesecondarycontacts_GridSelected(event: any) {
    this.lmscorporatesecondarycontacts_selectedindex = this.tbl_lmscorporatesecondarycontacts.source.findIndex(i => i.secondarycontactid === event.data.secondarycontactid);
  }
  Is_lmscorporatesecondarycontacts_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscorporatesecondarycontacts_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes lmscorporatesecondarycontacts

}



