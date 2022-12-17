import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hrmsloanschemedetail } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsloanschemedetail.model';
import { NgForm } from '@angular/forms';
import { hrmsloanschememasterService } from './../../../service/hrmsloanschememaster.service';
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

@Component({
    selector: 'app-hrmsloanschemedetails',
    templateUrl: './hrmsloanschemedetail.component.html',
    styles: []
})
export class hrmsloanschemedetailComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hrmsloanschemedetailForm: FormGroup;
    roleidList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;

    constructor(
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hrmsloanschememasterservice: hrmsloanschememasterService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.hrmsloanschemedetailForm = this.fb.group({
            schemeid: [null],
            detailid: [null],
            roleid: [null],
            roleiddesc: [null],
            maxeligibleamount: [null],
            maximumtimes: [null],
            interestrate: [null],
            maximuminstallment: [null],
            restrictotherloan: [null],
            noexistingloan: [null],
            allowdeferral: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsloanschemedetailForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.detailid != null && this.data.detailid != undefined) ppk = this.data.detailid;


        if (ppk == null) {
            this.hrmsloanschemedetailForm.patchValue({
            });
        }
        else {
            let obj = this.hrmsloanschememasterservice.hrmsloanschemedetails.filter(x => x.detailid == ppk)[0];
            this.hrmsloanschemedetailForm.patchValue({
                schemeid: obj.schemeid,
                detailid: obj.detailid,
                roleid: obj.roleid,
                roleiddesc: obj.roleiddesc,
                maxeligibleamount: obj.maxeligibleamount,
                maximumtimes: obj.maximumtimes,
                interestrate: obj.interestrate,
                maximuminstallment: obj.maximuminstallment,
                restrictotherloan: obj.restrictotherloan,
                noexistingloan: obj.noexistingloan,
                allowdeferral: obj.allowdeferral,
                status: obj.status,
            });
        }
        this.configservice.getList("r").then((res:any) => this.roleidList = res as boconfigvalue[]);
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hrmsloanschemedetailForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hrmsloanschemedetailForm!.value;
        console.log(obj);
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
        this.hrmsloanschemedetailForm.patchValue({ roleiddesc: evt.options[evt.options.selectedIndex].text });
    }

}


