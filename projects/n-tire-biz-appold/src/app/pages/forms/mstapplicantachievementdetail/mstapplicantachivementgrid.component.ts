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
import { mstapplicantachievementdetailService } from '../../../service/mstapplicantachievementdetail.service';
import { mstapplicantachievementdetailComponent } from './mstapplicantachievementdetail.component';
import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';
@Component({
    selector: 'app-applicantachivementgrid',
    template: `
    <h4 class="form-group sticky1  columns left"    style="background: #0368b7;
    color: #fff;padding: 5px;">{{'Achievement Details'}}
                <ul class="nav navbar-nav1" style='display:none'>
                  <li class="dropdown">
                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
                      aria-expanded='false'> <span class='caret'></span></a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" [routerLink]=''
                          (click)="mstapplicantachievementdetails_route(null, 'create');"><i
                            class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
                    </ul>
                  </li>
                </ul>

                <ul class="rightside">
                <a  [routerLink]='' (click)="mstapplicantachievementdetails_route(null, 'create')">
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
            <th scope="col" style="width: 16%">Master Data Type</th>
            <th scope="col" style="width: 21%">Attachment</th>
            <th scope="col" style="width: 51%">Achievement Details</th>
            <th scope="col" style="width: 11%">Action</th>
          </tr>
        </thead>
</table>
              <ng2-smart-table #tbl_mstapplicantachievementdetails
                (userRowSelect)="handle_mstapplicantachievementdetails_GridSelected($event)"
                [settings]="mstapplicantachievementdetails_settings"
                (custom)="onCustom_mstapplicantachievementdetails_Action($event)"
                [source]="tbl_mstapplicantachievementdetails?.source?.data"
                (delete)="mstapplicantachievementdetails_route($event,'delete')"
                (deleteConfirm)="mstapplicantachievementdetails_route($event,'delete')"
                (create)="mstapplicantachievementdetails_route($event,'create')"
                (createConfirm)="mstapplicantachievementdetails_beforesave($event)"
                (edit)="mstapplicantachievementdetails_route($event,'edit')"
                (editConfirm)="mstapplicantachievementdetails_beforesave($event)">
              </ng2-smart-table>
    `
})
export class mstapplicantachivementgridComponent implements OnInit {
    isadmin = false;
    bfilterPopulate_mstapplicantachievementdetails: boolean = false;
    mstapplicantachievementdetail_menuactions: any = []
    @ViewChild('tbl_mstapplicantachievementdetails', { static: false }) tbl_mstapplicantachievementdetails: Ng2SmartTableComponent;
    stapplicantachievementdetails_visiblelist: any;
    mstapplicantachievementdetails_hidelist: any;
    Deleted_mstapplicantachievementdetail_IDs: string = "";
    mstapplicantachievementdetails_ID: string = "7";
    mstapplicantachievementdetails_selectedindex: any;

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
    mstapplicantachievementdetails_visiblelist: any;
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
        private mstapplicantachivement_service: mstapplicantachievementdetailService,
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
      debugger
        this.Set_mstapplicantachievementdetails_TableConfig();
        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();
    }
    FillData() {
      debugger

    //   this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(this.applicantid).then(res => {
    //     this.mstapplicantachievementdetail_menuactions = res.mstapplicantachievementdetail_menuactions;
    //     this.Set_mstapplicantachievementdetails_TableConfig();
    //     this.mstapplicantachievementdetails_LoadTable(res.mstapplicantskilldetails);

    // });
        
        this.mstapplicantachivement_service.get_mstapplicantachievementdetails_ByApplicantID(this.applicantid).then(res => {
          debugger
        //   this.mstapplicantachievementdetail_menuactions = res.mstapplicantachievementdetail_menuactions;
          this.Set_mstapplicantachievementdetails_TableConfig();
          this.mstapplicantachievementdetails_LoadTable(res.mstapplicantachievementdetail);
        });
    }
    mstapplicantachievementdetailshtml() {
        let ret = "";
        ret += `
        <table class="table table-hover" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr>
            <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##masterdataiddesc##</th>
            <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-3">##attachment##</th>
            <th scope="row" class="card1 profile__section__item__sub" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##achievementdetails##</th>
            <th scope="row" style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##remarks##</th>
          </tr>
        </tbody>
      </table>
`;
        return ret;
    }
    AddOrEdit_mstapplicantachievementdetail(event: any, achievementid: any, applicantid: any) {
      debugger
        let add = false;
        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantachievementdetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, achievementid, applicantid, visiblelist: this.mstapplicantachievementdetails_visiblelist, hidelist: this.mstapplicantachievementdetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantachievementdetails.source.add(res[i]);
                    }
                    this.tbl_mstapplicantachievementdetails.source.refresh();
                }
                else {
                    this.tbl_mstapplicantachievementdetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantachievementdetail(event: any, childID: number, i: number) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantachivement_service.delete_mstapplicantachievementdetail(childID).then(res => {
                this.mstapplicantachivement_service.get_mstapplicantachievementdetails_ByApplicantID(this.applicantid).then(res => {
                   this.ngOnInit();
                    this.mstapplicantachievementdetails_LoadTable(res.mstapplicantachievementdetail);
                });
            })
        } else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantachievementdetail_IDs += childID + ",";
        // this.tbl_mstapplicantachievementdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
 //start of Grid Codes mstapplicantachievementdetails
 mstapplicantachievementdetails_settings: any;

 show_mstapplicantachievementdetails_Checkbox() {
     //debugger;;
     if (this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'single';
     else
         this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'multi';
     this.tbl_mstapplicantachievementdetails.source.initGrid();
 }
 delete_mstapplicantachievementdetails_All() {
     this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'single';
 }
 show_mstapplicantachievementdetails_Filter() {
     setTimeout(() => {
         //  this.Set_mstapplicantachievementdetails_TableDropDownConfig();
     });
     if (this.tbl_mstapplicantachievementdetails.source.settings != null) this.tbl_mstapplicantachievementdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantachievementdetails.source.settings['hideSubHeader'];
     this.tbl_mstapplicantachievementdetails.source.initGrid();
 }
 show_mstapplicantachievementdetails_InActive() {
 }
 enable_mstapplicantachievementdetails_InActive() {
 }
 async Set_mstapplicantachievementdetails_TableDropDownConfig(res) {
   debugger
     if (!this.bfilterPopulate_mstapplicantachievementdetails) {

         var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
         if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_applicantid.value)), }, };
         if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_applicantid.value)), }, };
         this.tbl_mstapplicantachievementdetails.source.settings = clone;
         this.tbl_mstapplicantachievementdetails.source.initGrid();

         var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
         if (clone.columns['masterdataid'] != undefined) clone.columns['masterdataid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_masterdataid.value)), }, };
         if (clone.columns['masterdataid'] != undefined) clone.columns['masterdataid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_masterdataid.value)), }, };
         this.tbl_mstapplicantachievementdetails.source.settings = clone;
         this.tbl_mstapplicantachievementdetails.source.initGrid();

         var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
         if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_referenceacceptance.value)), }, };
         if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_referenceacceptance.value)), }, };
         this.tbl_mstapplicantachievementdetails.source.settings = clone;
         this.tbl_mstapplicantachievementdetails.source.initGrid();
     }
     this.bfilterPopulate_mstapplicantachievementdetails = true;
 }
 async mstapplicantachievementdetails_beforesave(event: any) {
     event.confirm.resolve(event.newData);



 }
 Set_mstapplicantachievementdetails_TableConfig() {
   debugger
     this.mstapplicantachievementdetails_settings = {
         hideSubHeader: true,
         mode: 'external',
         selectMode: 'single',
         actions: {
            columnTitle: '',
            width: '300px',
            edit: true, // true,
            delete: (this.IsApplicant || this.IsAdmin),
            position: 'right',
            custom: this.mstapplicantachievementdetail_menuactions
        },
        //  actions: {
        //      columnTitle: '',
        //      width: '300px',
        //      edit: true, // true,
        //      delete: (this.IsApplicant || this.IsAdmin),
        //      position: 'right',
        //     //  custom: this.mstapplicantachievementdetail_menuactions
        //     custom: [{ name: 'reference',
        //     title: `<i class="icon-references" aria-hidden="true"></i>`,
        //  }]
        //  },
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
                     cell = this.mstapplicantachievementdetailshtml();
                     var divrow = JSON.parse(JSON.stringify(row));


                     divrow["selfrating"] = "<div class='Stars' style='--rating:" + row['selfrating'] + "'></div>";
                     return this.sharedService.HtmlValue(divrow, cell);
                 },
             },
         },
     };
 }
 mstapplicantachievementdetails_LoadTable(mstapplicantachievementdetails = new LocalDataSource()) {
     if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantachievementdetails_ID) >= 0) {
         if (this.tbl_mstapplicantachievementdetails != undefined) this.tbl_mstapplicantachievementdetails.source = new LocalDataSource();
         if (this.tbl_mstapplicantachievementdetails != undefined) this.tbl_mstapplicantachievementdetails.source.load(mstapplicantachievementdetails as any as LocalDataSource);
         if (this.tbl_mstapplicantachievementdetails != undefined) this.tbl_mstapplicantachievementdetails.source.setPaging(1, 20, true);
     }
 }

 //external to inline
 /*
 mstapplicantachievementdetails_route(event:any,action:any) {
 switch ( action) {
 case 'create':
 if (this.mstapplicantmaster_service.mstapplicantachievementdetails.length == 0)
 {
     this.tbl_mstapplicantachievementdetails.source.grid.createFormShown = true;
 }
 else
 {
     let obj = new mstapplicantachievementdetail();
     this.mstapplicantmaster_service.mstapplicantachievementdetails.push(obj);
     this.tbl_mstapplicantachievementdetails.source.refresh();
     if ((this.mstapplicantmaster_service.mstapplicantachievementdetails.length / this.tbl_mstapplicantachievementdetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantachievementdetails.source.getPaging().page)
     {
         this.tbl_mstapplicantachievementdetails.source.setPage((this.mstapplicantmaster_service.mstapplicantachievementdetails.length / this.tbl_mstapplicantachievementdetails.source.getPaging().perPage).toFixed(0) + 1);
     }
     setTimeout(() => {
         this.tbl_mstapplicantachievementdetails.source.grid.edit(this.tbl_mstapplicantachievementdetails.source.grid.getLastRow());
     });
 }
 break;
 case 'delete':
 let index = this.tbl_mstapplicantachievementdetails.source.data.indexOf(event.data);
 this.onDelete_mstapplicantachievementdetail(event,event.data.achievementid,((this.tbl_mstapplicantachievementdetails.source.getPaging().page-1) *this.tbl_mstapplicantachievementdetails.source.getPaging().perPage)+index);
 this.tbl_mstapplicantachievementdetails.source.refresh();
 break;
 }
 }

 */
 mstapplicantachievementdetails_route(event: any, action: any) {
   debugger
     var addparam = "";
     if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
         addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
     }

     switch (action) {
         case 'create':
             this.AddOrEdit_mstapplicantachievementdetail(event, null, this.applicantid);
             break;
         case 'view':
             break;
         case 'edit':
             this.AddOrEdit_mstapplicantachievementdetail(event, event.data.achievementid, this.applicantid);
             break;
         case 'delete':
             this.onDelete_mstapplicantachievementdetail(event, event.data.achievementid, ((this.tbl_mstapplicantachievementdetails.source.getPaging().page - 1) * this.tbl_mstapplicantachievementdetails.source.getPaging().perPage) + event.index);
             this.tbl_mstapplicantachievementdetails.source.refresh();
             break;
     }
 }
    formid(event: any, arg1: null, formid: any) {
        throw new Error('Method not implemented.');
    }
 mstapplicantachievementdetails_onDelete(obj) {
     let achievementid = obj.data.achievementid;
     if (confirm('Are you sure to delete this record ?')) {
         this.mstapplicantachivement_service.delete_mstapplicantachievementdetail(achievementid).then(res =>
             this.mstapplicantachievementdetails_LoadTable()
         );
     }
 }
 async onCustom_mstapplicantachievementdetails_Action(event: any) {

//   this.dialog.open(mstapplicantreferencegridComponent, {
//     width: '100% !important',
//     height: 'auto !important',
//     data: { ScreenType: 2, applicantid: this.applicantid, save: true }
//   })

// let referencesourcedetails = 'Achievements: ' + event.data.masterdataiddesc + '<BR>' + 'Details: ' + event.data.achievementdetails;

let referencesourcedetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Achievements ' + event.data.masterdataiddesc + '</li>'
        + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Details: ' + event.data.achievementdetails + '</li>'


     let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantachievementdetails");
     let formname = (objbomenuaction as any).actionname;
     if (formname == "mstapplicantreferencerequests") {
         this.dialog.open(mstapplicantreferencerequestComponent,
             {
                data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 319, requestmasterid: event.data.achievementid, ScreenType: 2, save: true }
                //  data: { applicantid: event.data.applicantid, requestmasterdatatypeid: 319, requestmasterid: event.data.achievementid, ScreenType: 2, save: true }
             }
         ).onClose.subscribe(res => {
         });
     }




 }
 mstapplicantachievementdetails_Paging(val) {
     //debugger;;
     this.tbl_mstapplicantachievementdetails.source.setPaging(1, val, true);
 }

 handle_mstapplicantachievementdetails_GridSelected(event: any) {
     this.mstapplicantachievementdetails_selectedindex = this.tbl_mstapplicantachievementdetails.source.findIndex(i => i.achievementid === event.data.achievementid);
 }
 Is_mstapplicantachievementdetails_Visible() {
     if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantachievementdetails_ID) >= 0) {
         return "tbl smart-table-container";
     }
     else {
         return "hide";
     }
 }
 //end of Grid Codes mstapplicantachievementdetails
 onClose() {
    //    location.reload();
    this.dialogRef.close();
}





}
