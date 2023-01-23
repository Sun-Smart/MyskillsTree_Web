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
import { mstapplicantgeographypreferenceService } from '../../../service/mstapplicantgeographypreference.service';
import { mstapplicantgeographypreferenceComponent } from './mstapplicantgeographypreference.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicantgeographypreference } from '../../../model/mstapplicantgeographypreference.model';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';

@Component({
  selector: 'app-applicantgeographygrid',
  template: `
    <div class= "row mobile_view_geo"   style="background: #ebf3fc; color: #000; padding: 5px; height: 45px;">
    <div class=col-4 style="margin: auto;">
    <h4 class="form-group sticky1  columns left mobile_title">
        {{'Geography Preferences'}}

    <ul class="nav navbar-nav1" style='display:none'>
      <li class="dropdown">
        <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
          aria-expanded='false'> <span class='caret'></span></a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" [routerLink]=''
              (click)="mstapplicantgeographypreferences_route(null, 'create')"><i class="fa fa-plus"
                aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
        </ul>
      </li>
    </ul>
</h4>
</div>
<div class=col-6></div>
<div class=col-2 style="text-align: right; margin: auto;">
    <!-- <ul class="rightside"> -->
    <!-- <a  [routerLink]='' (click)="mstapplicantgeographypreferences_route(null, 'create')">
    <button type="button" class="btn btn-outline-primary" style="border-color: #fff !important;    color: #fff;
    margin-top: -17%;">Add</button>
    </a> -->
    <button type="button" [routerLink]='' (click)="mstapplicantgeographypreferences_route(null, 'create')" class="btn btn-outline-primary popup-add-button">Add</button>

    <a  class="" [routerLink]='' (click)="onClose()"><img class="closeButton" src="assets/mainmenuicons/icons_close.png"/></a>

<!-- </ul> -->
    </div>
    </div>
    <form [formGroup]="mstapplicantgeographypreference_Form" class="mobile_grid_view">
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  <thead>
    <tr>

      <th scope="col" style="width:25%;">Country</th>
      <th scope="col" style="width:25%;">City</th>
      <th scope="col" style="width:40%;">Remarks</th>
      <!-- <th scope="col" >Attachment</th> -->
      <th scope="col" style="width:10%; text-align:center;">Action</th>
    </tr>
  </thead>
  <tbody style="background: #f0f0f0;" *ngIf="showSkillDetails_input">
            <tr>
            <!--country-->

              <td>
              <app-popupselect [options]="country_List" [optionsEvent]="country_optionsEvent"
                [form]="bocountry" (selectItem)="onSelected_country($event)" [reportid]='wc9rn' [menuid]='wc9rn'
                formControlName="country" id="value" desc="label"></app-popupselect>

              </td>

            <!--city-->

              <td>
              <app-popupselect [options]="city_List" [optionsEvent]="city_optionsEvent" [form]="bocity"
                (selectItem)="onSelected_city($event)" [reportid]='kbg3n' [menuid]='kbg3n' formControlName="city" id="value"
                desc="label"></app-popupselect>
              </td>

              <!-- Remarks -->

              <td>
              <textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks"></textarea>
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

              <!-- Submit & close -->

              <td class="field-add-close-button">
              <i class="fa fa-plus-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

                <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                (click)="skillClose()"></i>
              </td>
            </tr>
          </tbody>
</table>
</form>

  <ng2-smart-table #tbl_mstapplicantgeographypreferences
    (userRowSelect)="handle_mstapplicantgeographypreferences_GridSelected($event)"
    [settings]="mstapplicantgeographypreferences_settings"
    (custom)="onCustom_mstapplicantgeographypreferences_Action($event)"
    (custom)="onCustom_mstapplicantgeographypreferencesAttachment_Action($event)"
    [source]="tbl_mstapplicantgeographypreferences?.source?.data"
    (delete)="mstapplicantgeographypreferences_route($event,'delete')"
    (deleteConfirm)="mstapplicantgeographypreferences_route($event,'delete')"
    (create)="mstapplicantgeographypreferences_route($event,'create')"
    (createConfirm)="mstapplicantgeographypreferences_beforesave($event)"
    (edit)="mstapplicantgeographypreferences_route($event,'edit')"
    (editConfirm)="mstapplicantgeographypreferences_beforesave($event)">
  </ng2-smart-table>`,
  styles: [
    `
    @media only screen and (max-width: 600px) {
      button.btn.btn-outline-primary.popup-add-button{
    position: absolute !important;
    left: -43px !important;
    bottom: -4px !important;
    }
    h4.form-group.sticky1.columns.left{
    white-space: pre !important;
    font-size: 17px !important;
    }
    .closeButton{
      width: 75% !important;
    }
    .mobile_view_geo{
      width: 380px !important;
    }
    .mobile_grid_view{
      width: 380px !important;
    }
    }
    `
  ]

})
export class mstapplicantgeographygrid implements OnInit {

