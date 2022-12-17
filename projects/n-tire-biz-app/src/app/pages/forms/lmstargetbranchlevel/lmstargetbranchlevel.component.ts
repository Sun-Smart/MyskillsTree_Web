import { lmstargetbranchlevel } from './../../../model/lmstargetbranchlevel.model';
import { lmstargetbranchlevelService } from './../../../service/lmstargetbranchlevel.service';
import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-filerender.component';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { boconfigvalueService } from '../../../../../../n-tire-biz-app/src/app/service/boconfigvalue.service';
import { LocalDataSource } from 'ng2-smart-table';
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { bobranchmasterService } from './../../../service/bobranchmaster.service';
import { bomasterdataService } from './../../../service/bomasterdata.service';


@Component({
    selector: 'app-lmstargetbranchlevel-List',
    templateUrl: './lmstargetbranchlevel.component.html',
    styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmstargetbranchlevelListComponent implements OnInit {
    @ViewChild('tbl_lmstargetbranchlevels', { static: false }) tbl_lmstargetbranchlevels: Ng2SmartTableComponent; bfilterPopulate_lmstargetbranchlevels: boolean = false;
    showview: boolean = false;
    theme: string = "";
    SESSIONUSERID: any;
    sessionData: any;
    sourceKey: any;
    data: any;
    maindata: any;
    toolbarVisible: boolean = true;
    Deleted_lmstargetbranchlevel_IDs: string = "";
    lmstargetbranchlevels_ID: string = "";
    lmstargetbranchlevels_selectedindex: any;
    lmstargetbranchlevel_menuactions: any = []
    lmstargetbranchlevels_settings: any;

    show_lmstargetbranchlevels_Checkbox() {
        debugger;
        if (this.tbl_lmstargetbranchlevels.source.settings['selectMode'] == 'multi') this.tbl_lmstargetbranchlevels.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmstargetbranchlevels.source.settings['selectMode'] = 'multi';
        this.tbl_lmstargetbranchlevels.source.initGrid();
    }
    delete_lmstargetbranchlevels_All() {
        this.tbl_lmstargetbranchlevels.source.settings['selectMode'] = 'single';
    }
    show_lmstargetbranchlevels_Filter() {
        setTimeout(() => {
            //  this.Set_lmstargetbranchlevels_TableDropDownConfig();
        });
        if (this.tbl_lmstargetbranchlevels.source.settings != null) this.tbl_lmstargetbranchlevels.source.settings['hideSubHeader'] = !this.tbl_lmstargetbranchlevels.source.settings['hideSubHeader'];
        this.tbl_lmstargetbranchlevels.source.initGrid();
    }
    show_lmstargetbranchlevels_InActive() {
    }
    enable_lmstargetbranchlevels_InActive() {
    }
    async Set_lmstargetbranchlevels_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmstargetbranchlevels) {

            var clone = this.sharedService.clone(this.tbl_lmstargetbranchlevels.source.settings);
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetbranchlevels_branchid.value)), }, };
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetbranchlevels_branchid.value)), }, };
            this.tbl_lmstargetbranchlevels.source.settings = clone;
            this.tbl_lmstargetbranchlevels.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstargetbranchlevels.source.settings);
            if (clone.columns['term'] != undefined) clone.columns['term'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetbranchlevels_term.value)), }, };
            if (clone.columns['term'] != undefined) clone.columns['term'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetbranchlevels_term.value)), }, };
            this.tbl_lmstargetbranchlevels.source.settings = clone;
            this.tbl_lmstargetbranchlevels.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstargetbranchlevels.source.settings);
            if (clone.columns['productgroupid'] != undefined) clone.columns['productgroupid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetbranchlevels_productgroupid.value)), }, };
            if (clone.columns['productgroupid'] != undefined) clone.columns['productgroupid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetbranchlevels_productgroupid.value)), }, };
            this.tbl_lmstargetbranchlevels.source.settings = clone;
            this.tbl_lmstargetbranchlevels.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstargetbranchlevels.source.settings);
            if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetbranchlevels_performancestatus.value)), }, };
            if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetbranchlevels_performancestatus.value)), }, };
            this.tbl_lmstargetbranchlevels.source.settings = clone;
            this.tbl_lmstargetbranchlevels.source.initGrid();
        }
        this.bfilterPopulate_lmstargetbranchlevels = true;
    }
    async lmstargetbranchlevels_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmstargetbranchlevels_TableConfig() {
        this.lmstargetbranchlevels_settings = {
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
                custom: this.lmstargetbranchlevel_menuactions
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
                branchid: {
                    title: 'Branch',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid: 'bxg94', reportcode: 'bxg94', id: "value", desc: "title", list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = (this.tbl_lmstargetbranchlevels.source.settings as any).columns['branchid'].editor.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                term: {
                    title: 'Term',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = (this.tbl_lmstargetbranchlevels.source.settings as any).columns['term'].editor.find(c => c.value == cell);
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
                        var element = (this.tbl_lmstargetbranchlevels.source.settings as any).columns['productgroupid'].editor.find(c => c.value == cell);
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
                        var element = (this.tbl_lmstargetbranchlevels.source.settings as any).columns['performancestatus'].editor.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
            },
        };
    }
    lmstargetbranchlevels_LoadTable(list = new LocalDataSource()) {
        this.lmstargetbranchlevel_service.get_lmstargetbranchlevels_List().then((data) => {
            this.lmstargetbranchlevel_service.list = data as lmstargetbranchlevel[];
            this.tbl_lmstargetbranchlevels.source = new LocalDataSource();
            this.tbl_lmstargetbranchlevels.source.load(list as any as LocalDataSource);
            this.tbl_lmstargetbranchlevels.source.setPaging(1, 20, true);
        });
    }
    lmstargetbranchlevels_route(event: any, action: any) {
        switch (action) {
            case 'create':
                if (this.lmstargetbranchlevel_service.list.length == 0) {
                    this.tbl_lmstargetbranchlevels.source.grid.createFormShown = true;
                }
                else {
                    let obj = new lmstargetbranchlevel();
                    this.lmstargetbranchlevel_service.list.push(obj);
                    this.tbl_lmstargetbranchlevels.source.refresh();
                    if ((this.lmstargetbranchlevel_service.list.length / this.tbl_lmstargetbranchlevels.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmstargetbranchlevels.source.getPaging().page) {
                        this.tbl_lmstargetbranchlevels.source.setPage((this.lmstargetbranchlevel_service.list.length / this.tbl_lmstargetbranchlevels.source.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tbl_lmstargetbranchlevels.source.grid.edit(this.tbl_lmstargetbranchlevels.source.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    let index = this.tbl_lmstargetbranchlevels.source.data.indexOf(event.data);
                    this.onDelete_lmstargetbranchlevel(event, event.data.targetid, ((this.tbl_lmstargetbranchlevels.source.getPaging().page - 1) * this.tbl_lmstargetbranchlevels.source.getPaging().perPage) + index);
                    this.tbl_lmstargetbranchlevels.source.refresh();
                }
                break;
        }
    }
    async onCustom_lmstargetbranchlevels_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmstargetbranchlevels");
        let formname = (objbomenuaction as any).actionname;




    }
    lmstargetbranchlevels_Paging(val) {
        debugger;
        this.tbl_lmstargetbranchlevels.source.setPaging(1, val, true);
    }
    onDelete_lmstargetbranchlevel(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmstargetbranchlevel_IDs += childID + ",";
        this.lmstargetbranchlevel_service.list.splice(i, 1);
    }
    constructor(
        private nav: Location,
        private router: Router, private spinner: NgxSpinnerService,
        private currentRoute: ActivatedRoute,
        private lmstargetbranchlevel_service: lmstargetbranchlevelService,
        private toastr: ToastService,
        private configservice: boconfigvalueService,
        private bobranchmaster_service: bobranchmasterService,
        private bomasterdata_service: bomasterdataService,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sharedService: SharedService,
        private sessionService: SessionService,
        public dialogRef: DynamicDialogRef) {
    }

    onSubmit() {
        this.lmstargetbranchlevel_service.Deleted_lmstargetbranchlevel_IDs = this.Deleted_lmstargetbranchlevel_IDs;
        this.spinner.show();
        this.lmstargetbranchlevel_service.saveOrUpdate_lmstargetbranchlevels_List().subscribe(
            async res => {
                debugger;
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.showview = true;
                /*if(bclear){
                this.lmstargetbranchlevel_service.clearList();
                this.resetForm();
                }*/
            },
            err => {
                debugger;
                //this.toastr.addSingle("error","",err.error);
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
        this.Set_lmstargetbranchlevels_TableConfig();
        this.lmstargetbranchlevels_LoadTable(res.lmstargetbranchlevels);
    }

    populateForm(pd: lmstargetbranchlevel) {
        if (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2) {
            this.dialogRef.close(pd);
        }
        else {
            this.formData = Object.assign({}, pd);
        }
        // 

    }


}

