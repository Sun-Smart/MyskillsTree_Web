import { lmsscoringfixedfieldspositive } from './../../../model/lmsscoringfixedfieldspositive.model';
import { lmsscoringfixedfieldspositiveService } from './../../../service/lmsscoringfixedfieldspositive.service';
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
    selector: 'app-lmsscoringfixedfieldspositive-List',
    templateUrl: './lmsscoringfixedfieldspositive.component.html',
    styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmsscoringfixedfieldspositiveListComponent implements OnInit {
    @ViewChild('tbl_lmsscoringfixedfieldspositives', { static: false }) tbl_lmsscoringfixedfieldspositives: Ng2SmartTableComponent; bfilterPopulate_lmsscoringfixedfieldspositives: boolean = false;
    showview: boolean = false;
    theme: string = "";
    SESSIONUSERID: any;
    sessionData: any;
    sourceKey: any;
    data: any;
    maindata: any;
    toolbarVisible: boolean = true;
    Deleted_lmsscoringfixedfieldspositive_IDs: string = "";
    lmsscoringfixedfieldspositives_ID: string = "";
    lmsscoringfixedfieldspositives_selectedindex: any;
    lmsscoringfixedfieldspositive_menuactions: any = []
    lmsscoringfixedfieldspositives_settings: any;

    show_lmsscoringfixedfieldspositives_Checkbox() {
        if (this.tbl_lmsscoringfixedfieldspositives.source.settings['selectMode'] == 'multi') this.tbl_lmsscoringfixedfieldspositives.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsscoringfixedfieldspositives.source.settings['selectMode'] = 'multi';
        this.tbl_lmsscoringfixedfieldspositives.source.initGrid();
    }
    delete_lmsscoringfixedfieldspositives_All() {
        this.tbl_lmsscoringfixedfieldspositives.source.settings['selectMode'] = 'single';
    }
    show_lmsscoringfixedfieldspositives_Filter() {
        if (this.tbl_lmsscoringfixedfieldspositives.source.settings != null) this.tbl_lmsscoringfixedfieldspositives.source.settings['hideSubHeader'] = !this.tbl_lmsscoringfixedfieldspositives.source.settings['hideSubHeader'];
        this.tbl_lmsscoringfixedfieldspositives.source.initGrid();
    }
    async Set_lmsscoringfixedfieldspositives_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmsscoringfixedfieldspositives) {
        }
        this.bfilterPopulate_lmsscoringfixedfieldspositives = true;
    }
    async lmsscoringfixedfieldspositives_beforesave(event: any) {
        event.confirm.resolve(event.newData);
    }
    Set_lmsscoringfixedfieldspositives_TableConfig() {
        this.lmsscoringfixedfieldspositives_settings = {
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
                custom: this.lmsscoringfixedfieldspositive_menuactions
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
                value: {
                    title: 'Value',
                    type: '',
                    filter: true,
                },
                point: {
                    title: 'Point',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    lmsscoringfixedfieldspositives_LoadTable(list = new LocalDataSource()) {
        this.lmsscoringfixedfieldspositive_service.get_lmsscoringfixedfieldspositives_List().then((data) => {
            this.lmsscoringfixedfieldspositive_service.list = data as lmsscoringfixedfieldspositive[];
            this.tbl_lmsscoringfixedfieldspositives.source = new LocalDataSource();
            this.tbl_lmsscoringfixedfieldspositives.source.load(list as any as LocalDataSource);
            this.tbl_lmsscoringfixedfieldspositives.source.setPaging(1, 20, true);
        });
    }
    lmsscoringfixedfieldspositives_route(event: any, action: any) {
        switch (action) {
            case 'create':
                if (this.lmsscoringfixedfieldspositive_service.list.length == 0) {
                    this.tbl_lmsscoringfixedfieldspositives.source.grid.createFormShown = true;
                }
                else {
                    let obj = new lmsscoringfixedfieldspositive();
                    this.lmsscoringfixedfieldspositive_service.list.push(obj);
                    this.tbl_lmsscoringfixedfieldspositives.source.refresh();
                    if ((this.lmsscoringfixedfieldspositive_service.list.length / this.tbl_lmsscoringfixedfieldspositives.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsscoringfixedfieldspositives.source.getPaging().page) {
                        this.tbl_lmsscoringfixedfieldspositives.source.setPage((this.lmsscoringfixedfieldspositive_service.list.length / this.tbl_lmsscoringfixedfieldspositives.source.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tbl_lmsscoringfixedfieldspositives.source.grid.edit(this.tbl_lmsscoringfixedfieldspositives.source.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    let index = this.tbl_lmsscoringfixedfieldspositives.source.data.indexOf(event.data);
                    this.onDelete_lmsscoringfixedfieldspositive(event, event.data.lsfpid, ((this.tbl_lmsscoringfixedfieldspositives.source.getPaging().page - 1) * this.tbl_lmsscoringfixedfieldspositives.source.getPaging().perPage) + index);
                    this.tbl_lmsscoringfixedfieldspositives.source.refresh();
                }
                break;
        }
    }
    async onCustom_lmsscoringfixedfieldspositives_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsscoringfixedfieldspositives");
        let formname = (objbomenuaction as any).actionname;
    }
    lmsscoringfixedfieldspositives_Paging(val) {
        this.tbl_lmsscoringfixedfieldspositives.source.setPaging(1, val, true);
    }
    onDelete_lmsscoringfixedfieldspositive(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmsscoringfixedfieldspositive_IDs += childID + ",";
        this.lmsscoringfixedfieldspositive_service.list.splice(i, 1);
    }
    constructor( private spinner: NgxSpinnerService,
        private currentRoute: ActivatedRoute,
        private lmsscoringfixedfieldspositive_service: lmsscoringfixedfieldspositiveService,
        private toastr: ToastService,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sharedService: SharedService,
        private sessionService: SessionService,
        public dialogRef: DynamicDialogRef) {
    }

    onSubmit() {
        this.lmsscoringfixedfieldspositive_service.Deleted_lmsscoringfixedfieldspositive_IDs = this.Deleted_lmsscoringfixedfieldspositive_IDs;
        this.spinner.show();
        this.lmsscoringfixedfieldspositive_service.saveOrUpdate_lmsscoringfixedfieldspositives_List().subscribe(
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
        this.Set_lmsscoringfixedfieldspositives_TableConfig();
        this.lmsscoringfixedfieldspositives_LoadTable(res.lmsscoringfixedfieldspositives);
    }

    populateForm(pd: lmsscoringfixedfieldspositive) {
        if (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2) {
            this.dialogRef.close(pd);
        }
        else {
            this.formData = Object.assign({}, pd);
        }

    }


}

