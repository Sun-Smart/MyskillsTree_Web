import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmswardround } from './../../../model/hmswardround.model';
import { NgForm } from '@angular/forms';
import { hmswardService } from './../../../service/hmsward.service';
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
import { hmspatient, IhmspatientResponse } from './../../../model/hmspatient.model';
import { hmspatientService } from './../../../service/hmspatient.service';
import { hmsbed, IhmsbedResponse } from './../../../model/hmsbed.model';
import { hmsbedService } from './../../../service/hmsbed.service';
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
    selector: 'app-hmswardrounds',
    templateUrl: './hmswardround.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmswardroundComponent implements OnInit {
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmswardroundForm: FormGroup;
    doctoridList: hmsdoctor[];
    patientidList: hmspatient[];
    bedidList: hmsbed[];
    nurseidList: bousermaster[];
    nurseid_bousermastersForm: FormGroup;
    nurseid_bousermastersoptions: any;
    nurseid_bousermastersformatter: any;
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hmswardservice: hmswardService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private hmsdoctorservice: hmsdoctorService,
        private hmspatientservice: hmspatientService,
        private hmsbedservice: hmsbedService,
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
        this.hmswardroundForm = this.fb.group({
            wardroundid: [null],
            wardid: [null],
            doctorid: [null],
            doctoriddesc: [null],
            doctorname: [null],
            patientid: [null],
            patientiddesc: [null],
            bedid: [null],
            bediddesc: [null],
            nurseid: [null],
            nurseiddesc: [null],
            visitdate: [null],
            visittime: [null],
            postoperationday: [null],
            symptoms: [null],
            examinations: [null],
            instructions: [null],
            assessment: [null],
            notes: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmswardroundForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.wardroundid != null && this.data.wardroundid != undefined) ppk = this.data.wardroundid;


        if (ppk == null) {
            this.hmswardroundForm.patchValue({
                visitdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
            this.FillCustomField();
        }
        else {
            let obj = this.hmswardservice.hmswardrounds.filter(x => x.wardroundid == ppk)[0];
            this.hmswardroundForm.patchValue({
                wardroundid: obj.wardroundid,
                wardid: obj.wardid,
                doctorid: obj.doctorid,
                doctoriddesc: obj.doctoriddesc,
                doctorname: obj.doctorname,
                patientid: obj.patientid,
                patientiddesc: obj.patientiddesc,
                bedid: obj.bedid,
                bediddesc: obj.bediddesc,
                nurseid: obj.nurseid,
                nurseiddesc: obj.nurseiddesc,
                visitdate: this.ngbDateParserFormatter.parse(obj.visitdate as any),
                visittime: obj.visittime,
                postoperationday: obj.postoperationday,
                symptoms: obj.symptoms,
                examinations: obj.examinations,
                instructions: obj.instructions,
                assessment: obj.assessment,
                notes: obj.notes,
                customfield: obj.customfield,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.hmswardroundForm.get('customfield')!.value != "" && this.hmswardroundForm.get('customfield')!.value != null) this.customfieldjson = JSON.parse(this.hmswardroundForm.get('customfield')!.value);
            this.FillCustomField();
            if (this.hmswardroundForm.get('attachment')!.value != "" && this.hmswardroundForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.hmswardroundForm.get('attachment')!.value);
        }
        this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => this.doctoridList = res as hmsdoctor[]);
        this.hmspatientservice.gethmspatientsList().then((res:any) => this.patientidList = res as hmspatient[]);
        this.hmsbedservice.gethmsbedsList().then((res:any) => this.bedidList = res as hmsbed[]);
        this.bousermasterservice.getbousermastersList().then((res:any) => this.nurseidList = res as bousermaster[]);
        this.nurseid_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.nurseidList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.nurseid_bousermastersformatter = (result: any) => result.username;
    }

    onSelectednurseid(nurseidDetail: any) {
        if (nurseidDetail) {
            this.hmswardroundForm.patchValue({ nurseid: nurseidDetail.item.userid });
            this.hmswardroundForm.patchValue({ nurseiddesc: nurseidDetail.item.username });
            nurseidDetail.preventDefault();

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
        if (!this.hmswardroundForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.hmswardroundForm!.value;
        obj.visitdate = this.ngbDateParserFormatter.format(this.hmswardroundForm.get('visitdate')!.value);
        obj.visittime = (this.hmswardroundForm.get('visittime')!.value == null ? 0 : this.hmswardroundForm.get('visittime')!.value.hour) + ':' + (this.hmswardroundForm.get('visittime')!.value == null ? 0 : this.hmswardroundForm.get('visittime')!.value.minute);
        obj.customfield = JSON.stringify(customfields);
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        this.dialogRef.close(obj);
    }

    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("hmswardrounds", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
        this.hmswardroundForm.patchValue({ doctoriddesc: evt.options[evt.options.selectedIndex].text });
    }
    patientidonChange(evt:any) {
        let e = evt!.value;
        this.hmswardroundForm.patchValue({ patientiddesc: evt.options[evt.options.selectedIndex].text });
    }
    bedidonChange(evt:any) {
        let e = evt!.value;
        this.hmswardroundForm.patchValue({ bediddesc: evt.options[evt.options.selectedIndex].text });
    }
    nurseidonChange(evt:any) {
        let e = evt!.value;
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

    AddOrEditpatientid(patientid) {
        let ScreenType = '2';
        /*this.dialog.open(hmspatientComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hmspatientservice.gethmspatientsList().then((res:any) => this.patientidList = res as hmspatient[]);
        });*/
    }

    AddOrEditbedid(bedid) {
        let ScreenType = '2';
        /*this.dialog.open(hmsbedComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hmsbedservice.gethmsbedsList().then((res:any) => this.bedidList = res as hmsbed[]);
        });*/
    }

    AddOrEditnurseid(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.nurseidList = res as bousermaster[]);
        });*/
    }


}


