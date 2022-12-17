import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { umsstudentfeemaster } from './../../../model/umsstudentfeemaster.model';
import { NgForm } from '@angular/forms';
import { umsstudentmasterService } from './../../../service/umsstudentmaster.service';
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
import { bofinancialyear, IbofinancialyearResponse } from '../../../../../../n-tire-bo-app/src/app/model/bofinancialyear.model';
import { bofinancialyearService } from '../../../../../../n-tire-bo-app/src/app/service/bofinancialyear.service';
import { umscourse, IumscourseResponse } from './../../../model/umscourse.model';
import { umscourseService } from './../../../service/umscourse.service';
import { umscoursesemester, IumscoursesemesterResponse } from './../../../model/umscoursesemester.model';
import { umscoursesemesterService } from './../../../service/umscoursesemester.service';
import { umsfeestructuremaster, IumsfeestructuremasterResponse } from './../../../model/umsfeestructuremaster.model';
import { umsfeestructuremasterService } from './../../../service/umsfeestructuremaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-umsstudentfeemasters',
    templateUrl: './umsstudentfeemaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class umsstudentfeemasterComponent implements OnInit {
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    umsstudentfeemasterForm: FormGroup;
    financialyearidList: bofinancialyear[];
    courseidList: umscourse[];
    semesteridList: umscoursesemester[];
    feestructureidList: umsfeestructuremaster[];
    paidtypeList: boconfigvalue[]=[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private umsstudentmasterservice: umsstudentmasterService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private bofinancialyearservice: bofinancialyearService,
        private umscourseservice: umscourseService,
        private umscoursesemesterservice: umscoursesemesterService,
        private umsfeestructuremasterservice: umsfeestructuremasterService,
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
        this.umsstudentfeemasterForm = this.fb.group({
            studentfeeid: [null],
            studentid: [null],
            financialyearid: [null],
            financialyeariddesc: [null],
            courseid: [null],
            courseiddesc: [null],
            semesterid: [null],
            semesteriddesc: [null],
            feestructureid: [null],
            feestructureiddesc: [null],
            totalfee: [null],
            startdate: [null],
            enddate: [null],
            paid: [null],
            paiddate: [null],
            paidtype: [null],
            paidtypedesc: [null],
            chequeno: [null],
            chequedate: [null],
            bankname: [null],
            transactionid: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umsstudentfeemasterForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.studentfeeid != null && this.data.studentfeeid != undefined) ppk = this.data.studentfeeid;


        if (ppk == null) {
            this.umsstudentfeemasterForm.patchValue({
                startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                enddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                paiddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                chequedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
            this.FillCustomField();
        }
        else {
            let obj = this.umsstudentmasterservice.umsstudentfeemasters.filter(x => x.studentfeeid == ppk)[0];
            this.umsstudentfeemasterForm.patchValue({
                studentfeeid: obj.studentfeeid,
                studentid: obj.studentid,
                financialyearid: obj.financialyearid,
                financialyeariddesc: obj.financialyeariddesc,
                courseid: obj.courseid,
                courseiddesc: obj.courseiddesc,
                semesterid: obj.semesterid,
                semesteriddesc: obj.semesteriddesc,
                feestructureid: obj.feestructureid,
                feestructureiddesc: obj.feestructureiddesc,
                totalfee: obj.totalfee,
                startdate: this.ngbDateParserFormatter.parse(obj.startdate as any),
                enddate: this.ngbDateParserFormatter.parse(obj.enddate as any),
                paid: obj.paid,
                paiddate: this.ngbDateParserFormatter.parse(obj.paiddate as any),
                paidtype: obj.paidtype,
                paidtypedesc: obj.paidtypedesc,
                chequeno: obj.chequeno,
                chequedate: this.ngbDateParserFormatter.parse(obj.chequedate as any),
                bankname: obj.bankname,
                transactionid: obj.transactionid,
                customfield: obj.customfield,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.umsstudentfeemasterForm.get('customfield')!.value != "" && this.umsstudentfeemasterForm.get('customfield')!.value != null) this.customfieldjson = JSON.parse(this.umsstudentfeemasterForm.get('customfield')!.value);
            this.FillCustomField();
            if (this.umsstudentfeemasterForm.get('attachment')!.value != "" && this.umsstudentfeemasterForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.umsstudentfeemasterForm.get('attachment')!.value);
        }
        this.bofinancialyearservice.getbofinancialyearsList().then((res:any) => this.financialyearidList = res as bofinancialyear[]);
        this.umscourseservice.getumscoursesList().then((res:any) => this.courseidList = res as umscourse[]);
        this.umscoursesemesterservice.getumscoursesemestersList().then((res:any) => this.semesteridList = res as umscoursesemester[]);
        this.umsfeestructuremasterservice.getumsfeestructuremastersList().then((res:any) => this.feestructureidList = res as umsfeestructuremaster[]);
        this.configservice.getList("feepaidtype").then((res:any) => this.paidtypeList = res as boconfigvalue[]);
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
        if (!this.umsstudentfeemasterForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.umsstudentfeemasterForm!.value;
        obj.startdate = this.ngbDateParserFormatter.format(this.umsstudentfeemasterForm.get('startdate')!.value);
        obj.enddate = this.ngbDateParserFormatter.format(this.umsstudentfeemasterForm.get('enddate')!.value);
        obj.paiddate = this.ngbDateParserFormatter.format(this.umsstudentfeemasterForm.get('paiddate')!.value);
        obj.chequedate = this.ngbDateParserFormatter.format(this.umsstudentfeemasterForm.get('chequedate')!.value);
        obj.customfield = JSON.stringify(customfields);
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        this.dialogRef.close(obj);
    }

    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("umsstudentfeemasters", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    financialyearidonChange(evt:any) {
        let e = evt!.value;
        this.umsstudentfeemasterForm.patchValue({ financialyeariddesc: evt.options[evt.options.selectedIndex].text });
    }
    courseidonChange(evt:any) {
        let e = evt!.value;
        this.umsstudentfeemasterForm.patchValue({ courseiddesc: evt.options[evt.options.selectedIndex].text });
    }
    semesteridonChange(evt:any) {
        let e = evt!.value;
        this.umsstudentfeemasterForm.patchValue({ semesteriddesc: evt.options[evt.options.selectedIndex].text });
    }
    feestructureidonChange(evt:any) {
        let e = evt!.value;
        this.umsstudentfeemasterForm.patchValue({ feestructureiddesc: evt.options[evt.options.selectedIndex].text });
    }
    paidtypeonChange(evt:any) {
        let e = evt!.value;
        this.umsstudentfeemasterForm.patchValue({ paidtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    AddOrEditfinancialyearid(finyearid) {
        let ScreenType = '2';
        /*this.dialog.open(bofinancialyearComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bofinancialyearservice.getbofinancialyearsList().then((res:any) => this.financialyearidList = res as bofinancialyear[]);
        });*/
    }

    AddOrEditcourseid(courseid) {
        let ScreenType = '2';
        /*this.dialog.open(umscourseComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umscourseservice.getumscoursesList().then((res:any) => this.courseidList = res as umscourse[]);
        });*/
    }

    AddOrEditsemesterid(semesterid) {
        let ScreenType = '2';
        /*this.dialog.open(umscoursesemesterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umscoursesemesterservice.getumscoursesemestersList().then((res:any) => this.semesteridList = res as umscoursesemester[]);
        });*/
    }

    AddOrEditfeestructureid(feeid) {
        let ScreenType = '2';
        /*this.dialog.open(umsfeestructuremasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.umsfeestructuremasterservice.getumsfeestructuremastersList().then((res:any) => this.feestructureidList = res as umsfeestructuremaster[]);
        });*/
    }


}


