import { bokbmasterService } from './../../../service/bokbmaster.service';
import { bokbmaster } from './../../../model/bokbmaster.model';
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
import { bokbtopic } from './../../../model/bokbtopic.model';
import { bokbtopicComponent } from './../../../pages/forms/bokbtopic/bokbtopic.component';
import { bokbtopicService } from './../../../service/bokbtopic.service';
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
  selector: 'app-bonewbokbmaster',
  templateUrl: './bonewbokbmaster.component.html',
  styleUrls: ['./bonewbokbmaster.component.scss']
})
export class BonewbokbmasterComponent implements OnInit {
  blockedDocument: boolean = false;
  formData: bokbmaster;
  list: bokbmaster[];
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

  bfilterPopulate_bokbmasters: boolean = false;
  bfilterPopulate_bokbtopics: boolean = false;
  bokbmaster_menuactions: any = []
  bokbtopic_menuactions: any = []
  bokbtopic_visible: boolean = true;
  bokbtopic_disabled: boolean = false;
  @ViewChild('tbl_bokbtopics', { static: false }) tbl_bokbtopics!: ReportViewerCtrlComponent;

  bokbmaster_Form: FormGroup;

  kbcategory_List: DropDownValues[];
  kbcategory_Suggestions: any[];
  kbcategory_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  kbsubcategory_List: DropDownValues[];
  kbsubcategory_Suggestions: any[];
  kbsubcategory_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  icon_List: DropDownValues[];
  icon_Suggestions: any[];
  icon_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  author_List: DropDownValues[];
  author_Suggestions: any[];
  author_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  language_List: DropDownValues[];
  language_Suggestions: any[];
  language_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  kbaccess_List: DropDownValues[];
  kbaccess_Selected: any[] = [];
  kbaccess_Available: any[] = [];

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



  bokbtopics_visiblelist: any;
  bokbtopics_hidelist: any;

