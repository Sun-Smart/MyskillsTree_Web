import { hrmsemployeememoService } from './../../../service/hrmsemployeememo.service';
import { hrmsemployeememo } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployeememo.model';
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
    selector: 'app-hrmsemployeememo',
    templateUrl: './hrmsemployeememo.component.html',
    styles: []
})



export class hrmsemployeememoComponent implements OnInit {
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
    bfilterPopulatehrmsemployeememos: boolean = false;
    datahrmsemployeememosemployeeid3: any = [];
    datahrmsemployeememosmemocategory3: any = [];
    hrmsemployeememoForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    memocategoryList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;


    constructor(
        private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hrmsemployeememoservice: hrmsemployeememoService,
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
        this.hrmsemployeememoForm = this.fb.group({
            memoid: [null],
            employeeid: [null],
            employeeiddesc: [null],
            memodate: [null],
            memocategory: [null],
            memocategorydesc: [null],
            template: [null],
            memodetails: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsemployeememoForm.controls; }

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
        let hrmsemployeememo = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.memoid != null) {
            hrmsemployeememo = this.data.memoid;
        }
        else
            hrmsemployeememo = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hrmsemployeememo;
        //this.sharedService.alert(hrmsemployeememo);
        if (hrmsemployeememo == null) {
            this.resetForm();
        }
        else {
            this.hrmsemployeememoservice.gethrmsemployeememosByID(parseInt(hrmsemployeememo)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.hrmsemployeememoForm.patchValue({
                    memoid: res.hrmsemployeememo.memoid,
                    employeeid: res.hrmsemployeememo.employeeid,
                    employeeiddesc: res.hrmsemployeememo.employeeiddesc,
                    memodate: this.ngbDateParserFormatter.parse(res.hrmsemployeememo.memodate),
                    memocategory: res.hrmsemployeememo.memocategory,
                    memocategorydesc: res.hrmsemployeememo.memocategorydesc,
                    template: res.hrmsemployeememo.template,
                    memodetails: res.hrmsemployeememo.memodetails,
                    status: res.hrmsemployeememo.status,
                    statusdesc: res.hrmsemployeememo.statusdesc,
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
        this.configservice.getList("memocategory").then((res:any) => this.memocategoryList = res as boconfigvalue[]);
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.hrmsemployeememoForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsemployeememoForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hrmsemployeememoForm != null)
            this.hrmsemployeememoForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hrmsemployeememoForm.controls[key] != null) {
                    this.hrmsemployeememoForm.patchValue(json);
                    this.hrmsemployeememoForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let memoid = this.hrmsemployeememoForm.get('memoid')!.value;
        if (memoid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hrmsemployeememoservice.deletehrmsemployeememo(memoid).then((res:any) => {
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
        this.hrmsemployeememoForm.patchValue({
            memoid: null
        });
        this.hrmsemployeememoservice.formData.memoid = null;
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
        if (!this.hrmsemployeememoForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        this.hrmsemployeememoservice.formData = this.hrmsemployeememoForm!.value;
        this.hrmsemployeememoservice.formData.memodate = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeememoForm.get('memodate')!.value) + '  UTC');
        console.log(this.hrmsemployeememoservice.formData);
        if (this.hrmsemployeememoForm.get('memoid')!.value == null || this.hrmsemployeememoForm.get('memoid')!.value == '' || this.hrmsemployeememoForm.get('memoid')!.value == 0)
            this.insertRecord(bclear);
        else
            this.updateRecord(bclear);
        if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close();
        }
    }



    insertRecord(bclear:any) {
        this.hrmsemployeememoservice.saveOrUpdatehrmsemployeememos().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeememoservice.clearList();
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
        this.hrmsemployeememoservice.saveOrUpdatehrmsemployeememos().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeememoservice.clearList();
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



