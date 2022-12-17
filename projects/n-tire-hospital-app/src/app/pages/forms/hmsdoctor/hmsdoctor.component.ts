import { hmsdoctorService } from './../../../service/hmsdoctor.service';
import { hmsdoctor } from './../../../model/hmsdoctor.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { TranslateService } from "@ngx-translate/core";
import { bomasterdata } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-hmsdoctor',
    templateUrl: './hmsdoctor.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class hmsdoctorComponent implements OnInit {
    shortcuts: ShortcutInput[] = [];
    showsubmit: boolean = true;
    showGoWorkFlow: boolean = false;
    toolbarvisible: boolean = true;
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    pmenuid: any;
    pcurrenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    data3: any = [];
    bfilterPopulatehmsdoctors: boolean = false;
    datahmsdoctorsdesignation3: any = [];
    datahmsdoctorsspecialization3: any = [];
    hmsdoctorForm: FormGroup;
    designationList: bomasterdata[];
    specializationList: bomasterdata[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];
    @ViewChild('imageurluploader', { static: false }) imageurluploader: FileUpload;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hmsdoctorservice: hmsdoctorService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private bomasterdataservice: bomasterdataService,
        private customfieldservice: customfieldconfigurationService,
        private currentRoute: ActivatedRoute) {
        this.translate = this.sharedService.translate;
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
                preventDefault: true
            },
            {
                key: 'cmd s',
                command: () => this.onSubmitData(false),
                preventDefault: true
            },
            {
                key: 'cmd f',
                command: () => this.resetForm(),
                preventDefault: true
            }
        ]);
        this.hmsdoctorForm = this.fb.group({
            doctorid: [null],
            doctorname: [null],
            imageurl: [null],
            oncall: [null],
            designation: [null],
            designationdesc: [null],
            specialization: [null],
            specializationdesc: [null],
            contactno: [null],
            contactnoh: [null],
            email: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmsdoctorForm.controls; }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    ToolBar(prop:any) {
        this.toolbarvisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.hmsdoctorForm.dirty && this.hmsdoctorForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    async ngOnInit() {
        debugger;
        let hmsdoctor = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.doctorid != null) {
            hmsdoctor = this.data.doctorid;
        }
        else
            hmsdoctor = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hmsdoctor;
        //this.sharedService.alert(hmsdoctor);
        if (hmsdoctor == null) {
            this.FillCustomField();
            this.resetForm();
        }
        else {
            this.PopulateScreen(hmsdoctor);
        }
        this.bomasterdataservice.getList("49").then((res:any) => this.designationList = res as bomasterdata[]);
        this.bomasterdataservice.getList("50").then((res:any) => this.specializationList = res as bomasterdata[]);
        this.hmsdoctorForm.markAsUntouched();
        this.hmsdoctorForm.markAsPristine();
    }



    imageurlFileSelected(e:any) {
        //console.log(this.imageurluploader[0].file);
        this.hmsdoctorForm.patchValue({ imageurl: e.files[0].name });
    }
    resetForm() {
        if (this.hmsdoctorForm != null)
            this.hmsdoctorForm.reset();
        this.customfieldservice.reset(document);
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hmsdoctorForm.controls[key] != null) {
                    this.hmsdoctorForm.patchValue(json);
                    this.hmsdoctorForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let doctorid = this.hmsdoctorForm.get('doctorid')!.value;
        if (doctorid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hmsdoctorservice.deletehmsdoctor(doctorid).then((res:any) => {
                    this.resetForm();
                }
                );
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.hmsdoctorForm.patchValue({
            doctorid: null
        });
        this.hmsdoctorservice.formData.doctorid = null;
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("hmsdoctors", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
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
    designationonChange(evt:any) {
        let e = evt!.value;
        this.hmsdoctorForm.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
    }
    specializationonChange(evt:any) {
        let e = evt!.value;
        this.hmsdoctorForm.patchValue({ specializationdesc: evt.options[evt.options.selectedIndex].text });
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
    PopulateScreen(hmsdoctor: any) {
        this.hmsdoctorservice.gethmsdoctorsByID(parseInt(hmsdoctor)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hmsdoctorForm.patchValue({
            doctorid: res.hmsdoctor.doctorid,
            doctorname: res.hmsdoctor.doctorname,
            imageurl: res.hmsdoctor.imageurl,
            oncall: res.hmsdoctor.oncall,
            designation: res.hmsdoctor.designation,
            designationdesc: res.hmsdoctor.designationdesc,
            specialization: res.hmsdoctor.specialization,
            specializationdesc: res.hmsdoctor.specializationdesc,
            contactno: res.hmsdoctor.contactno,
            contactnoh: res.hmsdoctor.contactnoh,
            email: res.hmsdoctor.email,
            customfield: res.hmsdoctor.customfield,
            attachment: res.hmsdoctor.attachment,
            status: res.hmsdoctor.status,
            statusdesc: res.hmsdoctor.statusdesc,
        });
        if (this.hmsdoctorForm.get('customfield')!.value != null && this.hmsdoctorForm.get('customfield')!.value != "") this.customfieldjson = JSON.parse(this.hmsdoctorForm.get('customfield')!.value);
        this.FillCustomField();
        if (this.hmsdoctorForm.get('attachment')!.value != null && this.hmsdoctorForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.hmsdoctorForm.get('attachment')!.value);
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.hmsdoctorForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.hmsdoctorservice.formData = this.hmsdoctorForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.hmsdoctorForm.controls[key] != null) {
                    this.hmsdoctorservice.formData[key] = this.hmsdoctorForm.controls[key]!.value;
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.hmsdoctorservice.formData.contactno = this.hmsdoctorForm.get('contactno')!.value == null ? null : this.hmsdoctorForm.get('contactno')!.value;
        this.hmsdoctorservice.formData.contactnoh = this.hmsdoctorForm.get('contactnoh')!.value == null ? null : this.hmsdoctorForm.get('contactnoh')!.value;
        this.hmsdoctorservice.formData.customfield = JSON.stringify(customfields);
        this.hmsdoctorservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(this.hmsdoctorservice.formData);
        this.hmsdoctorservice.saveOrUpdatehmsdoctors().subscribe(
            (res:any) => {
                this.imageurluploader.upload();
                this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.hmsdoctorservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.hmsdoctor);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.hmsdoctorForm.markAsUntouched();
                this.hmsdoctorForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditdesignation(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.designationList = res as bomasterdata[]);
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



