import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmspatientpaymentdetail } from './../../../model/hmspatientpaymentdetail.model';
import { NgForm } from '@angular/forms';
import { hmspatientpaymentmasterService } from './../../../service/hmspatientpaymentmaster.service';
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
    selector: 'app-hmspatientpaymentdetails',
    templateUrl: './hmspatientpaymentdetail.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmspatientpaymentdetailComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmspatientpaymentdetailForm: FormGroup;
    chargetypeList: boconfigvalue[]=[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hmspatientpaymentmasterservice: hmspatientpaymentmasterService,
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
        this.hmspatientpaymentdetailForm = this.fb.group({
            paymentdetailid: [null],
            paymentid: [null],
            chargetype: [null],
            chargetypedesc: [null],
            details: [null],
            rate: [null],
            quantity: [null],
            total: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmspatientpaymentdetailForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.paymentdetailid != null && this.data.paymentdetailid != undefined) ppk = this.data.paymentdetailid;


        if (ppk == null) {
            this.hmspatientpaymentdetailForm.patchValue({
            });
        }
        else {
            let obj = this.hmspatientpaymentmasterservice.hmspatientpaymentdetails.filter(x => x.paymentdetailid == ppk)[0];
            this.hmspatientpaymentdetailForm.patchValue({
                paymentdetailid: obj.paymentdetailid,
                paymentid: obj.paymentid,
                visitid: obj.visitid,
                patientid: obj.patientid,
                chargetype: obj.chargetype,
                chargetypedesc: obj.chargetypedesc,
                details: obj.details,
                rate: obj.rate,
                quantity: obj.quantity,
                total: obj.total,
                status: obj.status,
            });
        }
        this.configservice.getList("chargetype").then((res:any) => this.chargetypeList = res as boconfigvalue[]);
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hmspatientpaymentdetailForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hmspatientpaymentdetailForm!.value;
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
    chargetypeonChange(evt:any) {
        let e = evt!.value;
        this.hmspatientpaymentdetailForm.patchValue({ chargetypedesc: evt.options[evt.options.selectedIndex].text });
    }

}


