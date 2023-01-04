import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
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
import { MstapplicantskilldetailsattachmentComponent } from '../mstapplicantskilldetailsattachment/mstapplicantskilldetailsattachment.component';


@Component({
  selector: 'app-applicantskilldetailgrid',
  //   template: `
  //     <h4 class="form-group sticky1  columns left"   style="background: #0368b7;
  //     color: #fff;padding: 5px;">{{'Skill Details'}}

  //     <ul class="nav navbar-nav1" style='display:none'>
  //       <li class="dropdown">
  //         <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
  //           aria-expanded='false'> <span class='caret'></span></a>
  //         <ul class="dropdown-menu">
  //           <li><a class="dropdown-item" [routerLink]=''
  //               (click)="mstapplicantskilldetails_route(null, 'create')"><i class="fa fa-plus"
  //                 aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
  //           <li> </li>
  //         </ul>
  //       </li>

  //     </ul>
  //     <ul class="rightside">
  //     <a  [routerLink]='' (click)="mstapplicantskilldetails_route(null, 'create')">
  //     <!-- <button type="button" style="border-color: #fff !important;
  //     color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
  //     <button type="button" class="btn btn-outline-primary" style="border-color: #fff !important;    color: #fff;
  //     margin-top: -17%;">Add</button>
  //     </a><a  class="" [routerLink]='' (click)="onClose()"><i  class="fa fa-times-circle close_common_icon"></i></a>
  //     </ul>
  //   </h4>
  //   <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  //   <thead>
  //           <tr>
  //           <th  style="width: 10.6%" class="col-2">Action</th>
  //             <th  style="width: 14%" class="col-2">Segments</th>
  //             <th  style="width: 14%" class="col-2">Skill Category</th>
  //             <th  style="width: 16%" class="col-2">Sub Category</th>
  //             <th  style="width: 13%" class="col-2">Self Rating</th>
  //             <th  style="width: 13%" class="col-2">Referral Status</th>
  //             <th  style="width: 21%" class="col-2">Remarks</th>
  //           </tr>
  //         </thead>
  // </table>
  //   <ng2-smart-table #tbl_mstapplicantskilldetails
  //     (userRowSelect)="handle_mstapplicantskilldetails_GridSelected($event)"
  //     [settings]="mstapplicantskilldetails_settings"
  //     (custom)="onCustom_mstapplicantskilldetails_Action($event)"
  //     [source]="tbl_mstapplicantskilldetails?.source?.data"
  //     (delete)="mstapplicantskilldetails_route($event,'delete')"
  //     (deleteConfirm)="mstapplicantskilldetails_route($event,'delete')"
  //     (create)="mstapplicantskilldetails_route($event,'create')"
  //     (createConfirm)="mstapplicantskilldetails_beforesave($event)"
  //     (edit)="mstapplicantskilldetails_route($event,'edit')"
  //     (createConfirm)="mstapplicantskilldetails_beforesave($event)"
  //   >
  //   </ng2-smart-table>
  //     `;



  //New code
  template: `
<div class="row" style="background: #ebf3fc !important;
    color: #000;padding: 5px; height:45px;border: 1px solid #ebe9e9;width: 100%;">

  <div class="col-4" style="margin:auto;">
    <h4 class="form-group sticky1  columns left">{{'Skill Details'}}

      <ul class="nav navbar-nav1" style='display:none'>
        <li class="dropdown">
          <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
            aria-expanded='false'> <span class='caret'></span></a>
          <ul class="dropdown-menu">
            <li><a class="dropdown-item" [routerLink]='' (click)="mstapplicantskilldetails_route(null, 'create')"><i
                  class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
            <li> </li>
          </ul>
        </li>
      </ul>
    </h4>
  </div>
  <div class="col-6"></div>
  <div class="col-2" style="text-align:right; margin:auto;">
    <!-- <button type="button"  [routerLink]='' (click)="addSkills()"  class="btn btn-outline-primary" style="border-color: #000 !important; color: #000; margin-right:15px;">Add</button> -->
    <button type="button" class="btn btn-outline-primary popup-add-button"
      (click)="mstapplicantskilldetails_route(null, 'create')">Add</button>
    <!-- <i  [routerLink]='' (click)="onClose()" class="fa fa-times-circle close_common_icon"></i> -->
    <img (click)="onClose()" src="assets/mainmenuicons/icons_close.png" class="closeButton" />

  </div>
</div>
<form [formGroup]="mstapplicantskilldetail_Form">

  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
    <thead class="skill-detailstable" style="">
      <tr>
        <th  style="width:185px;">Segments</th>
        <th  style="width:185px;">Skill Category</th>
        <th  style="width:185px;text-align: center;">Sub Category</th>
        <th  style="width:185px;text-align: center;">Self Rating</th>
        <th  style="width:185px;text-align: center;">Referal Status</th>
        <th  style="width:185px;text-align: center;">Remarks</th>
        <th style="width:185px;text-align: center;">Action</th>
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
        </td>

        <!-- Skill Category -->
        <td>
          <select class="form-control" formControlName="skillcategory" (change)="skillcategory_onChange($event.target)">
            <option value=null [disabled]="true">-Select-</option>
            <option *ngFor="let item of skillcategory_List" value="{{item.categoryid}}">{{item.name}}</option>
          </select>
        </td>

        <!-- SubCategory Id -->

        <td>
          <select class="form-control" formControlName="subcategoryid" (change)="subcategoryid_onChange($event.target)">
            <option value=null [disabled]="true">-Select-</option>
            <option *ngFor="let item of subcategoryid_List" value="{{item.subcategoryid}}">{{item.name}}</option>
          </select>
        </td>

        <!-- Self Rating -->

        <td>
        <!-- <label *ngIf="showview" class="labelview">{{f.selfrating?.value}}</label> -->
        <p-rating  id="selfrating" formControlName="selfrating" class="form-control">
        </p-rating>
        </td>

        <!-- Referal Status -->

        <td></td>

        <!-- Remarks -->

        <td>
          <textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks"></textarea>
          <!-- <p-editor  id="remarks" formControlName="remarks" [style]="{  height: '20' }"></p-editor> -->
        </td>


      <!-- Add & Close -->

        <td class="field-add-close-button" style="">

        <i class="fa fa-plus-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait(mstapplicantskilldetail_Form)"></i>
          <!-- <button type="button" class="btn btn-outline-primary"  (click)="onSubmitData(mstapplicantskilldetail_Form)"
          style="background: green;color: antiquewhite;padding: 5px;border: none;box-shadow: 1px 1px 1px 0px black;">Submit</button> -->

          <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
          (click)="skillClose()"></i>
          <!-- <button type="button" *ngIf="showSkillDetails_input"
            (click)="skillClose()"
            style="background: red;color: antiquewhite;padding: 3px 5px;border-radius: 6px;
            border: none;box-shadow: 1px 1px 1px 0px black;">Cancel</button> -->
        </td>
      </tr>
    </tbody>
  </table>
</form>
<ng2-smart-table #tbl_mstapplicantskilldetails
  (userRowSelect)="handle_mstapplicantskilldetails_GridSelected($event)"
  [settings]="mstapplicantskilldetails_settings"
  (custom)="onCustom_mstapplicantskilldetails_Action($event)"
  (custom)="onCustom_mstapplicantskilldetailsAttachment_Action($event)"
  [source]="tbl_mstapplicantskilldetails?.source?.data"
  (delete)="mstapplicantskilldetails_route($event,'delete')"
  (deleteConfirm)="mstapplicantskilldetails_route($event,'delete')"
  (create)="mstapplicantskilldetails_route($event,'create')"
  (createConfirm)="mstapplicantskilldetails_beforesave($event)" (edit)="mstapplicantskilldetails_route($event,'edit')"
  (createConfirm)="mstapplicantskilldetails_beforesave($event)">
</ng2-smart-table>
    `,
  styleUrls: ['./mstapplicantskilldetailgrid.component.scss'],
})
export class mstapplicantskilldetailgridComponent implements OnInit {

