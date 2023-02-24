import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicDialog';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { mstapplicantmaster } from './../../../model/mstapplicantmaster.model';
import { NgbDatepickerConfig, } from '@ng-bootstrap/ng-bootstrap';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';



@Component({
  selector: 'app-mst-start-pages',
  templateUrl: './mst-start-pages.component.html',
  styleUrls: ['./mst-start-pages.component.scss']
})
export class MstStartPagesComponent implements OnInit {

  mstapplicantmaster_Form: FormGroup;

  formData: mstapplicantmaster;
  bmyrecord: boolean = false;
  showview: boolean = false;
  profilecompletionvisible: boolean = false;
  maxDate = undefined;
  hidelist: any = [];
  data: any;
  maindata: any;
  p_menuid: any;
  formid: any;
  pkcol: any;
  p_currenturl: any;
  showFormType: any;
  loginUser: any;
  sessionData: any;
  sourceKey: any;
  SESSIONUSERID: any;//current user
  theme: string = "";//current theme
  viewHtml: any = '';//stores html view of the screen

  ShowTableslist: string[] = [];
  mstapplicantmaster_menuactions: any = [];
  applicanttype_List: DropDownValues[];
  gender_List: DropDownValues[];
  country_List: DropDownValues[];
  state_List: DropDownValues[];
  city_List: DropDownValues[];
  objvalues: any = [];

  country_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  state_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  city_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  pkList: any;//stores values - used in search, prev, next
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk


  readonly AttachmentURL = AppConstants.AttachmentURL;
  @ViewChild('profilephoto', { static: false }) profilephoto: AttachmentComponent;
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  applicantid: any;
  usernumber: any;
  usermail: any;
  sub: any;
  showLabel_data:boolean = false;
  emailid: any;



