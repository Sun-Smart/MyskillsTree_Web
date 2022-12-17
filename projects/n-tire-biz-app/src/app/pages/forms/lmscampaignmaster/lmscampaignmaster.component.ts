import { lmscampaignmasterService } from './../../../service/lmscampaignmaster.service';
import { lmscampaignmaster } from './../../../model/lmscampaignmaster.model';
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
import { lmscampaigntask } from './../../../model/lmscampaigntask.model';
import { lmscampaigntaskComponent } from './../../../pages/forms/lmscampaigntask/lmscampaigntask.component';
import { lmscampaigntaskService } from './../../../service/lmscampaigntask.service';
import { lmscampaignlocation } from './../../../model/lmscampaignlocation.model';
import { lmscampaignlocationComponent } from './../../../pages/forms/lmscampaignlocation/lmscampaignlocation.component';
import { lmscampaignlocationService } from './../../../service/lmscampaignlocation.service';
import { lmspost } from './../../../model/lmspost.model';
import { lmspostComponent } from './../../../pages/forms/lmspost/lmspost.component';
import { lmspostService } from './../../../service/lmspost.service';
import { lmscampaignnoaccess } from './../../../model/lmscampaignnoaccess.model';
import { lmscampaignnoaccessComponent } from './../../../pages/forms/lmscampaignnoaccess/lmscampaignnoaccess.component';
import { lmscampaignnoaccessService } from './../../../service/lmscampaignnoaccess.service';
import { bobranchmasterComponent } from './../bobranchmaster/bobranchmaster.component';
import { bobranchmasterService } from './../../../service/bobranchmaster.service';
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
  selector: 'app-lmscampaignmaster',
  templateUrl: './lmscampaignmaster.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class lmscampaignmasterComponent implements OnInit {
  formData: lmscampaignmaster;
  list: lmscampaignmaster[];
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

  bfilterPopulate_lmscampaignmasters: boolean = false;
  bfilterPopulate_lmscampaigntasks: boolean = false;
  bfilterPopulate_lmscampaignlocations: boolean = false;
  bfilterPopulate_lmsposts: boolean = false;
  bfilterPopulate_lmscampaignnoaccesses: boolean = false;
  lmscampaignmaster_menuactions: any = []
  lmscampaigntask_menuactions: any = []
  @ViewChild('tbl_lmscampaigntasks', { static: false }) tbl_lmscampaigntasks: Ng2SmartTableComponent;
  lmscampaignlocation_menuactions: any = []
  @ViewChild('tbl_lmscampaignlocations', { static: false }) tbl_lmscampaignlocations: Ng2SmartTableComponent;
  lmspost_menuactions: any = []
  @ViewChild('tbl_lmsposts', { static: false }) tbl_lmsposts: Ng2SmartTableComponent;
  Insertlmscampaignnoaccesses = [];
  lmscampaignnoaccess_menuactions: any = []
  @ViewChild('tbl_lmscampaignnoaccesses', { static: false }) tbl_lmscampaignnoaccesses: Ng2SmartTableComponent;

  lmscampaignmaster_Form: FormGroup;

  productid_List: DropDownValues[];
  campaigntype_List: DropDownValues[];
  territory_List: DropDownValues[];
  priority_List: DropDownValues[];
  businessgoal_List: DropDownValues[];
  targetmarket_List: DropDownValues[];
  targetaudience_List: DropDownValues[];
  targetindustry_List: DropDownValues[];
  strategy_List: DropDownValues[];
  targettype_List: DropDownValues[];
  expectedofferaction_List: DropDownValues[];
  performancestatus_List: DropDownValues[];
  campaignstatus_List: DropDownValues[];

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



  lmscampaigntasks_visiblelist: any;
  lmscampaigntasks_hidelist: any;
  lmscampaignlocations_visiblelist: any;
  lmscampaignlocations_hidelist: any;
  lmsposts_visiblelist: any;
  lmsposts_hidelist: any;
  lmscampaignnoaccesses_visiblelist: any;
  lmscampaignnoaccesses_hidelist: any;

  Deleted_lmscampaigntask_IDs: string = "";
  lmscampaigntasks_ID: string = "1";
  lmscampaigntasks_selectedindex: any;
  Deleted_lmscampaignlocation_IDs: string = "";
  lmscampaignlocations_ID: string = "2";
  lmscampaignlocations_selectedindex: any;
  Deleted_lmspost_IDs: string = "";
  lmsposts_ID: string = "3";
  lmsposts_selectedindex: any;
  Deleted_lmscampaignnoaccess_IDs: string = "";
  lmscampaignnoaccesses_ID: string = "4";
  lmscampaignnoaccesses_selectedindex: any;


  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private lmscampaignmaster_service: lmscampaignmasterService,
    private lmscampaigntask_service: lmscampaigntaskService,
    private lmscampaignlocation_service: lmscampaignlocationService,
    private lmspost_service: lmspostService,
    private bobranchmaster_service: bobranchmasterService,
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
    this.lmscampaignmaster_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      productid: [null],
      productiddesc: [null],
      campaignid: [null],
      campaigncode: [null, Validators.compose([Validators.required])],
      campaignname: [null, Validators.compose([Validators.required])],
      campaigntype: [null],
      campaigntypedesc: [null],
      campaignowner: [null, Validators.compose([Validators.required])],
      validfrom: [null, Validators.compose([Validators.required])],
      validto: [null],
      startdate: [null],
      enddate: [null],
      details: [null],
      campaignscript: [null],
      territory: [null],
      territorydesc: [null],
      priority: [null],
      prioritydesc: [null],
      businessgoal: [null],
      businessgoaldesc: [null],
      targetmarket: [null],
      targetmarketdesc: [null],
      targetaudience: [null],
      targetaudiencedesc: [null],
      targetindustry: [null],
      targetindustrydesc: [null],
      strategy: [null],
      strategydesc: [null],
      targettype: [null],
      targettypedesc: [null],
      expectedofferaction: [null],
      expectedofferactiondesc: [null],
      expectedsales: [null],
      expectedrevenue: [null],
      expectedprofit: [null],
      expectedroi: [null],
      dailytarget: [null],
      actualachieved: [null],
      performancestatus: [null],
      performancestatusdesc: [null],
      budgetcost: [null],
      actualcost: [null],
      mediabudget: [null],
      actualmediacost: [null],
      phonenumber: [null],
      uniquephonenumber: [null],
      landingpage: [null],
      uniquelandingpage: [null],
      websitelinksavailable: [null],
      numberofpages: [null],
      enquiryresponsibility: [null],
      emailresponsibility: [null],
      campaignemail: [null],
      trackinboundcalls: [null],
      trackvisitors: [null],
      trackingdetails: [null],
      handlingvolumes: [null],
      trainingrequirement: [null],
      afterenquiry: [null],
      emailresponsetat: [null],
      afteremail: [null],
      customfield: [null],
      attachment: [null],
      campaignstatus: [null],
      campaignstatusdesc: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.lmscampaignmaster_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.lmscampaignmaster_Form.dirty && this.lmscampaignmaster_Form.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  //check Unique fields
  campaigncodeexists(e: any) {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.campaigncode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());

    if (pos >= 0 && this.pkList[pos].campaignid.toString() != this.formid.toString()) {
      if (confirm("This Campaign Code value exists in the database.Do you want to display the record ? ")) {
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
    let pos = this.pkList.map(function (e: any) { return e.campaignid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.campaignid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.campaignid && pkDetail) {
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
    let lmscampaignmasterid = null;

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
    this.formid = lmscampaignmasterid;
    //alert(lmscampaignmasterid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.Set_lmscampaigntasks_TableConfig();
      setTimeout(() => {
        //this.Set_lmscampaigntasks_TableDropDownConfig();
      });

      this.Set_lmscampaignlocations_TableConfig();
      setTimeout(() => {
        //this.Set_lmscampaignlocations_TableDropDownConfig();
      });

      this.Set_lmsposts_TableConfig();
      setTimeout(() => {
        //this.Set_lmsposts_TableDropDownConfig();
      });

      this.Set_lmscampaignnoaccesses_TableConfig();
      setTimeout(() => {
        //this.Set_lmscampaignnoaccesses_TableDropDownConfig();
      });

      this.FillCustomField();
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }
    this.lmscampaignmaster_service.getDefaultData().then(res => {
      this.productid_List = res.list_productid.value;
      this.campaigntype_List = res.list_campaigntype.value;
      this.territory_List = res.list_territory.value;
      this.priority_List = res.list_priority.value;
      this.businessgoal_List = res.list_businessgoal.value;
      this.targetmarket_List = res.list_targetmarket.value;
      this.targetaudience_List = res.list_targetaudience.value;
      this.targetindustry_List = res.list_targetindustry.value;
      this.strategy_List = res.list_strategy.value;
      this.targettype_List = res.list_targettype.value;
      this.expectedofferaction_List = res.list_expectedofferaction.value;
      this.performancestatus_List = res.list_performancestatus.value;
      this.campaignstatus_List = res.list_campaignstatus.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.lmscampaignmaster_service.get_lmscampaignmasters_List().then(res => {
      this.pkList = res as lmscampaignmaster[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched 
    this.lmscampaignmaster_Form.markAsUntouched();
    this.lmscampaignmaster_Form.markAsPristine();
  }



  resetForm() {
    if (this.lmscampaignmaster_Form != null)
      this.lmscampaignmaster_Form.reset();
    this.lmscampaignmaster_Form.patchValue({
    });
    setTimeout(() => {
      this.lmscampaigntasks_LoadTable();
      this.lmscampaignlocations_LoadTable();
      this.lmsposts_LoadTable();
      this.Insertlmscampaignnoaccesses = [];
      this.lmscampaignnoaccesses_LoadTable();
    });
    this.customfieldservice.reset(document);
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let campaignid = this.lmscampaignmaster_Form.get('campaignid').value;
    if (campaignid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.lmscampaignmaster_service.delete_lmscampaignmaster(campaignid).then(res => {
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
    this.lmscampaignmaster_Form.patchValue({
      campaignid: null
    });
    if (this.formData.campaignid != null) this.formData.campaignid = null;
    for (let i = 0; i < this.tbl_lmscampaigntasks.source.length; i++) {
      this.tbl_lmscampaigntasks.source[i].taskid = null;
    }
    for (let i = 0; i < this.tbl_lmscampaignlocations.source.length; i++) {
      this.tbl_lmscampaignlocations.source[i].locationid = null;
    }
    for (let i = 0; i < this.tbl_lmsposts.source.length; i++) {
      this.tbl_lmsposts.source[i].postid = null;
    }
    for (let i = 0; i < this.tbl_lmscampaignnoaccesses.source.length; i++) {
      this.tbl_lmscampaignnoaccesses.source[i].accessid = null;
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
          else if (key == "campaignowner")
            this.lmscampaignmaster_Form.patchValue({ "campaignowner": mainscreendata[key] });
          else if (key == "validfrom")
            this.lmscampaignmaster_Form.patchValue({ "validfrom": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "validto")
            this.lmscampaignmaster_Form.patchValue({ "validto": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "startdate")
            this.lmscampaignmaster_Form.patchValue({ "startdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "enddate")
            this.lmscampaignmaster_Form.patchValue({ "enddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "enquiryresponsibility")
            this.lmscampaignmaster_Form.patchValue({ "enquiryresponsibility": mainscreendata[key] });
          else if (key == "emailresponsibility")
            this.lmscampaignmaster_Form.patchValue({ "emailresponsibility": mainscreendata[key] });
          else if (ctrltype == "string") {
            this.lmscampaignmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.lmscampaignmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.lmscampaignmaster_Form.controls[key] != undefined) {
                this.lmscampaignmaster_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("lmscampaignmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
  productid_onChange(evt: any) {
    let e = evt.value;
    this.lmscampaignmaster_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
  }
  campaigntype_onChange(evt: any) {
    let e = this.f.campaigntype.value as any;
    this.lmscampaignmaster_Form.patchValue({ campaigntypedesc: evt.options[evt.options.selectedIndex].text });
  }
  territory_onChange(evt: any) {
    let e = this.f.territory.value as any;
    this.lmscampaignmaster_Form.patchValue({ territorydesc: evt.options[evt.options.selectedIndex].text });
  }
  priority_onChange(evt: any) {
    let e = this.f.priority.value as any;
    this.lmscampaignmaster_Form.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
  }
  businessgoal_onChange(evt: any) {
    let e = this.f.businessgoal.value as any;
    this.lmscampaignmaster_Form.patchValue({ businessgoaldesc: evt.options[evt.options.selectedIndex].text });
  }
  targetmarket_onChange(evt: any) {
    let e = this.f.targetmarket.value as any;
    this.lmscampaignmaster_Form.patchValue({ targetmarketdesc: evt.options[evt.options.selectedIndex].text });
  }
  targetaudience_onChange(evt: any) {
    let e = this.f.targetaudience.value as any;
    this.lmscampaignmaster_Form.patchValue({ targetaudiencedesc: evt.options[evt.options.selectedIndex].text });
  }
  targetindustry_onChange(evt: any) {
    let e = this.f.targetindustry.value as any;
    this.lmscampaignmaster_Form.patchValue({ targetindustrydesc: evt.options[evt.options.selectedIndex].text });
  }
  strategy_onChange(evt: any) {
    let e = this.f.strategy.value as any;
    this.lmscampaignmaster_Form.patchValue({ strategydesc: evt.options[evt.options.selectedIndex].text });
  }
  targettype_onChange(evt: any) {
    let e = this.f.targettype.value as any;
    this.lmscampaignmaster_Form.patchValue({ targettypedesc: evt.options[evt.options.selectedIndex].text });
  }
  expectedofferaction_onChange(evt: any) {
    let e = this.f.expectedofferaction.value as any;
    this.lmscampaignmaster_Form.patchValue({ expectedofferactiondesc: evt.options[evt.options.selectedIndex].text });
  }
  performancestatus_onChange(evt: any) {
    let e = this.f.performancestatus.value as any;
    this.lmscampaignmaster_Form.patchValue({ performancestatusdesc: evt.options[evt.options.selectedIndex].text });
  }
  campaignstatus_onChange(evt: any) {
    let e = this.f.campaignstatus.value as any;
    this.lmscampaignmaster_Form.patchValue({ campaignstatusdesc: evt.options[evt.options.selectedIndex].text });
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



  edit_lmscampaignmasters() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.lmscampaignmaster_service.get_lmscampaignmasters_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.lmscampaignmaster;
      let formproperty = res.lmscampaignmaster.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.lmscampaignmaster.pkcol;
      this.formid = res.lmscampaignmaster.campaignid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.lmscampaignmaster;
    this.formid = res.lmscampaignmaster.campaignid;
    this.pkcol = res.lmscampaignmaster.pkcol;
    this.bmyrecord = false;
    if ((res.lmscampaignmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.lmscampaignmaster_Form.patchValue({
      productid: res.lmscampaignmaster.productid,
      productiddesc: res.lmscampaignmaster.productiddesc,
      campaignid: res.lmscampaignmaster.campaignid,
      campaigncode: res.lmscampaignmaster.campaigncode,
      campaignname: res.lmscampaignmaster.campaignname,
      campaigntype: res.lmscampaignmaster.campaigntype,
      campaigntypedesc: res.lmscampaignmaster.campaigntypedesc,
      campaignowner: JSON.parse(res.lmscampaignmaster.campaignowner),
      validfrom: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.validfrom),
      validto: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.validto),
      startdate: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.startdate),
      enddate: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.enddate),
      details: res.lmscampaignmaster.details,
      campaignscript: res.lmscampaignmaster.campaignscript,
      territory: res.lmscampaignmaster.territory,
      territorydesc: res.lmscampaignmaster.territorydesc,
      priority: res.lmscampaignmaster.priority,
      prioritydesc: res.lmscampaignmaster.prioritydesc,
      businessgoal: res.lmscampaignmaster.businessgoal,
      businessgoaldesc: res.lmscampaignmaster.businessgoaldesc,
      targetmarket: res.lmscampaignmaster.targetmarket,
      targetmarketdesc: res.lmscampaignmaster.targetmarketdesc,
      targetaudience: res.lmscampaignmaster.targetaudience,
      targetaudiencedesc: res.lmscampaignmaster.targetaudiencedesc,
      targetindustry: res.lmscampaignmaster.targetindustry,
      targetindustrydesc: res.lmscampaignmaster.targetindustrydesc,
      strategy: res.lmscampaignmaster.strategy,
      strategydesc: res.lmscampaignmaster.strategydesc,
      targettype: res.lmscampaignmaster.targettype,
      targettypedesc: res.lmscampaignmaster.targettypedesc,
      expectedofferaction: res.lmscampaignmaster.expectedofferaction,
      expectedofferactiondesc: res.lmscampaignmaster.expectedofferactiondesc,
      expectedsales: res.lmscampaignmaster.expectedsales,
      expectedrevenue: res.lmscampaignmaster.expectedrevenue,
      expectedprofit: res.lmscampaignmaster.expectedprofit,
      expectedroi: res.lmscampaignmaster.expectedroi,
      dailytarget: res.lmscampaignmaster.dailytarget,
      actualachieved: res.lmscampaignmaster.actualachieved,
      performancestatus: res.lmscampaignmaster.performancestatus,
      performancestatusdesc: res.lmscampaignmaster.performancestatusdesc,
      budgetcost: res.lmscampaignmaster.budgetcost,
      actualcost: res.lmscampaignmaster.actualcost,
      mediabudget: res.lmscampaignmaster.mediabudget,
      actualmediacost: res.lmscampaignmaster.actualmediacost,
      phonenumber: res.lmscampaignmaster.phonenumber,
      uniquephonenumber: res.lmscampaignmaster.uniquephonenumber,
      landingpage: res.lmscampaignmaster.landingpage,
      uniquelandingpage: res.lmscampaignmaster.uniquelandingpage,
      websitelinksavailable: res.lmscampaignmaster.websitelinksavailable,
      numberofpages: res.lmscampaignmaster.numberofpages,
      enquiryresponsibility: JSON.parse(res.lmscampaignmaster.enquiryresponsibility),
      emailresponsibility: JSON.parse(res.lmscampaignmaster.emailresponsibility),
      campaignemail: res.lmscampaignmaster.campaignemail,
      trackinboundcalls: res.lmscampaignmaster.trackinboundcalls,
      trackvisitors: res.lmscampaignmaster.trackvisitors,
      trackingdetails: res.lmscampaignmaster.trackingdetails,
      handlingvolumes: res.lmscampaignmaster.handlingvolumes,
      trainingrequirement: res.lmscampaignmaster.trainingrequirement,
      afterenquiry: res.lmscampaignmaster.afterenquiry,
      emailresponsetat: res.lmscampaignmaster.emailresponsetat,
      afteremail: res.lmscampaignmaster.afteremail,
      customfield: res.lmscampaignmaster.customfield,
      attachment: JSON.parse(res.lmscampaignmaster.attachment),
      campaignstatus: res.lmscampaignmaster.campaignstatus,
      campaignstatusdesc: res.lmscampaignmaster.campaignstatusdesc,
      status: res.lmscampaignmaster.status,
      statusdesc: res.lmscampaignmaster.statusdesc,
    });
    this.lmscampaignmaster_menuactions = res.lmscampaignmaster_menuactions;
    this.lmscampaigntask_menuactions = res.lmscampaigntask_menuactions;
    this.lmscampaigntasks_visiblelist = res.lmscampaigntasks_visiblelist;
    this.lmscampaignlocation_menuactions = res.lmscampaignlocation_menuactions;
    this.lmscampaignlocations_visiblelist = res.lmscampaignlocations_visiblelist;
    this.lmspost_menuactions = res.lmspost_menuactions;
    this.lmsposts_visiblelist = res.lmsposts_visiblelist;
    this.lmscampaignnoaccess_menuactions = res.lmscampaignnoaccess_menuactions;
    this.lmscampaignnoaccesses_visiblelist = res.lmscampaignnoaccesses_visiblelist;
    if (this.lmscampaignmaster_Form.get('customfield').value != null && this.lmscampaignmaster_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.lmscampaignmaster_Form.get('customfield').value);
    this.FillCustomField();
    if (this.lmscampaignmaster_Form.get('attachment').value != null && this.lmscampaignmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.lmscampaignmaster_Form.get('attachment').value);
    //Child Tables if any
    this.Set_lmscampaigntasks_TableConfig();
    this.lmscampaigntasks_LoadTable(res.lmscampaigntasks);
    this.Set_lmscampaignlocations_TableConfig();
    this.lmscampaignlocations_LoadTable(res.lmscampaignlocations);
    this.Set_lmsposts_TableConfig();
    this.lmsposts_LoadTable(res.lmsposts);
    this.Set_lmscampaignnoaccesses_TableConfig();
    this.lmscampaignnoaccesses_LoadTable(res.lmscampaignnoaccesses);
    this.Insertlmscampaignnoaccesses = [];
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;

    for (let key in this.lmscampaignmaster_Form.controls) {
      let val = this.lmscampaignmaster_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.lmscampaignmaster_Form.controls[key] != null) {
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
    if (!this.lmscampaignmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.lmscampaignmaster_Form.getRawValue();
    if (this.lmscampaignmaster_Form.get('campaignowner').value != null) obj.campaignowner = JSON.stringify(this.lmscampaignmaster_Form.get('campaignowner').value);
    obj.validfrom = new Date(this.lmscampaignmaster_Form.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('validfrom').value) + '  UTC' : null);
    obj.validto = new Date(this.lmscampaignmaster_Form.get('validto').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('validto').value) + '  UTC' : null);
    obj.startdate = new Date(this.lmscampaignmaster_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('startdate').value) + '  UTC' : null);
    obj.enddate = new Date(this.lmscampaignmaster_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('enddate').value) + '  UTC' : null);
    if (this.lmscampaignmaster_Form.get('enquiryresponsibility').value != null) obj.enquiryresponsibility = JSON.stringify(this.lmscampaignmaster_Form.get('enquiryresponsibility').value);
    if (this.lmscampaignmaster_Form.get('emailresponsibility').value != null) obj.emailresponsibility = JSON.stringify(this.lmscampaignmaster_Form.get('emailresponsibility').value);
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
    // Object.keys(this.lmscampaignmaster_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.lmscampaignmaster_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.lmscampaignmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.lmscampaignmaster_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.lmscampaignmaster_Form.controls[key] != null) {
            this.formData[key] = this.lmscampaignmaster_Form.controls[key].value;
          }
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    if (this.lmscampaignmaster_Form.get('campaignowner').value != null) this.formData.campaignowner = JSON.stringify(this.lmscampaignmaster_Form.get('campaignowner').value);
    this.formData.validfrom = new Date(this.lmscampaignmaster_Form.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('validfrom').value) + '  UTC' : null);
    this.formData.validto = new Date(this.lmscampaignmaster_Form.get('validto').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('validto').value) + '  UTC' : null);
    this.formData.startdate = new Date(this.lmscampaignmaster_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('startdate').value) + '  UTC' : null);
    this.formData.enddate = new Date(this.lmscampaignmaster_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('enddate').value) + '  UTC' : null);
    if (this.lmscampaignmaster_Form.get('enquiryresponsibility').value != null) this.formData.enquiryresponsibility = JSON.stringify(this.lmscampaignmaster_Form.get('enquiryresponsibility').value);
    if (this.lmscampaignmaster_Form.get('emailresponsibility').value != null) this.formData.emailresponsibility = JSON.stringify(this.lmscampaignmaster_Form.get('emailresponsibility').value);
    if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.formData.Deleted_lmscampaigntask_IDs = this.Deleted_lmscampaigntask_IDs;
    this.formData.Deleted_lmscampaignlocation_IDs = this.Deleted_lmscampaignlocation_IDs;
    this.formData.Deleted_lmspost_IDs = this.Deleted_lmspost_IDs;
    this.formData.Deleted_lmscampaignnoaccess_IDs = this.Deleted_lmscampaignnoaccess_IDs;
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.lmscampaignmaster_service.saveOrUpdate_lmscampaignmasters(this.formData, this.tbl_lmscampaigntasks?.source?.data, this.tbl_lmscampaignlocations?.source?.data, this.tbl_lmsposts?.source?.data, this.tbl_lmscampaignnoaccesses?.source?.data, this.Insertlmscampaignnoaccesses,).subscribe(
      async res => {
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        if (this.tbl_lmscampaigntasks.source) {
          for (let i = 0; i < this.tbl_lmscampaigntasks.source.data.length; i++) {
            if (this.tbl_lmscampaigntasks.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmscampaigntasks.source.data[i].fileAttachmentList);
          }
        }
        if (this.tbl_lmscampaignlocations.source) {
          for (let i = 0; i < this.tbl_lmscampaignlocations.source.data.length; i++) {
            if (this.tbl_lmscampaignlocations.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmscampaignlocations.source.data[i].fileAttachmentList);
          }
        }
        if (this.tbl_lmsposts.source) {
          for (let i = 0; i < this.tbl_lmsposts.source.data.length; i++) {
            if (this.tbl_lmsposts.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmsposts.source.data[i].fileAttachmentList);
          }
        }
        if (this.tbl_lmscampaignnoaccesses.source) {
          for (let i = 0; i < this.tbl_lmscampaignnoaccesses.source.data.length; i++) {
            if (this.tbl_lmscampaignnoaccesses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmscampaignnoaccesses.source.data[i].fileAttachmentList);
          }
        }
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).lmscampaignmaster);
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
            this.objvalues.push((res as any).lmscampaignmaster);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.lmscampaignmaster_Form.markAsUntouched();
        this.lmscampaignmaster_Form.markAsPristine();
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
    this.tbl_lmscampaigntasks.source = new LocalDataSource();
    this.tbl_lmscampaignlocations.source = new LocalDataSource();
    this.tbl_lmsposts.source = new LocalDataSource();
    this.tbl_lmscampaignnoaccesses.source = new LocalDataSource();
  }

  AddOrEdit_lmscampaigntask(event: any, taskid: any, campaignid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(lmscampaigntaskComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, taskid, campaignid, visiblelist: this.lmscampaigntasks_visiblelist, hidelist: this.lmscampaigntasks_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_lmscampaigntasks.source.add(res[i]);
          }
          this.tbl_lmscampaigntasks.source.refresh();
        }
        else {
          this.tbl_lmscampaigntasks.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_lmscampaigntask(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_lmscampaigntask_IDs += childID + ",";
    this.tbl_lmscampaigntasks.source.splice(i, 1);
    //this.updateGrandTotal();
  }

  AddOrEdit_lmscampaignlocation(event: any, locationid: any, campaignid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(lmscampaignlocationComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, locationid, campaignid, visiblelist: this.lmscampaignlocations_visiblelist, hidelist: this.lmscampaignlocations_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_lmscampaignlocations.source.add(res[i]);
          }
          this.tbl_lmscampaignlocations.source.refresh();
        }
        else {
          this.tbl_lmscampaignlocations.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_lmscampaignlocation(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_lmscampaignlocation_IDs += childID + ",";
    this.tbl_lmscampaignlocations.source.splice(i, 1);
    //this.updateGrandTotal();
  }

  AddOrEdit_lmspost(event: any, postid: any, campaignid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(lmspostComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, postid, campaignid, visiblelist: this.lmsposts_visiblelist, hidelist: this.lmsposts_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_lmsposts.source.add(res[i]);
          }
          this.tbl_lmsposts.source.refresh();
        }
        else {
          this.tbl_lmsposts.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_lmspost(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_lmspost_IDs += childID + ",";
    this.tbl_lmsposts.source.splice(i, 1);
    //this.updateGrandTotal();
  }



  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes lmscampaigntasks
  lmscampaigntasks_settings: any;

  show_lmscampaigntasks_Checkbox() {
    debugger;
    if (this.tbl_lmscampaigntasks.source.settings['selectMode'] == 'multi') this.tbl_lmscampaigntasks.source.settings['selectMode'] = 'single';
    else
      this.tbl_lmscampaigntasks.source.settings['selectMode'] = 'multi';
    this.tbl_lmscampaigntasks.source.initGrid();
  }
  delete_lmscampaigntasks_All() {
    this.tbl_lmscampaigntasks.source.settings['selectMode'] = 'single';
  }
  show_lmscampaigntasks_Filter() {
    setTimeout(() => {
      //  this.Set_lmscampaigntasks_TableDropDownConfig();
    });
    if (this.tbl_lmscampaigntasks.source.settings != null) this.tbl_lmscampaigntasks.source.settings['hideSubHeader'] = !this.tbl_lmscampaigntasks.source.settings['hideSubHeader'];
    this.tbl_lmscampaigntasks.source.initGrid();
  }
  show_lmscampaigntasks_InActive() {
  }
  enable_lmscampaigntasks_InActive() {
  }
  async Set_lmscampaigntasks_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_lmscampaigntasks) {

      var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
      if (clone.columns['productid'] != undefined) clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_productid.value)), }, };
      if (clone.columns['productid'] != undefined) clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_productid.value)), }, };
      this.tbl_lmscampaigntasks.source.settings = clone;
      this.tbl_lmscampaigntasks.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
      if (clone.columns['campaignid'] != undefined) clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_campaignid.value)), }, };
      if (clone.columns['campaignid'] != undefined) clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_campaignid.value)), }, };
      this.tbl_lmscampaigntasks.source.settings = clone;
      this.tbl_lmscampaigntasks.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
      if (clone.columns['campaigntype'] != undefined) clone.columns['campaigntype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_campaigntype.value)), }, };
      if (clone.columns['campaigntype'] != undefined) clone.columns['campaigntype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_campaigntype.value)), }, };
      this.tbl_lmscampaigntasks.source.settings = clone;
      this.tbl_lmscampaigntasks.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
      if (clone.columns['targettype'] != undefined) clone.columns['targettype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_targettype.value)), }, };
      if (clone.columns['targettype'] != undefined) clone.columns['targettype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_targettype.value)), }, };
      this.tbl_lmscampaigntasks.source.settings = clone;
      this.tbl_lmscampaigntasks.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
      if (clone.columns['priority'] != undefined) clone.columns['priority'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_priority.value)), }, };
      if (clone.columns['priority'] != undefined) clone.columns['priority'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_priority.value)), }, };
      this.tbl_lmscampaigntasks.source.settings = clone;
      this.tbl_lmscampaigntasks.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
      if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_performancestatus.value)), }, };
      if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_performancestatus.value)), }, };
      this.tbl_lmscampaigntasks.source.settings = clone;
      this.tbl_lmscampaigntasks.source.initGrid();
    }
    this.bfilterPopulate_lmscampaigntasks = true;
  }
  async lmscampaigntasks_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_lmscampaigntasks_TableConfig() {
    this.lmscampaigntasks_settings = {
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
        custom: this.lmscampaigntask_menuactions
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
        productiddesc: {
          title: 'Product',
          type: 'html',
          filter: true,
        },
        campaigncode: {
          title: 'Campaign Code',
          type: '',
          filter: true,
        },
        campaigntypedesc: {
          title: 'Campaign Type',
          type: 'html',
          filter: true,
        },
        targettypedesc: {
          title: 'Target Type',
          type: 'html',
          filter: true,
        },
        subject: {
          title: 'Subject',
          type: '',
          filter: true,
        },
        description: {
          title: 'Description',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        advantages: {
          title: 'Advantages',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        disadvantages: {
          title: 'Disadvantages',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        assignto: {
          title: 'Assign To',
          type: '',
          filter: true,
          valuePrepareFunction: (cell, row) => {
            let ret = this.sharedService.ParseUserAccess(cell);
            return ret;
          },
        },
        assigneddate: {
          title: 'Assigned Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        targetdate: {
          title: 'Target Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        prioritydesc: {
          title: 'Priority',
          type: 'html',
          filter: true,
        },
        dailytarget: {
          title: 'Daily Target',
          type: 'number',
          filter: true,
        },
        actualachieved: {
          title: 'Actual Achieved',
          type: 'number',
          filter: true,
        },
        estimatedcost: {
          title: 'Estimated Cost',
          type: 'number',
          filter: true,
        },
        actualcost: {
          title: 'Actual Cost',
          type: 'number',
          filter: true,
        },
        successpercentage: {
          title: 'Success Percentage',
          type: 'number',
          filter: true,
        },
        performancestatusdesc: {
          title: 'Performance Status',
          type: 'html',
          filter: true,
        },
        customfield: {
          title: 'Custom Field',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            let ret = this.sharedService.getCustomValue(cell);
            return ret;
          },
        },
        attachment: {
          title: 'Attachment',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            let ret = this.sharedService.getAttachmentValue(cell);
            return ret;
          },
        },
      },
    };
  }
  lmscampaigntasks_LoadTable(lmscampaigntasks = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaigntasks_ID) >= 0) {
      if (this.tbl_lmscampaigntasks != undefined) this.tbl_lmscampaigntasks.source = new LocalDataSource();
      if (this.tbl_lmscampaigntasks != undefined) this.tbl_lmscampaigntasks.source.load(lmscampaigntasks as any as LocalDataSource);
      if (this.tbl_lmscampaigntasks != undefined) this.tbl_lmscampaigntasks.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  lmscampaigntasks_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.lmscampaignmaster_service.lmscampaigntasks.length == 0)
  {
      this.tbl_lmscampaigntasks.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new lmscampaigntask();
      this.lmscampaignmaster_service.lmscampaigntasks.push(obj);
      this.tbl_lmscampaigntasks.source.refresh();
      if ((this.lmscampaignmaster_service.lmscampaigntasks.length / this.tbl_lmscampaigntasks.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscampaigntasks.source.getPaging().page)
      {
          this.tbl_lmscampaigntasks.source.setPage((this.lmscampaignmaster_service.lmscampaigntasks.length / this.tbl_lmscampaigntasks.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_lmscampaigntasks.source.grid.edit(this.tbl_lmscampaigntasks.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_lmscampaigntasks.source.data.indexOf(event.data);
  this.onDelete_lmscampaigntask(event,event.data.taskid,((this.tbl_lmscampaigntasks.source.getPaging().page-1) *this.tbl_lmscampaigntasks.source.getPaging().perPage)+index);
  this.tbl_lmscampaigntasks.source.refresh();
  break;
  }
  }
  
  */
  lmscampaigntasks_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_lmscampaigntask(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_lmscampaigntask(event, event.data.taskid, this.formid);
        break;
      case 'delete':
        this.onDelete_lmscampaigntask(event, event.data.taskid, ((this.tbl_lmscampaigntasks.source.getPaging().page - 1) * this.tbl_lmscampaigntasks.source.getPaging().perPage) + event.index);
        this.tbl_lmscampaigntasks.source.refresh();
        break;
    }
  }
  lmscampaigntasks_onDelete(obj) {
    let taskid = obj.data.taskid;
    if (confirm('Are you sure to delete this record ?')) {
      this.lmscampaignmaster_service.delete_lmscampaignmaster(taskid).then(res =>
        this.lmscampaigntasks_LoadTable()
      );
    }
  }
  async onCustom_lmscampaigntasks_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "lmscampaigntasks");
    let formname = (objbomenuaction as any).actionname;




  }
  lmscampaigntasks_Paging(val) {
    debugger;
    this.tbl_lmscampaigntasks.source.setPaging(1, val, true);
  }

  handle_lmscampaigntasks_GridSelected(event: any) {
    this.lmscampaigntasks_selectedindex = this.tbl_lmscampaigntasks.source.findIndex(i => i.taskid === event.data.taskid);
  }
  Is_lmscampaigntasks_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaigntasks_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes lmscampaigntasks
  //start of Grid Codes lmscampaignlocations
  lmscampaignlocations_settings: any;

  show_lmscampaignlocations_Checkbox() {
    debugger;
    if (this.tbl_lmscampaignlocations.source.settings['selectMode'] == 'multi') this.tbl_lmscampaignlocations.source.settings['selectMode'] = 'single';
    else
      this.tbl_lmscampaignlocations.source.settings['selectMode'] = 'multi';
    this.tbl_lmscampaignlocations.source.initGrid();
  }
  delete_lmscampaignlocations_All() {
    this.tbl_lmscampaignlocations.source.settings['selectMode'] = 'single';
  }
  show_lmscampaignlocations_Filter() {
    setTimeout(() => {
      //  this.Set_lmscampaignlocations_TableDropDownConfig();
    });
    if (this.tbl_lmscampaignlocations.source.settings != null) this.tbl_lmscampaignlocations.source.settings['hideSubHeader'] = !this.tbl_lmscampaignlocations.source.settings['hideSubHeader'];
    this.tbl_lmscampaignlocations.source.initGrid();
  }
  show_lmscampaignlocations_InActive() {
  }
  enable_lmscampaignlocations_InActive() {
  }
  async Set_lmscampaignlocations_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_lmscampaignlocations) {

      var clone = this.sharedService.clone(this.tbl_lmscampaignlocations.source.settings);
      if (clone.columns['locationid'] != undefined) clone.columns['locationid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaignlocations_locationid.value)), }, };
      if (clone.columns['locationid'] != undefined) clone.columns['locationid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaignlocations_locationid.value)), }, };
      this.tbl_lmscampaignlocations.source.settings = clone;
      this.tbl_lmscampaignlocations.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmscampaignlocations.source.settings);
      if (clone.columns['responsibilityid'] != undefined) clone.columns['responsibilityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaignlocations_responsibilityid.value)), }, };
      if (clone.columns['responsibilityid'] != undefined) clone.columns['responsibilityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaignlocations_responsibilityid.value)), }, };
      this.tbl_lmscampaignlocations.source.settings = clone;
      this.tbl_lmscampaignlocations.source.initGrid();
    }
    this.bfilterPopulate_lmscampaignlocations = true;
  }
  async lmscampaignlocations_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_lmscampaignlocations_TableConfig() {
    this.lmscampaignlocations_settings = {
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
        custom: this.lmscampaignlocation_menuactions
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
        productid: {
          title: 'Product',
          type: 'number',
          filter: true,
        },
        locationname: {
          title: 'Location Name',
          type: '',
          filter: true,
        },
        responsibilityiddesc: {
          title: 'Responsibility',
          type: 'html',
          filter: true,
        },
        validfrom: {
          title: 'Valid From',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        validto: {
          title: 'Valid To',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        customfield: {
          title: 'Custom Field',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            let ret = this.sharedService.getCustomValue(cell);
            return ret;
          },
        },
        attachment: {
          title: 'Attachment',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            let ret = this.sharedService.getAttachmentValue(cell);
            return ret;
          },
        },
      },
    };
  }
  lmscampaignlocations_LoadTable(lmscampaignlocations = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaignlocations_ID) >= 0) {
      if (this.tbl_lmscampaignlocations != undefined) this.tbl_lmscampaignlocations.source = new LocalDataSource();
      if (this.tbl_lmscampaignlocations != undefined) this.tbl_lmscampaignlocations.source.load(lmscampaignlocations as any as LocalDataSource);
      if (this.tbl_lmscampaignlocations != undefined) this.tbl_lmscampaignlocations.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  lmscampaignlocations_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.lmscampaignmaster_service.lmscampaignlocations.length == 0)
  {
      this.tbl_lmscampaignlocations.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new lmscampaignlocation();
      this.lmscampaignmaster_service.lmscampaignlocations.push(obj);
      this.tbl_lmscampaignlocations.source.refresh();
      if ((this.lmscampaignmaster_service.lmscampaignlocations.length / this.tbl_lmscampaignlocations.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscampaignlocations.source.getPaging().page)
      {
          this.tbl_lmscampaignlocations.source.setPage((this.lmscampaignmaster_service.lmscampaignlocations.length / this.tbl_lmscampaignlocations.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_lmscampaignlocations.source.grid.edit(this.tbl_lmscampaignlocations.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_lmscampaignlocations.source.data.indexOf(event.data);
  this.onDelete_lmscampaignlocation(event,event.data.locationid,((this.tbl_lmscampaignlocations.source.getPaging().page-1) *this.tbl_lmscampaignlocations.source.getPaging().perPage)+index);
  this.tbl_lmscampaignlocations.source.refresh();
  break;
  }
  }
  
  */
  lmscampaignlocations_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_lmscampaignlocation(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_lmscampaignlocation(event, event.data.locationid, this.formid);
        break;
      case 'delete':
        this.onDelete_lmscampaignlocation(event, event.data.locationid, ((this.tbl_lmscampaignlocations.source.getPaging().page - 1) * this.tbl_lmscampaignlocations.source.getPaging().perPage) + event.index);
        this.tbl_lmscampaignlocations.source.refresh();
        break;
    }
  }
  lmscampaignlocations_onDelete(obj) {
    let locationid = obj.data.locationid;
    if (confirm('Are you sure to delete this record ?')) {
      this.lmscampaignmaster_service.delete_lmscampaignmaster(locationid).then(res =>
        this.lmscampaignlocations_LoadTable()
      );
    }
  }
  async onCustom_lmscampaignlocations_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "lmscampaignlocations");
    let formname = (objbomenuaction as any).actionname;




  }
  lmscampaignlocations_Paging(val) {
    debugger;
    this.tbl_lmscampaignlocations.source.setPaging(1, val, true);
  }

  handle_lmscampaignlocations_GridSelected(event: any) {
    this.lmscampaignlocations_selectedindex = this.tbl_lmscampaignlocations.source.findIndex(i => i.locationid === event.data.locationid);
  }
  Is_lmscampaignlocations_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaignlocations_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes lmscampaignlocations
  //start of Grid Codes lmsposts
  lmsposts_settings: any;

  show_lmsposts_Checkbox() {
    debugger;
    if (this.tbl_lmsposts.source.settings['selectMode'] == 'multi') this.tbl_lmsposts.source.settings['selectMode'] = 'single';
    else
      this.tbl_lmsposts.source.settings['selectMode'] = 'multi';
    this.tbl_lmsposts.source.initGrid();
  }
  delete_lmsposts_All() {
    this.tbl_lmsposts.source.settings['selectMode'] = 'single';
  }
  show_lmsposts_Filter() {
    setTimeout(() => {
      //  this.Set_lmsposts_TableDropDownConfig();
    });
    if (this.tbl_lmsposts.source.settings != null) this.tbl_lmsposts.source.settings['hideSubHeader'] = !this.tbl_lmsposts.source.settings['hideSubHeader'];
    this.tbl_lmsposts.source.initGrid();
  }
  show_lmsposts_InActive() {
  }
  enable_lmsposts_InActive() {
  }
  async Set_lmsposts_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_lmsposts) {

      var clone = this.sharedService.clone(this.tbl_lmsposts.source.settings);
      if (clone.columns['userid'] != undefined) clone.columns['userid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_userid.value)), }, };
      if (clone.columns['userid'] != undefined) clone.columns['userid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_userid.value)), }, };
      this.tbl_lmsposts.source.settings = clone;
      this.tbl_lmsposts.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmsposts.source.settings);
      if (clone.columns['campaigntype'] != undefined) clone.columns['campaigntype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_campaigntype.value)), }, };
      if (clone.columns['campaigntype'] != undefined) clone.columns['campaigntype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_campaigntype.value)), }, };
      this.tbl_lmsposts.source.settings = clone;
      this.tbl_lmsposts.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_lmsposts.source.settings);
      if (clone.columns['campaignstatus'] != undefined) clone.columns['campaignstatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_campaignstatus.value)), }, };
      if (clone.columns['campaignstatus'] != undefined) clone.columns['campaignstatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_campaignstatus.value)), }, };
      this.tbl_lmsposts.source.settings = clone;
      this.tbl_lmsposts.source.initGrid();
    }
    this.bfilterPopulate_lmsposts = true;
  }
  async lmsposts_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_lmsposts_TableConfig() {
    this.lmsposts_settings = {
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
        custom: this.lmspost_menuactions
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
        useriddesc: {
          title: 'User',
          type: 'html',
          filter: true,
        },
        senderemail: {
          title: 'Sender Email',
          type: '',
          filter: true,
        },
        scheduledate: {
          title: 'Schedule Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        scheduletime: {
          title: 'Schedule Time',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        contenttext: {
          title: 'Content Text',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
        },
        campaigntypedesc: {
          title: 'Campaign Type',
          type: 'html',
          filter: true,
        },
        recipientgroup: {
          title: 'Recipient Group',
          type: '',
          filter: true,
        },
        testgroup: {
          title: 'Test Group',
          type: '',
          filter: true,
        },
        sendunsubscribelink: {
          title: 'Send Unsubscribe Link',
          type: 'boolean',
          editor: {
            type: 'checkbox',
            config: {
              true: 'true',
              false: 'false',
              resetText: 'clear',
            },
          },
          filter: {
            type: 'checkbox',
            config: {
              true: 'true',
              false: 'false',
              resetText: 'clear',
            },
          },
        },
        campaignstatusdesc: {
          title: 'Campaign Status',
          type: 'html',
          filter: true,
        },
        attachment: {
          title: 'Attachment',
          type: 'html',
          filter: true,
          editor: {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            let ret = this.sharedService.getAttachmentValue(cell);
            return ret;
          },
        },
      },
    };
  }
  lmsposts_LoadTable(lmsposts = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsposts_ID) >= 0) {
      if (this.tbl_lmsposts != undefined) this.tbl_lmsposts.source = new LocalDataSource();
      if (this.tbl_lmsposts != undefined) this.tbl_lmsposts.source.load(lmsposts as any as LocalDataSource);
      if (this.tbl_lmsposts != undefined) this.tbl_lmsposts.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  lmsposts_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.lmscampaignmaster_service.lmsposts.length == 0)
  {
      this.tbl_lmsposts.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new lmspost();
      this.lmscampaignmaster_service.lmsposts.push(obj);
      this.tbl_lmsposts.source.refresh();
      if ((this.lmscampaignmaster_service.lmsposts.length / this.tbl_lmsposts.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsposts.source.getPaging().page)
      {
          this.tbl_lmsposts.source.setPage((this.lmscampaignmaster_service.lmsposts.length / this.tbl_lmsposts.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_lmsposts.source.grid.edit(this.tbl_lmsposts.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_lmsposts.source.data.indexOf(event.data);
  this.onDelete_lmspost(event,event.data.postid,((this.tbl_lmsposts.source.getPaging().page-1) *this.tbl_lmsposts.source.getPaging().perPage)+index);
  this.tbl_lmsposts.source.refresh();
  break;
  }
  }
  
  */
  lmsposts_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_lmspost(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_lmspost(event, event.data.postid, this.formid);
        break;
      case 'delete':
        this.onDelete_lmspost(event, event.data.postid, ((this.tbl_lmsposts.source.getPaging().page - 1) * this.tbl_lmsposts.source.getPaging().perPage) + event.index);
        this.tbl_lmsposts.source.refresh();
        break;
    }
  }
  lmsposts_onDelete(obj) {
    let postid = obj.data.postid;
    if (confirm('Are you sure to delete this record ?')) {
      this.lmscampaignmaster_service.delete_lmscampaignmaster(postid).then(res =>
        this.lmsposts_LoadTable()
      );
    }
  }
  async onCustom_lmsposts_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsposts");
    let formname = (objbomenuaction as any).actionname;




  }
  lmsposts_Paging(val) {
    debugger;
    this.tbl_lmsposts.source.setPaging(1, val, true);
  }

  handle_lmsposts_GridSelected(event: any) {
    this.lmsposts_selectedindex = this.tbl_lmsposts.source.findIndex(i => i.postid === event.data.postid);
  }
  Is_lmsposts_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsposts_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes lmsposts
  //start of Grid Codes lmscampaignnoaccesses
  async onCustom_lmscampaignnoaccesses_Action(event: any) {
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
    let objbomenuaction = await this.sharedService.onCustomAction(event, "lmscampaignnoaccesses");
    let formname = (objbomenuaction as any).actionname;
  }
  lmscampaignnoaccesses_settings: any;

  show_lmscampaignnoaccesses_Checkbox() {
    debugger;
    if (this.tbl_lmscampaignnoaccesses.source.settings['selectMode'] == 'multi') this.tbl_lmscampaignnoaccesses.source.settings['selectMode'] = 'single';
    else
      this.tbl_lmscampaignnoaccesses.source.settings['selectMode'] = 'multi';
    this.tbl_lmscampaignnoaccesses.source.initGrid();
  }
  delete_lmscampaignnoaccesses_All() {
    this.tbl_lmscampaignnoaccesses.source.settings['selectMode'] = 'single';
  }
  show_lmscampaignnoaccesses_Filter() {
    setTimeout(() => {
      //  this.Set_lmscampaignnoaccesses_TableDropDownConfig();
    });
    if (this.tbl_lmscampaignnoaccesses.source.settings != null) this.tbl_lmscampaignnoaccesses.source.settings['hideSubHeader'] = !this.tbl_lmscampaignnoaccesses.source.settings['hideSubHeader'];
    this.tbl_lmscampaignnoaccesses.source.initGrid();
  }
  show_lmscampaignnoaccesses_InActive() {
  }
  enable_lmscampaignnoaccesses_InActive() {
  }
  async Set_lmscampaignnoaccesses_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_lmscampaignnoaccesses) {
    }
    this.bfilterPopulate_lmscampaignnoaccesses = true;
  }
  async lmscampaignnoaccesses_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_lmscampaignnoaccesses_TableConfig() {
    this.lmscampaignnoaccesses_settings = {
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
      },
    };
  }
  lmscampaignnoaccesses_LoadTable(lmscampaignnoaccesses = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaignnoaccesses_ID) >= 0) {
      if (this.tbl_lmscampaignnoaccesses != undefined) this.tbl_lmscampaignnoaccesses.source = new LocalDataSource();
      if (this.tbl_lmscampaignnoaccesses != undefined) this.tbl_lmscampaignnoaccesses.source.load(lmscampaignnoaccesses as any as LocalDataSource);
      setTimeout(() => {
        if (this.tbl_lmscampaignnoaccesses.source != null) {
          this.tbl_lmscampaignnoaccesses.source.grid.getRows().forEach((row: any) => {
            if (row.data.accessid != null && row.data.accessid != "") {
              this.Insertlmscampaignnoaccesses.push(row.data);
              this.tbl_lmscampaignnoaccesses.source.grid.multipleSelectRow(row);
            }
          });
        }
      });
    }
  }

  //external to inline
  /*
  lmscampaignnoaccesses_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.lmscampaignmaster_service.lmscampaignnoaccesses.length == 0)
  {
      this.tbl_lmscampaignnoaccesses.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new lmscampaignnoaccess();
      this.lmscampaignmaster_service.lmscampaignnoaccesses.push(obj);
      this.tbl_lmscampaignnoaccesses.source.refresh();
      if ((this.lmscampaignmaster_service.lmscampaignnoaccesses.length / this.tbl_lmscampaignnoaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscampaignnoaccesses.source.getPaging().page)
      {
          this.tbl_lmscampaignnoaccesses.source.setPage((this.lmscampaignmaster_service.lmscampaignnoaccesses.length / this.tbl_lmscampaignnoaccesses.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_lmscampaignnoaccesses.source.grid.edit(this.tbl_lmscampaignnoaccesses.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_lmscampaignnoaccesses.source.data.indexOf(event.data);
  this.onDelete_lmscampaignnoaccess(event,event.data.accessid,((this.tbl_lmscampaignnoaccesses.source.getPaging().page-1) *this.tbl_lmscampaignnoaccesses.source.getPaging().perPage)+index);
  this.tbl_lmscampaignnoaccesses.source.refresh();
  break;
  }
  }
  
  */
  lmscampaignnoaccesses_Paging(val) {
    debugger;
    this.tbl_lmscampaignnoaccesses.source.setPaging(1, val, true);
  }

  handle_lmscampaignnoaccesses_GridSelected(event: any) {
    debugger;

    if (event.isSelected) {
      if (event.data.accessid == null || event.data.accessid == "") {
        var obj = { campaignid: this.formid, branchid: event.data.branchid }
        this.Insertlmscampaignnoaccesses.push(obj as any);
      }
      else {
        var deletedids = this.Deleted_lmscampaignnoaccess_IDs.split(',');

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
      if (event.data.accessid != null && event.data.accessid != "") this.Deleted_lmscampaignnoaccess_IDs += event.data.accessid + ",";
    }
  }
  Is_lmscampaignnoaccesses_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaignnoaccesses_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes lmscampaignnoaccesses

}



