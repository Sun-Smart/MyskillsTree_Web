import { mstapplicantmasterService } from './../../../service/mstapplicantmaster.service';
import { mstapplicantmaster } from './../../../model/mstapplicantmaster.model';
import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
import { KeyValuePair } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
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
  selector: 'app-mstapplicantmastermain',
  templateUrl: './mstapplicantmastermain.component.html',
  styles: [],
  providers: []
})

export class mstapplicantmastermainComponent implements OnInit {
  formData: mstapplicantmaster;
  list: mstapplicantmaster[];
  bmyrecord: boolean = false;
  maxDate = undefined;
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

  bfilterPopulate_mstapplicantmasters: boolean = false;
  mstapplicantmaster_menuactions: any = [];

  mstapplicantmaster_Form: FormGroup;

  applicanttype_List: DropDownValues[];
  gender_List: DropDownValues[];
  country_List: DropDownValues[];
  country_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  state_List: DropDownValues[];
  state_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  city_List: DropDownValues[];
  city_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

  private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
  showFormType: any;
  formid: any;
  pkcol: any;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentFieldJson: any[] = [];
  attachmentVisible: boolean = true;
  @ViewChild('profilephoto', { static: false }) profilephoto: AttachmentComponent;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;

  profilecompletionvisible: boolean = false;
  showOpenfile: boolean = false;

