import { hrmsemployeekraService } from './../../../service/hrmsemployeekra.service';
import { hrmsemployeekra } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployeekra.model';
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
import { hrmskramaster } from '../../../../../../n-tire-hrms-app/src/app/model/hrmskramaster.model';
import { hrmskramasterService } from './../../../service/hrmskramaster.service';
import { hrmskpimaster } from '../../../../../../n-tire-hrms-app/src/app/model/hrmskpimaster.model';
import { hrmskpimasterService } from './../../../service/hrmskpimaster.service';
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
    selector: 'app-hrmsemployeekra',
    templateUrl: './hrmsemployeekra.component.html',
    styles: []
})



export class hrmsemployeekraComponent implements OnInit {
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
    bfilterPopulatehrmsemployeekras: boolean = false;
    datahrmsemployeekrasemployeeid3: any = [];
    datahrmsemployeekraskraid3: any = [];
    datahrmsemployeekraskpiid3: any = [];
    hrmsemployeekraForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    kraidList: hrmskramaster[];
    kpiidList: hrmskpimaster[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];


    constructor(
        private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hrmsemployeekraservice: hrmsemployeekraService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private hrmsemployeeservice: hrmsemployeeService,
        private hrmskramasterservice: hrmskramasterService,
        private hrmskpimasterservice: hrmskpimasterService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.hrmsemployeekraForm = this.fb.group({
            empkraid: [null],
            employeeid: [null],
            employeeiddesc: [null],
            kraid: [null],
            kraiddesc: [null],
            kpiid: [null],
            kpiiddesc: [null],
            expectedvalue: [null],
            actualvalue: [null],
            plannedweightage: [null],
            actualweightage: [null],
            remarks: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsemployeekraForm.controls; }

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
        let hrmsemployeekra = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.empkraid != null) {
            hrmsemployeekra = this.data.empkraid;
        }
        else
            hrmsemployeekra = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hrmsemployeekra;
        //this.sharedService.alert(hrmsemployeekra);
        if (hrmsemployeekra == null) {
            this.resetForm();
        }
        else {
            this.hrmsemployeekraservice.gethrmsemployeekrasByID(parseInt(hrmsemployeekra)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.hrmsemployeekraForm.patchValue({
                    empkraid: res.hrmsemployeekra.empkraid,
                    employeeid: res.hrmsemployeekra.employeeid,
                    employeeiddesc: res.hrmsemployeekra.employeeiddesc,
                    kraid: res.hrmsemployeekra.kraid,
                    kraiddesc: res.hrmsemployeekra.kraiddesc,
                    kpiid: res.hrmsemployeekra.kpiid,
                    kpiiddesc: res.hrmsemployeekra.kpiiddesc,
                    expectedvalue: res.hrmsemployeekra.expectedvalue,
                    actualvalue: res.hrmsemployeekra.actualvalue,
                    plannedweightage: res.hrmsemployeekra.plannedweightage,
                    actualweightage: res.hrmsemployeekra.actualweightage,
                    remarks: res.hrmsemployeekra.remarks,
                    attachment: res.hrmsemployeekra.attachment,
                    status: res.hrmsemployeekra.status,
                    statusdesc: res.hrmsemployeekra.statusdesc,
                });
                if (this.hrmsemployeekraForm.get('attachment')!.value != null && this.hrmsemployeekraForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.hrmsemployeekraForm.get('attachment')!.value);
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
        this.hrmskramasterservice.gethrmskramastersList().then((res:any) => this.kraidList = res as hrmskramaster[]);
        this.hrmskpimasterservice.gethrmskpimastersList().then((res:any) => this.kpiidList = res as hrmskpimaster[]);
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.hrmsemployeekraForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsemployeekraForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hrmsemployeekraForm != null)
            this.hrmsemployeekraForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hrmsemployeekraForm.controls[key] != null) {
                    this.hrmsemployeekraForm.patchValue(json);
                    this.hrmsemployeekraForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let empkraid = this.hrmsemployeekraForm.get('empkraid')!.value;
        if (empkraid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hrmsemployeekraservice.deletehrmsemployeekra(empkraid).then((res:any) => {
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
        this.hrmsemployeekraForm.patchValue({
            empkraid: null
        });
        this.hrmsemployeekraservice.formData.empkraid = null;
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
        if (!this.hrmsemployeekraForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        this.hrmsemployeekraservice.formData = this.hrmsemployeekraForm!.value;
        this.hrmsemployeekraservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(this.hrmsemployeekraservice.formData);
        if (this.hrmsemployeekraForm.get('empkraid')!.value == null || this.hrmsemployeekraForm.get('empkraid')!.value == '' || this.hrmsemployeekraForm.get('empkraid')!.value == 0)
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
        this.hrmsemployeekraservice.saveOrUpdatehrmsemployeekras().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeekraservice.clearList();
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
        this.hrmsemployeekraservice.saveOrUpdatehrmsemployeekras().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeekraservice.clearList();
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

    AddOrEditkraid(kraid) {
        let ScreenType = '2';
        /*this.dialog.open(hrmskramasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hrmskramasterservice.gethrmskramastersList().then((res:any) => this.kraidList = res as hrmskramaster[]);
        });*/
    }

    AddOrEditkpiid(kpiid) {
        let ScreenType = '2';
        /*this.dialog.open(hrmskpimasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.hrmskpimasterservice.gethrmskpimastersList().then((res:any) => this.kpiidList = res as hrmskpimaster[]);
        });*/
    }


}



