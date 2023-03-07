import { Component, OnInit, ViewChild, EventEmitter, Output } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
import { mstapplicantreferencerequestComponent } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { mstapplicantcareerdetailService } from '../../../service/mstapplicantcareerdetail.service';
import { mstapplicantcareerdetailComponent } from './mstapplicantcareerdetail.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicantcareerdetail } from '../../../model/mstapplicantcareerdetail.model';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';
@Component({
  selector: 'app-applicantcareergrid',
  
  template: `
  <div style = "float: left;width: 100%;height:100%;">

  <div *ngIf="showWebviewDetect" class="row form-group sticky1 career_mobile_grid" style=" background: #ebf3fc !important;color: #000;padding: 5px;">

    <div class="col-4">
    <h4 class="columns left">{{'Experience'}}</h4>
    </div>
    <div class="col-6">    </div>
    
    <div class="col-2" style="text-align: end; margin: auto;display:flex;justify-content:space-evenly;">

    <button type = "button" class="alert-success" (click)="mstapplicantcareerdetails_route(null, 'create')"><i
    class="fa fa-plus"></i> Add</button>

    <button type = "button" class="alert-danger" (click)="onClose()"><i
    class="fa fa-close"></i> Close</button>
    </div>
  </div>


  <div *ngIf="showMobileDetectskill" class="row form-group sticky1 career_mobile_grid" style=" background: #ebf3fc !important;color: #000;padding: 5px;">

    <div class="col-4">
    <h4 class="  columns left">{{'Experience'}}</h4>
    </div>
    <div class="col-4">    </div>
    <div class="col-4" style="text-align: end; margin: auto;display:flex;justify-content:end;">

    <button type = "button" class="alert-success" (click)="mstapplicantcareerdetails_route(null, 'create')"><i
    class="fa fa-plus"></i> Add</button>

    <button type = "button" class="alert-danger" (click)="onClose()"><i
    class="fa fa-close"></i> Close</button>

    </div>
  </div>

  <div class = "row">
  <div class = "col-12" style = "padding:0;">
  <form [formGroup]="mstapplicantcareerdetail_Form" *ngIf="showWebviewDetect">
  <table class="table" style="margin: 0;background-color: #ebf3fc;color: #fff;position: relative;">
  <thead >
    <tr>

      <th style="width: 11.5%;">Category</th>
      <th style="width: 11.5%;white-space: nowrap;">Company Name</th>
      <th style="width: 11.5%;">Designation</th>
      <th style="width: 11.5%;white-space: nowrap;">From Date</th>
      <th style="width: 11.5%;white-space: nowrap;">To Date</th>
      <th style="width: 11.5%;">Skills</th>
      <th style="width: 11.5%;">Remarks</th>
      <th style="width: 8%;">Action</th>
    </tr>
  </thead>

  <tbody id="showtbody" style="background: #f0f0f0;" *ngIf="showSkillDetails_input">

   <tr>
     <!-- Gategory -->
     <td>
        <select id="category" (change)="category_onChange($event.target)" formControlName="category" class="form-control">
          <option value="null" selected>-Select-</option>
          <option *ngFor="let item of category_List" value="{{item.value}}">{{item.label}}</option>
        </select>
     </td>

     <!-- Company Name -->
     <td>
        <input  id="companyname" required formControlName="companyname" class="form-control">

     </td>

     <!-- Designation-->
     <td>
     <input  id="designation" required formControlName="designation" class="form-control">
     </td>

     <!-- From Date -->

     <td>
     <div >
     <div class="input-group" style="display: flex;width: 100%;">

       <input #d="ngbDatepicker" readonly ngbDatepicker [minDate]='{year: 1950, month:1, day: 1}'
       [maxDate]="maxDate"  name="fromdateformpicker" id="fromdate" required
         formControlName="fromdate" style="margin-right: 5px;" class="form-control">

       <button class="input-group-addon" (click)="d.toggle()" type="button"><i
           class="fa fa-calendar" aria-hidden="true"></i></button>
     </div>
   </div></td>

     <!-- To Date -->

     <td>
     <div>
    <div style="display: flex;width: 80%;">
     <input #t="ngbDatepicker" readonly  ngbDatepicker [minDate]='{year: 1950, month:1, day: 1}'
          [maxDate]="maxDate" name="todateformpicker" id="todate" formControlName="todate" class="form-control"
          style="margin-right: 5px;">

          <button class="input-group-addon"  (click)="t.toggle()" type="button"><i
              class="fa fa-calendar" aria-hidden="true"></i></button>
    </div>
            <div *ngIf="showDateError" style="color: red;font-size: 12px;">
              To date is greater than from date
            </div>
    </div>
     </td>

    <!-- Skills -->

     <td>
     <p-autoComplete formControlName="skills" field="label" [multiple]="true" [suggestions]="skills_results"
          (completeMethod)="search_skills($event)"></p-autoComplete>
     </td>

     <!-- Remarks -->
     <td>
       <textarea name="w3review" rows="1" cols="3" onkeyup="textAreaAdjust(this)" class="form-control" formControlName="remarks"></textarea>
     </td>

    <!-- Submit -->
     <td class="field-add-close-button" style="vertical-align: initial !important;">
       <i class="fa fa-check-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

       <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
          (click)="skillClose()"></i>
     </td>

   </tr>
 </tbody>
 </table>
 </form>
 </div>

 <form [formGroup]="mstapplicantcareerdetail_Form"  *ngIf="showMobileDetectskill">
 <div class="row" *ngIf="showSkillDetails_input" style="width: 320px;margin: 10px !important;">
<div class="col-md-12">
  <label>Category</label>
<select id="category" (change)="category_onChange($event.target)" formControlName="category" class="form-control">
          <option value="null" selected>-Select-</option>
          <option *ngFor="let item of category_List" value="{{item.value}}">{{item.label}}</option>
        </select>
</div>
<div class="col-md-12">
<label>Company Name</label>
<input  id="companyname" required formControlName="companyname" class="form-control">

</div>

<div class="col-md-12">
<label>Designation</label>
<input  id="designation" required formControlName="designation" class="form-control">
</div>

<div class="col-md-12">
<label>From Date</label>
<div class="input-group" style="display: flex;width: 100%;">
       <input #d="ngbDatepicker" readonly ngbDatepicker [minDate]='{year: 1950, month:1, day: 1}'
       [maxDate]="maxDate"  name="fromdateformpicker" id="fromdate" required
         formControlName="fromdate" style="margin-right: 5px;" class="form-control">
       <button class="input-group-addon" (click)="d.toggle()" type="button"><i
           class="fa fa-calendar" aria-hidden="true"></i></button>
</div>
</div>
<div class="col-md-12">
  <label>To Date</label>
<div class="input-group" style="display: flex;width: 100%;">
     <input #t="ngbDatepicker" readonly  ngbDatepicker [minDate]='{year: 1950, month:1, day: 1}'
          [maxDate]="maxDate" name="todateformpicker" id="todate" formControlName="todate" class="form-control"
          style="margin-right: 5px;">
          <button class="input-group-addon"  (click)="t.toggle()" type="button"><i
              class="fa fa-calendar" aria-hidden="true"></i></button>
          </div>
            <div *ngIf="showDateError" style="color: red;font-size: 12px;">
              To date is greater than from date
            </div>
</div>
<div class="col-md-12">
  <label>Skills</label><br/>
<p-autoComplete formControlName="skills" field="label" [multiple]="true" [suggestions]="skills_results"
          (completeMethod)="search_skills($event)"></p-autoComplete>
</div>

<div class="col-md-12">
<label>Remarks</label>
<textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks"></textarea>
</div>
<div style="position: relative;left: 120px;top: 7px;">
<i class="fa fa-check-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

<i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
   (click)="skillClose()"></i>
</div>
</div>
 </form>

 <div class = "col-12" style="overflow-y: scroll;height: 390px;padding:0;">
  <ng2-smart-table #tbl_mstapplicantcareerdetails
    (userRowSelect)="handle_mstapplicantcareerdetails_GridSelected($event)"
    [settings]="mstapplicantcareerdetails_settings"
    (custom)="onCustom_mstapplicantcareerdetails_Action($event)"
    (custom)="onCustom_mstapplicantcareerdetailsAttachment_Action($event)"
    [source]="tbl_mstapplicantcareerdetails?.source?.data"
    (delete)="mstapplicantcareerdetails_route($event,'delete')"
    (deleteConfirm)="mstapplicantcareerdetails_route($event,'delete')"
    (create)="mstapplicantcareerdetails_route($event,'create')"
    (createConfirm)="mstapplicantcareerdetails_beforesave($event)"
    (edit)="mstapplicantcareerdetails_route($event,'edit')"
    (editConfirm)="mstapplicantcareerdetails_beforesave($event)">
  </ng2-smart-table>
  </div>

<div class="col-12" *ngIf = "!showButton" style="display: flex;justify-content: end;margin: 10px auto;position:absolute;right:0; bottom : 5rem;">
<button class="wizard-button" (click)="onSubmitWithCareer()"> Add Project</button>
<button class="wizard-button" (click)="skip_details()"> Skip</button>
</div>
</div>
                `,
  styles: [`
                @media only screen and (max-width: 600px) {
                  h4.columns.left{
                    white-space: nowrap !important;
                    height: 40px !important;
                    margin-top: 10px !important;
                  }
                  button.popup-add-button.heightbtn{
                    position: absolute !important;
                    right: 50px !important;
                    bottom: -3px !important;
                  }
                }
`]
})


