import { hrmsemployeeinfrarequestmasterService } from './../../../service/hrmsemployeeinfrarequestmaster.service';
import { hrmsemployeeinfrarequestmaster } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployeeinfrarequestmaster.model';
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
    selector: 'app-hrmsemployeeinfrarequestmaster',
    templateUrl: './hrmsemployeeinfrarequestmaster.component.html',
    styles: []
})



export class hrmsemployeeinfrarequestmasterComponent implements OnInit {
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
    bfilterPopulatehrmsemployeeinfrarequestmasters: boolean = false;
    datahrmsemployeeinfrarequestmastersemployeeid3: any = [];
    datahrmsemployeeinfrarequestmastersassetcategory3: any = [];
    datahrmsemployeeinfrarequestmastersassetsubcategory3: any = [];
    datahrmsemployeeinfrarequestmastersreturncondition3: any = [];
    hrmsemployeeinfrarequestmasterForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    assetcategoryList: bomasterdata[];
    assetsubcategoryList: bosubcategorymaster[];
    returnconditionList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;


    constructor(
        private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hrmsemployeeinfrarequestmasterservice: hrmsemployeeinfrarequestmasterService,
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
        this.hrmsemployeeinfrarequestmasterForm = this.fb.group({
            infrarequestid: [null],
            employeeid: [null],
            employeeiddesc: [null],
            infrarequestcode: [null],
            requestdate: [null],
            assetcategory: [null],
            assetcategorydesc: [null],
            assetsubcategory: [null],
            assetsubcategorydesc: [null],
            requiredbefore: [null],
            remarks: [null],
            issuedate: [null],
            assetreference: [null],
            returndate: [null],
            returncondition: [null],
            returnconditiondesc: [null],
            returnclaim: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsemployeeinfrarequestmasterForm.controls; }

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
        let hrmsemployeeinfrarequestmaster = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.infrarequestid != null) {
            hrmsemployeeinfrarequestmaster = this.data.infrarequestid;
        }
        else
            hrmsemployeeinfrarequestmaster = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hrmsemployeeinfrarequestmaster;
        //this.sharedService.alert(hrmsemployeeinfrarequestmaster);
        if (hrmsemployeeinfrarequestmaster == null) {
            this.resetForm();
        }
        else {
            this.hrmsemployeeinfrarequestmasterservice.gethrmsemployeeinfrarequestmastersByID(parseInt(hrmsemployeeinfrarequestmaster)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.hrmsemployeeinfrarequestmasterForm.patchValue({
                    infrarequestid: res.hrmsemployeeinfrarequestmaster.infrarequestid,
                    employeeid: res.hrmsemployeeinfrarequestmaster.employeeid,
                    employeeiddesc: res.hrmsemployeeinfrarequestmaster.employeeiddesc,
                    infrarequestcode: res.hrmsemployeeinfrarequestmaster.infrarequestcode,
                    requestdate: this.ngbDateParserFormatter.parse(res.hrmsemployeeinfrarequestmaster.requestdate),
                    assetcategory: res.hrmsemployeeinfrarequestmaster.assetcategory,
                    assetcategorydesc: res.hrmsemployeeinfrarequestmaster.assetcategorydesc,
                    assetsubcategory: res.hrmsemployeeinfrarequestmaster.assetsubcategory,
                    assetsubcategorydesc: res.hrmsemployeeinfrarequestmaster.assetsubcategorydesc,
                    requiredbefore: this.ngbDateParserFormatter.parse(res.hrmsemployeeinfrarequestmaster.requiredbefore),
                    remarks: res.hrmsemployeeinfrarequestmaster.remarks,
                    issuedate: this.ngbDateParserFormatter.parse(res.hrmsemployeeinfrarequestmaster.issuedate),
                    assetreference: res.hrmsemployeeinfrarequestmaster.assetreference,
                    returndate: this.ngbDateParserFormatter.parse(res.hrmsemployeeinfrarequestmaster.returndate),
                    returncondition: res.hrmsemployeeinfrarequestmaster.returncondition,
                    returnconditiondesc: res.hrmsemployeeinfrarequestmaster.returnconditiondesc,
                    returnclaim: res.hrmsemployeeinfrarequestmaster.returnclaim,
                    status: res.hrmsemployeeinfrarequestmaster.status,
                    statusdesc: res.hrmsemployeeinfrarequestmaster.statusdesc,
                });
                setTimeout(() => {
                    if (this.f.assetcategory!.value != "" && this.f.assetcategory!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.assetcategory!.value).then((res:any) => this.assetsubcategoryList = res as bosubcategorymaster[]);
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
        this.bomasterdataservice.getList("24").then((res:any) => this.assetcategoryList = res as bomasterdata[]);
        setTimeout(() => {
            if (this.f.assetcategory!.value != "" && this.f.assetcategory!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.assetcategory!.value).then((res:any) => this.assetsubcategoryList = res as bosubcategorymaster[]);
        });
        this.configservice.getList("returncondition").then((res:any) => this.returnconditionList = res as boconfigvalue[]);
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.hrmsemployeeinfrarequestmasterForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsemployeeinfrarequestmasterForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hrmsemployeeinfrarequestmasterForm != null)
            this.hrmsemployeeinfrarequestmasterForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hrmsemployeeinfrarequestmasterForm.controls[key] != null) {
                    this.hrmsemployeeinfrarequestmasterForm.patchValue(json);
                    this.hrmsemployeeinfrarequestmasterForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let infrarequestid = this.hrmsemployeeinfrarequestmasterForm.get('infrarequestid')!.value;
        if (infrarequestid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hrmsemployeeinfrarequestmasterservice.deletehrmsemployeeinfrarequestmaster(infrarequestid).then((res:any) => {
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
        this.hrmsemployeeinfrarequestmasterForm.patchValue({
            infrarequestid: null
        });
        this.hrmsemployeeinfrarequestmasterservice.formData.infrarequestid = null;
    }
    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    assetcategoryonChange(e:any) {
        setTimeout(() => {
            if (this.f.assetcategory!.value != "" && this.f.assetcategory!.value != null) this.bosubcategorymasterservice.getListBycategoryid(this.f.assetcategory!.value).then((res:any) => this.assetsubcategoryList = res as bosubcategorymaster[]);
        });
    }
    onSubmitData(bclear:any) {
        //debugger;
        this.isSubmitted = true;
        if (!this.hrmsemployeeinfrarequestmasterForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        this.hrmsemployeeinfrarequestmasterservice.formData = this.hrmsemployeeinfrarequestmasterForm!.value;
        this.hrmsemployeeinfrarequestmasterservice.formData.requestdate = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeeinfrarequestmasterForm.get('requestdate')!.value) + '  UTC');
        this.hrmsemployeeinfrarequestmasterservice.formData.requiredbefore = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeeinfrarequestmasterForm.get('requiredbefore')!.value));
        this.hrmsemployeeinfrarequestmasterservice.formData.issuedate = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeeinfrarequestmasterForm.get('issuedate')!.value) + '  UTC');
        this.hrmsemployeeinfrarequestmasterservice.formData.returndate = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeeinfrarequestmasterForm.get('returndate')!.value) + '  UTC');
        console.log(this.hrmsemployeeinfrarequestmasterservice.formData);
        if (this.hrmsemployeeinfrarequestmasterForm.get('infrarequestid')!.value == null || this.hrmsemployeeinfrarequestmasterForm.get('infrarequestid')!.value == '' || this.hrmsemployeeinfrarequestmasterForm.get('infrarequestid')!.value == 0)
            this.insertRecord(bclear);
        else
            this.updateRecord(bclear);
        if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close();
        }
    }



    insertRecord(bclear:any) {
        this.hrmsemployeeinfrarequestmasterservice.saveOrUpdatehrmsemployeeinfrarequestmasters().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeeinfrarequestmasterservice.clearList();
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
        this.hrmsemployeeinfrarequestmasterservice.saveOrUpdatehrmsemployeeinfrarequestmasters().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeeinfrarequestmasterservice.clearList();
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

    AddOrEditassetcategory(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.assetcategoryList = res as bomasterdata[]);
        });*/
    }

    AddOrEditassetsubcategory(subcategoryid) {
        let ScreenType = '2';
        /*this.dialog.open(bosubcategorymasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bosubcategorymasterservice.getbosubcategorymastersList().then((res:any) => this.assetsubcategoryList = res as bosubcategorymaster[]);
        });*/
    }


}



