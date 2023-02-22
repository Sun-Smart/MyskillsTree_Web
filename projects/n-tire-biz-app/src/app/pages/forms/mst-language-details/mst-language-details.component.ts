import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mstapplicantlanguagedetail } from '../../../model/mstapplicantlanguagedetail.model';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { mstapplicantlanguagedetailService } from '../../../service/mstapplicantlanguagedetail.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';

@Component({
  selector: 'app-mst-language-details',
  templateUrl: './mst-language-details.component.html',
  styleUrls: ['./mst-language-details.component.scss']
})
export class MstLanguageDetailsComponent implements OnInit {
  loginUser: any;
  mstapplicantlanguagedetail_Form: FormGroup;
  formData: mstapplicantlanguagedetail;
  applicantid_List: DropDownValues[];
  language_List: DropDownValues[];
  isSubmitted: boolean = false;
  objvalues: any = [];
  applicantid: any;
  
  constructor(private route: Router, private mstapplicantlanguagedetail_service: mstapplicantlanguagedetailService,
    private sessionService: SessionService, private toastr: ToastService,
    private fb: FormBuilder, private spinner: NgxSpinnerService) {
    this.loginUser = localStorage.getItem('username');
    this.applicantid = localStorage.getItem('applicantid');
  }

  ngOnInit() {
    this.mstapplicantlanguagedetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
      applicantiddesc: [null],
      languageid: [null],
      language: [null, Validators.compose([Validators.required])],
      languagedesc: [null],
      readproficiency: [null],
      writeproficiency: [null],
      speakproficiency: [null],
      overallrating: [null],
      remarks: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
    this.mstapplicantlanguagedetail_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.language_List = res.list_language.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });
  }
  get f() { return this.mstapplicantlanguagedetail_Form.controls; }
  language_onChange(evt: any) {
    let e = this.f.language.value as any;
    this.mstapplicantlanguagedetail_Form.patchValue({ languagedesc: evt.options[evt.options.selectedIndex].text });
  }
  async onSubmitData(bclear: any) {
    debugger
    this.isSubmitted = true;

    if (!this.mstapplicantlanguagedetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantlanguagedetail_Form.getRawValue();
    this.formData.applicantid = this.applicantid;
    console.log(this.formData);
    this.spinner.show();;
    this.mstapplicantlanguagedetail_service.saveOrUpdate_mstapplicantlanguagedetails(this.formData).subscribe((res: any) => {
      debugger;
      console.log(res);

      this.spinner.hide();

      this.toastr.addSingle("success", "", "Successfully saved");
      this.route.navigate(['/home/newsocial'])
      this.sessionService.setItem("attachedsaved", "true")
      this.objvalues.push((res as any).mstapplicantlanguagedetail);
      this.ngOnInit();
      this.mstapplicantlanguagedetail_Form.reset();
      if (bclear) {
        this.resetForm();
      }
      this.mstapplicantlanguagedetail_Form.markAsUntouched();
      this.mstapplicantlanguagedetail_Form.markAsPristine();
    });
  }
  resetForm() {
    if (this.mstapplicantlanguagedetail_Form != null)
      this.mstapplicantlanguagedetail_Form.reset();
    this.mstapplicantlanguagedetail_Form.patchValue({
    });
  }
  addsocialmedia() {
    this.route.navigate(['/home/newsocial'])
  }
  addMoresocialmedia(){
    debugger
    this.isSubmitted = true;

    if (!this.mstapplicantlanguagedetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantlanguagedetail_Form.getRawValue();
    this.formData.applicantid = this.applicantid;
    console.log(this.formData);
    this.spinner.show();;
    this.mstapplicantlanguagedetail_service.saveOrUpdate_mstapplicantlanguagedetails(this.formData).subscribe((res: any) => {
      debugger;
      console.log(res);

      this.spinner.hide();

      this.toastr.addSingle("success", "", "Successfully saved");
      this.sessionService.setItem("attachedsaved", "true")
      this.objvalues.push((res as any).mstapplicantlanguagedetail);
      this.ngOnInit();
      this.mstapplicantlanguagedetail_Form.reset();
      this.mstapplicantlanguagedetail_Form.markAsUntouched();
      this.mstapplicantlanguagedetail_Form.markAsPristine();
    });
  }
  back() {
    this.route.navigate(['/home/newresume'])
  }
}
