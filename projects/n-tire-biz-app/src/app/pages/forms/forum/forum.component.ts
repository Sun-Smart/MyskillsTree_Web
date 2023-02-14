import { boforumService } from './../../../service/boforum.service';
import { boforum } from './../../../model/boforum.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { ReportViewerCtrlComponent } from '../../../../../../n-tire-bo-app/src/app/pages/forms/boreportviewer/reportviewerctrl.component';
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';

//child table

//Custom control
import { durationComponent } from '../../../custom/duration.component';
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
import 'rxjs/add/observable/of';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';

//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog'

//session,application constants
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
import { ThemeService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';
import { customfieldconfigurationService } from './../../../service/customfieldconfiguration.service';
import { customfieldconfiguration } from './../../../model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../dynamic-form-builder/dynamic-form-builder.component';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.scss']
})
export class ForumComponent implements OnInit {
  blockedDocument: boolean = false;
  formData: boforum;
  list: boforum[];
  bmyrecord: boolean = false;
  hidelist: any = [];
  keylist: any = [];
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
  @ViewChild('panelscroller') private panelscroller: ElementRef;
  CustomFormName: string = "";
  CustomFormField: string = "";
  CustomFormFieldValue: string = "";
  p_menuid: any;
  p_currenturl: any;
  isSubmitted: boolean = false;
  ShowTableslist: string[] = [];
  data: any;
  maindata: any;

  bfilterPopulate_boforums: boolean = false;
  boforum_menuactions: any = []

  boforum_Form: FormGroup;

  forumtype_List: DropDownValues[];
  forumtype_Suggestions: any[];
  forumtype_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  forumaccess_List: DropDownValues[];
  forumaccess_Selected: any[] = [];
  forumaccess_Available: any[] = [];
  forumstatus_List: DropDownValues[];
  forumstatus_Suggestions: any[];
  forumstatus_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

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

