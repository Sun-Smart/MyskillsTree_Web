import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { hmswardincharge } from './../../../model/hmswardincharge.model';
import { NgForm } from '@angular/forms';
import { hmswardService } from './../../../service/hmsward.service';
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

@Component({
    selector: 'app-hmswardincharges',
    templateUrl: './hmswardincharge.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class hmswardinchargeComponent implements OnInit {
    customfieldservicelist: any;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    hmswardinchargeForm: FormGroup;
    inchargeList: bousermaster[];
    incharge_bousermastersForm: FormGroup;
    incharge_bousermastersoptions: any;
    incharge_bousermastersformatter: any;
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private hmswardservice: hmswardService,
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
        this.hmswardinchargeForm = this.fb.group({
            wardinchargeid: [null],
            wardid: [null],
            incharge: [null],
            inchargedesc: [null],
            starttime: [null],
            endtime: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hmswardinchargeForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.wardinchargeid != null && this.data.wardinchargeid != undefined) ppk = this.data.wardinchargeid;


        if (ppk == null) {
            this.hmswardinchargeForm.patchValue({
            });
        }
        else {
            let obj = this.hmswardservice.hmswardincharges.filter(x => x.wardinchargeid == ppk)[0];
            this.hmswardinchargeForm.patchValue({
                wardinchargeid: obj.wardinchargeid,
                wardid: obj.wardid,
                incharge: obj.incharge,
                inchargedesc: obj.inchargedesc,
                starttime: obj.starttime,
                endtime: obj.endtime,
                status: obj.status,
            });
        }
        this.bousermasterservice.getbousermastersList().then((res:any) => this.inchargeList = res as bousermaster[]);
        this.incharge_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.inchargeList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.incharge_bousermastersformatter = (result: any) => result.username;
    }

    onSelectedincharge(inchargeDetail: any) {
        if (inchargeDetail) {
            this.hmswardinchargeForm.patchValue({ incharge: inchargeDetail.item.userid });
            this.hmswardinchargeForm.patchValue({ inchargedesc: inchargeDetail.item.username });
            inchargeDetail.preventDefault();

        }
    }


    onSubmitData(bclear:any) {
        this.isSubmitted = true;
        if (!this.hmswardinchargeForm.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.hmswardinchargeForm!.value;
        obj.starttime = (this.hmswardinchargeForm.get('starttime')!.value == null ? 0 : this.hmswardinchargeForm.get('starttime')!.value.hour) + ':' + (this.hmswardinchargeForm.get('starttime')!.value == null ? 0 : this.hmswardinchargeForm.get('starttime')!.value.minute);
        obj.endtime = (this.hmswardinchargeForm.get('endtime')!.value == null ? 0 : this.hmswardinchargeForm.get('endtime')!.value.hour) + ':' + (this.hmswardinchargeForm.get('endtime')!.value == null ? 0 : this.hmswardinchargeForm.get('endtime')!.value.minute);
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
    inchargeonChange(evt:any) {
        let e = evt!.value;
    }
    AddOrEditincharge(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.inchargeList = res as bousermaster[]);
        });*/
    }


}


