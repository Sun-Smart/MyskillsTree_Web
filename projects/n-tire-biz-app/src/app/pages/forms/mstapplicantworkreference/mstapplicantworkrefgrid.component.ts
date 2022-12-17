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
import { mstapplicantworkreferenceComponent } from './mstapplicantworkreference.component';
import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
@Component({
    selector: 'app-applicantworkrefgrid',
    template: `
    <div class="row form-group sticky1" style=" background: #f5f3e4; !important;color: #000;padding: 5px;">

    <div class="col-4">
    <h4 >{{'Projects'}}</h4>
</div>

<div class="col-4">
                <ul class="nav navbar-nav1" style='display:none'>
                  <li class="dropdown">
                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
                      aria-expanded='false'> <span class='caret'></span></a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" [routerLink]=''
                          (click)="mstapplicantworkreferences_route(null, 'create')"><i class="fa fa-plus"
                            aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
                    </ul>
                  </li>
                </ul>
</div>

<div class="col-4" style="text-align: end; margin: auto;">

                <!-- <a  [routerLink]='' (click)="mstapplicantworkreferences_route(null, 'create')"> -->
                <!-- <button type="button" style="border-color: #fff !important;
                color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
                <button type="button" class="btn btn-outline-primary" [routerLink]='' (click)="mstapplicantworkreferences_route(null, 'create')"
                style="border-color: #000 !important;    color: #000; margin: auto 20px" title = "Add Details">Add</button>
                <!-- </a> -->

                <!-- <a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon" title = "Close"></i></a> -->

                <a  class="" [routerLink]='' (click)="onClose()"><img src="assets/mainmenuicons/icons_close.png" style="width: 20px;" title = "Close"/></a>

                <!--<ul class="rightside">
                <a  [routerLink]='' (click)="mstapplicantworkreferences_route(null, 'create')"><i
                style="color:#fff !important;"   class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
                </ul>-->
</div>
</div>
              <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
                <thead>
                    <tr>
                    <th style="width: 10.6%;">Action</th>
                    <th style="width: 17.3%;">Work Topic</th>
                    <th style="width: 19%;">Reference Url</th>
                    <th style="width: 15%;">Referral Status</th>
                    <th style="width: 17.5%;">Work Description</th>
                    <th>Remarks</th>
                    </tr>
                </thead>
                </table>
              <ng2-smart-table #tbl_mstapplicantworkreferences
                (userRowSelect)="handle_mstapplicantworkreferences_GridSelected($event)"
                [settings]="mstapplicantworkreferences_settings"
                (custom)="onCustom_mstapplicantworkreferences_Action($event)"
                [source]="tbl_mstapplicantworkreferences?.source?.data"
                (delete)="mstapplicantworkreferences_route($event,'delete')"
                (deleteConfirm)="mstapplicantworkreferences_route($event,'delete')"
                (create)="mstapplicantworkreferences_route($event,'create')"
                (createConfirm)="mstapplicantworkreferences_beforesave($event)"
                (edit)="mstapplicantworkreferences_route($event,'edit')"
                (editConfirm)="mstapplicantworkreferences_beforesave($event)">
              </ng2-smart-table>
    `
})
export class mstapplicantworkrefgridComponent implements OnInit {
    isadmin = false;
    bfilterPopulate_mstapplicantworkreferences: boolean = false;
    mstapplicantworkreference_menuactions: any = []
    @ViewChild('tbl_mstapplicantworkreferences', { static: false }) tbl_mstapplicantworkreferences: Ng2SmartTableComponent;

    mstapplicantworkreferences_visiblelist: any;
    mstapplicantworkreferences_hidelist: any;

    Deleted_mstapplicantworkreference_IDs: string = "";
    mstapplicantworkreferences_ID: string = "5";
    mstapplicantworkreferences_selectedindex: any;
    ShowTableslist: any;
    pkcol: any;

    IsApplicant: boolean;
    IsAdmin: boolean;
    bSingleRecord: boolean;

