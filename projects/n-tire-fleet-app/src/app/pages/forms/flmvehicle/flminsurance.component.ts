import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { flminsurance } from './../../../model/flminsurance.model';
import { NgForm } from '@angular/forms';
import { flmvehicleService } from './../../../service/flmvehicle.service';
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
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-flminsurances',
    templateUrl: './flminsurance.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class flminsuranceComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    flminsuranceForm: FormGroup;
    coveragetypeList: boconfigvalue[]=[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private flmvehicleservice: flmvehicleService,
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
        this.flminsuranceForm = this.fb.group({
            insuranceid: [null],
            vehicleid: [null],
            insurancecompany: [null],
            policyid: [null],
            startdate: [null],
            expireddate: [null],
            coveragetype: [null],
            coveragetypedesc: [null],
            coverageamount: [null],
            attachment: [null],
            remarks: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.flminsuranceForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.insuranceid != null && this.data.insuranceid != undefined) ppk = this.data.insuranceid;


        if (ppk == null) {
            this.flminsuranceForm.patchValue({
                startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                expireddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.flmvehicleservice.flminsurances.filter(x => x.insuranceid == ppk)[0];
            this.flminsuranceForm.patchValue({
                insuranceid: obj.insuranceid,
                vehicleid: obj.vehicleid,
                insurancecompany: obj.insurancecompany,
                policyid: obj.policyid,
                startdate: this.ngbDateParserFormatter.parse(obj.startdate as any),
                expireddate: this.ngbDateParserFormatter.parse(obj.expireddate as any),
                coveragetype: obj.coveragetype,
                coveragetypedesc: obj.coveragetypedesc,
                coverageamount: obj.coverageamount,
                attachment: obj.attachment,
                remarks: obj.remarks,
                status: obj.status,
            });
            if (this.flminsuranceForm.get('attachment')!.value != "" && this.flminsuranceForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.flminsuranceForm.get('attachment')!.value);
        }
        this.configservice.getList("coveragetype").then((res:any) => this.coveragetypeList = res as boconfigvalue[]);
    }


    attachmentuploader(e:any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileattachmentlist.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
            max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentfieldjson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.flminsuranceForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.flminsuranceForm!.value;
        obj.startdate = this.ngbDateParserFormatter.format(this.flminsuranceForm.get('startdate')!.value);
        obj.expireddate = this.ngbDateParserFormatter.format(this.flminsuranceForm.get('expireddate')!.value);
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
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
    coveragetypeonChange(evt:any) {
        let e = evt!.value;
        this.flminsuranceForm.patchValue({ coveragetypedesc: evt.options[evt.options.selectedIndex].text });
    }

}


