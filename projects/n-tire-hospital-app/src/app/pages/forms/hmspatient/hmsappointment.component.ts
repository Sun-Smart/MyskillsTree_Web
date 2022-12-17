import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmsappointment } from './../../../model/hmsappointment.model';
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
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-hmsappointments',
    templateUrl: './hmsappointment.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmsappointmentComponent implements OnInit {
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmsappointmentForm: FormGroup;
    doctoridList: hmsdoctor[];
    appointmenttypeList: boconfigvalue[]=[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

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
        this.hmsappointmentForm = this.fb.group({
            appointmentid: [null],
            patientid: [null],
            doctorid: [null],
            doctoriddesc: [null],
            appointmentdate: [null],
            appointmenttime: [null],
            appointmenttype: [null],
            appointmenttypedesc: [null],
            reason: [null],
            tokenno: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmsappointmentForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.appointmentid != null && this.data.appointmentid != undefined) ppk = this.data.appointmentid;


        if (ppk == null) {
            this.hmsappointmentForm.patchValue({
                appointmentdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
            this.FillCustomField();
        }
        else {
            let obj = this.hmspatientservice.hmsappointments.filter(x => x.appointmentid == ppk)[0];
            this.hmsappointmentForm.patchValue({
                appointmentid: obj.appointmentid,
                patientid: obj.patientid,
                doctorid: obj.doctorid,
                doctoriddesc: obj.doctoriddesc,
                appointmentdate: this.ngbDateParserFormatter.parse(obj.appointmentdate as any),
                appointmenttime: obj.appointmenttime,
                appointmenttype: obj.appointmenttype,
                appointmenttypedesc: obj.appointmenttypedesc,
                reason: obj.reason,
                tokenno: obj.tokenno,
                customfield: obj.customfield,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.hmsappointmentForm.get('customfield')!.value != "" && this.hmsappointmentForm.get('customfield')!.value != null) this.customfieldjson = JSON.parse(this.hmsappointmentForm.get('customfield')!.value);
            this.FillCustomField();
            if (this.hmsappointmentForm.get('attachment')!.value != "" && this.hmsappointmentForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.hmsappointmentForm.get('attachment')!.value);
        }
        this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => this.doctoridList = res as hmsdoctor[]);
        this.configservice.getList("appointmenttype").then((res:any) => this.appointmenttypeList = res as boconfigvalue[]);
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
        if (!this.hmsappointmentForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.hmsappointmentForm!.value;
        obj.appointmentdate = this.ngbDateParserFormatter.format(this.hmsappointmentForm.get('appointmentdate')!.value);
        obj.appointmenttime = (this.hmsappointmentForm.get('appointmenttime')!.value == null ? 0 : this.hmsappointmentForm.get('appointmenttime')!.value.hour) + ':' + (this.hmsappointmentForm.get('appointmenttime')!.value == null ? 0 : this.hmsappointmentForm.get('appointmenttime')!.value.minute);
        obj.customfield = JSON.stringify(customfields);
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        this.dialogRef.close(obj);
    }

    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("hmsappointments", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    doctoridonChange(evt:any) {
        let e = evt!.value;
        this.hmsappointmentForm.patchValue({ doctoriddesc: evt.options[evt.options.selectedIndex].text });
    }
    appointmenttypeonChange(evt:any) {
        let e = evt!.value;
        this.hmsappointmentForm.patchValue({ appointmenttypedesc: evt.options[evt.options.selectedIndex].text });
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


