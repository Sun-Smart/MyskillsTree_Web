import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe, Location } from '@angular/common';
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
import { NgbDateParserFormatter, NgbDatepickerConfig } from '@ng-bootstrap/ng-bootstrap';
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
import { mstapplicantcareerdetailService } from '../../../service/mstapplicantcareerdetail.service';
import { mstapplicantcareerdetailComponent } from './mstapplicantcareerdetail.component';
import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicantcareerdetail } from '../../../model/mstapplicantcareerdetail.model';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';
@Component({
    selector: 'app-applicantcareergrid',
    template: `<div class="row form-group sticky1" style=" background: #f5f3e4 !important;color: #000;padding: 5px;">

    <div class="col-4">
    <h4 class="  columns left"
    >{{'Career Details'}}</h4>
    </div>
    <div class="col-4">
    <ul class="nav navbar-nav1" style='display:none'>
      <li class="dropdown">
        <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
          aria-expanded='false'> <span class='caret'></span></a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" [routerLink]=''
              (click)="mstapplicantcareerdetails_route(null, 'create')"><i class="fa fa-plus"
                aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
        </ul>
      </li>
    </ul>
    </div>
    <div class="col-4" style="text-align: end; margin: auto;">

    <!-- <a  [routerLink]='' (click)="mstapplicantcareerdetails_route(null, 'create')"> -->
    <!-- <button type="button" style="border-color: #fff !important;
    color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button>  -->
    <button type="button" class="btn btn-outline-primary"  [routerLink]='' (click)="mstapplicantcareerdetails_route(null, 'create')"
    class="popup-add-button" title = "Add Details">Add</button>

    <!-- <button type="button"  class="popup-add-button" (click)="addSkills()">Add</button> -->
    <!-- </a> -->
    <!-- <a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon" title = "Close"></i></a> -->

    <a  class="" [routerLink]='' (click)="onClose()"><img src="assets/mainmenuicons/icons_close.png" style="width: 20px;" title = "Close"/></a>


    <!--<ul class="rightside">
    <a [routerLink]='' (click)="mstapplicantcareerdetails_route(null, 'create')"><i style="color:#fff !important;"
        class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
    </ul>-->
    </div>
  </div>
  <form [formGroup]="mstapplicantcareerdetail_Form">
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  <thead >
    <tr>
    
      <th style="width: 11.5%;">Category</th>
      <th style="width: 11.5%;">Company Name</th>
      <th style="width: 11.5%;">Designation</th>
      <th style="width: 11.5%;">From Date</th>
      <th style="width: 11.5%;">To Date</th>
      <th style="width: 11.5%;">Skills</th>
      <th style="width: 11.5%;">Remarks</th>
      <!-- <th style="width: 11.5%;">Attachment</th> -->
      <th style="width: 8%;">Action</th>
    </tr>
  </thead>

  <tbody style="background: #f0f0f0;" *ngIf="showSkillDetails_input">
   
   <tr>
     <!-- Gategory -->
     <td>
     <!-- <label for="category" class="control-label">Category</label> -->
        <select id="category" (change)="category_onChange($event.target)" formControlName="category" class="form-control">
          <option value="null" selected>-Select-</option>
          <option *ngFor="let item of category_List" value="{{item.value}}">{{item.label}}</option>
        </select>
     </td>

     <!-- Company Name -->
     <td>
     <!-- <label *ngIf="showview" class="labelview">{{f.companyname?.value}}</label> -->
     <!-- <label for="companyname" class="control-label required">Company Name</label> -->
        <input  id="companyname" required formControlName="companyname" class="form-control">
     </td>

     <!-- Designation-->
     <td>
     <!-- <label for="designation" class="control-label required">Designation</label> -->
     <input  id="designation" required formControlName="designation" class="form-control">
     </td>

     <!-- From Date -->
     <td>
     <!-- <label for="fromdate" class="control-label required">From Date</label> -->
     <!-- <label *ngIf="showview" class="labelview">{{ngbDateParserFormatter.format(f.fromdate?.value)}}</label> -->
     
     <div  style="display: flex;width: 80%;">
     <input #f="ngbDatepicker" readonly ngbDatepicker [minDate]='{year: 1950, month:1, day: 1}'
          [maxDate]="maxDate"  name="fromdateformpicker" id="fromdate" required
            formControlName="fromdate" class="form-control" style="margin-right: 5px;">
            
            <button class="input-group-addon"  (click)="f.toggle()" type="button"><i
              class="fa fa-calendar" aria-hidden="true"></i></button>
     </div>
     </td>

     <!-- To Date -->

     <td>
     <!-- <label for="todate" class="control-label">To Date</label> -->
     <!-- <input  id="designation" required formControlName="designation" class="form-control"> -->
     <!-- <label *ngIf="showview" class="labelview">{{ngbDateParserFormatter.format(f.todate?.value)}}</label> -->
     
    <div style="display: flex;width: 80%;">
     <input #t="ngbDatepicker" readonly  ngbDatepicker [minDate]='{year: 1950, month:1, day: 1}'
          [maxDate]="maxDate" name="todateformpicker" id="todate" formControlName="todate" class="form-control"
          style="margin-right: 5px;">

          <button class="input-group-addon"  (click)="t.toggle()" type="button"><i
              class="fa fa-calendar" aria-hidden="true"></i></button>
    </div>
     </td>

    <!-- Skills -->

     <td>
     <!-- <label for="skills" class="control-label">Skills &nbsp;&nbsp;</label><br> -->
     <!-- <input  id="designation" required formControlName="skills" class="form-control"> -->
     <p-autoComplete formControlName="skills"   field="label" [multiple]="true" [suggestions]="skills_results"
          (completeMethod)="search_skills($event)"></p-autoComplete>
          <label *ngIf="showview" class="labelview">{{f.skills?.label}}</label>
     </td>

     <!-- Remarks -->
     <td>
     <!-- <label for="remarks" class="control-label">Remarks</label> -->
       <textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks"></textarea>
       <!-- <p-editor  id="remarks" formControlName="remarks" [style]="{  height: '20' }"></p-editor> -->
     </td>

     <!-- Attachment -->

     <!-- <td>
     <p-accordion [multiple]='true'>
        <p-accordionTab [header]="'Attachment(' + fileattachment.getLength() + ')'" [selected]='false'>
          <app-attachment #fileattachment isAttachment=true formControlName="attachment" [SessionData]="sessionData">
          </app-attachment>
        </p-accordionTab>
      </p-accordion>
     </td> -->

    <!-- Submit -->
     <td class="field-add-close-button" style="vertical-align: initial !important;">
       <!-- <button type="button" class="btn btn-outline-primary"  (click)="onSubmitData(mstapplicantcareerdetail_Form)"
       style="background: green;color: antiquewhite;padding: 5px;border: none;box-shadow: 1px 1px 1px 0px black;">Submit</button> -->
       <i class="fa fa-plus-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

       <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
          (click)="skillClose()"></i>
     </td>

   </tr>
 </tbody>

</table>
</form>
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
                `
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
        private toastr: ToastService,
        private fb: FormBuilder,
        private config: NgbDatepickerConfig,
        private sanitizer: DomSanitizer, private datePipe: DatePipe,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
        private mstapplicantcareerdetail_service: mstapplicantcareerdetailService,
    ) {
        debugger;
        var date = new Date()
        this.myDate = this.datePipe.transform(date);
        this.data = dynamicconfig;
        if (this.data != null && this.data.data != null) {
            this.data = this.data.data;
        }
        this.pkcol = this.data.maindatapkcol;
        this.applicantid = this.data.applicantid


        const current = new Date();
        this.maxDate = {
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            day: current.getDate()
        };
        this.mstapplicantcareerdetail_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            applicantid: [this.applicantid],
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
    }
    async ngOnInit() {
        this.Set_mstapplicantcareerdetails_TableConfig();
        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;



        this.FillData();
        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        // if (this.pkcol == null) {
        //     this.resetForm();
        //   }
        //   else {
        //     if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
        //     //get the record from api
        //     //foreign keys
        //   }
    };

    get f() { return this.mstapplicantcareerdetail_Form.controls; };

    selectctwo(event: any) {
        debugger
        if (this.mstapplicantcareerdetail_Form.value.currentlyworking == true) {
            this.isdisabled = true
        } else {
            this.isdisabled = false
        }
    }

    // addSkills() {
    //     debugger
    //     this.showSkillDetails_input = true;
    //     this.getData();
    // };

    getData() {
        this.mstapplicantcareerdetail_service.getDefaultData().then(res => {
            this.applicantid_List = res.list_applicantid.value;
            this.category_List = res.list_category.value;
            this.skills_List = res.list_skills.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_List().then(res => {
            this.pkList = res as mstapplicantcareerdetail[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
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
            // this.onSubmitDataDlg(false);
            this.onSubmitData(false);
        }
        else {
            this.onSubmitData(false);
        }
    };

    async onSubmitData(bclear: any) {
        debugger;
        this.isSubmitted = true;
        let strError = "";
        this.getData()

        this.formData = this.mstapplicantcareerdetail_Form.getRawValue();
        // if (this.dynamicconfig.data != null) {
        //     for (let key in this.dynamicconfig.data) {
        //         if (key != 'visiblelist' && key != 'hidelist') {
        //             if (this.mstapplicantcareerdetail_Form.controls[key] != null) {
        //                 this.formData[key] = this.mstapplicantcareerdetail_Form.controls[key].value;
        //             }
        //         }
        //     }
        // }
        this.formData.fromdate = new Date(this.mstapplicantcareerdetail_Form.get('fromdate').value ? this.ngbDateParserFormatter.format(this.mstapplicantcareerdetail_Form.get('fromdate').value) + '  UTC' : null);

        if (this.mstapplicantcareerdetail_Form.value.currentlyworking == true) {
            this.formData.todate = new Date()
            console.log(this.formData.todate);
        } else {
            this.formData.todate = new Date(this.mstapplicantcareerdetail_Form.get('todate').value ? this.ngbDateParserFormatter.format(this.mstapplicantcareerdetail_Form.get('todate').value) + '  UTC' : null);
        }
        this.formData.skills = null;

        if (this.formData.fromdate > this.formData.todate) {
            this.showDateError = true;
            return;
        } else {

            if (this.mstapplicantcareerdetail_Form.get('skills').value != null) this.formData.skillsstring = JSON.stringify(this.getSkills(this.mstapplicantcareerdetail_Form.get('skills').value));
            // if (this.mstapplicantcareerdetail_Form.get('skills').value != null) this.formData.skillsstring = JSON.stringify(this.mstapplicantcareerdetail_Form.get('skills').value);
            console.log(this.formData);
            this.spinner.show();
            this.mstapplicantcareerdetail_service.saveOrUpdate_mstapplicantcareerdetails(this.formData).subscribe(
                async res => {
                    this.spinner.hide();
                    debugger;
                    this.toastr.addSingle("success", "", "Successfully saved");
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
                            // this.FillData(res);
                        }
                    }


                    this.mstapplicantcareerdetail_Form.markAsUntouched();
                    this.mstapplicantcareerdetail_Form.markAsPristine();
                },
                err => {
                    debugger;
                    this.spinner.hide();
                    this.toastr.addSingle("error", "", err.error);
                    console.log(err);
                }
            )
        }

    }

    getSkills(skills_List) {
        debugger;
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
          <tr>
            <th style="white-space: break-spaces;word-break: break-word !important;width: 11.5%;">##categorydesc##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;width: 11.5%;">##companyname##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;width: 11.5%;">##designation##</th>
            <!--<th scope="row" style="white-space: break-spaces;word-break: break-word !important;">##referencecount##</th>-->
            <th style="white-space: break-spaces;word-break: break-word !important;width: 11.5%;">##fromdate##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;width: 11.5%;">##todate##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;width: 11.5%;">##skillsstring##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;width: 11.5%;">##remarks##</th>
          </tr>
        </tbody>
      </table>
      </div>

        <!--<div class='card1'>
<h2>##companyname## - ##designation##</h2>
<h3 style="margin: 0 auto !important;" class='profile__section__item__sub'>##fromdate## - ##todate##</h3>
##remarks##
</div>-->
`;
        return ret;
    };

    search_skills(event) {
        debugger;
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
        }).catch((err) => { console.log(err); });
    }

    FillData() {

        // this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(this.applicantid).then(res => {
        //     this.mstapplicantcareerdetail_menuactions = res.mstapplicantcareerdetail_menuactions;
        //     this.Set_mstapplicantcareerdetails_TableConfig();
        //     this.mstapplicantcareerdetails_LoadTable(res.mstapplicantcareerdetails);
        // });

        this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_ByApplicantID(this.applicantid).then(res => {
            this.mstapplicantcareerdetail_menuactions = res.mstapplicantcareerdetail_menuactions;
            this.Set_mstapplicantcareerdetails_TableConfig();
            this.mstapplicantcareerdetails_LoadTable(res.mstapplicantcareerdetail);
        });
    };


    Add_mstapplicantcareerdetail(event: any, careerid: any, applicantid: any) {
       
        debugger;
        this.showSkillDetails_input = true;
        this.getData();
        let add = false;
        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;

    }

    Edit_mstapplicantcareerdetail(event: any, careerid: any, applicantid: any) {
        debugger;
        this.showSkillDetails_input = true;
        this.getData();
        let add = false;
        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        console.log(event, event.data.careerid, event.data.applicantid);
        this.mstapplicantcareerdetail_service.get_mstapplicantcareerdetails_ByEID(event.data.pkcol).then((res: any) => {
           debugger
            console.log(res);
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
                remarks: res.mstapplicantcareerdetail.remarks,
                status: res.mstapplicantcareerdetail.status,
                statusdesc: res.mstapplicantcareerdetail.statusdesc,
                attachment: JSON.parse(res.mstapplicantcareerdetail.attachment),
            });
        })
    }

    // Old Code

    // AddOrEdit_mstapplicantcareerdetail(event: any, careerid: any, applicantid: any) {
    //     debugger;
    //     this.getData();
    //     let add = false;
    //     if (event == null) add = true;
    //     let childsave = true;
    //     if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    //     this.dialog.open(mstapplicantcareerdetailComponent,
    //         {
    //             data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, careerid, applicantid, visiblelist: this.mstapplicantcareerdetails_visiblelist, hidelist: this.mstapplicantcareerdetails_hidelist, ScreenType: 2 },
    //         }
    //     ).onClose.subscribe(res => {
    //         if (res) {
    //             if (add) {
    //                 for (let i = 0; i < res.length; i++) {
    //                     this.tbl_mstapplicantcareerdetails.source.add(res[i]);
    //                 }
    //                 this.tbl_mstapplicantcareerdetails.source.refresh();
    //             }
    //             else {
    //                 this.tbl_mstapplicantcareerdetails.source.update(event.data, res[0]);
    //             }
    //         }
    //     });
    // }

    onDelete_mstapplicantcareerdetail(event: any, childID: number, i: number) {
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
        // if (childID != null)
        //     this.Deleted_mstapplicantcareerdetail_IDs += childID + ",";
        // this.tbl_mstapplicantcareerdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    //start of Grid Codes mstapplicantcareerdetails
    mstapplicantcareerdetails_settings: any;

    show_mstapplicantcareerdetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantcareerdetails.source.initGrid();
    }
    delete_mstapplicantcareerdetails_All() {
        this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantcareerdetails_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantcareerdetails_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantcareerdetails.source.settings != null) this.tbl_mstapplicantcareerdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantcareerdetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantcareerdetails.source.initGrid();
    }
    show_mstapplicantcareerdetails_InActive() {
    }
    enable_mstapplicantcareerdetails_InActive() {
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
                // custom: this.mstapplicantcareerdetail_menuactions
                custom: this.mstapplicantcareerdetail_menuactions
            },
            // actions: {
            //     columnTitle: '',
            //     width: '300px',
            //     edit: true, // true,
            //     delete: (this.IsApplicant || this.IsAdmin),
            //     position: 'left',
            //     // custom: this.mstapplicantcareerdetail_menuactions
            //     custom: [{ name: 'reference',
            //     title: `<i class="icon-references" aria-hidden="true"></i>`,
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
                        cell = this.mstapplicantcareerdetailshtml();
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
                        // if (row["todate"] == "1970-01-01T00:00:00") divrow["todate"] = "Till Date"; return this.sharedService.HtmlValue(divrow, cell);
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

    //external to inline
    /*
    mstapplicantcareerdetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantcareerdetails.length == 0)
    {
        this.tbl_mstapplicantcareerdetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantcareerdetail();
        this.mstapplicantmaster_service.mstapplicantcareerdetails.push(obj);
        this.tbl_mstapplicantcareerdetails.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantcareerdetails.length / this.tbl_mstapplicantcareerdetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantcareerdetails.source.getPaging().page)
        {
            this.tbl_mstapplicantcareerdetails.source.setPage((this.mstapplicantmaster_service.mstapplicantcareerdetails.length / this.tbl_mstapplicantcareerdetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantcareerdetails.source.grid.edit(this.tbl_mstapplicantcareerdetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantcareerdetails.source.data.indexOf(event.data);
    this.onDelete_mstapplicantcareerdetail(event,event.data.careerid,((this.tbl_mstapplicantcareerdetails.source.getPaging().page-1) *this.tbl_mstapplicantcareerdetails.source.getPaging().perPage)+index);
    this.tbl_mstapplicantcareerdetails.source.refresh();
    break;
    }
    }

    */
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
                this.onDelete_mstapplicantcareerdetail(event, event.data.careerid, ((this.tbl_mstapplicantcareerdetails.source.getPaging().page - 1) * this.tbl_mstapplicantcareerdetails.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantcareerdetails.source.refresh();
                break;
        }
    }
    mstapplicantcareerdetails_onDelete(obj) {
        let careerid = obj.data.careerid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantcareerdetail_service.delete_mstapplicantcareerdetail(careerid).then(res =>
                this.mstapplicantcareerdetails_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantcareerdetails_Action(event: any) {
        //   this.dialog.open(mstapplicantreferencegridComponent, {
        //     width: '100% !important',
        //     height: 'auto !important',
        //     data: { ScreenType: 2, applicantid: this.applicantid, save: true }
        //   })


        let referencesourcedetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Company Name: ' + event.data.companyname + '</li>'
            + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Designation: ' + event.data.designation + '</li>'
            + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> From Date: ' + event.data.fromdate + '</li>'
            + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> To Date: ' + event.data.todate + '</li>'
            + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Currently Working: ' + event.data.currentlyworking + '</li>'
            + '<li class="list-group-item remarks_p" style="background: #2D3C84 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>'

        // let referencesourcedetails = 'Company Name:' + event.data.companyname +
        //  '<BR>' + 'Designation: ' + event.data.designation + '<BR>'
        //  + 'From Date: ' + event.data.fromdate + '<BR>' +
        //  'To Date: ' + event.data.todate + '<BR>'
        //  + 'Currently Working: ' + event.data.currentlyworking + '<BR>' + 'Remarks: ' + event.data.remarks;
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
        //debugger;;
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
