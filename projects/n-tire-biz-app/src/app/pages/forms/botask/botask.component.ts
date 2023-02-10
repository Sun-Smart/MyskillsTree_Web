import { botaskService } from './../../../service/botask.service';
import { botask } from './../../../model/botask.model';
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
import { botaskresponse } from './../../../model/botaskresponse.model';
import { botaskresponseComponent } from './../../../pages/forms/botaskresponse/botaskresponse.component';
import { botaskresponseService } from './../../../service/botaskresponse.service';
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
    selector: 'app-botask',
    templateUrl: './botask.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class botaskComponent implements OnInit {
    formData: botask;
    list: botask[];
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

    bfilterPopulate_botasks: boolean = false;
    bfilterPopulate_botaskresponses: boolean = false;
    botask_menuactions: any = []
    botaskresponse_menuactions: any = []
    @ViewChild('tbl_botaskresponses', { static: false }) tbl_botaskresponses: Ng2SmartTableComponent;

    botask_Form: FormGroup;

    tasktype_List: DropDownValues[];
    priority_List: DropDownValues[];
    taskstatus_List: DropDownValues[];
    performancestatus_List: DropDownValues[];

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



    botaskresponses_visiblelist: any;
    botaskresponses_hidelist: any;

    Deleted_botaskresponse_IDs: string = "";
    botaskresponses_ID: string = "1";
    botaskresponses_selectedindex: any;
    userid: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private botask_service: botaskService,
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
        this.botask_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            taskid: [null],
            sourcefield: [null],
            sourcereference: [null],
            subject: [null],
            description: [null],
            tasktype: [null],
            tasktypedesc: [null],
            assignto: [null],
            assigneddate: [null],
            startdate: [null],
            targetdate: [null],
            priority: [null],
            prioritydesc: [null],
            actualstartdate: [null],
            actualcloseddate: [null],
            taskstatus: [null],
            taskstatusdesc: [null],
            estimatedeffort: [null],
            actualeffort: [null],
            cost: [null],
            additionalcost: [null],
            completionpercentage: [null],
            alarm: [null],
            performancestatus: [null],
            performancestatusdesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.botask_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.botask_Form.dirty && this.botask_Form.touched) {
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
        let botaskid = null;

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
        this.formid = botaskid;
        //alert(botaskid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_botaskresponses_TableConfig();
            setTimeout(() => {
                //this.Set_botaskresponses_TableDropDownConfig();
            });

            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.botask_service.getDefaultData().then(res => {
            this.tasktype_List = res.list_tasktype.value;
            this.priority_List = res.list_priority.value;
            this.taskstatus_List = res.list_taskstatus.value;
            this.performancestatus_List = res.list_performancestatus.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.botask_service.get_botasks_List(this.userid).then(res => {
            this.pkList = res as botask[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.botask_Form.markAsUntouched();
        this.botask_Form.markAsPristine();
    }



    resetForm() {
        if (this.botask_Form != null)
            this.botask_Form.reset();
        this.botask_Form.patchValue({
        });
        setTimeout(() => {
            this.botaskresponses_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.data != null) {
            this.botask_Form.patchValue({
                sourcefield: this.data.sourcefield, sourcereference: this.data.sourcereference
            });
        }
    }

    onDelete() {
        let taskid = this.botask_Form.get('taskid').value;
        if (taskid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.botask_service.delete_botask(taskid).then(res => {
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
        this.botask_Form.patchValue({
            taskid: null
        });
        if (this.formData.taskid != null) this.formData.taskid = null;
        for (let i = 0; i < this.tbl_botaskresponses.source.length; i++) {
            this.tbl_botaskresponses.source[i].responseid = null;
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
                        this.botask_Form.patchValue({ "assigneddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "startdate")
                        this.botask_Form.patchValue({ "startdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "targetdate")
                        this.botask_Form.patchValue({ "targetdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "actualstartdate")
                        this.botask_Form.patchValue({ "actualstartdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "actualcloseddate")
                        this.botask_Form.patchValue({ "actualcloseddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.botask_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.botask_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.botask_Form.controls[key] != undefined) {
                                this.botask_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("botasks", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    tasktype_onChange(evt: any) {
        let e = this.f.tasktype.value as any;
        this.botask_Form.patchValue({ tasktypedesc: evt.options[evt.options.selectedIndex].text });
    }
    priority_onChange(evt: any) {
        let e = this.f.priority.value as any;
        this.botask_Form.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    taskstatus_onChange(evt: any) {
        let e = this.f.taskstatus.value as any;
        this.botask_Form.patchValue({ taskstatusdesc: evt.options[evt.options.selectedIndex].text });
    }
    performancestatus_onChange(evt: any) {
        let e = this.f.performancestatus.value as any;
        this.botask_Form.patchValue({ performancestatusdesc: evt.options[evt.options.selectedIndex].text });
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



    edit_botasks() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.botask_service.get_botasks_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.botask;
            let formproperty = res.botask.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.botask.pkcol;
            this.formid = res.botask.taskid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.botask;
        this.formid = res.botask.taskid;
        this.pkcol = res.botask.pkcol;
        this.bmyrecord = false;
        if ((res.botask as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.botask_Form.patchValue({
            taskid: res.botask.taskid,
            sourcefield: res.botask.sourcefield,
            sourcereference: res.botask.sourcereference,
            subject: res.botask.subject,
            description: res.botask.description,
            tasktype: res.botask.tasktype,
            tasktypedesc: res.botask.tasktypedesc,
            assignto: res.botask.assignto,
            assigneddate: this.ngbDateParserFormatter.parse(res.botask.assigneddate),
            startdate: this.ngbDateParserFormatter.parse(res.botask.startdate),
            targetdate: this.ngbDateParserFormatter.parse(res.botask.targetdate),
            priority: res.botask.priority,
            prioritydesc: res.botask.prioritydesc,
            actualstartdate: this.ngbDateParserFormatter.parse(res.botask.actualstartdate),
            actualcloseddate: this.ngbDateParserFormatter.parse(res.botask.actualcloseddate),
            taskstatus: res.botask.taskstatus,
            taskstatusdesc: res.botask.taskstatusdesc,
            estimatedeffort: res.botask.estimatedeffort,
            actualeffort: res.botask.actualeffort,
            cost: res.botask.cost,
            additionalcost: res.botask.additionalcost,
            completionpercentage: res.botask.completionpercentage,
            alarm: res.botask.alarm,
            performancestatus: res.botask.performancestatus,
            performancestatusdesc: res.botask.performancestatusdesc,
            customfield: res.botask.customfield,
            attachment: JSON.parse(res.botask.attachment),
            status: res.botask.status,
            statusdesc: res.botask.statusdesc,
        });
        this.botask_menuactions = res.botask_menuactions;
        this.botaskresponse_menuactions = res.botaskresponse_menuactions;
        this.botaskresponses_visiblelist = res.botaskresponses_visiblelist;
        if (this.botask_Form.get('customfield').value != null && this.botask_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.botask_Form.get('customfield').value);
        this.FillCustomField();
        if (this.botask_Form.get('attachment').value != null && this.botask_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.botask_Form.get('attachment').value);
        //Child Tables if any
        this.Set_botaskresponses_TableConfig();
        this.botaskresponses_LoadTable(res.botaskresponses);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.botask_Form.controls) {
            let val = this.botask_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.botask_Form.controls[key] != null) {
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
        if (!this.botask_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.botask_Form.getRawValue();
        obj.assigneddate = new Date(this.botask_Form.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.botask_Form.get('assigneddate').value) + '  UTC' : null);
        obj.startdate = new Date(this.botask_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.botask_Form.get('startdate').value) + '  UTC' : null);
        obj.targetdate = new Date(this.botask_Form.get('targetdate').value ? this.ngbDateParserFormatter.format(this.botask_Form.get('targetdate').value) + '  UTC' : null);
        obj.actualstartdate = new Date(this.botask_Form.get('actualstartdate').value ? this.ngbDateParserFormatter.format(this.botask_Form.get('actualstartdate').value) + '  UTC' : null);
        obj.actualcloseddate = new Date(this.botask_Form.get('actualcloseddate').value ? this.ngbDateParserFormatter.format(this.botask_Form.get('actualcloseddate').value) + '  UTC' : null);
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
        // Object.keys(this.botask_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.botask_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.botask_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.botask_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.botask_Form.controls[key] != null) {
                        this.formData[key] = this.botask_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.formData.assigneddate = new Date(this.botask_Form.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.botask_Form.get('assigneddate').value) + '  UTC' : null);
        this.formData.startdate = new Date(this.botask_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.botask_Form.get('startdate').value) + '  UTC' : null);
        this.formData.targetdate = new Date(this.botask_Form.get('targetdate').value ? this.ngbDateParserFormatter.format(this.botask_Form.get('targetdate').value) + '  UTC' : null);
        this.formData.actualstartdate = new Date(this.botask_Form.get('actualstartdate').value ? this.ngbDateParserFormatter.format(this.botask_Form.get('actualstartdate').value) + '  UTC' : null);
        this.formData.actualcloseddate = new Date(this.botask_Form.get('actualcloseddate').value ? this.ngbDateParserFormatter.format(this.botask_Form.get('actualcloseddate').value) + '  UTC' : null);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_botaskresponse_IDs = this.Deleted_botaskresponse_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.botask_service.saveOrUpdate_botasks(this.formData, this.tbl_botaskresponses?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_botaskresponses.source) {
                    for (let i = 0; i < this.tbl_botaskresponses.source.data.length; i++) {
                        if (this.tbl_botaskresponses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_botaskresponses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).botask);
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
                        this.objvalues.push((res as any).botask);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.botask_Form.markAsUntouched();
                this.botask_Form.markAsPristine();
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
        this.tbl_botaskresponses.source = new LocalDataSource();
    }

    AddOrEdit_botaskresponse(event: any, responseid: any, taskid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(botaskresponseComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, responseid, taskid, visiblelist: this.botaskresponses_visiblelist, hidelist: this.botaskresponses_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_botaskresponses.source.add(res[i]);
                    }
                    this.tbl_botaskresponses.source.refresh();
                }
                else {
                    this.tbl_botaskresponses.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_botaskresponse(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_botaskresponse_IDs += childID + ",";
        this.tbl_botaskresponses.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes botaskresponses
    botaskresponses_settings: any;

    show_botaskresponses_Checkbox() {
        debugger;
        if (this.tbl_botaskresponses.source.settings['selectMode'] == 'multi') this.tbl_botaskresponses.source.settings['selectMode'] = 'single';
        else
            this.tbl_botaskresponses.source.settings['selectMode'] = 'multi';
        this.tbl_botaskresponses.source.initGrid();
    }
    delete_botaskresponses_All() {
        this.tbl_botaskresponses.source.settings['selectMode'] = 'single';
    }
    show_botaskresponses_Filter() {
        setTimeout(() => {
            //  this.Set_botaskresponses_TableDropDownConfig();
        });
        if (this.tbl_botaskresponses.source.settings != null) this.tbl_botaskresponses.source.settings['hideSubHeader'] = !this.tbl_botaskresponses.source.settings['hideSubHeader'];
        this.tbl_botaskresponses.source.initGrid();
    }
    show_botaskresponses_InActive() {
    }
    enable_botaskresponses_InActive() {
    }
    async Set_botaskresponses_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_botaskresponses) {
        }
        this.bfilterPopulate_botaskresponses = true;
    }
    async botaskresponses_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_botaskresponses_TableConfig() {
        this.botaskresponses_settings = {
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
                custom: this.botaskresponse_menuactions
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
                },
                customfield: {
                    title: 'Custom Field',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.getCustomValue(cell);
                        return ret;
                    },
                },
                attachment: {
                    title: 'Attachment',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.getAttachmentValue(cell);
                        return ret;
                    },
                },
            },
        };
    }
    botaskresponses_LoadTable(botaskresponses = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.botaskresponses_ID) >= 0) {
            if (this.tbl_botaskresponses != undefined) this.tbl_botaskresponses.source = new LocalDataSource();
            if (this.tbl_botaskresponses != undefined) this.tbl_botaskresponses.source.load(botaskresponses as any as LocalDataSource);
            if (this.tbl_botaskresponses != undefined) this.tbl_botaskresponses.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    botaskresponses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.botask_service.botaskresponses.length == 0)
    {
        this.tbl_botaskresponses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new botaskresponse();
        this.botask_service.botaskresponses.push(obj);
        this.tbl_botaskresponses.source.refresh();
        if ((this.botask_service.botaskresponses.length / this.tbl_botaskresponses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_botaskresponses.source.getPaging().page)
        {
            this.tbl_botaskresponses.source.setPage((this.botask_service.botaskresponses.length / this.tbl_botaskresponses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_botaskresponses.source.grid.edit(this.tbl_botaskresponses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_botaskresponses.source.data.indexOf(event.data);
    this.onDelete_botaskresponse(event,event.data.responseid,((this.tbl_botaskresponses.source.getPaging().page-1) *this.tbl_botaskresponses.source.getPaging().perPage)+index);
    this.tbl_botaskresponses.source.refresh();
    break;
    }
    }
    
    */
    botaskresponses_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_botaskresponse(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_botaskresponse(event, event.data.responseid, this.formid);
                break;
            case 'delete':
                this.onDelete_botaskresponse(event, event.data.responseid, ((this.tbl_botaskresponses.source.getPaging().page - 1) * this.tbl_botaskresponses.source.getPaging().perPage) + event.index);
                this.tbl_botaskresponses.source.refresh();
                break;
        }
    }
    botaskresponses_onDelete(obj) {
        let responseid = obj.data.responseid;
        if (confirm('Are you sure to delete this record ?')) {
            this.botask_service.delete_botask(responseid).then(res =>
                this.botaskresponses_LoadTable()
            );
        }
    }
    async onCustom_botaskresponses_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "botaskresponses");
        let formname = (objbomenuaction as any).actionname;




    }
    botaskresponses_Paging(val) {
        debugger;
        this.tbl_botaskresponses.source.setPaging(1, val, true);
    }

    handle_botaskresponses_GridSelected(event: any) {
        this.botaskresponses_selectedindex = this.tbl_botaskresponses.source.findIndex(i => i.responseid === event.data.responseid);
    }
    Is_botaskresponses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.botaskresponses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes botaskresponses

}



