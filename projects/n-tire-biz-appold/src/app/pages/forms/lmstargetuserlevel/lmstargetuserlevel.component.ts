import { lmstargetuserlevel } from './../../../model/lmstargetuserlevel.model';
import { lmstargetuserlevelService } from './../../../service/lmstargetuserlevel.service';
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
import { bousermasterService } from './../../../service/bousermaster.service';
import { bomasterdataService } from './../../../service/bomasterdata.service';


@Component({
    selector: 'app-lmstargetuserlevel-List',
    templateUrl: './lmstargetuserlevel.component.html',
    styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmstargetuserlevelListComponent implements OnInit {
    @ViewChild('tbl_lmstargetuserlevels', { static: false }) tbl_lmstargetuserlevels: Ng2SmartTableComponent; bfilterPopulate_lmstargetuserlevels: boolean = false;
    showview: boolean = false;
    theme: string = "";
    SESSIONUSERID: any;
    sessionData: any;
    sourceKey: any;
    data: any;
    maindata: any;
    toolbarVisible: boolean = true;
    Deleted_lmstargetuserlevel_IDs: string = "";
    lmstargetuserlevels_ID: string = "";
    lmstargetuserlevels_selectedindex: any;
    lmstargetuserlevel_menuactions: any = []
    lmstargetuserlevels_settings: any;

    show_lmstargetuserlevels_Checkbox() {
        debugger;
        if (this.tbl_lmstargetuserlevels.source.settings['selectMode'] == 'multi') this.tbl_lmstargetuserlevels.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmstargetuserlevels.source.settings['selectMode'] = 'multi';
        this.tbl_lmstargetuserlevels.source.initGrid();
    }
    delete_lmstargetuserlevels_All() {
        this.tbl_lmstargetuserlevels.source.settings['selectMode'] = 'single';
    }
    show_lmstargetuserlevels_Filter() {
        setTimeout(() => {
            //  this.Set_lmstargetuserlevels_TableDropDownConfig();
        });
        if (this.tbl_lmstargetuserlevels.source.settings != null) this.tbl_lmstargetuserlevels.source.settings['hideSubHeader'] = !this.tbl_lmstargetuserlevels.source.settings['hideSubHeader'];
        this.tbl_lmstargetuserlevels.source.initGrid();
    }
    show_lmstargetuserlevels_InActive() {
    }
    enable_lmstargetuserlevels_InActive() {
    }
    async Set_lmstargetuserlevels_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmstargetuserlevels) {

            var clone = this.sharedService.clone(this.tbl_lmstargetuserlevels.source.settings);
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetuserlevels_branchid.value)), }, };
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetuserlevels_branchid.value)), }, };
            this.tbl_lmstargetuserlevels.source.settings = clone;
            this.tbl_lmstargetuserlevels.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstargetuserlevels.source.settings);
            if (clone.columns['userid'] != undefined) clone.columns['userid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetuserlevels_userid.value)), }, };
            if (clone.columns['userid'] != undefined) clone.columns['userid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetuserlevels_userid.value)), }, };
            this.tbl_lmstargetuserlevels.source.settings = clone;
            this.tbl_lmstargetuserlevels.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstargetuserlevels.source.settings);
            if (clone.columns['term'] != undefined) clone.columns['term'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetuserlevels_term.value)), }, };
            if (clone.columns['term'] != undefined) clone.columns['term'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetuserlevels_term.value)), }, };
            this.tbl_lmstargetuserlevels.source.settings = clone;
            this.tbl_lmstargetuserlevels.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstargetuserlevels.source.settings);
            if (clone.columns['productgroupid'] != undefined) clone.columns['productgroupid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetuserlevels_productgroupid.value)), }, };
            if (clone.columns['productgroupid'] != undefined) clone.columns['productgroupid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetuserlevels_productgroupid.value)), }, };
            this.tbl_lmstargetuserlevels.source.settings = clone;
            this.tbl_lmstargetuserlevels.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstargetuserlevels.source.settings);
            if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetuserlevels_performancestatus.value)), }, };
            if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstargetuserlevels_performancestatus.value)), }, };
            this.tbl_lmstargetuserlevels.source.settings = clone;
            this.tbl_lmstargetuserlevels.source.initGrid();
        }
        this.bfilterPopulate_lmstargetuserlevels = true;
    }
    async lmstargetuserlevels_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmstargetuserlevels_TableConfig() {
        this.lmstargetuserlevels_settings = {
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
                custom: this.lmstargetuserlevel_menuactions
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
                        var element = (this.tbl_lmstargetuserlevels.source.settings as any).columns['branchid'].editor.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                userid: {
                    title: 'User',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'custom', component: SmartTablepopupselectComponent, config: { selectText: 'Select...', menuid: 'e99kq', reportcode: 'e99kq', id: "value", desc: "title", list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = (this.tbl_lmstargetuserlevels.source.settings as any).columns['userid'].editor.find(c => c.value == cell);
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
                        var element = (this.tbl_lmstargetuserlevels.source.settings as any).columns['term'].editor.find(c => c.value == cell);
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
                        var element = (this.tbl_lmstargetuserlevels.source.settings as any).columns['productgroupid'].editor.find(c => c.value == cell);
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
                        var element = (this.tbl_lmstargetuserlevels.source.settings as any).columns['performancestatus'].editor.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
            },
        };
    }
    lmstargetuserlevels_LoadTable(list = new LocalDataSource()) {
        this.lmstargetuserlevel_service.get_lmstargetuserlevels_List().then((data) => {
            this.lmstargetuserlevel_service.list = data as lmstargetuserlevel[];
            this.tbl_lmstargetuserlevels.source = new LocalDataSource();
            this.tbl_lmstargetuserlevels.source.load(list as any as LocalDataSource);
            this.tbl_lmstargetuserlevels.source.setPaging(1, 20, true);
        });
    }
    lmstargetuserlevels_route(event: any, action: any) {
        switch (action) {
            case 'create':
                if (this.lmstargetuserlevel_service.list.length == 0) {
                    this.tbl_lmstargetuserlevels.source.grid.createFormShown = true;
                }
                else {
                    let obj = new lmstargetuserlevel();
                    this.lmstargetuserlevel_service.list.push(obj);
                    this.tbl_lmstargetuserlevels.source.refresh();
                    if ((this.lmstargetuserlevel_service.list.length / this.tbl_lmstargetuserlevels.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmstargetuserlevels.source.getPaging().page) {
                        this.tbl_lmstargetuserlevels.source.setPage((this.lmstargetuserlevel_service.list.length / this.tbl_lmstargetuserlevels.source.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tbl_lmstargetuserlevels.source.grid.edit(this.tbl_lmstargetuserlevels.source.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    let index = this.tbl_lmstargetuserlevels.source.data.indexOf(event.data);
                    this.onDelete_lmstargetuserlevel(event, event.data.targetid, ((this.tbl_lmstargetuserlevels.source.getPaging().page - 1) * this.tbl_lmstargetuserlevels.source.getPaging().perPage) + index);
                    this.tbl_lmstargetuserlevels.source.refresh();
                }
                break;
        }
    }
    async onCustom_lmstargetuserlevels_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmstargetuserlevels");
        let formname = (objbomenuaction as any).actionname;




    }
    lmstargetuserlevels_Paging(val) {
        debugger;
        this.tbl_lmstargetuserlevels.source.setPaging(1, val, true);
    }
    onDelete_lmstargetuserlevel(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmstargetuserlevel_IDs += childID + ",";
        this.lmstargetuserlevel_service.list.splice(i, 1);
    }
    constructor(
        private nav: Location,
        private router: Router, private spinner: NgxSpinnerService,
        private currentRoute: ActivatedRoute,
        private lmstargetuserlevel_service: lmstargetuserlevelService,
        private toastr: ToastService,
        private configservice: boconfigvalueService,
        private bobranchmaster_service: bobranchmasterService,
        private bousermaster_service: bousermasterService,
        private bomasterdata_service: bomasterdataService,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sharedService: SharedService,
        private sessionService: SessionService,
        public dialogRef: DynamicDialogRef) {
    }

    onSubmit() {
        this.lmstargetuserlevel_service.Deleted_lmstargetuserlevel_IDs = this.Deleted_lmstargetuserlevel_IDs;
        this.spinner.show();
        this.lmstargetuserlevel_service.saveOrUpdate_lmstargetuserlevels_List().subscribe(
            async res => {
                debugger;
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.showview = true;
                /*if(bclear){
                this.lmstargetuserlevel_service.clearList();
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
        this.Set_lmstargetuserlevels_TableConfig();
        this.lmstargetuserlevels_LoadTable(res.lmstargetuserlevels);
    }

    populateForm(pd: lmstargetuserlevel) {
        if (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2) {
            this.dialogRef.close(pd);
        }
        else {
            this.formData = Object.assign({}, pd);
        }
        // 

    }


}

