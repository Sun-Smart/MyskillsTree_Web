import { lmsscoringfixedfieldsnegative } from './../../../model/lmsscoringfixedfieldsnegative.model';
import { lmsscoringfixedfieldsnegativeService } from './../../../service/lmsscoringfixedfieldsnegative.service';
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


@Component({
    selector: 'app-lmsscoringfixedfieldsnegative-List',
    templateUrl: './lmsscoringfixedfieldsnegative.component.html',
    styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmsscoringfixedfieldsnegativeListComponent implements OnInit {
    @ViewChild('tbl_lmsscoringfixedfieldsnegatives', { static: false }) tbl_lmsscoringfixedfieldsnegatives: Ng2SmartTableComponent; bfilterPopulate_lmsscoringfixedfieldsnegatives: boolean = false;
    showview: boolean = false;
    theme: string = "";
    SESSIONUSERID: any;
    sessionData: any;
    sourceKey: any;
    data: any;
    maindata: any;
    toolbarVisible: boolean = true;
    Deleted_lmsscoringfixedfieldsnegative_IDs: string = "";
    lmsscoringfixedfieldsnegatives_ID: string = "";
    lmsscoringfixedfieldsnegatives_selectedindex: any;
    lmsscoringfixedfieldsnegative_menuactions: any = []
    lmsscoringfixedfieldsnegatives_settings: any;

    show_lmsscoringfixedfieldsnegatives_Checkbox() {
        if (this.tbl_lmsscoringfixedfieldsnegatives.source.settings['selectMode'] == 'multi') this.tbl_lmsscoringfixedfieldsnegatives.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsscoringfixedfieldsnegatives.source.settings['selectMode'] = 'multi';
        this.tbl_lmsscoringfixedfieldsnegatives.source.initGrid();
    }
    delete_lmsscoringfixedfieldsnegatives_All() {
        this.tbl_lmsscoringfixedfieldsnegatives.source.settings['selectMode'] = 'single';
    }
    show_lmsscoringfixedfieldsnegatives_Filter() {
        if (this.tbl_lmsscoringfixedfieldsnegatives.source.settings != null) this.tbl_lmsscoringfixedfieldsnegatives.source.settings['hideSubHeader'] = !this.tbl_lmsscoringfixedfieldsnegatives.source.settings['hideSubHeader'];
        this.tbl_lmsscoringfixedfieldsnegatives.source.initGrid();
    }
    async Set_lmsscoringfixedfieldsnegatives_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmsscoringfixedfieldsnegatives) {
        }
        this.bfilterPopulate_lmsscoringfixedfieldsnegatives = true;
    }
    async lmsscoringfixedfieldsnegatives_beforesave(event: any) {
        event.confirm.resolve(event.newData);
    }
    Set_lmsscoringfixedfieldsnegatives_TableConfig() {
        this.lmsscoringfixedfieldsnegatives_settings = {
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
                custom: this.lmsscoringfixedfieldsnegative_menuactions
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
                productgroupid: {
                    title: 'Product Group',
                    type: 'number',
                    filter: true,
                },
                field: {
                    title: 'Field',
                    type: '',
                    filter: true,
                },
                fromvalue: {
                    title: 'From Value',
                    type: '',
                    filter: true,
                },
                tovalue: {
                    title: 'To Value',
                    type: '',
                    filter: true,
                },
                negativepoints: {
                    title: 'Negative Points',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    lmsscoringfixedfieldsnegatives_LoadTable(list = new LocalDataSource()) {
        this.lmsscoringfixedfieldsnegative_service.get_lmsscoringfixedfieldsnegatives_List().then((data) => {
            this.lmsscoringfixedfieldsnegative_service.list = data as lmsscoringfixedfieldsnegative[];
            this.tbl_lmsscoringfixedfieldsnegatives.source = new LocalDataSource();
            this.tbl_lmsscoringfixedfieldsnegatives.source.load(list as any as LocalDataSource);
            this.tbl_lmsscoringfixedfieldsnegatives.source.setPaging(1, 20, true);
        });
    }
    lmsscoringfixedfieldsnegatives_route(event: any, action: any) {
        switch (action) {
            case 'create':
                if (this.lmsscoringfixedfieldsnegative_service.list.length == 0) {
                    this.tbl_lmsscoringfixedfieldsnegatives.source.grid.createFormShown = true;
                }
                else {
                    let obj = new lmsscoringfixedfieldsnegative();
                    this.lmsscoringfixedfieldsnegative_service.list.push(obj);
                    this.tbl_lmsscoringfixedfieldsnegatives.source.refresh();
                    if ((this.lmsscoringfixedfieldsnegative_service.list.length / this.tbl_lmsscoringfixedfieldsnegatives.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsscoringfixedfieldsnegatives.source.getPaging().page) {
                        this.tbl_lmsscoringfixedfieldsnegatives.source.setPage((this.lmsscoringfixedfieldsnegative_service.list.length / this.tbl_lmsscoringfixedfieldsnegatives.source.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tbl_lmsscoringfixedfieldsnegatives.source.grid.edit(this.tbl_lmsscoringfixedfieldsnegatives.source.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    let index = this.tbl_lmsscoringfixedfieldsnegatives.source.data.indexOf(event.data);
                    this.onDelete_lmsscoringfixedfieldsnegative(event, event.data.lsfnid, ((this.tbl_lmsscoringfixedfieldsnegatives.source.getPaging().page - 1) * this.tbl_lmsscoringfixedfieldsnegatives.source.getPaging().perPage) + index);
                    this.tbl_lmsscoringfixedfieldsnegatives.source.refresh();
                }
                break;
        }
    }
    async onCustom_lmsscoringfixedfieldsnegatives_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsscoringfixedfieldsnegatives");
        let formname = (objbomenuaction as any).actionname;
    }
    lmsscoringfixedfieldsnegatives_Paging(val) {
        this.tbl_lmsscoringfixedfieldsnegatives.source.setPaging(1, val, true);
    }
    onDelete_lmsscoringfixedfieldsnegative(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmsscoringfixedfieldsnegative_IDs += childID + ",";
        this.lmsscoringfixedfieldsnegative_service.list.splice(i, 1);
    }
    constructor( private spinner: NgxSpinnerService,
        private currentRoute: ActivatedRoute,
        private lmsscoringfixedfieldsnegative_service: lmsscoringfixedfieldsnegativeService,
        private toastr: ToastService,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sharedService: SharedService,
        private sessionService: SessionService,
        public dialogRef: DynamicDialogRef) {
    }

    onSubmit() {
        this.lmsscoringfixedfieldsnegative_service.Deleted_lmsscoringfixedfieldsnegative_IDs = this.Deleted_lmsscoringfixedfieldsnegative_IDs;
        this.spinner.show();
        this.lmsscoringfixedfieldsnegative_service.saveOrUpdate_lmsscoringfixedfieldsnegatives_List().subscribe(
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
        this.Set_lmsscoringfixedfieldsnegatives_TableConfig();
        this.lmsscoringfixedfieldsnegatives_LoadTable(res.lmsscoringfixedfieldsnegatives);
    }

    populateForm(pd: lmsscoringfixedfieldsnegative) {
        if (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2) {
            this.dialogRef.close(pd);
        }
        else {
            this.formData = Object.assign({}, pd);
        }

    }


}

