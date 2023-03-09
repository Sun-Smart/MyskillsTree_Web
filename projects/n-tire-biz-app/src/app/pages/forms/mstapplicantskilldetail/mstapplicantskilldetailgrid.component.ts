import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter, Output } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-biz-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";

import { mstapplicantskilldetail } from './../../../model/mstapplicantskilldetail.model';
import { mstapplicantskilldetailComponent } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.component';
import { mstapplicantskilldetailService } from './../../../service/mstapplicantskilldetail.service';

import { mstapplicantreferencerequest } from './../../../model/mstapplicantreferencerequest.model';
import { mstapplicantreferencerequestComponent } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component';
import { mstapplicantreferencerequestService } from './../../../service/mstapplicantreferencerequest.service';

//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';


@Component({
  selector: 'app-applicantskilldetailgrid',
  template: `
<div style = "float: left;width: 100%;height:100%;">
<div class="row skill_title" *ngIf="showWebviewDetect" style="background: #ebf3fc !important;
    color: #000;padding: 5px; height:45px;border: 1px solid #ebe9e9;width: 100%;">

  <div class="col-4" style="margin:auto;">
    <h4 class="form-group sticky1  columns left">{{'Skill set'}}</h4>
  </div>
  <div class="col-6"></div>
  <div class="col-2" style="text-align:right; margin:auto;display:flex;justify-content:space-evenly;">

      <button type="button" class="alert-success" (click)="mstapplicantskilldetails_route(null, 'create')" ><i
      class="fa fa-plus"></i> Add</button>

      <button type="button" class="alert-danger" (click)="onClose()" *ngIf = "buttonview"><i class="fa fa-close"></i> Close</button>
  </div>
  
</div>

<div class = "row">
<div class = "col-12"style = "padding:0;">
<form [formGroup]="mstapplicantskilldetail_Form" class="mobile_grid_view" *ngIf="showWebviewDetect">
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
    <thead class="skill-detailstable" style="">
      <tr>
        <th  style="width:10.5%;">Segments</th>
        <th  style="width:10.5%;">Skill Category</th>
        <th  style="width:10.5%;">Sub Category</th>
        <th  style="width:10.5%;">Self Rating</th>
        <th  style="width:10.5%;">Priority</th>
        <th  style="width:10.5%;" >Show/Hide</th>
        <th  style="width:10.5%;" >Referal Status</th>
        <th  style="width:12.5%;">Remarks</th>
        <th style="width:10%;text-align: center;">Action</th>
      </tr>
    </thead>
    <tbody style="background: #f0f0f0;" *ngIf="showSkillDetails_input">
      <tr>
        <!-- Segment Gategory -->
        <td>
        <select formControlName="segmentid" class="form-control" (change)="segmentcategory_onChange($event.target)">
            <option [ngValue]="null" [disabled]="true">-Select-</option>
            <option *ngFor="let item of Segmentcategory_list" value="{{item.value}}">{{item.label}}</option>
          </select>

          <input *ngIf="showinput1" class="form-control" id="segmentid" formControlName="segmentcategoryothers"
          type="text" style="margin: 5px 0">
        </td>

        <!-- Skill Category -->
        <td>
          <select class="form-control" formControlName="skillcategory" (change)="skillcategory_onChange($event.target)">
            <option value=null [disabled]="true">-Select-</option>
            <option *ngFor="let item of skillcategory_List" value="{{item.categoryid}}">{{item.name}}</option>
          </select>

          <input *ngIf="showinput2" class="form-control" id="skillcategory" formControlName="skillcategoryothers"
          type="text" style="margin: 5px 0">
        </td>

        <!-- SubCategory Id -->

        <td>
          <select class="form-control" formControlName="subcategoryid" (change)="subcategoryid_onChange($event.target)">
            <option value=null [disabled]="true">-Select-</option>
            <option *ngFor="let item of subcategoryid_List" value="{{item.subcategoryid}}">{{item.name}}</option>
          </select>

          <input *ngIf="showinput3" id="subcategoryid" class="form-control" formControlName="subcategoryidothers"
          type="text" style="margin: 5px 0">
        </td>

        <!-- Self Rating -->

        <td>
        <p-rating  id="selfrating" formControlName="selfrating" class="form-control">
        </p-rating>
        </td>

        <!-- Order Priority -->

        <td>
        <select id="orderpriority" formControlName="orderpriority"
         class="form-control" >
        <option [ngValue]="null">-Select-</option>
        <option value="1" >1</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        <option value="5" >5</option>-->
        </select>
        <small *ngIf="showOrderError" style="color:brown">Order Priority must be between 1 to 5</small>

        </td>

        <!-- Hide -->

        <td>
        <input type="checkbox" formControlName="showorhide" (change)="checkboxChanged($event)">
        </td>

        <!-- Referal Status -->

        <td></td>

        <!-- Remarks -->

        <td>
          <textarea name="w3review" rows="1" cols="4" class="form-control" formControlName="remarks"></textarea>
        </td>

      <!-- Add & Close -->

        <td class="field-add-close-button" >
        <i class="fa fa-check-square field-Add-button" aria-hidden="true"
        (click)="onSubmitAndWait(mstapplicantskilldetail_Form)"></i>

          <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
          (click)="skillClose()"></i>

        </td>
      </tr>
    </tbody>
  </table>
</form>
</div>


<br>

<div class="row skill_title" *ngIf="showMobileDetectskill" style="background: #ebf3fc !important;
    color: #000;padding: 5px; height:45px;border: 1px solid #ebe9e9;width: 100%;">

  <div class="col-4" style="margin:auto;">
    <h4 class="form-group sticky1  columns left">{{'Skill sets'}}</h4>
  </div>
  <div class="col-6"></div>
  <div class="col-2" style="text-align:right; margin:auto;">
    <button type="button" class="btn btn-outline-primary popup-add-button"
      (click)="mstapplicantskilldetails_route(null, 'create')">Add</button>
      <a  class="" [routerLink]='' (click)="onClose()"><img src="assets/mainmenuicons/icons_close.png" class="mobile_career_close" style="width: 20px;" title = "Close"/></a>
  </div>
</div>


<form [formGroup]="mstapplicantskilldetail_Form" class="mobile_grid_view" *ngIf="showMobileDetectskill">

<div class="row" *ngIf="showSkillDetails_input" style="width: 320px;margin: 10px !important;">
<label>Segment</label>
<select formControlName="segmentid" class="form-control col-md-12" (change)="segmentcategory_onChange($event.target)">
  <option [ngValue]="null" [disabled]="true">-Select-</option>
  <option *ngFor="let item of Segmentcategory_list" value="{{item.value}}">{{item.label}}</option>
</select>
<input *ngIf="showinput1" class="form-control" id="segmentid" formControlName="segmentcategoryothers"
          type="text" style="margin: 5px 0">

          <label>Skill Category</label>
          <select class="form-control" formControlName="skillcategory" (change)="skillcategory_onChange($event.target)">
            <option value=null [disabled]="true">-Select-</option>
            <option *ngFor="let item of skillcategory_List" value="{{item.categoryid}}">{{item.name}}</option>
          </select>

          <input *ngIf="showinput2" class="form-control" id="skillcategory" formControlName="skillcategoryothers"
          type="text" style="margin: 5px 0">

          <label>Sub Category</label>
          <select class="form-control" formControlName="subcategoryid" (change)="subcategoryid_onChange($event.target)">
            <option value=null [disabled]="true">-Select-</option>
            <option *ngFor="let item of subcategoryid_List" value="{{item.subcategoryid}}">{{item.name}}</option>
          </select>

          <input *ngIf="showinput3" id="subcategoryid" class="form-control" formControlName="subcategoryidothers"
          type="text" style="margin: 5px 0">

        <label>Self Rating</label>
        <p-rating  id="selfrating" formControlName="selfrating" class="form-control">
        </p-rating>

        <label>Order Priority</label>
        <select id="orderpriority" formControlName="orderpriority"
         class="form-control">
        <option value=null>-Select-</option>
        <option value="1" >1</option>
        <option value="2" >2</option>
        <option value="3" >3</option>
        <option value="4" >4</option>
        <option value="5" >5</option>-->
        </select>
        <small *ngIf="showOrderError" style="color:brown">Order Priority must be between 1 to 5</small>
         <label>Show/Hide</label>
        <input type="checkbox" formControlName="showorhide" (change)="checkboxChanged($event)">

        <label>Remarks</label>
        <textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks"></textarea>
        <div class="col" style="position: relative;left: 120px;top: 7px;">

        <i class="fa fa-plus-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait(mstapplicantskilldetail_Form)"></i>

          <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
          (click)="skillClose()"></i>
        </div>
</div>
</form>

<div class = "col-12" style="overflow-y: scroll;height: 390px;padding:0;">
<ng2-smart-table #tbl_mstapplicantskilldetails
  (userRowSelect)="handle_mstapplicantskilldetails_GridSelected($event)"
  [settings]="mstapplicantskilldetails_settings"
  (edit)="mstapplicantskilldetails_route($event,'edit')"
  (custom)="onCustom_mstapplicantskilldetails_Action($event)"
  (custom)="onCustom_mstapplicantskilldetailsAttachment_Action($event)"
  [source]="tbl_mstapplicantskilldetails?.source?.data"
  (delete)="mstapplicantskilldetails_route($event,'delete')"
  (deleteConfirm)="mstapplicantskilldetails_route($event,'delete')"
  (create)="mstapplicantskilldetails_route($event,'create')"
  (createConfirm)="mstapplicantskilldetails_beforesave($event)"
  (createConfirm)="mstapplicantskilldetails_beforesave($event)">
</ng2-smart-table>
</div>

<div class="col-12" style="display: flex;justify-content: end;margin: 10px auto;position:absolute;right:0; bottom : 5rem;" *ngIf = "!buttonview">
<button class="wizard-button" (click)="onSubmitWithEducation()"> Add Education</button>
</div>
</div>
    `,
  styleUrls: ['./mstapplicantskilldetailgrid.component.scss'],
})
export class mstapplicantskilldetailgridComponent implements OnInit {

