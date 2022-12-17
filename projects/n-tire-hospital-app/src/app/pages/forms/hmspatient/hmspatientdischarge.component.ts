import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmspatientdischarge } from './../../../model/hmspatientdischarge.model';
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
import { bousermaster, IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-hmspatientdischarges',
    templateUrl: './hmspatientdischarge.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmspatientdischargeComponent implements OnInit {
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmspatientdischargeForm: FormGroup;
    doctoridList: bousermaster[];
    doctorid_bousermastersForm: FormGroup;
    doctorid_bousermastersoptions: any;
    doctorid_bousermastersformatter: any;
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
        private bousermasterservice: bousermasterService,
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
        this.hmspatientdischargeForm = this.fb.group({
            dischargeid: [null],
            patientid: [null],
            dischargedate: [null],
            dischargetime: [null],
            admitteddate: [null],
            staydays: [null],
            doctorid: [null],
            doctoriddesc: [null],
            finaldiagnosis: [null],
            patientcondition: [null],
            hospitalcourse: [null],
            notes: [null],
            admissiondetails: [null],
            treatment: [null],
            labnotes: [null],
            instructions: [null],
            issuetoaddress: [null],
            followup: [null],
            followupunit: [null],
            followupunitdesc: [null],
            followupstartdate: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmspatientdischargeForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.dischargeid != null && this.data.dischargeid != undefined) ppk = this.data.dischargeid;


        if (ppk == null) {
            this.hmspatientdischargeForm.patchValue({
                dischargedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                admitteddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                followupstartdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
            this.FillCustomField();
        }
        else {
            let obj = this.hmspatientservice.hmspatientdischarges.filter(x => x.dischargeid == ppk)[0];
            this.hmspatientdischargeForm.patchValue({
                dischargeid: obj.dischargeid,
                patientid: obj.patientid,
                dischargedate: this.ngbDateParserFormatter.parse(obj.dischargedate as any),
                dischargetime: obj.dischargetime,
                admitteddate: this.ngbDateParserFormatter.parse(obj.admitteddate as any),
                staydays: obj.staydays,
                doctorid: obj.doctorid,
                doctoriddesc: obj.doctoriddesc,
                finaldiagnosis: obj.finaldiagnosis,
                patientcondition: obj.patientcondition,
                hospitalcourse: obj.hospitalcourse,
                notes: obj.notes,
                admissiondetails: obj.admissiondetails,
                treatment: obj.treatment,
                labnotes: obj.labnotes,
                instructions: obj.instructions,
                issuetoaddress: obj.issuetoaddress,
                followup: obj.followup,
                followupunit: obj.followupunit,
                followupunitdesc: obj.followupunitdesc,
                followupstartdate: this.ngbDateParserFormatter.parse(obj.followupstartdate as any),
                customfield: obj.customfield,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.hmspatientdischargeForm.get('customfield')!.value != "" && this.hmspatientdischargeForm.get('customfield')!.value != null) this.customfieldjson = JSON.parse(this.hmspatientdischargeForm.get('customfield')!.value);
            this.FillCustomField();
            if (this.hmspatientdischargeForm.get('attachment')!.value != "" && this.hmspatientdischargeForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.hmspatientdischargeForm.get('attachment')!.value);
        }
        this.bousermasterservice.getbousermastersList().then((res:any) => this.doctoridList = res as bousermaster[]);
        this.doctorid_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.doctoridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.doctorid_bousermastersformatter = (result: any) => result.username;
        this.configservice.getList("frequency").then((res:any) => this.followupunitList = res as boconfigvalue[]);
    }

    onSelecteddoctorid(doctoridDetail: any) {
        if (doctoridDetail) {
            this.hmspatientdischargeForm.patchValue({ doctorid: doctoridDetail.item.userid });
            this.hmspatientdischargeForm.patchValue({ doctoriddesc: doctoridDetail.item.username });
            doctoridDetail.preventDefault();

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
        if (!this.hmspatientdischargeForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.hmspatientdischargeForm!.value;
        obj.dischargedate = this.ngbDateParserFormatter.format(this.hmspatientdischargeForm.get('dischargedate')!.value);
        obj.dischargetime = (this.hmspatientdischargeForm.get('dischargetime')!.value == null ? 0 : this.hmspatientdischargeForm.get('dischargetime')!.value.hour) + ':' + (this.hmspatientdischargeForm.get('dischargetime')!.value == null ? 0 : this.hmspatientdischargeForm.get('dischargetime')!.value.minute);
        obj.admitteddate = this.ngbDateParserFormatter.format(this.hmspatientdischargeForm.get('admitteddate')!.value);
        obj.followupstartdate = this.ngbDateParserFormatter.format(this.hmspatientdischargeForm.get('followupstartdate')!.value);
        obj.customfield = JSON.stringify(customfields);
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        this.dialogRef.close(obj);
    }

    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("hmspatientdischarges", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    }
    followupunitonChange(evt:any) {
        let e = evt!.value;
        this.hmspatientdischargeForm.patchValue({ followupunitdesc: evt.options[evt.options.selectedIndex].text });
    }
    AddOrEditdoctorid(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.doctoridList = res as bousermaster[]);
        });*/
    }


}


