import { lmshistoryService } from './../../../service/lmshistory.service';
import { lmshistory } from './../../../model/lmshistory.model';
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
    selector: 'app-lmshistory',
    templateUrl: './lmshistory.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class lmshistoryComponent implements OnInit {
    formData: lmshistory;
    list: lmshistory[];
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

    bfilterPopulate_lmshistories: boolean = false;
    lmshistory_menuactions: any = []

    lmshistory_Form: FormGroup;

    branchid_List: DropDownValues[];
    branchid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    branchlocationid_List: DropDownValues[];
    branchlocationid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    leadid_List: DropDownValues[];
    opportunityid_List: DropDownValues[];
    opportunityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    callid_List: DropDownValues[];
    callid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    productid_List: DropDownValues[];
    campaignid_List: DropDownValues[];
    leadby_List: DropDownValues[];
    leadby_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    leadresponse_List: DropDownValues[];
    nextaction_List: DropDownValues[];
    leadsource_List: DropDownValues[];
    leadstage_List: DropDownValues[];
    criticality_List: DropDownValues[];

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
        this.lmshistory_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            historyid: [null],
            branchid: [null],
            branchiddesc: [null],
            branchlocationid: [null],
            branchlocationiddesc: [null],
            leadid: [null],
            leadiddesc: [null],
            opportunityid: [null],
            opportunityiddesc: [null],
            callid: [null],
            calliddesc: [null],
            productid: [null],
            productiddesc: [null],
            campaignid: [null],
            campaigniddesc: [null],
            leadby: [null],
            leadbydesc: [null],
            currentowner: [null],
            leadresponse: [null],
            leadresponsedesc: [null],
            nextcalldate: [null],
            nextaction: [null],
            nextactiondesc: [null],
            actiondatetime: [null],
            previousremarks: [null],
            leadscore: [null],
            leadsource: [null],
            leadsourcedesc: [null],
            leadstage: [null],
            leadstagedesc: [null],
            criticality: [null],
            criticalitydesc: [null],
            expectedvalue: [null],
            attachment: [null],
            customfield: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.lmshistory_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.lmshistory_Form.dirty && this.lmshistory_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.historyid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.historyid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.historyid && pkDetail) {
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
        let lmshistoryid = null;

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
        this.formid = lmshistoryid;
        //alert(lmshistoryid);

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
        this.lmshistory_service.getDefaultData().then(res => {
            this.branchid_List = res.list_branchid.value;
            this.leadid_List = res.list_leadid.value;
            this.opportunityid_List = res.list_opportunityid.value;
            this.callid_List = res.list_callid.value;
            this.productid_List = res.list_productid.value;
            this.campaignid_List = res.list_campaignid.value;
            this.leadby_List = res.list_leadby.value;
            this.leadresponse_List = res.list_leadresponse.value;
            this.nextaction_List = res.list_nextaction.value;
            this.leadsource_List = res.list_leadsource.value;
            this.leadstage_List = res.list_leadstage.value;
            this.criticality_List = res.list_criticality.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.lmshistory_service.get_lmshistories_List().then(res => {
            this.pkList = res as lmshistory[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.lmshistory_Form.markAsUntouched();
        this.lmshistory_Form.markAsPristine();
    }
    onSelected_branchid(branchidDetail: any) {
        if (branchidDetail.value && branchidDetail) {
            this.lmshistory_Form.patchValue({
                branchid: branchidDetail.value,
                branchiddesc: branchidDetail.label,

            });
            this.lmshistory_service.getList_branchlocationid(branchidDetail.value).then(res => {
                this.branchlocationid_List = res as DropDownValues[]
            }).catch((err) => { this.spinner.hide(); console.log(err); });

        }
    }

    onSelected_branchlocationid(branchlocationidDetail: any) {
        if (branchlocationidDetail.value && branchlocationidDetail) {
            this.lmshistory_Form.patchValue({
                branchlocationid: branchlocationidDetail.value,
                branchlocationiddesc: branchlocationidDetail.label,

            });

        }
    }

    onSelected_opportunityid(opportunityidDetail: any) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmshistory_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,

            });

        }
    }

    onSelected_callid(callidDetail: any) {
        if (callidDetail.value && callidDetail) {
            this.lmshistory_Form.patchValue({
                callid: callidDetail.value,
                calliddesc: callidDetail.label,

            });

        }
    }

    onSelected_leadby(leadbyDetail: any) {
        if (leadbyDetail.value && leadbyDetail) {
            this.lmshistory_Form.patchValue({
                leadby: leadbyDetail.value,
                leadbydesc: leadbyDetail.label,

            });

        }
    }




    resetForm() {
        if (this.lmshistory_Form != null)
            this.lmshistory_Form.reset();
        this.lmshistory_Form.patchValue({
            branchid: this.sessionData.branchid,
            branchiddesc: this.sessionData.branchiddesc,
            leadby: this.sessionData.userid,
            leadbydesc: this.sessionData.username,
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }

    onDelete() {
        let historyid = this.lmshistory_Form.get('historyid').value;
        if (historyid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmshistory_service.delete_lmshistory(historyid).then(res => {
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
        this.lmshistory_Form.patchValue({
            historyid: null
        });
        if (this.formData.historyid != null) this.formData.historyid = null;
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
                    else if (key == "currentowner")
                        this.lmshistory_Form.patchValue({ "currentowner": mainscreendata[key] });
                    else if (key == "nextcalldate")
                        this.lmshistory_Form.patchValue({ "nextcalldate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "actiondatetime")
                        this.lmshistory_Form.patchValue({ "actiondatetime": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmshistory_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmshistory_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmshistory_Form.controls[key] != undefined) {
                                this.lmshistory_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("lmshistories", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
        this.lmshistory_Form.patchValue({ leadiddesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunityid_onChange(evt: any) {
        let e = evt.value;
    }
    callid_onChange(evt: any) {
        let e = evt.value;
    }
    productid_onChange(evt: any) {
        let e = evt.value;
        this.lmshistory_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
    }
    campaignid_onChange(evt: any) {
        let e = evt.value;
        this.lmshistory_Form.patchValue({ campaigniddesc: evt.options[evt.options.selectedIndex].text });
    }
    leadby_onChange(evt: any) {
        let e = evt.value;
    }
    leadresponse_onChange(evt: any) {
        let e = this.f.leadresponse.value as any;
        this.lmshistory_Form.patchValue({ leadresponsedesc: evt.options[evt.options.selectedIndex].text });
    }
    nextaction_onChange(evt: any) {
        let e = this.f.nextaction.value as any;
        this.lmshistory_Form.patchValue({ nextactiondesc: evt.options[evt.options.selectedIndex].text });
    }
    leadsource_onChange(evt: any) {
        let e = this.f.leadsource.value as any;
        this.lmshistory_Form.patchValue({ leadsourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    leadstage_onChange(evt: any) {
        let e = this.f.leadstage.value as any;
        this.lmshistory_Form.patchValue({ leadstagedesc: evt.options[evt.options.selectedIndex].text });
    }
    criticality_onChange(evt: any) {
        let e = this.f.criticality.value as any;
        this.lmshistory_Form.patchValue({ criticalitydesc: evt.options[evt.options.selectedIndex].text });
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



    edit_lmshistories() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.lmshistory_service.get_lmshistories_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.lmshistory;
            let formproperty = res.lmshistory.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.lmshistory.pkcol;
            this.formid = res.lmshistory.historyid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.lmshistory;
        this.formid = res.lmshistory.historyid;
        this.pkcol = res.lmshistory.pkcol;
        this.bmyrecord = false;
        if ((res.lmshistory as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmshistory_Form.patchValue({
            historyid: res.lmshistory.historyid,
            branchid: res.lmshistory.branchid,
            branchiddesc: res.lmshistory.branchiddesc,
            branchlocationid: res.lmshistory.branchlocationid,
            branchlocationiddesc: res.lmshistory.branchlocationiddesc,
            leadid: res.lmshistory.leadid,
            leadiddesc: res.lmshistory.leadiddesc,
            opportunityid: res.lmshistory.opportunityid,
            opportunityiddesc: res.lmshistory.opportunityiddesc,
            callid: res.lmshistory.callid,
            calliddesc: res.lmshistory.calliddesc,
            productid: res.lmshistory.productid,
            productiddesc: res.lmshistory.productiddesc,
            campaignid: res.lmshistory.campaignid,
            campaigniddesc: res.lmshistory.campaigniddesc,
            leadby: res.lmshistory.leadby,
            leadbydesc: res.lmshistory.leadbydesc,
            currentowner: JSON.parse(res.lmshistory.currentowner),
            leadresponse: res.lmshistory.leadresponse,
            leadresponsedesc: res.lmshistory.leadresponsedesc,
            nextcalldate: this.ngbDateParserFormatter.parse(res.lmshistory.nextcalldate),
            nextaction: res.lmshistory.nextaction,
            nextactiondesc: res.lmshistory.nextactiondesc,
            actiondatetime: this.ngbDateParserFormatter.parse(res.lmshistory.actiondatetime),
            previousremarks: res.lmshistory.previousremarks,
            leadscore: res.lmshistory.leadscore,
            leadsource: res.lmshistory.leadsource,
            leadsourcedesc: res.lmshistory.leadsourcedesc,
            leadstage: res.lmshistory.leadstage,
            leadstagedesc: res.lmshistory.leadstagedesc,
            criticality: res.lmshistory.criticality,
            criticalitydesc: res.lmshistory.criticalitydesc,
            expectedvalue: res.lmshistory.expectedvalue,
            attachment: JSON.parse(res.lmshistory.attachment),
            customfield: res.lmshistory.customfield,
            status: res.lmshistory.status,
            statusdesc: res.lmshistory.statusdesc,
        });
        this.lmshistory_menuactions = res.lmshistory_menuactions;
        if (this.lmshistory_Form.get('customfield').value != null && this.lmshistory_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.lmshistory_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmshistory_Form.get('attachment').value != null && this.lmshistory_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.lmshistory_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.branchid.value && this.f.branchid.value != "" && this.f.branchid.value != null) this.lmshistory_service.getList_branchlocationid(this.f.branchid.value).then(res => {
                this.branchlocationid_List = res as DropDownValues[];
            }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.lmshistory_Form.controls) {
            let val = this.lmshistory_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.lmshistory_Form.controls[key] != null) {
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
        if (!this.lmshistory_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.lmshistory_Form.getRawValue();
        if (this.lmshistory_Form.get('currentowner').value != null) obj.currentowner = JSON.stringify(this.lmshistory_Form.get('currentowner').value);
        obj.nextcalldate = new Date(this.lmshistory_Form.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmshistory_Form.get('nextcalldate').value) + '  UTC' : null);
        obj.actiondatetime = new Date(this.lmshistory_Form.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmshistory_Form.get('actiondatetime').value) + '  UTC' : null);
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
        // Object.keys(this.lmshistory_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.lmshistory_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.lmshistory_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.lmshistory_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.lmshistory_Form.controls[key] != null) {
                        this.formData[key] = this.lmshistory_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        if (this.lmshistory_Form.get('currentowner').value != null) this.formData.currentowner = JSON.stringify(this.lmshistory_Form.get('currentowner').value);
        this.formData.nextcalldate = new Date(this.lmshistory_Form.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmshistory_Form.get('nextcalldate').value) + '  UTC' : null);
        this.formData.actiondatetime = new Date(this.lmshistory_Form.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmshistory_Form.get('actiondatetime').value) + '  UTC' : null);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.lmshistory_service.saveOrUpdate_lmshistories(this.formData).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).lmshistory);
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
                        this.objvalues.push((res as any).lmshistory);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmshistory_Form.markAsUntouched();
                this.lmshistory_Form.markAsPristine();
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



