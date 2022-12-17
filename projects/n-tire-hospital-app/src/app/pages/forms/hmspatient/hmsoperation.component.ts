import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmsoperation } from './../../../model/hmsoperation.model';
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
    selector: 'app-hmsoperations',
    templateUrl: './hmsoperation.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmsoperationComponent implements OnInit {
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmsoperationForm: FormGroup;
    operatedplaceList: bomasterdata[];
    surgeonList: bousermaster[];
    surgeon_bousermastersForm: FormGroup;
    surgeon_bousermastersoptions: any;
    surgeon_bousermastersformatter: any;
    assistantList: bousermaster[];
    assistant_bousermastersForm: FormGroup;
    assistant_bousermastersoptions: any;
    assistant_bousermastersformatter: any;
    physicianList: bousermaster[];
    physician_bousermastersForm: FormGroup;
    physician_bousermastersoptions: any;
    physician_bousermastersformatter: any;
    anesthesianList: bousermaster[];
    anesthesian_bousermastersForm: FormGroup;
    anesthesian_bousermastersoptions: any;
    anesthesian_bousermastersformatter: any;
    anesthesiatechniqueList: boconfigvalue[]=[];
    operationtypeList: bomasterdata[];
    complexityList: boconfigvalue[]=[];
    riskfactorList: boconfigvalue[]=[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

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
        this.hmsoperationForm = this.fb.group({
            operationid: [null],
            patientid: [null],
            operationdate: [null],
            operationstarttime: [null],
            operationenddate: [null],
            operationendtime: [null],
            operatedplace: [null],
            operatedplacedesc: [null],
            surgeon: [null],
            surgeondesc: [null],
            assistant: [null],
            assistantdesc: [null],
            physician: [null],
            physiciandesc: [null],
            anesthesian: [null],
            anesthesiandesc: [null],
            anesthesiatechnique: [null],
            anesthesiatechniquedesc: [null],
            pressure: [null],
            pulse: [null],
            weight: [null],
            operationtype: [null],
            operationtypedesc: [null],
            complexity: [null],
            complexitydesc: [null],
            riskfactor: [null],
            riskfactordesc: [null],
            notes: [null],
            operationsteps: [null],
            preproceduremedication: [null],
            preoperativediagnosis: [null],
            preoperativefindings: [null],
            postoperativefindings: [null],
            postoperationcourse: [null],
            remarks: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmsoperationForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.operationid != null && this.data.operationid != undefined) ppk = this.data.operationid;


        if (ppk == null) {
            this.hmsoperationForm.patchValue({
                operationdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                operationenddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
            this.FillCustomField();
        }
        else {
            let obj = this.hmspatientservice.hmsoperations.filter(x => x.operationid == ppk)[0];
            this.hmsoperationForm.patchValue({
                operationid: obj.operationid,
                patientid: obj.patientid,
                operationdate: this.ngbDateParserFormatter.parse(obj.operationdate as any),
                operationstarttime: obj.operationstarttime,
                operationenddate: this.ngbDateParserFormatter.parse(obj.operationenddate as any),
                operationendtime: obj.operationendtime,
                operatedplace: obj.operatedplace,
                operatedplacedesc: obj.operatedplacedesc,
                surgeon: obj.surgeon,
                surgeondesc: obj.surgeondesc,
                assistant: obj.assistant,
                assistantdesc: obj.assistantdesc,
                physician: obj.physician,
                physiciandesc: obj.physiciandesc,
                anesthesian: obj.anesthesian,
                anesthesiandesc: obj.anesthesiandesc,
                anesthesiatechnique: obj.anesthesiatechnique,
                anesthesiatechniquedesc: obj.anesthesiatechniquedesc,
                pressure: obj.pressure,
                pulse: obj.pulse,
                weight: obj.weight,
                operationtype: obj.operationtype,
                operationtypedesc: obj.operationtypedesc,
                complexity: obj.complexity,
                complexitydesc: obj.complexitydesc,
                riskfactor: obj.riskfactor,
                riskfactordesc: obj.riskfactordesc,
                notes: obj.notes,
                operationsteps: obj.operationsteps,
                preproceduremedication: obj.preproceduremedication,
                preoperativediagnosis: obj.preoperativediagnosis,
                preoperativefindings: obj.preoperativefindings,
                postoperativefindings: obj.postoperativefindings,
                postoperationcourse: obj.postoperationcourse,
                remarks: obj.remarks,
                customfield: obj.customfield,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.hmsoperationForm.get('customfield')!.value != "" && this.hmsoperationForm.get('customfield')!.value != null) this.customfieldjson = JSON.parse(this.hmsoperationForm.get('customfield')!.value);
            this.FillCustomField();
            if (this.hmsoperationForm.get('attachment')!.value != "" && this.hmsoperationForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.hmsoperationForm.get('attachment')!.value);
        }
        this.bomasterdataservice.getList("53").then((res:any) => this.operatedplaceList = res as bomasterdata[]);
        this.bousermasterservice.getbousermastersList().then((res:any) => this.surgeonList = res as bousermaster[]);
        this.surgeon_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.surgeonList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.surgeon_bousermastersformatter = (result: any) => result.username;
        this.bousermasterservice.getbousermastersList().then((res:any) => this.assistantList = res as bousermaster[]);
        this.assistant_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.assistantList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.assistant_bousermastersformatter = (result: any) => result.username;
        this.bousermasterservice.getbousermastersList().then((res:any) => this.physicianList = res as bousermaster[]);
        this.physician_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.physicianList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.physician_bousermastersformatter = (result: any) => result.username;
        this.bousermasterservice.getbousermastersList().then((res:any) => this.anesthesianList = res as bousermaster[]);
        this.anesthesian_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.anesthesianList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.anesthesian_bousermastersformatter = (result: any) => result.username;
        this.configservice.getList("anesthesiatechnique").then((res:any) => this.anesthesiatechniqueList = res as boconfigvalue[]);
        this.bomasterdataservice.getList("54").then((res:any) => this.operationtypeList = res as bomasterdata[]);
        this.configservice.getList("complexity").then((res:any) => this.complexityList = res as boconfigvalue[]);
        this.configservice.getList("riskfactor").then((res:any) => this.riskfactorList = res as boconfigvalue[]);
    }

    onSelectedsurgeon(surgeonDetail: any) {
        if (surgeonDetail) {
            this.hmsoperationForm.patchValue({ surgeon: surgeonDetail.item.userid });
            this.hmsoperationForm.patchValue({ surgeondesc: surgeonDetail.item.username });
            surgeonDetail.preventDefault();

        }
    }

    onSelectedassistant(assistantDetail: any) {
        if (assistantDetail) {
            this.hmsoperationForm.patchValue({ assistant: assistantDetail.item.userid });
            this.hmsoperationForm.patchValue({ assistantdesc: assistantDetail.item.username });
            assistantDetail.preventDefault();

        }
    }

    onSelectedphysician(physicianDetail: any) {
        if (physicianDetail) {
            this.hmsoperationForm.patchValue({ physician: physicianDetail.item.userid });
            this.hmsoperationForm.patchValue({ physiciandesc: physicianDetail.item.username });
            physicianDetail.preventDefault();

        }
    }

    onSelectedanesthesian(anesthesianDetail: any) {
        if (anesthesianDetail) {
            this.hmsoperationForm.patchValue({ anesthesian: anesthesianDetail.item.userid });
            this.hmsoperationForm.patchValue({ anesthesiandesc: anesthesianDetail.item.username });
            anesthesianDetail.preventDefault();

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
        if (!this.hmsoperationForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.hmsoperationForm!.value;
        obj.operationdate = this.ngbDateParserFormatter.format(this.hmsoperationForm.get('operationdate')!.value);
        obj.operationstarttime = (this.hmsoperationForm.get('operationstarttime')!.value == null ? 0 : this.hmsoperationForm.get('operationstarttime')!.value.hour) + ':' + (this.hmsoperationForm.get('operationstarttime')!.value == null ? 0 : this.hmsoperationForm.get('operationstarttime')!.value.minute);
        obj.operationenddate = this.ngbDateParserFormatter.format(this.hmsoperationForm.get('operationenddate')!.value);
        obj.operationendtime = (this.hmsoperationForm.get('operationendtime')!.value == null ? 0 : this.hmsoperationForm.get('operationendtime')!.value.hour) + ':' + (this.hmsoperationForm.get('operationendtime')!.value == null ? 0 : this.hmsoperationForm.get('operationendtime')!.value.minute);
        obj.customfield = JSON.stringify(customfields);
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        this.dialogRef.close(obj);
    }

    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("hmsoperations", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    operatedplaceonChange(evt:any) {
        let e = evt!.value;
        this.hmsoperationForm.patchValue({ operatedplacedesc: evt.options[evt.options.selectedIndex].text });
    }
    surgeononChange(evt:any) {
        let e = evt!.value;
    }
    assistantonChange(evt:any) {
        let e = evt!.value;
    }
    physicianonChange(evt:any) {
        let e = evt!.value;
    }
    anesthesianonChange(evt:any) {
        let e = evt!.value;
    }
    anesthesiatechniqueonChange(evt:any) {
        let e = evt!.value;
        this.hmsoperationForm.patchValue({ anesthesiatechniquedesc: evt.options[evt.options.selectedIndex].text });
    }
    operationtypeonChange(evt:any) {
        let e = evt!.value;
        this.hmsoperationForm.patchValue({ operationtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    complexityonChange(evt:any) {
        let e = evt!.value;
        this.hmsoperationForm.patchValue({ complexitydesc: evt.options[evt.options.selectedIndex].text });
    }
    riskfactoronChange(evt:any) {
        let e = evt!.value;
        this.hmsoperationForm.patchValue({ riskfactordesc: evt.options[evt.options.selectedIndex].text });
    }
    AddOrEditoperatedplace(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.operatedplaceList = res as bomasterdata[]);
        });*/
    }

    AddOrEditsurgeon(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.surgeonList = res as bousermaster[]);
        });*/
    }

    AddOrEditassistant(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.assistantList = res as bousermaster[]);
        });*/
    }

    AddOrEditphysician(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.physicianList = res as bousermaster[]);
        });*/
    }

    AddOrEditanesthesian(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.anesthesianList = res as bousermaster[]);
        });*/
    }

    AddOrEditoperationtype(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.operationtypeList = res as bomasterdata[]);
        });*/
    }


}