  constructor(private route: Router, private fb: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private config: NgbDatepickerConfig,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private translate: TranslateService,
    private mstapplicantmaster_service: mstapplicantmasterService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private themeService: ThemeService,
    private sanitizer: DomSanitizer,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {

    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    this.translate = this.sharedService.translate;
    this.data = dynamicconfig;
    this.p_menuid = sharedService.menuid;
    this.p_currenturl = sharedService.currenturl;

    this.loginUser = localStorage.getItem('username');
    this.applicantid = localStorage.getItem('applicantid');
    this.emailid = localStorage.getItem('emailid');
    this.usernumber = localStorage.getItem('mobilenumber');
    
    this.mstapplicantmaster_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
      firstname: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      lastname: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
      emailid:this.emailid,
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
    // mstapplicantmasterid=212;
    mstapplicantmasterid = this.data.applicantid;
    this.pkcol = this.sessionService.getItem('usersource');
    // this.pkcol="MjEyOzIwMjItMDMtMTcgMTc6MjE6MjkuNDU3OTE3KzA1OjMw";
    this.formid = mstapplicantmasterid;
    //alert(mstapplicantmasterid);

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
    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.mstapplicantmaster_service.get_mstapplicantmasters_List().then(res => {
      this.pkList = res as mstapplicantmaster[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched
    this.mstapplicantmaster_Form.markAsUntouched();
    this.mstapplicantmaster_Form.markAsPristine();
  }

// Type
  applicanttype_onChange(evt: any) {
    let e = this.f.applicanttype.value as any;
    this.mstapplicantmaster_Form.patchValue({ applicanttypedesc: evt.options[evt.options.selectedIndex].text });
  };

  resetForm() {
    if (this.mstapplicantmaster_Form != null)
      this.mstapplicantmaster_Form.reset();
    this.mstapplicantmaster_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    this.profilecompletionvisible = false;
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
    }).catch((err) => { console.log(err); });
  };

  FillData(res: any) {
    debugger
    this.formData = res.mstapplicantmaster;
    this.formid = res.mstapplicantmaster.applicantid;
    this.pkcol = res.mstapplicantmaster.pkcol;
    this.bmyrecord = false;
    if ((res.mstapplicantmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    console.log(res);
    //console.log(res.order);
    console.log(res.mstapplicantmaster.emailid);

    this.mstapplicantmaster_Form.patchValue({
      applicantid: res.mstapplicantmaster.applicantid,
      firstname: res.mstapplicantmaster.firstname,
      lastname: res.mstapplicantmaster.lastname,
      emailid: res.mstapplicantmaster.emailid ?  res.mstapplicantmaster.emailid : this.emailid,
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
      // profilephoto:res.res.mstapplicantmaster.profilephoto,
      profilephoto: JSON.parse(res.mstapplicantmaster.profilephoto),
      briefintroduction: res.mstapplicantmaster.briefintroduction,
      statuscrimp: res.mstapplicantmaster.statuscrimp,
      availableforjob: res.mstapplicantmaster.availableforjob,
      profilecompletion: res.mstapplicantmaster.profilecompletion,
      applicantreference: res.mstapplicantmaster.applicantreference,
      attachment: "[]",
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
      }).catch((err) => { console.log(err); });
    });
    setTimeout(() => {
      if (this.f.state.value && this.f.state.value != "" && this.f.state.value != null) this.mstapplicantmaster_service.getList_city(this.f.state.value).then(res => {
        this.city_List = res as DropDownValues[];
        this.mstapplicantmaster_Form.patchValue({
          city: this.formData.city,
          citydesc: this.formData.citydesc,
        })
      }).catch((err) => { console.log(err); });
    });
    //Child Tables if any
    setTimeout(() => {
    });
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

  getprofilephoto() {
    debugger

    if (this.profilephoto.getAttachmentList().length > 0) {
      debugger
      let file = this.profilephoto.getAttachmentList()[0];
      this.sharedService.geturl(file.filekey, file.type);
    }
  }

  edit_mstapplicantmasters() {
    this.showview = false;
    setTimeout(() => {
      if (this.profilephoto != null && this.profilephoto != undefined) this.profilephoto.setattachmentlist(this.mstapplicantmaster_Form.get('profilephoto').value);
    });
    return false;
  }
  // Gender

  gender_onChange(evt: any) {
    let e = this.f.gender.value as any;
    this.mstapplicantmaster_Form.patchValue({ genderdesc: evt.options[evt.options.selectedIndex].text });
  }

  onSelected_country(countryDetail: any) {
    if (countryDetail.value && countryDetail) {
      this.mstapplicantmaster_Form.patchValue({
        country: countryDetail.value,
        countrydesc: countryDetail.label,

      });
      this.mstapplicantmaster_service.getList_state(countryDetail.value).then(res => {
        this.state_List = res as DropDownValues[]
      }).catch((err) => { this.spinner.hide(); console.log(err); });

    }
  };

  onSelected_state(stateDetail: any) {
    if (stateDetail.value && stateDetail) {
      this.mstapplicantmaster_Form.patchValue({
        state: stateDetail.value,
        statedesc: stateDetail.label,

      });
      this.mstapplicantmaster_service.getList_city(stateDetail.value).then(res => {
        this.city_List = res as DropDownValues[]
      }).catch((err) => { this.spinner.hide(); console.log(err); });

    }
  };

  onSelected_city(cityDetail: any) {
    if (cityDetail.value && cityDetail) {
      this.mstapplicantmaster_Form.patchValue({
        city: cityDetail.value,
        citydesc: cityDetail.label,

      });
    }
  };


  onSubmit() {
    debugger;
    console.log("this.mstapplicantmaster_Form", this.mstapplicantmaster_Form);

    if (!this.mstapplicantmaster_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    };

    this.formData = this.mstapplicantmaster_Form.getRawValue();
    this.formData.dob = new Date(this.mstapplicantmaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.mstapplicantmaster_Form.get('dob').value) + '  UTC' : null);
    // if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    if (this.profilephoto.getAttachmentList() != null) this.formData.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
    // this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log("this.formData", this.formData);
    this.spinner.show();
    this.mstapplicantmaster_service.saveOrUpdate_mstapplicantmastermains(this.formData).subscribe(
      async (res:any) => {

      console.log("response",res);
      await this.sharedService.upload(this.profilephoto.getAllFiles());
      await this.sharedService.upload(this.fileAttachmentList);
      this.attachmentlist = [];
      if (this.fileattachment) this.fileattachment.clear();
      this.spinner.hide();
      this.toastr.addSingle("success", "", "Successfully saved");
      localStorage.removeItem("choosefileforprofile")
      this.objvalues.push((res as any).mstapplicantmaster);
      this.route.navigate(['/home/newskilldetails']);
    });
  };
addskill(){
    this.route.navigate(['/home/newskilldetails']);
}
}