  mstapplicantgeographypreference_Form: FormGroup;

  formData: mstapplicantgeographypreference;
  isadmin = false;
  bfilterPopulate_mstapplicantgeographypreferences: boolean = false;
  mstapplicantgeographypreference_menuactions: any = [];
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  @ViewChild('tbl_mstapplicantgeographypreferences', { static: false }) tbl_mstapplicantgeographypreferences: any;
  country_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  city_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
  mstapplicantgeographypreferences_visiblelist: any;
  mstapplicantgeographypreferences_hidelist: any;
  Deleted_mstapplicantgeographypreference_IDs: string = "";
  mstapplicantgeographypreferences_ID: string = "1";
  mstapplicantgeographypreferences_selectedindex: any;
  ShowTableslist: any;
  pkcol: any;

  IsApplicant: boolean;
  IsAdmin: boolean;
  bSingleRecord: boolean;
  showSkillDetails_input: boolean = false;
  isSubmitted: boolean = false;
  showview: boolean = false;//view or edit mode
  country_List: DropDownValues[];
  city_List: DropDownValues[];
  applicantid_List: DropDownValues[];
  hidelist: any = [];
  objvalues: any = [];

  applicantid: any;
  data: any;
  formid: any;
  bmyrecord: boolean = false;
  maindata: any;
  p_currenturl: any;
  pkList: any;//stores values - used in search, prev, next

  constructor(public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    private router: Router,
    public dialog: DialogService, private fb: FormBuilder,
    private sharedService: SharedService, private currentRoute: ActivatedRoute,
    private spinner: NgxSpinnerService, private toastr: ToastService,
    private sessionService: SessionService, private mstapplicantgeographypreference_service: mstapplicantgeographypreferenceService,) {
    debugger
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }
    this.pkcol = this.data.maindatapkcol;
    this.applicantid = this.data.applicantid;

