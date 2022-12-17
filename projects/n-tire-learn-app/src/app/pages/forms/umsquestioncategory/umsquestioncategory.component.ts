import { umsquestioncategoryService } from './../../../service/umsquestioncategory.service';
import { umsquestioncategory } from './../../../model/umsquestioncategory.model';
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
    selector: 'app-umsquestioncategory',
    templateUrl: './umsquestioncategory.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class umsquestioncategoryComponent implements OnInit {
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
    bfilterPopulateumsquestioncategories: boolean = false;
    umsquestioncategoryForm: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private umsquestioncategoryservice: umsquestioncategoryService,
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
        this.umsquestioncategoryForm = this.fb.group({
            categoryid: [null],
            categoryname: [null],
            maxquestions: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.umsquestioncategoryForm.controls; }

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
        if (this.umsquestioncategoryForm.dirty && this.umsquestioncategoryForm.touched) {
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
        let umsquestioncategory = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.categoryid != null) {
            umsquestioncategory = this.data.categoryid;
        }
        else
            umsquestioncategory = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = umsquestioncategory;
        //this.sharedService.alert(umsquestioncategory);
        if (umsquestioncategory == null) {
            this.resetForm();
        }
        else {
            this.PopulateScreen(umsquestioncategory);
        }
        this.umsquestioncategoryForm.markAsUntouched();
        this.umsquestioncategoryForm.markAsPristine();
    }



    resetForm() {
        if (this.umsquestioncategoryForm != null)
            this.umsquestioncategoryForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.umsquestioncategoryForm.controls[key] != null) {
                    this.umsquestioncategoryForm.patchValue(json);
                    this.umsquestioncategoryForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let categoryid = this.umsquestioncategoryForm.get('categoryid')!.value;
        if (categoryid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.umsquestioncategoryservice.deleteumsquestioncategory(categoryid).then((res:any) => {
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
        this.umsquestioncategoryForm.patchValue({
            categoryid: null
        });
        this.umsquestioncategoryservice.formData.categoryid = null;
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
    PopulateScreen(umsquestioncategory: any) {
        this.umsquestioncategoryservice.getumsquestioncategoriesByID(parseInt(umsquestioncategory)).then((res:any) => {

            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.umsquestioncategoryForm.patchValue({
            categoryid: res.umsquestioncategory.categoryid,
            categoryname: res.umsquestioncategory.categoryname,
            maxquestions: res.umsquestioncategory.maxquestions,
            status: res.umsquestioncategory.status,
            statusdesc: res.umsquestioncategory.statusdesc,
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.umsquestioncategoryForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.umsquestioncategoryservice.formData = this.umsquestioncategoryForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (this.umsquestioncategoryForm.controls[key] != null) {
                    this.umsquestioncategoryservice.formData[key] = this.umsquestioncategoryForm.controls[key]!.value;
                }
            }
        }
        console.log(this.umsquestioncategoryservice.formData);
        this.umsquestioncategoryservice.saveOrUpdateumsquestioncategories().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.umsquestioncategoryservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.umsquestioncategory);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.umsquestioncategoryForm.markAsUntouched();
                this.umsquestioncategoryForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }




}



