import { Component, OnInit, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { mstapplicantlanguagedetailService } from '../../../service/mstapplicantlanguagedetail.service';
import { mstapplicantlanguagedetailComponent } from './mstapplicantlanguagedetail.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { mstapplicantlanguagedetail } from '../../../model/mstapplicantlanguagedetail.model';
import { AttachmentComponent } from '../../../custom/attachment/attachment.component';


@Component({
  selector: 'app-applicantlanguagegrid',
  styles: [`
     @media only screen and (max-width: 600px) {
      button.btn.btn-outline-primary.popup-add-button{
        position: absolute !important;
        right: 50px !important;
        bottom: -3px !important;
    }
    .row.form-group.sticky1{
      height: 50px !important;
    }
    h4.columns.left{
      margin-top: 10px !important;
      white-space: nowrap !important;
    }
    h4.form-group.sticky1.columns.left{
      white-space: pre !important;
      font-size: 17px !important;
    }
    label {
    margin-bottom: 0rem !important;
    }
    .col{
      padding: 0px !important;
    }
    }
    `],
  template: `

  <div *ngIf="showWebviewDetect" class="row form-group sticky1" style=" background: #ebf3fc !important;color: #000;padding: 5px;">

  <div class="col-4">
      <h4 class="columns left">{{'Language'}}</h4>
  </div>
  <div class="col-4"> </div>

  <div class="col-4" style="text-align: end; margin: auto;display:flex;justify-content:end;">

                  <a class="alert-success" [routerLink]='' (click)="mstapplicantlanguagedetails_route(null, 'create')"><i
                  class="fa fa-plus"></i> Add</a>

                  <a class="alert-danger" [routerLink]='' (click)="onClose()"><i
                  class="fa fa-close"></i> Close</a>
                  </div>
  </div>


  <div *ngIf="showMobileDetectskill" class="row form-group sticky1" style=" background: #ebf3fc !important;color: #000;padding: 5px;">

  <div class="col-4">
      <h4 class="columns left">{{'Language'}}</h4>
  </div>
  <div class="col-4"> </div>

  <div class="col-4" style="text-align: end; margin: auto;display:flex;justify-content:end;">

                  <a class="alert-success" [routerLink]='' (click)="mstapplicantlanguagedetails_route(null, 'create')"><i
                  class="fa fa-plus"></i> Add</a>

                  <a class="alert-danger" [routerLink]='' (click)="onClose()"><i
                  class="fa fa-close"></i> Close</a>
                  </div>
  </div>
  <form [formGroup]="mstapplicantlanguagedetail_Form" class="mobile_grid_view" *ngIf="showWebviewDetect">
    <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
    <thead>
      <tr >
        <th style="width:15%;">Language</th>
        <th style="width:15%;">Read Proficiency</th>
        <th style="width:15%;">Write Proficiency</th>
        <th style="width:15%;">Speak Proficiency</th>
        <th style="width:15%;">Rating</th>
        <th style="width:15%;">Remarks</th>
      <th style="width:10%;">Action</th>
      </tr>
    </thead>
    <tbody style="background: #f0f0f0;" *ngIf="showSkillDetails_input">
      <tr>
          <!--language-->
          <td>
          <select id="language" required (change)="language_onChange($event.target)"
            formControlName="language" class="form-control">
            <option [ngValue]="null" selected>-Select-</option>
            <option *ngFor="let item of language_List" value="{{item.value}}">{{item.label}}</option>
          </select>
          </td>

          <!--Read Proficiency -->

          <td>
          <p-rating id="readproficiency" formControlName="readproficiency" class="form-control">
          </p-rating>
          </td>

         <!--Write Proficiency -->

          <td>
          <p-rating id="writeproficiency" formControlName="writeproficiency" class="form-control">
          </p-rating>
          </td>

          <!--Speak Proficiency -->

          <td>
          <p-rating id="speakproficiency" formControlName="speakproficiency" class="form-control">
          </p-rating>
          </td>

          <!-- Rating -->

          <td>
          <p-rating id="overallrating" formControlName="overallrating" class="form-control">
          </p-rating>
          </td>

          <!-- Remarks -->

          <td>
          <textarea autosize rows="3" cols="10" class="form-control"  id="achievementdetails"
          formControlName="remarks">
          </textarea>
          </td>

          <!-- Submit & Close -->

          <td class="field-add-close-button">
              <i class="fa fa-check-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

              <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                  (click)="skillClose()"></i>
          </td>
      </tr>
    </tbody>
  </table>
  </form>

  <form [formGroup]="mstapplicantlanguagedetail_Form" class="mobile_grid_view" *ngIf="showMobileDetectskill">

  <div class="row" *ngIf="showSkillDetails_input" style="width: 320px;margin: 10px !important;">
  <div class="col-md-12">
  <label>Language</label>
  <select id="language" required (change)="language_onChange($event.target)"
            formControlName="language" class="form-control">
            <option [ngValue]="null" selected>-Select-</option>
            <option *ngFor="let item of language_List" value="{{item.value}}">{{item.label}}</option>
          </select>
  </div>
  <div class="col-md-12">
  <label>Read Proficiency</label>
  <p-rating id="readproficiency" formControlName="readproficiency" class="form-control">
          </p-rating>
  </div>
  <div class="col-md-12">
  <label>Write Proficiency</label>
  <p-rating id="writeproficiency" formControlName="writeproficiency" class="form-control">
          </p-rating>
  </div>
  <div class="col-md-12">
  <label>Speak Proficiency</label>
  <p-rating id="speakproficiency" formControlName="speakproficiency" class="form-control">
          </p-rating>
  </div>
  <div class="col-md-12">
  <label>Rating</label>
  <p-rating id="overallrating" formControlName="overallrating" class="form-control">
          </p-rating>
  </div>
  <div class="col-md-12">
  <label>Remarks</label>
  <textarea autosize rows="1" cols="10" class="form-control"  id="achievementdetails"
          formControlName="remarks">
          </textarea>
  </div>

  <div class="col" style="position: relative;left: 120px;top: 7px;">

  <i class="fa fa-check-square field-Add-button" aria-hidden="true" (click)="onSubmitAndWait()"></i>

              <i class="fa fa-window-close field-close-button" aria-hidden="true" *ngIf="showSkillDetails_input"
                  (click)="skillClose()"></i>
    </div>

    </div>
  </form>
    <ng2-smart-table #tbl_mstapplicantlanguagedetails
      (userRowSelect)="handle_mstapplicantlanguagedetails_GridSelected($event)"
      [settings]="mstapplicantlanguagedetails_settings"
      (custom)="onCustom_mstapplicantlanguagedetails_Action($event)"
      (custom)="onCustom_mstapplicantlanguagedetailsAttachment_Action($event)"
      [source]="tbl_mstapplicantlanguagedetails?.source?.data"
      (delete)="mstapplicantlanguagedetails_route($event,'delete')"
      (deleteConfirm)="mstapplicantlanguagedetails_route($event,'delete')"
      (create)="mstapplicantlanguagedetails_route($event,'create')"
      (createConfirm)="mstapplicantlanguagedetails_beforesave($event)"
      (edit)="mstapplicantlanguagedetails_route($event,'edit')"
      (editConfirm)="mstapplicantlanguagedetails_beforesave($event)">
    </ng2-smart-table>
     `
})
export class mstapplicantlanuagegridComponent implements OnInit {

  mstapplicantlanguagedetail_Form: FormGroup;

  formData: mstapplicantlanguagedetail;
  admin = false;
  bfilterPopulate_mstapplicantlanguagedetails: boolean = false;
  mstapplicantlanguagedetail_menuactions: any = []
  @ViewChild('tbl_mstapplicantlanguagedetails', { static: false }) tbl_mstapplicantlanguagedetails: Ng2SmartTableComponent;
  mstapplicantlanguagedetails_visiblelist: any;
  mstapplicantlanguagedetails_hidelist: any;
  Deleted_mstapplicantlanguagedetail_IDs: string = "";
  mstapplicantlanguagedetails_ID: string = "8";
  mstapplicantlanguagedetails_selectedindex: any;
  ShowTableslist: any;
  pkcol: any;
  check_mstapplicantlanguagedetail: any;


  applicantid_List: DropDownValues[];
  applicantid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
  language_List: DropDownValues[];

  IsApplicant: boolean;
  IsAdmin: boolean;
  bSingleRecord: boolean;
  showSkillDetails_input: boolean = false;
  isSubmitted: boolean = false;
  showview: boolean = false;//view or edit mode

  applicantid: any;
  data: any;
  maindata: any;
  hidelist: any = [];
  objvalues: any = [];
  readonly AttachmentURL = AppConstants.AttachmentURL;
  readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
  @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
  attachmentFieldJson: any[] = [];
  attachmentVisible: boolean = true;
  SESSIONUSERID: any;//current user

  sessionData: any;
  sourceKey: any;
  showMobileDetectskill: boolean = false;
  showWebviewDetect: boolean = true;
  isMobile: any;
  constructor(
    public dialogRef: DynamicDialogRef,
    public dynamicconfig: DynamicDialogConfig,
    private fb: FormBuilder,
    public dialog: DialogService,
    private sharedService: SharedService,
    private sessionService: SessionService,
    private toastr: ToastService,
    private mstapplicantlanguagedetail_service: mstapplicantlanguagedetailService,
    private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
  ) {
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
    this.Set_mstapplicantlanguagedetails_TableConfig();
    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;

    this.pkcol = this.data.maindatapkcol;
    this.applicantid = this.data.applicantid;

    this.mstapplicantlanguagedetail_Form = this.fb.group({
      pk: [null],
      ImageName: [null],
      applicantid: this.sessionService.getItem('applicantid'),
      applicantiddesc: [null],
      languageid: [null],
      language: [null, Validators.compose([Validators.required])],
      languagedesc: [null],
      readproficiency: [null],
      writeproficiency: [null],
      speakproficiency: [null],
      overallrating: [null],
      remarks: [null],
      attachment: [null],
      status: [null],
      statusdesc: [null],
    });
    this.FillData();

  }

  get f() { return this.mstapplicantlanguagedetail_Form.controls; }

  skillClose() {
    this.showSkillDetails_input = false;
  };

  getdata() {
    this.mstapplicantlanguagedetail_service.getDefaultData().then(res => {
      this.applicantid_List = res.list_applicantid.value;
      this.language_List = res.list_language.value;
    }).catch((err) => { this.spinner.hide(); });
  }
  onSubmitAndWait() {
    if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
      this.onSubmitData(false);
    }
    else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
      this.onSubmitDataDlg(false);
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
      this.onSubmitDataDlg(true);
    }
    else {
      this.onSubmitData(true);
    }
  };

  async onSubmitDataDlg(bclear: any) {
    this.isSubmitted = true;
    if (!this.mstapplicantlanguagedetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    var obj = this.mstapplicantlanguagedetail_Form.getRawValue();
  }
  async onSubmitData(bclear: any) {
    this.showSkillDetails_input = false;
    this.getdata();
    this.isSubmitted = true;
    let strError = "";
    if (strError != "") return this.sharedService.alert(strError);

    if (!this.mstapplicantlanguagedetail_Form.valid) {
      this.toastr.addSingle("error", "", "Enter the required fields");
      return;
    }
    this.formData = this.mstapplicantlanguagedetail_Form.getRawValue();
    this.spinner.show();;
    this.mstapplicantlanguagedetail_service.saveOrUpdate_mstapplicantlanguagedetails(this.formData).subscribe((res: any) => {
      this.spinner.hide();
      this.toastr.addSingle("success", "", "Successfully saved");
      this.sessionService.setItem("attachedsaved", "true")
      this.objvalues.push((res as any).mstapplicantlanguagedetail);
      this.ngOnInit();
      this.mstapplicantlanguagedetail_Form.reset();
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
          this.objvalues.push((res as any).mstapplicantlanguagedetail);
          this.dialogRef.close(this.objvalues);
        }
        else {
          this.FillData();
        }
      }
      this.mstapplicantlanguagedetail_Form.markAsUntouched();
      this.mstapplicantlanguagedetail_Form.markAsPristine();
    });
  }

  resetForm() {
    if (this.mstapplicantlanguagedetail_Form != null)
      this.mstapplicantlanguagedetail_Form.reset();
    this.mstapplicantlanguagedetail_Form.patchValue({
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
            this.mstapplicantlanguagedetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          else {
            this.mstapplicantlanguagedetail_Form.patchValue({ [key]: mainscreendata[key] });
          }
          {
            {
              if (bdisable && this.mstapplicantlanguagedetail_Form.controls[key] != undefined) {
                this.mstapplicantlanguagedetail_Form.controls[key].disable({ onlySelf: true });
                this.hidelist.push(key);
              }
            }
          }
        }
      }
    }
  }
  language_onChange(evt: any) {
    let e = this.f.language.value as any;
    this.mstapplicantlanguagedetail_Form.patchValue({ languagedesc: evt.options[evt.options.selectedIndex].text });
  }
  mstapplicantlanguagedetailshtml() {
    let ret = "";
    ret += `
        <table class="table table-hover languagedetail_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr style="word-break: break-word;">
            <th style="width:10%;">##languagedesc##</th>
            <th style="width:10%;">##readproficiency##</th>
            <th style="width:10%;">##writeproficiency##</th>
            <th style="width:10%;">##speakproficiency##</th>
            <th style="width:10%;">##overallrating##</th>
            <th style="white-space: break-spaces;width:18%;">##remarks##</th>
            <!--<th style="" >##attachment##</th>-->
          </tr>
        </tbody>
      </table>
`;
    return ret;
  }
  mstapplicantlanguagedetailshtml1() {
    let ret = "";
    ret += `
      <ul class="list-group" style="margin: 0px;">
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Language </span>: <label style="font-size: small;">##languagedesc##</label></li>
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Read Proficiency</span>: <label style="font-size: small;" class="col">##readproficiency##</label></li>
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Write Proficiency</span>: <label style="font-size: small;"  class="col">##writeproficiency##</label></li>
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Speak Proficiency</span>: <label style="font-size: small;"  class="col">##speakproficiency##</label></li>
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Rating </span>: <label style="font-size: small;" class="col">##overallrating##</label></li>
      <li class="list-group-item" style="padding: 0.45rem 0.26rem !important;"><span style="font-size: small;color: #000;">Remarks </span>: <label style="font-size: small;">##remarks##</label></li>
      </ul>
`;
    return ret;
  }
  FillData() {
    this.mstapplicantlanguagedetail_service.get_mstapplicantlanguagedetails_ByApplicantID(this.applicantid).then(res => {
      this.mstapplicantlanguagedetail_menuactions = res.mstapplicantlanguagedetail_menuactions
      this.Set_mstapplicantlanguagedetails_TableConfig();
      this.mstapplicantlanguagedetails_LoadTable(res.mstapplicantlanguagedetail);
    });
  }
  //start of Grid Codes mstapplicantlanguagedetails
  mstapplicantlanguagedetails_settings: any;

  show_mstapplicantlanguagedetails_Checkbox() {
    if (this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'single';
    else
      this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'multi';
    this.tbl_mstapplicantlanguagedetails.source.initGrid();
  }
  delete_mstapplicantlanguagedetails_All() {
    this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'single';
  }
  show_mstapplicantlanguagedetails_Filter() {
    if (this.tbl_mstapplicantlanguagedetails.source.settings != null) this.tbl_mstapplicantlanguagedetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantlanguagedetails.source.settings['hideSubHeader'];
    this.tbl_mstapplicantlanguagedetails.source.initGrid();
  }
  async Set_mstapplicantlanguagedetails_TableDropDownConfig(res) {
    if (!this.bfilterPopulate_mstapplicantlanguagedetails) {

      var clone = this.sharedService.clone(this.tbl_mstapplicantlanguagedetails.source.settings);
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_applicantid.value)), }, };
      if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_applicantid.value)), }, };
      this.tbl_mstapplicantlanguagedetails.source.settings = clone;
      this.tbl_mstapplicantlanguagedetails.source.initGrid();

      var clone = this.sharedService.clone(this.tbl_mstapplicantlanguagedetails.source.settings);
      if (clone.columns['language'] != undefined) clone.columns['language'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_language.value)), }, };
      if (clone.columns['language'] != undefined) clone.columns['language'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_language.value)), }, };
      this.tbl_mstapplicantlanguagedetails.source.settings = clone;
      this.tbl_mstapplicantlanguagedetails.source.initGrid();
    }
    this.bfilterPopulate_mstapplicantlanguagedetails = true;
  }
  async mstapplicantlanguagedetails_beforesave(event: any) {
    event.confirm.resolve(event.newData);
  }
  Set_mstapplicantlanguagedetails_TableConfig() {
    this.mstapplicantlanguagedetails_settings = {
      hideSubHeader: true,
      mode: 'external',
      selectMode: 'single',
      actions: {
        columnTitle: '',
        width: '300px',
        edit: true, // true,
        delete: (this.IsApplicant || this.IsAdmin),
        position: 'right',
        custom: this.mstapplicantlanguagedetail_menuactions
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
            cell = this.mstapplicantlanguagedetailshtml();

            const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (isMobile) {
              cell = this.mstapplicantlanguagedetailshtml1();
            }
            var divrow = JSON.parse(JSON.stringify(row));

            let showstr = "";

            let speakproficiency = "";
            let readproficiency = "";
            let writeproficiency = "";
            let overallrating = "";
            if (divrow.speakproficiency == 1) {
              speakproficiency = '???';
            } else if (divrow.speakproficiency == 2) {
              speakproficiency = '??????';
            } else if (divrow.speakproficiency == 3) {
              speakproficiency = '?????????';
            } else if (divrow.speakproficiency == 4) {
              speakproficiency = '????????????';
            } else if (divrow.speakproficiency == 5) {
              speakproficiency = '???????????????';
            }

            if (divrow.readproficiency == 1) {
              readproficiency = '???';
            } else if (divrow.readproficiency == 2) {
              readproficiency = '??????';
            } else if (divrow.readproficiency == 3) {
              readproficiency = '?????????';
            } else if (divrow.readproficiency == 4) {
              readproficiency = '????????????';
            } else if (divrow.readproficiency == 5) {
              readproficiency = '???????????????';
            }


            if (divrow.writeproficiency == 1) {
              writeproficiency = '???';
            } else if (divrow.writeproficiency == 2) {
              writeproficiency = '??????';
            } else if (divrow.writeproficiency == 3) {
              writeproficiency = '?????????';
            } else if (divrow.writeproficiency == 4) {
              writeproficiency = '????????????';
            } else if (divrow.writeproficiency == 5) {
              writeproficiency = '???????????????';
            }

            if (divrow.overallrating == 1) {
              overallrating = '???';
            } else if (divrow.overallrating == 2) {
              overallrating = '??????';
            } else if (divrow.overallrating == 3) {
              overallrating = '?????????';
            } else if (divrow.overallrating == 4) {
              overallrating = '????????????';
            } else if (divrow.overallrating == 5) {
              overallrating = '???????????????';
            }
            divrow["speakproficiency"] = "<div class='Stars'  style='font-size: large !important;color:green;float: left;margin-left: 6%;'>" + speakproficiency + "</div>";
            divrow["readproficiency"] = "<div class='Stars' style='font-size: large !important;color:green;float: left;margin-left: 6%;'>" + readproficiency + "</div>";
            divrow["writeproficiency"] = "<div class='Stars' style='font-size: large !important;color:green;float: left;margin-left: 6%;'>" + writeproficiency + "</div>";
            divrow["overallrating"] = "<div class='Stars' style='font-size: large !important;color:green;float: left;margin-left: 6%;'>" + overallrating + "</div>";

            this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
            if (this.isMobile) {
              divrow["speakproficiency"] = "<div class='Stars'  style='font-size: large !important;color:green;position: relative !important;right: -40px !important;bottom: 5px;'>" + speakproficiency + "</div>";
              divrow["readproficiency"] = "<div class='Stars' style='font-size: large !important;color:green;position: relative !important;right:-40px !important;bottom: 5px;'>" + readproficiency + "</div>";
              divrow["writeproficiency"] = "<div class='Stars' style='font-size: large !important;color:green;position: relative !important;right: -40px !important;bottom: 5px;'>" + writeproficiency + "</div>";
              divrow["overallrating"] = "<div class='Stars' style='font-size: large !important;color:green;position: relative;right: -40px !important;bottom: 5px;'>" + overallrating + "</div>";
            }
            return this.sharedService.HtmlValue(divrow, cell);
          },
        },
      },
    };
  }
  mstapplicantlanguagedetails_LoadTable(mstapplicantlanguagedetails = new LocalDataSource()) {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantlanguagedetails_ID) >= 0) {
      if (this.tbl_mstapplicantlanguagedetails != undefined) this.tbl_mstapplicantlanguagedetails.source = new LocalDataSource();
      if (this.tbl_mstapplicantlanguagedetails != undefined) this.tbl_mstapplicantlanguagedetails.source.load(mstapplicantlanguagedetails as any as LocalDataSource);
      if (this.tbl_mstapplicantlanguagedetails != undefined) this.tbl_mstapplicantlanguagedetails.source.setPaging(1, 20, true);
    }
  }


  Add_mstapplicantlanguagedetail(event: any, languageid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    this.ngOnInit();
    this.getdata();
    let add = false;
    if (event == null) add = true;
  }


  Edit_mstapplicantlanguagedetail(event: any, languageid: any, applicantid: any) {
    this.showSkillDetails_input = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;
    this.getdata();
    this.mstapplicantlanguagedetail_service.get_mstapplicantlanguagedetails_ByEID(event.data.pkcol).then(res => {
      this.formData = res.mstapplicantlanguagedetail;
      this.pkcol = res.mstapplicantlanguagedetail.pkcol;
      this.mstapplicantlanguagedetail_Form.patchValue({
        applicantid: res.mstapplicantlanguagedetail.applicantid,
        applicantiddesc: res.mstapplicantlanguagedetail.applicantiddesc,
        languageid: res.mstapplicantlanguagedetail.languageid,
        language: res.mstapplicantlanguagedetail.language,
        languagedesc: res.mstapplicantlanguagedetail.languagedesc,
        readproficiency: res.mstapplicantlanguagedetail.readproficiency,
        writeproficiency: res.mstapplicantlanguagedetail.writeproficiency,
        speakproficiency: res.mstapplicantlanguagedetail.speakproficiency,
        overallrating: res.mstapplicantlanguagedetail.overallrating,
        remarks: res.mstapplicantlanguagedetail.remarks,
        attachment: "[]",
        status: res.mstapplicantlanguagedetail.status,
        statusdesc: res.mstapplicantlanguagedetail.statusdesc,
      });
    })
  }

  onDelete_mstapplicantlanguagedetail(event: any, childID: number, i: number) {
    if (confirm('Do you want to delete this record?')) {
      this.mstapplicantlanguagedetail_service.delete_mstapplicantlanguagedetail(childID).then(res => {
        this.mstapplicantlanguagedetail_service.get_mstapplicantlanguagedetails_ByApplicantID(this.applicantid).then(res => {
          this.ngOnInit();
          this.mstapplicantlanguagedetails_LoadTable(res);
        });
      })
    } else {
      return;
    }
  }
  mstapplicantlanguagedetails_route(event: any, action: any) {
    var addparam = "";
    if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
      addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
    }

    switch (action) {
      case 'create':
        this.Add_mstapplicantlanguagedetail(event, null, this.applicantid);
        break;
      case 'view':
        break;
      case 'edit':
        this.Edit_mstapplicantlanguagedetail(event, event.data.languageid, this.applicantid);
        break;
      case 'delete':
        this.onDelete_mstapplicantlanguagedetail(event, event.data.languageid, ((this.tbl_mstapplicantlanguagedetails.source.getPaging().page - 1) * this.tbl_mstapplicantlanguagedetails.source.getPaging().perPage) + event.index);
        this.tbl_mstapplicantlanguagedetails.source.refresh();
        break;
    }
  }
  formid(event: any, arg1: null, formid: any) {
    throw new Error('Method not implemented.');
  }
  mstapplicantlanguagedetails_onDelete(obj) {
    let languageid = obj.data.languageid;
    if (confirm('Are you sure to delete this record ?')) {
      this.mstapplicantlanguagedetail_service.delete_mstapplicantlanguagedetail(languageid).then(res =>
        this.mstapplicantlanguagedetails_LoadTable()
      );
    }
  }
  async onCustom_mstapplicantlanguagedetails_Action(event: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantlanguagedetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantlanguagedetails") {

    }

  };

  async onCustom_mstapplicantlanguagedetailsAttachment_Action(event: any, languageid: any, applicantid: any) {
    let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantlanguagedetails");
    let formname = (objbomenuaction as any).actionname;
    if (formname == "mstapplicantlanguagedetails") {

      let add = false;
      if (event == null) add = true;
      let childsave = true;
      if (this.pkcol != undefined && this.pkcol != null) childsave = true;
      this.dialog.open(mstapplicantlanguagedetailComponent,
        {
          data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, languageid, applicantid, visiblelist: this.mstapplicantlanguagedetails_visiblelist, hidelist: this.mstapplicantlanguagedetails_hidelist, ScreenType: 2 },
        }
      ).onClose.subscribe(res => {
        if (res) {
          if (add) {
            for (let i = 0; i < res.length; i++) {
              this.tbl_mstapplicantlanguagedetails.source.add(res[i]);
            }
            this.tbl_mstapplicantlanguagedetails.source.refresh();
          }
          else {
            this.tbl_mstapplicantlanguagedetails.source.update(event.data, res[0]);
          }
        }
      });
    }
  }
  mstapplicantlanguagedetails_Paging(val) {
    this.tbl_mstapplicantlanguagedetails.source.setPaging(1, val, true);
  }

  handle_mstapplicantlanguagedetails_GridSelected(event: any) {
    this.mstapplicantlanguagedetails_selectedindex = this.tbl_mstapplicantlanguagedetails.source.findIndex(i => i.languageid === event.data.languageid);
  }
  Is_mstapplicantlanguagedetails_Visible() {
    if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantlanguagedetails_ID) >= 0) {
      return "tbl smart-table-container";
    }
    else {
      return "hide";
    }
  }
  //end of Grid Codes mstapplicantlanguagedetails
  onClose() {
    this.dialogRef.close();
  }

}
