import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmsadmission } from './../../../model/hmsadmission.model';
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
import { bomasterdata, IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { bosubcategorymaster, IbosubcategorymasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { hmsward, IhmswardResponse } from './../../../model/hmsward.model';
import { hmswardService } from './../../../service/hmsward.service';
import { hmsbed, IhmsbedResponse } from './../../../model/hmsbed.model';
import { hmsbedService } from './../../../service/hmsbed.service';
import { bousermaster, IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-hmsadmissions',
    templateUrl: './hmsadmission.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmsadmissionComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmsadmissionForm: FormGroup;
    doctoridList: hmsdoctor[];
    categoryList: bomasterdata[];
    subcategoryList: bosubcategorymaster[];
    wardList: hmsward[];
    bedList: hmsbed[];
    responsibilityidList: bousermaster[];
    responsibilityid_bousermastersForm: FormGroup;
    responsibilityid_bousermastersoptions: any;
    responsibilityid_bousermastersformatter: any;
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
        private hmsdoctorservice: hmsdoctorService,
        private bomasterdataservice: bomasterdataService,
        private bosubcategorymasterservice: bosubcategorymasterService,
        private hmswardservice: hmswardService,
        private hmsbedservice: hmsbedService,
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
        this.hmsadmissionForm = this.fb.group({
            admissionid: [null],
            patientid: [null],
            code: [null],
            admissiondate: [null],
            admissiontime: [null],
            doctorid: [null],
            doctoriddesc: [null],
            category: [null],
            categorydesc: [null],
            subcategory: [null],
            subcategorydesc: [null],
            ward: [null],
            warddesc: [null],
            bed: [null],
            beddesc: [null],
            diagnosis: [null],
            admissiondetails: [null],
            treatment: [null],
            responsibilityid: [null],
            responsibilityiddesc: [null],
            status: [null],
            statusdesc: [null],
            notes: [null],
        });
    }
    get f() { return this.hmsadmissionForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.admissionid != null && this.data.admissionid != undefined) ppk = this.data.admissionid;


        if (ppk == null) {
            this.hmsadmissionForm.patchValue({
                admissiondate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.hmspatientservice.hmsadmissions.filter(x => x.admissionid == ppk)[0];
            this.hmsadmissionForm.patchValue({
                admissionid: obj.admissionid,
                patientid: obj.patientid,
                code: obj.code,
                admissiondate: this.ngbDateParserFormatter.parse(obj.admissiondate as any),
                admissiontime: obj.admissiontime,
                doctorid: obj.doctorid,
                doctoriddesc: obj.doctoriddesc,
                category: obj.category,
                categorydesc: obj.categorydesc,
                subcategory: obj.subcategory,
                subcategorydesc: obj.subcategorydesc,
                ward: obj.ward,
                warddesc: obj.warddesc,
                bed: obj.bed,
                beddesc: obj.beddesc,
                diagnosis: obj.diagnosis,
                admissiondetails: obj.admissiondetails,
                treatment: obj.treatment,
                responsibilityid: obj.responsibilityid,
                responsibilityiddesc: obj.responsibilityiddesc,
                status: obj.status,
                notes: obj.notes,
            });
        }
        this.hmsdoctorservice.gethmsdoctorsList().then((res:any) => this.doctoridList = res as hmsdoctor[]);
        this.bomasterdataservice.getList("51").then((res:any) => this.categoryList = res as bomasterdata[]);
        setTimeout(() => {
            if (this.f.category!.value != "" && this.f.category!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.category!.value).then((res:any) => this.subcategoryList = res as bosubcategorymaster[]);
        });
        this.hmswardservice.gethmswardsList().then((res:any) => this.wardList = res as hmsward[]);
        setTimeout(() => {
            if (this.f.wardid!.value != "" && this.f.wardid!.value != null) this.hmsbedservice.getListBywardid(this.f.wardid!.value).then((res:any) => this.bedList = res as hmsbed[]);
        });
        this.bousermasterservice.getbousermastersList().then((res:any) => this.responsibilityidList = res as bousermaster[]);
        this.responsibilityid_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.responsibilityidList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.responsibilityid_bousermastersformatter = (result: any) => result.username;
    }

    onSelectedresponsibilityid(responsibilityidDetail: any) {
        if (responsibilityidDetail) {
            this.hmsadmissionForm.patchValue({ responsibilityid: responsibilityidDetail.item.userid });
            this.hmsadmissionForm.patchValue({ responsibilityiddesc: responsibilityidDetail.item.username });
            responsibilityidDetail.preventDefault();

        }
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hmsadmissionForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hmsadmissionForm!.value;
        obj.admissiondate = this.ngbDateParserFormatter.format(this.hmsadmissionForm.get('admissiondate')!.value);
        obj.admissiontime = (this.hmsadmissionForm.get('admissiontime')!.value == null ? 0 : this.hmsadmissionForm.get('admissiontime')!.value.hour) + ':' + (this.hmsadmissionForm.get('admissiontime')!.value == null ? 0 : this.hmsadmissionForm.get('admissiontime')!.value.minute);
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
    doctoridonChange(evt:any) {
        let e = evt!.value;
        this.hmsadmissionForm.patchValue({ doctoriddesc: evt.options[evt.options.selectedIndex].text });
    }
    categoryonChange(evt:any) {
        let e = evt!.value;
        this.hmsadmissionForm.patchValue({ categorydesc: evt.options[evt.options.selectedIndex].text });
        setTimeout(() => {
            if (this.f.category!.value != "" && this.f.category!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.category!.value).then((res:any) => this.subcategoryList = res as bosubcategorymaster[]);
        });
    }
    subcategoryonChange(evt:any) {
        let e = evt!.value;
        this.hmsadmissionForm.patchValue({ subcategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    wardonChange(evt:any) {
        let e = evt!.value;
        this.hmsadmissionForm.patchValue({ warddesc: evt.options[evt.options.selectedIndex].text });
    }
    bedonChange(evt:any) {
        let e = evt!.value;
        this.hmsadmissionForm.patchValue({ beddesc: evt.options[evt.options.selectedIndex].text });
    }
    responsibilityidonChange(evt:any) {
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

    AddOrEditcategory(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.categoryList = res as bomasterdata[]);
        });*/
    }

    AddOrEditsubcategory(subcategoryid) {
        let ScreenType = '2';
        /*this.dialog.open(bosubcategorymasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bosubcategorymasterservice.getbosubcategorymastersList().then((res:any) => this.subcategoryList = res as bosubcategorymaster[]);
        });*/
    }

    AddOrEditward(wardid) {
        let ScreenType = '2';
        /*this.dialog.open(hmswardComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hmswardservice.gethmswardsList().then((res:any) => this.wardList = res as hmsward[]);
        });*/
    }

    AddOrEditbed(bedid) {
        let ScreenType = '2';
        /*this.dialog.open(hmsbedComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hmsbedservice.gethmsbedsList().then((res:any) => this.bedList = res as hmsbed[]);
        });*/
    }

    AddOrEditresponsibilityid(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.responsibilityidList = res as bousermaster[]);
        });*/
    }


}


