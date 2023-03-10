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


@Component({
    selector: 'app-applicantsocialmediagrid',
    template: `
    <h4 class="form-group sticky1  columns left"  style="background: #0368b7;
    color: #fff !important; padding: 5px !important;">{{'Social Media Details'}}
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
    <!-- <ul class="rightside">
    <a [routerLink]='' (click)="mstapplicantsocialmediadetails_route(null, 'create')"><i style="color:#fff !important;"
        class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
    </ul> -->
    <ul class="rightside">
                <a  [routerLink]='' (click)="mstapplicantsocialmediadetails_route(null, 'create')">
                <!-- <button type="button" style="border-color: #fff !important;
                color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
                <button type="button" class="btn btn-outline-primary" style="border-color: #fff !important;    color: #fff;
    margin-top: -17%;">Add</button>
                </a><a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon"></i></a>
                </ul>
  </h4>
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  <thead>
    <tr>
      <th style="width: 30%;">Handle Name</th>
      <th style="width: 29%;">Url</th>
      <th style="width: 32%;">Remarks</th>
      <th>Action</th>
    </tr>
  </thead>
</table>
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
    isadmin = false;

    bfilterPopulate_mstapplicantsocialmediadetails: boolean = false;
    mstapplicantsocialmediadetail_menuactions: any = []
    @ViewChild('tbl_mstapplicantsocialmediadetails', { static: false }) tbl_mstapplicantsocialmediadetails: Ng2SmartTableComponent;
    mstapplicantsocialmediadetails_visiblelist: any;
    mstapplicantsocialmediadetails_hidelist: any;
    Deleted_mstapplicantsocialmediadetail_IDs: string = "";
    mstapplicantsocialmediadetails_ID: string = "6";
    mstapplicantsocialmediadetails_selectedindex: any;
    ShowTableslist:any;
    pkcol:any;

    IsApplicant: boolean;
    IsAdmin: boolean;
    bSingleRecord: boolean;

    applicantid:any;
    data:any;
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
    }

    ngOnInit() {
        this.Set_mstapplicantsocialmediadetails_TableConfig();
        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();
    }
    mstapplicantsocialmediadetailshtml() {
        let ret = "";
        ret += `

        <table class="table table-hover socialmedia_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr>
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
    FillData()
    {
        this.Set_mstapplicantsocialmediadetails_TableConfig();
        this.mstapplicantsocialmediadetail_service.get_mstapplicantsocialmediadetails_ByApplicantID(this.applicantid).then(res => {
            this.mstapplicantsocialmediadetails_LoadTable(res);
            });
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

        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantsocialmediadetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, socialrefid, applicantid, visiblelist: this.mstapplicantsocialmediadetails_visiblelist, hidelist: this.mstapplicantsocialmediadetails_hidelist, ScreenType: 2 },
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
