import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmsreceipt } from './../../../model/hmsreceipt.model';
import { NgForm } from '@angular/forms';
import { hmspatientService } from './../../../service/hmspatient.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { hmsdoctor, IhmsdoctorResponse } from './../../../model/hmsdoctor.model';
import { hmsdoctorService } from './../../../service/hmsdoctor.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-hmsreceipts',
    templateUrl: './hmsreceipt.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmsreceiptComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmsreceiptForm: FormGroup;
    doctoridList: hmsdoctor[];
    paymentcategoryList: boconfigvalue[]=[];
    paymentmodeList: boconfigvalue[]=[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hmspatientservice: hmspatientService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private hmsdoctorservice: hmsdoctorService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.dialogRef.close(),
                preventDefault: true
            },
            {
                key: 'cmd s',
                command: () => this.onSubmitData(false),
                preventDefault: true
            },
            {
                key: 'cmd c',
                command: () => this.dialogRef.close(null),
                preventDefault: true
            }
        ]);
        this.hmsreceiptForm = this.fb.group({
            receiptid: [null],
            patientid: [null],
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


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.receiptid != null && this.data.receiptid != undefined) ppk = this.data.receiptid;


        if (ppk == null) {
            this.hmsreceiptForm.patchValue({
                receiptdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.hmspatientservice.hmsreceipts.filter(x => x.receiptid == ppk)[0];
            this.hmsreceiptForm.patchValue({
                receiptid: obj.receiptid,
                patientid: obj.patientid,
                doctorid: obj.doctorid,
                doctoriddesc: obj.doctoriddesc,
                receiptcode: obj.receiptcode,
                receiptdate: this.ngbDateParserFormatter.parse(obj.receiptdate as any),
                receipttime: obj.receipttime,
                paymentcategory: obj.paymentcategory,
                paymentcategorydesc: obj.paymentcategorydesc,
                outstandingamount: obj.outstandingamount,
                paymentmode: obj.paymentmode,
                paymentmodedesc: obj.paymentmodedesc,
                paidamount: obj.paidamount,
                reference: obj.reference,
                status: obj.status,
            });
        }
        this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => this.doctoridList = res as hmsdoctor[]);
        this.configservice.getList("paymentcategory").then((res:any) => this.paymentcategoryList = res as boconfigvalue[]);
        this.configservice.getList("paymentmode").then((res:any) => this.paymentmodeList = res as boconfigvalue[]);
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hmsreceiptForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hmsreceiptForm!.value;
        obj.receiptdate = this.ngbDateParserFormatter.format(this.hmsreceiptForm.get('receiptdate')!.value);
        obj.receipttime = (this.hmsreceiptForm.get('receipttime')!.value == null ? 0 : this.hmsreceiptForm.get('receipttime')!.value.hour) + ':' + (this.hmsreceiptForm.get('receipttime')!.value == null ? 0 : this.hmsreceiptForm.get('receipttime')!.value.minute);
        console.log(obj);
        this.dialogRef.close(obj);
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


