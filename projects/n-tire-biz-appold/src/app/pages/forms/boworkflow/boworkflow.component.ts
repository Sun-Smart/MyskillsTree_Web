import { boworkflowService } from './../../../service/boworkflow.service';
import { boworkflow } from './../../../model/boworkflow.model';
import { ElementRef, Component, OnInit, Inject, Optional, ViewChild, EventEmitter } from '@angular/core';
import { ToastService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { DomSanitizer, SafeHtml } from "@angular/platform-browser";
//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//Custom error functions
import { KeyValuePair, MustMatch, DateCompare, MustEnable, MustDisable, Time } from '../../../../../../n-tire-biz-app/src/app/shared/general.validator';

//child table
import { SmartTableDatepickerComponent, SmartTableDatepickerRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component';
import { SmartTablepopupselectComponent, SmartTablepopupselectRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-popupselect.component';
import { SmartTableFileRenderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/smart-table-filerender.component';

//Custom control
import { durationComponent } from '../../../../../../n-tire-biz-app/src/app/custom/duration.component';
import { LocalDataSource } from 'ng2-smart-table';
import { Ng2SmartTableComponent } from 'ng2-smart-table';
import { NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ShortcutInput, ShortcutEventOutput } from "ng-keyboard-shortcuts";
//Shortcuts
import { KeyboardShortcutsService } from "ng-keyboard-shortcuts";
//translator
import { TranslateService } from "@ngx-translate/core";
//FK field services
//detail table services
import { switchMap, map, debounceTime } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, FormControl, Validators, EmailValidator, ValidationErrors } from '@angular/forms';
//primeng services
import { DynamicDialogRef } from 'primeng/dynamicDialog';
import { DynamicDialogConfig } from 'primeng/dynamicDialog';
import { FileUploadModule, FileUpload } from 'primeng/fileupload';
import { DialogService } from 'primeng/dynamicDialog';
//session,application constants
import { SharedService } from '../../../../../../n-tire-biz-app/src/app/service/shared.service';
import { SessionService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ThemeService } from '../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service';
//custom fields & attachments
import { AppConstants, DropDownValues } from '../../../../../../n-tire-biz-app/src/app/shared/helper';
import { Subject } from 'rxjs/Subject';
import { WebcamImage, WebcamInitError, WebcamUtil } from 'ngx-webcam';
import { createWorker, RecognizeResult } from 'tesseract.js';
import { AttachmentComponent } from '../../../../../../n-tire-biz-app/src/app/custom/attachment/attachment.component';
import { customfieldconfigurationService } from '../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service';
import { customfieldconfiguration } from '../../../../../../n-tire-biz-app/src/app/model/customfieldconfiguration.model';
import { DynamicFormBuilderComponent } from '../../../../../../n-tire-biz-app/src/app/custom/dynamic-form-builder/dynamic-form-builder.component';

@Component({
    selector: 'app-boworkflow',
    templateUrl: './boworkflow.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class boworkflowComponent implements OnInit {
    formData: boworkflow;
    list: boworkflow[];
    bmyrecord: boolean = false;
    hidelist: any = [];
    objvalues: any = [];
    viewHtml: any = '';//stores html view of the screen
    showview: boolean = false;//view or edit mode
    theme: string = "";//current theme
    //formdata: any;//current form data
    shortcuts: ShortcutInput[] = [];//keyboard keys
    showSubmit: boolean = true;//button to show
    showGoWorkFlow: boolean = false;
    pkList: any;//stores values - used in search, prev, next
    pkoptionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete of pk
    toolbarVisible: boolean = true;
    customFieldServiceList: any;
    @ViewChild('customform', { static: false }) customform: DynamicFormBuilderComponent;
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    p_menuid: any;
    p_currenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    maindata: any;

    bfilterPopulate_boworkflows: boolean = false;
    boworkflow_menuactions: any = []

    boworkflow_Form: FormGroup;

    currentapproved_List: DropDownValues[];
    currentapproved_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    standardrating_List: DropDownValues[];
    performancerating_List: DropDownValues[];
    performancestatus_List: DropDownValues[];
    workflowstatus_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    customFieldJson: any;
    customFieldVisible: boolean = true;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentFieldJson: any[] = [];
    attachmentVisible: boolean = true;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;






    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private boworkflow_service: boworkflowService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
        private customfieldservice: customfieldconfigurationService,
        private sanitizer: DomSanitizer,
        private currentRoute: ActivatedRoute, private spinner: NgxSpinnerService) {
        this.translate = this.sharedService.translate;
        this.data = dynamicconfig;
        this.p_menuid = sharedService.menuid;
        this.p_currenturl = sharedService.currenturl;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.router.navigate(["/home/" + this.p_currenturl]),
                preventDefault: true
            },
            {
                key: 'cmd s',
                command: () => this.onSubmitData(false),
                preventDefault: true
            },
            {
                key: 'cmd f',
                command: () => this.resetForm(),
                preventDefault: true
            }
        ]);
        this.boworkflow_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            workflowid: [null],
            workflowmasterid: [null],
            currentstepno: [null],
            modulename: [null],
            pkvalue: [null],
            currentapproved: [null],
            currentapproveddesc: [null],
            currentapprovers: [null],
            nextapprovers: [null],
            assigneddatetime: [null],
            closeddatetime: [null],
            standardrating: [null],
            standardratingdesc: [null],
            performancerating: [null],
            performanceratingdesc: [null],
            performancestatus: [null],
            performancestatusdesc: [null],
            exception: [null],
            approvedusers: [null],
            approvedcondition: [null],
            tathours: [null],
            totalactualtime: [null],
            processid: [null],
            workflowdetails: [null],
            comments: [null],
            history: [null],
            lastapprover: [null],
            cc: [null],
            customfield: [null],
            attachment: [null],
            workflowstatus: [null],
            workflowstatusdesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.boworkflow_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.boworkflow_Form.dirty && this.boworkflow_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return Observable.of(true).delay(1000);
            } else {
                return Observable.of(false);
            }
        }
        return Observable.of(true);
    }

    //check Unique fields

    //navigation buttons
    first() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[0].pkcol);
    }

    last() {
        if (this.pkList.length > 0) this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }

    prev() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.workflowid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.workflowid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.workflowid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }

    // initialize
    async ngOnInit() {
        //session & theme
        this.themeService.theme.subscribe((val: string) => {
            this.theme = val;
        });

        this.sessionData = this.sessionService.getSession();
        if (this.sessionData != null) {
            this.SESSIONUSERID = this.sessionData.userid;
        }

        this.theme = this.sessionService.getItem('selected-theme');
        //this.viewHtml=this.sessionService.getViewHtml();

        debugger;
        //getting data - from list page, from other screen through dialog
        if (this.data != null && this.data.data != null) {
            this.data = this.data.data;
            this.maindata = this.data;
        }
        if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null) this.showview = this.maindata.showview;
        if (this.maindata != null && this.maindata.ScreenType != undefined && this.maindata.ScreenType != null) {
            this.viewHtml = '';
        }
        if (this.data != null && this.data.event != null && this.data.event.data != null) this.data = this.data.event.data;
        if (this.currentRoute.snapshot.paramMap.get('sourceKey') != null) {
            this.sourceKey = this.currentRoute.snapshot.paramMap.get('sourceKey');
        }
        let boworkflowid = null;

        //if view button(eye) is clicked
        if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
            this.showview = true;
            //this.viewHtml=this.sessionService.getViewHtml();
        }
        else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
            this.pkcol = this.sessionService.getItem('usersource');
        }
        else if (this.data != null && this.data.pkcol != null) {
            this.pkcol = this.data.pkcol;
        }
        else {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
            this.showFormType = this.currentRoute.snapshot.paramMap.get('showFormType');
        }
        //copy the data from previous dialog 
        this.viewHtml = ``;
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
        }
        this.formid = boworkflowid;
        //alert(boworkflowid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.boworkflow_service.getDefaultData().then(res => {
            this.currentapproved_List = res.list_currentapproved.value;
            this.standardrating_List = res.list_standardrating.value;
            this.performancerating_List = res.list_performancerating.value;
            this.performancestatus_List = res.list_performancestatus.value;
            this.workflowstatus_List = res.list_workflowstatus.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.boworkflow_service.get_boworkflows_List().then(res => {
            this.pkList = res as boworkflow[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.boworkflow_Form.markAsUntouched();
        this.boworkflow_Form.markAsPristine();
    }
    onSelected_currentapproved(currentapprovedDetail: any) {
        if (currentapprovedDetail.value && currentapprovedDetail) {
            this.boworkflow_Form.patchValue({
                currentapproved: currentapprovedDetail.value,
                currentapproveddesc: currentapprovedDetail.label,

            });

        }
    }




    resetForm() {
        if (this.boworkflow_Form != null)
            this.boworkflow_Form.reset();
        this.boworkflow_Form.patchValue({
            currentapproved: this.sessionData.userid,
            currentapproveddesc: this.sessionData.username,
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let workflowid = this.boworkflow_Form.get('workflowid').value;
        if (workflowid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boworkflow_service.delete_boworkflow(workflowid).then(res => {
                    this.resetForm();
                }
                ).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boworkflow_Form.patchValue({
            workflowid: null
        });
        if (this.formData.workflowid != null) this.formData.workflowid = null;
    }
    PopulateFromMainScreen(mainscreendata: any, bdisable: any) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {

                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        json = "";
                    else if (key == "currentapprovers")
                        this.boworkflow_Form.patchValue({ "currentapprovers": mainscreendata[key] });
                    else if (key == "nextapprovers")
                        this.boworkflow_Form.patchValue({ "nextapprovers": mainscreendata[key] });
                    else if (key == "assigneddatetime")
                        this.boworkflow_Form.patchValue({ "assigneddatetime": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "closeddatetime")
                        this.boworkflow_Form.patchValue({ "closeddatetime": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "approvedusers")
                        this.boworkflow_Form.patchValue({ "approvedusers": mainscreendata[key] });
                    else if (key == "comments")
                        this.boworkflow_Form.patchValue({ "comments": mainscreendata[key] });
                    else if (key == "lastapprover")
                        this.boworkflow_Form.patchValue({ "lastapprover": mainscreendata[key] });
                    else if (key == "cc")
                        this.boworkflow_Form.patchValue({ "cc": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.boworkflow_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boworkflow_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boworkflow_Form.controls[key] != undefined) {
                                this.boworkflow_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("boworkflows", this.CustomFormName, "", "", this.customFieldJson).then(res => {
            this.customFieldServiceList = res;
            if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
            return res;
        });


    }
    onClose() {
        this.dialogRef.close(this.objvalues);
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
            this.onSubmitData(false);
        }
        else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.onSubmitDataDlg(false);
        }
        else {
            this.onSubmitData(false);
        }
    }
    onSubmit() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    currentapproved_onChange(evt: any) {
        let e = evt.value;
    }
    standardrating_onChange(evt: any) {
        let e = this.f.standardrating.value as any;
        this.boworkflow_Form.patchValue({ standardratingdesc: evt.options[evt.options.selectedIndex].text });
    }
    performancerating_onChange(evt: any) {
        let e = this.f.performancerating.value as any;
        this.boworkflow_Form.patchValue({ performanceratingdesc: evt.options[evt.options.selectedIndex].text });
    }
    performancestatus_onChange(evt: any) {
        let e = this.f.performancestatus.value as any;
        this.boworkflow_Form.patchValue({ performancestatusdesc: evt.options[evt.options.selectedIndex].text });
    }
    workflowstatus_onChange(evt: any) {
        let e = this.f.workflowstatus.value as any;
        this.boworkflow_Form.patchValue({ workflowstatusdesc: evt.options[evt.options.selectedIndex].text });
    }
    attachmentuploader(e: any) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileAttachmentList.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentFieldJson == null) this.attachmentFieldJson = [];
            max = Array.of(this.attachmentFieldJson).length; attachmentobj = new KeyValuePair((this.attachmentFieldJson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentFieldJson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null) max = Array.of(this.attachmentlist).length; attachmentobj = new KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }



    edit_boworkflows() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.boworkflow_service.get_boworkflows_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.boworkflow;
            let formproperty = res.boworkflow.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.boworkflow.pkcol;
            this.formid = res.boworkflow.workflowid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.boworkflow;
        this.formid = res.boworkflow.workflowid;
        this.pkcol = res.boworkflow.pkcol;
        this.bmyrecord = false;
        if ((res.boworkflow as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boworkflow_Form.patchValue({
            workflowid: res.boworkflow.workflowid,
            workflowmasterid: res.boworkflow.workflowmasterid,
            currentstepno: res.boworkflow.currentstepno,
            modulename: res.boworkflow.modulename,
            pkvalue: res.boworkflow.pkvalue,
            currentapproved: res.boworkflow.currentapproved,
            currentapproveddesc: res.boworkflow.currentapproveddesc,
            currentapprovers: JSON.parse(res.boworkflow.currentapprovers),
            nextapprovers: JSON.parse(res.boworkflow.nextapprovers),
            assigneddatetime: this.ngbDateParserFormatter.parse(res.boworkflow.assigneddatetime),
            closeddatetime: this.ngbDateParserFormatter.parse(res.boworkflow.closeddatetime),
            standardrating: res.boworkflow.standardrating,
            standardratingdesc: res.boworkflow.standardratingdesc,
            performancerating: res.boworkflow.performancerating,
            performanceratingdesc: res.boworkflow.performanceratingdesc,
            performancestatus: res.boworkflow.performancestatus,
            performancestatusdesc: res.boworkflow.performancestatusdesc,
            exception: res.boworkflow.exception,
            approvedusers: JSON.parse(res.boworkflow.approvedusers),
            approvedcondition: res.boworkflow.approvedcondition,
            tathours: res.boworkflow.tathours,
            totalactualtime: res.boworkflow.totalactualtime,
            processid: res.boworkflow.processid,
            workflowdetails: res.boworkflow.workflowdetails,
            comments: JSON.parse(res.boworkflow.comments),
            history: res.boworkflow.history,
            lastapprover: JSON.parse(res.boworkflow.lastapprover),
            cc: JSON.parse(res.boworkflow.cc),
            customfield: res.boworkflow.customfield,
            attachment: JSON.parse(res.boworkflow.attachment),
            workflowstatus: res.boworkflow.workflowstatus,
            workflowstatusdesc: res.boworkflow.workflowstatusdesc,
            status: res.boworkflow.status,
            statusdesc: res.boworkflow.statusdesc,
        });
        this.boworkflow_menuactions = res.boworkflow_menuactions;
        if (this.boworkflow_Form.get('customfield').value != null && this.boworkflow_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.boworkflow_Form.get('customfield').value);
        this.FillCustomField();
        if (this.boworkflow_Form.get('attachment').value != null && this.boworkflow_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.boworkflow_Form.get('attachment').value);
        //Child Tables if any
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.boworkflow_Form.controls) {
            let val = this.boworkflow_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.boworkflow_Form.controls[key] != null) {
                if (false) {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
                }
                else if (false) {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='Stars' style='--rating:" + this.formData[key] + "></div>");
                }
                else if (false) {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='progress--circle progress--" + this.formData[key] + "'><div class='progress__number'>" + this.formData[key] + "%</div></div>");
                }
                else
                    ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
            }
        }
        var re = /##(\w+)##/g;
        ret = ret.replace(re, '');
        return ret;
    }

    async onSubmitDataDlg(bclear: any) {
        this.isSubmitted = true;
        if (!this.boworkflow_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.boworkflow_Form.getRawValue();
        if (this.boworkflow_Form.get('currentapprovers').value != null) obj.currentapprovers = JSON.stringify(this.boworkflow_Form.get('currentapprovers').value);
        if (this.boworkflow_Form.get('nextapprovers').value != null) obj.nextapprovers = JSON.stringify(this.boworkflow_Form.get('nextapprovers').value);
        obj.assigneddatetime = new Date(this.boworkflow_Form.get('assigneddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflow_Form.get('assigneddatetime').value) + '  UTC' : null);
        obj.closeddatetime = new Date(this.boworkflow_Form.get('closeddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflow_Form.get('closeddatetime').value) + '  UTC' : null);
        if (this.boworkflow_Form.get('approvedusers').value != null) obj.approvedusers = JSON.stringify(this.boworkflow_Form.get('approvedusers').value);
        if (this.boworkflow_Form.get('comments').value != null) obj.comments = JSON.stringify(this.boworkflow_Form.get('comments').value);
        if (this.boworkflow_Form.get('lastapprover').value != null) obj.lastapprover = JSON.stringify(this.boworkflow_Form.get('lastapprover').value);
        if (this.boworkflow_Form.get('cc').value != null) obj.cc = JSON.stringify(this.boworkflow_Form.get('cc').value);
        if (customfields != null) obj.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        obj.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(obj);
        await this.sharedService.upload(this.fileAttachmentList);
        this.attachmentlist = [];
        if (this.fileattachment) this.fileattachment.clear();
        this.objvalues.push(obj);
        this.dialogRef.close(this.objvalues);
        setTimeout(() => {
            //this.dialogRef.destroy();
        }, 200);
    }

    //This has to come from bomenuactions & procedures
    afterAction(mode: any) {
        let formname = "";
        let query = "";
        if (mode == "new")
            this.router.navigate(['/home/' + formname + '/' + formname + query]);
        else if (mode == "refresh")
            this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
    }



    async onSubmitData(bclear: any) {
        debugger;
        this.isSubmitted = true;
        let strError = "";
        // Object.keys(this.boworkflow_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.boworkflow_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.boworkflow_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.boworkflow_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.boworkflow_Form.controls[key] != null) {
                        this.formData[key] = this.boworkflow_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        if (this.boworkflow_Form.get('currentapprovers').value != null) this.formData.currentapprovers = JSON.stringify(this.boworkflow_Form.get('currentapprovers').value);
        if (this.boworkflow_Form.get('nextapprovers').value != null) this.formData.nextapprovers = JSON.stringify(this.boworkflow_Form.get('nextapprovers').value);
        this.formData.assigneddatetime = new Date(this.boworkflow_Form.get('assigneddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflow_Form.get('assigneddatetime').value) + '  UTC' : null);
        this.formData.closeddatetime = new Date(this.boworkflow_Form.get('closeddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflow_Form.get('closeddatetime').value) + '  UTC' : null);
        if (this.boworkflow_Form.get('approvedusers').value != null) this.formData.approvedusers = JSON.stringify(this.boworkflow_Form.get('approvedusers').value);
        if (this.boworkflow_Form.get('comments').value != null) this.formData.comments = JSON.stringify(this.boworkflow_Form.get('comments').value);
        if (this.boworkflow_Form.get('lastapprover').value != null) this.formData.lastapprover = JSON.stringify(this.boworkflow_Form.get('lastapprover').value);
        if (this.boworkflow_Form.get('cc').value != null) this.formData.cc = JSON.stringify(this.boworkflow_Form.get('cc').value);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.boworkflow_service.saveOrUpdate_boworkflows(this.formData).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).boworkflow);
                if (!bclear) this.showview = true;
                if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
                if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.dialogRef.close(this.objvalues);
                    return;
                }
                else {
                    if (document.getElementById("contentAreascroll") != undefined) document.getElementById("contentAreascroll").scrollTop = 0;
                }
                this.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.objvalues.push((res as any).boworkflow);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boworkflow_Form.markAsUntouched();
                this.boworkflow_Form.markAsPristine();
            },
            err => {
                debugger;
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }

}



