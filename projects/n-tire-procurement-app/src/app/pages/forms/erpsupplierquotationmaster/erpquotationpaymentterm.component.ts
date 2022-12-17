import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { erpquotationpaymentterm } from '../../../../../../n-tire-procurement-app/src/app/model/erpquotationpaymentterm.model';
import { NgForm } from '@angular/forms';
import { erpsupplierquotationmasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsupplierquotationmaster.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-erpquotationpaymentterms',
    templateUrl: './erpquotationpaymentterm.component.html',
    styles: []
})
export class erpquotationpaymenttermComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    erpquotationpaymenttermForm: FormGroup;
    paymenttermtypeList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;

    constructor(
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private erpsupplierquotationmasterservice: erpsupplierquotationmasterService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.erpquotationpaymenttermForm = this.fb.group({
            customerid: [null],
            rfqid: [null],
            quoteid: [null],
            paytermid: [null],
            paymenttermtype: [null],
            paymenttermtypedesc: [null],
            percentage: [null],
            description: [null],
            amount: [null],
            status: [null],
            statusdesc: [null],
            supplierid: [null],
        });
    }
    get f() { return this.erpquotationpaymenttermForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.paytermid != null && this.data.paytermid != undefined) ppk = this.data.paytermid;


        if (ppk == null) {
            this.erpquotationpaymenttermForm.patchValue({
            });
        }
        else {
            let obj = this.erpsupplierquotationmasterservice.erpquotationpaymentterms.filter(x => x.paytermid == ppk)[0];
            this.erpquotationpaymenttermForm.patchValue({
                //customerid:  obj.customerid,
                rfqid: obj.rfqid,
                quoteid: obj.quoteid,
                paytermid: obj.paytermid,
                paymenttermtype: obj.paymenttermtype,
                paymenttermtypedesc: obj.paymenttermtypedesc,
                percentage: obj.percentage,
                description: obj.description,
                amount: obj.amount,
                status: obj.status,
                supplierid: obj.supplierid,
            });
        }
        this.configservice.getList("paymentterm").then((res:any) => this.paymenttermtypeList = res as boconfigvalue[]);
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.erpquotationpaymenttermForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.erpquotationpaymenttermForm!.value;
        console.log(obj);
        this.dialogRef.close(obj);
    }

    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    paymenttermtypeonChange(evt:any) {
        let e = evt!.value;
        this.erpquotationpaymenttermForm.patchValue({ paymenttermtypedesc: evt.options[evt.options.selectedIndex].text });
    }

}


