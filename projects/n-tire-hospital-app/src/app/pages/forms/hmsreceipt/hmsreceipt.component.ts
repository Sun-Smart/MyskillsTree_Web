import { hmsreceiptService } from './../../../service/hmsreceipt.service';
import { hmsreceipt } from './../../../model/hmsreceipt.model';
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
import { hmspatient } from './../../../model/hmspatient.model';
import { hmspatientService } from './../../../service/hmspatient.service';
import { hmsdoctor } from './../../../model/hmsdoctor.model';
import { hmsdoctorService } from './../../../service/hmsdoctor.service';
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
    selector: 'app-hmsreceipt',
    templateUrl: './hmsreceipt.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class hmsreceiptComponent implements OnInit {
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
    bfilterPopulatehmsreceipts: boolean = false;
    datahmsreceiptspatientid3: any = [];
    datahmsreceiptsdoctorid3: any = [];
    datahmsreceiptspaymentcategory3: any = [];
    datahmsreceiptspaymentmode3: any = [];
    hmsreceiptForm: FormGroup;
    patientidList: hmspatient[];
    doctoridList: hmsdoctor[];
    paymentcategoryList: boconfigvalue[]=[];
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
        private hmsreceiptservice: hmsreceiptService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private hmspatientservice: hmspatientService,
        private hmsdoctorservice: hmsdoctorService,
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
        this.hmsreceiptForm = this.fb.group({
            receiptid: [null],
            patientid: [null],
            patientiddesc: [null],
            doctorid: [null],
            doctoriddesc: [null],
            receiptcode: [null],
            receiptdate: [null],
            receipttime: [null],
            paymentcategory: [null],
            paymentcategorydesc: [null],
            outstandingamount: [null],
            paymentmode: [null],
            paymentmodedesc: [null],
            paidamount: [null],
            reference: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmsreceiptForm.controls; }

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
        if (this.hmsreceiptForm.dirty && this.hmsreceiptForm.touched) {
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
        let hmsreceipt = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.receiptid != null) {
            hmsreceipt = this.data.receiptid;
        }
        else
            hmsreceipt = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hmsreceipt;
        //this.sharedService.alert(hmsreceipt);
        if (hmsreceipt == null) {
            this.resetForm();
        }
        else {
            this.PopulateScreen(hmsreceipt);
        }
        this.hmspatientservice.gethmspatientsList().then((res:any) => this.patientidList = res as hmspatient[]);
        this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => this.doctoridList = res as hmsdoctor[]);
        this.configservice.getList("paymentcategory").then((res:any) => this.paymentcategoryList = res as boconfigvalue[]);
        this.configservice.getList("paymentmode").then((res:any) => this.paymentmodeList = res as boconfigvalue[]);
        this.hmsreceiptForm.markAsUntouched();
        this.hmsreceiptForm.markAsPristine();
    }



    resetForm() {
        if (this.hmsreceiptForm != null)
            this.hmsreceiptForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hmsreceiptForm.controls[key] != null) {
                    this.hmsreceiptForm.patchValue(json);
                    this.hmsreceiptForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let receiptid = this.hmsreceiptForm.get('receiptid')!.value;
        if (receiptid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hmsreceiptservice.deletehmsreceipt(receiptid).then((res:any) => {
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
        this.hmsreceiptForm.patchValue({
            receiptid: null
        });
        this.hmsreceiptservice.formData.receiptid = null;
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
    patientidonChange(evt:any) {
        let e = evt!.value;
        this.hmsreceiptForm.patchValue({ patientiddesc: evt.options[evt.options.selectedIndex].text });
    }
    doctoridonChange(evt:any) {
        let e = evt!.value;
        this.hmsreceiptForm.patchValue({ doctoriddesc: evt.options[evt.options.selectedIndex].text });
    }
    paymentcategoryonChange(evt:any) {
        let e = evt!.value;
        this.hmsreceiptForm.patchValue({ paymentcategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    paymentmodeonChange(evt:any) {
        let e = evt!.value;
        this.hmsreceiptForm.patchValue({ paymentmodedesc: evt.options[evt.options.selectedIndex].text });
    }
    PopulateScreen(hmsreceipt: any) {
        this.hmsreceiptservice.gethmsreceiptsByID(parseInt(hmsreceipt)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        var receipttimeTime = new Time(res.hmsreceipt.receipttime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hmsreceiptForm.patchValue({
            receiptid: res.hmsreceipt.receiptid,
            patientid: res.hmsreceipt.patientid,
            patientiddesc: res.hmsreceipt.patientiddesc,
            doctorid: res.hmsreceipt.doctorid,
            doctoriddesc: res.hmsreceipt.doctoriddesc,
            receiptcode: res.hmsreceipt.receiptcode,
            receiptdate: this.ngbDateParserFormatter.parse(res.hmsreceipt.receiptdate),
            receipttime: receipttimeTime,
            paymentcategory: res.hmsreceipt.paymentcategory,
            paymentcategorydesc: res.hmsreceipt.paymentcategorydesc,
            outstandingamount: res.hmsreceipt.outstandingamount,
            paymentmode: res.hmsreceipt.paymentmode,
            paymentmodedesc: res.hmsreceipt.paymentmodedesc,
            paidamount: res.hmsreceipt.paidamount,
            reference: res.hmsreceipt.reference,
            status: res.hmsreceipt.status,
            statusdesc: res.hmsreceipt.statusdesc,
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.hmsreceiptForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.hmsreceiptservice.formData = this.hmsreceiptForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.hmsreceiptForm.controls[key] != null) {
                    this.hmsreceiptservice.formData[key] = this.hmsreceiptForm.controls[key]!.value;
                }
            }
        }
        this.hmsreceiptservice.formData.receiptdate = new Date(this.ngbDateParserFormatter.format(this.hmsreceiptForm.get('receiptdate')!.value) + '  UTC');
        this.hmsreceiptservice.formData.receipttime = (this.hmsreceiptForm.get('receipttime')!.value == null ? 0 : this.hmsreceiptForm.get('receipttime')!.value.hour) + ':' + (this.hmsreceiptForm.get('receipttime')!.value == null ? 0 : this.hmsreceiptForm.get('receipttime')!.value.minute);
        console.log(this.hmsreceiptservice.formData);
        this.hmsreceiptservice.saveOrUpdatehmsreceipts().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.hmsreceiptservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.hmsreceipt);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.hmsreceiptForm.markAsUntouched();
                this.hmsreceiptForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditpatientid(patientid) {
        let ScreenType = '2';
        /*this.dialog.open(hmspatientComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hmspatientservice.gethmspatientsList().then((res:any) => this.patientidList = res as hmspatient[]);
        });*/
    }

    AddOrEditdoctorid(doctorid) {
        let ScreenType = '2';
        /*this.dialog.open(hmsdoctorComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => this.doctoridList = res as hmsdoctor[]);
        });*/
    }


}



