import { mstapplicantmasterService } from './../../../service/mstapplicantmaster.service';
import { mstapplicantmaster } from './../../../model/mstapplicantmaster.model';
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
import { mstapplicantgeographypreference } from './../../../model/mstapplicantgeographypreference.model';
import { mstapplicantgeographypreferenceComponent } from './../../../pages/forms/mstapplicantgeographypreference/mstapplicantgeographypreference.component';
import { mstapplicantgeographypreferenceService } from './../../../service/mstapplicantgeographypreference.service';

import { mstapplicantskilldetailgridComponent } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetailgrid.component';

import { mstapplicantcareerdetail } from './../../../model/mstapplicantcareerdetail.model';
import { mstapplicantcareerdetailComponent } from './../../../pages/forms/mstapplicantcareerdetail/mstapplicantcareerdetail.component';
import { mstapplicantcareerdetailService } from './../../../service/mstapplicantcareerdetail.service';
import { mstapplicantreferencedetail } from './../../../model/mstapplicantreferencedetail.model';
import { mstapplicantreferencedetailComponent } from './../../../pages/forms/mstapplicantreferencedetail/mstapplicantreferencedetail.component';
import { mstapplicantreferencedetailService } from './../../../service/mstapplicantreferencedetail.service';
import { mstapplicantskilldetail } from './../../../model/mstapplicantskilldetail.model';
import { mstapplicantskilldetailComponent } from './../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.component';
import { mstapplicantskilldetailService } from './../../../service/mstapplicantskilldetail.service';
import { mstapplicantworkreference } from './../../../model/mstapplicantworkreference.model';
import { mstapplicantworkreferenceComponent } from './../../../pages/forms/mstapplicantworkreference/mstapplicantworkreference.component';
import { mstapplicantworkreferenceService } from './../../../service/mstapplicantworkreference.service';
import { mstapplicantsocialmediadetail } from './../../../model/mstapplicantsocialmediadetail.model';
import { mstapplicantsocialmediadetailComponent } from './../../../pages/forms/mstapplicantsocialmediadetail/mstapplicantsocialmediadetail.component';
import { mstapplicantsocialmediadetailService } from './../../../service/mstapplicantsocialmediadetail.service';
import { mstapplicantachievementdetail } from './../../../model/mstapplicantachievementdetail.model';
import { mstapplicantachievementdetailComponent } from './../../../pages/forms/mstapplicantachievementdetail/mstapplicantachievementdetail.component';
import { mstapplicantachievementdetailService } from './../../../service/mstapplicantachievementdetail.service';
import { mstapplicantlanguagedetail } from './../../../model/mstapplicantlanguagedetail.model';
import { mstapplicantlanguagedetailComponent } from './../../../pages/forms/mstapplicantlanguagedetail/mstapplicantlanguagedetail.component';
import { mstapplicantlanguagedetailService } from './../../../service/mstapplicantlanguagedetail.service';
import { mstapplicanteducationdetail } from './../../../model/mstapplicanteducationdetail.model';
import { mstapplicanteducationdetailComponent } from './../../../pages/forms/mstapplicanteducationdetail/mstapplicanteducationdetail.component';
import { mstapplicanteducationdetailService } from './../../../service/mstapplicanteducationdetail.service';
import { mstjobstatus } from './../../../model/mstjobstatus.model';
import { mstjobstatusComponent } from './../../../pages/forms/mstjobstatus/mstjobstatus.component';
import { mstjobstatusService } from './../../../service/mstjobstatus.service';
import { mstapplicantreferencerequest } from './../../../model/mstapplicantreferencerequest.model';
import { mstapplicantreferencerequestComponent } from './../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component';
import { mstapplicantreferencerequestService } from './../../../service/mstapplicantreferencerequest.service';
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

import { BOReportViewerComponent } from './../../../pages/forms/boreportviewer/boreportviewer.component';

