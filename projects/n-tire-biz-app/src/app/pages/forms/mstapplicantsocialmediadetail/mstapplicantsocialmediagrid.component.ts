import {  Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer } from "@angular/platform-browser";
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { mstapplicantsocialmediadetailService } from '../../../service/mstapplicantsocialmediadetail.service';
import { mstapplicantsocialmediadetailComponent } from './mstapplicantsocialmediadetail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicantsocialmediadetail } from '../../../model/mstapplicantsocialmediadetail.model';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';


@Component({
  selector: 'app-applicantsocialmediagrid',
  template: `
    <div *ngIf="showWebviewDetect" class="row form-group sticky1" style=" background: #ebf3fc !important;color: #000;padding: 5px;">

<div class="col-4">
    <h4 class="columns left">{{'Social info'}}</h4>
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

                <button type="button" class="btn btn-outline-primary popup-add-button"
                [routerLink]='' (click)="mstapplicantsocialmediadetails_route(null, 'create')" title = "Add Details">Add</button>

                <a  class="" [routerLink]='' (click)="onClose()"><img style="width:20px;" class="social_close_btn" src="assets/mainmenuicons/icons_close.png"/></a>

</div>


</div>


<div *ngIf="showMobileDetectskill" class="row form-group sticky1" style=" background: #ebf3fc !important;color: #000;padding: 5px;">

<div class="col-4">
    <h4 class="columns left">{{'Social info'}}</h4>
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

                <button type="button" class="btn btn-outline-primary popup-add-button"
                [routerLink]='' (click)="mstapplicantsocialmediadetails_route(null, 'create')" title = "Add Details">Add</button>

                <a  class="" [routerLink]='' (click)="onClose()"><img style="width:20px;"  src="assets/mainmenuicons/icons_close.png"/></a>

</div>


</div>
<form [formGroup]="mstapplicantsocialmediadetail_Form" class="mobile_grid_view" *ngIf="showWebviewDetect">
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  <thead>
    <tr>
      <th style="width: 23%;">Social Media</th>
      <th style="width: 21.5%;">Handle Name</th>
      <th style="width: 21.5%;">Url</th>
      <th style="width: 25%;">Remarks</th>
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
        </td>

        <!-- Remarks -->

        <td>
        <textarea autosize rows="3" cols="10" onlyGrow="true" *ngIf="!showview" id="achievementdetails" required
        formControlName="remarks" class="form-control">
        </textarea>
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



<form [formGroup]="mstapplicantsocialmediadetail_Form" class="mobile_grid_view" *ngIf="showMobileDetectskill">

<div class="row" *ngIf="showSkillDetails_input" style="width: 320px;margin: 10px !important;">
<div class="col-md-12">
<label>Social Media</label>
<select *ngIf="!showview" id="socialmedianame" required (change)="socialmedianame_onChange($event.target)"
          formControlName="socialmedianame" class="form-control">
          <option [ngValue]="null" selected>-Select-</option>
          <option *ngFor="let item of socialmedianame_List" value="{{item.value}}">{{item.label}}</option>
        </select>
</div>
<div class="col-md-12">
<label>Handle Name</label>
<input *ngIf="!showview" id="handlename" formControlName="handlename" class="form-control">
</div>
<div class="col-md-12">
<label>URL</label>
<input *ngIf="!showview" id="url" required formControlName="url" class="form-control">
</div>
<div class="col-md-12">
<label>Remarks</label>
<textarea autosize rows="1" cols="10" onlyGrow="true" *ngIf="!showview" id="achievementdetails" required
        formControlName="remarks" class="form-control">
        </textarea>
</div>

<div class="col" style="position: relative;left: 120px;top: 7px;">
<i class="fa fa-plus-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

                <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                (click)="skillClose()"></i>

</div>


</div>



</form>
  <ng2-smart-table #tbl_mstapplicantsocialmediadetails
    (userRowSelect)="handle_mstapplicantsocialmediadetails_GridSelected($event)"
    [settings]="mstapplicantsocialmediadetails_settings"
    (custom)="onCustom_mstapplicantsocialmediadetails_Action($event)"
    (custom)="onCustom_mstapplicantsocialmediadetailsAttachment_Action($event)"
    [source]="tbl_mstapplicantsocialmediadetails?.source?.data"
    (delete)="mstapplicantsocialmediadetails_route($event,'delete')"
    (deleteConfirm)="mstapplicantsocialmediadetails_route($event,'delete')"
    (create)="mstapplicantsocialmediadetails_route($event,'create')"
    (createConfirm)="mstapplicantsocialmediadetails_beforesave($event)"
    (edit)="mstapplicantsocialmediadetails_route($event,'edit')"
    (editConfirm)="mstapplicantsocialmediadetails_beforesave($event)">
  </ng2-smart-table>
    `,
  styles: [
    `
      @media only screen and (max-width: 600px) {
        h4.columns.left{
          white-space: nowrap;
          font-size: 20px;
          height: 50px;
          margin-top: 16px !important;
        }
        button.btn.btn-outline-primary.popup-add-button{
          position: absolute !important;
          right: 50px !important;
          bottom: -3px !important;
        }
        .mobile_view_social{
          word-break: normal !important;
        }
      }
      `
  ]
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
  ShowTableslist: any;
  pkcol: any;
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

  applicantid: any;
  data: any;
  maindata: any;
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentFieldJson: any[] = [];
  attachmentVisible: boolean = true;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;
  viewHtml: any = '';//stores html view of the screen
  showMobileDetectskill: boolean = false;
  showWebviewDetect: boolean = true;
  isMobile: any;

  constructor(
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    public dialog: DialogService,
    private sharedService: SharedService,
    private fb: FormBuilder,
    private sessionService: SessionService,
    private toastr: ToastService,
    private mstapplicantsocialmediadetail_service: mstapplicantsocialmediadetailService,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService
  ) {
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }
  }

  ngOnInit() {
    debugger
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      this.showMobileDetectskill = true;
      this.showWebviewDetect = false;
      /* your code here */
    }
    this.Set_mstapplicantsocialmediadetails_TableConfig();
    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;

    this.pkcol = this.data.maindatapkcol;
    this.applicantid = this.data.applicantid

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

    this.FillData();
    this.mstapplicantsocialmediadetail_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.socialmedianame_List = res.list_socialmedianame.value;
    }).catch((err) => { this.spinner.hide(); });
  }
  skillClose() {
    this.mstapplicantsocialmediadetail_Form.reset();
    this.showSkillDetails_input = false;
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
      this.onSubmitData(false);
    }
    else {
      this.onSubmitData(false);
    }
  };


  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.mstapplicantsocialmediadetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstapplicantsocialmediadetail_Form.getRawValue();
    if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
    obj.fileAttachmentList = this.fileattachment.getAllFiles();
    await this.sharedService.upload(this.fileAttachmentList);
    this.attachmentlist = [];
    if (this.fileattachment) this.fileattachment.clear();
    this.objvalues.push(obj);
    this.dialogRef.close(this.objvalues);
  }


  async onSubmitData(bclear: any) {
    this.isSubmitted = true;
    let strError = "";
    if (!this.mstapplicantsocialmediadetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    };
    if (strError != "") return this.sharedService.alert(strError);

    if (!this.validate()) {
      return;
    };

    this.formData = this.mstapplicantsocialmediadetail_Form.getRawValue();

    this.spinner.show();

    this.mstapplicantsocialmediadetail_service.saveOrUpdate_mstapplicantsocialmediadetails(this.formData).subscribe(
      async res => {
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.spinner.hide();
        this.toastr.addSingle("success", "", "Successfully saved");
        this.sessionService.setItem("attachedsaved", "true")
        this.objvalues.push((res as any).mstapplicantsocialmediadetail);
        this.mstapplicantsocialmediadetail_Form.reset();
        this.ngOnInit();
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
            this.FillData();
          }
        }
        this.mstapplicantsocialmediadetail_Form.markAsUntouched();
        this.mstapplicantsocialmediadetail_Form.markAsPristine();
      },
      err => {
        this.spinner.hide();
        this.toastr.addSingle("error", "", err.error);
      });


  };

  validate() {
    let ret = true;
    return ret;
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
          <tr style="word-break: break-word;">
            <th style="white-space: break-spaces;width:25.5%;" class="mobile_view_social">##socialmedianamedesc##</th>
            <th style="white-space: break-spaces;width:24%;" class="mobile_view_social">##handlename##</th>
            <th style="white-space: break-spaces;width:24%;" class="mobile_view_social"><a href="https://##url##" target="_blank">##url##</a></th>
            <th style="white-space: break-spaces;" class="mobile_view_social">##remarks##</th>
          </tr>
        </tbody>
      </table>
`;
    return ret;
  };
  mstapplicantsocialmediadetailshtml1() {
    let ret = "";
    ret += `

      <ul class="list-group" style="line-height: 15px;margin: 0px;">
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Social Media </span>: <label style="font-size: small;">##socialmedianamedesc##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Handle Name </span>: <label style="font-size: small;">##handlename##</label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">URL :</span> <label style="font-size: small;"><a href="https://##url##" target="_blank">##url##</a></label></li>
    <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Remarks :</span> <label style="font-size: small;">##remarks##</label></li>
  </ul>
`;
    return ret;
  };

  FillData() {
    this.Set_mstapplicantsocialmediadetails_TableConfig();

    this.mstapplicantsocialmediadetail_service.get_mstapplicantsocialmediadetails_ByApplicantID(this.applicantid).then((res: any) => {
      this.mstapplicantsocialmediadetail_menuactions = res.mstapplicantsocialmediadetail_menuactions;
      this.Set_mstapplicantsocialmediadetails_TableConfig();
      this.mstapplicantsocialmediadetails_LoadTable(res.mstapplicantsocialmediadetail);
    });
  }
  //start of Grid Codes mstapplicantsocialmediadetails
  mstapplicantsocialmediadetails_settings: any;

  show_mstapplicantsocialmediadetails_Checkbox() {
    if (this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'multi';
    this.tbl_mstapplicantsocialmediadetails.source.initGrid();
  }
  delete_mstapplicantsocialmediadetails_All() {
    this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'single';
  }
  show_mstapplicantsocialmediadetails_Filter() {
    if (this.tbl_mstapplicantsocialmediadetails.source.settings != null) this.tbl_mstapplicantsocialmediadetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantsocialmediadetails.source.settings['hideSubHeader'];
    this.tbl_mstapplicantsocialmediadetails.source.initGrid();
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
        custom: this.mstapplicantsocialmediadetail_menuactions
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
            cell = this.mstapplicantsocialmediadetailshtml();
            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              cell = this.mstapplicantsocialmediadetailshtml1();
            }
            var divrow = JSON.parse(JSON.stringify(row));


            return this.sharedService.HtmlValue(divrow, cell);
          },
        },
      },
    };
  }
  mstapplicantsocialmediadetails_LoadTable(mstapplicantsocialmediadetail = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantsocialmediadetails_ID) >= 0) {
      if (this.tbl_mstapplicantsocialmediadetails != undefined) this.tbl_mstapplicantsocialmediadetails.source = new LocalDataSource();
      if (this.tbl_mstapplicantsocialmediadetails != undefined) this.tbl_mstapplicantsocialmediadetails.source.load(mstapplicantsocialmediadetail as any as LocalDataSource);
      if (this.tbl_mstapplicantsocialmediadetails != undefined) this.tbl_mstapplicantsocialmediadetails.source.setPaging(1, 20, true);
    }
  }

  Add_mstapplicantsocialmediadetail(event: any, socialrefid: any, applicantid: any) {

    this.showSkillDetails_input = true;
    this.ngOnInit();

    let add = false;
    if (event == null) add = true;

  }

  Edit_mstapplicantsocialmediadetail(event: any, socialrefid: any, applicantid: any) {

    this.showSkillDetails_input = true;
    this.ngOnInit();
    let add = false;
    if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;

    this.mstapplicantsocialmediadetail_service.get_mstapplicantsocialmediadetails_ByEID(event.data.pkcol).then(res => {
      this.mstapplicantsocialmediadetail_Form.patchValue({
        applicantid: res.mstapplicantsocialmediadetail.applicantid,
        applicantiddesc: res.mstapplicantsocialmediadetail.applicantiddesc,
        socialrefid: res.mstapplicantsocialmediadetail.socialrefid,
        socialmedianame: res.mstapplicantsocialmediadetail.socialmedianame,
        socialmedianamedesc: res.mstapplicantsocialmediadetail.socialmedianamedesc,
        handlename: res.mstapplicantsocialmediadetail.handlename,
        url: res.mstapplicantsocialmediadetail.url,
        remarks: res.mstapplicantsocialmediadetail.remarks,
        attachment: JSON.parse(res.mstapplicantsocialmediadetail.attachment),
        status: res.mstapplicantsocialmediadetail.status,
        statusdesc: res.mstapplicantsocialmediadetail.statusdesc,
      });
    });
  };

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
  }

    mstapplicantsocialmediadetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.Add_mstapplicantsocialmediadetail(event, null, this.applicantid);
                break;
            case 'view':
                break;
            case 'edit':
                this.Edit_mstapplicantsocialmediadetail(event, event.data.socialrefid, this.applicantid);
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

    async onCustom_mstapplicantsocialmediadetailsAttachment_Action(event: any, socialrefid: any, applicantid: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantsocialmediadetails");
        let formname = (objbomenuaction as any).actionname;
        if (formname == "mstapplicantsocialmediadetails") {
            let add = false;
            if (event == null) add = true;
            let childsave = true;
            if (this.pkcol != undefined && this.pkcol != null) childsave = true;

            this.dialog.open(mstapplicantsocialmediadetailComponent,
                {
                    data: { showAttachment: true, save: childsave, maindatapkcol: this.pkcol, event, socialrefid, applicantid, visiblelist: this.mstapplicantsocialmediadetails_visiblelist, hidelist: this.mstapplicantsocialmediadetails_hidelist, ScreenType: 2 },
                }
            ).onClose.subscribe(res => {
                if (res) {
                    if (add) {
                        for (let i = 0; i < res.length; i++) {
                            this.tbl_mstapplicantsocialmediadetails.source.add(res[i]);
                        }
                        this.tbl_mstapplicantsocialmediadetails.source.refresh();
                    }
                    else {
                        this.tbl_mstapplicantsocialmediadetails.source.update(event.data, res[0]);
                    }
                }
            });
        }
    }

    mstapplicantsocialmediadetails_Paging(val) {
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
        this.dialogRef.close();
    }
    //end of Grid Codes mstapplicantsocialmediadetails
  }
