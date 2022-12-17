import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmspatientvisit } from './../../../model/hmspatientvisit.model';
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
    selector: 'app-hmspatientvisits',
    templateUrl: './hmspatientvisit.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmspatientvisitComponent implements OnInit {
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmspatientvisitForm: FormGroup;
    previousdoctoridList: hmsdoctor[];
    followupunitList: boconfigvalue[]=[];
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
        this.hmspatientvisitForm = this.fb.group({
            visitid: [null],
            patientid: [null],
            referredbydoctor: [null],
            lastvisited: [null],
            previousdoctorid: [null],
            previousdoctoriddesc: [null],
            lastvisitcomplaint: [null],
            complaint: [null],
            symptoms: [null],
            examinationnotes: [null],
            medicalhistory: [null],
            treatmentadvised: [null],
            testadvised: [null],
            testresult: [null],
            diagnosis: [null],
            pressure: [null],
            pressureremarks: [null],
            pulse: [null],
            pulseremarks: [null],
            temperature: [null],
            temperatureremarks: [null],
            weight: [null],
            height: [null],
            doctorid: [null],
            complaintcause: [null],
            treatment: [null],
            instructions: [null],
            followupdays: [null],
            followupunit: [null],
            followupunitdesc: [null],
            remarks: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmspatientvisitForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.visitid != null && this.data.visitid != undefined) ppk = this.data.visitid;


        if (ppk == null) {
            this.hmspatientvisitForm.patchValue({
                lastvisited: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
            this.FillCustomField();
        }
        else {
            let obj = this.hmspatientservice.hmspatientvisits.filter(x => x.visitid == ppk)[0];
            this.hmspatientvisitForm.patchValue({
                visitid: obj.visitid,
                patientid: obj.patientid,
                referredbydoctor: obj.referredbydoctor,
                lastvisited: this.ngbDateParserFormatter.parse(obj.lastvisited as any),
                previousdoctorid: obj.previousdoctorid,
                previousdoctoriddesc: obj.previousdoctoriddesc,
                lastvisitcomplaint: obj.lastvisitcomplaint,
                complaint: obj.complaint,
                symptoms: obj.symptoms,
                examinationnotes: obj.examinationnotes,
                medicalhistory: obj.medicalhistory,
                treatmentadvised: obj.treatmentadvised,
                testadvised: obj.testadvised,
                testresult: obj.testresult,
                diagnosis: obj.diagnosis,
                pressure: obj.pressure,
                pressureremarks: obj.pressureremarks,
                pulse: obj.pulse,
                pulseremarks: obj.pulseremarks,
                temperature: obj.temperature,
                temperatureremarks: obj.temperatureremarks,
                weight: obj.weight,
                height: obj.height,
                doctorid: obj.doctorid,
                complaintcause: obj.complaintcause,
                treatment: obj.treatment,
                instructions: obj.instructions,
                followupdays: obj.followupdays,
                followupunit: obj.followupunit,
                followupunitdesc: obj.followupunitdesc,
                remarks: obj.remarks,
                customfield: obj.customfield,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.hmspatientvisitForm.get('customfield')!.value != "" && this.hmspatientvisitForm.get('customfield')!.value != null) this.customfieldjson = JSON.parse(this.hmspatientvisitForm.get('customfield')!.value);
            this.FillCustomField();
            if (this.hmspatientvisitForm.get('attachment')!.value != "" && this.hmspatientvisitForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.hmspatientvisitForm.get('attachment')!.value);
        }
        this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => this.previousdoctoridList = res as hmsdoctor[]);
        this.configservice.getList("frequency").then((res:any) => this.followupunitList = res as boconfigvalue[]);
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
        if (!this.hmspatientvisitForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.hmspatientvisitForm!.value;
        obj.lastvisited = this.ngbDateParserFormatter.format(this.hmspatientvisitForm.get('lastvisited')!.value);
        obj.customfield = JSON.stringify(customfields);
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        this.dialogRef.close(obj);
    }

    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("hmspatientvisits", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    previousdoctoridonChange(evt:any) {
        let e = evt!.value;
        this.hmspatientvisitForm.patchValue({ previousdoctoriddesc: evt.options[evt.options.selectedIndex].text });
    }
    followupunitonChange(evt:any) {
        let e = evt!.value;
        this.hmspatientvisitForm.patchValue({ followupunitdesc: evt.options[evt.options.selectedIndex].text });
    }
    AddOrEditpreviousdoctorid(doctorid) {
        let ScreenType = '2';
        /*this.dialog.open(hmsdoctorComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => this.previousdoctoridList = res as hmsdoctor[]);
        });*/
    }


}


