
import { mstapplicantreferencerequest } from '../../model/mstapplicantreferencerequest.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../custom/duration.component';
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
import { SharedService } from '../../service/shared.service';
import { SessionService } from '../core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../custom/attachment/attachment.component';
import { mstapplicantreferencerequestsacceptedService } from '../../service/mstapplicantreferencerequestaccepted.service';
import { mstapplicantreferencerequestaccepted } from '../../model/mstapplicantreferencerequestaccepted.model';
// import { mstapplicantreferencerequestaccepted } from 'model/mstapplicantreferencerequestaccepted.model';

@Component({
  selector: 'app-mstapplicantreferencerequestsaccepted',
  templateUrl: './mstapplicantreferencerequestsaccepted.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})

export class mstapplicantreferencerequestsacceptedComponent implements OnInit {

  debugger
  formData: mstapplicantreferencerequestaccepted;
  list: mstapplicantreferencerequestaccepted[];
  bcompanyentry: boolean = false;
  bapplicantentry: boolean = false;
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

  bfilterPopulate_mstapplicantreferencerequestsaccepted: boolean = false;
  mstapplicantreferencerequest_menuactions: any = []

  mstapplicantreferencerequest_Form: FormGroup;

  applicantid_List: DropDownValues[];
  applicantid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  requestmasterdatatypeid_List: DropDownValues[];
  referenceacceptance_List: DropDownValues[];

  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showFormType: any;
  formid: any;
  pkcol: any;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentFieldJson: any[] = [];
  attachmentVisible: boolean = true;
  @ViewChild('contactfileattach', { static: false }) contactfileattach: AttachmentComponent;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;

  requestmasterdatatypeidvisible: boolean = false;
  applicantidvisible: boolean = false;
  sentvisible: boolean = false;
  receivedvisible: boolean = false;
  referencedatevisible: boolean = false;
  referenceacceptancevisible: boolean = false;
  referenceremarksvisible: boolean = false;
  requestmasteridvisible: boolean = false;
  contactuseridvisible: boolean = false;
  showHideEdit: boolean;





  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstapplicantreferencerequest_service: mstapplicantreferencerequestsacceptedService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private sanitizer: DomSanitizer,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {

    // if (this.constructor.name == "mstapplicantreferencerequestsacceptedComponent") {

    // }

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
    this.mstapplicantreferencerequest_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: [null],
      applicantiddesc: [null],
      requestid: [null],
      requestmasterdatatypeid: [null],
      requestmasterdatatypeiddesc: [null],
      requestmasterid: [null],
      requestreferencedate: [null, Validators.compose([Validators.required])],
      requestedcontact: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      contactdesignation: [null],
      contactemailid: [null, Validators.compose([Validators.required])],
      contactmobile: [null],
      contactuserid: [null],
      requestremarks: [null],
      referencedate: [null],
      referencesourcedetails: [null],
      referenceacceptance: [null],
      referenceacceptancedesc: [null],
      referenceremarks: [null],
      contactfileattach: [null],
      sent: [null],
      received: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.mstapplicantreferencerequest_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.mstapplicantreferencerequest_Form.dirty && this.mstapplicantreferencerequest_Form.touched) {
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
    let pos = this.pkList.map(function (e: any) { return e.requestid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.requestid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.requestid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  // initialize
  async ngOnInit() {
debugger
    let checkUser = localStorage.getItem('role');
    if (checkUser == '2') {
      this.showHideEdit = false;
    } else if (localStorage.getItem('3')) {
      this.showHideEdit = true;
    } else if (localStorage.getItem('1')) {
      this.showHideEdit = true;
    }


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
    let mstapplicantreferencerequestid = null;

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
    this.formid = mstapplicantreferencerequestid;
    //alert(mstapplicantreferencerequestid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.mstapplicantreferencerequest_service.getDefaultData().subscribe(res => {
      debugger
         this.applicantid_List = res.list_applicantid.value;
      this.requestmasterdatatypeid_List = res.list_requestmasterdatatypeid.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
    });
    //autocomplete

    this.mstapplicantreferencerequest_service.get_mstapplicantreferencerequests_List().subscribe(res => {
      debugger
      this.pkList = res as mstapplicantreferencerequestaccepted[];
      this.pkoptionsEvent.emit(this.pkList);
    });

    // this.mstapplicantreferencerequest_service.get_mstapplicantreferencerequests_List().then(res => {
    //   debugger
    //   this.pkList = res as mstapplicantreferencerequest[];
    //   this.pkoptionsEvent.emit(this.pkList);
    // }).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched
    this.mstapplicantreferencerequest_Form.markAsUntouched();
    this.mstapplicantreferencerequest_Form.markAsPristine();
  }
  onSelected_applicantid(applicantidDetail: any) {
    if (applicantidDetail.value && applicantidDetail) {
      this.mstapplicantreferencerequest_Form.patchValue({
        applicantid: applicantidDetail.value,
        applicantiddesc: applicantidDetail.label,

      });

    }
  }




  getcontactfileattach() {
    debugger;
    if (this.contactfileattach.getAttachmentList().length > 0) {
      let file = this.contactfileattach.getAttachmentList()[0];
      this.sharedService.geturl(file.filekey, file.type);
    }
  }
  resetForm() {
    if (this.mstapplicantreferencerequest_Form != null)
      this.mstapplicantreferencerequest_Form.reset();
    this.mstapplicantreferencerequest_Form.patchValue({
    });
    this.mstapplicantreferencerequest_Form.patchValue({
      requestreferencedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
      referencedate: this.ngbDateParserFormatter.parse(new Date().toString()),
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    this.requestmasterdatatypeidvisible = false;
    this.applicantidvisible = false;
    this.sentvisible = false;
    this.receivedvisible = false;
    this.referencedatevisible = false;
    this.referenceacceptancevisible = false;
    this.referenceremarksvisible = false;
    this.requestmasteridvisible = false;
    this.contactuseridvisible = false;
  }

  onDelete() {
    let requestid = this.mstapplicantreferencerequest_Form.get('requestid').value;
    if (requestid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.mstapplicantreferencerequest_service.delete_mstapplicantreferencerequest(requestid).then(res => {
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
    this.mstapplicantreferencerequest_Form.patchValue({
      requestid: null
    });
    if (this.formData.requestid != null) this.formData.requestid = null;
  }
  PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
    debugger
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (key == "requestreferencedate")
            this.mstapplicantreferencerequest_Form.patchValue({ "requestreferencedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "referencedate")
            this.mstapplicantreferencerequest_Form.patchValue({ "referencedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (ctrltype == "string") {
            this.mstapplicantreferencerequest_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicantreferencerequest_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicantreferencerequest_Form.controls[key] != undefined) {
                this.mstapplicantreferencerequest_Form.controls[key].disable({ onlySelf: true });
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
      // this.onSubmitDataDlg(false);
      this.onSubmitData(false);
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
  applicantid_onChange(evt: any) {
    let e = evt.value;
  }
  requestmasterdatatypeid_onChange(evt: any) {
    let e = evt.value;
    this.mstapplicantreferencerequest_Form.patchValue({ requestmasterdatatypeiddesc: evt.options[evt.options.selectedIndex].text });
  }
  referenceacceptance_onChange(evt: any) {
    let e = this.f.referenceacceptance.value as any;
    this.mstapplicantreferencerequest_Form.patchValue({ referenceacceptancedesc: evt.options[evt.options.selectedIndex].text });
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



  edit_mstapplicantreferencerequestsaccepted() {
    this.showview = false;
    setTimeout(() => {
      if (this.contactfileattach != null && this.contactfileattach != undefined) this.contactfileattach.setattachmentlist(this.mstapplicantreferencerequest_Form.get('contactfileattach').value);
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    debugger
    this.spinner.show();
    this.mstapplicantreferencerequest_service.get_mstapplicantreferencerequests_ByEID(pkcol).subscribe(res => {
      debugger
      this.spinner.hide();

      this.formData = res.mstapplicantreferencerequestaccepted;
      let formproperty = res.mstapplicantreferencerequestaccepted.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstapplicantreferencerequestaccepted.pkcol;
      this.formid = res.mstapplicantreferencerequestaccepted.requestid;
      this.FillData(res);
    });
    // this.mstapplicantreferencerequest_service.get_mstapplicantreferencerequests_ByEID(pkcol).then(res => {
    //   this.spinner.hide();

    //   this.formData = res.mstapplicantreferencerequest;
    //   let formproperty = res.mstapplicantreferencerequest.formproperty;
    //   if (formproperty && formproperty.edit == false) this.showview = true;
    //   this.pkcol = res.mstapplicantreferencerequest.pkcol;
    //   this.formid = res.mstapplicantreferencerequest.requestid;
    //   this.FillData(res);
    // }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    debugger;
    this.formData = res.mstapplicantreferencerequestaccepted;
    this.formid = res.mstapplicantreferencerequestaccepted.requestid;
    this.pkcol = res.mstapplicantreferencerequestaccepted.pkcol;
    this.bmyrecord = false;
    // if ((res.mstapplicantreferencerequestaccepted as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    debugger
    this.mstapplicantreferencerequest_Form.patchValue({
      applicantid: res.mstapplicantreferencerequestaccepted.applicantid,
      applicantiddesc: res.mstapplicantreferencerequestaccepted.applicantiddesc,
      requestid: res.mstapplicantreferencerequestaccepted.requestid,
      requestmasterdatatypeid: res.mstapplicantreferencerequestaccepted.requestmasterdatatypeid,
      requestmasterdatatypeiddesc: res.mstapplicantreferencerequestaccepted.requestmasterdatatypeiddesc,
      requestmasterid: res.mstapplicantreferencerequestaccepted.requestmasterid,
      requestreferencedate: this.ngbDateParserFormatter.parse(res.mstapplicantreferencerequestaccepted.requestreferencedate),
      requestedcontact: res.mstapplicantreferencerequestaccepted.requestedcontact,
      contactdesignation: res.mstapplicantreferencerequestaccepted.contactdesignation,
      contactemailid: res.mstapplicantreferencerequestaccepted.contactemailid,
      contactmobile: res.mstapplicantreferencerequestaccepted.contactmobile,
      contactuserid: res.mstapplicantreferencerequestaccepted.contactuserid,
      requestremarks: res.mstapplicantreferencerequestaccepted.requestremarks,
      referencedate: this.ngbDateParserFormatter.parse(res.mstapplicantreferencerequestaccepted.referencedate),
      referenceacceptance: res.mstapplicantreferencerequestaccepted.referenceacceptance,
      referenceacceptancedesc: res.mstapplicantreferencerequestaccepted.referenceacceptancedesc,
      referenceremarks: res.mstapplicantreferencerequestaccepted.referenceremarks,
      referencesourcedetails: res.referencesourcedetails?.details,
      contactfileattach: JSON.parse(res.mstapplicantreferencerequestaccepted.contactfileattach),
      sent: res.mstapplicantreferencerequestaccepted.sent,
      received: res.mstapplicantreferencerequestaccepted.received,
      attachment: JSON.parse(res.mstapplicantreferencerequestaccepted.attachment),
      status: res.mstapplicantreferencerequestaccepted.status,
      statusdesc: res.mstapplicantreferencerequestaccepted.statusdesc,
    });
    // if (this.sessionService.getItem("role") != '1' && res.mstapplicantreferencerequest.contactuserid != this.SESSIONUSERID && res.mstapplicantreferencerequest.applicantid != this.sessionService.getItem("applicantid")) {
    //   this.toastr.addSingle("No View", "", "You are not an Admin, Applicant or Referencer to view this record.Going back to home");
    //   this.router.navigate(['/home']);
    //   return;
    // }
    // else
    if (this.sessionService.getItem("role") == '1') {
      this.bcompanyentry = false;
      this.bapplicantentry = false;
    }
    else if (res.mstapplicantreferencerequestaccepted.referenceacceptance == "A" || res.mstapplicantreferencerequestaccepted.referenceacceptance == "R") {
      this.bcompanyentry = true;
      this.bapplicantentry = true;
    }
    else if (res.mstapplicantreferencerequestaccepted.applicantid) {
      this.bcompanyentry = true;
    }
    else if (res.mstapplicantreferencerequestaccepted.contactuserid) {
      this.bapplicantentry = true;
    }
    else {
      this.bcompanyentry = true;
      this.bapplicantentry = true;
    }
    this.requestmasterdatatypeidvisible = false;
    this.applicantidvisible = false;
    this.sentvisible = false;
    this.receivedvisible = false;
    this.referencedatevisible = false;
    this.referenceacceptancevisible = false;
    this.referenceremarksvisible = false;
    this.requestmasteridvisible = false;
    this.contactuseridvisible = false;
    //hide list
    if (res.visiblelist != undefined && res.visiblelist.indexOf("requestmasterdatatypeid") >= 0) this.requestmasterdatatypeidvisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("requestmasterdatatypeid") >= 0) this.requestmasterdatatypeidvisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("applicantid") >= 0) this.applicantidvisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("applicantid") >= 0) this.applicantidvisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("sent") >= 0) this.sentvisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("sent") >= 0) this.sentvisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("received") >= 0) this.receivedvisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("received") >= 0) this.receivedvisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("referencedate") >= 0) this.referencedatevisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("referencedate") >= 0) this.referencedatevisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("referenceacceptance") >= 0) this.referenceacceptancevisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("referenceacceptance") >= 0) this.referenceacceptancevisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("referenceremarks") >= 0) this.referenceremarksvisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("referenceremarks") >= 0) this.referenceremarksvisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("requestmasterid") >= 0) this.requestmasteridvisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("requestmasterid") >= 0) this.requestmasteridvisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("contactuserid") >= 0) this.contactuseridvisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("contactuserid") >= 0) this.contactuseridvisible = false;
    this.mstapplicantreferencerequest_menuactions = res.mstapplicantreferencerequest_menuactions;
    if (this.mstapplicantreferencerequest_Form.get('contactfileattach').value != null && this.mstapplicantreferencerequest_Form.get('contactfileattach').value != "" && this.contactfileattach != null && this.contactfileattach != undefined) this.contactfileattach.setattachmentlist(this.mstapplicantreferencerequest_Form.get('contactfileattach').value);
    if (this.mstapplicantreferencerequest_Form.get('attachment').value != null && this.mstapplicantreferencerequest_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicantreferencerequest_Form.get('attachment').value);
    //Child Tables if any
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.mstapplicantreferencerequest_Form.controls) {
      let val = this.mstapplicantreferencerequest_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.mstapplicantreferencerequest_Form.controls[key] != null) {
        if (key == "contactfileattach") {
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
    if (!this.mstapplicantreferencerequest_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstapplicantreferencerequest_Form.getRawValue();
    obj.requestreferencedate = new Date(this.mstapplicantreferencerequest_Form.get('requestreferencedate').value ? this.ngbDateParserFormatter.format(this.mstapplicantreferencerequest_Form.get('requestreferencedate').value) + '  UTC' : null);
    obj.referencedate = new Date(this.mstapplicantreferencerequest_Form.get('referencedate').value ? this.ngbDateParserFormatter.format(this.mstapplicantreferencerequest_Form.get('referencedate').value) + '  UTC' : null);
    if (this.contactfileattach.getAttachmentList() != null) obj.contactfileattach = JSON.stringify(this.contactfileattach.getAttachmentList());
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(obj);
    await this.sharedService.upload(this.contactfileattach.getAllFiles());
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
    // Object.keys(this.mstapplicantreferencerequest_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.mstapplicantreferencerequest_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.mstapplicantreferencerequest_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    // if (!this.validate()) {
    //   return;
    // }
    this.formData = this.mstapplicantreferencerequest_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.mstapplicantreferencerequest_Form.controls[key] != null) {
            this.formData[key] = this.mstapplicantreferencerequest_Form.controls[key].value;
          }
        }
      }
    }
    this.formData.requestreferencedate = new Date(this.mstapplicantreferencerequest_Form.get('requestreferencedate').value ? this.ngbDateParserFormatter.format(this.mstapplicantreferencerequest_Form.get('requestreferencedate').value) + '  UTC' : null);
    this.formData.referencedate = new Date(this.mstapplicantreferencerequest_Form.get('referencedate').value ? this.ngbDateParserFormatter.format(this.mstapplicantreferencerequest_Form.get('referencedate').value) + '  UTC' : null);
    this.formData.contactfileattach = this.mstapplicantreferencerequest_Form.get('contactfileattach').value;
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    if (this.contactfileattach.getAttachmentList() != null) this.formData.contactfileattach = JSON.stringify(this.contactfileattach.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.mstapplicantreferencerequest_service.saveOrUpdate_mstapplicantreferencerequests(this.formData).subscribe(
      async res => {
        debugger
        await this.sharedService.upload(this.contactfileattach.getAllFiles());
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).mstapplicantreferencerequestaccepted);
        if (!bclear) this.showview = true;
        // if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
        if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          this.dialogRef.close(this.objvalues);
          return;
        }
        else {
          // if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
        }
        this.clearList();
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.objvalues.push((res as any).mstapplicantreferencerequestaccepted);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.mstapplicantreferencerequest_Form.markAsUntouched();
        this.mstapplicantreferencerequest_Form.markAsPristine();
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
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }

}