  constructor( private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private mstapplicantmaster_service: mstapplicantmasterService,
    private fb: FormBuilder,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private sanitizer: DomSanitizer,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {

    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;
    this.mstapplicantmaster_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: [null],
      firstname: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      lastname: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      emailid: [null, Validators.compose([Validators.required])],
      mobilenumber: [null, Validators.compose([Validators.required])],
      applicanttype: [null, Validators.compose([Validators.required])],
      applicanttypedesc: [null],
      gender: [null],
      genderdesc: [null],
      dob: [null],
      address1: [null],
      address2: [null],
      address3: [null],
      country: [null],
      countrydesc: [null],
      state: [null],
      statedesc: [null],
      city: [null],
      citydesc: [null],
      zipcode: [null],
      recoveryemailid: [null],
      profilephoto: [null],
      briefintroduction: [null],
      statuscrimp: [null],
      availableforjob: [null],
      profilecompletion: [null],
      applicantreference: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
  }

  get f() { return this.mstapplicantmaster_Form.controls; }


  //when child screens are clicked - it will be made invisible
  ToolBar(prop) {
    this.toolbarVisible = prop;
  }

  //function called when we navigate to other page.defined in routing
  canDeactivate(): Observable<boolean> | boolean {
    if (this.mstapplicantmaster_Form.dirty && this.mstapplicantmaster_Form.touched) {
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
    if (pkDetail.applicantid && pkDetail) {
      this.PopulateScreen(pkDetail.pkcol);
    }
  }

  // initialize
  async ngOnInit() {
    this.sessionService.setItem("choosefileforprofile", "ok");
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
    let mstapplicantmasterid = null;

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
    mstapplicantmasterid = this.data.applicantid;
    this.pkcol = this.sessionService.getItem('usersource');
    this.formid = mstapplicantmasterid;

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records

    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.mstapplicantmaster_service.getDefaultData().then(res => {
      this.applicanttype_List = res.list_applicanttype.value;
      this.gender_List = res.list_gender.value;
      this.country_List = res.list_country.value;
    }).catch((err) => { this.spinner.hide(); });

    //autocomplete
    this.mstapplicantmaster_service.get_mstapplicantmasters_List().then(res => {
      this.pkList = res as mstapplicantmaster[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); });
    //setting the flag that the screen is not touched
    this.mstapplicantmaster_Form.markAsUntouched();
    this.mstapplicantmaster_Form.markAsPristine();
  }
  onSelected_country(countryDetail: any) {
    if (countryDetail.value && countryDetail) {
      this.mstapplicantmaster_Form.patchValue({
        country: countryDetail.value,
        countrydesc: countryDetail.label,

      });
      this.mstapplicantmaster_service.getList_state(countryDetail.value).then(res => {
        this.state_List = res as DropDownValues[]
      }).catch((err) => { this.spinner.hide(); });

    }
  }

  onSelected_state(stateDetail: any) {
    if (stateDetail.value && stateDetail) {
      this.mstapplicantmaster_Form.patchValue({
        state: stateDetail.value,
        statedesc: stateDetail.label,

      });
      this.mstapplicantmaster_service.getList_city(stateDetail.value).then(res => {
        this.city_List = res as DropDownValues[]
      }).catch((err) => { this.spinner.hide(); });

    }
  }

  onSelected_city(cityDetail: any) {
    if (cityDetail.value && cityDetail) {
      this.mstapplicantmaster_Form.patchValue({
        city: cityDetail.value,
        citydesc: cityDetail.label,

      });

    }
  }


  getprofilephoto() {
    if (this.profilephoto.getAttachmentList().length > 0) {
      let file = this.profilephoto.getAttachmentList()[0];
      this.sharedService.geturl(file.filekey, file.type);
    }
  }

  resetForm() {
    if (this.mstapplicantmaster_Form != null)
      this.mstapplicantmaster_Form.reset();
    this.mstapplicantmaster_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    this.profilecompletionvisible = false;
  }

  onDelete() {
    let applicantid = this.mstapplicantmaster_Form.get('applicantid').value;
    if (applicantid != null) {
      if (confirm('Are you sure to delete this record ?')) {
        this.mstapplicantmaster_service.delete_mstapplicantmaster(applicantid).then(res => {
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
    this.mstapplicantmaster_Form.patchValue({
      applicantid: null
    });
    if (this.formData.applicantid != null) this.formData.applicantid = null;
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
          else if (key == "dob")
            this.mstapplicantmaster_Form.patchValue({ "dob": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (ctrltype == "string") {
            this.mstapplicantmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicantmaster_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicantmaster_Form.controls[key] != undefined) {
                this.mstapplicantmaster_Form.controls[key].disable({ onlySelf: true });
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
    localStorage.removeItem("choosefileforprofile")
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
  applicanttype_onChange(evt: any) {
    let e = this.f.applicanttype.value as any;
    this.mstapplicantmaster_Form.patchValue({ applicanttypedesc: evt.options[evt.options.selectedIndex].text });
  }
  gender_onChange(evt: any) {
    let e = this.f.gender.value as any;
    this.mstapplicantmaster_Form.patchValue({ genderdesc: evt.options[evt.options.selectedIndex].text });
  }
  country_onChange(evt: any) {
    let e = evt.value;
  }
  state_onChange(evt: any) {
    let e = evt.value;
  }
  city_onChange(evt: any) {
    let e = evt.value;
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



  edit_mstapplicantmasters() {
    this.showview = false;
    setTimeout(() => {
      if (this.profilephoto != null && this.profilephoto != undefined) this.profilephoto.setattachmentlist(this.mstapplicantmaster_Form.get('profilephoto').value);
    });
    return false;
  }



  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(pkcol).then(res => {
      this.spinner.hide();

      this.formData = res.mstapplicantmaster;
      let formproperty = res.mstapplicantmaster.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstapplicantmaster.pkcol;
      this.formid = res.mstapplicantmaster.applicantid;
      this.FillData(res);
    }).catch((err) => {});
  }

  FillData(res: any) {
    this.formData = res.mstapplicantmaster;
    this.formid = res.mstapplicantmaster.applicantid;
    this.pkcol = res.mstapplicantmaster.pkcol;
    this.bmyrecord = false;
    if ((res.mstapplicantmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    this.mstapplicantmaster_Form.patchValue({
      applicantid: res.mstapplicantmaster.applicantid,
      firstname: res.mstapplicantmaster.firstname,
      lastname: res.mstapplicantmaster.lastname,
      emailid: res.mstapplicantmaster.emailid,
      mobilenumber: res.mstapplicantmaster.mobilenumber,
      applicanttype: res.mstapplicantmaster.applicanttype,
      applicanttypedesc: res.mstapplicantmaster.applicanttypedesc,
      gender: res.mstapplicantmaster.gender,
      genderdesc: res.mstapplicantmaster.genderdesc,
      dob: this.ngbDateParserFormatter.parse(res.mstapplicantmaster.dob),
      address1: res.mstapplicantmaster.address1,
      address2: res.mstapplicantmaster.address2,
      address3: res.mstapplicantmaster.address3,
      country: res.mstapplicantmaster.country,
      countrydesc: res.mstapplicantmaster.countrydesc ?? '',
      state: res.mstapplicantmaster.state,
      statedesc: res.mstapplicantmaster.statedesc ?? '',
      city: res.mstapplicantmaster.city,
      citydesc: res.mstapplicantmaster.citydesc ?? '',
      zipcode: res.mstapplicantmaster.zipcode,
      recoveryemailid: res.mstapplicantmaster.recoveryemailid,
      profilephoto: JSON.parse(res.mstapplicantmaster.profilephoto),
      briefintroduction: res.mstapplicantmaster.briefintroduction,
      statuscrimp: res.mstapplicantmaster.statuscrimp,
      availableforjob: res.mstapplicantmaster.availableforjob,
      profilecompletion: res.mstapplicantmaster.profilecompletion,
      applicantreference: res.mstapplicantmaster.applicantreference,
      attachment: JSON.parse(res.mstapplicantmaster.attachment),
      status: res.mstapplicantmaster.status,
      statusdesc: res.mstapplicantmaster.statusdesc,
    });

    this.profilecompletionvisible = false;
    //hide list
    if (res.visiblelist != undefined && res.visiblelist.indexOf("profilecompletion") >= 0) this.profilecompletionvisible = true;
    if (res.hidelist != undefined && res.hidelist.indexOf("profilecompletion") >= 0) this.profilecompletionvisible = false;
    this.mstapplicantmaster_menuactions = res.mstapplicantmaster_menuactions;
    if (this.mstapplicantmaster_Form.get('profilephoto').value != null && this.mstapplicantmaster_Form.get('profilephoto').value != "" && this.profilephoto != null && this.profilephoto != undefined) this.profilephoto.setattachmentlist(this.mstapplicantmaster_Form.get('profilephoto').value);
    if (this.mstapplicantmaster_Form.get('attachment').value != null && this.mstapplicantmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicantmaster_Form.get('attachment').value);
    setTimeout(() => {
      if (this.f.country.value && this.f.country.value != "" && this.f.country.value != null) this.mstapplicantmaster_service.getList_state(this.f.country.value).then(res => {
        this.state_List = res as DropDownValues[];
        this.mstapplicantmaster_Form.patchValue({
          state: this.formData.state,
          statedesc: this.formData.statedesc,
        })
      }).catch((err) => { });
    });
    setTimeout(() => {
      if (this.f.state.value && this.f.state.value != "" && this.f.state.value != null) this.mstapplicantmaster_service.getList_city(this.f.state.value).then(res => {
        this.city_List = res as DropDownValues[];
        this.mstapplicantmaster_Form.patchValue({
          city: this.formData.city,
          citydesc: this.formData.citydesc,
        })
      }).catch((err) => { });
    });
  }

  validate() {
    let ret = true;
    return ret;
  }

  getHtml(html: any) {
    let ret = "";
    ret = html;
    if (this.mstapplicantmaster_Form.controls['briefintroduction']?.value != null) ret = ret.replace(new RegExp('##briefintroduction##', 'g'), this.mstapplicantmaster_Form.controls['briefintroduction']?.value?.substring(0, 250));
    if (this.mstapplicantmaster_Form.controls['statuscrimp']?.value != null) ret = ret.replace(new RegExp('##statuscrimp##', 'g'), this.mstapplicantmaster_Form.controls['statuscrimp']?.value?.substring(0, 250));
    for (let key in this.mstapplicantmaster_Form.controls) {
      let val = this.mstapplicantmaster_Form.controls[key].value;
      if (val == 'null' || val == null || val == undefined) val = '';
      if (this.mstapplicantmaster_Form.controls[key] != null) {
        if (key == "profilephoto") {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
        }
        else if (false) {
          if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='Stars' style='--rating:" + this.formData[key] + "></div>");
        }
        else if (key == "profilecompletion") {
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

  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.mstapplicantmaster_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstapplicantmaster_Form.getRawValue();
    obj.dob = new Date(this.mstapplicantmaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.mstapplicantmaster_Form.get('dob').value) + '  UTC' : null);
    if (this.profilephoto.getAttachmentList() != null) obj.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    await this.sharedService.upload(this.profilephoto.getAllFiles());
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



  async onSubmitData(bclear: any) {
    this.isSubmitted = true;
    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);

    if (!this.mstapplicantmaster_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    if (!this.validate()) {
      return;
    }
    this.formData = this.mstapplicantmaster_Form.getRawValue();
    if (this.dynamicconfig.data != null) {
      for (let key in this.dynamicconfig.data) {
        if (key != 'visiblelist' && key != 'hidelist') {
          if (this.mstapplicantmaster_Form.controls[key] != null) {
            this.formData[key] = this.mstapplicantmaster_Form.controls[key].value;
          }
        }
      }
    }
    this.formData.dob = new Date(this.mstapplicantmaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.mstapplicantmaster_Form.get('dob').value) + '  UTC' : null);
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    if (this.profilephoto.getAttachmentList() != null) this.formData.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
    this.spinner.show();
    this.mstapplicantmaster_service.saveOrUpdate_mstapplicantmastermains(this.formData).subscribe(
      async res => {
        await this.sharedService.upload(this.profilephoto.getAllFiles());
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.spinner.hide();
        this.toastr.addSingle("success", "", "Successfully saved");
        localStorage.removeItem("choosefileforprofile")
        this.objvalues.push((res as any).mstapplicantmaster);
        this.showOpenfile = true;
        if (!bclear) this.showview = true;
        if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          this.dialogRef.close(this.objvalues);
          return;
        }
        else {
        }
        if (bclear) {
          this.resetForm();
        }
        else {
          if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.objvalues.push((res as any).mstapplicantmaster);
            this.dialogRef.close(this.objvalues);
          }
          else {
            this.FillData(res);
          }
        }
        this.mstapplicantmaster_Form.markAsUntouched();
        this.mstapplicantmaster_Form.markAsPristine();
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



