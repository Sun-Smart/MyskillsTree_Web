import { hlpticketService } from './../../../service/hlpticket.service';
import { hlpticket } from './../../../model/hlpticket.model';
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
import { hlpticketdetail } from '../../../../../../n-tire-help-desk-app/src/app/model/hlpticketdetail.model';
import { hlpticketdetailComponent } from '../../../../../../n-tire-help-desk-app/src/app/pages/forms/hlpticketdetail/hlpticketdetail.component';
import { hlpticketdetailService } from '../../../../../../n-tire-help-desk-app/src/app/service/hlpticketdetail.service';
import { hlpplannedaction } from './../../../model/hlpplannedaction.model';
import { hlpplannedactionComponent } from './../../../pages/forms/hlpplannedaction/hlpplannedaction.component';
import { hlpplannedactionService } from './../../../service/hlpplannedaction.service';
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
    selector: 'app-hlpticket',
    templateUrl: './hlpticket.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class hlpticketComponent implements OnInit {
    formData: hlpticket;
    list: hlpticket[];
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

    bfilterPopulate_hlptickets: boolean = false;
    bfilterPopulate_hlpticketdetails: boolean = false;
    bfilterPopulate_hlpplannedactions: boolean = false;
    hlpticket_menuactions: any = []
    hlpticketdetail_menuactions: any = []
    @ViewChild('tbl_hlpticketdetails', { static: false }) tbl_hlpticketdetails: Ng2SmartTableComponent;
    hlpplannedaction_menuactions: any = []
    @ViewChild('tbl_hlpplannedactions', { static: false }) tbl_hlpplannedactions: Ng2SmartTableComponent;

    hlpticket_Form: FormGroup;

    sourcefield_List: DropDownValues[];
    branchid_List: DropDownValues[];
    branchid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    departmentid_List: DropDownValues[];
    requestortype_List: DropDownValues[];
    requestor_List: DropDownValues[];
    requestor_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    tickettype_List: DropDownValues[];
    priority_List: DropDownValues[];
    criticality_List: DropDownValues[];
    impact_List: DropDownValues[];
    risk_List: DropDownValues[];
    sla_List: DropDownValues[];
    sla_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    source_List: DropDownValues[];
    category_List: DropDownValues[];
    subcategory_List: DropDownValues[];
    stage_List: DropDownValues[];
    completedby_List: DropDownValues[];
    completedby_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    rca_List: DropDownValues[];
    solution_List: DropDownValues[];

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



    hlpticketdetails_visiblelist: any;
    hlpticketdetails_hidelist: any;
    hlpplannedactions_visiblelist: any;
    hlpplannedactions_hidelist: any;

    Deleted_hlpticketdetail_IDs: string = "";
    hlpticketdetails_ID: string = "1";
    hlpticketdetails_selectedindex: any;
    Deleted_hlpplannedaction_IDs: string = "";
    hlpplannedactions_ID: string = "2";
    hlpplannedactions_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private hlpticket_service: hlpticketService,
        private hlpticketdetail_service: hlpticketdetailService,
        private hlpplannedaction_service: hlpplannedactionService,
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
        this.hlpticket_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            ticketid: [null],
            sourcefield: [null],
            sourcefielddesc: [null],
            sourcereference: [null],
            branchid: [null],
            branchiddesc: [null],
            departmentid: [null],
            departmentiddesc: [null],
            requestortype: [null],
            requestortypedesc: [null],
            requestor: [null],
            requestordesc: [null],
            item: [null],
            ticketdate: [null],
            incidentdate: [null],
            incidenttime: [null],
            incidentduration: [null],
            duedate: [null],
            assignedto: [null],
            tickettype: [null],
            tickettypedesc: [null],
            priority: [null],
            prioritydesc: [null],
            criticality: [null],
            criticalitydesc: [null],
            impact: [null],
            impactdesc: [null],
            risk: [null],
            riskdesc: [null],
            sla: [null],
            sladesc: [null],
            slabreached: [null],
            source: [null],
            sourcedesc: [null],
            ticketreference: [null],
            category: [null],
            categorydesc: [null],
            subcategory: [null],
            subcategorydesc: [null],
            tags: [null],
            subject: [null],
            ticketdetails: [null],
            impacteditems: [null],
            impactedservices: [null],
            impactedproducts: [null],
            impactdetails: [null],
            remarks: [null],
            stage: [null],
            stagedesc: [null],
            completedby: [null],
            completedbydesc: [null],
            linkedtickets: [null],
            rca: [null],
            rcadesc: [null],
            rcadetails: [null],
            solution: [null],
            solutiondesc: [null],
            solutiondetails: [null],
            solutiongivenon: [null],
            startdate: [null],
            completeddate: [null],
            lessonslearned: [null],
            history: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.hlpticket_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.hlpticket_Form.dirty && this.hlpticket_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.ticketid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.ticketid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.ticketid && pkDetail) {
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
        let hlpticketid = null;

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
        this.formid = hlpticketid;
        //alert(hlpticketid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_hlpticketdetails_TableConfig();
            setTimeout(() => {
                //this.Set_hlpticketdetails_TableDropDownConfig();
            });

            this.Set_hlpplannedactions_TableConfig();
            setTimeout(() => {
                //this.Set_hlpplannedactions_TableDropDownConfig();
            });

            this.FillCustomField();
            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.hlpticket_service.getDefaultData().then(res => {
            this.sourcefield_List = res.list_sourcefield.value;
            this.branchid_List = res.list_branchid.value;
            this.departmentid_List = res.list_departmentid.value;
            this.requestortype_List = res.list_requestortype.value;
            this.requestor_List = res.list_requestor.value;
            this.tickettype_List = res.list_tickettype.value;
            this.priority_List = res.list_priority.value;
            this.criticality_List = res.list_criticality.value;
            this.impact_List = res.list_impact.value;
            this.risk_List = res.list_risk.value;
            this.sla_List = res.list_sla.value;
            this.source_List = res.list_source.value;
            this.category_List = res.list_category.value;
            this.stage_List = res.list_stage.value;
            this.completedby_List = res.list_completedby.value;
            this.rca_List = res.list_rca.value;
            this.solution_List = res.list_solution.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.hlpticket_service.get_hlptickets_List().then(res => {
            this.pkList = res as hlpticket[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.hlpticket_Form.markAsUntouched();
        this.hlpticket_Form.markAsPristine();
    }
    onSelected_branchid(branchidDetail: any) {
        if (branchidDetail.value && branchidDetail) {
            this.hlpticket_Form.patchValue({
                branchid: branchidDetail.value,
                branchiddesc: branchidDetail.label,

            });

        }
    }

    onSelected_requestor(requestorDetail: any) {
        if (requestorDetail.value && requestorDetail) {
            this.hlpticket_Form.patchValue({
                requestor: requestorDetail.value,
                requestordesc: requestorDetail.label,

            });

        }
    }

    onSelected_sla(slaDetail: any) {
        if (slaDetail.value && slaDetail) {
            this.hlpticket_Form.patchValue({
                sla: slaDetail.value,
                sladesc: slaDetail.label,

            });

        }
    }

    onSelected_completedby(completedbyDetail: any) {
        if (completedbyDetail.value && completedbyDetail) {
            this.hlpticket_Form.patchValue({
                completedby: completedbyDetail.value,
                completedbydesc: completedbyDetail.label,

            });

        }
    }




    hlpticketdetailshtml() {
        let ret = "";
        ret += `<div class='panel panel-default paper-shadow' data-z='0.5' data-hover-z='1' data-animated=''>
<div class='panel-body'>
<div class='media v-middle'>
<div class='media-left'>
<img src='http://localhost:5002/Resources/images1/##thumbnail##' class='media-object img-circle width-50'>
</div>
<div class='media-body message'>
<h4 class='text-subhead margin-none'><a href='#'>##actionuserdesc##</a></h4>
<p class='text-caption text-light'><i class='fa fa-clock-o'></i>##actiondate##</p>
</div>
</div>
<p>##actionremarks##</p>
</div>
</div>
`;
        return ret;
    }
    resetForm() {
        if (this.hlpticket_Form != null)
            this.hlpticket_Form.reset();
        this.hlpticket_Form.patchValue({
            branchid: this.sessionData.branchid,
            branchiddesc: this.sessionData.branchiddesc,
            requestor: this.sessionData.userid,
            requestordesc: this.sessionData.username,
            completedby: this.sessionData.userid,
            completedbydesc: this.sessionData.username,
        });
        this.hlpticket_Form.patchValue({
            requestor: this.sessionData.userid,
            ticketdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            incidentdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            duedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            solutiongivenon: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            completeddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        });
        setTimeout(() => {
            this.hlpticketdetails_LoadTable();
            this.hlpplannedactions_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.data != null) {
            this.hlpticket_Form.patchValue({
                sourcefield: this.data.sourcefield, sourcereference: this.data.sourcereference
            });
        }
    }

    onDelete() {
        let ticketid = this.hlpticket_Form.get('ticketid').value;
        if (ticketid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hlpticket_service.delete_hlpticket(ticketid).then(res => {
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
        this.hlpticket_Form.patchValue({
            ticketid: null
        });
        if (this.formData.ticketid != null) this.formData.ticketid = null;
        for (let i = 0; i < this.tbl_hlpticketdetails.source.length; i++) {
            this.tbl_hlpticketdetails.source[i].ticketdetailid = null;
        }
        for (let i = 0; i < this.tbl_hlpplannedactions.source.length; i++) {
            this.tbl_hlpplannedactions.source[i].planid = null;
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
                    else if (key == "ticketdate")
                        this.hlpticket_Form.patchValue({ "ticketdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "incidentdate")
                        this.hlpticket_Form.patchValue({ "incidentdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "incidenttime")
                        this.hlpticket_Form.patchValue({ "incidenttime": new Time(mainscreendata[key]) });
                    else if (key == "duedate")
                        this.hlpticket_Form.patchValue({ "duedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "assignedto")
                        this.hlpticket_Form.patchValue({ "assignedto": mainscreendata[key] });
                    else if (key == "tags")
                        this.hlpticket_Form.patchValue({ "tags": mainscreendata[key] });
                    else if (key == "remarks")
                        this.hlpticket_Form.patchValue({ "remarks": mainscreendata[key] });
                    else if (key == "solutiongivenon")
                        this.hlpticket_Form.patchValue({ "solutiongivenon": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "startdate")
                        this.hlpticket_Form.patchValue({ "startdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "completeddate")
                        this.hlpticket_Form.patchValue({ "completeddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.hlpticket_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.hlpticket_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.hlpticket_Form.controls[key] != undefined) {
                                this.hlpticket_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    async FillCustomField() {
        return this.customfieldservice.getcustomfieldconfigurationsByTable("hlptickets", this.CustomFormName, "", "", this.customFieldJson).then(res => {
            this.customFieldServiceList = res;
            if (this.customFieldServiceList != undefined) this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
            return res;
        });


    }
    onClose() {
        this.dialogRef.close(this.objvalues);
    }

    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.subject != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.subject != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    sourcefield_onChange(evt: any) {
        let e = this.f.sourcefield.value as any;
        this.hlpticket_Form.patchValue({ sourcefielddesc: evt.options[evt.options.selectedIndex].text });
    }
    branchid_onChange(evt: any) {
        let e = evt.value;
    }
    departmentid_onChange(evt: any) {
        let e = evt.value;
        this.hlpticket_Form.patchValue({ departmentiddesc: evt.options[evt.options.selectedIndex].text });
    }
    requestortype_onChange(evt: any) {
        let e = this.f.requestortype.value as any;
        this.hlpticket_Form.patchValue({ requestortypedesc: evt.options[evt.options.selectedIndex].text });
    }
    requestor_onChange(evt: any) {
        let e = evt.value;
    }
    tickettype_onChange(evt: any) {
        let e = this.f.tickettype.value as any;
        this.hlpticket_Form.patchValue({ tickettypedesc: evt.options[evt.options.selectedIndex].text });
    }
    priority_onChange(evt: any) {
        let e = this.f.priority.value as any;
        this.hlpticket_Form.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    criticality_onChange(evt: any) {
        let e = this.f.criticality.value as any;
        this.hlpticket_Form.patchValue({ criticalitydesc: evt.options[evt.options.selectedIndex].text });
    }
    impact_onChange(evt: any) {
        let e = this.f.impact.value as any;
        this.hlpticket_Form.patchValue({ impactdesc: evt.options[evt.options.selectedIndex].text });
    }
    risk_onChange(evt: any) {
        let e = this.f.risk.value as any;
        this.hlpticket_Form.patchValue({ riskdesc: evt.options[evt.options.selectedIndex].text });
    }
    sla_onChange(evt: any) {
        let e = evt.value;
    }
    source_onChange(evt: any) {
        let e = this.f.source.value as any;
        this.hlpticket_Form.patchValue({ sourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    category_onChange(evt: any) {
        let e = evt.value;
        this.hlpticket_Form.patchValue({ categorydesc: evt.options[evt.options.selectedIndex].text });
        setTimeout(() => {
            if (this.f.category.value && this.f.category.value != "" && this.f.category.value != null) this.hlpticket_service.getList_subcategory(this.f.category.value).then(res => this.subcategory_List = res as DropDownValues[]);
        });
    }
    subcategory_onChange(evt: any) {
        let e = evt.value;
        this.hlpticket_Form.patchValue({ subcategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    stage_onChange(evt: any) {
        let e = this.f.stage.value as any;
        this.hlpticket_Form.patchValue({ stagedesc: evt.options[evt.options.selectedIndex].text });
    }
    completedby_onChange(evt: any) {
        let e = evt.value;
    }
    rca_onChange(evt: any) {
        let e = evt.value;
        this.hlpticket_Form.patchValue({ rcadesc: evt.options[evt.options.selectedIndex].text });
    }
    solution_onChange(evt: any) {
        let e = evt.value;
        this.hlpticket_Form.patchValue({ solutiondesc: evt.options[evt.options.selectedIndex].text });
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



    edit_hlptickets() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.hlpticket_service.get_hlptickets_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.hlpticket;
            let formproperty = res.hlpticket.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.hlpticket.pkcol;
            this.formid = res.hlpticket.ticketid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.hlpticket;
        this.formid = res.hlpticket.ticketid;
        this.pkcol = res.hlpticket.pkcol;
        this.bmyrecord = false;
        if ((res.hlpticket as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        var incidenttimeTime = new Time(res.hlpticket.incidenttime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hlpticket_Form.patchValue({
            ticketid: res.hlpticket.ticketid,
            sourcefield: res.hlpticket.sourcefield,
            sourcefielddesc: res.hlpticket.sourcefielddesc,
            sourcereference: res.hlpticket.sourcereference,
            branchid: res.hlpticket.branchid,
            branchiddesc: res.hlpticket.branchiddesc,
            departmentid: res.hlpticket.departmentid,
            departmentiddesc: res.hlpticket.departmentiddesc,
            requestortype: res.hlpticket.requestortype,
            requestortypedesc: res.hlpticket.requestortypedesc,
            requestor: res.hlpticket.requestor,
            requestordesc: res.hlpticket.requestordesc,
            item: res.hlpticket.item,
            ticketdate: this.ngbDateParserFormatter.parse(res.hlpticket.ticketdate),
            incidentdate: this.ngbDateParserFormatter.parse(res.hlpticket.incidentdate),
            incidenttime: incidenttimeTime,
            incidentduration: res.hlpticket.incidentduration,
            duedate: this.ngbDateParserFormatter.parse(res.hlpticket.duedate),
            assignedto: JSON.parse(res.hlpticket.assignedto),
            tickettype: res.hlpticket.tickettype,
            tickettypedesc: res.hlpticket.tickettypedesc,
            priority: res.hlpticket.priority,
            prioritydesc: res.hlpticket.prioritydesc,
            criticality: res.hlpticket.criticality,
            criticalitydesc: res.hlpticket.criticalitydesc,
            impact: res.hlpticket.impact,
            impactdesc: res.hlpticket.impactdesc,
            risk: res.hlpticket.risk,
            riskdesc: res.hlpticket.riskdesc,
            sla: res.hlpticket.sla,
            sladesc: res.hlpticket.sladesc,
            slabreached: res.hlpticket.slabreached,
            source: res.hlpticket.source,
            sourcedesc: res.hlpticket.sourcedesc,
            ticketreference: res.hlpticket.ticketreference,
            category: res.hlpticket.category,
            categorydesc: res.hlpticket.categorydesc,
            subcategory: res.hlpticket.subcategory,
            subcategorydesc: res.hlpticket.subcategorydesc,
            tags: JSON.parse(res.hlpticket.tags),
            subject: res.hlpticket.subject,
            ticketdetails: res.hlpticket.ticketdetails,
            impacteditems: res.hlpticket.impacteditems,
            impactedservices: res.hlpticket.impactedservices,
            impactedproducts: res.hlpticket.impactedproducts,
            impactdetails: res.hlpticket.impactdetails,
            remarks: JSON.parse(res.hlpticket.remarks),
            stage: res.hlpticket.stage,
            stagedesc: res.hlpticket.stagedesc,
            completedby: res.hlpticket.completedby,
            completedbydesc: res.hlpticket.completedbydesc,
            linkedtickets: res.hlpticket.linkedtickets,
            rca: res.hlpticket.rca,
            rcadesc: res.hlpticket.rcadesc,
            rcadetails: res.hlpticket.rcadetails,
            solution: res.hlpticket.solution,
            solutiondesc: res.hlpticket.solutiondesc,
            solutiondetails: res.hlpticket.solutiondetails,
            solutiongivenon: this.ngbDateParserFormatter.parse(res.hlpticket.solutiongivenon),
            startdate: this.ngbDateParserFormatter.parse(res.hlpticket.startdate),
            completeddate: this.ngbDateParserFormatter.parse(res.hlpticket.completeddate),
            lessonslearned: res.hlpticket.lessonslearned,
            history: res.hlpticket.history,
            customfield: res.hlpticket.customfield,
            attachment: JSON.parse(res.hlpticket.attachment),
            status: res.hlpticket.status,
            statusdesc: res.hlpticket.statusdesc,
        });
        this.hlpticket_menuactions = res.hlpticket_menuactions;
        this.hlpticketdetail_menuactions = res.hlpticketdetail_menuactions;
        this.hlpticketdetails_visiblelist = res.hlpticketdetails_visiblelist;
        this.hlpplannedaction_menuactions = res.hlpplannedaction_menuactions;
        this.hlpplannedactions_visiblelist = res.hlpplannedactions_visiblelist;
        if (this.hlpticket_Form.get('customfield').value != null && this.hlpticket_Form.get('customfield').value != "") this.customFieldJson = JSON.parse(this.hlpticket_Form.get('customfield').value);
        this.FillCustomField();
        if (this.hlpticket_Form.get('attachment').value != null && this.hlpticket_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.hlpticket_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.category.value && this.f.category.value != "" && this.f.category.value != null) this.hlpticket_service.getList_subcategory(this.f.category.value).then(res => {
                this.subcategory_List = res as DropDownValues[];
            }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        this.Set_hlpticketdetails_TableConfig();
        this.hlpticketdetails_LoadTable(res.hlpticketdetails);
        this.Set_hlpplannedactions_TableConfig();
        this.hlpplannedactions_LoadTable(res.hlpplannedactions);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.hlpticket_Form.controls) {
            let val = this.hlpticket_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.hlpticket_Form.controls[key] != null) {
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
        if (!this.hlpticket_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        var obj = this.hlpticket_Form.getRawValue();
        obj.ticketdate = new Date(this.hlpticket_Form.get('ticketdate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('ticketdate').value) + '  UTC' : null);
        obj.incidentdate = new Date(this.hlpticket_Form.get('incidentdate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('incidentdate').value) + '  UTC' : null);
        obj.incidenttime = (this.hlpticket_Form.get('incidenttime').value == null ? 0 : this.hlpticket_Form.get('incidenttime').value.hour) + ':' + (this.hlpticket_Form.get('incidenttime').value == null ? 0 : this.hlpticket_Form.get('incidenttime').value.minute + ":00");
        obj.duedate = new Date(this.hlpticket_Form.get('duedate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('duedate').value) + '  UTC' : null);
        if (this.hlpticket_Form.get('assignedto').value != null) obj.assignedto = JSON.stringify(this.hlpticket_Form.get('assignedto').value);
        if (this.hlpticket_Form.get('tags').value != null) obj.tags = JSON.stringify(this.hlpticket_Form.get('tags').value);
        if (this.hlpticket_Form.get('remarks').value != null) obj.remarks = JSON.stringify(this.hlpticket_Form.get('remarks').value);
        obj.solutiongivenon = new Date(this.hlpticket_Form.get('solutiongivenon').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('solutiongivenon').value) + '  UTC' : null);
        obj.startdate = new Date(this.hlpticket_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('startdate').value) + '  UTC' : null);
        obj.completeddate = new Date(this.hlpticket_Form.get('completeddate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('completeddate').value) + '  UTC' : null);
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
        // Object.keys(this.hlpticket_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.hlpticket_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.hlpticket_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.hlpticket_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.hlpticket_Form.controls[key] != null) {
                        this.formData[key] = this.hlpticket_Form.controls[key].value;
                    }
                }
            }
        }
        var customfields = this.customfieldservice.getCustomValues(document);
        this.formData.ticketdate = new Date(this.hlpticket_Form.get('ticketdate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('ticketdate').value) + '  UTC' : null);
        this.formData.incidentdate = new Date(this.hlpticket_Form.get('incidentdate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('incidentdate').value) + '  UTC' : null);
        this.formData.incidenttime = (this.hlpticket_Form.get('incidenttime').value == null ? 0 : this.hlpticket_Form.get('incidenttime').value.hour) + ':' + (this.hlpticket_Form.get('incidenttime').value == null ? 0 : this.hlpticket_Form.get('incidenttime').value.minute + ":00");
        this.formData.duedate = new Date(this.hlpticket_Form.get('duedate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('duedate').value) + '  UTC' : null);
        if (this.hlpticket_Form.get('assignedto').value != null) this.formData.assignedto = JSON.stringify(this.hlpticket_Form.get('assignedto').value);
        if (this.hlpticket_Form.get('tags').value != null) this.formData.tags = JSON.stringify(this.hlpticket_Form.get('tags').value);
        if (this.hlpticket_Form.get('remarks').value != null) this.formData.remarks = JSON.stringify(this.hlpticket_Form.get('remarks').value);
        this.formData.solutiongivenon = new Date(this.hlpticket_Form.get('solutiongivenon').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('solutiongivenon').value) + '  UTC' : null);
        this.formData.startdate = new Date(this.hlpticket_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('startdate').value) + '  UTC' : null);
        this.formData.completeddate = new Date(this.hlpticket_Form.get('completeddate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('completeddate').value) + '  UTC' : null);
        if (customfields != null) this.formData.customfield = JSON.stringify(customfields);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_hlpticketdetail_IDs = this.Deleted_hlpticketdetail_IDs;
        this.formData.Deleted_hlpplannedaction_IDs = this.Deleted_hlpplannedaction_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.hlpticket_service.saveOrUpdate_hlptickets(this.formData, this.tbl_hlpticketdetails?.source?.data, this.tbl_hlpplannedactions?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_hlpticketdetails.source) {
                    for (let i = 0; i < this.tbl_hlpticketdetails.source.data.length; i++) {
                        if (this.tbl_hlpticketdetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_hlpticketdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_hlpplannedactions.source) {
                    for (let i = 0; i < this.tbl_hlpplannedactions.source.data.length; i++) {
                        if (this.tbl_hlpplannedactions.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_hlpplannedactions.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).hlpticket);
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
                        this.objvalues.push((res as any).hlpticket);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.hlpticket_Form.markAsUntouched();
                this.hlpticket_Form.markAsPristine();
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
        this.tbl_hlpticketdetails.source = new LocalDataSource();
        this.tbl_hlpplannedactions.source = new LocalDataSource();
    }

    AddOrEdit_hlpticketdetail(event: any, ticketdetailid: any, ticketid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(hlpticketdetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, ticketdetailid, ticketid, visiblelist: this.hlpticketdetails_visiblelist, hidelist: this.hlpticketdetails_hidelist, ScreenType: 2, sourcereference: this.hlpticket_Form.get('sourcereference').value, sourcefield: this.hlpticket_Form.get('sourcefield').value, sourcefielddesc: this.hlpticket_Form.get('sourcefielddesc').value },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_hlpticketdetails.source.add(res[i]);
                    }
                    this.tbl_hlpticketdetails.source.refresh();
                }
                else {
                    this.tbl_hlpticketdetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_hlpticketdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_hlpticketdetail_IDs += childID + ",";
        this.tbl_hlpticketdetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_hlpplannedaction(event: any, planid: any, ticketid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(hlpplannedactionComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, planid, ticketid, visiblelist: this.hlpplannedactions_visiblelist, hidelist: this.hlpplannedactions_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_hlpplannedactions.source.add(res[i]);
                    }
                    this.tbl_hlpplannedactions.source.refresh();
                }
                else {
                    this.tbl_hlpplannedactions.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_hlpplannedaction(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_hlpplannedaction_IDs += childID + ",";
        this.tbl_hlpplannedactions.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes hlpticketdetails
    hlpticketdetails_settings: any;

    show_hlpticketdetails_Checkbox() {
        debugger;
        if (this.tbl_hlpticketdetails.source.settings['selectMode'] == 'multi') this.tbl_hlpticketdetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_hlpticketdetails.source.settings['selectMode'] = 'multi';
        this.tbl_hlpticketdetails.source.initGrid();
    }
    delete_hlpticketdetails_All() {
        this.tbl_hlpticketdetails.source.settings['selectMode'] = 'single';
    }
    show_hlpticketdetails_Filter() {
        setTimeout(() => {
            //  this.Set_hlpticketdetails_TableDropDownConfig();
        });
        if (this.tbl_hlpticketdetails.source.settings != null) this.tbl_hlpticketdetails.source.settings['hideSubHeader'] = !this.tbl_hlpticketdetails.source.settings['hideSubHeader'];
        this.tbl_hlpticketdetails.source.initGrid();
    }
    show_hlpticketdetails_InActive() {
    }
    enable_hlpticketdetails_InActive() {
    }
    async Set_hlpticketdetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_hlpticketdetails) {

            var clone = this.sharedService.clone(this.tbl_hlpticketdetails.source.settings);
            if (clone.columns['ticketid'] != undefined) clone.columns['ticketid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpticketdetails_ticketid.value)), }, };
            if (clone.columns['ticketid'] != undefined) clone.columns['ticketid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpticketdetails_ticketid.value)), }, };
            this.tbl_hlpticketdetails.source.settings = clone;
            this.tbl_hlpticketdetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_hlpticketdetails.source.settings);
            if (clone.columns['actionuser'] != undefined) clone.columns['actionuser'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpticketdetails_actionuser.value)), }, };
            if (clone.columns['actionuser'] != undefined) clone.columns['actionuser'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpticketdetails_actionuser.value)), }, };
            this.tbl_hlpticketdetails.source.settings = clone;
            this.tbl_hlpticketdetails.source.initGrid();
        }
        this.bfilterPopulate_hlpticketdetails = true;
    }
    async hlpticketdetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_hlpticketdetails_TableConfig() {
        this.hlpticketdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: !this.showview,
                position: 'left',
                custom: this.hlpticketdetail_menuactions
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
                colhtml:
                {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor:
                    {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        debugger;
                        cell = this.hlpticketdetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        divrow["assigneddate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["assigneddate"]));
                        divrow["actiondate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["actiondate"]));
                        divrow["tatends"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["tatends"]));
                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    hlpticketdetails_LoadTable(hlpticketdetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.hlpticketdetails_ID) >= 0) {
            if (this.tbl_hlpticketdetails != undefined) this.tbl_hlpticketdetails.source = new LocalDataSource();
            if (this.tbl_hlpticketdetails != undefined) this.tbl_hlpticketdetails.source.load(hlpticketdetails as any as LocalDataSource);
            if (this.tbl_hlpticketdetails != undefined) this.tbl_hlpticketdetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    hlpticketdetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.hlpticket_service.hlpticketdetails.length == 0)
    {
        this.tbl_hlpticketdetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new hlpticketdetail();
        this.hlpticket_service.hlpticketdetails.push(obj);
        this.tbl_hlpticketdetails.source.refresh();
        if ((this.hlpticket_service.hlpticketdetails.length / this.tbl_hlpticketdetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_hlpticketdetails.source.getPaging().page)
        {
            this.tbl_hlpticketdetails.source.setPage((this.hlpticket_service.hlpticketdetails.length / this.tbl_hlpticketdetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_hlpticketdetails.source.grid.edit(this.tbl_hlpticketdetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_hlpticketdetails.source.data.indexOf(event.data);
    this.onDelete_hlpticketdetail(event,event.data.ticketdetailid,((this.tbl_hlpticketdetails.source.getPaging().page-1) *this.tbl_hlpticketdetails.source.getPaging().perPage)+index);
    this.tbl_hlpticketdetails.source.refresh();
    break;
    }
    }
    
    */
    hlpticketdetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_hlpticketdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_hlpticketdetail(event, event.data.ticketdetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_hlpticketdetail(event, event.data.ticketdetailid, ((this.tbl_hlpticketdetails.source.getPaging().page - 1) * this.tbl_hlpticketdetails.source.getPaging().perPage) + event.index);
                this.tbl_hlpticketdetails.source.refresh();
                break;
        }
    }
    hlpticketdetails_onDelete(obj) {
        let ticketdetailid = obj.data.ticketdetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.hlpticket_service.delete_hlpticket(ticketdetailid).then(res =>
                this.hlpticketdetails_LoadTable()
            );
        }
    }
    async onCustom_hlpticketdetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "hlpticketdetails");
        let formname = (objbomenuaction as any).actionname;




    }
    hlpticketdetails_Paging(val) {
        debugger;
        this.tbl_hlpticketdetails.source.setPaging(1, val, true);
    }

    handle_hlpticketdetails_GridSelected(event: any) {
        this.hlpticketdetails_selectedindex = this.tbl_hlpticketdetails.source.findIndex(i => i.ticketdetailid === event.data.ticketdetailid);
    }
    Is_hlpticketdetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.hlpticketdetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes hlpticketdetails
    //start of Grid Codes hlpplannedactions
    hlpplannedactions_settings: any;

    show_hlpplannedactions_Checkbox() {
        debugger;
        if (this.tbl_hlpplannedactions.source.settings['selectMode'] == 'multi') this.tbl_hlpplannedactions.source.settings['selectMode'] = 'single';
        else
            this.tbl_hlpplannedactions.source.settings['selectMode'] = 'multi';
        this.tbl_hlpplannedactions.source.initGrid();
    }
    delete_hlpplannedactions_All() {
        this.tbl_hlpplannedactions.source.settings['selectMode'] = 'single';
    }
    show_hlpplannedactions_Filter() {
        setTimeout(() => {
            //  this.Set_hlpplannedactions_TableDropDownConfig();
        });
        if (this.tbl_hlpplannedactions.source.settings != null) this.tbl_hlpplannedactions.source.settings['hideSubHeader'] = !this.tbl_hlpplannedactions.source.settings['hideSubHeader'];
        this.tbl_hlpplannedactions.source.initGrid();
    }
    show_hlpplannedactions_InActive() {
    }
    enable_hlpplannedactions_InActive() {
    }
    async Set_hlpplannedactions_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_hlpplannedactions) {

            var clone = this.sharedService.clone(this.tbl_hlpplannedactions.source.settings);
            if (clone.columns['ticketid'] != undefined) clone.columns['ticketid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpplannedactions_ticketid.value)), }, };
            if (clone.columns['ticketid'] != undefined) clone.columns['ticketid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpplannedactions_ticketid.value)), }, };
            this.tbl_hlpplannedactions.source.settings = clone;
            this.tbl_hlpplannedactions.source.initGrid();
        }
        this.bfilterPopulate_hlpplannedactions = true;
    }
    async hlpplannedactions_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_hlpplannedactions_TableConfig() {
        this.hlpplannedactions_settings = {
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
                custom: this.hlpplannedaction_menuactions
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
                actionid: {
                    title: 'Action',
                    type: 'number',
                    filter: true,
                },
                plannedaction: {
                    title: 'Planned Action',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                assignto: {
                    title: 'Assign To',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    hlpplannedactions_LoadTable(hlpplannedactions = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.hlpplannedactions_ID) >= 0) {
            if (this.tbl_hlpplannedactions != undefined) this.tbl_hlpplannedactions.source = new LocalDataSource();
            if (this.tbl_hlpplannedactions != undefined) this.tbl_hlpplannedactions.source.load(hlpplannedactions as any as LocalDataSource);
            if (this.tbl_hlpplannedactions != undefined) this.tbl_hlpplannedactions.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    hlpplannedactions_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.hlpticket_service.hlpplannedactions.length == 0)
    {
        this.tbl_hlpplannedactions.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new hlpplannedaction();
        this.hlpticket_service.hlpplannedactions.push(obj);
        this.tbl_hlpplannedactions.source.refresh();
        if ((this.hlpticket_service.hlpplannedactions.length / this.tbl_hlpplannedactions.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_hlpplannedactions.source.getPaging().page)
        {
            this.tbl_hlpplannedactions.source.setPage((this.hlpticket_service.hlpplannedactions.length / this.tbl_hlpplannedactions.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_hlpplannedactions.source.grid.edit(this.tbl_hlpplannedactions.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_hlpplannedactions.source.data.indexOf(event.data);
    this.onDelete_hlpplannedaction(event,event.data.planid,((this.tbl_hlpplannedactions.source.getPaging().page-1) *this.tbl_hlpplannedactions.source.getPaging().perPage)+index);
    this.tbl_hlpplannedactions.source.refresh();
    break;
    }
    }
    
    */
    hlpplannedactions_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_hlpplannedaction(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_hlpplannedaction(event, event.data.planid, this.formid);
                break;
            case 'delete':
                this.onDelete_hlpplannedaction(event, event.data.planid, ((this.tbl_hlpplannedactions.source.getPaging().page - 1) * this.tbl_hlpplannedactions.source.getPaging().perPage) + event.index);
                this.tbl_hlpplannedactions.source.refresh();
                break;
        }
    }
    hlpplannedactions_onDelete(obj) {
        let planid = obj.data.planid;
        if (confirm('Are you sure to delete this record ?')) {
            this.hlpticket_service.delete_hlpticket(planid).then(res =>
                this.hlpplannedactions_LoadTable()
            );
        }
    }
    async onCustom_hlpplannedactions_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "hlpplannedactions");
        let formname = (objbomenuaction as any).actionname;




    }
    hlpplannedactions_Paging(val) {
        debugger;
        this.tbl_hlpplannedactions.source.setPaging(1, val, true);
    }

    handle_hlpplannedactions_GridSelected(event: any) {
        this.hlpplannedactions_selectedindex = this.tbl_hlpplannedactions.source.findIndex(i => i.planid === event.data.planid);
    }
    Is_hlpplannedactions_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.hlpplannedactions_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes hlpplannedactions

}



