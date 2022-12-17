import { pmselectemployeesService } from './../../../service/pmselectemployees.service';
import { pmselectemployees } from './../../../model/pmselectemployees.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
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
import { hrmsemployee } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
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
    selector: 'app-pmselectemployees',
    templateUrl: './pmselectemployees.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class pmselectemployeesComponent implements OnInit {
    formdata: any;
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
    bfilterPopulatepmemployeekpis: boolean = false;
    datapmemployeekpisemployeeid3: any = [];
    pmemployeekpiForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showformtype: any;
    formid: any;
    SESSIONUSERID: any;
    sessiondata: any;


    constructor(
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private pmemployeekpiservice: pmselectemployeesService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private hrmsemployeeservice: hrmsemployeeService,
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
        this.pmemployeekpiForm = this.fb.group({
            kpidetailid: [null],
            employeekpiid: [null],
            departmentid: [null],
            designationid: [null],
            employeeid: [null],
            employeeiddesc: [null],
            kpiid: [null],
            weight: [null],
            reviewquestions: [null],
            remarks: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.pmemployeekpiForm.controls; }

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
        if (this.pmemployeekpiForm.dirty && this.pmemployeekpiForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    async ngOnInit() {
        this.sessiondata = this.sessionService.getSession();
        if (this.sessiondata != null) {
            this.SESSIONUSERID = this.sessiondata.userid;
        }

        debugger;
        let pmemployeekpiid = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.employeekpiid != null) {
            pmemployeekpiid = this.data.employeekpiid;
        }
        else {
            pmemployeekpiid = this.currentRoute.snapshot.paramMap.get('id');
            this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
        }
        if (this.data != null) {
            for (let key in this.data) {
                if (key != 'visiblelist' && key != 'hidelist') {

                    let jsonstring = "";
                    if (typeof (this.data[key]) == "string")
                        jsonstring = '{"' + key + '": "' + this.data[key] + '" }';
                    else
                        jsonstring = '{"' + key + '": ' + this.data[key] + ' }';
                    let json = JSON.parse(jsonstring);
                    if (this.pmemployeekpiForm.controls[key] != null) {
                        this.pmemployeekpiForm.patchValue(json);
                        this.pmemployeekpiForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = pmemployeekpiid;
        //this.sharedService.alert(pmemployeekpiid);
        if (pmemployeekpiid == null) {
            this.resetForm();
        }
        else {
            await this.PopulateScreen(pmemployeekpiid);
        }
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => {
            this.employeeidList = res as hrmsemployee[];
            if (this.formdata && this.formdata.pmemployeekpi && this.formdata.pmemployeekpi.employeeid) {
                this.employeeidoptionsEvent.emit(this.employeeidList);
                this.pmemployeekpiForm.patchValue({
                    employeeid: this.formdata.pmemployeekpi.employeeid,
                    employeeiddesc: this.formdata.pmemployeekpi.employeeiddesc,
                });
            }
        }
        );
        this.employeeid_hrmsemployeesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.employeeidList.filter(v => v.employeename.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.employeeid_hrmsemployeesformatter = (result: any) => result.employeename;
        this.pmemployeekpiForm.markAsUntouched();
        this.pmemployeekpiForm.markAsPristine();
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail.employeeid && employeeidDetail) {

        }
    }




    resetForm() {
        if (this.pmemployeekpiForm != null)
            this.pmemployeekpiForm.reset();
        this.pmemployeekpiForm.patchValue({
        });
        if (this.data != null) {
            for (let key in this.data) {
                if (key != 'visiblelist' && key != 'hidelist') {

                    let jsonstring = "";
                    if (typeof (this.data[key]) == "string")
                        jsonstring = '{"' + key + '": "' + this.data[key] + '" }';
                    else
                        jsonstring = '{"' + key + '": ' + this.data[key] + ' }';
                    let json = JSON.parse(jsonstring);
                    if (this.pmemployeekpiForm.controls[key] != null) {
                        this.pmemployeekpiForm.patchValue(json);
                        this.pmemployeekpiForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
    }

    onDelete() {
        let employeekpiid = this.pmemployeekpiForm.get('employeekpiid')!.value;
        if (employeekpiid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.pmemployeekpiservice.deletepmemployeekpi(employeekpiid).then((res:any) => {
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
        this.pmemployeekpiForm.patchValue({
            employeekpiid: null
        });
        if (this.pmemployeekpiservice.formData.employeekpiid != null) this.pmemployeekpiservice.formData.employeekpiid = null;
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
    employeeidonChange(evt:any) {
        let e = evt!.value;
    }
    async PopulateScreen(pmemployeekpiid: any) {
        this.pmemployeekpiservice.getpmemployeekpisByID(parseInt(pmemployeekpiid)).then((res:any) => {

            this.formdata = res;
            this.FillData(res);
        });
    }
    FillData(res: any) {
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.pmemployeekpiForm.patchValue({
            kpidetailid: res.pmemployeekpi.kpidetailid,
            employeekpiid: res.pmemployeekpi.employeekpiid,
            departmentid: res.pmemployeekpi.departmentid,
            designationid: res.pmemployeekpi.designationid,
            employeeid: res.pmemployeekpi.employeeid,
            employeeiddesc: res.pmemployeekpi.employeeiddesc,
            kpiid: res.pmemployeekpi.kpiid,
            weight: res.pmemployeekpi.weight,
            reviewquestions: res.pmemployeekpi.reviewquestions,
            remarks: res.pmemployeekpi.remarks,
            status: res.pmemployeekpi.status,
            statusdesc: res.pmemployeekpi.statusdesc,
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        debugger;
        this.isSubmitted = true;
        if (!this.pmemployeekpiForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.pmemployeekpiservice.formData = this.pmemployeekpiForm!.value;
        if (this.data != null) {
            for (let key in this.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.pmemployeekpiForm.controls[key] != null) {
                        this.pmemployeekpiservice.formData[key] = this.pmemployeekpiForm.controls[key]!.value;
                    }
                }
            }
        }
        console.log(this.pmemployeekpiservice.formData);
        this.pmemployeekpiservice.saveOrUpdatepmemployeekpis().subscribe(
            (res:any) => {
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.pmemployeekpiservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
                        this.dialogRef.close((res as any).result!.value.pmemployeekpi);
                    }
                    else {
                        this.FillData((res as any).result!.value);
                    }
                }
                this.pmemployeekpiForm.markAsUntouched();
                this.pmemployeekpiForm.markAsPristine();
            },
            (err:any) => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }



    AddOrEditemployeeid(employeeid) {
        let ScreenType = '2';
        /*this.dialog.open(hrmsemployeeComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => this.employeeidList = res as hrmsemployee[]);
        });*/
    }

    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



