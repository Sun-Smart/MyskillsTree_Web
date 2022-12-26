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
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { mstapplicantsocialmediadetailService } from '../../../service/mstapplicantsocialmediadetail.service';
import { mstapplicantsocialmediadetailComponent } from './mstapplicantsocialmediadetail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicantsocialmediadetail } from '../../../model/mstapplicantsocialmediadetail.model';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';


@Component({
    selector: 'app-applicantsocialmediagrid',
    template: `
    <div class="row form-group sticky1" style=" background: #f5f3e4 !important;color: #000;padding: 5px;">

<div class="col-4">
    <h4 class="columns left">{{'Social Media Details'}}</h4>
</div>

<div class="col-4">
    <ul class="nav navbar-nav1" style='display:none'>
      <li class="dropdown">
        <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button'
          aria-haspopup='true' aria-expanded='false'> <span class='caret'></span></a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" [routerLink]=''
              (click)="mstapplicantsocialmediadetailtoggleOption();mstapplicantsocialmediadetails_route(null, 'create')"><i
                class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
        </ul>
      </li>
    </ul>
</div>

<div class="col-4" style="text-align: end; margin: auto;">
    <!-- <ul class="rightside">
    <a [routerLink]='' (click)="mstapplicantsocialmediadetails_route(null, 'create')"><i style="color:#fff !important;"
        class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
    </ul> -->

    <!-- <ul class="rightside"> -->
                <!-- <a  [routerLink]='' (click)="mstapplicantsocialmediadetails_route(null, 'create')"> -->

                <!-- <button type="button" style="border-color: #fff !important;
                color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->

                <button type="button" class="btn btn-outline-primary popup-add-button"
                [routerLink]='' (click)="mstapplicantsocialmediadetails_route(null, 'create')" title = "Add Details">Add</button>
                <!-- </a> -->
                 <!-- <button (click)="addSkills()" >Add 1</button> -->

                <!-- <a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon" title = "Close"></i></a> -->

                <a  class="" [routerLink]='' (click)="onClose()"><img src="assets/mainmenuicons/icons_close.png" style="width: 20px;" title = "Close"/></a>

                <!-- </ul> -->
</div>


</div>
<form [formGroup]="mstapplicantsocialmediadetail_Form">
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  <thead>
    <tr>
      <th style="width: 23%;">Social Media</th>
      <th style="width: 21.5%;">Handle Name</th>
      <th style="width: 21.5%;">Url</th>
      <th style="width: 25%;">Remarks</th>
      <!-- <th style="width: 25%;">Attachment</th> -->
      <th>Action</th>
    </tr>
  </thead>
  <tbody style="background: #f0f0f0;" *ngIf="showSkillDetails_input">
    <tr>
        <!-- Social Media -->

        <td>
        <select *ngIf="!showview" id="socialmedianame" required (change)="socialmedianame_onChange($event.target)"
          formControlName="socialmedianame" class="form-control">
          <option [ngValue]="null" selected>-Select-</option>
          <option *ngFor="let item of socialmedianame_List" value="{{item.value}}">{{item.label}}</option>
        </select>
        </td>

        <!-- Handle Name -->

        <td>
        <input *ngIf="!showview" id="handlename" formControlName="handlename" class="form-control">
        </td>

        <!-- URL -->

        <td>
        <input *ngIf="!showview" id="url" required formControlName="url" class="form-control">
        <!-- <app-field-error-display [displayError]="f.url.errors?.required" errorMsg="Enter {{'U R L' | translate}}">
        </app-field-error-display> -->
        </td>

        <!-- Remarks -->

        <td>
        <textarea autosize MinRows="10" MaxRows="15" onlyGrow="true" *ngIf="!showview" id="achievementdetails" required
        formControlName="remarks" class="form-control">
        </textarea>
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
  <ng2-smart-table #tbl_mstapplicantsocialmediadetails
    (userRowSelect)="handle_mstapplicantsocialmediadetails_GridSelected($event)"
    [settings]="mstapplicantsocialmediadetails_settings"
    (custom)="onCustom_mstapplicantsocialmediadetails_Action($event)"
    [source]="tbl_mstapplicantsocialmediadetails?.source?.data"
    (delete)="mstapplicantsocialmediadetails_route($event,'delete')"
    (deleteConfirm)="mstapplicantsocialmediadetails_route($event,'delete')"
    (create)="mstapplicantsocialmediadetails_route($event,'create')"
    (createConfirm)="mstapplicantsocialmediadetails_beforesave($event)"
    (edit)="mstapplicantsocialmediadetails_route($event,'edit')"
    (editConfirm)="mstapplicantsocialmediadetails_beforesave($event)">
  </ng2-smart-table>
    `
})
export class mstapplicantsocialmediagridComponent implements OnInit {

