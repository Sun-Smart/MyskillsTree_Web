import { flmtaskService } from './../../../service/flmtask.service';
import { flmtask } from './../../../model/flmtask.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild,ViewEncapsulation } from '@angular/core';
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
    selector: 'app-flmtask',
    templateUrl: './flmtask.component.html',
    encapsulation: ViewEncapsulation.None,
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class flmtaskComponent implements OnInit {
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
    bfilterPopulateflmtasks: boolean = false;
    dataflmtasksfrequencyunit3: any = [];
    dataflmtasksmeasurementparameter3: any = [];
    flmtaskForm: FormGroup;
    frequencyunitList: boconfigvalue[]=[];
    measurementparameterList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private flmtaskservice: flmtaskService,
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
        this.flmtaskForm = this.fb.group({
            taskid: [null],
            description: [null],
            details: [null],
            frequency: [null],
            frequencyunit: [null],
            frequencyunitdesc: [null],
            measurementparameter: [null],
            measurementparameterdesc: [null],
            measurementvalue: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.flmtaskForm.controls; }

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
        if (this.flmtaskForm.dirty && this.flmtaskForm.touched) {
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
        let flmtask = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.taskid != null) {
            flmtask = this.data.taskid;
        }
        else
            flmtask = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = flmtask;
        //this.sharedService.alert(flmtask);
        if (flmtask == null) {
            this.resetForm();
        }
        else {
            this.PopulateScreen(flmtask);
        }
        this.configservice.getList("frequencyunit").then((res:any) => this.frequencyunitList = res as boconfigvalue[]);
        this.configservice.getList("measurementparameter").then((res:any) => this.measurementparameterList = res as boconfigvalue[]);
        this.flmtaskForm.markAsUntouched();
        this.flmtaskForm.markAsPristine();
    }



    resetForm() {
        if (this.flmtaskForm != null)
            this.flmtaskForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.flmtaskForm.controls[key] != null) {
                    this.flmtaskForm.patchValue(json);
                    this.flmtaskForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let taskid = this.flmtaskForm.get('taskid')!.value;
        if (taskid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.flmtaskservice.deleteflmtask(taskid).then((res:any) => {
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
        this.flmtaskForm.patchValue({
            taskid: null
        });
        this.flmtaskservice.formData.taskid = null;
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
        this.flmtaskForm.patchValue({ frequencyunitdesc: evt.options[evt.options.selectedIndex].text });
    }
    measurementparameteronChange(evt:any) {
        let e = evt!.value;
        this.flmtaskForm.patchValue({ measurementparameterdesc: evt.options[evt.options.selectedIndex].text });
    }
    PopulateScreen(flmtask: any) {
        this.flmtaskservice.getflmtasksByID(parseInt(flmtask)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.flmtaskForm.patchValue({
            taskid: res.flmtask.taskid,
            description: res.flmtask.description,
            details: res.flmtask.details,
            frequency: res.flmtask.frequency,
            frequencyunit: res.flmtask.frequencyunit,
            frequencyunitdesc: res.flmtask.frequencyunitdesc,
            measurementparameter: res.flmtask.measurementparameter,
            measurementparameterdesc: res.flmtask.measurementparameterdesc,
            measurementvalue: res.flmtask.measurementvalue,
            status: res.flmtask.status,
            statusdesc: res.flmtask.statusdesc,
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.flmtaskForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.flmtaskservice.formData = this.flmtaskForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.flmtaskForm.controls[key] != null) {
                    this.flmtaskservice.formData[key] = this.flmtaskForm.controls[key]!.value;
                }
            }
        }
        console.log(this.flmtaskservice.formData);
        this.flmtaskservice.saveOrUpdateflmtasks().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.flmtaskservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.flmtask);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.flmtaskForm.markAsUntouched();
                this.flmtaskForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }




}



