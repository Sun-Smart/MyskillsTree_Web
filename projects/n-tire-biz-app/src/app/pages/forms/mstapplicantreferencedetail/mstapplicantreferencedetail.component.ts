import { mstapplicantreferencedetailService } from './../../../service/mstapplicantreferencedetail.service';
import { mstapplicantreferencedetail } from './../../../model/mstapplicantreferencedetail.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { KeyValuePair } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { mstapplicantreferencerequestComponent } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component';
import { ShortcutInput } from "ng-keyboard-shortcuts";
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

@Component({
  selector: 'app-mstapplicantreferencedetail',
  templateUrl: './mstapplicantreferencedetail.component.html',
  styles: [],
  providers: []
})



export class mstapplicantreferencedetailComponent implements OnInit {
  formData: mstapplicantreferencedetail;
  list: mstapplicantreferencedetail[];
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

  bfilterPopulate_mstapplicantreferencedetails: boolean = false;
  mstapplicantreferencedetail_menuactions: any = []

  mstapplicantreferencedetail_Form: FormGroup;

  applicantid_List: DropDownValues[];
  applicantid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  referencetype_List: DropDownValues[];
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
  showRefAcept:boolean;

  constructor( private router: Router,
    private themeService: ThemeService,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstapplicantreferencedetail_service: mstapplicantreferencedetailService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;
    this.mstapplicantreferencedetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: [null],
      applicantiddesc: [null],
      referenceid: [null],
      referencetype: [null, Validators.compose([Validators.required])],
      referencetypedesc: [null],
      referencename: [null, Validators.compose([Validators.required])],
      companyname: [null, Validators.compose([Validators.required])],
      designation: [null],
      mobilenumber: [null],
      email: [null, Validators.compose([Validators.required])],
      knownduration: [null],
      isrelative: [null],
      remarks: [null],
      requestid: [null],
      referenceacceptance: [null],
      referenceacceptancedesc: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.mstapplicantreferencedetail_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    if (this.mstapplicantreferencedetail_Form.dirty && this.mstapplicantreferencedetail_Form.touched) {
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
    if (pkDetail.referenceid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  // initialize
  async ngOnInit() {
    let checkuser=localStorage.getItem('role');
    if(checkuser == '3'){
      this.showRefAcept=true;
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
    let mstapplicantreferencedetailid = null;

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
    this.formid = mstapplicantreferencedetailid;
    //alert(mstapplicantreferencedetailid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.mstapplicantreferencedetail_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.referencetype_List = res.list_referencetype.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
    }).catch((err) => { this.spinner.hide(); });

    //autocomplete
    this.mstapplicantreferencedetail_service.get_mstapplicantreferencedetails_List().then(res => {
      this.pkList = res as mstapplicantreferencedetail[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); });
    //setting the flag that the screen is not touched
    this.mstapplicantreferencedetail_Form.markAsUntouched();
    this.mstapplicantreferencedetail_Form.markAsPristine();
  }
  onSelected_applicantid(applicantidDetail: any) {
    if (applicantidDetail.value && applicantidDetail) {
      this.mstapplicantreferencedetail_Form.patchValue({
        applicantid: applicantidDetail.value,
        applicantiddesc: applicantidDetail.label,

      });

    }
  }




  resetForm() {
    if (this.mstapplicantreferencedetail_Form != null)
      this.mstapplicantreferencedetail_Form.reset();
    this.mstapplicantreferencedetail_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  onDelete() {
    let referenceid = this.mstapplicantreferencedetail_Form.get('referenceid').value;
    if (referenceid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.mstapplicantreferencedetail_service.delete_mstapplicantreferencedetail(referenceid).then(res => {
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
    this.mstapplicantreferencedetail_Form.patchValue({
      referenceid: null
    });
    if (this.formData.referenceid != null) this.formData.referenceid = null;
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
            this.mstapplicantreferencedetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicantreferencedetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicantreferencedetail_Form.controls[key] != undefined) {
                this.mstapplicantreferencedetail_Form.controls[key].disable({ onlySelf: true });
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
  referencetype_onChange(evt: any) {
    let e = this.f.referencetype.value as any;
    this.mstapplicantreferencedetail_Form.patchValue({ referencetypedesc: evt.options[evt.options.selectedIndex].text });
  }
  referenceacceptance_onChange(evt: any) {
    let e = this.f.referenceacceptance.value as any;
    this.mstapplicantreferencedetail_Form.patchValue({ referenceacceptancedesc: evt.options[evt.options.selectedIndex].text });
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



  edit_mstapplicantreferencedetails() {
    this.showview = false;
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.mstapplicantreferencedetail_service.get_mstapplicantreferencedetails_ByEID(pkcol).then(res => {
      this.spinner.hide();
      this.formData = res.mstapplicantreferencedetail;
      let formproperty = res.mstapplicantreferencedetail.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstapplicantreferencedetail.pkcol;
      this.formid = res.mstapplicantreferencedetail.referenceid;
      this.FillData(res);
    }).catch((err) => { });
  }

  FillData(res: any) {
    this.formData = res.mstapplicantreferencedetail;
    this.formid = res.mstapplicantreferencedetail.referenceid;
    this.pkcol = res.mstapplicantreferencedetail.pkcol;
    this.bmyrecord = false;
    if ((res.mstapplicantreferencedetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    this.mstapplicantreferencedetail_Form.patchValue({
      applicantid: res.mstapplicantreferencedetail.applicantid,
      applicantiddesc: res.mstapplicantreferencedetail.applicantiddesc,
      referenceid: res.mstapplicantreferencedetail.referenceid,
      referencetype: res.mstapplicantreferencedetail.referencetype,
      referencetypedesc: res.mstapplicantreferencedetail.referencetypedesc,
      referencename: res.mstapplicantreferencedetail.referencename,
      companyname: res.mstapplicantreferencedetail.companyname,
      designation: res.mstapplicantreferencedetail.designation,
      mobilenumber: res.mstapplicantreferencedetail.mobilenumber,
      email: res.mstapplicantreferencedetail.email,
      knownduration: res.mstapplicantreferencedetail.knownduration,
      isrelative: res.mstapplicantreferencedetail.isrelative,
      remarks: res.mstapplicantreferencedetail.remarks,
      requestid: res.mstapplicantreferencedetail.requestid,
      referenceacceptance: res.mstapplicantreferencedetail.referenceacceptance,
      referenceacceptancedesc: res.mstapplicantreferencedetail.referenceacceptancedesc,
      attachment: JSON.parse(res.mstapplicantreferencedetail.attachment),
      status: res.mstapplicantreferencedetail.status,
      statusdesc: res.mstapplicantreferencedetail.statusdesc,
    });
    this.mstapplicantreferencedetail_menuactions = res.mstapplicantreferencedetail_menuactions;
    if (this.mstapplicantreferencedetail_Form.get('attachment').value != null && this.mstapplicantreferencedetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicantreferencedetail_Form.get('attachment').value);
    //Child Tables if any
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    for (let key in this.mstapplicantreferencedetail_Form.controls) {
      let val = this.mstapplicantreferencedetail_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.mstapplicantreferencedetail_Form.controls[key] != null) {
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
    if (!this.mstapplicantreferencedetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstapplicantreferencedetail_Form.getRawValue();
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    await this.sharedService.upload(this.fileAttachmentList);
    this.attachmentlist = [];
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

  viewrequestid() {
    this.dialog.open(mstapplicantreferencerequestComponent,
      {
        data: { showview: true, save: true, pkcol: this.sharedService.pk_encode(this.mstapplicantreferencedetail_Form.get('requestid').value), ScreenType: 2 },
      }
    ).onClose.subscribe(res => {
    });
  }

  async onSubmitData(bclear: any) {
    this.isSubmitted = true;
    let strError = "";
    if (!this.mstapplicantreferencedetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (strError != "") return this.sharedService.alert(strError);

    if (!this.validate()) {
      return;
    }
    this.formData = this.mstapplicantreferencedetail_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.mstapplicantreferencedetail_Form.controls[key] != null) {
            this.formData[key] = this.mstapplicantreferencedetail_Form.controls[key].value;
          }
        }
      }
    }
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    this.spinner.show();
    this.mstapplicantreferencedetail_service.saveOrUpdate_mstapplicantreferencedetails(this.formData).subscribe(
      async res => {
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.spinner.hide();
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).mstapplicantreferencedetail);
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
            this.objvalues.push((res as any).mstapplicantreferencedetail);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.mstapplicantreferencedetail_Form.markAsUntouched();
        this.mstapplicantreferencedetail_Form.markAsPristine();
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



