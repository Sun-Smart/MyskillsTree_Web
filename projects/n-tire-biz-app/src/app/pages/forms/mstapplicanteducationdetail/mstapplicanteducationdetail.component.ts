import { mstapplicantskilldetailService } from './../../../service/mstapplicantskilldetail.service';
import { mstapplicantskilldetail } from './../../../model/mstapplicantskilldetail.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menus

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
import { mstapplicantreferencerequest } from './../../../model/mstapplicantreferencerequest.model';
import { mstapplicantreferencerequestComponent } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component';
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
//popups
import { bomasterdata } from './../../../model/bomasterdata.model';
import { bomasterdataComponent } from './../../../pages/forms/bomasterdata/bomasterdata.component';
import { bomasterdataService } from './../../../service/bomasterdata.service';
//popups
import { bosubcategorymaster } from './../../../model/bosubcategorymaster.model';
import { bosubcategorymasterComponent } from './../../../pages/forms/bosubcategorymaster/bosubcategorymaster.component';
import { bosubcategorymasterService } from './../../../service/bosubcategorymaster.service';
import { mstapplicanteducationdetail } from '../../../model/mstapplicanteducationdetail.model';
import { mstapplicanteducationdetailService } from '../../../service/mstapplicanteducationdetail.service';
import { pairwise } from 'rxjs/operators';
@Component({
  selector: 'app-mstapplicanteducationdetail',
  templateUrl: './mstapplicanteducationdetail.component.html',
  styles: [`
      @media only screen and (max-width: 600px) {
        .education_view_mobile{
          min-width: 100% !important;
          margin: 0px !important;
        }
        .mobile_view_btn{
          display: none !important;
        }
        .close_common_icon2{
          position: relative !important;
          bottom: 6px !important;
        }
        h1.columns.mainheader.left.common_titles_new {
          margin-top: 5px !important;
        }
      }
  `],
  providers: [KeyboardShortcutsService]
})



export class mstapplicanteducationdetailComponent implements OnInit {
  formData: mstapplicanteducationdetail;
  list: mstapplicanteducationdetail[];
  bmyrecord: boolean = false;
  hidelist: any = [];
  objvalues: any = [];
  viewHtml: any = '';//stores html view of the screen
  showview: boolean = false;//view or edit mode
  showAttachment: boolean = false;//view or edit mode
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

  bfilterPopulate_mstapplicanteducationdetails: boolean = false;
  mstapplicanteducationdetail_menuactions: any = []

  mstapplicanteducationdetail_Form: FormGroup;

  applicantid_List: DropDownValues[];
  applicantid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  educationcategory_List: DropDownValues[];
  educationsubcategory_List: DropDownValues[];
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
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;
  // showRefAcept: boolean;
  getid: string;
  showDateError: boolean;
  showDateError1: boolean;
  showPercentError: boolean;

