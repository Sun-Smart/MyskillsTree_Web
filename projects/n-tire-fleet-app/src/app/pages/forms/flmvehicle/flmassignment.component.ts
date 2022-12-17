import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { flmassignment } from './../../../model/flmassignment.model';
import { NgForm } from '@angular/forms';
import { flmvehicleService } from './../../../service/flmvehicle.service';
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
import { bousermaster, IbousermasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bousermaster.model';
import { bousermasterService } from '../../../../../../n-tire-bo-app/src/app/service/bousermaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-flmassignments',
    templateUrl: './flmassignment.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class flmassignmentComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    flmassignmentForm: FormGroup;
    useridList: bousermaster[];
    userid_bousermastersForm: FormGroup;
    userid_bousermastersoptions: any;
    userid_bousermastersformatter: any;
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private flmvehicleservice: flmvehicleService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private bousermasterservice: bousermasterService,
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
        this.flmassignmentForm = this.fb.group({
            assignmentid: [null],
            vehicleid: [null],
            description: [null],
            userid: [null],
            useriddesc: [null],
            startdate: [null],
            starttime: [null],
            odometerstart: [null],
            enddate: [null],
            endtime: [null],
            odometerend: [null],
            userremarks: [null],
            comments: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.flmassignmentForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.assignmentid != null && this.data.assignmentid != undefined) ppk = this.data.assignmentid;


        if (ppk == null) {
            this.flmassignmentForm.patchValue({
                startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                enddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.flmvehicleservice.flmassignments.filter(x => x.assignmentid == ppk)[0];
            this.flmassignmentForm.patchValue({
                assignmentid: obj.assignmentid,
                vehicleid: obj.vehicleid,
                description: obj.description,
                userid: obj.userid,
                useriddesc: obj.useriddesc,
                startdate: this.ngbDateParserFormatter.parse(obj.startdate as any),
                starttime: obj.starttime,
                odometerstart: obj.odometerstart,
                enddate: this.ngbDateParserFormatter.parse(obj.enddate as any),
                endtime: obj.endtime,
                odometerend: obj.odometerend,
                userremarks: obj.userremarks,
                comments: obj.comments,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.flmassignmentForm.get('attachment')!.value != "" && this.flmassignmentForm.get('attachment')!.value != null) this.attachmentfieldjson = JSON.parse(this.flmassignmentForm.get('attachment')!.value);
        }
        this.bousermasterservice.getbousermastersList().then((res:any) => this.useridList = res as bousermaster[]);
        this.userid_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.useridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.userid_bousermastersformatter = (result: any) => result.username;
    }

    onSelecteduserid(useridDetail: any) {
        if (useridDetail) {
            this.flmassignmentForm.patchValue({ userid: useridDetail.item.userid });
            this.flmassignmentForm.patchValue({ useriddesc: useridDetail.item.username });
            useridDetail.preventDefault();

        }
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
        this.isSubmitted = true;
        if (!this.flmassignmentForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.flmassignmentForm!.value;
        obj.startdate = this.ngbDateParserFormatter.format(this.flmassignmentForm.get('startdate')!.value);
        obj.starttime = (this.flmassignmentForm.get('starttime')!.value == null ? 0 : this.flmassignmentForm.get('starttime')!.value.hour) + ':' + (this.flmassignmentForm.get('starttime')!.value == null ? 0 : this.flmassignmentForm.get('starttime')!.value.minute);
        obj.enddate = this.ngbDateParserFormatter.format(this.flmassignmentForm.get('enddate')!.value);
        obj.endtime = (this.flmassignmentForm.get('endtime')!.value == null ? 0 : this.flmassignmentForm.get('endtime')!.value.hour) + ':' + (this.flmassignmentForm.get('endtime')!.value == null ? 0 : this.flmassignmentForm.get('endtime')!.value.minute);
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
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
    useridonChange(evt:any) {
        let e = evt!.value;
    }
    AddOrEdituserid(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.useridList = res as bousermaster[]);
        });*/
    }


}