export class mstapplicantcareergridComponent implements OnInit {


  mstapplicantcareerdetail_Form: FormGroup

  formData: mstapplicantcareergridComponent;
  bfilterPopulate_mstapplicantcareerdetails: boolean = false;
  mstapplicantcareerdetail_menuactions: any = []
  @ViewChild('tbl_mstapplicantcareerdetails', { static: false }) tbl_mstapplicantcareerdetails: Ng2SmartTableComponent;
  mstapplicantcareerdetails_visiblelist: any;
  mstapplicantcareerdetails_hidelist: any;
  Deleted_mstapplicantcareerdetail_IDs: string = "";
  mstapplicantcareerdetails_ID: string = "2";
  mstapplicantcareerdetails_selectedindex: any;

  ShowTableslist: any;
  pkcol: any;
  showview: boolean = false;//view or edit mode

  IsApplicant: boolean;
  IsAdmin: boolean;
  bSingleRecord: boolean;

  showSkillDetails_input: boolean = false;
  bmyrecord: boolean = false;
  isdisabled: boolean = false
  isSubmitted: boolean = false;

  applicantid: any;
  data: any;
  formid: any;
  myDate: any;
  referencecountres: any;
  countarray: any = [];
  hidelist: any = [];
  acceptcount: string;
  r1: any;
  r2: any;
  r3: any;
  maxDate = undefined;
  maindata: any;
  objvalues: any = [];
  applicantid_List: DropDownValues[];
  category_List: DropDownValues[];
  skills_results: DropDownValues[];
  skills_List: any[];
  pkList: any;//stores values - used in search, prev, next
  @Output() career = new EventEmitter<boolean>();

  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  fromdate: Date;
  todate: Date;
  skills: null;
  showDateError: boolean;
  skillsstring: string;
  attachment: string;
  career_id: any;
  showMobileDetectskill: boolean = false;
  showWebviewDetect: boolean = true;
  isMobile: any;
  showButton: any;

