import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";

import { mstapplicantskilldetail } from '../../../model/mstapplicantskilldetail.model';
import { mstapplicantskilldetailComponent } from '../mstapplicantskilldetail/mstapplicantskilldetail.component';
import { mstapplicantskilldetailService } from '../../../service/mstapplicantskilldetail.service';

import { mstapplicantreferencerequest } from '../../../model/mstapplicantreferencerequest.model';
import { mstapplicantreferencerequestComponent } from '../mstapplicantreferencerequest/mstapplicantreferencerequest.component';
import { mstapplicantreferencerequestService } from '../../../service/mstapplicantreferencerequest.service';

//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../service/shared.service';
import { SessionService } from '../../core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../shared/helper';
import { Subject } from 'rxjs/Subject';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';


@Component({
    selector: 'app-applicantreferencegrid',
    template: `
    <h4 class="form-group sticky1  columns left"  style="background: #186ba0;
    color: #fff;">{{'Reference Requests'}}
                  <ul class="nav navbar-nav1" style='display:none'>
                    <li class="dropdown">
                      <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button'
                        aria-haspopup='true' aria-expanded='false'> <span class='caret'></span></a>
                      <ul class="dropdown-menu">
                        <li><a class="dropdown-item" [routerLink]=''
                            (click)="mstapplicantreferencerequesttoggleOption();mstapplicantreferencerequestsaccepted_route(null, 'create')"><i
                              class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
                      </ul>
                    </li>
                  </ul>
                  <!-- <ul class="rightside">
                    <a [routerLink]='' (click)="mstapplicantreferencerequestsaccepted_route(null, 'create')"><i style="color:#fff !important;"
                        class="fa fa-plus"></i></a><a  class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
                    </ul>  -->
                    <ul class="rightside">
                <a  [routerLink]='' (click)="mstapplicantreferencerequestsaccepted_route(null, 'create')">
                <!-- <button type="button" style="border-color: #fff !important;
                color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
                <button type="button" class="btn btn-outline-primary" style="border-color: #fff !important;    color: #fff;
    margin-top: -17%;">Add</button>
                </a><a  class="" [routerLink]='' (click)="onClose()"><i  style="color:#fff !important;" class="fa fa-times-circle close_common_icon"></i></a>
                </ul>
                </h4>
                <table class="table" style="margin: 0;">
                <thead>
                    <tr>
                    <th scope="col" style="width: 132px;">Date</th>
                    <th scope="col" style="width:189px">Contact</th>
                    <th scope="col" style="width: 18%;">Remarks</th>
                    <th scope="col">Reference Remarks</th>
                    <th scope="col">Attachment</th>
                    <th scope="col">Action</th>
                    </tr>
                </thead>
                </table>
                <ng2-smart-table #mstapplicantreferencerequestsaccepted
                  (userRowSelect)="handle_mstapplicantreferencerequestsaccepted_GridSelected($event)"
                  [settings]="mstapplicantreferencerequestsaccepted_settings"
                  (custom)="onCustom_mstapplicantreferencerequestsaccepted_Action($event)"
                  [source]="tbl_mstapplicantreferencerequestsaccepted?.source?.data"
                  (delete)="mstapplicantreferencerequestsaccepted_route($event,'delete')"
                  (deleteConfirm)="mstapplicantreferencerequestsaccepted_route($event,'delete')"
                  (create)="mstapplicantreferencerequestsaccepted_route($event,'create')"
                  (createConfirm)="mstapplicantreferencerequestsaccepted_beforesave($event)"
                  (edit)="mstapplicantreferencerequestsaccepted_route($event,'edit')"
                  (editConfirm)="mstapplicantreferencerequestsaccepted_beforesave($event)">
                </ng2-smart-table>
    `
})
export class mstapplicantreferencegridComponent implements OnInit {
    isadmin = false;
    bfilterPopulate_mstapplicantreferencerequestsaccepted: boolean = false;
    mstapplicantreferencerequest_menuactions: any = []
    @ViewChild('tbl_mstapplicantreferencerequestsaccepted', { static: false }) tbl_mstapplicantreferencerequestsaccepted: Ng2SmartTableComponent;
    mstapplicantreferencerequestsaccepted_visiblelist: any;
    mstapplicantreferencerequestsaccepted_hidelist: any;
    Deleted_mstapplicantreferencerequest_IDs: string = "";
    mstapplicantreferencerequestsaccepted_ID: string = "11";
    mstapplicantreferencerequestsaccepted_selectedindex: any;

