import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mstapplicantworkreference } from '../../../model/mstapplicantworkreference.model';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { mstapplicantworkreferenceService } from '../../../service/mstapplicantworkreference.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';

@Component({
  selector: 'app-mst-project-details',
  templateUrl: './mst-project-details.component.html',
  styleUrls: ['./mst-project-details.component.scss']
})
export class MstProjectDetailsComponent implements OnInit {
  loginUser: any;
  formData: mstapplicantworkreference;
  mstapplicantworkreference_Form: FormGroup;
  companyList: DropDownValues[];
  applicantid: any;
  pkcol: any;
  data: any;
  applicantid_List: DropDownValues[];
  skills_results: DropDownValues[];
  skills_List: any[] = [];
  isSubmitted: boolean = false;
  objvalues: any = [];
  constructor(private route: Router, private mstapplicantworkreference_service: mstapplicantworkreferenceService,
    private sessionService: SessionService, private fb: FormBuilder, private spinner: NgxSpinnerService,
    private toastr: ToastService,) {
    this.loginUser = localStorage.getItem('username');
    // this.pkcol = this.data.maindatapkcol;
    // this.applicantid = this.data.applicantid;
    this.mstapplicantworkreference_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.sessionService.getItem('applicantid'),
      applicantiddesc: [null],
      workreferenceid: [null],
      companyname: [null],
      worktopic: [null, [Validators.required]],
      workdescription: [null, [Validators.required]],
      referenceurl: [null],
      remarks: [null],
      requestid: [null],
      attachment: [null],
      status: [null],
      skills: [null],
      skilldesc: [null],
      statusdesc: [null],
    });
  }

  ngOnInit() {
    // this.pkcol = this.data.maindatapkcol;
    // this.applicantid = this.data.applicantid;

    this.mstapplicantworkreference_service.get_mstapplicantworkreferences_companyList(this.applicantid).then(res => {
      console.log(res);
      this.companyList = res as DropDownValues[];
    })
    this.mstapplicantworkreference_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.skills_List = res.list_skills.value;
    }).catch((err) => { this.spinner.hide(); console.log(err); });
  }
  search_skills(event) {
    debugger;
    this.skills_results = this.skills_List.filter(v => v.label.toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
  }

  skill_onchange(event: any) {
    console.log("skill_onchange", event);
    let e = event.value;
    this.mstapplicantworkreference_Form.patchValue({ skilldesc: event.options[event.options.selectedIndex].text });

  }
  onChange_companyList(event: any) {
    debugger
    console.log("onChange_companyList", event);
    this.mstapplicantworkreference_Form.patchValue({ companyname: event.options[event.options.selectedIndex].text });
  }
  getSkills(skills_List: any) {
    debugger;
    let skills: any[] = [];

    for (let i = 0; i < skills_List.length; i++) {
      skills.push((skills_List[i] as any).value.toString());
    }
    return skills;
  }

  getSkillsDescription() {
    debugger;
    let skillsdescription: any[] = [];
    for (let i = 0; i < this.skills_List.length; i++) {
      for (let j = 0; j < this.mstapplicantworkreference_Form.get('skills').value.length; j++) {
        if ((this.skills_List[i] as any).value.toString() == this.mstapplicantworkreference_Form.get('skills').value[j].toString()) {
          skillsdescription.push((this.skills_List[i] as any));
        }
      }
    }
    this.mstapplicantworkreference_Form.patchValue({ skills: skillsdescription });
  }
  async onSubmitData(bclear: any) {
    debugger;
    this.isSubmitted = true;
    let strError = "";
    if (!this.mstapplicantworkreference_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantworkreference_Form.getRawValue();
    this.formData.skills = null;

    if (this.mstapplicantworkreference_Form.get('skills').value != null) this.formData.skillsstring = JSON.stringify(this.getSkills(this.mstapplicantworkreference_Form.get('skills').value));
    console.log(this.formData);
    this.spinner.show();
    this.mstapplicantworkreference_service.saveOrUpdate_mstapplicantworkreferences(this.formData).subscribe(
      async res => {
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.route.navigate(['/home/newcertification']);
        this.sessionService.setItem("attachedsaved", "true")
        this.mstapplicantworkreference_Form.reset();
        this.objvalues.push((res as any).mstapplicantworkreference);
        this.ngOnInit();
        if (bclear) {
          this.resetForm();
        }
        this.mstapplicantworkreference_Form.markAsUntouched();
        this.mstapplicantworkreference_Form.markAsPristine();
      },
      err => {
        debugger;
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }
  resetForm() {
    if (this.mstapplicantworkreference_Form != null)
      this.mstapplicantworkreference_Form.reset();
    this.mstapplicantworkreference_Form.patchValue({
    });
  }
  addcertification() {
    this.route.navigate(['/home/newcertification']);
  }
  AddmoreSubmitData(){
    debugger;
    this.isSubmitted = true;
    let strError = "";
    if (!this.mstapplicantworkreference_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantworkreference_Form.getRawValue();
    this.formData.skills = null;

    if (this.mstapplicantworkreference_Form.get('skills').value != null) this.formData.skillsstring = JSON.stringify(this.getSkills(this.mstapplicantworkreference_Form.get('skills').value));
    console.log(this.formData);
    this.spinner.show();
    this.mstapplicantworkreference_service.saveOrUpdate_mstapplicantworkreferences(this.formData).subscribe(
      async res => {
        this.spinner.hide();
        debugger;
        this.toastr.addSingle("success", "", "Successfully saved");
        this.sessionService.setItem("attachedsaved", "true")
        this.mstapplicantworkreference_Form.reset();
        this.objvalues.push((res as any).mstapplicantworkreference);
        this.ngOnInit();
        this.mstapplicantworkreference_Form.markAsUntouched();
        this.mstapplicantworkreference_Form.markAsPristine();
      },
      err => {
        debugger;
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }
  back() {
    this.route.navigate(['/home/newcareerdetails'])
  }
}
