import { Component, OnInit, Inject, Optional, ViewChild } from '@angular/core';
import { crmticketdetail } from './../../../model/crmticketdetail.model';
import { NgForm } from '@angular/forms';
import { crmticketService } from './../../../service/crmticket.service';
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
import { bouserrolemaster, IbouserrolemasterResponse } from '../../../../../../n-tire-bo-app/src/app/model/bouserrolemaster.model';
import { bouserrolemasterService } from '../../../../../../n-tire-bo-app/src/app/service/bouserrolemaster.service';
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { DialogService } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { customfieldconfigurationService } from '../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-bo-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-bo-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';
import { AppConstants } from '../../../../../../n-tire-bo-app/src/app/shared/helper';

@Component({
    selector: 'app-crmticketdetails',
    templateUrl: './crmticketdetail.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})
export class crmticketdetailComponent implements OnInit {
    customfieldservicelist: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    isSubmitted: boolean = false;
    isValid: boolean = true;
    crmticketdetailForm: FormGroup;
    assignedtypeList: boconfigvalue[]=[];
    assigneduserList: bousermaster[];
    assigneduser_bousermastersForm: FormGroup;
    assigneduser_bousermastersoptions: any;
    assigneduser_bousermastersformatter: any;
    assignedroleList: bouserrolemaster[];
    actionuserList: bousermaster[];
    actionuser_bousermastersForm: FormGroup;
    actionuser_bousermastersoptions: any;
    actionuser_bousermastersformatter: any;
    shortcuts: ShortcutInput[] = [];
    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };

    data: any;
    customfieldjson: any;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileattachmentlist: any[] = []; @ViewChild('fileattachment', { static: false }) fileattachment: FileUpload; attachmentfieldjson: any[] = [];

    constructor(
        private keyboard: KeyboardShortcutsService,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        private crmticketservice: crmticketService,
        public ngbDateParserFormatter: NgbDateParserFormatter,
        private fb: FormBuilder,
        private toastr: ToastService,
        private dialog: DialogService,
        private sharedService: SharedService,
        public sessionService: SessionService,
        private configservice: boconfigvalueService,
        private bousermasterservice: bousermasterService,
        private bouserrolemasterservice: bouserrolemasterService,
        private customfieldservice: customfieldconfigurationService,
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
        this.crmticketdetailForm = this.fb.group({
            ticketdetailid: [null],
            ticketid: [null],
            orderno: [null],
            assignedtype: [null],
            assignedtypedesc: [null],
            assigneduser: [null],
            assigneduserdesc: [null],
            assignedrole: [null],
            assignedroledesc: [null],
            actionuser: [null],
            actionuserdesc: [null],
            assigneddate: [null],
            actiondate: [null],
            tatends: [null],
            actionremarks: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.crmticketdetailForm.controls; }


    async ngOnInit() {
        if (this.data != null && this.data.data != null) this.data = this.data.data;
        if (this.data.CustomFormName != null && this.data.CustomFormName != "") this.CustomFormName = this.data.CustomFormName;
        if (this.data.CustomFormField != null && this.data.CustomFormField != "") this.CustomFormField = this.data.CustomFormField;
        if (this.data.CustomFormFieldValue != null && this.data.CustomFormFieldValue != "") this.CustomFormFieldValue = this.data.CustomFormFieldValue;
        let ppk = null;
        if (this.currentRoute.snapshot.paramMap.get('id') != null && this.currentRoute.snapshot.paramMap.get('id') != undefined) ppk = this.currentRoute.snapshot.paramMap.get('id');
        if (this.data.ticketdetailid != null && this.data.ticketdetailid != undefined) ppk = this.data.ticketdetailid;


        if (ppk == null) {
            this.crmticketdetailForm.patchValue({
                assigneddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                actiondate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
                tatends: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            });
            this.FillCustomField();
        }
        else {
            let obj = this.crmticketservice.crmticketdetails.filter(x => x.ticketdetailid == ppk)[0];
            this.crmticketdetailForm.patchValue({
                ticketdetailid: obj.ticketdetailid,
                ticketid: obj.ticketid,
                orderno: obj.orderno,
                assignedtype: obj.assignedtype,
                assignedtypedesc: obj.assignedtypedesc,
                assigneduser: obj.assigneduser,
                assigneduserdesc: obj.assigneduserdesc,
                assignedrole: obj.assignedrole,
                assignedroledesc: obj.assignedroledesc,
                actionuser: obj.actionuser,
                actionuserdesc: obj.actionuserdesc,
                assigneddate: this.ngbDateParserFormatter.parse(obj.assigneddate as any),
                actiondate: this.ngbDateParserFormatter.parse(obj.actiondate as any),
                tatends: this.ngbDateParserFormatter.parse(obj.tatends as any),
                actionremarks: obj.actionremarks,
                customfield: obj.customfield,
                attachment: obj.attachment,
                status: obj.status,
            });
            if (this.crmticketdetailForm.get('customfield').value != "" && this.crmticketdetailForm.get('customfield').value != null) this.customfieldjson = JSON.parse(this.crmticketdetailForm.get('customfield').value);
            this.FillCustomField();
            if (this.crmticketdetailForm.get('attachment').value != "" && this.crmticketdetailForm.get('attachment').value != null) this.attachmentfieldjson = JSON.parse(this.crmticketdetailForm.get('attachment').value);
        }
        this.configservice.getList("assignedtype").then((res:any) => this.assignedtypeList = res as boconfigvalue[]);
        this.bousermasterservice.getbousermastersList().then((res:any) => this.assigneduserList = res as bousermaster[]);
        this.assigneduser_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.assigneduserList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.assigneduser_bousermastersformatter = (result: any) => result.username;
        this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => this.assignedroleList = res as bouserrolemaster[]);
        this.bousermasterservice.getbousermastersList().then((res:any) => this.actionuserList = res as bousermaster[]);
        this.actionuser_bousermastersoptions = (text$: Observable<string>) =>
            text$.pipe(
                debounceTime(200),
                map(value => value.length < 2 ? []
                    : this.actionuserList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10))
            );
        this.actionuser_bousermastersformatter = (result: any) => result.username;
    }

    onSelectedassigneduser(assigneduserDetail: any) {
        if (assigneduserDetail) {
            this.crmticketdetailForm.patchValue({ assigneduser: assigneduserDetail.item.userid });
            this.crmticketdetailForm.patchValue({ assigneduserdesc: assigneduserDetail.item.username });
            assigneduserDetail.preventDefault();

        }
    }

    onSelectedactionuser(actionuserDetail: any) {
        if (actionuserDetail) {
            this.crmticketdetailForm.patchValue({ actionuser: actionuserDetail.item.userid });
            this.crmticketdetailForm.patchValue({ actionuserdesc: actionuserDetail.item.username });
            actionuserDetail.preventDefault();

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
        if (!this.crmticketdetailForm.valid || (this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.crmticketdetailForm.value;
        obj.assigneddate = this.ngbDateParserFormatter.format(this.crmticketdetailForm.get('assigneddate').value);
        obj.actiondate = this.ngbDateParserFormatter.format(this.crmticketdetailForm.get('actiondate').value);
        obj.tatends = this.ngbDateParserFormatter.format(this.crmticketdetailForm.get('tatends').value);
        obj.customfield = JSON.stringify(customfields);
        obj.attachment = JSON.stringify(this.attachmentfieldjson);
        console.log(obj);
        this.sharedService.upload(this.fileattachmentlist);
        this.attachmentlist = [];
        this.fileattachment.clear();
        this.dialogRef.close(obj);
    }

    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("crmticketdetails", this.CustomFormName, "", "", this.customfieldjson).then((res:any) => {
            this.customfieldservicelist = res;
            return res;
        });


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
    assignedtypeonChange(evt:any) {
        let e = evt.value;
        this.crmticketdetailForm.patchValue({ assignedtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    assigneduseronChange(evt:any) {
        let e = evt.value;
    }
    assignedroleonChange(evt:any) {
        let e = evt.value;
        this.crmticketdetailForm.patchValue({ assignedroledesc: evt.options[evt.options.selectedIndex].text });
    }
    actionuseronChange(evt:any) {
        let e = evt.value;
    }
    AddOrEditassigneduser(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.assigneduserList = res as bousermaster[]);
        });*/
    }

    AddOrEditassignedrole(userroleid) {
        let ScreenType = '2';
        /*this.dialog.open(bouserrolemasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bouserrolemasterservice.getbouserrolemastersList().then((res:any) => this.assignedroleList = res as bouserrolemaster[]);
        });*/
    }

    AddOrEditactionuser(userid) {
        let ScreenType = '2';
        /*this.dialog.open(bousermasterComponent, 
        {
        data: { ScreenType }
        } 
        ).onClose.subscribe((res:any) => {
        this.bousermasterservice.getbousermastersList().then((res:any) => this.actionuserList = res as bousermaster[]);
        });*/
    }


}


