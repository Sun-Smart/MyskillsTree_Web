import { erpmaterialissueService } from '../../../../../../n-tire-procurement-app/src/app/service/erpmaterialissue.service';
import { erpmaterialissue } from '../../../../../../n-tire-procurement-app/src/app/model/erpmaterialissue.model';
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
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';

@Component({
    selector: 'app-erpmaterialissue',
    templateUrl: './erpmaterialissue.component.html',
    styles: []
})



export class erpmaterialissueComponent implements OnInit {
    showsubmit: boolean = true;
    showGoWorkFlow: boolean = false;
    toolbarvisible: boolean = true;
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
    bfilterPopulateerpmaterialissues: boolean = false;
    erpmaterialissueForm: FormGroup;
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    formid: any;


    constructor(
        private router: Router,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private erpmaterialissueservice: erpmaterialissueService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private toastr: ToastService,
        //private dialog: NbDialogService,
        private configservice: boconfigvalueService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.erpmaterialissueForm = this.fb.group({
            branchid: [null],
            issuetype: [null],
            referenceid: [null],
            miid: [null],
            itemid: [null],
            uom: [null],
            locationid: [null],
            binlocationid: [null],
            requestedqty: [null],
            issueqty: [null],
            serialbatch: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.erpmaterialissueForm.controls; }

    clone(obj) {
        if (null == obj || "object" != typeof obj) return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
        }
        return copy;
    }
    ToolBar(prop:any) {
        this.toolbarvisible = prop;
    }
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;
        if (this.erpmaterialissueForm.dirty || this.erpmaterialissueForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }
    async ngOnInit() {
        //debugger;
        let erpmaterialissue = null;

        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data != null && this.data.miid != null) {
            erpmaterialissue = this.data.miid;
        }
        else
            erpmaterialissue = this.currentRoute.snapshot.paramMap.get('id');
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid')!.split(',');
        }
        this.formid = erpmaterialissue;
        //this.sharedService.alert(erpmaterialissue);
        if (erpmaterialissue == null) {
            this.resetForm();
        }
        else {
            this.PopulateScreen(erpmaterialissue);
        }
        this.erpmaterialissueForm.markAsUntouched();
        this.erpmaterialissueForm.markAsPristine();
    }



    resetForm() {
        if (this.erpmaterialissueForm != null)
            this.erpmaterialissueForm.reset();
        var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
        if (this.data != null) {
            for (let key in this.data) {

                let json = JSON.parse('{"' + key + '": "' + this.data[key] + '" }');
                if (this.erpmaterialissueForm.controls[key] != null) {
                    this.erpmaterialissueForm.patchValue(json);
                    this.erpmaterialissueForm.controls[key].disable({ onlySelf: true });
                }
            }
        }
    }

    onDelete() {
        let miid = this.erpmaterialissueForm.get('miid')!.value;
        if (miid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.erpmaterialissueservice.deleteerpmaterialissue(miid).then((res:any) => {
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
        this.erpmaterialissueForm.patchValue({
            miid: null
        });
        this.erpmaterialissueservice.formData.miid = null;
    }
    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    PopulateScreen(erpmaterialissue: any) {
        this.erpmaterialissueservice.geterpmaterialissuesByID(parseInt(erpmaterialissue)).then((res:any) => {
            console.log(res);
            //console.log(res.order);
            //console.log(res.orderDetails);
            this.erpmaterialissueForm.patchValue({
                branchid: res.erpmaterialissue.branchid,
                issuetype: res.erpmaterialissue.issuetype,
                referenceid: res.erpmaterialissue.referenceid,
                miid: res.erpmaterialissue.miid,
                itemid: res.erpmaterialissue.itemid,
                uom: res.erpmaterialissue.uom,
                locationid: res.erpmaterialissue.locationid,
                binlocationid: res.erpmaterialissue.binlocationid,
                requestedqty: res.erpmaterialissue.requestedqty,
                issueqty: res.erpmaterialissue.issueqty,
                serialbatch: res.erpmaterialissue.serialbatch,
                status: res.erpmaterialissue.status,
                statusdesc: res.erpmaterialissue.statusdesc,
            });
        });
    }
    validate() {
        let ret = true;
        return ret;
    }
    onSubmitData(bclear:any) {
        //debugger;
        this.isSubmitted = true;
        if (!this.erpmaterialissueForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.erpmaterialissueservice.formData = this.erpmaterialissueForm!.value;
        console.log(this.erpmaterialissueservice.formData);
        if (this.erpmaterialissueForm.get('miid')!.value == null || this.erpmaterialissueForm.get('miid')!.value == '' || this.erpmaterialissueForm.get('miid')!.value == 0)
            this.insertRecord(bclear);
        else
            this.updateRecord(bclear);
        if (this.data != null && (this.data.ScreenType == 1 || this.data.ScreenType == 2)) {
            this.dialogRef.close();
        }
    }



    insertRecord(bclear:any) {
        this.erpmaterialissueservice.saveOrUpdateerpmaterialissues().subscribe(
            (res:any) => {
                //debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.erpmaterialissueservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    this.PopulateScreen(res);
                }
                this.erpmaterialissueForm.markAsUntouched();
                this.erpmaterialissueForm.markAsPristine();
            },
            (err:any) => {
                //debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }
    updateRecord(bclear:any) {
        this.erpmaterialissueservice.saveOrUpdateerpmaterialissues().subscribe(
            (res:any) => {
                this.toastr.addSingle("success", "", "Successfully saved");
                this.erpmaterialissueservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    this.PopulateScreen(res);
                }
                this.erpmaterialissueForm.markAsUntouched();
                this.erpmaterialissueForm.markAsPristine();
            },
            (err:any) => {
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }

}



