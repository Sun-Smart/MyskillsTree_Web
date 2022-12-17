import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hrmsodtravel } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsodtravel.model';
import { NgForm } from '@angular/forms';
import { hrmsodrequestService } from './../../../service/hrmsodrequest.service';
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
import { hrmsemployee, IhrmsemployeeResponse } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-hrmsodtravels',
    templateUrl: './hrmsodtravel.component.html',
    styles: []
})
export class hrmsodtravelComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hrmsodtravelForm: FormGroup;
    modeList: boconfigvalue[]=[];
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

    constructor(
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hrmsodrequestservice: hrmsodrequestService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private hrmsemployeeservice: hrmsemployeeService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.hrmsodtravelForm = this.fb.group({
            odid: [null],
            odtravelid: [null],
            traveldate: [null],
            mode: [null],
            modedesc: [null],
            fromdate: [null],
            todate: [null],
            remarks: [null],
            attachment: [null],
            traveldetails: [null],
            employeeid: [null],
            employeeiddesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsodtravelForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.odtravelid != null && this.data.odtravelid != undefined) ppk = this.data.odtravelid;


        if (ppk == null) {
            this.hrmsodtravelForm.patchValue({
                traveldate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                fromdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                todate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.hrmsodrequestservice.hrmsodtravels.filter(x => x.odtravelid == ppk)[0];
            this.hrmsodtravelForm.patchValue({
                odid: obj.odid,
                odtravelid: obj.odtravelid,
                traveldate: this.ngbDateParserFormatter.parse(obj.traveldate as any),
                mode: obj.mode,
                modedesc: obj.modedesc,
                fromdate: this.ngbDateParserFormatter.parse(obj.fromdate as any),
                todate: this.ngbDateParserFormatter.parse(obj.todate as any),
                remarks: obj.remarks,
                attachment: obj.attachment,
                traveldetails: obj.traveldetails,
                employeeid: obj.employeeid,
                employeeiddesc: obj.employeeiddesc,
                status: obj.status,
            });
            if (this.hrmsodtravelForm.get('attachment')!.value != "" && this.hrmsodtravelForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.hrmsodtravelForm.get('attachment')!.value);
        }
        this.configservice.getList("travelmode").then((res:any) => this.modeList = res as boconfigvalue[]);
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => this.employeeidList = res as hrmsemployee[]);
        this.employeeid_hrmsemployeesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.employeeidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.employeeid_hrmsemployeesformatter = (result: any) => result.employeename;
    }

    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.hrmsodtravelForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsodtravelForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

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
        if (!this.hrmsodtravelForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hrmsodtravelForm!.value;
        obj.traveldate = this.ngbDateParserFormatter.format(this.hrmsodtravelForm.get('traveldate')!.value);
        obj.fromdate = this.ngbDateParserFormatter.format(this.hrmsodtravelForm.get('fromdate')!.value);
        obj.todate = this.ngbDateParserFormatter.format(this.hrmsodtravelForm.get('todate')!.value);
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
    modeonChange(evt:any) {
        let e = evt!.value;
        this.hrmsodtravelForm.patchValue({ modedesc: evt.options[evt.options.selectedIndex].text });
    }
    employeeidonChange(evt:any) {
        let e = evt!.value;
    }
    AddOrEditemployeeid(employeeid) {
        let ScreenType = '2';
        /*this.dialog.open(hrmsemployeeComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => this.employeeidList = res as hrmsemployee[]);
        });*/
    }


}


