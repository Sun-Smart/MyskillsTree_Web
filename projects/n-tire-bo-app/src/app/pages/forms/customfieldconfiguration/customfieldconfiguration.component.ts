import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/smart-table-datepicker.component';
import { LocalDataSource } from 'ng2-smart-table';
import {Ng2SmartTableComponent} from 'ng2-smart-table';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';

@Component({
    selector: 'app-customfieldconfiguration',
    templateUrl: './customfieldconfiguration.component.html',
    styles: []
})



export class customfieldconfigurationComponent implements OnInit {
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    data3: any = [];
    bfilterPopulatecustomfieldconfigurations: boolean = false;
    datacustomfieldconfigurationsfieldtype3: any = [];
    customfieldconfigurationForm: FormGroup;
    fieldtypeList: boconfigvalue[]=[];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;
    attachmentlist: any[] = [];

    constructor(
        private router: Router,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private customfieldconfigurationservice: customfieldconfigurationService,
        private fb: FormBuilder,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.customfieldconfigurationForm = this.fb.group({
            customfieldid: [null],
            company: [null],
            tablename: [null],
            fieldname: [null],
            fieldtype: [null],
            fieldtypeDesc: [null],
            fieldvalues: [null],
            labelname: [null],
            sequence: [null],
            status: [null],
            statusDesc: [null],
        });
    }
    get f() { return this.customfieldconfigurationForm.controls; }

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
        let customfieldconfiguration = null;

        if (this.data != null && this.data.customfieldid != null) {
            customfieldconfiguration = this.data.customfieldid;
        }
        else
            customfieldconfiguration = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = customfieldconfiguration;
        //this.sharedService.alert(customfieldconfiguration);
        if (customfieldconfiguration == null) {
            this.resetForm();
        }
        else {
            this.customfieldconfigurationservice.getcustomfieldconfigurationsByID(parseInt(customfieldconfiguration)).then((res:any) => {
                console.log(res);
                //console.log(res.order);
                //console.log(res.orderDetails);
                this.customfieldconfigurationForm.patchValue({
                    customfieldid: res.customfieldconfiguration.customfieldid,
                    company: res.customfieldconfiguration.company,
                    tablename: res.customfieldconfiguration.tablename,
                    fieldname: res.customfieldconfiguration.fieldname,
                    fieldtype: res.customfieldconfiguration.fieldtype,
                    fieldtypeDesc: res.customfieldconfiguration.fieldtypeDesc,
                    fieldvalues: res.customfieldconfiguration.fieldvalues,
                    labelname: res.customfieldconfiguration.labelname,
                    sequence: res.customfieldconfiguration.sequence,
                    status: res.customfieldconfiguration.status,
                    statusDesc: res.customfieldconfiguration.statusDesc,
                });
            });
        }
        this.configservice.getList("fieldtype").then((res:any) => this.fieldtypeList = res as boconfigvalue[]);
    }



    resetForm() {
        if (this.customfieldconfigurationForm != null)
            this.customfieldconfigurationForm.reset();
    }

    onDelete() {
        let customfieldid = this.customfieldconfigurationForm.get('customfieldid').value;
        if (customfieldid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.customfieldconfigurationservice.deletecustomfieldconfiguration(customfieldid).then((res:any) => {
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
        this.customfieldconfigurationForm.patchValue({
            customfieldid: null
        });
        this.customfieldconfigurationservice.formData.customfieldid = null;
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
        if (!this.customfieldconfigurationForm.valid)
            return;
        this.customfieldconfigurationservice.formData = new customfieldconfiguration(this.customfieldconfigurationForm.get('customfieldid').value, this.customfieldconfigurationForm.get('company').value, this.customfieldconfigurationForm.get('tablename').value, this.customfieldconfigurationForm.get('fieldname').value, this.customfieldconfigurationForm.get('fieldtype').value, this.customfieldconfigurationForm.get('fieldtypeDesc').value, this.customfieldconfigurationForm.get('fieldvalues').value, this.customfieldconfigurationForm.get('labelname').value, this.customfieldconfigurationForm.get('sequence').value, this.customfieldconfigurationForm.get('status').value);
        console.log(this.customfieldconfigurationservice.formData);
        if (this.customfieldconfigurationForm.get('customfieldid').value == null || this.customfieldconfigurationForm.get('customfieldid').value == '' || this.customfieldconfigurationForm.get('customfieldid').value == 0)
            this.insertRecord(bclear);
        else
            this.updateRecord(bclear);
        if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close();
        }
    }



    insertRecord(bclear:any) {
        this.customfieldconfigurationservice.saveOrUpdatecustomfieldconfigurations().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.customfieldconfigurationservice.clearList();
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
        this.customfieldconfigurationservice.saveOrUpdatecustomfieldconfigurations().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                if (bclear) {
                    this.customfieldconfigurationservice.clearList();
                    this.resetForm();
                }
            },
            (err:any) => {
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }

}



