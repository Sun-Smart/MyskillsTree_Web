import { flmservicerequestService } from './../../../service/flmservicerequest.service';
import { flmservicerequest } from './../../../model/flmservicerequest.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { TranslateService } from "@ngx-translate/core";
import { erpsuppliermaster } from '../../../../../../n-tire-procurement-app/src/app/model/erpsuppliermaster.model';
import { erpsuppliermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsuppliermaster.service';
import { flmservicerequestdetail } from './../../../model/flmservicerequestdetail.model';
import { flmtask, IflmtaskResponse } from './../../../model/flmtask.model';
import { flmtaskService } from './../../../service/flmtask.service';
import { flmservicerequestdetailComponent } from './flmservicerequestdetail.component';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-flmservicerequest',
    templateUrl: './flmservicerequest.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class flmservicerequestComponent implements OnInit {
    shortcuts: ShortcutInput[] = [];
    showsubmit: boolean = true;
    showGoWorkFlow: boolean = false;
    toolbarvisible: boolean = true;
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    pmenuid: any;
    pcurrenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    data3: any = [];
    bfilterPopulateflmservicerequests: boolean = false;
    dataflmservicerequestsservicecategory3: any = [];
    dataflmservicerequestsvendorid3: any = [];
    dataflmservicerequestdetailstaskid3: any = [];
    bfilterPopulateflmservicerequestdetails: boolean = false;
    @ViewChild('tblflmservicerequestdetailssource', { static: false }) tblflmservicerequestdetailssource: Ng2SmartTableComponent;
    flmservicerequestForm: FormGroup;
    servicecategoryList: boconfigvalue[]=[];
    vendoridList: erpsuppliermaster[];
    vendorid_erpsuppliermastersForm: FormGroup;
    vendorid_erpsuppliermastersoptions: any;
    vendorid_erpsuppliermastersformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    DeletedflmservicerequestdetailIDs: string = "";
    flmservicerequestdetailsID: string = "1";
    flmservicerequestdetailsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private flmservicerequestservice: flmservicerequestService,
        private flmtaskservice: flmtaskService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private erpsuppliermasterservice: erpsuppliermasterService,
        private currentRoute: ActivatedRoute) {
        this.translate = this.sharedService.translate;
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
                preventDefault: true
            },
            {
                key: 'cmd s',
                command: () => this.onSubmitData(false),
                preventDefault: true
            },
            {
                key: 'cmd f',
                command: () => this.resetForm(),
                preventDefault: true
            }
        ]);
        this.flmservicerequestForm = this.fb.group({
            servicerequestid: [null],
            vehicleid: [null],
            servicecategory: [null],
            servicecategorydesc: [null],
            description: [null],
            odometerreading: [null],
            startdate: [null],
            starttime: [null],
            enddate: [null],
            endtime: [null],
            vendorid: [null],
            vendoriddesc: [null],
            reference: [null],
            details: [null],
            labourcost: [null],
            partscost: [null],
            discountpercentage: [null],
            discountamount: [null],
            tax: [null],
            taxamount: [null],
            totalcost: [null],
            comments: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.flmservicerequestForm.controls; }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    ToolBar(prop:any) {
        this.toolbarvisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.flmservicerequestForm.dirty && this.flmservicerequestForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    async ngOnInit() {
        debugger;
        let flmservicerequest = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.servicerequestid != null) {
            flmservicerequest = this.data.servicerequestid;
        }
        else
            flmservicerequest = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = flmservicerequest;
        //this.sharedService.alert(flmservicerequest);
        if (flmservicerequest == null) {
            this.SetflmservicerequestdetailsTableConfig();
            setTimeout(() => {
                this.SetflmservicerequestdetailsTableddConfig();
            });
            this.resetForm();
        }
        else {
            this.PopulateScreen(flmservicerequest);
        }
        this.configservice.getList("servicecategory").then((res:any) => this.servicecategoryList = res as boconfigvalue[]);
        this.erpsuppliermasterservice.geterpsuppliermastersList().then((res:any) => this.vendoridList = res as erpsuppliermaster[]);
        this.vendorid_erpsuppliermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.vendoridList.filter(v => v.suppliercode.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.vendorid_erpsuppliermastersformatter = (result: any) => result.suppliercode;
        this.flmservicerequestForm.markAsUntouched();
        this.flmservicerequestForm.markAsPristine();
    }
    onSelectedvendorid(vendoridDetail: any) {
        if (vendoridDetail) {
            this.flmservicerequestForm.patchValue({ vendorid: vendoridDetail.item.supplierid });
            this.flmservicerequestForm.patchValue({ vendoriddesc: vendoridDetail.item.suppliercode });
            vendoridDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.flmservicerequestForm != null)
            this.flmservicerequestForm.reset();
        setTimeout(() => {
            this.flmservicerequestservice.flmservicerequestdetails = [];
            this.flmservicerequestdetailsLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.flmservicerequestForm.controls[key] != null) {
                    this.flmservicerequestForm.patchValue(json);
                    this.flmservicerequestForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let servicerequestid = this.flmservicerequestForm.get('servicerequestid').value;
        if (servicerequestid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.flmservicerequestservice.deleteflmservicerequest(servicerequestid).then((res:any) => {
                    this.resetForm();
                }
                );
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.flmservicerequestForm.patchValue({
            servicerequestid: null
        });
        this.flmservicerequestservice.formData.servicerequestid = null;
    }
    onClose() {
        this.dialogRef.close();
    }

    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    servicecategoryonChange(evt:any) {
        let e = evt.value;
        this.flmservicerequestForm.patchValue({ servicecategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    vendoridonChange(evt:any) {
        let e = evt.value;
    }
    attachmentuploader(e:any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileattachmentlist.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
            max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentfieldjson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    PopulateScreen(flmservicerequest: any) {
        this.flmservicerequestservice.getflmservicerequestsByID(parseInt(flmservicerequest)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        var starttimeTime = new Time(res.flmservicerequest.starttime);
        var endtimeTime = new Time(res.flmservicerequest.endtime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.flmservicerequestForm.patchValue({
            servicerequestid: res.flmservicerequest.servicerequestid,
            vehicleid: res.flmservicerequest.vehicleid,
            servicecategory: res.flmservicerequest.servicecategory,
            servicecategorydesc: res.flmservicerequest.servicecategorydesc,
            description: res.flmservicerequest.description,
            odometerreading: res.flmservicerequest.odometerreading,
            startdate: this.ngbDateParserFormatter.parse(res.flmservicerequest.startdate),
            starttime: starttimeTime,
            enddate: this.ngbDateParserFormatter.parse(res.flmservicerequest.enddate),
            endtime: endtimeTime,
            vendorid: res.flmservicerequest.vendorid,
            vendoriddesc: res.flmservicerequest.vendoriddesc,
            reference: res.flmservicerequest.reference,
            details: res.flmservicerequest.details,
            labourcost: res.flmservicerequest.labourcost,
            partscost: res.flmservicerequest.partscost,
            discountpercentage: res.flmservicerequest.discountpercentage,
            discountamount: res.flmservicerequest.discountamount,
            tax: res.flmservicerequest.tax,
            taxamount: res.flmservicerequest.taxamount,
            totalcost: res.flmservicerequest.totalcost,
            comments: res.flmservicerequest.comments,
            attachment: res.flmservicerequest.attachment,
            status: res.flmservicerequest.status,
            statusdesc: res.flmservicerequest.statusdesc,
        });
        if (this.flmservicerequestForm.get('attachment').value != null && this.flmservicerequestForm.get('attachment').value != "") this.attachmentfieldjson = JSON.parse(this.flmservicerequestForm.get('attachment').value);
        this.flmservicerequestservice.flmservicerequestdetails = res.flmservicerequestdetail;
        this.SetflmservicerequestdetailsTableConfig();
        this.flmservicerequestdetailsLoadTable();
        setTimeout(() => {
            this.SetflmservicerequestdetailsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.flmservicerequestForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.flmservicerequestservice.formData = this.flmservicerequestForm.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.flmservicerequestForm.controls[key] != null) {
                    this.flmservicerequestservice.formData[key] = this.flmservicerequestForm.controls[key].value;
                }
            }
        }
        this.flmservicerequestservice.formData.startdate = new Date(this.ngbDateParserFormatter.format(this.flmservicerequestForm.get('startdate').value) + '  UTC');
        this.flmservicerequestservice.formData.starttime = (this.flmservicerequestForm.get('starttime').value == null ? 0 : this.flmservicerequestForm.get('starttime').value.hour) + ':' + (this.flmservicerequestForm.get('starttime').value == null ? 0 : this.flmservicerequestForm.get('starttime').value.minute);
        this.flmservicerequestservice.formData.enddate = new Date(this.ngbDateParserFormatter.format(this.flmservicerequestForm.get('enddate').value) + '  UTC');
        this.flmservicerequestservice.formData.endtime = (this.flmservicerequestForm.get('endtime').value == null ? 0 : this.flmservicerequestForm.get('endtime').value.hour) + ':' + (this.flmservicerequestForm.get('endtime').value == null ? 0 : this.flmservicerequestForm.get('endtime').value.minute);
        this.flmservicerequestservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        this.flmservicerequestservice.formData.DeletedflmservicerequestdetailIDs = this.DeletedflmservicerequestdetailIDs;
        console.log(this.flmservicerequestservice.formData);
        this.flmservicerequestservice.saveOrUpdateflmservicerequests().subscribe(
            (res:any) => {
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.flmservicerequestservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result.value.flmservicerequest);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.flmservicerequestForm.markAsUntouched();
                this.flmservicerequestForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditvendorid(supplierid) {
        let ScreenType = '2';
        /*this.dialog.open(erpsuppliermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.erpsuppliermasterservice.geterpsuppliermastersList().then((res:any) => this.vendoridList = res as erpsuppliermaster[]);
        });*/
    }

    AddOrEditflmservicerequestdetail(event, servicetaskid, servicerequestid) {
        this.dialog.open(flmservicerequestdetailComponent,
            {
                data: { servicetaskid, servicerequestid, ScreenType: 2 }
            }
        ).onClose.subscribe((res:any) => {
            if (servicetaskid == null) {
                this.flmservicerequestdetailssource.add(res);
                this.flmservicerequestdetailssource.refresh();
            }
            else {
                this.flmservicerequestdetailssource.update(event.data, res);
            }
        });
    }
    onDeleteflmservicerequestdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedflmservicerequestdetailIDs += childID + ",";
        this.flmservicerequestservice.flmservicerequestdetails.splice(i, 1);
        //this.updateGrandTotal();
    }
    //start of Grid Codes flmservicerequestdetails
    flmservicerequestdetailssettings: any;
    flmservicerequestdetailssource: any;

    showflmservicerequestdetailsCheckbox() {
        debugger;
        if (this.tblflmservicerequestdetailssource.settings['selectMode'] == 'multi') this.tblflmservicerequestdetailssource.settings['selectMode'] = 'single';
        else
            this.tblflmservicerequestdetailssource.settings['selectMode'] = 'multi';
        this.tblflmservicerequestdetailssource.initGrid();
    }
    deleteflmservicerequestdetailsAll() {
        this.tblflmservicerequestdetailssource.settings['selectMode'] = 'single';
    }
    showflmservicerequestdetailsFilter() {
        setTimeout(() => {
            this.SetflmservicerequestdetailsTableddConfig();
        });
        if (this.tblflmservicerequestdetailssource.settings != null) this.tblflmservicerequestdetailssource.settings['hideSubHeader'] = !this.tblflmservicerequestdetailssource.settings['hideSubHeader'];
        this.tblflmservicerequestdetailssource.initGrid();
    }
    showflmservicerequestdetailsInActive() {
    }
    enableflmservicerequestdetailsInActive() {
    }
    async SetflmservicerequestdetailsTableddConfig() {
        if (!this.bfilterPopulateflmservicerequestdetails) {

            this.flmtaskservice.getflmtasksList().then((res:any) => {
                var datataskid2 = res as any;
                for (let i = 0; i < datataskid2.length; i++) {
                    var obj = { value: datataskid2[i].taskid, title: datataskid2[i].description };
                    this.dataflmservicerequestdetailstaskid3.push(obj);
                }
                var clone = this.clone(this.tblflmservicerequestdetailssource.settings);
                clone.columns['taskid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmservicerequestdetailstaskid3)), }, };
                clone.columns['taskid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.dataflmservicerequestdetailstaskid3)), }, };
                this.tblflmservicerequestdetailssource.settings = clone;
                this.tblflmservicerequestdetailssource.initGrid();
            });
        }
        this.bfilterPopulateflmservicerequestdetails = true;
    }
    async flmservicerequestdetailsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SetflmservicerequestdetailsTableConfig() {
        this.flmservicerequestdetailssettings = {
            hideSubHeader: true,
            mode: 'external',
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
                taskid: {
                    title: 'Task',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.dataflmservicerequestdetailstaskid3.find(c => c.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
                },
                description: {
                    title: 'description',
                    type: '',
                    filter: true,
                },
                vehicleissueid1: {
                    title: 'vehicleissueid1',
                    type: 'number',
                    filter: true,
                },
                vehicleissueid2: {
                    title: 'vehicleissueid2',
                    type: 'number',
                    filter: true,
                },
                labourcost: {
                    title: 'labourcost',
                    type: 'number',
                    filter: true,
                },
                itemcost: {
                    title: 'itemcost',
                    type: 'number',
                    filter: true,
                },
                remarks: {
                    title: 'remarks',
                    type: 'string',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
            },
        };
    }
    flmservicerequestdetailsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmservicerequestdetailsID) >= 0) {
            this.flmservicerequestdetailssource = new LocalDataSource();
            this.flmservicerequestdetailssource.load(this.flmservicerequestservice.flmservicerequestdetails as any as LocalDataSource);
            this.flmservicerequestdetailssource.setPaging(1, 20, true);
        }
    }
    flmservicerequestdetailsroute(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEditflmservicerequestdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEditflmservicerequestdetail(event, event.data.servicetaskid, this.formid);
                break;
            case 'delete':
                this.onDeleteflmservicerequestdetail(event, event.data.servicetaskid, ((this.flmservicerequestdetailssource.getPaging().page - 1) * this.flmservicerequestdetailssource.getPaging().perPage) + event.index);
                this.flmservicerequestdetailssource.refresh();
                break;
        }
    }
    flmservicerequestdetailsonDelete(obj) {
        let servicetaskid = obj.data.servicetaskid;
        if (confirm('Are you sure to delete this record ?')) {
            this.flmservicerequestservice.deleteflmservicerequest(servicetaskid).then((res:any) =>
                this.flmservicerequestdetailsLoadTable()
            );
        }
    }
    flmservicerequestdetailsPaging(val) {
        debugger;
        this.flmservicerequestdetailssource.setPaging(1, val, true);
    }
    handleflmservicerequestdetailsGridSelected(event) {
        this.flmservicerequestdetailsselectedindex = this.flmservicerequestservice.flmservicerequestdetails.findIndex(i => i.servicetaskid === event.data.servicetaskid);
    }
    IsflmservicerequestdetailsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.flmservicerequestdetailsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes flmservicerequestdetails

}



