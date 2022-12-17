import { lmsscoringplannedclosedate } from './../../../model/lmsscoringplannedclosedate.model';
import { lmsscoringplannedclosedateService } from './../../../service/lmsscoringplannedclosedate.service';
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


@Component({
    selector: 'app-lmsscoringplannedclosedate-List',
    templateUrl: './lmsscoringplannedclosedate.component.html',
    styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class lmsscoringplannedclosedateListComponent implements OnInit {
    @ViewChild('tbl_lmsscoringplannedclosedates', { static: false }) tbl_lmsscoringplannedclosedates: Ng2SmartTableComponent; bfilterPopulate_lmsscoringplannedclosedates: boolean = false;
    showview: boolean = false;
    theme: string = "";
    SESSIONUSERID: any;
    sessionData: any;
    sourceKey: any;
    data: any;
    maindata: any;
    toolbarVisible: boolean = true;
    Deleted_lmsscoringplannedclosedate_IDs: string = "";
    lmsscoringplannedclosedates_ID: string = "";
    lmsscoringplannedclosedates_selectedindex: any;
    lmsscoringplannedclosedate_menuactions: any = []
    lmsscoringplannedclosedates_settings: any;

    show_lmsscoringplannedclosedates_Checkbox() {
        debugger;
        if (this.tbl_lmsscoringplannedclosedates.source.settings['selectMode'] == 'multi') this.tbl_lmsscoringplannedclosedates.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsscoringplannedclosedates.source.settings['selectMode'] = 'multi';
        this.tbl_lmsscoringplannedclosedates.source.initGrid();
    }
    delete_lmsscoringplannedclosedates_All() {
        this.tbl_lmsscoringplannedclosedates.source.settings['selectMode'] = 'single';
    }
    show_lmsscoringplannedclosedates_Filter() {
        setTimeout(() => {
            //  this.Set_lmsscoringplannedclosedates_TableDropDownConfig();
        });
        if (this.tbl_lmsscoringplannedclosedates.source.settings != null) this.tbl_lmsscoringplannedclosedates.source.settings['hideSubHeader'] = !this.tbl_lmsscoringplannedclosedates.source.settings['hideSubHeader'];
        this.tbl_lmsscoringplannedclosedates.source.initGrid();
    }
    show_lmsscoringplannedclosedates_InActive() {
    }
    enable_lmsscoringplannedclosedates_InActive() {
    }
    async Set_lmsscoringplannedclosedates_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmsscoringplannedclosedates) {
        }
        this.bfilterPopulate_lmsscoringplannedclosedates = true;
    }
    async lmsscoringplannedclosedates_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmsscoringplannedclosedates_TableConfig() {
        this.lmsscoringplannedclosedates_settings = {
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
                custom: this.lmsscoringplannedclosedate_menuactions
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
                days: {
                    title: 'Days',
                    type: 'number',
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
    lmsscoringplannedclosedates_LoadTable(list = new LocalDataSource()) {
        this.lmsscoringplannedclosedate_service.get_lmsscoringplannedclosedates_List().then((data) => {
            this.lmsscoringplannedclosedate_service.list = data as lmsscoringplannedclosedate[];
            this.tbl_lmsscoringplannedclosedates.source = new LocalDataSource();
            this.tbl_lmsscoringplannedclosedates.source.load(list as any as LocalDataSource);
            this.tbl_lmsscoringplannedclosedates.source.setPaging(1, 20, true);
        });
    }
    lmsscoringplannedclosedates_route(event: any, action: any) {
        switch (action) {
            case 'create':
                if (this.lmsscoringplannedclosedate_service.list.length == 0) {
                    this.tbl_lmsscoringplannedclosedates.source.grid.createFormShown = true;
                }
                else {
                    let obj = new lmsscoringplannedclosedate();
                    this.lmsscoringplannedclosedate_service.list.push(obj);
                    this.tbl_lmsscoringplannedclosedates.source.refresh();
                    if ((this.lmsscoringplannedclosedate_service.list.length / this.tbl_lmsscoringplannedclosedates.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsscoringplannedclosedates.source.getPaging().page) {
                        this.tbl_lmsscoringplannedclosedates.source.setPage((this.lmsscoringplannedclosedate_service.list.length / this.tbl_lmsscoringplannedclosedates.source.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tbl_lmsscoringplannedclosedates.source.grid.edit(this.tbl_lmsscoringplannedclosedates.source.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    let index = this.tbl_lmsscoringplannedclosedates.source.data.indexOf(event.data);
                    this.onDelete_lmsscoringplannedclosedate(event, event.data.lspcid, ((this.tbl_lmsscoringplannedclosedates.source.getPaging().page - 1) * this.tbl_lmsscoringplannedclosedates.source.getPaging().perPage) + index);
                    this.tbl_lmsscoringplannedclosedates.source.refresh();
                }
                break;
        }
    }
    async onCustom_lmsscoringplannedclosedates_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsscoringplannedclosedates");
        let formname = (objbomenuaction as any).actionname;




    }
    lmsscoringplannedclosedates_Paging(val) {
        debugger;
        this.tbl_lmsscoringplannedclosedates.source.setPaging(1, val, true);
    }
    onDelete_lmsscoringplannedclosedate(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmsscoringplannedclosedate_IDs += childID + ",";
        this.lmsscoringplannedclosedate_service.list.splice(i, 1);
    }
    constructor(
        private nav: Location,
        private router: Router, private spinner: NgxSpinnerService,
        private currentRoute: ActivatedRoute,
        private lmsscoringplannedclosedate_service: lmsscoringplannedclosedateService,
        private toastr: ToastService,
        private configservice: boconfigvalueService,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private sharedService: SharedService,
        private sessionService: SessionService,
        public dialogRef: DynamicDialogRef) {
    }

    onSubmit() {
        this.lmsscoringplannedclosedate_service.Deleted_lmsscoringplannedclosedate_IDs = this.Deleted_lmsscoringplannedclosedate_IDs;
        this.spinner.show();
        this.lmsscoringplannedclosedate_service.saveOrUpdate_lmsscoringplannedclosedates_List().subscribe(
            async res => {
                debugger;
                this.spinner.hide();
                this.toastr.addSingle("success", "", "Successfully saved");
                this.showview = true;
                /*if(bclear){
                this.lmsscoringplannedclosedate_service.clearList();
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
        this.Set_lmsscoringplannedclosedates_TableConfig();
        this.lmsscoringplannedclosedates_LoadTable(res.lmsscoringplannedclosedates);
    }

    populateForm(pd: lmsscoringplannedclosedate) {
        if (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2) {
            this.dialogRef.close(pd);
        }
        else {
            this.formData = Object.assign({}, pd);
        }
        // 

    }


}

