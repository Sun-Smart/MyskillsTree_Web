import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hrmsinductionemployee } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsinductionemployee.model';
import { NgForm } from '@angular/forms';
import { hrmsinductionmasterService } from './../../../service/hrmsinductionmaster.service';
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

@Component({
    selector: 'app-hrmsinductionemployees',
    templateUrl: './hrmsinductionemployee.component.html',
    styles: []
})
export class hrmsinductionemployeeComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hrmsinductionemployeeForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;

    constructor(
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hrmsinductionmasterservice: hrmsinductionmasterService,
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
        this.hrmsinductionemployeeForm = this.fb.group({
            employeeinductionid: [null],
            inductionid: [null],
            employeeid: [null],
            employeeiddesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsinductionemployeeForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.employeeinductionid != null && this.data.employeeinductionid != undefined) ppk = this.data.employeeinductionid;


        if (ppk == null) {
            this.hrmsinductionemployeeForm.patchValue({
            });
        }
        else {
            let obj = this.hrmsinductionmasterservice.hrmsinductionemployees.filter(x => x.employeeinductionid == ppk)[0];
            this.hrmsinductionemployeeForm.patchValue({
                employeeinductionid: obj.employeeinductionid,
                inductionid: obj.inductionid,
                employeeid: obj.employeeid,
                employeeiddesc: obj.employeeiddesc,
                status: obj.status,
            });
        }
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
            this.hrmsinductionemployeeForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsinductionemployeeForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hrmsinductionemployeeForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hrmsinductionemployeeForm!.value;
        console.log(obj);
        this.dialogRef.close(obj);
    }

    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
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


