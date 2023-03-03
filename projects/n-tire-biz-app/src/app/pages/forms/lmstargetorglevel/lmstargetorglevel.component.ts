import { lmstargetorglevel } from './../../../model/lmstargetorglevel.model';
import { lmstargetorglevelService } from './../../../service/lmstargetorglevel.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { boconfigvalueService } from '../../../../../../n-tire-biz-app/src/app/service/boconfigvalue.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { bomasterdataService } from './../../../service/bomasterdata.service';


@Component({
    selector: 'app-lmstargetorglevel-List',
    templateUrl: './lmstargetorglevel.component.html',
    styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmstargetorglevelListComponent implements OnInit {
    @ViewChild('tbl_lmstargetorglevels', { static: false }) tbl_lmstargetorglevels: Ng2SmartTableComponent; bfilterPopulate_lmstargetorglevels: boolean = false;
    showview: boolean = false;
    theme: string = "";
    SESSIONUSERID: any;
    sessionData: any;
    sourceKey: any;
    data: any;
    maindata: any;
    toolbarVisible: boolean = true;
    Deleted_lmstargetorglevel_IDs: string = "";
    lmstargetorglevels_ID: string = "";
    lmstargetorglevels_selectedindex: any;
    lmstargetorglevel_menuactions: any = []
    lmstargetorglevels_settings: any;

    show_lmstargetorglevels_Checkbox() {
        if (this.tbl_lmstargetorglevels.source.settings['selectMode'] == 'multi') this.tbl_lmstargetorglevels.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmstargetorglevels.source.settings['selectMode'] = 'multi';
        this.tbl_lmstargetorglevels.source.initGrid();
    }
    delete_lmstargetorglevels_All() {
        this.tbl_lmstargetorglevels.source.settings['selectMode'] = 'single';
    }
    show_lmstargetorglevels_Filter() {
        if (this.tbl_lmstargetorglevels.source.settings != null) this.tbl_lmstargetorglevels.source.settings['hideSubHeader'] = !this.tbl_lmstargetorglevels.source.settings['hideSubHeader'];
        this.tbl_lmstargetorglevels.source.initGrid();
    }
    async Set_lmstargetorglevels_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmstargetorglevels) {

            var clone = this.sharedService.clone(this.tbl_lmstargetorglevels.source.settings);
            if (clone.columns['term'] != undefined) clone.columns['term'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetorglevels_term.value)), }, };
            if (clone.columns['term'] != undefined) clone.columns['term'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetorglevels_term.value)), }, };
            this.tbl_lmstargetorglevels.source.settings = clone;
            this.tbl_lmstargetorglevels.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstargetorglevels.source.settings);
            if (clone.columns['productgroupid'] != undefined) clone.columns['productgroupid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetorglevels_productgroupid.value)), }, };
            if (clone.columns['productgroupid'] != undefined) clone.columns['productgroupid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetorglevels_productgroupid.value)), }, };
            this.tbl_lmstargetorglevels.source.settings = clone;
            this.tbl_lmstargetorglevels.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstargetorglevels.source.settings);
            if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetorglevels_performancestatus.value)), }, };
            if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetorglevels_performancestatus.value)), }, };
            this.tbl_lmstargetorglevels.source.settings = clone;
            this.tbl_lmstargetorglevels.source.initGrid();
        }
        this.bfilterPopulate_lmstargetorglevels = true;
    }
    async lmstargetorglevels_beforesave(event: any) {
        event.confirm.resolve(event.newData);
    }
    Set_lmstargetorglevels_TableConfig() {
        this.lmstargetorglevels_settings = {
            hideSubHeader: true,
            mode: 'inline',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: !this.showview, // true,
                delete: !this.showview,
                position: 'left',
                custom: this.lmstargetorglevel_menuactions
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
                term: {
                    title: 'Term',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = (this.tbl_lmstargetorglevels.source.settings as any).columns['term'].editor.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                productgroupid: {
                    title: 'Product Group',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = (this.tbl_lmstargetorglevels.source.settings as any).columns['productgroupid'].editor.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                committedsalesnumbers: {
                    title: 'Committed Sales Numbers',
                    type: 'number',
                    filter: true,
                },
                committedsalesvalue: {
                    title: 'Committed Sales Value',
                    type: '',
                    filter: true,
                },
                likelysalesnumbers: {
                    title: 'Likely Sales Numbers',
                    type: 'number',
                    filter: true,
                },
                likelysalesvalue: {
                    title: 'Likely Sales Value',
                    type: '',
                    filter: true,
                },
                bestcasesalesnumbers: {
                    title: 'Best Case Sales Numbers',
                    type: 'number',
                    filter: true,
                },
                bestcasesalesvalue: {
                    title: 'Best Case Sales Value',
                    type: '',
                    filter: true,
                },
                actualsalesnumbers: {
                    title: 'Actual Sales Numbers',
                    type: 'number',
                    filter: true,
                },
                actualsalesvalue: {
                    title: 'Actual Sales Value',
                    type: '',
                    filter: true,
                },
                performancestatus: {
                    title: 'Performance Status',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = (this.tbl_lmstargetorglevels.source.settings as any).columns['performancestatus'].editor.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
            },
        };
    }
    lmstargetorglevels_LoadTable(list = new LocalDataSource()) {
        this.lmstargetorglevel_service.get_lmstargetorglevels_List().then((data) => {
            this.lmstargetorglevel_service.list = data as lmstargetorglevel[];
            this.tbl_lmstargetorglevels.source = new LocalDataSource();
            this.tbl_lmstargetorglevels.source.load(list as any as LocalDataSource);
            this.tbl_lmstargetorglevels.source.setPaging(1, 20, true);
        });
    }
    lmstargetorglevels_route(event: any, action: any) {
        switch (action) {
            case 'create':
                if (this.lmstargetorglevel_service.list.length == 0) {
                    this.tbl_lmstargetorglevels.source.grid.createFormShown = true;
                }
                else {
                    let obj = new lmstargetorglevel();
                    this.lmstargetorglevel_service.list.push(obj);
                    this.tbl_lmstargetorglevels.source.refresh();
                    if ((this.lmstargetorglevel_service.list.length / this.tbl_lmstargetorglevels.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmstargetorglevels.source.getPaging().page) {
                        this.tbl_lmstargetorglevels.source.setPage((this.lmstargetorglevel_service.list.length / this.tbl_lmstargetorglevels.source.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tbl_lmstargetorglevels.source.grid.edit(this.tbl_lmstargetorglevels.source.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    let index = this.tbl_lmstargetorglevels.source.data.indexOf(event.data);
                    this.onDelete_lmstargetorglevel(event, event.data.targetid, ((this.tbl_lmstargetorglevels.source.getPaging().page - 1) * this.tbl_lmstargetorglevels.source.getPaging().perPage) + index);
                    this.tbl_lmstargetorglevels.source.refresh();
                }
                break;
        }
    }
    async onCustom_lmstargetorglevels_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmstargetorglevels");
        let formname = (objbomenuaction as any).actionname;
    }
    lmstargetorglevels_Paging(val) {
        this.tbl_lmstargetorglevels.source.setPaging(1, val, true);
    }
    onDelete_lmstargetorglevel(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmstargetorglevel_IDs += childID + ",";
        this.lmstargetorglevel_service.list.splice(i, 1);
    }
    constructor( private spinner: NgxSpinnerService,
        private currentRoute: ActivatedRoute,
        private lmstargetorglevel_service: lmstargetorglevelService,
        private toastr: ToastService,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sharedService: SharedService,
        private sessionService: SessionService,
        public dialogRef: DynamicDialogRef) {
    }

    onSubmit() {
        this.lmstargetorglevel_service.Deleted_lmstargetorglevel_IDs = this.Deleted_lmstargetorglevel_IDs;
        this.spinner.show();
        this.lmstargetorglevel_service.saveOrUpdate_lmstargetorglevels_List().subscribe(
            async res => {
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.showview = true;
            },
            err => {
                this.sharedService.alert(err.error);
                this.spinner.hide(); console.log(err);
            }
        )
    } async ngOnInit() {
        this.sessionData = this.sessionService.getSession();
        if (this.sessionData != null) {
            this.SESSIONUSERID = this.sessionData.userid;
        }
        if (this.data != null && this.data.showview != undefined && this.data.showview != null) this.showview = this.data.showview;
        if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
        if (this.currentRoute.snapshot.paramMap.get('sourceKey') != null) {
            this.sourceKey = this.currentRoute.snapshot.paramMap.get('sourceKey');
        }
        if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
            this.showview = true;
        }
        this.theme = this.sessionService.getItem('selected-theme');
        this.Set_lmstargetorglevels_TableConfig();
        this.lmstargetorglevels_LoadTable(res.lmstargetorglevels);
    }

    populateForm(pd: lmstargetorglevel) {
        if (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2) {
            this.dialogRef.close(pd);
        }
        else {
            this.formData = Object.assign({}, pd);
        }

    }


}

