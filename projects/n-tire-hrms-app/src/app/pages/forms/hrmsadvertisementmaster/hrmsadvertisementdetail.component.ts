import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hrmsadvertisementdetail } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsadvertisementdetail.model';
import { NgForm } from '@angular/forms';
import { hrmsadvertisementmasterService } from './../../../service/hrmsadvertisementmaster.service';
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
import { bouserrolemaster, IbouserrolemasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-hrmsadvertisementdetails',
    templateUrl: './hrmsadvertisementdetail.component.html',
    styles: []
})
export class hrmsadvertisementdetailComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hrmsadvertisementdetailForm: FormGroup;
    roleidList: bouserrolemaster[];
    mediatypeList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

    constructor(
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hrmsadvertisementmasterservice: hrmsadvertisementmasterService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private bouserrolemasterservice: bouserrolemasterService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.hrmsadvertisementdetailForm = this.fb.group({
            advertisementid: [null],
            detailid: [null],
            mprid: [null],
            roleid: [null],
            roleiddesc: [null],
            quantity: [null],
            media: [null],
            mediatype: [null],
            mediatypedesc: [null],
            fromdate: [null],
            todate: [null],
            details: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsadvertisementdetailForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.detailid != null && this.data.detailid != undefined) ppk = this.data.detailid;


        if (ppk == null) {
            this.hrmsadvertisementdetailForm.patchValue({
                fromdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                todate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.hrmsadvertisementmasterservice.hrmsadvertisementdetails.filter(x => x.detailid == ppk)[0];
            this.hrmsadvertisementdetailForm.patchValue({
                advertisementid: obj.advertisementid,
                detailid: obj.detailid,
                mprid: obj.mprid,
                roleid: obj.roleid,
                roleiddesc: obj.roleiddesc,
                quantity: obj.quantity,
                media: obj.media,
                mediatype: obj.mediatype,
                mediatypedesc: obj.mediatypedesc,
                fromdate: this.ngbDateParserFormatter.parse(obj.fromdate as any),
                todate: this.ngbDateParserFormatter.parse(obj.todate as any),
                details: obj.details,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.hrmsadvertisementdetailForm.get('attachment')!.value != "" && this.hrmsadvertisementdetailForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.hrmsadvertisementdetailForm.get('attachment')!.value);
        }
        this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => this.roleidList = res as bouserrolemaster[]);
        this.configservice.getList("mediatype").then((res:any) => this.mediatypeList = res as boconfigvalue[]);
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
        if (!this.hrmsadvertisementdetailForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hrmsadvertisementdetailForm!.value;
        obj.fromdate = this.ngbDateParserFormatter.format(this.hrmsadvertisementdetailForm.get('fromdate')!.value);
        obj.todate = this.ngbDateParserFormatter.format(this.hrmsadvertisementdetailForm.get('todate')!.value);
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
    roleidonChange(evt:any) {
        let e = evt!.value;
        this.hrmsadvertisementdetailForm.patchValue({ roleiddesc: evt.options[evt.options.selectedIndex].text });
    }
    mediatypeonChange(evt:any) {
        let e = evt!.value;
        this.hrmsadvertisementdetailForm.patchValue({ mediatypedesc: evt.options[evt.options.selectedIndex].text });
    }
    AddOrEditroleid(userroleid) {
        let ScreenType = '2';
        /*this.dialog.open(bouserrolemasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => this.roleidList = res as bouserrolemaster[]);
        });*/
    }


}


