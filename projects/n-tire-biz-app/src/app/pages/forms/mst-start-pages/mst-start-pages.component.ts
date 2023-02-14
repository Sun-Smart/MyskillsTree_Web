import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { DialogService, DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicDialog';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NgxSpinnerService } from 'ngx-spinner';
import { mstapplicantmaster } from './../../../model/mstapplicantmaster.model';



@Component({
  selector: 'app-mst-start-pages',
  templateUrl: './mst-start-pages.component.html',
  styleUrls: ['./mst-start-pages.component.scss']
})
export class MstStartPagesComponent implements OnInit {

  mstapplicantmaster_Form: FormGroup;

  formData: mstapplicantmaster;
  maxDate = undefined;
  data: any;
  p_menuid: any;
  p_currenturl: any;
  loginUser: any;

  constructor(private route: Router, private fb: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter,
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

  ngOnInit() {

  };

  onSubmit() {
    console.log("this.mstapplicantmaster_Form", this.mstapplicantmaster_Form);

    // if (!this.mstapplicantmaster_Form.valid) {
    //   this.toastr.addSingle("error", "", "Enter the required fields");
    //   return;
    // };

    this.formData = this.mstapplicantmaster_Form.getRawValue();
    this.formData.dob = new Date(this.mstapplicantmaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.mstapplicantmaster_Form.get('dob').value) + '  UTC' : null);
    console.log("this.formData", this.formData);
    this.spinner.show();
    this.mstapplicantmaster_service.saveOrUpdate_mstapplicantmastermains(this.formData).subscribe((res:any) => {
      console.log("response",res);
      
    });
  };

  addSkills() {
    this.route.navigate(['/home/newskilldetails']);
  }
}
