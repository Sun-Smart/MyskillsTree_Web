import { hrmsemployeelettermanagementService } from './../../../service/hrmsemployeelettermanagement.service';
import { hrmsemployeelettermanagement } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployeelettermanagement.model';
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
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';
@Component({
    selector: 'app-hrmsemployeelettermanagement',
    templateUrl: './hrmsemployeelettermanagement.component.html',
    styles: []
})



export class hrmsemployeelettermanagementComponent implements OnInit {
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
    bfilterPopulatehrmsemployeelettermanagements: boolean = false;
    datahrmsemployeelettermanagementsemployeeid3: any = [];
    datahrmsemployeelettermanagementslettercategory3: any = [];
    hrmsemployeelettermanagementForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    lettercategoryList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];


    constructor(
        private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hrmsemployeelettermanagementservice: hrmsemployeelettermanagementService,
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
        this.hrmsemployeelettermanagementForm = this.fb.group({
            letterid: [null],
            employeeid: [null],
            employeeiddesc: [null],
            date: [null],
            lettercategory: [null],
            lettercategorydesc: [null],
            template: [null],
            letterdetails: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsemployeelettermanagementForm.controls; }

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
        let hrmsemployeelettermanagement = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.letterid != null) {
            hrmsemployeelettermanagement = this.data.letterid;
        }
        else
            hrmsemployeelettermanagement = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hrmsemployeelettermanagement;
        //this.sharedService.alert(hrmsemployeelettermanagement);
        if (hrmsemployeelettermanagement == null) {
            this.resetForm();
        }
        else {
            this.hrmsemployeelettermanagementservice.gethrmsemployeelettermanagementsByID(parseInt(hrmsemployeelettermanagement)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.hrmsemployeelettermanagementForm.patchValue({
                    letterid: res.hrmsemployeelettermanagement.letterid,
                    employeeid: res.hrmsemployeelettermanagement.employeeid,
                    employeeiddesc: res.hrmsemployeelettermanagement.employeeiddesc,
                    date: this.ngbDateParserFormatter.parse(res.hrmsemployeelettermanagement.date),
                    lettercategory: res.hrmsemployeelettermanagement.lettercategory,
                    lettercategorydesc: res.hrmsemployeelettermanagement.lettercategorydesc,
                    template: res.hrmsemployeelettermanagement.template,
                    letterdetails: res.hrmsemployeelettermanagement.letterdetails,
                    attachment: res.hrmsemployeelettermanagement.attachment,
                    status: res.hrmsemployeelettermanagement.status,
                    statusdesc: res.hrmsemployeelettermanagement.statusdesc,
                });
                if (this.hrmsemployeelettermanagementForm.get('attachment')!.value != null && this.hrmsemployeelettermanagementForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.hrmsemployeelettermanagementForm.get('attachment')!.value);
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
        this.configservice.getList("lettercategory").then((res:any) => this.lettercategoryList = res as boconfigvalue[]);
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.hrmsemployeelettermanagementForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsemployeelettermanagementForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hrmsemployeelettermanagementForm != null)
            this.hrmsemployeelettermanagementForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hrmsemployeelettermanagementForm.controls[key] != null) {
                    this.hrmsemployeelettermanagementForm.patchValue(json);
                    this.hrmsemployeelettermanagementForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let letterid = this.hrmsemployeelettermanagementForm.get('letterid')!.value;
        if (letterid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hrmsemployeelettermanagementservice.deletehrmsemployeelettermanagement(letterid).then((res:any) => {
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
        this.hrmsemployeelettermanagementForm.patchValue({
            letterid: null
        });
        this.hrmsemployeelettermanagementservice.formData.letterid = null;
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
        if (!this.hrmsemployeelettermanagementForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        this.hrmsemployeelettermanagementservice.formData = this.hrmsemployeelettermanagementForm!.value;
        this.hrmsemployeelettermanagementservice.formData.date = new Date(this.ngbDateParserFormatter.format(this.hrmsemployeelettermanagementForm.get('date')!.value) + '  UTC');
        this.hrmsemployeelettermanagementservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(this.hrmsemployeelettermanagementservice.formData);
        if (this.hrmsemployeelettermanagementForm.get('letterid')!.value == null || this.hrmsemployeelettermanagementForm.get('letterid')!.value == '' || this.hrmsemployeelettermanagementForm.get('letterid')!.value == 0)
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
        this.hrmsemployeelettermanagementservice.saveOrUpdatehrmsemployeelettermanagements().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeelettermanagementservice.clearList();
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
        this.hrmsemployeelettermanagementservice.saveOrUpdatehrmsemployeelettermanagements().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeelettermanagementservice.clearList();
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



