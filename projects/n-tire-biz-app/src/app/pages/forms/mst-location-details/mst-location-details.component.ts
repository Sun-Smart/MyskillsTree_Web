import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { mstapplicantgeographypreferenceService } from '../../../service/mstapplicantgeographypreference.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router } from '@angular/router';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicantgeographypreference } from '../../../model/mstapplicantgeographypreference.model';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';



@Component({
  selector: 'app-mst-location-details',
  templateUrl: './mst-location-details.component.html',
  styleUrls: ['./mst-location-details.component.scss']
})
export class MstLocationDetailsComponent implements OnInit {

  mstapplicantgeographypreference_Form: FormGroup;

  formData: mstapplicantgeographypreference;

  applicantid: any;
  data: any;
  maindata: any;
  pkList: any;//stores values - used in search, prev, next
  showview: boolean = false;//view or edit mode

  objvalues: any = [];

  city_List: DropDownValues[];
  country_List: DropDownValues[];
  applicantid_List: DropDownValues[];


  country_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  city_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
  loginUser: string;


  constructor(
    private spinner: NgxSpinnerService, private fb: FormBuilder,
    private route: Router, private toastr: ToastService,private sharedService: SharedService,
    private mstapplicantgeographypreference_service: mstapplicantgeographypreferenceService,
    public dynamicconfig: DynamicDialogConfig, public dialogRef: DynamicDialogRef,) {

    this.loginUser = localStorage.getItem('username');

    this.applicantid = localStorage.getItem('applicantid');

    this.mstapplicantgeographypreference_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
      applicantiddesc: [null],
      geographypreferenceid: [null],
      country: ['', Validators.required],
      countrydesc: [null],
      city: ['', Validators.required],
      citydesc: [null],
      remarks: [null],
      status: [null],
      statusdesc: [null],
      attachment: [null],
    });
  }

  ngOnInit(): void {

    this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_List().then(res => {
      this.pkList = res as mstapplicantgeographypreference[];
      this.pkoptionsEvent.emit(this.pkList);
    }).catch((err) => { this.spinner.hide(); });

    this.mstapplicantgeographypreference_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.country_List = res.list_country.value;
    }).catch((err) => { this.spinner.hide(); });
  };


  onSelected_country(countryDetail: any) {
    if (countryDetail.value && countryDetail) {
      this.mstapplicantgeographypreference_Form.patchValue({
        country: countryDetail.value,
        countrydesc: countryDetail.label,
      });
      this.mstapplicantgeographypreference_service.getList_city(countryDetail.value).then((res: any) => {
        this.city_List = res as DropDownValues[]
      }).catch((err) => { this.spinner.hide(); });
    }
  };

  onSelected_city(cityDetail: any) {
    if (cityDetail.cityid && cityDetail) {
      this.mstapplicantgeographypreference_Form.patchValue({
        city: cityDetail.cityid,
        citydesc: cityDetail.name,
      });

      this.mstapplicantgeographypreference_service.getList(cityDetail.cityid).then((res: any) => {
        this.city_List = res as DropDownValues[]
      }).catch((err) => {
        this.spinner.hide();
      });
    }
  };

  async onSubmitData(bclear: any) {

    let strError = "";
    if (!this.mstapplicantgeographypreference_Form.valid) {
        this.toastr.addSingle("error", "", "Enter the required fields");
        return;
    }

    if (strError != "") return this.sharedService.alert(strError);

    this.formData = this.mstapplicantgeographypreference_Form.getRawValue();
    this.formData.applicantid = this.applicantid;
    this.spinner.show();
    this.mstapplicantgeographypreference_service.saveOrUpdate_mstapplicantgeographypreferences(this.formData).subscribe(
        async res => {
            this.spinner.hide();
            this.toastr.addSingle("success", "", "Successfully saved");
            this.route.navigate(['/home/newlanguage'])
            this.objvalues.push((res as any).mstapplicantgeographypreference);
        }, (err:any) => {
            this.spinner.hide();
            this.toastr.addSingle("error", "", err.error);
        }
    )
};

async AddMorelocation(bclear: any) {

  let strError = "";
  if (!this.mstapplicantgeographypreference_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
  }

  if (strError != "") return this.sharedService.alert(strError);

  this.formData = this.mstapplicantgeographypreference_Form.getRawValue();
  this.formData.applicantid = this.applicantid;
  console.log(this.formData);
  this.spinner.show();
  this.mstapplicantgeographypreference_service.saveOrUpdate_mstapplicantgeographypreferences(this.formData).subscribe(
      async res => {
          this.spinner.hide();
          this.toastr.addSingle("success", "", "Successfully saved");
          this.objvalues.push((res as any).mstapplicantgeographypreference);
          this.mstapplicantgeographypreference_Form.reset();
      }, (err:any) => {
          this.spinner.hide();
          this.toastr.addSingle("error", "", err.error);
      }
  )
}

skipResume() {
  this.route.navigate(['/home/newresume'])
}
  back() {
    this.route.navigate(['/home/newcertification'])
  }
}
