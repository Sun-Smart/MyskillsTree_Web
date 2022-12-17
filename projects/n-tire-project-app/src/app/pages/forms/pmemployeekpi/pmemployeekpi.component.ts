import { pmemployeekpi } from './../../../model/pmemployeekpi.model';
import { pmemployeekpiService } from './../../../service/pmemployeekpi.service';
import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { Router, ActivatedRoute } from '@angular/router';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { DynamicDialogRef, DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { LocalDataSource } from 'ng2-smart-table';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
import { pmkpiService } from './../../../service/pmkpi.service';


@Component({
    selector: 'app-pmemployeekpiList',
    templateUrl: './pmemployeekpi.component.html',
    styles: [`
nb-card {
transform: translate3d(0, 0, 0);
}
`]
})

export class pmemployeekpiListComponent implements OnInit {
    @ViewChild('tblpmemployeekpissource', { static: false }) tblpmemployeekpissource: Ng2SmartTableComponent; data3: any = [];
    bfilterPopulatepmemployeekpis: boolean = false;
    datapmemployeekpisdepartmentid3: any = [];
    datapmemployeekpisdesignationid3: any = [];
    datapmemployeekpisemployeeid3: any = [];
    datapmemployeekpiskpiid3: any = [];
    data: any;
    toolbarvisible: boolean = true;
    DeletedpmemployeekpiIDs: string = "";
    pmemployeekpisID: string = "";
    pmemployeekpisselectedindex: any;
    pmemployeekpissettings: any;
    pmemployeekpissource: any;

    showpmemployeekpisCheckbox() {
        debugger;
        if (this.tblpmemployeekpissource.settings['selectMode'] == 'multi') this.tblpmemployeekpissource.settings['selectMode'] = 'single';
        else
            this.tblpmemployeekpissource.settings['selectMode'] = 'multi';
        this.tblpmemployeekpissource.initGrid();
    }
    deletepmemployeekpisAll() {
        this.tblpmemployeekpissource.settings['selectMode'] = 'single';
    }
    showpmemployeekpisFilter() {
        setTimeout(() => {
            this.SetpmemployeekpisTableddConfig();
        });
        if (this.tblpmemployeekpissource.settings != null) this.tblpmemployeekpissource.settings['hideSubHeader'] = !this.tblpmemployeekpissource.settings['hideSubHeader'];
        this.tblpmemployeekpissource.initGrid();
    }
    showpmemployeekpisInActive() {
    }
    enablepmemployeekpisInActive() {
    }
    async SetpmemployeekpisTableddConfig() {
        if (!this.bfilterPopulatepmemployeekpis) {

            this.bomasterdataservice.getList("1").then((res:any) => {
                var datadepartmentid2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.datapmemployeekpisdepartmentid3.push(defaultobj);
                for (let i = 0; i < datadepartmentid2.length; i++) {
                    var obj = { value: datadepartmentid2[i].masterdataid, title: datadepartmentid2[i].masterdatadescription };
                    this.datapmemployeekpisdepartmentid3.push(obj);
                }
                var clone = this.clone(this.tblpmemployeekpissource.settings);
                clone.columns['departmentid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmemployeekpisdepartmentid3)), }, };
                clone.columns['departmentid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmemployeekpisdepartmentid3)), }, };
                this.tblpmemployeekpissource.settings = clone;
                this.tblpmemployeekpissource.initGrid();
            });

            this.configservice.getList("designation").then((res:any) => {
                var datadesignationid2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.datapmemployeekpisdesignationid3.push(defaultobj);
                for (let i = 0; i < datadesignationid2.length; i++) {
                    var obj = { value: datadesignationid2[i].configkey, title: datadesignationid2[i].configtext };
                    this.datapmemployeekpisdesignationid3.push(obj);
                }
                var clone = this.clone(this.tblpmemployeekpissource.settings);
                if (clone.columns['designationid'] != undefined) clone.columns['designationid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmemployeekpisdesignationid3)), }, };
                if (clone.columns['designationid'] != undefined) clone.columns['designationid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmemployeekpisdesignationid3)), }, };
                this.tblpmemployeekpissource.settings = clone;
                this.tblpmemployeekpissource.initGrid();
            });

            this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => {
                var dataemployeeid2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.datapmemployeekpisemployeeid3.push(defaultobj);
                for (let i = 0; i < dataemployeeid2.length; i++) {
                    var obj = { value: dataemployeeid2[i].employeeid, title: dataemployeeid2[i].employeename };
                    this.datapmemployeekpisemployeeid3.push(obj);
                }
                var clone = this.clone(this.tblpmemployeekpissource.settings);
                clone.columns['employeeid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmemployeekpisemployeeid3)), }, };
                clone.columns['employeeid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmemployeekpisemployeeid3)), }, };
                this.tblpmemployeekpissource.settings = clone;
                this.tblpmemployeekpissource.initGrid();
            });

            this.pmkpiservice.getpmkpisList().then((res:any) => {
                var datakpiid2 = res as any;
                var defaultobj = { value: "", title: "Select..." };
                this.datapmemployeekpiskpiid3.push(defaultobj);
                for (let i = 0; i < datakpiid2.length; i++) {
                    var obj = { value: datakpiid2[i].kpiid, title: datakpiid2[i].name };
                    this.datapmemployeekpiskpiid3.push(obj);
                }
                var clone = this.clone(this.tblpmemployeekpissource.settings);
                clone.columns['kpiid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmemployeekpiskpiid3)), }, };
                clone.columns['kpiid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datapmemployeekpiskpiid3)), }, };
                this.tblpmemployeekpissource.settings = clone;
                this.tblpmemployeekpissource.initGrid();
            });
        }
        this.bfilterPopulatepmemployeekpis = true;
    }
    async pmemployeekpisbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetpmemployeekpisTableConfig() {
        this.pmemployeekpissettings = {
            hideSubHeader: true,
            mode: 'inline',
            selectMode: 'single',
            actions: {
                width: '300px',
                columnTitle: 'Actions',
                add: true,
                edit: true, // true,
                delete: true,
                custom: [
                    // { name: 'viewrecord',type:'html', title: '<i style="width:10px" class="fa fa-eye"></i>'},
                    // { name: 'editrecord',type:'html', title: '<i style="width:10px" class="nb-edit"></i>' }
                ]
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
                employeekpiid: {
                    title: 'Employee K P I',
                    type: 'number',
                    filter: true,
                },
                departmentid: {
                    title: 'Department',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datapmemployeekpisdepartmentid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                designationid: {
                    title: 'Designation',
                    type: '',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datapmemployeekpisdesignationid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                employeeid: {
                    title: 'Employee',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datapmemployeekpisemployeeid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                kpiid: {
                    title: 'K P I',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datapmemployeekpiskpiid3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                weight: {
                    title: 'Weight',
                    type: 'number',
                    filter: true,
                },
                reviewquestions: {
                    title: 'Review Questions',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                remarks: {
                    title: 'Remarks',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
            },
        };
    }
    pmemployeekpisLoadTable() {
        this.pmemployeekpiservice.getpmemployeekpisList().then((data) => {
            this.pmemployeekpiservice.list = data as pmemployeekpi[];
            this.pmemployeekpissource = new LocalDataSource();
            this.pmemployeekpissource.load(this.pmemployeekpiservice.list as any as LocalDataSource);
            this.pmemployeekpissource.setPaging(1, 20, true);
        });
    }
    pmemployeekpisroute(event, action) {
        switch (action) {
            case 'create':
                if (this.pmemployeekpiservice.list.length == 0) {
                    this.tblpmemployeekpissource.grid.createFormShown = true;
                }
                else {
                    let obj = new pmemployeekpi();
                    this.pmemployeekpiservice.list.push(obj);
                    this.pmemployeekpissource.refresh();
                    if ((this.pmemployeekpiservice.list.length / this.pmemployeekpissource.getPaging().perPage).toFixed(0) + 1 != this.pmemployeekpissource.getPaging().page) {
                        this.pmemployeekpissource.setPage((this.pmemployeekpiservice.list.length / this.pmemployeekpissource.getPaging().perPage).toFixed(0) + 1);
                    }
                    setTimeout(() => {
                        this.tblpmemployeekpissource.grid.edit(this.tblpmemployeekpissource.grid.getLastRow());
                    });
                }
                break;
            case 'delete':
                let index = this.pmemployeekpissource.data.indexOf(event.data);
                this.onDeletepmemployeekpi(event, event.data.kpidetailid, ((this.pmemployeekpissource.getPaging().page - 1) * this.pmemployeekpissource.getPaging().perPage) + index);
                this.pmemployeekpissource.refresh();
                break;
        }
    }
    pmemployeekpisPaging(val) {
        debugger;
        this.pmemployeekpissource.setPaging(1, val, true);
    }
    onDeletepmemployeekpi(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedpmemployeekpiIDs += childID + ",";
        this.pmemployeekpiservice.list.splice(i, 1);
    }
    constructor(
        private router: Router,
        private currentRoute: ActivatedRoute,
        private pmemployeekpiservice: pmemployeekpiService,
        private toastr: ToastService,
        private configservice: boconfigvalueService,
        private bomasterdataservice: bomasterdataService,
        private hrmsemployeeservice: hrmsemployeeService,
        private pmkpiservice: pmkpiService,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        public dialogRef: DynamicDialogRef) {
    }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    onSubmit() {
        this.pmemployeekpiservice.DeletedpmemployeekpiIDs = this.DeletedpmemployeekpiIDs;
        this.pmemployeekpiservice.saveOrUpdatepmemployeekpisList().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                /*if(bclear){
                this.pmemployeekpiservice.clearList();
                this.resetForm();
                }*/
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    } async ngOnInit() {
        this.SetpmemployeekpisTableConfig();
        this.pmemployeekpisLoadTable();
        setTimeout(() => {
            this.SetpmemployeekpisTableddConfig();
        });
    }

    populateForm(pd: pmemployeekpi) {
        if (this.data.ScreenType == 1 || this.data.ScreenType == 2) {
            this.dialogRef.close(pd);
        }
        else {
            this.pmemployeekpiservice.formData = Object.assign({}, pd);
        }
        // 

    }


}

