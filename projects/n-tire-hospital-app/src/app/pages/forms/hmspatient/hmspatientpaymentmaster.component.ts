import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmspatientpaymentmaster } from './../../../model/hmspatientpaymentmaster.model';
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
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-hmspatientpaymentmasters',
    templateUrl: './hmspatientpaymentmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmspatientpaymentmasterComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmspatientpaymentmasterForm: FormGroup;
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


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.paymentid != null && this.data.paymentid != undefined) ppk = this.data.paymentid;


        if (ppk == null) {
            this.hmspatientpaymentmasterForm.patchValue({
                paymentdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.hmspatientservice.hmspatientpaymentmasters.filter(x => x.paymentid == ppk)[0];
            this.hmspatientpaymentmasterForm.patchValue({
                paymentid: obj.paymentid,
                visitid: obj.visitid,
                patientid: obj.patientid,
                doctorid: obj.doctorid,
                paymentcode: obj.paymentcode,
                paymentdate: this.ngbDateParserFormatter.parse(obj.paymentdate as any),
                totalamount: obj.totalamount,
                discountpercentage: obj.discountpercentage,
                discountamount: obj.discountamount,
                taxpercentage: obj.taxpercentage,
                taxamount: obj.taxamount,
                netamount: obj.netamount,
                paid: obj.paid,
                amountpaid: obj.amountpaid,
                paymentdoneby: obj.paymentdoneby,
                status: obj.status,
            });
        }
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hmspatientpaymentmasterForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hmspatientpaymentmasterForm!.value;
        obj.paymentdate = this.ngbDateParserFormatter.format(this.hmspatientpaymentmasterForm.get('paymentdate')!.value);
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

}


