import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { flmaccident } from './../../../model/flmaccident.model';
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
    selector: 'app-flmaccidents',
    templateUrl: './flmaccident.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class flmaccidentComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    flmaccidentForm: FormGroup;
    driveridList: bousermaster[];
    driverid_bousermastersForm: FormGroup;
    driverid_bousermastersoptions: any;
    driverid_bousermastersformatter: any;
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
        this.flmaccidentForm = this.fb.group({
            accidentid: [null],
            vehicleid: [null],
            description: [null],
            accidentdetails: [null],
            driverid: [null],
            driveriddesc: [null],
            learnerlicense: [null],
            licenseno: [null],
            rto: [null],
            copassengerdetails: [null],
            goodscarried: [null],
            accidenttype: [null],
            accidentplace: [null],
            accidentdate: [null],
            accidenttime: [null],
            policereportlodged: [null],
            policestationname: [null],
            firno: [null],
            insuranceid: [null],
            claimdate: [null],
            claimamount: [null],
            amountreceived: [null],
            comments: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.flmaccidentForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.accidentid != null && this.data.accidentid != undefined) ppk = this.data.accidentid;


        if (ppk == null) {
            this.flmaccidentForm.patchValue({
                accidentdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                claimdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
        }
        else {
            let obj = this.flmvehicleservice.flmaccidents.filter(x => x.accidentid == ppk)[0];
            this.flmaccidentForm.patchValue({
                accidentid: obj.accidentid,
                vehicleid: obj.vehicleid,
                description: obj.description,
                accidentdetails: obj.accidentdetails,
                driverid: obj.driverid,
                driveriddesc: obj.driveriddesc,
                learnerlicense: obj.learnerlicense,
                licenseno: obj.licenseno,
                rto: obj.rto,
                copassengerdetails: obj.copassengerdetails,
                goodscarried: obj.goodscarried,
                accidenttype: obj.accidenttype,
                accidentplace: obj.accidentplace,
                accidentdate: this.ngbDateParserFormatter.parse(obj.accidentdate as any),
                accidenttime: obj.accidenttime,
                policereportlodged: obj.policereportlodged,
                policestationname: obj.policestationname,
                firno: obj.firno,
                insuranceid: obj.insuranceid,
                claimdate: this.ngbDateParserFormatter.parse(obj.claimdate as any),
                claimamount: obj.claimamount,
                amountreceived: obj.amountreceived,
                comments: obj.comments,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.flmaccidentForm.get('attachment').value != "" && this.flmaccidentForm.get('attachment').value != null) this.attachmentfieldjson = JSON.parse(this.flmaccidentForm.get('attachment').value);
        }
        this.bousermasterservice.getbousermastersList().then((res:any) => this.driveridList = res as bousermaster[]);
        this.driverid_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.driveridList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.driverid_bousermastersformatter = (result: any) => result.username;
    }

    onSelecteddriverid(driveridDetail: any) {
        if (driveridDetail) {
            this.flmaccidentForm.patchValue({ driverid: driveridDetail.item.userid });
            this.flmaccidentForm.patchValue({ driveriddesc: driveridDetail.item.username });
            driveridDetail.preventDefault();

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
        if (!this.flmaccidentForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.flmaccidentForm.value;
        obj.accidentdate = this.ngbDateParserFormatter.format(this.flmaccidentForm.get('accidentdate').value);
        obj.accidenttime = (this.flmaccidentForm.get('accidenttime').value == null ? 0 : this.flmaccidentForm.get('accidenttime').value.hour) + ':' + (this.flmaccidentForm.get('accidenttime').value == null ? 0 : this.flmaccidentForm.get('accidenttime').value.minute);
        obj.claimdate = this.ngbDateParserFormatter.format(this.flmaccidentForm.get('claimdate').value);
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
    driveridonChange(evt:any) {
        let e = evt.value;
    }
    AddOrEditdriverid(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.driveridList = res as bousermaster[]);
        });*/
    }


}