    applicantid: any;
    data: any;
    formid: any;
    referencecountres: any;
    countarray: any = [];
    acceptcount: string;
    r1: any;
    r2: any;
    r3: any;
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
        private sanitizer: DomSanitizer,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
        private mstapplicantreferencerequestService: mstapplicantreferencerequestService,
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
        this.Set_mstapplicantworkreferences_TableConfig();
        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();
    }

    mstapplicantworkreferenceshtml() {
        let ret = "";
        ret += `
        <table class="table table-hover workdetails_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##worktopic##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2"><a href="https://##referenceurl##" target="_blank">##referenceurl##</a></th>
            <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##referencecount##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##workdescription##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##remarks##</th>
          </tr>
        </tbody>
      </table>

        <!--<div class='card1'>
<h2>##worktopic## - ##referenceurl##</h2>
<h3 style="margin: 0 auto !important;"  class='profile__section__item__sub'>##workdescription##</h3>
<p style="margin: 0 auto !important;line-height: 2.0rem !important">##remarks##</p>
</div>-->
`;
        return ret;
    }
    FillData() {
        // this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(this.applicantid).then(res => {
        //     this.mstapplicantworkreference_menuactions = res.mstapplicantworkreference_menuactions;
        //     this.Set_mstapplicantworkreferences_TableConfig();
        //     this.mstapplicantworkreferences_LoadTable(res.mstapplicantworkreferences);
        // });
        // debugger;


        this.mstapplicantreferencerequestService.get_mstapplicantworkreference_ByApplicantID(this.applicantid).then(res => {
            this.mstapplicantworkreference_menuactions = res.mstapplicantworkreference_menuactions;
            debugger;
            this.Set_mstapplicantworkreferences_TableConfig();
            this.mstapplicantworkreferences_LoadTable(res.mstapplicantworkreference);
        });
    }
    AddOrEdit_mstapplicantworkreference(event: any, workreferenceid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantworkreferenceComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workreferenceid, applicantid, visiblelist: this.mstapplicantworkreferences_visiblelist, hidelist: this.mstapplicantworkreferences_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantworkreferences.source.add(res[i]);
                    }
                    this.tbl_mstapplicantworkreferences.source.refresh();
                }
                else {
                    this.tbl_mstapplicantworkreferences.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantworkreference(event: any, childID: number, i: number) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantreferencerequestService.delete_mstapplicantreferencerequest(childID).then(res => {
                this.mstapplicantreferencerequestService.get_mstapplicantworkreference_ByApplicantID(this.applicantid).then(res => {
                    debugger;
                    this.ngOnInit();
                    this.mstapplicantworkreferences_LoadTable(res);
                });
            })
        } else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantworkreference_IDs += childID + ",";
        // this.tbl_mstapplicantworkreferences.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    mstapplicantworkreferences_settings: any;

    show_mstapplicantworkreferences_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantworkreferences.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantworkreferences.source.initGrid();
    }
    delete_mstapplicantworkreferences_All() {
        this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantworkreferences_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantworkreferences_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantworkreferences.source.settings != null) this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'];
        this.tbl_mstapplicantworkreferences.source.initGrid();
    }
    show_mstapplicantworkreferences_InActive() {
    }
    enable_mstapplicantworkreferences_InActive() {
    }
    async Set_mstapplicantworkreferences_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantworkreferences) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantworkreferences.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantworkreferences_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantworkreferences_applicantid.value)), }, };
            this.tbl_mstapplicantworkreferences.source.settings = clone;
            this.tbl_mstapplicantworkreferences.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantworkreferences = true;
    }
    async mstapplicantworkreferences_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantworkreferences_TableConfig() {
        this.mstapplicantworkreferences_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                // custom: this.mstapplicantworkreference_menuactions
                custom: this.mstapplicantworkreference_menuactions
            },
            // actions: {
            //     columnTitle: '',
            //     width: '300px',
            //     edit: true, // true,
            //     delete: (this.IsApplicant || this.IsAdmin),
            //     position: 'left',
            //     // custom: this.mstapplicantworkreference_menuactions
            //     custom: [{
            //         name: 'reference',
            //         title: `<i class="icon-references" aria-hidden="true"></i>`,
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
                        cell = this.mstapplicantworkreferenceshtml();
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
                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantworkreferences_LoadTable(mstapplicantworkreferences = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantworkreferences_ID) >= 0) {
            if (this.tbl_mstapplicantworkreferences != undefined) this.tbl_mstapplicantworkreferences.source = new LocalDataSource();
            if (this.tbl_mstapplicantworkreferences != undefined) this.tbl_mstapplicantworkreferences.source.load(mstapplicantworkreferences as any as LocalDataSource);
            if (this.tbl_mstapplicantworkreferences != undefined) this.tbl_mstapplicantworkreferences.source.setPaging(1, 20, true);
        }
    }

    mstapplicantworkreferences_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantworkreference(event, null, this.applicantid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantworkreference(event, event.data.workreferenceid, this.applicantid);
                break;
            case 'delete':
                this.onDelete_mstapplicantworkreference(event, event.data.workreferenceid, ((this.tbl_mstapplicantworkreferences.source.getPaging().page - 1) * this.tbl_mstapplicantworkreferences.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantworkreferences.source.refresh();
                break;
        }
    }
    mstapplicantworkreferences_onDelete(obj) {
        let workreferenceid = obj.data.workreferenceid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantreferencerequestService.delete_mstapplicantreferencerequest(workreferenceid).then(res =>
                this.mstapplicantworkreferences_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantworkreferences_Action(event: any) {
        //   this.dialog.open(mstapplicantreferencegridComponent, {
        //     width: '100% !important',
        //     height: 'auto !important',
        //     data: { ScreenType: 2, applicantid: this.applicantid, save: true }
        //   })

        let referencesourcedetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Work Topic: ' + event.data.worktopic + '</li>'
            + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;white-space: break-spaces !important;"> Work Description: ' + event.data.workdescription + '</li>'
            + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Reference URL: ' + event.data.referenceurl + '</li>'
            + '<li class="list-group-item remarks_p" style="background: #2D3C84 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>'


        // let referencesourcedetails =
        //     'Work Topic: ' + event.data.worktopic +
        //     '<BR>' +
        //     'Work Description: ' +event.data.workdescription + '<BR>'
        //     + 'Reference URL: ' + event.data.referenceurl +
        //     '<BR>' + 'Remarks: ' + event.data.remarks;
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantworkreferences");
        let formname = (objbomenuaction as any).actionname;
        if (formname == "mstapplicantreferencerequests") {
            this.dialog.open(mstapplicantreferencerequestComponent,
                {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 320, requestmasterid: event.data.workreferenceid, ScreenType: 2, save: true }
                }
            ).onClose.subscribe(res => {
            });
        }

    }
    mstapplicantworkreferences_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantworkreferences.source.setPaging(1, val, true);
    }

    handle_mstapplicantworkreferences_GridSelected(event: any) {
        this.mstapplicantworkreferences_selectedindex = this.tbl_mstapplicantworkreferences.source.findIndex(i => i.workreferenceid === event.data.workreferenceid);
    }
    Is_mstapplicantworkreferences_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantworkreferences_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    onClose() {
        this.dialogRef.close();
    }
}
