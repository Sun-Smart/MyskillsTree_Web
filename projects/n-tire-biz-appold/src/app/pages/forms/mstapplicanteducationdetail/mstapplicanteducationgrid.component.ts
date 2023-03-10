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
import { mstapplicanteducationdetailComponent } from './mstapplicanteducationdetail.component';
import { mstapplicantmasterService } from '../../../service/mstapplicantmaster.service';
import { mstapplicantreferencegridComponent } from '../mstapplicantreferencerequest/mstapplicantreferencegrid.component';


@Component({
    selector: 'app-applicanteducationgrid',
    template: `
    <h4 class="form-group sticky1  columns left" style="background: #0368b7  !important;
  color: #fff !important;padding: 5px !important;">{{'Education Details'}}
                <ul class="nav navbar-nav1" style='display:none'>
                  <li class="dropdown">
                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
                      aria-expanded='false'> <span class='caret'></span></a>
                    <ul class="dropdown-menu">
                      <li><a class="dropdown-item" [routerLink]=''
                          (click)="mstapplicanteducationdetails_route(null, 'create')"><i
                            class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
                    </ul>
                  </li>
                </ul>
                <!-- <ul class="rightside">
                    <a [routerLink]='' (click)="mstapplicanteducationdetails_route(null, 'create')"><i style="color:#fff !important;"
                       class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
                </ul> -->
                <ul class="rightside">
                <a  [routerLink]='' (click)="mstapplicanteducationdetails_route(null, 'create')">
                <!-- <button type="button" style="border-color: #fff !important;
                color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->
                <button type="button" class="btn btn-outline-primary" style="border-color: #fff !important;    color: #fff;
    margin-top: -17%;">Add</button>
                </a><a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon"></i></a>
                </ul>


              </h4>
              <!-- suneel12 -->
              <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
                <thead>
                    <tr>
                    <th style="width: 11%;">Action</th>
                    <th  style="width: 10%;">From Year</th>
                    <th style="width:21.5%;%">Institution Name</th>
                    <th style="width: 17%;">Course Name</th>
                    <th style="width: 12%;">Percentage</th>
                    <th style="width: 20%;">Remarks</th>
                    <th>To Year</th>
                    </tr>
                </thead>
                </table>


              <ng2-smart-table #tbl_mstapplicanteducationdetails
                (userRowSelect)="handle_mstapplicanteducationdetails_GridSelected($event)"
                [settings]="mstapplicanteducationdetails_settings"
                (custom)="onCustom_mstapplicanteducationdetails_Action($event)"
                [source]="tbl_mstapplicanteducationdetails?.source?.data"
                (delete)="mstapplicanteducationdetails_route($event,'delete')"
                (deleteConfirm)="mstapplicanteducationdetails_route($event,'delete')"
                (create)="mstapplicanteducationdetails_route($event,'create')"
                (createConfirm)="mstapplicanteducationdetails_beforesave($event)"
                (edit)="mstapplicanteducationdetails_route($event,'edit')"
                (editConfirm)="mstapplicanteducationdetails_beforesave($event)">
              </ng2-smart-table>
    `
})
export class mstapplicanteducationdetailgridComponent implements OnInit {
    isadmin = false;
    bfilterPopulate_mstapplicanteducationdetails: boolean = false;
    mstapplicanteducationdetail_menuactions: any = []
    @ViewChild('tbl_mstapplicanteducationdetails', { static: false }) tbl_mstapplicanteducationdetails: Ng2SmartTableComponent;

    mstapplicanteducationdetails_visiblelist: any;
    mstapplicanteducationdetails_hidelist: any;
    Deleted_mstapplicanteducationdetail_IDs: string = "";
    mstapplicanteducationdetails_ID: string = "9";
    mstapplicanteducationdetails_selectedindex: any;


    ShowTableslist:any;
    pkcol:any;

    IsApplicant: boolean;
    IsAdmin: boolean;
    bSingleRecord: boolean;

