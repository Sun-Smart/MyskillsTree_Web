import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmspatientvaccination } from './../../../model/hmspatientvaccination.model';
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
import { hmsvaccinationmaster, IhmsvaccinationmasterResponse } from './../../../model/hmsvaccinationmaster.model';
import { hmsvaccinationmasterService } from './../../../service/hmsvaccinationmaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-hmspatientvaccinations',
    templateUrl: './hmspatientvaccination.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmspatientvaccinationComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmspatientvaccinationForm: FormGroup;
    vaccinationidList: hmsvaccinationmaster[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;

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
        private hmsvaccinationmasterservice: hmsvaccinationmasterService,
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
        this.hmspatientvaccinationForm = this.fb.group({
            patientvaccinationid: [null],
            patientid: [null],
            doctorid: [null],
            vaccinationid: [null],
            vaccinationiddesc: [null],
            startdate: [null],
            vaccinated: [null],
            vaccinateddate: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmspatientvaccinationForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.patientvaccinationid != null && this.data.patientvaccinationid != undefined) ppk = this.data.patientvaccinationid;


        if (ppk == null) {
            this.hmspatientvaccinationForm.patchValue({
                startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                vaccinateddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.hmspatientservice.hmspatientvaccinations.filter(x => x.patientvaccinationid == ppk)[0];
            this.hmspatientvaccinationForm.patchValue({
                patientvaccinationid: obj.patientvaccinationid,
                patientid: obj.patientid,
                doctorid: obj.doctorid,
                vaccinationid: obj.vaccinationid,
                vaccinationiddesc: obj.vaccinationiddesc,
                startdate: this.ngbDateParserFormatter.parse(obj.startdate as any),
                vaccinated: obj.vaccinated,
                vaccinateddate: this.ngbDateParserFormatter.parse(obj.vaccinateddate as any),
                status: obj.status,
            });
        }
        this.hmsvaccinationmasterservice.gethmsvaccinationmastersList().then((res:any) => this.vaccinationidList = res as hmsvaccinationmaster[]);
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hmspatientvaccinationForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hmspatientvaccinationForm!.value;
        obj.startdate = this.ngbDateParserFormatter.format(this.hmspatientvaccinationForm.get('startdate')!.value);
        obj.vaccinateddate = this.ngbDateParserFormatter.format(this.hmspatientvaccinationForm.get('vaccinateddate')!.value);
        console.log(obj);
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
    vaccinationidonChange(evt:any) {
        let e = evt!.value;
        this.hmspatientvaccinationForm.patchValue({ vaccinationiddesc: evt.options[evt.options.selectedIndex].text });
    }
    AddOrEditvaccinationid(vaccinationid) {
        let ScreenType = '2';
        /*this.dialog.open(hmsvaccinationmasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hmsvaccinationmasterservice.gethmsvaccinationmastersList().then((res:any) => this.vaccinationidList = res as hmsvaccinationmaster[]);
        });*/
    }


}


