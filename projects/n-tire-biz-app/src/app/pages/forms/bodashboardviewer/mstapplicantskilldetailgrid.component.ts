import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { ActivatedRoute } from '@angular/router';
import { DomSanitizer } from "@angular/platform-browser";
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { mstapplicantskilldetailComponent } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.component';
import { mstapplicantskilldetailService } from './../../../service/mstapplicantskilldetail.service';
import { mstapplicantreferencerequestComponent } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';


@Component({
    selector: 'app-applicantskilldetailgrid',
    template: `
    <h4 class="form-group sticky1  columns left">{{'Skill Details'}}

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
    <a [routerLink]='' (click)="mstapplicantskilldetails_route(null, 'create')"><i
        class="fa fa-plus"></i></a><a class="" [routerLink]='' (click)="onClose()"><i class="fa fa-close"></i></a>
    </ul>
  </h4>
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
    (editConfirm)="mstapplicantskilldetails_beforesave($event)">
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
    ShowTableslist:any;
    pkcol:any;

    IsApplicant: boolean;
    IsAdmin: boolean;
    bSingleRecord: boolean;

    applicantid:any;
    data:any;
    formid: any;
    Segmentcategory_list: DropDownValues[];
    skillcategory_List: any[];
    constructor(
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService,
        private mstapplicantskilldetail_service: mstapplicantskilldetailService,
        ) {
            this.data = dynamicconfig;
            if (this.data != null && this.data.data != null) {
                this.data = this.data.data;
            }
            this.pkcol=this.data.maindatapkcol;
            this.applicantid=this.data.applicantid
    }

    ngOnInit() {
        this.Set_mstapplicantskilldetails_TableConfig();
        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
        this.FillData();
    }

    mstapplicantskilldetailshtml() {
        let ret = "";
        ret += `<div class='card1'>
<h2>##skillcategorydesc## ##subcategoryiddesc##</h2>
<h3 class='profile__section__item__sub'>##selfrating##</h3>
<p>##remarks##</p>
</div>
`;
        return ret;
    }

    FillData()
    {
        this.Set_mstapplicantskilldetails_TableConfig();
        this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByApplicantID(this.applicantid).then(res => {
        this.mstapplicantskilldetails_LoadTable(res);
        });
    }

    AddOrEdit_mstapplicantskilldetail(event: any, skillid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
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
        if (childID != null)
            this.Deleted_mstapplicantskilldetail_IDs += childID + ",";
        this.tbl_mstapplicantskilldetails.source.splice(i, 1);
    }

        mstapplicantskilldetails_settings: any;

        show_mstapplicantskilldetails_Checkbox() {
            if (this.tbl_mstapplicantskilldetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'single';
            else
                this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'multi';
            this.tbl_mstapplicantskilldetails.source.initGrid();
        }
        delete_mstapplicantskilldetails_All() {
            this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'single';
        }
        show_mstapplicantskilldetails_Filter() {
            if (this.tbl_mstapplicantskilldetails.source.settings != null) this.tbl_mstapplicantskilldetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantskilldetails.source.settings['hideSubHeader'];
            this.tbl_mstapplicantskilldetails.source.initGrid();
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
                            cell = this.mstapplicantskilldetailshtml();
                            var divrow = JSON.parse(JSON.stringify(row));
                            divrow["selfrating"] = "<div class='Stars' style='--rating:" + row['selfrating'] + "'></div>";
                            return this.sharedService.HtmlValue(divrow, cell);
                        },
                    },
                },
            };
        }
        mstapplicantskilldetails_LoadTable(mstapplicantskilldetails = new LocalDataSource()) {
            if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantskilldetails_ID) >= 0) {
                if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source = new LocalDataSource();
                if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source.load(mstapplicantskilldetails as any as LocalDataSource);
                if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source.setPaging(1, 20, true);
            }
        }

        mstapplicantskilldetails_route(event: any, action: any) {
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
            }
        }
        mstapplicantskilldetails_onDelete(obj) {
            let skillid = obj.data.skillid;
            if (confirm('Are you sure to delete this record ?')) {
                this.mstapplicantskilldetail_service.delete_mstapplicantskilldetail(skillid).then(res =>
                    this.mstapplicantskilldetails_LoadTable()
                );
            }
        }
        async onCustom_mstapplicantskilldetails_Action(event: any) {
            let referencesourcedetails = 'Sub Category: ' + event.data.subcategoryiddesc + '<BR>' + 'Skill Category: ' + event.data.skillcategorydesc + '<BR>' + 'Self Rating: ' + event.data.selfrating + '<BR>' + 'Remarks: ' + event.data.remarks;
            let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantskilldetails");
            let formname = (objbomenuaction as any).actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(mstapplicantreferencerequestComponent,
                    {
                        data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 2, save: true }
                    }
                ).onClose.subscribe(res => {
                });
            }
        }
        mstapplicantskilldetails_Paging(val) {
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
        onClose() {
            this.dialogRef.close();
          }

}
