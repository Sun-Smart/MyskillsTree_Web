import { bousergroupService } from './../../../service/bousergroup.service';
import { bousergroup } from './../../../model/bousergroup.model';
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
import { bousergroupaccess } from './../../../model/bousergroupaccess.model';
import { bousergroupaccessComponent } from './../../../pages/forms/bousergroupaccess/bousergroupaccess.component';
import { bousergroupaccessService } from './../../../service/bousergroupaccess.service';
import { bousermasterComponent } from './../bousermaster/bousermaster.component';
import { bousermasterService } from './../../../service/bousermaster.service';
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
  selector: 'app-bousergroup',
  templateUrl: './bousergroup.component.html',
  styles: [],
  providers: [KeyboardShortcutsService]
})



export class bousergroupComponent implements OnInit {
  formData: bousergroup;
  list: bousergroup[];
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

  bfilterPopulate_bousergroups: boolean = false;
  bfilterPopulate_bousergroupaccesses: boolean = false;
  bousergroup_menuactions: any = []
  Insertbousergroupaccesses = [];
  bousergroupaccess_menuactions: any = []
  @ViewChild('tbl_bousergroupaccesses', { static: false }) tbl_bousergroupaccesses: Ng2SmartTableComponent;

  bousergroup_Form: FormGroup;


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



  bousergroupaccesses_visiblelist: any;
  bousergroupaccesses_hidelist: any;

