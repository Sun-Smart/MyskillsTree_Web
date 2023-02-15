import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { mstapplicanteducationdetailService } from '../../../service/mstapplicanteducationdetail.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicanteducationdetail } from '../../../model/mstapplicanteducationdetail.model';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';

@Component({
  selector: 'app-mst-education-details',
  templateUrl: './mst-education-details.component.html',
  styleUrls: ['./mst-education-details.component.scss']
})
export class MstEducationDetailsComponent implements OnInit {
  loginUser: any;
  educationcategory_List: DropDownValues[];
  applicantid_List: DropDownValues[];
  referenceacceptance_List: DropDownValues[];
  skills_results: DropDownValues[];
  skills_List: any[] = [];
  educationsubcategory_List: DropDownValues[];
  mstapplicanteducationdetail_Form: FormGroup;
  formData: mstapplicanteducationdetail;
  pkcol: any;
  data: any;
  applicantid: any;
  isSubmitted: boolean =false;
  formValue: any;
  show_YearError: boolean =false;
  show_percentageError: boolean =false;
  showDateError: boolean =false;
  showPercentError: boolean=false;
  objvalues: any = [];
  constructor(private route: Router, private spinner: NgxSpinnerService, private fb: FormBuilder,private sharedService: SharedService,
    private mstapplicanteducationdetail_service: mstapplicanteducationdetailService,private sessionService: SessionService,
    private toastr: ToastService,
  ) { this.loginUser = localStorage.getItem('username'); }
  get f() { return this.mstapplicanteducationdetail_Form.controls; }
  ngOnInit() {
    // this.pkcol = this.data.maindatapkcol;
    // this.applicantid = this.data.applicantid;
    this.mstapplicanteducationdetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      // applicantid: localStorage.getItem('applicantid'),
      applicantid: this.sessionService.getItem('applicantid'),
      applicantiddesc: [null],
      educationid: [null],
      educationcategory: [null, Validators.required],
      educationcategorydesc: [null, Validators.required],
      educationsubcategory: [null, Validators.required],
      educationsubcategorydesc: [null, Validators.required],
      coursename: [null, Validators.required],
      institutionname: [null, Validators.required],
      fromyear: [null, Validators.required],
      toyear: [null, Validators.required],
      percentage: [null, Validators.required],
      requestid: [null],
      referenceacceptance: [null],
      referenceacceptancedesc: [null],
      remarks: [null],
      attachment: [null],
      status: [null],
      skills: [null],
      skilldesc: [null],
      statusdesc: [null],
    });
    this.mstapplicanteducationdetail_service.getDefaultData().then((res: any) => {
      this.applicantid_List = res.list_applicantid.value;
      this.educationcategory_List = res.list_educationcategory.value;
      this.referenceacceptance_List = res.list_referenceacceptance.value;
      this.skills_List = res.list_skills.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });
  };
  search_skills(event) {

    this.skills_results = this.skills_List.filter(v => v.label.toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
  }

  getSkills(skills_List: any) {

    let skills: any[] = [];

    for (let i = 0; i < skills_List.length; i++) {
      skills.push((skills_List[i] as any).value.toString());
    }
    return skills;
  }
  getSkillsDescription() {

    let skillsdescription: any[] = [];
    for (let i = 0; i < this.skills_List.length; i++) {
      for (let j = 0; j < this.mstapplicanteducationdetail_Form.get('skills').value.length; j++) {
        if ((this.skills_List[i] as any).value.toString() == this.mstapplicanteducationdetail_Form.get('skills').value[j].toString()) {
          skillsdescription.push((this.skills_List[i] as any));
        }
      }
    }
    this.mstapplicanteducationdetail_Form.patchValue({ skills: skillsdescription });
  }

  skill_onchange(evt: any) {

    let e = evt.value;
    this.mstapplicanteducationdetail_Form.patchValue({ skilldesc: evt.options[evt.options.selectedIndex].text });
  }
  educationcategory_onChange(evt: any) {
    let e = evt.value;
    this.mstapplicanteducationdetail_Form.patchValue({ educationcategorydesc: evt.options[evt.options.selectedIndex].text });
    setTimeout(() => {
      if (this.f.educationcategory.value && this.f.educationcategory.value != "" && this.f.educationcategory.value != null) this.mstapplicanteducationdetail_service.getList_educationsubcategory(this.f.educationcategory.value).then((res: any) => this.educationsubcategory_List = res as DropDownValues[]);
    });
  };
  educationsubcategory_onChange(evt: any) {
    let e = evt.value;
    this.mstapplicanteducationdetail_Form.patchValue({ educationsubcategorydesc: evt.options[evt.options.selectedIndex].text });
  };
  async onSubmitData(bclear: any) {

    this.isSubmitted = true;
    let strError = "";
    console.log(this.mstapplicanteducationdetail_Form.value)

    if (strError != "") return this.sharedService.alert(strError);

    if (!this.mstapplicanteducationdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formValue = this.mstapplicanteducationdetail_Form.value;

    if (this.mstapplicanteducationdetail_Form.value.coursename == null ||
      this.mstapplicanteducationdetail_Form.value.educationcategory == null || this.mstapplicanteducationdetail_Form.value.educationsubcategory == null ||
      this.mstapplicanteducationdetail_Form.value.institutionname == null || this.mstapplicanteducationdetail_Form.value.percentage == null ||
      this.mstapplicanteducationdetail_Form.value.remarks == null || this.mstapplicanteducationdetail_Form.value.fromyear == null || this.mstapplicanteducationdetail_Form.value.toyear == null) {

      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    } else if (this.mstapplicanteducationdetail_Form.value.fromyear >= this.mstapplicanteducationdetail_Form.value.toyear || this.mstapplicanteducationdetail_Form.value.percentage > 100) {
      this.show_YearError = true;
      this.show_percentageError = true;
      if(this.mstapplicanteducationdetail_Form.value.percentage == 100 || this.mstapplicanteducationdetail_Form.value.percentage < 100){
        this.show_percentageError = false;
      }
      if(this.mstapplicanteducationdetail_Form.value.fromyear < this.mstapplicanteducationdetail_Form.value.toyear){
        this.show_YearError = false;
      }
      return
    }
    // else if (this.mstapplicanteducationdetail_Form.value.percentage > 100) {
    //   this.show_percentageError = true;
    //   return
    // }
    else {
      this.formData = this.mstapplicanteducationdetail_Form.getRawValue();
      this.formData.skills = null;
      this.showDateError = false;
      this.showPercentError = false;
      this.show_YearError = false;
      this.show_percentageError = false;
      if (this.mstapplicanteducationdetail_Form.get('skills').value != null) this.formData.skillsstring = JSON.stringify(this.getSkills(this.mstapplicanteducationdetail_Form.get('skills').value));

      console.log(this.formData);
      this.spinner.show();
      this.mstapplicanteducationdetail_service.saveOrUpdate_mstapplicanteducationdetails(this.formData).subscribe(
        async res => {
          // await this.sharedService.upload(this.fileAttachmentList);
          // this.attachmentlist = [];
          // if (this.fileattachment) this.fileattachment.clear();
          this.spinner.hide();

          this.toastr.addSingle("success", "", "Successfully saved");
          this.sessionService.setItem("attachedsaved", "true")
          this.objvalues.push((res as any).mstapplicanteducationdetail);
          this.mstapplicanteducationdetail_Form.reset();
          this.ngOnInit();
          this.show_percentageError = false;
          this.show_YearError = false;
          // if (!bclear) this.showview = true;
          // if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
          // if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          //   this.dialogRef.close(this.objvalues);
          //   return;
          // }
          // else {
          //   if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
          // }
          if (bclear) {
            this.resetForm();
          }
          // else {
          //   if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
          //     this.objvalues.push((res as any).mstapplicanteducationdetail);
          //     this.dialogRef.close(this.objvalues);
          //   }
          //   else {
          //     this.FillData();
          //   }
          // }
          this.mstapplicanteducationdetail_Form.markAsUntouched();
          this.mstapplicanteducationdetail_Form.markAsPristine();
        },
        err => {

          this.spinner.hide();
          this.toastr.addSingle("error", "", err.error);
          console.log(err);
        })
    };
  };
  resetForm() {
    if (this.mstapplicanteducationdetail_Form != null)
      this.mstapplicanteducationdetail_Form.reset();
    this.mstapplicanteducationdetail_Form.patchValue({
    });
  }
  addCareer() {
    this.route.navigate(['/home/newcareerdetails']);
  }
  back() {
    this.route.navigate(['/home/newskilldetails'])
  }

}
