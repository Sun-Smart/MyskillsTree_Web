import { hrmsemployerchecklistService } from './../../../service/hrmsemployerchecklist.service';
import { hrmsemployerchecklist } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployerchecklist.model';
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
    selector: 'app-hrmsemployerchecklist',
    templateUrl: './hrmsemployerchecklist.component.html',
    styles: []
})



export class hrmsemployerchecklistComponent implements OnInit {
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
    bfilterPopulatehrmsemployerchecklists: boolean = false;
    datahrmsemployerchecklistsemployeeid3: any = [];
    hrmsemployerchecklistForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];


    constructor(
        private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hrmsemployerchecklistservice: hrmsemployerchecklistService,
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
        this.hrmsemployerchecklistForm = this.fb.group({
            employeeid: [null],
            employeeiddesc: [null],
            employercheckid: [null],
            documentname: [null],
            submitdate: [null],
            givendate: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsemployerchecklistForm.controls; }

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
        let hrmsemployerchecklist = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.employercheckid != null) {
            hrmsemployerchecklist = this.data.employercheckid;
        }
        else
            hrmsemployerchecklist = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hrmsemployerchecklist;
        //this.sharedService.alert(hrmsemployerchecklist);
        if (hrmsemployerchecklist == null) {
            this.resetForm();
        }
        else {
            this.hrmsemployerchecklistservice.gethrmsemployerchecklistsByID(parseInt(hrmsemployerchecklist)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.hrmsemployerchecklistForm.patchValue({
                    employeeid: res.hrmsemployerchecklist.employeeid,
                    employeeiddesc: res.hrmsemployerchecklist.employeeiddesc,
                    employercheckid: res.hrmsemployerchecklist.employercheckid,
                    documentname: res.hrmsemployerchecklist.documentname,
                    submitdate: this.ngbDateParserFormatter.parse(res.hrmsemployerchecklist.submitdate),
                    givendate: this.ngbDateParserFormatter.parse(res.hrmsemployerchecklist.givendate),
                    attachment: res.hrmsemployerchecklist.attachment,
                    status: res.hrmsemployerchecklist.status,
                    statusdesc: res.hrmsemployerchecklist.statusdesc,
                });
                if (this.hrmsemployerchecklistForm.get('attachment')!.value != null && this.hrmsemployerchecklistForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.hrmsemployerchecklistForm.get('attachment')!.value);
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
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.hrmsemployerchecklistForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsemployerchecklistForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hrmsemployerchecklistForm != null)
            this.hrmsemployerchecklistForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hrmsemployerchecklistForm.controls[key] != null) {
                    this.hrmsemployerchecklistForm.patchValue(json);
                    this.hrmsemployerchecklistForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let employercheckid = this.hrmsemployerchecklistForm.get('employercheckid')!.value;
        if (employercheckid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hrmsemployerchecklistservice.deletehrmsemployerchecklist(employercheckid).then((res:any) => {
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
        this.hrmsemployerchecklistForm.patchValue({
            employercheckid: null
        });
        this.hrmsemployerchecklistservice.formData.employercheckid = null;
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
        if (!this.hrmsemployerchecklistForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        this.hrmsemployerchecklistservice.formData = this.hrmsemployerchecklistForm!.value;
        this.hrmsemployerchecklistservice.formData.submitdate = new Date(this.ngbDateParserFormatter.format(this.hrmsemployerchecklistForm.get('submitdate')!.value) + '  UTC');
        this.hrmsemployerchecklistservice.formData.givendate = new Date(this.ngbDateParserFormatter.format(this.hrmsemployerchecklistForm.get('givendate')!.value) + '  UTC');
        this.hrmsemployerchecklistservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(this.hrmsemployerchecklistservice.formData);
        if (this.hrmsemployerchecklistForm.get('employercheckid')!.value == null || this.hrmsemployerchecklistForm.get('employercheckid')!.value == '' || this.hrmsemployerchecklistForm.get('employercheckid')!.value == 0)
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
        this.hrmsemployerchecklistservice.saveOrUpdatehrmsemployerchecklists().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployerchecklistservice.clearList();
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
        this.hrmsemployerchecklistservice.saveOrUpdatehrmsemployerchecklists().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployerchecklistservice.clearList();
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



