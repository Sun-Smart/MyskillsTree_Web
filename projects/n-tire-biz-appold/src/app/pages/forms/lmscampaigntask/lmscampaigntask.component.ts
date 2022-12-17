import { lmscampaigntaskService } from './../../../service/lmscampaigntask.service';
import { lmscampaigntask } from './../../../model/lmscampaigntask.model';
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
import { lmscampaigntaskresponse } from './../../../model/lmscampaigntaskresponse.model';
import { lmscampaigntaskresponseComponent } from './../../../pages/forms/lmscampaigntaskresponse/lmscampaigntaskresponse.component';
import { lmscampaigntaskresponseService } from './../../../service/lmscampaigntaskresponse.service';
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
    selector: 'app-lmscampaigntask',
    templateUrl: './lmscampaigntask.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class lmscampaigntaskComponent implements OnInit {
    formData: lmscampaigntask;
    list: lmscampaigntask[];
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

    bfilterPopulate_lmscampaigntasks: boolean = false;
    bfilterPopulate_lmscampaigntaskresponses: boolean = false;
    lmscampaigntask_menuactions: any = []
    lmscampaigntaskresponse_menuactions: any = []
    @ViewChild('tbl_lmscampaigntaskresponses', { static: false }) tbl_lmscampaigntaskresponses: Ng2SmartTableComponent;

    lmscampaigntask_Form: FormGroup;

    productid_List: DropDownValues[];
    campaignid_List: DropDownValues[];
    campaignid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    campaigntype_List: DropDownValues[];
    targettype_List: DropDownValues[];
    priority_List: DropDownValues[];
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



    lmscampaigntaskresponses_visiblelist: any;
    lmscampaigntaskresponses_hidelist: any;

    Deleted_lmscampaigntaskresponse_IDs: string = "";
    lmscampaigntaskresponses_ID: string = "1";
    lmscampaigntaskresponses_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private lmscampaigntask_service: lmscampaigntaskService,
        private lmscampaigntaskresponse_service: lmscampaigntaskresponseService,
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
        this.lmscampaigntask_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            productid: [null],
            productiddesc: [null],
            campaignid: [null],
            campaigniddesc: [null],
            campaigncode: [null],
            campaigntype: [null],
            campaigntypedesc: [null],
            targettype: [null],
            targettypedesc: [null],
            taskid: [null],
            subject: [null, Validators.compose([Validators.required])],
            description: [null],
            advantages: [null],
            disadvantages: [null],
            assignto: [null, Validators.compose([Validators.required])],
            assigneddate: [null],
            targetdate: [null],
            priority: [null],
            prioritydesc: [null],
            dailytarget: [null],
            actualachieved: [null],
            estimatedcost: [null],
            actualcost: [null],
            successpercentage: [null],
            performancestatus: [null],
            performancestatusdesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.lmscampaigntask_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.lmscampaigntask_Form.dirty && this.lmscampaigntask_Form.touched) {
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
        let lmscampaigntaskid = null;

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
        this.formid = lmscampaigntaskid;
        //alert(lmscampaigntaskid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_lmscampaigntaskresponses_TableConfig();
            setTimeout(() => {
                //this.Set_lmscampaigntaskresponses_TableDropDownConfig();
            });

            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.lmscampaigntask_service.getDefaultData().then(res => {
            this.productid_List = res.list_productid.value;
            this.campaignid_List = res.list_campaignid.value;
            this.campaigntype_List = res.list_campaigntype.value;
            this.targettype_List = res.list_targettype.value;
            this.priority_List = res.list_priority.value;
            this.performancestatus_List = res.list_performancestatus.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.lmscampaigntask_service.get_lmscampaigntasks_List().then(res => {
            this.pkList = res as lmscampaigntask[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.lmscampaigntask_Form.markAsUntouched();
        this.lmscampaigntask_Form.markAsPristine();
    }
    onSelected_campaignid(campaignidDetail: any) {
        if (campaignidDetail.value && campaignidDetail) {
            this.lmscampaigntask_Form.patchValue({
                campaignid: campaignidDetail.value,
                campaigniddesc: campaignidDetail.label,

            });
            this.lmscampaigntask_Form.patchValue({ campaigncode: campaignidDetail.campaigncode });
            this.lmscampaigntask_Form.patchValue({ campaigntype: campaignidDetail.campaigntype });
            this.lmscampaigntask_Form.patchValue({ targettype: campaignidDetail.targettype });

        }
    }




    resetForm() {
        if (this.lmscampaigntask_Form != null)
            this.lmscampaigntask_Form.reset();
        this.lmscampaigntask_Form.patchValue({
        });
        setTimeout(() => {
            this.lmscampaigntaskresponses_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let taskid = this.lmscampaigntask_Form.get('taskid').value;
        if (taskid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmscampaigntask_service.delete_lmscampaigntask(taskid).then(res => {
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
        this.lmscampaigntask_Form.patchValue({
            taskid: null
        });
        if (this.formData.taskid != null) this.formData.taskid = null;
        for (let i = 0; i < this.tbl_lmscampaigntaskresponses.source.length; i++) {
            this.tbl_lmscampaigntaskresponses.source[i].responseid = null;
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
                    else if (key == "assignto")
                        this.lmscampaigntask_Form.patchValue({ "assignto": mainscreendata[key] });
                    else if (key == "assigneddate")
                        this.lmscampaigntask_Form.patchValue({ "assigneddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "targetdate")
                        this.lmscampaigntask_Form.patchValue({ "targetdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmscampaigntask_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmscampaigntask_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmscampaigntask_Form.controls[key] != undefined) {
                                this.lmscampaigntask_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("lmscampaigntasks", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    productid_onChange(evt: any) {
        let e = evt.value;
        this.lmscampaigntask_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
    }
    campaignid_onChange(evt: any) {
        let e = evt.value;
    }
    campaigntype_onChange(evt: any) {
        let e = this.f.campaigntype.value as any;
        this.lmscampaigntask_Form.patchValue({ campaigntypedesc: evt.options[evt.options.selectedIndex].text });
    }
    targettype_onChange(evt: any) {
        let e = this.f.targettype.value as any;
        this.lmscampaigntask_Form.patchValue({ targettypedesc: evt.options[evt.options.selectedIndex].text });
    }
    priority_onChange(evt: any) {
        let e = this.f.priority.value as any;
        this.lmscampaigntask_Form.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    performancestatus_onChange(evt: any) {
        let e = this.f.performancestatus.value as any;
        this.lmscampaigntask_Form.patchValue({ performancestatusdesc: evt.options[evt.options.selectedIndex].text });
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



    edit_lmscampaigntasks() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.lmscampaigntask_service.get_lmscampaigntasks_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.lmscampaigntask;
            let formproperty = res.lmscampaigntask.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.lmscampaigntask.pkcol;
            this.formid = res.lmscampaigntask.taskid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.lmscampaigntask;
        this.formid = res.lmscampaigntask.taskid;
        this.pkcol = res.lmscampaigntask.pkcol;
        this.bmyrecord = false;
        if ((res.lmscampaigntask as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmscampaigntask_Form.patchValue({
            productid: res.lmscampaigntask.productid,
            productiddesc: res.lmscampaigntask.productiddesc,
            campaignid: res.lmscampaigntask.campaignid,
            campaigniddesc: res.lmscampaigntask.campaigniddesc,
            campaigncode: res.lmscampaigntask.campaigncode,
            campaigntype: res.lmscampaigntask.campaigntype,
            campaigntypedesc: res.lmscampaigntask.campaigntypedesc,
            targettype: res.lmscampaigntask.targettype,
            targettypedesc: res.lmscampaigntask.targettypedesc,
            taskid: res.lmscampaigntask.taskid,
            subject: res.lmscampaigntask.subject,
            description: res.lmscampaigntask.description,
            advantages: res.lmscampaigntask.advantages,
            disadvantages: res.lmscampaigntask.disadvantages,
            assignto: JSON.parse(res.lmscampaigntask.assignto),
            assigneddate: this.ngbDateParserFormatter.parse(res.lmscampaigntask.assigneddate),
            targetdate: this.ngbDateParserFormatter.parse(res.lmscampaigntask.targetdate),
            priority: res.lmscampaigntask.priority,
            prioritydesc: res.lmscampaigntask.prioritydesc,
            dailytarget: res.lmscampaigntask.dailytarget,
            actualachieved: res.lmscampaigntask.actualachieved,
            estimatedcost: res.lmscampaigntask.estimatedcost,
            actualcost: res.lmscampaigntask.actualcost,
            successpercentage: res.lmscampaigntask.successpercentage,
            performancestatus: res.lmscampaigntask.performancestatus,
            performancestatusdesc: res.lmscampaigntask.performancestatusdesc,
            customfield: res.lmscampaigntask.customfield,
            attachment: JSON.parse(res.lmscampaigntask.attachment),
            status: res.lmscampaigntask.status,
            statusdesc: res.lmscampaigntask.statusdesc,
        });
        this.lmscampaigntask_menuactions = res.lmscampaigntask_menuactions;
        this.lmscampaigntaskresponse_menuactions = res.lmscampaigntaskresponse_menuactions;
        this.lmscampaigntaskresponses_visiblelist = res.lmscampaigntaskresponses_visiblelist;
        if (this.lmscampaigntask_Form.get('customfield').value != null && this.lmscampaigntask_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.lmscampaigntask_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmscampaigntask_Form.get('attachment').value != null && this.lmscampaigntask_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.lmscampaigntask_Form.get('attachment').value);
        //Child Tables if any
        this.Set_lmscampaigntaskresponses_TableConfig();
        this.lmscampaigntaskresponses_LoadTable(res.lmscampaigntaskresponses);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.lmscampaigntask_Form.controls) {
            let val = this.lmscampaigntask_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.lmscampaigntask_Form.controls[key] != null) {
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
        if (!this.lmscampaigntask_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.lmscampaigntask_Form.getRawValue();
        if (this.lmscampaigntask_Form.get('assignto').value != null) obj.assignto = JSON.stringify(this.lmscampaigntask_Form.get('assignto').value);
        obj.assigneddate = new Date(this.lmscampaigntask_Form.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntask_Form.get('assigneddate').value) + '  UTC' : null);
        obj.targetdate = new Date(this.lmscampaigntask_Form.get('targetdate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntask_Form.get('targetdate').value) + '  UTC' : null);
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
        // Object.keys(this.lmscampaigntask_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.lmscampaigntask_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.lmscampaigntask_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.lmscampaigntask_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.lmscampaigntask_Form.controls[key] != null) {
                        this.formData[key] = this.lmscampaigntask_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        if (this.lmscampaigntask_Form.get('assignto').value != null) this.formData.assignto = JSON.stringify(this.lmscampaigntask_Form.get('assignto').value);
        this.formData.assigneddate = new Date(this.lmscampaigntask_Form.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntask_Form.get('assigneddate').value) + '  UTC' : null);
        this.formData.targetdate = new Date(this.lmscampaigntask_Form.get('targetdate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntask_Form.get('targetdate').value) + '  UTC' : null);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_lmscampaigntaskresponse_IDs = this.Deleted_lmscampaigntaskresponse_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.lmscampaigntask_service.saveOrUpdate_lmscampaigntasks(this.formData, this.tbl_lmscampaigntaskresponses?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_lmscampaigntaskresponses.source) {
                    for (let i = 0; i < this.tbl_lmscampaigntaskresponses.source.data.length; i++) {
                        if (this.tbl_lmscampaigntaskresponses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmscampaigntaskresponses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).lmscampaigntask);
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
                        this.objvalues.push((res as any).lmscampaigntask);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmscampaigntask_Form.markAsUntouched();
                this.lmscampaigntask_Form.markAsPristine();
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
        this.tbl_lmscampaigntaskresponses.source = new LocalDataSource();
    }

    AddOrEdit_lmscampaigntaskresponse(event: any, responseid: any, taskid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmscampaigntaskresponseComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, responseid, taskid, visiblelist: this.lmscampaigntaskresponses_visiblelist, hidelist: this.lmscampaigntaskresponses_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmscampaigntaskresponses.source.add(res[i]);
                    }
                    this.tbl_lmscampaigntaskresponses.source.refresh();
                }
                else {
                    this.tbl_lmscampaigntaskresponses.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmscampaigntaskresponse(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmscampaigntaskresponse_IDs += childID + ",";
        this.tbl_lmscampaigntaskresponses.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes lmscampaigntaskresponses
    lmscampaigntaskresponses_settings: any;

    show_lmscampaigntaskresponses_Checkbox() {
        debugger;
        if (this.tbl_lmscampaigntaskresponses.source.settings['selectMode'] == 'multi') this.tbl_lmscampaigntaskresponses.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmscampaigntaskresponses.source.settings['selectMode'] = 'multi';
        this.tbl_lmscampaigntaskresponses.source.initGrid();
    }
    delete_lmscampaigntaskresponses_All() {
        this.tbl_lmscampaigntaskresponses.source.settings['selectMode'] = 'single';
    }
    show_lmscampaigntaskresponses_Filter() {
        setTimeout(() => {
            //  this.Set_lmscampaigntaskresponses_TableDropDownConfig();
        });
        if (this.tbl_lmscampaigntaskresponses.source.settings != null) this.tbl_lmscampaigntaskresponses.source.settings['hideSubHeader'] = !this.tbl_lmscampaigntaskresponses.source.settings['hideSubHeader'];
        this.tbl_lmscampaigntaskresponses.source.initGrid();
    }
    show_lmscampaigntaskresponses_InActive() {
    }
    enable_lmscampaigntaskresponses_InActive() {
    }
    async Set_lmscampaigntaskresponses_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmscampaigntaskresponses) {

            var clone = this.sharedService.clone(this.tbl_lmscampaigntaskresponses.source.settings);
            if (clone.columns['campaigntype'] != undefined) clone.columns['campaigntype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntaskresponses_campaigntype.value)), }, };
            if (clone.columns['campaigntype'] != undefined) clone.columns['campaigntype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntaskresponses_campaigntype.value)), }, };
            this.tbl_lmscampaigntaskresponses.source.settings = clone;
            this.tbl_lmscampaigntaskresponses.source.initGrid();
        }
        this.bfilterPopulate_lmscampaigntaskresponses = true;
    }
    async lmscampaigntaskresponses_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmscampaigntaskresponses_TableConfig() {
        this.lmscampaigntaskresponses_settings = {
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
                custom: this.lmscampaigntaskresponse_menuactions
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
                productid: {
                    title: 'Product',
                    type: 'number',
                    filter: true,
                },
                campaignid: {
                    title: 'Campaign',
                    type: 'number',
                    filter: true,
                },
                campaigncode: {
                    title: 'Campaign Code',
                    type: '',
                    filter: true,
                },
                campaigntypedesc: {
                    title: 'Campaign Type',
                    type: 'html',
                    filter: true,
                },
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
    lmscampaigntaskresponses_LoadTable(lmscampaigntaskresponses = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaigntaskresponses_ID) >= 0) {
            if (this.tbl_lmscampaigntaskresponses != undefined) this.tbl_lmscampaigntaskresponses.source = new LocalDataSource();
            if (this.tbl_lmscampaigntaskresponses != undefined) this.tbl_lmscampaigntaskresponses.source.load(lmscampaigntaskresponses as any as LocalDataSource);
            if (this.tbl_lmscampaigntaskresponses != undefined) this.tbl_lmscampaigntaskresponses.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    lmscampaigntaskresponses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscampaigntask_service.lmscampaigntaskresponses.length == 0)
    {
        this.tbl_lmscampaigntaskresponses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmscampaigntaskresponse();
        this.lmscampaigntask_service.lmscampaigntaskresponses.push(obj);
        this.tbl_lmscampaigntaskresponses.source.refresh();
        if ((this.lmscampaigntask_service.lmscampaigntaskresponses.length / this.tbl_lmscampaigntaskresponses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscampaigntaskresponses.source.getPaging().page)
        {
            this.tbl_lmscampaigntaskresponses.source.setPage((this.lmscampaigntask_service.lmscampaigntaskresponses.length / this.tbl_lmscampaigntaskresponses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmscampaigntaskresponses.source.grid.edit(this.tbl_lmscampaigntaskresponses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmscampaigntaskresponses.source.data.indexOf(event.data);
    this.onDelete_lmscampaigntaskresponse(event,event.data.responseid,((this.tbl_lmscampaigntaskresponses.source.getPaging().page-1) *this.tbl_lmscampaigntaskresponses.source.getPaging().perPage)+index);
    this.tbl_lmscampaigntaskresponses.source.refresh();
    break;
    }
    }
    
    */
    lmscampaigntaskresponses_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmscampaigntaskresponse(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmscampaigntaskresponse(event, event.data.responseid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmscampaigntaskresponse(event, event.data.responseid, ((this.tbl_lmscampaigntaskresponses.source.getPaging().page - 1) * this.tbl_lmscampaigntaskresponses.source.getPaging().perPage) + event.index);
                this.tbl_lmscampaigntaskresponses.source.refresh();
                break;
        }
    }
    lmscampaigntaskresponses_onDelete(obj) {
        let responseid = obj.data.responseid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscampaigntask_service.delete_lmscampaigntask(responseid).then(res =>
                this.lmscampaigntaskresponses_LoadTable()
            );
        }
    }
    async onCustom_lmscampaigntaskresponses_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmscampaigntaskresponses");
        let formname = (objbomenuaction as any).actionname;




    }
    lmscampaigntaskresponses_Paging(val) {
        debugger;
        this.tbl_lmscampaigntaskresponses.source.setPaging(1, val, true);
    }

    handle_lmscampaigntaskresponses_GridSelected(event: any) {
        this.lmscampaigntaskresponses_selectedindex = this.tbl_lmscampaigntaskresponses.source.findIndex(i => i.responseid === event.data.responseid);
    }
    Is_lmscampaigntaskresponses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaigntaskresponses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmscampaigntaskresponses

}