  Deleted_bousergroupaccess_IDs: string = "";
  bousergroupaccesses_ID: string = "1";
  bousergroupaccesses_selectedindex: any;


  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private bousergroup_service: bousergroupService,
    private bousermaster_service: bousermasterService,
    private bousergroupaccess_service: bousergroupaccessService,
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
    this.bousergroup_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      usergroupid: [null],
      groupname: [null],
      notes: [null],
      customfield: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.bousergroup_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.bousergroup_Form.dirty && this.bousergroup_Form.touched) {
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
    let pos = this.pkList.map(function (e: any) { return e.usergroupid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.usergroupid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.usergroupid && pkDetail) {
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
    let bousergroupid = null;

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
    this.formid = bousergroupid;
    //alert(bousergroupid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.Set_bousergroupaccesses_TableConfig();
      setTimeout(() => {
        //this.Set_bousergroupaccesses_TableDropDownConfig();
      });

      this.FillCustomField();
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys 
    }
    this.bousergroup_service.getDefaultData().then(res => {
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.bousergroup_service.get_bousergroups_List().then(res => {
      this.pkList = res as bousergroup[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched 
    this.bousergroup_Form.markAsUntouched();
    this.bousergroup_Form.markAsPristine();
  }



  resetForm() {
    if (this.bousergroup_Form != null)
      this.bousergroup_Form.reset();
    this.bousergroup_Form.patchValue({
    });
    setTimeout(() => {
      this.Insertbousergroupaccesses = [];
      this.bousergroupaccesses_LoadTable();
    });
    this.customfieldservice.reset(document);
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let usergroupid = this.bousergroup_Form.get('usergroupid').value;
    if (usergroupid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.bousergroup_service.delete_bousergroup(usergroupid).then(res => {
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
    this.bousergroup_Form.patchValue({
      usergroupid: null
    });
    if (this.formData.usergroupid != null) this.formData.usergroupid = null;
    for (let i = 0; i < this.tbl_bousergroupaccesses.source.length; i++) {
      this.tbl_bousergroupaccesses.source[i].accessid = null;
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
          else if (ctrltype == "string") {
            this.bousergroup_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.bousergroup_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.bousergroup_Form.controls[key] != undefined) {
                this.bousergroup_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  async FillCustomField() {
    return this.customfieldservice.getcustomfieldconfigurationsByTable("bousergroups", this.CustomFormName, "", "", this.customFieldJson).then(res => {
      this.customFieldServiceList = res;
      if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
      return res;
    });


  }
  onClose() {
    this.dialogRef.close(this.objvalues);
  }

  onSubmitAndWait() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.groupname != null) {
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
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.groupname != null) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
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



  edit_bousergroups() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.bousergroup_service.get_bousergroups_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.bousergroup;
      let formproperty = res.bousergroup.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.bousergroup.pkcol;
      this.formid = res.bousergroup.usergroupid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.bousergroup;
    this.formid = res.bousergroup.usergroupid;
    this.pkcol = res.bousergroup.pkcol;
    this.bmyrecord = false;
    if ((res.bousergroup as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.bousergroup_Form.patchValue({
      usergroupid: res.bousergroup.usergroupid,
      groupname: res.bousergroup.groupname,
      notes: res.bousergroup.notes,
      customfield: res.bousergroup.customfield,
      attachment: JSON.parse(res.bousergroup.attachment),
      status: res.bousergroup.status,
      statusdesc: res.bousergroup.statusdesc,
    });
    this.bousergroup_menuactions = res.bousergroup_menuactions;
    this.bousergroupaccess_menuactions = res.bousergroupaccess_menuactions;
    this.bousergroupaccesses_visiblelist = res.bousergroupaccesses_visiblelist;
    if (this.bousergroup_Form.get('customfield').value != null && this.bousergroup_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.bousergroup_Form.get('customfield').value);
    this.FillCustomField();
    if (this.bousergroup_Form.get('attachment').value != null && this.bousergroup_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.bousergroup_Form.get('attachment').value);
    //Child Tables if any
    this.Set_bousergroupaccesses_TableConfig();
    this.bousergroupaccesses_LoadTable(res.bousergroupaccesses);
    this.Insertbousergroupaccesses = [];
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;

    for (let key in this.bousergroup_Form.controls) {
      let val = this.bousergroup_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.bousergroup_Form.controls[key] != null) {
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
    if (!this.bousergroup_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.bousergroup_Form.getRawValue();
    if (customfields != null) obj.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(obj);
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
    // Object.keys(this.bousergroup_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.bousergroup_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.bousergroup_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.bousergroup_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.bousergroup_Form.controls[key] != null) {
            this.formData[key] = this.bousergroup_Form.controls[key].value;
          }
        }
      }
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.formData.Deleted_bousergroupaccess_IDs = this.Deleted_bousergroupaccess_IDs;
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.bousergroup_service.saveOrUpdate_bousergroups(this.formData, this.tbl_bousergroupaccesses?.source?.data, this.Insertbousergroupaccesses,).subscribe(
      async res => {
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        if (this.tbl_bousergroupaccesses.source) {
          for (let i = 0; i < this.tbl_bousergroupaccesses.source.data.length; i++) {
            if (this.tbl_bousergroupaccesses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_bousergroupaccesses.source.data[i].fileAttachmentList);
          }
        }
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).bousergroup);
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
            this.objvalues.push((res as any).bousergroup);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.bousergroup_Form.markAsUntouched();
        this.bousergroup_Form.markAsPristine();
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
    this.tbl_bousergroupaccesses.source = new LocalDataSource();
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes bousergroupaccesses
  async onCustom_bousergroupaccesses_Action(event: any) {
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
    let objbomenuaction = await this.sharedService.onCustomAction(event, "bousergroupaccesses");
    let formname = (objbomenuaction as any).actionname;
  }
  bousergroupaccesses_settings: any;

  show_bousergroupaccesses_Checkbox() {
    debugger;
    if (this.tbl_bousergroupaccesses.source.settings['selectMode'] == 'multi') this.tbl_bousergroupaccesses.source.settings['selectMode'] = 'single';
    else
      this.tbl_bousergroupaccesses.source.settings['selectMode'] = 'multi';
    this.tbl_bousergroupaccesses.source.initGrid();
  }
  delete_bousergroupaccesses_All() {
    this.tbl_bousergroupaccesses.source.settings['selectMode'] = 'single';
  }
  show_bousergroupaccesses_Filter() {
    setTimeout(() => {
      //  this.Set_bousergroupaccesses_TableDropDownConfig();
    });
    if (this.tbl_bousergroupaccesses.source.settings != null) this.tbl_bousergroupaccesses.source.settings['hideSubHeader'] = !this.tbl_bousergroupaccesses.source.settings['hideSubHeader'];
    this.tbl_bousergroupaccesses.source.initGrid();
  }
  show_bousergroupaccesses_InActive() {
  }
  enable_bousergroupaccesses_InActive() {
  }
  async Set_bousergroupaccesses_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_bousergroupaccesses) {

      var clone = this.sharedService.clone(this.tbl_bousergroupaccesses.source.settings);
      if (clone.columns['usergroupid'] != undefined) clone.columns['usergroupid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bousergroupaccesses_usergroupid.value)), }, };
      if (clone.columns['usergroupid'] != undefined) clone.columns['usergroupid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bousergroupaccesses_usergroupid.value)), }, };
      this.tbl_bousergroupaccesses.source.settings = clone;
      this.tbl_bousergroupaccesses.source.initGrid();
    }
    this.bfilterPopulate_bousergroupaccesses = true;
  }
  async bousergroupaccesses_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_bousergroupaccesses_TableConfig() {
    this.bousergroupaccesses_settings = {
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
  bousergroupaccesses_LoadTable(bousergroupaccesses = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousergroupaccesses_ID) >= 0) {
      if (this.tbl_bousergroupaccesses != undefined) this.tbl_bousergroupaccesses.source = new LocalDataSource();
      if (this.tbl_bousergroupaccesses != undefined) this.tbl_bousergroupaccesses.source.load(bousergroupaccesses as any as LocalDataSource);
      setTimeout(() => {
        if (this.tbl_bousergroupaccesses.source != null) {
          this.tbl_bousergroupaccesses.source.grid.getRows().forEach((row: any) => {
            if (row.data.accessid != null && row.data.accessid != "") {
              this.Insertbousergroupaccesses.push(row.data);
              this.tbl_bousergroupaccesses.source.grid.multipleSelectRow(row);
            }
          });
        }
      });
    }
  }

  //external to inline
  /*
  bousergroupaccesses_route(event:any,action:any) {
  switch ( action) {
  case 'create':
  if (this.bousergroup_service.bousergroupaccesses.length == 0)
  {
      this.tbl_bousergroupaccesses.source.grid.createFormShown = true;
  }
  else
  {
      let obj = new bousergroupaccess();
      this.bousergroup_service.bousergroupaccesses.push(obj);
      this.tbl_bousergroupaccesses.source.refresh();
      if ((this.bousergroup_service.bousergroupaccesses.length / this.tbl_bousergroupaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bousergroupaccesses.source.getPaging().page)
      {
          this.tbl_bousergroupaccesses.source.setPage((this.bousergroup_service.bousergroupaccesses.length / this.tbl_bousergroupaccesses.source.getPaging().perPage).toFixed(0) + 1);
      }
      setTimeout(() => {
          this.tbl_bousergroupaccesses.source.grid.edit(this.tbl_bousergroupaccesses.source.grid.getLastRow());
      });
  }
  break;
  case 'delete':
  let index = this.tbl_bousergroupaccesses.source.data.indexOf(event.data);
  this.onDelete_bousergroupaccess(event,event.data.accessid,((this.tbl_bousergroupaccesses.source.getPaging().page-1) *this.tbl_bousergroupaccesses.source.getPaging().perPage)+index);
  this.tbl_bousergroupaccesses.source.refresh();
  break;
  }
  }
  
  */
  bousergroupaccesses_Paging(val) {
    debugger;
    this.tbl_bousergroupaccesses.source.setPaging(1, val, true);
  }

  handle_bousergroupaccesses_GridSelected(event: any) {
    debugger;

    if (event.isSelected) {
      if (event.data.accessid == null || event.data.accessid == "") {
        var obj = { usergroupid: this.formid, userid: event.data.userid }
        this.Insertbousergroupaccesses.push(obj as any);
      }
      else {
        var deletedids = this.Deleted_bousergroupaccess_IDs.split(',');

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
      if (event.data.accessid != null && event.data.accessid != "") this.Deleted_bousergroupaccess_IDs += event.data.accessid + ",";
    }
  }
  Is_bousergroupaccesses_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousergroupaccesses_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes bousergroupaccesses

}



