import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { DatePipe } from '@angular/common';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { mstapplicantachievementdetailService } from '../../../service/mstapplicantachievementdetail.service';
import { mstapplicantachievementdetail } from '../../../model/mstapplicantachievementdetail.model';



@Component({
  selector: 'app-mst-certifications',
  templateUrl: './mst-certifications.component.html',
  styleUrls: ['./mst-certifications.component.scss']
})
export class MstCertificationsComponent implements OnInit {
  mstapplicantachievementdetail_Form: FormGroup;
  formData: mstapplicantachievementdetail;
  loginUser: any;
  myDate: any;
  applicantid: any;
  data: any;
  isSubmitted: boolean = false;
  showview: boolean = false;
  showDateError: boolean;
  applicantid_List: DropDownValues[];
  masterdataid_List: DropDownValues[];
  referenceacceptance_List: DropDownValues[];
  skill_list: DropDownValues[];
  objvalues: any = [];

  constructor(private route: Router, private fb: FormBuilder,
    private datePipe: DatePipe, private toastr: ToastService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef, private spinner: NgxSpinnerService,
    public dynamicconfig: DynamicDialogConfig,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private mstapplicantachievementdetail_service: mstapplicantachievementdetailService,) {
    this.loginUser = localStorage.getItem('username');

    this.applicantid = localStorage.getItem('applicantid');

    this.mstapplicantachievementdetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
      applicantiddesc: [null],
      achievementid: [null],
      masterdataid: [null, Validators.compose([Validators.required])],
      masterdataiddesc: [null],
      achievementdetails: [null, Validators.compose([Validators.required])],
      fromyear: [null, Validators.compose([Validators.required])],
      toyear: [null],
      selfrating: [null],
      remarks: [null],
      requestid: [null],
      referenceacceptance: [null],
      referenceacceptancedesc: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
      skill: [null, Validators.compose([Validators.required])],
      skilldesc: [null],
    });

    var date = new Date()
    this.myDate = this.datePipe.transform(date);
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }
  }

  ngOnInit() {

    this.mstapplicantachievementdetail_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.masterdataid_List = res.list_masterdataid.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
      this.skill_list = res.list_skills.value;
    }).catch((err) => { this.spinner.hide(); });
  };

  masterdataid_onChange(evt: any) {
    let e = evt.value;
    this.mstapplicantachievementdetail_Form.patchValue({ masterdataiddesc: evt.options[evt.options.selectedIndex].text });
  };


  onSubmitData() {
    this.isSubmitted = true;

    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);

    if (!this.mstapplicantachievementdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    };
    this.formData = this.mstapplicantachievementdetail_Form.getRawValue();

    this.formData.fromyear = new Date(this.mstapplicantachievementdetail_Form.get('fromyear').value ? this.ngbDateParserFormatter.format(this.mstapplicantachievementdetail_Form.get('fromyear').value) + '  UTC' : null);

    if (this.mstapplicantachievementdetail_Form.value.currentlyworking == true) {
      this.formData.toyear = new Date()
    } else {
      this.formData.toyear = new Date(this.mstapplicantachievementdetail_Form.get('toyear').value ? this.ngbDateParserFormatter.format(this.mstapplicantachievementdetail_Form.get('toyear').value) + '  UTC' : null);
    }
    this.formData.skills = null;
    this.formData.applicantid = this.applicantid;
    if (this.formData.fromyear > this.formData.toyear) {
      this.showDateError = true;
      return;
    } else {
      this.spinner.show();
      this.mstapplicantachievementdetail_service.saveOrUpdate_mstapplicantachievementdetails(this.formData).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.toastr.addSingle("success", "", "Successfully saved");
          this.route.navigate(['/home/newskilldetails'])
          this.sessionService.setItem("attachedsaved", "true")
          this.objvalues.push((res as any).mstapplicantachievementdetail);
          this.mstapplicantachievementdetail_Form.reset();
        })
    }
  };

  AddmoreSubmitData() {
    this.isSubmitted = true;

    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);

    if (!this.mstapplicantachievementdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    };
    this.formData = this.mstapplicantachievementdetail_Form.getRawValue();

    this.formData.fromyear = new Date(this.mstapplicantachievementdetail_Form.get('fromyear').value ? this.ngbDateParserFormatter.format(this.mstapplicantachievementdetail_Form.get('fromyear').value) + '  UTC' : null);

    if (this.mstapplicantachievementdetail_Form.value.currentlyworking == true) {
      this.formData.toyear = new Date()
    } else {
      this.formData.toyear = new Date(this.mstapplicantachievementdetail_Form.get('toyear').value ? this.ngbDateParserFormatter.format(this.mstapplicantachievementdetail_Form.get('toyear').value) + '  UTC' : null);
    }
    this.formData.skills = null;
    this.formData.applicantid = this.applicantid;
    if (this.formData.fromyear > this.formData.toyear) {
      this.showDateError = true;
      return;
    } else {
      this.spinner.show();
      this.mstapplicantachievementdetail_service.saveOrUpdate_mstapplicantachievementdetails(this.formData).subscribe(
        (res: any) => {
          this.spinner.hide();
          this.toastr.addSingle("success", "", "Successfully saved");
          this.sessionService.setItem("attachedsaved", "true")
          this.objvalues.push((res as any).mstapplicantachievementdetail);
          this.mstapplicantachievementdetail_Form.reset();
        })


    }
  }

  addlocation() {
    this.route.navigate(['/home/newlocation'])
  }
  back() {
    this.route.navigate(['/home/newproject'])
  }
}
