import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { erpsalesorderpaymentterm } from '../../../../../../n-tire-procurement-app/src/app/model/erpsalesorderpaymentterm.model';
import { NgForm } from '@angular/forms';
import { erpsalesordermasterService } from '../../../../../../n-tire-procurement-app/src/app/service/erpsalesordermaster.service';
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
    selector: 'app-erpsalesorderpaymentterms',
    templateUrl: './erpsalesorderpaymentterm.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class erpsalesorderpaymenttermComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    formid: any;
    erpsalesorderpaymenttermForm: FormGroup;
    paymenttermtypeList: boconfigvalue[]=[];
    currencyList: boconfigvalue[]=[];
    formdata: any;
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    showformtype: any;
    data: any;
    SESSIONUSERID: any;

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private erpsalesordermasterservice: erpsalesordermasterService,
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
        this.erpsalesorderpaymenttermForm = this.fb.group({
            paytermid: [null],
            soid: [null],
            versionnumber: [null],
            paymenttermtype: [null],
            paymenttermtypedesc: [null],
            percentage: [null],
            description: [null],
            currency: [null],
            currencydesc: [null],
            amount: [null],
            remarks: [null],
            arid: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.erpsalesorderpaymenttermForm.controls; }


    async ngOnInit() {
        let sessiondata = this.sessionService.getSession();
        if (sessiondata != null) {
            this.SESSIONUSERID = sessiondata.userid;
        }

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.paytermid != null && this.data.paytermid != undefined) ppk = this.data.paytermid;
        if (this.data.customerid != null && this.data.customerid != undefined) this.erpsalesorderpaymenttermForm.patchValue({ customerid: this.data.customerid });
        if (this.data != null) {
            for (let key in this.data) {

                if (key != 'visiblelist' && key != 'hidelist') {
                    let json = JSON.parse('{"' + key + '": ' + this.data[key] + ' }');
                    if (this.erpsalesorderpaymenttermForm.controls[key] != null) {
                        this.erpsalesorderpaymenttermForm.patchValue(json);
                        this.erpsalesorderpaymenttermForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
        this.formid = ppk;

        if (ppk == null) {
            this.erpsalesorderpaymenttermForm.patchValue({
            });
        }
        else {
            let obj = this.erpsalesordermasterservice.erpsalesorderpaymentterms.filter(x => x.paytermid == ppk)[0];
            this.erpsalesorderpaymenttermForm.patchValue({
                paytermid: obj.paytermid,
                soid: obj.soid,
                versionnumber: obj.versionnumber,
                customerid: obj.customerid,
                paymenttermtype: obj.paymenttermtype,
                paymenttermtypedesc: obj.paymenttermtypedesc,
                percentage: obj.percentage,
                description: obj.description,
                currency: obj.currency,
                currencydesc: obj.currencydesc,
                amount: obj.amount,
                remarks: obj.remarks,
                arid: obj.arid,
                status: obj.status,
            });
        }
        this.configservice.getList("bool").then((res:any) => this.paymenttermtypeList = res as boconfigvalue[]);
        this.configservice.getList("currency").then((res:any) => this.currencyList = res as boconfigvalue[]);
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.erpsalesorderpaymenttermForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.erpsalesorderpaymenttermForm!.value;
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
    paymenttermtypeonChange(evt:any) {
        let e = evt!.value;
        this.erpsalesorderpaymenttermForm.patchValue({ paymenttermtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    currencyonChange(evt:any) {
        let e = evt!.value;
        this.erpsalesorderpaymenttermForm.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
    }

}


