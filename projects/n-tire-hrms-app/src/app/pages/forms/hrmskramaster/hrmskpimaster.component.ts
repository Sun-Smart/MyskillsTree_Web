import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hrmskpimaster } from '../../../../../../n-tire-hrms-app/src/app/model/hrmskpimaster.model';
import { NgForm } from '@angular/forms';
import { hrmskramasterService } from './../../../service/hrmskramaster.service';
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
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-hrmskpimasters',
    templateUrl: './hrmskpimaster.component.html',
    styles: []
})
export class hrmskpimasterComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hrmskpimasterForm: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

    constructor(
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hrmskramasterservice: hrmskramasterService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.hrmskpimasterForm = this.fb.group({
            kraid: [null],
            kpiid: [null],
            kpidescription: [null],
            weightagepercent: [null],
            expectedvalue: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmskpimasterForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.kpiid != null && this.data.kpiid != undefined) ppk = this.data.kpiid;


        if (ppk == null) {
            this.hrmskpimasterForm.patchValue({
            });
        }
        else {
            let obj = this.hrmskramasterservice.hrmskpimasters.filter(x => x.kpiid == ppk)[0];
            this.hrmskpimasterForm.patchValue({
                kraid: obj.kraid,
                kpiid: obj.kpiid,
                kpidescription: obj.kpidescription,
                weightagepercent: obj.weightagepercent,
                expectedvalue: obj.expectedvalue,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.hrmskpimasterForm.get('attachment')!.value != "" && this.hrmskpimasterForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.hrmskpimasterForm.get('attachment')!.value);
        }
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
        if (!this.hrmskpimasterForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hrmskpimasterForm!.value;
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        this.dialogRef.close(obj);
    }

    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }

}


