import { hmstestService } from './../../../service/hmstest.service';
import { hmstest } from './../../../model/hmstest.model';
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
    selector: 'app-hmstest',
    templateUrl: './hmstest.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class hmstestComponent implements OnInit {
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
    bfilterPopulatehmstests: boolean = false;
    hmstestForm: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hmstestservice: hmstestService,
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
        this.hmstestForm = this.fb.group({
            testid: [null],
            testname: [null],
            cost: [null],
            instructions: [null],
            notes: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmstestForm.controls; }

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
        if (this.hmstestForm.dirty && this.hmstestForm.touched) {
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
        let hmstest = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.testid != null) {
            hmstest = this.data.testid;
        }
        else
            hmstest = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hmstest;
        //this.sharedService.alert(hmstest);
        if (hmstest == null) {
            this.resetForm();
        }
        else {
            this.PopulateScreen(hmstest);
        }
        this.hmstestForm.markAsUntouched();
        this.hmstestForm.markAsPristine();
    }



    resetForm() {
        if (this.hmstestForm != null)
            this.hmstestForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hmstestForm.controls[key] != null) {
                    this.hmstestForm.patchValue(json);
                    this.hmstestForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let testid = this.hmstestForm.get('testid')!.value;
        if (testid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hmstestservice.deletehmstest(testid).then((res:any) => {
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
        this.hmstestForm.patchValue({
            testid: null
        });
        this.hmstestservice.formData.testid = null;
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
    PopulateScreen(hmstest: any) {
        this.hmstestservice.gethmstestsByID(parseInt(hmstest)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hmstestForm.patchValue({
            testid: res.hmstest.testid,
            testname: res.hmstest.testname,
            cost: res.hmstest.cost,
            instructions: res.hmstest.instructions,
            notes: res.hmstest.notes,
            status: res.hmstest.status,
            statusdesc: res.hmstest.statusdesc,
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.hmstestForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.hmstestservice.formData = this.hmstestForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.hmstestForm.controls[key] != null) {
                    this.hmstestservice.formData[key] = this.hmstestForm.controls[key]!.value;
                }
            }
        }
        console.log(this.hmstestservice.formData);
        this.hmstestservice.saveOrUpdatehmstests().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.hmstestservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.hmstest);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.hmstestForm.markAsUntouched();
                this.hmstestForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }




}



