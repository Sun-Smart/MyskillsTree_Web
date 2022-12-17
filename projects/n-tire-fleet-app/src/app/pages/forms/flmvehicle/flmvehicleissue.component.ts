import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { flmvehicleissue } from './../../../model/flmvehicleissue.model';
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
import { bousermaster, IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-flmvehicleissues',
    templateUrl: './flmvehicleissue.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class flmvehicleissueComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    flmvehicleissueForm: FormGroup;
    issuecategoryList: boconfigvalue[]=[];
    severityList: boconfigvalue[]=[];
    priorityList: boconfigvalue[]=[];
    reportedbyList: bousermaster[];
    reportedby_bousermastersForm: FormGroup;
    reportedby_bousermastersoptions: any;
    reportedby_bousermastersformatter: any;
    assignedtoList: bousermaster[];
    assignedto_bousermastersForm: FormGroup;
    assignedto_bousermastersoptions: any;
    assignedto_bousermastersformatter: any;
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
        private bousermasterservice: bousermasterService,
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
        this.flmvehicleissueForm = this.fb.group({
            issueid: [null],
            description: [null],
            vehicleid: [null],
            issuedate: [null],
            detaildescription: [null],
            odometer: [null],
            issuecategory: [null],
            issuecategorydesc: [null],
            severity: [null],
            severitydesc: [null],
            priority: [null],
            prioritydesc: [null],
            reportedby: [null],
            reportedbydesc: [null],
            assignedto: [null],
            assignedtodesc: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.flmvehicleissueForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.issueid != null && this.data.issueid != undefined) ppk = this.data.issueid;


        if (ppk == null) {
            this.flmvehicleissueForm.patchValue({
                issuedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.flmvehicleservice.flmvehicleissues.filter(x => x.issueid == ppk)[0];
            this.flmvehicleissueForm.patchValue({
                issueid: obj.issueid,
                description: obj.description,
                vehicleid: obj.vehicleid,
                issuedate: this.ngbDateParserFormatter.parse(obj.issuedate as any),
                detaildescription: obj.detaildescription,
                odometer: obj.odometer,
                issuecategory: obj.issuecategory,
                issuecategorydesc: obj.issuecategorydesc,
                severity: obj.severity,
                severitydesc: obj.severitydesc,
                priority: obj.priority,
                prioritydesc: obj.prioritydesc,
                reportedby: obj.reportedby,
                reportedbydesc: obj.reportedbydesc,
                assignedto: obj.assignedto,
                assignedtodesc: obj.assignedtodesc,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.flmvehicleissueForm.get('attachment')!.value != "" && this.flmvehicleissueForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.flmvehicleissueForm.get('attachment')!.value);
        }
        this.configservice.getList("issuecategory").then((res:any) => this.issuecategoryList = res as boconfigvalue[]);
        this.configservice.getList("severity").then((res:any) => this.severityList = res as boconfigvalue[]);
        this.configservice.getList("priority").then((res:any) => this.priorityList = res as boconfigvalue[]);
        this.bousermasterservice.getbousermastersList().then((res:any) => this.reportedbyList = res as bousermaster[]);
        this.reportedby_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.reportedbyList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.reportedby_bousermastersformatter = (result: any) => result.username;
        this.bousermasterservice.getbousermastersList().then((res:any) => this.assignedtoList = res as bousermaster[]);
        this.assignedto_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.assignedtoList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.assignedto_bousermastersformatter = (result: any) => result.username;
    }

    onSelectedreportedby(reportedbyDetail: any) {
        if (reportedbyDetail) {
            this.flmvehicleissueForm.patchValue({ reportedby: reportedbyDetail.item.userid });
            this.flmvehicleissueForm.patchValue({ reportedbydesc: reportedbyDetail.item.username });
            reportedbyDetail.preventDefault();

        }
    }

    onSelectedassignedto(assignedtoDetail: any) {
        if (assignedtoDetail) {
            this.flmvehicleissueForm.patchValue({ assignedto: assignedtoDetail.item.userid });
            this.flmvehicleissueForm.patchValue({ assignedtodesc: assignedtoDetail.item.username });
            assignedtoDetail.preventDefault();

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
        if (!this.flmvehicleissueForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.flmvehicleissueForm!.value;
        obj.issuedate = this.ngbDateParserFormatter.format(this.flmvehicleissueForm.get('issuedate')!.value);
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
    issuecategoryonChange(evt:any) {
        let e = evt!.value;
        this.flmvehicleissueForm.patchValue({ issuecategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    severityonChange(evt:any) {
        let e = evt!.value;
        this.flmvehicleissueForm.patchValue({ severitydesc: evt.options[evt.options.selectedIndex].text });
    }
    priorityonChange(evt:any) {
        let e = evt!.value;
        this.flmvehicleissueForm.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    reportedbyonChange(evt:any) {
        let e = evt!.value;
    }
    assignedtoonChange(evt:any) {
        let e = evt!.value;
    }
    AddOrEditreportedby(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.reportedbyList = res as bousermaster[]);
        });*/
    }

    AddOrEditassignedto(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.assignedtoList = res as bousermaster[]);
        });*/
    }


}