    this.mstapplicantgeographypreference_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      // applicantid: [null],
      applicantid: this.sessionService.getItem('applicantid'),
      applicantiddesc: [null],
      geographypreferenceid: [null],
      country: ['', Validators.required],
      countrydesc: [null],
      city: ['', Validators.required],
      // city: [''],
      citydesc: [null],
      remarks: [null],
      status: [null],
      statusdesc: [null],
      attachment: [null],
    });

  }
  ngOnInit() {
    this.Set_mstapplicantgeographypreferences_TableConfig();

    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;

    this.pkcol = this.data.maindatapkcol;
    this.applicantid = this.data.applicantid;

    this.mstapplicantgeographypreference_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      // applicantid: [null],
      applicantid: this.sessionService.getItem('applicantid'),
      applicantiddesc: [null],
      geographypreferenceid: [null],
      country: ['', Validators.required],
      countrydesc: [null],
      city: ['', Validators.required],
      // city: [''],
      citydesc: [null],
      remarks: [null],
      status: [null],
      statusdesc: [null],
      attachment: [null],
    });
    this.FillData();

    this.mstapplicantgeographypreference_service.getDefaultData().then(res => {
      debugger
      this.applicantid_List = res.list_applicantid.value;
      this.country_List = res.list_country.value;
      console.log('this.applicantid_List ', this.applicantid_List);
      console.log('this.country_List ', this.country_List);


    }).catch((err) => { this.spinner.hide(); console.log(err); });

    //autocomplete
    this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_List().then(res => {
      this.pkList = res as mstapplicantgeographypreference[];
      this.pkoptionsEvent.emit(this.pkList);
    }
    ).catch((err) => { this.spinner.hide(); console.log(err); });
    //setting the flag that the screen is not touched
    this.mstapplicantgeographypreference_Form.markAsUntouched();
    this.mstapplicantgeographypreference_Form.markAsPristine();
  }

  get f() { return this.mstapplicantgeographypreference_Form.controls; }


  resetForm() {
    if (this.mstapplicantgeographypreference_Form != null)
      this.mstapplicantgeographypreference_Form.reset();
    this.mstapplicantgeographypreference_Form.patchValue({
    });
    this.PopulateFromMainScreen(this.data, false);
    this.PopulateFromMainScreen(this.dynamicconfig.data, true);
  }

  skillClose() {
    this.mstapplicantgeographypreference_Form.reset();
    this.showSkillDetails_input = false;
  };
  // addSkills() {
  //     debugger
  //     this.showSkillDetails_input = true;
  //     // this.getData();
  // };

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
            this.mstapplicantgeographypreference_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicantgeographypreference_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicantgeographypreference_Form.controls[key] != undefined) {
                this.mstapplicantgeographypreference_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }

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

  async onSubmitData(bclear: any) {
    debugger;
    this.isSubmitted = true;
    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);
    if (!this.mstapplicantgeographypreference_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantgeographypreference_Form.getRawValue();

    // if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    // this.fileAttachmentList = this.fileattachment.getAllFiles();
    console.log(this.formData);
    this.spinner.show();
    this.mstapplicantgeographypreference_service.saveOrUpdate_mstapplicantgeographypreferences(this.formData).subscribe((res: any) => {
      console.log("Reference Log", res);

      this.spinner.hide();
      debugger;
      this.toastr.addSingle("success", "", "Successfully saved");
      this.sessionService.setItem("attachedsaved", "true")
      this.objvalues.push((res as any).mstapplicantgeographypreference);
      this.ngOnInit();
      this.mstapplicantgeographypreference_Form.reset();
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
          this.objvalues.push((res as any).mstapplicantgeographypreference);
          this.dialogRef.close(this.objvalues);
        }
        else {
          this.FillData(
          );
        }
      }
      this.mstapplicantgeographypreference_Form.markAsUntouched();
      this.mstapplicantgeographypreference_Form.markAsPristine();
    },
      err => {
        debugger;
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
        console.log(err);
      }
    )
  }


  mstapplicantgeographypreferenceshtml() {

    let ret = "";
    ret += `
        <table class="table table-hover geographydetails_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr>
            <th scope="row"  style="width:25% !important">##countrydesc##</th>
            <th scope="row"  style="width:25% !important">##citydesc##</th>
            <th scope="row"  style="width:40% !important">##remarks##</th>
            <!--<th scope="row"  style="width:321px !important">##attachment##</th>-->
          </tr>
        </tbody>
      </table>

        <!--<div class='card1'>
<h3 style="margin: 0 auto !important;" class='profile_sectionitem_sub'>##countrydesc## - ##citydesc##</h3>
<p  style="margin: 0 auto !important;line-height: 2.0rem !important">##remarks##</p>
</div>-->
`;
    return ret;
  }
  FillData() {
    this.Set_mstapplicantgeographypreferences_TableConfig();
    this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_ByApplicantID(this.applicantid).then(res => {
      this.mstapplicantgeographypreference_menuactions = res.mstapplicantgeographypreference_menuactions;
      this.Set_mstapplicantgeographypreferences_TableConfig();
      this.mstapplicantgeographypreferences_LoadTable(res.mstapplicantgeographypreference);
    })
  };

  onSelected_country(countryDetail: any) {
    debugger
    if (countryDetail.value && countryDetail) {
      this.mstapplicantgeographypreference_Form.patchValue({
        country: countryDetail.value,
        countrydesc: countryDetail.label,

      });
      this.mstapplicantgeographypreference_service.getList_city(countryDetail.value).then((res: any) => {

        // this.country_List = res as DropDownValues[]
        this.city_List = res as DropDownValues[]

      }).catch((err) => { this.spinner.hide(); console.log(err); });

    }
  };

  onSelected_city(cityDetail: any) {

    if (cityDetail.cityid && cityDetail) {
      this.mstapplicantgeographypreference_Form.patchValue({
        city: cityDetail.cityid,
        citydesc: cityDetail.name,

      });

      this.mstapplicantgeographypreference_service.getList(cityDetail.cityid).then((res: any) => {
        console.log(res)

        this.city_List = res as DropDownValues[]
      }).catch((err) => {
        this.spinner.hide(); console.log(err);
        //console.log(err);
      });
    }
  }


  Add_mstapplicantgeographypreference(event: any, geographypreferenceid: any, applicantid: any) {
    debugger;

    this.showSkillDetails_input = true;
    this.ngOnInit();
    let add = false;
    if (event == null) add = true;

  }

  Edit_mstapplicantgeographypreference(event: any, geographypreferenceid: any, applicantid: any) {
    debugger;

    this.showSkillDetails_input = true;
    let add = false;
    if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    console.log(event, geographypreferenceid, applicantid);

    this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_ByEID(event.data.pkcol).then(res => {
      this.mstapplicantgeographypreference_Form.patchValue({
        applicantid: res.mstapplicantgeographypreference.applicantid,
        applicantiddesc: res.mstapplicantgeographypreference.applicantiddesc,
        geographypreferenceid: res.mstapplicantgeographypreference.geographypreferenceid,
        country: res.mstapplicantgeographypreference.country,
        countrydesc: res.mstapplicantgeographypreference.countrydesc,
        city: res.mstapplicantgeographypreference.city,
        citydesc: res.mstapplicantgeographypreference.citydesc,
        remarks: res.mstapplicantgeographypreference.remarks,
        status: res.mstapplicantgeographypreference.status,
        statusdesc: res.mstapplicantgeographypreference.statusdesc,
        attachment: "[]",
      });
      setTimeout(() => {
        if (this.f.country.value && this.f.country.value != "" && this.f.country.value != null) this.mstapplicantgeographypreference_service.getList_city(this.f.country.value).then(res => {

          // if (this.f.country.value && this.f.country.value != "" && this.f.country.value != null) this.mstapplicantgeographypreference_service.getList_city().then(res => {
          this.city_List = res as DropDownValues[];
        }).catch((err) => { console.log(err); });
      });
    });
  }

  // Old Code

  // AddOrEdit_mstapplicantgeographypreference(event: any, geographypreferenceid: any, applicantid: any) {
  //     debugger;


  //     let add = false;
  //     if (event == null) add = true;
  //     let childsave = true;
  //     if (this.pkcol != undefined && this.pkcol != null) childsave = true;
  //     this.dialog.open(mstapplicantgeographypreferenceComponent,
  //         {
  //             data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, geographypreferenceid, applicantid, visiblelist: this.mstapplicantgeographypreferences_visiblelist, hidelist: this.mstapplicantgeographypreferences_hidelist, ScreenType: 2 },
  //         }
  //     ).onClose.subscribe(res => {
  //         if (res) {
  //             if (add) {
  //                 for (let i = 0; i < res.length; i++) {
  //                     this.tbl_mstapplicantgeographypreferences.source.add(res[i]);
  //                 }
  //                 this.tbl_mstapplicantgeographypreferences.source.refresh();
  //             }
  //             else {
  //                 this.tbl_mstapplicantgeographypreferences.source.update(event.data, res[0]);
  //             }
  //         }
  //     });
  // }

  onDelete_mstapplicantgeographypreference(event: any, childID: number, i: number) {
    if (confirm('Do you want to delete this record?')) {
      this.mstapplicantgeographypreference_service.delete_mstapplicantgeographypreference(childID).then(res => {
        this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_ByApplicantID(this.applicantid).then(res => {
          this.ngOnInit();
          this.mstapplicantgeographypreferences_LoadTable(res);
        });
      })
    } else {
      return;
    }
    // if (childID != null)
    //     this.Deleted_mstapplicantgeographypreference_IDs += childID + ",";
    // this.tbl_mstapplicantgeographypreferences.source.data.splice(i, 1);
    //this.updateGrandTotal();
  }
  mstapplicantgeographypreferences_settings: any;

  show_mstapplicantgeographypreferences_Checkbox() {
    //debugger;;
    if (this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'multi';
    this.tbl_mstapplicantgeographypreferences.source.initGrid();
  }
  delete_mstapplicantgeographypreferences_All() {
    this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'single';
  }
  show_mstapplicantgeographypreferences_Filter() {
    setTimeout(() => {
      //  this.Set_mstapplicantgeographypreferences_TableDropDownConfig();
    });
    if (this.tbl_mstapplicantgeographypreferences.source.settings != null) this.tbl_mstapplicantgeographypreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantgeographypreferences.source.settings['hideSubHeader'];
    this.tbl_mstapplicantgeographypreferences.source.initGrid();
  }
  show_mstapplicantgeographypreferences_InActive() {
  }
  enable_mstapplicantgeographypreferences_InActive() {
  }
  async Set_mstapplicantgeographypreferences_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_mstapplicantgeographypreferences) {

      var clone = this.sharedService.clone(this.tbl_mstapplicantgeographypreferences.source.settings);
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_applicantid.value)), }, };
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_applicantid.value)), }, };
      this.tbl_mstapplicantgeographypreferences.source.settings = clone;
      this.tbl_mstapplicantgeographypreferences.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_mstapplicantgeographypreferences.source.settings);
      if (clone.columns['country'] != undefined) clone.columns['country'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_country.value)), }, };
      if (clone.columns['country'] != undefined) clone.columns['country'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_country.value)), }, };
      this.tbl_mstapplicantgeographypreferences.source.settings = clone;
      this.tbl_mstapplicantgeographypreferences.source.initGrid();
    }
    this.bfilterPopulate_mstapplicantgeographypreferences = true;
  }
  async mstapplicantgeographypreferences_beforesave(event: any) {
    event.confirm.resolve(event.newData);



  }
  Set_mstapplicantgeographypreferences_TableConfig() {
    this.mstapplicantgeographypreferences_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        edit: true, // true,
        delete: (this.IsApplicant || this.IsAdmin),
        position: 'right',
        custom: this.mstapplicantgeographypreference_menuactions
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
            cell = this.mstapplicantgeographypreferenceshtml();
            var divrow = JSON.parse(JSON.stringify(row));


            return this.sharedService.HtmlValue(divrow, cell);
          },
        },
      },
    };
  }
  mstapplicantgeographypreferences_LoadTable(mstapplicantgeographypreference = new LocalDataSource()) {
    debugger;;
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantgeographypreferences_ID) >= 0) {
      if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source = new LocalDataSource();
      if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source.load(mstapplicantgeographypreference as any as LocalDataSource);
      if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source.setPaging(1, 20, true);
    }
  }
  mstapplicantgeographypreferences_route(event: any, action: any) {
    debugger
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        // this.AddOrEdit_mstapplicantgeographypreference(event, null, this.applicantid);
        this.Add_mstapplicantgeographypreference(event, null, this.applicantid);
        break;
      case 'view':
        break;
      case 'edit':
        this.Edit_mstapplicantgeographypreference(event, event.data.geographypreferenceid, this.applicantid);
        this.Edit_mstapplicantgeographypreference(event, event.data.geographypreferenceid, this.applicantid);
        break;
      case 'delete':
        this.onDelete_mstapplicantgeographypreference(event, event.data.geographypreferenceid, ((this.tbl_mstapplicantgeographypreferences.source.getPaging().page - 1) * this.tbl_mstapplicantgeographypreferences.source.getPaging().perPage) + event.index);
        this.tbl_mstapplicantgeographypreferences.source.refresh();
        break;
    }
  }
  mstapplicantgeographypreferences_onDelete(obj) {
    let geographypreferenceid = obj.data.geographypreferenceid;
    if (confirm('Are you sure to delete this record ?')) {
      this.mstapplicantgeographypreference_service.delete_mstapplicantgeographypreference(geographypreferenceid).then(res =>
        this.mstapplicantgeographypreferences_LoadTable()
      );
    }
  }
  async onCustom_mstapplicantgeographypreferences_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantgeographypreferences");
    let formname = (objbomenuaction as any).actionname;
  }

  async onCustom_mstapplicantgeographypreferencesAttachment_Action(event: any, geographypreferenceid: any, applicantid: any) {
    
    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantgeographypreferences");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantgeographypreferences") {

      let add = false;
      if (event == null) add = true;
      let childsave = true;
      if (this.pkcol != undefined && this.pkcol != null) childsave = true;
      this.dialog.open(mstapplicantgeographypreferenceComponent,
        {
          data: { showAttachmentView: true, save: childsave, maindatapkcol: this.pkcol, event, geographypreferenceid, applicantid, visiblelist: this.mstapplicantgeographypreferences_visiblelist, hidelist: this.mstapplicantgeographypreferences_hidelist, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
        if (res) {
          if (add) {
            for (let i = 0; i < res.length; i++) {
              this.tbl_mstapplicantgeographypreferences.source.add(res[i]);
            }
            this.tbl_mstapplicantgeographypreferences.source.refresh();
          }
          else {
            this.tbl_mstapplicantgeographypreferences.source.update(event.data, res[0]);
          }
        }
      });
    }
  }

  mstapplicantgeographypreferences_Paging(val) {
    //debugger;;
    this.tbl_mstapplicantgeographypreferences.source.setPaging(1, val, true);
  }

  handle_mstapplicantgeographypreferences_GridSelected(event: any) {
    this.mstapplicantgeographypreferences_selectedindex = this.tbl_mstapplicantgeographypreferences.source.findIndex(i => i.geographypreferenceid === event.data.geographypreferenceid);
  }
  Is_mstapplicantgeographypreferences_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantgeographypreferences_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  onClose() {
    this.dialogRef.close();

  }
  //end of Grid Codes mstapplicantgeographypreferences
}
