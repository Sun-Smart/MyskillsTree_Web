import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmstreatment } from './../../../model/hmstreatment.model';
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
import { bomasterdata, IbomasterdataResponse } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { hmswardround, IhmswardroundResponse } from './../../../model/hmswardround.model';
import { hmswardroundService } from './../../../service/hmswardround.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-hmstreatments',
    templateUrl: './hmstreatment.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmstreatmentComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmstreatmentForm: FormGroup;
    visittypeList: bomasterdata[];
    wardroundidList: hmswardround[];
    treatmentcategoryList: boconfigvalue[]=[];
    treatmenttypeList: boconfigvalue[]=[];
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
        private bomasterdataservice: bomasterdataService,
        private hmswardroundservice: hmswardroundService,
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
        this.hmstreatmentForm = this.fb.group({
            treatmentid: [null],
            treatmentname: [null],
            visittype: [null],
            visittypedesc: [null],
            wardroundid: [null],
            wardroundiddesc: [null],
            visitid: [null],
            patientid: [null],
            treatmentcategory: [null],
            treatmentcategorydesc: [null],
            treatmenttype: [null],
            treatmenttypedesc: [null],
            medicine: [null],
            externalmedicine: [null],
            dosage: [null],
            numberofdays: [null],
            morning: [null],
            afternoon: [null],
            night: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmstreatmentForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.treatmentid != null && this.data.treatmentid != undefined) ppk = this.data.treatmentid;


        if (ppk == null) {
            this.hmstreatmentForm.patchValue({
            });
        }
        else {
            let obj = this.hmspatientservice.hmstreatments.filter(x => x.treatmentid == ppk)[0];
            this.hmstreatmentForm.patchValue({
                treatmentid: obj.treatmentid,
                treatmentname: obj.treatmentname,
                visittype: obj.visittype,
                visittypedesc: obj.visittypedesc,
                wardroundid: obj.wardroundid,
                wardroundiddesc: obj.wardroundiddesc,
                visitid: obj.visitid,
                patientid: obj.patientid,
                treatmentcategory: obj.treatmentcategory,
                treatmentcategorydesc: obj.treatmentcategorydesc,
                treatmenttype: obj.treatmenttype,
                treatmenttypedesc: obj.treatmenttypedesc,
                medicine: obj.medicine,
                externalmedicine: obj.externalmedicine,
                dosage: obj.dosage,
                numberofdays: obj.numberofdays,
                morning: obj.morning,
                afternoon: obj.afternoon,
                night: obj.night,
                status: obj.status,
            });
        }
        this.bomasterdataservice.getList("55").then((res:any) => this.visittypeList = res as bomasterdata[]);
        this.hmswardroundservice.gethmswardroundsList().then((res:any) => this.wardroundidList = res as hmswardround[]);
        this.configservice.getList("treatmentcategory").then((res:any) => this.treatmentcategoryList = res as boconfigvalue[]);
        this.configservice.getList("treatmenttype").then((res:any) => this.treatmenttypeList = res as boconfigvalue[]);
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hmstreatmentForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hmstreatmentForm!.value;
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
    visittypeonChange(evt:any) {
        let e = evt!.value;
        this.hmstreatmentForm.patchValue({ visittypedesc: evt.options[evt.options.selectedIndex].text });
    }
    wardroundidonChange(evt:any) {
        let e = evt!.value;
        this.hmstreatmentForm.patchValue({ wardroundiddesc: evt.options[evt.options.selectedIndex].text });
    }
    treatmentcategoryonChange(evt:any) {
        let e = evt!.value;
        this.hmstreatmentForm.patchValue({ treatmentcategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    treatmenttypeonChange(evt:any) {
        let e = evt!.value;
        this.hmstreatmentForm.patchValue({ treatmenttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    AddOrEditvisittype(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.visittypeList = res as bomasterdata[]);
        });*/
    }

    AddOrEditwardroundid(doctorid) {
        let ScreenType = '2';
        /*this.dialog.open(hmswardroundComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hmswardroundservice.gethmswardroundsList().then((res:any) => this.wardroundidList = res as hmswardround[]);
        });*/
    }


}


