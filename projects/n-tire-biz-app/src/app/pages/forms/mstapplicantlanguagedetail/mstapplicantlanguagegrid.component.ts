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
import { mstapplicantlanguagedetailService } from '../../../service/mstapplicantlanguagedetail.service';
import { mstapplicantlanguagedetailComponent } from './mstapplicantlanguagedetail.component';


@Component({
    selector: 'app-applicantlanguagegrid',
    template: `
    <div class="row form-group sticky1" style=" background: #f5f3e4 !important;color: #000;padding: 5px;">

<div class="col-4">
    <h4 class="columns left">{{'Language Details'}}</h4>
</div>
<div class="col-4">
    <ul class="nav navbar-nav1" style='display:none'>
      <li class="dropdown">
        <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'
          aria-expanded='false'> <span class='caret'></span></a>
        <ul class="dropdown-menu">
          <li><a class="dropdown-item" [routerLink]=''
              (click)="mstapplicantlanguagedetailtoggleOption();mstapplicantlanguagedetails_route(null, 'create')"><i
                class="fa fa-plus" aria-hidden="true"></i>&nbsp;&nbsp;&nbsp;New</a></li>
        </ul>
      </li>
    </ul>
</div>

<div class="col-4" style="text-align: end; margin: auto;">
    <!-- <ul class="rightside">
    <a [routerLink]='' (click)="mstapplicantlanguagedetails_route(null, 'create')"><i style="color:#fff !important;"
        class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i style="color:#fff !important;" class="fa fa-close"></i></a>
    </ul> -->
    <!-- <ul class="rightside"> -->
                <!-- <a  [routerLink]='' (click)="mstapplicantlanguagedetails_route(null, 'create')"> -->
                <!-- <button type="button" style="border-color: #fff !important;
                color: #fff;" class="btn btn-outline-primary common_add_btn ">Add</button> -->

                <button type="button" class="btn btn-outline-primary  popup-add-button"
                [routerLink]='' (click)="mstapplicantlanguagedetails_route(null, 'create')"
                 title = "Add Details">Add</button>
                <!-- </a> -->

                <!-- <a  class="" [routerLink]='' (click)="onClose()"><i class="fa fa-times-circle close_common_icon" title = "Close"></i></a> -->

                <a  class="" [routerLink]='' (click)="onClose()"><img src="assets/mainmenuicons/icons_close.png" style="width: 20px;" title = "Close"/></a>

                <!-- </ul> -->
</div>
</div>
  <table class="table" style="margin: 0;background-color: #148eeb;color: #fff;position: relative;">
  <thead>
    <tr>
      <th style="width: 13.6%;">Language</th>
      <th style="width: 10.6%;">Proficiency</th>
      <th style="width: 29.6%;">Rating</th>
      <th style="width: 31.5%;">Remarks</th>
      <!--<th>Attachment</th>-->
      <th style="text-align: -webkit-center;">Action</th>
    </tr>
  </thead>
</table>
  <ng2-smart-table #tbl_mstapplicantlanguagedetails
    (userRowSelect)="handle_mstapplicantlanguagedetails_GridSelected($event)"
    [settings]="mstapplicantlanguagedetails_settings"
    (custom)="onCustom_mstapplicantlanguagedetails_Action($event)"
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
        private mstapplicantlanguagedetail_service: mstapplicantlanguagedetailService,
        private sanitizer: DomSanitizer,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
        // private mstapplicantskilldetail_service: mstapplicantskilldetailService,
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
        this.Set_mstapplicantlanguagedetails_TableConfig();
        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();
    }
    mstapplicantlanguagedetailshtml() {
        let ret = "";
        ret += `
        <table class="table table-hover languagedetail_table" style="border: 1px solid #E6EAEE;margin: 0px !important;">
        <tbody>
          <tr>
            <th style="width: 5.9%;white-space: break-spaces;word-break: break-word !important;" class="col-2">##languagedesc##</th>
            <th style="width: 20%;">Read: ##readproficiency## <br/> Write: ##writeproficiency## <br/> Speak: ##speakproficiency##</th>
            <!--<th style="width: 20%;">Read: <br/> Write: ##overallrating## <br/> Speak:</th>-->
            <th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##remarks##</th>
            <!--<th style="white-space: break-spaces;word-break: break-word !important;" class="col-2">##attachment##</th>-->
          </tr>
        </tbody>
      </table>


        <!--<div class='card1'>
<h2>##languagedesc## - ##overallrating##</h2>
<h3 class='profile__section__item__sub'>Read ##readproficiency## Write ##writeproficiency## Speak: ##speakproficiency##</h3>
<h3 class='profile__section__item__sub'>##mobilenumber## - ##email## ##knownduration##</h3>
<p>##remarks##</p>
<p>##attachment##</p>
</div>-->
`;
        return ret;
    }
    FillData() {
        this.Set_mstapplicantlanguagedetails_TableConfig();
        this.mstapplicantlanguagedetail_service.get_mstapplicantlanguagedetails_ByApplicantID(this.applicantid).then(res => {
            this.mstapplicantlanguagedetails_LoadTable(res);
        });
    }
    //start of Grid Codes mstapplicantlanguagedetails
    mstapplicantlanguagedetails_settings: any;

    show_mstapplicantlanguagedetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantlanguagedetails.source.initGrid();
    }
    delete_mstapplicantlanguagedetails_All() {
        this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantlanguagedetails_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantlanguagedetails_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantlanguagedetails.source.settings != null) this.tbl_mstapplicantlanguagedetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantlanguagedetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantlanguagedetails.source.initGrid();
    }
    show_mstapplicantlanguagedetails_InActive() {
    }
    enable_mstapplicantlanguagedetails_InActive() {
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
                        cell = this.mstapplicantlanguagedetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));

                        let showstr = "";

                        let speakproficiency = "";
                        let readproficiency = "";
                        let writeproficiency = "";
                        let overallrating = "";
                        if (divrow.speakproficiency == 1) {
                            speakproficiency = '★';
                        } else if (divrow.speakproficiency == 2) {
                            speakproficiency = '★★';
                        } else if (divrow.speakproficiency == 3) {
                            speakproficiency = '★★★';
                        } else if (divrow.speakproficiency == 4) {
                            speakproficiency = '★★★★';
                        } else if (divrow.speakproficiency == 5) {
                            speakproficiency = '★★★★★';
                        }

                        if (divrow.readproficiency == 1) {
                            readproficiency = '★';
                        } else if (divrow.readproficiency == 2) {
                            readproficiency = '★★';
                        } else if (divrow.readproficiency == 3) {
                            readproficiency = '★★★';
                        } else if (divrow.readproficiency == 4) {
                            readproficiency = '★★★★';
                        } else if (divrow.readproficiency == 5) {
                            readproficiency = '★★★★★';
                        }


                        if (divrow.writeproficiency == 1) {
                            writeproficiency = '★';
                        } else if (divrow.writeproficiency == 2) {
                            writeproficiency = '★★';
                        } else if (divrow.writeproficiency == 3) {
                            writeproficiency = '★★★';
                        } else if (divrow.writeproficiency == 4) {
                            writeproficiency = '★★★★';
                        } else if (divrow.writeproficiency == 5) {
                            writeproficiency = '★★★★★';
                        }

                        if (divrow.overallrating == 1) {
                            overallrating = '★';
                        } else if (divrow.overallrating == 2) {
                            overallrating = '★★';
                        } else if (divrow.overallrating == 3) {
                            overallrating = '★★★';
                        } else if (divrow.overallrating == 4) {
                            overallrating = '★★★★';
                        } else if (divrow.overallrating == 5) {
                            overallrating = '★★★★★';
                        }


                        // if (divrow.speakproficiency == 1 || row.readproficiency == 1 || row.writeproficiency == 1 || row.overallrating == 1) {
                        //     showstr = '★';
                        // } else if (row.speakproficiency == 2 || row.readproficiency == 2 || row.writeproficiency == 2 || row.overallrating == 2) {
                        //     showstr = '★★';
                        // } else if (row.speakproficiency == 3 || row.readproficiency == 3 || row.writeproficiency == 3 || row.overallrating == 3) {
                        //     showstr = '★★★';
                        // } else if (row.speakproficiency == 4 || row.readproficiency == 4 || row.writeproficiency == 4 || row.overallrating == 4) {
                        //     showstr = '★★★★';
                        // } else if (row.speakproficiency == 5 || row.readproficiency == 5 || row.writeproficiency == 5 || row.overallrating == 5) {
                        //     showstr = '★★★★★';
                        // }
                        divrow["speakproficiency"] = "<div class='Stars'  style='font-size: large !important;color:green;float: left;margin-left: 6%;'>" + speakproficiency + "</div>";
                        divrow["readproficiency"] = "<div class='Stars' style='font-size: large !important;color:green;float: left;margin-left: 6%;'>" + readproficiency + "</div>";
                        divrow["writeproficiency"] = "<div class='Stars' style='font-size: large !important;color:green;float: left;margin-left: 6%;'>" + writeproficiency + "</div>";
                        divrow["overallrating"] = "<div class='Stars' style='font-size: large !important;color:green;float: left;margin-left: 6%;'>" + overallrating + "</div>";
                        // divrow["speakproficiency"] = "<div class='Stars' style='--rating:" + row['speakproficiency'] + "'></div>";
                        // divrow["readproficiency"] = "<div class='Stars' style='--rating:" + row['readproficiency'] + "'></div>";
                        // divrow["writeproficiency"] = "<div class='Stars' style='--rating:" + row['writeproficiency'] + "'></div>";
                        // divrow["overallrating"] = "<div class='Stars' style='--rating:" + row['overallrating'] + "'></div>";
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

    AddOrEdit_mstapplicantlanguagedetail(event: any, languageid: any, applicantid: any) {
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
        // if (childID != null)
        //     this.Deleted_mstapplicantlanguagedetail_IDs += childID + ",";
        // this.tbl_mstapplicantlanguagedetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    mstapplicantlanguagedetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantlanguagedetail(event, null, this.applicantid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantlanguagedetail(event, event.data.languageid, this.applicantid);
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




    }
    mstapplicantlanguagedetails_Paging(val) {
        //debugger;;
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
        // location.reload();
        this.dialogRef.close();
    }

}
