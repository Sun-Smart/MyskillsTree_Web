import {  Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { mstapplicantgeographypreferenceService } from '../../../service/mstapplicantgeographypreference.service';
import { mstapplicantgeographypreferenceComponent } from './mstapplicantgeographypreference.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicantgeographypreference } from '../../../model/mstapplicantgeographypreference.model';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';

@Component({
  selector: 'app-applicantgeographygrid',
  template: `
    <div *ngIf="showWebviewDetect" class= "row mobile_view_geo"   style="background: #ebf3fc; color: #000; padding: 5px; height: 45px;">
    <div class=col-4 style="margin: auto;">
    <h4 class="form-group sticky1  columns left mobile_title">
        {{'Location'}}
</h4>
</div>
<div class=col-6></div>
<div class=col-2 style="text-align: right; margin: auto;display:flex;justify-content:end;">

    <a class="alert-success" [routerLink]='' (click)="mstapplicantgeographypreferences_route(null, 'create')"><i
class="fa fa-plus"></i> Add</a>

<a class="alert-danger" [routerLink]='' (click)="onClose()"><i
class="fa fa-close"></i> Close</a>

    </div>
    </div>

    <div *ngIf="showMobileDetectskill" class= "row mobile_view_geo"   style="background: #ebf3fc; color: #000; padding: 5px;">
    <div class=col-4 >
    <h4 class="columns left" style="font-size: 16px;">
        {{'Location'}}
</h4>
</div>
<div class="col-4">
</div>
<div class=col-4 style="text-align: end; margin: auto;display:flex;justify-content:end;">

<a class="alert-success" [routerLink]='' (click)="mstapplicantgeographypreferences_route(null, 'create')"><i
class="fa fa-plus"></i> Add</a>

<a class="alert-danger" [routerLink]='' (click)="onClose()"><i
class="fa fa-close"></i> Close</a>
    </div>
    </div>
    <form [formGroup]="mstapplicantgeographypreference_Form" class="mobile_grid_view" *ngIf="showWebviewDetect">
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  <thead>
    <tr>

      <th scope="col" style="width:25%;">Country</th>
      <th scope="col" style="width:25%;">City</th>
      <th scope="col" style="width:40%;">Remarks</th>
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

              <!-- Submit & close -->

              <td class="field-add-close-button">
              <i class="fa fa-check-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

                <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                (click)="skillClose()"></i>
              </td>
            </tr>
          </tbody>
</table>
</form>

<form [formGroup]="mstapplicantgeographypreference_Form" class="mobile_grid_view" *ngIf="showMobileDetectskill">

<div class="row" *ngIf="showSkillDetails_input" style="width: 320px;margin: 10px !important;">
<div class="col-md-12">
<label>Country</label>
<app-popupselect [options]="country_List" [optionsEvent]="country_optionsEvent" style="width: 100%;"
                [form]="bocountry" (selectItem)="onSelected_country($event)" [reportid]='wc9rn' [menuid]='wc9rn'
                formControlName="country" id="value" desc="label"></app-popupselect>

                <app-field-error-display [displayError]="f.country.errors?.required" errorMsg="Enter {{'Country' | translate}}"
                >
                </app-field-error-display>
</div>
<div class="col-md-12">
<label>City</label>
<app-popupselect [options]="city_List" [optionsEvent]="city_optionsEvent" [form]="bocity" style="width: 100%;"
                (selectItem)="onSelected_city($event)" [reportid]='kbg3n' [menuid]='kbg3n' formControlName="city" id="value"
                desc="label"></app-popupselect>

                <app-field-error-display [displayError]="f.city.errors?.required" errorMsg="Enter {{'City' | translate}}">
                </app-field-error-display>

</div>
<div class="col-md-12">
<label>Remarks</label>
                <textarea name="w3review" rows="1" cols="10" class="form-control" formControlName="remarks"></textarea>

</div>
<div class="col" style="position: relative;left: 120px;top: 7px;">
                <i class="fa fa-plus-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

                <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                (click)="skillClose()"></i>
                </div>

</div>
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
    right: 50px !important;
    bottom: -3px !important;
    }
    h4.form-group.sticky1.columns.left{
    white-space: pre !important;
    font-size: 17px !important;
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
  showMobileDetectskill: boolean = false;
  showWebviewDetect: boolean = true;
  isMobile: any;
  constructor(public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService, private fb: FormBuilder,
    private sharedService: SharedService, private currentRoute: ActivatedRoute,
    private spinner: NgxSpinnerService, private toastr: ToastService,
    private sessionService: SessionService, private mstapplicantgeographypreference_service: mstapplicantgeographypreferenceService,) {
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }

  }
  ngOnInit() {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.showMobileDetectskill = true;
      this.showWebviewDetect = false;
      /* your code here */
    }
    this.Set_mstapplicantgeographypreferences_TableConfig();

    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;

    this.applicantid = this.data.applicantid;
    this.pkcol = this.data.maindatapkcol;

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
    this.FillData();

    //autocomplete
    this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_List().then(res => {
      this.pkList = res as mstapplicantgeographypreference[];
      this.pkoptionsEvent.emit(this.pkList);
    }).catch((err) => { this.spinner.hide(); });

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
  getdata() {
    this.mstapplicantgeographypreference_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.country_List = res.list_country.value;
    }).catch((err) => { this.spinner.hide(); });
  }
  skillClose() {
    this.mstapplicantgeographypreference_Form.reset();
    this.showSkillDetails_input = false;
  };

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
      this.onSubmitData(false);
    }
    else {
      this.onSubmitData(false);
    }
  };

  async onSubmitData(bclear: any) {
    this.isSubmitted = true;
    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);

    if (!this.mstapplicantgeographypreference_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    };

    this.formData = this.mstapplicantgeographypreference_Form.getRawValue();

    this.spinner.show();
    this.mstapplicantgeographypreference_service.saveOrUpdate_mstapplicantgeographypreferences(this.formData).subscribe((res: any) => {
      this.spinner.hide();
      this.toastr.addSingle("success", "", "Successfully saved");
      this.sessionService.setItem("attachedsaved", "true")
      this.objvalues.push((res as any).mstapplicantgeographypreference);
      this.mstapplicantgeographypreference_Form.reset();
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
          this.objvalues.push((res as any).mstapplicantgeographypreference);
          this.dialogRef.close(this.objvalues);
        }
        else {
          this.FillData();
        }
      }
      this.mstapplicantgeographypreference_Form.markAsUntouched();
      this.mstapplicantgeographypreference_Form.markAsPristine();
    },
      err => {
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
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
`;
    return ret;
  }

  mstapplicantgeographypreferenceshtml1() {

    let ret = "";
    ret += `
    <ul class="list-group" style="line-height: 15px;margin: 0px;">
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Country </span>: <label style="font-size: small;">##countrydesc##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">City </span>: <label style="font-size: small;">##citydesc##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Remarks :</span> <label style="font-size: small;">##remarks##</label></li>
  </ul>
`;
    return ret;
  }
  FillData() {

    this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_ByApplicantID(this.applicantid).then(res => {
      this.mstapplicantgeographypreference_menuactions = res.mstapplicantgeographypreference_menuactions;
      this.Set_mstapplicantgeographypreferences_TableConfig();
      this.mstapplicantgeographypreferences_LoadTable(res.mstapplicantgeographypreference);
    })
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
  }


  Add_mstapplicantgeographypreference(event: any, geographypreferenceid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    this.getdata();
    this.ngOnInit();
    let add = false;
    if (event == null) add = true;

  }

  Edit_mstapplicantgeographypreference(event: any, geographypreferenceid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    let add = false;
    if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;

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
        this.getdata();
        if (this.f.country.value && this.f.country.value != "" && this.f.country.value != null) this.mstapplicantgeographypreference_service.getList_city(this.f.country.value).then(res => {
          this.city_List = res as DropDownValues[];
        }).catch((err) => { });
      });
    });
  }

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
  }
  mstapplicantgeographypreferences_settings: any;

  show_mstapplicantgeographypreferences_Checkbox() {
    if (this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'multi';
    this.tbl_mstapplicantgeographypreferences.source.initGrid();
  }
  delete_mstapplicantgeographypreferences_All() {
    this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'single';
  }
  show_mstapplicantgeographypreferences_Filter() {
    if (this.tbl_mstapplicantgeographypreferences.source.settings != null) this.tbl_mstapplicantgeographypreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantgeographypreferences.source.settings['hideSubHeader'];
    this.tbl_mstapplicantgeographypreferences.source.initGrid();
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
        editButtonContent: '<i class="fa fa-edit commonEditicon commonEditicon1" title="Edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon commonDeleteicon1" title="Delete"></i>',
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
            cell = this.mstapplicantgeographypreferenceshtml();
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              cell = this.mstapplicantgeographypreferenceshtml1();
            }
            var divrow = JSON.parse(JSON.stringify(row));
            return this.sharedService.HtmlValue(divrow, cell);
          },
        },
      },
    };
  }
  mstapplicantgeographypreferences_LoadTable(mstapplicantgeographypreference = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantgeographypreferences_ID) >= 0) {
      if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source = new LocalDataSource();
      if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source.load(mstapplicantgeographypreference as any as LocalDataSource);
      if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source.setPaging(1, 20, true);
    }
  }
  mstapplicantgeographypreferences_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.Add_mstapplicantgeographypreference(event, null, this.applicantid);
        break;
      case 'view':
        break;
      case 'edit':
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
