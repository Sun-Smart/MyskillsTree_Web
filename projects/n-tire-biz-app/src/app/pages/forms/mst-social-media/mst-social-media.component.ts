import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mstapplicantsocialmediadetail } from '../../../model/mstapplicantsocialmediadetail.model';
import { mstapplicantsocialmediadetailService } from '../../../service/mstapplicantsocialmediadetail.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';

@Component({
  selector: 'app-mst-social-media',
  templateUrl: './mst-social-media.component.html',
  styleUrls: ['./mst-social-media.component.scss']
})
export class MstSocialMediaComponent implements OnInit {
  loginUser: any;
  mstapplicantsocialmediadetail_Form: FormGroup;
  formData: mstapplicantsocialmediadetail;
  socialmedianame_List: DropDownValues[];
  applicantid_List: DropDownValues[];
  isSubmitted: boolean = false;
  objvalues: any = [];
  applicantid: any;
  constructor(private route: Router, private toastr: ToastService,
    private fb: FormBuilder, private spinner: NgxSpinnerService,
    private mstapplicantsocialmediadetail_service: mstapplicantsocialmediadetailService,) {
    this.loginUser = localStorage.getItem('username');
    this.applicantid = localStorage.getItem('applicantid');
  }

  ngOnInit() {

    this.mstapplicantsocialmediadetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
      applicantiddesc: [null],
      socialrefid: [null],
      socialmedianame: [null, Validators.compose([Validators.required])],
      socialmedianamedesc: [null],
      handlename: [null,Validators.compose([Validators.required])],
      url: [null],
      remarks: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
    this.mstapplicantsocialmediadetail_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.socialmedianame_List = res.list_socialmedianame.value;
    }).catch((err) => { this.spinner.hide();});
  }
  socialmedianame_onChange(evt: any) {
    let e = evt.value;
    this.mstapplicantsocialmediadetail_Form.patchValue({ socialmedianamedesc: evt.options[evt.options.selectedIndex].text });
  };

  async onSubmitData(bclear: any) {
    this.isSubmitted = true;
    let strError = "";
    if (!this.mstapplicantsocialmediadetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    };

    this.formData = this.mstapplicantsocialmediadetail_Form.getRawValue();

    this.formData.applicantid = this.applicantid;
    this.spinner.show();

    this.mstapplicantsocialmediadetail_service.saveOrUpdate_mstapplicantsocialmediadetails(this.formData).subscribe(
      async res => {
        this.spinner.hide();
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).mstapplicantsocialmediadetail);
        this.mstapplicantsocialmediadetail_Form.reset();
        this.ngOnInit();
        if (bclear) {
          this.resetForm();
        }
        this.mstapplicantsocialmediadetail_Form.markAsUntouched();
        this.mstapplicantsocialmediadetail_Form.markAsPristine();

        let pkcol = localStorage.getItem('pkcol');
        this.route.navigate(['/home/bodashboardviewer/' + pkcol]);
      },
      err => {
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
      });
  };
  resetForm() {
    if (this.mstapplicantsocialmediadetail_Form != null)
      this.mstapplicantsocialmediadetail_Form.reset();
    this.mstapplicantsocialmediadetail_Form.patchValue({
    });
  }

  AddMoreSocial(){
    this.isSubmitted = true;
    if (!this.mstapplicantsocialmediadetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    };

    this.formData = this.mstapplicantsocialmediadetail_Form.getRawValue();
    this.formData.applicantid = this.applicantid;
    this.spinner.show();

    this.mstapplicantsocialmediadetail_service.saveOrUpdate_mstapplicantsocialmediadetails(this.formData).subscribe(
      async res => {

        this.spinner.hide();
        this.toastr.addSingle("success", "", "Successfully saved");
        this.objvalues.push((res as any).mstapplicantsocialmediadetail);
        this.mstapplicantsocialmediadetail_Form.reset();
        this.ngOnInit();
        this.mstapplicantsocialmediadetail_Form.markAsUntouched();
        this.mstapplicantsocialmediadetail_Form.markAsPristine();
      },
      err => {
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
      });
  }
  back() {
    this.route.navigate(['/home/newlanguage'])
  }
  skip(){
    let pkcol = localStorage.getItem('pkcol');
    this.route.navigate(['/home/bodashboardviewer/' + pkcol]);
  }
}
