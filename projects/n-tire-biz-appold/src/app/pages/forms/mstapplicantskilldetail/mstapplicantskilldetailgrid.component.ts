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


@Component({
  selector: 'app-applicantskilldetailgrid',
  template: `
    <h4 class="form-group sticky1  columns left"   style="background: #0368b7;
    color: #fff;padding: 5px;">{{'Skill Details'}}

    <ul class="nav navbar-nav1" style='display:none'>
      <li class="dropdown">
        <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
          aria-expanded='false'> <span class='caret'></span></a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" [routerLink]=''
              (click)="mstapplicantskilldetails_route(null, 'create')"><i class="fa fa-plus"
                aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
          <li> </li>
        </ul>
      </li>

    </ul>
    <ul class="rightside">
    <a  [routerLink]='' (click)="mstapplicantskilldetails_route(null, 'create')">
    <!-- <button type="button" style="border-color: #fff !important;
    color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
    <button type="button" class="btn btn-outline-primary" style="border-color: #fff !important;    color: #fff;
    margin-top: -17%;">Add</button>
    </a><a  class="" [routerLink]='' (click)="onClose()"><i  class="fa fa-times-circle close_common_icon"></i></a>
    </ul>
  </h4>
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  <thead>
          <tr>
          <th  style="width: 10.6%" class="col-2">Action</th>
            <th  style="width: 14%" class="col-2">Segment Category</th>
            <th  style="width: 14%" class="col-2">Skill Category</th>
            <th  style="width: 16%" class="col-2">Sub Category</th>
            <th  style="width: 13%" class="col-2">Self Rating</th>
            <th  style="width: 13%" class="col-2">Referral Status</th>
            <th  style="width: 21%" class="col-2">Remarks</th>
          </tr>
        </thead>
</table>
  <ng2-smart-table #tbl_mstapplicantskilldetails
    (userRowSelect)="handle_mstapplicantskilldetails_GridSelected($event)"
    [settings]="mstapplicantskilldetails_settings"
    (custom)="onCustom_mstapplicantskilldetails_Action($event)"
    [source]="tbl_mstapplicantskilldetails?.source?.data"
    (delete)="mstapplicantskilldetails_route($event,'delete')"
    (deleteConfirm)="mstapplicantskilldetails_route($event,'delete')"
    (create)="mstapplicantskilldetails_route($event,'create')"
    (createConfirm)="mstapplicantskilldetails_beforesave($event)"
    (edit)="mstapplicantskilldetails_route($event,'edit')"
    (createConfirm)="mstapplicantskilldetails_beforesave($event)"
  >
  </ng2-smart-table>
    `
})
export class mstapplicantskilldetailgridComponent implements OnInit {
  isadmin = false;
  bfilterPopulate_mstapplicantskilldetails: boolean = false;
  mstapplicantskilldetail_menuactions: any = []

  @ViewChild('tbl_mstapplicantskilldetails', { static: false }) tbl_mstapplicantskilldetails: Ng2SmartTableComponent;

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
  ) {
    debugger;
    this.data = dynamicconfig;
    if (this.data != null && this.data.data != null) {
      this.data = this.data.data;
    }
    this.pkcol = this.data.maindatapkcol;
    this.applicantid = this.data.applicantid
  }

  ngOnInit() {
    this.Set_mstapplicantskilldetails_TableConfig();

    if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
    if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
    this.FillData();

  }
  ngAfterViewInit() {
    let getapp = parseInt(localStorage.getItem('applicantid'));
    this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(getapp);
  }


  mstapplicantskilldetailshtml() {
    debugger
    let ret = "";
    ret += `
    <table class="table table-hover skilldetails_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
    <tbody>
      <tr>
      <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##segmentdesc##&nbsp##segmentcategoryothers##</th>
        <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##skillcategorydesc##&nbsp##skillcategoryothers##</th>
        <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##subcategoryiddesc##&nbsp##subcategoryidothers##</th>
        <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##selfrating##</th>
        <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##referencecount##</th>
        <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##remarks##</th>
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
    });
  }

  AddOrEdit_mstapplicantskilldetail(event: any, skillid: any, applicantid: any) {
    debugger
    let add = false;
    if (event == null) add = true;
    let childsave = true;
    if (this.pkcol != undefined && this.pkcol != null) childsave = true;

    this.dialog.open(mstapplicantskilldetailComponent,
      {
        data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, skillid, applicantid, visiblelist: this.mstapplicantskilldetails_visiblelist, hidelist: this.mstapplicantskilldetails_hidelist, ScreenType: 2 },
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
        position: 'left',
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
        editButtonContent: '<i class="nb-edit"></i>',
        saveButtonContent: '<i class="nb-checkmark"></i>',
        cancelButtonContent: '<i class="nb-close"></i>',
        confirmSave: true,
      },
      delete: {
        deleteButtonContent: '<i class="nb-trash"></i>',
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
        this.AddOrEdit_mstapplicantskilldetail(event, null, this.applicantid);
        break;
      case 'view':
        break;
      case 'edit':
        this.AddOrEdit_mstapplicantskilldetail(event, event.data.skillid, this.applicantid);
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
    let skillsdetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;">Segment Category: ' + event.data.segmentdesc + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Skill Category: ' + event.data.skillcategorydesc + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Sub Category: ' + event.data.subcategoryiddesc + '</li>'
      + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Self Rating: ' + event.data.selfrating + '</li>'
      + '<li class="list-group-item remarks_p" style="background: #2D3C84 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>'
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


    // let skillsdetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Sub Category: ' + event.data.subcategoryiddesc + '</li>'
    //     + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Skill Category: ' + event.data.skillcategorydesc + '</li>'
    //     + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Self Rating: ' + event.data.selfrating + '</li>'
    //     + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>'
    // let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantskilldetails");
    // let formname = (objbomenuaction as any).actionname;
    // if (formname == "mstapplicantreferencerequests") {
    //     this.dialog.open(mstapplicantreferencerequestComponent,
    //         {
    //             data: { referencesourcedetails: skillsdetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 2, save: true }
    //             // data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 318, requestmasterid: event.data.referenceid, contactemailid: event.data.email, requestedcontact: event.data.referencename, ScreenType: 2, save: true }
    //             // data: { skillsdetails:skillsdetails,applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 2, save: true }
    //         }
    //     ).onClose.subscribe(res => {
    //     });
    // }
    // this.dialog.open(mstapplicantreferencegridComponent, {
    //     width: '100% !important',
    //     height: 'auto !important',
    //     data: { ScreenType: 2, applicantid: this.applicantid, save: true }
    // })

    // let referencesourcedetails = 'Sub Category: ' + event.data.subcategoryiddesc + '<BR>' + 'Skill Category: ' + event.data.skillcategorydesc + '<BR>' + 'Self Rating: ' + event.data.selfrating + '<BR>' + 'Remarks: ' + event.data.remarks;
    // let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantskilldetails");
    // let formname = (objbomenuaction as any).actionname;
    // if (formname == "mstapplicantreferencerequests") {

    //     this.dialog.open(mstapplicantreferencerequestComponent,
    //         {
    //             data: { referencesourcedetails: referencesourcedetails, applicantid: this.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 2, save: true }
    //         }
    //     ).onClose.subscribe(res => {
    //     });
    // }
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