  Deleted_bokbtopic_IDs: string = "";
  bokbtopics_ID: string = "1";
  bokbtopics_selectedindex: any;
  constructor(private nav: Location,
    private translate: TranslateService, private router: Router,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private bokbmaster_service: bokbmasterService,
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

      this.bokbmaster_Form = this.fb.group({
        pkcol: [null],
        pk: [null],
        ImageName: [null],
        kbid: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
        kbcode: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
        url: [null],
        kbsubject: [null, Validators.compose([Validators.required, Validators.maxLength(400)])],
        kbcategory: [null, Validators.compose([Validators.required,])],
        kbcategorydesc: [null],
        kbsubcategory: [null, Validators.compose([Validators.required,])],
        kbsubcategorydesc: [null],
        tags: [null, Validators.compose([Validators.maxLength(100)])],
        icon: [null, Validators.compose([Validators.maxLength(10)])],
        icondesc: [null],
        summary: [null],
        kbdetails: [null],
        markpublic: [null],
        author: [null],
        authordesc: [null],
        publisheddate: [null],
        expirationdate: [null],
        language: [null, Validators.compose([Validators.maxLength(10)])],
        languagedesc: [null],
        rating: [null, Validators.compose([Validators.pattern('^[0-9]+([0-9]{0,})?$'), Validators.max(100000000),])],
        comments: [null],
        kbaccess: [null, Validators.compose([Validators.maxLength(100)])],
        kbaccessdesc: [null],
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
  get f() { return this.bokbmaster_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    //debugger;
    if (this.bokbmaster_Form.dirty && this.bokbmaster_Form.touched) {
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
    let pos = this.pkList.map(function (e: any) { return e.kbid?.toString(); }).indexOf(this.formid?.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.kbid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  // initialize
  async ngOnInit() {
    try {
      if (this.panelscroller != undefined) (this.panelscroller as any)?.scrollTop(0);
      //session & theme
      // this.themeService.theme.subscribe((val: string) => {
      //   this.theme = val;
      // });

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
      let bokbmasterid = null;

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
      this.formData = new bokbmaster();
      this.PopulateFromMainScreen(this.data, false);
      this.PopulateFromMainScreen(this.dynamicconfig.data, true);
      if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
        this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
      }
      this.formid = bokbmasterid;
      //alert(bokbmasterid);

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
      this.bokbmaster_service.getDefaultData().then(res => {
        console.log("tfthdy", res.list_kbcategory);
        
        this.kbcategory_List = res.list_kbcategory.value;
        this.kbcategory_Suggestions = this.kbcategory_List;
        if (this.formData?.kbcategory != undefined && this.formData?.kbcategory != null) {
          this.bokbmaster_Form.patchValue({
            kbcategory: this.sharedService.getValue("value", this.kbcategory_List, this.formData.kbcategory?.toString(), 'kbcategory')
          });
        }
        this.kbsubcategory_List = res.list_kbsubcategory.value;
        this.kbsubcategory_Suggestions = this.kbsubcategory_List;
        if (this.formData?.kbsubcategory != undefined && this.formData?.kbsubcategory != null) {
          this.bokbmaster_Form.patchValue({
            kbsubcategory: this.sharedService.getValue("value", this.kbsubcategory_List, this.formData.kbsubcategory?.toString(), 'kbsubcategory')
          });
        }
        this.icon_List = res.list_icon.value;
        if (this.formData?.icon != undefined && this.formData?.icon != null) {
          this.bokbmaster_Form.patchValue({
            icon: this.formData.icon
          });
        }
        this.author_List = res.list_author.value;
        this.author_Suggestions = this.author_List;
        if (this.formData?.author != undefined && this.formData?.author != null) {
          this.bokbmaster_Form.patchValue({
            author: this.sharedService.getValue("value", this.author_List, this.formData.author?.toString(), 'author')
          });
        }
        this.language_List = res.list_language.value;
        if (this.formData?.language != undefined && this.formData?.language != null) {
          this.bokbmaster_Form.patchValue({
            language: this.formData.language
          });
        }
        this.kbaccess_Selected = [];
        this.kbaccess_List = res.list_kbaccess.value;
        this.kbaccess_Available = this.kbaccess_List.map(x => Object.assign({}, x));
        for (let i = 0; i < this.formData.kbaccess?.length; i++) {
          let obj = Object.assign({}, this.sharedService.getValue("value", this.kbaccess_Available, this.formData.kbaccess[i], ''));
          if (obj != undefined) this.kbaccess_Selected.push(obj);
          if (obj != undefined) {
            let index = this.kbaccess_Available.map(function (e) { return e.value; }).indexOf(obj.value);
            if (obj != undefined) this.kbaccess_Available.splice(index, 1);
          }
        }
      }).catch((err) => {
        this.blockedDocument = false;
        if (this.sharedService.IsDebug) console.log(err);
        this.toastr.addSingle("error", "", 'autocomplete ' + err);
      });

      //autocomplete
      this.bokbmaster_service.get_bokbmasters_List().then(res => {
        this.pkList = res as bokbmaster[];
        this.pkoptionsEvent.emit(this.pkList);
      }
      ).catch((err) => {
        this.blockedDocument = false;
        if (this.sharedService.IsDebug) console.log(err);
        this.toastr.addSingle("error", "", 'bokbmastersList ' + err);
      });
      //setting the flag that the screen is not touched
      this.blockedDocument = false;
      this.bokbmaster_Form.markAsUntouched();
      this.bokbmaster_Form.markAsPristine();
    } catch (e) {
      this.blockedDocument = false;
      // this.sharedService.error(e);
    }
  }
  onEntered_kbcategory(value: any) {
    this.kbcategory_Suggestions = this.kbcategory_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
  }
  onSelected_kbcategory(kbcategoryDetail: any) {
    if (kbcategoryDetail.value && kbcategoryDetail) {

    }
  }

  onEntered_kbsubcategory(value: any) {
    this.kbsubcategory_Suggestions = this.kbsubcategory_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
  }
  onSelected_kbsubcategory(kbsubcategoryDetail: any) {
    if (kbsubcategoryDetail.value && kbsubcategoryDetail) {

    }
  }
  onEntered_icon(value: any) {
    this.icon_Suggestions = this.icon_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
  }
  onSelected_icon(iconDetail: any) {
    if (iconDetail.value && iconDetail) {

    }
  }

  onEntered_author(value: any) {
    this.author_Suggestions = this.author_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
  }
  onSelected_author(authorDetail: any) {
    if (authorDetail.value && authorDetail) {

    }
  }

  onEntered_language(value: any) {
    this.language_Suggestions = this.language_List?.filter(v => v["label"] != null && v["label"]?.toString().toLowerCase().indexOf(value.query.toLowerCase()) > -1);
  }
  onSelected_language(languageDetail: any) {
    if (languageDetail.value && languageDetail) {

    }
  }
  resetForm() {
    this.formid = "";
    this.showview = false;
    if (this.bokbmaster_Form != null)
      this.bokbmaster_Form.reset();
    this.bokbmaster_Form.patchValue({
      author: this.sessionData.userid,
      authordesc: this.sessionData.username,
    });
    // this.tbl_bokbtopics?.reset();
    this.customfieldservice.reset(document);
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  async onDelete(): Promise<any> {
    let kbid = this.bokbmaster_Form.get('kbid').value;
    if (kbid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        let res = await this.bokbmaster_service.delete_bokbmaster(kbid);
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
    this.bokbmaster_Form.patchValue({
      kbid: null
    });
    if (this.formData.kbid != null) this.formData.kbid = null;
    this.tbl_bokbtopics.data = [];
  }
  onCopyDetails() {
    this.formid = null;
    this.bokbmaster_Form.patchValue({
      kbid: null
    });
    if (this.formData.kbid != null) this.formData.kbid = null;
    for (let i = 0; i < this.tbl_bokbtopics.data.length; i++) {
      this.tbl_bokbtopics.data[i].kbtopicid = null;
    }
  }
  PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event' && key != 'kbid' && key != 'attachment' && key != 'customfield') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (key == "publisheddate")
            this.bokbmaster_Form.patchValue({ "publisheddate": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
          else if (key == "expirationdate")
            this.bokbmaster_Form.patchValue({ "expirationdate": mainscreendata[key] == null ? null : new Date(mainscreendata[key]) });
          else if (ctrltype == "string") {
            this.bokbmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.bokbmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.bokbmaster_Form.controls[key] != undefined) {
                this.bokbmaster_Form.controls[key].disable({ onlySelf: true });
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
    return this.customfieldservice.getcustomfieldconfigurationsByTable("bokbmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
      this.customFieldServiceList = res;
      if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
      return res;
    });


  }
  onClose() {
    this.dialogRef.close(null);
  }

  onSubmitAndWait() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.kbsubject != null) {
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
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.kbsubject != null) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  kbcategory_onChange(evt: any) {
    let e = this.f.kbcategory.value as any;
  }
  kbsubcategory_onChange(evt: any) {
    let e = this.f.kbsubcategory.value as any;
  }
  icon_onChange(evt: any) {
    let e = this.f.icon.value as any;
  }
  author_onChange(evt: any) {
    let e = this.f.author.value as any;
  }
  language_onChange(evt: any) {
    let e = this.f.language.value as any;
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

  edit_bokbmasters() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }



  InitializeGrid() {
    try {
      this.tbl_bokbtopics.fkname = "kbid";
      this.tbl_bokbtopics.fk = this.formid;
      this.tbl_bokbtopics.paramsChange('663');
    } catch (e) {
      this.blockedDocument = false;
      // this.sharedService.error(e);
    }
  }

  async PopulateScreen(pkcol: any): Promise<any> {
    try {
      this.blockedDocument = true;
      this.bokbmaster_service.get_bokbmasters_ByEID(pkcol).then(res => {
        this.blockedDocument = false;

        this.formData = res.bokbmaster;
        let formproperty = res.bokbmaster.formproperty;
        if (formproperty && formproperty.edit == false) this.showview = true;
        this.pkcol = res.bokbmaster.pkcol;
        this.formid = res.bokbmaster.kbid;
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
      this.formData = res.bokbmaster;
      this.formid = res.bokbmaster.kbid;
      this.pkcol = res.bokbmaster.pkcol;
      this.bmyrecord = false;
      if ((res.bokbmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
      console.log(res);
      //console.log(res.order);
      //console.log(res.orderDetails);
      let strdetails = "";
      debugger;
      var json = JSON.parse(res.bokbmaster.summary);
      json.qnaDocuments.forEach(element => {
        //element.qnaDocuments.forEach(element1 => {
        strdetails += "Question : " + element.questions[0] + "\n" + "Answer" + "\n" + element.answer + "\n" + "----------------------------------------" + "\n";
        //});
      });

      this.bokbmaster_Form.patchValue({
        pkcol: res.bokbmaster.pkcol,
        kbid: res.bokbmaster.kbid,
        kbcode: res.bokbmaster.kbcode,
        url: res.bokbmaster.url,
        kbsubject: res.bokbmaster.kbsubject,
        kbcategory: this.sharedService.getValue("value", this.kbcategory_List, res.bokbmaster.kbcategory, 'kbcategory'),
        kbcategorydesc: res.bokbmaster.kbcategorydesc,
        kbsubcategory: this.sharedService.getValue("value", this.kbsubcategory_List, res.bokbmaster.kbsubcategory, 'kbsubcategory'),
        kbsubcategorydesc: res.bokbmaster.kbsubcategorydesc,
        tags: res.bokbmaster.tags,
        icon: this.sharedService.getValue("value", this.icon_List, res.bokbmaster.icon, 'icon'),
        icondesc: res.bokbmaster.icondesc,
        summary: strdetails,
        kbdetails: res.bokbmaster.kbdetails,
        markpublic: res.bokbmaster.markpublic,
        author: this.sharedService.getValue("value", this.author_List, res.bokbmaster.author, 'author'),
        authordesc: res.bokbmaster.authordesc,
        publisheddate: res.bokbmaster.publisheddate == null ? null : new Date(res.bokbmaster.publisheddate),
        expirationdate: res.bokbmaster.expirationdate == null ? null : new Date(res.bokbmaster.expirationdate),
        language: this.sharedService.getValue("value", this.language_List, res.bokbmaster.language, 'language'),
        languagedesc: res.bokbmaster.languagedesc,
        rating: res.bokbmaster.rating,
        comments: res.bokbmaster.comments,
        kbaccess: this.sharedService.getValue("value", this.kbaccess_List, res.bokbmaster.kbaccess, 'kbaccess'),
        kbaccessdesc: res.bokbmaster.kbaccessdesc,
        customfield: res.bokbmaster.customfield,
        attachment: res.bokbmaster.attachment,
        status: res.bokbmaster.status,
        statusdesc: res.bokbmaster.statusdesc,
      });
      this.bokbmaster_menuactions = res.bokbmaster_menuactions;
      this.bokbtopic_menuactions = res.bokbtopic_menuactions;
      this.bokbtopics_visiblelist = res.bokbtopics_visiblelist;
      if (this.bokbmaster_Form.get('customfield').value != null && this.bokbmaster_Form.get('customfield').value != "") this.customFieldJson = this.bokbmaster_Form.get('customfield').value;
      this.FillCustomField();
      if (this.bokbmaster_Form.get('attachment').value != null && this.bokbmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.bokbmaster_Form.get('attachment').value);
      this.kbaccess_Selected = [];
      this.kbaccess_Available = this.kbaccess_List.map(x => Object.assign({}, x));
      for (let i = 0; i < this.formData.kbaccess?.length; i++) {
        let obj = Object.assign({}, this.sharedService.getValue("value", this.kbaccess_Available, this.formData.kbaccess[i], ''));
        if (obj != undefined) this.kbaccess_Selected.push(obj);
        if (obj != undefined) {
          let index = this.kbaccess_Available.map(function (e) { return e.value; }).indexOf(obj.value);
          this.kbaccess_Available.splice(index, 1);
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

    for (let key in this.bokbmaster_Form.controls) {
      let val = this.bokbmaster_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.bokbmaster_Form.controls[key] != null) {
        if (false) {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + this.formData[key])[0]["name"];
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
    return this.sanitizer.bypassSecurityTrustHtml(ret) as SafeHtml;
  }


  SetFormValues() {
    if (this.kbaccess_Selected.length > 0 && this.kbaccess_Selected != null) {
      let kbaccessstring = this.kbaccess_Selected.map(function (elem) { return elem.value; }).join(",");
      this.bokbmaster_Form.patchValue({
        kbaccess: kbaccessstring
      });

    }
  }

  GetFormValues() {
    let formData: any;
    formData = this.bokbmaster_Form.getRawValue();
    var customfields = this.customfieldservice.getCustomValues(document);
    formData.kbcategory = (this.bokbmaster_Form.get('kbcategory'))?.value?.value;
    formData.kbsubcategory = (this.bokbmaster_Form.get('kbsubcategory'))?.value?.value;
    formData.icon = (this.bokbmaster_Form.get('icon'))?.value?.value;
    formData.author = (this.bokbmaster_Form.get('author'))?.value?.value;
    // formData.publisheddate = this.sharedService.getDate(this.bokbmaster_Form.get('publisheddate').value)
    formData.publisheddate = this.bokbmaster_Form.get('publisheddate').value;
    // formData.expirationdate = this.sharedService.getDate(this.bokbmaster_Form.get('expirationdate').value)
    formData.expirationdate = this.bokbmaster_Form.get('expirationdate').value;
    formData.language = (this.bokbmaster_Form.get('language'))?.value?.value;
    formData.kbaccess = null;
    if (this.kbaccess_Selected.length > 0 && this.kbaccess_Selected != null) formData.kbaccessstring = this.kbaccess_Selected.map(function (elem) { return elem.value; }).join(",");
    if (customfields != null) formData.customfield = JSON.stringify(customfields);
    if (this.fileattachment.getAttachmentList() != null) formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'attachment' && key != 'customfield') {
          if (this.bokbmaster_Form.controls[key] != null) {
            formData[key] = this.dynamicconfig.data[key];
          }
        }
      }
    }
    formData.kbid = this.formid;
    return formData;
  }
  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.bokbmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var customfields = this.customfieldservice.getCustomValues(document);
    var obj = this.GetFormValues();
    console.log(obj);
    if (!confirm('Do you want to want to save?')) {
      return;
    }
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
      Object.keys(this.bokbmaster_Form.controls).forEach(key => {
        const controlErrors: ValidationErrors = this.bokbmaster_Form.get(key).errors;
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


      if (!this.bokbmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
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
      let res = await this.bokbmaster_service.save_bokbmasters(this.formData, this.fileAttachmentList, this.Deleted_bokbtopic_IDs, this.tbl_bokbtopics?.data);
      this.blockedDocument = false;
      //debugger;
      this.toastr.addSingle("success", "", "Successfully saved");
      this.objvalues.push((res as any).bokbmaster);
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
          this.objvalues.push((res as any).bokbmaster);
          this.dialogRef.close(this.objvalues);
        }
        else {
          this.FillData(res);
        }
      }
      this.blockedDocument = false;
      this.bokbmaster_Form.markAsUntouched();
      this.bokbmaster_Form.markAsPristine();
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
  AddOrEdit_bokbtopic(event: any, kbtopicid: any, kbid: any) {
    let add = false;
    if (event == null) add = true;
    let childsave = false;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    let data = { showview: false, save: childsave, maindatapkcol: this.pkcol, event, kbtopicid: event?.data?.pk, kbid, visiblelist: this.bokbtopics_visiblelist, hidelist: this.bokbtopics_hidelist, ScreenType: 2 };
    for (let d = 0; d < this.keylist.length; d++) {
      let prop = this.keylist[d];
      let val = this.f[prop].value;
      if (val?.value != undefined) val = val.value;
      data[prop] = val;
    }
    this.dialog.open(bokbtopicComponent,
      {
        data: data,
      }
    ).onClose.subscribe(res => {
      if (res) {
        if (add) {
          for (let i = 0; i < res.length; i++) {
            // this.tbl_bokbtopics.add(res[i]);
          }
        }
        else {
          // this.tbl_bokbtopics.update(event.data, res[0]);
        }
      }
    });
  }

  onDelete_bokbtopic(event: any, childID: number, i: number) {
    if (childID != null)
      this.Deleted_bokbtopic_IDs += childID + ",";
    this.tbl_bokbtopics.data.splice(i, 1);
    //this.updateGrandTotal();
  }


  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }
  //start of Grid Codes bokbtopics
  bokbtopics_settings: any;

  show_bokbtopics_Checkbox() {
    //debugger;
  }
  delete_bokbtopics_All() {
    //this.tbl_bokbtopics.source.settings['selectMode'] = 'single';
  }
  show_bokbtopics_InActive() {
  }
  enable_bokbtopics_InActive() {
  }
  async bokbtopics_beforesave(event: any) {
    event.confirm.resolve(event.newData);
  }
  onExecute_bokbtopics(event: any) {
    //debugger;
    if (event.action.description == "Edit")
      this.AddOrEdit_bokbtopic(event, event.data.pk, this.formid);
    else if (event.action.description == "Delete") {
      this.Deleted_bokbtopic_IDs += event.data.pk + ",";

    }
  }
  async onCustom_bokbtopics_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "bokbtopics");
    let formname = (objbomenuaction as any).actionname;




  }

  handle_bokbtopics_GridSelected(event: any) {
    //this.bokbtopics_selectedindex=this.tbl_bokbtopics.source.data.findIndex(i => i.kbtopicid === event.data.kbtopicid);
  }
  Is_bokbtopics_Visible() {
    if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bokbtopics_ID) >= 0)) {
      return "tbl smart-table-container1";
    }
    else {
      return "hide";
    }
  }
  Is_bokbtopics_Disabled() {
    if (this.formid && (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bokbtopics_ID) >= 0)) {
      return false;
    }
    else {
      return true;
    }
  }
}
