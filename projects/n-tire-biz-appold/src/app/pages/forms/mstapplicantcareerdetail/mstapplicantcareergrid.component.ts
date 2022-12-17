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
import { mstapplicantcareerdetailService } from '../../../service/mstapplicantcareerdetail.service';
import { mstapplicantcareerdetailComponent } from './mstapplicantcareerdetail.component';
import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
@Component({
    selector: 'app-applicantcareergrid',
    template: `<h4 class="form-group sticky1  columns left"   style="background: #0368b7;
    color: #fff;padding: 5px;">{{'Career Details'}}
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

    <ul class="rightside">
    <a  [routerLink]='' (click)="mstapplicantcareerdetails_route(null, 'create')">
    <!-- <button type="button" style="border-color: #fff !important;
    color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
    <button type="button" class="btn btn-outline-primary" style="border-color: #fff !important;    color: #fff;
    margin-top: -17%;">Add</button>
    </a><a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon"></i></a>
    </ul>

    <!--<ul class="rightside">
    <a [routerLink]='' (click)="mstapplicantcareerdetails_route(null, 'create')"><i style="color:#fff !important;"
        class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
    </ul>-->
  </h4>
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  <thead>
    <tr>
      <th style="width: 10.5%;">Action</th>
      <th style="width: 21.6%;">Company Name</th>
      <th style="width: 27.9%;">Designation</th>
      <!--<th style="width: 20%;">Project Name</th>-->
      <th style="width: 21.3%;">From Date</th>
      <th>To Date</th>
    </tr>
  </thead>
</table>
  <ng2-smart-table #tbl_mstapplicantcareerdetails
    (userRowSelect)="handle_mstapplicantcareerdetails_GridSelected($event)"
    [settings]="mstapplicantcareerdetails_settings"
    (custom)="onCustom_mstapplicantcareerdetails_Action($event)"
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

    IsApplicant: boolean;
    IsAdmin: boolean;
    bSingleRecord: boolean;

    applicantid: any;
    data: any;
    formid: any;
    myDate: any;

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
        private sanitizer: DomSanitizer,private datePipe: DatePipe,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
        private mstapplicantcareerdetail_service: mstapplicantcareerdetailService,
    ) {
        debugger;
        var date= new Date()
        this.myDate = this.datePipe.transform(date);
        this.data = dynamicconfig;
        if (this.data != null && this.data.data != null) {
            this.data = this.data.data;
        }
        this.pkcol = this.data.maindatapkcol;
        this.applicantid = this.data.applicantid
    }
    ngOnInit() {
        this.Set_mstapplicantcareerdetails_TableConfig();
        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();
    }
    mstapplicantcareerdetailshtml() {
        let ret = "";
        ret += `
        <div class='card1'>
        <table class="table table-hover" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##companyname##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##designation##</th>
            <!--<th style="white-space: break-spaces;word-break: break-word !important;text-align: -webkit-center;" class="col-2">##keyproject##</th>-->
            <th style="white-space: break-spaces;word-break: break-word !important;text-align: -webkit-center;" class="col-2">##fromdate##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;text-align: -webkit-center;" class="col-2">##todate##</th>
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
    }
    AddOrEdit_mstapplicantcareerdetail(event: any, careerid: any, applicantid: any) {
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
                position: 'left',
                // custom: this.mstapplicantcareerdetail_menuactions
                custom:this.mstapplicantcareerdetail_menuactions
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
                        cell = this.mstapplicantcareerdetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        divrow["fromdate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["fromdate"]));
                        divrow["todate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["todate"]));
                        var dateee=divrow["todate"]
                        if (divrow["todate"] == this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(this.myDate)))
                        { 
                            divrow["todate"] = "Till date";
                             return this.sharedService.HtmlValue(divrow, cell)
                            }else{
                                divrow["todate"]=dateee
                                return this.sharedService.HtmlValue(divrow, cell)
                            }
                        // if (row["todate"] == "1970-01-01T00:00:00") divrow["todate"] = "Till Date"; return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantcareerdetails_LoadTable(mstapplicantcareerdetails = new LocalDataSource()) {
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
                this.AddOrEdit_mstapplicantcareerdetail(event, null, this.applicantid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantcareerdetail(event, event.data.careerid, this.applicantid);
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
