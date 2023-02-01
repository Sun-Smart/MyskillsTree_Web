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
import { mstapplicanteducationdetailService } from '../../../service/mstapplicanteducationdetail.service';
import { mstapplicanteducationdetailComponent } from './mstapplicanteducationdetail.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicanteducationdetail } from '../../../model/mstapplicanteducationdetail.model';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';


@Component({
  selector: 'app-applicanteducationgrid',
  template: `
    <div *ngIf="showWebviewDetect"  class="row form-group sticky1 educ_det_title" style=" background:#ebf3fc !important;color: #000;padding: 5px;">

        <div class="col-4">
    <h4 class="columns left" >{{'Education Details'}}</h4>
</div>

<div class="col-4">
                <ul class="nav navbar-nav1" style='display:none'>
                  <li class="dropdown">
                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
                      aria-expanded='false'> <span class='caret'></span></a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" [routerLink]=''
                          (click)="mstapplicanteducationdetails_route(null, 'create')"><i
                            class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
                    </ul>
                  </li>
                </ul>
</div>
<div class="col-4" style="text-align: end; margin: auto;">
                <!-- <ul class="rightside">
                    <a [routerLink]='' (click)="mstapplicanteducationdetails_route(null, 'create')"><i style="color:#fff !important;"
                       class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
                </ul> -->
                <!-- <a  [routerLink]='' (click)="mstapplicanteducationdetails_route(null, 'create')"> -->
                <!-- <button type="button" style="border-color: #fff !important;
                color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
                <button type="button" class="btn btn-outline-primary  popup-add-button"  [routerLink]='' (click)="mstapplicanteducationdetails_route(null, 'create')"
                 title = "Add Details">Add</button>

                 <!-- <button (click)="addSkills()" >Add 1</button> -->
                <!-- </a> -->

                <!-- <a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon" title = "Close"></i></a> -->

                <a  class="" [routerLink]='' (click)="onClose()"><img src="assets/mainmenuicons/icons_close.png" class="eduction_close" style="width: 20px;" title = "Close"/></a>
</div>

</div>


<div *ngIf="showMobileDetectskill" class="row form-group sticky1 educ_det_title" style=" background:#ebf3fc !important;color: #000;padding: 5px;">

        <div class="col-4">
    <h4 class="columns left" >{{'Education Details'}}</h4>
</div>

<div class="col-4">
                <ul class="nav navbar-nav1" style='display:none'>
                  <li class="dropdown">
                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
                      aria-expanded='false'> <span class='caret'></span></a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" [routerLink]=''
                          (click)="mstapplicanteducationdetails_route(null, 'create')"><i
                            class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
                    </ul>
                  </li>
                </ul>
</div>
<div class="col-4" style="text-align: end; margin: auto;">
                <!-- <ul class="rightside">
                    <a [routerLink]='' (click)="mstapplicanteducationdetails_route(null, 'create')"><i style="color:#fff !important;"
                       class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
                </ul> -->
                <!-- <a  [routerLink]='' (click)="mstapplicanteducationdetails_route(null, 'create')"> -->
                <!-- <button type="button" style="border-color: #fff !important;
                color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
                <button type="button" class="btn btn-outline-primary  popup-add-button"  [routerLink]='' (click)="mstapplicanteducationdetails_route(null, 'create')"
                 title = "Add Details">Add</button>

                 <!-- <button (click)="addSkills()" >Add 1</button> -->
                <!-- </a> -->

                <!-- <a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon" title = "Close"></i></a> -->

                <a  class="" [routerLink]='' (click)="onClose()"><img src="assets/mainmenuicons/icons_close.png" class="eduction_close" style="width: 20px;" title = "Close"/></a>
</div>

</div>

              <!-- suneel12  & modifed by muthu dated 19/12/22-->

            <form [formGroup]="mstapplicanteducationdetail_Form" *ngIf="showWebviewDetect">
              <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
                <thead>
                    <tr>


                    <th style="width: 10%;">Category</th>
                    <th style="width: 10%;">Sub Category</th>
                    <th style="width: 10%">Institution Name</th>
                    <th style="width: 10%;">Course Name</th>
                    <th style="width: 10%;">Percentage</th>
                    <th style="width: 10%;">Remarks</th>
                    <th style="width: 10%;">From Year</th>
                    <th style="width: 10%;">To Year</th>
                    <th style="width: 10%;">Skills</th>
                    <th style="width: 10%;">Action</th>
                    </tr>
                </thead>
                <tbody style="background: #f0f0f0;" *ngIf="showSkillDetails_input">
                <tr>


                    <!-- Category -->

                    <td>
                    <select  id="educationcategory" required (change)="educationcategory_onChange($event.target)"
                        formControlName="educationcategory" class="form-control">
                    <option [ngValue]="null" selected>-Select-</option>
                    <option *ngFor="let item of educationcategory_List" value="{{item.value}}">{{item.label}}</option>
                    </select>
                    </td>

                    <!-- Sub Category -->

                    <td>
                    <select  id="educationsubcategory" required
                        (change)="educationsubcategory_onChange($event.target)" formControlName="educationsubcategory"
                        class="form-control">
                    <option [ngValue]="null" selected>-Select-</option>
                    <option *ngFor="let item of educationsubcategory_List" value="{{item.value}}">{{item.label}}</option>
                    </select>
                    </td>

                    <!-- Institution Name -->

                    <td>
                    <input  id="institutionname" formControlName="institutionname" class="form-control" required>
                    </td>

                    <!-- Course Name -->

                    <td>
                    <input  id="coursename" required formControlName="coursename" class="form-control">
                    <!-- <app-field-error-display [displayError]="f.coursename.errors?.required"
                      errorMsg="Enter {{'Course Name' | translate}}">
                    </app-field-error-display> -->
                    </td>

                    <!-- Percentage -->

                    <td>
                     <input  id="percentage" formControlName="percentage" type="number"  class="form-control" required >
                    <span *ngIf = "show_percentageError" style = "color:red; font-size:10px;"> Percentage value should be below 100</span>
                    </td>

                    <!-- Remarks -->

                   <td>
                    <textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks" required></textarea>
                    <!-- <p-editor  id="remarks" formControlName="remarks" [style]="{  height: '320' }"></p-editor> -->
                    </td>

                    <!-- From Year -->
                    <td>
                    <input type="number" id="fromyear" formControlName="fromyear" class="form-control" required>
                    </td>
                    <!-- To Year -->

                    <td>
                    <input type="number" id="toyear" formControlName="toyear" class="form-control" required>
                    <span *ngIf = "show_YearError" style = "color:red; font-size:10px;"> To year should not be greater than from year</span>
                    </td>

                    <!--skill-->
                    <td>
                    <!--<select  id="skill" required (change)="skill_onchange($event.target)" formControlName="skill"
                    class="form-control">
                      <option [ngValue]="null" selected>-Select-</option>
                      <option *ngFor="let item of skill_list" value="{{item.value}}">{{item.label}}</option>
                    </select>-->

                    <p-autoComplete formControlName="skills" field="label" [multiple]="true" [suggestions]="skills_results"
                    (completeMethod)="search_skills($event)"></p-autoComplete><br/>
                    <label style="color:blue;font-size: 9px;"> (Optional)</label>
                    </td>

                    <!-- Submit & Close -->

                    <td class="field-add-close-button">
                    <i class="fa fa-plus-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

                    <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                    (click)="skillClose()"></i>
                    </td>
                </tr>
                </tbody>
                </table>
            </form>



            <form [formGroup]="mstapplicanteducationdetail_Form"  *ngIf="showMobileDetectskill">

            <div class="row" *ngIf="showSkillDetails_input" style="width: 320px;margin: 10px !important;">
<div class="col-md-12">
  <label>From Year</label>
  <input type="number" id="fromyear" formControlName="fromyear" class="form-control" required>
</div>
<div class="col-md-12">
  <label>Category</label>
  <select  id="educationcategory" required (change)="educationcategory_onChange($event.target)"
                        formControlName="educationcategory" class="form-control">
                    <option [ngValue]="null" selected>-Select-</option>
                    <option *ngFor="let item of educationcategory_List" value="{{item.value}}">{{item.label}}</option>
                    </select>
</div>
<div class="col-md-12">
  <label>Sub Category</label>
  <select  id="educationsubcategory" required
                        (change)="educationsubcategory_onChange($event.target)" formControlName="educationsubcategory"
                        class="form-control">
                    <option [ngValue]="null" selected>-Select-</option>
                    <option *ngFor="let item of educationsubcategory_List" value="{{item.value}}">{{item.label}}</option>
                    </select>
</div>
<div class="col-md-12">
  <label>Institution Name</label>
  <input  id="institutionname" formControlName="institutionname" class="form-control" required>
</div>
<div class="col-md-12">
  <label>Course Name</label>
  <input  id="coursename" required formControlName="coursename" class="form-control">
</div>
<div class="col-md-12">
  <label>Percentage</label>
  <input  id="percentage" formControlName="percentage" type="number"  class="form-control" required >
                    <span *ngIf="show_percentageError" style = "color:red; font-size:10px;"> Percentage value should be below 100</span>
</div>
<div class="col-md-12">
  <label>Remarks</label>
  <textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks" required></textarea>
</div>
<div class="col-md-12">
  <label>To Year</label>
  <input type="number" id="toyear" formControlName="toyear" class="form-control" required>
  <span *ngIf = "show_YearError" style = "color:red; font-size:10px;"> To year should not be greater than from year</span>
</div>
<div class="col-md-12">
  <label>Skills</label><br/>
  <p-autoComplete formControlName="skills" field="label" [multiple]="true" [suggestions]="skills_results"
                    (completeMethod)="search_skills($event)"></p-autoComplete>
<!-- <select  id="skill" required (change)="skill_onchange($event.target)" formControlName="skill"
                    class="form-control">
                      <option [ngValue]="null" selected>-Select-</option>
                      <option *ngFor="let item of skill_list" value="{{item.value}}">{{item.label}}</option>
                    </select> -->
</div>

<div class="col" style="position: relative;left: 120px;top: 7px;">

<i class="fa fa-plus-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

                    <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                    (click)="skillClose()"></i>
</div>
            </div>
            </form>

              <ng2-smart-table #tbl_mstapplicanteducationdetails
                (userRowSelect)="handle_mstapplicanteducationdetails_GridSelected($event)"
                [settings]="mstapplicanteducationdetails_settings"
                (custom)="onCustom_mstapplicanteducationdetails_Action($event)"
                (custom)="onCustom_mstapplicantskilldetailsAttachment_Action($event)"
                [source]="tbl_mstapplicanteducationdetails?.source?.data"
                (delete)="mstapplicanteducationdetails_route($event,'delete')"
                (deleteConfirm)="mstapplicanteducationdetails_route($event,'delete')"
                (create)="mstapplicanteducationdetails_route($event,'create')"
                (createConfirm)="mstapplicanteducationdetails_beforesave($event)"
                (edit)="mstapplicanteducationdetails_route($event,'edit')"
                (editConfirm)="mstapplicanteducationdetails_beforesave($event)">
              </ng2-smart-table>
    `,
  styles: [`
    @media only screen and (max-width: 600px) {
      h4.columns.left{
        white-space: nowrap;
        margin-top: 10px !important;
      }
      button.btn.btn-outline-primary.popup-add-button{
        /* position: relative !important;
        top: 10px !important;
        right: 30px !important; */
        position: absolute !important;
        right: 50px !important;
        bottom: -3px !important;
      }
      .row.form-group.sticky1.educ_det_title{
        height: 50px !important;
      }
      .eduction_close{
        /* width: 20px !important;
        position: relative !important;
        bottom: 15px !important;
        right: 7px !important; */
      }
      .educ_det_title{
        /* width: 650px !important; */
      }
      .edu_sub{
        white-space: nowrap !important;
      }
    }
    `]
})
export class mstapplicanteducationdetailgridComponent implements OnInit {

