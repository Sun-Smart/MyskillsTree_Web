import { lmsopportunityService } from './../../../service/lmsopportunity.service';
import { lmsopportunity } from './../../../model/lmsopportunity.model';
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
import { lmsopportunityproduct } from './../../../model/lmsopportunityproduct.model';
import { lmsopportunityproductComponent } from './../../../pages/forms/lmsopportunityproduct/lmsopportunityproduct.component';
import { lmsopportunityproductService } from './../../../service/lmsopportunityproduct.service';
import { lmscall } from './../../../model/lmscall.model';
import { lmscallComponent } from './../../../pages/forms/lmscall/lmscall.component';
import { lmscallService } from './../../../service/lmscall.service';
import { lmssecondarycontact } from './../../../model/lmssecondarycontact.model';
import { lmssecondarycontactComponent } from './../../../pages/forms/lmssecondarycontact/lmssecondarycontact.component';
import { lmssecondarycontactService } from './../../../service/lmssecondarycontact.service';
import { lmsreminder } from './../../../model/lmsreminder.model';
import { lmsreminderComponent } from './../../../pages/forms/lmsreminder/lmsreminder.component';
import { lmsreminderService } from './../../../service/lmsreminder.service';
import { lmsquote } from './../../../model/lmsquote.model';
import { lmsquoteComponent } from './../../../pages/forms/lmsquote/lmsquote.component';
import { lmsquoteService } from './../../../service/lmsquote.service';
import { boexpense } from './../../../model/boexpense.model';
import { boexpenseComponent } from './../../../pages/forms/boexpense/boexpense.component';
import { boexpenseService } from './../../../service/boexpense.service';
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

@Component({
    selector: 'app-lmsopportunity',
    templateUrl: './lmsopportunity.component.html',
    styles: [],
    providers: [KeyboardShortcutsService]
})



export class lmsopportunityComponent implements OnInit {
    formData: lmsopportunity;
    list: lmsopportunity[];
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

    bfilterPopulate_lmsopportunities: boolean = false;
    bfilterPopulate_lmsopportunityproducts: boolean = false;
    bfilterPopulate_lmscalls: boolean = false;
    bfilterPopulate_lmssecondarycontacts: boolean = false;
    bfilterPopulate_lmsreminders: boolean = false;
    bfilterPopulate_lmsquotes: boolean = false;
    bfilterPopulate_boexpenses: boolean = false;
    lmsopportunity_menuactions: any = []
    lmsopportunityproduct_menuactions: any = []
    @ViewChild('tbl_lmsopportunityproducts', { static: false }) tbl_lmsopportunityproducts: Ng2SmartTableComponent;
    lmscall_menuactions: any = []
    @ViewChild('tbl_lmscalls', { static: false }) tbl_lmscalls: Ng2SmartTableComponent;
    lmssecondarycontact_menuactions: any = []
    @ViewChild('tbl_lmssecondarycontacts', { static: false }) tbl_lmssecondarycontacts: Ng2SmartTableComponent;
    lmsreminder_menuactions: any = []
    @ViewChild('tbl_lmsreminders', { static: false }) tbl_lmsreminders: Ng2SmartTableComponent;
    lmsquote_menuactions: any = []
    @ViewChild('tbl_lmsquotes', { static: false }) tbl_lmsquotes: Ng2SmartTableComponent;
    boexpense_menuactions: any = []
    @ViewChild('tbl_boexpenses', { static: false }) tbl_boexpenses: Ng2SmartTableComponent;

    lmsopportunity_Form: FormGroup;

    leadid_List: DropDownValues[];
    opportunityid_List: DropDownValues[];
    opportunityid_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    leadby_List: DropDownValues[];
    leadby_optionsEvent: EventEmitter<any> = new EventEmitter<any>();//autocomplete
    opportunitytype_List: DropDownValues[];
    opportunitystage_List: DropDownValues[];
    stagesubcategory_List: DropDownValues[];
    opportunitysize_List: DropDownValues[];
    nextstep_List: DropDownValues[];
    possibilityofclosure_List: DropDownValues[];
    leadsource_List: DropDownValues[];
    budget_List: DropDownValues[];
    criticality_List: DropDownValues[];
    priority_List: DropDownValues[];
    campaignid_List: DropDownValues[];
    territory_List: DropDownValues[];
    reasonforloss_List: DropDownValues[];

    private exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
    showFormType: any;
    formid: any;
    pkcol: any;
    readonly AttachmentURL = AppConstants.AttachmentURL;
    readonly URL = AppConstants.UploadURL; attachmentlist: any[] = []; fileAttachmentList: any[] = [];
    @ViewChild('fileattachment', { static: false }) fileattachment: AttachmentComponent;
    attachmentFieldJson: any[] = [];
    attachmentVisible: boolean = true;
    SESSIONUSERID: any;//current user

    sessionData: any;
    sourceKey: any;

    dealvaluevisible: boolean = false;
    resourcesvisible: boolean = false;
    prebiddatevisible: boolean = false;
    technologyvisible: boolean = false;
    finalopeningdatevisible: boolean = false;
    openingdatevisible: boolean = false;
    campaignidvisible: boolean = false;
    tenderpublishdatevisible: boolean = false;
    submissiondatevisible: boolean = false;
    monthlybillingvisible: boolean = false;


    lmsopportunityproducts_visiblelist: any;
    lmsopportunityproducts_hidelist: any;
    lmscalls_visiblelist: any;
    lmscalls_hidelist: any;
    lmssecondarycontacts_visiblelist: any;
    lmssecondarycontacts_hidelist: any;
    lmsreminders_visiblelist: any;
    lmsreminders_hidelist: any;
    lmsquotes_visiblelist: any;
    lmsquotes_hidelist: any;
    boexpenses_visiblelist: any;
    boexpenses_hidelist: any;

    Deleted_lmsopportunityproduct_IDs: string = "";
    lmsopportunityproducts_ID: string = "1";
    lmsopportunityproducts_selectedindex: any;
    Deleted_lmscall_IDs: string = "";
    lmscalls_ID: string = "2";
    lmscalls_selectedindex: any;
    Deleted_lmssecondarycontact_IDs: string = "";
    lmssecondarycontacts_ID: string = "3";
    lmssecondarycontacts_selectedindex: any;
    Deleted_lmsreminder_IDs: string = "";
    lmsreminders_ID: string = "4";
    lmsreminders_selectedindex: any;
    Deleted_lmsquote_IDs: string = "";
    lmsquotes_ID: string = "5";
    lmsquotes_selectedindex: any;
    Deleted_boexpense_IDs: string = "";
    boexpenses_ID: string = "6";
    boexpenses_selectedindex: any;


