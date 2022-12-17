import { lmscallService } from './../../../service/lmscall.service';
import { lmscall } from './../../../model/lmscall.model';
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
import { lmstask } from './../../../model/lmstask.model';
import { lmstaskComponent } from './../../../pages/forms/lmstask/lmstask.component';
import { lmstaskService } from './../../../service/lmstask.service';
import { lmsreminder } from './../../../model/lmsreminder.model';
import { lmsreminderComponent } from './../../../pages/forms/lmsreminder/lmsreminder.component';
import { lmsreminderService } from './../../../service/lmsreminder.service';
import { lmshistory } from './../../../model/lmshistory.model';
import { lmshistoryComponent } from './../../../pages/forms/lmshistory/lmshistory.component';
import { lmshistoryService } from './../../../service/lmshistory.service';
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
    selector: 'app-lmscall',
    templateUrl: './lmscall.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class lmscallComponent implements OnInit {
    formData: lmscall;
    list: lmscall[];
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

    bfilterPopulate_lmscalls: boolean = false;
    bfilterPopulate_lmstasks: boolean = false;
    bfilterPopulate_lmsreminders: boolean = false;
    bfilterPopulate_lmshistories: boolean = false;
    lmscall_menuactions: any = []
    lmstask_menuactions: any = []
    @ViewChild('tbl_lmstasks', { static: false }) tbl_lmstasks: Ng2SmartTableComponent;
    lmsreminder_menuactions: any = []
    @ViewChild('tbl_lmsreminders', { static: false }) tbl_lmsreminders: Ng2SmartTableComponent;
    lmshistory_menuactions: any = []
    @ViewChild('tbl_lmshistories', { static: false }) tbl_lmshistories: Ng2SmartTableComponent;

    lmscall_Form: FormGroup;

    branchid_List: DropDownValues[];
    branchid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    branchlocationid_List: DropDownValues[];
    branchlocationid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    leadid_List: DropDownValues[];
    opportunityid_List: DropDownValues[];
    opportunityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    callid_List: DropDownValues[];
    callid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    campaignid_List: DropDownValues[];
    leadby_List: DropDownValues[];
    leadby_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    currentowner_List: DropDownValues[];
    currentowner_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    activitytype_List: DropDownValues[];
    nextaction_List: DropDownValues[];

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



    lmstasks_visiblelist: any;
    lmstasks_hidelist: any;
    lmsreminders_visiblelist: any;
    lmsreminders_hidelist: any;
    lmshistories_visiblelist: any;
    lmshistories_hidelist: any;

    Deleted_lmstask_IDs: string = "";
    lmstasks_ID: string = "1";
    lmstasks_selectedindex: any;
    Deleted_lmsreminder_IDs: string = "";
    lmsreminders_ID: string = "2";
    lmsreminders_selectedindex: any;
    Deleted_lmshistory_IDs: string = "";
    lmshistories_ID: string = "3";
    lmshistories_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private lmscall_service: lmscallService,
        private lmstask_service: lmstaskService,
        private lmsreminder_service: lmsreminderService,
        private lmshistory_service: lmshistoryService,
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
        this.lmscall_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            branchid: [null],
            branchiddesc: [null],
            branchlocationid: [null],
            branchlocationiddesc: [null],
            eventdate: [null, Validators.compose([Validators.required])],
            eventtime: [null, Validators.compose([Validators.required])],
            eventenddate: [null],
            eventendtime: [null],
            leadid: [null],
            leadiddesc: [null],
            opportunityid: [null],
            opportunityiddesc: [null],
            callid: [null],
            calliddesc: [null],
            agenda: [null],
            campaignid: [null],
            campaigniddesc: [null],
            leadby: [null],
            leadbydesc: [null],
            currentowner: [null, Validators.compose([Validators.required])],
            currentownerdesc: [null],
            activitytype: [null, Validators.compose([Validators.required])],
            activitytypedesc: [null],
            attendedusers: [null],
            clientusers: [null],
            nextcalldate: [null],
            nextaction: [null],
            nextactiondesc: [null],
            actiondatetime: [null],
            score: [null],
            remarks: [null],
            attachment: [null],
            customfield: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.lmscall_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.lmscall_Form.dirty && this.lmscall_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.callid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.callid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.callid && pkDetail) {
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
        let lmscallid = null;

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
        this.formid = lmscallid;
        //alert(lmscallid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_lmstasks_TableConfig();
            setTimeout(() => {
                //this.Set_lmstasks_TableDropDownConfig();
            });

            this.Set_lmsreminders_TableConfig();
            setTimeout(() => {
                //this.Set_lmsreminders_TableDropDownConfig();
            });

            this.Set_lmshistories_TableConfig();
            setTimeout(() => {
                //this.Set_lmshistories_TableDropDownConfig();
            });

            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.lmscall_service.getDefaultData().then(res => {
            this.branchid_List = res.list_branchid.value;
            this.leadid_List = res.list_leadid.value;
            this.opportunityid_List = res.list_opportunityid.value;
            this.callid_List = res.list_callid.value;
            this.campaignid_List = res.list_campaignid.value;
            this.leadby_List = res.list_leadby.value;
            this.currentowner_List = res.list_currentowner.value;
            this.activitytype_List = res.list_activitytype.value;
            this.nextaction_List = res.list_nextaction.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.lmscall_service.get_lmscalls_List().then(res => {
            this.pkList = res as lmscall[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.lmscall_Form.markAsUntouched();
        this.lmscall_Form.markAsPristine();
    }
    onSelected_branchid(branchidDetail: any) {
        if (branchidDetail.value && branchidDetail) {
            this.lmscall_Form.patchValue({
                branchid: branchidDetail.value,
                branchiddesc: branchidDetail.label,

            });
            this.lmscall_service.getList_branchlocationid(branchidDetail.value).then(res => {
                this.branchlocationid_List = res as DropDownValues[]
            }).catch((err) => { this.spinner.hide(); console.log(err); });

        }
    }

    onSelected_branchlocationid(branchlocationidDetail: any) {
        if (branchlocationidDetail.value && branchlocationidDetail) {
            this.lmscall_Form.patchValue({
                branchlocationid: branchlocationidDetail.value,
                branchlocationiddesc: branchlocationidDetail.label,

            });

        }
    }

    onSelected_opportunityid(opportunityidDetail: any) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmscall_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,

            });

        }
    }

    onSelected_callid(callidDetail: any) {
        if (callidDetail.value && callidDetail) {
            this.lmscall_Form.patchValue({
                callid: callidDetail.value,
                calliddesc: callidDetail.label,

            });

        }
    }

    onSelected_leadby(leadbyDetail: any) {
        if (leadbyDetail.value && leadbyDetail) {
            this.lmscall_Form.patchValue({
                leadby: leadbyDetail.value,
                leadbydesc: leadbyDetail.label,

            });

        }
    }

    onSelected_currentowner(currentownerDetail: any) {
        if (currentownerDetail.value && currentownerDetail) {
            this.lmscall_Form.patchValue({
                currentowner: currentownerDetail.value,
                currentownerdesc: currentownerDetail.label,

            });

        }
    }




    resetForm() {
        if (this.lmscall_Form != null)
            this.lmscall_Form.reset();
        this.lmscall_Form.patchValue({
            branchid: this.sessionData.branchid,
            branchiddesc: this.sessionData.branchiddesc,
            leadby: this.sessionData.userid,
            leadbydesc: this.sessionData.username,
            currentowner: this.sessionData.userid,
            currentownerdesc: this.sessionData.username,
        });
        this.lmscall_Form.patchValue({
            eventdate: this.ngbDateParserFormatter.parse(new Date().toString()),
            eventtime: new Time(new Date().getHours().toString() + ":" + new Date().getMinutes().toString()),
            eventenddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            currentowner: this.sessionData.userid,
            nextcalldate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            actiondatetime: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        });
        setTimeout(() => {
            this.lmstasks_LoadTable();
            this.lmsreminders_LoadTable();
            this.lmshistories_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let callid = this.lmscall_Form.get('callid').value;
        if (callid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmscall_service.delete_lmscall(callid).then(res => {
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
        this.lmscall_Form.patchValue({
            callid: null
        });
        if (this.formData.callid != null) this.formData.callid = null;
        for (let i = 0; i < this.tbl_lmstasks.source.length; i++) {
            this.tbl_lmstasks.source[i].taskid = null;
        }
        for (let i = 0; i < this.tbl_lmsreminders.source.length; i++) {
            this.tbl_lmsreminders.source[i].reminderid = null;
        }
        for (let i = 0; i < this.tbl_lmshistories.source.length; i++) {
            this.tbl_lmshistories.source[i].historyid = null;
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
                    else if (key == "eventdate")
                        this.lmscall_Form.patchValue({ "eventdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "eventtime")
                        this.lmscall_Form.patchValue({ "eventtime": new Time(mainscreendata[key]) });
                    else if (key == "eventenddate")
                        this.lmscall_Form.patchValue({ "eventenddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "eventendtime")
                        this.lmscall_Form.patchValue({ "eventendtime": new Time(mainscreendata[key]) });
                    else if (key == "attendedusers")
                        this.lmscall_Form.patchValue({ "attendedusers": mainscreendata[key] });
                    else if (key == "nextcalldate")
                        this.lmscall_Form.patchValue({ "nextcalldate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "actiondatetime")
                        this.lmscall_Form.patchValue({ "actiondatetime": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "remarks")
                        this.lmscall_Form.patchValue({ "remarks": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.lmscall_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmscall_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmscall_Form.controls[key] != undefined) {
                                this.lmscall_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("lmscalls", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    branchid_onChange(evt: any) {
        let e = evt.value;
    }
    branchlocationid_onChange(evt: any) {
        let e = evt.value;
    }
    leadid_onChange(evt: any) {
        let e = evt.value;
        this.lmscall_Form.patchValue({ leadiddesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunityid_onChange(evt: any) {
        let e = evt.value;
    }
    callid_onChange(evt: any) {
        let e = evt.value;
    }
    campaignid_onChange(evt: any) {
        let e = evt.value;
        this.lmscall_Form.patchValue({ campaigniddesc: evt.options[evt.options.selectedIndex].text });
    }
    leadby_onChange(evt: any) {
        let e = evt.value;
    }
    currentowner_onChange(evt: any) {
        let e = evt.value;
    }
    activitytype_onChange(evt: any) {
        let e = this.f.activitytype.value as any;
        this.lmscall_Form.patchValue({ activitytypedesc: evt.options[evt.options.selectedIndex].text });
    }
    nextaction_onChange(evt: any) {
        let e = this.f.nextaction.value as any;
        this.lmscall_Form.patchValue({ nextactiondesc: evt.options[evt.options.selectedIndex].text });
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



    edit_lmscalls() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.lmscall_service.get_lmscalls_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.lmscall;
            let formproperty = res.lmscall.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.lmscall.pkcol;
            this.formid = res.lmscall.callid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.lmscall;
        this.formid = res.lmscall.callid;
        this.pkcol = res.lmscall.pkcol;
        this.bmyrecord = false;
        if ((res.lmscall as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        var eventtimeTime = new Time(res.lmscall.eventtime);
        var eventendtimeTime = new Time(res.lmscall.eventendtime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmscall_Form.patchValue({
            branchid: res.lmscall.branchid,
            branchiddesc: res.lmscall.branchiddesc,
            branchlocationid: res.lmscall.branchlocationid,
            branchlocationiddesc: res.lmscall.branchlocationiddesc,
            eventdate: this.ngbDateParserFormatter.parse(res.lmscall.eventdate),
            eventtime: eventtimeTime,
            eventenddate: this.ngbDateParserFormatter.parse(res.lmscall.eventenddate),
            eventendtime: eventendtimeTime,
            leadid: res.lmscall.leadid,
            leadiddesc: res.lmscall.leadiddesc,
            opportunityid: res.lmscall.opportunityid,
            opportunityiddesc: res.lmscall.opportunityiddesc,
            callid: res.lmscall.callid,
            calliddesc: res.lmscall.calliddesc,
            agenda: res.lmscall.agenda,
            campaignid: res.lmscall.campaignid,
            campaigniddesc: res.lmscall.campaigniddesc,
            leadby: res.lmscall.leadby,
            leadbydesc: res.lmscall.leadbydesc,
            currentowner: res.lmscall.currentowner,
            currentownerdesc: res.lmscall.currentownerdesc,
            activitytype: res.lmscall.activitytype,
            activitytypedesc: res.lmscall.activitytypedesc,
            attendedusers: JSON.parse(res.lmscall.attendedusers),
            clientusers: res.lmscall.clientusers,
            nextcalldate: this.ngbDateParserFormatter.parse(res.lmscall.nextcalldate),
            nextaction: res.lmscall.nextaction,
            nextactiondesc: res.lmscall.nextactiondesc,
            actiondatetime: this.ngbDateParserFormatter.parse(res.lmscall.actiondatetime),
            score: res.lmscall.score,
            remarks: JSON.parse(res.lmscall.remarks),
            attachment: JSON.parse(res.lmscall.attachment),
            customfield: res.lmscall.customfield,
            status: res.lmscall.status,
            statusdesc: res.lmscall.statusdesc,
        });
        this.lmscall_menuactions = res.lmscall_menuactions;
        this.lmstask_menuactions = res.lmstask_menuactions;
        this.lmstasks_visiblelist = res.lmstasks_visiblelist;
        this.lmsreminder_menuactions = res.lmsreminder_menuactions;
        this.lmsreminders_visiblelist = res.lmsreminders_visiblelist;
        this.lmshistory_menuactions = res.lmshistory_menuactions;
        this.lmshistories_visiblelist = res.lmshistories_visiblelist;
        if (this.lmscall_Form.get('customfield').value != null && this.lmscall_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.lmscall_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmscall_Form.get('attachment').value != null && this.lmscall_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.lmscall_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.branchid.value && this.f.branchid.value != "" && this.f.branchid.value != null) this.lmscall_service.getList_branchlocationid(this.f.branchid.value).then(res => {
                this.branchlocationid_List = res as DropDownValues[];
            }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        this.Set_lmstasks_TableConfig();
        this.lmstasks_LoadTable(res.lmstasks);
        this.Set_lmsreminders_TableConfig();
        this.lmsreminders_LoadTable(res.lmsreminders);
        this.Set_lmshistories_TableConfig();
        this.lmshistories_LoadTable(res.lmshistories);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.lmscall_Form.controls) {
            let val = this.lmscall_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.lmscall_Form.controls[key] != null) {
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
        if (!this.lmscall_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.lmscall_Form.getRawValue();
        obj.eventdate = new Date(this.lmscall_Form.get('eventdate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('eventdate').value) + '  UTC' : null);
        obj.eventtime = (this.lmscall_Form.get('eventtime').value == null ? 0 : this.lmscall_Form.get('eventtime').value.hour) + ':' + (this.lmscall_Form.get('eventtime').value == null ? 0 : this.lmscall_Form.get('eventtime').value.minute + ":00");
        obj.eventenddate = new Date(this.lmscall_Form.get('eventenddate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('eventenddate').value) + '  UTC' : null);
        obj.eventendtime = (this.lmscall_Form.get('eventendtime').value == null ? 0 : this.lmscall_Form.get('eventendtime').value.hour) + ':' + (this.lmscall_Form.get('eventendtime').value == null ? 0 : this.lmscall_Form.get('eventendtime').value.minute + ":00");
        if (this.lmscall_Form.get('attendedusers').value != null) obj.attendedusers = JSON.stringify(this.lmscall_Form.get('attendedusers').value);
        obj.nextcalldate = new Date(this.lmscall_Form.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('nextcalldate').value) + '  UTC' : null);
        obj.actiondatetime = new Date(this.lmscall_Form.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('actiondatetime').value) + '  UTC' : null);
        if (this.lmscall_Form.get('remarks').value != null) obj.remarks = JSON.stringify(this.lmscall_Form.get('remarks').value);
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
        // Object.keys(this.lmscall_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.lmscall_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.lmscall_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.lmscall_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.lmscall_Form.controls[key] != null) {
                        this.formData[key] = this.lmscall_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.formData.eventdate = new Date(this.lmscall_Form.get('eventdate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('eventdate').value) + '  UTC' : null);
        this.formData.eventtime = (this.lmscall_Form.get('eventtime').value == null ? 0 : this.lmscall_Form.get('eventtime').value.hour) + ':' + (this.lmscall_Form.get('eventtime').value == null ? 0 : this.lmscall_Form.get('eventtime').value.minute + ":00");
        this.formData.eventenddate = new Date(this.lmscall_Form.get('eventenddate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('eventenddate').value) + '  UTC' : null);
        this.formData.eventendtime = (this.lmscall_Form.get('eventendtime').value == null ? 0 : this.lmscall_Form.get('eventendtime').value.hour) + ':' + (this.lmscall_Form.get('eventendtime').value == null ? 0 : this.lmscall_Form.get('eventendtime').value.minute + ":00");
        if (this.lmscall_Form.get('attendedusers').value != null) this.formData.attendedusers = JSON.stringify(this.lmscall_Form.get('attendedusers').value);
        this.formData.nextcalldate = new Date(this.lmscall_Form.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('nextcalldate').value) + '  UTC' : null);
        this.formData.actiondatetime = new Date(this.lmscall_Form.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('actiondatetime').value) + '  UTC' : null);
        if (this.lmscall_Form.get('remarks').value != null) this.formData.remarks = JSON.stringify(this.lmscall_Form.get('remarks').value);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        this.formData.Deleted_lmstask_IDs = this.Deleted_lmstask_IDs;
        this.formData.Deleted_lmsreminder_IDs = this.Deleted_lmsreminder_IDs;
        this.formData.Deleted_lmshistory_IDs = this.Deleted_lmshistory_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.lmscall_service.saveOrUpdate_lmscalls(this.formData, this.tbl_lmstasks?.source?.data, this.tbl_lmsreminders?.source?.data, this.tbl_lmshistories?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_lmstasks.source) {
                    for (let i = 0; i < this.tbl_lmstasks.source.data.length; i++) {
                        if (this.tbl_lmstasks.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmstasks.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmsreminders.source) {
                    for (let i = 0; i < this.tbl_lmsreminders.source.data.length; i++) {
                        if (this.tbl_lmsreminders.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmsreminders.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmshistories.source) {
                    for (let i = 0; i < this.tbl_lmshistories.source.data.length; i++) {
                        if (this.tbl_lmshistories.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmshistories.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).lmscall);
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
                        this.objvalues.push((res as any).lmscall);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmscall_Form.markAsUntouched();
                this.lmscall_Form.markAsPristine();
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
        this.tbl_lmstasks.source = new LocalDataSource();
        this.tbl_lmsreminders.source = new LocalDataSource();
        this.tbl_lmshistories.source = new LocalDataSource();
    }

    AddOrEdit_lmstask(event: any, taskid: any, callid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmstaskComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, taskid, callid, visiblelist: this.lmstasks_visiblelist, hidelist: this.lmstasks_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmstasks.source.add(res[i]);
                    }
                    this.tbl_lmstasks.source.refresh();
                }
                else {
                    this.tbl_lmstasks.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmstask(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmstask_IDs += childID + ",";
        this.tbl_lmstasks.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_lmsreminder(event: any, reminderid: any, callid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmsreminderComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, reminderid, callid, visiblelist: this.lmsreminders_visiblelist, hidelist: this.lmsreminders_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmsreminders.source.add(res[i]);
                    }
                    this.tbl_lmsreminders.source.refresh();
                }
                else {
                    this.tbl_lmsreminders.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmsreminder(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmsreminder_IDs += childID + ",";
        this.tbl_lmsreminders.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_lmshistory(event: any, historyid: any, callid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmshistoryComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, historyid, callid, visiblelist: this.lmshistories_visiblelist, hidelist: this.lmshistories_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmshistories.source.add(res[i]);
                    }
                    this.tbl_lmshistories.source.refresh();
                }
                else {
                    this.tbl_lmshistories.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmshistory(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmshistory_IDs += childID + ",";
        this.tbl_lmshistories.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes lmstasks
    lmstasks_settings: any;

    show_lmstasks_Checkbox() {
        debugger;
        if (this.tbl_lmstasks.source.settings['selectMode'] == 'multi') this.tbl_lmstasks.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmstasks.source.settings['selectMode'] = 'multi';
        this.tbl_lmstasks.source.initGrid();
    }
    delete_lmstasks_All() {
        this.tbl_lmstasks.source.settings['selectMode'] = 'single';
    }
    show_lmstasks_Filter() {
        setTimeout(() => {
            //  this.Set_lmstasks_TableDropDownConfig();
        });
        if (this.tbl_lmstasks.source.settings != null) this.tbl_lmstasks.source.settings['hideSubHeader'] = !this.tbl_lmstasks.source.settings['hideSubHeader'];
        this.tbl_lmstasks.source.initGrid();
    }
    show_lmstasks_InActive() {
    }
    enable_lmstasks_InActive() {
    }
    async Set_lmstasks_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmstasks) {

            var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
            if (clone.columns['leadid'] != undefined) clone.columns['leadid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_leadid.value)), }, };
            if (clone.columns['leadid'] != undefined) clone.columns['leadid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_leadid.value)), }, };
            this.tbl_lmstasks.source.settings = clone;
            this.tbl_lmstasks.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_opportunityid.value)), }, };
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_opportunityid.value)), }, };
            this.tbl_lmstasks.source.settings = clone;
            this.tbl_lmstasks.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
            if (clone.columns['assignto'] != undefined) clone.columns['assignto'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_assignto.value)), }, };
            if (clone.columns['assignto'] != undefined) clone.columns['assignto'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_assignto.value)), }, };
            this.tbl_lmstasks.source.settings = clone;
            this.tbl_lmstasks.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
            if (clone.columns['priority'] != undefined) clone.columns['priority'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_priority.value)), }, };
            if (clone.columns['priority'] != undefined) clone.columns['priority'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_priority.value)), }, };
            this.tbl_lmstasks.source.settings = clone;
            this.tbl_lmstasks.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
            if (clone.columns['taskstatus'] != undefined) clone.columns['taskstatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_taskstatus.value)), }, };
            if (clone.columns['taskstatus'] != undefined) clone.columns['taskstatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_taskstatus.value)), }, };
            this.tbl_lmstasks.source.settings = clone;
            this.tbl_lmstasks.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
            if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_performancestatus.value)), }, };
            if (clone.columns['performancestatus'] != undefined) clone.columns['performancestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_performancestatus.value)), }, };
            this.tbl_lmstasks.source.settings = clone;
            this.tbl_lmstasks.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
            if (clone.columns['productid'] != undefined) clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_productid.value)), }, };
            if (clone.columns['productid'] != undefined) clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_productid.value)), }, };
            this.tbl_lmstasks.source.settings = clone;
            this.tbl_lmstasks.source.initGrid();
        }
        this.bfilterPopulate_lmstasks = true;
    }
    async lmstasks_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmstasks_TableConfig() {
        this.lmstasks_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: false,
                edit: false,
                delete: false,
                position: 'right',
            },
            columns: {
                subject: {
                    title: 'Subject',
                    type: '',
                    filter: true,
                },
                assigntodesc: {
                    title: 'Assign To',
                    type: 'html',
                    filter: true,
                },
                assigneddate: {
                    title: 'Assigned Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                prioritydesc: {
                    title: 'Priority',
                    type: 'html',
                    filter: true,
                },
                actualcloseddate: {
                    title: 'Actual Closed Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                taskstatusdesc: {
                    title: 'Task Status',
                    type: 'html',
                    filter: true,
                },
            },
        };
    }
    lmstasks_LoadTable(lmstasks = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmstasks_ID) >= 0) {
            if (this.tbl_lmstasks != undefined) this.tbl_lmstasks.source = new LocalDataSource();
            if (this.tbl_lmstasks != undefined) this.tbl_lmstasks.source.load(lmstasks as any as LocalDataSource);
            if (this.tbl_lmstasks != undefined) this.tbl_lmstasks.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    lmstasks_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscall_service.lmstasks.length == 0)
    {
        this.tbl_lmstasks.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmstask();
        this.lmscall_service.lmstasks.push(obj);
        this.tbl_lmstasks.source.refresh();
        if ((this.lmscall_service.lmstasks.length / this.tbl_lmstasks.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmstasks.source.getPaging().page)
        {
            this.tbl_lmstasks.source.setPage((this.lmscall_service.lmstasks.length / this.tbl_lmstasks.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmstasks.source.grid.edit(this.tbl_lmstasks.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmstasks.source.data.indexOf(event.data);
    this.onDelete_lmstask(event,event.data.taskid,((this.tbl_lmstasks.source.getPaging().page-1) *this.tbl_lmstasks.source.getPaging().perPage)+index);
    this.tbl_lmstasks.source.refresh();
    break;
    }
    }
    
    */
    lmstasks_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmstask(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmstask(event, event.data.taskid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmstask(event, event.data.taskid, ((this.tbl_lmstasks.source.getPaging().page - 1) * this.tbl_lmstasks.source.getPaging().perPage) + event.index);
                this.tbl_lmstasks.source.refresh();
                break;
        }
    }
    lmstasks_onDelete(obj) {
        let taskid = obj.data.taskid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscall_service.delete_lmscall(taskid).then(res =>
                this.lmstasks_LoadTable()
            );
        }
    }
    async onCustom_lmstasks_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmstasks");
        let formname = (objbomenuaction as any).actionname;




    }
    lmstasks_Paging(val) {
        debugger;
        this.tbl_lmstasks.source.setPaging(1, val, true);
    }

    handle_lmstasks_GridSelected(event: any) {
        this.lmstasks_selectedindex = this.tbl_lmstasks.source.findIndex(i => i.taskid === event.data.taskid);
    }
    Is_lmstasks_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmstasks_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmstasks
    //start of Grid Codes lmsreminders
    lmsreminders_settings: any;

    show_lmsreminders_Checkbox() {
        debugger;
        if (this.tbl_lmsreminders.source.settings['selectMode'] == 'multi') this.tbl_lmsreminders.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsreminders.source.settings['selectMode'] = 'multi';
        this.tbl_lmsreminders.source.initGrid();
    }
    delete_lmsreminders_All() {
        this.tbl_lmsreminders.source.settings['selectMode'] = 'single';
    }
    show_lmsreminders_Filter() {
        setTimeout(() => {
            //  this.Set_lmsreminders_TableDropDownConfig();
        });
        if (this.tbl_lmsreminders.source.settings != null) this.tbl_lmsreminders.source.settings['hideSubHeader'] = !this.tbl_lmsreminders.source.settings['hideSubHeader'];
        this.tbl_lmsreminders.source.initGrid();
    }
    show_lmsreminders_InActive() {
    }
    enable_lmsreminders_InActive() {
    }
    async Set_lmsreminders_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmsreminders) {
        }
        this.bfilterPopulate_lmsreminders = true;
    }
    async lmsreminders_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmsreminders_TableConfig() {
        this.lmsreminders_settings = {
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
                custom: this.lmsreminder_menuactions
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
                leadid: {
                    title: 'Lead',
                    type: 'number',
                    filter: true,
                },
                opportunityid: {
                    title: 'Opportunity',
                    type: 'number',
                    filter: true,
                },
                remindertext: {
                    title: 'Reminder Text',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                reminderstartdatetime: {
                    title: 'Reminder Start Date Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                frequencyhours: {
                    title: 'Frequency Hours',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    lmsreminders_LoadTable(lmsreminders = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsreminders_ID) >= 0) {
            if (this.tbl_lmsreminders != undefined) this.tbl_lmsreminders.source = new LocalDataSource();
            if (this.tbl_lmsreminders != undefined) this.tbl_lmsreminders.source.load(lmsreminders as any as LocalDataSource);
            if (this.tbl_lmsreminders != undefined) this.tbl_lmsreminders.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    lmsreminders_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscall_service.lmsreminders.length == 0)
    {
        this.tbl_lmsreminders.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmsreminder();
        this.lmscall_service.lmsreminders.push(obj);
        this.tbl_lmsreminders.source.refresh();
        if ((this.lmscall_service.lmsreminders.length / this.tbl_lmsreminders.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsreminders.source.getPaging().page)
        {
            this.tbl_lmsreminders.source.setPage((this.lmscall_service.lmsreminders.length / this.tbl_lmsreminders.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmsreminders.source.grid.edit(this.tbl_lmsreminders.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmsreminders.source.data.indexOf(event.data);
    this.onDelete_lmsreminder(event,event.data.reminderid,((this.tbl_lmsreminders.source.getPaging().page-1) *this.tbl_lmsreminders.source.getPaging().perPage)+index);
    this.tbl_lmsreminders.source.refresh();
    break;
    }
    }
    
    */
    lmsreminders_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmsreminder(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmsreminder(event, event.data.reminderid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmsreminder(event, event.data.reminderid, ((this.tbl_lmsreminders.source.getPaging().page - 1) * this.tbl_lmsreminders.source.getPaging().perPage) + event.index);
                this.tbl_lmsreminders.source.refresh();
                break;
        }
    }
    lmsreminders_onDelete(obj) {
        let reminderid = obj.data.reminderid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscall_service.delete_lmscall(reminderid).then(res =>
                this.lmsreminders_LoadTable()
            );
        }
    }
    async onCustom_lmsreminders_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsreminders");
        let formname = (objbomenuaction as any).actionname;




    }
    lmsreminders_Paging(val) {
        debugger;
        this.tbl_lmsreminders.source.setPaging(1, val, true);
    }

    handle_lmsreminders_GridSelected(event: any) {
        this.lmsreminders_selectedindex = this.tbl_lmsreminders.source.findIndex(i => i.reminderid === event.data.reminderid);
    }
    Is_lmsreminders_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsreminders_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmsreminders
    //start of Grid Codes lmshistories
    lmshistories_settings: any;

    show_lmshistories_Checkbox() {
        debugger;
        if (this.tbl_lmshistories.source.settings['selectMode'] == 'multi') this.tbl_lmshistories.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmshistories.source.settings['selectMode'] = 'multi';
        this.tbl_lmshistories.source.initGrid();
    }
    delete_lmshistories_All() {
        this.tbl_lmshistories.source.settings['selectMode'] = 'single';
    }
    show_lmshistories_Filter() {
        setTimeout(() => {
            //  this.Set_lmshistories_TableDropDownConfig();
        });
        if (this.tbl_lmshistories.source.settings != null) this.tbl_lmshistories.source.settings['hideSubHeader'] = !this.tbl_lmshistories.source.settings['hideSubHeader'];
        this.tbl_lmshistories.source.initGrid();
    }
    show_lmshistories_InActive() {
    }
    enable_lmshistories_InActive() {
    }
    async Set_lmshistories_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmshistories) {

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_branchid.value)), }, };
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_branchid.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['leadid'] != undefined) clone.columns['leadid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadid.value)), }, };
            if (clone.columns['leadid'] != undefined) clone.columns['leadid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadid.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_opportunityid.value)), }, };
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_opportunityid.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['callid'] != undefined) clone.columns['callid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_callid.value)), }, };
            if (clone.columns['callid'] != undefined) clone.columns['callid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_callid.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['productid'] != undefined) clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_productid.value)), }, };
            if (clone.columns['productid'] != undefined) clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_productid.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['campaignid'] != undefined) clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_campaignid.value)), }, };
            if (clone.columns['campaignid'] != undefined) clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_campaignid.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['leadby'] != undefined) clone.columns['leadby'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadby.value)), }, };
            if (clone.columns['leadby'] != undefined) clone.columns['leadby'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadby.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['leadresponse'] != undefined) clone.columns['leadresponse'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadresponse.value)), }, };
            if (clone.columns['leadresponse'] != undefined) clone.columns['leadresponse'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadresponse.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['nextaction'] != undefined) clone.columns['nextaction'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_nextaction.value)), }, };
            if (clone.columns['nextaction'] != undefined) clone.columns['nextaction'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_nextaction.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['leadsource'] != undefined) clone.columns['leadsource'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadsource.value)), }, };
            if (clone.columns['leadsource'] != undefined) clone.columns['leadsource'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadsource.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['leadstage'] != undefined) clone.columns['leadstage'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadstage.value)), }, };
            if (clone.columns['leadstage'] != undefined) clone.columns['leadstage'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadstage.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
            if (clone.columns['criticality'] != undefined) clone.columns['criticality'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_criticality.value)), }, };
            if (clone.columns['criticality'] != undefined) clone.columns['criticality'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_criticality.value)), }, };
            this.tbl_lmshistories.source.settings = clone;
            this.tbl_lmshistories.source.initGrid();
        }
        this.bfilterPopulate_lmshistories = true;
    }
    async lmshistories_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmshistories_TableConfig() {
        this.lmshistories_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: false,
                edit: false,
                delete: false,
                position: 'right',
            },
            columns: {
                branchiddesc: {
                    title: 'Branch',
                    type: 'html',
                    filter: true,
                },
                branchlocationiddesc: {
                    title: 'Branch Location',
                    type: 'html',
                    filter: true,
                },
                leadiddesc: {
                    title: 'Lead',
                    type: 'html',
                    filter: true,
                },
                opportunityiddesc: {
                    title: 'Opportunity',
                    type: 'html',
                    filter: true,
                },
                productiddesc: {
                    title: 'Product',
                    type: 'html',
                    filter: true,
                },
                campaigniddesc: {
                    title: 'Campaign',
                    type: 'html',
                    filter: true,
                },
                leadbydesc: {
                    title: 'Lead By',
                    type: 'html',
                    filter: true,
                },
                currentowner: {
                    title: 'Current Owner',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                leadresponsedesc: {
                    title: 'Lead Response',
                    type: 'html',
                    filter: true,
                },
                nextcalldate: {
                    title: 'Next Call Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                nextactiondesc: {
                    title: 'Next Action',
                    type: 'html',
                    filter: true,
                },
                actiondatetime: {
                    title: 'Action Date Time',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                previousremarks: {
                    title: 'Previous Remarks',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                leadscore: {
                    title: 'Lead Score',
                    type: 'number',
                    filter: true,
                },
                leadsourcedesc: {
                    title: 'Lead Source',
                    type: 'html',
                    filter: true,
                },
                leadstagedesc: {
                    title: 'Lead Stage',
                    type: 'html',
                    filter: true,
                },
                criticalitydesc: {
                    title: 'Criticality',
                    type: 'html',
                    filter: true,
                },
                expectedvalue: {
                    title: 'Expected Value',
                    type: '',
                    filter: true,
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
            },
        };
    }
    lmshistories_LoadTable(lmshistories = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmshistories_ID) >= 0) {
            if (this.tbl_lmshistories != undefined) this.tbl_lmshistories.source = new LocalDataSource();
            if (this.tbl_lmshistories != undefined) this.tbl_lmshistories.source.load(lmshistories as any as LocalDataSource);
            if (this.tbl_lmshistories != undefined) this.tbl_lmshistories.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    lmshistories_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscall_service.lmshistories.length == 0)
    {
        this.tbl_lmshistories.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmshistory();
        this.lmscall_service.lmshistories.push(obj);
        this.tbl_lmshistories.source.refresh();
        if ((this.lmscall_service.lmshistories.length / this.tbl_lmshistories.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmshistories.source.getPaging().page)
        {
            this.tbl_lmshistories.source.setPage((this.lmscall_service.lmshistories.length / this.tbl_lmshistories.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmshistories.source.grid.edit(this.tbl_lmshistories.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmshistories.source.data.indexOf(event.data);
    this.onDelete_lmshistory(event,event.data.historyid,((this.tbl_lmshistories.source.getPaging().page-1) *this.tbl_lmshistories.source.getPaging().perPage)+index);
    this.tbl_lmshistories.source.refresh();
    break;
    }
    }
    
    */
    lmshistories_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmshistory(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmshistory(event, event.data.historyid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmshistory(event, event.data.historyid, ((this.tbl_lmshistories.source.getPaging().page - 1) * this.tbl_lmshistories.source.getPaging().perPage) + event.index);
                this.tbl_lmshistories.source.refresh();
                break;
        }
    }
    lmshistories_onDelete(obj) {
        let historyid = obj.data.historyid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscall_service.delete_lmscall(historyid).then(res =>
                this.lmshistories_LoadTable()
            );
        }
    }
    async onCustom_lmshistories_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmshistories");
        let formname = (objbomenuaction as any).actionname;




    }
    lmshistories_Paging(val) {
        debugger;
        this.tbl_lmshistories.source.setPaging(1, val, true);
    }

    handle_lmshistories_GridSelected(event: any) {
        this.lmshistories_selectedindex = this.tbl_lmshistories.source.findIndex(i => i.historyid === event.data.historyid);
    }
    Is_lmshistories_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmshistories_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmshistories

}



