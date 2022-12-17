import { hmspaymentService } from './../../../service/hmspayment.service';
import { hmspayment } from './../../../model/hmspayment.model';
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
import { erpfaaccountmaster } from '../../../../../../n-tire-procurement-app/src/app/model/erpfaaccountmaster.model';
import { erpfaaccountmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpfaaccountmaster.service';
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
    selector: 'app-hmspayment',
    templateUrl: './hmspayment.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class hmspaymentComponent implements OnInit {
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
    bfilterPopulatehmspayments: boolean = false;
    datahmspaymentsdebitaccountid3: any = [];
    datahmspaymentscreditaccountid3: any = [];
    datahmspaymentspaymentmode3: any = [];
    hmspaymentForm: FormGroup;
    debitaccountidList: erpfaaccountmaster[];
    debitaccountid_erpfaaccountmastersForm: FormGroup;
    debitaccountid_erpfaaccountmastersoptions: any;
    debitaccountid_erpfaaccountmastersformatter: any;
    creditaccountidList: erpfaaccountmaster[];
    creditaccountid_erpfaaccountmastersForm: FormGroup;
    creditaccountid_erpfaaccountmastersoptions: any;
    creditaccountid_erpfaaccountmastersformatter: any;
    paymentmodeList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hmspaymentservice: hmspaymentService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private erpfaaccountmasterservice: erpfaaccountmasterService,
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
        this.hmspaymentForm = this.fb.group({
            paymentid: [null],
            paymentreference: [null],
            debitaccountid: [null],
            debitaccountiddesc: [null],
            creditaccountid: [null],
            creditaccountiddesc: [null],
            transactionamount: [null],
            paymentmode: [null],
            paymentmodedesc: [null],
            narration: [null],
            notes: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmspaymentForm.controls; }

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
        if (this.hmspaymentForm.dirty && this.hmspaymentForm.touched) {
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
        let hmspayment = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.paymentid != null) {
            hmspayment = this.data.paymentid;
        }
        else
            hmspayment = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hmspayment;
        //this.sharedService.alert(hmspayment);
        if (hmspayment == null) {
            this.resetForm();
        }
        else {
            this.PopulateScreen(hmspayment);
        }
        this.erpfaaccountmasterservice.geterpfaaccountmastersList().then((res:any) => this.debitaccountidList = res as erpfaaccountmaster[]);
        this.debitaccountid_erpfaaccountmastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.debitaccountidList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.debitaccountid_erpfaaccountmastersformatter = (result: any) => result.accountname;
        this.erpfaaccountmasterservice.geterpfaaccountmastersList().then((res:any) => this.creditaccountidList = res as erpfaaccountmaster[]);
        this.creditaccountid_erpfaaccountmastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.creditaccountidList.filter(v => v.accountname.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.creditaccountid_erpfaaccountmastersformatter = (result: any) => result.accountname;
        this.configservice.getList("paymentmode").then((res:any) => this.paymentmodeList = res as boconfigvalue[]);
        this.hmspaymentForm.markAsUntouched();
        this.hmspaymentForm.markAsPristine();
    }
    onSelecteddebitaccountid(debitaccountidDetail: any) {
        if (debitaccountidDetail) {
            this.hmspaymentForm.patchValue({ debitaccountid: debitaccountidDetail.item.accountid });
            this.hmspaymentForm.patchValue({ debitaccountiddesc: debitaccountidDetail.item.accountname });
            debitaccountidDetail.preventDefault();

        }
    }

    onSelectedcreditaccountid(creditaccountidDetail: any) {
        if (creditaccountidDetail) {
            this.hmspaymentForm.patchValue({ creditaccountid: creditaccountidDetail.item.accountid });
            this.hmspaymentForm.patchValue({ creditaccountiddesc: creditaccountidDetail.item.accountname });
            creditaccountidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hmspaymentForm != null)
            this.hmspaymentForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hmspaymentForm.controls[key] != null) {
                    this.hmspaymentForm.patchValue(json);
                    this.hmspaymentForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let paymentid = this.hmspaymentForm.get('paymentid')!.value;
        if (paymentid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hmspaymentservice.deletehmspayment(paymentid).then((res:any) => {
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
        this.hmspaymentForm.patchValue({
            paymentid: null
        });
        this.hmspaymentservice.formData.paymentid = null;
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
    debitaccountidonChange(evt:any) {
        let e = evt!.value;
    }
    creditaccountidonChange(evt:any) {
        let e = evt!.value;
    }
    paymentmodeonChange(evt:any) {
        let e = evt!.value;
        this.hmspaymentForm.patchValue({ paymentmodedesc: evt.options[evt.options.selectedIndex].text });
    }
    PopulateScreen(hmspayment: any) {
        this.hmspaymentservice.gethmspaymentsByID(parseInt(hmspayment)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hmspaymentForm.patchValue({
            paymentid: res.hmspayment.paymentid,
            paymentreference: res.hmspayment.paymentreference,
            debitaccountid: res.hmspayment.debitaccountid,
            debitaccountiddesc: res.hmspayment.debitaccountiddesc,
            creditaccountid: res.hmspayment.creditaccountid,
            creditaccountiddesc: res.hmspayment.creditaccountiddesc,
            transactionamount: res.hmspayment.transactionamount,
            paymentmode: res.hmspayment.paymentmode,
            paymentmodedesc: res.hmspayment.paymentmodedesc,
            narration: res.hmspayment.narration,
            notes: res.hmspayment.notes,
            status: res.hmspayment.status,
            statusdesc: res.hmspayment.statusdesc,
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.hmspaymentForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.hmspaymentservice.formData = this.hmspaymentForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.hmspaymentForm.controls[key] != null) {
                    this.hmspaymentservice.formData[key] = this.hmspaymentForm.controls[key]!.value;
                }
            }
        }
        console.log(this.hmspaymentservice.formData);
        this.hmspaymentservice.saveOrUpdatehmspayments().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.hmspaymentservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.hmspayment);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.hmspaymentForm.markAsUntouched();
                this.hmspaymentForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditdebitaccountid(accountid) {
        let ScreenType = '2';
        /*this.dialog.open(erpfaaccountmasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.erpfaaccountmasterservice.geterpfaaccountmastersList().then((res:any) => this.debitaccountidList = res as erpfaaccountmaster[]);
        });*/
    }

    AddOrEditcreditaccountid(accountid) {
        let ScreenType = '2';
        /*this.dialog.open(erpfaaccountmasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.erpfaaccountmasterservice.geterpfaaccountmastersList().then((res:any) => this.creditaccountidList = res as erpfaaccountmaster[]);
        });*/
    }


}



