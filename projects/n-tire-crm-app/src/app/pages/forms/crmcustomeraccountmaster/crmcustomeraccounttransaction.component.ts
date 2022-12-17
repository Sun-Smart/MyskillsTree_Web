import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { crmcustomeraccounttransaction } from './../../../model/crmcustomeraccounttransaction.model';
import { NgForm } from '@angular/forms';
import { crmcustomeraccountmasterService } from './../../../service/crmcustomeraccountmaster.service';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-crmcustomeraccounttransactions',
    templateUrl: './crmcustomeraccounttransaction.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class crmcustomeraccounttransactionComponent implements OnInit {
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    crmcustomeraccounttransactionForm: FormGroup;
    transactiontypeList: boconfigvalue[]=[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    customfieldjson: any;

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private crmcustomeraccountmasterservice: crmcustomeraccountmasterService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private customfieldservice: customfieldconfigurationService,
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
        this.crmcustomeraccounttransactionForm = this.fb.group({
            transactionid: [null],
            accountid: [null],
            customerid: [null],
            cifnumber: [null],
            accountnumber: [null],
            date: [null],
            description: [null],
            amount: [null],
            transactiontype: [null],
            transactiontypedesc: [null],
            closingbalance: [null],
            customfield: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.crmcustomeraccounttransactionForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.transactionid != null && this.data.transactionid != undefined) ppk = this.data.transactionid;


        if (ppk == null) {
            this.crmcustomeraccounttransactionForm.patchValue({
                date: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
            this.FillCustomField();
        }
        else {
            let obj = this.crmcustomeraccountmasterservice.crmcustomeraccounttransactions.filter(x => x.transactionid == ppk)[0];
            this.crmcustomeraccounttransactionForm.patchValue({
                transactionid: obj.transactionid,
                accountid: obj.accountid,
                customerid: obj.customerid,
                cifnumber: obj.cifnumber,
                accountnumber: obj.accountnumber,
                date: this.ngbDateParserFormatter.parse(obj.date as any),
                description: obj.description,
                amount: obj.amount,
                transactiontype: obj.transactiontype,
                transactiontypedesc: obj.transactiontypedesc,
                closingbalance: obj.closingbalance,
                customfield: obj.customfield,
                status: obj.status,
            });
            if (this.crmcustomeraccounttransactionForm.get('customfield').value != "" && this.crmcustomeraccounttransactionForm.get('customfield').value != null) this.customfieldjson = JSON.parse(this.crmcustomeraccounttransactionForm.get('customfield').value);
            this.FillCustomField();
        }
        this.configservice.getList("fatxntype").then((res:any) => this.transactiontypeList = res as boconfigvalue[]);
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.crmcustomeraccounttransactionForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.crmcustomeraccounttransactionForm.value;
        obj.date = this.ngbDateParserFormatter.format(this.crmcustomeraccounttransactionForm.get('date').value);
        obj.customfield = JSON.stringify(customfields);
        console.log(obj);
        this.dialogRef.close(obj);
    }

    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("crmcustomeraccounttransactions", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
            this.customfieldservicelist = res;
            return res;
        });


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
    transactiontypeonChange(evt:any) {
        let e = evt.value;
        this.crmcustomeraccounttransactionForm.patchValue({ transactiontypedesc: evt.options[evt.options.selectedIndex].text });
    }

}