    ShowTableslist: any;
    pkcol: any;

    IsApplicant: boolean;
    IsAdmin: boolean;
    bSingleRecord: boolean;

    applicantid: any;
    data: any;
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
        private sessionService: SessionService,
        private toastr: ToastService,
        private sanitizer: DomSanitizer,
        private mstapplicantmaster_service: mstapplicantmasterService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
        private mstapplicantreferencerequestService: mstapplicantreferencerequestService,
    ) {
        debugger;
        this.data = dynamicconfig;
        if (this.data != null && this.data.data != null) {
            this.data = this.data.data;
        }
        this.pkcol = this.data.maindatapkcol;
        // this.applicantid = this.data.applicantid
    }

    ngOnInit() {
        this.Set_mstapplicantreferencerequestsaccepted_TableConfig();
        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();
    }
    mstapplicantreferencerequestsacceptedhtml() {
        let ret = "";
        ret += `
        <table class="table table-hover" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr>
            <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##requestreferencedate##</th>
            <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##contactemailid##<br/>##contactmobile## </th>
            <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##requestremarks##</th>
            <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##referenceacceptance##</th>
            <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##referenceremarks##</th>
            <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##attachment##</th>
            </tr>
        </tbody>
      </table>
`;
        return ret;
    }
    FillData() {
        this.Set_mstapplicantreferencerequestsaccepted_TableConfig();
        this.mstapplicantreferencerequestService.get_mstapplicantreferencerequests_ByApplicantID(this.applicantid).then(res => {
            // this.mstapplicantskilldetails_LoadTable(res);
            this.mstapplicantreferencerequestsaccepted_LoadTable(res);
        });

    }

    AddOrEdit_mstapplicantreferencerequest(event: any, requestid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantreferencerequestComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, requestid, applicantid, visiblelist: this.mstapplicantreferencerequestsaccepted_visiblelist, hidelist: this.mstapplicantreferencerequestsaccepted_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantreferencerequestsaccepted.source.add(res[i]);
                    }
                    this.tbl_mstapplicantreferencerequestsaccepted.source.refresh();
                }
                else {
                    this.tbl_mstapplicantreferencerequestsaccepted.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantreferencerequest(event: any, childID: number, i: number) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantreferencerequestService.delete_mstapplicantreferencerequest(childID).then(res => {
                this.mstapplicantreferencerequestService.get_mstapplicantreferencerequests_ByApplicantID(this.applicantid).then(res => {
                    // this.mstapplicantskilldetails_LoadTable(res);
                    this.mstapplicantreferencerequestsaccepted_LoadTable(res);
                });
            })
        } else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantreferencerequest_IDs += childID + ",";
        // this.tbl_mstapplicantreferencerequestsaccepted.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }


    //start of Grid Codes mstapplicantreferencerequests
    mstapplicantreferencerequestsaccepted_settings: any;

    show_mstapplicantreferencerequestsaccepted_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantreferencerequestsaccepted.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantreferencerequestsaccepted.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantreferencerequestsaccepted.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantreferencerequestsaccepted.source.initGrid();
    }
    delete_mstapplicantreferencerequestsaccepted_All() {
        this.tbl_mstapplicantreferencerequestsaccepted.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantreferencerequestsaccepted_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantreferencerequestsaccepted_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantreferencerequestsaccepted.source.settings != null) this.tbl_mstapplicantreferencerequestsaccepted.source.settings['hideSubHeader'] = !this.tbl_mstapplicantreferencerequestsaccepted.source.settings['hideSubHeader'];
        this.tbl_mstapplicantreferencerequestsaccepted.source.initGrid();
    }
    show_mstapplicantreferencerequestsaccepted_InActive() {
    }
    enable_mstapplicantreferencerequestsaccepted_InActive() {
    }
    async Set_mstapplicantreferencerequestsaccepted_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantreferencerequestsaccepted) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequestsaccepted.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequestsaccepted_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequestsaccepted_applicantid.value)), }, };
            this.tbl_mstapplicantreferencerequestsaccepted.source.settings = clone;
            this.tbl_mstapplicantreferencerequestsaccepted.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequestsaccepted.source.settings);
            if (clone.columns['requestmasterdatatypeid'] != undefined) clone.columns['requestmasterdatatypeid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequestsaccepted_requestmasterdatatypeid.value)), }, };
            if (clone.columns['requestmasterdatatypeid'] != undefined) clone.columns['requestmasterdatatypeid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequestsaccepted_requestmasterdatatypeid.value)), }, };
            this.tbl_mstapplicantreferencerequestsaccepted.source.settings = clone;
            this.tbl_mstapplicantreferencerequestsaccepted.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequestsaccepted.source.settings);
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequestsaccepted_referenceacceptance.value)), }, };
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequestsaccepted_referenceacceptance.value)), }, };
            this.tbl_mstapplicantreferencerequestsaccepted.source.settings = clone;
            this.tbl_mstapplicantreferencerequestsaccepted.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantreferencerequestsaccepted = true;
    }
    async mstapplicantreferencerequestsaccepted_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantreferencerequestsaccepted_TableConfig() {
        this.mstapplicantreferencerequestsaccepted_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                //delete: (this.IsApplicant || this.IsAdmin),
                position: 'right',
                custom: this.mstapplicantreferencerequest_menuactions
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
                        cell = this.mstapplicantreferencerequestsacceptedhtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        divrow["requestreferencedate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["requestreferencedate"]));
                        divrow["referencedate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["referencedate"]));
                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantreferencerequestsaccepted_LoadTable(mstapplicantreferencerequests = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantreferencerequestsaccepted_ID) >= 0) {
            if (this.tbl_mstapplicantreferencerequestsaccepted != undefined) this.tbl_mstapplicantreferencerequestsaccepted.source = new LocalDataSource();
            if (this.tbl_mstapplicantreferencerequestsaccepted != undefined) this.tbl_mstapplicantreferencerequestsaccepted.source.load(mstapplicantreferencerequests as any as LocalDataSource);
            if (this.tbl_mstapplicantreferencerequestsaccepted != undefined) this.tbl_mstapplicantreferencerequestsaccepted.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicantreferencerequestsaccepted_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantreferencerequests.length == 0)
    {
        this.tbl_mstapplicantreferencerequestsaccepted.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantreferencerequest();
        this.mstapplicantmaster_service.mstapplicantreferencerequests.push(obj);
        this.tbl_mstapplicantreferencerequestsaccepted.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantreferencerequests.length / this.tbl_mstapplicantreferencerequestsaccepted.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantreferencerequestsaccepted.source.getPaging().page)
        {
            this.tbl_mstapplicantreferencerequestsaccepted.source.setPage((this.mstapplicantmaster_service.mstapplicantreferencerequests.length / this.tbl_mstapplicantreferencerequestsaccepted.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantreferencerequestsaccepted.source.grid.edit(this.tbl_mstapplicantreferencerequestsaccepted.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantreferencerequestsaccepted.source.data.indexOf(event.data);
    this.onDelete_mstapplicantreferencerequest(event,event.data.requestid,((this.tbl_mstapplicantreferencerequestsaccepted.source.getPaging().page-1) *this.tbl_mstapplicantreferencerequestsaccepted.source.getPaging().perPage)+index);
    this.tbl_mstapplicantreferencerequestsaccepted.source.refresh();
    break;
    }
    }

    */
    mstapplicantreferencerequestsaccepted_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantreferencerequest(event, null, this.applicantid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantreferencerequest(event, event.data.requestid, this.applicantid);
                break;
            case 'delete':
                this.onDelete_mstapplicantreferencerequest(event, event.data.requestid, ((this.tbl_mstapplicantreferencerequestsaccepted.source.getPaging().page - 1) * this.tbl_mstapplicantreferencerequestsaccepted.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantreferencerequestsaccepted.source.refresh();
                break;
        }
    }
    formid(event: any, arg1: null, formid: any) {
        throw new Error('Method not implemented.');
    }
    mstapplicantreferencerequestsaccepted_onDelete(obj) {
        let requestid = obj.data.requestid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(requestid).then(res =>
                this.mstapplicantreferencerequestsaccepted_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantreferencerequestsaccepted_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantreferencerequests");
        let formname = (objbomenuaction as any).actionname;




    }
    mstapplicantreferencerequestsaccepted_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantreferencerequestsaccepted.source.setPaging(1, val, true);
    }

    handle_mstapplicantreferencerequestsaccepted_GridSelected(event: any) {
        this.mstapplicantreferencerequestsaccepted_selectedindex = this.tbl_mstapplicantreferencerequestsaccepted.source.findIndex(i => i.requestid === event.data.requestid);
    }
    Is_mstapplicantreferencerequestsaccepted_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantreferencerequestsaccepted_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicantreferencerequests
    onClose() {
        this.dialogRef.close();
    }
}