  mstapplicantskilldetail_Form: FormGroup;

  isadmin = false;
  bfilterPopulate_mstapplicantskilldetails: boolean = false;
  mstapplicantskilldetail_menuactions: any = [];

  @Output() skills = new EventEmitter<boolean>();

  @ViewChild('tbl_mstapplicantskilldetails', { static: false }) tbl_mstapplicantskilldetails: Ng2SmartTableComponent;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;

  mstapplicantskilldetails_visiblelist: any;
  mstapplicantskilldetails_hidelist: any;

  Deleted_mstapplicantskilldetail_IDs: string = "";
  mstapplicantskilldetails_ID: string = "4";
  mstapplicantskilldetails_selectedindex: any;
  ShowTableslist: any;
  pkcol: any;

  IsApplicant: boolean;
  IsAdmin: boolean;
  bSingleRecord: boolean;

  showinput1: boolean = false;
  showinput2: boolean = false;
  showinput3: boolean = false;

  showSkillDetails_input: boolean = false;
  showskillhide: boolean = false;
  showview: boolean = false;

  Segmentcategory_list: DropDownValues[];
  skillcategory_List: DropDownValues[];
  subcategoryid_List: DropDownValues[];

  bmyrecord: boolean = false;
  hidelist: any = [];
  // applicantid: any;
  data: any;
  checkstar: any = [];
  starres: any;
  onestar: string;
  showstar: string;
  referencecountres: any;
  countarray: any = [];
  acceptcount: string;
  r1: any;
  r2: any;
  r3: any;
  getidd: any;
  getidd1: any;
  isSubmitted: boolean = false;
  referenceacceptancevisible: boolean = false;
  requestidvisible: boolean = false;
  formData: any;
  objvalues: any = [];
  maindata: any;
  getapp: any;
  formid: any;
  segment_ID_Code: any;
  skillsubcategory_Code: any;
  seg_id: any;
  getdata2: any;
  showMobileDetectskill: boolean = false;
  showWebviewDetect: boolean = true;
  isMobile: any;
  showOrderError: boolean = false;
  contentChecked: any;
  showButton: any;
  applicantid: any;
  buttonview: boolean;



