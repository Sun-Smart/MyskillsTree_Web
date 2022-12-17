import { lmstaskService } from './../../../service/lmstask.service';
import { lmstask } from './../../../model/lmstask.model';
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
import { lmstaskresponse } from './../../../model/lmstaskresponse.model';
import { lmstaskresponseComponent } from './../../../pages/forms/lmstaskresponse/lmstaskresponse.component';
import { lmstaskresponseService } from './../../../service/lmstaskresponse.service';
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
    selector: 'app-lmstask',
    templateUrl: './lmstask.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class lmstaskComponent implements OnInit {
    formData: lmstask;
    list: lmstask[];
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

    bfilterPopulate_lmstasks: boolean = false;
    bfilterPopulate_lmstaskresponses: boolean = false;
    lmstask_menuactions: any = []
    lmstaskresponse_menuactions: any = []
    @ViewChild('tbl_lmstaskresponses', { static: false }) tbl_lmstaskresponses: Ng2SmartTableComponent;

    lmstask_Form: FormGroup;

    leadid_List: DropDownValues[];
    opportunityid_List: DropDownValues[];
    opportunityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    assignto_List: DropDownValues[];
    assignto_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    priority_List: DropDownValues[];
    taskstatus_List: DropDownValues[];
    performancestatus_List: DropDownValues[];
    productid_List: DropDownValues[];

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



    lmstaskresponses_visiblelist: any;
    lmstaskresponses_hidelist: any;

    Deleted_lmstaskresponse_IDs: string = "";
    lmstaskresponses_ID: string = "1";
    lmstaskresponses_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private lmstask_service: lmstaskService,
        private lmstaskresponse_service: lmstaskresponseService,
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
        this.lmstask_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            leadid: [null],
            leadiddesc: [null],
            opportunityid: [null],
            opportunityiddesc: [null],
            taskid: [null],
            subject: [null, Validators.compose([Validators.required])],
            description: [null, Validators.compose([Validators.required])],
            assignto: [null],
            assigntodesc: [null],
            assigneddate: [null, Validators.compose([Validators.required])],
            targetdate: [null, Validators.compose([Validators.required])],
            priority: [null, Validators.compose([Validators.required])],
            prioritydesc: [null],
            actualcloseddate: [null],
            taskstatus: [null, Validators.compose([Validators.required])],
            taskstatusdesc: [null],
            performancestatus: [null],
            performancestatusdesc: [null],
            productid: [null],
            productiddesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.lmstask_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.lmstask_Form.dirty && this.lmstask_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.taskid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.taskid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.taskid && pkDetail) {
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
        let lmstaskid = null;

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
        this.formid = lmstaskid;
        //alert(lmstaskid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_lmstaskresponses_TableConfig();
            setTimeout(() => {
                //this.Set_lmstaskresponses_TableDropDownConfig();
            });

            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.lmstask_service.getDefaultData().then(res => {
            this.leadid_List = res.list_leadid.value;
            this.opportunityid_List = res.list_opportunityid.value;
            this.assignto_List = res.list_assignto.value;
            this.priority_List = res.list_priority.value;
            this.taskstatus_List = res.list_taskstatus.value;
            this.performancestatus_List = res.list_performancestatus.value;
            this.productid_List = res.list_productid.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.lmstask_service.get_lmstasks_List().then(res => {
            this.pkList = res as lmstask[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.lmstask_Form.markAsUntouched();
        this.lmstask_Form.markAsPristine();
    }
    onSelected_opportunityid(opportunityidDetail: any) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmstask_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,

            });

        }
    }

    onSelected_assignto(assigntoDetail: any) {
        if (assigntoDetail.value && assigntoDetail) {
            this.lmstask_Form.patchValue({
                assignto: assigntoDetail.value,
                assigntodesc: assigntoDetail.label,

            });

        }
    }




    resetForm() {
        if (this.lmstask_Form != null)
            this.lmstask_Form.reset();
        this.lmstask_Form.patchValue({
            assignto: this.sessionData.userid,
            assigntodesc: this.sessionData.username,
        });
        this.lmstask_Form.patchValue({
            assigneddate: this.ngbDateParserFormatter.parse(new Date().toString()),
            targetdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            actualcloseddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        });
        setTimeout(() => {
            this.lmstaskresponses_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let taskid = this.lmstask_Form.get('taskid').value;
        if (taskid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmstask_service.delete_lmstask(taskid).then(res => {
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
        this.lmstask_Form.patchValue({
            taskid: null
        });
        if (this.formData.taskid != null) this.formData.taskid = null;
        for (let i = 0; i < this.tbl_lmstaskresponses.source.length; i++) {
            this.tbl_lmstaskresponses.source[i].responseid = null;
        }
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
                    else if (key == "assigneddate")
                        this.lmstask_Form.patchValue({ "assigneddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "targetdate")
                        this.lmstask_Form.patchValue({ "targetdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "actualcloseddate")
                        this.lmstask_Form.patchValue({ "actualcloseddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmstask_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmstask_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmstask_Form.controls[key] != undefined) {
                                this.lmstask_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("lmstasks", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    leadid_onChange(evt: any) {
        let e = evt.value;
        this.lmstask_Form.patchValue({ leadiddesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunityid_onChange(evt: any) {
        let e = evt.value;
    }
    assignto_onChange(evt: any) {
        let e = evt.value;
    }
    priority_onChange(evt: any) {
        let e = this.f.priority.value as any;
        this.lmstask_Form.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    taskstatus_onChange(evt: any) {
        let e = this.f.taskstatus.value as any;
        this.lmstask_Form.patchValue({ taskstatusdesc: evt.options[evt.options.selectedIndex].text });
    }
    performancestatus_onChange(evt: any) {
        let e = this.f.performancestatus.value as any;
        this.lmstask_Form.patchValue({ performancestatusdesc: evt.options[evt.options.selectedIndex].text });
    }
    productid_onChange(evt: any) {
        let e = evt.value;
        this.lmstask_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
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



    edit_lmstasks() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.lmstask_service.get_lmstasks_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.lmstask;
            let formproperty = res.lmstask.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.lmstask.pkcol;
            this.formid = res.lmstask.taskid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.lmstask;
        this.formid = res.lmstask.taskid;
        this.pkcol = res.lmstask.pkcol;
        this.bmyrecord = false;
        if ((res.lmstask as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmstask_Form.patchValue({
            leadid: res.lmstask.leadid,
            leadiddesc: res.lmstask.leadiddesc,
            opportunityid: res.lmstask.opportunityid,
            opportunityiddesc: res.lmstask.opportunityiddesc,
            taskid: res.lmstask.taskid,
            subject: res.lmstask.subject,
            description: res.lmstask.description,
            assignto: res.lmstask.assignto,
            assigntodesc: res.lmstask.assigntodesc,
            assigneddate: this.ngbDateParserFormatter.parse(res.lmstask.assigneddate),
            targetdate: this.ngbDateParserFormatter.parse(res.lmstask.targetdate),
            priority: res.lmstask.priority,
            prioritydesc: res.lmstask.prioritydesc,
            actualcloseddate: this.ngbDateParserFormatter.parse(res.lmstask.actualcloseddate),
            taskstatus: res.lmstask.taskstatus,
            taskstatusdesc: res.lmstask.taskstatusdesc,
            performancestatus: res.lmstask.performancestatus,
            performancestatusdesc: res.lmstask.performancestatusdesc,
            productid: res.lmstask.productid,
            productiddesc: res.lmstask.productiddesc,
            customfield: res.lmstask.customfield,
            attachment: JSON.parse(res.lmstask.attachment),
            status: res.lmstask.status,
            statusdesc: res.lmstask.statusdesc,
        });
        this.lmstask_menuactions = res.lmstask_menuactions;
        this.lmstaskresponse_menuactions = res.lmstaskresponse_menuactions;
        this.lmstaskresponses_visiblelist = res.lmstaskresponses_visiblelist;
        if (this.lmstask_Form.get('customfield').value != null && this.lmstask_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.lmstask_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmstask_Form.get('attachment').value != null && this.lmstask_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.lmstask_Form.get('attachment').value);
        //Child Tables if any
        this.Set_lmstaskresponses_TableConfig();
        this.lmstaskresponses_LoadTable(res.lmstaskresponses);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.lmstask_Form.controls) {
            let val = this.lmstask_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.lmstask_Form.controls[key] != null) {
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
        if (!this.lmstask_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.lmstask_Form.getRawValue();
        obj.assigneddate = new Date(this.lmstask_Form.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.lmstask_Form.get('assigneddate').value) + '  UTC' : null);
        obj.targetdate = new Date(this.lmstask_Form.get('targetdate').value ? this.ngbDateParserFormatter.format(this.lmstask_Form.get('targetdate').value) + '  UTC' : null);
        obj.actualcloseddate = new Date(this.lmstask_Form.get('actualcloseddate').value ? this.ngbDateParserFormatter.format(this.lmstask_Form.get('actualcloseddate').value) + '  UTC' : null);
        if (customfields != null) obj.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        obj.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(obj);
        if (!confirm('Do you want to want to save?')) {
            return;
        }
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
        // Object.keys(this.lmstask_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.lmstask_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.lmstask_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.lmstask_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.lmstask_Form.controls[key] != null) {
                        this.formData[key] = this.lmstask_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.formData.assigneddate = new Date(this.lmstask_Form.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.lmstask_Form.get('assigneddate').value) + '  UTC' : null);
        this.formData.targetdate = new Date(this.lmstask_Form.get('targetdate').value ? this.ngbDateParserFormatter.format(this.lmstask_Form.get('targetdate').value) + '  UTC' : null);
        this.formData.actualcloseddate = new Date(this.lmstask_Form.get('actualcloseddate').value ? this.ngbDateParserFormatter.format(this.lmstask_Form.get('actualcloseddate').value) + '  UTC' : null);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_lmstaskresponse_IDs = this.Deleted_lmstaskresponse_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.lmstask_service.saveOrUpdate_lmstasks(this.formData, this.tbl_lmstaskresponses?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_lmstaskresponses.source) {
                    for (let i = 0; i < this.tbl_lmstaskresponses.source.data.length; i++) {
                        if (this.tbl_lmstaskresponses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmstaskresponses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).lmstask);
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
                        this.objvalues.push((res as any).lmstask);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmstask_Form.markAsUntouched();
                this.lmstask_Form.markAsPristine();
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
        this.tbl_lmstaskresponses.source = new LocalDataSource();
    }

    AddOrEdit_lmstaskresponse(event: any, responseid: any, taskid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmstaskresponseComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, responseid, taskid, visiblelist: this.lmstaskresponses_visiblelist, hidelist: this.lmstaskresponses_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmstaskresponses.source.add(res[i]);
                    }
                    this.tbl_lmstaskresponses.source.refresh();
                }
                else {
                    this.tbl_lmstaskresponses.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmstaskresponse(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmstaskresponse_IDs += childID + ",";
        this.tbl_lmstaskresponses.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes lmstaskresponses
    lmstaskresponses_settings: any;

    show_lmstaskresponses_Checkbox() {
        debugger;
        if (this.tbl_lmstaskresponses.source.settings['selectMode'] == 'multi') this.tbl_lmstaskresponses.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmstaskresponses.source.settings['selectMode'] = 'multi';
        this.tbl_lmstaskresponses.source.initGrid();
    }
    delete_lmstaskresponses_All() {
        this.tbl_lmstaskresponses.source.settings['selectMode'] = 'single';
    }
    show_lmstaskresponses_Filter() {
        setTimeout(() => {
            //  this.Set_lmstaskresponses_TableDropDownConfig();
        });
        if (this.tbl_lmstaskresponses.source.settings != null) this.tbl_lmstaskresponses.source.settings['hideSubHeader'] = !this.tbl_lmstaskresponses.source.settings['hideSubHeader'];
        this.tbl_lmstaskresponses.source.initGrid();
    }
    show_lmstaskresponses_InActive() {
    }
    enable_lmstaskresponses_InActive() {
    }
    async Set_lmstaskresponses_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmstaskresponses) {

            var clone = this.sharedService.clone(this.tbl_lmstaskresponses.source.settings);
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstaskresponses_opportunityid.value)), }, };
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstaskresponses_opportunityid.value)), }, };
            this.tbl_lmstaskresponses.source.settings = clone;
            this.tbl_lmstaskresponses.source.initGrid();
        }
        this.bfilterPopulate_lmstaskresponses = true;
    }
    async lmstaskresponses_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmstaskresponses_TableConfig() {
        this.lmstaskresponses_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true, // true,
                delete: !this.showview,
                position: 'left',
                custom: this.lmstaskresponse_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="nb-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="nb-trash"></i>',
                confirmDelete: true,
            },
            columns: {
                responsedetail: {
                    title: 'Response Detail',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseComment(cell);
                        return ret;
                    },
                },
            },
        };
    }
    lmstaskresponses_LoadTable(lmstaskresponses = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmstaskresponses_ID) >= 0) {
            if (this.tbl_lmstaskresponses != undefined) this.tbl_lmstaskresponses.source = new LocalDataSource();
            if (this.tbl_lmstaskresponses != undefined) this.tbl_lmstaskresponses.source.load(lmstaskresponses as any as LocalDataSource);
            if (this.tbl_lmstaskresponses != undefined) this.tbl_lmstaskresponses.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    lmstaskresponses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmstask_service.lmstaskresponses.length == 0)
    {
        this.tbl_lmstaskresponses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmstaskresponse();
        this.lmstask_service.lmstaskresponses.push(obj);
        this.tbl_lmstaskresponses.source.refresh();
        if ((this.lmstask_service.lmstaskresponses.length / this.tbl_lmstaskresponses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmstaskresponses.source.getPaging().page)
        {
            this.tbl_lmstaskresponses.source.setPage((this.lmstask_service.lmstaskresponses.length / this.tbl_lmstaskresponses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmstaskresponses.source.grid.edit(this.tbl_lmstaskresponses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmstaskresponses.source.data.indexOf(event.data);
    this.onDelete_lmstaskresponse(event,event.data.responseid,((this.tbl_lmstaskresponses.source.getPaging().page-1) *this.tbl_lmstaskresponses.source.getPaging().perPage)+index);
    this.tbl_lmstaskresponses.source.refresh();
    break;
    }
    }
    
    */
    lmstaskresponses_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmstaskresponse(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmstaskresponse(event, event.data.responseid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmstaskresponse(event, event.data.responseid, ((this.tbl_lmstaskresponses.source.getPaging().page - 1) * this.tbl_lmstaskresponses.source.getPaging().perPage) + event.index);
                this.tbl_lmstaskresponses.source.refresh();
                break;
        }
    }
    lmstaskresponses_onDelete(obj) {
        let responseid = obj.data.responseid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmstask_service.delete_lmstask(responseid).then(res =>
                this.lmstaskresponses_LoadTable()
            );
        }
    }
    async onCustom_lmstaskresponses_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmstaskresponses");
        let formname = (objbomenuaction as any).actionname;




    }
    lmstaskresponses_Paging(val) {
        debugger;
        this.tbl_lmstaskresponses.source.setPaging(1, val, true);
    }

    handle_lmstaskresponses_GridSelected(event: any) {
        this.lmstaskresponses_selectedindex = this.tbl_lmstaskresponses.source.findIndex(i => i.responseid === event.data.responseid);
    }
    Is_lmstaskresponses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmstaskresponses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmstaskresponses

}