  mstapplicanteducationdetail_Form: FormGroup;

  isadmin = false;
  formData: mstapplicanteducationdetail;
  bfilterPopulate_mstapplicanteducationdetails: boolean = false;
  mstapplicanteducationdetail_menuactions: any = []
  @ViewChild('tbl_mstapplicanteducationdetails', { static: false }) tbl_mstapplicanteducationdetails: Ng2SmartTableComponent;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;

  mstapplicanteducationdetails_visiblelist: any;
  mstapplicanteducationdetails_hidelist: any;
  Deleted_mstapplicanteducationdetail_IDs: string = "";
  mstapplicanteducationdetails_ID: string = "9";
  mstapplicanteducationdetails_selectedindex: any;

  educationcategory_List: DropDownValues[];
  applicantid_List: DropDownValues[];
  referenceacceptance_List: DropDownValues[];
  educationsubcategory_List: DropDownValues[];
  skills_results: DropDownValues[];
  skills_List: any[] = [];


  ShowTableslist: any;
  pkcol: any;

  IsApplicant: boolean;
  IsAdmin: boolean;
  bSingleRecord: boolean;
  isSubmitted: boolean = false;
  showAttachment: boolean = false;

  applicantid: any;
  data: any;
  formid: any;
  maindata: any;
  mstapplicanteducationdetails_settings: {
    hideSubHeader: boolean; mode: string; selectMode: string; actions: {
      columnTitle: string; width: string; edit: boolean; // true,
      delete: boolean; position: string; custom: any;
    }; add: { addButtonContent: string; createButtonContent: string; cancelButtonContent: string; confirmCreate: boolean; }; edit: {
      editButtonContent: string; saveButtonContent: string; cancelButtonContent: string; confirmSave: boolean //Custom error functions
      ;
    }; delete: { deleteButtonContent: string; confirmDelete: boolean; }; columns: { colhtml: { title: string; type: string; filter: boolean; editor: { type: string; }; valuePrepareFunction: (cell: any, row: any) => SafeHtml; }; };
  };
  referencecountres: any;
  countarray: any = [];
  objvalues: any = [];
  hidelist: any = [];
  acceptcount: string;
  r1: any;
  r2: any;
  r3: any;
  showSkillDetails_input: boolean = false;
  showview: boolean = false;
  fromyear: any[];
  toyear: any[];
  percentage: any[];
  educationcategorydesc: any[];
  educationsubcategorydesc: any[];
  institutionname: any[];
  coursename: any[];
  remarks: any[];

