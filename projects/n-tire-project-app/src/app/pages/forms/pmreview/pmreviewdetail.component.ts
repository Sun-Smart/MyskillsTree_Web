import { Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { pmreviewdetail } from './../../../model/pmreviewdetail.model';
import { NgForm } from '@angular/forms';
import { pmreviewService } from './../../../service/pmreview.service';
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
import { hrmsemployee, IhrmsemployeeResponse } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployee.model';
import { hrmsemployeeService } from './../../../service/hrmsemployee.service';
import { pmkpi, IpmkpiResponse } from './../../../model/pmkpi.model';
import { pmkpiService } from './../../../service/pmkpi.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-pmreviewdetails',
    templateUrl: './pmreviewdetail.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class pmreviewdetailComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    formid: any;
    pmreviewdetailForm: FormGroup;
    departmentidList: bomasterdata[];
    designationidList: boconfigvalue[]=[];
    employeeidList: hrmsemployee[];
    employeeidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    kpiidList: pmkpi[];
    kpiidoptionsEvent: EventEmitter<any> = new EventEmitter<any>();
    kpiid_pmkpisForm: FormGroup;
    kpiid_pmkpisoptions: any;
    kpiid_pmkpisformatter: any;
    formatList: boconfigvalue[]=[];
    formdata: any;
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    showformtype: any;
    data: any;
    SESSIONUSERID: any;

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private pmreviewservice: pmreviewService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private bomasterdataservice: bomasterdataService,
        private hrmsemployeeservice: hrmsemployeeService,
        private pmkpiservice: pmkpiService,
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
        this.pmreviewdetailForm = this.fb.group({
            reviewdetailid: [null],
            reviewid: [null],
            departmentid: [null],
            departmentiddesc: [null],
            designationid: [null],
            designationiddesc: [null],
            employeeid: [null],
            employeeiddesc: [null],
            kpiid: [null],
            kpiiddesc: [null],
            name: [null],
            target: [null],
            actual: [null],
            format: [null],
            formatdesc: [null],
            employeescore: [null],
            reviewerscore: [null],
            reviewquestions: [null],
            reviewanswers: [null],
            recommendations: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.pmreviewdetailForm.controls; }


    async ngOnInit() {
        let sessiondata = this.sessionService.getSession();
        if (sessiondata != null) {
            this.SESSIONUSERID = sessiondata.userid;
        }

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.reviewdetailid != null && this.data.reviewdetailid != undefined) ppk = this.data.reviewdetailid;
        if (this.data != null) {
            for (let key in this.data) {

                if (key != 'visiblelist' && key != 'hidelist') {
                    let json = JSON.parse('{"' + key + '": ' + this.data[key] + ' }');
                    if (this.pmreviewdetailForm.controls[key] != null) {
                        this.pmreviewdetailForm.patchValue(json);
                        this.pmreviewdetailForm.controls[key].disable({ onlySelf: true });
                    }
                }
            }
        }
        this.formid = ppk;

        if (ppk == null) {
            this.pmreviewdetailForm.patchValue({
            });
        }
        else {
            let obj = this.pmreviewservice.pmreviewdetails.filter(x => x.reviewdetailid == ppk)[0];
            this.pmreviewdetailForm.patchValue({
                reviewdetailid: obj.reviewdetailid,
                reviewid: obj.reviewid,
                departmentid: obj.departmentid,
                departmentiddesc: obj.departmentiddesc,
                designationid: obj.designationid,
                designationiddesc: obj.designationiddesc,
                employeeid: obj.employeeid,
                employeeiddesc: obj.employeeiddesc,
                kpiid: obj.kpiid,
                kpiiddesc: obj.kpiiddesc,
                name: obj.name,
                target: obj.target,
                actual: obj.actual,
                format: obj.format,
                formatdesc: obj.formatdesc,
                employeescore: obj.employeescore,
                reviewerscore: obj.reviewerscore,
                reviewquestions: obj.reviewquestions,
                reviewanswers: obj.reviewanswers,
                recommendations: obj.recommendations,
                status: obj.status,
            });
        }
        this.bomasterdataservice.getList("1").then((res:any) => {
            this.departmentidList = res as bomasterdata[];
        });
        this.configservice.getList("designation").then((res:any) => this.designationidList = res as boconfigvalue[]);
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => {
            this.employeeidList = res as hrmsemployee[];
            if (this.formdata && this.formdata.pmreviewdetail && this.formdata.pmreviewdetail.employeeid) {
                this.employeeidoptionsEvent.emit(this.employeeidList);
                this.pmreviewdetailForm.patchValue({
                    employeeid: this.formdata.pmreviewdetail.employeeid,
                    employeeiddesc: this.formdata.pmreviewdetail.employeeiddesc,
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
        this.pmkpiservice.getpmkpisList().then((res:any) => {
            this.kpiidList = res as pmkpi[];
            if (this.formdata && this.formdata.pmreviewdetail && this.formdata.pmreviewdetail.kpiid) {
                this.kpiidoptionsEvent.emit(this.kpiidList);
                this.pmreviewdetailForm.patchValue({
                    kpiid: this.formdata.pmreviewdetail.kpiid,
                    kpiiddesc: this.formdata.pmreviewdetail.kpiiddesc,
                });
            }
        }
        );
        this.kpiid_pmkpisoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.kpiidList.filter(v => v.name.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.kpiid_pmkpisformatter = (result: any) => result.name;
        this.configservice.getList("kpiformat").then((res:any) => this.formatList = res as boconfigvalue[]);
    }

    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail.employeeid && employeeidDetail) {

        }
    }

    onSelectedkpiid(kpiidDetail: any) {
        if (kpiidDetail.kpiid && kpiidDetail) {

        }
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.pmreviewdetailForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.pmreviewdetailForm!.value;
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
    departmentidonChange(evt:any) {
        let e = evt!.value;
        this.pmreviewdetailForm.patchValue({ departmentiddesc: evt.options[evt.options.selectedIndex].text });
    }
    designationidonChange(evt:any) {
        let e = evt!.value;
        this.pmreviewdetailForm.patchValue({ designationiddesc: evt.options[evt.options.selectedIndex].text });
    }
    employeeidonChange(evt:any) {
        let e = evt!.value;
    }
    kpiidonChange(evt:any) {
        let e = evt!.value;
    }
    formatonChange(evt:any) {
        let e = evt!.value;
        this.pmreviewdetailForm.patchValue({ formatdesc: evt.options[evt.options.selectedIndex].text });
    }
    AddOrEditdepartmentid(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.departmentidList = res as bomasterdata[]);
        });*/
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

    AddOrEditkpiid(kpiid) {
        let ScreenType = '2';
        /*this.dialog.open(pmkpiComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.pmkpiservice.getpmkpisList().then((res:any) => this.kpiidList = res as pmkpi[]);
        });*/
    }


}


