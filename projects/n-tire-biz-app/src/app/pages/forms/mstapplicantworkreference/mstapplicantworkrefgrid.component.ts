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
import { mstapplicantworkreferenceComponent } from './mstapplicantworkreference.component';
import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';
import { mstapplicantworkreference } from '../../../model/mstapplicantworkreference.model';
import { mstapplicantworkreferenceService } from '../../../service/mstapplicantworkreference.service';
@Component({
    selector: 'app-applicantworkrefgrid',
    template: `
    <div *ngIf="showWebviewDetect" class="row form-group sticky1" style=" background: #ebf3fc; !important;color: #000;padding: 5px;">

    <div class="col-4">
    <h4 class="mobile_work_ref">{{'Projects'}}</h4>
</div>

<div class="col-4">
                <ul class="nav navbar-nav1" style='display:none'>
                  <li class="dropdown">
                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
                      aria-expanded='false'> <span class='caret'></span></a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" [routerLink]=''
                          (click)="mstapplicantworkreferences_route(null, 'create')"><i class="fa fa-plus"
                            aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
                    </ul>
                  </li>
                </ul>
</div>

<div class="col-4" style="text-align: end; margin: auto;">

                <!-- <a  [routerLink]='' (click)="mstapplicantworkreferences_route(null, 'create')"> -->
                <!-- <button type="button" style="border-color: #fff !important;
                color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
                <button type="button" class="btn btn-outline-primary popup-add-button" [routerLink]='' (click)="mstapplicantworkreferences_route(null, 'create')"
                title = "Add Details">Add</button>

                <!-- <button (click)="addSkills()">Add 1</button> -->
                <!-- </a> -->

                <!-- <a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon" title = "Close"></i></a> -->

                <a  class="" [routerLink]='' (click)="onClose()"><img src="assets/mainmenuicons/icons_close.png" class="work_ref_mobile" style="width: 20px;" title = "Close"/></a>

                <!--<ul class="rightside">
                <a  [routerLink]='' (click)="mstapplicantworkreferences_route(null, 'create')"><i
                style="color:#fff !important;"   class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
                </ul>-->
</div>
</div>

<div *ngIf="showMobileDetectskill" class="row form-group sticky1" style=" background: #ebf3fc; !important;color: #000;padding: 5px;">

    <div class="col-4">
    <h4 class="mobile_work_ref">{{'Projects'}}</h4>
</div>

<div class="col-4">
                <ul class="nav navbar-nav1" style='display:none'>
                  <li class="dropdown">
                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
                      aria-expanded='false'> <span class='caret'></span></a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" [routerLink]=''
                          (click)="mstapplicantworkreferences_route(null, 'create')"><i class="fa fa-plus"
                            aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
                    </ul>
                  </li>
                </ul>
</div>

<div class="col-4" style="text-align: end; margin: auto;">

                <!-- <a  [routerLink]='' (click)="mstapplicantworkreferences_route(null, 'create')"> -->
                <!-- <button type="button" style="border-color: #fff !important;
                color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
                <button type="button" class="btn btn-outline-primary popup-add-button" [routerLink]='' (click)="mstapplicantworkreferences_route(null, 'create')"
                title = "Add Details">Add</button>

                <!-- <button (click)="addSkills()">Add 1</button> -->
                <!-- </a> -->

                <!-- <a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon" title = "Close"></i></a> -->

                <a  class="" [routerLink]='' (click)="onClose()"><img src="assets/mainmenuicons/icons_close.png" class="work_ref_mobile" style="width: 20px;" title = "Close"/></a>

                <!--<ul class="rightside">
                <a  [routerLink]='' (click)="mstapplicantworkreferences_route(null, 'create')"><i
                style="color:#fff !important;"   class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
                </ul>-->
</div>
</div>

<form [formGroup]="mstapplicantworkreference_Form"  *ngIf="showWebviewDetect">
              <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
                <thead>
                    <tr>

                    <th style="width: 18%;">Company Name</th>
                    <th style="width: 15%;">Work Topic</th>
                    <th style="width: 15%">Reference Url</th>
                    <th style="width: 15%;">Work Description</th>
                    <th style="width: 15%;">Remarks</th>
                    <th style="width: 15%;">Skill</th>
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

                <!-- Reference URL -->

                    <td>
                    <input id="referenceurl" formControlName="referenceurl" class="form-control">

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

                <!-- Remarks -->

                    <td>
                    <textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks"></textarea>
                    </td>

                <!--skill-->
                    <td>
                    <!-- <select  id="skill" required
                    (change)="skill_onchange($event.target)" formControlName="skill" class="form-control">
                    <option [ngValue]="null" selected>-Select-</option>
                    <option *ngFor="let item of skill_list" value="{{item.value}}">{{item.label}}</option>
                    </select> -->

                    <p-autoComplete formControlName="skills" field="label" [multiple]="true" [suggestions]="skills_results"
                    (completeMethod)="search_skills($event)"></p-autoComplete>
                    
                    </td>



                <!-- Add & Close -->

                    <td class="field-add-close-button" style="">
                        <!-- Add -->
                        <i class="fa fa-plus-square field-Add-button" aria-hidden="true" (click)="onSubmitData(mstapplicantworkreference_Form)"></i>
                        <!-- Close -->
                        <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                        (click)="skillClose()"></i>
                    </td>
                </tr>
            </tbody>
                </table>
</form>


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
  <label>Remarks</label>
<textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks"></textarea>
</div>
<div class="col-md-12">
  <label>Skill</label>
<select  id="skill" required
                    (change)="skill_onchange($event.target)" formControlName="skill" class="form-control">
                    <option [ngValue]="null" selected>-Select-</option>
                    <option *ngFor="let item of skill_list" value="{{item.value}}">{{item.label}}</option>
                    </select>

</div>
<div class="col" style="position: relative;left: 120px;top: 7px;">

<i class="fa fa-plus-square field-Add-button" aria-hidden="true" (click)="onSubmitData(mstapplicantworkreference_Form)"></i>
                        <!-- Close -->
                        <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                        (click)="skillClose()"></i>
</div>

</div>
</form>
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
    `,
    styles: [`
    @media only screen and (max-width: 600px) {
            .mobile_work_ref{
              margin-top: 10px !important;
            }
            button.btn.btn-outline-primary.popup-add-button{
              /* position: relative !important;
              top: 13px !important;
              right: 40px !important; */
              position: absolute !important;
              right: 50px !important;
              bottom: -3px !important;
            }
            .row.form-group.sticky1{
              height: 50px !important;
            }
            .work_ref_mobile{
              /* width: 20px !important;
              position: relative !important;
              bottom: 14px !important;
              right: 10px !important; */
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
    mstapplicantworkreferences_visiblelist: any;
    mstapplicantworkreferences_hidelist: any;

    Deleted_mstapplicantworkreference_IDs: string = "";
    mstapplicantworkreferences_ID: string = "5";
    mstapplicantworkreferences_selectedindex: any;
    ShowTableslist: any;
    pkcol: any;
    bmyrecord: boolean = false;
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
    maindata: any;
    companyList: DropDownValues[];
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
        private mstapplicantworkreference_service: mstapplicantworkreferenceService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sharedService: SharedService,
        private fb: FormBuilder,
        private sessionService: SessionService,
        private toastr: ToastService,
        private sanitizer: DomSanitizer,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
        private mstapplicantreferencerequestService: mstapplicantreferencerequestService,
    ) {
        debugger;
        this.data = dynamicconfig;
        if (this.data != null && this.data.data != null) {
            this.data = this.data.data;
        }
        this.pkcol = this.data.maindatapkcol;
        this.applicantid = this.data.applicantid;

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
    async ngOnInit() {
        const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
        if (isMobile) {
            this.showMobileDetectskill = true;
            this.showWebviewDetect = false;
            /* your code here */
        }
        this.Set_mstapplicantworkreferences_TableConfig();
        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();
        this.get_companyName();
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
        this.mstapplicantworkreference_service.getDefaultData().then(res => {
            this.applicantid_List = res.list_applicantid.value;
            this.skills_List = res.list_skills.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });
    };

    getSkills(skills_List:any) {
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

    get_companyName() {
        debugger
        this.mstapplicantworkreference_service.get_mstapplicantworkreferences_companyList(this.applicantid).then(res => {
            console.log(res);
            this.companyList = res as DropDownValues[];
        })
    }

    search_skills(event) {
        debugger;
        this.skills_results = this.skills_List.filter(v => v.label.toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
    }

    skill_onchange(event: any){
        console.log("skill_onchange",event);
        let e = event.value;
    this.mstapplicantworkreference_Form.patchValue({ skilldesc: event.options[event.options.selectedIndex].text });

    }
    onChange_companyList(event: any) {
        debugger
        console.log("onChange_companyList",event);
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
            //   this.FillData(res);
        }).catch((err) => { console.log(err); });
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
            // this.onSubmitDataDlg(false);
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
        console.log(obj);
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
        setTimeout(() => {
            //this.dialogRef.destroy();
        }, 200);
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
        debugger;
        this.isSubmitted = true;
        let strError = "";
        if (!this.mstapplicantworkreference_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }

        if (strError != "") return this.sharedService.alert(strError);

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
                this.ngOnInit();
                this.objvalues.push((res as any).mstapplicantworkreference);
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
            <th style="white-space: break-spaces;width:20%;">##companyname##</th>
            <th style="white-space: break-spaces;width:17%;">##worktopic##</th>
            <th style="white-space: break-spaces;width:17%;"><a href="https://##referenceurl##" target="_blank">##referenceurl##</a></th>
            <th style="white-space: break-spaces;width:16%;">##workdescription##</th>
            <th style="white-space: break-spaces;width:17%;">##remarks##</th>
            <th style="white-space: break-spaces;width:20%;">##string_agg##</th>
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
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">skill :</span> <label style="font-size: small;">##skilldesc##</label></li>
  </ul>
`;
        return ret;
    }
    FillData() {
        // this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(this.applicantid).then(res => {
        //     this.mstapplicantworkreference_menuactions = res.mstapplicantworkreference_menuactions;
        //     this.Set_mstapplicantworkreferences_TableConfig();
        //     this.mstapplicantworkreferences_LoadTable(res.mstapplicantworkreferences);
        // });
        // debugger;


        this.mstapplicantreferencerequestService.get_mstapplicantworkreference_ByApplicantID(this.applicantid).then(res => {
            this.mstapplicantworkreference_menuactions = res.mstapplicantworkreference_menuactions;
            debugger;
            this.Set_mstapplicantworkreferences_TableConfig();
            this.mstapplicantworkreferences_LoadTable(res.mstapplicantworkreference);
        });
    };
    validate() {
        let ret = true;
        return ret;
    }

    Add_mstapplicantworkreference(event: any, workreferenceid: any, applicantid: any) {
        debugger;
        this.showSkillDetails_input = true;
        let add = false;
        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    }

    Edit_mstapplicantworkreference(event: any, workreferenceid: any, applicantid: any) {
        debugger;
        this.showSkillDetails_input = true;
        let add = false;
        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;

        console.log(event, event.data.workreferenceid, event.data.applicantid);
        this.mstapplicantworkreference_service.get_mstapplicantworkreferences_ByEID(event.data.pkcol).then((res: any) => {
            debugger;
            console.log(res);

            this.mstapplicantworkreference_Form.patchValue({
                applicantid: res.mstapplicantworkreference.applicantid,
                applicantiddesc: res.mstapplicantworkreference.applicantiddesc,
                workreferenceid: res.mstapplicantworkreference.workreferenceid,
                worktopic: res.mstapplicantworkreference.worktopic,
                companyname: res.mstapplicantworkreference.companyname,
                workdescription: res.mstapplicantworkreference.workdescription,
                referenceurl: res.mstapplicantworkreference.referenceurl,
                remarks: res.mstapplicantworkreference.remarks,
                requestid: res.mstapplicantworkreference.requestid,
                skills: res.mstapplicantworkreference.skills,
                attachment: "[]",
                status: res.mstapplicantworkreference.status,
                statusdesc: res.mstapplicantworkreference.statusdesc,
            });
            setTimeout(() => {
                this.getSkillsDescription();
              }, 400);
        });
    }

    // Old Code

    // AddOrEdit_mstapplicantworkreference(event: any, workreferenceid: any, applicantid: any) {
    //     debugger;
    //     let add = false;
    //     if (event == null) add = true;
    //     let childsave = true;
    //     if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    //     this.dialog.open(mstapplicantworkreferenceComponent,
    //         {
    //             data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workreferenceid, applicantid, visiblelist: this.mstapplicantworkreferences_visiblelist, hidelist: this.mstapplicantworkreferences_hidelist, ScreenType: 2 },
    //         }
    //     ).onClose.subscribe(res => {
    //         if (res) {
    //             if (add) {
    //                 for (let i = 0; i < res.length; i++) {
    //                     this.tbl_mstapplicantworkreferences.source.add(res[i]);
    //                 }
    //                 this.tbl_mstapplicantworkreferences.source.refresh();
    //             }
    //             else {
    //                 this.tbl_mstapplicantworkreferences.source.update(event.data, res[0]);
    //             }
    //         }
    //     });
    // }

    onDelete_mstapplicantworkreference(event: any, childID: number, i: number) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantreferencerequestService.delete_mstapplicantreferencerequest(childID).then(res => {
                this.mstapplicantreferencerequestService.get_mstapplicantworkreference_ByApplicantID(this.applicantid).then(res => {
                    debugger;
                    this.ngOnInit();
                    this.mstapplicantworkreferences_LoadTable(res);
                });
            })
        } else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantworkreference_IDs += childID + ",";
        // this.tbl_mstapplicantworkreferences.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    mstapplicantworkreferences_settings: any;

    show_mstapplicantworkreferences_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantworkreferences.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantworkreferences.source.initGrid();
    }
    delete_mstapplicantworkreferences_All() {
        this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantworkreferences_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantworkreferences_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantworkreferences.source.settings != null) this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'];
        this.tbl_mstapplicantworkreferences.source.initGrid();
    }
    show_mstapplicantworkreferences_InActive() {
    }
    enable_mstapplicantworkreferences_InActive() {
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
            // actions: {
            //     columnTitle: '',
            //     width: '300px',
            //     edit: true, // true,
            //     delete: (this.IsApplicant || this.IsAdmin),
            //     position: 'left',
            //     // custom: this.mstapplicantworkreference_menuactions
            //     custom: [{
            //         name: 'reference',
            //         title: `<i class="icon-references" aria-hidden="true"></i>`,
            //     }],
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
                        return this.sharedService.HtmlValue(divrow, cell);
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
        //   this.dialog.open(mstapplicantreferencegridComponent, {
        //     width: '100% !important',
        //     height: 'auto !important',
        //     data: { ScreenType: 2, applicantid: this.applicantid, save: true }
        //   })

        let referencesourcedetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Work Topic: ' + event.data.worktopic + '</li>'
            + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;white-space: break-spaces !important;"> Work Description: ' + event.data.workdescription + '</li>'
            + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Reference URL: ' + event.data.referenceurl + '</li>'
            + '<li class="list-group-item remarks_p" style="background: #2D3C84 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>'


        // let referencesourcedetails =
        //     'Work Topic: ' + event.data.worktopic +
        //     '<BR>' +
        //     'Work Description: ' +event.data.workdescription + '<BR>'
        //     + 'Reference URL: ' + event.data.referenceurl +
        //     '<BR>' + 'Remarks: ' + event.data.remarks;
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
                    width: '75% !important',
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
        //debugger;;
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
