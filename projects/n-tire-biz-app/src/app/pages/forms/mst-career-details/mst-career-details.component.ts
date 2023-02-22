import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { mstapplicantcareerdetailService } from '../../../service/mstapplicantcareerdetail.service';
import { mstapplicantcareerdetail } from '../../../model/mstapplicantcareerdetail.model';
import { DatePipe } from '@angular/common';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';

import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { mstapplicantcareergridComponent } from '../mstapplicantcareerdetail/mstapplicantcareergrid.component';


@Component({
  selector: 'app-mst-career-details',
  templateUrl: './mst-career-details.component.html',
  styleUrls: ['./mst-career-details.component.scss']
})
export class MstCareerDetailsComponent implements OnInit {

  mstapplicantcareerdetail_Form: FormGroup;
  formData: mstapplicantcareergridComponent;

  loginUser: any;
  pkcol: any;
  data: any;
  formid: any;
  myDate: any;
  applicantid_List: DropDownValues[];
  category_List: DropDownValues[];
  skills_results: DropDownValues[];
  skills_List: any[];
  objvalues: any = [];
  pkList: any;//stores values - used in search, prev, next
  applicantid: any;
  maxDate = undefined;


  showDateError: boolean;
  isSubmitted: boolean = false;

  constructor(private route: Router, private fb: FormBuilder,
    private spinner: NgxSpinnerService, private datePipe: DatePipe,
    public dynamicconfig: DynamicDialogConfig, private config: NgbDatepickerConfig,
    private mstapplicantcareerdetail_service: mstapplicantcareerdetailService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private toastr: ToastService, private sessionService: SessionService,) {

    var date = new Date()
    this.myDate = this.datePipe.transform(date);
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }

    this.pkcol = this.data.maindatapkcol;
    this.applicantid = localStorage.getItem('applicantid');

    this.loginUser = localStorage.getItem('username');


    this.mstapplicantcareerdetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
      // applicantid: this.sessionService.getItem('applicantid'),
      applicantiddesc: [null],
      careerid: [null],
      category: [null],
      categorydesc: [null],
      companyname: [null, Validators.compose([Validators.required])],
      designation: [null, Validators.compose([Validators.required])],
      keyproject: [null],
      fromdate: [null, Validators.compose([Validators.required])],
      todate: [null],
      currentlyworking: [null],
      skills: [null],
      skillsdesc: [null],
      requestid: [null],
      remarks: [null],
      status: [null],
      statusdesc: [null],
      attachment: [null],
    });
  };

  get f() { return this.mstapplicantcareerdetail_Form.controls; };

  ngOnInit() {

    // this.pkcol = this.data.maindatapkcol;
    // this.applicantid = this.data.applicantid;


    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    // get_default data
    this.mstapplicantcareerdetail_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.category_List = res.list_category.value;
      this.skills_List = res.list_skills.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });
  };


  category_onChange(evt: any) {
    let e = this.f.category.value as any;
    this.mstapplicantcareerdetail_Form.patchValue({ categorydesc: evt.options[evt.options.selectedIndex].text });
  };

  search_skills(event) {
    debugger;
    this.skills_results = this.skills_List.filter(v => v.label.toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
  };

  getSkills(skills_List) {
    debugger;
    let skills: any[] = [];

    for (let i = 0; i < skills_List.length; i++) {
      skills.push((skills_List[i] as any).value.toString());
    }
    return skills;
  }

  async onSubmitData() {

    this.isSubmitted = true;

    if (!this.mstapplicantcareerdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantcareerdetail_Form.getRawValue();

    this.formData.fromdate = new Date(this.mstapplicantcareerdetail_Form.get('fromdate').value ? this.ngbDateParserFormatter.format(this.mstapplicantcareerdetail_Form.get('fromdate').value) + '  UTC' : null);

    if (this.mstapplicantcareerdetail_Form.value.currentlyworking == true) {
      this.formData.todate = new Date()
      console.log(this.formData.todate);
    } else {
      this.formData.todate = new Date(this.mstapplicantcareerdetail_Form.get('todate').value ? this.ngbDateParserFormatter.format(this.mstapplicantcareerdetail_Form.get('todate').value) + '  UTC' : null);
    }
    this.formData.skills = null;
    this.formData.applicantid = this.applicantid;
    if (this.formData.fromdate > this.formData.todate) {
      this.showDateError = true;
      return;
    } else {

      if (this.mstapplicantcareerdetail_Form.get('skills').value != null) this.formData.skillsstring = JSON.stringify(this.getSkills(this.mstapplicantcareerdetail_Form.get('skills').value));
      this.spinner.show();

      this.mstapplicantcareerdetail_service.saveOrUpdate_mstapplicantcareerdetails(this.formData).subscribe(
        (res: any) => {


          this.spinner.hide();
          this.toastr.addSingle("success", "", "Successfully saved");
          this.route.navigate(['/home/newproject']);
          this.showDateError = false;
          this.sessionService.setItem("attachedsaved", "true")
          this.objvalues.push((res as any).mstapplicantcareerdetail);


          this.mstapplicantcareerdetail_Form.reset();
        },
        err => {
          debugger;
          this.spinner.hide();
          this.toastr.addSingle("error", "", err.error);
          console.log(err);
        })
    };
  }
  AddmoreSubmitData() {
    this.isSubmitted = true;

    if (!this.mstapplicantcareerdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantcareerdetail_Form.getRawValue();
    this.formData.applicantid = this.applicantid;
    this.formData.fromdate = new Date(this.mstapplicantcareerdetail_Form.get('fromdate').value ? this.ngbDateParserFormatter.format(this.mstapplicantcareerdetail_Form.get('fromdate').value) + '  UTC' : null);

    if (this.mstapplicantcareerdetail_Form.value.currentlyworking == true) {
      this.formData.todate = new Date()
      console.log(this.formData.todate);
    } else {
      this.formData.todate = new Date(this.mstapplicantcareerdetail_Form.get('todate').value ? this.ngbDateParserFormatter.format(this.mstapplicantcareerdetail_Form.get('todate').value) + '  UTC' : null);
    }
    this.formData.skills = null;

    if (this.formData.fromdate > this.formData.todate) {
      this.showDateError = true;
      return;
    } else {
      this.formData.applicantid = this.applicantid;

      if (this.mstapplicantcareerdetail_Form.get('skills').value != null) this.formData.skillsstring = JSON.stringify(this.getSkills(this.mstapplicantcareerdetail_Form.get('skills').value));
      this.spinner.show();

      this.mstapplicantcareerdetail_service.saveOrUpdate_mstapplicantcareerdetails(this.formData).subscribe(
        (res: any) => {


          this.spinner.hide();
          this.toastr.addSingle("success", "", "Successfully saved");
          this.showDateError = false;
          this.sessionService.setItem("attachedsaved", "true")
          this.objvalues.push((res as any).mstapplicantcareerdetail);


          this.mstapplicantcareerdetail_Form.reset();
        })
    };
  }
  addproject() {
    this.route.navigate(['/home/newproject']);
  }
  back() {
    this.route.navigate(['/home/neweducation'])
  }
}
