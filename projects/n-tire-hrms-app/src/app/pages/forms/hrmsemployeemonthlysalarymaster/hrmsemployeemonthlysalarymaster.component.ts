import { hrmsemployeemonthlysalarymasterService } from './../../../service/hrmsemployeemonthlysalarymaster.service';
import { hrmsemployeemonthlysalarymaster } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployeemonthlysalarymaster.model';
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

@Component({
    selector: 'app-hrmsemployeemonthlysalarymaster',
    templateUrl: './hrmsemployeemonthlysalarymaster.component.html',
    styles: []
})



export class hrmsemployeemonthlysalarymasterComponent implements OnInit {
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
    bfilterPopulatehrmsemployeemonthlysalarymasters: boolean = false;
    datahrmsemployeemonthlysalarymastersemployeeid3: any = [];
    datahrmsemployeemonthlysalarymastersmonth3: any = [];
    datahrmsemployeemonthlysalarymasterssalarytype3: any = [];
    hrmsemployeemonthlysalarymasterForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    monthList: boconfigvalue[]=[];
    salarytypeList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;


    constructor(
        private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hrmsemployeemonthlysalarymasterservice: hrmsemployeemonthlysalarymasterService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private hrmsemployeeservice: hrmsemployeeService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.hrmsemployeemonthlysalarymasterForm = this.fb.group({
            salid: [null],
            employeeid: [null],
            employeeiddesc: [null],
            month: [null],
            monthdesc: [null],
            year: [null],
            salarytype: [null],
            salarytypedesc: [null],
            basic: [null],
            grosssalary: [null],
            deductions: [null],
            netsalary: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsemployeemonthlysalarymasterForm.controls; }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    ngOnInit() {
        //debugger;
        let hrmsemployeemonthlysalarymaster = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.salid != null) {
            hrmsemployeemonthlysalarymaster = this.data.salid;
        }
        else
            hrmsemployeemonthlysalarymaster = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hrmsemployeemonthlysalarymaster;
        //this.sharedService.alert(hrmsemployeemonthlysalarymaster);
        if (hrmsemployeemonthlysalarymaster == null) {
            this.resetForm();
        }
        else {
            this.hrmsemployeemonthlysalarymasterservice.gethrmsemployeemonthlysalarymastersByID(parseInt(hrmsemployeemonthlysalarymaster)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.hrmsemployeemonthlysalarymasterForm.patchValue({
                    salid: res.hrmsemployeemonthlysalarymaster.salid,
                    employeeid: res.hrmsemployeemonthlysalarymaster.employeeid,
                    employeeiddesc: res.hrmsemployeemonthlysalarymaster.employeeiddesc,
                    month: res.hrmsemployeemonthlysalarymaster.month,
                    monthdesc: res.hrmsemployeemonthlysalarymaster.monthdesc,
                    year: res.hrmsemployeemonthlysalarymaster.year,
                    salarytype: res.hrmsemployeemonthlysalarymaster.salarytype,
                    salarytypedesc: res.hrmsemployeemonthlysalarymaster.salarytypedesc,
                    basic: res.hrmsemployeemonthlysalarymaster.basic,
                    grosssalary: res.hrmsemployeemonthlysalarymaster.grosssalary,
                    deductions: res.hrmsemployeemonthlysalarymaster.deductions,
                    netsalary: res.hrmsemployeemonthlysalarymaster.netsalary,
                    status: res.hrmsemployeemonthlysalarymaster.status,
                    statusdesc: res.hrmsemployeemonthlysalarymaster.statusdesc,
                });
            });
        }
        this.hrmsemployeeservice.gethrmsemployeesList().then((res:any) => this.employeeidList = res as hrmsemployee[]);
        this.employeeid_hrmsemployeesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.employeeidList.filter(v => v.employeename.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.employeeid_hrmsemployeesformatter = (result: any) => result.employeename;
        this.configservice.getList("month").then((res:any) => this.monthList = res as boconfigvalue[]);
        this.configservice.getList("salarytype").then((res:any) => this.salarytypeList = res as boconfigvalue[]);
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.hrmsemployeemonthlysalarymasterForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsemployeemonthlysalarymasterForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hrmsemployeemonthlysalarymasterForm != null)
            this.hrmsemployeemonthlysalarymasterForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hrmsemployeemonthlysalarymasterForm.controls[key] != null) {
                    this.hrmsemployeemonthlysalarymasterForm.patchValue(json);
                    this.hrmsemployeemonthlysalarymasterForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let salid = this.hrmsemployeemonthlysalarymasterForm.get('salid')!.value;
        if (salid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hrmsemployeemonthlysalarymasterservice.deletehrmsemployeemonthlysalarymaster(salid).then((res:any) => {
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
        this.hrmsemployeemonthlysalarymasterForm.patchValue({
            salid: null
        });
        this.hrmsemployeemonthlysalarymasterservice.formData.salid = null;
    }
    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    onSubmitData(bclear:any) {
        //debugger;
        this.isSubmitted = true;
        if (!this.hrmsemployeemonthlysalarymasterForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        this.hrmsemployeemonthlysalarymasterservice.formData = this.hrmsemployeemonthlysalarymasterForm!.value;
        console.log(this.hrmsemployeemonthlysalarymasterservice.formData);
        if (this.hrmsemployeemonthlysalarymasterForm.get('salid')!.value == null || this.hrmsemployeemonthlysalarymasterForm.get('salid')!.value == '' || this.hrmsemployeemonthlysalarymasterForm.get('salid')!.value == 0)
            this.insertRecord(bclear);
        else
            this.updateRecord(bclear);
        if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close();
        }
    }



    insertRecord(bclear:any) {
        this.hrmsemployeemonthlysalarymasterservice.saveOrUpdatehrmsemployeemonthlysalarymasters().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeemonthlysalarymasterservice.clearList();
                    this.resetForm();
                }
            },
            (err:any) => {
                //debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }
    updateRecord(bclear:any) {
        this.hrmsemployeemonthlysalarymasterservice.saveOrUpdatehrmsemployeemonthlysalarymasters().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeemonthlysalarymasterservice.clearList();
                    this.resetForm();
                }
            },
            (err:any) => {
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


}



