import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { flmservicerequestdetail } from './../../../model/flmservicerequestdetail.model';
import { NgForm } from '@angular/forms';
import { flmservicerequestService } from './../../../service/flmservicerequest.service';
import { ToastService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { boconfigvalue } from '../../../../../../n-tire-bo-app/src/app/model/boconfigvalue.model';
import { boconfigvalueService } from '../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service';
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-bo-app/src/app/shared/general.validator';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator } from '@angular/forms';
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
import { SharedService } from '../../../../../../n-tire-bo-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service';
import { flmtask, IflmtaskResponse } from './../../../model/flmtask.model';
import { flmtaskService } from './../../../service/flmtask.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';

@Component({
    selector: 'app-flmservicerequestdetails',
    templateUrl: './flmservicerequestdetail.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class flmservicerequestdetailComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    flmservicerequestdetailForm: FormGroup;
    taskidList: flmtask[];
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private flmservicerequestservice: flmservicerequestService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private flmtaskservice: flmtaskService,
        private currentRoute: ActivatedRoute) {
        this.data = dynamicconfig;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.dialogRef.close(),
                preventDefault: true
            },
            {
                key: 'cmd s',
                command: () => this.onSubmitData(false),
                preventDefault: true
            },
            {
                key: 'cmd c',
                command: () => this.dialogRef.close(null),
                preventDefault: true
            }
        ]);
        this.flmservicerequestdetailForm = this.fb.group({
            servicetaskid: [null],
            servicerequestid: [null],
            taskid: [null],
            taskiddesc: [null],
            description: [null],
            vehicleissueid1: [null],
            vehicleissueid2: [null],
            labourcost: [null],
            itemcost: [null],
            remarks: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.flmservicerequestdetailForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.servicetaskid != null && this.data.servicetaskid != undefined) ppk = this.data.servicetaskid;


        if (ppk == null) {
            this.flmservicerequestdetailForm.patchValue({
            });
        }
        else {
            let obj = this.flmservicerequestservice.flmservicerequestdetails.filter(x => x.servicetaskid == ppk)[0];
            this.flmservicerequestdetailForm.patchValue({
                servicetaskid: obj.servicetaskid,
                servicerequestid: obj.servicerequestid,
                taskid: obj.taskid,
                taskiddesc: obj.taskiddesc,
                description: obj.description,
                vehicleissueid1: obj.vehicleissueid1,
                vehicleissueid2: obj.vehicleissueid2,
                labourcost: obj.labourcost,
                itemcost: obj.itemcost,
                remarks: obj.remarks,
                status: obj.status,
            });
        }
        this.flmtaskservice.getflmtasksList().then((res:any) => this.taskidList = res as flmtask[]);
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.flmservicerequestdetailForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.flmservicerequestdetailForm!.value;
        console.log(obj);
        this.dialogRef.close(obj);
    }

    onClose() {
        this.dialogRef.close();
    }

    onSubmitAndWait() {
        this.onSubmitData(false);
    }
    onSubmit() {
        this.onSubmitData(true);
    }
    taskidonChange(evt:any) {
        let e = evt!.value;
        this.flmservicerequestdetailForm.patchValue({ taskiddesc: evt.options[evt.options.selectedIndex].text });
    }
    AddOrEdittaskid(taskid) {
        let ScreenType = '2';
        /*this.dialog.open(flmtaskComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.flmtaskservice.getflmtasksList().then((res:any) => this.taskidList = res as flmtask[]);
        });*/
    }


}


