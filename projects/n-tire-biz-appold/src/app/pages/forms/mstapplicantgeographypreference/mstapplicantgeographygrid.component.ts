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
import { mstapplicantgeographypreferenceService } from '../../../service/mstapplicantgeographypreference.service';
import { mstapplicantgeographypreferenceComponent } from './mstapplicantgeographypreference.component';

@Component({
    selector: 'app-applicantgeographygrid',
    template: `<h4 class="form-group sticky1  columns left"  style="background: #0368b7;
    color: #fff;padding: 5px;">{{'Geography Preferences'}}
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

    <ul class="rightside">
    <a  [routerLink]='' (click)="mstapplicantgeographypreferences_route(null, 'create')">
    <!-- <button type="button" class="btn btn-outline-primary" style="border-color: #fff !important;    color: #fff;
    margin-top: -17%;">Add</button> -->
    <button type="button" class="btn btn-outline-primary" style="border-color: #fff !important;    color: #fff;
    margin-top: -17%;">Add</button>
    </a><a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon"></i></a>
    </ul>

  </h4>
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  <thead>
    <tr>
      <th scope="col" style="width: 6.5%">Action</th>
      <th scope="col" style="width: 19%;">Country Desc</th>
      <th scope="col" style="width: 19%;">City Desc</th>
      <th scope="col" style="width: 20%;">Remarks</th>
    </tr>
  </thead>
</table>
  <ng2-smart-table #tbl_mstapplicantgeographypreferences
    (userRowSelect)="handle_mstapplicantgeographypreferences_GridSelected($event)"
    [settings]="mstapplicantgeographypreferences_settings"
    (custom)="onCustom_mstapplicantgeographypreferences_Action($event)"
    [source]="tbl_mstapplicantgeographypreferences?.source?.data"
    (delete)="mstapplicantgeographypreferences_route($event,'delete')"
    (deleteConfirm)="mstapplicantgeographypreferences_route($event,'delete')"
    (create)="mstapplicantgeographypreferences_route($event,'create')"
    (createConfirm)="mstapplicantgeographypreferences_beforesave($event)"
    (edit)="mstapplicantgeographypreferences_route($event,'edit')"
    (editConfirm)="mstapplicantgeographypreferences_beforesave($event)">
  </ng2-smart-table>`

})
export class mstapplicantgeographygrid implements OnInit {
    isadmin = false;
    bfilterPopulate_mstapplicantgeographypreferences: boolean = false;
    mstapplicantgeographypreference_menuactions: any = [];
    @ViewChild('tbl_mstapplicantgeographypreferences', { static: false }) tbl_mstapplicantgeographypreferences: any;
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

    applicantid: any;
    data: any;
    formid: any;
    constructor(public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sharedService: SharedService, private currentRoute: ActivatedRoute,
        private sessionService: SessionService, private mstapplicantgeographypreference_service: mstapplicantgeographypreferenceService,) {
        this.data = dynamicconfig;
        if (this.data != null && this.data.data != null) {
            this.data = this.data.data;
        }
        this.pkcol = this.data.maindatapkcol;
        this.applicantid = this.data.applicantid
    }
    ngOnInit() {
        this.Set_mstapplicantgeographypreferences_TableConfig();

        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();
    }
    mstapplicantgeographypreferenceshtml() {

        let ret = "";
        ret += `
        <table class="table table-hover geographydetails_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr>
            <th scope="row"  style="width: 26% !important;">##countrydesc##</th>
            <th scope="row" style="width: 26% !important">##citydesc##</th>
            <th scope="row"  style="width: 25% !important;">##remarks##</th>
          </tr>
        </tbody>
      </table>

        <!--<div class='card1'>
<h3 style="margin: 0 auto !important;" class='profile__section__item__sub'>##countrydesc## - ##citydesc##</h3>
<p  style="margin: 0 auto !important;line-height: 2.0rem !important">##remarks##</p>
</div>-->
`;
        return ret;
    }
    FillData() {
        // this.Set_mstapplicantgeographypreferences_TableConfig();
        this.mstapplicantgeographypreference_service.get_mstapplicantgeographypreferences_ByApplicantID(this.applicantid).then(res => {
            this.Set_mstapplicantgeographypreferences_TableConfig();    
            this.mstapplicantgeographypreferences_LoadTable(res);
        });
    }

    AddOrEdit_mstapplicantgeographypreference(event: any, geographypreferenceid: any, applicantid: any) {
        debugger;;
        let add = false;
        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantgeographypreferenceComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, geographypreferenceid, applicantid, visiblelist: this.mstapplicantgeographypreferences_visiblelist, hidelist: this.mstapplicantgeographypreferences_hidelist, ScreenType: 2 },
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
                position: 'left',
                custom: this.mstapplicantgeographypreference_menuactions
            },
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
                        //debugger;;
                        cell = this.mstapplicantgeographypreferenceshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantgeographypreferences_LoadTable(mstapplicantgeographypreferences = new LocalDataSource()) {
        //debugger;;
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantgeographypreferences_ID) >= 0) {
            if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source = new LocalDataSource();
            if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source.load(mstapplicantgeographypreferences as any as LocalDataSource);
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
                this.AddOrEdit_mstapplicantgeographypreference(event, null, this.applicantid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantgeographypreference(event, event.data.geographypreferenceid, this.applicantid);
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