  constructor(
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private fb: FormBuilder, private datePipe: DatePipe,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private mstapplicantcareerdetail_service: mstapplicantcareerdetailService,
  ) {
    var date = new Date()
    this.myDate = this.datePipe.transform(date);
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    };

    this.showButton = this.data.showButton
    this.pkcol = this.data.maindatapkcol;
    this.applicantid = this.data.applicantid;
  };

  async ngOnInit() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.showMobileDetectskill = true;
      this.showWebviewDetect = false;
      /* your code here */
    }
    this.Set_mstapplicantcareerdetails_TableConfig();
    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;

    this.pkcol = this.data.maindatapkcol;
    this.applicantid = localStorage.getItem('applicantid');

    this.mstapplicantcareerdetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
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


    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

    this.FillData();
    this.mstapplicantcareerdetail_service.getskillsDetails(this.applicantid).then((res: any) => {
      console.log('skill res', res);
      this.skills_List = res;
    }).catch((err) => { this.spinner.hide(); });
  };

  get f() { return this.mstapplicantcareerdetail_Form.controls; };

  selectctwo(event: any) {
    if (this.mstapplicantcareerdetail_Form.value.currentlyworking == true) {
      this.isdisabled = true
    } else {
      this.isdisabled = false
    }
  }


  getData() {
    this.mstapplicantcareerdetail_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.category_List = res.list_category.value;
      // this.skills_List = res.list_skills.value;
    }).catch((err) => { this.spinner.hide(); });

    //autocomplete
    this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_List().then(res => {
      this.pkList = res as mstapplicantcareerdetail[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); });
  }
  skillClose() {
    this.mstapplicantcareerdetail_Form.reset();
    this.showSkillDetails_input = false;
  };

  category_onChange(evt: any) {
    let e = this.f.category.value as any;
    this.mstapplicantcareerdetail_Form.patchValue({ categorydesc: evt.options[evt.options.selectedIndex].text });
  };


  resetForm() {
    if (this.mstapplicantcareerdetail_Form != null)
      this.mstapplicantcareerdetail_Form.reset();
    this.mstapplicantcareerdetail_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
    if (mainscreendata != null) {
      for (let key in mainscreendata) {
        if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

          let jsonstring = "";
          let json = null;
          let ctrltype = typeof (mainscreendata[key]);
          if (false)
            json = "";
          else if (key == "fromdate")
            this.mstapplicantcareerdetail_Form.patchValue({ "fromdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "todate")
            this.mstapplicantcareerdetail_Form.patchValue({ "todate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (ctrltype == "string") {
            this.mstapplicantcareerdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicantcareerdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicantcareerdetail_Form.controls[key] != undefined) {
                this.mstapplicantcareerdetail_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  };
  validate() {
    let ret = true;
    return ret;
  }

  onSubmitAndWait() {
    debugger
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(false);
    }
    else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      this.onSubmitData(false);
    }
    else {
      this.onSubmitData(false);
    }
  };

  async onSubmitData(bclear: any) {
    this.isSubmitted = true;
    let strError = "";
    if (!this.mstapplicantcareerdetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantcareerdetail_Form.getRawValue();

    this.formData.fromdate = new Date(this.mstapplicantcareerdetail_Form.get('fromdate').value ? this.ngbDateParserFormatter.format(this.mstapplicantcareerdetail_Form.get('fromdate').value) + '  UTC' : null);

    if (this.mstapplicantcareerdetail_Form.value.currentlyworking == true) {
      this.formData.todate = new Date()
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
        async res => {
          this.spinner.hide();
          this.toastr.addSingle("success", "", "Successfully saved");
          this.showDateError = false;
          this.sessionService.setItem("attachedsaved", "true")
          this.objvalues.push((res as any).mstapplicantcareerdetail);
          this.ngOnInit();
          this.mstapplicantcareerdetail_Form.reset();
          if (!bclear) this.showview = true;
          if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
          if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.dialogRef.close(this.objvalues);
            return;
          }
          else {
            if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
          }

          if (bclear) {
            this.resetForm();
          }
          else {
            if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
              this.objvalues.push((res as any).mstapplicantcareerdetail);
              this.dialogRef.close(this.objvalues);
            }
            else {
              this.FillData();
            }
          }
          this.mstapplicantcareerdetail_Form.markAsUntouched();
          this.mstapplicantcareerdetail_Form.markAsPristine();
        },
        err => {
          this.spinner.hide();
          this.toastr.addSingle("error", "", err.error);
        })
    }

  }

  async onSubmitWithCareer(bclear: any) {

    this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_ByApplicantID(this.applicantid).then(res => {      
      if (res.mstapplicantcareerdetail.length > 0) {
      this.career.emit(true);
    } else {
      this.toastr.addSingle("", "", "Add Your Experience");
      return
    }
  });
  };

  skip_details(){
    this.career.emit(true);
  }


  textAreaAdjust(element: any) {
    element.style.height = "1px";
    element.style.height = (25 + element.scrollHeight) + "px";
  };
  getSkills(skills_List) {
    let skills: any[] = [];

    for (let i = 0; i < skills_List.length; i++) {
      skills.push((skills_List[i] as any).value.toString());
    }
    return skills;
  }

  mstapplicantcareerdetailshtml() {
    let ret = "";
    ret += `
        <div class='card1'>
        <table class="table table-hover" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr style="word-break: break-word;">
            <th style="white-space: break-spaces;width:15%;">##categorydesc##</th>
            <th style="white-space: break-spaces;width:14%;">##companyname##</th>
            <th style="white-space: break-spaces;width:14%;">##designation##</th>
            <!--<th scope="row" style="white-space: break-spaces;">##referencecount##</th>-->
            <th style="white-space: break-spaces;width:15%;">##fromdate##</th>
            <th style="white-space: break-spaces;width:14%;">##todate##</th>
            <th style="white-space: break-spaces;width:15%;">##string_agg##</th>
            <th style="white-space: break-spaces;">##remarks##</th>
          </tr>
        </tbody>
      </table>
      </div>
`;
    return ret;
  };
  mstapplicantcareerdetailshtml1() {
    let ret = "";
    ret += `
      <ul class="list-group" style="line-height: 15px;margin: 0px;">
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Category </span>: <label style="font-size: small;">##categorydesc##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Company Name </span>: <label style="font-size: small;">##companyname##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Designation :</span> <label style="font-size: small;">##designation##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">From Date :</span> <label style="font-size: small;">##fromdate##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">To Date :</span> <label style="font-size: small;">##todate##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Skills :</span> <label style="font-size: small;">##string_agg##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Remarks :</span> <label style="font-size: small;">##remarks##</label></li>
  </ul>
`;
    return ret;
  };

  search_skills(event) {
    this.skills_results = this.skills_List.filter(v => v.label.toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
  }

  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_ByEID(pkcol).then((res: any) => {
      this.spinner.hide();

      this.formData = res.mstapplicantcareerdetail;
      let formproperty = res.mstapplicantcareerdetail.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstapplicantcareerdetail.pkcol;
      this.formid = res.mstapplicantcareerdetail.careerid;
      this.FillData();
    }).catch((err) => { });
  }

  FillData() {
    this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_ByApplicantID(this.applicantid).then(res => {
      this.mstapplicantcareerdetail_menuactions = res.mstapplicantcareerdetail_menuactions;
      this.Set_mstapplicantcareerdetails_TableConfig();
      this.mstapplicantcareerdetails_LoadTable(res.mstapplicantcareerdetail);
    });
  };

  getSkillsDescription() {
    let skillsdescription: any[] = [];
    for (let i = 0; i < this.skills_List.length; i++) {
      for (let j = 0; j < this.mstapplicantcareerdetail_Form.get('skills').value.length; j++) {
        if ((this.skills_List[i] as any).value.toString() == this.mstapplicantcareerdetail_Form.get('skills').value[j].toString()) {

          skillsdescription.push((this.skills_List[i] as any));
        }
      }
    }
    this.mstapplicantcareerdetail_Form.patchValue({ skills: skillsdescription });
  }


  Add_mstapplicantcareerdetail(event: any, careerid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    this.getData();
    let add = false;
    if (event == null) add = true;
  }

  Edit_mstapplicantcareerdetail(event: any, careerid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    this.getData();
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_ByEID(event.data.pkcol).then((res: any) => {
      this.mstapplicantcareerdetail_Form.patchValue({
        applicantid: res.mstapplicantcareerdetail.applicantid,
        applicantiddesc: res.mstapplicantcareerdetail.applicantiddesc,
        careerid: res.mstapplicantcareerdetail.careerid,
        category: res.mstapplicantcareerdetail.category,
        categorydesc: res.mstapplicantcareerdetail.categorydesc,
        companyname: res.mstapplicantcareerdetail.companyname,
        designation: res.mstapplicantcareerdetail.designation,
        keyproject: res.mstapplicantcareerdetail.keyproject,
        fromdate: this.ngbDateParserFormatter.parse(res.mstapplicantcareerdetail.fromdate),
        todate: this.ngbDateParserFormatter.parse(res.mstapplicantcareerdetail.todate),
        currentlyworking: res.mstapplicantcareerdetail.currentlyworking,
        requestid: res.mstapplicantcareerdetail.requestid,
        skills: res.mstapplicantcareerdetail.skills,
        string_agg: res.mstapplicantcareerdetail.string_agg,
        remarks: res.mstapplicantcareerdetail.remarks,
        status: res.mstapplicantcareerdetail.status,
        statusdesc: res.mstapplicantcareerdetail.statusdesc,
        attachment: "[]",

      });
      setTimeout(() => {
        this.getSkillsDescription();
        this.mstapplicantcareerdetail_service.getskillsDetails(this.applicantid).then((res: any) => {
          console.log('skill res', res);
          this.skills_List = res;
        }).catch((err) => { this.spinner.hide(); });
      }, 400);
      this.mstapplicantcareerdetail_menuactions = res.mstapplicantcareerdetail_menuactions;
    })

  };

  //start of Grid Codes mstapplicantcareerdetails
  mstapplicantcareerdetails_settings: any;

  show_mstapplicantcareerdetails_Checkbox() {
    if (this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'multi';
    this.tbl_mstapplicantcareerdetails.source.initGrid();
  }
  delete_mstapplicantcareerdetails_All() {
    this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'single';
  }
  show_mstapplicantcareerdetails_Filter() {
    if (this.tbl_mstapplicantcareerdetails.source.settings != null) this.tbl_mstapplicantcareerdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantcareerdetails.source.settings['hideSubHeader'];
    this.tbl_mstapplicantcareerdetails.source.initGrid();
  }
  async Set_mstapplicantcareerdetails_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_mstapplicantcareerdetails) {

      var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_applicantid.value)), }, };
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_applicantid.value)), }, };
      this.tbl_mstapplicantcareerdetails.source.settings = clone;
      this.tbl_mstapplicantcareerdetails.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
      if (clone.columns['category'] != undefined) clone.columns['category'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_category.value)), }, };
      if (clone.columns['category'] != undefined) clone.columns['category'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_category.value)), }, };
      this.tbl_mstapplicantcareerdetails.source.settings = clone;
      this.tbl_mstapplicantcareerdetails.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
      if (clone.columns['skills'] != undefined) clone.columns['skills'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_skills.value)), }, };
      if (clone.columns['skills'] != undefined) clone.columns['skills'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_skills.value)), }, };
      this.tbl_mstapplicantcareerdetails.source.settings = clone;
      this.tbl_mstapplicantcareerdetails.source.initGrid();
    }
    this.bfilterPopulate_mstapplicantcareerdetails = true;
  }
  async mstapplicantcareerdetails_beforesave(event: any) {
    event.confirm.resolve(event.newData);
  }
  Set_mstapplicantcareerdetails_TableConfig() {
    this.mstapplicantcareerdetails_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        edit: true, // true,
        delete: (this.IsApplicant || this.IsAdmin),
        position: 'right',
        custom: this.mstapplicantcareerdetail_menuactions
      },
      add: {
        addButtonContent: '<i class="nb-plus"></i>',
        createButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmCreate: true,
      },
      edit: {
        editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
        confirmDelete: true,
      },
      // pager: {
      //   display: true,
      //   perPage: 5
      // },
      columns: {
        colhtml:
        {
          title: '',
          type: 'html',
          filter: true,
          editor:
          {
            type: 'textarea',
          },
          valuePrepareFunction: (cell, row) => {
            cell = this.mstapplicantcareerdetailshtml();
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              cell = this.mstapplicantcareerdetailshtml1();
              /* your code here */
            }
            var divrow = JSON.parse(JSON.stringify(row));

            if (row.referencecount == 0 || row.referencecount == undefined) {
              let abc = '-';
              this.countarray.push(abc)
              var xyzyzyz = this.countarray;
            } else {
              if (row.referencecount > 0 && row.referenceacceptedcount > 0 && row.referencerejactedcount > 0) {
                this.r1 = row.referencecount - row.referenceacceptedcount - row.referencerejactedcount
                for (let i = 0; i < this.r1; i++) {
                  let abc = '★'
                  this.countarray.push(abc.fontcolor('gray'))
                  var xyzyzyz = this.countarray.join('')
                }
                for (let i = 0; i < row.referenceacceptedcount; i++) {
                  let abc = '★'
                  this.countarray.push(abc.fontcolor('green'))
                  var xyzyzyz = this.countarray.join('')
                }
                for (let i = 0; i < row.referencerejactedcount; i++) {
                  let abc = '★'
                  this.countarray.push(abc.fontcolor('red'))
                  var xyzyzyz = this.countarray.join('')
                }
              } else {
                if (row.referencecount > 0 && row.referenceacceptedcount > 0 && row.referencerejactedcount == 0) {
                  this.r1 = row.referencecount - row.referenceacceptedcount
                  for (let i = 0; i < this.r1; i++) {
                    let abc = '★'
                    this.countarray.push(abc.fontcolor('gray'))
                    var xyzyzyz = this.countarray.join('')
                  }
                  for (let i = 0; i < row.referenceacceptedcount; i++) {
                    let abc = '★'
                    this.countarray.push(abc.fontcolor('green'))
                    var xyzyzyz = this.countarray.join('')
                  }

                }
                else {
                  if (row.referencecount > 0 && row.referenceacceptedcount == 0 && row.referencerejactedcount > 0) {
                    this.r1 = row.referencecount - row.referencerejactedcount
                    for (let i = 0; i < this.r1; i++) {
                      let abc = '★'
                      this.countarray.push(abc.fontcolor('gray'))
                      var xyzyzyz = this.countarray.join('')
                    }
                    for (let i = 0; i < row.referencerejactedcount; i++) {
                      let abc = '★'
                      this.countarray.push(abc.fontcolor('red'))
                      var xyzyzyz = this.countarray.join('')
                    }
                  } else {
                    if (row.referencecount > 0 && row.referenceacceptedcount == 0 && row.referencerejactedcount == 0) {
                      for (let i = 0; i < row.referencecount; i++) {
                        let abc = '★'
                        this.countarray.push(abc.fontcolor('gray'))
                        var xyzyzyz = this.countarray.join('')
                      }
                    }
                  }
                }
              }
            }
            divrow['referencecount'] = "<div style='position: relative;left: 12%;font-size: 17px;'>" + xyzyzyz + "</div>";
            this.countarray = [];

            divrow["fromdate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["fromdate"]));
            divrow["todate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["todate"]));
            var dateee = divrow["todate"]
            if (divrow["todate"] == this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(this.myDate))) {
              divrow["todate"] = "Till date";
              return this.sharedService.HtmlValue(divrow, cell)
            } else {
              divrow["todate"] = dateee
              return this.sharedService.HtmlValue(divrow, cell)
            }
          },
        },
      },
    };
  }
  mstapplicantcareerdetails_LoadTable(mstapplicantcareerdetails = new LocalDataSource()) {
    debugger
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantcareerdetails_ID) >= 0) {
      if (this.tbl_mstapplicantcareerdetails != undefined) this.tbl_mstapplicantcareerdetails.source = new LocalDataSource();
      if (this.tbl_mstapplicantcareerdetails != undefined) this.tbl_mstapplicantcareerdetails.source.load(mstapplicantcareerdetails as any as LocalDataSource);
      if (this.tbl_mstapplicantcareerdetails != undefined) this.tbl_mstapplicantcareerdetails.source.setPaging(1, 20, true);
    }
  }
  mstapplicantcareerdetails_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.Add_mstapplicantcareerdetail(event, null, this.applicantid);
        break;
      case 'view':
        break;
      case 'edit':
        this.Edit_mstapplicantcareerdetail(event, event.data.careerid, this.applicantid);
        break;
      case 'delete':
        this.onDelete_mstapplicantcareerdetail(event, event.data.careerid,
          ((this.tbl_mstapplicantcareerdetails.source.getPaging().page - 1) * this.tbl_mstapplicantcareerdetails.source.getPaging().perPage) + event.index);
        this.tbl_mstapplicantcareerdetails.source.refresh();
        break;
    }
  }
  mstapplicantcareerdetails_onDelete(obj) {
    let careerid = obj.data.careerid;
    if (confirm('Are you sure to delete this record ?')) {
      this.mstapplicantcareerdetail_service.delete_mstapplicantcareerdetail(careerid).then(res => {
        this.mstapplicantcareerdetails_LoadTable();
      }
      );
    }
  }
  onDelete_mstapplicantcareerdetail(event: any, childID: any, i: number) {
    if (confirm('Do you want to delete this record?')) {
      this.mstapplicantcareerdetail_service.delete_mstapplicantcareerdetail(childID).then(res => {
        this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_ByApplicantID(this.applicantid).then(res => {
          this.ngOnInit();
          this.mstapplicantcareerdetails_LoadTable(res);
        });
      })
    } else {
      return;
    }
  }
  async onCustom_mstapplicantcareerdetails_Action(event: any) {
    let fromdate = this.datePipe.transform(new Date(event.data.fromdate), 'dd-MM-yyyy');
    let todate = this.datePipe.transform(new Date(event.data.todate), 'dd-MM-yyyy');


    let referencesourcedetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Company Name: ' + event.data.companyname + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Designation: ' + event.data.designation + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> From Date: ' + fromdate + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> To Date: ' + todate + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Currently Working: ' + event.data.currentlyworking + '</li>'
      + '<li class="list-group-item remarks_p" style="background: #2D3C84 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>'

    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantcareerdetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantreferencerequests") {
      this.dialog.open(mstapplicantreferencerequestComponent,
        {
          data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 317, requestmasterid: event.data.careerid, ScreenType: 2, save: true }
        }
      ).onClose.subscribe(res => {
      });
    }
  };

  async onCustom_mstapplicantcareerdetailsAttachment_Action(event: any, careerid: any, applicantid: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantcareerdetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantcareerdetails") {
      let add = false;
      if (event == null) add = true;
      let childsave = true;
      if (this.pkcol != undefined && this.pkcol != null) childsave = true;
      this.dialog.open(mstapplicantcareerdetailComponent,
        {
          data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, careerid, applicantid, visiblelist: this.mstapplicantcareerdetails_visiblelist, hidelist: this.mstapplicantcareerdetails_hidelist, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
        if (res) {
          if (add) {
            for (let i = 0; i < res.length; i++) {
              this.tbl_mstapplicantcareerdetails.source.add(res[i]);
            }
            this.tbl_mstapplicantcareerdetails.source.refresh();
          }
          else {
            this.tbl_mstapplicantcareerdetails.source.update(event.data, res[0]);
          }
        }
      });

    }
  }

  mstapplicantcareerdetails_Paging(val) {
    this.tbl_mstapplicantcareerdetails.source.setPaging(1, val, true);
  }

  handle_mstapplicantcareerdetails_GridSelected(event: any) {
    this.mstapplicantcareerdetails_selectedindex = this.tbl_mstapplicantcareerdetails.source.findIndex(i => i.careerid === event.data.careerid);
  }
  Is_mstapplicantcareerdetails_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantcareerdetails_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes mstapplicantcareerdetails
  onClose() {
    this.dialogRef.close();
  }
}
