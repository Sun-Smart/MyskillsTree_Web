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
  maxDate = undefined;
  data: any;
  p_menuid: any;
  p_currenturl: any;
  loginUser: any;
  sessionData: any;
  sourceKey: any;
  SESSIONUSERID: any;//current user

  applicanttype_List: DropDownValues[];
  gender_List: DropDownValues[];
  country_List: DropDownValues[];
  state_List: DropDownValues[];
  city_List: DropDownValues[];
  objvalues: any = [];

  country_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  state_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  city_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  @ViewChild('profilephoto', { static: false }) profilephoto: AttachmentComponent;
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];



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
    let app_id = localStorage.getItem('applicantid');
    
    this.mstapplicantmaster_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: app_id,
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

  ngOnInit() {

    this.sessionData = this.sessionService.getSession();
    if (this.sessionData != null) {
      this.SESSIONUSERID = this.sessionData.userid;
    }

    // getdefault Data
    this.mstapplicantmaster_service.getDefaultData().then(res => {
      this.applicanttype_List = res.list_applicanttype.value;
      this.gender_List = res.list_gender.value;
      this.country_List = res.list_country.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });
  };

// Type
  applicanttype_onChange(evt: any) {
    let e = this.f.applicanttype.value as any;
    this.mstapplicantmaster_Form.patchValue({ applicanttypedesc: evt.options[evt.options.selectedIndex].text });
  };

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
    if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    if (this.profilephoto.getAttachmentList() != null) this.formData.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
    this.fileAttachmentList = this.fileattachment.getAllFiles();
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
