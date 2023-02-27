import { mstapplicantskilldetailService } from './../../../service/mstapplicantskilldetail.service';
import { mstapplicantskilldetail } from './../../../model/mstapplicantskilldetail.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { KeyValuePair } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput } from "ng-keyboard-shortcuts";
import { mstapplicantreferencerequestComponent } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';
import { bosubcategorymasterService } from './../../../service/bosubcategorymaster.service';
import { mstsegmentComponent } from '../mstsegment/mstsegment.component';
import { mstcategoryComponent } from '../mstcategory/mstcategory.component';
import { mstsubcategoryComponent } from '../mstsubcategory/mstsubcategory.component';
@Component({
  selector: 'app-mstapplicantskilldetail',
  templateUrl: './mstapplicantskilldetail.component.html',
  styleUrls: ['./mstapplicantskilldetail.component.scss'],
  providers: []
})
export class mstapplicantskilldetailComponent implements OnInit {
  formData: mstapplicantskilldetail;
  list: mstapplicantskilldetail[];

  showAttachmentView :boolean = false;
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

  constructor(private router: Router,
    private themeService: ThemeService,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstapplicantskilldetail_service: mstapplicantskilldetailService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;
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

  //on searching in pk autocomplete
  onSelectedpk(pkDetail: any) {
    if (pkDetail.skillid && pkDetail) {
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
      this.Segmentcategory_list = res;
    }).catch((err) => { this.spinner.hide();});

    this.mstapplicantskilldetail_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
    }).catch((err) => { this.spinner.hide(); });

    //autocomplete
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_List().then(res => {
      this.pkList = res as mstapplicantskilldetail[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); });
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
        ).catch((err) => { this.spinner.hide(); });
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
      this.mstapplicantskilldetail_service.getList_subcategoryid2(e).then(res =>

        this.subcategoryid_List = res as DropDownValues[]);
    });
  }
  subcategoryid_onChange(evt: any) {
    let e = evt.value;
    this.getdata2 = e
    if (this.getdata2 == "512") {
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
    return false;
  }



  async PopulateScreen(pkcol: any) {

    this.spinner.show();
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByEID(pkcol).then(res => {
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
    this.formData = res.mstapplicantskilldetail;
    this.formid = res.mstapplicantskilldetail.skillid;
    this.pkcol = res.mstapplicantskilldetail.pkcol;
    this.bmyrecord = false;
    if ((res.mstapplicantskilldetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
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
      }).catch((err) => { });

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
      }).catch((err) => { });

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
    await this.sharedService.upload(this.fileAttachmentList);
    this.attachmentlist = [];
    this.resetForm();
    if (this.fileattachment) this.fileattachment.clear();
    this.objvalues.push(obj);
    this.dialogRef.close(this.objvalues);
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
    this.isSubmitted = true;
    let strError = "";
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
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    this.spinner.show();
    this.mstapplicantskilldetail_service.saveOrUpdate_mstapplicantskilldetails(this.formData).subscribe(
      async res => {
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
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
      }
    )
  }


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
      });
    });
  }

  AddOrEditskillcategory(masterdataid) {
    var segmentid = this.getidd
    let ScreenType = '2';
    this.dialog.open(mstcategoryComponent,
      {
        data: { segmentid: this.mstapplicantskilldetail_Form.get('segmentid').value, save: true, masterdatatypeid: 76, ScreenType: 2 }
      }
    ).onClose.subscribe(res => {
      if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null)
        this.mstapplicantskilldetail_service.getList_skillcategory2(this.f.segmentid.value).then(res => {
          this.skillcategory_List = res as DropDownValues[];
          //suneel
          if (this.formData && this.formData.skillcategory) {
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
          this.subcategoryid_List = res as DropDownValues[];
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

  PrevForm() {
    let formid = this.sessionService.getItem("key");
    let prevform = this.sessionService.getItem("prevform");
    this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
  }

}