    mstapplicantsocialmediadetail_Form: FormGroup;
    
    isadmin = false;

    formData: mstapplicantsocialmediadetail;

    bfilterPopulate_mstapplicantsocialmediadetails: boolean = false;
    mstapplicantsocialmediadetail_menuactions: any = []
    @ViewChild('tbl_mstapplicantsocialmediadetails', { static: false }) tbl_mstapplicantsocialmediadetails: Ng2SmartTableComponent;
    pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
    mstapplicantsocialmediadetails_visiblelist: any;
    mstapplicantsocialmediadetails_hidelist: any;
    Deleted_mstapplicantsocialmediadetail_IDs: string = "";
    mstapplicantsocialmediadetails_ID: string = "6";
    mstapplicantsocialmediadetails_selectedindex: any;
    ShowTableslist:any;
    pkcol:any;
    pkList: any;//stores values - used in search, prev, next
    socialmedianame_List: DropDownValues[];
    applicantid_List: DropDownValues[];


    hidelist: any = [];
    objvalues: any = [];
    IsApplicant: boolean;
    IsAdmin: boolean;
    bSingleRecord: boolean;
    showSkillDetails_input: boolean = false;
    isSubmitted: boolean = false;
    showview: boolean = false;//view or edit mode
    bmyrecord: boolean = false;

    applicantid:any;
    data:any;
    maindata: any;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentFieldJson: any[] = [];
    attachmentVisible: boolean = true;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,