  mstapplicantskilldetail_Form: FormGroup;

  isadmin = false;
  bfilterPopulate_mstapplicantskilldetails: boolean = false;
  mstapplicantskilldetail_menuactions: any = []

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
  showview: boolean = false;

  Segmentcategory_list: DropDownValues[];
  skillcategory_List: DropDownValues[];
  subcategoryid_List: DropDownValues[];

  bmyrecord: boolean = false;
  hidelist: any = [];
  applicantid: any;
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



  constructor(
    private nav: Location,
    private translate: TranslateService,
    private mstapplicantmaster_service: mstapplicantmasterService,
    private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private sanitizer: DomSanitizer,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private mstapplicantskilldetail_service: mstapplicantskilldetailService,
    private fb: FormBuilder,
  ) {


    debugger;
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }
    console.log("this.mstapplicantskilldetail_Form", this.mstapplicantskilldetail_Form);
  }

  ngOnInit() {
    debugger;

    this.Set_mstapplicantskilldetails_TableConfig();
    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;

    this.pkcol = this.data.maindatapkcol;
    this.applicantid = this.data.applicantid;

    debugger;
    this.mstapplicantskilldetail_Form = this.fb.group({

      pk: [null],
      ImageName: [null],
      applicantid: this.sessionService.getItem('applicantid'),
      applicantiddesc: [null],
      skillid: [null],
      skillcategory: [null, Validators.compose([Validators.required])],
      skillcategorydesc: [null, Validators.compose([Validators.required])],
      subcategoryid: [null, Validators.compose([Validators.required])],
      subcategoryiddesc: [null, Validators.compose([Validators.required])],
      segmentid: [null, Validators.compose([Validators.required])],
      segmentcategorydesc: [null, Validators.compose([Validators.required])],
      selfrating: [null],
      remarks: [null],
      requestid: [null],
      referenceacceptance: [null],
      referenceacceptancedesc: [null],
      showorhide: [Boolean],
      attachment: [null],
      status: [null],
      statusdesc: [null],
      segmentcategoryothers: [null],
      skillcategoryothers: [null],
      subcategoryidothers: [null]
    });
    this.FillData();
    // this.getData()

  };


  get f() { return this.mstapplicantskilldetail_Form.controls; }


  skillClose() {
    this.mstapplicantskilldetail_Form.reset();
    this.showSkillDetails_input = false;
  };

  ngAfterViewInit() {
  }



  getData() {
    debugger
    this.mstapplicantskilldetail_service.getList_segmentcategory().then((res: any) => {
      this.Segmentcategory_list = res as DropDownValues[];
      this.skillcategory_List = [];
    });
  };

  segmentcategory_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.getidd = e
    this.mstapplicantskilldetail_Form.patchValue({
      subcategoryid:null,skillcategory:null

    })
    this.mstapplicantskilldetail_service.getList_skillcategory2(e).then((res: any) => {
      debugger;
      this.skillcategory_List = res as DropDownValues[];
    });
  };

  skillcategory_onChange(evt: any) {
    debugger
    let e = evt.value;
    this.getidd1 = e
    
    if (this.getidd1 == "262") {
      this.showinput2 = true
    } else {
      this.showinput2 = false
    }
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
    if (this.getdata2 == "411") {
      this.showinput3 = true
    } else {
      this.showinput3 = false
    }
    this.mstapplicantskilldetail_Form.patchValue({ subcategoryiddesc: evt.options[evt.options.selectedIndex].text, categoryid: this.getdata2 });
  }

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

    console.log("this.mstapplicantskilldetail_Form", this.mstapplicantskilldetail_Form);

    this.isSubmitted = true;
    let strError = "";
    this.formData = this.mstapplicantskilldetail_Form.getRawValue();
    debugger
    // if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    // this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    debugger
    this.spinner.show();
    this.mstapplicantskilldetail_service.saveOrUpdate_mstapplicantskilldetails(this.formData).subscribe(
      async (res: any) => {
        console.log(res);

        debugger
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
        // this.ngAfterViewInit();
        let getapp = parseInt(localStorage.getItem('applicantid'));
        this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(getapp);
        this.objvalues.push((res as any).mstapplicantskilldetail);
        if (!bclear) this.showview = true;
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
      },
      err => {
        debugger;
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      });
  }


  onSubmitAndWait() {
    debugger
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(false);

    }
    else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      // this.onSubmitDataDlg(false);

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
      // this.onSubmitDataDlg(true);
      this.onSubmitData(true);
    }
    else {
      this.onSubmitData(true);
    }
  }



  mstapplicantskilldetailshtml() {
    debugger
    let ret = "";
    ret += `
    <table class="table table-hover skilldetails_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
    <tbody>
      <tr>
        <th scope="row" style="width:185px;">##segmentdesc##&nbsp##segmentcategoryothers##</th>
        <th scope="row" style="width:185px;">##skillcategorydesc##&nbsp##skillcategoryothers##</th>
        <th scope="row" style="width:185px;">##subcategoryiddesc##&nbsp##subcategoryidothers##</th>
        <th scope="row" style="width:185px;">##selfrating##</th>
        <th scope="row" style="width:185px;">##referencecount##</th>
        <th scope="row" style="width:185px;">##remarks##</th>
      </tr>
    </tbody>
  </table>
                `;
    return ret;
  }

  FillData() {
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(this.applicantid).then(res => {
      this.mstapplicantskilldetail_menuactions = res.mstapplicantskilldetail_menuactions;
      this.Set_mstapplicantskilldetails_TableConfig();
      this.mstapplicantskilldetails_LoadTable(res.mstapplicantskilldetail);


      //Child Tables if any

    });

    // this.mstapplicantskilldetail_service.saveOrUpdate_mstapplicantskilldetails(this.formData).subscribe(
    //   async (res: any) => {
    //     this.formData = res.mstapplicantskilldetail;
    //     this.formid = res.mstapplicantskilldetail.skillid;
    //     this.pkcol = res.mstapplicantskilldetail.pkcol;
    //     this.bmyrecord = false;
    //     if ((res.mstapplicantskilldetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
    //     console.log(res);
    //     //console.log(res.order);
    //     //console.log(res.orderDetails);
    //     this.mstapplicantskilldetail_Form.patchValue({
    //       applicantid: res.mstapplicantskilldetail.applicantid,
    //       applicantiddesc: res.mstapplicantskilldetail.applicantiddesc,
    //       skillid: res.mstapplicantskilldetail.skillid,
    //       skillcategory: res.mstapplicantskilldetail.skillcategory,
    //       skillcategorydesc: res.mstapplicantskilldetail.skillcategorydesc,
    //       subcategoryid: res.mstapplicantskilldetail.subcategoryid,
    //       subcategoryiddesc: res.mstapplicantskilldetail.subcategoryiddesc,

    //       //suneel
    //       segmentid: res.mstapplicantskilldetail.segmentid,
    //       segmentcategorydesc: res.mstapplicantskilldetail.segmentdesc,

    //       segmentcategoryothers: res.mstapplicantskilldetail.segmentcategoryothers,
    //       skillcategoryothers: res.mstapplicantskilldetail.skillcategoryothers,
    //       subcategoryidothers: res.mstapplicantskilldetail.subcategoryidothers,

    //       selfrating: res.mstapplicantskilldetail.selfrating,
    //       remarks: res.mstapplicantskilldetail.remarks,
    //       requestid: res.mstapplicantskilldetail.requestid,
    //       showorhide: res.mstapplicantskilldetail.showorhide,
    //       referenceacceptance: res.mstapplicantskilldetail.referenceacceptance,
    //       referenceacceptancedesc: res.mstapplicantskilldetail.referenceacceptancedesc,
    //       attachment: "[]",
    //       status: res.mstapplicantskilldetail.status,
    //       statusdesc: res.mstapplicantskilldetail.statusdesc,
    //     });

    //     console.log(' this.mstapplicantskilldetail_Form', this.mstapplicantskilldetail_Form);

    //     this.referenceacceptancevisible = false;
    //     this.requestidvisible = false;
    //     //hide list
    //     if (res.visiblelist != undefined && res.visiblelist.indexOf("referenceacceptance") >= 0) this.referenceacceptancevisible = true;
    //     if (res.hidelist != undefined && res.hidelist.indexOf("referenceacceptance") >= 0) this.referenceacceptancevisible = false;
    //     if (res.visiblelist != undefined && res.visiblelist.indexOf("requestid") >= 0) this.requestidvisible = true;
    //     if (res.hidelist != undefined && res.hidelist.indexOf("requestid") >= 0) this.requestidvisible = false;
    //     this.mstapplicantskilldetail_menuactions = res.mstapplicantskilldetail_menuactions;
    //     if (this.mstapplicantskilldetail_Form.get('attachment').value != null && this.mstapplicantskilldetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicantskilldetail_Form.get('attachment').value);
    //     setTimeout(() => {
    //       if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null) this.mstapplicantskilldetail_service.getList_subcategoryid2(this.f.skillcategory.value).then(res => {
    //         this.subcategoryid_List = res as DropDownValues[];
    //       }).catch((err) => { console.log(err); });

    //       if (this.f.segmentid.value == "166") {
    //         this.showinput1 = true

    //       }
    //       if (this.f.skillcategory.value == "262") {
    //         this.showinput2 = true

    //       }
    //       if (this.f.subcategoryid.value == "411") {
    //         this.showinput3 = true

    //       }



    //       if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null) this.mstapplicantskilldetail_service.getList_skillcategory2(this.f.segmentid.value).then(res => {
    //         this.skillcategory_List = res as DropDownValues[];
    //       }).catch((err) => { console.log(err); });

    //     });
    //   });


  };

  // Muthu Code 16/12/2022

  Add_mstapplicantskilldetail(event: any, skillid: any, applicantid: any) {
    debugger

    this.showSkillDetails_input = true;
    this.mstapplicantskilldetail_Form.reset();
    this.ngOnInit();
    this.getData();
    let add = false;
    if (event == null) add = true;
    console.log();

  }

  Edit_mstapplicantskilldetail(event: any, skillid: any, applicantid: any) {
    debugger
    this.showSkillDetails_input = true;

    // let add = true;
    // if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    console.log(event, event.data.skillid, event.data.applicantid);
    this.getData();
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByEID(event.data.pkcol).then(res => {
      console.log(res);
      this.seg_id = event.data.segmentidvalue;
      this.mstapplicantskilldetail_Form.patchValue({

        applicantid: res.mstapplicantskilldetail.applicantid,
        applicantiddesc: res.mstapplicantskilldetail.applicantiddesc,
        skillid: res.mstapplicantskilldetail.skillid,
        skillcategory: res.mstapplicantskilldetail.skillcategory,
        skillcategorydesc: res.mstapplicantskilldetail.skillcategorydesc,
        subcategoryid: res.mstapplicantskilldetail.subcategoryid,
        subcategoryiddesc: res.mstapplicantskilldetail.subcategoryiddesc,

        //suneel
        // segmentid: res.mstapplicantskilldetail.segmentid,
        segmentid: this.seg_id,
        segmentcategorydesc: res.mstapplicantskilldetail.segmentdesc,

        segmentcategoryothers: res.mstapplicantskilldetail.segmentcategoryothers,
        skillcategoryothers: res.mstapplicantskilldetail.skillcategoryothers,
        subcategoryidothers: res.mstapplicantskilldetail.subcategoryidothers,

        selfrating: res.mstapplicantskilldetail.selfrating,
        remarks: res.mstapplicantskilldetail.remarks,
        requestid: res.mstapplicantskilldetail.requestid,
        showorhide: res.mstapplicantskilldetail.showorhide,
        referenceacceptance: res.mstapplicantskilldetail.referenceacceptance,
        referenceacceptancedesc: res.mstapplicantskilldetail.referenceacceptancedesc,
        attachment: "[]",
        status: res.mstapplicantskilldetail.status,
        statusdesc: res.mstapplicantskilldetail.statusdesc,
      });
      // this.segment_ID_Code = res.mstapplicantskilldetail.segmentid;
      this.segment_ID_Code = this.seg_id;
      this.skillsubcategory_Code = res.mstapplicantskilldetail.skillcategory;
      this.mstapplicantskilldetail_service.getList_skillcategory2(this.segment_ID_Code).then(res => {
        debugger
        this.skillcategory_List = res as DropDownValues[];
        //suneel
        if (this.formData && this.formData.skillcategory) {
          debugger
          this.mstapplicantskilldetail_Form.patchValue({
            skillcategory: this.formData.skillcategory,
            skillcategorydesc: this.formData.skillcategorydesc,
          });
        }
        //to null subcategory
        setTimeout(() => {
          if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)
            this.mstapplicantskilldetail_service.getList_skillcategory2(this.f.segmentid.value).then(res =>
              this.subcategoryid_List = res as DropDownValues[]);
        });

        setTimeout(() => {
          this.mstapplicantskilldetail_service.getList_subcategoryid2(this.skillsubcategory_Code).then(res => {
            debugger
            this.subcategoryid_List = res as DropDownValues[];
            debugger
            if (this.formData && this.formData.subcategoryid) {
              this.mstapplicantskilldetail_Form.patchValue({
                subcategoryid: this.formData.subcategoryid,
                subcategoryiddesc: this.formData.subcategoryiddesc,
              });
            }
          }
          );
        })
      }).catch((err) => {
        //console.log(err);
      });


    });

  }

  // Old Code


  // AddOrEdit_mstapplicantskilldetail(event: any, skillid: any, applicantid: any) {
  //   debugger
  //   let add = false;
  //   if (event == null) add = true;
  //   let childsave = true;
  //   if (this.pkcol != undefined && this.pkcol != null) childsave = true;

  //   this.dialog.open(mstapplicantskilldetailComponent,
  //     {
  //       data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, skillid, applicantid, visiblelist: this.mstapplicantskilldetails_visiblelist, hidelist: this.mstapplicantskilldetails_hidelist, ScreenType: 2 },
  //     }
  //   ).onClose.subscribe(res => {
  //     if (res) {
  //       if (add) {
  //         for (let i = 0; i < res.length; i++) {
  //           this.tbl_mstapplicantskilldetails.source.add(res[i]);
  //         }
  //         this.tbl_mstapplicantskilldetails.source.refresh();
  //       }
  //       else {
  //         this.tbl_mstapplicantskilldetails.source.update(event.data, res[0]);
  //       }
  //     }
  //   });
  // }

  // AddOrEditskillcategory(masterdataid) {
  //   debugger
  //   var segmentid = this.getidd
  //   let ScreenType = '2';
  //   this.dialog.open(mstcategoryComponent,
  //     {
  //       data: { segmentid: this.mstapplicantskilldetail_Form.get('segmentid').value, save: true, masterdatatypeid: 76, ScreenType: 2 }
  //       // data: { categoryid: this.mstapplicantskilldetail_Form.get('skillcategory').value, save: true, masterdatatypeid: 76, ScreenType: 2,segmentid:segmentid }
  //     }
  //   ).onClose.subscribe(res => {
  //     if (this.f.segmentid.value && this.f.segmentid.value != "" && this.f.segmentid.value != null)
  //       this.mstapplicantskilldetail_service.getList_skillcategory2(this.f.segmentid.value).then(res => {
  //         debugger
  //         this.skillcategory_List = res as DropDownValues[];
  //         //suneel
  //         if (this.formData && this.formData.skillcategory) {
  //           debugger
  //           this.mstapplicantskilldetail_Form.patchValue({
  //             skillcategory: this.formData.skillcategory,
  //             skillcategorydesc: this.formData.skillcategorydesc,
  //           });
  //         }
  //         //to null subcategory
  //         setTimeout(() => {
  //           if (this.f.skillcategory.value && this.f.skillcategory.value != "" && this.f.skillcategory.value != null)
  //             this.mstapplicantskilldetail_service.getList_subcategoryid2(this.f.segmentid.value).then(res =>
  //               this.subcategoryid_List = res as DropDownValues[]);
  //         });

  //         //end

  //       }).catch((err) => {
  //         //console.log(err);
  //       });
  //   });
  // }

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
        //console.log(err);
      });
  }

  onDelete_mstapplicantskilldetail(event: any, childID: number, i: number) {
    if (confirm('Do you want to delete this record?')) {
      this.mstapplicantskilldetail_service.delete_mstapplicantskilldetail(childID).then(res => {
        this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(this.applicantid).then(res => {
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
    //debugger;;
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
  show_mstapplicantskilldetails_InActive() {
  }
  enable_mstapplicantskilldetails_InActive() {
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
      actions: {
        columnTitle: '',
        width: '300px',
        edit: true, // true,
        delete: (this.IsApplicant || this.IsAdmin),
        position: 'right',
        custom: this.mstapplicantskilldetail_menuactions
      },
      // actions: {
      //   columnTitle: 'Action',
      //   width: '300px',
      //   edit: true, // true,

      //   delete: (this.IsApplicant || this.IsAdmin),
      //   referance: true,
      //   position: 'left',
      //   // custom:['<i class="nb-references"></i>'],
      //   custom: [{
      //     name: 'referance',
      //     title: `<i class="icon-references" aria-hidden="true"></i>`,
      //   }],
      // },
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
            let starrr = ['51', 'saS']
            console.log(starrr.join(''));

            // var blue = starrr.fontcolor("green")
            // console.log(blue)
            cell = this.mstapplicantskilldetailshtml();
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
            // row.referencecount = 0;
            // row.referenceacceptedcount = 0;
            // row.referencerejactedcount = 0;
            debugger
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
            // "<div class='Stars' style='--rating:" + showstr + "'></div>"
            divrow["selfrating"] = "<div style='font-size: large !important;color:green;position: relative;left: 19%;'>" + showstr + "</div>";
            return this.sharedService.HtmlValue(divrow, cell);
          },
        },
      },
    };
  }
  mstapplicantskilldetails_LoadTable(mstapplicantskilldetails = new LocalDataSource()) {
    debugger
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantskilldetails_ID) >= 0) {
      if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source = new LocalDataSource();
      if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source.load(mstapplicantskilldetails as any as LocalDataSource);
      if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source.setPaging(1, 20, true);
    }
  }

  mstapplicantskilldetails_route(event: any, action: any) {
    debugger
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
      // case 'referance':
      //     this.onDelete_mstapplicantskilldetail(event, event.data.skillid, ((this.tbl_mstapplicantskilldetails.source.getPaging().page - 1) * this.tbl_mstapplicantskilldetails.source.getPaging().perPage) + event.index);
      //     this.tbl_mstapplicantskilldetails.source.refresh();
      //     break;
    }
  }
  mstapplicantskilldetails_onDelete(obj) {
    let skillid = obj.data.skillid;
    if (confirm('Are you sure to delete this record ?')) {
      this.mstapplicantskilldetail_service.delete_mstapplicantskilldetail(skillid).then(res =>
        this.mstapplicantskilldetails_LoadTable(res)
      );
    }
  }

  // showRefreq() {
  //   this.dialog.open(mstapplicantreferencegridComponent, {
  //     width: '100% !important',
  //     height: 'auto !important',
  //     data: { ScreenType: 2, applicantid: this.applicantid, save: true }
  //   })
  // }
  async onCustom_mstapplicantskilldetails_Action(event: any) {
    debugger

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
          // data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 318, requestmasterid: event.data.referenceid, contactemailid: event.data.email, requestedcontact: event.data.referencename, ScreenType: 2, save: true }
          // data: { skillsdetails:skillsdetails,applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 2, save: true }
        }
      ).onClose.subscribe(res => {
      });
    }

  };

  async onCustom_mstapplicantskilldetailsAttachment_Action(event: any, skillid: any, applicantid: any) {
    debugger
    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantskilldetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantskilldetails") {

      let add = false;
      if (event == null) add = true;
      let childsave = true;
      if (this.pkcol != undefined && this.pkcol != null) childsave = true;
      this.dialog.open(mstapplicantskilldetailComponent,
        {
          width: '75% !important',
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
    //debugger;;
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
    // window.location.reload();
    this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    this.dialogRef.close();
  }



}
