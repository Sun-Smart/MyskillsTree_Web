import { mstapplicantskilldetailService } from './../../../service/mstapplicantskilldetail.service';
import { mstapplicantskilldetail } from './../../../model/mstapplicantskilldetail.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter, ɵɵtrustConstantResourceUrl } from '@angular/core';
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
import { mstsegment } from '../../../model/mstsegment.model';
import { mstsegmentComponent } from '../mstsegment/mstsegment.component';
import { mstcategoryComponent } from '../mstcategory/mstcategory.component';
import { mstsubcategoryComponent } from '../mstsubcategory/mstsubcategory.component';
@Component({
  selector: 'app-mstapplicantskilldetail',
  templateUrl: './mstapplicantskilldetail.component.html',
  styleUrls: ['./mstapplicantskilldetail.component.scss'],
  providers: [KeyboardShortcutsService]
})
export class mstapplicantskilldetailComponent implements OnInit {
  formData: mstapplicantskilldetail;
  list: mstapplicantskilldetail[];

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

  bfilterPopulate_mstapplicantskilldetails: boolean = false;
  mstapplicantskilldetail_menuactions: any = []

  mstapplicantskilldetail_Form: FormGroup;

  applicantid_List: DropDownValues[];
  applicantid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  skillcategory_List: DropDownValues[];
  // suneel

  subcategoryid_List: DropDownValues[];

  Segmentcategory_list: DropDownValues[];

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

  referenceacceptancevisible: boolean = false;
  requestidvisible: boolean = false;
  getidd: any;
  getidd1: any;
  getdata2: any;
  showinput1: boolean = false;
  showinput2: boolean = false;
  showinput3: boolean = false;

  showSkillDetails_input:boolean=false;