        private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sharedService: SharedService,
        private fb: FormBuilder,
        private sessionService: SessionService,
        private toastr: ToastService,
        private mstapplicantsocialmediadetail_service: mstapplicantsocialmediadetailService,
        private sanitizer: DomSanitizer,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
        // private mstapplicantskilldetail_service: mstapplicantskilldetailService,
        ) {
            debugger;
            this.data = dynamicconfig;
            if (this.data != null && this.data.data != null) {
                this.data = this.data.data;
            }
            this.pkcol=this.data.maindatapkcol;
            this.applicantid=this.data.applicantid

            let app_id = localStorage.getItem('applicantid');
            this.mstapplicantsocialmediadetail_Form = this.fb.group({
                pk: [null],
                ImageName: [null],
                applicantid: app_id,
                applicantiddesc: [null],
                socialrefid: [null],
                socialmedianame: [null, Validators.compose([Validators.required])],
                socialmedianamedesc: [null],
                handlename: [null],
                url: [null, Validators.compose([Validators.required])],
                remarks: [null],
                attachment: [null],
                status: [null],
                statusdesc: [null],
            });
    }

    ngOnInit() {
        this.Set_mstapplicantsocialmediadetails_TableConfig();
        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();

        //autocomplete
        this.mstapplicantsocialmediadetail_service.get_mstapplicantsocialmediadetails_List().then(res => {
            this.pkList = res as mstapplicantsocialmediadetail[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched
        this.mstapplicantsocialmediadetail_Form.markAsUntouched();
        this.mstapplicantsocialmediadetail_Form.markAsPristine();
    }

    // addSkills() {
    //     debugger
    //     this.showSkillDetails_input = true;
    //     this.getdata();
    // };
    skillClose() {
        this.showSkillDetails_input = false;
      };

    getdata(){

        this.mstapplicantsocialmediadetail_service.getDefaultData().then(res => {
            this.applicantid_List = res.list_applicantid.value;
            this.socialmedianame_List = res.list_socialmedianame.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });
    };

    socialmedianame_onChange(evt: any) {
        let e = evt.value;
        this.mstapplicantsocialmediadetail_Form.patchValue({ socialmedianamedesc: evt.options[evt.options.selectedIndex].text });
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
    }


    async onSubmitData(bclear: any) {
        debugger;
        this.isSubmitted = true;
        let strError = "";
        this.formData = this.mstapplicantsocialmediadetail_Form.getRawValue();
        console.log(this.formData);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.mstapplicantsocialmediadetail_service.saveOrUpdate_mstapplicantsocialmediadetails(this.formData).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.sessionService.setItem("attachedsaved", "true")
                this.objvalues.push((res as any).mstapplicantsocialmediadetail);
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
                        this.objvalues.push((res as any).mstapplicantsocialmediadetail);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        // this.FillData(res);
                    }
                }
                this.mstapplicantsocialmediadetail_Form.markAsUntouched();
                this.mstapplicantsocialmediadetail_Form.markAsPristine();
            });

    }
    resetForm() {
        if (this.mstapplicantsocialmediadetail_Form != null)
            this.mstapplicantsocialmediadetail_Form.reset();
        this.mstapplicantsocialmediadetail_Form.patchValue({
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
                        this.mstapplicantsocialmediadetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstapplicantsocialmediadetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstapplicantsocialmediadetail_Form.controls[key] != undefined) {
                                this.mstapplicantsocialmediadetail_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }

    mstapplicantsocialmediadetailshtml() {
        let ret = "";
        ret += `

        <table class="table table-hover socialmedia_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##socialmedianamedesc##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##handlename##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2"><a href="https://##url##" target="_blank">##url##</a></th>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##remarks##</th>
          </tr>
        </tbody>
      </table>


        <!--<div class='card1'>
<h2>##socialmedianamedesc## - ##handlename##</h2>
<h3 class='profile__section__item__sub'><a href='##url##' target='_blank'>##url##</a></h3>
<p>##remarks##</p>
</div>-->
`;
        return ret;
    }
    FillData(){
        this.Set_mstapplicantsocialmediadetails_TableConfig();
        this.mstapplicantsocialmediadetail_service.get_mstapplicantsocialmediadetails_ByApplicantID(this.applicantid).then(res => {
            this.mstapplicantsocialmediadetails_LoadTable(res);
            });

            
        // this.formData = res.mstapplicantsocialmediadetail;
        // this.formid = res.mstapplicantsocialmediadetail.socialrefid;
        // this.pkcol = res.mstapplicantsocialmediadetail.pkcol;
        // this.bmyrecord = false;
        // if ((res.mstapplicantsocialmediadetail as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        // console.log(res);
        // //console.log(res.order);
        // //console.log(res.orderDetails);
        // this.mstapplicantsocialmediadetail_Form.patchValue({
        //     applicantid: res.mstapplicantsocialmediadetail.applicantid,
        //     applicantiddesc: res.mstapplicantsocialmediadetail.applicantiddesc,
        //     socialrefid: res.mstapplicantsocialmediadetail.socialrefid,
        //     socialmedianame: res.mstapplicantsocialmediadetail.socialmedianame,
        //     socialmedianamedesc: res.mstapplicantsocialmediadetail.socialmedianamedesc,
        //     handlename: res.mstapplicantsocialmediadetail.handlename,
        //     url: res.mstapplicantsocialmediadetail.url,
        //     // .replace(/<[^>]*>/g, '')
        //     remarks: res.mstapplicantsocialmediadetail.remarks,
        //     attachment: JSON.parse(res.mstapplicantsocialmediadetail.attachment),
        //     status: res.mstapplicantsocialmediadetail.status,
        //     statusdesc: res.mstapplicantsocialmediadetail.statusdesc,
        // });
        // this.mstapplicantsocialmediadetail_menuactions = res.mstapplicantsocialmediadetail_menuactions;
        // if (this.mstapplicantsocialmediadetail_Form.get('attachment').value != null && this.mstapplicantsocialmediadetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicantsocialmediadetail_Form.get('attachment').value);
        // //Child Tables if any
   
    }
     //start of Grid Codes mstapplicantsocialmediadetails
     mstapplicantsocialmediadetails_settings: any;

     show_mstapplicantsocialmediadetails_Checkbox() {
         //debugger;;
         if (this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'single';
         else
             this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'multi';
         this.tbl_mstapplicantsocialmediadetails.source.initGrid();
     }
     delete_mstapplicantsocialmediadetails_All() {
         this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'single';
     }
     show_mstapplicantsocialmediadetails_Filter() {
         setTimeout(() => {
             //  this.Set_mstapplicantsocialmediadetails_TableDropDownConfig();
         });
         if (this.tbl_mstapplicantsocialmediadetails.source.settings != null) this.tbl_mstapplicantsocialmediadetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantsocialmediadetails.source.settings['hideSubHeader'];
         this.tbl_mstapplicantsocialmediadetails.source.initGrid();
     }
     show_mstapplicantsocialmediadetails_InActive() {
     }
     enable_mstapplicantsocialmediadetails_InActive() {
     }
     async Set_mstapplicantsocialmediadetails_TableDropDownConfig(res) {
         if (!this.bfilterPopulate_mstapplicantsocialmediadetails) {

             var clone = this.sharedService.clone(this.tbl_mstapplicantsocialmediadetails.source.settings);
             if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_applicantid.value)), }, };
             if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_applicantid.value)), }, };
             this.tbl_mstapplicantsocialmediadetails.source.settings = clone;
             this.tbl_mstapplicantsocialmediadetails.source.initGrid();

             var clone = this.sharedService.clone(this.tbl_mstapplicantsocialmediadetails.source.settings);
             if (clone.columns['socialmedianame'] != undefined) clone.columns['socialmedianame'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_socialmedianame.value)), }, };
             if (clone.columns['socialmedianame'] != undefined) clone.columns['socialmedianame'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_socialmedianame.value)), }, };
             this.tbl_mstapplicantsocialmediadetails.source.settings = clone;
             this.tbl_mstapplicantsocialmediadetails.source.initGrid();
         }
         this.bfilterPopulate_mstapplicantsocialmediadetails = true;
     }
     async mstapplicantsocialmediadetails_beforesave(event: any) {
         event.confirm.resolve(event.newData);



     }
     Set_mstapplicantsocialmediadetails_TableConfig() {
         this.mstapplicantsocialmediadetails_settings = {
             hideSubHeader: true,
             mode: 'external',
             selectMode: 'single',
             actions: {
                 columnTitle: '',
                 width: '300px',
                 edit: true, // true,
                 delete: (this.IsApplicant || this.IsAdmin),
                 position: 'right',
                //  custom: this.mstapplicantsocialmediadetail_menuactions
                // custom: [{ name: 'reference',
                // title: `<i class="icon-references" aria-hidden="true"></i>`,
                // }],
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
                         //debugger;;
                         cell = this.mstapplicantsocialmediadetailshtml();
                         var divrow = JSON.parse(JSON.stringify(row));


                         return this.sharedService.HtmlValue(divrow, cell);
                     },
                 },
             },
         };
     }
     mstapplicantsocialmediadetails_LoadTable(mstapplicantsocialmediadetails = new LocalDataSource()) {
         if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantsocialmediadetails_ID) >= 0) {
             if (this.tbl_mstapplicantsocialmediadetails != undefined) this.tbl_mstapplicantsocialmediadetails.source = new LocalDataSource();
             if (this.tbl_mstapplicantsocialmediadetails != undefined) this.tbl_mstapplicantsocialmediadetails.source.load(mstapplicantsocialmediadetails as any as LocalDataSource);
             if (this.tbl_mstapplicantsocialmediadetails != undefined) this.tbl_mstapplicantsocialmediadetails.source.setPaging(1, 20, true);
         }
     }
     AddOrEdit_mstapplicantsocialmediadetail(event: any, socialrefid: any, applicantid: any) {
       debugger
        let add = false;
        debugger
        this.showSkillDetails_input = true;
        this.getdata();
        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        // this.dialog.open(mstapplicantsocialmediadetailComponent,
        //     {
        //         data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, socialrefid, applicantid, visiblelist: this.mstapplicantsocialmediadetails_visiblelist, hidelist: this.mstapplicantsocialmediadetails_hidelist, ScreenType: 2 },
        //     }
        // ).onClose.subscribe(res => {
        //     if (res) {
        //         if (add) {
        //             for (let i = 0; i < res.length; i++) {
        //                 this.tbl_mstapplicantsocialmediadetails.source.add(res[i]);
        //             }
        //             this.tbl_mstapplicantsocialmediadetails.source.refresh();
        //         }
        //         else {
        //             this.tbl_mstapplicantsocialmediadetails.source.update(event.data, res[0]);
        //         }
        //     }
        // });
    }

    onDelete_mstapplicantsocialmediadetail(event: any, childID: number, i: number) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantsocialmediadetail_service.delete_mstapplicantsocialmediadetail(childID).then(res => {
                this.mstapplicantsocialmediadetail_service.get_mstapplicantsocialmediadetails_ByApplicantID(this.applicantid).then(res => {
                    this.ngOnInit();
                    this.mstapplicantsocialmediadetails_LoadTable(res);
                    });
            })
        } else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantsocialmediadetail_IDs += childID + ",";
        // this.tbl_mstapplicantsocialmediadetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
     mstapplicantsocialmediadetails_route(event: any, action: any) {
         var addparam = "";
         if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
             addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
         }
         switch (action) {
             case 'create':
                 this.AddOrEdit_mstapplicantsocialmediadetail(event, null, this.applicantid);
                 break;
             case 'view':
                 break;
             case 'edit':
                 this.AddOrEdit_mstapplicantsocialmediadetail(event, event.data.socialrefid, this.applicantid);
                 break;
             case 'delete':
                 this.onDelete_mstapplicantsocialmediadetail(event, event.data.socialrefid, ((this.tbl_mstapplicantsocialmediadetails.source.getPaging().page - 1) * this.tbl_mstapplicantsocialmediadetails.source.getPaging().perPage) + event.index);
                 this.tbl_mstapplicantsocialmediadetails.source.refresh();
                 break;
         }
     }
    formid(event: any, arg1: null, formid: any) {
        throw new Error('Method not implemented.');
    }
     mstapplicantsocialmediadetails_onDelete(obj) {
         let socialrefid = obj.data.socialrefid;
         if (confirm('Are you sure to delete this record ?')) {
             this.mstapplicantsocialmediadetail_service.delete_mstapplicantsocialmediadetail(socialrefid).then(res =>
                 this.mstapplicantsocialmediadetails_LoadTable(res)
             );
         }
     }
     async onCustom_mstapplicantsocialmediadetails_Action(event: any) {
         let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantsocialmediadetails");
         let formname = (objbomenuaction as any).actionname;

     }
     mstapplicantsocialmediadetails_Paging(val) {
         //debugger;;
         this.tbl_mstapplicantsocialmediadetails.source.setPaging(1, val, true);
     }

     handle_mstapplicantsocialmediadetails_GridSelected(event: any) {
         this.mstapplicantsocialmediadetails_selectedindex = this.tbl_mstapplicantsocialmediadetails.source.findIndex(i => i.socialrefid === event.data.socialrefid);
     }
     Is_mstapplicantsocialmediadetails_Visible() {
         if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantsocialmediadetails_ID) >= 0) {
             return "tbl smart-table-container";
         }
         else {
             return "hide";
         }
     }
     onClose() {
        // location.reload();
        this.dialogRef.close();
      }
     //end of Grid Codes mstapplicantsocialmediadetails
}
