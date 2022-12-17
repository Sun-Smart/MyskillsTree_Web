import { hrmsemployeestationaryrequestService } from './../../../service/hrmsemployeestationaryrequest.service';
import { hrmsemployeestationaryrequest } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployeestationaryrequest.model';
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
import { bomasterdata } from '../../../../../../n-tire-bo-app/src/app/model/bomasterdata.model';
import { bomasterdataService } from '../../../../../../n-tire-bo-app/src/app/service/bomasterdata.service';
import { bosubcategorymaster } from '../../../../../../n-tire-bo-app/src/app/model/bosubcategorymaster.model';
import { bosubcategorymasterService } from '../../../../../../n-tire-bo-app/src/app/service/bosubcategorymaster.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';

@Component({
    selector: 'app-hrmsemployeestationaryrequest',
    templateUrl: './hrmsemployeestationaryrequest.component.html',
    styles: []
})



export class hrmsemployeestationaryrequestComponent implements OnInit {
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
    bfilterPopulatehrmsemployeestationaryrequests: boolean = false;
    datahrmsemployeestationaryrequestsemployeeid3: any = [];
    datahrmsemployeestationaryrequestscategory3: any = [];
    datahrmsemployeestationaryrequestssubcategory3: any = [];
    hrmsemployeestationaryrequestForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    categoryList: bomasterdata[];
    subcategoryList: bosubcategorymaster[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;


    constructor(
        private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hrmsemployeestationaryrequestservice: hrmsemployeestationaryrequestService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private hrmsemployeeservice: hrmsemployeeService,
        private bomasterdataservice: bomasterdataService,
        private bosubcategorymasterservice: bosubcategorymasterService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.hrmsemployeestationaryrequestForm = this.fb.group({
            stationaryrequestid: [null],
            employeeid: [null],
            employeeiddesc: [null],
            stationaryrequestcode: [null],
            requestdate: [null],
            category: [null],
            categorydesc: [null],
            subcategory: [null],
            subcategorydesc: [null],
            requiredbefore: [null],
            requiredquantity: [null],
            remarks: [null],
            issuedate: [null],
            issuequantity: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsemployeestationaryrequestForm.controls; }

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
        let hrmsemployeestationaryrequest = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.stationaryrequestid != null) {
            hrmsemployeestationaryrequest = this.data.stationaryrequestid;
        }
        else
            hrmsemployeestationaryrequest = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hrmsemployeestationaryrequest;
        //this.sharedService.alert(hrmsemployeestationaryrequest);
        if (hrmsemployeestationaryrequest == null) {
            this.resetForm();
        }
        else {
            this.hrmsemployeestationaryrequestservice.gethrmsemployeestationaryrequestsByID(parseInt(hrmsemployeestationaryrequest)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.hrmsemployeestationaryrequestForm.patchValue({
                    stationaryrequestid: res.hrmsemployeestationaryrequest.stationaryrequestid,
                    employeeid: res.hrmsemployeestationaryrequest.employeeid,
                    employeeiddesc: res.hrmsemployeestationaryrequest.employeeiddesc,
                    stationaryrequestcode: res.hrmsemployeestationaryrequest.stationaryrequestcode,
                    requestdate: this.ngbDateParserFormatter.parse(res.hrmsemployeestationaryrequest.requestdate),
                    category: res.hrmsemployeestationaryrequest.category,
                    categorydesc: res.hrmsemployeestationaryrequest.categorydesc,
                    subcategory: res.hrmsemployeestationaryrequest.subcategory,
                    subcategorydesc: res.hrmsemployeestationaryrequest.subcategorydesc,
                    requiredbefore: this.ngbDateParserFormatter.parse(res.hrmsemployeestationaryrequest.requiredbefore),
                    requiredquantity: res.hrmsemployeestationaryrequest.requiredquantity,
                    remarks: res.hrmsemployeestationaryrequest.remarks,
                    issuedate: this.ngbDateParserFormatter.parse(res.hrmsemployeestationaryrequest.issuedate),
                    issuequantity: res.hrmsemployeestationaryrequest.issuequantity,
                    status: res.hrmsemployeestationaryrequest.status,
                    statusdesc: res.hrmsemployeestationaryrequest.statusdesc,
                });
                setTimeout(() => {
                    if (this.f.category!.value != "" && this.f.category!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.category!.value).then((res:any) => this.subcategoryList = res as bosubcategorymaster[]);
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
        this.bomasterdataservice.getList("25").then((res:any) => this.categoryList = res as bomasterdata[]);
        setTimeout(() => {
            if (this.f.category!.value != "" && this.f.category!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.category!.value).then((res:any) => this.subcategoryList = res as bosubcategorymaster[]);
        });
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.hrmsemployeestationaryrequestForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsemployeestationaryrequestForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hrmsemployeestationaryrequestForm != null)
            this.hrmsemployeestationaryrequestForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hrmsemployeestationaryrequestForm.controls[key] != null) {
                    this.hrmsemployeestationaryrequestForm.patchValue(json);
                    this.hrmsemployeestationaryrequestForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let stationaryrequestid = this.hrmsemployeestationaryrequestForm.get('stationaryrequestid')!.value;
        if (stationaryrequestid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hrmsemployeestationaryrequestservice.deletehrmsemployeestationaryrequest(stationaryrequestid).then((res:any) => {
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
        this.hrmsemployeestationaryrequestForm.patchValue({
            stationaryrequestid: null
        });
        this.hrmsemployeestationaryrequestservice.formData.stationaryrequestid = null;
    }
    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    categoryonChange(e:any) {
        setTimeout(() => {
            if (this.f.category!.value != "" && this.f.category!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.category!.value).then((res:any) => this.subcategoryList = res as bosubcategorymaster[]);
        });
    }
    onSubmitData(bclear:any) {
        //debugger;
        this.isSubmitted = true;
        if (!this.hrmsemployeestationaryrequestForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        this.hrmsemployeestationaryrequestservice.formData = this.hrmsemployeestationaryrequestForm!.value;
        this.hrmsemployeestationaryrequestservice.formData.requestdate = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeestationaryrequestForm.get('requestdate')!.value) + '  UTC');
        this.hrmsemployeestationaryrequestservice.formData.requiredbefore = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeestationaryrequestForm.get('requiredbefore')!.value));
        this.hrmsemployeestationaryrequestservice.formData.issuedate = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeestationaryrequestForm.get('issuedate')!.value) + '  UTC');
        console.log(this.hrmsemployeestationaryrequestservice.formData);
        if (this.hrmsemployeestationaryrequestForm.get('stationaryrequestid')!.value == null || this.hrmsemployeestationaryrequestForm.get('stationaryrequestid')!.value == '' || this.hrmsemployeestationaryrequestForm.get('stationaryrequestid')!.value == 0)
            this.insertRecord(bclear);
        else
            this.updateRecord(bclear);
        if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close();
        }
    }



    insertRecord(bclear:any) {
        this.hrmsemployeestationaryrequestservice.saveOrUpdatehrmsemployeestationaryrequests().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeestationaryrequestservice.clearList();
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
        this.hrmsemployeestationaryrequestservice.saveOrUpdatehrmsemployeestationaryrequests().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeestationaryrequestservice.clearList();
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

    AddOrEditcategory(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.categoryList = res as bomasterdata[]);
        });*/
    }

    AddOrEditsubcategory(subcategoryid) {
        let ScreenType = '2';
        /*this.dialog.open(bosubcategorymasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bosubcategorymasterservice.getbosubcategorymastersList().then((res:any) => this.subcategoryList = res as bosubcategorymaster[]);
        });*/
    }


}



