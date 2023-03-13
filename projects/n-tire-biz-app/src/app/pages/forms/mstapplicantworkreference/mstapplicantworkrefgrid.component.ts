import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { mstapplicantreferencerequestComponent } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component';
import { mstapplicantreferencerequestService } from './../../../service/mstapplicantreferencerequest.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { mstapplicantworkreferenceComponent } from './mstapplicantworkreference.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';
import { mstapplicantworkreference } from '../../../model/mstapplicantworkreference.model';
import { mstapplicantworkreferenceService } from '../../../service/mstapplicantworkreference.service';
import { mstapplicantcareerdetailService } from '../../../service/mstapplicantcareerdetail.service';
@Component({
  selector: 'app-applicantworkrefgrid',
  template: `
  <div style = "float: left;width: 100%;height:100%;">
    <div *ngIf="showWebviewDetect" class="row form-group sticky1" style=" background: #ebf3fc; !important;color: #000;padding: 5px;">

    <div class="col-4">
    <h4 class="mobile_work_ref">{{'Project'}}</h4>
</div>

<div class="col-6"></div>

<div class="col-2" style="text-align: end; margin: auto;display:flex;justify-content:space-evenly;">

<button type = "button" class="alert-success" (click)="mstapplicantworkreferences_route(null, 'create')"><i
class="fa fa-plus"></i> Add</button>

<button type = "button" class="alert-danger" (click)="onClose()" *ngIf = "buttonview"><i
class="fa fa-close"></i> Close</button>
</div>
</div>

<div *ngIf="showMobileDetectskill" class="row form-group sticky1" style=" background: #ebf3fc; !important;color: #000;padding: 5px;">

    <div class="col-4">
    <h4 class="mobile_work_ref">{{'Project'}}</h4>
</div>

<div class="col-4"></div>

<div class="col-4" style="text-align: end; margin: auto;display:flex;justify-content:end;">

                <button type = "button"  class="alert-success" (click)="mstapplicantworkreferences_route(null, 'create')"><i
                class="fa fa-plus"></i> Add</button>

                <button type = "button"  class="alert-danger" (click)="onClose()"><i
                class="fa fa-close"></i> Close</button>
                </div>
</div>

<div class = "row">
<div class = "col-12" style="padding:0;">
<form [formGroup]="mstapplicantworkreference_Form"  *ngIf="showWebviewDetect">
              <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
                <thead>
                    <tr>

                    <th style="width: 10%;">Company Name</th>
                    <th style="width: 10%;">Work Topic</th>
                    <th style="width: 10%;">Work Description</th>
                    <th style="width: 10%">Reference Url</th>
                    <th style="width: 10%;">From Date</th>
                    <th style="width: 10%;">To Date</th>
                    <th style="width: 10%;">Remarks</th>
                    <th style="width: 10%;">Skills</th>
                    <th style="width: 10%;">Location</th>
                    <th style="width: 10%;text-align: center;">Action</th>
                    </tr>
                </thead>
                <tbody style="background: #f0f0f0;" *ngIf="showSkillDetails_input">
                <tr>

                <!-- Company Name -->
                    <td>
                    <select id="companyname" (change)="onChange_companyList($event.target.value)" formControlName="companyname" class="form-control">
                    <option value="null" selected>-Select-</option>
                    <option *ngFor="let item of companyList" value="{{item.companyname}}">{{item.companyname}}</option>
                    </select>
                    </td>

                <!-- Work Topic -->

                    <td>
                        <input id="worktopic" required formControlName="worktopic" class="form-control">

                        <div *ngIf="mstapplicantworkreference_Form.get('worktopic').errors  && isSubmitted" class="invalid-feedback">
                        <span *ngIf="mstapplicantworkreference_Form.get('worktopic').hasError('required')">worktopic is required</span>
                        </div>

                        </td>



                <!-- Work Description -->

                    <td>
                    <textarea autosize rows="1" cols="10" onlyGrow="true"  id="workdescription" required
                    formControlName="workdescription" class="form-control">
                    </textarea>

                    <div *ngIf="mstapplicantworkreference_Form.get('workdescription').errors  && isSubmitted" class="invalid-feedback">
                        <span *ngIf="mstapplicantworkreference_Form.get('workdescription').hasError('required')">workdescription is required</span>
                        </div>
                    </td>

                    <!-- Reference URL -->

                    <td>
                    <input id="referenceurl" formControlName="referenceurl" class="form-control">

                    </td>

                    <!-- From Date -->

                    <td>
                    <div >
                    <div class="input-group" style="display: flex;width: 100%;">

                      <input #d="ngbDatepicker" readonly ngbDatepicker [minDate]='{year: 1901, month:1, day: 1}'
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
                  <input #t="ngbDatepicker" readonly  ngbDatepicker [minDate]='{year: 1901, month:1, day: 1}'
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

                <!-- Remarks -->

                    <td>
                    <textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks"></textarea>
                    </td>

                <!--skill-->
                    <td>

                    <p-autoComplete formControlName="skills" field="label" [multiple]="true" [suggestions]="skills_results"
                    (completeMethod)="search_skills($event)" ></p-autoComplete>

                    </td>

                    <!--Location-->

                    <td>

                   <app-popupselect [options]="city_List" [optionsEvent]="city_optionsEvent" [form]="bocity"
                      (selectItem)="onSelected_city($event)" [reportid]='kbg3n' [menuid]='kbg3n' formControlName="locationid" id="cityid"
                      desc="city"></app-popupselect>
                    </td>



                <!-- Add & Close -->

                    <td class="field-add-close-button" style="">
                        <!-- Add -->
                        <i class="fa fa-check-square field-Add-button" aria-hidden="true" (click)="onSubmitData(mstapplicantworkreference_Form)"></i>
                        <!-- Close -->
                        <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                        (click)="skillClose()"></i>
                    </td>
                </tr>
            </tbody>
                </table>
</form>
</div>

<form [formGroup]="mstapplicantworkreference_Form"  *ngIf="showMobileDetectskill">

<div class="row" *ngIf="showSkillDetails_input" style="width: 320px;margin: 10px !important;">
<div class="col-md-12">
  <label>Company Name</label>
<select id="companyname" (change)="onChange_companyList($event.target.value)" formControlName="companyname" class="form-control">
                    <option value="null" selected>-Select-</option>
                    <option *ngFor="let item of companyList" value="{{item.companyname}}">{{item.companyname}}</option>
                    </select>
</div>

<div class="col-md-12">
  <label>Work Topic</label>
<input id="worktopic" required formControlName="worktopic" class="form-control">

                        <div *ngIf="mstapplicantworkreference_Form.get('worktopic').errors  && isSubmitted" class="invalid-feedback">
                        <span *ngIf="mstapplicantworkreference_Form.get('worktopic').hasError('required')">worktopic is required</span>
                        </div>
</div>

                <div class="col-md-12">
                    <label>Reference URL</label>
                    <input id="referenceurl" formControlName="referenceurl" class="form-control">
                </div>

                <div class="col-md-12">
                    <label>Work Description</label>
                    <textarea autosize rows="1" cols="10" onlyGrow="true"  id="workdescription" required
                    formControlName="workdescription" class="form-control">
                    </textarea>

                    <div *ngIf="mstapplicantworkreference_Form.get('workdescription').errors  && isSubmitted" class="invalid-feedback">
                        <span *ngIf="mstapplicantworkreference_Form.get('workdescription').hasError('required')">workdescription is required</span>
                        </div>
                    </div>

<div class="col-md-12">
  <label>Remarks</label>
<textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks"></textarea>
</div>
<div class="col-md-12">
  <label>Skills</label><br/>
                    <p-autoComplete formControlName="skills" field="label" [multiple]="true" [suggestions]="skills_results"
                    (completeMethod)="search_skills($event)"></p-autoComplete>

</div>
<div class="col" style="position: relative;left: 120px;top: 7px;">

<i class="fa fa-check-square field-Add-button" aria-hidden="true" (click)="onSubmitData(mstapplicantworkreference_Form)"></i>
                        <!-- Close -->
                        <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                        (click)="skillClose()"></i>
</div>

</div>
</form>

<div class = "col-12" style="overflow-y: scroll;height: 360px;padding:0;">
              <ng2-smart-table #tbl_mstapplicantworkreferences
                (userRowSelect)="handle_mstapplicantworkreferences_GridSelected($event)"
                [settings]="mstapplicantworkreferences_settings"
                (custom)="onCustom_mstapplicantworkreferences_Action($event)"
                (custom)="onCustom_mstapplicantskilldetailsAttachment_Action($event)"
                [source]="tbl_mstapplicantworkreferences?.source?.data"
                (delete)="mstapplicantworkreferences_route($event,'delete')"
                (deleteConfirm)="mstapplicantworkreferences_route($event,'delete')"
                (create)="mstapplicantworkreferences_route($event,'create')"
                (createConfirm)="mstapplicantworkreferences_beforesave($event)"
                (edit)="mstapplicantworkreferences_route($event,'edit')"
                (editConfirm)="mstapplicantworkreferences_beforesave($event)">
              </ng2-smart-table>
              </div>

      <div class="col-12" *ngIf = "!buttonview" style="display: flex;justify-content: end;margin: 10px auto;position:absolute;right:0; bottom : 1rem;">
      
      <!--<button class="wizard-button" (click)="skip_details()" style="margin-right:10px;"> Skip</button>-->

      <button class="wizard-button" (click)="onSubmitWithProject()"> 
      <i class="fa fa-plus"></i> Add Project</button>

      </div>
      </div>
    `,
  styles: [`
    @media only screen and (max-width: 600px) {
            .mobile_work_ref{
              margin-top: 10px !important;
            }
            button.btn.btn-outline-primary.popup-add-button{
              position: absolute !important;
              right: 50px !important;
              bottom: -3px !important;
            }
            .row.form-group.sticky1{
              height: 50px !important;
            }
    }
    `]
})
export class mstapplicantworkrefgridComponent implements OnInit {
  formData: mstapplicantworkreference;
  mstapplicantworkreference_Form: FormGroup;