  constructor(private nav: Location,
    private translate: TranslateService, private router: Router,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private boforum_service: boforumService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private customfieldservice: customfieldconfigurationService,
    private sanitizer: DomSanitizer,
    private currentRoute: ActivatedRoute) {
    try {
      this.sessionData = this.sessionService.getSession();
      if (this.sessionData != null) {
        this.translate.use(this.sessionData.language);
      }
      this.data = dynamicconfig;
      this.p_menuid = sharedService.menuid;
      this.p_currenturl = sharedService.currenturl;

      this.boforum_Form = this.fb.group({
        pkcol: [null],
        pk: [null],
        ImageName: [null],
        forumid: [null],
        title: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
        description: [null, Validators.compose([Validators.maxLength(200)])],
        forumtype: [null, Validators.compose([Validators.maxLength(10)])],
        forumtypedesc: [null],
        comments: [null],
        forumaccess: [null],
        forumaccessdesc: [null],
        forumstatus: [null, Validators.compose([Validators.maxLength(10)])],
        forumstatusdesc: [null],
        customfield: [null],
        attachment: [null],
        status: [null],
        statusdesc: [null],
      });
    } catch (e) {
      this.blockedDocument = false;
      // this.sharedService.error(e);
    }
  }
  get f() { return this.boforum_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    //debugger;
    if (this.boforum_Form.dirty && this.boforum_Form.touched) {
      if (confirm('Do you want to exit the page?')) {
        return Observable.of(true);
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
    //debugger;
    let pos = this.pkList.map(function (e: any) { return e.forumid?.toString(); }).indexOf(this.formid?.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }
  next() {
    //debugger;
    let pos = this.pkList.map(function (e: any) { return e.forumid?.toString(); }).indexOf(this.formid?.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.forumid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  // initialize
  async ngOnInit() {
    try {
      if (this.panelscroller != undefined) (this.panelscroller as any)?.scrollTop(0);

      this.sessionData = this.sessionService.getSession();
      if (this.sessionData != null) {
        this.SESSIONUSERID = this.sessionData.userid;
      }

      this.theme = this.sessionService.getItem('selected-theme');
      //this.viewHtml=this.sessionService.getViewHtml();

      //debugger;
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
      let boforumid = null;

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
      this.formData = new boforum();
      this.PopulateFromMainScreen(this.data, false);
      this.PopulateFromMainScreen(this.dynamicconfig.data, true);
      if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
        this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
      }
      this.formid = boforumid;
      //alert(boforumid);

      //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
      if (this.pkcol == null) {
        this.FillCustomField();
        this.resetForm();
      }
      else {
        if (this.maindata == undefined || this.maindata == null || this.pkcol != null) await this.PopulateScreen(this.pkcol);
        //get the record from api
        //foreign keys
      }
      this.boforum_service.getDefaultData().then(res => {
        this.forumtype_List = res.list_forumtype.value;
        if (this.formData?.forumtype != undefined && this.formData?.forumtype != null) {
          this.boforum_Form.patchValue({
            forumtype: this.formData.forumtype
          });
        }
        this.forumaccess_Selected = [];
        this.forumaccess_List = res.list_forumaccess.value;
        this.forumaccess_Available = this.forumaccess_List.map(x => Object.assign({}, x));
        for (let i = 0; i < this.formData.forumaccess?.length; i++) {
          let obj = Object.assign({}, this.sharedService.getValue(this.forumaccess_Available, this.formData.forumaccess[i], ''));
          if (obj != undefined) this.forumaccess_Selected.push(obj);
          if (obj != undefined) {
            let index = this.forumaccess_Available.map(function (e) { return e.value; }).indexOf(obj.value);
            if (obj != undefined) this.forumaccess_Available.splice(index, 1);
          }
        }
        this.forumstatus_List = res.list_forumstatus.value;
        if (this.formData?.forumstatus != undefined && this.formData?.forumstatus != null) {
          this.boforum_Form.patchValue({
            forumstatus: this.formData.forumstatus
          });
        }
      }).catch((err) => {
        this.blockedDocument = false;
        if (this.sharedService.IsDebug) console.log(err);
        this.toastr.addSingle("error", "", 'autocomplete ' + err);
      });

      //autocomplete
      this.boforum_service.get_boforums_List().then(res => {
        this.pkList = res as boforum[];
        this.pkoptionsEvent.emit(this.pkList);
      }
      ).catch((err) => {
        this.blockedDocument = false;
        if (this.sharedService.IsDebug) console.log(err);
        this.toastr.addSingle("error", "", 'boforumsList ' + err);
      });
      //setting the flag that the screen is not touched
      this.blockedDocument = false;
      this.boforum_Form.markAsUntouched();
      this.boforum_Form.markAsPristine();
    } catch (e) {
      this.blockedDocument = false;
      // this.sharedService.error(e);
    }
  }
  onEntered_forumtype(value: any) {
    this.forumtype_Suggestions = this.forumtype_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
  }
  onSelected_forumtype(forumtypeDetail: any) {
    if (forumtypeDetail.value && forumtypeDetail) {

    }
  }

  onEntered_forumstatus(value: any) {
    this.forumstatus_Suggestions = this.forumstatus_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
  }
  onSelected_forumstatus(forumstatusDetail: any) {
    if (forumstatusDetail.value && forumstatusDetail) {

    }
  }
  resetForm() {
    this.formid = "";
    this.showview = false;
    if (this.boforum_Form != null)
      this.boforum_Form.reset();
    this.boforum_Form.patchValue({
      forumaccess: this.sessionData.userid,
      forumaccessdesc: this.sessionData.username,
    });
    this.customfieldservice.reset(document);
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  async onDelete(): Promise<any> {
    let forumid = this.boforum_Form.get('forumid').value;
    if (forumid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        let res = await this.boforum_service.delete_boforum(forumid);
        this.toastr.addSingle("success", "", "Successfully Deleted");
        this.resetForm();
        return new Promise(resolve => {
          resolve(true);
        });
      }
    }
    else {
      this.toastr.addSingle("error", "", "select a record");
    }
  }
  onCopy() {
    this.formid = null;
    this.boforum_Form.patchValue({
      forumid: null
    });
    if (this.formData.forumid != null) this.formData.forumid = null;
  }
  onCopyDetails() {
    this.formid = null;
    this.boforum_Form.patchValue({
      forumid: null
    });
    if (this.formData.forumid != null) this.formData.forumid = null;
  }
  PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'forumid' && key != 'attachment' && key != 'customfield') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (key == "comments")
            this.boforum_Form.patchValue({ "comments": mainscreendata[key] });
          else if (ctrltype == "string") {
            this.boforum_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.boforum_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.boforum_Form.controls[key] != undefined) {
                this.boforum_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
                this.keylist.push(key);
                this.formData[key] = this.f[key]?.value;
              }
            }
          }
        }
      }
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("boforums", this.CustomFormName, "", "", this.customFieldJson).then(res => {
      this.customFieldServiceList = res;
      if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
      return res;
    });


  }
  onClose() {
    this.dialogRef.close(null);
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
  forumtype_onChange(evt: any) {
    let e = this.f.forumtype.value as any;
  }
  forumstatus_onChange(evt: any) {
    let e = this.f.forumstatus.value as any;
  }
  attachmentuploader(e: any) {
    for (let i = 0; i < e.files.length; i++) {
      this.fileAttachmentList.push(e.files[i]);
      let max = 0;
      let attachmentobj = null;
      if (this.attachmentFieldJson == null) this.attachmentFieldJson = [];
      max = Array.of(this.attachmentFieldJson).length; attachmentobj = new KeyValuePair((this.attachmentFieldJson.length + 1 + max)?.toString(), e.files[i].name);
      this.attachmentFieldJson.push(attachmentobj);
      max = 0;
      if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max)?.toString(), e.files[i].name);
      this.attachmentlist.push(attachmentobj);
    }
  }
  edit_boforums() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }



  InitializeGrid() {
    try {
    } catch (e) {
      this.blockedDocument = false;
      // this.sharedService.error(e);
    }
  }

  async PopulateScreen(pkcol: any): Promise<any> {
    try {
      this.blockedDocument = true;
      this.boforum_service.get_boforums_ByEID(pkcol).then(res => {
        this.blockedDocument = false;

        this.formData = res.boforum;
        let formproperty = res.boforum.formproperty;
        if (formproperty && formproperty.edit == false) this.showview = true;
        this.pkcol = res.boforum.pkcol;
        this.formid = res.boforum.forumid;
        setTimeout(() => {
          this.InitializeGrid();
          this.FillData(res)
        }, 500);
      }).catch((err) => {
        this.blockedDocument = false;
        if (this.sharedService.IsDebug) console.log(err);
        this.toastr.addSingle("error", "", 'filldata ' + err);
      });
    } catch (e) {
      this.blockedDocument = false;
      // this.sharedService.error(e);
    }
  }

  FillData(res: any) {
    try {
      this.formData = res.boforum;
      this.formid = res.boforum.forumid;
      this.pkcol = res.boforum.pkcol;
      this.bmyrecord = false;
      if ((res.boforum as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
      console.log(res);
      //console.log(res.order);
      //console.log(res.orderDetails);
      this.boforum_Form.patchValue({
        pkcol: res.boforum.pkcol,
        forumid: res.boforum.forumid,
        title: res.boforum.title,
        description: res.boforum.description,
        forumtype: this.sharedService.getValue(this.forumtype_List, res.boforum.forumtype, 'forumtype'),
        forumtypedesc: res.boforum.forumtypedesc,
        comments: res.boforum.comments,
        forumaccess: this.sharedService.getValue(this.forumaccess_List, res.boforum.forumaccess, 'forumaccess'),
        forumaccessdesc: res.boforum.forumaccessdesc,
        forumstatus: this.sharedService.getValue(this.forumstatus_List, res.boforum.forumstatus, 'forumstatus'),
        forumstatusdesc: res.boforum.forumstatusdesc,
        customfield: res.boforum.customfield,
        attachment: res.boforum.attachment,
        status: res.boforum.status,
        statusdesc: res.boforum.statusdesc,
      });
      this.boforum_menuactions = res.boforum_menuactions;
      if (this.boforum_Form.get('customfield').value != null && this.boforum_Form.get('customfield').value != "") this.customFieldJson = this.boforum_Form.get('customfield').value;
      this.FillCustomField();
      if (this.boforum_Form.get('attachment').value != null && this.boforum_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.boforum_Form.get('attachment').value);
      this.forumaccess_Selected = [];
      this.forumaccess_Available = this.forumaccess_List.map(x => Object.assign({}, x));
      for (let i = 0; i < this.formData.forumaccess?.length; i++) {
        let obj = Object.assign({}, this.sharedService.getValue(this.forumaccess_Available, this.formData.forumaccess[i], ''));
        if (obj != undefined) this.forumaccess_Selected.push(obj);
        if (obj != undefined) {
          let index = this.forumaccess_Available.map(function (e) { return e.value; }).indexOf(obj.value);
          this.forumaccess_Available.splice(index, 1);
        }
      }
      //Child Tables if any
      setTimeout(() => {
      });
    } catch (e) {
      this.blockedDocument = false;
      // this.sharedService.error(e);
    }
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;

    for (let key in this.boforum_Form.controls) {
      let val = this.boforum_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.boforum_Form.controls[key] != null) {
        if (false) {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + this.formData[key])[0]["name"];
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
    return this.sanitizer.bypassSecurityTrustHtml(ret) as SafeHtml;
  }

  SetFormValues() {
    if (this.forumaccess_Selected.length > 0 && this.forumaccess_Selected != null) {
      let forumaccessstring = this.forumaccess_Selected.map(function (elem) { return elem.value; }).join(",");
      this.boforum_Form.patchValue({
        forumaccess: forumaccessstring
      });

    }
  }

  GetFormValues() {
    let formData: any;
    formData = this.boforum_Form.getRawValue();
    var customfields = this.customfieldservice.getCustomValues(document);
    formData.forumtype = (this.boforum_Form.get('forumtype'))?.value?.value;
    if (this.boforum_Form.get('comments').value != null) formData.comments = JSON.stringify(this.boforum_Form.get('comments').value);
    formData.forumaccess = null;
    if (this.forumaccess_Selected.length > 0 && this.forumaccess_Selected != null) formData.forumaccessstring = this.forumaccess_Selected.map(function (elem) { return elem.value; }).join(",");
    formData.forumstatus = (this.boforum_Form.get('forumstatus'))?.value?.value;
    if (customfields != null) formData.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
          if (this.boforum_Form.controls[key] != null) {
            formData[key] = this.dynamicconfig.data[key];
          }
        }
      }
    }
    formData.forumid = this.formid;
    return formData;
  }
  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.boforum_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.GetFormValues();
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



  async onSubmitData(bclear: any): Promise<any> {
    try {
      //debugger;
      this.SetFormValues();
      this.isSubmitted = true;
      let strError = "";
      Object.keys(this.boforum_Form.controls).forEach(key => {
        const controlErrors: ValidationErrors = this.boforum_Form.get(key).errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            // strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
          });
        }
      });
      if (this.customform != undefined) {
        Object.keys(this.customform?.form?.controls).forEach(key => {
          const controlErrors: ValidationErrors = this.customform.form.get(key).errors;
          if (controlErrors != null) {
            Object.keys(controlErrors).forEach(keyError => {
              // strError += this.sharedService.getErrorText(key, keyError, controlErrors[keyError]) + '\n';
            });
          }
        });
      }
      if (strError != "") return this.sharedService.alert(strError);


      if (!this.boforum_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
        this.toastr.addSingle("error", "", "Enter the required fields");
        return;
      }
      if (!this.validate()) {
        return;
      }
      this.formData = this.GetFormValues();
      this.fileAttachmentList = this.fileattachment.getAllFiles();
      console.log(this.formData);
      this.blockedDocument = true;
      let res = await this.boforum_service.save_boforums(this.formData, this.fileAttachmentList);
      this.blockedDocument = false;
      //debugger;
      this.toastr.addSingle("success", "", "Successfully saved");
      this.objvalues.push((res as any).boforum);
      if (!bclear && (this.formid != null && this.formid != "")) this.showview = true;
      if (this.panelscroller != undefined) (this.panelscroller as any)?.scrollTop(0);
      if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
        this.dialogRef.close(this.objvalues);
        return;
      }
      else {
        if (this.panelscroller != undefined) (this.panelscroller as any)?.scrollTop(0);
      }
      this.clearList();
      if (bclear) {
        this.resetForm();
      }
      else {
        if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          this.objvalues.push((res as any).boforum);
          this.dialogRef.close(this.objvalues);
        }
        else {
          this.FillData(res);
        }
      }
      this.blockedDocument = false;
      this.boforum_Form.markAsUntouched();
      this.boforum_Form.markAsPristine();
      return new Promise(resolve => {
        resolve(res);
      });
    } catch (e) {
      this.blockedDocument = false;
      // this.sharedService.error(e);
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
}