    constructor(
        private nav: Location,
        private translate: TranslateService,
        private keyboard: KeyboardShortcutsService, private router: Router,
        private themeService: ThemeService,
        private ngbDateParserFormatter: NgbDateParserFormatter,
        public dialogRef: DynamicDialogRef,
        public dynamicconfig: DynamicDialogConfig,
        public dialog: DialogService,
        private lmsopportunity_service: lmsopportunityService,
        private lmsopportunityproduct_service: lmsopportunityproductService,
        private lmscall_service: lmscallService,
        private lmssecondarycontact_service: lmssecondarycontactService,
        private lmsquote_service: lmsquoteService,
        private boexpense_service: boexpenseService,
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
        this.lmsopportunity_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            branchid: [null],
            leadid: [null],
            leadiddesc: [null],
            opportunityid: [null],
            opportunityiddesc: [null],
            opportunitydetail: [null, Validators.compose([Validators.required])],
            leadby: [null, Validators.compose([Validators.required])],
            leadbydesc: [null],
            opportunitytype: [null],
            opportunitytypedesc: [null],
            opportunitystage: [null, Validators.compose([Validators.required])],
            opportunitystagedesc: [null],
            stagesubcategory: [null],
            stagesubcategorydesc: [null],
            opportunitysize: [null, Validators.compose([Validators.required])],
            opportunitysizedesc: [null],
            nextstep: [null, Validators.compose([Validators.required])],
            nextstepdesc: [null],
            nextstepdetail: [null],
            possibilityofclosure: [null, Validators.compose([Validators.required])],
            possibilityofclosuredesc: [null],
            dealvalue: [null],
            tenderpublishdate: [null],
            prebiddate: [null],
            submissiondate: [null],
            openingdate: [null],
            finalopeningdate: [null],
            otherdate1: [null],
            otherdatenotes1: [null],
            otherdate2: [null],
            otherdatenotes2: [null],
            otherdate3: [null],
            otherdatenotes3: [null],
            technology: [null],
            resources: [null],
            monthlybilling: [null],
            requirementdetails: [null],
            leadsource: [null],
            leadsourcedesc: [null],
            creationdate: [null],
            budget: [null],
            budgetdesc: [null],
            tat: [null],
            actualtat: [null],
            assignedto: [null],
            criticality: [null],
            criticalitydesc: [null],
            priority: [null],
            prioritydesc: [null],
            expectedclosuredate: [null],
            expectedvalue: [null],
            successrate: [null],
            campaignid: [null],
            campaigniddesc: [null],
            notes: [null],
            attachment: [null],
            decisionmaker: [null],
            territory: [null],
            territorydesc: [null],
            competitors: [null],
            winner: [null],
            reasonforloss: [null],
            reasonforlossdesc: [null],
            closeddate: [null],
            contactid: [null],
            lastcontactdate: [null],
            status: [null],
            statusdesc: [null],
        });
    }

    get f() { return this.lmsopportunity_Form.controls; }


    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }

    //function called when we navigate to other page.defined in routing
    canDeactivate(): Observable<boolean> | boolean {
        debugger;
        if (this.lmsopportunity_Form.dirty && this.lmsopportunity_Form.touched) {
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
        let pos = this.pkList.map(function (e: any) { return e.opportunityid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0) this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }

    next() {
        debugger;
        let pos = this.pkList.map(function (e: any) { return e.opportunityid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length) this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }

    //on searching in pk autocomplete
    onSelectedpk(pkDetail: any) {
        if (pkDetail.opportunityid && pkDetail) {
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
        let lmsopportunityid = null;

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
        this.formid = lmsopportunityid;
        //alert(lmsopportunityid);

        //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
        if (this.pkcol == null) {
            this.Set_lmsopportunityproducts_TableConfig();
            setTimeout(() => {
                //this.Set_lmsopportunityproducts_TableDropDownConfig();
            });

            this.Set_lmscalls_TableConfig();
            setTimeout(() => {
                //this.Set_lmscalls_TableDropDownConfig();
            });

            this.Set_lmssecondarycontacts_TableConfig();
            setTimeout(() => {
                //this.Set_lmssecondarycontacts_TableDropDownConfig();
            });

            this.Set_lmsreminders_TableConfig();
            setTimeout(() => {
                //this.Set_lmsreminders_TableDropDownConfig();
            });

            this.Set_lmsquotes_TableConfig();
            setTimeout(() => {
                //this.Set_lmsquotes_TableDropDownConfig();
            });

            this.Set_boexpenses_TableConfig();
            setTimeout(() => {
                //this.Set_boexpenses_TableDropDownConfig();
            });

            this.resetForm();
        }
        else {
            if (this.maindata == undefined || this.maindata == null || this.maindata.save == true) await this.PopulateScreen(this.pkcol);
            //get the record from api
            //foreign keys 
        }
        this.lmsopportunity_service.getDefaultData().then(res => {
            this.leadid_List = res.list_leadid.value;
            this.opportunityid_List = res.list_opportunityid.value;
            this.leadby_List = res.list_leadby.value;
            this.opportunitytype_List = res.list_opportunitytype.value;
            this.opportunitystage_List = res.list_opportunitystage.value;
            this.opportunitysize_List = res.list_opportunitysize.value;
            this.nextstep_List = res.list_nextstep.value;
            this.possibilityofclosure_List = res.list_possibilityofclosure.value;
            this.leadsource_List = res.list_leadsource.value;
            this.budget_List = res.list_budget.value;
            this.criticality_List = res.list_criticality.value;
            this.priority_List = res.list_priority.value;
            this.campaignid_List = res.list_campaignid.value;
            this.territory_List = res.list_territory.value;
            this.reasonforloss_List = res.list_reasonforloss.value;
        }).catch((err) => { this.spinner.hide(); console.log(err); });

        //autocomplete
        this.lmsopportunity_service.get_lmsopportunities_List().then(res => {
            this.pkList = res as lmsopportunity[];
            this.pkoptionsEvent.emit(this.pkList);
        }
        ).catch((err) => { this.spinner.hide(); console.log(err); });
        //setting the flag that the screen is not touched 
        this.lmsopportunity_Form.markAsUntouched();
        this.lmsopportunity_Form.markAsPristine();
    }
    onSelected_opportunityid(opportunityidDetail: any) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmsopportunity_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,

            });

        }
    }

    onSelected_leadby(leadbyDetail: any) {
        if (leadbyDetail.value && leadbyDetail) {
            this.lmsopportunity_Form.patchValue({
                leadby: leadbyDetail.value,
                leadbydesc: leadbyDetail.label,

            });

        }
    }




    resetForm() {
        if (this.lmsopportunity_Form != null)
            this.lmsopportunity_Form.reset();
        this.lmsopportunity_Form.patchValue({
            leadby: this.sessionData.userid,
            leadbydesc: this.sessionData.username,
        });
        this.lmsopportunity_Form.patchValue({
            leadby: this.sessionData.userid,
            tenderpublishdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            prebiddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            submissiondate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            openingdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            finalopeningdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            otherdate1: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            otherdate2: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            otherdate3: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            creationdate: this.ngbDateParserFormatter.parse(new Date().toString()),
            expectedclosuredate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            closeddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            lastcontactdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        });
        setTimeout(() => {
            this.lmsopportunityproducts_LoadTable();
            this.lmscalls_LoadTable();
            this.lmssecondarycontacts_LoadTable();
            this.lmsreminders_LoadTable();
            this.lmsquotes_LoadTable();
            this.boexpenses_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        this.dealvaluevisible = false;
        this.resourcesvisible = false;
        this.prebiddatevisible = false;
        this.technologyvisible = false;
        this.finalopeningdatevisible = false;
        this.openingdatevisible = false;
        this.campaignidvisible = false;
        this.tenderpublishdatevisible = false;
        this.submissiondatevisible = false;
        this.monthlybillingvisible = false;
    }

    onDelete() {
        let opportunityid = this.lmsopportunity_Form.get('opportunityid').value;
        if (opportunityid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmsopportunity_service.delete_lmsopportunity(opportunityid).then(res => {
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
        this.lmsopportunity_Form.patchValue({
            opportunityid: null
        });
        if (this.formData.opportunityid != null) this.formData.opportunityid = null;
        for (let i = 0; i < this.tbl_lmsopportunityproducts.source.length; i++) {
            this.tbl_lmsopportunityproducts.source[i].opportunityproductid = null;
        }
        for (let i = 0; i < this.tbl_lmscalls.source.length; i++) {
            this.tbl_lmscalls.source[i].callid = null;
        }
        for (let i = 0; i < this.tbl_lmssecondarycontacts.source.length; i++) {
            this.tbl_lmssecondarycontacts.source[i].secondarycontactid = null;
        }
        for (let i = 0; i < this.tbl_lmsreminders.source.length; i++) {
            this.tbl_lmsreminders.source[i].reminderid = null;
        }
        for (let i = 0; i < this.tbl_lmsquotes.source.length; i++) {
            this.tbl_lmsquotes.source[i].quoteid = null;
        }
        for (let i = 0; i < this.tbl_boexpenses.source.length; i++) {
            this.tbl_boexpenses.source[i].expenseid = null;
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
                    else if (key == "tenderpublishdate")
                        this.lmsopportunity_Form.patchValue({ "tenderpublishdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "prebiddate")
                        this.lmsopportunity_Form.patchValue({ "prebiddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "submissiondate")
                        this.lmsopportunity_Form.patchValue({ "submissiondate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "openingdate")
                        this.lmsopportunity_Form.patchValue({ "openingdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "finalopeningdate")
                        this.lmsopportunity_Form.patchValue({ "finalopeningdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "otherdate1")
                        this.lmsopportunity_Form.patchValue({ "otherdate1": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "otherdate2")
                        this.lmsopportunity_Form.patchValue({ "otherdate2": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "otherdate3")
                        this.lmsopportunity_Form.patchValue({ "otherdate3": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "creationdate")
                        this.lmsopportunity_Form.patchValue({ "creationdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "assignedto")
                        this.lmsopportunity_Form.patchValue({ "assignedto": mainscreendata[key] });
                    else if (key == "expectedclosuredate")
                        this.lmsopportunity_Form.patchValue({ "expectedclosuredate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "notes")
                        this.lmsopportunity_Form.patchValue({ "notes": mainscreendata[key] });
                    else if (key == "closeddate")
                        this.lmsopportunity_Form.patchValue({ "closeddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "lastcontactdate")
                        this.lmsopportunity_Form.patchValue({ "lastcontactdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmsopportunity_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmsopportunity_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmsopportunity_Form.controls[key] != undefined) {
                                this.lmsopportunity_Form.controls[key].disable({ onlySelf: true });
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
        this.lmsopportunity_Form.patchValue({ leadiddesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunityid_onChange(evt: any) {
        let e = evt.value;
    }
    leadby_onChange(evt: any) {
        let e = evt.value;
    }
    opportunitytype_onChange(evt: any) {
        let e = this.f.opportunitytype.value as any;
        this.monthlybillingvisible = false;
        if (this.f.opportunitytype.value == 'O') this.monthlybillingvisible = true;
        this.lmsopportunity_Form.patchValue({ opportunitytypedesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunitystage_onChange(evt: any) {
        let e = evt.value;
        this.dealvaluevisible = false;
        if (this.f.opportunitystage.value == 'W') this.dealvaluevisible = true;
        this.lmsopportunity_Form.patchValue({ opportunitystagedesc: evt.options[evt.options.selectedIndex].text });
        setTimeout(() => {
            if (this.f.opportunitystage.value && this.f.opportunitystage.value != "" && this.f.opportunitystage.value != null) this.lmsopportunity_service.getList_stagesubcategory(this.f.opportunitystage.value).then(res => this.stagesubcategory_List = res as DropDownValues[]);
        });
    }
    stagesubcategory_onChange(evt: any) {
        let e = evt.value;
        this.lmsopportunity_Form.patchValue({ stagesubcategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunitysize_onChange(evt: any) {
        let e = this.f.opportunitysize.value as any;
        this.lmsopportunity_Form.patchValue({ opportunitysizedesc: evt.options[evt.options.selectedIndex].text });
    }
    nextstep_onChange(evt: any) {
        let e = this.f.nextstep.value as any;
        this.lmsopportunity_Form.patchValue({ nextstepdesc: evt.options[evt.options.selectedIndex].text });
    }
    possibilityofclosure_onChange(evt: any) {
        let e = this.f.possibilityofclosure.value as any;
        this.lmsopportunity_Form.patchValue({ possibilityofclosuredesc: evt.options[evt.options.selectedIndex].text });
    }
    leadsource_onChange(evt: any) {
        let e = this.f.leadsource.value as any;
        this.lmsopportunity_Form.patchValue({ leadsourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    budget_onChange(evt: any) {
        let e = this.f.budget.value as any;
        this.lmsopportunity_Form.patchValue({ budgetdesc: evt.options[evt.options.selectedIndex].text });
    }
    criticality_onChange(evt: any) {
        let e = this.f.criticality.value as any;
        this.lmsopportunity_Form.patchValue({ criticalitydesc: evt.options[evt.options.selectedIndex].text });
    }
    priority_onChange(evt: any) {
        let e = this.f.priority.value as any;
        this.lmsopportunity_Form.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    campaignid_onChange(evt: any) {
        let e = evt.value;
        this.lmsopportunity_Form.patchValue({ campaigniddesc: evt.options[evt.options.selectedIndex].text });
    }
    territory_onChange(evt: any) {
        let e = this.f.territory.value as any;
        this.lmsopportunity_Form.patchValue({ territorydesc: evt.options[evt.options.selectedIndex].text });
    }
    reasonforloss_onChange(evt: any) {
        let e = this.f.reasonforloss.value as any;
        this.lmsopportunity_Form.patchValue({ reasonforlossdesc: evt.options[evt.options.selectedIndex].text });
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



    edit_lmsopportunities() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }



    async PopulateScreen(pkcol: any) {
        this.spinner.show();
        this.lmsopportunity_service.get_lmsopportunities_ByEID(pkcol).then(res => {
            this.spinner.hide();

            this.formData = res.lmsopportunity;
            let formproperty = res.lmsopportunity.formproperty;
            if (formproperty && formproperty.edit == false) this.showview = true;
            this.pkcol = res.lmsopportunity.pkcol;
            this.formid = res.lmsopportunity.opportunityid;
            this.FillData(res);
        }).catch((err) => { console.log(err); });
    }

    FillData(res: any) {
        this.formData = res.lmsopportunity;
        this.formid = res.lmsopportunity.opportunityid;
        this.pkcol = res.lmsopportunity.pkcol;
        this.bmyrecord = false;
        if ((res.lmsopportunity as any).applicantid == this.sessionService.getItem('applicantid')) this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmsopportunity_Form.patchValue({
            branchid: res.lmsopportunity.branchid,
            leadid: res.lmsopportunity.leadid,
            leadiddesc: res.lmsopportunity.leadiddesc,
            opportunityid: res.lmsopportunity.opportunityid,
            opportunityiddesc: res.lmsopportunity.opportunityiddesc,
            opportunitydetail: res.lmsopportunity.opportunitydetail,
            leadby: res.lmsopportunity.leadby,
            leadbydesc: res.lmsopportunity.leadbydesc,
            opportunitytype: res.lmsopportunity.opportunitytype,
            opportunitytypedesc: res.lmsopportunity.opportunitytypedesc,
            opportunitystage: res.lmsopportunity.opportunitystage,
            opportunitystagedesc: res.lmsopportunity.opportunitystagedesc,
            stagesubcategory: res.lmsopportunity.stagesubcategory,
            stagesubcategorydesc: res.lmsopportunity.stagesubcategorydesc,
            opportunitysize: res.lmsopportunity.opportunitysize,
            opportunitysizedesc: res.lmsopportunity.opportunitysizedesc,
            nextstep: res.lmsopportunity.nextstep,
            nextstepdesc: res.lmsopportunity.nextstepdesc,
            nextstepdetail: res.lmsopportunity.nextstepdetail,
            possibilityofclosure: res.lmsopportunity.possibilityofclosure,
            possibilityofclosuredesc: res.lmsopportunity.possibilityofclosuredesc,
            dealvalue: res.lmsopportunity.dealvalue,
            tenderpublishdate: this.ngbDateParserFormatter.parse(res.lmsopportunity.tenderpublishdate),
            prebiddate: this.ngbDateParserFormatter.parse(res.lmsopportunity.prebiddate),
            submissiondate: this.ngbDateParserFormatter.parse(res.lmsopportunity.submissiondate),
            openingdate: this.ngbDateParserFormatter.parse(res.lmsopportunity.openingdate),
            finalopeningdate: this.ngbDateParserFormatter.parse(res.lmsopportunity.finalopeningdate),
            otherdate1: this.ngbDateParserFormatter.parse(res.lmsopportunity.otherdate1),
            otherdatenotes1: res.lmsopportunity.otherdatenotes1,
            otherdate2: this.ngbDateParserFormatter.parse(res.lmsopportunity.otherdate2),
            otherdatenotes2: res.lmsopportunity.otherdatenotes2,
            otherdate3: this.ngbDateParserFormatter.parse(res.lmsopportunity.otherdate3),
            otherdatenotes3: res.lmsopportunity.otherdatenotes3,
            technology: res.lmsopportunity.technology,
            resources: res.lmsopportunity.resources,
            monthlybilling: res.lmsopportunity.monthlybilling,
            requirementdetails: res.lmsopportunity.requirementdetails,
            leadsource: res.lmsopportunity.leadsource,
            leadsourcedesc: res.lmsopportunity.leadsourcedesc,
            creationdate: this.ngbDateParserFormatter.parse(res.lmsopportunity.creationdate),
            budget: res.lmsopportunity.budget,
            budgetdesc: res.lmsopportunity.budgetdesc,
            tat: res.lmsopportunity.tat,
            actualtat: res.lmsopportunity.actualtat,
            assignedto: JSON.parse(res.lmsopportunity.assignedto),
            criticality: res.lmsopportunity.criticality,
            criticalitydesc: res.lmsopportunity.criticalitydesc,
            priority: res.lmsopportunity.priority,
            prioritydesc: res.lmsopportunity.prioritydesc,
            expectedclosuredate: this.ngbDateParserFormatter.parse(res.lmsopportunity.expectedclosuredate),
            expectedvalue: res.lmsopportunity.expectedvalue,
            successrate: res.lmsopportunity.successrate,
            campaignid: res.lmsopportunity.campaignid,
            campaigniddesc: res.lmsopportunity.campaigniddesc,
            notes: JSON.parse(res.lmsopportunity.notes),
            attachment: JSON.parse(res.lmsopportunity.attachment),
            decisionmaker: res.lmsopportunity.decisionmaker,
            territory: res.lmsopportunity.territory,
            territorydesc: res.lmsopportunity.territorydesc,
            competitors: res.lmsopportunity.competitors,
            winner: res.lmsopportunity.winner,
            reasonforloss: res.lmsopportunity.reasonforloss,
            reasonforlossdesc: res.lmsopportunity.reasonforlossdesc,
            closeddate: this.ngbDateParserFormatter.parse(res.lmsopportunity.closeddate),
            contactid: res.lmsopportunity.contactid,
            lastcontactdate: this.ngbDateParserFormatter.parse(res.lmsopportunity.lastcontactdate),
            status: res.lmsopportunity.status,
            statusdesc: res.lmsopportunity.statusdesc,
        });
        this.dealvaluevisible = false;
        this.resourcesvisible = false;
        this.prebiddatevisible = false;
        this.technologyvisible = false;
        this.finalopeningdatevisible = false;
        this.openingdatevisible = false;
        this.campaignidvisible = false;
        this.tenderpublishdatevisible = false;
        this.submissiondatevisible = false;
        this.monthlybillingvisible = false;
        //hide list
        if (res.visiblelist != undefined && res.visiblelist.indexOf("dealvalue") >= 0) this.dealvaluevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("dealvalue") >= 0) this.dealvaluevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("resources") >= 0) this.resourcesvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("resources") >= 0) this.resourcesvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("prebiddate") >= 0) this.prebiddatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("prebiddate") >= 0) this.prebiddatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("technology") >= 0) this.technologyvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("technology") >= 0) this.technologyvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("finalopeningdate") >= 0) this.finalopeningdatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("finalopeningdate") >= 0) this.finalopeningdatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("openingdate") >= 0) this.openingdatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("openingdate") >= 0) this.openingdatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("campaignid") >= 0) this.campaignidvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("campaignid") >= 0) this.campaignidvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("tenderpublishdate") >= 0) this.tenderpublishdatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("tenderpublishdate") >= 0) this.tenderpublishdatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("submissiondate") >= 0) this.submissiondatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("submissiondate") >= 0) this.submissiondatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("monthlybilling") >= 0) this.monthlybillingvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("monthlybilling") >= 0) this.monthlybillingvisible = false;
        this.lmsopportunity_menuactions = res.lmsopportunity_menuactions;
        this.lmsopportunityproduct_menuactions = res.lmsopportunityproduct_menuactions;
        this.lmsopportunityproducts_visiblelist = res.lmsopportunityproducts_visiblelist;
        this.lmscall_menuactions = res.lmscall_menuactions;
        this.lmscalls_visiblelist = res.lmscalls_visiblelist;
        this.lmssecondarycontact_menuactions = res.lmssecondarycontact_menuactions;
        this.lmssecondarycontacts_visiblelist = res.lmssecondarycontacts_visiblelist;
        this.lmsreminder_menuactions = res.lmsreminder_menuactions;
        this.lmsreminders_visiblelist = res.lmsreminders_visiblelist;
        this.lmsquote_menuactions = res.lmsquote_menuactions;
        this.lmsquotes_visiblelist = res.lmsquotes_visiblelist;
        this.boexpense_menuactions = res.boexpense_menuactions;
        this.boexpenses_visiblelist = res.boexpenses_visiblelist;
        if (this.lmsopportunity_Form.get('attachment').value != null && this.lmsopportunity_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined) this.fileattachment.setattachmentlist(this.lmsopportunity_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.opportunitystage.value && this.f.opportunitystage.value != "" && this.f.opportunitystage.value != null) this.lmsopportunity_service.getList_stagesubcategory(this.f.opportunitystage.value).then(res => {
                this.stagesubcategory_List = res as DropDownValues[];
            }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        this.Set_lmsopportunityproducts_TableConfig();
        this.lmsopportunityproducts_LoadTable(res.lmsopportunityproducts);
        this.Set_lmscalls_TableConfig();
        this.lmscalls_LoadTable(res.lmscalls);
        this.Set_lmssecondarycontacts_TableConfig();
        this.lmssecondarycontacts_LoadTable(res.lmssecondarycontacts);
        this.Set_lmsreminders_TableConfig();
        this.lmsreminders_LoadTable(res.lmsreminders);
        this.Set_lmsquotes_TableConfig();
        this.lmsquotes_LoadTable(res.lmsquotes);
        this.Set_boexpenses_TableConfig();
        this.boexpenses_LoadTable(res.boexpenses);
    }

    validate() {
        let ret = true;
        return ret;
    }

    getHtml(html: any) {
        let ret = "";
        ret = html;
        for (let key in this.lmsopportunity_Form.controls) {
            let val = this.lmsopportunity_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined) val = '';
            if (this.lmsopportunity_Form.controls[key] != null) {
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
        if (!this.lmsopportunity_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        var obj = this.lmsopportunity_Form.getRawValue();
        obj.tenderpublishdate = new Date(this.lmsopportunity_Form.get('tenderpublishdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('tenderpublishdate').value) + '  UTC' : null);
        obj.prebiddate = new Date(this.lmsopportunity_Form.get('prebiddate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('prebiddate').value) + '  UTC' : null);
        obj.submissiondate = new Date(this.lmsopportunity_Form.get('submissiondate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('submissiondate').value) + '  UTC' : null);
        obj.openingdate = new Date(this.lmsopportunity_Form.get('openingdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('openingdate').value) + '  UTC' : null);
        obj.finalopeningdate = new Date(this.lmsopportunity_Form.get('finalopeningdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('finalopeningdate').value) + '  UTC' : null);
        obj.otherdate1 = new Date(this.lmsopportunity_Form.get('otherdate1').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('otherdate1').value) + '  UTC' : null);
        obj.otherdate2 = new Date(this.lmsopportunity_Form.get('otherdate2').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('otherdate2').value) + '  UTC' : null);
        obj.otherdate3 = new Date(this.lmsopportunity_Form.get('otherdate3').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('otherdate3').value) + '  UTC' : null);
        obj.creationdate = new Date(this.lmsopportunity_Form.get('creationdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('creationdate').value) + '  UTC' : null);
        if (this.lmsopportunity_Form.get('assignedto').value != null) obj.assignedto = JSON.stringify(this.lmsopportunity_Form.get('assignedto').value);
        obj.expectedclosuredate = new Date(this.lmsopportunity_Form.get('expectedclosuredate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('expectedclosuredate').value) + '  UTC' : null);
        if (this.lmsopportunity_Form.get('notes').value != null) obj.notes = JSON.stringify(this.lmsopportunity_Form.get('notes').value);
        obj.closeddate = new Date(this.lmsopportunity_Form.get('closeddate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('closeddate').value) + '  UTC' : null);
        obj.lastcontactdate = new Date(this.lmsopportunity_Form.get('lastcontactdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('lastcontactdate').value) + '  UTC' : null);
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
        // Object.keys(this.lmsopportunity_Form.controls).forEach(key => {
        //     const controlErrors: ValidationErrors = this.lmsopportunity_Form.get(key).errors;
        //     if (controlErrors != null) {
        //         Object.keys(controlErrors).forEach(keyError => {
        //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
        //         });
        //     }
        // });
        if (strError != "") return this.sharedService.alert(strError);


        if (!this.lmsopportunity_Form.valid) {
            this.toastr.addSingle("error", "", "Enter the required fields");
            return;
        }
        if (!this.validate()) {
            return;
        }
        this.formData = this.lmsopportunity_Form.getRawValue();
        if (this.dynamicconfig.data != null) {
            for (let key in this.dynamicconfig.data) {
                if (key != 'visiblelist' && key != 'hidelist') {
                    if (this.lmsopportunity_Form.controls[key] != null) {
                        this.formData[key] = this.lmsopportunity_Form.controls[key].value;
                    }
                }
            }
        }
        this.formData.tenderpublishdate = new Date(this.lmsopportunity_Form.get('tenderpublishdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('tenderpublishdate').value) + '  UTC' : null);
        this.formData.prebiddate = new Date(this.lmsopportunity_Form.get('prebiddate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('prebiddate').value) + '  UTC' : null);
        this.formData.submissiondate = new Date(this.lmsopportunity_Form.get('submissiondate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('submissiondate').value) + '  UTC' : null);
        this.formData.openingdate = new Date(this.lmsopportunity_Form.get('openingdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('openingdate').value) + '  UTC' : null);
        this.formData.finalopeningdate = new Date(this.lmsopportunity_Form.get('finalopeningdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('finalopeningdate').value) + '  UTC' : null);
        this.formData.otherdate1 = new Date(this.lmsopportunity_Form.get('otherdate1').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('otherdate1').value) + '  UTC' : null);
        this.formData.otherdate2 = new Date(this.lmsopportunity_Form.get('otherdate2').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('otherdate2').value) + '  UTC' : null);
        this.formData.otherdate3 = new Date(this.lmsopportunity_Form.get('otherdate3').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('otherdate3').value) + '  UTC' : null);
        this.formData.creationdate = new Date(this.lmsopportunity_Form.get('creationdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('creationdate').value) + '  UTC' : null);
        if (this.lmsopportunity_Form.get('assignedto').value != null) this.formData.assignedto = JSON.stringify(this.lmsopportunity_Form.get('assignedto').value);
        this.formData.expectedclosuredate = new Date(this.lmsopportunity_Form.get('expectedclosuredate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('expectedclosuredate').value) + '  UTC' : null);
        if (this.lmsopportunity_Form.get('notes').value != null) this.formData.notes = JSON.stringify(this.lmsopportunity_Form.get('notes').value);
        if (this.fileattachment.getAttachmentList() != null) this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
        this.formData.closeddate = new Date(this.lmsopportunity_Form.get('closeddate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('closeddate').value) + '  UTC' : null);
        this.formData.lastcontactdate = new Date(this.lmsopportunity_Form.get('lastcontactdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('lastcontactdate').value) + '  UTC' : null);
        this.formData.Deleted_lmsopportunityproduct_IDs = this.Deleted_lmsopportunityproduct_IDs;
        this.formData.Deleted_lmscall_IDs = this.Deleted_lmscall_IDs;
        this.formData.Deleted_lmssecondarycontact_IDs = this.Deleted_lmssecondarycontact_IDs;
        this.formData.Deleted_lmsreminder_IDs = this.Deleted_lmsreminder_IDs;
        this.formData.Deleted_lmsquote_IDs = this.Deleted_lmsquote_IDs;
        this.formData.Deleted_boexpense_IDs = this.Deleted_boexpense_IDs;
        this.fileAttachmentList = this.fileattachment.getAllFiles();
        console.log(this.formData);
        this.spinner.show();
        this.lmsopportunity_service.saveOrUpdate_lmsopportunities(this.formData, this.tbl_lmsopportunityproducts?.source?.data, this.tbl_lmscalls?.source?.data, this.tbl_lmssecondarycontacts?.source?.data, this.tbl_lmsreminders?.source?.data, this.tbl_lmsquotes?.source?.data, this.tbl_boexpenses?.source?.data,).subscribe(
            async res => {
                await this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment) this.fileattachment.clear();
                if (this.tbl_lmsopportunityproducts.source) {
                    for (let i = 0; i < this.tbl_lmsopportunityproducts.source.data.length; i++) {
                        if (this.tbl_lmsopportunityproducts.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmsopportunityproducts.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmscalls.source) {
                    for (let i = 0; i < this.tbl_lmscalls.source.data.length; i++) {
                        if (this.tbl_lmscalls.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmscalls.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmssecondarycontacts.source) {
                    for (let i = 0; i < this.tbl_lmssecondarycontacts.source.data.length; i++) {
                        if (this.tbl_lmssecondarycontacts.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmssecondarycontacts.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmsreminders.source) {
                    for (let i = 0; i < this.tbl_lmsreminders.source.data.length; i++) {
                        if (this.tbl_lmsreminders.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmsreminders.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmsquotes.source) {
                    for (let i = 0; i < this.tbl_lmsquotes.source.data.length; i++) {
                        if (this.tbl_lmsquotes.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_lmsquotes.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_boexpenses.source) {
                    for (let i = 0; i < this.tbl_boexpenses.source.data.length; i++) {
                        if (this.tbl_boexpenses.source.data[i].fileAttachmentList) await this.sharedService.upload(this.tbl_boexpenses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push((res as any).lmsopportunity);
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
                        this.objvalues.push((res as any).lmsopportunity);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsopportunity_Form.markAsUntouched();
                this.lmsopportunity_Form.markAsPristine();
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
        this.tbl_lmsopportunityproducts.source = new LocalDataSource();
        this.tbl_lmscalls.source = new LocalDataSource();
        this.tbl_lmssecondarycontacts.source = new LocalDataSource();
        this.tbl_lmsreminders.source = new LocalDataSource();
        this.tbl_lmsquotes.source = new LocalDataSource();
        this.tbl_boexpenses.source = new LocalDataSource();
    }

    AddOrEdit_lmsopportunityproduct(event: any, opportunityproductid: any, opportunityid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmsopportunityproductComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, opportunityproductid, opportunityid, visiblelist: this.lmsopportunityproducts_visiblelist, hidelist: this.lmsopportunityproducts_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmsopportunityproducts.source.add(res[i]);
                    }
                    this.tbl_lmsopportunityproducts.source.refresh();
                }
                else {
                    this.tbl_lmsopportunityproducts.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmsopportunityproduct(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmsopportunityproduct_IDs += childID + ",";
        this.tbl_lmsopportunityproducts.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_lmscall(event: any, callid: any, opportunityid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmscallComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, callid, opportunityid, visiblelist: this.lmscalls_visiblelist, hidelist: this.lmscalls_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmscalls.source.add(res[i]);
                    }
                    this.tbl_lmscalls.source.refresh();
                }
                else {
                    this.tbl_lmscalls.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmscall(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmscall_IDs += childID + ",";
        this.tbl_lmscalls.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_lmssecondarycontact(event: any, secondarycontactid: any, opportunityid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmssecondarycontactComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, secondarycontactid, opportunityid, visiblelist: this.lmssecondarycontacts_visiblelist, hidelist: this.lmssecondarycontacts_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmssecondarycontacts.source.add(res[i]);
                    }
                    this.tbl_lmssecondarycontacts.source.refresh();
                }
                else {
                    this.tbl_lmssecondarycontacts.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmssecondarycontact(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmssecondarycontact_IDs += childID + ",";
        this.tbl_lmssecondarycontacts.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_lmsreminder(event: any, reminderid: any, opportunityid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmsreminderComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, reminderid, opportunityid, visiblelist: this.lmsreminders_visiblelist, hidelist: this.lmsreminders_hidelist, ScreenType: 2 },
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

    AddOrEdit_lmsquote(event: any, quoteid: any, opportunityid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(lmsquoteComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, quoteid, opportunityid, visiblelist: this.lmsquotes_visiblelist, hidelist: this.lmsquotes_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmsquotes.source.add(res[i]);
                    }
                    this.tbl_lmsquotes.source.refresh();
                }
                else {
                    this.tbl_lmsquotes.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_lmsquote(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_lmsquote_IDs += childID + ",";
        this.tbl_lmsquotes.source.splice(i, 1);
        //this.updateGrandTotal();
    }

    AddOrEdit_boexpense(event: any, expenseid: any, opportunityid: any) {
        let add = false;
        if (event == null) add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null) childsave = true;
        this.dialog.open(boexpenseComponent,
            {
                data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, expenseid, opportunityid, visiblelist: this.boexpenses_visiblelist, hidelist: this.boexpenses_hidelist, ScreenType: 2 },
            }
        ).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boexpenses.source.add(res[i]);
                    }
                    this.tbl_boexpenses.source.refresh();
                }
                else {
                    this.tbl_boexpenses.source.update(event.data, res[0]);
                }
            }
        });
    }

    onDelete_boexpense(event: any, childID: number, i: number) {
        if (childID != null)
            this.Deleted_boexpense_IDs += childID + ",";
        this.tbl_boexpenses.source.splice(i, 1);
        //this.updateGrandTotal();
    }


    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes lmsopportunityproducts
    lmsopportunityproducts_settings: any;

    show_lmsopportunityproducts_Checkbox() {
        debugger;
        if (this.tbl_lmsopportunityproducts.source.settings['selectMode'] == 'multi') this.tbl_lmsopportunityproducts.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsopportunityproducts.source.settings['selectMode'] = 'multi';
        this.tbl_lmsopportunityproducts.source.initGrid();
    }
    delete_lmsopportunityproducts_All() {
        this.tbl_lmsopportunityproducts.source.settings['selectMode'] = 'single';
    }
    show_lmsopportunityproducts_Filter() {
        setTimeout(() => {
            //  this.Set_lmsopportunityproducts_TableDropDownConfig();
        });
        if (this.tbl_lmsopportunityproducts.source.settings != null) this.tbl_lmsopportunityproducts.source.settings['hideSubHeader'] = !this.tbl_lmsopportunityproducts.source.settings['hideSubHeader'];
        this.tbl_lmsopportunityproducts.source.initGrid();
    }
    show_lmsopportunityproducts_InActive() {
    }
    enable_lmsopportunityproducts_InActive() {
    }
    async Set_lmsopportunityproducts_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmsopportunityproducts) {

            var clone = this.sharedService.clone(this.tbl_lmsopportunityproducts.source.settings);
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_opportunityid.value)), }, };
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_opportunityid.value)), }, };
            this.tbl_lmsopportunityproducts.source.settings = clone;
            this.tbl_lmsopportunityproducts.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsopportunityproducts.source.settings);
            if (clone.columns['productid'] != undefined) clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_productid.value)), }, };
            if (clone.columns['productid'] != undefined) clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_productid.value)), }, };
            this.tbl_lmsopportunityproducts.source.settings = clone;
            this.tbl_lmsopportunityproducts.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsopportunityproducts.source.settings);
            if (clone.columns['uom'] != undefined) clone.columns['uom'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_uom.value)), }, };
            if (clone.columns['uom'] != undefined) clone.columns['uom'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_uom.value)), }, };
            this.tbl_lmsopportunityproducts.source.settings = clone;
            this.tbl_lmsopportunityproducts.source.initGrid();
        }
        this.bfilterPopulate_lmsopportunityproducts = true;
    }
    async lmsopportunityproducts_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmsopportunityproducts_TableConfig() {
        this.lmsopportunityproducts_settings = {
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
                custom: this.lmsopportunityproduct_menuactions
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
                branchid: {
                    title: 'Branch',
                    type: 'number',
                    filter: true,
                },
                leadid: {
                    title: 'Lead',
                    type: 'number',
                    filter: true,
                },
                campaignid: {
                    title: 'Campaign',
                    type: 'number',
                    filter: true,
                },
                productiddesc: {
                    title: 'Product',
                    type: 'html',
                    filter: true,
                },
                quantity: {
                    title: 'Quantity',
                    type: 'number',
                    filter: true,
                },
                uomdesc: {
                    title: 'U O M',
                    type: 'html',
                    filter: true,
                },
                price: {
                    title: 'Price',
                    type: 'number',
                    filter: true,
                },
                totalprice: {
                    title: 'Total Price',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    lmsopportunityproducts_LoadTable(lmsopportunityproducts = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsopportunityproducts_ID) >= 0) {
            if (this.tbl_lmsopportunityproducts != undefined) this.tbl_lmsopportunityproducts.source = new LocalDataSource();
            if (this.tbl_lmsopportunityproducts != undefined) this.tbl_lmsopportunityproducts.source.load(lmsopportunityproducts as any as LocalDataSource);
            if (this.tbl_lmsopportunityproducts != undefined) this.tbl_lmsopportunityproducts.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    lmsopportunityproducts_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsopportunity_service.lmsopportunityproducts.length == 0)
    {
        this.tbl_lmsopportunityproducts.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmsopportunityproduct();
        this.lmsopportunity_service.lmsopportunityproducts.push(obj);
        this.tbl_lmsopportunityproducts.source.refresh();
        if ((this.lmsopportunity_service.lmsopportunityproducts.length / this.tbl_lmsopportunityproducts.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsopportunityproducts.source.getPaging().page)
        {
            this.tbl_lmsopportunityproducts.source.setPage((this.lmsopportunity_service.lmsopportunityproducts.length / this.tbl_lmsopportunityproducts.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmsopportunityproducts.source.grid.edit(this.tbl_lmsopportunityproducts.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmsopportunityproducts.source.data.indexOf(event.data);
    this.onDelete_lmsopportunityproduct(event,event.data.opportunityproductid,((this.tbl_lmsopportunityproducts.source.getPaging().page-1) *this.tbl_lmsopportunityproducts.source.getPaging().perPage)+index);
    this.tbl_lmsopportunityproducts.source.refresh();
    break;
    }
    }
    
    */
    lmsopportunityproducts_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmsopportunityproduct(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmsopportunityproduct(event, event.data.opportunityproductid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmsopportunityproduct(event, event.data.opportunityproductid, ((this.tbl_lmsopportunityproducts.source.getPaging().page - 1) * this.tbl_lmsopportunityproducts.source.getPaging().perPage) + event.index);
                this.tbl_lmsopportunityproducts.source.refresh();
                break;
        }
    }
    lmsopportunityproducts_onDelete(obj) {
        let opportunityproductid = obj.data.opportunityproductid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsopportunity_service.delete_lmsopportunity(opportunityproductid).then(res =>
                this.lmsopportunityproducts_LoadTable()
            );
        }
    }
    async onCustom_lmsopportunityproducts_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsopportunityproducts");
        let formname = (objbomenuaction as any).actionname;




    }
    lmsopportunityproducts_Paging(val) {
        debugger;
        this.tbl_lmsopportunityproducts.source.setPaging(1, val, true);
    }

    handle_lmsopportunityproducts_GridSelected(event: any) {
        this.lmsopportunityproducts_selectedindex = this.tbl_lmsopportunityproducts.source.findIndex(i => i.opportunityproductid === event.data.opportunityproductid);
    }
    Is_lmsopportunityproducts_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsopportunityproducts_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmsopportunityproducts
    //start of Grid Codes lmscalls
    lmscalls_settings: any;

    show_lmscalls_Checkbox() {
        debugger;
        if (this.tbl_lmscalls.source.settings['selectMode'] == 'multi') this.tbl_lmscalls.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmscalls.source.settings['selectMode'] = 'multi';
        this.tbl_lmscalls.source.initGrid();
    }
    delete_lmscalls_All() {
        this.tbl_lmscalls.source.settings['selectMode'] = 'single';
    }
    show_lmscalls_Filter() {
        setTimeout(() => {
            //  this.Set_lmscalls_TableDropDownConfig();
        });
        if (this.tbl_lmscalls.source.settings != null) this.tbl_lmscalls.source.settings['hideSubHeader'] = !this.tbl_lmscalls.source.settings['hideSubHeader'];
        this.tbl_lmscalls.source.initGrid();
    }
    show_lmscalls_InActive() {
    }
    enable_lmscalls_InActive() {
    }
    async Set_lmscalls_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmscalls) {

            var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_branchid.value)), }, };
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_branchid.value)), }, };
            this.tbl_lmscalls.source.settings = clone;
            this.tbl_lmscalls.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
            if (clone.columns['leadid'] != undefined) clone.columns['leadid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadid.value)), }, };
            if (clone.columns['leadid'] != undefined) clone.columns['leadid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadid.value)), }, };
            this.tbl_lmscalls.source.settings = clone;
            this.tbl_lmscalls.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_opportunityid.value)), }, };
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_opportunityid.value)), }, };
            this.tbl_lmscalls.source.settings = clone;
            this.tbl_lmscalls.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
            if (clone.columns['callid'] != undefined) clone.columns['callid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_callid.value)), }, };
            if (clone.columns['callid'] != undefined) clone.columns['callid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_callid.value)), }, };
            this.tbl_lmscalls.source.settings = clone;
            this.tbl_lmscalls.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
            if (clone.columns['campaignid'] != undefined) clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_campaignid.value)), }, };
            if (clone.columns['campaignid'] != undefined) clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_campaignid.value)), }, };
            this.tbl_lmscalls.source.settings = clone;
            this.tbl_lmscalls.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
            if (clone.columns['leadby'] != undefined) clone.columns['leadby'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadby.value)), }, };
            if (clone.columns['leadby'] != undefined) clone.columns['leadby'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadby.value)), }, };
            this.tbl_lmscalls.source.settings = clone;
            this.tbl_lmscalls.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
            if (clone.columns['currentowner'] != undefined) clone.columns['currentowner'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_currentowner.value)), }, };
            if (clone.columns['currentowner'] != undefined) clone.columns['currentowner'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_currentowner.value)), }, };
            this.tbl_lmscalls.source.settings = clone;
            this.tbl_lmscalls.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
            if (clone.columns['activitytype'] != undefined) clone.columns['activitytype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_activitytype.value)), }, };
            if (clone.columns['activitytype'] != undefined) clone.columns['activitytype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_activitytype.value)), }, };
            this.tbl_lmscalls.source.settings = clone;
            this.tbl_lmscalls.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
            if (clone.columns['nextaction'] != undefined) clone.columns['nextaction'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_nextaction.value)), }, };
            if (clone.columns['nextaction'] != undefined) clone.columns['nextaction'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_nextaction.value)), }, };
            this.tbl_lmscalls.source.settings = clone;
            this.tbl_lmscalls.source.initGrid();
        }
        this.bfilterPopulate_lmscalls = true;
    }
    async lmscalls_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmscalls_TableConfig() {
        this.lmscalls_settings = {
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
                eventdate: {
                    title: 'Event Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                activitytypedesc: {
                    title: 'Activity Type',
                    type: 'html',
                    filter: true,
                },
                attendedusers: {
                    title: 'Attended Users',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
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
                score: {
                    title: 'Score',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    lmscalls_LoadTable(lmscalls = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscalls_ID) >= 0) {
            if (this.tbl_lmscalls != undefined) this.tbl_lmscalls.source = new LocalDataSource();
            if (this.tbl_lmscalls != undefined) this.tbl_lmscalls.source.load(lmscalls as any as LocalDataSource);
            if (this.tbl_lmscalls != undefined) this.tbl_lmscalls.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    lmscalls_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsopportunity_service.lmscalls.length == 0)
    {
        this.tbl_lmscalls.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmscall();
        this.lmsopportunity_service.lmscalls.push(obj);
        this.tbl_lmscalls.source.refresh();
        if ((this.lmsopportunity_service.lmscalls.length / this.tbl_lmscalls.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscalls.source.getPaging().page)
        {
            this.tbl_lmscalls.source.setPage((this.lmsopportunity_service.lmscalls.length / this.tbl_lmscalls.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmscalls.source.grid.edit(this.tbl_lmscalls.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmscalls.source.data.indexOf(event.data);
    this.onDelete_lmscall(event,event.data.callid,((this.tbl_lmscalls.source.getPaging().page-1) *this.tbl_lmscalls.source.getPaging().perPage)+index);
    this.tbl_lmscalls.source.refresh();
    break;
    }
    }
    
    */
    lmscalls_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmscall(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmscall(event, event.data.callid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmscall(event, event.data.callid, ((this.tbl_lmscalls.source.getPaging().page - 1) * this.tbl_lmscalls.source.getPaging().perPage) + event.index);
                this.tbl_lmscalls.source.refresh();
                break;
        }
    }
    lmscalls_onDelete(obj) {
        let callid = obj.data.callid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsopportunity_service.delete_lmsopportunity(callid).then(res =>
                this.lmscalls_LoadTable()
            );
        }
    }
    async onCustom_lmscalls_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmscalls");
        let formname = (objbomenuaction as any).actionname;




    }
    lmscalls_Paging(val) {
        debugger;
        this.tbl_lmscalls.source.setPaging(1, val, true);
    }

    handle_lmscalls_GridSelected(event: any) {
        this.lmscalls_selectedindex = this.tbl_lmscalls.source.findIndex(i => i.callid === event.data.callid);
    }
    Is_lmscalls_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscalls_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmscalls
    //start of Grid Codes lmssecondarycontacts
    lmssecondarycontacts_settings: any;

    show_lmssecondarycontacts_Checkbox() {
        debugger;
        if (this.tbl_lmssecondarycontacts.source.settings['selectMode'] == 'multi') this.tbl_lmssecondarycontacts.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmssecondarycontacts.source.settings['selectMode'] = 'multi';
        this.tbl_lmssecondarycontacts.source.initGrid();
    }
    delete_lmssecondarycontacts_All() {
        this.tbl_lmssecondarycontacts.source.settings['selectMode'] = 'single';
    }
    show_lmssecondarycontacts_Filter() {
        setTimeout(() => {
            //  this.Set_lmssecondarycontacts_TableDropDownConfig();
        });
        if (this.tbl_lmssecondarycontacts.source.settings != null) this.tbl_lmssecondarycontacts.source.settings['hideSubHeader'] = !this.tbl_lmssecondarycontacts.source.settings['hideSubHeader'];
        this.tbl_lmssecondarycontacts.source.initGrid();
    }
    show_lmssecondarycontacts_InActive() {
    }
    enable_lmssecondarycontacts_InActive() {
    }
    async Set_lmssecondarycontacts_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmssecondarycontacts) {

            var clone = this.sharedService.clone(this.tbl_lmssecondarycontacts.source.settings);
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_branchid.value)), }, };
            if (clone.columns['branchid'] != undefined) clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_branchid.value)), }, };
            this.tbl_lmssecondarycontacts.source.settings = clone;
            this.tbl_lmssecondarycontacts.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmssecondarycontacts.source.settings);
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_opportunityid.value)), }, };
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_opportunityid.value)), }, };
            this.tbl_lmssecondarycontacts.source.settings = clone;
            this.tbl_lmssecondarycontacts.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmssecondarycontacts.source.settings);
            if (clone.columns['secondarycontactid'] != undefined) clone.columns['secondarycontactid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_secondarycontactid.value)), }, };
            if (clone.columns['secondarycontactid'] != undefined) clone.columns['secondarycontactid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_secondarycontactid.value)), }, };
            this.tbl_lmssecondarycontacts.source.settings = clone;
            this.tbl_lmssecondarycontacts.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmssecondarycontacts.source.settings);
            if (clone.columns['campaignid'] != undefined) clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_campaignid.value)), }, };
            if (clone.columns['campaignid'] != undefined) clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_campaignid.value)), }, };
            this.tbl_lmssecondarycontacts.source.settings = clone;
            this.tbl_lmssecondarycontacts.source.initGrid();
        }
        this.bfilterPopulate_lmssecondarycontacts = true;
    }
    async lmssecondarycontacts_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmssecondarycontacts_TableConfig() {
        this.lmssecondarycontacts_settings = {
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
                custom: this.lmssecondarycontact_menuactions
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
                branchiddesc: {
                    title: 'Branch',
                    type: 'html',
                    filter: true,
                },
                leadid: {
                    title: 'Lead',
                    type: 'number',
                    filter: true,
                },
                campaigniddesc: {
                    title: 'Campaign',
                    type: 'html',
                    filter: true,
                },
                secondarycontact: {
                    title: 'Secondary Contact',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    lmssecondarycontacts_LoadTable(lmssecondarycontacts = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmssecondarycontacts_ID) >= 0) {
            if (this.tbl_lmssecondarycontacts != undefined) this.tbl_lmssecondarycontacts.source = new LocalDataSource();
            if (this.tbl_lmssecondarycontacts != undefined) this.tbl_lmssecondarycontacts.source.load(lmssecondarycontacts as any as LocalDataSource);
            if (this.tbl_lmssecondarycontacts != undefined) this.tbl_lmssecondarycontacts.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    lmssecondarycontacts_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsopportunity_service.lmssecondarycontacts.length == 0)
    {
        this.tbl_lmssecondarycontacts.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmssecondarycontact();
        this.lmsopportunity_service.lmssecondarycontacts.push(obj);
        this.tbl_lmssecondarycontacts.source.refresh();
        if ((this.lmsopportunity_service.lmssecondarycontacts.length / this.tbl_lmssecondarycontacts.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmssecondarycontacts.source.getPaging().page)
        {
            this.tbl_lmssecondarycontacts.source.setPage((this.lmsopportunity_service.lmssecondarycontacts.length / this.tbl_lmssecondarycontacts.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmssecondarycontacts.source.grid.edit(this.tbl_lmssecondarycontacts.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmssecondarycontacts.source.data.indexOf(event.data);
    this.onDelete_lmssecondarycontact(event,event.data.secondarycontactid,((this.tbl_lmssecondarycontacts.source.getPaging().page-1) *this.tbl_lmssecondarycontacts.source.getPaging().perPage)+index);
    this.tbl_lmssecondarycontacts.source.refresh();
    break;
    }
    }
    
    */
    lmssecondarycontacts_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmssecondarycontact(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmssecondarycontact(event, event.data.secondarycontactid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmssecondarycontact(event, event.data.secondarycontactid, ((this.tbl_lmssecondarycontacts.source.getPaging().page - 1) * this.tbl_lmssecondarycontacts.source.getPaging().perPage) + event.index);
                this.tbl_lmssecondarycontacts.source.refresh();
                break;
        }
    }
    lmssecondarycontacts_onDelete(obj) {
        let secondarycontactid = obj.data.secondarycontactid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsopportunity_service.delete_lmsopportunity(secondarycontactid).then(res =>
                this.lmssecondarycontacts_LoadTable()
            );
        }
    }
    async onCustom_lmssecondarycontacts_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmssecondarycontacts");
        let formname = (objbomenuaction as any).actionname;




    }
    lmssecondarycontacts_Paging(val) {
        debugger;
        this.tbl_lmssecondarycontacts.source.setPaging(1, val, true);
    }

    handle_lmssecondarycontacts_GridSelected(event: any) {
        this.lmssecondarycontacts_selectedindex = this.tbl_lmssecondarycontacts.source.findIndex(i => i.secondarycontactid === event.data.secondarycontactid);
    }
    Is_lmssecondarycontacts_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmssecondarycontacts_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmssecondarycontacts
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
    if (this.lmsopportunity_service.lmsreminders.length == 0)
    {
        this.tbl_lmsreminders.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmsreminder();
        this.lmsopportunity_service.lmsreminders.push(obj);
        this.tbl_lmsreminders.source.refresh();
        if ((this.lmsopportunity_service.lmsreminders.length / this.tbl_lmsreminders.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsreminders.source.getPaging().page)
        {
            this.tbl_lmsreminders.source.setPage((this.lmsopportunity_service.lmsreminders.length / this.tbl_lmsreminders.source.getPaging().perPage).toFixed(0) + 1);
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
            this.lmsopportunity_service.delete_lmsopportunity(reminderid).then(res =>
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
    //start of Grid Codes lmsquotes
    lmsquotes_settings: any;

    show_lmsquotes_Checkbox() {
        debugger;
        if (this.tbl_lmsquotes.source.settings['selectMode'] == 'multi') this.tbl_lmsquotes.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsquotes.source.settings['selectMode'] = 'multi';
        this.tbl_lmsquotes.source.initGrid();
    }
    delete_lmsquotes_All() {
        this.tbl_lmsquotes.source.settings['selectMode'] = 'single';
    }
    show_lmsquotes_Filter() {
        setTimeout(() => {
            //  this.Set_lmsquotes_TableDropDownConfig();
        });
        if (this.tbl_lmsquotes.source.settings != null) this.tbl_lmsquotes.source.settings['hideSubHeader'] = !this.tbl_lmsquotes.source.settings['hideSubHeader'];
        this.tbl_lmsquotes.source.initGrid();
    }
    show_lmsquotes_InActive() {
    }
    enable_lmsquotes_InActive() {
    }
    async Set_lmsquotes_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_lmsquotes) {

            var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_opportunityid.value)), }, };
            if (clone.columns['opportunityid'] != undefined) clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_opportunityid.value)), }, };
            this.tbl_lmsquotes.source.settings = clone;
            this.tbl_lmsquotes.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
            if (clone.columns['currency'] != undefined) clone.columns['currency'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_currency.value)), }, };
            if (clone.columns['currency'] != undefined) clone.columns['currency'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_currency.value)), }, };
            this.tbl_lmsquotes.source.settings = clone;
            this.tbl_lmsquotes.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
            if (clone.columns['taxid'] != undefined) clone.columns['taxid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_taxid.value)), }, };
            if (clone.columns['taxid'] != undefined) clone.columns['taxid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_taxid.value)), }, };
            this.tbl_lmsquotes.source.settings = clone;
            this.tbl_lmsquotes.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
            if (clone.columns['paymenttermid'] != undefined) clone.columns['paymenttermid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_paymenttermid.value)), }, };
            if (clone.columns['paymenttermid'] != undefined) clone.columns['paymenttermid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_paymenttermid.value)), }, };
            this.tbl_lmsquotes.source.settings = clone;
            this.tbl_lmsquotes.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
            if (clone.columns['termid'] != undefined) clone.columns['termid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_termid.value)), }, };
            if (clone.columns['termid'] != undefined) clone.columns['termid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_termid.value)), }, };
            this.tbl_lmsquotes.source.settings = clone;
            this.tbl_lmsquotes.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
            if (clone.columns['leadsource'] != undefined) clone.columns['leadsource'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_leadsource.value)), }, };
            if (clone.columns['leadsource'] != undefined) clone.columns['leadsource'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_leadsource.value)), }, };
            this.tbl_lmsquotes.source.settings = clone;
            this.tbl_lmsquotes.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
            if (clone.columns['quotestatus'] != undefined) clone.columns['quotestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_quotestatus.value)), }, };
            if (clone.columns['quotestatus'] != undefined) clone.columns['quotestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_quotestatus.value)), }, };
            this.tbl_lmsquotes.source.settings = clone;
            this.tbl_lmsquotes.source.initGrid();
        }
        this.bfilterPopulate_lmsquotes = true;
    }
    async lmsquotes_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_lmsquotes_TableConfig() {
        this.lmsquotes_settings = {
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
                custom: this.lmsquote_menuactions
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
                branchid: {
                    title: 'Branch',
                    type: 'number',
                    filter: true,
                },
                leadid: {
                    title: 'Lead',
                    type: 'number',
                    filter: true,
                },
                reference: {
                    title: 'Reference',
                    type: '',
                    filter: true,
                },
                quotedate: {
                    title: 'Quote Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                details: {
                    title: 'Details',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                assignedto: {
                    title: 'Assigned To',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                quoteamount: {
                    title: 'Quote Amount',
                    type: 'number',
                    filter: true,
                },
                currencydesc: {
                    title: 'Currency',
                    type: 'html',
                    filter: true,
                },
                expirationdate: {
                    title: 'Expiration Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                taxiddesc: {
                    title: 'Tax',
                    type: 'html',
                    filter: true,
                },
                shippingruleid: {
                    title: 'Shipping Rule',
                    type: 'number',
                    filter: true,
                },
                totalamount: {
                    title: 'Total Amount',
                    type: 'number',
                    filter: true,
                },
                taxamount: {
                    title: 'Tax Amount',
                    type: 'number',
                    filter: true,
                },
                charges: {
                    title: 'Charges',
                    type: 'number',
                    filter: true,
                },
                paymenttermiddesc: {
                    title: 'Payment Term',
                    type: 'html',
                    filter: true,
                },
                termiddesc: {
                    title: 'Term',
                    type: 'html',
                    filter: true,
                },
                terms: {
                    title: 'Terms',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                comments: {
                    title: 'Comments',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                campaignid: {
                    title: 'Campaign',
                    type: 'number',
                    filter: true,
                },
                leadsourcedesc: {
                    title: 'Lead Source',
                    type: 'html',
                    filter: true,
                },
                supplierquotationid: {
                    title: 'Supplier Quotation',
                    type: 'number',
                    filter: true,
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
                quotestatusdesc: {
                    title: 'Quote Status',
                    type: 'html',
                    filter: true,
                },
            },
        };
    }
    lmsquotes_LoadTable(lmsquotes = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotes_ID) >= 0) {
            if (this.tbl_lmsquotes != undefined) this.tbl_lmsquotes.source = new LocalDataSource();
            if (this.tbl_lmsquotes != undefined) this.tbl_lmsquotes.source.load(lmsquotes as any as LocalDataSource);
            if (this.tbl_lmsquotes != undefined) this.tbl_lmsquotes.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    lmsquotes_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsopportunity_service.lmsquotes.length == 0)
    {
        this.tbl_lmsquotes.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmsquote();
        this.lmsopportunity_service.lmsquotes.push(obj);
        this.tbl_lmsquotes.source.refresh();
        if ((this.lmsopportunity_service.lmsquotes.length / this.tbl_lmsquotes.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsquotes.source.getPaging().page)
        {
            this.tbl_lmsquotes.source.setPage((this.lmsopportunity_service.lmsquotes.length / this.tbl_lmsquotes.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmsquotes.source.grid.edit(this.tbl_lmsquotes.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmsquotes.source.data.indexOf(event.data);
    this.onDelete_lmsquote(event,event.data.quoteid,((this.tbl_lmsquotes.source.getPaging().page-1) *this.tbl_lmsquotes.source.getPaging().perPage)+index);
    this.tbl_lmsquotes.source.refresh();
    break;
    }
    }
    
    */
    lmsquotes_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_lmsquote(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmsquote(event, event.data.quoteid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmsquote(event, event.data.quoteid, ((this.tbl_lmsquotes.source.getPaging().page - 1) * this.tbl_lmsquotes.source.getPaging().perPage) + event.index);
                this.tbl_lmsquotes.source.refresh();
                break;
        }
    }
    lmsquotes_onDelete(obj) {
        let quoteid = obj.data.quoteid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsopportunity_service.delete_lmsopportunity(quoteid).then(res =>
                this.lmsquotes_LoadTable()
            );
        }
    }
    async onCustom_lmsquotes_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "lmsquotes");
        let formname = (objbomenuaction as any).actionname;




    }
    lmsquotes_Paging(val) {
        debugger;
        this.tbl_lmsquotes.source.setPaging(1, val, true);
    }

    handle_lmsquotes_GridSelected(event: any) {
        this.lmsquotes_selectedindex = this.tbl_lmsquotes.source.findIndex(i => i.quoteid === event.data.quoteid);
    }
    Is_lmsquotes_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotes_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmsquotes
    //start of Grid Codes boexpenses
    boexpenses_settings: any;

    show_boexpenses_Checkbox() {
        debugger;
        if (this.tbl_boexpenses.source.settings['selectMode'] == 'multi') this.tbl_boexpenses.source.settings['selectMode'] = 'single';
        else
            this.tbl_boexpenses.source.settings['selectMode'] = 'multi';
        this.tbl_boexpenses.source.initGrid();
    }
    delete_boexpenses_All() {
        this.tbl_boexpenses.source.settings['selectMode'] = 'single';
    }
    show_boexpenses_Filter() {
        setTimeout(() => {
            //  this.Set_boexpenses_TableDropDownConfig();
        });
        if (this.tbl_boexpenses.source.settings != null) this.tbl_boexpenses.source.settings['hideSubHeader'] = !this.tbl_boexpenses.source.settings['hideSubHeader'];
        this.tbl_boexpenses.source.initGrid();
    }
    show_boexpenses_InActive() {
    }
    enable_boexpenses_InActive() {
    }
    async Set_boexpenses_TableDropDownConfig(res) {
        if (!this.bfilterPopulate_boexpenses) {

            var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
            if (clone.columns['requesteduserid'] != undefined) clone.columns['requesteduserid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_requesteduserid.value)), }, };
            if (clone.columns['requesteduserid'] != undefined) clone.columns['requesteduserid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_requesteduserid.value)), }, };
            this.tbl_boexpenses.source.settings = clone;
            this.tbl_boexpenses.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
            if (clone.columns['expensetype'] != undefined) clone.columns['expensetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_expensetype.value)), }, };
            if (clone.columns['expensetype'] != undefined) clone.columns['expensetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_expensetype.value)), }, };
            this.tbl_boexpenses.source.settings = clone;
            this.tbl_boexpenses.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
            if (clone.columns['expensecategory'] != undefined) clone.columns['expensecategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_expensecategory.value)), }, };
            if (clone.columns['expensecategory'] != undefined) clone.columns['expensecategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_expensecategory.value)), }, };
            this.tbl_boexpenses.source.settings = clone;
            this.tbl_boexpenses.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
            if (clone.columns['currency'] != undefined) clone.columns['currency'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_currency.value)), }, };
            if (clone.columns['currency'] != undefined) clone.columns['currency'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_currency.value)), }, };
            this.tbl_boexpenses.source.settings = clone;
            this.tbl_boexpenses.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
            if (clone.columns['basecurrency'] != undefined) clone.columns['basecurrency'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_basecurrency.value)), }, };
            if (clone.columns['basecurrency'] != undefined) clone.columns['basecurrency'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_basecurrency.value)), }, };
            this.tbl_boexpenses.source.settings = clone;
            this.tbl_boexpenses.source.initGrid();

            var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
            if (clone.columns['costcenterid'] != undefined) clone.columns['costcenterid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_costcenterid.value)), }, };
            if (clone.columns['costcenterid'] != undefined) clone.columns['costcenterid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_costcenterid.value)), }, };
            this.tbl_boexpenses.source.settings = clone;
            this.tbl_boexpenses.source.initGrid();
        }
        this.bfilterPopulate_boexpenses = true;
    }
    async boexpenses_beforesave(event: any) {
        event.confirm.resolve(event.newData);



    }
    Set_boexpenses_TableConfig() {
        this.boexpenses_settings = {
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
                custom: this.boexpense_menuactions
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
                sourcereference: {
                    title: 'Source Reference',
                    type: 'number',
                    filter: true,
                },
                expensedate: {
                    title: 'Expense Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                requesteduseriddesc: {
                    title: 'Requested User',
                    type: 'html',
                    filter: true,
                },
                expensetypedesc: {
                    title: 'Expense Type',
                    type: 'html',
                    filter: true,
                },
                expensecategorydesc: {
                    title: 'Expense Category',
                    type: 'html',
                    filter: true,
                },
                expensedescription: {
                    title: 'Expense Description',
                    type: '',
                    filter: true,
                },
                currencydesc: {
                    title: 'Currency',
                    type: 'html',
                    filter: true,
                },
                amount: {
                    title: 'Amount',
                    type: 'number',
                    filter: true,
                },
                tax: {
                    title: 'Tax',
                    type: 'number',
                    filter: true,
                },
                othercharges: {
                    title: 'Other Charges',
                    type: 'number',
                    filter: true,
                },
                totalamount: {
                    title: 'Total Amount',
                    type: 'number',
                    filter: true,
                },
                merchant: {
                    title: 'Merchant',
                    type: '',
                    filter: true,
                },
                reference: {
                    title: 'Reference',
                    type: '',
                    filter: true,
                },
                receiptattached: {
                    title: 'Receipt Attached',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
                billable: {
                    title: 'Billable',
                    type: 'boolean',
                    editor: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                    filter: {
                        type: 'checkbox',
                        config: {
                            true: 'true',
                            false: 'false',
                            resetText: 'clear',
                        },
                    },
                },
                reimbursedamount: {
                    title: 'Reimbursed Amount',
                    type: 'number',
                    filter: true,
                },
                reimburseddate: {
                    title: 'Reimbursed Date',
                    type: 'custom',
                    renderComponent: SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: SmartTableDatepickerComponent,
                    },
                },
                referencenumber: {
                    title: 'Reference Number',
                    type: '',
                    filter: true,
                },
                basecurrencydesc: {
                    title: 'Base Currency',
                    type: 'html',
                    filter: true,
                },
                baseamount: {
                    title: 'Base Amount',
                    type: 'number',
                    filter: true,
                },
                notes: {
                    title: 'Notes',
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
                costcenteriddesc: {
                    title: 'Cost Center',
                    type: 'html',
                    filter: true,
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
    boexpenses_LoadTable(boexpenses = new LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boexpenses_ID) >= 0) {
            if (this.tbl_boexpenses != undefined) this.tbl_boexpenses.source = new LocalDataSource();
            if (this.tbl_boexpenses != undefined) this.tbl_boexpenses.source.load(boexpenses as any as LocalDataSource);
            if (this.tbl_boexpenses != undefined) this.tbl_boexpenses.source.setPaging(1, 20, true);
        }
    }

    //external to inline
    /*
    boexpenses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsopportunity_service.boexpenses.length == 0)
    {
        this.tbl_boexpenses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boexpense();
        this.lmsopportunity_service.boexpenses.push(obj);
        this.tbl_boexpenses.source.refresh();
        if ((this.lmsopportunity_service.boexpenses.length / this.tbl_boexpenses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boexpenses.source.getPaging().page)
        {
            this.tbl_boexpenses.source.setPage((this.lmsopportunity_service.boexpenses.length / this.tbl_boexpenses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boexpenses.source.grid.edit(this.tbl_boexpenses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boexpenses.source.data.indexOf(event.data);
    this.onDelete_boexpense(event,event.data.expenseid,((this.tbl_boexpenses.source.getPaging().page-1) *this.tbl_boexpenses.source.getPaging().perPage)+index);
    this.tbl_boexpenses.source.refresh();
    break;
    }
    }
    
    */
    boexpenses_route(event: any, action: any) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }

        switch (action) {
            case 'create':
                this.AddOrEdit_boexpense(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boexpense(event, event.data.expenseid, this.formid);
                break;
            case 'delete':
                this.onDelete_boexpense(event, event.data.expenseid, ((this.tbl_boexpenses.source.getPaging().page - 1) * this.tbl_boexpenses.source.getPaging().perPage) + event.index);
                this.tbl_boexpenses.source.refresh();
                break;
        }
    }
    boexpenses_onDelete(obj) {
        let expenseid = obj.data.expenseid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsopportunity_service.delete_lmsopportunity(expenseid).then(res =>
                this.boexpenses_LoadTable()
            );
        }
    }
    async onCustom_boexpenses_Action(event: any) {
        let objbomenuaction = await this.sharedService.onCustomAction(event, "boexpenses");
        let formname = (objbomenuaction as any).actionname;




    }
    boexpenses_Paging(val) {
        debugger;
        this.tbl_boexpenses.source.setPaging(1, val, true);
    }

    handle_boexpenses_GridSelected(event: any) {
        this.boexpenses_selectedindex = this.tbl_boexpenses.source.findIndex(i => i.expenseid === event.data.expenseid);
    }
    Is_boexpenses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boexpenses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes boexpenses

}



