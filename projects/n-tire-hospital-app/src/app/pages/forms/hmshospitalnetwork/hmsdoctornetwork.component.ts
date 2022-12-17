import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmsdoctornetwork } from './../../../model/hmsdoctornetwork.model';
import { NgForm } from '@angular/forms';
import { hmshospitalnetworkService } from './../../../service/hmshospitalnetwork.service';
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
import { bouserrolemaster, IbouserrolemasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
import { bomasterdata, IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-hmsdoctornetworks',
    templateUrl: './hmsdoctornetwork.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmsdoctornetworkComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmsdoctornetworkForm: FormGroup;
    designationList: bouserrolemaster[];
    specializationList: bomasterdata[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hmshospitalnetworkservice: hmshospitalnetworkService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private bouserrolemasterservice: bouserrolemasterService,
        private bomasterdataservice: bomasterdataService,
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
        this.hmsdoctornetworkForm = this.fb.group({
            hospitalid: [null],
            doctorid: [null],
            doctorname: [null],
            designation: [null],
            designationdesc: [null],
            specialization: [null],
            specializationdesc: [null],
            contactno: [null],
            email: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmsdoctornetworkForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.doctorid != null && this.data.doctorid != undefined) ppk = this.data.doctorid;


        if (ppk == null) {
            this.hmsdoctornetworkForm.patchValue({
            });
        }
        else {
            let obj = this.hmshospitalnetworkservice.hmsdoctornetworks.filter(x => x.doctorid == ppk)[0];
            this.hmsdoctornetworkForm.patchValue({
                hospitalid: obj.hospitalid,
                doctorid: obj.doctorid,
                doctorname: obj.doctorname,
                designation: obj.designation,
                designationdesc: obj.designationdesc,
                specialization: obj.specialization,
                specializationdesc: obj.specializationdesc,
                contactno: obj.contactno,
                email: obj.email,
                status: obj.status,
            });
        }
        this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => this.designationList = res as bouserrolemaster[]);
        this.bomasterdataservice.getList("50").then((res:any) => this.specializationList = res as bomasterdata[]);
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hmsdoctornetworkForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hmsdoctornetworkForm!.value;
        obj.contactno = this.hmsdoctornetworkForm.get('contactno')!.value == null ? null : this.hmsdoctornetworkForm.get('contactno')!.value;
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
    designationonChange(evt:any) {
        let e = evt!.value;
        this.hmsdoctornetworkForm.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
    }
    specializationonChange(evt:any) {
        let e = evt!.value;
        this.hmsdoctornetworkForm.patchValue({ specializationdesc: evt.options[evt.options.selectedIndex].text });
    }
    AddOrEditdesignation(userroleid) {
        let ScreenType = '2';
        /*this.dialog.open(bouserrolemasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => this.designationList = res as bouserrolemaster[]);
        });*/
    }

    AddOrEditspecialization(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.specializationList = res as bomasterdata[]);
        });*/
    }


}


