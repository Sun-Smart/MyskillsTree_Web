import { crmcustomermasterService } from './../../../service/crmcustomermaster.service';
import { crmcustomermaster } from './../../../model/crmcustomermaster.model';
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
import { crmcustomeraccountmaster } from './../../../model/crmcustomeraccountmaster.model';
import { crmcustomeraccountmasterComponent } from './../../../pages/forms/crmcustomeraccountmaster/crmcustomeraccountmaster.component';
import { crmcustomeraccountmasterService } from './../../../service/crmcustomeraccountmaster.service';
import { crmcustomerkycmaster } from './../../../model/crmcustomerkycmaster.model';
import { crmcustomerkycmasterComponent } from './../../../pages/forms/crmcustomerkycmaster/crmcustomerkycmaster.component';
import { crmcustomerkycmasterService } from './../../../service/crmcustomerkycmaster.service';
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
  selector: 'app-crmcustomermaster',
  templateUrl: './crmcustomermaster.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class crmcustomermasterComponent implements OnInit {
  formData: crmcustomermaster;
  list: crmcustomermaster[];
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

  bfilterPopulate_crmcustomermasters: boolean = false;
  bfilterPopulate_crmcustomeraccountmasters: boolean = false;
  bfilterPopulate_crmcustomerkycmasters: boolean = false;
  crmcustomermaster_menuactions: any = []
  crmcustomeraccountmaster_menuactions: any = []
  @ViewChild('tbl_crmcustomeraccountmasters', { static: false }) tbl_crmcustomeraccountmasters: Ng2SmartTableComponent;
  crmcustomerkycmaster_menuactions: any = []
  @ViewChild('tbl_crmcustomerkycmasters', { static: false }) tbl_crmcustomerkycmasters: Ng2SmartTableComponent;

  crmcustomermaster_Form: FormGroup;

  basebranchid_List: DropDownValues[];
  basebranchid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  customertype_List: DropDownValues[];
  customergroup_List: DropDownValues[];
  categoryid_List: DropDownValues[];
  subcategoryid_List: DropDownValues[];
  territory_List: DropDownValues[];
  companytype_List: DropDownValues[];
  businesssegment_List: DropDownValues[];
  gender_List: DropDownValues[];
  relationshipmanager_List: DropDownValues[];
  relationshipmanager_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  billingcurrency_List: DropDownValues[];
  gstregistrationtype_List: DropDownValues[];
  allocationmethod_List: DropDownValues[];

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
  @ViewChild('thumbnail', { static: false }) thumbnail: AttachmentComponent;
  @ViewChild('companylogo', { static: false }) companylogo: AttachmentComponent;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;



  crmcustomeraccountmasters_visiblelist: any;
  crmcustomeraccountmasters_hidelist: any;
  crmcustomerkycmasters_visiblelist: any;
  crmcustomerkycmasters_hidelist: any;

  Deleted_crmcustomeraccountmaster_IDs: string = "";
  crmcustomeraccountmasters_ID: string = "1";
  crmcustomeraccountmasters_selectedindex: any;
  Deleted_crmcustomerkycmaster_IDs: string = "";
  crmcustomerkycmasters_ID: string = "2";
  crmcustomerkycmasters_selectedindex: any;


  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private crmcustomermaster_service: crmcustomermasterService,
    private crmcustomeraccountmaster_service: crmcustomeraccountmasterService,
    private crmcustomerkycmaster_service: crmcustomerkycmasterService,
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
    this.crmcustomermaster_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      customerid: [null],
      basebranchid: [null],
      basebranchiddesc: [null],
      customertype: [null],
      customertypedesc: [null],
      customergroup: [null],
      customergroupdesc: [null],
      categoryid: [null],
      categoryiddesc: [null],
      subcategoryid: [null],
      subcategoryiddesc: [null],
      territory: [null],
      territorydesc: [null],
      customercode: [null],
      companyname: [null],
      companytype: [null],
      companytypedesc: [null],
      incorporationdate: [null],
      businesssegment: [null],
      businesssegmentdesc: [null],
      companylogo: [null],
      thumbnail: [null],
      website: [null],
      mobilenumber: [null],
      officephone: [null],
      email: [null],
      metatags: [null],
      firstname: [null],
      lastname: [null],
      gender: [null],
      genderdesc: [null],
      dob: [null],
      emailid: [null],
      residencephone: [null],
      relationshipmanager: [null],
      relationshipmanagerdesc: [null],
      address: [null],
      shippingaddress: [null],
      billingcurrency: [null],
      billingcurrencydesc: [null],
      openingbalance: [null],
      asondate: [null],
      creditdays: [null],
      creditlimit: [null],
      accountstartfrom: [null],
      servicelevel: [null],
      slastartdate: [null],
      slaenddate: [null],
      gstregistrationtype: [null],
      gstregistrationtypedesc: [null],
      gstinnumber: [null],
      pannumber: [null],
      trnnumber: [null],
      tan: [null],
      cst: [null],
      salestax: [null],
      servicetax: [null],
      tin: [null],
      localtax: [null],
      itfilings: [null],
      lifetimevalue: [null],
      averageordervalue: [null],
      totalorders: [null],
      totalordervalue: [null],
      lastorderdate: [null],
      lastordervalue: [null],
      loyaltynumber: [null],
      pointsearned: [null],
      activepoints: [null],
      usedpoints: [null],
      expiredpoints: [null],
      lockedpoints: [null],
      blockedpoints: [null],
      pointsearnedincurrency: [null],
      activepointsincurrency: [null],
      usedpointsincurrency: [null],
      expiredpointsincurrency: [null],
      lockedpointsincurrency: [null],
      blockedpointsincurrency: [null],
      allocationmethod: [null],
      allocationmethoddesc: [null],
      customfield: [null],
      attachment: [null],
      cifnumber: [null],
      outstandingamt: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.crmcustomermaster_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.crmcustomermaster_Form.dirty && this.crmcustomermaster_Form.touched) {
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
    let pos = this.pkList.map(function (e: any) { return e.customerid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.customerid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.customerid && pkDetail) {
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
    let crmcustomermasterid = null;

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
    this.formid = crmcustomermasterid;
    //alert(crmcustomermasterid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.Set_crmcustomeraccountmasters_TableConfig();
      setTimeout(() => {
        //this.Set_crmcustomeraccountmasters_TableDropDownConfig();
      });

      this.Set_crmcustomerkycmasters_TableConfig();
      setTimeout(() => {
        //this.Set_crmcustomerkycmasters_TableDropDownConfig();
      });

      this.FillCustomField();
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }
    this.crmcustomermaster_service.getDefaultData().then(res => {
      this.basebranchid_List = res.list_basebranchid.value;
      this.customertype_List = res.list_customertype.value;
      this.customergroup_List = res.list_customergroup.value;
      this.categoryid_List = res.list_categoryid.value;
      this.territory_List = res.list_territory.value;
      this.companytype_List = res.list_companytype.value;
      this.businesssegment_List = res.list_businesssegment.value;
      this.gender_List = res.list_gender.value;
      this.relationshipmanager_List = res.list_relationshipmanager.value;
      this.billingcurrency_List = res.list_billingcurrency.value;
      this.gstregistrationtype_List = res.list_gstregistrationtype.value;
      this.allocationmethod_List = res.list_allocationmethod.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.crmcustomermaster_service.get_crmcustomermasters_List().then(res => {
      this.pkList = res as crmcustomermaster[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched 
    this.crmcustomermaster_Form.markAsUntouched();
    this.crmcustomermaster_Form.markAsPristine();
  }
  onSelected_basebranchid(basebranchidDetail: any) {
    if (basebranchidDetail.value && basebranchidDetail) {
      this.crmcustomermaster_Form.patchValue({
        basebranchid: basebranchidDetail.value,
        basebranchiddesc: basebranchidDetail.label,

      });

    }
  }

  onSelected_relationshipmanager(relationshipmanagerDetail: any) {
    if (relationshipmanagerDetail.value && relationshipmanagerDetail) {
      this.crmcustomermaster_Form.patchValue({
        relationshipmanager: relationshipmanagerDetail.value,
        relationshipmanagerdesc: relationshipmanagerDetail.label,

      });

    }
  }




  getthumbnail() {
    debugger;
    if (this.thumbnail.getAttachmentList().length > 0) {
      let file = this.thumbnail.getAttachmentList()[0];
      this.sharedService.geturl(file.filekey, file.type);
    }
  }
  getcompanylogo() {
    debugger;
    if (this.companylogo.getAttachmentList().length > 0) {
      let file = this.companylogo.getAttachmentList()[0];
      this.sharedService.geturl(file.filekey, file.type);
    }
  }
  resetForm() {
    if (this.crmcustomermaster_Form != null)
      this.crmcustomermaster_Form.reset();
    this.crmcustomermaster_Form.patchValue({
      basebranchid: this.sessionData.branchid,
      basebranchiddesc: this.sessionData.branchiddesc,
      relationshipmanager: this.sessionData.userid,
      relationshipmanagerdesc: this.sessionData.username,
    });
    setTimeout(() => {
      this.crmcustomeraccountmasters_LoadTable();
      this.crmcustomerkycmasters_LoadTable();
    });
    this.customfieldservice.reset(document);
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let customerid = this.crmcustomermaster_Form.get('customerid').value;
    if (customerid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.crmcustomermaster_service.delete_crmcustomermaster(customerid).then(res => {
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
    this.crmcustomermaster_Form.patchValue({
      customerid: null
    });
    if (this.formData.customerid != null) this.formData.customerid = null;
    for (let i = 0; i < this.tbl_crmcustomeraccountmasters.source.length; i++) {
      this.tbl_crmcustomeraccountmasters.source[i].accountid = null;
    }
    for (let i = 0; i < this.tbl_crmcustomerkycmasters.source.length; i++) {
      this.tbl_crmcustomerkycmasters.source[i].kycid = null;
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
          else if (key == "incorporationdate")
            this.crmcustomermaster_Form.patchValue({ "incorporationdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "metatags")
            this.crmcustomermaster_Form.patchValue({ "metatags": mainscreendata[key] });
          else if (key == "dob")
            this.crmcustomermaster_Form.patchValue({ "dob": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "address")
            this.crmcustomermaster_Form.patchValue({ "address": mainscreendata[key] });
          else if (key == "shippingaddress")
            this.crmcustomermaster_Form.patchValue({ "shippingaddress": mainscreendata[key] });
          else if (key == "asondate")
            this.crmcustomermaster_Form.patchValue({ "asondate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "accountstartfrom")
            this.crmcustomermaster_Form.patchValue({ "accountstartfrom": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "slastartdate")
            this.crmcustomermaster_Form.patchValue({ "slastartdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "slaenddate")
            this.crmcustomermaster_Form.patchValue({ "slaenddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "lastorderdate")
            this.crmcustomermaster_Form.patchValue({ "lastorderdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (ctrltype == "string") {
            this.crmcustomermaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.crmcustomermaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.crmcustomermaster_Form.controls[key] != undefined) {
                this.crmcustomermaster_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("crmcustomermasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
      this.customFieldServiceList = res;
      if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
      return res;
    });


  }
  onClose() {
    this.dialogRef.close(this.objvalues);
  }

  onSubmitAndWait() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.lastname != null) {
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
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.lastname != null) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  basebranchid_onChange(evt: any) {
    let e = evt.value;
  }
  customertype_onChange(evt: any) {
    let e = this.f.customertype.value as any;
    this.crmcustomermaster_Form.patchValue({ customertypedesc: evt.options[evt.options.selectedIndex].text });
  }
  customergroup_onChange(evt: any) {
    let e = this.f.customergroup.value as any;
    this.crmcustomermaster_Form.patchValue({ customergroupdesc: evt.options[evt.options.selectedIndex].text });
  }
  categoryid_onChange(evt: any) {
    let e = evt.value;
    this.crmcustomermaster_Form.patchValue({ categoryiddesc: evt.options[evt.options.selectedIndex].text });
    setTimeout(() => {
      if (this.f.categoryid.value && this.f.categoryid.value != "" && this.f.categoryid.value != null) this.crmcustomermaster_service.getList_subcategoryid(this.f.categoryid.value).then(res => this.subcategoryid_List = res as DropDownValues[]);
    });
  }
  subcategoryid_onChange(evt: any) {
    let e = evt.value;
    this.crmcustomermaster_Form.patchValue({ subcategoryiddesc: evt.options[evt.options.selectedIndex].text });
  }
  territory_onChange(evt: any) {
    let e = evt.value;
    this.crmcustomermaster_Form.patchValue({ territorydesc: evt.options[evt.options.selectedIndex].text });
  }
  companytype_onChange(evt: any) {
    let e = this.f.companytype.value as any;
    this.crmcustomermaster_Form.patchValue({ companytypedesc: evt.options[evt.options.selectedIndex].text });
  }
  businesssegment_onChange(evt: any) {
    let e = this.f.businesssegment.value as any;
    this.crmcustomermaster_Form.patchValue({ businesssegmentdesc: evt.options[evt.options.selectedIndex].text });
  }
  gender_onChange(evt: any) {
    let e = this.f.gender.value as any;
    this.crmcustomermaster_Form.patchValue({ genderdesc: evt.options[evt.options.selectedIndex].text });
  }
  relationshipmanager_onChange(evt: any) {
    let e = evt.value;
  }
  billingcurrency_onChange(evt: any) {
    let e = this.f.billingcurrency.value as any;
    this.crmcustomermaster_Form.patchValue({ billingcurrencydesc: evt.options[evt.options.selectedIndex].text });
  }
  gstregistrationtype_onChange(evt: any) {
    let e = this.f.gstregistrationtype.value as any;
    this.crmcustomermaster_Form.patchValue({ gstregistrationtypedesc: evt.options[evt.options.selectedIndex].text });
  }
  allocationmethod_onChange(evt: any) {
    let e = this.f.allocationmethod.value as any;
    this.crmcustomermaster_Form.patchValue({ allocationmethoddesc: evt.options[evt.options.selectedIndex].text });
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



  edit_crmcustomermasters() {
    this.showview = false;
    setTimeout(() => {
      if (this.thumbnail != null && this.thumbnail != undefined) this.thumbnail.setattachmentlist(this.crmcustomermaster_Form.get('thumbnail').value);
      if (this.companylogo != null && this.companylogo != undefined) this.companylogo.setattachmentlist(this.crmcustomermaster_Form.get('companylogo').value);
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.crmcustomermaster_service.get_crmcustomermasters_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.crmcustomermaster;
      let formproperty = res.crmcustomermaster.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.crmcustomermaster.pkcol;
      this.formid = res.crmcustomermaster.customerid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.crmcustomermaster;
    this.formid = res.crmcustomermaster.customerid;
    this.pkcol = res.crmcustomermaster.pkcol;
    this.bmyrecord = false;
    if ((res.crmcustomermaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.crmcustomermaster_Form.patchValue({
      customerid: res.crmcustomermaster.customerid,
      basebranchid: res.crmcustomermaster.basebranchid,
      basebranchiddesc: res.crmcustomermaster.basebranchiddesc,
      customertype: res.crmcustomermaster.customertype,
      customertypedesc: res.crmcustomermaster.customertypedesc,
      customergroup: res.crmcustomermaster.customergroup,
      customergroupdesc: res.crmcustomermaster.customergroupdesc,
      categoryid: res.crmcustomermaster.categoryid,
      categoryiddesc: res.crmcustomermaster.categoryiddesc,
      subcategoryid: res.crmcustomermaster.subcategoryid,
      subcategoryiddesc: res.crmcustomermaster.subcategoryiddesc,
      territory: res.crmcustomermaster.territory,
      territorydesc: res.crmcustomermaster.territorydesc,
      customercode: res.crmcustomermaster.customercode,
      companyname: res.crmcustomermaster.companyname,
      companytype: res.crmcustomermaster.companytype,
      companytypedesc: res.crmcustomermaster.companytypedesc,
      incorporationdate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.incorporationdate),
      businesssegment: res.crmcustomermaster.businesssegment,
      businesssegmentdesc: res.crmcustomermaster.businesssegmentdesc,
      companylogo: JSON.parse(res.crmcustomermaster.companylogo),
      thumbnail: JSON.parse(res.crmcustomermaster.thumbnail),
      website: res.crmcustomermaster.website,
      mobilenumber: res.crmcustomermaster.mobilenumber,
      officephone: res.crmcustomermaster.officephone,
      email: res.crmcustomermaster.email,
      metatags: JSON.parse(res.crmcustomermaster.metatags),
      firstname: res.crmcustomermaster.firstname,
      lastname: res.crmcustomermaster.lastname,
      gender: res.crmcustomermaster.gender,
      genderdesc: res.crmcustomermaster.genderdesc,
      dob: this.ngbDateParserFormatter.parse(res.crmcustomermaster.dob),
      emailid: res.crmcustomermaster.emailid,
      residencephone: res.crmcustomermaster.residencephone,
      relationshipmanager: res.crmcustomermaster.relationshipmanager,
      relationshipmanagerdesc: res.crmcustomermaster.relationshipmanagerdesc,
      address: JSON.parse(res.crmcustomermaster.address),
      shippingaddress: JSON.parse(res.crmcustomermaster.shippingaddress),
      billingcurrency: res.crmcustomermaster.billingcurrency,
      billingcurrencydesc: res.crmcustomermaster.billingcurrencydesc,
      openingbalance: res.crmcustomermaster.openingbalance,
      asondate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.asondate),
      creditdays: res.crmcustomermaster.creditdays,
      creditlimit: res.crmcustomermaster.creditlimit,
      accountstartfrom: this.ngbDateParserFormatter.parse(res.crmcustomermaster.accountstartfrom),
      servicelevel: res.crmcustomermaster.servicelevel,
      slastartdate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.slastartdate),
      slaenddate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.slaenddate),
      gstregistrationtype: res.crmcustomermaster.gstregistrationtype,
      gstregistrationtypedesc: res.crmcustomermaster.gstregistrationtypedesc,
      gstinnumber: res.crmcustomermaster.gstinnumber,
      pannumber: res.crmcustomermaster.pannumber,
      trnnumber: res.crmcustomermaster.trnnumber,
      tan: res.crmcustomermaster.tan,
      cst: res.crmcustomermaster.cst,
      salestax: res.crmcustomermaster.salestax,
      servicetax: res.crmcustomermaster.servicetax,
      tin: res.crmcustomermaster.tin,
      localtax: res.crmcustomermaster.localtax,
      itfilings: res.crmcustomermaster.itfilings,
      lifetimevalue: res.crmcustomermaster.lifetimevalue,
      averageordervalue: res.crmcustomermaster.averageordervalue,
      totalorders: res.crmcustomermaster.totalorders,
      totalordervalue: res.crmcustomermaster.totalordervalue,
      lastorderdate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.lastorderdate),
      lastordervalue: res.crmcustomermaster.lastordervalue,
      loyaltynumber: res.crmcustomermaster.loyaltynumber,
      pointsearned: res.crmcustomermaster.pointsearned,
      activepoints: res.crmcustomermaster.activepoints,
      usedpoints: res.crmcustomermaster.usedpoints,
      expiredpoints: res.crmcustomermaster.expiredpoints,
      lockedpoints: res.crmcustomermaster.lockedpoints,
      blockedpoints: res.crmcustomermaster.blockedpoints,
      pointsearnedincurrency: res.crmcustomermaster.pointsearnedincurrency,
      activepointsincurrency: res.crmcustomermaster.activepointsincurrency,
      usedpointsincurrency: res.crmcustomermaster.usedpointsincurrency,
      expiredpointsincurrency: res.crmcustomermaster.expiredpointsincurrency,
      lockedpointsincurrency: res.crmcustomermaster.lockedpointsincurrency,
      blockedpointsincurrency: res.crmcustomermaster.blockedpointsincurrency,
      allocationmethod: res.crmcustomermaster.allocationmethod,
      allocationmethoddesc: res.crmcustomermaster.allocationmethoddesc,
      customfield: res.crmcustomermaster.customfield,
      attachment: JSON.parse(res.crmcustomermaster.attachment),
      cifnumber: res.crmcustomermaster.cifnumber,
      outstandingamt: res.crmcustomermaster.outstandingamt,
      status: res.crmcustomermaster.status,
      statusdesc: res.crmcustomermaster.statusdesc,
    });
    this.crmcustomermaster_menuactions = res.crmcustomermaster_menuactions;
    this.crmcustomeraccountmaster_menuactions = res.crmcustomeraccountmaster_menuactions;
    this.crmcustomeraccountmasters_visiblelist = res.crmcustomeraccountmasters_visiblelist;
    this.crmcustomerkycmaster_menuactions = res.crmcustomerkycmaster_menuactions;
    this.crmcustomerkycmasters_visiblelist = res.crmcustomerkycmasters_visiblelist;
    if (this.crmcustomermaster_Form.get('customfield').value != null && this.crmcustomermaster_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.crmcustomermaster_Form.get('customfield').value);
    this.FillCustomField();
    if (this.crmcustomermaster_Form.get('thumbnail').value != null && this.crmcustomermaster_Form.get('thumbnail').value != "" && this.thumbnail != null && this.thumbnail != undefined) this.thumbnail.setattachmentlist(this.crmcustomermaster_Form.get('thumbnail').value);
    if (this.crmcustomermaster_Form.get('companylogo').value != null && this.crmcustomermaster_Form.get('companylogo').value != "" && this.companylogo != null && this.companylogo != undefined) this.companylogo.setattachmentlist(this.crmcustomermaster_Form.get('companylogo').value);
    if (this.crmcustomermaster_Form.get('attachment').value != null && this.crmcustomermaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.crmcustomermaster_Form.get('attachment').value);
    setTimeout(() => {
      if (this.f.categoryid.value && this.f.categoryid.value != "" && this.f.categoryid.value != null) this.crmcustomermaster_service.getList_subcategoryid(this.f.categoryid.value).then(res => {
        this.subcategoryid_List = res as DropDownValues[];
      }).catch((err) => { console.log(err); });
    });
    //Child Tables if any
    this.Set_crmcustomeraccountmasters_TableConfig();
    this.crmcustomeraccountmasters_LoadTable(res.crmcustomeraccountmasters);
    this.Set_crmcustomerkycmasters_TableConfig();
    this.crmcustomerkycmasters_LoadTable(res.crmcustomerkycmasters);
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.crmcustomermaster_Form.controls) {
      let val = this.crmcustomermaster_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.crmcustomermaster_Form.controls[key] != null) {
        if (key == "thumbnail" || key == "companylogo") {
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
    if (!this.crmcustomermaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.crmcustomermaster_Form.getRawValue();
    obj.incorporationdate = new Date(this.crmcustomermaster_Form.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('incorporationdate').value) + '  UTC' : null);
    if (this.crmcustomermaster_Form.get('metatags').value != null) obj.metatags = JSON.stringify(this.crmcustomermaster_Form.get('metatags').value);
    obj.dob = new Date(this.crmcustomermaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('dob').value) + '  UTC' : null);
    if (this.crmcustomermaster_Form.get('address').value != null) obj.address = JSON.stringify(this.crmcustomermaster_Form.get('address').value);
    if (this.crmcustomermaster_Form.get('shippingaddress').value != null) obj.shippingaddress = JSON.stringify(this.crmcustomermaster_Form.get('shippingaddress').value);
    obj.asondate = new Date(this.crmcustomermaster_Form.get('asondate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('asondate').value) + '  UTC' : null);
    obj.accountstartfrom = new Date(this.crmcustomermaster_Form.get('accountstartfrom').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('accountstartfrom').value) + '  UTC' : null);
    obj.slastartdate = new Date(this.crmcustomermaster_Form.get('slastartdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('slastartdate').value) + '  UTC' : null);
    obj.slaenddate = new Date(this.crmcustomermaster_Form.get('slaenddate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('slaenddate').value) + '  UTC' : null);
    obj.lastorderdate = new Date(this.crmcustomermaster_Form.get('lastorderdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('lastorderdate').value) + '  UTC' : null);
    if (customfields != null) obj.customfield = JSON.stringify(customfields);
    if (this.thumbnail.getAttachmentList() != null) obj.thumbnail = JSON.stringify(this.thumbnail.getAttachmentList());
    if (this.thumbnail.getAttachmentList() != null) obj.thumbnail = JSON.stringify(this.thumbnail.getAttachmentList());
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(obj);
    await this.sharedService.upload(this.thumbnail.getAllFiles());
    await this.sharedService.upload(this.companylogo.getAllFiles());
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
    // Object.keys(this.crmcustomermaster_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.crmcustomermaster_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.crmcustomermaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.crmcustomermaster_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.crmcustomermaster_Form.controls[key] != null) {
            this.formData[key] = this.crmcustomermaster_Form.controls[key].value;
          }
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    this.formData.incorporationdate = new Date(this.crmcustomermaster_Form.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('incorporationdate').value) + '  UTC' : null);
    if (this.crmcustomermaster_Form.get('metatags').value != null) this.formData.metatags = JSON.stringify(this.crmcustomermaster_Form.get('metatags').value);
    this.formData.dob = new Date(this.crmcustomermaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('dob').value) + '  UTC' : null);
    if (this.crmcustomermaster_Form.get('address').value != null) this.formData.address = JSON.stringify(this.crmcustomermaster_Form.get('address').value);
    if (this.crmcustomermaster_Form.get('shippingaddress').value != null) this.formData.shippingaddress = JSON.stringify(this.crmcustomermaster_Form.get('shippingaddress').value);
    this.formData.asondate = new Date(this.crmcustomermaster_Form.get('asondate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('asondate').value) + '  UTC' : null);
    this.formData.accountstartfrom = new Date(this.crmcustomermaster_Form.get('accountstartfrom').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('accountstartfrom').value) + '  UTC' : null);
    this.formData.slastartdate = new Date(this.crmcustomermaster_Form.get('slastartdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('slastartdate').value) + '  UTC' : null);
    this.formData.slaenddate = new Date(this.crmcustomermaster_Form.get('slaenddate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('slaenddate').value) + '  UTC' : null);
    this.formData.lastorderdate = new Date(this.crmcustomermaster_Form.get('lastorderdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('lastorderdate').value) + '  UTC' : null);
    if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.formData.Deleted_crmcustomeraccountmaster_IDs = this.Deleted_crmcustomeraccountmaster_IDs;
    this.formData.Deleted_crmcustomerkycmaster_IDs = this.Deleted_crmcustomerkycmaster_IDs;
    if (this.thumbnail.getAttachmentList() != null) this.formData.thumbnail = JSON.stringify(this.thumbnail.getAttachmentList());
    if (this.thumbnail.getAttachmentList() != null) this.formData.thumbnail = JSON.stringify(this.thumbnail.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.crmcustomermaster_service.saveOrUpdate_crmcustomermasters(this.formData, this.tbl_crmcustomeraccountmasters?.source?.data, this.tbl_crmcustomerkycmasters?.source?.data,).subscribe(
      async res => {
        await this.sharedService.upload(this.thumbnail.getAllFiles());
        await this.sharedService.upload(this.companylogo.getAllFiles());
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        if (this.tbl_crmcustomeraccountmasters.source) {
          for (let i = 0; i < this.tbl_crmcustomeraccountmasters.source.data.length; i++) {
            if (this.tbl_crmcustomeraccountmasters.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_crmcustomeraccountmasters.source.data[i].fileAttachmentList);
          }
        }
        if (this.tbl_crmcustomerkycmasters.source) {
          for (let i = 0; i < this.tbl_crmcustomerkycmasters.source.data.length; i++) {
            if (this.tbl_crmcustomerkycmasters.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_crmcustomerkycmasters.source.data[i].fileAttachmentList);
          }
        }
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).crmcustomermaster);
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
            this.objvalues.push((res as any).crmcustomermaster);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.crmcustomermaster_Form.markAsUntouched();
        this.crmcustomermaster_Form.markAsPristine();
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
    this.tbl_crmcustomeraccountmasters.source = new LocalDataSource();
    this.tbl_crmcustomerkycmasters.source = new LocalDataSource();
  }

  AddOrEdit_crmcustomeraccountmaster(event: any, accountid: any, customerid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(crmcustomeraccountmasterComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, accountid, customerid, visiblelist: this.crmcustomeraccountmasters_visiblelist, hidelist: this.crmcustomeraccountmasters_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_crmcustomeraccountmasters.source.add(res[i]);
          }
          this.tbl_crmcustomeraccountmasters.source.refresh();
        }
        else {
          this.tbl_crmcustomeraccountmasters.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_crmcustomeraccountmaster(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_crmcustomeraccountmaster_IDs += childID + ",";
    this.tbl_crmcustomeraccountmasters.source.splice(i, 1);
    //this.updateGrandTotal();
  }

  AddOrEdit_crmcustomerkycmaster(event: any, kycid: any, customerid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.dialog.open(crmcustomerkycmasterComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, kycid, customerid, visiblelist: this.crmcustomerkycmasters_visiblelist, hidelist: this.crmcustomerkycmasters_hidelist, ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            this.tbl_crmcustomerkycmasters.source.add(res[i]);
          }
          this.tbl_crmcustomerkycmasters.source.refresh();
        }
        else {
          this.tbl_crmcustomerkycmasters.source.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_crmcustomerkycmaster(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_crmcustomerkycmaster_IDs += childID + ",";
    this.tbl_crmcustomerkycmasters.source.splice(i, 1);
    //this.updateGrandTotal();
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes crmcustomeraccountmasters
  crmcustomeraccountmasters_settings: any;

  show_crmcustomeraccountmasters_Checkbox() {
    debugger;
    if (this.tbl_crmcustomeraccountmasters.source.settings['selectMode'] == 'multi') this.tbl_crmcustomeraccountmasters.source.settings['selectMode'] = 'single';
    else
      this.tbl_crmcustomeraccountmasters.source.settings['selectMode'] = 'multi';
    this.tbl_crmcustomeraccountmasters.source.initGrid();
  }
  delete_crmcustomeraccountmasters_All() {
    this.tbl_crmcustomeraccountmasters.source.settings['selectMode'] = 'single';
  }
  show_crmcustomeraccountmasters_Filter() {
    setTimeout(() => {
      //  this.Set_crmcustomeraccountmasters_TableDropDownConfig();
    });
    if (this.tbl_crmcustomeraccountmasters.source.settings != null) this.tbl_crmcustomeraccountmasters.source.settings['hideSubHeader'] = !this.tbl_crmcustomeraccountmasters.source.settings['hideSubHeader'];
    this.tbl_crmcustomeraccountmasters.source.initGrid();
  }
  show_crmcustomeraccountmasters_InActive() {
  }
  enable_crmcustomeraccountmasters_InActive() {
  }
  async Set_crmcustomeraccountmasters_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_crmcustomeraccountmasters) {

      var clone = this.sharedService.clone(this.tbl_crmcustomeraccountmasters.source.settings);
      if (clone.columns['customerid'] != undefined) clone.columns['customerid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_customerid.value)), }, };
      if (clone.columns['customerid'] != undefined) clone.columns['customerid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_customerid.value)), }, };
      this.tbl_crmcustomeraccountmasters.source.settings = clone;
      this.tbl_crmcustomeraccountmasters.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_crmcustomeraccountmasters.source.settings);
      if (clone.columns['productid'] != undefined) clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_productid.value)), }, };
      if (clone.columns['productid'] != undefined) clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_productid.value)), }, };
      this.tbl_crmcustomeraccountmasters.source.settings = clone;
      this.tbl_crmcustomeraccountmasters.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_crmcustomeraccountmasters.source.settings);
      if (clone.columns['holdingtype'] != undefined) clone.columns['holdingtype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_holdingtype.value)), }, };
      if (clone.columns['holdingtype'] != undefined) clone.columns['holdingtype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_holdingtype.value)), }, };
      this.tbl_crmcustomeraccountmasters.source.settings = clone;
      this.tbl_crmcustomeraccountmasters.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_crmcustomeraccountmasters.source.settings);
      if (clone.columns['customerholding'] != undefined) clone.columns['customerholding'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_customerholding.value)), }, };
      if (clone.columns['customerholding'] != undefined) clone.columns['customerholding'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_customerholding.value)), }, };
      this.tbl_crmcustomeraccountmasters.source.settings = clone;
      this.tbl_crmcustomeraccountmasters.source.initGrid();
    }
    this.bfilterPopulate_crmcustomeraccountmasters = true;
  }
  async crmcustomeraccountmasters_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_crmcustomeraccountmasters_TableConfig() {
    this.crmcustomeraccountmasters_settings = {
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
        custom: this.crmcustomeraccountmaster_menuactions
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
        cifnumber: {
          title: 'C I F Number',
          type: '',
          filter: true,
        },
        accountnumber: {
          title: 'Account Number',
          type: '',
          filter: true,
        },
        productiddesc: {
          title: 'Product',
          type: 'html',
          filter: true,
        },
        accountopendate: {
          title: 'Account Open Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        holdingtypedesc: {
          title: 'Holding Type',
          type: 'html',
          filter: true,
        },
        customerholdingdesc: {
          title: 'Customer Holding',
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
  crmcustomeraccountmasters_LoadTable(crmcustomeraccountmasters = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomeraccountmasters_ID) >= 0) {
      if (this.tbl_crmcustomeraccountmasters != undefined) this.tbl_crmcustomeraccountmasters.source = new LocalDataSource();
      if (this.tbl_crmcustomeraccountmasters != undefined) this.tbl_crmcustomeraccountmasters.source.load(crmcustomeraccountmasters as any as LocalDataSource);
      if (this.tbl_crmcustomeraccountmasters != undefined) this.tbl_crmcustomeraccountmasters.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  crmcustomeraccountmasters_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.crmcustomermaster_service.crmcustomeraccountmasters.length == 0)
  {
      this.tbl_crmcustomeraccountmasters.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new crmcustomeraccountmaster();
      this.crmcustomermaster_service.crmcustomeraccountmasters.push(obj);
      this.tbl_crmcustomeraccountmasters.source.refresh();
      if ((this.crmcustomermaster_service.crmcustomeraccountmasters.length / this.tbl_crmcustomeraccountmasters.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_crmcustomeraccountmasters.source.getPaging().page)
      {
          this.tbl_crmcustomeraccountmasters.source.setPage((this.crmcustomermaster_service.crmcustomeraccountmasters.length / this.tbl_crmcustomeraccountmasters.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_crmcustomeraccountmasters.source.grid.edit(this.tbl_crmcustomeraccountmasters.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_crmcustomeraccountmasters.source.data.indexOf(event.data);
  this.onDelete_crmcustomeraccountmaster(event,event.data.accountid,((this.tbl_crmcustomeraccountmasters.source.getPaging().page-1) *this.tbl_crmcustomeraccountmasters.source.getPaging().perPage)+index);
  this.tbl_crmcustomeraccountmasters.source.refresh();
  break;
  }
  }
  
  */
  crmcustomeraccountmasters_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_crmcustomeraccountmaster(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_crmcustomeraccountmaster(event, event.data.accountid, this.formid);
        break;
      case 'delete':
        this.onDelete_crmcustomeraccountmaster(event, event.data.accountid, ((this.tbl_crmcustomeraccountmasters.source.getPaging().page - 1) * this.tbl_crmcustomeraccountmasters.source.getPaging().perPage) + event.index);
        this.tbl_crmcustomeraccountmasters.source.refresh();
        break;
    }
  }
  crmcustomeraccountmasters_onDelete(obj) {
    let accountid = obj.data.accountid;
    if (confirm('Are you sure to delete this record ?')) {
      this.crmcustomermaster_service.delete_crmcustomermaster(accountid).then(res =>
        this.crmcustomeraccountmasters_LoadTable()
      );
    }
  }
  async onCustom_crmcustomeraccountmasters_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "crmcustomeraccountmasters");
    let formname = (objbomenuaction as any).actionname;




  }
  crmcustomeraccountmasters_Paging(val) {
    debugger;
    this.tbl_crmcustomeraccountmasters.source.setPaging(1, val, true);
  }

  handle_crmcustomeraccountmasters_GridSelected(event: any) {
    this.crmcustomeraccountmasters_selectedindex = this.tbl_crmcustomeraccountmasters.source.findIndex(i => i.accountid === event.data.accountid);
  }
  Is_crmcustomeraccountmasters_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomeraccountmasters_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes crmcustomeraccountmasters
  //start of Grid Codes crmcustomerkycmasters
  crmcustomerkycmasters_settings: any;

  show_crmcustomerkycmasters_Checkbox() {
    debugger;
    if (this.tbl_crmcustomerkycmasters.source.settings['selectMode'] == 'multi') this.tbl_crmcustomerkycmasters.source.settings['selectMode'] = 'single';
    else
      this.tbl_crmcustomerkycmasters.source.settings['selectMode'] = 'multi';
    this.tbl_crmcustomerkycmasters.source.initGrid();
  }
  delete_crmcustomerkycmasters_All() {
    this.tbl_crmcustomerkycmasters.source.settings['selectMode'] = 'single';
  }
  show_crmcustomerkycmasters_Filter() {
    setTimeout(() => {
      //  this.Set_crmcustomerkycmasters_TableDropDownConfig();
    });
    if (this.tbl_crmcustomerkycmasters.source.settings != null) this.tbl_crmcustomerkycmasters.source.settings['hideSubHeader'] = !this.tbl_crmcustomerkycmasters.source.settings['hideSubHeader'];
    this.tbl_crmcustomerkycmasters.source.initGrid();
  }
  show_crmcustomerkycmasters_InActive() {
  }
  enable_crmcustomerkycmasters_InActive() {
  }
  async Set_crmcustomerkycmasters_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_crmcustomerkycmasters) {

      var clone = this.sharedService.clone(this.tbl_crmcustomerkycmasters.source.settings);
      if (clone.columns['customerid'] != undefined) clone.columns['customerid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomerkycmasters_customerid.value)), }, };
      if (clone.columns['customerid'] != undefined) clone.columns['customerid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomerkycmasters_customerid.value)), }, };
      this.tbl_crmcustomerkycmasters.source.settings = clone;
      this.tbl_crmcustomerkycmasters.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_crmcustomerkycmasters.source.settings);
      if (clone.columns['identityname'] != undefined) clone.columns['identityname'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomerkycmasters_identityname.value)), }, };
      if (clone.columns['identityname'] != undefined) clone.columns['identityname'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomerkycmasters_identityname.value)), }, };
      this.tbl_crmcustomerkycmasters.source.settings = clone;
      this.tbl_crmcustomerkycmasters.source.initGrid();
    }
    this.bfilterPopulate_crmcustomerkycmasters = true;
  }
  async crmcustomerkycmasters_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_crmcustomerkycmasters_TableConfig() {
    this.crmcustomerkycmasters_settings = {
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
        custom: this.crmcustomerkycmaster_menuactions
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
        identitynamedesc: {
          title: 'Identity Name',
          type: 'html',
          filter: true,
        },
        identitynumber: {
          title: 'Identity Number',
          type: '',
          filter: true,
        },
        issuedate: {
          title: 'Issue Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        expirydate: {
          title: 'Expiry Date',
          type: 'custom',
          renderComponent: SmartTableDatepickerRenderComponent,
          editor: {
            type: 'custom',
            component: SmartTableDatepickerComponent,
          },
        },
        renewalrequired: {
          title: 'Renewal Required',
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
  crmcustomerkycmasters_LoadTable(crmcustomerkycmasters = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomerkycmasters_ID) >= 0) {
      if (this.tbl_crmcustomerkycmasters != undefined) this.tbl_crmcustomerkycmasters.source = new LocalDataSource();
      if (this.tbl_crmcustomerkycmasters != undefined) this.tbl_crmcustomerkycmasters.source.load(crmcustomerkycmasters as any as LocalDataSource);
      if (this.tbl_crmcustomerkycmasters != undefined) this.tbl_crmcustomerkycmasters.source.setPaging(1, 20, true);
    }
  }

  //external to inline
  /*
  crmcustomerkycmasters_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.crmcustomermaster_service.crmcustomerkycmasters.length == 0)
  {
      this.tbl_crmcustomerkycmasters.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new crmcustomerkycmaster();
      this.crmcustomermaster_service.crmcustomerkycmasters.push(obj);
      this.tbl_crmcustomerkycmasters.source.refresh();
      if ((this.crmcustomermaster_service.crmcustomerkycmasters.length / this.tbl_crmcustomerkycmasters.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_crmcustomerkycmasters.source.getPaging().page)
      {
          this.tbl_crmcustomerkycmasters.source.setPage((this.crmcustomermaster_service.crmcustomerkycmasters.length / this.tbl_crmcustomerkycmasters.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_crmcustomerkycmasters.source.grid.edit(this.tbl_crmcustomerkycmasters.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_crmcustomerkycmasters.source.data.indexOf(event.data);
  this.onDelete_crmcustomerkycmaster(event,event.data.kycid,((this.tbl_crmcustomerkycmasters.source.getPaging().page-1) *this.tbl_crmcustomerkycmasters.source.getPaging().perPage)+index);
  this.tbl_crmcustomerkycmasters.source.refresh();
  break;
  }
  }
  
  */
  crmcustomerkycmasters_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.AddOrEdit_crmcustomerkycmaster(event, null, this.formid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_crmcustomerkycmaster(event, event.data.kycid, this.formid);
        break;
      case 'delete':
        this.onDelete_crmcustomerkycmaster(event, event.data.kycid, ((this.tbl_crmcustomerkycmasters.source.getPaging().page - 1) * this.tbl_crmcustomerkycmasters.source.getPaging().perPage) + event.index);
        this.tbl_crmcustomerkycmasters.source.refresh();
        break;
    }
  }
  crmcustomerkycmasters_onDelete(obj) {
    let kycid = obj.data.kycid;
    if (confirm('Are you sure to delete this record ?')) {
      this.crmcustomermaster_service.delete_crmcustomermaster(kycid).then(res =>
        this.crmcustomerkycmasters_LoadTable()
      );
    }
  }
  async onCustom_crmcustomerkycmasters_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "crmcustomerkycmasters");
    let formname = (objbomenuaction as any).actionname;




  }
  crmcustomerkycmasters_Paging(val) {
    debugger;
    this.tbl_crmcustomerkycmasters.source.setPaging(1, val, true);
  }

  handle_crmcustomerkycmasters_GridSelected(event: any) {
    this.crmcustomerkycmasters_selectedindex = this.tbl_crmcustomerkycmasters.source.findIndex(i => i.kycid === event.data.kycid);
  }
  Is_crmcustomerkycmasters_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomerkycmasters_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes crmcustomerkycmasters

}