@Component({
    selector: 'app-mstapplicantmaster',
    templateUrl: './mstapplicantmaster.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class mstapplicantmasterComponent implements OnInit {
    Ismstjobstatuses_div_Visible: boolean;
    Ismstapplicantreferencerequests_div_Visible: boolean;
    IsApplicant: boolean;
    IsAdmin: boolean;
    bSingleRecord: boolean;
    formData: mstapplicantmaster;
    list: mstapplicantmaster[];
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
    CustomFormName: string = "";
    CustomFormField: string = "";
    CustomFormFieldValue: string = "";
    p_menuid: any;
    p_currenturl: any;
    isSubmitted: boolean = false;
    ShowTableslist: string[] = [];
    data: any;
    maindata: any;

    bfilterPopulate_mstapplicantmasters: boolean = false;
    bfilterPopulate_mstapplicantgeographypreferences: boolean = false;
    bfilterPopulate_mstapplicantcareerdetails: boolean = false;
    bfilterPopulate_mstapplicantreferencedetails: boolean = false;
    bfilterPopulate_mstapplicantskilldetails: boolean = false;
    bfilterPopulate_mstapplicantworkreferences: boolean = false;
    bfilterPopulate_mstapplicantsocialmediadetails: boolean = false;
    bfilterPopulate_mstapplicantachievementdetails: boolean = false;
    bfilterPopulate_mstapplicantlanguagedetails: boolean = false;
    bfilterPopulate_mstapplicanteducationdetails: boolean = false;
    bfilterPopulate_mstjobstatuses: boolean = false;
    bfilterPopulate_mstapplicantreferencerequests: boolean = false;
    mstapplicantmaster_menuactions: any = []
    mstapplicantgeographypreference_menuactions: any = []
    @ViewChild('tbl_mstapplicantgeographypreferences', { static: false }) tbl_mstapplicantgeographypreferences: any;
    mstapplicantcareerdetail_menuactions: any = []
    @ViewChild('tbl_mstapplicantcareerdetails', { static: false }) tbl_mstapplicantcareerdetails: Ng2SmartTableComponent;
    mstapplicantreferencedetail_menuactions: any = []
    @ViewChild('tbl_mstapplicantreferencedetails', { static: false }) tbl_mstapplicantreferencedetails: Ng2SmartTableComponent;
    mstapplicantskilldetail_menuactions: any = []
    @ViewChild('tbl_mstapplicantskilldetails', { static: false }) tbl_mstapplicantskilldetails: Ng2SmartTableComponent;
    mstapplicantworkreference_menuactions: any = []
    @ViewChild('tbl_mstapplicantworkreferences', { static: false }) tbl_mstapplicantworkreferences: Ng2SmartTableComponent;
    mstapplicantsocialmediadetail_menuactions: any = []
    @ViewChild('tbl_mstapplicantsocialmediadetails', { static: false }) tbl_mstapplicantsocialmediadetails: Ng2SmartTableComponent;
    mstapplicantachievementdetail_menuactions: any = []
    @ViewChild('tbl_mstapplicantachievementdetails', { static: false }) tbl_mstapplicantachievementdetails: Ng2SmartTableComponent;
    mstapplicantlanguagedetail_menuactions: any = []
    @ViewChild('tbl_mstapplicantlanguagedetails', { static: false }) tbl_mstapplicantlanguagedetails: Ng2SmartTableComponent;
    mstapplicanteducationdetail_menuactions: any = []
    @ViewChild('tbl_mstapplicanteducationdetails', { static: false }) tbl_mstapplicanteducationdetails: Ng2SmartTableComponent;
    mstjobstatus_menuactions: any = []
    @ViewChild('tbl_mstjobstatuses', { static: false }) tbl_mstjobstatuses: Ng2SmartTableComponent;
    mstapplicantreferencerequest_menuactions: any = []
    @ViewChild('tbl_mstapplicantreferencerequests', { static: false }) tbl_mstapplicantreferencerequests: Ng2SmartTableComponent;

    mstapplicantmaster_Form: FormGroup;

    applicanttype_List: DropDownValues[];
    gender_List: DropDownValues[];
    country_List: DropDownValues[];
    country_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    state_List: DropDownValues[];
    state_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    city_List: DropDownValues[];
    city_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentFieldJson: any[] = [];
    attachmentVisible: boolean = true;
    @ViewChild('profilephoto', { static: false }) profilephoto: AttachmentComponent;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;

    profilecompletionvisible: boolean = false;


    mstapplicantgeographypreferences_visiblelist: any;
    mstapplicantgeographypreferences_hidelist: any;
    mstapplicantcareerdetails_visiblelist: any;
    mstapplicantcareerdetails_hidelist: any;
    mstapplicantreferencedetails_visiblelist: any;
    mstapplicantreferencedetails_hidelist: any;
    mstapplicantskilldetails_visiblelist: any;
    mstapplicantskilldetails_hidelist: any;
    mstapplicantworkreferences_visiblelist: any;
    mstapplicantworkreferences_hidelist: any;
    mstapplicantsocialmediadetails_visiblelist: any;
    mstapplicantsocialmediadetails_hidelist: any;
    mstapplicantachievementdetails_visiblelist: any;
    mstapplicantachievementdetails_hidelist: any;
    mstapplicantlanguagedetails_visiblelist: any;
    mstapplicantlanguagedetails_hidelist: any;
    mstapplicanteducationdetails_visiblelist: any;
    mstapplicanteducationdetails_hidelist: any;
    mstjobstatuses_visiblelist: any;
    mstjobstatuses_hidelist: any;
    mstapplicantreferencerequests_visiblelist: any;
    mstapplicantreferencerequests_hidelist: any;

    Deleted_mstapplicantgeographypreference_IDs: string = "";
    mstapplicantgeographypreferences_ID: string = "1";
    mstapplicantgeographypreferences_selectedindex: any;
    Deleted_mstapplicantcareerdetail_IDs: string = "";
    mstapplicantcareerdetails_ID: string = "2";
    mstapplicantcareerdetails_selectedindex: any;
    Deleted_mstapplicantreferencedetail_IDs: string = "";
    mstapplicantreferencedetails_ID: string = "3";
    mstapplicantreferencedetails_selectedindex: any;
    Deleted_mstapplicantskilldetail_IDs: string = "";
    mstapplicantskilldetails_ID: string = "4";
    mstapplicantskilldetails_selectedindex: any;
    Deleted_mstapplicantworkreference_IDs: string = "";
    mstapplicantworkreferences_ID: string = "5";
    mstapplicantworkreferences_selectedindex: any;
    Deleted_mstapplicantsocialmediadetail_IDs: string = "";
    mstapplicantsocialmediadetails_ID: string = "6";
    mstapplicantsocialmediadetails_selectedindex: any;
    Deleted_mstapplicantachievementdetail_IDs: string = "";
    mstapplicantachievementdetails_ID: string = "7";
    mstapplicantachievementdetails_selectedindex: any;
    Deleted_mstapplicantlanguagedetail_IDs: string = "";
    mstapplicantlanguagedetails_ID: string = "8";
    mstapplicantlanguagedetails_selectedindex: any;
    Deleted_mstapplicanteducationdetail_IDs: string = "";
    mstapplicanteducationdetails_ID: string = "9";
    mstapplicanteducationdetails_selectedindex: any;
    Deleted_mstjobstatus_IDs: string = "";
    mstjobstatuses_ID: string = "10";
    mstjobstatuses_selectedindex: any;
    Deleted_mstapplicantreferencerequest_IDs: string = "";
    mstapplicantreferencerequests_ID: string = "11";
    mstapplicantreferencerequests_selectedindex: any;
    showhidereadmoreBtn: boolean;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private mstapplicantmaster_service: mstapplicantmasterService,
        private mstapplicantgeographypreference_service: mstapplicantgeographypreferenceService,
        private mstapplicantcareerdetail_service: mstapplicantcareerdetailService,
        private mstapplicantreferencedetail_service: mstapplicantreferencedetailService,
        private mstapplicantskilldetail_service: mstapplicantskilldetailService,
        private mstapplicantworkreference_service: mstapplicantworkreferenceService,
        private mstapplicantsocialmediadetail_service: mstapplicantsocialmediadetailService,
        private mstapplicantachievementdetail_service: mstapplicantachievementdetailService,
        private mstapplicantlanguagedetail_service: mstapplicantlanguagedetailService,
        private mstapplicanteducationdetail_service: mstapplicanteducationdetailService,
        private mstjobstatus_service: mstjobstatusService,
        private mstapplicantreferencerequest_service: mstapplicantreferencerequestService,
        private fb: FormBuilder,
        private sharedService: SharedService,
        private sessionService: SessionService,
        private toastr: ToastService,
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
        this.mstapplicantmaster_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            applicantid: [null],
            firstname: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
            lastname: [null, Validators.compose([Validators.required, Validators.pattern(/^[a-zA-Z ]*$/)])],
            emailid: [null, Validators.compose([Validators.required])],
            mobilenumber: [null, Validators.compose([Validators.required])],
            applicanttype: [null, Validators.compose([Validators.required])],
            applicanttypedesc: [null],
            gender: [null],
            genderdesc: [null],
            dob: [null],
            address1: [null],
            address2: [null],
            address3: [null],
            country: [null],
            countrydesc: [null],
            state: [null],
            statedesc: [null],
            city: [null],
            citydesc: [null],
            zipcode: [null, Validators.compose([Validators.pattern(/^[1-9][0-9]{5}$/)])],
            recoveryemailid: [null],
            profilephoto: [null],
            briefintroduction: [null],
            statuscrimp: [null],
            availableforjob: [null],
            profilecompletion: [null],
            applicantreference: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
        this.bSingleRecord = (this.sessionService.getItem("role") == 2 ? true : false);
        this.Ismstjobstatuses_div_Visible = (this.sessionService.getItem("role") == 1 ? true : false);
        this.Ismstapplicantreferencerequests_div_Visible = (this.sessionService.getItem("role") == 1 ? true : false);

        if (this.sessionService.getItem("role") == 2) this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1) this.IsAdmin = true;
    }

    get f() { return this.mstapplicantmaster_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        //debugger;;
        if (this.mstapplicantmaster_Form.dirty && this.mstapplicantmaster_Form.touched) {
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
        //debugger;;
        let pos = this.pkList.map(function (e: any) { return e.applicantid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        //debugger;;
        let pos = this.pkList.map(function (e: any) { return e.applicantid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.applicantid && pkDetail) {
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

        //debugger;;
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
        let mstapplicantmasterid = null;

        //if view button(eye) is clicked
        if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
            this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
            this.showview = true;
            //this.viewHtml=this.sessionService.getViewHtml();
        }
        else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
        debugger;
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
        this.formid = mstapplicantmasterid;
        //alert(mstapplicantmasterid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_mstapplicantgeographypreferences_TableConfig();
            setTimeout(() => {
                //this.Set_mstapplicantgeographypreferences_TableDropDownConfig();
            });

            this.Set_mstapplicantcareerdetails_TableConfig();
            setTimeout(() => {
                //this.Set_mstapplicantcareerdetails_TableDropDownConfig();
            });

            this.Set_mstapplicantreferencedetails_TableConfig();
            setTimeout(() => {
                //this.Set_mstapplicantreferencedetails_TableDropDownConfig();
            });

            this.Set_mstapplicantskilldetails_TableConfig();
            setTimeout(() => {
                //this.Set_mstapplicantskilldetails_TableDropDownConfig();
            });

            this.Set_mstapplicantworkreferences_TableConfig();
            setTimeout(() => {
                //this.Set_mstapplicantworkreferences_TableDropDownConfig();
            });

            this.Set_mstapplicantsocialmediadetails_TableConfig();
            setTimeout(() => {
                //this.Set_mstapplicantsocialmediadetails_TableDropDownConfig();
            });

            this.Set_mstapplicantachievementdetails_TableConfig();
            setTimeout(() => {
                //this.Set_mstapplicantachievementdetails_TableDropDownConfig();
            });

            this.Set_mstapplicantlanguagedetails_TableConfig();
            setTimeout(() => {
                //this.Set_mstapplicantlanguagedetails_TableDropDownConfig();
            });

            this.Set_mstapplicanteducationdetails_TableConfig();
            setTimeout(() => {
                //this.Set_mstapplicanteducationdetails_TableDropDownConfig();
            });

            this.Set_mstjobstatuses_TableConfig();
            setTimeout(() => {
                //this.Set_mstjobstatuses_TableDropDownConfig();
            });

            this.Set_mstapplicantreferencerequests_TableConfig();
            setTimeout(() => {
                //this.Set_mstapplicantreferencerequests_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys
        }
        this.mstapplicantmaster_service.getDefaultData().then(res => {
            this.applicanttype_List = res.list_applicanttype.value;
            this.gender_List = res.list_gender.value;
            this.country_List = res.list_country.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.mstapplicantmaster_service.get_mstapplicantmasters_List().then(res => {
            this.pkList = res as mstapplicantmaster[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched
        this.mstapplicantmaster_Form.markAsUntouched();
        this.mstapplicantmaster_Form.markAsPristine();
    }
    onSelected_country(countryDetail: any) {
        if (countryDetail.value && countryDetail) {
            this.mstapplicantmaster_Form.patchValue({
                country: countryDetail.value,
                countrydesc: countryDetail.label,

            });
            this.mstapplicantmaster_service.getList_state(countryDetail.value).then(res => {
                this.state_List = res as DropDownValues[]
            }).catch((err) => { this.spinner.hide(); console.log(err); });

        }
    }

    onSelected_state(stateDetail: any) {
        if (stateDetail.value && stateDetail) {
            this.mstapplicantmaster_Form.patchValue({
                state: stateDetail.value,
                statedesc: stateDetail.label,

            });
            this.mstapplicantmaster_service.getList_city(stateDetail.value).then(res => {
                this.city_List = res as DropDownValues[]
            }).catch((err) => { this.spinner.hide(); console.log(err); });

        }
    }

    onSelected_city(cityDetail: any) {
        if (cityDetail.value && cityDetail) {
            this.mstapplicantmaster_Form.patchValue({
                city: cityDetail.value,
                citydesc: cityDetail.label,

            });

        }
    }




    getprofilephoto() {
        //debugger;;
        if (this.profilephoto.getAttachmentList().length > 0) {
            let file = this.profilephoto.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }
    mstapplicantgeographypreferenceshtml() {
        let ret = "";
        ret += `<div class='card1'>
<h3 class='profile__section__item__sub'>##countrydesc## - ##citydesc##</h3>
<p>##remarks##</p>
</div>
`;
        return ret;
    }
    mstapplicantcareerdetailshtml() {
        let ret = "";
        ret += `<div class='card1'>
<h2>##companyname## - ##designation##</h2>
<h3 class='profile__section__item__sub'>##fromdate## - ##todate##</h3>
<p>##remarks##</p>
</div>
`;
        return ret;
    }
    mstapplicantreferencedetailshtml() {
        let ret = "";
        ret += `<div class='card1'>
<h2>##referencetypedesc## - ##referencenamedesc##</h2>
<h3 class='profile__section__item__sub'>##companyname## - ##designationdesc## ##isrelative##</h3>
<h3 class='profile__section__item__sub'>##mobilenumber## - ##email## ##knownduration##</h3>
<p>##remarks##</p>
</div>
`;
        return ret;
    }
    mstapplicantskilldetailshtml() {
        let ret = "";
        ret += `<div class='card1'>
<h2>##skillcategorydesc## ##subcategoryiddesc##</h2>
<h3 class='profile__section__item__sub'>##selfrating##</h3>
<p>##remarks##</p>
</div>
`;
        return ret;
    }
    mstapplicantworkreferenceshtml() {
        let ret = "";
        ret += `<div class='card1'>
<h2>##worktopic## - ##referenceurl##</h2>
<h3 class='profile__section__item__sub'>##workdescription##</h3>
<p>##remarks##</p>
</div>
`;
        return ret;
    }
    mstapplicantsocialmediadetailshtml() {
        let ret = "";
        ret += `<div class='card1'>
<h2>##socialmedianamedesc## - ##handlename##</h2>
<h3 class='profile__section__item__sub'><a href='##url##' target='_blank'>##url##</a></h3>
<p>##remarks##</p>
</div>
`;
        return ret;
    }
    mstapplicantachievementdetailshtml() {
        let ret = "";
        ret += `<div class='card1'>
<h2>##masterdatatypeiddesc## - ##masterdataiddesc## - ##attachment##</h2>
<h3 class='profile__section__item__sub'>##achievementdetails##</h3>
</div>
`;
        return ret;
    }
    mstapplicantlanguagedetailshtml() {
        let ret = "";
        ret += `<div class='card1'>
<h2>##languagedesc## - ##overallrating##</h2>
<h3 class='profile__section__item__sub'>Read ##readproficiency## Write ##writeproficiency## Speak: ##speakproficiency##</h3>
<h3 class='profile__section__item__sub'>##mobilenumber## - ##email## ##knownduration##</h3>
<p>##remarks##</p>
<p>##attachment##</p>
</div>
`;
        return ret;
    }
    mstapplicanteducationdetailshtml() {
        let ret = "";
        ret += `<div class='card1'>
<div class='row'>
<div class='col-2  bold'>##fromyear##</div>
<div class='col center' style='display:block'>
<h2 class='navy'>##institutionname##</h2>
<br>
<h2>##coursename##</h2>
<br>
<h3 class='profile__section__item__sub'>##percentage##%</h3>
<br>
##remarks##
</div>
<div class='col-2 bold'>##toyear##</div>
</div>
</div>
`;
        return ret;
    }
    mstjobstatuseshtml() {
        let ret = "";
        ret += `<div class='card1'>
<h2>##corporateiddesc##</h2>
<p>##comments##</p>
</div>
`;
        return ret;
    }
    mstapplicantreferencerequestshtml() {
        let ret = "";
        ret += `<div class='card1'>
<div class='##currentstatus## badge badgebutton right'>&nbsp;&nbsp;</div>
<h2>##requestmasterdatatypeiddesc## - ##requestmasteriddesc##</h2>
<h3 class='profile__section__item__sub'>##requestreferencedate## - ##requestedcontactdesc## - ##contactuseriddesc## - ##contactdesignationdesc##</h3>
<h3 class='profile__section__item__sub'>##contactmobile## - ##contactemailid##  </h3>
<p>##requestremarks##</p>
<h3 class='profile__section__item__sub'>##referencedate## - ##referenceacceptance## ##contactfileattach##</h3>
<p>##referenceremarks##</p>
<p>##attachment##</p>
</div>
`;
        return ret;
    }
    resetForm() {
        if (this.mstapplicantmaster_Form != null)
            this.mstapplicantmaster_Form.reset();
        this.mstapplicantmaster_Form.patchValue({
        });


        setTimeout(() => {
            this.mstapplicantgeographypreferences_LoadTable();
            this.mstapplicantcareerdetails_LoadTable();
            this.mstapplicantreferencedetails_LoadTable();
            this.mstapplicantskilldetails_LoadTable();
            this.mstapplicantworkreferences_LoadTable();
            this.mstapplicantsocialmediadetails_LoadTable();
            this.mstapplicantachievementdetails_LoadTable();
            this.mstapplicantlanguagedetails_LoadTable();
            this.mstapplicanteducationdetails_LoadTable();
            this.mstjobstatuses_LoadTable();
            this.mstapplicantreferencerequests_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        this.profilecompletionvisible = false;
    }

    onDelete() {
        let applicantid = this.mstapplicantmaster_Form.get('applicantid').value;
        if (applicantid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstapplicantmaster_service.delete_mstapplicantmaster(applicantid).then(res => {
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
        this.mstapplicantmaster_Form.patchValue({
            applicantid: null
        });
        if (this.formData.applicantid != null) this.formData.applicantid = null;
        for (let i = 0; i < this.tbl_mstapplicantgeographypreferences.source.length; i++) {
            this.tbl_mstapplicantgeographypreferences.source[i].geographypreferenceid = null;
        }
        for (let i = 0; i < this.tbl_mstapplicantcareerdetails.source.length; i++) {
            this.tbl_mstapplicantcareerdetails.source[i].careerid = null;
        }
        for (let i = 0; i < this.tbl_mstapplicantreferencedetails.source.length; i++) {
            this.tbl_mstapplicantreferencedetails.source[i].referenceid = null;
        }
        for (let i = 0; i < this.tbl_mstapplicantskilldetails.source.length; i++) {
            this.tbl_mstapplicantskilldetails.source[i].skillid = null;
        }
        for (let i = 0; i < this.tbl_mstapplicantworkreferences.source.length; i++) {
            this.tbl_mstapplicantworkreferences.source[i].workreferenceid = null;
        }
        for (let i = 0; i < this.tbl_mstapplicantsocialmediadetails.source.length; i++) {
            this.tbl_mstapplicantsocialmediadetails.source[i].socialrefid = null;
        }
        for (let i = 0; i < this.tbl_mstapplicantachievementdetails.source.length; i++) {
            this.tbl_mstapplicantachievementdetails.source[i].achievementid = null;
        }
        for (let i = 0; i < this.tbl_mstapplicantlanguagedetails.source.length; i++) {
            this.tbl_mstapplicantlanguagedetails.source[i].languageid = null;
        }
        for (let i = 0; i < this.tbl_mstapplicanteducationdetails.source.length; i++) {
            this.tbl_mstapplicanteducationdetails.source[i].educationid = null;
        }
        for (let i = 0; i < this.tbl_mstjobstatuses.source.length; i++) {
            this.tbl_mstjobstatuses.source[i].viewid = null;
        }
        for (let i = 0; i < this.tbl_mstapplicantreferencerequests.source.length; i++) {
            this.tbl_mstapplicantreferencerequests.source[i].requestid = null;
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
                    else if (key == "dob")
                        this.mstapplicantmaster_Form.patchValue({ "dob": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.mstapplicantmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstapplicantmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstapplicantmaster_Form.controls[key] != undefined) {
                                this.mstapplicantmaster_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    onClose() {
        this.dialogRef.close(this.objvalues);
    }
    goBack(){
        
        this.router.navigate(['/home/boreportviewer/MAM']);
        
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
    applicanttype_onChange(evt: any) {
        let e = this.f.applicanttype.value as any;
        this.mstapplicantmaster_Form.patchValue({ applicanttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    gender_onChange(evt: any) {
        let e = this.f.gender.value as any;
        this.mstapplicantmaster_Form.patchValue({ genderdesc: evt.options[evt.options.selectedIndex].text });
    }
    country_onChange(evt: any) {
        let e = evt.value;
    }
    state_onChange(evt: any) {
        let e = evt.value;
    }
    city_onChange(evt: any) {
        let e = evt.value;
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



    edit_mstapplicantmasters() {
        this.showview = false;
        setTimeout(() => {
            if (this.profilephoto != null && this.profilephoto != undefined) this.profilephoto.setattachmentlist(this.mstapplicantmaster_Form.get('profilephoto').value);
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        debugger;
        this.spinner.show();
        this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.mstapplicantmaster;
            let formproperty = res.mstapplicantmaster.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.mstapplicantmaster.pkcol;
            this.formid = res.mstapplicantmaster.applicantid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        debugger;
        this.formData = res.mstapplicantmaster;
        this.formid = res.mstapplicantmaster.applicantid;
        this.pkcol = res.mstapplicantmaster.pkcol;
        this.bmyrecord = false;
        if ((res.mstapplicantmaster as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.mstapplicantmaster_Form.patchValue({
            applicantid: res.mstapplicantmaster.applicantid,
            firstname: res.mstapplicantmaster.firstname,
            lastname: res.mstapplicantmaster.lastname,
            emailid: res.mstapplicantmaster.emailid,
            mobilenumber: res.mstapplicantmaster.mobilenumber,
            applicanttype: res.mstapplicantmaster.applicanttype,
            applicanttypedesc: res.mstapplicantmaster.applicanttypedesc,
            gender: res.mstapplicantmaster.gender,
            genderdesc: res.mstapplicantmaster.genderdesc,
            dob: this.ngbDateParserFormatter.parse(res.mstapplicantmaster.dob),
            address1: res.mstapplicantmaster.address1,
            address2: res.mstapplicantmaster.address2,
            address3: res.mstapplicantmaster.address3,
            country: res.mstapplicantmaster.country,
            countrydesc: res.mstapplicantmaster.countrydesc,
            state: res.mstapplicantmaster.state,
            statedesc: res.mstapplicantmaster.statedesc,
            city: res.mstapplicantmaster.city,
            citydesc: res.mstapplicantmaster.citydesc,
            zipcode: res.mstapplicantmaster.zipcode,
            recoveryemailid: res.mstapplicantmaster.recoveryemailid,
            profilephoto: JSON.parse(res.mstapplicantmaster.profilephoto),
            briefintroduction: res.mstapplicantmaster.briefintroduction,
            statuscrimp: res.mstapplicantmaster.statuscrimp,
            availableforjob: res.mstapplicantmaster.availableforjob,
            profilecompletion: res.mstapplicantmaster.profilecompletion,
            applicantreference: res.mstapplicantmaster.applicantreference,
            attachment: JSON.parse(res.mstapplicantmaster.attachment),
            status: res.mstapplicantmaster.status,
            statusdesc: res.mstapplicantmaster.statusdesc,
        });
        this.profilecompletionvisible = false;
        //hide list
        if (res.visiblelist != undefined && res.visiblelist.indexOf("profilecompletion") >= 0) this.profilecompletionvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("profilecompletion") >= 0) this.profilecompletionvisible = false;
        this.mstapplicantmaster_menuactions = res.mstapplicantmaster_menuactions;
        this.mstapplicantgeographypreference_menuactions = res.mstapplicantgeographypreference_menuactions;
        this.mstapplicantgeographypreferences_visiblelist = res.mstapplicantgeographypreferences_visiblelist;
        this.mstapplicantcareerdetail_menuactions = res.mstapplicantcareerdetail_menuactions;
        this.mstapplicantcareerdetails_visiblelist = res.mstapplicantcareerdetails_visiblelist;
        this.mstapplicantreferencedetail_menuactions = res.mstapplicantreferencedetail_menuactions;
        this.mstapplicantreferencedetails_visiblelist = res.mstapplicantreferencedetails_visiblelist;
        this.mstapplicantskilldetail_menuactions = res.mstapplicantskilldetail_menuactions;
        this.mstapplicantskilldetails_visiblelist = res.mstapplicantskilldetails_visiblelist;
        this.mstapplicantworkreference_menuactions = res.mstapplicantworkreference_menuactions;
        this.mstapplicantworkreferences_visiblelist = res.mstapplicantworkreferences_visiblelist;
        this.mstapplicantsocialmediadetail_menuactions = res.mstapplicantsocialmediadetail_menuactions;
        this.mstapplicantsocialmediadetails_visiblelist = res.mstapplicantsocialmediadetails_visiblelist;
        this.mstapplicantachievementdetail_menuactions = res.mstapplicantachievementdetail_menuactions;
        this.mstapplicantachievementdetails_visiblelist = res.mstapplicantachievementdetails_visiblelist;
        this.mstapplicantlanguagedetail_menuactions = res.mstapplicantlanguagedetail_menuactions;
        this.mstapplicantlanguagedetails_visiblelist = res.mstapplicantlanguagedetails_visiblelist;
        this.mstapplicanteducationdetail_menuactions = res.mstapplicanteducationdetail_menuactions;
        this.mstapplicanteducationdetails_visiblelist = res.mstapplicanteducationdetails_visiblelist;
        this.mstjobstatus_menuactions = res.mstjobstatus_menuactions;
        this.mstjobstatuses_visiblelist = res.mstjobstatuses_visiblelist;
        this.mstapplicantreferencerequest_menuactions = res.mstapplicantreferencerequest_menuactions;
        this.mstapplicantreferencerequests_visiblelist = res.mstapplicantreferencerequests_visiblelist;
        if (this.mstapplicantmaster_Form.get('profilephoto').value != null && this.mstapplicantmaster_Form.get('profilephoto').value != "" && this.profilephoto != null && this.profilephoto != undefined) this.profilephoto.setattachmentlist(this.mstapplicantmaster_Form.get('profilephoto').value);
        if (this.mstapplicantmaster_Form.get('attachment').value != null && this.mstapplicantmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.mstapplicantmaster_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.country.value && this.f.country.value != "" && this.f.country.value != null) this.mstapplicantmaster_service.getList_state(this.f.country.value).then(res => {
                this.state_List = res as DropDownValues[];
            }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.state.value && this.f.state.value != "" && this.f.state.value != null) this.mstapplicantmaster_service.getList_city(this.f.state.value).then(res => {
                this.city_List = res as DropDownValues[];
            }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        setTimeout(() => {
            this.Set_mstapplicantgeographypreferences_TableConfig();
            this.mstapplicantgeographypreferences_LoadTable(res.mstapplicantgeographypreferences);
            this.Set_mstapplicantcareerdetails_TableConfig();
            this.mstapplicantcareerdetails_LoadTable(res.mstapplicantcareerdetails);
            this.Set_mstapplicantreferencedetails_TableConfig();
            this.mstapplicantreferencedetails_LoadTable(res.mstapplicantreferencedetails);
            this.Set_mstapplicantskilldetails_TableConfig();
            this.mstapplicantskilldetails_LoadTable(res.mstapplicantskilldetails);
            this.Set_mstapplicantworkreferences_TableConfig();
            this.mstapplicantworkreferences_LoadTable(res.mstapplicantworkreferences);
            this.Set_mstapplicantsocialmediadetails_TableConfig();
            this.mstapplicantsocialmediadetails_LoadTable(res.mstapplicantsocialmediadetails);
            this.Set_mstapplicantachievementdetails_TableConfig();
            this.mstapplicantachievementdetails_LoadTable(res.mstapplicantachievementdetails);
            this.Set_mstapplicantlanguagedetails_TableConfig();
            this.mstapplicantlanguagedetails_LoadTable(res.mstapplicantlanguagedetails);
            this.Set_mstapplicanteducationdetails_TableConfig();
            this.mstapplicanteducationdetails_LoadTable(res.mstapplicanteducationdetails);
            this.Set_mstjobstatuses_TableConfig();
            this.mstjobstatuses_LoadTable(res.mstjobstatuses);
            this.Set_mstapplicantreferencerequests_TableConfig();
            this.mstapplicantreferencerequests_LoadTable(res.mstapplicantreferencerequests);
        });
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        if (this.mstapplicantmaster_Form.controls['briefintroduction']?.value != null) ret = ret.replace(new RegExp('##briefintroduction##', 'g'), this.mstapplicantmaster_Form.controls['briefintroduction']?.value?.substring(0, 250));
        if (this.mstapplicantmaster_Form.controls['statuscrimp']?.value != null) ret = ret.replace(new RegExp('##statuscrimp##', 'g'), this.mstapplicantmaster_Form.controls['statuscrimp']?.value?.substring(0, 250));
        for (let key in this.mstapplicantmaster_Form.controls) {
            let val = this.mstapplicantmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.mstapplicantmaster_Form.controls[key] != null) {
                if (key == "profilephoto") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0) ret = ret.replace(new RegExp('##' + key + '##', 'g'), AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
                }
                else if (false) {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined) ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='Stars' style='--rating:" + this.formData[key] + "></div>");
                }
                else if (key == "profilecompletion") {
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
        if (!this.mstapplicantmaster_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.mstapplicantmaster_Form.getRawValue();
        obj.dob = new Date(this.mstapplicantmaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.mstapplicantmaster_Form.get('dob').value) + '  UTC' : null);
        if (this.profilephoto.getAttachmentList() != null) obj.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
        if (this.fileattachment.getAttachmentList() != null) obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        obj.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(obj);
        await this.sharedService.upload(this.profilephoto.getAllFiles());
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
        //debugger;;
        this.isSubmitted = true;
        let strError = "";
        // Object.keys(this.mstapplicantmaster_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.mstapplicantmaster_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.mstapplicantmaster_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.mstapplicantmaster_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.mstapplicantmaster_Form.controls[key] != null) {
                        this.formData[key] = this.mstapplicantmaster_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.dob = new Date(this.mstapplicantmaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.mstapplicantmaster_Form.get('dob').value) + '  UTC' : null);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.Deleted_mstapplicantgeographypreference_IDs = this.Deleted_mstapplicantgeographypreference_IDs;
        this.formData.Deleted_mstapplicantcareerdetail_IDs = this.Deleted_mstapplicantcareerdetail_IDs;
        this.formData.Deleted_mstapplicantreferencedetail_IDs = this.Deleted_mstapplicantreferencedetail_IDs;
        this.formData.Deleted_mstapplicantskilldetail_IDs = this.Deleted_mstapplicantskilldetail_IDs;
        this.formData.Deleted_mstapplicantworkreference_IDs = this.Deleted_mstapplicantworkreference_IDs;
        this.formData.Deleted_mstapplicantsocialmediadetail_IDs = this.Deleted_mstapplicantsocialmediadetail_IDs;
        this.formData.Deleted_mstapplicantachievementdetail_IDs = this.Deleted_mstapplicantachievementdetail_IDs;
        this.formData.Deleted_mstapplicantlanguagedetail_IDs = this.Deleted_mstapplicantlanguagedetail_IDs;
        this.formData.Deleted_mstapplicanteducationdetail_IDs = this.Deleted_mstapplicanteducationdetail_IDs;
        this.formData.Deleted_mstjobstatus_IDs = this.Deleted_mstjobstatus_IDs;
        this.formData.Deleted_mstapplicantreferencerequest_IDs = this.Deleted_mstapplicantreferencerequest_IDs;
        if (this.profilephoto.getAttachmentList() != null) this.formData.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.mstapplicantmaster_service.saveOrUpdate_mstapplicantmasters(this.formData, this.tbl_mstapplicantgeographypreferences?.source?.data, this.tbl_mstapplicantcareerdetails?.source?.data, this.tbl_mstapplicantreferencedetails?.source?.data, this.tbl_mstapplicantskilldetails?.source?.data, this.tbl_mstapplicantworkreferences?.source?.data, this.tbl_mstapplicantsocialmediadetails?.source?.data, this.tbl_mstapplicantachievementdetails?.source?.data, this.tbl_mstapplicantlanguagedetails?.source?.data, this.tbl_mstapplicanteducationdetails?.source?.data, this.tbl_mstjobstatuses?.source?.data, this.tbl_mstapplicantreferencerequests?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.profilephoto.getAllFiles());
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_mstapplicantgeographypreferences.source) {
                    for (let i = 0; i < this.tbl_mstapplicantgeographypreferences.source.data.length; i++) {
                        if (this.tbl_mstapplicantgeographypreferences.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstapplicantgeographypreferences.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantcareerdetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantcareerdetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantcareerdetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstapplicantcareerdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantreferencedetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantreferencedetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantreferencedetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstapplicantreferencedetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantskilldetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantskilldetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantskilldetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstapplicantskilldetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantworkreferences.source) {
                    for (let i = 0; i < this.tbl_mstapplicantworkreferences.source.data.length; i++) {
                        if (this.tbl_mstapplicantworkreferences.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstapplicantworkreferences.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantsocialmediadetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantsocialmediadetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantsocialmediadetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstapplicantsocialmediadetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantachievementdetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantachievementdetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantachievementdetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstapplicantachievementdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantlanguagedetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantlanguagedetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantlanguagedetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstapplicantlanguagedetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicanteducationdetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicanteducationdetails.source.data.length; i++) {
                        if (this.tbl_mstapplicanteducationdetails.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstapplicanteducationdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstjobstatuses.source) {
                    for (let i = 0; i < this.tbl_mstjobstatuses.source.data.length; i++) {
                        if (this.tbl_mstjobstatuses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstjobstatuses.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantreferencerequests.source) {
                    for (let i = 0; i < this.tbl_mstapplicantreferencerequests.source.data.length; i++) {
                        if (this.tbl_mstapplicantreferencerequests.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_mstapplicantreferencerequests.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                //debugger;;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.router.navigate(['/home/mstapplicantmasters/mstapplicantmasters/view/' + this.pkcol]);
                this.objvalues.push((res as any).mstapplicantmaster);
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
                        this.objvalues.push((res as any).mstapplicantmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstapplicantmaster_Form.markAsUntouched();
                this.mstapplicantmaster_Form.markAsPristine();
            },
            err => {
                //debugger;;
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            }
        )
    }




    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_mstapplicantgeographypreferences.source = new LocalDataSource();
        this.tbl_mstapplicantcareerdetails.source = new LocalDataSource();
        this.tbl_mstapplicantreferencedetails.source = new LocalDataSource();
        this.tbl_mstapplicantskilldetails.source = new LocalDataSource();
        this.tbl_mstapplicantworkreferences.source = new LocalDataSource();
        this.tbl_mstapplicantsocialmediadetails.source = new LocalDataSource();
        this.tbl_mstapplicantachievementdetails.source = new LocalDataSource();
        this.tbl_mstapplicantlanguagedetails.source = new LocalDataSource();
        this.tbl_mstapplicanteducationdetails.source = new LocalDataSource();
        this.tbl_mstjobstatuses.source = new LocalDataSource();
        this.tbl_mstapplicantreferencerequests.source = new LocalDataSource();
    }

    AddOrEdit_mstapplicantgeographypreference(event: any, geographypreferenceid: any, applicantid: any) {
        //debugger;;
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantgeographypreferenceComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, geographypreferenceid, applicantid, visiblelist: this.mstapplicantgeographypreferences_visiblelist, hidelist: this.mstapplicantgeographypreferences_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantgeographypreferences.source.add(res[i]);
                    }
                    this.tbl_mstapplicantgeographypreferences.source.refresh();
                }
                else {
                    this.tbl_mstapplicantgeographypreferences.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantgeographypreference(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstapplicantgeographypreference_IDs += childID + ",";
        this.tbl_mstapplicantgeographypreferences.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_mstapplicantcareerdetail(event: any, careerid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantcareerdetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, careerid, applicantid, visiblelist: this.mstapplicantcareerdetails_visiblelist, hidelist: this.mstapplicantcareerdetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantcareerdetails.source.add(res[i]);
                    }
                    this.tbl_mstapplicantcareerdetails.source.refresh();
                }
                else {
                    this.tbl_mstapplicantcareerdetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantcareerdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstapplicantcareerdetail_IDs += childID + ",";
        this.tbl_mstapplicantcareerdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_mstapplicantreferencedetail(event: any, referenceid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantreferencedetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, referenceid, applicantid, visiblelist: this.mstapplicantreferencedetails_visiblelist, hidelist: this.mstapplicantreferencedetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantreferencedetails.source.add(res[i]);
                    }
                    this.tbl_mstapplicantreferencedetails.source.refresh();
                }
                else {
                    this.tbl_mstapplicantreferencedetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantreferencedetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstapplicantreferencedetail_IDs += childID + ",";
        this.tbl_mstapplicantreferencedetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_mstapplicantskilldetail(event: any, skillid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantskilldetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, skillid, applicantid, visiblelist: this.mstapplicantskilldetails_visiblelist, hidelist: this.mstapplicantskilldetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantskilldetails.source.add(res[i]);
                    }
                    this.tbl_mstapplicantskilldetails.source.refresh();
                }
                else {
                    this.tbl_mstapplicantskilldetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantskilldetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstapplicantskilldetail_IDs += childID + ",";
        this.tbl_mstapplicantskilldetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_mstapplicantworkreference(event: any, workreferenceid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantworkreferenceComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workreferenceid, applicantid, visiblelist: this.mstapplicantworkreferences_visiblelist, hidelist: this.mstapplicantworkreferences_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantworkreferences.source.add(res[i]);
                    }
                    this.tbl_mstapplicantworkreferences.source.refresh();
                }
                else {
                    this.tbl_mstapplicantworkreferences.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantworkreference(event: any, childID: number, i: number) {
        debugger;
        if (childID != null)
            this.Deleted_mstapplicantworkreference_IDs += childID + ",";
        this.tbl_mstapplicantworkreferences.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_mstapplicantsocialmediadetail(event: any, socialrefid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantsocialmediadetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, socialrefid, applicantid, visiblelist: this.mstapplicantsocialmediadetails_visiblelist, hidelist: this.mstapplicantsocialmediadetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantsocialmediadetails.source.add(res[i]);
                    }
                    this.tbl_mstapplicantsocialmediadetails.source.refresh();
                }
                else {
                    this.tbl_mstapplicantsocialmediadetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantsocialmediadetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstapplicantsocialmediadetail_IDs += childID + ",";
        this.tbl_mstapplicantsocialmediadetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_mstapplicantachievementdetail(event: any, achievementid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantachievementdetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, achievementid, applicantid, visiblelist: this.mstapplicantachievementdetails_visiblelist, hidelist: this.mstapplicantachievementdetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantachievementdetails.source.add(res[i]);
                    }
                    this.tbl_mstapplicantachievementdetails.source.refresh();
                }
                else {
                    this.tbl_mstapplicantachievementdetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantachievementdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstapplicantachievementdetail_IDs += childID + ",";
        this.tbl_mstapplicantachievementdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_mstapplicantlanguagedetail(event: any, languageid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantlanguagedetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, languageid, applicantid, visiblelist: this.mstapplicantlanguagedetails_visiblelist, hidelist: this.mstapplicantlanguagedetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantlanguagedetails.source.add(res[i]);
                    }
                    this.tbl_mstapplicantlanguagedetails.source.refresh();
                }
                else {
                    this.tbl_mstapplicantlanguagedetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantlanguagedetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstapplicantlanguagedetail_IDs += childID + ",";
        this.tbl_mstapplicantlanguagedetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_mstapplicanteducationdetail(event: any, educationid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicanteducationdetailComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, educationid, applicantid, visiblelist: this.mstapplicanteducationdetails_visiblelist, hidelist: this.mstapplicanteducationdetails_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicanteducationdetails.source.add(res[i]);
                    }
                    this.tbl_mstapplicanteducationdetails.source.refresh();
                }
                else {
                    this.tbl_mstapplicanteducationdetails.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicanteducationdetail(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstapplicanteducationdetail_IDs += childID + ",";
        this.tbl_mstapplicanteducationdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    showGeographyPreferences()
    {
        this.dialog.open(BOReportViewerComponent,
            {
              data: { ScreenType:2, reportcode: 'agp'}
            }
          )
    }

    showSkills()
    {

        this.dialog.open(mstapplicantskilldetailgridComponent,
            {
              data: { ScreenType:2, applicantid: this.formid,save:true}
            }
          )
    }
    AddOrEdit_mstjobstatus(event: any, viewid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstjobstatusComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, viewid, applicantid, visiblelist: this.mstjobstatuses_visiblelist, hidelist: this.mstjobstatuses_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstjobstatuses.source.add(res[i]);
                    }
                    this.tbl_mstjobstatuses.source.refresh();
                }
                else {
                    this.tbl_mstjobstatuses.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstjobstatus(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstjobstatus_IDs += childID + ",";
        this.tbl_mstjobstatuses.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_mstapplicantreferencerequest(event: any, requestid: any, applicantid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(mstapplicantreferencerequestComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, requestid, applicantid, visiblelist: this.mstapplicantreferencerequests_visiblelist, hidelist: this.mstapplicantreferencerequests_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstapplicantreferencerequests.source.add(res[i]);
                    }
                    this.tbl_mstapplicantreferencerequests.source.refresh();
                }
                else {
                    this.tbl_mstapplicantreferencerequests.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_mstapplicantreferencerequest(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_mstapplicantreferencerequest_IDs += childID + ",";
        this.tbl_mstapplicantreferencerequests.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes mstapplicantgeographypreferences
    mstapplicantgeographypreferences_settings: any;

    show_mstapplicantgeographypreferences_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantgeographypreferences.source.initGrid();
    }
    delete_mstapplicantgeographypreferences_All() {
        this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantgeographypreferences_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantgeographypreferences_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantgeographypreferences.source.settings != null) this.tbl_mstapplicantgeographypreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantgeographypreferences.source.settings['hideSubHeader'];
        this.tbl_mstapplicantgeographypreferences.source.initGrid();
    }
    show_mstapplicantgeographypreferences_InActive() {
    }
    enable_mstapplicantgeographypreferences_InActive() {
    }
    async Set_mstapplicantgeographypreferences_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantgeographypreferences) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantgeographypreferences.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_applicantid.value)), }, };
            this.tbl_mstapplicantgeographypreferences.source.settings = clone;
            this.tbl_mstapplicantgeographypreferences.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantgeographypreferences.source.settings);
            if (clone.columns['country'] != undefined) clone.columns['country'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_country.value)), }, };
            if (clone.columns['country'] != undefined) clone.columns['country'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_country.value)), }, };
            this.tbl_mstapplicantgeographypreferences.source.settings = clone;
            this.tbl_mstapplicantgeographypreferences.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantgeographypreferences = true;
    }
    async mstapplicantgeographypreferences_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantgeographypreferences_TableConfig() {
        this.mstapplicantgeographypreferences_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstapplicantgeographypreference_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstapplicantgeographypreferenceshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantgeographypreferences_LoadTable(mstapplicantgeographypreferences = new LocalDataSource()) {
        //debugger;;
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantgeographypreferences_ID) >= 0) {
            if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source = new LocalDataSource();
            if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source.load(mstapplicantgeographypreferences as any as LocalDataSource);
            if (this.tbl_mstapplicantgeographypreferences != undefined) this.tbl_mstapplicantgeographypreferences.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicantgeographypreferences_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantgeographypreferences.length == 0)
    {
        this.tbl_mstapplicantgeographypreferences.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantgeographypreference();
        this.mstapplicantmaster_service.mstapplicantgeographypreferences.push(obj);
        this.tbl_mstapplicantgeographypreferences.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantgeographypreferences.length / this.tbl_mstapplicantgeographypreferences.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantgeographypreferences.source.getPaging().page)
        {
            this.tbl_mstapplicantgeographypreferences.source.setPage((this.mstapplicantmaster_service.mstapplicantgeographypreferences.length / this.tbl_mstapplicantgeographypreferences.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantgeographypreferences.source.grid.edit(this.tbl_mstapplicantgeographypreferences.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantgeographypreferences.source.data.indexOf(event.data);
    this.onDelete_mstapplicantgeographypreference(event,event.data.geographypreferenceid,((this.tbl_mstapplicantgeographypreferences.source.getPaging().page-1) *this.tbl_mstapplicantgeographypreferences.source.getPaging().perPage)+index);
    this.tbl_mstapplicantgeographypreferences.source.refresh();
    break;
    }
    }

    */
    mstapplicantgeographypreferences_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantgeographypreference(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantgeographypreference(event, event.data.geographypreferenceid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstapplicantgeographypreference(event, event.data.geographypreferenceid, ((this.tbl_mstapplicantgeographypreferences.source.getPaging().page - 1) * this.tbl_mstapplicantgeographypreferences.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantgeographypreferences.source.refresh();
                break;
        }
    }
    mstapplicantgeographypreferences_onDelete(obj) {
        let geographypreferenceid = obj.data.geographypreferenceid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(geographypreferenceid).then(res =>
                this.mstapplicantgeographypreferences_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantgeographypreferences_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantgeographypreferences");
        let formname = (objbomenuaction as any).actionname;




    }
    mstapplicantgeographypreferences_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantgeographypreferences.source.setPaging(1, val, true);
    }

    handle_mstapplicantgeographypreferences_GridSelected(event: any) {
        this.mstapplicantgeographypreferences_selectedindex = this.tbl_mstapplicantgeographypreferences.source.findIndex(i => i.geographypreferenceid === event.data.geographypreferenceid);
    }
    Is_mstapplicantgeographypreferences_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantgeographypreferences_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicantgeographypreferences
    //start of Grid Codes mstapplicantcareerdetails
    mstapplicantcareerdetails_settings: any;

    show_mstapplicantcareerdetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantcareerdetails.source.initGrid();
    }
    delete_mstapplicantcareerdetails_All() {
        this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantcareerdetails_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantcareerdetails_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantcareerdetails.source.settings != null) this.tbl_mstapplicantcareerdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantcareerdetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantcareerdetails.source.initGrid();
    }
    show_mstapplicantcareerdetails_InActive() {
    }
    enable_mstapplicantcareerdetails_InActive() {
    }
    async Set_mstapplicantcareerdetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantcareerdetails) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_applicantid.value)), }, };
            this.tbl_mstapplicantcareerdetails.source.settings = clone;
            this.tbl_mstapplicantcareerdetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
            if (clone.columns['category'] != undefined) clone.columns['category'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_category.value)), }, };
            if (clone.columns['category'] != undefined) clone.columns['category'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_category.value)), }, };
            this.tbl_mstapplicantcareerdetails.source.settings = clone;
            this.tbl_mstapplicantcareerdetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
            if (clone.columns['skills'] != undefined) clone.columns['skills'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_skills.value)), }, };
            if (clone.columns['skills'] != undefined) clone.columns['skills'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_skills.value)), }, };
            this.tbl_mstapplicantcareerdetails.source.settings = clone;
            this.tbl_mstapplicantcareerdetails.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantcareerdetails = true;
    }
    async mstapplicantcareerdetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantcareerdetails_TableConfig() {
        this.mstapplicantcareerdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstapplicantcareerdetail_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstapplicantcareerdetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        divrow["fromdate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["fromdate"]));
                        divrow["todate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["todate"]));
                        if (row["todate"] == "1970-01-01T00:00:00") divrow["todate"] = "Till Date"; return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantcareerdetails_LoadTable(mstapplicantcareerdetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantcareerdetails_ID) >= 0) {
            if (this.tbl_mstapplicantcareerdetails != undefined) this.tbl_mstapplicantcareerdetails.source = new LocalDataSource();
            if (this.tbl_mstapplicantcareerdetails != undefined) this.tbl_mstapplicantcareerdetails.source.load(mstapplicantcareerdetails as any as LocalDataSource);
            if (this.tbl_mstapplicantcareerdetails != undefined) this.tbl_mstapplicantcareerdetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicantcareerdetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantcareerdetails.length == 0)
    {
        this.tbl_mstapplicantcareerdetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantcareerdetail();
        this.mstapplicantmaster_service.mstapplicantcareerdetails.push(obj);
        this.tbl_mstapplicantcareerdetails.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantcareerdetails.length / this.tbl_mstapplicantcareerdetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantcareerdetails.source.getPaging().page)
        {
            this.tbl_mstapplicantcareerdetails.source.setPage((this.mstapplicantmaster_service.mstapplicantcareerdetails.length / this.tbl_mstapplicantcareerdetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantcareerdetails.source.grid.edit(this.tbl_mstapplicantcareerdetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantcareerdetails.source.data.indexOf(event.data);
    this.onDelete_mstapplicantcareerdetail(event,event.data.careerid,((this.tbl_mstapplicantcareerdetails.source.getPaging().page-1) *this.tbl_mstapplicantcareerdetails.source.getPaging().perPage)+index);
    this.tbl_mstapplicantcareerdetails.source.refresh();
    break;
    }
    }

    */
    mstapplicantcareerdetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantcareerdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantcareerdetail(event, event.data.careerid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstapplicantcareerdetail(event, event.data.careerid, ((this.tbl_mstapplicantcareerdetails.source.getPaging().page - 1) * this.tbl_mstapplicantcareerdetails.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantcareerdetails.source.refresh();
                break;
        }
    }
    mstapplicantcareerdetails_onDelete(obj) {
        let careerid = obj.data.careerid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(careerid).then(res =>
                this.mstapplicantcareerdetails_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantcareerdetails_Action(event: any) {
        let referencesourcedetails = 'Company Name:' + event.data.companyname + '<BR>' + 'Designation: ' + event.data.designation + '<BR>' + 'From Date: ' + event.data.fromdate + '<BR>' + 'To Date: ' + event.data.todate + '<BR>' + 'Currently Working: ' + event.data.currentlyworking + '<BR>' + 'Remarks: ' + event.data.remarks;
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantcareerdetails");
        let formname = (objbomenuaction as any).actionname;
        if (formname == "mstapplicantreferencerequests") {
            this.dialog.open(mstapplicantreferencerequestComponent,
                {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 317, requestmasterid: event.data.careerid, ScreenType: 2, save: true }
                }
            ).onClose.subscribe(res => {
            });
        }




    }
    mstapplicantcareerdetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantcareerdetails.source.setPaging(1, val, true);
    }

    handle_mstapplicantcareerdetails_GridSelected(event: any) {
        this.mstapplicantcareerdetails_selectedindex = this.tbl_mstapplicantcareerdetails.source.findIndex(i => i.careerid === event.data.careerid);
    }
    Is_mstapplicantcareerdetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantcareerdetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicantcareerdetails
    //start of Grid Codes mstapplicantreferencedetails
    mstapplicantreferencedetails_settings: any;

    show_mstapplicantreferencedetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantreferencedetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantreferencedetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantreferencedetails.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantreferencedetails.source.initGrid();
    }
    delete_mstapplicantreferencedetails_All() {
        this.tbl_mstapplicantreferencedetails.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantreferencedetails_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantreferencedetails_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantreferencedetails.source.settings != null) this.tbl_mstapplicantreferencedetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantreferencedetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantreferencedetails.source.initGrid();
    }
    show_mstapplicantreferencedetails_InActive() {
    }
    enable_mstapplicantreferencedetails_InActive() {
    }
    async Set_mstapplicantreferencedetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantreferencedetails) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantreferencedetails.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_applicantid.value)), }, };
            this.tbl_mstapplicantreferencedetails.source.settings = clone;
            this.tbl_mstapplicantreferencedetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantreferencedetails.source.settings);
            if (clone.columns['referencetype'] != undefined) clone.columns['referencetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referencetype.value)), }, };
            if (clone.columns['referencetype'] != undefined) clone.columns['referencetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referencetype.value)), }, };
            this.tbl_mstapplicantreferencedetails.source.settings = clone;
            this.tbl_mstapplicantreferencedetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantreferencedetails.source.settings);
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referenceacceptance.value)), }, };
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referenceacceptance.value)), }, };
            this.tbl_mstapplicantreferencedetails.source.settings = clone;
            this.tbl_mstapplicantreferencedetails.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantreferencedetails = true;
    }
    async mstapplicantreferencedetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantreferencedetails_TableConfig() {
        this.mstapplicantreferencedetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstapplicantreferencedetail_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstapplicantreferencedetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantreferencedetails_LoadTable(mstapplicantreferencedetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantreferencedetails_ID) >= 0) {
            if (this.tbl_mstapplicantreferencedetails != undefined) this.tbl_mstapplicantreferencedetails.source = new LocalDataSource();
            if (this.tbl_mstapplicantreferencedetails != undefined) this.tbl_mstapplicantreferencedetails.source.load(mstapplicantreferencedetails as any as LocalDataSource);
            if (this.tbl_mstapplicantreferencedetails != undefined) this.tbl_mstapplicantreferencedetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicantreferencedetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantreferencedetails.length == 0)
    {
        this.tbl_mstapplicantreferencedetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantreferencedetail();
        this.mstapplicantmaster_service.mstapplicantreferencedetails.push(obj);
        this.tbl_mstapplicantreferencedetails.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantreferencedetails.length / this.tbl_mstapplicantreferencedetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantreferencedetails.source.getPaging().page)
        {
            this.tbl_mstapplicantreferencedetails.source.setPage((this.mstapplicantmaster_service.mstapplicantreferencedetails.length / this.tbl_mstapplicantreferencedetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantreferencedetails.source.grid.edit(this.tbl_mstapplicantreferencedetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantreferencedetails.source.data.indexOf(event.data);
    this.onDelete_mstapplicantreferencedetail(event,event.data.referenceid,((this.tbl_mstapplicantreferencedetails.source.getPaging().page-1) *this.tbl_mstapplicantreferencedetails.source.getPaging().perPage)+index);
    this.tbl_mstapplicantreferencedetails.source.refresh();
    break;
    }
    }

    */
    mstapplicantreferencedetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantreferencedetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantreferencedetail(event, event.data.referenceid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstapplicantreferencedetail(event, event.data.referenceid, ((this.tbl_mstapplicantreferencedetails.source.getPaging().page - 1) * this.tbl_mstapplicantreferencedetails.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantreferencedetails.source.refresh();
                break;
        }
    }
    mstapplicantreferencedetails_onDelete(obj) {
        let referenceid = obj.data.referenceid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(referenceid).then(res =>
                this.mstapplicantreferencedetails_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantreferencedetails_Action(event: any) {
        let referencesourcedetails = 'Reference Type: ' + event.data.referencetypedesc + '<BR>' + 'Reference Name: ' + event.data.referencename + '<BR>' + 'Company Name: ' + event.data.companyname + '<BR>' + 'Designation: ' + event.data.designation + '<BR>' + 'Mobile: ' + event.data.mobilenumber + '<BR>' + 'Email: ' + event.data.email + '<BR>' + 'Known Duration: ' + event.data.knownduration + '<BR>' + 'Is Relative; ' + event.data.isrelative + '<BR>' + 'Remarks: ' + event.data.remarks;
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantreferencedetails");
        let formname = (objbomenuaction as any).actionname;
        if (formname == "mstapplicantreferencerequests") {
            this.dialog.open(mstapplicantreferencerequestComponent,
                {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 318, requestmasterid: event.data.referenceid, contactemailid: event.data.email, requestedcontact: event.data.referencename, ScreenType: 2, save: true }
                }
            ).onClose.subscribe(res => {
            });
        }




    }
    mstapplicantreferencedetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantreferencedetails.source.setPaging(1, val, true);
    }

    handle_mstapplicantreferencedetails_GridSelected(event: any) {
        this.mstapplicantreferencedetails_selectedindex = this.tbl_mstapplicantreferencedetails.source.findIndex(i => i.referenceid === event.data.referenceid);
    }
    Is_mstapplicantreferencedetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantreferencedetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicantreferencedetails
    //start of Grid Codes mstapplicantskilldetails
    mstapplicantskilldetails_settings: any;

    show_mstapplicantskilldetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantskilldetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantskilldetails.source.initGrid();
    }
    delete_mstapplicantskilldetails_All() {
        this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantskilldetails_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantskilldetails_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantskilldetails.source.settings != null) this.tbl_mstapplicantskilldetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantskilldetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantskilldetails.source.initGrid();
    }
    show_mstapplicantskilldetails_InActive() {
    }
    enable_mstapplicantskilldetails_InActive() {
    }
    async Set_mstapplicantskilldetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantskilldetails) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_applicantid.value)), }, };
            this.tbl_mstapplicantskilldetails.source.settings = clone;
            this.tbl_mstapplicantskilldetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
            if (clone.columns['skillcategory'] != undefined) clone.columns['skillcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_skillcategory.value)), }, };
            if (clone.columns['skillcategory'] != undefined) clone.columns['skillcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_skillcategory.value)), }, };
            this.tbl_mstapplicantskilldetails.source.settings = clone;
            this.tbl_mstapplicantskilldetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_referenceacceptance.value)), }, };
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_referenceacceptance.value)), }, };
            this.tbl_mstapplicantskilldetails.source.settings = clone;
            this.tbl_mstapplicantskilldetails.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantskilldetails = true;
    }
    async mstapplicantskilldetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantskilldetails_TableConfig() {
        this.mstapplicantskilldetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstapplicantskilldetail_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstapplicantskilldetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        divrow["selfrating"] = "<div class='Stars' style='--rating:" + row['selfrating'] + "'></div>";
                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantskilldetails_LoadTable(mstapplicantskilldetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantskilldetails_ID) >= 0) {
            if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source = new LocalDataSource();
            if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source.load(mstapplicantskilldetails as any as LocalDataSource);
            if (this.tbl_mstapplicantskilldetails != undefined) this.tbl_mstapplicantskilldetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicantskilldetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantskilldetails.length == 0)
    {
        this.tbl_mstapplicantskilldetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantskilldetail();
        this.mstapplicantmaster_service.mstapplicantskilldetails.push(obj);
        this.tbl_mstapplicantskilldetails.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantskilldetails.length / this.tbl_mstapplicantskilldetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantskilldetails.source.getPaging().page)
        {
            this.tbl_mstapplicantskilldetails.source.setPage((this.mstapplicantmaster_service.mstapplicantskilldetails.length / this.tbl_mstapplicantskilldetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantskilldetails.source.grid.edit(this.tbl_mstapplicantskilldetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantskilldetails.source.data.indexOf(event.data);
    this.onDelete_mstapplicantskilldetail(event,event.data.skillid,((this.tbl_mstapplicantskilldetails.source.getPaging().page-1) *this.tbl_mstapplicantskilldetails.source.getPaging().perPage)+index);
    this.tbl_mstapplicantskilldetails.source.refresh();
    break;
    }
    }

    */
    mstapplicantskilldetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantskilldetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantskilldetail(event, event.data.skillid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstapplicantskilldetail(event, event.data.skillid, ((this.tbl_mstapplicantskilldetails.source.getPaging().page - 1) * this.tbl_mstapplicantskilldetails.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantskilldetails.source.refresh();
                break;
        }
    }
    mstapplicantskilldetails_onDelete(obj) {
        let skillid = obj.data.skillid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(skillid).then(res =>
                this.mstapplicantskilldetails_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantskilldetails_Action(event: any) {
        let referencesourcedetails = 'Sub Category: ' + event.data.subcategoryiddesc + '<BR>' + 'Skill Category: ' + event.data.skillcategorydesc + '<BR>' + 'Self Rating: ' + event.data.selfrating + '<BR>' + 'Remarks: ' + event.data.remarks;
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantskilldetails");
        let formname = (objbomenuaction as any).actionname;
        if (formname == "mstapplicantreferencerequests") {
            this.dialog.open(mstapplicantreferencerequestComponent,
                {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 2, save: true }
                }
            ).onClose.subscribe(res => {
            });
        }




    }
    mstapplicantskilldetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantskilldetails.source.setPaging(1, val, true);
    }

    handle_mstapplicantskilldetails_GridSelected(event: any) {
        this.mstapplicantskilldetails_selectedindex = this.tbl_mstapplicantskilldetails.source.findIndex(i => i.skillid === event.data.skillid);
    }
    Is_mstapplicantskilldetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantskilldetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicantskilldetails
    //start of Grid Codes mstapplicantworkreferences
    mstapplicantworkreferences_settings: any;

    show_mstapplicantworkreferences_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantworkreferences.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantworkreferences.source.initGrid();
    }
    delete_mstapplicantworkreferences_All() {
        this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantworkreferences_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantworkreferences_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantworkreferences.source.settings != null) this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'];
        this.tbl_mstapplicantworkreferences.source.initGrid();
    }
    show_mstapplicantworkreferences_InActive() {
    }
    enable_mstapplicantworkreferences_InActive() {
    }
    async Set_mstapplicantworkreferences_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantworkreferences) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantworkreferences.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantworkreferences_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantworkreferences_applicantid.value)), }, };
            this.tbl_mstapplicantworkreferences.source.settings = clone;
            this.tbl_mstapplicantworkreferences.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantworkreferences = true;
    }
    async mstapplicantworkreferences_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantworkreferences_TableConfig() {
        this.mstapplicantworkreferences_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstapplicantworkreference_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstapplicantworkreferenceshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantworkreferences_LoadTable(mstapplicantworkreferences = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantworkreferences_ID) >= 0) {
            if (this.tbl_mstapplicantworkreferences != undefined) this.tbl_mstapplicantworkreferences.source = new LocalDataSource();
            if (this.tbl_mstapplicantworkreferences != undefined) this.tbl_mstapplicantworkreferences.source.load(mstapplicantworkreferences as any as LocalDataSource);
            if (this.tbl_mstapplicantworkreferences != undefined) this.tbl_mstapplicantworkreferences.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicantworkreferences_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantworkreferences.length == 0)
    {
        this.tbl_mstapplicantworkreferences.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantworkreference();
        this.mstapplicantmaster_service.mstapplicantworkreferences.push(obj);
        this.tbl_mstapplicantworkreferences.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantworkreferences.length / this.tbl_mstapplicantworkreferences.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantworkreferences.source.getPaging().page)
        {
            this.tbl_mstapplicantworkreferences.source.setPage((this.mstapplicantmaster_service.mstapplicantworkreferences.length / this.tbl_mstapplicantworkreferences.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantworkreferences.source.grid.edit(this.tbl_mstapplicantworkreferences.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantworkreferences.source.data.indexOf(event.data);
    this.onDelete_mstapplicantworkreference(event,event.data.workreferenceid,((this.tbl_mstapplicantworkreferences.source.getPaging().page-1) *this.tbl_mstapplicantworkreferences.source.getPaging().perPage)+index);
    this.tbl_mstapplicantworkreferences.source.refresh();
    break;
    }
    }

    */
    mstapplicantworkreferences_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantworkreference(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantworkreference(event, event.data.workreferenceid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstapplicantworkreference(event, event.data.workreferenceid, ((this.tbl_mstapplicantworkreferences.source.getPaging().page - 1) * this.tbl_mstapplicantworkreferences.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantworkreferences.source.refresh();
                break;
        }
    }
    mstapplicantworkreferences_onDelete(obj) {
        let workreferenceid = obj.data.workreferenceid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(workreferenceid).then(res =>
                this.mstapplicantworkreferences_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantworkreferences_Action(event: any) {
        let referencesourcedetails = 'Work Topic: ' + event.data.worktopic + '<BR>' + 'Work Description: ' + event.data.workdescription + '<BR>' + 'Reference URL: ' + event.data.referenceurl + '<BR>' + 'Remarks: ' + event.data.remarks;
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantworkreferences");
        let formname = (objbomenuaction as any).actionname;
        if (formname == "mstapplicantreferencerequests") {
            this.dialog.open(mstapplicantreferencerequestComponent,
                {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 320, requestmasterid: event.data.workreferenceid, ScreenType: 2, save: true }
                }
            ).onClose.subscribe(res => {
            });
        }

    }
    mstapplicantworkreferences_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantworkreferences.source.setPaging(1, val, true);
    }

    handle_mstapplicantworkreferences_GridSelected(event: any) {
        this.mstapplicantworkreferences_selectedindex = this.tbl_mstapplicantworkreferences.source.findIndex(i => i.workreferenceid === event.data.workreferenceid);
    }
    Is_mstapplicantworkreferences_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantworkreferences_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicantworkreferences
    //start of Grid Codes mstapplicantsocialmediadetails
    mstapplicantsocialmediadetails_settings: any;

    show_mstapplicantsocialmediadetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantsocialmediadetails.source.initGrid();
    }
    delete_mstapplicantsocialmediadetails_All() {
        this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantsocialmediadetails_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantsocialmediadetails_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantsocialmediadetails.source.settings != null) this.tbl_mstapplicantsocialmediadetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantsocialmediadetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantsocialmediadetails.source.initGrid();
    }
    show_mstapplicantsocialmediadetails_InActive() {
    }
    enable_mstapplicantsocialmediadetails_InActive() {
    }
    async Set_mstapplicantsocialmediadetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantsocialmediadetails) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantsocialmediadetails.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_applicantid.value)), }, };
            this.tbl_mstapplicantsocialmediadetails.source.settings = clone;
            this.tbl_mstapplicantsocialmediadetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantsocialmediadetails.source.settings);
            if (clone.columns['socialmedianame'] != undefined) clone.columns['socialmedianame'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_socialmedianame.value)), }, };
            if (clone.columns['socialmedianame'] != undefined) clone.columns['socialmedianame'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_socialmedianame.value)), }, };
            this.tbl_mstapplicantsocialmediadetails.source.settings = clone;
            this.tbl_mstapplicantsocialmediadetails.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantsocialmediadetails = true;
    }
    async mstapplicantsocialmediadetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantsocialmediadetails_TableConfig() {
        this.mstapplicantsocialmediadetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstapplicantsocialmediadetail_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstapplicantsocialmediadetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantsocialmediadetails_LoadTable(mstapplicantsocialmediadetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantsocialmediadetails_ID) >= 0) {
            if (this.tbl_mstapplicantsocialmediadetails != undefined) this.tbl_mstapplicantsocialmediadetails.source = new LocalDataSource();
            if (this.tbl_mstapplicantsocialmediadetails != undefined) this.tbl_mstapplicantsocialmediadetails.source.load(mstapplicantsocialmediadetails as any as LocalDataSource);
            if (this.tbl_mstapplicantsocialmediadetails != undefined) this.tbl_mstapplicantsocialmediadetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicantsocialmediadetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantsocialmediadetails.length == 0)
    {
        this.tbl_mstapplicantsocialmediadetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantsocialmediadetail();
        this.mstapplicantmaster_service.mstapplicantsocialmediadetails.push(obj);
        this.tbl_mstapplicantsocialmediadetails.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantsocialmediadetails.length / this.tbl_mstapplicantsocialmediadetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantsocialmediadetails.source.getPaging().page)
        {
            this.tbl_mstapplicantsocialmediadetails.source.setPage((this.mstapplicantmaster_service.mstapplicantsocialmediadetails.length / this.tbl_mstapplicantsocialmediadetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantsocialmediadetails.source.grid.edit(this.tbl_mstapplicantsocialmediadetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantsocialmediadetails.source.data.indexOf(event.data);
    this.onDelete_mstapplicantsocialmediadetail(event,event.data.socialrefid,((this.tbl_mstapplicantsocialmediadetails.source.getPaging().page-1) *this.tbl_mstapplicantsocialmediadetails.source.getPaging().perPage)+index);
    this.tbl_mstapplicantsocialmediadetails.source.refresh();
    break;
    }
    }

    */
    mstapplicantsocialmediadetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantsocialmediadetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantsocialmediadetail(event, event.data.socialrefid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstapplicantsocialmediadetail(event, event.data.socialrefid, ((this.tbl_mstapplicantsocialmediadetails.source.getPaging().page - 1) * this.tbl_mstapplicantsocialmediadetails.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantsocialmediadetails.source.refresh();
                break;
        }
    }
    mstapplicantsocialmediadetails_onDelete(obj) {
        let socialrefid = obj.data.socialrefid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(socialrefid).then(res =>
                this.mstapplicantsocialmediadetails_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantsocialmediadetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantsocialmediadetails");
        let formname = (objbomenuaction as any).actionname;




    }
    mstapplicantsocialmediadetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantsocialmediadetails.source.setPaging(1, val, true);
    }

    handle_mstapplicantsocialmediadetails_GridSelected(event: any) {
        this.mstapplicantsocialmediadetails_selectedindex = this.tbl_mstapplicantsocialmediadetails.source.findIndex(i => i.socialrefid === event.data.socialrefid);
    }
    Is_mstapplicantsocialmediadetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantsocialmediadetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicantsocialmediadetails
    //start of Grid Codes mstapplicantachievementdetails
    mstapplicantachievementdetails_settings: any;

    show_mstapplicantachievementdetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantachievementdetails.source.initGrid();
    }
    delete_mstapplicantachievementdetails_All() {
        this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantachievementdetails_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantachievementdetails_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantachievementdetails.source.settings != null) this.tbl_mstapplicantachievementdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantachievementdetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantachievementdetails.source.initGrid();
    }
    show_mstapplicantachievementdetails_InActive() {
    }
    enable_mstapplicantachievementdetails_InActive() {
    }
    async Set_mstapplicantachievementdetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantachievementdetails) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_applicantid.value)), }, };
            this.tbl_mstapplicantachievementdetails.source.settings = clone;
            this.tbl_mstapplicantachievementdetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
            if (clone.columns['masterdataid'] != undefined) clone.columns['masterdataid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_masterdataid.value)), }, };
            if (clone.columns['masterdataid'] != undefined) clone.columns['masterdataid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_masterdataid.value)), }, };
            this.tbl_mstapplicantachievementdetails.source.settings = clone;
            this.tbl_mstapplicantachievementdetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_referenceacceptance.value)), }, };
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_referenceacceptance.value)), }, };
            this.tbl_mstapplicantachievementdetails.source.settings = clone;
            this.tbl_mstapplicantachievementdetails.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantachievementdetails = true;
    }
    async mstapplicantachievementdetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantachievementdetails_TableConfig() {
        this.mstapplicantachievementdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstapplicantachievementdetail_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstapplicantachievementdetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        divrow["selfrating"] = "<div class='Stars' style='--rating:" + row['selfrating'] + "'></div>";
                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantachievementdetails_LoadTable(mstapplicantachievementdetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantachievementdetails_ID) >= 0) {
            if (this.tbl_mstapplicantachievementdetails != undefined) this.tbl_mstapplicantachievementdetails.source = new LocalDataSource();
            if (this.tbl_mstapplicantachievementdetails != undefined) this.tbl_mstapplicantachievementdetails.source.load(mstapplicantachievementdetails as any as LocalDataSource);
            if (this.tbl_mstapplicantachievementdetails != undefined) this.tbl_mstapplicantachievementdetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicantachievementdetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantachievementdetails.length == 0)
    {
        this.tbl_mstapplicantachievementdetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantachievementdetail();
        this.mstapplicantmaster_service.mstapplicantachievementdetails.push(obj);
        this.tbl_mstapplicantachievementdetails.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantachievementdetails.length / this.tbl_mstapplicantachievementdetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantachievementdetails.source.getPaging().page)
        {
            this.tbl_mstapplicantachievementdetails.source.setPage((this.mstapplicantmaster_service.mstapplicantachievementdetails.length / this.tbl_mstapplicantachievementdetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantachievementdetails.source.grid.edit(this.tbl_mstapplicantachievementdetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantachievementdetails.source.data.indexOf(event.data);
    this.onDelete_mstapplicantachievementdetail(event,event.data.achievementid,((this.tbl_mstapplicantachievementdetails.source.getPaging().page-1) *this.tbl_mstapplicantachievementdetails.source.getPaging().perPage)+index);
    this.tbl_mstapplicantachievementdetails.source.refresh();
    break;
    }
    }

    */
    mstapplicantachievementdetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantachievementdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantachievementdetail(event, event.data.achievementid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstapplicantachievementdetail(event, event.data.achievementid, ((this.tbl_mstapplicantachievementdetails.source.getPaging().page - 1) * this.tbl_mstapplicantachievementdetails.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantachievementdetails.source.refresh();
                break;
        }
    }
    mstapplicantachievementdetails_onDelete(obj) {
        let achievementid = obj.data.achievementid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(achievementid).then(res =>
                this.mstapplicantachievementdetails_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantachievementdetails_Action(event: any) {
        debugger;
        let referencesourcedetails = 'Achievements: ' + event.data.masterdataiddesc + '<BR>' + 'Details: ' + event.data.achievementdetails;

        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantachievementdetails");
        let formname = (objbomenuaction as any).actionname;
        if (formname == "mstapplicantreferencerequests") {
            this.dialog.open(mstapplicantreferencerequestComponent,
                {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 319, requestmasterid: event.data.achievementid, ScreenType: 2, save: true }
                }
            ).onClose.subscribe(res => {
            });
        }




    }
    mstapplicantachievementdetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantachievementdetails.source.setPaging(1, val, true);
    }

    handle_mstapplicantachievementdetails_GridSelected(event: any) {
        this.mstapplicantachievementdetails_selectedindex = this.tbl_mstapplicantachievementdetails.source.findIndex(i => i.achievementid === event.data.achievementid);
    }
    Is_mstapplicantachievementdetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantachievementdetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicantachievementdetails
    //start of Grid Codes mstapplicantlanguagedetails
    mstapplicantlanguagedetails_settings: any;

    show_mstapplicantlanguagedetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantlanguagedetails.source.initGrid();
    }
    delete_mstapplicantlanguagedetails_All() {
        this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantlanguagedetails_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantlanguagedetails_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantlanguagedetails.source.settings != null) this.tbl_mstapplicantlanguagedetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantlanguagedetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantlanguagedetails.source.initGrid();
    }
    show_mstapplicantlanguagedetails_InActive() {
    }
    enable_mstapplicantlanguagedetails_InActive() {
    }
    async Set_mstapplicantlanguagedetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantlanguagedetails) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantlanguagedetails.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_applicantid.value)), }, };
            this.tbl_mstapplicantlanguagedetails.source.settings = clone;
            this.tbl_mstapplicantlanguagedetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantlanguagedetails.source.settings);
            if (clone.columns['language'] != undefined) clone.columns['language'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_language.value)), }, };
            if (clone.columns['language'] != undefined) clone.columns['language'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_language.value)), }, };
            this.tbl_mstapplicantlanguagedetails.source.settings = clone;
            this.tbl_mstapplicantlanguagedetails.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantlanguagedetails = true;
    }
    async mstapplicantlanguagedetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantlanguagedetails_TableConfig() {
        this.mstapplicantlanguagedetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstapplicantlanguagedetail_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstapplicantlanguagedetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        divrow["speakproficiency"] = "<div class='Stars' style='--rating:" + row['speakproficiency'] + "'></div>";
                        divrow["readproficiency"] = "<div class='Stars' style='--rating:" + row['readproficiency'] + "'></div>";
                        divrow["writeproficiency"] = "<div class='Stars' style='--rating:" + row['writeproficiency'] + "'></div>";
                        divrow["overallrating"] = "<div class='Stars' style='--rating:" + row['overallrating'] + "'></div>";
                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantlanguagedetails_LoadTable(mstapplicantlanguagedetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantlanguagedetails_ID) >= 0) {
            if (this.tbl_mstapplicantlanguagedetails != undefined) this.tbl_mstapplicantlanguagedetails.source = new LocalDataSource();
            if (this.tbl_mstapplicantlanguagedetails != undefined) this.tbl_mstapplicantlanguagedetails.source.load(mstapplicantlanguagedetails as any as LocalDataSource);
            if (this.tbl_mstapplicantlanguagedetails != undefined) this.tbl_mstapplicantlanguagedetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicantlanguagedetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantlanguagedetails.length == 0)
    {
        this.tbl_mstapplicantlanguagedetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantlanguagedetail();
        this.mstapplicantmaster_service.mstapplicantlanguagedetails.push(obj);
        this.tbl_mstapplicantlanguagedetails.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantlanguagedetails.length / this.tbl_mstapplicantlanguagedetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantlanguagedetails.source.getPaging().page)
        {
            this.tbl_mstapplicantlanguagedetails.source.setPage((this.mstapplicantmaster_service.mstapplicantlanguagedetails.length / this.tbl_mstapplicantlanguagedetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantlanguagedetails.source.grid.edit(this.tbl_mstapplicantlanguagedetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantlanguagedetails.source.data.indexOf(event.data);
    this.onDelete_mstapplicantlanguagedetail(event,event.data.languageid,((this.tbl_mstapplicantlanguagedetails.source.getPaging().page-1) *this.tbl_mstapplicantlanguagedetails.source.getPaging().perPage)+index);
    this.tbl_mstapplicantlanguagedetails.source.refresh();
    break;
    }
    }

    */
    mstapplicantlanguagedetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantlanguagedetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantlanguagedetail(event, event.data.languageid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstapplicantlanguagedetail(event, event.data.languageid, ((this.tbl_mstapplicantlanguagedetails.source.getPaging().page - 1) * this.tbl_mstapplicantlanguagedetails.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantlanguagedetails.source.refresh();
                break;
        }
    }
    mstapplicantlanguagedetails_onDelete(obj) {
        let languageid = obj.data.languageid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(languageid).then(res =>
                this.mstapplicantlanguagedetails_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantlanguagedetails_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantlanguagedetails");
        let formname = (objbomenuaction as any).actionname;




    }
    mstapplicantlanguagedetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantlanguagedetails.source.setPaging(1, val, true);
    }

    handle_mstapplicantlanguagedetails_GridSelected(event: any) {
        this.mstapplicantlanguagedetails_selectedindex = this.tbl_mstapplicantlanguagedetails.source.findIndex(i => i.languageid === event.data.languageid);
    }
    Is_mstapplicantlanguagedetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantlanguagedetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicantlanguagedetails
    //start of Grid Codes mstapplicanteducationdetails
    mstapplicanteducationdetails_settings: any;

    show_mstapplicanteducationdetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] == 'multi') this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicanteducationdetails.source.initGrid();
    }
    delete_mstapplicanteducationdetails_All() {
        this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'single';
    }
    show_mstapplicanteducationdetails_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicanteducationdetails_TableDropDownConfig();
        });
        if (this.tbl_mstapplicanteducationdetails.source.settings != null) this.tbl_mstapplicanteducationdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicanteducationdetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicanteducationdetails.source.initGrid();
    }
    show_mstapplicanteducationdetails_InActive() {
    }
    enable_mstapplicanteducationdetails_InActive() {
    }
    async Set_mstapplicanteducationdetails_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicanteducationdetails) {

            var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_applicantid.value)), }, };
            this.tbl_mstapplicanteducationdetails.source.settings = clone;
            this.tbl_mstapplicanteducationdetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
            if (clone.columns['educationcategory'] != undefined) clone.columns['educationcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_educationcategory.value)), }, };
            if (clone.columns['educationcategory'] != undefined) clone.columns['educationcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_educationcategory.value)), }, };
            this.tbl_mstapplicanteducationdetails.source.settings = clone;
            this.tbl_mstapplicanteducationdetails.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_referenceacceptance.value)), }, };
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_referenceacceptance.value)), }, };
            this.tbl_mstapplicanteducationdetails.source.settings = clone;
            this.tbl_mstapplicanteducationdetails.source.initGrid();
        }
        this.bfilterPopulate_mstapplicanteducationdetails = true;
    }
    async mstapplicanteducationdetails_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicanteducationdetails_TableConfig() {
        this.mstapplicanteducationdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstapplicanteducationdetail_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstapplicanteducationdetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicanteducationdetails_LoadTable(mstapplicanteducationdetails = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicanteducationdetails_ID) >= 0) {
            if (this.tbl_mstapplicanteducationdetails != undefined) this.tbl_mstapplicanteducationdetails.source = new LocalDataSource();
            if (this.tbl_mstapplicanteducationdetails != undefined) this.tbl_mstapplicanteducationdetails.source.load(mstapplicanteducationdetails as any as LocalDataSource);
            if (this.tbl_mstapplicanteducationdetails != undefined) this.tbl_mstapplicanteducationdetails.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicanteducationdetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicanteducationdetails.length == 0)
    {
        this.tbl_mstapplicanteducationdetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicanteducationdetail();
        this.mstapplicantmaster_service.mstapplicanteducationdetails.push(obj);
        this.tbl_mstapplicanteducationdetails.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicanteducationdetails.length / this.tbl_mstapplicanteducationdetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicanteducationdetails.source.getPaging().page)
        {
            this.tbl_mstapplicanteducationdetails.source.setPage((this.mstapplicantmaster_service.mstapplicanteducationdetails.length / this.tbl_mstapplicanteducationdetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicanteducationdetails.source.grid.edit(this.tbl_mstapplicanteducationdetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicanteducationdetails.source.data.indexOf(event.data);
    this.onDelete_mstapplicanteducationdetail(event,event.data.educationid,((this.tbl_mstapplicanteducationdetails.source.getPaging().page-1) *this.tbl_mstapplicanteducationdetails.source.getPaging().perPage)+index);
    this.tbl_mstapplicanteducationdetails.source.refresh();
    break;
    }
    }

    */
    mstapplicanteducationdetails_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicanteducationdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicanteducationdetail(event, event.data.educationid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstapplicanteducationdetail(event, event.data.educationid, ((this.tbl_mstapplicanteducationdetails.source.getPaging().page - 1) * this.tbl_mstapplicanteducationdetails.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicanteducationdetails.source.refresh();
                break;
        }
    }
    mstapplicanteducationdetails_onDelete(obj) {
        let educationid = obj.data.educationid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(educationid).then(res =>
                this.mstapplicanteducationdetails_LoadTable()
            );
        }
    }
    async onCustom_mstapplicanteducationdetails_Action(event: any) {
        let referencesourcedetails = 'Category: ' + event.data.educationcategorydesc + '<BR>' + 'Sub Category: ' + event.data.educationsubcategory + '<BR>'
            + 'Course: ' + event.data.coursename + '<BR>' + 'Institution: ' + event.data.institutionname + '<BR>' + 'From Year: ' + event.data.fromyear + '<BR>'
            + 'To Year: ' + event.data.toyear + '<BR>' + 'Percentage: ' + event.data.percentage + '<BR>' + 'Remarks: ' + event.data.remarks;
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicanteducationdetails");
        let formname = (objbomenuaction as any).actionname;
        if (formname == "mstapplicantreferencerequests") {
            this.dialog.open(mstapplicantreferencerequestComponent,
                {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 315, requestmasterid: event.data.educationid, ScreenType: 2, save: true }
                }
            ).onClose.subscribe(res => {
            });
        }




    }
    mstapplicanteducationdetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicanteducationdetails.source.setPaging(1, val, true);
    }

    handle_mstapplicanteducationdetails_GridSelected(event: any) {
        this.mstapplicanteducationdetails_selectedindex = this.tbl_mstapplicanteducationdetails.source.findIndex(i => i.educationid === event.data.educationid);
    }
    Is_mstapplicanteducationdetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicanteducationdetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicanteducationdetails
    //start of Grid Codes mstjobstatuses
    mstjobstatuses_settings: any;

    show_mstjobstatuses_Checkbox() {
        //debugger;;
        if (this.tbl_mstjobstatuses.source.settings['selectMode'] == 'multi') this.tbl_mstjobstatuses.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstjobstatuses.source.settings['selectMode'] = 'multi';
        this.tbl_mstjobstatuses.source.initGrid();
    }
    delete_mstjobstatuses_All() {
        this.tbl_mstjobstatuses.source.settings['selectMode'] = 'single';
    }
    show_mstjobstatuses_Filter() {
        setTimeout(() => {
            //  this.Set_mstjobstatuses_TableDropDownConfig();
        });
        if (this.tbl_mstjobstatuses.source.settings != null) this.tbl_mstjobstatuses.source.settings['hideSubHeader'] = !this.tbl_mstjobstatuses.source.settings['hideSubHeader'];
        this.tbl_mstjobstatuses.source.initGrid();
    }
    show_mstjobstatuses_InActive() {
    }
    enable_mstjobstatuses_InActive() {
    }
    async Set_mstjobstatuses_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstjobstatuses) {

            var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_applicantid.value)), }, };
            this.tbl_mstjobstatuses.source.settings = clone;
            this.tbl_mstjobstatuses.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
            if (clone.columns['corporateid'] != undefined) clone.columns['corporateid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_corporateid.value)), }, };
            if (clone.columns['corporateid'] != undefined) clone.columns['corporateid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_corporateid.value)), }, };
            this.tbl_mstjobstatuses.source.settings = clone;
            this.tbl_mstjobstatuses.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
            if (clone.columns['jobid'] != undefined) clone.columns['jobid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_jobid.value)), }, };
            if (clone.columns['jobid'] != undefined) clone.columns['jobid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_jobid.value)), }, };
            this.tbl_mstjobstatuses.source.settings = clone;
            this.tbl_mstjobstatuses.source.initGrid();
        }
        this.bfilterPopulate_mstjobstatuses = true;
    }
    async mstjobstatuses_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstjobstatuses_TableConfig() {
        this.mstjobstatuses_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstjobstatus_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstjobstatuseshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        divrow["viewdatetime"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["viewdatetime"]));
                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstjobstatuses_LoadTable(mstjobstatuses = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobstatuses_ID) >= 0) {
            if (this.tbl_mstjobstatuses != undefined) this.tbl_mstjobstatuses.source = new LocalDataSource();
            if (this.tbl_mstjobstatuses != undefined) this.tbl_mstjobstatuses.source.load(mstjobstatuses as any as LocalDataSource);
            if (this.tbl_mstjobstatuses != undefined) this.tbl_mstjobstatuses.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstjobstatuses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstjobstatuses.length == 0)
    {
        this.tbl_mstjobstatuses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstjobstatus();
        this.mstapplicantmaster_service.mstjobstatuses.push(obj);
        this.tbl_mstjobstatuses.source.refresh();
        if ((this.mstapplicantmaster_service.mstjobstatuses.length / this.tbl_mstjobstatuses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstjobstatuses.source.getPaging().page)
        {
            this.tbl_mstjobstatuses.source.setPage((this.mstapplicantmaster_service.mstjobstatuses.length / this.tbl_mstjobstatuses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstjobstatuses.source.grid.edit(this.tbl_mstjobstatuses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstjobstatuses.source.data.indexOf(event.data);
    this.onDelete_mstjobstatus(event,event.data.viewid,((this.tbl_mstjobstatuses.source.getPaging().page-1) *this.tbl_mstjobstatuses.source.getPaging().perPage)+index);
    this.tbl_mstjobstatuses.source.refresh();
    break;
    }
    }

    */
    mstjobstatuses_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstjobstatus(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstjobstatus(event, event.data.viewid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstjobstatus(event, event.data.viewid, ((this.tbl_mstjobstatuses.source.getPaging().page - 1) * this.tbl_mstjobstatuses.source.getPaging().perPage) + event.index);
                this.tbl_mstjobstatuses.source.refresh();
                break;
        }
    }
    mstjobstatuses_onDelete(obj) {
        let viewid = obj.data.viewid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(viewid).then(res =>
                this.mstjobstatuses_LoadTable()
            );
        }
    }
    async onCustom_mstjobstatuses_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstjobstatuses");
        let formname = (objbomenuaction as any).actionname;




    }
    mstjobstatuses_Paging(val) {
        //debugger;;
        this.tbl_mstjobstatuses.source.setPaging(1, val, true);
    }

    handle_mstjobstatuses_GridSelected(event: any) {
        this.mstjobstatuses_selectedindex = this.tbl_mstjobstatuses.source.findIndex(i => i.viewid === event.data.viewid);
    }
    Is_mstjobstatuses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobstatuses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstjobstatuses
    //start of Grid Codes mstapplicantreferencerequests
    mstapplicantreferencerequests_settings: any;

    show_mstapplicantreferencerequests_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantreferencerequests.source.settings['selectMode'] == 'multi') this.tbl_mstapplicantreferencerequests.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstapplicantreferencerequests.source.settings['selectMode'] = 'multi';
        this.tbl_mstapplicantreferencerequests.source.initGrid();
    }
    delete_mstapplicantreferencerequests_All() {
        this.tbl_mstapplicantreferencerequests.source.settings['selectMode'] = 'single';
    }
    show_mstapplicantreferencerequests_Filter() {
        setTimeout(() => {
            //  this.Set_mstapplicantreferencerequests_TableDropDownConfig();
        });
        if (this.tbl_mstapplicantreferencerequests.source.settings != null) this.tbl_mstapplicantreferencerequests.source.settings['hideSubHeader'] = !this.tbl_mstapplicantreferencerequests.source.settings['hideSubHeader'];
        this.tbl_mstapplicantreferencerequests.source.initGrid();
    }
    show_mstapplicantreferencerequests_InActive() {
    }
    enable_mstapplicantreferencerequests_InActive() {
    }
    async Set_mstapplicantreferencerequests_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_mstapplicantreferencerequests) {

            var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequests.source.settings);
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_applicantid.value)), }, };
            if (clone.columns['applicantid'] != undefined) clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_applicantid.value)), }, };
            this.tbl_mstapplicantreferencerequests.source.settings = clone;
            this.tbl_mstapplicantreferencerequests.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequests.source.settings);
            if (clone.columns['requestmasterdatatypeid'] != undefined) clone.columns['requestmasterdatatypeid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_requestmasterdatatypeid.value)), }, };
            if (clone.columns['requestmasterdatatypeid'] != undefined) clone.columns['requestmasterdatatypeid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_requestmasterdatatypeid.value)), }, };
            this.tbl_mstapplicantreferencerequests.source.settings = clone;
            this.tbl_mstapplicantreferencerequests.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequests.source.settings);
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_referenceacceptance.value)), }, };
            if (clone.columns['referenceacceptance'] != undefined) clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_referenceacceptance.value)), }, };
            this.tbl_mstapplicantreferencerequests.source.settings = clone;
            this.tbl_mstapplicantreferencerequests.source.initGrid();
        }
        this.bfilterPopulate_mstapplicantreferencerequests = true;
    }
    async mstapplicantreferencerequests_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_mstapplicantreferencerequests_TableConfig() {
        this.mstapplicantreferencerequests_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true, // true,
                //delete: (this.IsApplicant || this.IsAdmin),
                position: 'left',
                custom: this.mstapplicantreferencerequest_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
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
                        //debugger;;
                        cell = this.mstapplicantreferencerequestshtml();
                        var divrow = JSON.parse(JSON.stringify(row));


                        divrow["requestreferencedate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["requestreferencedate"]));
                        divrow["referencedate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["referencedate"]));
                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantreferencerequests_LoadTable(mstapplicantreferencerequests = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantreferencerequests_ID) >= 0) {
            if (this.tbl_mstapplicantreferencerequests != undefined) this.tbl_mstapplicantreferencerequests.source = new LocalDataSource();
            if (this.tbl_mstapplicantreferencerequests != undefined) this.tbl_mstapplicantreferencerequests.source.load(mstapplicantreferencerequests as any as LocalDataSource);
            if (this.tbl_mstapplicantreferencerequests != undefined) this.tbl_mstapplicantreferencerequests.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    mstapplicantreferencerequests_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstapplicantmaster_service.mstapplicantreferencerequests.length == 0)
    {
        this.tbl_mstapplicantreferencerequests.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstapplicantreferencerequest();
        this.mstapplicantmaster_service.mstapplicantreferencerequests.push(obj);
        this.tbl_mstapplicantreferencerequests.source.refresh();
        if ((this.mstapplicantmaster_service.mstapplicantreferencerequests.length / this.tbl_mstapplicantreferencerequests.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstapplicantreferencerequests.source.getPaging().page)
        {
            this.tbl_mstapplicantreferencerequests.source.setPage((this.mstapplicantmaster_service.mstapplicantreferencerequests.length / this.tbl_mstapplicantreferencerequests.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstapplicantreferencerequests.source.grid.edit(this.tbl_mstapplicantreferencerequests.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstapplicantreferencerequests.source.data.indexOf(event.data);
    this.onDelete_mstapplicantreferencerequest(event,event.data.requestid,((this.tbl_mstapplicantreferencerequests.source.getPaging().page-1) *this.tbl_mstapplicantreferencerequests.source.getPaging().perPage)+index);
    this.tbl_mstapplicantreferencerequests.source.refresh();
    break;
    }
    }

    */
    mstapplicantreferencerequests_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_mstapplicantreferencerequest(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstapplicantreferencerequest(event, event.data.requestid, this.formid);
                break;
            case 'delete':
                //this.onDelete_mstapplicantreferencerequest(event,event.data.requestid,((this.tbl_mstapplicantreferencerequests.source.getPaging().page-1) *this.tbl_mstapplicantreferencerequests.source.getPaging().perPage)+event.index);
                //this.tbl_mstapplicantreferencerequests.source.refresh();
                if (event.data.referenceacceptance == "R") {
                    alert("Request is rejected.Cannot Delete")
                }
                else if (event.data.referenceacceptance == "A") {
                    alert("Request is accepted.Cannot Delete")
                }
                else {
                    this.onDelete_mstapplicantreferencerequest(event, event.data.requestid, ((this.tbl_mstapplicantreferencerequests.source.getPaging().page - 1) * this.tbl_mstapplicantreferencerequests.source.getPaging().perPage) + event.index);
                    this.tbl_mstapplicantreferencerequests.source.refresh();
                }

                break;
        }
    }
    mstapplicantreferencerequests_onDelete(obj) {
        let requestid = obj.data.requestid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(requestid).then(res =>
                this.mstapplicantreferencerequests_LoadTable()
            );
        }
    }
    async onCustom_mstapplicantreferencerequests_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantreferencerequests");
        let formname = (objbomenuaction as any).actionname;




    }
    mstapplicantreferencerequests_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantreferencerequests.source.setPaging(1, val, true);
    }

    handle_mstapplicantreferencerequests_GridSelected(event: any) {
        this.mstapplicantreferencerequests_selectedindex = this.tbl_mstapplicantreferencerequests.source.findIndex(i => i.requestid === event.data.requestid);
    }
    Is_mstapplicantreferencerequests_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantreferencerequests_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes mstapplicantreferencerequests

}



