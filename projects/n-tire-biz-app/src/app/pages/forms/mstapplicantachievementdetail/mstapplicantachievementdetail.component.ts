import { mstapplicantachievementdetailService } from './../../../service/mstapplicantachievementdetail.service';
import { mstapplicantachievementdetail } from './../../../model/mstapplicantachievementdetail.model';
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
//hyperlinks services
import { mstapplicantreferencerequest } from './../../../model/mstapplicantreferencerequest.model';
import { mstapplicantreferencerequestComponent } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component';
import { mstapplicantreferencerequestService } from './../../../service/mstapplicantreferencerequest.service';

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

@Component({
  selector: 'app-mstapplicantachievementdetail',
  templateUrl: './mstapplicantachievementdetail.component.html',
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



export class mstapplicantachievementdetailComponent implements OnInit {
  formData: mstapplicantachievementdetail;
  list: mstapplicantachievementdetail[];
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

  bfilterPopulate_mstapplicantachievementdetails: boolean = false;
  mstapplicantachievementdetail_menuactions: any = []

  mstapplicantachievementdetail_Form: FormGroup;

  applicantid_List: DropDownValues[];
  applicantid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  masterdataid_List: DropDownValues[];
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
  showAttachment: boolean = true;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;
  // showRefAcept: boolean;





  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstapplicantachievementdetail_service: mstapplicantachievementdetailService,
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
    this.mstapplicantachievementdetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.sessionService.getItem('applicantid'),
      applicantiddesc: [null],
      achievementid: [null],
      masterdataid: [null, Validators.compose([Validators.required])],
      masterdataiddesc: [null],
      achievementdetails: [null, Validators.compose([Validators.required])],
      fromyear: [null, Validators.compose([Validators.required])],
      toyear: [null],
      selfrating: [null],
      remarks: [null],
      requestid: [null],
      referenceacceptance: [null], 
      referenceacceptancedesc: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
      skill: [null],
      skilldesc: [null],
    });
  }

  get f() { return this.mstapplicantachievementdetail_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    debugger;
    if (this.mstapplicantachievementdetail_Form.dirty && this.mstapplicantachievementdetail_Form.touched) {
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
    let pos = this.pkList.map(function (e: any) { return e.achievementid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    debugger;
    let pos = this.pkList.map(function (e: any) { return e.achievementid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.achievementid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  // initialize
  async ngOnInit() {
    debugger

    if((localStorage.getItem('role') == '1')  || (localStorage.getItem('role') == '3')){
      this.showAttachment = true;
    }else {
      this.showAttachment = false;
    }
    // let checkuser=localStorage.getItem('role');
    // if(checkuser == '3'){
    //   // this.showRefAcept=true;
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
    let mstapplicantachievementdetailid = null;

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
    this.formid = mstapplicantachievementdetailid;
    //alert(mstapplicantachievementdetailid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.mstapplicantachievementdetail_service.getDefaultData().then(res => {
      debugger
      this.applicantid_List = res.list_applicantid.value;
      this.masterdataid_List = res.list_masterdataid.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.mstapplicantachievementdetail_service.get_mstapplicantachievementdetails_List().then(res => {
      debugger
      this.pkList = res as mstapplicantachievementdetail[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched
    this.mstapplicantachievementdetail_Form.markAsUntouched();
    this.mstapplicantachievementdetail_Form.markAsPristine();
  }
  onSelected_applicantid(applicantidDetail: any) {
    if (applicantidDetail.value && applicantidDetail) {
      this.mstapplicantachievementdetail_Form.patchValue({
        applicantid: applicantidDetail.value,
        applicantiddesc: applicantidDetail.label,

      });

    }
  }




  resetForm() {
    if (this.mstapplicantachievementdetail_Form != null)
      this.mstapplicantachievementdetail_Form.reset();
    this.mstapplicantachievementdetail_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let achievementid = this.mstapplicantachievementdetail_Form.get('achievementid').value;
    if (achievementid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.mstapplicantachievementdetail_service.delete_mstapplicantachievementdetail(achievementid).then(res => {
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
    this.mstapplicantachievementdetail_Form.patchValue({
      achievementid: null
    });
    if (this.formData.achievementid != null) this.formData.achievementid = null;
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
            this.mstapplicantachievementdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicantachievementdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicantachievementdetail_Form.controls[key] != undefined) {
                this.mstapplicantachievementdetail_Form.controls[key].disable({ onlySelf: true });
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

    this.router.navigate(['/home/boreportviewer/aadl']);

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
  masterdataid_onChange(evt: any) {
    let e = evt.value;
    this.mstapplicantachievementdetail_Form.patchValue({ masterdataiddesc: evt.options[evt.options.selectedIndex].text });
  }
  referenceacceptance_onChange(evt: any) {
    let e = this.f.referenceacceptance.value as any;
    this.mstapplicantachievementdetail_Form.patchValue({ referenceacceptancedesc: evt.options[evt.options.selectedIndex].text });
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



  edit_mstapplicantachievementdetails() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }


  viewrequestid() {



    this.dialog.open(mstapplicantreferencerequestComponent,
      {
        data: { showview: true, save: true, pkcol: this.sharedService.pk_encode(this.mstapplicantachievementdetail_Form.get('requestid').value), ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
    });
  }

  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.mstapplicantachievementdetail_service.get_mstapplicantachievementdetails_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.mstapplicantachievementdetail;
      let formproperty = res.mstapplicantachievementdetail.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstapplicantachievementdetail.pkcol;
      this.formid = res.mstapplicantachievementdetail.achievementid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    this.formData = res.mstapplicantachievementdetail;
    this.formid = res.mstapplicantachievementdetail.achievementid;
    this.pkcol = res.mstapplicantachievementdetail.pkcol;
    this.bmyrecord = false;
    if ((res.mstapplicantachievementdetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.mstapplicantachievementdetail_Form.patchValue({
      applicantid: res.mstapplicantachievementdetail.applicantid,
      applicantiddesc: res.mstapplicantachievementdetail.applicantiddesc,
      achievementid: res.mstapplicantachievementdetail.achievementid,
      masterdataid: res.mstapplicantachievementdetail.masterdataid,
      masterdataiddesc: res.mstapplicantachievementdetail.masterdataiddesc,
      achievementdetails: res.mstapplicantachievementdetail.achievementdetails,
      selfrating: res.mstapplicantachievementdetail.selfrating,
      remarks: res.mstapplicantachievementdetail.remarks,
      requestid: res.mstapplicantachievementdetail.requestid,
      referenceacceptance: res.mstapplicantachievementdetail.referenceacceptance,
      referenceacceptancedesc: res.mstapplicantachievementdetail.referenceacceptancedesc,
      attachment: JSON.parse(res.mstapplicantachievementdetail.attachment),
      status: res.mstapplicantachievementdetail.status,
      statusdesc: res.mstapplicantachievementdetail.statusdesc,
    });
    this.mstapplicantachievementdetail_menuactions = res.mstapplicantachievementdetail_menuactions;
    if (this.mstapplicantachievementdetail_Form.get('attachment').value != null && this.mstapplicantachievementdetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicantachievementdetail_Form.get('attachment').value);
    //Child Tables if any
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.mstapplicantachievementdetail_Form.controls) {
      let val = this.mstapplicantachievementdetail_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.mstapplicantachievementdetail_Form.controls[key] != null) {
        if (false) {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
        }
        else if (key == "selfrating") {
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
    if (!this.mstapplicantachievementdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstapplicantachievementdetail_Form.getRawValue();
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
    if (!this.mstapplicantachievementdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    // Object.keys(this.mstapplicantachievementdetail_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.mstapplicantachievementdetail_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);


    if (!this.mstapplicantachievementdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.mstapplicantachievementdetail_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.mstapplicantachievementdetail_Form.controls[key] != null) {
            this.formData[key] = this.mstapplicantachievementdetail_Form.controls[key].value;
          }
        }
      }
    }
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.mstapplicantachievementdetail_service.saveOrUpdate_mstapplicantachievementdetails(this.formData).subscribe(
      async res => {
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.sessionService.setItem("attachedsaved", "true")
        this.objvalues.push((res as any).mstapplicantachievementdetail);
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
            this.objvalues.push((res as any).mstapplicantachievementdetail);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.mstapplicantachievementdetail_Form.markAsUntouched();
        this.mstapplicantachievementdetail_Form.markAsPristine();
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