    applicantid:any;
    data:any;
    formid: any;
    mstapplicanteducationdetails_settings: {
        hideSubHeader: boolean; mode: string; selectMode: string; actions: {
            columnTitle: string; width: string; edit: boolean; // true,
            delete: boolean; position: string; custom: any;
        }; add: { addButtonContent: string; createButtonContent: string; cancelButtonContent: string; confirmCreate: boolean; }; edit: {
            editButtonContent: string; saveButtonContent: string; cancelButtonContent: string; confirmSave: boolean //Custom error functions
                ;
        }; delete: { deleteButtonContent: string; confirmDelete: boolean; }; columns: { colhtml: { title: string; type: string; filter: boolean; editor: { type: string; }; valuePrepareFunction: (cell: any, row: any) => SafeHtml; }; };
    };

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
        private mstapplicanteducationdetail_service: mstapplicanteducationdetailService,
        ) {
            debugger;
            this.data = dynamicconfig;
            if (this.data != null && this.data.data != null) {
                this.data = this.data.data;
            }
            this.pkcol=this.data.maindatapkcol;
            this.applicantid=this.data.applicantid
            console.log( this.mstapplicanteducationdetail_menuactions)
    }

    ngOnInit() {
        this.Set_mstapplicanteducationdetails_TableConfig();

        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();
    }

    mstapplicanteducationdetailshtml() {
        let ret = "";
        ret += `
        <div class='card1'>
        <table class="table table-hover educationdetail_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr>
            <th style="white-space: break-spaces;word-break: break-word !important;width: 12%;" class="col-2">##fromyear##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-3">##institutionname##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##coursename##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;text-align: -webkit-center;" class="col-2">##percentage##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##remarks##</th>
            <th style="white-space: break-spaces;word-break: break-word !important;text-align: -webkit-right;" class="col-2">##toyear##</th>
          </tr>
        </tbody>
      </table>
      </div>


        <!--<div class='card1'>
<div class='row'>
<div class='col-2  bold'>##fromyear##</div>
<div class='col center' style='display:block'>
<h2 style="margin: 0 auto !important;" class='navy'>##institutionname##</h2>
<h2>##coursename##</h2>
<h3 style="margin: 0 auto !important;" class='profile__section__item__sub'>##percentage##%</h3>
##remarks##
</div>
<div class='col-2 bold'>##toyear##</div>
</div>
</div>-->
`;
        return ret;
    }

    FillData()

    {
        // this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(this.applicantid).then(res => {
        //     this.mstapplicanteducationdetail_menuactions = res.mstapplicanteducationdetail_menuactions;
        //     this.Set_mstapplicanteducationdetails_TableConfig();
        //     this.mstapplicanteducationdetails_LoadTable(res.mstapplicanteducationdetails);

        // });


    //   this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(this.applicantid).then(res => {
    //     this.mstapplicanteducationdetail_menuactions = res.mstapplicanteducationdetail_menuactions;
    //     this.Set_mstapplicanteducationdetails_TableConfig();
    //     this.mstapplicanteducationdetails_LoadTable(res.mstapplicanteducationdetails);
    // });


        

        this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_ByApplicantID(this.applicantid).then(res => {
            this.mstapplicanteducationdetail_menuactions = res.mstapplicanteducationdetail_menuactions;
            this.Set_mstapplicanteducationdetails_TableConfig();
            this.mstapplicanteducationdetails_LoadTable(res.mstapplicanteducationdetail);
        });
    }

    AddOrEdit_mstapplicanteducationdetail(event: any, educationid: any, applicantid: any) {
      debugger
        let add = false;
        if (event == null) add = true;
        let childsave = true;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicanteducationdetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, educationid, applicantid, visiblelist: this.mstapplicanteducationdetails_visiblelist, hidelist: this.mstapplicanteducationdetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicanteducationdetails.source.add(res[i]);
                    }
                    this.tbl_mstapplicanteducationdetails.source.refresh();
                }
                else {
                    this.tbl_mstapplicanteducationdetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    handle_mstapplicanteducationdetails_GridSelected(event: any) {
      this.mstapplicanteducationdetails_selectedindex = this.tbl_mstapplicanteducationdetails.source.findIndex(i => i.educationid === event.data.educationid);
  }

    onDelete_mstapplicanteducationdetail(event: any, childID: number, i: number) {
        console.log('event call');
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicanteducationdetail_service.delete_mstapplicanteducationdetail(childID).then(res => {
                this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_ByApplicantID(this.applicantid).then(res => {
                   this.ngOnInit();
                    this.mstapplicanteducationdetails_LoadTable(res);
                    });
            })
        } else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicanteducationdetail_IDs += childID + ",";
        // this.tbl_mstapplicanteducationdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

        //start of Grid Codes mstapplicantskilldetails
        // mstapplicanteducationdetails_settings: any;

        show_mstapplicanteducationdetails_Checkbox() {
            //debugger;;
            if (this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'single';
            else
                this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'multi';
            this.tbl_mstapplicanteducationdetails.source.initGrid();
        }
        delete_mstapplicanteducationdetails_All() {
            this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'single';
        }
        show_mstapplicanteducationdetails_Filter() {
            setTimeout(() => {
                //  this.Set_mstapplicantskilldetails_TableDropDownConfig();
            });
            if (this.tbl_mstapplicanteducationdetails.source.settings != null) this.tbl_mstapplicanteducationdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicanteducationdetails.source.settings['hideSubHeader'];
            this.tbl_mstapplicanteducationdetails.source.initGrid();
        }
        show_mstapplicanteducationdetails_InActive() {
        }
        enable_mstapplicanteducationdetails_InActive() {
        }
        async Set_mstapplicanteducationdetails_TableDropDownConfig(res) {
            if (!this.bfilterPopulate_mstapplicanteducationdetails) {

                var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
                if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_applicantid.value)), }, };
                this.tbl_mstapplicanteducationdetails.source.settings = clone;
                this.tbl_mstapplicanteducationdetails.source.initGrid();

                var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
                if (clone.columns['skillcategory'] != undefined) clone.columns['skillcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_educationcategory.value)), }, };
                if (clone.columns['skillcategory'] != undefined) clone.columns['skillcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_educationcategory.value)), }, };
                this.tbl_mstapplicanteducationdetails.source.settings = clone;
                this.tbl_mstapplicanteducationdetails.source.initGrid();

                var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
                if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_referenceacceptance.value)), }, };
                this.tbl_mstapplicanteducationdetails.source.settings = clone;
                this.tbl_mstapplicanteducationdetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicanteducationdetails = true;
        }
        async mstapplicanteducationdetails_beforesave(event: any) {
            event.confirm.resolve(event.newData)

        }
        Set_mstapplicanteducationdetails_TableConfig() {
            this.mstapplicanteducationdetails_settings = {
                hideSubHeader: true,
                mode: 'external',
                selectMode: 'single',
                actions: {
                    columnTitle: '',
                    width: '300px',
                    edit: true, // true,
                    delete: (this.IsApplicant || this.IsAdmin),
                    position: 'left',
                    // custom: this.mstapplicanteducationdetail_menuactions
                    custom: this.mstapplicanteducationdetail_menuactions
                },
                // actions: {
                //     columnTitle: '',
                //     width: '300px',
                //     edit: true, // true,
                //     delete: (this.IsApplicant || this.IsAdmin),
                //     position: 'left',
                //     // custom: this.mstapplicanteducationdetail_menuactions
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
                            cell = this.mstapplicanteducationdetailshtml();
                            var divrow = JSON.parse(JSON.stringify(row));


                            divrow["selfrating"] = "<div class='Stars' style='--rating:" + row['selfrating'] + "'></div>";
                            return this.sharedService.HtmlValue(divrow, cell);
                        },
                    },
                },
            };
        }
        mstapplicanteducationdetails_LoadTable(mstapplicanteducationdetails = new LocalDataSource()) {
            if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicanteducationdetails_ID) >= 0) {
                if (this.tbl_mstapplicanteducationdetails != undefined) this.tbl_mstapplicanteducationdetails.source = new LocalDataSource();
                if (this.tbl_mstapplicanteducationdetails != undefined) this.tbl_mstapplicanteducationdetails.source.load(mstapplicanteducationdetails as any as LocalDataSource);
                if (this.tbl_mstapplicanteducationdetails != undefined) this.tbl_mstapplicanteducationdetails.source.setPaging(1, 20, true);
            }
        }
        mstapplicanteducationdetails_route(event: any, action: any) {
          debugger
            var addparam = "";
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
            }

            switch (action) {

                case 'create':
                    this.AddOrEdit_mstapplicanteducationdetail(event, null, this.applicantid);
                    break;
                case 'view':
                    break;
                case 'edit':
                    this.AddOrEdit_mstapplicanteducationdetail(event, event.data.educationid, this.applicantid);
                    break;
                // case 'delete':

                //     this.onDelete_mstapplicanteducationdetail(event, event.data.skillid, ((this.tbl_mstapplicanteducationdetails.source.getPaging().page - 1) * this.tbl_mstapplicanteducationdetails.source.getPaging().perPage) + event.index);
                //     this.tbl_mstapplicanteducationdetails.source.refresh();
                //     break;

                case 'delete':
                              this.onDelete_mstapplicanteducationdetail(event, event.data.educationid, ((this.tbl_mstapplicanteducationdetails.source.getPaging().page - 1) * this.tbl_mstapplicanteducationdetails.source.getPaging().perPage) + event.index);
                              this.tbl_mstapplicanteducationdetails.source.refresh();
                              break;
            }
        }


        mstapplicanteducationdetails_onDelete(event: any, childID: number, i: number) {
          if (confirm('Do you want to delete this record?')) {
              this.mstapplicanteducationdetail_service.delete_mstapplicanteducationdetail(childID).then(res => {
                  this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_ByApplicantID(this.applicantid).then(res => {
                      this.mstapplicanteducationdetails_LoadTable(res);
                  });
              })
          } else {
              return;
          }
          // let educationid = obj.data.educationid;
          // if (confirm('Are you sure to delete this record ?')) {
          //     this.mstapplicantmaster_service.delete_mstapplicantmaster(educationid).then(res =>
          //         this.mstapplicanteducationdetails_LoadTable(res)
          //     );
          // }
      }




   //for delete function not wokring

        // mstapplicanteducationdetails_onDelete(obj) {
        //     let educationid = obj.data.educationid;
        //     if (confirm('Are you sure to delete this record ?')) {
        //         this.mstapplicantmaster_service.delete_mstapplicantmaster(educationid).then(res =>
        //             this.mstapplicanteducationdetails_LoadTable()
        //         );
        //     }
        // }
        async onCustom_mstapplicanteducationdetails_Action(event: any) {

        //   this.dialog.open(mstapplicantreferencegridComponent, {
        //     width: '100% !important',
        //     height: 'auto !important',
        //     data: { ScreenType: 2, applicantid: this.applicantid, save: true }
        //   })



        // let referencesourcedetails = 'Category: ' + event.data.educationcategorydesc + '<BR>' + 'Sub Category: ' + event.data.educationsubcategory + '<BR>'
        //     + 'Course: ' + event.data.coursename + '<BR>' + 'Institution: ' + event.data.institutionname + '<BR>' + 'From Year: ' + event.data.fromyear + '<BR>'
        //     + 'To Year: ' + event.data.toyear + '<BR>' + 'Percentage: ' + event.data.percentage + '<BR>' + 'Remarks: ' + event.data.remarks;

        let referencesourcedetails = '<ul class="list-group"  style="background: #2D3C84 !important;"><li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Category: ' + event.data.educationcategorydesc + '</li>'
        + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Sub Category: ' + event.data.educationsubcategorydesc + '</li>'
        + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Course: ' + event.data.coursename + '</li>'
        + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Institution: ' + event.data.institutionname + '</li>'
        + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> From Year: ' + event.data.fromyear + '</li>'
        + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> To Year: ' + event.data.toyear + '</li>'
        + '<li class="list-group-item" style="background: #2D3C84 !important;color: #fff;"> Percentage: ' + event.data.percentage + '</li>'
        + '<li class="list-group-item remarks_p" style="background: #2D3C84 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>'


            // let referencesourcedetails = 'Sub Category: ' + event.data.subcategoryiddesc + '<BR>'
            //  + 'Education Details: ' + event.data.skillcategorydesc + '<BR>'
            //   + 'Self Rating: ' + event.data.selfrating + '<BR>'
            //   + 'Remarks: ' + event.data.remarks;
            let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicanteducationdetails");
            let formname = (objbomenuaction as any).actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(mstapplicantreferencerequestComponent,
                    {
                        data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 315, requestmasterid: event.data.educationid, ScreenType: 2, save: true }
                        // data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 3, save: true }
                    }
                ).onClose.subscribe(res => {
                });
            }




        }
        mstapplicanteducationdetails_Paging(val) {
            //debugger;;
            this.tbl_mstapplicanteducationdetails.source.setPaging(1, val, true);
        }

        handle_mstapplicantskilldetails_GridSelected(event: any) {
            this.mstapplicanteducationdetails_selectedindex = this.tbl_mstapplicanteducationdetails.source.findIndex(i => i.skillid === event.data.skillid);
        }
        Is_mstapplicanteducationdetails_Visible() {
            if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicanteducationdetails_ID) >= 0) {
                return "tbl smart-table-container";
            }
            else {
                return "hide";
            }
        }
        // mstapplicanteducationdetails_route(event: any, action: any) {
        //   debugger
        //     var addparam = "";
        //     if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
        //         addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        //     }

        //     switch (action) {
        //         case 'create':
        //             this.AddOrEdit_mstapplicanteducationdetail(event, null, this.formid);
        //             break;
        //         case 'view':
        //             break;
        //         case 'edit':
        //             this.AddOrEdit_mstapplicanteducationdetail(event, event.data.educationid, this.formid);
        //             break;
        //         case 'delete':
        //             this.onDelete_mstapplicanteducationdetail(event, event.data.educationid, ((this.tbl_mstapplicanteducationdetails.source.getPaging().page - 1) * this.tbl_mstapplicanteducationdetails.source.getPaging().perPage) + event.index);
        //             this.tbl_mstapplicanteducationdetails.source.refresh();
        //             break;
        //     }
        // }
        //end of Grid Codes mstapplicantskilldetails
        onClose() {
            // location.reload();
            this.dialogRef.close();
          }

}
