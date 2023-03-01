import { mstapplicantreferencerequestService } from './../../service/mstapplicantreferencerequest.service';
import { mstapplicantreferencerequest } from './../../model/mstapplicantreferencerequest.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyValuePair } from '../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../n-tire-biz-app/src/app/shared/helper';
import { AttachmentComponent } from '../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';

@Component({
  selector: 'app-mstapplicantreferenceaccepted',
  templateUrl: './mstapplicantreferenceaccepted.component.html',
  styleUrls: []
})
export class MstapplicantreferenceacceptedComponent implements OnInit {
  formData: mstapplicantreferencerequest;
  list: mstapplicantreferencerequest[];
  bcompanyentry: boolean = false;
  bapplicantentry: boolean = false;
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
  bfilterPopulate_mstapplicantreferencerequests: boolean = false;
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
  showhidedate: boolean = true;
  showhideremarks: boolean = true;
  showhidereference: boolean = true;
  showhidedetails: any;
  loadinghide:boolean=false
  constructor(private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstapplicantreferencerequest_service: mstapplicantreferencerequestService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;
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

  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  canDeactivate(): Observable<boolean> | boolean {
    if (this.mstapplicantreferencerequest_Form.dirty && this.mstapplicantreferencerequest_Form.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true).delay(1000);
      } else {
        return Observable.of(false);
      }
    }
    return Observable.of(true);
  }

  onSelectedpk(pkDetail: any) {
    if (pkDetail.requestid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  async ngOnInit() {
    this.themeService.theme.subscribe((val: string) => {
      this.theme = val;
    });

    this.theme = this.sessionService.getItem('selected-theme');
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

    if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
      this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
      this.showview = true;
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
    this.viewHtml = ``;
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
    }
    this.formid = mstapplicantreferencerequestid;

    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
    }
    this.mstapplicantreferencerequest_service.getDefaultDataaccepted().subscribe(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.requestmasterdatatypeid_List = res.list_requestmasterdatatypeid.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
    });

    this.mstapplicantreferencerequest_service.get_mstapplicantreferencerequests_Listaccepted().subscribe(res => {
      this.pkList = res as mstapplicantreferencerequest[];
      this.pkoptionsEvent.emit(this.pkList);
    });
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
        this.mstapplicantreferencerequest_service.delete_mstapplicantreferencerequestaccepted(requestid).subscribe(res => {
          this.resetForm();
        }
        ).catch((err) => { this.spinner.hide();});
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

  edit_mstapplicantreferencerequests() {
    this.showview = false;
    setTimeout(() => {
      if (this.contactfileattach != null && this.contactfileattach != undefined) this.contactfileattach.setattachmentlist(this.mstapplicantreferencerequest_Form.get('contactfileattach').value);
    });
    return false;
  }

  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.mstapplicantreferencerequest_service.get_mstapplicantreferencerequests_ByEIDaccepted(pkcol).subscribe(res => {
      this.spinner.hide();
      this.showhidedetails = res.completelist;
      if (res.completelist[0] == 'False') {
        this.showhidedate = true;
        this.showhideremarks = true;
        this.showhidereference = true;
      } else if (res.completelist[0] == 'true') {
        this.showhidedate = false;
        this.showhideremarks = false;
        this.showhidereference = false;
        this.showSubmit=!this.showSubmit
      }

      this.formData = res.mstapplicantreferencerequest;
      let formproperty = res.mstapplicantreferencerequest.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstapplicantreferencerequest.pkcol;
      this.formid = res.mstapplicantreferencerequest.requestid;
      this.FillData(res);
    });
  }

  FillData(res: any) {
    this.formData = res.mstapplicantreferencerequest;
    this.formid = res.mstapplicantreferencerequest.requestid;
    this.pkcol = res.mstapplicantreferencerequest.pkcol;
    this.bmyrecord = false;
    this.mstapplicantreferencerequest_Form.patchValue({
      applicantid: res.mstapplicantreferencerequest.applicantid,
      applicantiddesc: res.mstapplicantreferencerequest.applicantiddesc,
      requestid: res.mstapplicantreferencerequest.requestid,
      requestmasterdatatypeid: res.mstapplicantreferencerequest.requestmasterdatatypeid,
      requestmasterdatatypeiddesc: res.mstapplicantreferencerequest.requestmasterdatatypeiddesc,
      requestmasterid: res.mstapplicantreferencerequest.requestmasterid,
      requestreferencedate: this.ngbDateParserFormatter.parse(res.mstapplicantreferencerequest.requestreferencedate),
      requestedcontact: res.mstapplicantreferencerequest.requestedcontact,
      contactdesignation: res.mstapplicantreferencerequest.contactdesignation,
      contactemailid: res.mstapplicantreferencerequest.contactemailid,
      contactmobile: res.mstapplicantreferencerequest.contactmobile,
      contactuserid: res.mstapplicantreferencerequest.contactuserid,
      requestremarks: res.mstapplicantreferencerequest.requestremarks,
      referencedate: this.ngbDateParserFormatter.parse(res.mstapplicantreferencerequest.referencedate),
      referenceacceptance: res.mstapplicantreferencerequest.referenceacceptance,
      referenceacceptancedesc: res.mstapplicantreferencerequest.referenceacceptancedesc,
      referenceremarks: res.mstapplicantreferencerequest.referenceremarks,
      referencesourcedetails: res.referencesourcedetails?.details,
      contactfileattach: JSON.parse(res.mstapplicantreferencerequest.contactfileattach),
      sent: res.mstapplicantreferencerequest.sent,
      received: res.mstapplicantreferencerequest.received,
      attachment: JSON.parse(res.mstapplicantreferencerequest.attachment),
      status: res.mstapplicantreferencerequest.status,
      statusdesc: res.mstapplicantreferencerequest.statusdesc,
    });
    this.bcompanyentry = true;
    this.bapplicantentry = true;
    if (res.mstapplicantreferencerequest.referenceacceptance == "A" || res.mstapplicantreferencerequest.referenceacceptance == "R") {
      this.bcompanyentry = true;
      this.bapplicantentry = true;
    }
    else if (this.sessionService.getItem("role") == '' && res.mstapplicantreferencerequest.applicantid == res.mstapplicantreferencerequest.applicantid) {
      this.bcompanyentry = true;
    }
    else if (res.mstapplicantreferencerequest.contactuserid) {
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
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    await this.sharedService.upload(this.fileAttachmentList);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
    this.objvalues.push(obj);
    this.dialogRef.close(this.objvalues);
  }

  afterAction(mode: any) {
    let formname = "";
    let query = "";
    if (mode == "new")
      this.router.navigate(['/home/' + formname + '/' + formname + query]);
    else if (mode == "refresh")
      this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
  }



  async onSubmitData(bclear: any) {
    this.isSubmitted = true;
    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);

    if (!this.mstapplicantreferencerequest_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
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
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    this.loadinghide=true
    this.mstapplicantreferencerequest_service.saveOrUpdate_mstapplicantreferencerequestsaccepted(this.formData).subscribe(
      async res => {
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.loadinghide=false
        this.toastr.addSingle("success", "", "Successfully saved");
        window.location.reload();
        this.objvalues.push((res as any).mstapplicantreferencerequest);
        if (!bclear) this.showview = true;
        if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          this.dialogRef.close(this.objvalues);
          return;
        }
        else {}
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.objvalues.push((res as any).mstapplicantreferencerequest);
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
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
      }
    )
  }

  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }

}