  showDateError: boolean;
  showDateError1: boolean;
  showPercentError: boolean;

  fromyearCondition: any;
  toyearCondition: any
  test1: number;
  formValue: any;
  show_percentageError: boolean = false;
  show_YearError: boolean;
  showMobileDetectskill: boolean = false;
  showWebviewDetect: boolean = true;
  isMobile: any;
  constructor(
    private nav: Location,
    private translate: TranslateService,

    //dhana
    private mstapplicantmaster_service: mstapplicantmasterService,
    //end
    private router: Router,
    private themeService: ThemeService,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private fb: FormBuilder,
    private toastr: ToastService,
    private sanitizer: DomSanitizer,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
    private mstapplicanteducationdetail_service: mstapplicanteducationdetailService,
  ) {

    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }
    console.log(this.mstapplicanteducationdetail_menuactions);
  };

  get f() { return this.mstapplicanteducationdetail_Form.controls; }

  ngOnInit() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.showMobileDetectskill = true;
      this.showWebviewDetect = false;
      /* your code here */
    }
    this.Set_mstapplicanteducationdetails_TableConfig();

    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;

    this.pkcol = this.data.maindatapkcol;
    this.applicantid = this.data.applicantid;

    this.mstapplicanteducationdetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      // applicantid: localStorage.getItem('applicantid'),
      applicantid: [this.applicantid],
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
      remarks: [null, Validators.required],
      attachment: [null],
      status: [null],
      skills: [null],
      skilldesc: [null],
      statusdesc: [null],
    });

    this.FillData();
  };

  eduCategory() {
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

  skillClose() {
    this.mstapplicanteducationdetail_Form.reset();
    this.showSkillDetails_input = false;
    this.show_percentageError = false;
    this.show_YearError = false;
  };

  onSubmitAndWait() {
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
  };

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
      if(this.mstapplicanteducationdetail_Form.value.percentage == 100){
        this.show_percentageError = false;
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
          await this.sharedService.upload(this.fileAttachmentList);
          this.attachmentlist = [];
          if (this.fileattachment) this.fileattachment.clear();
          this.spinner.hide();

          this.toastr.addSingle("success", "", "Successfully saved");
          this.sessionService.setItem("attachedsaved", "true")
          this.objvalues.push((res as any).mstapplicanteducationdetail);
          this.mstapplicanteducationdetail_Form.reset();
          this.ngOnInit();
          this.show_percentageError = false;
          this.show_YearError = false;
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
              this.objvalues.push((res as any).mstapplicanteducationdetail);
              this.dialogRef.close(this.objvalues);
            }
            else {
              this.FillData();
            }
          }
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

  validate() {
    let ret = true;
    return ret;
  }

  resetForm() {
    if (this.mstapplicanteducationdetail_Form != null)
      this.mstapplicanteducationdetail_Form.reset();
    this.mstapplicanteducationdetail_Form.patchValue({
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
          else if (ctrltype == "string") {
            this.mstapplicanteducationdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicanteducationdetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicanteducationdetail_Form.controls[key] != undefined) {
                this.mstapplicanteducationdetail_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }

  mstapplicanteducationdetailshtml() {
    let ret = "";
    ret += `
        <div class='card1'>
        <table class="table table-hover educationdetail_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr class="tbody-res">
            <th style="white-space: break-spaces;width: 11%;" class="edu_cat">##educationcategorydesc##</th>
            <th style="white-space: break-spaces;width: 0%; !important;" class="edu_sub">##educationsubcategorydesc##</th>
            <th style="white-space: break-spaces;width: 10%;"  class="inst_name">##institutionname##</th>
            <th style="white-space: break-spaces;width: 11%;"  class="cour_name">##coursename##</th>
            <th style="white-space: break-spaces;width: 10%;"  class="percent">##percentage##</th>
            <!--<th scope="row" style="white-space: break-spaces;width: 10%;" class="ref_count">##referencecount##</th>-->
            <th style="white-space: break-spaces;width: 10%;"  class="edu_rm">##remarks##</th>
            <th style="white-space: break-spaces;width: 10%;" class="from_yr">##fromyear##</th>
            <th style="white-space: break-spaces;width: 10%;" class="to_yr">##toyear##</th>
            <th style="white-space: break-spaces;width: 10%;" class="to_yr">##string_agg##</th>
          </tr>
        </tbody>
      </table>
      </div>
`;
    return ret;
  }
  mstapplicanteducationdetailshtml1() {
    let ret = "";
    ret += `
  <ul class="list-group" style="line-height: 15px;margin: 0px;">

    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Category </span>: <label style="font-size: small;">##educationcategorydesc##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Sub Category :</span> <label style="font-size: small;">##educationsubcategorydesc##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Institution Name :</span> <label style="font-size: small;">##institutionname##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Course Name :</span> <label style="font-size: small;">##coursename##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Percentage :</span> <label style="font-size: small;">##percentage##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Remarks :</span> <label style="font-size: small;">##remarks##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">From Year </span>: <label style="font-size: small;">##fromyear##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">To Year :</span> <label style="font-size: small;">##toyear##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Skills :</span> <label style="font-size: small;">##string_agg##</label></li>
  </ul>
`;
    return ret;
  }

  FillData() {

    this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_ByApplicantID(this.applicantid).then(res => {
      this.mstapplicanteducationdetail_menuactions = res.mstapplicanteducationdetail_menuactions;
      this.Set_mstapplicanteducationdetails_TableConfig();
      this.mstapplicanteducationdetails_LoadTable(res.mstapplicanteducationdetail);
    });
  }

  Add_mstapplicanteducationdetail(event: any, educationid: any, applicantid: any) {

    this.showSkillDetails_input = true;
    this.ngOnInit();
    this.eduCategory();
    let add = false;
    if (event == null) add = true;

  }
  Edit_mstapplicanteducationdetail(event: any, educationid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    let add = false;
    if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.eduCategory();
    console.log(event, educationid, applicantid);
    this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_ByEID(event.data.pkcol).then(res => {
      console.log(res);
      this.mstapplicanteducationdetail_Form.patchValue({
        applicantid: res.mstapplicanteducationdetail.applicantid,
        applicantiddesc: res.mstapplicanteducationdetail.applicantiddesc,
        educationid: res.mstapplicanteducationdetail.educationid,
        educationcategory: res.mstapplicanteducationdetail.educationcategory,
        educationcategorydesc: res.mstapplicanteducationdetail.educationcategorydesc,
        educationsubcategory: res.mstapplicanteducationdetail.educationsubcategory,
        educationsubcategorydesc: res.mstapplicanteducationdetail.educationsubcategorydesc,
        coursename: res.mstapplicanteducationdetail.coursename,
        institutionname: res.mstapplicanteducationdetail.institutionname,
        fromyear: res.mstapplicanteducationdetail.fromyear,
        toyear: res.mstapplicanteducationdetail.toyear,
        percentage: res.mstapplicanteducationdetail.percentage,
        requestid: res.mstapplicanteducationdetail.requestid,
        referenceacceptance: res.mstapplicanteducationdetail.referenceacceptance,
        referenceacceptancedesc: res.mstapplicanteducationdetail.referenceacceptancedesc,
        remarks: res.mstapplicanteducationdetail.remarks,
        skills: res.mstapplicanteducationdetail.skills,
        attachment: "[]",
        status: res.mstapplicanteducationdetail.status,
        statusdesc: res.mstapplicanteducationdetail.statusdesc,
      });
      setTimeout(() => {
        this.mstapplicanteducationdetail_service.getList_educationsubcategory(this.f.educationcategory.value).then(res => {
          this.educationsubcategory_List = res as DropDownValues[];
        });
        this.getSkillsDescription();
      }, 400);
      this.mstapplicanteducationdetail_menuactions = res.mstapplicanteducationdetail_menuactions;
    });
  }

  get_educationsubcategory() {
    if (this.f.educationcategory.value && this.f.educationcategory.value != "" && this.f.educationcategory.value != null)
      this.mstapplicanteducationdetail_service.getList_educationsubcategory(this.f.educationcategory.value).then(res => {
        this.educationsubcategory_List = res as DropDownValues[];
      });
  }

  // Old Code

  // AddOrEdit_mstapplicanteducationdetail(event: any, educationid: any, applicantid: any) {
  //     //   this.eduCategory();
  //   let add = false;
  //   if (event == null) add = true;
  //   let childsave = true;
  //   if (this.pkcol != undefined && this.pkcol != null) childsave = true;
  //   this.dialog.open(mstapplicanteducationdetailComponent,
  //     {
  //       data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, educationid, applicantid, visiblelist: this.mstapplicanteducationdetails_visiblelist, hidelist: this.mstapplicanteducationdetails_hidelist, ScreenType: 2 },
  //     }
  //   ).onClose.subscribe(res => {
  //     if (res) {
  //       if (add) {
  //         for (let i = 0; i < res.length; i++) {
  //           this.tbl_mstapplicanteducationdetails.source.add(res[i]);
  //         }
  //         this.tbl_mstapplicanteducationdetails.source.refresh();
  //       }
  //       else {
  //         this.tbl_mstapplicanteducationdetails.source.update(event.data, res[0]);
  //       }
  //     }
  //   });
  // }

  handle_mstapplicanteducationdetails_GridSelected(event: any) {
    this.mstapplicanteducationdetails_selectedindex = this.tbl_mstapplicanteducationdetails.source.findIndex(i => i.educationid === event.data.educationid);
  }

  onDelete_mstapplicanteducationdetail(event: any, childID: number, i: number) {
    console.log('event call');
    if (confirm('Do you want to delete this record?')) {
      this.mstapplicanteducationdetail_service.delete_mstapplicanteducationdetail(childID).then(res => {
        this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_ByApplicantID(this.applicantid).then(res => {
          this.ngOnInit();
          this.mstapplicanteducationdetails_LoadTable(res);
        });
      })
    } else {
      return;
    }
    // if (childID != null)
    //     this.Deleted_mstapplicanteducationdetail_IDs += childID + ",";
    // this.tbl_mstapplicanteducationdetails.source.data.splice(i, 1);
    //this.updateGrandTotal();
  }

  //start of Grid Codes mstapplicantskilldetails
  // mstapplicanteducationdetails_settings: any;

  show_mstapplicanteducationdetails_Checkbox() {
    //;
    if (this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'multi';
    this.tbl_mstapplicanteducationdetails.source.initGrid();
  }
  delete_mstapplicanteducationdetails_All() {
    this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'single';
  }
  show_mstapplicanteducationdetails_Filter() {
    setTimeout(() => {
      //  this.Set_mstapplicantskilldetails_TableDropDownConfig();
    });
    if (this.tbl_mstapplicanteducationdetails.source.settings != null) this.tbl_mstapplicanteducationdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicanteducationdetails.source.settings['hideSubHeader'];
    this.tbl_mstapplicanteducationdetails.source.initGrid();
  }
  show_mstapplicanteducationdetails_InActive() {
  }
  enable_mstapplicanteducationdetails_InActive() {
  }
  async Set_mstapplicanteducationdetails_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_mstapplicanteducationdetails) {

      var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_applicantid.value)), }, };
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_applicantid.value)), }, };
      this.tbl_mstapplicanteducationdetails.source.settings = clone;
      this.tbl_mstapplicanteducationdetails.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
      if (clone.columns['skillcategory'] != undefined) clone.columns['skillcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_educationcategory.value)), }, };
      if (clone.columns['skillcategory'] != undefined) clone.columns['skillcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_educationcategory.value)), }, };
      this.tbl_mstapplicanteducationdetails.source.settings = clone;
      this.tbl_mstapplicanteducationdetails.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
      if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_referenceacceptance.value)), }, };
      if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_referenceacceptance.value)), }, };
      this.tbl_mstapplicanteducationdetails.source.settings = clone;
      this.tbl_mstapplicanteducationdetails.source.initGrid();
    }
    this.bfilterPopulate_mstapplicanteducationdetails = true;
  }
  async mstapplicanteducationdetails_beforesave(event: any) {
    event.confirm.resolve(event.newData)

  }
  Set_mstapplicanteducationdetails_TableConfig() {
    this.mstapplicanteducationdetails_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        edit: true, // true,
        delete: (this.IsApplicant || this.IsAdmin),
        position: 'right',

        custom: this.mstapplicanteducationdetail_menuactions
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
            //;
            cell = this.mstapplicanteducationdetailshtml();
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              cell = this.mstapplicanteducationdetailshtml1();
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

            divrow["selfrating"] = "<div class='Stars' style='--rating:" + row['selfrating'] + "'></div>";
            return this.sharedService.HtmlValue(divrow, cell);
          },
        },
      },
    };
  }
  mstapplicanteducationdetails_LoadTable(mstapplicanteducationdetails = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicanteducationdetails_ID) >= 0) {
      if (this.tbl_mstapplicanteducationdetails != undefined) this.tbl_mstapplicanteducationdetails.source = new LocalDataSource();
      if (this.tbl_mstapplicanteducationdetails != undefined) this.tbl_mstapplicanteducationdetails.source.load(mstapplicanteducationdetails as any as LocalDataSource);
      if (this.tbl_mstapplicanteducationdetails != undefined) this.tbl_mstapplicanteducationdetails.source.setPaging(1, 20, true);
    }
  }
  mstapplicanteducationdetails_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {

      case 'create':
        this.Add_mstapplicanteducationdetail(event, null, this.applicantid);
        break;
      case 'view':
        break;
      case 'edit':
        this.Edit_mstapplicanteducationdetail(event, event.data.educationid, this.applicantid);
        break;
      // case 'delete':

      //     this.onDelete_mstapplicanteducationdetail(event, event.data.skillid, ((this.tbl_mstapplicanteducationdetails.source.getPaging().page - 1) * this.tbl_mstapplicanteducationdetails.source.getPaging().perPage) + event.index);
      //     this.tbl_mstapplicanteducationdetails.source.refresh();
      //     break;

      case 'delete':
        this.onDelete_mstapplicanteducationdetail(event, event.data.educationid,
          ((this.tbl_mstapplicanteducationdetails.source.getPaging().page - 1) * this.tbl_mstapplicanteducationdetails.source.getPaging().perPage) + event.index);
        this.tbl_mstapplicanteducationdetails.source.refresh();
        break;
    }
  }


  mstapplicanteducationdetails_onDelete(event: any, childID: number, i: number) {
    if (confirm('Do you want to delete this record?')) {
      this.mstapplicanteducationdetail_service.delete_mstapplicanteducationdetail(childID).then(res => {
        this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_ByApplicantID(this.applicantid).then(res => {
          this.mstapplicanteducationdetails_LoadTable(res);
        });
      })
    } else {
      return;
    }
    // let educationid = obj.data.educationid;
    // if (confirm('Are you sure to delete this record ?')) {
    //     this.mstapplicantmaster_service.delete_mstapplicantmaster(educationid).then(res =>
    //         this.mstapplicanteducationdetails_LoadTable(res)
    //     );
    // }
  }
  //for delete function not wokring

  // mstapplicanteducationdetails_onDelete(obj) {
  //     let educationid = obj.data.educationid;
  //     if (confirm('Are you sure to delete this record ?')) {
  //         this.mstapplicantmaster_service.delete_mstapplicantmaster(educationid).then(res =>
  //             this.mstapplicanteducationdetails_LoadTable()
  //         );
  //     }
  // }
  async onCustom_mstapplicanteducationdetails_Action(event: any) {

    //   this.dialog.open(mstapplicantreferencegridComponent, {
    //     width: '100% !important',
    //     height: 'auto !important',
    //     data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    //   })



    // let referencesourcedetails = 'Category: ' + event.data.educationcategorydesc + '<BR>' + 'Sub Category: ' + event.data.educationsubcategory + '<BR>'
    //     + 'Course: ' + event.data.coursename + '<BR>' + 'Institution: ' + event.data.institutionname + '<BR>' + 'From Year: ' + event.data.fromyear + '<BR>'
    //     + 'To Year: ' + event.data.toyear + '<BR>' + 'Percentage: ' + event.data.percentage + '<BR>' + 'Remarks: ' + event.data.remarks;

    let referencesourcedetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Category: ' + event.data.educationcategorydesc + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Sub Category: ' + event.data.educationsubcategorydesc + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Course: ' + event.data.coursename + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Institution: ' + event.data.institutionname + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> From Year: ' + event.data.fromyear + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> To Year: ' + event.data.toyear + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Percentage: ' + event.data.percentage + '</li>'
      + '<li class="list-group-item remarks_p" style="background: #2D3C84 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>'


    // let referencesourcedetails = 'Sub Category: ' + event.data.subcategoryiddesc + '<BR>'
    //  + 'Education Details: ' + event.data.skillcategorydesc + '<BR>'
    //   + 'Self Rating: ' + event.data.selfrating + '<BR>'
    //   + 'Remarks: ' + event.data.remarks;
    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicanteducationdetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantreferencerequests") {
      this.dialog.open(mstapplicantreferencerequestComponent,
        {
          data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 315, requestmasterid: event.data.educationid, ScreenType: 2, save: true }
          // data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 3, save: true }
        }
      ).onClose.subscribe(res => {
      });
    }
  };

  async onCustom_mstapplicantskilldetailsAttachment_Action(event: any, educationid: any, applicantid: any) {

    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicanteducationdetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicanteducationdetails") {
      let add = false;
      if (event == null) add = true;
      let childsave = true;
      if (this.pkcol != undefined && this.pkcol != null) childsave = true;
      this.dialog.open(mstapplicanteducationdetailComponent,
        {
          data: { showview: false, showAttachment: true, save: childsave, maindatapkcol: this.pkcol, event, educationid, applicantid, visiblelist: this.mstapplicanteducationdetails_visiblelist, hidelist: this.mstapplicanteducationdetails_hidelist, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
        if (res) {
          if (add) {
            for (let i = 0; i < res.length; i++) {
              this.tbl_mstapplicanteducationdetails.source.add(res[i]);
            }
            this.tbl_mstapplicanteducationdetails.source.refresh();
          }
          else {
            this.tbl_mstapplicanteducationdetails.source.update(event.data, res[0]);
          }
        }
      });
    }
  }
  mstapplicanteducationdetails_Paging(val) {
    //;
    this.tbl_mstapplicanteducationdetails.source.setPaging(1, val, true);
  }

  handle_mstapplicantskilldetails_GridSelected(event: any) {
    this.mstapplicanteducationdetails_selectedindex = this.tbl_mstapplicanteducationdetails.source.findIndex(i => i.skillid === event.data.skillid);
  }
  Is_mstapplicanteducationdetails_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicanteducationdetails_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  // mstapplicanteducationdetails_route(event: any, action: any) {
  //     //     var addparam = "";
  //     if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
  //         addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
  //     }

  //     switch (action) {
  //         case 'create':
  //             this.AddOrEdit_mstapplicanteducationdetail(event, null, this.formid);
  //             break;
  //         case 'view':
  //             break;
  //         case 'edit':
  //             this.AddOrEdit_mstapplicanteducationdetail(event, event.data.educationid, this.formid);
  //             break;
  //         case 'delete':
  //             this.onDelete_mstapplicanteducationdetail(event, event.data.educationid, ((this.tbl_mstapplicanteducationdetails.source.getPaging().page - 1) * this.tbl_mstapplicanteducationdetails.source.getPaging().perPage) + event.index);
  //             this.tbl_mstapplicanteducationdetails.source.refresh();
  //             break;
  //     }
  // }
  //end of Grid Codes mstapplicantskilldetails
  onClose() {
    // location.reload();
    this.dialogRef.close();
  }

}
