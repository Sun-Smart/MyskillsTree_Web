import { hrmsemployeetraveldocumentService } from './../../../service/hrmsemployeetraveldocument.service';
import { hrmsemployeetraveldocument } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployeetraveldocument.model';
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
import { bocountry } from '../../../../../../n-tire-bo-app/src/app/model/bocountry.model';
import { bocountryService } from '../../../../../../n-tire-bo-app/src/app/service/bocountry.service';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
@Component({
    selector: 'app-hrmsemployeetraveldocument',
    templateUrl: './hrmsemployeetraveldocument.component.html',
    styles: []
})



export class hrmsemployeetraveldocumentComponent implements OnInit {
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
    bfilterPopulatehrmsemployeetraveldocuments: boolean = false;
    datahrmsemployeetraveldocumentsemployeeid3: any = [];
    datahrmsemployeetraveldocumentscategory3: any = [];
    datahrmsemployeetraveldocumentscountry3: any = [];
    hrmsemployeetraveldocumentForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    categoryList: boconfigvalue[]=[];
    countryList: bocountry[];
    country_bocountriesForm: FormGroup;
    country_bocountriesoptions: any;
    country_bocountriesformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];


    constructor(
        private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hrmsemployeetraveldocumentservice: hrmsemployeetraveldocumentService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private hrmsemployeeservice: hrmsemployeeService,
        private bocountryservice: bocountryService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.hrmsemployeetraveldocumentForm = this.fb.group({
            employeeid: [null],
            employeeiddesc: [null],
            traveldocid: [null],
            category: [null],
            categorydesc: [null],
            country: [null],
            countrydesc: [null],
            referencenumber: [null],
            issuedate: [null],
            expirydate: [null],
            remarks: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsemployeetraveldocumentForm.controls; }

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
        let hrmsemployeetraveldocument = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.traveldocid != null) {
            hrmsemployeetraveldocument = this.data.traveldocid;
        }
        else
            hrmsemployeetraveldocument = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hrmsemployeetraveldocument;
        //this.sharedService.alert(hrmsemployeetraveldocument);
        if (hrmsemployeetraveldocument == null) {
            this.resetForm();
        }
        else {
            this.hrmsemployeetraveldocumentservice.gethrmsemployeetraveldocumentsByID(parseInt(hrmsemployeetraveldocument)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.hrmsemployeetraveldocumentForm.patchValue({
                    employeeid: res.hrmsemployeetraveldocument.employeeid,
                    employeeiddesc: res.hrmsemployeetraveldocument.employeeiddesc,
                    traveldocid: res.hrmsemployeetraveldocument.traveldocid,
                    category: res.hrmsemployeetraveldocument.category,
                    categorydesc: res.hrmsemployeetraveldocument.categorydesc,
                    country: res.hrmsemployeetraveldocument.country,
                    countrydesc: res.hrmsemployeetraveldocument.countrydesc,
                    referencenumber: res.hrmsemployeetraveldocument.referencenumber,
                    issuedate: this.ngbDateParserFormatter.parse(res.hrmsemployeetraveldocument.issuedate),
                    expirydate: this.ngbDateParserFormatter.parse(res.hrmsemployeetraveldocument.expirydate),
                    remarks: res.hrmsemployeetraveldocument.remarks,
                    attachment: res.hrmsemployeetraveldocument.attachment,
                    status: res.hrmsemployeetraveldocument.status,
                    statusdesc: res.hrmsemployeetraveldocument.statusdesc,
                });
                if (this.hrmsemployeetraveldocumentForm.get('attachment')!.value != null && this.hrmsemployeetraveldocumentForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.hrmsemployeetraveldocumentForm.get('attachment')!.value);
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
        this.configservice.getList("travelcategory").then((res:any) => this.categoryList = res as boconfigvalue[]);
        this.bocountryservice.getbocountriesList().then((res:any) => this.countryList = res as bocountry[]);
        this.country_bocountriesoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.countryList.filter(v => v.name.toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.country_bocountriesformatter = (result: any) => result.name;
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.hrmsemployeetraveldocumentForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsemployeetraveldocumentForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }

    onSelectedcountry(countryDetail: any) {
        if (countryDetail) {
            this.hrmsemployeetraveldocumentForm.patchValue({ country: countryDetail.item.countryid });
            this.hrmsemployeetraveldocumentForm.patchValue({ countrydesc: countryDetail.item.name });
            countryDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hrmsemployeetraveldocumentForm != null)
            this.hrmsemployeetraveldocumentForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hrmsemployeetraveldocumentForm.controls[key] != null) {
                    this.hrmsemployeetraveldocumentForm.patchValue(json);
                    this.hrmsemployeetraveldocumentForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let traveldocid = this.hrmsemployeetraveldocumentForm.get('traveldocid')!.value;
        if (traveldocid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hrmsemployeetraveldocumentservice.deletehrmsemployeetraveldocument(traveldocid).then((res:any) => {
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
        this.hrmsemployeetraveldocumentForm.patchValue({
            traveldocid: null
        });
        this.hrmsemployeetraveldocumentservice.formData.traveldocid = null;
    }
    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    attachmentuploader(e:any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileattachmentlist.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentfieldjson == null) this.attachmentfieldjson = [];
            max = Array.of(this.attachmentfieldjson).length; attachmentobj = new KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentfieldjson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    onSubmitData(bclear:any) {
        //debugger;
        this.isSubmitted = true;
        if (!this.hrmsemployeetraveldocumentForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        this.hrmsemployeetraveldocumentservice.formData = this.hrmsemployeetraveldocumentForm!.value;
        this.hrmsemployeetraveldocumentservice.formData.issuedate = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeetraveldocumentForm.get('issuedate')!.value) + '  UTC');
        this.hrmsemployeetraveldocumentservice.formData.expirydate = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeetraveldocumentForm.get('expirydate')!.value) + '  UTC');
        this.hrmsemployeetraveldocumentservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(this.hrmsemployeetraveldocumentservice.formData);
        if (this.hrmsemployeetraveldocumentForm.get('traveldocid')!.value == null || this.hrmsemployeetraveldocumentForm.get('traveldocid')!.value == '' || this.hrmsemployeetraveldocumentForm.get('traveldocid')!.value == 0)
            this.insertRecord(bclear);
        else
            this.updateRecord(bclear);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close();
        }
    }



    insertRecord(bclear:any) {
        this.hrmsemployeetraveldocumentservice.saveOrUpdatehrmsemployeetraveldocuments().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeetraveldocumentservice.clearList();
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
        this.hrmsemployeetraveldocumentservice.saveOrUpdatehrmsemployeetraveldocuments().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeetraveldocumentservice.clearList();
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

    AddOrEditcountry(countryid) {
        let ScreenType = '2';
        /*this.dialog.open(bocountryComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bocountryservice.getbocountriesList().then((res:any) => this.countryList = res as bocountry[]);
        });*/
    }


}