  constructor(
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private mstapplicantskilldetail_service: mstapplicantskilldetailService,
    private fb: FormBuilder,
  ) {
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }
    this.showButton = this.data.showButton

  }
  get f() { return this.mstapplicantskilldetail_Form.controls; }

  ngOnInit() {
    debugger;
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.showMobileDetectskill = true;
      this.showWebviewDetect = false;
      /* your code here */
    }

    this.Set_mstapplicantskilldetails_TableConfig();

    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;

    this.pkcol = this.data.maindatapkcol;
    this.applicantid = localStorage.getItem('applicantid');

    console.log("this.applicantid ", this.applicantid);


    this.mstapplicantskilldetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.applicantid,
      applicantiddesc: [null],
      skillid: [null],
      skillcategory: [null, Validators.compose([Validators.required])],
      skillcategorydesc: [null],
      subcategoryid: [null, Validators.compose([Validators.required])],
      subcategoryiddesc: [null],
      segmentid: [null, Validators.compose([Validators.required])],
      segmentcategorydesc: [null],
      selfrating: [null],
      orderpriority: [null],
      showorhide: [null],
      remarks: [null],
      requestid: [null],
      referenceacceptance: [null],
      referenceacceptancedesc: [null],
      status: [null],
      statusdesc: [null],
      segmentcategoryothers: [null],
      skillcategoryothers: [null],
      subcategoryidothers: [null]
    });
    this.FillData();
    
    if (this.showButton == true) {
      this.buttonview = true;
    }

  };


  skillClose() {
    this.mstapplicantskilldetail_Form.reset();
    this.showSkillDetails_input = false;
  };

  ngAfterViewInit() {
  }

  getData() {
    this.mstapplicantskilldetail_service.getList_segmentcategory().then((res: any) => {
      this.Segmentcategory_list = res as DropDownValues[];
      this.skillcategory_List = [];
      this.subcategoryid_List = [];
    });
  };
  checkboxChanged(event) {
    console.log(event.target.checked);
    this.contentChecked = event.target.checked;
    if (event.target.checked == true && this.mstapplicantskilldetail_Form.value.orderpriority) {
      this.toastr.addSingle("error", "", "Skill set in hide status unable to given the order priority");
      return;
    }
  }
  segmentcategory_onChange(evt: any) {
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
      this.skillcategory_List = res as DropDownValues[];
      this.subcategoryid_List = [];
    });
  };

  skillcategory_onChange(evt: any) {
    let e = evt.value;
    this.getidd1 = e;
    if (this.getidd1 == "262") {
      this.showinput2 = true
    } else {
      this.showinput2 = false
    }
    this.mstapplicantskilldetail_Form.patchValue({
      subcategoryid: null
    });
    this.mstapplicantskilldetail_service.getList_subcategoryid2(e).then((res: any) => {
      this.subcategoryid_List = res as DropDownValues[]
    });
  };

  subcategoryid_onChange(evt: any) {
    let e = evt.value;
    this.getdata2 = e
    if (this.getdata2 == "512") {
      this.showinput3 = true
    } else {
      this.showinput3 = false
    }
    this.mstapplicantskilldetail_Form.patchValue({ subcategoryiddesc: evt.options[evt.options.selectedIndex].text, categoryid: this.getdata2 });
  };

  validate() {
    let ret = true;
    return ret;
  };

  resetForm() {
    if (this.mstapplicantskilldetail_Form != null)
      this.mstapplicantskilldetail_Form.reset();
    this.mstapplicantskilldetail_Form.patchValue({
    });
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
    if (this.mstapplicantskilldetail_Form.value.orderpriority > 5) {
      this.showOrderError = true;
      return;
    } else {
      this.showOrderError = false;
    }
    this.formData = this.mstapplicantskilldetail_Form.getRawValue();
    this.formData.applicantid = this.applicantid;
    if (this.contentChecked == true && this.mstapplicantskilldetail_Form.value.orderpriority) {
      console.log('this.contentChecked', this.contentChecked);
      this.toastr.addSingle("error", "", "Skill set in hide status unable to given the order priority");
      return;
    }
    this.spinner.show();
    this.mstapplicantskilldetail_service.saveOrUpdate_mstapplicantskilldetails(this.formData).subscribe(
      async (res: any) => {
        this.spinner.hide();
        if (res == "orderpriority already Exists") {
          this.toastr.addSingle("error", "", "Orderpriority already Exists");
          return;
        }
        else {
          await this.sharedService.upload(this.fileAttachmentList);
          this.attachmentlist = [];
          if (this.fileattachment) this.fileattachment.clear();
          this.spinner.hide();

          this.toastr.addSingle("success", "", "Successfully saved");
          this.skillcategory_List = [];
          this.subcategoryid_List = [];
          this.Segmentcategory_list = [];
          this.mstapplicantskilldetail_Form.markAsUntouched();
          this.mstapplicantskilldetail_Form.markAsPristine();
          this.ngOnInit();
          this.mstapplicantskilldetail_Form.reset();
          this.showSkillDetails_input = false;
          this.sessionService.setItem("attachedsaved", "true");
          let getapp = parseInt(localStorage.getItem('applicantid'));
          this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(getapp);
          this.objvalues.push((res as any).mstapplicantskilldetail);
          if (!bclear) this.showview = true;
          if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
          if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.dialogRef.close(this.objvalues);
            return;
          } else {
            if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
          }
          if (bclear) {
            this.resetForm();
          }
          else {
            if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
              this.objvalues.push((res as any).mstapplicantskilldetail);
              this.dialogRef.close(this.objvalues);
            }
            else {
              this.FillData();
            }
          }

          this.mstapplicantskilldetail_Form.markAsUntouched();
          this.mstapplicantskilldetail_Form.markAsPristine();
        }
      },
      err => {
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
      });
  }

  async onSubmitWithEducation(bclear: any) {
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(this.applicantid).then(res => {
      if (res.mstapplicantskilldetail.length > 0) {
        this.skills.emit(true);
      } else {
        this.toastr.addSingle("", "", "Add Your Skillset");
        return
      }
    });
  }
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
  }

  onSubmit() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(true);
    }
    else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
      this.onSubmitData(true);
    }
    else {
      this.onSubmitData(true);
    }
  }

  mstapplicantskilldetailshtml() {
    let ret = "";
    ret += `
    <table class="table table-hover skilldetails_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
    <tbody>
      <tr style="word-break: break-word;">
        <th style="white-space: break-spaces;width:12%;">##segmentdesc##&nbsp##segmentcategoryothers##</th>
        <th style="white-space: break-spaces;width:12%;">##skillcategorydesc##&nbsp##skillcategoryothers##</th>
        <th style="white-space: break-spaces;width:11%;">##subcategoryiddesc##&nbsp##subcategoryidothers##</th>
        <th style="white-space: break-spaces;width:12%;">##selfrating##</th>
        <th style="white-space: break-spaces;width:12%;">##orderpriority##</th>
        <th style="white-space: break-spaces;width:12%;">##showorhide##</th>
        <th style="white-space: break-spaces;width:13%;">##referencecount##</th>
        <th style="white-space: break-spaces;">##remarks##</th>
      </tr>
    </tbody>
  </table>
                `;
    return ret;
  }

  mstapplicantskilldetailshtml1() {
    let ret = "";
    ret += `
    <ul class="list-group" style="line-height: 15px;margin: 0px;">
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Segment </span>: <label style="font-size: small;">##segmentdesc##&nbsp##segmentcategoryothers##</label></li>
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Skill Category </span>: <label style="font-size: small;">##skillcategorydesc##&nbsp##skillcategoryothers##</label></li>
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Sub Category :</span> <label style="font-size: small;">##subcategoryiddesc##&nbsp##subcategoryidothers##</label></li>
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Self Rating</span> : ##selfrating##</li>
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Referal Status</span> : ##referencecount##</li>
      <li class="list-group-item" style="line-height: 17px;padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Remarks </span>: <label style="font-size: small;">##remarks##</label></li>
    </ul>
                `;
    return ret;
  }


  FillData() {

    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(this.applicantid).then(res => {

      this.mstapplicantskilldetail_menuactions = res.mstapplicantskilldetail_menuactions;
      this.Set_mstapplicantskilldetails_TableConfig();
      this.mstapplicantskilldetails_LoadTable(res.mstapplicantskilldetail);



    });
    setTimeout(() => {
      if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null) this.mstapplicantskilldetail_service.getList_subcategoryid2(this.f.skillcategory.value).then(res => {
        this.subcategoryid_List = res as DropDownValues[];
      }).catch((err) => { });

      if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null) this.mstapplicantskilldetail_service.getList_skillcategory2(this.f.segmentid.value).then(res => {
        this.skillcategory_List = res as DropDownValues[];
      }).catch((err) => { });

      if (this.f.segmentid.value == "166") {
        this.showinput1 = true
      };
      if (this.f.skillcategory.value == "262") {
        this.showinput2 = true
      };
      if (this.f.subcategoryid.value == "512") {
        this.showinput3 = true
      };


    });
  };

  // Muthu Code 16/12/2022

  Add_mstapplicantskilldetail(event: any, skillid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    this.mstapplicantskilldetail_Form.reset();
    this.getData();
    let add = false;
    if (event == null) add = true;
  }

  Edit_mstapplicantskilldetail(event: any, skillid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.getData();
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByEID(event.data.pkcol).then(res => {
      this.seg_id = event.data.segmentidvalue;
      this.mstapplicantskilldetail_Form.patchValue({

        applicantid: res.mstapplicantskilldetail.applicantid,
        applicantiddesc: res.mstapplicantskilldetail.applicantiddesc,
        skillid: res.mstapplicantskilldetail.skillid,
        skillcategory: res.mstapplicantskilldetail.skillcategory,
        skillcategorydesc: res.mstapplicantskilldetail.skillcategorydesc,
        subcategoryid: res.mstapplicantskilldetail.subcategoryid,
        subcategoryiddesc: res.mstapplicantskilldetail.subcategoryiddesc,

        segmentid: this.seg_id,
        segmentcategorydesc: res.mstapplicantskilldetail.segmentdesc,
        segmentcategoryothers: res.mstapplicantskilldetail.segmentcategoryothers,
        skillcategoryothers: res.mstapplicantskilldetail.skillcategoryothers,
        subcategoryidothers: res.mstapplicantskilldetail.subcategoryidothers,
        selfrating: res.mstapplicantskilldetail.selfrating,
        remarks: res.mstapplicantskilldetail.remarks,
        requestid: res.mstapplicantskilldetail.requestid,
        orderpriority: res.mstapplicantskilldetail.orderpriority,
        showorhide: res.mstapplicantskilldetail.showorhide,
        referenceacceptance: res.mstapplicantskilldetail.referenceacceptance,
        referenceacceptancedesc: res.mstapplicantskilldetail.referenceacceptancedesc,
        attachment: "[]",
        status: res.mstapplicantskilldetail.status,
        statusdesc: res.mstapplicantskilldetail.statusdesc,
      });
      this.segment_ID_Code = this.seg_id;
      this.skillsubcategory_Code = res.mstapplicantskilldetail.skillcategory;
      this.mstapplicantskilldetail_service.getList_skillcategory2(this.segment_ID_Code).then(res => {
        this.skillcategory_List = res as DropDownValues[];
        //suneel
        if (this.formData && this.formData.skillcategory) {
          this.mstapplicantskilldetail_Form.patchValue({
            skillcategory: this.formData.skillcategory,
            skillcategorydesc: this.formData.skillcategorydesc,
          });
        };
        setTimeout(() => {
          if (this.f.segmentid.value == "166") {
            this.showinput1 = true

          } else {
            this.showinput1 = false;
          };

          if (this.f.skillcategory.value == "262") {
            this.showinput2 = true
          } else {
            this.showinput2 = false;
          };

          if (this.f.subcategoryid.value == "512") {
            this.showinput3 = true
          } else {
            this.showinput3 = false
          };
          this.mstapplicantskilldetail_service.getList_subcategoryid2(this.skillsubcategory_Code).then(res => {
            this.subcategoryid_List = res as DropDownValues[];
            if (this.formData && this.formData.subcategoryid) {
              this.mstapplicantskilldetail_Form.patchValue({
                subcategoryid: this.formData.subcategoryid,
                subcategoryiddesc: this.formData.subcategoryiddesc,
              });
            }
          });
        }, 1000)
      }).catch((err) => {

      });


    });

  }

  AddOrEditsegmentcategory(masterdataid) {

    this.mstapplicantskilldetail_Form.get('segmentid').value,

      this.mstapplicantskilldetail_service.getList_segmentcategory().then(res => {
        this.Segmentcategory_list = res as DropDownValues[];
        //to null category and subcategory
        setTimeout(() => {
          if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null)
            this.mstapplicantskilldetail_service.getList_skillcategory2(this.f.segmentid.value).then(res =>
              this.skillcategory_List = res as DropDownValues[]);
        });
        setTimeout(() => {
          if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)
            this.mstapplicantskilldetail_service.getList_subcategoryid2(this.f.segmentid.value).then(res =>
              this.subcategoryid_List = res as DropDownValues[]);
        });
        //end
      }).catch((err) => {
      });
  }

  onDelete_mstapplicantskilldetail(event: any, childID: number, i: number) {
    if (confirm('Do you want to delete this record?')) {
      this.spinner.show();
      this.mstapplicantskilldetail_service.delete_mstapplicantskilldetail(childID).then(res => {
        this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(this.applicantid).then(res => {

          this.spinner.hide();
          this.ngOnInit();
          this.mstapplicantskilldetails_LoadTable(res);
        });
      })
    } else {
      return;
    }
  }

  //start of Grid Codes mstapplicantskilldetails
  mstapplicantskilldetails_settings: any;

  show_mstapplicantskilldetails_Checkbox() {
    if (this.tbl_mstapplicantskilldetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'multi';
    this.tbl_mstapplicantskilldetails.source.initGrid();
  }
  delete_mstapplicantskilldetails_All() {
    this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'single';
  }
  show_mstapplicantskilldetails_Filter() {
    setTimeout(() => {
      //  this.Set_mstapplicantskilldetails_TableDropDownConfig();
    });
    if (this.tbl_mstapplicantskilldetails.source.settings != null) this.tbl_mstapplicantskilldetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantskilldetails.source.settings['hideSubHeader'];
    this.tbl_mstapplicantskilldetails.source.initGrid();
  }
  async Set_mstapplicantskilldetails_TableDropDownConfig(res) {

    if (!this.bfilterPopulate_mstapplicantskilldetails) {

      var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_applicantid.value)), }, };
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_applicantid.value)), }, };
      this.tbl_mstapplicantskilldetails.source.settings = clone;
      this.tbl_mstapplicantskilldetails.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
      if (clone.columns['skillcategory'] != undefined) clone.columns['skillcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_skillcategory.value)), }, };
      if (clone.columns['skillcategory'] != undefined) clone.columns['skillcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_skillcategory.value)), }, };
      this.tbl_mstapplicantskilldetails.source.settings = clone;
      this.tbl_mstapplicantskilldetails.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
      if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_referenceacceptance.value)), }, };
      if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_referenceacceptance.value)), }, };
      this.tbl_mstapplicantskilldetails.source.settings = clone;
      this.tbl_mstapplicantskilldetails.source.initGrid();
    }
    this.bfilterPopulate_mstapplicantskilldetails = true;
  }
  async mstapplicantskilldetails_beforesave(event: any) {
    event.confirm.resolve(event.newData);
  }

  Set_mstapplicantskilldetails_TableConfig() {
    this.mstapplicantskilldetails_settings = {

      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      width: '80%',
      actions: {
        columnTitle: '',
        width: '300px',
        edit: true, // true,
        delete: (this.IsApplicant || this.IsAdmin),
        position: 'right',
        custom: this.mstapplicantskilldetail_menuactions
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
            debugger;
            console.log(row.showorhide);

            if (row.showorhide == true) {
              row.showorhide = "Hide";
            } else {
              row.showorhide = "Show";
            }


            let starrr = ['51', 'saS']
            console.log(starrr.join(''));

            cell = this.mstapplicantskilldetailshtml();
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              cell = this.mstapplicantskilldetailshtml1();
            }
            var divrow = JSON.parse(JSON.stringify(row));
            let showstr = "";

            if (row.selfrating == '1') {
              showstr = '★'
            } else if (row.selfrating == '2') {
              showstr = '★★'
            } else if (row.selfrating == '3') {
              showstr = '★★★'
            } else if (row.selfrating == '4') {
              showstr = '★★★★'
            } else if (row.selfrating == '5') {
              showstr = '★★★★★'
            }
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

            divrow["selfrating"] = "<div style='font-size: large !important;color:green;position: relative;left: 5%;'>" + showstr + "</div>";
            this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (this.isMobile) {
              divrow['referencecount'] = "<div style='position: relative;left: 61%;font-size: 17px;bottom: 8px;'>" + xyzyzyz + "</div>";
              divrow["selfrating"] = "<div style='font-size: large !important;color:green;position: relative;left: 60%;bottom: 9px;'>" + showstr + "</div>";
            }
            return this.sharedService.HtmlValue(divrow, cell);
          },
        },
      },
    };
  }
  mstapplicantskilldetails_LoadTable(mstapplicantskilldetails = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantskilldetails_ID) >= 0) {
      if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source = new LocalDataSource();
      if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source.load(mstapplicantskilldetails as any as LocalDataSource);
      if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source.setPaging(1, 20, true);
    }
  }

  mstapplicantskilldetails_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.Add_mstapplicantskilldetail(event, null, this.applicantid);
        break;
      case 'view':
        break;
      case 'edit':
        this.Edit_mstapplicantskilldetail(event, event.data.skillid, this.applicantid);
        break;
      case 'delete':
        this.onDelete_mstapplicantskilldetail(event, event.data.skillid, ((this.tbl_mstapplicantskilldetails.source.getPaging().page - 1) * this.tbl_mstapplicantskilldetails.source.getPaging().perPage) + event.index);
        this.tbl_mstapplicantskilldetails.source.refresh();
        break;
    }
  }
  mstapplicantskilldetails_onDelete(obj) {
    let skillid = obj.data.skillid;
    if (confirm('Are you sure to delete this record ?')) {
      this.mstapplicantskilldetail_service.delete_mstapplicantskilldetail(skillid).then(res => {
        this.mstapplicantskilldetails_LoadTable(res)
      }
      );
    }
  }

  async onCustom_mstapplicantskilldetails_Action(event: any) {

    let skillsdetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Sub Category: ' + event.data.subcategoryiddesc + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Skill Category: ' + event.data.skillcategorydesc + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Self Rating: ' + event.data.selfrating + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>'
    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantskilldetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantreferencerequests") {
      this.dialog.open(mstapplicantreferencerequestComponent,
        {
          data: { referencesourcedetails: skillsdetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 2, save: true }
        }
      ).onClose.subscribe(res => {
      });
    }

  };

  async onCustom_mstapplicantskilldetailsAttachment_Action(event: any, skillid: any, applicantid: any) {

    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantskilldetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantskilldetails") {

      let add = false;
      if (event == null) add = true;
      let childsave = true;
      if (this.pkcol != undefined && this.pkcol != null) childsave = true;
      this.dialog.open(mstapplicantskilldetailComponent,
        {
          width: '100% !important',
          data: { showAttachmentView: true, save: childsave, maindatapkcol: this.pkcol, event, skillid, applicantid, visiblelist: this.mstapplicantskilldetails_visiblelist, hidelist: this.mstapplicantskilldetails_hidelist, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
        if (res) {
          if (add) {
            for (let i = 0; i < res.length; i++) {
              this.tbl_mstapplicantskilldetails.source.add(res[i]);
            }
            this.tbl_mstapplicantskilldetails.source.refresh();
          }
          else {
            this.tbl_mstapplicantskilldetails.source.update(event.data, res[0]);
          }
        }
      });
    };
  }

  mstapplicantskilldetails_Paging(val) {
    this.tbl_mstapplicantskilldetails.source.setPaging(1, val, true);
  }

  handle_mstapplicantskilldetails_GridSelected(event: any) {
    this.mstapplicantskilldetails_selectedindex = this.tbl_mstapplicantskilldetails.source.findIndex(i => i.skillid === event.data.skillid);
  }
  Is_mstapplicantskilldetails_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantskilldetails_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes mstapplicantskilldetails
  onClose() {
    this.dialogRef.close();
  };
}