  fromyearCondition: any;
  toyearCondition: any
  test1: number;



  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstapplicanteducationdetail_service: mstapplicanteducationdetailService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private sanitizer: DomSanitizer,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.translate = this.sharedService.translate;
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;
    // this.getid=localStorage.getItem('applicantid')
    // if(this.data.applicantid=='' || this.data.applicantid==undefined){
    //   this.data.
    //     applicantid=this.getid
    // }
    debugger


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
    this.mstapplicanteducationdetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: localStorage.getItem('applicantid'),
      applicantiddesc: [null],
      educationid: [null],
      educationcategory: [null, Validators.compose([Validators.required])],
      educationcategorydesc: [null],
      educationsubcategory: [null, Validators.compose([Validators.required])],
      educationsubcategorydesc: [null],
      coursename: [null, Validators.compose([Validators.required])],
      institutionname: [null],
      fromyear: [null],
      toyear: [null],
      percentage: [null],
      requestid: [null],
      referenceacceptance: [null],
      referenceacceptancedesc: [null],
      remarks: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
    //new suneel
    this.mstapplicanteducationdetail_Form.controls['fromyear'].valueChanges.pipe(pairwise()).subscribe(([prev, next]: [any, any]) => {
      this.fromyearCondition = next;
      this.test(this.fromyearCondition);
      console.log(prev, next)
    });
    this.mstapplicanteducationdetail_Form.controls['toyear'].valueChanges.pipe(pairwise()).subscribe(([prev, next]: [any, any]) => {

      this.toyearCondition = next;
      console.log(parseInt(this.toyearCondition), this.test1);
      // if(parseInt(this.toyearCondition) <= this.test1) {
      //  this.showDateError1 = false;
      // }else {
      //  this.showDateError1 = true;
      // }
      console.log(prev, next)
    });
    //end
  }

  get f() { return this.mstapplicanteducationdetail_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.mstapplicanteducationdetail_Form.dirty && this.mstapplicanteducationdetail_Form.touched) {
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

  test(fromyear) {
    this.test1 = parseInt(fromyear) + 15;
  }

  last() {
    if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
  }

  prev() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.educationid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.educationid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.educationid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }




  // initialize
  async ngOnInit() {

    if((localStorage.getItem('role') == '1')  || (localStorage.getItem('role') == '3')){
      this.showAttachment = true;
    }else {
      this.showAttachment = false;
    }

    debugger
    // let checkuser=localStorage.getItem('role');
    // if(checkuser == '3'){
    //   this.showRefAcept=true;
    // }
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
    let mstapplicanteducationdetailid = null;

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
    this.formid = mstapplicanteducationdetailid;
    //alert(mstapplicanteducationdetailid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.mstapplicanteducationdetail_service.getDefaultData().then(res => {
      debugger
      this.applicantid_List = res.list_applicantid.value;
      this.educationcategory_List = res.list_educationcategory.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_List().then(res => {
      debugger;
      this.pkList = res as mstapplicanteducationdetail[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched
    this.mstapplicanteducationdetail_Form.markAsUntouched();
    this.mstapplicanteducationdetail_Form.markAsPristine();
  }
  onSelected_applicantid(applicantidDetail: any) {
    debugger
    if (applicantidDetail.value && applicantidDetail) {
      this.mstapplicanteducationdetail_Form.patchValue({
        applicantid: applicantidDetail.value,
        applicantiddesc: applicantidDetail.label,

      });

    }
  }




  resetForm() {
    if (this.mstapplicanteducationdetail_Form != null)
      this.mstapplicanteducationdetail_Form.reset();
    this.mstapplicanteducationdetail_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let educationid = this.mstapplicanteducationdetail_Form.get('educationid').value;
    if (educationid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.mstapplicanteducationdetail_service.delete_mstapplicanteducationdetail(educationid).then(res => {
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
    this.mstapplicanteducationdetail_Form.patchValue({
      educationid: null
    });
    if (this.formData.educationid != null) this.formData.educationid = null;
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
            this.mstapplicanteducationdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicanteducationdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicanteducationdetail_Form.controls[key] != undefined) {
                this.mstapplicanteducationdetail_Form.controls[key].disable({ onlySelf: true });
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

  goBack(){

    this.router.navigate(['/home/boreportviewer/aed']);

}

  onSubmitAndWait() {
    debugger
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
      // this.onSubmitDataDlg(true);
      this.onSubmitData(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  applicantid_onChange(evt: any) {
    let e = evt.value;
  }
  educationcategory_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.mstapplicanteducationdetail_Form.patchValue({ educationcategorydesc: evt.options[evt.options.selectedIndex].text });
    setTimeout(() => {
      if (this.f.educationcategory.value && this.f.educationcategory.value != "" && this.f.educationcategory.value != null) this.mstapplicanteducationdetail_service.getList_educationsubcategory(this.f.educationcategory.value).then(res => this.educationsubcategory_List = res as DropDownValues[]);
    });
  }
  educationsubcategory_onChange(evt: any) {
    let e = evt.value;
    this.mstapplicanteducationdetail_Form.patchValue({ educationsubcategorydesc: evt.options[evt.options.selectedIndex].text });
  }
  referenceacceptance_onChange(evt: any) {
    let e = this.f.referenceacceptance.value as any;
    this.mstapplicanteducationdetail_Form.patchValue({ referenceacceptancedesc: evt.options[evt.options.selectedIndex].text });
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



  edit_mstapplicanteducationdetails() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    debugger
    this.spinner.show();
    this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_ByEID(pkcol).then(res => {
      debugger
      console.log("populatescreen", res)
      this.spinner.hide();

      this.formData = res.mstapplicanteducationdetail;
      let formproperty = res.mstapplicanteducationdetail.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstapplicanteducationdetail.pkcol;
      this.formid = res.mstapplicanteducationdetail.educationid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    debugger
    this.formData = res.mstapplicanteducationdetail;
    this.formid = res.mstapplicanteducationdetail.educationid;
    this.pkcol = res.mstapplicanteducationdetail.pkcol;
    this.bmyrecord = false;
    if ((res.mstapplicanteducationdetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    debugger
    this.mstapplicanteducationdetail_Form.patchValue({
      applicantid: res.mstapplicanteducationdetail.applicantid,
      applicantiddesc: res.mstapplicanteducationdetail.applicantiddesc,
      educationid: res.mstapplicanteducationdetail.educationid,
      educationcategory: res.mstapplicanteducationdetail.educationcategory,
      educationcategorydesc: res.mstapplicanteducationdetail.educationcategorydesc,
      educationsubcategory: res.mstapplicanteducationdetail.educationsubcategory,
      educationsubcategorydesc: res.mstapplicanteducationdetail.educationsubcategorydesc,
      coursename: res.mstapplicanteducationdetail.coursename,
      institutionname: res.mstapplicanteducationdetail.institutionname,
      fromyear: res.mstapplicanteducationdetail.fromyear,
      toyear: res.mstapplicanteducationdetail.toyear,
      percentage: res.mstapplicanteducationdetail.percentage,
      requestid: res.mstapplicanteducationdetail.requestid,
      referenceacceptance: res.mstapplicanteducationdetail.referenceacceptance,
      referenceacceptancedesc: res.mstapplicanteducationdetail.referenceacceptancedesc,
      remarks: res.mstapplicanteducationdetail.remarks,
      attachment: JSON.parse(res.mstapplicanteducationdetail.attachment),
      status: res.mstapplicanteducationdetail.status,
      statusdesc: res.mstapplicanteducationdetail.statusdesc,
    });
    console.log(' this.mstapplicanteducationdetail_Form', this.mstapplicanteducationdetail_Form);
    this.mstapplicanteducationdetail_menuactions = res.mstapplicanteducationdetail_menuactions;
    if (this.mstapplicanteducationdetail_Form.get('attachment').value != null && this.mstapplicanteducationdetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicanteducationdetail_Form.get('attachment').value);
    setTimeout(() => {
      if (this.f.educationcategory.value && this.f.educationcategory.value != "" && this.f.educationcategory.value != null) this.mstapplicanteducationdetail_service.getList_educationsubcategory(this.f.educationcategory.value).then(res => {
        this.educationsubcategory_List = res as DropDownValues[];
      }).catch((err) => { console.log(err); });
    });
    //Child Tables if any
    setTimeout(() => {
    });
  }
  viewrequestid() {
    this.dialog.open(mstapplicantreferencerequestComponent,
      {
        data: { showview: true, save: true, pkcol: this.sharedService.pk_encode(this.mstapplicanteducationdetail_Form.get('requestid').value), ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
    });
  }
  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    debugger
    let ret = "";
    ret = html;

    for (let key in this.mstapplicanteducationdetail_Form.controls) {
      debugger
      let val = this.mstapplicanteducationdetail_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.mstapplicanteducationdetail_Form.controls[key] != null) {
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
    debugger
    this.isSubmitted = true;
    if (!this.mstapplicanteducationdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstapplicanteducationdetail_Form.getRawValue();
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
    console.log(this.mstapplicanteducationdetail_Form)
    if (!this.mstapplicanteducationdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    // Object.keys(this.mstapplicanteducationdetail_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.mstapplicanteducationdetail_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    // if (!this.mstapplicanteducationdetail_Form.valid) {
    //   this.toastr.addSingle("error", "", "Enter the required fields");
    //   return;
    // }
    if (!this.validate()) {
      return;
    }
    this.formData = this.mstapplicanteducationdetail_Form.getRawValue();
    debugger
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.mstapplicanteducationdetail_Form.controls[key] != null) {
            this.formData[key] = this.mstapplicanteducationdetail_Form.controls[key].value;
          }
        }
      }
    }
    //new
    if (parseInt(this.toyearCondition) <= this.test1) {
      this.showDateError1 = false;
    } else {
      this.showDateError1 = true;
      return
    }
    //old
    if (this.formData.fromyear > this.formData.toyear) {
      this.showDateError = true;
      this.showPercentError = false;
      return;
    } else if (this.formData.percentage > '100') {
      this.showPercentError = true;
      this.showDateError = true;
      return;
    } else {
      this.showDateError = false;
      this.showPercentError = false;
      if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
      this.fileAttachmentList = this.fileattachment.getAllFiles();
      console.log(this.formData);
      this.spinner.show();
      this.mstapplicanteducationdetail_service.saveOrUpdate_mstapplicanteducationdetails(this.formData).subscribe(
        async res => {
          await this.sharedService.upload(this.fileAttachmentList);
          this.attachmentlist = [];
          if (this.fileattachment) this.fileattachment.clear();
          this.spinner.hide();
          debugger;
          this.toastr.addSingle("success", "", "Successfully saved");
          this.sessionService.setItem("attachedsaved", "true")
          this.objvalues.push((res as any).mstapplicanteducationdetail);
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
              this.objvalues.push((res as any).mstapplicanteducationdetail);
              this.dialogRef.close(this.objvalues);
            }
            else {
              this.FillData(res);
            }
          }
          this.mstapplicanteducationdetail_Form.markAsUntouched();
          this.mstapplicanteducationdetail_Form.markAsPristine();
        },
        err => {
          debugger;
          this.spinner.hide();
          this.toastr.addSingle("error", "", err.error);
          console.log(err);
        }
      )
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



