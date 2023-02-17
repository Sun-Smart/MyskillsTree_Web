import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { mstapplicantskilldetailService } from './../../../service/mstapplicantskilldetail.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { FormBuilder, Validators } from '@angular/forms';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-mst-skill-detsils',
  templateUrl: './mst-skill-detsils.component.html',
  styleUrls: ['./mst-skill-detsils.component.scss']
})
export class MstSkillDetsilsComponent implements OnInit {
  mstapplicantskilldetail_Form: FormGroup;
  loginUser: any;
  Segmentcategory_list: DropDownValues[];
  skillcategory_List: DropDownValues[];
  subcategoryid_List: DropDownValues[];
  showinput1: boolean = false;
  showinput2: boolean = false;
  showinput3: boolean = false;
  getidd: any;
  getidd1: any;
  pkcol: any;
  applicantid: any;
  data: any;
  getdata2: string;
  isSubmitted: boolean = false;
  formData: any;
  objvalues: any = [];
  constructor(private route: Router, private toastr: ToastService,
    private sharedService: SharedService,private spinner: NgxSpinnerService,
    private fb: FormBuilder,
    private sessionService: SessionService,
     private mstapplicantskilldetail_service: mstapplicantskilldetailService) {
    this.loginUser = localStorage.getItem('username');
  }

  ngOnInit() {
    // this.pkcol = this.data.maindatapkcol;
    // this.applicantid = this.data.applicantid;

    debugger;
    this.mstapplicantskilldetail_Form = this.fb.group({

      pk: [null],
      ImageName: [null],
      applicantid: this.sessionService.getItem('applicantid'),
      applicantiddesc: [null],
      skillid: [null],
      skillcategory: [null, Validators.compose([Validators.required])],
      skillcategorydesc: [null],
      subcategoryid: [null, Validators.compose([Validators.required])],
      subcategoryiddesc: [null],
      segmentid: [null, Validators.compose([Validators.required])],
      segmentcategorydesc: [null],
      selfrating: [null],
      remarks: [null],
      requestid: [null],
      referenceacceptance: [null],
      referenceacceptancedesc: [null],
      // showorhide: [Boolean],
      // attachment: [null],
      status: [null],
      statusdesc: [null],
      segmentcategoryothers: [null],
      skillcategoryothers: [null],
      subcategoryidothers: [null]
    });
    this.mstapplicantskilldetail_service.getList_segmentcategory().then((res: any) => {
      this.Segmentcategory_list = res as DropDownValues[];
      this.skillcategory_List = [];
      this.subcategoryid_List = [];
    });
   }

  segmentcategory_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.getidd = e

    if (this.getidd == "166") {
      this.showinput1 = true
    } else {
      this.showinput2 = false
      this.showinput3 = false
      this.showinput1 = false
    }

    this.mstapplicantskilldetail_Form.patchValue({
      subcategoryid: null,
      skillcategory: null
    });
    this.mstapplicantskilldetail_service.getList_skillcategory2(e).then((res: any) => {
      debugger;
      this.skillcategory_List = res as DropDownValues[];
      this.subcategoryid_List = [];
    });
  };

  skillcategory_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.getidd1 = e;
    if (this.getidd1 == "262") {
      this.showinput2 = true
    } else {
      this.showinput2 = false
    }
    this.mstapplicantskilldetail_Form.patchValue({
      subcategoryid:null
    });
    debugger
    this.mstapplicantskilldetail_service.getList_subcategoryid2(e).then((res: any) => {
      debugger;
      this.subcategoryid_List = res as DropDownValues[]
    });
  };

  subcategoryid_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.getdata2 = e
    if (this.getdata2 == "512") {
      this.showinput3 = true
    } else {
      this.showinput3 = false
    }
    this.mstapplicantskilldetail_Form.patchValue({ subcategoryiddesc: evt.options[evt.options.selectedIndex].text, categoryid: this.getdata2 });
  };
  async onSubmitData(bclear: any) {
    debugger
    this.isSubmitted = true;
    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);
    if (!this.mstapplicantskilldetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantskilldetail_Form.getRawValue();
    debugger

    console.log(this.formData);
    debugger
    this.spinner.show();
    this.mstapplicantskilldetail_service.saveOrUpdate_mstapplicantskilldetails(this.formData).subscribe(
      async (res: any) => {
        console.log(res);



        this.spinner.hide();

        this.toastr.addSingle("success", "", "Successfully saved");
        this.skillcategory_List = [];
        this.subcategoryid_List = [];
        this.Segmentcategory_list = [];
        this.mstapplicantskilldetail_Form.markAsUntouched();
        this.mstapplicantskilldetail_Form.markAsPristine();
        this.ngOnInit();
        this.mstapplicantskilldetail_Form.reset();
        // this.showSkillDetails_input = false;
        this.sessionService.setItem("attachedsaved", "true");
        // this.ngAfterViewInit();
        let getapp = parseInt(localStorage.getItem('applicantid'));
        this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(getapp);
        this.objvalues.push((res as any).mstapplicantskilldetail);
        this.route.navigate(['/home/neweducation'])

        this.mstapplicantskilldetail_Form.markAsUntouched();
        this.mstapplicantskilldetail_Form.markAsPristine();
      },
      err => {
        debugger;
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      });
  }

  async AddmoreSubmitData(bclear: any) {
    debugger
    this.isSubmitted = true;
    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);
    if (!this.mstapplicantskilldetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantskilldetail_Form.getRawValue();
    debugger

    console.log(this.formData);
    debugger
    this.spinner.show();
    this.mstapplicantskilldetail_service.saveOrUpdate_mstapplicantskilldetails(this.formData).subscribe(
      async (res: any) => {
        console.log(res);

        this.spinner.hide();

        this.toastr.addSingle("success", "", "Successfully saved");
        this.skillcategory_List = [];
        this.subcategoryid_List = [];
        this.Segmentcategory_list = [];
        this.mstapplicantskilldetail_Form.markAsUntouched();
        this.mstapplicantskilldetail_Form.markAsPristine();
        this.ngOnInit();
        this.mstapplicantskilldetail_Form.reset();
        // this.showSkillDetails_input = false;
        this.sessionService.setItem("attachedsaved", "true");
        // this.ngAfterViewInit();
        let getapp = parseInt(localStorage.getItem('applicantid'));
        this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(getapp);
        this.objvalues.push((res as any).mstapplicantskilldetail);

        this.mstapplicantskilldetail_Form.markAsUntouched();
        this.mstapplicantskilldetail_Form.markAsPristine();
      },
      err => {
        debugger;
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      });
  }
  resetForm() {
    if (this.mstapplicantskilldetail_Form != null)
      this.mstapplicantskilldetail_Form.reset();
    this.mstapplicantskilldetail_Form.patchValue({
    });
  };
  addEducation() {
    this.route.navigate(['/home/neweducation'])
  }
  back() {
    this.route.navigate(['/home/personaldetails'])
  }

}
