import { hmspatientpaymentmasterService } from './../../../service/hmspatientpaymentmaster.service';
import { hmspatientpaymentmaster } from './../../../model/hmspatientpaymentmaster.model';
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
import { hmspatientpaymentdetail } from './../../../model/hmspatientpaymentdetail.model';
import { hmspatientpaymentdetailComponent } from './hmspatientpaymentdetail.component';
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
    selector: 'app-hmspatientpaymentmaster',
    templateUrl: './hmspatientpaymentmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class hmspatientpaymentmasterComponent implements OnInit {
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
    bfilterPopulatehmspatientpaymentmasters: boolean = false;
    datahmspatientpaymentdetailschargetype3: any = [];
    bfilterPopulatehmspatientpaymentdetails: boolean = false;
    @ViewChild('tblhmspatientpaymentdetailssource', { static: false }) tblhmspatientpaymentdetailssource: Ng2SmartTableComponent;
    hmspatientpaymentmasterForm: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    DeletedhmspatientpaymentdetailIDs: string = "";
    hmspatientpaymentdetailsID: string = "1";
    hmspatientpaymentdetailsselectedindex: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hmspatientpaymentmasterservice: hmspatientpaymentmasterService,
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
        this.hmspatientpaymentmasterForm = this.fb.group({
            paymentid: [null],
            visitid: [null],
            patientid: [null],
            doctorid: [null],
            paymentcode: [null],
            paymentdate: [null],
            totalamount: [null],
            discountpercentage: [null],
            discountamount: [null],
            taxpercentage: [null],
            taxamount: [null],
            netamount: [null],
            paid: [null],
            amountpaid: [null],
            paymentdoneby: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmspatientpaymentmasterForm.controls; }

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
        if (this.hmspatientpaymentmasterForm.dirty && this.hmspatientpaymentmasterForm.touched) {
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
        let hmspatientpaymentmaster = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.paymentid != null) {
            hmspatientpaymentmaster = this.data.paymentid;
        }
        else
            hmspatientpaymentmaster = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hmspatientpaymentmaster;
        //this.sharedService.alert(hmspatientpaymentmaster);
        if (hmspatientpaymentmaster == null) {
            this.SethmspatientpaymentdetailsTableConfig();
            setTimeout(() => {
                this.SethmspatientpaymentdetailsTableddConfig();
            });
            this.resetForm();
        }
        else {
            this.PopulateScreen(hmspatientpaymentmaster);
        }
        this.hmspatientpaymentmasterForm.markAsUntouched();
        this.hmspatientpaymentmasterForm.markAsPristine();
    }



    resetForm() {
        if (this.hmspatientpaymentmasterForm != null)
            this.hmspatientpaymentmasterForm.reset();
        setTimeout(() => {
            this.hmspatientpaymentmasterservice.hmspatientpaymentdetails = [];
            this.hmspatientpaymentdetailsLoadTable();
        });
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hmspatientpaymentmasterForm.controls[key] != null) {
                    this.hmspatientpaymentmasterForm.patchValue(json);
                    this.hmspatientpaymentmasterForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let paymentid = this.hmspatientpaymentmasterForm.get('paymentid')!.value;
        if (paymentid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hmspatientpaymentmasterservice.deletehmspatientpaymentmaster(paymentid).then((res:any) => {
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
        this.hmspatientpaymentmasterForm.patchValue({
            paymentid: null
        });
        this.hmspatientpaymentmasterservice.formData.paymentid = null;
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
    PopulateScreen(hmspatientpaymentmaster: any) {
        this.hmspatientpaymentmasterservice.gethmspatientpaymentmastersByID(parseInt(hmspatientpaymentmaster)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hmspatientpaymentmasterForm.patchValue({
            paymentid: res.hmspatientpaymentmaster.paymentid,
            visitid: res.hmspatientpaymentmaster.visitid,
            patientid: res.hmspatientpaymentmaster.patientid,
            doctorid: res.hmspatientpaymentmaster.doctorid,
            paymentcode: res.hmspatientpaymentmaster.paymentcode,
            paymentdate: this.ngbDateParserFormatter.parse(res.hmspatientpaymentmaster.paymentdate),
            totalamount: res.hmspatientpaymentmaster.totalamount,
            discountpercentage: res.hmspatientpaymentmaster.discountpercentage,
            discountamount: res.hmspatientpaymentmaster.discountamount,
            taxpercentage: res.hmspatientpaymentmaster.taxpercentage,
            taxamount: res.hmspatientpaymentmaster.taxamount,
            netamount: res.hmspatientpaymentmaster.netamount,
            paid: res.hmspatientpaymentmaster.paid,
            amountpaid: res.hmspatientpaymentmaster.amountpaid,
            paymentdoneby: res.hmspatientpaymentmaster.paymentdoneby,
            status: res.hmspatientpaymentmaster.status,
            statusdesc: res.hmspatientpaymentmaster.statusdesc,
        });
        this.hmspatientpaymentmasterservice.hmspatientpaymentdetails = res.hmspatientpaymentdetail;
        this.SethmspatientpaymentdetailsTableConfig();
        this.hmspatientpaymentdetailsLoadTable();
        setTimeout(() => {
            this.SethmspatientpaymentdetailsTableddConfig();
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.hmspatientpaymentmasterForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.hmspatientpaymentmasterservice.formData = this.hmspatientpaymentmasterForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.hmspatientpaymentmasterForm.controls[key] != null) {
                    this.hmspatientpaymentmasterservice.formData[key] = this.hmspatientpaymentmasterForm.controls[key]!.value;
                }
            }
        }
        this.hmspatientpaymentmasterservice.formData.paymentdate = new Date(this.ngbDateParserFormatter.format(this.hmspatientpaymentmasterForm.get('paymentdate')!.value) + '  UTC');
        this.hmspatientpaymentmasterservice.formData.DeletedhmspatientpaymentdetailIDs = this.DeletedhmspatientpaymentdetailIDs;
        console.log(this.hmspatientpaymentmasterservice.formData);
        this.hmspatientpaymentmasterservice.saveOrUpdatehmspatientpaymentmasters().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.hmspatientpaymentmasterservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.hmspatientpaymentmaster);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.hmspatientpaymentmasterForm.markAsUntouched();
                this.hmspatientpaymentmasterForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEdithmspatientpaymentdetail(event, paymentdetailid, paymentid) {
        this.dialog.open(hmspatientpaymentdetailComponent,
            {
                data: { paymentdetailid, paymentid, ScreenType: 2, visitid: this.hmspatientpaymentmasterForm.get('visitid')!.value, patientid: this.hmspatientpaymentmasterForm.get('patientid')!.value }
            }
        ).onClose.subscribe((res:any) => {
            if (paymentdetailid == null) {
                this.hmspatientpaymentdetailssource.add(res);
                this.hmspatientpaymentdetailssource.refresh();
            }
            else {
                this.hmspatientpaymentdetailssource.update(event.data, res);
            }
        });
    }
    onDeletehmspatientpaymentdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.DeletedhmspatientpaymentdetailIDs += childID + ",";
        this.hmspatientpaymentmasterservice.hmspatientpaymentdetails.splice(i, 1);
        //this.updateGrandTotal();
    }
    //start of Grid Codes hmspatientpaymentdetails
    hmspatientpaymentdetailssettings: any;
    hmspatientpaymentdetailssource: any;

    showhmspatientpaymentdetailsCheckbox() {
        debugger;
        if (this.tblhmspatientpaymentdetailssource.settings['selectMode'] == 'multi') this.tblhmspatientpaymentdetailssource.settings['selectMode'] = 'single';
        else
            this.tblhmspatientpaymentdetailssource.settings['selectMode'] = 'multi';
        this.tblhmspatientpaymentdetailssource.initGrid();
    }
    deletehmspatientpaymentdetailsAll() {
        this.tblhmspatientpaymentdetailssource.settings['selectMode'] = 'single';
    }
    showhmspatientpaymentdetailsFilter() {
        setTimeout(() => {
            this.SethmspatientpaymentdetailsTableddConfig();
        });
        if (this.tblhmspatientpaymentdetailssource.settings != null) this.tblhmspatientpaymentdetailssource.settings['hideSubHeader'] = !this.tblhmspatientpaymentdetailssource.settings['hideSubHeader'];
        this.tblhmspatientpaymentdetailssource.initGrid();
    }
    showhmspatientpaymentdetailsInActive() {
    }
    enablehmspatientpaymentdetailsInActive() {
    }
    async SethmspatientpaymentdetailsTableddConfig() {
        if (!this.bfilterPopulatehmspatientpaymentdetails) {

            this.configservice.getList("chargetype").then((res:any) => {
                var datachargetype2 = res as any;
                for (let i = 0; i < datachargetype2.length; i++) {
                    var obj = { value: datachargetype2[i].configkey, title: datachargetype2[i].configtext };
                    this.datahmspatientpaymentdetailschargetype3.push(obj);
                }
                var clone = this.clone(this.tblhmspatientpaymentdetailssource.settings);
                clone.columns['chargetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientpaymentdetailschargetype3)), }, };
                clone.columns['chargetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(this.datahmspatientpaymentdetailschargetype3)), }, };
                this.tblhmspatientpaymentdetailssource.settings = clone;
                this.tblhmspatientpaymentdetailssource.initGrid();
            });
        }
        this.bfilterPopulatehmspatientpaymentdetails = true;
    }
    async hmspatientpaymentdetailsbeforesave(event) {
        event.confirm.resolve(event.newData);



    }
    SethmspatientpaymentdetailsTableConfig() {
        this.hmspatientpaymentdetailssettings = {
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
                chargetype: {
                    title: 'Charge Type',
                    type: 'number',
                    filter: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    editor: { type: 'list', config: { selectText: 'Select...', list: [] }, },
                    valuePrepareFunction: (cell, row) => {
                        var element = this.datahmspatientpaymentdetailschargetype3.find(c => c!.value == cell);
                        if (element != null && element != undefined) {
                            return element.title;
                        }
                        return cell;
                    },
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
                total: {
                    title: 'total',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    hmspatientpaymentdetailsLoadTable() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientpaymentdetailsID) >= 0) {
            this.hmspatientpaymentdetailssource = new LocalDataSource();
            this.hmspatientpaymentdetailssource.load(this.hmspatientpaymentmasterservice.hmspatientpaymentdetails as any as LocalDataSource);
            this.hmspatientpaymentdetailssource.setPaging(1, 20, true);
        }
    }
    hmspatientpaymentdetailsroute(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdithmspatientpaymentdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdithmspatientpaymentdetail(event, event.data.paymentdetailid, this.formid);
                break;
            case 'delete':
                this.onDeletehmspatientpaymentdetail(event, event.data.paymentdetailid, ((this.hmspatientpaymentdetailssource.getPaging().page - 1) * this.hmspatientpaymentdetailssource.getPaging().perPage) + event.index);
                this.hmspatientpaymentdetailssource.refresh();
                break;
        }
    }
    hmspatientpaymentdetailsonDelete(obj) {
        let paymentdetailid = obj.data.paymentdetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.hmspatientpaymentmasterservice.deletehmspatientpaymentmaster(paymentdetailid).then((res:any) =>
                this.hmspatientpaymentdetailsLoadTable()
            );
        }
    }
    hmspatientpaymentdetailsPaging(val) {
        debugger;
        this.hmspatientpaymentdetailssource.setPaging(1, val, true);
    }
    handlehmspatientpaymentdetailsGridSelected(event) {
        this.hmspatientpaymentdetailsselectedindex = this.hmspatientpaymentmasterservice.hmspatientpaymentdetails.findIndex(i => i.paymentdetailid === event.data.paymentdetailid);
    }
    IshmspatientpaymentdetailsVisible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0  || this.ShowTableslist.indexOf(this.hmspatientpaymentdetailsID) >= 0) {
            return "tbl";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes hmspatientpaymentdetails

}



