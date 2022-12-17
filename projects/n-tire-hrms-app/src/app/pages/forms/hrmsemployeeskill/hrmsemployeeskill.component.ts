import { hrmsemployeeskillService } from './../../../service/hrmsemployeeskill.service';
import { hrmsemployeeskill } from '../../../../../../n-tire-hrms-app/src/app/model/hrmsemployeeskill.model';
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
    selector: 'app-hrmsemployeeskill',
    templateUrl: './hrmsemployeeskill.component.html',
    styles: []
})



export class hrmsemployeeskillComponent implements OnInit {
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
    bfilterPopulatehrmsemployeeskills: boolean = false;
    datahrmsemployeeskillsemployeeid3: any = [];
    datahrmsemployeeskillsskillcategory3: any = [];
    datahrmsemployeeskillsrating3: any = [];
    hrmsemployeeskillForm: FormGroup;
    employeeidList: hrmsemployee[];
    employeeid_hrmsemployeesForm: FormGroup;
    employeeid_hrmsemployeesoptions: any;
    employeeid_hrmsemployeesformatter: any;
    skillcategoryList: bomasterdata[];
    ratingList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];


    constructor(
        private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hrmsemployeeskillservice: hrmsemployeeskillService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private hrmsemployeeservice: hrmsemployeeService,
        private bomasterdataservice: bomasterdataService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.hrmsemployeeskillForm = this.fb.group({
            employeeid: [null],
            employeeiddesc: [null],
            skillid: [null],
            skillcategory: [null],
            skillcategorydesc: [null],
            skilldescription: [null],
            noofyearsused: [null],
            lastusedyear: [null],
            rating: [null],
            ratingdesc: [null],
            remarks: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hrmsemployeeskillForm.controls; }

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
        let hrmsemployeeskill = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.skillid != null) {
            hrmsemployeeskill = this.data.skillid;
        }
        else
            hrmsemployeeskill = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = hrmsemployeeskill;
        //this.sharedService.alert(hrmsemployeeskill);
        if (hrmsemployeeskill == null) {
            this.resetForm();
        }
        else {
            this.hrmsemployeeskillservice.gethrmsemployeeskillsByID(parseInt(hrmsemployeeskill)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.hrmsemployeeskillForm.patchValue({
                    employeeid: res.hrmsemployeeskill.employeeid,
                    employeeiddesc: res.hrmsemployeeskill.employeeiddesc,
                    skillid: res.hrmsemployeeskill.skillid,
                    skillcategory: res.hrmsemployeeskill.skillcategory,
                    skillcategorydesc: res.hrmsemployeeskill.skillcategorydesc,
                    skilldescription: res.hrmsemployeeskill.skilldescription,
                    noofyearsused: res.hrmsemployeeskill.noofyearsused,
                    lastusedyear: res.hrmsemployeeskill.lastusedyear,
                    rating: res.hrmsemployeeskill.rating,
                    ratingdesc: res.hrmsemployeeskill.ratingdesc,
                    remarks: res.hrmsemployeeskill.remarks,
                    attachment: res.hrmsemployeeskill.attachment,
                    status: res.hrmsemployeeskill.status,
                    statusdesc: res.hrmsemployeeskill.statusdesc,
                });
                if (this.hrmsemployeeskillForm.get('attachment')!.value != null && this.hrmsemployeeskillForm.get('attachment')!.value != "") this.attachmentfieldjson = JSON.parse(this.hrmsemployeeskillForm.get('attachment')!.value);
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
        this.bomasterdataservice.getList("22").then((res:any) => this.skillcategoryList = res as bomasterdata[]);
        this.configservice.getList("rating").then((res:any) => this.ratingList = res as boconfigvalue[]);
    }
    onSelectedemployeeid(employeeidDetail: any) {
        if (employeeidDetail) {
            this.hrmsemployeeskillForm.patchValue({ employeeid: employeeidDetail.item.employeeid });
            this.hrmsemployeeskillForm.patchValue({ employeeiddesc: employeeidDetail.item.employeename });
            employeeidDetail.preventDefault();

        }
    }




    resetForm() {
        if (this.hrmsemployeeskillForm != null)
            this.hrmsemployeeskillForm.reset();
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.hrmsemployeeskillForm.controls[key] != null) {
                    this.hrmsemployeeskillForm.patchValue(json);
                    this.hrmsemployeeskillForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let skillid = this.hrmsemployeeskillForm.get('skillid')!.value;
        if (skillid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hrmsemployeeskillservice.deletehrmsemployeeskill(skillid).then((res:any) => {
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
        this.hrmsemployeeskillForm.patchValue({
            skillid: null
        });
        this.hrmsemployeeskillservice.formData.skillid = null;
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
        if (!this.hrmsemployeeskillForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        this.hrmsemployeeskillservice.formData = this.hrmsemployeeskillForm!.value;
        this.hrmsemployeeskillservice.formData.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(this.hrmsemployeeskillservice.formData);
        if (this.hrmsemployeeskillForm.get('skillid')!.value == null || this.hrmsemployeeskillForm.get('skillid')!.value == '' || this.hrmsemployeeskillForm.get('skillid')!.value == 0)
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
        this.hrmsemployeeskillservice.saveOrUpdatehrmsemployeeskills().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeeskillservice.clearList();
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
        this.hrmsemployeeskillservice.saveOrUpdatehrmsemployeeskills().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.hrmsemployeeskillservice.clearList();
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

    AddOrEditskillcategory(masterdataid) {
        let ScreenType = '2';
        /*this.dialog.open(bomasterdataComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bomasterdataservice.getbomasterdatasList().then((res:any) => this.skillcategoryList = res as bomasterdata[]);
        });*/
    }


}



