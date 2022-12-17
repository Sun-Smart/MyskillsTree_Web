import { hmsvaccinationmasterService } from './../../../service/hmsvaccinationmaster.service';
import { hmsvaccinationmaster } from './../../../model/hmsvaccinationmaster.model';
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
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';

@Component({
    selector: 'app-hmsvaccinationmaster',
    templateUrl: './hmsvaccinationmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class hmsvaccinationmasterComponent implements OnInit {
    shortcuts: ShortcutInput[] = [];
    showsubmit: boolean = true;
    showGoWorkFlow: boolean = false;
    toolbarvisible: boolean = true;
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    pmenuid: any;
    pcurrenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    data3: any = [];
    bfilterPopulatehmsvaccinationmasters: boolean = false;
    datahmsvaccinationmastersfrequencyunit3: any = [];
    datahmsvaccinationmasterspriority3: any = [];
    datahmsvaccinationmastersremindertype3: any = [];
    hmsvaccinationmasterForm: FormGroup;
    frequencyunitList: boconfigvalue[]=[];
    priorityList: boconfigvalue[]=[];
    remindertypeList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hmsvaccinationmasterservice: hmsvaccinationmasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
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
        this.hmsvaccinationmasterForm = this.fb.group({
            vaccinationid: [null],
            vaccinationname: [null],
            frequency: [null],
            frequencyunit: [null],
            frequencyunitdesc: [null],
            deviationpercentage: [null],
            priority: [null],
            prioritydesc: [null],
            remindertype: [null],
            remindertypedesc: [null],
            templateid: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmsvaccinationmasterForm.controls; }

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
        if (this.hmsvaccinationmasterForm.dirty && this.hmsvaccinationmasterForm.touched) {
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
        let hmsvaccinationmaster = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.vaccinationid != null) {
            hmsvaccinationmaster = this.data.vaccinationid;
        }
        else
            hmsvaccinationmaster = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hmsvaccinationmaster;
        //this.sharedService.alert(hmsvaccinationmaster);
        if (hmsvaccinationmaster == null) {
            this.resetForm();
        }
        else {
            this.PopulateScreen(hmsvaccinationmaster);
        }
        this.configservice.getList("frequencyunit").then((res:any) => this.frequencyunitList = res as boconfigvalue[]);
        this.configservice.getList("Priority").then((res:any) => this.priorityList = res as boconfigvalue[]);
        this.configservice.getList("remindertype").then((res:any) => this.remindertypeList = res as boconfigvalue[]);
        this.hmsvaccinationmasterForm.markAsUntouched();
        this.hmsvaccinationmasterForm.markAsPristine();
    }



    resetForm() {
        if (this.hmsvaccinationmasterForm != null)
            this.hmsvaccinationmasterForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hmsvaccinationmasterForm.controls[key] != null) {
                    this.hmsvaccinationmasterForm.patchValue(json);
                    this.hmsvaccinationmasterForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let vaccinationid = this.hmsvaccinationmasterForm.get('vaccinationid')!.value;
        if (vaccinationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hmsvaccinationmasterservice.deletehmsvaccinationmaster(vaccinationid).then((res:any) => {
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
        this.hmsvaccinationmasterForm.patchValue({
            vaccinationid: null
        });
        this.hmsvaccinationmasterservice.formData.vaccinationid = null;
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
    frequencyunitonChange(evt:any) {
        let e = evt!.value;
        this.hmsvaccinationmasterForm.patchValue({ frequencyunitdesc: evt.options[evt.options.selectedIndex].text });
    }
    priorityonChange(evt:any) {
        let e = evt!.value;
        this.hmsvaccinationmasterForm.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    remindertypeonChange(evt:any) {
        let e = evt!.value;
        this.hmsvaccinationmasterForm.patchValue({ remindertypedesc: evt.options[evt.options.selectedIndex].text });
    }
    PopulateScreen(hmsvaccinationmaster: any) {
        this.hmsvaccinationmasterservice.gethmsvaccinationmastersByID(parseInt(hmsvaccinationmaster)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hmsvaccinationmasterForm.patchValue({
            vaccinationid: res.hmsvaccinationmaster.vaccinationid,
            vaccinationname: res.hmsvaccinationmaster.vaccinationname,
            frequency: res.hmsvaccinationmaster.frequency,
            frequencyunit: res.hmsvaccinationmaster.frequencyunit,
            frequencyunitdesc: res.hmsvaccinationmaster.frequencyunitdesc,
            deviationpercentage: res.hmsvaccinationmaster.deviationpercentage,
            priority: res.hmsvaccinationmaster.priority,
            prioritydesc: res.hmsvaccinationmaster.prioritydesc,
            remindertype: res.hmsvaccinationmaster.remindertype,
            remindertypedesc: res.hmsvaccinationmaster.remindertypedesc,
            templateid: res.hmsvaccinationmaster.templateid,
            status: res.hmsvaccinationmaster.status,
            statusdesc: res.hmsvaccinationmaster.statusdesc,
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.hmsvaccinationmasterForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.hmsvaccinationmasterservice.formData = this.hmsvaccinationmasterForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.hmsvaccinationmasterForm.controls[key] != null) {
                    this.hmsvaccinationmasterservice.formData[key] = this.hmsvaccinationmasterForm.controls[key]!.value;
                }
            }
        }
        console.log(this.hmsvaccinationmasterservice.formData);
        this.hmsvaccinationmasterservice.saveOrUpdatehmsvaccinationmasters().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.hmsvaccinationmasterservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.hmsvaccinationmaster);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.hmsvaccinationmasterForm.markAsUntouched();
                this.hmsvaccinationmasterForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }




}



