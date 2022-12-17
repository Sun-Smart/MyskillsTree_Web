import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmsestimatedetail } from './../../../model/hmsestimatedetail.model';
import { NgForm } from '@angular/forms';
import { hmsestimateService } from './../../../service/hmsestimate.service';
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
import currencyToSymbolMap from 'currency-symbol-map/map'
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-hmsestimatedetails',
    templateUrl: './hmsestimatedetail.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmsestimatedetailComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    currencyToSymbolMap1: any;
    currencyToSymbolMap2: any;
    hmsestimatedetailForm: FormGroup;
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hmsestimateservice: hmsestimateService,
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
        this.hmsestimatedetailForm = this.fb.group({
            estimatedetailid: [null],
            estimateid: [null],
            code: [null],
            details: [null],
            rate: [null],
            quantity: [null],
            totalamount: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmsestimatedetailForm.controls; }


    async ngOnInit() {
        this.currencyToSymbolMap2 = currencyToSymbolMap;
        this.currencyToSymbolMap1 = (Object.entries(currencyToSymbolMap));
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.estimatedetailid != null && this.data.estimatedetailid != undefined) ppk = this.data.estimatedetailid;


        if (ppk == null) {
            this.hmsestimatedetailForm.patchValue({
            });
        }
        else {
            let obj = this.hmsestimateservice.hmsestimatedetails.filter(x => x.estimatedetailid == ppk)[0];
            this.hmsestimatedetailForm.patchValue({
                estimatedetailid: obj.estimatedetailid,
                estimateid: obj.estimateid,
                patientid: obj.patientid,
                code: obj.code,
                details: obj.details,
                rate: obj.rate,
                quantity: obj.quantity,
                totalamount: obj.totalamount,
                status: obj.status,
            });
        }
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hmsestimatedetailForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hmsestimatedetailForm!.value;
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


