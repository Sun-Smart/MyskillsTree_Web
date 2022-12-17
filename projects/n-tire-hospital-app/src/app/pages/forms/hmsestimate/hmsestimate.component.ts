import { hmsestimateService } from './../../../service/hmsestimate.service';
import { hmsestimate } from './../../../model/hmsestimate.model';
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
import currencyToSymbolMap from 'currency-symbol-map/map'
import { hmsestimatedetail } from './../../../model/hmsestimatedetail.model';
import { hmsestimatedetailComponent } from './hmsestimatedetail.component';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';

@Component({
    selector: 'app-hmsestimate',
    templateUrl: './hmsestimate.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class hmsestimateComponent implements OnInit {
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
    currencyToSymbolMap1: any;
    currencyToSymbolMap2: any;
    data3: any = [];
    bfilterPopulatehmsestimates: boolean = false;
    bfilterPopulatehmsestimatedetails: boolean = false;
    @ViewChild('tblhmsestimatedetailssource', { static: false }) tblhmsestimatedetailssource: Ng2SmartTableComponent;
    hmsestimateForm: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    DeletedhmsestimatedetailIDs: string = "";
    hmsestimatedetailsID: string = "1";
    hmsestimatedetailsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hmsestimateservice: hmsestimateService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
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
        this.hmsestimateForm = this.fb.group({
            estimateid: [null],
            patientid: [null],
            estimatecode: [null],
            estimatedate: [null],
            estimatedamount: [null],
            discountpercentage: [null],
            discountamount: [null],
            taxpercentage: [null],
            taxamount: [null],
            netamount: [null],
            comments: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmsestimateForm.controls; }

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
        if (this.hmsestimateForm.dirty && this.hmsestimateForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    async ngOnInit() {
        this.currencyToSymbolMap2 = currencyToSymbolMap;
        this.currencyToSymbolMap1 = (Object.entries(currencyToSymbolMap));
        debugger;
        let hmsestimate = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.estimateid != null) {
            hmsestimate = this.data.estimateid;
        }
        else
            hmsestimate = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hmsestimate;
        //this.sharedService.alert(hmsestimate);
        if (hmsestimate == null) {
            this.SethmsestimatedetailsTableConfig();
            setTimeout(() => {
                this.SethmsestimatedetailsTableddConfig();
            });
            this.resetForm();
        }
        else {
            this.PopulateScreen(hmsestimate);
        }
        this.hmsestimateForm.markAsUntouched();
        this.hmsestimateForm.markAsPristine();
    }



    resetForm() {
        if (this.hmsestimateForm != null)
            this.hmsestimateForm.reset();
        setTimeout(() => {
            this.hmsestimateservice.hmsestimatedetails = [];
            this.hmsestimatedetailsLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hmsestimateForm.controls[key] != null) {
                    this.hmsestimateForm.patchValue(json);
                    this.hmsestimateForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let estimateid = this.hmsestimateForm.get('estimateid')!.value;
        if (estimateid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hmsestimateservice.deletehmsestimate(estimateid).then((res:any) => {
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
        this.hmsestimateForm.patchValue({
            estimateid: null
        });
        this.hmsestimateservice.formData.estimateid = null;
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
    PopulateScreen(hmsestimate: any) {
        this.hmsestimateservice.gethmsestimatesByID(parseInt(hmsestimate)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hmsestimateForm.patchValue({
            estimateid: res.hmsestimate.estimateid,
            patientid: res.hmsestimate.patientid,
            estimatecode: res.hmsestimate.estimatecode,
            estimatedate: this.ngbDateParserFormatter.parse(res.hmsestimate.estimatedate),
            estimatedamount: res.hmsestimate.estimatedamount,
            discountpercentage: res.hmsestimate.discountpercentage,
            discountamount: res.hmsestimate.discountamount,
            taxpercentage: res.hmsestimate.taxpercentage,
            taxamount: res.hmsestimate.taxamount,
            netamount: res.hmsestimate.netamount,
            comments: res.hmsestimate.comments,
            status: res.hmsestimate.status,
            statusdesc: res.hmsestimate.statusdesc,
        });
        this.hmsestimateservice.hmsestimatedetails = res.hmsestimatedetail;
        this.SethmsestimatedetailsTableConfig();
        this.hmsestimatedetailsLoadTable();
        setTimeout(() => {
            this.SethmsestimatedetailsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.hmsestimateForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.hmsestimateservice.formData = this.hmsestimateForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.hmsestimateForm.controls[key] != null) {
                    this.hmsestimateservice.formData[key] = this.hmsestimateForm.controls[key]!.value;
                }
            }
        }
        this.hmsestimateservice.formData.estimatedate = new Date(this.ngbDateParserFormatter.format(this.hmsestimateForm.get('estimatedate')!.value) + '  UTC');
        this.hmsestimateservice.formData.DeletedhmsestimatedetailIDs = this.DeletedhmsestimatedetailIDs;
        console.log(this.hmsestimateservice.formData);
        this.hmsestimateservice.saveOrUpdatehmsestimates().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.hmsestimateservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.hmsestimate);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.hmsestimateForm.markAsUntouched();
                this.hmsestimateForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEdithmsestimatedetail(event, estimatedetailid, estimateid) {
        this.dialog.open(hmsestimatedetailComponent,
            {
                data: { estimatedetailid, estimateid, ScreenType: 2, patientid: this.hmsestimateForm.get('patientid')!.value }
            }
        ).onClose.subscribe((res:any) => {
            if (estimatedetailid == null) {
                this.hmsestimatedetailssource.add(res);
                this.hmsestimatedetailssource.refresh();
            }
            else {
                this.hmsestimatedetailssource.update(event.data, res);
            }
        });
    }
    onDeletehmsestimatedetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedhmsestimatedetailIDs += childID + ",";
        this.hmsestimateservice.hmsestimatedetails.splice(i, 1);
        //this.updateGrandTotal();
    }
    //start of Grid Codes hmsestimatedetails
    hmsestimatedetailssettings: any;
    hmsestimatedetailssource: any;

    showhmsestimatedetailsCheckbox() {
        debugger;
        if (this.tblhmsestimatedetailssource.settings['selectMode'] == 'multi') this.tblhmsestimatedetailssource.settings['selectMode'] = 'single';
        else
            this.tblhmsestimatedetailssource.settings['selectMode'] = 'multi';
        this.tblhmsestimatedetailssource.initGrid();
    }
    deletehmsestimatedetailsAll() {
        this.tblhmsestimatedetailssource.settings['selectMode'] = 'single';
    }
    showhmsestimatedetailsFilter() {
        setTimeout(() => {
            this.SethmsestimatedetailsTableddConfig();
        });
        if (this.tblhmsestimatedetailssource.settings != null) this.tblhmsestimatedetailssource.settings['hideSubHeader'] = !this.tblhmsestimatedetailssource.settings['hideSubHeader'];
        this.tblhmsestimatedetailssource.initGrid();
    }
    showhmsestimatedetailsInActive() {
    }
    enablehmsestimatedetailsInActive() {
    }
    async SethmsestimatedetailsTableddConfig() {
        if (!this.bfilterPopulatehmsestimatedetails) {
        }
        this.bfilterPopulatehmsestimatedetails = true;
    }
    async hmsestimatedetailsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SethmsestimatedetailsTableConfig() {
        this.hmsestimatedetailssettings = {
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
                code: {
                    title: 'code',
                    type: '',
                    filter: true,
                },
                details: {
                    title: 'details',
                    type: '',
                    filter: true,
                },
                rate: {
                    title: 'rate',
                    type: 'number',
                    filter: true,
                },
                quantity: {
                    title: 'quantity',
                    type: 'number',
                    filter: true,
                },
                totalamount: {
                    title: 'Total Amount',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    hmsestimatedetailsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsestimatedetailsID) >= 0) {
            this.hmsestimatedetailssource = new LocalDataSource();
            this.hmsestimatedetailssource.load(this.hmsestimateservice.hmsestimatedetails as any as LocalDataSource);
            this.hmsestimatedetailssource.setPaging(1, 20, true);
        }
    }
    hmsestimatedetailsroute(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdithmsestimatedetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdithmsestimatedetail(event, event.data.estimatedetailid, this.formid);
                break;
            case 'delete':
                this.onDeletehmsestimatedetail(event, event.data.estimatedetailid, ((this.hmsestimatedetailssource.getPaging().page - 1) * this.hmsestimatedetailssource.getPaging().perPage) + event.index);
                this.hmsestimatedetailssource.refresh();
                break;
        }
    }
    hmsestimatedetailsonDelete(obj) {
        let estimatedetailid = obj.data.estimatedetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.hmsestimateservice.deletehmsestimate(estimatedetailid).then((res:any) =>
                this.hmsestimatedetailsLoadTable()
            );
        }
    }
    hmsestimatedetailsPaging(val) {
        debugger;
        this.hmsestimatedetailssource.setPaging(1, val, true);
    }
    handlehmsestimatedetailsGridSelected(event) {
        this.hmsestimatedetailsselectedindex = this.hmsestimateservice.hmsestimatedetails.findIndex(i => i.estimatedetailid === event.data.estimatedetailid);
    }
    IshmsestimatedetailsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmsestimatedetailsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes hmsestimatedetails

}