  constructor(
    private nav: Location,
    private translate: TranslateService,
    private keyboard: KeyboardShortcutsService, private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstapplicantskilldetail_service: mstapplicantskilldetailService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private sanitizer: DomSanitizer,
    // private bomasterdataservice: bomasterdataService,
    private bosubcategorymasterservice: bosubcategorymasterService,
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


    this.mstapplicantskilldetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: [null],
      applicantiddesc: [null],
      skillid: [null],
      skillcategory: [null, Validators.compose([Validators.required])],
      skillcategorydesc: [null, Validators.compose([Validators.required])],
      subcategoryid: [null, Validators.compose([Validators.required])],
      subcategoryiddesc: [null, Validators.compose([Validators.required])],
      segmentid: [null, Validators.compose([Validators.required])],
      segmentcategorydesc: [null, Validators.compose([Validators.required])],
      selfrating: [null],
      remarks: [null],
      requestid: [null],
      referenceacceptance: [null],
      referenceacceptancedesc: [null],
      showorhide: [Boolean],
      attachment: [null],
      status: [null],
      statusdesc: [null],
      segmentcategoryothers: [null],
      skillcategoryothers: [null],
      subcategoryidothers: [null]
    });
  }

  addSkills(){
    this.showSkillDetails_input = true;
  };

  skillClose(){
    this.showSkillDetails_input = false;
  }

  debugger
  get f() { return this.mstapplicantskilldetail_Form.controls; }

  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {

    if (this.mstapplicantskilldetail_Form.dirty && this.mstapplicantskilldetail_Form.touched) {
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

    let pos = this.pkList.map(function (e: any) { return e.skillid.toString(); }).indexOf(this.formid.toString());
    if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
  }

  next() {
    ;
    let pos = this.pkList.map(function (e: any) { return e.skillid.toString(); }).indexOf(this.formid.toString());
    if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
  }

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.skillid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  // initialize
  async ngOnInit() {
    debugger
    console.log(this.subcategoryid_List)
    console.log(this.mstapplicantskilldetail_Form);

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
    let mstapplicantskilldetailid = null;

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
    this.formid = mstapplicantskilldetailid;
    //alert(mstapplicantskilldetailid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }

    this.mstapplicantskilldetail_service.getList_segmentcategory().then(res => {


      //  this.applicantid_List = res.list_applicantid.value;
      this.Segmentcategory_list = res;
      // this.referenceacceptance_List = res.list_referenceacceptance.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    this.mstapplicantskilldetail_service.getDefaultData().then(res => {

      console.log(res)

      this.applicantid_List = res.list_applicantid.value;

      // this.skillcategory_List = res.list_skillcategory.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_List().then(res => {
      this.pkList = res as mstapplicantskilldetail[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched
    this.mstapplicantskilldetail_Form.markAsUntouched();
    this.mstapplicantskilldetail_Form.markAsPristine();
  }

  onSelected_applicantid(applicantidDetail: any) {
    if (applicantidDetail.value && applicantidDetail) {
      this.mstapplicantskilldetail_Form.patchValue({
        applicantid: applicantidDetail.value,
        applicantiddesc: applicantidDetail.label,

      });

    }
  }



  resetForm() {
    if (this.mstapplicantskilldetail_Form != null)
      this.mstapplicantskilldetail_Form.reset();
    this.mstapplicantskilldetail_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    this.referenceacceptancevisible = false;
    this.requestidvisible = false;
  }

  onDelete() {
    let skillid = this.mstapplicantskilldetail_Form.get('skillid').value;
    if (skillid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.mstapplicantskilldetail_service.delete_mstapplicantskilldetail(skillid).then(res => {
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
    this.mstapplicantskilldetail_Form.patchValue({
      skillid: null
    });
    if (this.formData.skillid != null) this.formData.skillid = null;
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
            this.mstapplicantskilldetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicantskilldetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicantskilldetail_Form.controls[key] != undefined) {
                this.mstapplicantskilldetail_Form.controls[key].disable({ onlySelf: true });
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
      // this.onSubmitDataDlg(true);
      this.onSubmitData(true);
    }
    else {
      this.onSubmitData(true);
    }
  }
  openReference() {
    this.sharedService.currenturl = "home/boreportviewer/arrA";
    this.router.navigate(["home/boreportviewer/arrA"]);
  }


  applicantid_onChange(evt: any) {
    let e = evt.value;
  }

  segmentcategory_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.getidd = e

    if (this.getidd == "166") {
      this.showinput1 = true
    } else {
      this.showinput2 = false
      this.showinput3 = false
      this.showinput1 = false
    }
    this.mstapplicantskilldetail_Form.patchValue({ segmentcategorydesc: evt.options[evt.options.selectedIndex].text, segmentid: e });
    setTimeout(() => {
      if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null)
        this.mstapplicantskilldetail_service.getList_skillcategory2(e).then((res:any) => {
          debugger

          this.skillcategory_List = res as DropDownValues[];
        })

    }
    );

    setTimeout(() => {
      if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)
        this.mstapplicantskilldetail_service.getList_subcategoryid2(e).then(res =>
          this.subcategoryid_List = res as DropDownValues[]);
    });


  }



  skillcategory_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.getidd1 = e
    if (this.getidd1 == "262") {
      this.showinput2 = true
    } else {
      this.showinput2 = false
    }
    this.mstapplicantskilldetail_Form.patchValue({
      skillcategorydesc: evt.options[evt.options.selectedIndex].text, skillcategory: e, categoryid: this.getidd1

    });
    setTimeout(() => {
      if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)

        debugger
      this.mstapplicantskilldetail_service.getList_subcategoryid2(e).then(res =>

        this.subcategoryid_List = res as DropDownValues[]);
    });
  }
  subcategoryid_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.getdata2 = e
    if (this.getdata2 == "411") {
      this.showinput3 = true
    } else {
      this.showinput3 = false
    }
    this.mstapplicantskilldetail_Form.patchValue({ subcategoryiddesc: evt.options[evt.options.selectedIndex].text, categoryid: this.getdata2 });
  }
  referenceacceptance_onChange(evt: any) {
    let e = this.f.referenceacceptance.value as any;
    this.mstapplicantskilldetail_Form.patchValue({ referenceacceptancedesc: evt.options[evt.options.selectedIndex].text });
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



  edit_mstapplicantskilldetails() {
    this.showview = false;
    setTimeout(() => {
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {

    this.spinner.show();
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByEID(pkcol).then(res => {
      debugger
      console.log("populatescreen", res)
      this.spinner.hide();

      this.formData = res.mstapplicantskilldetail;
      let formproperty = res.mstapplicantskilldetail.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstapplicantskilldetail.pkcol;
      this.formid = res.mstapplicantskilldetail.skillid;
      this.FillData(res);
    }).catch((err) => { console.log(err); });
  }

  FillData(res: any) {
    debugger
    this.formData = res.mstapplicantskilldetail;
    this.formid = res.mstapplicantskilldetail.skillid;
    this.pkcol = res.mstapplicantskilldetail.pkcol;
    this.bmyrecord = false;
    if ((res.mstapplicantskilldetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    //console.log(res.orderDetails);
    this.mstapplicantskilldetail_Form.patchValue({
      applicantid: res.mstapplicantskilldetail.applicantid,
      applicantiddesc: res.mstapplicantskilldetail.applicantiddesc,
      skillid: res.mstapplicantskilldetail.skillid,
      skillcategory: res.mstapplicantskilldetail.skillcategory,
      skillcategorydesc: res.mstapplicantskilldetail.skillcategorydesc,
      subcategoryid: res.mstapplicantskilldetail.subcategoryid,
      subcategoryiddesc: res.mstapplicantskilldetail.subcategoryiddesc,

      //suneel
      segmentid: res.mstapplicantskilldetail.segmentid,
      segmentcategorydesc: res.mstapplicantskilldetail.segmentdesc,


      segmentcategoryothers: res.mstapplicantskilldetail.segmentcategoryothers,
      skillcategoryothers: res.mstapplicantskilldetail.skillcategoryothers,
      subcategoryidothers: res.mstapplicantskilldetail.subcategoryidothers,



      selfrating: res.mstapplicantskilldetail.selfrating,
      remarks: res.mstapplicantskilldetail.remarks,
      requestid: res.mstapplicantskilldetail.requestid,
      showorhide: res.mstapplicantskilldetail.showorhide,
      referenceacceptance: res.mstapplicantskilldetail.referenceacceptance,
      referenceacceptancedesc: res.mstapplicantskilldetail.referenceacceptancedesc,
      attachment: JSON.parse(res.mstapplicantskilldetail.attachment),
      status: res.mstapplicantskilldetail.status,
      statusdesc: res.mstapplicantskilldetail.statusdesc,
    });

    console.log(' this.mstapplicantskilldetail_Form', this.mstapplicantskilldetail_Form);

    this.referenceacceptancevisible = false;
    this.requestidvisible = false;
    //hide list
    if (res.visiblelist != undefined && res.visiblelist.indexOf("referenceacceptance") >= 0) this.referenceacceptancevisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("referenceacceptance") >= 0) this.referenceacceptancevisible = false;
    if (res.visiblelist != undefined && res.visiblelist.indexOf("requestid") >= 0) this.requestidvisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("requestid") >= 0) this.requestidvisible = false;
    this.mstapplicantskilldetail_menuactions = res.mstapplicantskilldetail_menuactions;
    if (this.mstapplicantskilldetail_Form.get('attachment').value != null && this.mstapplicantskilldetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicantskilldetail_Form.get('attachment').value);
    setTimeout(() => {
      if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null) this.mstapplicantskilldetail_service.getList_subcategoryid2(this.f.skillcategory.value).then(res => {
        this.subcategoryid_List = res as DropDownValues[];
      }).catch((err) => { console.log(err); });

      if (this.f.segmentid.value == "166") {
        this.showinput1 = true

      }
      if (this.f.skillcategory.value == "262") {
        this.showinput2 = true

      }
      if (this.f.subcategoryid.value == "411") {
        this.showinput3 = true

      }



      if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null) this.mstapplicantskilldetail_service.getList_skillcategory2(this.f.segmentid.value).then(res => {
        this.skillcategory_List = res as DropDownValues[];
      }).catch((err) => { console.log(err); });

    }






    );
    //Child Tables if any
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.mstapplicantskilldetail_Form.controls) {
      let val = this.mstapplicantskilldetail_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.mstapplicantskilldetail_Form.controls[key] != null) {
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
    if (!this.mstapplicantskilldetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstapplicantskilldetail_Form.getRawValue();
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(obj);
    await this.sharedService.upload(this.fileAttachmentList);
    this.attachmentlist = [];
    this.resetForm();
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
    debugger
    this.isSubmitted = true;
    let strError = "";

    // Object.keys(this.mstapplicantskilldetail_Form.controls).forEach(key => {
    //   const controlErrors: ValidationErrors = this.mstapplicantskilldetail_Form.get(key).errors;
    //   if (controlErrors != null) {
    //     Object.keys(controlErrors).forEach(keyError => {
    //       strError += '' + key + ' ' + keyError + ' ';
    //     });
    //   }
    // });
    if (strError != "") return this.sharedService.alert(strError);
    if (!this.mstapplicantskilldetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }


    if (!this.validate()) {
      return;
    }
    this.formData = this.mstapplicantskilldetail_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.mstapplicantskilldetail_Form.controls[key] != null) {
            this.formData[key] = this.mstapplicantskilldetail_Form.controls[key].value;
          }
        }
      }
    }
    debugger
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    debugger
    this.spinner.show();
    this.mstapplicantskilldetail_service.saveOrUpdate_mstapplicantskilldetails(this.formData).subscribe(
      async res => {
        debugger
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.spinner.hide();

        this.toastr.addSingle("success", "", "Successfully saved");
        this.skillcategory_List = [];
        this.subcategoryid_List = [];
        this.Segmentcategory_list = [];
        this.mstapplicantskilldetail_Form.markAsUntouched();
        this.mstapplicantskilldetail_Form.markAsPristine();
        this.ngOnInit();
        this.sessionService.setItem("attachedsaved", "true");
        let getapp = parseInt(localStorage.getItem('applicantid'));
        this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(getapp);
        this.objvalues.push((res as any).mstapplicantskilldetail);
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
            this.objvalues.push((res as any).mstapplicantskilldetail);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.mstapplicantskilldetail_Form.markAsUntouched();
        this.mstapplicantskilldetail_Form.markAsPristine();
      },
      err => {
        debugger;
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }

  // new from mstsegment





  // AddOrEditsegmentcategory(masterdataid) {
  //   alert("123")

  //       let ScreenType = '2';
  //       this.dialog.open(bomasterdataComponent,
  //         {
  //           data: { categoryid: this.mstapplicantskilldetail_Form.get('skillcategory').value, save: true, masterdatatypeid: 76, ScreenType: 2 }
  //         }
  //       ).onClose.subscribe(res => {
  //         this.bomasterdataservice.getList("asc").then(res => {
  //           this.Segmentcategory_list = res as DropDownValues[];
  //         }).catch((err) => {
  //           //console.log(err);
  //         });
  //       });
  //     }


  AddOrEditsegmentcategory(masterdataid) {
    this.dialog.open(mstsegmentComponent,
      {
        data: { categoryid: this.mstapplicantskilldetail_Form.get('segmentid').value, save: true, masterdatatypeid: 76, ScreenType: 2 }
      }
    ).onClose.subscribe(res => {
      this.mstapplicantskilldetail_service.getList_segmentcategory().then(res => {
        this.Segmentcategory_list = res as DropDownValues[];
        //to null category and subcategory
        setTimeout(() => {
          if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null)
            this.mstapplicantskilldetail_service.getList_skillcategory2(this.f.segmentid.value).then(res =>
              this.skillcategory_List = res as DropDownValues[]);
        });
        setTimeout(() => {
          if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)
            this.mstapplicantskilldetail_service.getList_subcategoryid2(this.f.segmentid.value).then(res =>
              this.subcategoryid_List = res as DropDownValues[]);
        });
        //end
      }).catch((err) => {
        //console.log(err);
      });
    });
  }

  AddOrEditskillcategory(masterdataid) {
    debugger
    var segmentid = this.getidd
    let ScreenType = '2';
    this.dialog.open(mstcategoryComponent,
      {
        data: { segmentid: this.mstapplicantskilldetail_Form.get('segmentid').value, save: true, masterdatatypeid: 76, ScreenType: 2 }
        // data: { categoryid: this.mstapplicantskilldetail_Form.get('skillcategory').value, save: true, masterdatatypeid: 76, ScreenType: 2,segmentid:segmentid }
      }
    ).onClose.subscribe(res => {
      if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null)
        this.mstapplicantskilldetail_service.getList_skillcategory2(this.f.segmentid.value).then(res => {
          debugger
          this.skillcategory_List = res as DropDownValues[];
          //suneel
          if (this.formData && this.formData.skillcategory) {
            debugger
            this.mstapplicantskilldetail_Form.patchValue({
              skillcategory: this.formData.skillcategory,
              skillcategorydesc: this.formData.skillcategorydesc,
            });
          }
          //to null subcategory
          setTimeout(() => {
            if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)
              this.mstapplicantskilldetail_service.getList_subcategoryid2(this.f.segmentid.value).then(res =>
                this.subcategoryid_List = res as DropDownValues[]);
          });

          //end

        }).catch((err) => {
          //console.log(err);
        });
    });
  }

  AddOrEditskillsubcategory(masterdataid) {

    var skillcategory = this.getidd1

    let ScreenType = '2';
    this.dialog.open(mstsubcategoryComponent,
      {
        data: { categoryid: this.mstapplicantskilldetail_Form.get('skillcategory').value, save: true, masterdatatypeid: 76, ScreenType: 2, skillcategory: skillcategory }
      }
    ).onClose.subscribe(res => {
      if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)
        this.mstapplicantskilldetail_service.getList_subcategoryid2(this.f.skillcategory.value).then(res => {
          debugger
          this.subcategoryid_List = res as DropDownValues[];
          debugger
          if (this.formData && this.formData.subcategoryid) {
            this.mstapplicantskilldetail_Form.patchValue({
              subcategoryid: this.formData.subcategoryid,
              subcategoryiddesc: this.formData.subcategoryiddesc,
            });
          }
        }
        );
    });
  }


  viewrequestid() {
    this.dialog.open(mstapplicantreferencerequestComponent,
      {
        data: { showview: true, save: true, pkcol: this.sharedService.pk_encode(this.mstapplicantskilldetail_Form.get('requestid').value), ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
    });
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