  isadmin = false;
  bfilterPopulate_mstapplicantworkreferences: boolean = false;
  mstapplicantworkreference_menuactions: any = []
  @ViewChild('tbl_mstapplicantworkreferences', { static: false }) tbl_mstapplicantworkreferences: Ng2SmartTableComponent;
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];

  city_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

  @Output() project = new EventEmitter<object>();


  mstapplicantworkreferences_visiblelist: any;
  mstapplicantworkreferences_hidelist: any;

  Deleted_mstapplicantworkreference_IDs: string = "";
  mstapplicantworkreferences_ID: string = "5";
  mstapplicantworkreferences_selectedindex: any;
  ShowTableslist: any;
  pkcol: any;
  myDate: any;
  bmyrecord: boolean = false;
  showDateError: boolean;
  fromdate: Date;
  todate: Date;
  hidelist: any = [];
  objvalues: any = [];
  viewHtml: any = '';//stores html view of the screen
  applicantid_List: DropDownValues[];
  skills_results: DropDownValues[];
  skills_List: any[] = [];

  IsApplicant: boolean;
  IsAdmin: boolean;
  bSingleRecord: boolean;
  showSkillDetails_input: boolean = false;
  isSubmitted: boolean = false;
  showview: boolean = false;//view or edit mode

  applicantid: any;
  data: any;
  formid: any;
  referencecountres: any;
  countarray: any = [];
  acceptcount: string;
  r1: any;
  r2: any;
  r3: any;
  maxDate = undefined;
  maindata: any;
  city_List: DropDownValues[];
  companyList: DropDownValues[];

  showMobileDetectskill: boolean = false;
  showWebviewDetect: boolean = true;
  isMobile: any;
  showButton: any;
  buttonview: boolean;
  careerIDarray: any = [];
  getCareer: any = [];
  companyListArray: any = [];


  constructor(
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private mstapplicantworkreference_service: mstapplicantworkreferenceService,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private sharedService: SharedService,
    private fb: FormBuilder, private mstapplicantcareerdetail_service: mstapplicantcareerdetailService,
    private sessionService: SessionService,
    private toastr: ToastService, private datePipe: DatePipe,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private mstapplicantreferencerequestService: mstapplicantreferencerequestService,
  ) {
    var date = new Date()
    this.myDate = this.datePipe.transform(date);
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }
    this.pkcol = this.data.maindatapkcol;
    this.applicantid = localStorage.getItem('applicantid');
    this.showButton = this.data.showButton;

    this.mstapplicantworkreference_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
      applicantiddesc: [null],
      workreferenceid: [null],
      companyname: [null],
      worktopic: [null, [Validators.required]],
      workdescription: [null, [Validators.required]],
      referenceurl: [null],
      remarks: [null],
      requestid: [null],
      attachment: [null],
      fromdate: [null],
      todate: [null],
      locationdesc: [null],
      // location: [null],
      locationid: [null],
      status: [null],
      skills: [null, [Validators.required]],
      skilldesc: [null],
      statusdesc: [null],
    });
  }
  async ngOnInit() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.showMobileDetectskill = true;
      this.showWebviewDetect = false;
      /* your code here */
    }

    if (this.showButton == true) {
      this.buttonview = true;
    }

    this.Set_mstapplicantworkreferences_TableConfig();

    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
    this.FillData();
    // this.get_companyName();

    let mstapplicantworkreferenceid = null;
    //copy the data from previous dialog
    this.viewHtml = ``;
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
    }
    this.formid = mstapplicantworkreferenceid;
    //alert(mstapplicantworkreferenceid);

    //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
    if (this.pkcol == null) {
      this.resetForm();
    }
    else {
      if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
      //get the record from api
      //foreign keys
    }
    this.getdefaultdata();
    this.mstapplicantworkreference_service.getskillsDetails(this.applicantid).then((res: any) => {
      console.log('skill res', res);
      this.skills_List = res;
    }).catch((err) => { this.spinner.hide(); });

    this.mstapplicantworkreference_service.getlocationDetails(this.applicantid).then((res: any) => {
      console.log('Location res', res.mstapplicantgeographypreference);
      this.city_List = res.mstapplicantgeographypreference as DropDownValues[];
    }).catch((err) => { this.spinner.hide(); });

    this.get_companyName();

    const current = new Date();
    this.maxDate = {
      year: current.getFullYear(),
      month: current.getMonth() + 1,
      day: current.getDate()
    };

  };

  getdefaultdata() {
    this.mstapplicantworkreference_service.getDefaultData().then(res => {

      this.applicantid_List = res.list_applicantid.value;
      // this.skills_List = res.list_skills.value;
    }).catch((err) => { this.spinner.hide(); });
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
      for (let j = 0; j < this.mstapplicantworkreference_Form.get('skills').value.length; j++) {
        if ((this.skills_List[i] as any).value.toString() == this.mstapplicantworkreference_Form.get('skills').value[j].toString()) {
          skillsdescription.push((this.skills_List[i] as any));
        }
      }
    }
    this.mstapplicantworkreference_Form.patchValue({ skills: skillsdescription });
  }

  get_companyName() {
    this.mstapplicantworkreference_service.get_mstapplicantworkreferences_companyList(this.applicantid).then(res => {
      console.log(res);
      this.companyList = res as DropDownValues[];
    })
  }

  search_skills(event) {
    this.skills_results = this.skills_List.filter(v => v.label.toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
  }

  skill_onchange(event: any) {
    let e = event.value;
    this.mstapplicantworkreference_Form.patchValue({ skilldesc: event.options[event.options.selectedIndex].text });
  }


  onSelected_city(cityDetail: any) {

    console.log("cityDetail", cityDetail);


    if (cityDetail.cityid && cityDetail.city) {
      this.mstapplicantworkreference_Form.patchValue({
        location: cityDetail.cityid,
        locationdesc: cityDetail.city,
      });

      this.mstapplicantworkreference_service.getList(cityDetail.cityid).then((res: any) => {
        this.city_List = res as DropDownValues[]
      }).catch((err) => {
        this.spinner.hide();
      });
    }
  }

  onChange_companyList(event: any) {
    this.mstapplicantworkreference_Form.patchValue({ companyname: event.options[event.options.selectedIndex].text });
  }
  async PopulateScreen(pkcol: any) {
    this.spinner.show();
    this.mstapplicantworkreference_service.get_mstapplicantworkreferences_ByEID(pkcol).then(res => {
      this.spinner.hide();
      this.formData = res.mstapplicantworkreference;
      let formproperty = res.mstapplicantworkreference.formproperty;
      if (formproperty && formproperty.edit == false) this.showview = true;
      this.pkcol = res.mstapplicantworkreference.pkcol;
      this.formid = res.mstapplicantworkreference.workreferenceid;
    }).catch((err) => { });
  }

  addSkills() {
    this.showSkillDetails_input = true;
  };
  skillClose() {
    this.mstapplicantworkreference_Form.reset();
    this.showSkillDetails_input = false;
  };

  onSubmitAndWait() {
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

  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.mstapplicantworkreference_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstapplicantworkreference_Form.getRawValue();
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    await this.sharedService.upload(this.fileAttachmentList);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
    this.objvalues.push(obj);
    this.dialogRef.close(this.objvalues);
  }

  onSubmit() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  };

  async onSubmitData(bclear: any) {
    debugger
    this.isSubmitted = true;
    let strError = "";
    if (!this.mstapplicantworkreference_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }

    if (strError != "") return this.sharedService.alert(strError);

    this.formData = this.mstapplicantworkreference_Form.getRawValue();


    this.formData.fromdate = new Date(this.mstapplicantworkreference_Form.get('fromdate').value ? this.ngbDateParserFormatter.format(this.mstapplicantworkreference_Form.get('fromdate').value) + '  UTC' : null);

    if (this.mstapplicantworkreference_Form.value.currentlyworking == true) {
      this.formData.todate = new Date()
    } else {
      this.formData.todate = new Date(this.mstapplicantworkreference_Form.get('todate').value ? this.ngbDateParserFormatter.format(this.mstapplicantworkreference_Form.get('todate').value) + '  UTC' : null);
    }

    this.formData.skills = null;
    this.formData.applicantid = this.applicantid;

    if (this.formData.fromdate > this.formData.todate) {
      this.showDateError = true;
      return;
    } else {

      // this.formData.applicantid = this.applicantid;
      if (this.mstapplicantworkreference_Form.get('skills').value != null) this.formData.skillsstring = JSON.stringify(this.getSkills(this.mstapplicantworkreference_Form.get('skills').value));
      this.spinner.show();
      this.mstapplicantworkreference_service.saveOrUpdate_mstapplicantworkreferences(this.formData).subscribe(
        async res => {
          debugger
          this.spinner.hide();
          this.toastr.addSingle("success", "", "Successfully saved");
          this.sessionService.setItem("attachedsaved", "true")
          this.mstapplicantworkreference_Form.reset();
          this.objvalues.push((res as any).mstapplicantworkreference);
          this.ngOnInit();
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
              this.objvalues.push((res as any).mstapplicantworkreference);
              this.dialogRef.close(this.objvalues);
            }
            else {
              // this.FillData(res);
            }
          }
          this.mstapplicantworkreference_Form.markAsUntouched();
          this.mstapplicantworkreference_Form.markAsPristine();
        },
        err => {
          this.spinner.hide();
          this.toastr.addSingle("error", "", err.error);
        })
    }
  }

  async onSubmitWithProject(bclear: any) {

    this.mstapplicantreferencerequestService.get_mstapplicantworkreference_ByApplicantID(this.applicantid).then(res => {
       if (res.mstapplicantworkreference.length > 0) {

        let project = {
          addproject : true,
        }
        this.project.emit(project);

      } else {
        let project = {
          skipproject : true,
        }
        this.project.emit(project);
        return
      }
    });
  };

  skip_details() {
    // this.project.emit(true);
  }


  resetForm() {
    if (this.mstapplicantworkreference_Form != null)
      this.mstapplicantworkreference_Form.reset();
    this.mstapplicantworkreference_Form.patchValue({
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
            this.mstapplicantworkreference_Form.patchValue({ "fromdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
          else if (key == "todate")
            this.mstapplicantworkreference_Form.patchValue({ "todate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });

          else if (ctrltype == "string") {
            this.mstapplicantworkreference_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicantworkreference_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicantworkreference_Form.controls[key] != undefined) {
                this.mstapplicantworkreference_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }

  mstapplicantworkreferenceshtml() {
    let ret = "";
    ret += `
        <table class="table table-hover workdetails_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr style="word-break: break-word;">
            <th style="white-space: break-spaces;width:11%;">##companyname##</th>
            <th style="white-space: break-spaces;width:11%;">##worktopic##</th>
            <th style="white-space: break-spaces;width:11%;">##workdescription##</th>
            <th style="white-space: break-spaces;width:11%;"><a href="https://##referenceurl##" target="_blank">##referenceurl##</a></th>
            <th style="white-space: break-spaces;width:11%;">##fromdate##</th>
            <th style="white-space: break-spaces;width:11%;">##todate##</th>
            <th style="white-space: break-spaces;width:10%;">##remarks##</th>
            <th style="white-space: break-spaces;width:11%;">##string_agg##</th>
            <th style="white-space: break-spaces;width:12%;">##locationdes##</th>
          </tr>
        </tbody>
      </table>
`;
    return ret;
  }
  mstapplicantworkreferenceshtml1() {
    let ret = "";
    ret += `
        <ul class="list-group" style="line-height: 15px;margin: 0px;">
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Company Name </span>: <label style="font-size: small;">##companyname##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Work Topic </span>: <label style="font-size: small;">##worktopic##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Reference URL :</span> <label style="font-size: small;"><a href="https://##referenceurl##" target="_blank">##referenceurl##</a></label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Work Description :</span> <label style="font-size: small;">##workdescription##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Remarks :</span> <label style="font-size: small;">##remarks##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">skills :</span> <label style="font-size: small;">##string_agg##</label></li>
  </ul>
`;
    return ret;
  }
  FillData() {
    this.mstapplicantreferencerequestService.get_mstapplicantworkreference_ByApplicantID(this.applicantid).then(res => {
      this.mstapplicantworkreference_menuactions = res.mstapplicantworkreference_menuactions;
      this.Set_mstapplicantworkreferences_TableConfig();
      this.mstapplicantworkreferences_LoadTable(res.mstapplicantworkreference);
    });
  };
  validate() {
    let ret = true;
    return ret;
  }

  Add_mstapplicantworkreference(event: any, workreferenceid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    this.getdefaultdata();
    this.mstapplicantworkreference_Form.reset();
    let add = false;
    if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
  }

  Edit_mstapplicantworkreference(event: any, workreferenceid: any, applicantid: any) {
    debugger
    this.showSkillDetails_input = true;
    let add = false;
    if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;

    console.log(event, event.data.workreferenceid, event.data.applicantid);
    this.mstapplicantworkreference_service.get_mstapplicantworkreferences_ByEID(event.data.pkcol).then((res: any) => {
      debugger
      this.mstapplicantworkreference_Form.patchValue({
        applicantid: res.mstapplicantworkreference.applicantid,
        applicantiddesc: res.mstapplicantworkreference.applicantiddesc,
        workreferenceid: res.mstapplicantworkreference.workreferenceid,
        worktopic: res.mstapplicantworkreference.worktopic,
        companyname: res.mstapplicantworkreference.companyname,
        workdescription: res.mstapplicantworkreference.workdescription,
        referenceurl: res.mstapplicantworkreference.referenceurl,
        fromdate: this.ngbDateParserFormatter.parse(res.mstapplicantworkreference.fromdate),
        todate: this.ngbDateParserFormatter.parse(res.mstapplicantworkreference.todate),
        remarks: res.mstapplicantworkreference.remarks,
        requestid: res.mstapplicantworkreference.requestid,
        skills: res.mstapplicantworkreference.skills,
        // location: res.mstapplicantworkreference.location,
        locationid: res.mstapplicantworkreference.locationid,
        location: res.mstapplicantworkreference.location,
        attachment: "[]",
        status: res.mstapplicantworkreference.status,
        statusdesc: res.mstapplicantworkreference.statusdesc,
      });
      setTimeout(() => {
        this.getSkillsDescription();
      }, 400);
    });
  }


  onDelete_mstapplicantworkreference(event: any, childID: number, i: number) {
    if (confirm('Do you want to delete this record?')) {
      this.spinner.show();
      this.mstapplicantreferencerequestService.delete_mstapplicantreferencerequest(childID).then(res => {
        this.mstapplicantreferencerequestService.get_mstapplicantworkreference_ByApplicantID(this.applicantid).then(res => {
          this.ngOnInit();
          this.spinner.hide();
          this.mstapplicantworkreferences_LoadTable(res);
        });
      })
    } else {
      return;
    }
  }
  mstapplicantworkreferences_settings: any;

  show_mstapplicantworkreferences_Checkbox() {
    if (this.tbl_mstapplicantworkreferences.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'multi';
    this.tbl_mstapplicantworkreferences.source.initGrid();
  }
  delete_mstapplicantworkreferences_All() {
    this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'single';
  }
  show_mstapplicantworkreferences_Filter() {
    if (this.tbl_mstapplicantworkreferences.source.settings != null) this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'];
    this.tbl_mstapplicantworkreferences.source.initGrid();
  }
  async Set_mstapplicantworkreferences_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_mstapplicantworkreferences) {

      var clone = this.sharedService.clone(this.tbl_mstapplicantworkreferences.source.settings);
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantworkreferences_applicantid.value)), }, };
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantworkreferences_applicantid.value)), }, };
      this.tbl_mstapplicantworkreferences.source.settings = clone;
      this.tbl_mstapplicantworkreferences.source.initGrid();
    }
    this.bfilterPopulate_mstapplicantworkreferences = true;
  }
  async mstapplicantworkreferences_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_mstapplicantworkreferences_TableConfig() {
    this.mstapplicantworkreferences_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        edit: true, // true,
        delete: (this.IsApplicant || this.IsAdmin),
        position: 'right',
        // custom: this.mstapplicantworkreference_menuactions
        custom: this.mstapplicantworkreference_menuactions
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
            //debugger;;
            cell = this.mstapplicantworkreferenceshtml();
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              cell = this.mstapplicantworkreferenceshtml1();
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
  mstapplicantworkreferences_LoadTable(mstapplicantworkreferences = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantworkreferences_ID) >= 0) {
      if (this.tbl_mstapplicantworkreferences != undefined) this.tbl_mstapplicantworkreferences.source = new LocalDataSource();
      if (this.tbl_mstapplicantworkreferences != undefined) this.tbl_mstapplicantworkreferences.source.load(mstapplicantworkreferences as any as LocalDataSource);
      if (this.tbl_mstapplicantworkreferences != undefined) this.tbl_mstapplicantworkreferences.source.setPaging(1, 20, true);
    }
  }

  mstapplicantworkreferences_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.Add_mstapplicantworkreference(event, null, this.applicantid);
        break;
      case 'view':
        break;
      case 'edit':
        this.Edit_mstapplicantworkreference(event, event.data.workreferenceid, this.applicantid);
        break;
      case 'delete':
        this.onDelete_mstapplicantworkreference(event, event.data.workreferenceid, ((this.tbl_mstapplicantworkreferences.source.getPaging().page - 1) * this.tbl_mstapplicantworkreferences.source.getPaging().perPage) + event.index);
        this.tbl_mstapplicantworkreferences.source.refresh();
        break;
    }
  }
  mstapplicantworkreferences_onDelete(obj) {
    let workreferenceid = obj.data.workreferenceid;
    if (confirm('Are you sure to delete this record ?')) {
      this.mstapplicantreferencerequestService.delete_mstapplicantreferencerequest(workreferenceid).then(res =>
        this.mstapplicantworkreferences_LoadTable()
      );
    }
  }
  async onCustom_mstapplicantworkreferences_Action(event: any) {
    let referencesourcedetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Work Topic: ' + event.data.worktopic + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;white-space: break-spaces !important;"> Work Description: ' + event.data.workdescription + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Reference URL: ' + event.data.referenceurl + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Reference URL: ' + event.data.fromdate + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Reference URL: ' + event.data.todate + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Reference URL: ' + event.data.skills + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Reference URL: ' + event.data.locationdesc + '</li>'
      + '<li class="list-group-item remarks_p" style="background: #2D3C84 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>'

    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantworkreferences");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantreferencerequests") {
      this.dialog.open(mstapplicantreferencerequestComponent,
        {
          data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 320, requestmasterid: event.data.workreferenceid, ScreenType: 2, save: true }
        }
      ).onClose.subscribe(res => {
      });
    }

  }
  async onCustom_mstapplicantskilldetailsAttachment_Action(event: any, workreferenceid: any, applicantid: any) {

    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantworkreferences");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantworkreferences") {
      let add = false;
      if (event == null) add = true;
      let childsave = true;
      this.dialog.open(mstapplicantworkreferenceComponent,
        {
          width: '75% ',
          data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workreferenceid, applicantid, visiblelist: this.mstapplicantworkreferences_visiblelist, hidelist: this.mstapplicantworkreferences_hidelist, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
        if (res) {
          if (add) {
            for (let i = 0; i < res.length; i++) {
              this.tbl_mstapplicantworkreferences.source.add(res[i]);
            }
            this.tbl_mstapplicantworkreferences.source.refresh();
          }
          else {
            this.tbl_mstapplicantworkreferences.source.update(event.data, res[0]);
          }
        }
      });
    }
  }
  mstapplicantworkreferences_Paging(val) {
    this.tbl_mstapplicantworkreferences.source.setPaging(1, val, true);
  }

  handle_mstapplicantworkreferences_GridSelected(event: any) {
    this.mstapplicantworkreferences_selectedindex = this.tbl_mstapplicantworkreferences.source.findIndex(i => i.workreferenceid === event.data.workreferenceid);
  }
  Is_mstapplicantworkreferences_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantworkreferences_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  onClose() {
    this.dialogRef.close();
  }
}
