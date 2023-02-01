"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_lmsopportunity_lmsopportunity_module_ts"],{

/***/ 98436:
/*!************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsopportunity/lmsopportunity.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsopportunityComponent": () => (/* binding */ lmsopportunityComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsopportunity_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmsopportunity.component.html */ 15336);
/* harmony import */ var _service_lmsopportunity_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmsopportunity.service */ 85095);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component */ 55163);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_lmsopportunityproduct_lmsopportunityproduct_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/lmsopportunityproduct/lmsopportunityproduct.component */ 61502);
/* harmony import */ var _service_lmsopportunityproduct_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/lmsopportunityproduct.service */ 95468);
/* harmony import */ var _pages_forms_lmscall_lmscall_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/lmscall/lmscall.component */ 41592);
/* harmony import */ var _service_lmscall_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../service/lmscall.service */ 63156);
/* harmony import */ var _pages_forms_lmssecondarycontact_lmssecondarycontact_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../../pages/forms/lmssecondarycontact/lmssecondarycontact.component */ 10);
/* harmony import */ var _service_lmssecondarycontact_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../../service/lmssecondarycontact.service */ 3851);
/* harmony import */ var _pages_forms_lmsreminder_lmsreminder_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../../pages/forms/lmsreminder/lmsreminder.component */ 25148);
/* harmony import */ var _pages_forms_lmsquote_lmsquote_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../../../pages/forms/lmsquote/lmsquote.component */ 92089);
/* harmony import */ var _service_lmsquote_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../../service/lmsquote.service */ 63006);
/* harmony import */ var _pages_forms_boexpense_boexpense_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../../../pages/forms/boexpense/boexpense.component */ 52584);
/* harmony import */ var _service_boexpense_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../../service/boexpense.service */ 69045);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions

//child table



//Shortcuts

//translator














//primeng services



//session,application constants




//custom fields & attachments

let lmsopportunityComponent = class lmsopportunityComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmsopportunity_service, lmsopportunityproduct_service, lmscall_service, lmssecondarycontact_service, lmsquote_service, boexpense_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmsopportunity_service = lmsopportunity_service;
        this.lmsopportunityproduct_service = lmsopportunityproduct_service;
        this.lmscall_service = lmscall_service;
        this.lmssecondarycontact_service = lmssecondarycontact_service;
        this.lmsquote_service = lmsquote_service;
        this.boexpense_service = boexpense_service;
        this.fb = fb;
        this.sharedService = sharedService;
        this.sessionService = sessionService;
        this.toastr = toastr;
        this.sanitizer = sanitizer;
        this.currentRoute = currentRoute;
        this.spinner = spinner;
        this.bmyrecord = false;
        this.hidelist = [];
        this.objvalues = [];
        this.viewHtml = ''; //stores html view of the screen
        this.showview = false; //view or edit mode
        this.theme = ""; //current theme
        //formdata: any;//current form data
        this.shortcuts = []; //keyboard keys
        this.showSubmit = true; //button to show
        this.showGoWorkFlow = false;
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_20__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_lmsopportunities = false;
        this.bfilterPopulate_lmsopportunityproducts = false;
        this.bfilterPopulate_lmscalls = false;
        this.bfilterPopulate_lmssecondarycontacts = false;
        this.bfilterPopulate_lmsreminders = false;
        this.bfilterPopulate_lmsquotes = false;
        this.bfilterPopulate_boexpenses = false;
        this.lmsopportunity_menuactions = [];
        this.lmsopportunityproduct_menuactions = [];
        this.lmscall_menuactions = [];
        this.lmssecondarycontact_menuactions = [];
        this.lmsreminder_menuactions = [];
        this.lmsquote_menuactions = [];
        this.boexpense_menuactions = [];
        this.opportunityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_20__.EventEmitter(); //autocomplete
        this.leadby_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_20__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_19__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_19__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
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
        this.Deleted_lmsopportunityproduct_IDs = "";
        this.lmsopportunityproducts_ID = "1";
        this.Deleted_lmscall_IDs = "";
        this.lmscalls_ID = "2";
        this.Deleted_lmssecondarycontact_IDs = "";
        this.lmssecondarycontacts_ID = "3";
        this.Deleted_lmsreminder_IDs = "";
        this.lmsreminders_ID = "4";
        this.Deleted_lmsquote_IDs = "";
        this.lmsquotes_ID = "5";
        this.Deleted_boexpense_IDs = "";
        this.boexpenses_ID = "6";
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
            opportunitydetail: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.required])],
            leadby: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.required])],
            leadbydesc: [null],
            opportunitytype: [null],
            opportunitytypedesc: [null],
            opportunitystage: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.required])],
            opportunitystagedesc: [null],
            stagesubcategory: [null],
            stagesubcategorydesc: [null],
            opportunitysize: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.required])],
            opportunitysizedesc: [null],
            nextstep: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.required])],
            nextstepdesc: [null],
            nextstepdetail: [null],
            possibilityofclosure: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_21__.Validators.required])],
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
    canDeactivate() {
        debugger;
        if (this.lmsopportunity_Form.dirty && this.lmsopportunity_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_22__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_22__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_22__.Observable.of(true);
    }
    //check Unique fields
    //navigation buttons
    first() {
        if (this.pkList.length > 0)
            this.PopulateScreen(this.pkList[0].pkcol);
    }
    last() {
        if (this.pkList.length > 0)
            this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }
    prev() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.opportunityid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.opportunityid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.opportunityid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            //session & theme
            this.themeService.theme.subscribe((val) => {
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
            if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null)
                this.showview = this.maindata.showview;
            if (this.maindata != null && this.maindata.ScreenType != undefined && this.maindata.ScreenType != null) {
                this.viewHtml = '';
            }
            if (this.data != null && this.data.event != null && this.data.event.data != null)
                this.data = this.data.event.data;
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
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
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
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmsopportunity_Form.markAsUntouched();
            this.lmsopportunity_Form.markAsPristine();
        });
    }
    onSelected_opportunityid(opportunityidDetail) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmsopportunity_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,
            });
        }
    }
    onSelected_leadby(leadbyDetail) {
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
                }).catch((err) => { this.spinner.hide(); console.log(err); });
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
        if (this.formData.opportunityid != null)
            this.formData.opportunityid = null;
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
    PopulateFromMainScreen(mainscreendata, bdisable) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {
                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        {}
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
    leadid_onChange(evt) {
        let e = evt.value;
        this.lmsopportunity_Form.patchValue({ leadiddesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunityid_onChange(evt) {
        let e = evt.value;
    }
    leadby_onChange(evt) {
        let e = evt.value;
    }
    opportunitytype_onChange(evt) {
        let e = this.f.opportunitytype.value;
        this.monthlybillingvisible = false;
        if (this.f.opportunitytype.value == 'O')
            this.monthlybillingvisible = true;
        this.lmsopportunity_Form.patchValue({ opportunitytypedesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunitystage_onChange(evt) {
        let e = evt.value;
        this.dealvaluevisible = false;
        if (this.f.opportunitystage.value == 'W')
            this.dealvaluevisible = true;
        this.lmsopportunity_Form.patchValue({ opportunitystagedesc: evt.options[evt.options.selectedIndex].text });
        setTimeout(() => {
            if (this.f.opportunitystage.value && this.f.opportunitystage.value != "" && this.f.opportunitystage.value != null)
                this.lmsopportunity_service.getList_stagesubcategory(this.f.opportunitystage.value).then(res => this.stagesubcategory_List = res);
        });
    }
    stagesubcategory_onChange(evt) {
        let e = evt.value;
        this.lmsopportunity_Form.patchValue({ stagesubcategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunitysize_onChange(evt) {
        let e = this.f.opportunitysize.value;
        this.lmsopportunity_Form.patchValue({ opportunitysizedesc: evt.options[evt.options.selectedIndex].text });
    }
    nextstep_onChange(evt) {
        let e = this.f.nextstep.value;
        this.lmsopportunity_Form.patchValue({ nextstepdesc: evt.options[evt.options.selectedIndex].text });
    }
    possibilityofclosure_onChange(evt) {
        let e = this.f.possibilityofclosure.value;
        this.lmsopportunity_Form.patchValue({ possibilityofclosuredesc: evt.options[evt.options.selectedIndex].text });
    }
    leadsource_onChange(evt) {
        let e = this.f.leadsource.value;
        this.lmsopportunity_Form.patchValue({ leadsourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    budget_onChange(evt) {
        let e = this.f.budget.value;
        this.lmsopportunity_Form.patchValue({ budgetdesc: evt.options[evt.options.selectedIndex].text });
    }
    criticality_onChange(evt) {
        let e = this.f.criticality.value;
        this.lmsopportunity_Form.patchValue({ criticalitydesc: evt.options[evt.options.selectedIndex].text });
    }
    priority_onChange(evt) {
        let e = this.f.priority.value;
        this.lmsopportunity_Form.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    campaignid_onChange(evt) {
        let e = evt.value;
        this.lmsopportunity_Form.patchValue({ campaigniddesc: evt.options[evt.options.selectedIndex].text });
    }
    territory_onChange(evt) {
        let e = this.f.territory.value;
        this.lmsopportunity_Form.patchValue({ territorydesc: evt.options[evt.options.selectedIndex].text });
    }
    reasonforloss_onChange(evt) {
        let e = this.f.reasonforloss.value;
        this.lmsopportunity_Form.patchValue({ reasonforlossdesc: evt.options[evt.options.selectedIndex].text });
    }
    attachmentuploader(e) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileAttachmentList.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentFieldJson == null)
                this.attachmentFieldJson = [];
            max = Array.of(this.attachmentFieldJson).length;
            attachmentobj = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.KeyValuePair((this.attachmentFieldJson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentFieldJson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null)
                max = Array.of(this.attachmentlist).length;
            attachmentobj = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    edit_lmsopportunities() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmsopportunity_service.get_lmsopportunities_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmsopportunity;
                let formproperty = res.lmsopportunity.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmsopportunity.pkcol;
                this.formid = res.lmsopportunity.opportunityid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmsopportunity;
        this.formid = res.lmsopportunity.opportunityid;
        this.pkcol = res.lmsopportunity.pkcol;
        this.bmyrecord = false;
        if (res.lmsopportunity.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
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
        if (res.visiblelist != undefined && res.visiblelist.indexOf("dealvalue") >= 0)
            this.dealvaluevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("dealvalue") >= 0)
            this.dealvaluevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("resources") >= 0)
            this.resourcesvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("resources") >= 0)
            this.resourcesvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("prebiddate") >= 0)
            this.prebiddatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("prebiddate") >= 0)
            this.prebiddatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("technology") >= 0)
            this.technologyvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("technology") >= 0)
            this.technologyvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("finalopeningdate") >= 0)
            this.finalopeningdatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("finalopeningdate") >= 0)
            this.finalopeningdatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("openingdate") >= 0)
            this.openingdatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("openingdate") >= 0)
            this.openingdatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("campaignid") >= 0)
            this.campaignidvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("campaignid") >= 0)
            this.campaignidvisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("tenderpublishdate") >= 0)
            this.tenderpublishdatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("tenderpublishdate") >= 0)
            this.tenderpublishdatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("submissiondate") >= 0)
            this.submissiondatevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("submissiondate") >= 0)
            this.submissiondatevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("monthlybilling") >= 0)
            this.monthlybillingvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("monthlybilling") >= 0)
            this.monthlybillingvisible = false;
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
        if (this.lmsopportunity_Form.get('attachment').value != null && this.lmsopportunity_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.lmsopportunity_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.opportunitystage.value && this.f.opportunitystage.value != "" && this.f.opportunitystage.value != null)
                this.lmsopportunity_service.getList_stagesubcategory(this.f.opportunitystage.value).then(res => {
                    this.stagesubcategory_List = res;
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
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmsopportunity_Form.controls) {
            let val = this.lmsopportunity_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmsopportunity_Form.controls[key] != null) {
                if (false) {}
                else if (false) {}
                else if (false) {}
                else
                    ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
            }
        }
        var re = /##(\w+)##/g;
        ret = ret.replace(re, '');
        return ret;
    }
    onSubmitDataDlg(bclear) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
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
            if (this.lmsopportunity_Form.get('assignedto').value != null)
                obj.assignedto = JSON.stringify(this.lmsopportunity_Form.get('assignedto').value);
            obj.expectedclosuredate = new Date(this.lmsopportunity_Form.get('expectedclosuredate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('expectedclosuredate').value) + '  UTC' : null);
            if (this.lmsopportunity_Form.get('notes').value != null)
                obj.notes = JSON.stringify(this.lmsopportunity_Form.get('notes').value);
            obj.closeddate = new Date(this.lmsopportunity_Form.get('closeddate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('closeddate').value) + '  UTC' : null);
            obj.lastcontactdate = new Date(this.lmsopportunity_Form.get('lastcontactdate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('lastcontactdate').value) + '  UTC' : null);
            if (this.fileattachment.getAttachmentList() != null)
                obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            obj.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(obj);
            if (!confirm('Do you want to want to save?')) {
                return;
            }
            yield this.sharedService.upload(this.fileAttachmentList);
            this.attachmentlist = [];
            if (this.fileattachment)
                this.fileattachment.clear();
            this.objvalues.push(obj);
            this.dialogRef.close(this.objvalues);
            setTimeout(() => {
                //this.dialogRef.destroy();
            }, 200);
        });
    }
    //This has to come from bomenuactions & procedures
    afterAction(mode) {
        let formname = "";
        let query = "";
        if (mode == "new")
            this.router.navigate(['/home/' + formname + '/' + formname + query]);
        else if (mode == "refresh")
            this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
    }
    onSubmitData(bclear) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
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
            if (strError != "")
                return this.sharedService.alert(strError);
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
            if (this.lmsopportunity_Form.get('assignedto').value != null)
                this.formData.assignedto = JSON.stringify(this.lmsopportunity_Form.get('assignedto').value);
            this.formData.expectedclosuredate = new Date(this.lmsopportunity_Form.get('expectedclosuredate').value ? this.ngbDateParserFormatter.format(this.lmsopportunity_Form.get('expectedclosuredate').value) + '  UTC' : null);
            if (this.lmsopportunity_Form.get('notes').value != null)
                this.formData.notes = JSON.stringify(this.lmsopportunity_Form.get('notes').value);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
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
            this.lmsopportunity_service.saveOrUpdate_lmsopportunities(this.formData, (_b = (_a = this.tbl_lmsopportunityproducts) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_lmscalls) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data, (_f = (_e = this.tbl_lmssecondarycontacts) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.data, (_h = (_g = this.tbl_lmsreminders) === null || _g === void 0 ? void 0 : _g.source) === null || _h === void 0 ? void 0 : _h.data, (_k = (_j = this.tbl_lmsquotes) === null || _j === void 0 ? void 0 : _j.source) === null || _k === void 0 ? void 0 : _k.data, (_m = (_l = this.tbl_boexpenses) === null || _l === void 0 ? void 0 : _l.source) === null || _m === void 0 ? void 0 : _m.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_lmsopportunityproducts.source) {
                    for (let i = 0; i < this.tbl_lmsopportunityproducts.source.data.length; i++) {
                        if (this.tbl_lmsopportunityproducts.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmsopportunityproducts.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmscalls.source) {
                    for (let i = 0; i < this.tbl_lmscalls.source.data.length; i++) {
                        if (this.tbl_lmscalls.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmscalls.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmssecondarycontacts.source) {
                    for (let i = 0; i < this.tbl_lmssecondarycontacts.source.data.length; i++) {
                        if (this.tbl_lmssecondarycontacts.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmssecondarycontacts.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmsreminders.source) {
                    for (let i = 0; i < this.tbl_lmsreminders.source.data.length; i++) {
                        if (this.tbl_lmsreminders.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmsreminders.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmsquotes.source) {
                    for (let i = 0; i < this.tbl_lmsquotes.source.data.length; i++) {
                        if (this.tbl_lmsquotes.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmsquotes.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_boexpenses.source) {
                    for (let i = 0; i < this.tbl_boexpenses.source.data.length; i++) {
                        if (this.tbl_boexpenses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_boexpenses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmsopportunity);
                if (!bclear)
                    this.showview = true;
                if (document.getElementById("contentAreascroll") != undefined)
                    document.getElementById("contentAreascroll").scrollTop = 0;
                if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.dialogRef.close(this.objvalues);
                    return;
                }
                else {
                    if (document.getElementById("contentAreascroll") != undefined)
                        document.getElementById("contentAreascroll").scrollTop = 0;
                }
                this.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.objvalues.push(res.lmsopportunity);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsopportunity_Form.markAsUntouched();
                this.lmsopportunity_Form.markAsPristine();
            }), err => {
                debugger;
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            });
        });
    }
    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_lmsopportunityproducts.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
        this.tbl_lmscalls.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
        this.tbl_lmssecondarycontacts.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
        this.tbl_lmsreminders.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
        this.tbl_lmsquotes.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
        this.tbl_boexpenses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
    }
    AddOrEdit_lmsopportunityproduct(event, opportunityproductid, opportunityid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmsopportunityproduct_lmsopportunityproduct_component__WEBPACK_IMPORTED_MODULE_5__.lmsopportunityproductComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, opportunityproductid, opportunityid, visiblelist: this.lmsopportunityproducts_visiblelist, hidelist: this.lmsopportunityproducts_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_lmsopportunityproduct(event, childID, i) {
        if (childID != null)
            this.Deleted_lmsopportunityproduct_IDs += childID + ",";
        this.tbl_lmsopportunityproducts.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmscall(event, callid, opportunityid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmscall_lmscall_component__WEBPACK_IMPORTED_MODULE_7__.lmscallComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, callid, opportunityid, visiblelist: this.lmscalls_visiblelist, hidelist: this.lmscalls_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_lmscall(event, childID, i) {
        if (childID != null)
            this.Deleted_lmscall_IDs += childID + ",";
        this.tbl_lmscalls.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmssecondarycontact(event, secondarycontactid, opportunityid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmssecondarycontact_lmssecondarycontact_component__WEBPACK_IMPORTED_MODULE_9__.lmssecondarycontactComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, secondarycontactid, opportunityid, visiblelist: this.lmssecondarycontacts_visiblelist, hidelist: this.lmssecondarycontacts_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_lmssecondarycontact(event, childID, i) {
        if (childID != null)
            this.Deleted_lmssecondarycontact_IDs += childID + ",";
        this.tbl_lmssecondarycontacts.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmsreminder(event, reminderid, opportunityid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmsreminder_lmsreminder_component__WEBPACK_IMPORTED_MODULE_11__.lmsreminderComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, reminderid, opportunityid, visiblelist: this.lmsreminders_visiblelist, hidelist: this.lmsreminders_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_lmsreminder(event, childID, i) {
        if (childID != null)
            this.Deleted_lmsreminder_IDs += childID + ",";
        this.tbl_lmsreminders.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmsquote(event, quoteid, opportunityid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmsquote_lmsquote_component__WEBPACK_IMPORTED_MODULE_12__.lmsquoteComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, quoteid, opportunityid, visiblelist: this.lmsquotes_visiblelist, hidelist: this.lmsquotes_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_lmsquote(event, childID, i) {
        if (childID != null)
            this.Deleted_lmsquote_IDs += childID + ",";
        this.tbl_lmsquotes.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_boexpense(event, expenseid, opportunityid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_boexpense_boexpense_component__WEBPACK_IMPORTED_MODULE_14__.boexpenseComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, expenseid, opportunityid, visiblelist: this.boexpenses_visiblelist, hidelist: this.boexpenses_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_boexpense(event, childID, i) {
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
    show_lmsopportunityproducts_Checkbox() {
        debugger;
        if (this.tbl_lmsopportunityproducts.source.settings['selectMode'] == 'multi')
            this.tbl_lmsopportunityproducts.source.settings['selectMode'] = 'single';
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
        if (this.tbl_lmsopportunityproducts.source.settings != null)
            this.tbl_lmsopportunityproducts.source.settings['hideSubHeader'] = !this.tbl_lmsopportunityproducts.source.settings['hideSubHeader'];
        this.tbl_lmsopportunityproducts.source.initGrid();
    }
    show_lmsopportunityproducts_InActive() {
    }
    enable_lmsopportunityproducts_InActive() {
    }
    Set_lmsopportunityproducts_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmsopportunityproducts) {
                var clone = this.sharedService.clone(this.tbl_lmsopportunityproducts.source.settings);
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_opportunityid.value)), }, };
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_opportunityid.value)), }, };
                this.tbl_lmsopportunityproducts.source.settings = clone;
                this.tbl_lmsopportunityproducts.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsopportunityproducts.source.settings);
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_productid.value)), }, };
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_productid.value)), }, };
                this.tbl_lmsopportunityproducts.source.settings = clone;
                this.tbl_lmsopportunityproducts.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsopportunityproducts.source.settings);
                if (clone.columns['uom'] != undefined)
                    clone.columns['uom'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_uom.value)), }, };
                if (clone.columns['uom'] != undefined)
                    clone.columns['uom'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunityproducts_uom.value)), }, };
                this.tbl_lmsopportunityproducts.source.settings = clone;
                this.tbl_lmsopportunityproducts.source.initGrid();
            }
            this.bfilterPopulate_lmsopportunityproducts = true;
        });
    }
    lmsopportunityproducts_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
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
                edit: true,
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
    lmsopportunityproducts_LoadTable(lmsopportunityproducts = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsopportunityproducts_ID) >= 0) {
            if (this.tbl_lmsopportunityproducts != undefined)
                this.tbl_lmsopportunityproducts.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
            if (this.tbl_lmsopportunityproducts != undefined)
                this.tbl_lmsopportunityproducts.source.load(lmsopportunityproducts);
            if (this.tbl_lmsopportunityproducts != undefined)
                this.tbl_lmsopportunityproducts.source.setPaging(1, 20, true);
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
    lmsopportunityproducts_route(event, action) {
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
            this.lmsopportunity_service.delete_lmsopportunity(opportunityproductid).then(res => this.lmsopportunityproducts_LoadTable());
        }
    }
    onCustom_lmsopportunityproducts_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmsopportunityproducts");
            let formname = objbomenuaction.actionname;
        });
    }
    lmsopportunityproducts_Paging(val) {
        debugger;
        this.tbl_lmsopportunityproducts.source.setPaging(1, val, true);
    }
    handle_lmsopportunityproducts_GridSelected(event) {
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
    show_lmscalls_Checkbox() {
        debugger;
        if (this.tbl_lmscalls.source.settings['selectMode'] == 'multi')
            this.tbl_lmscalls.source.settings['selectMode'] = 'single';
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
        if (this.tbl_lmscalls.source.settings != null)
            this.tbl_lmscalls.source.settings['hideSubHeader'] = !this.tbl_lmscalls.source.settings['hideSubHeader'];
        this.tbl_lmscalls.source.initGrid();
    }
    show_lmscalls_InActive() {
    }
    enable_lmscalls_InActive() {
    }
    Set_lmscalls_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmscalls) {
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['branchid'] != undefined)
                    clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_branchid.value)), }, };
                if (clone.columns['branchid'] != undefined)
                    clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_branchid.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['leadid'] != undefined)
                    clone.columns['leadid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadid.value)), }, };
                if (clone.columns['leadid'] != undefined)
                    clone.columns['leadid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadid.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_opportunityid.value)), }, };
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_opportunityid.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['callid'] != undefined)
                    clone.columns['callid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_callid.value)), }, };
                if (clone.columns['callid'] != undefined)
                    clone.columns['callid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_callid.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['campaignid'] != undefined)
                    clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_campaignid.value)), }, };
                if (clone.columns['campaignid'] != undefined)
                    clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_campaignid.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['leadby'] != undefined)
                    clone.columns['leadby'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadby.value)), }, };
                if (clone.columns['leadby'] != undefined)
                    clone.columns['leadby'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadby.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['currentowner'] != undefined)
                    clone.columns['currentowner'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_currentowner.value)), }, };
                if (clone.columns['currentowner'] != undefined)
                    clone.columns['currentowner'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_currentowner.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['activitytype'] != undefined)
                    clone.columns['activitytype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_activitytype.value)), }, };
                if (clone.columns['activitytype'] != undefined)
                    clone.columns['activitytype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_activitytype.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['nextaction'] != undefined)
                    clone.columns['nextaction'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_nextaction.value)), }, };
                if (clone.columns['nextaction'] != undefined)
                    clone.columns['nextaction'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_nextaction.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
            }
            this.bfilterPopulate_lmscalls = true;
        });
    }
    lmscalls_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
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
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
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
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
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
    lmscalls_LoadTable(lmscalls = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscalls_ID) >= 0) {
            if (this.tbl_lmscalls != undefined)
                this.tbl_lmscalls.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
            if (this.tbl_lmscalls != undefined)
                this.tbl_lmscalls.source.load(lmscalls);
            if (this.tbl_lmscalls != undefined)
                this.tbl_lmscalls.source.setPaging(1, 20, true);
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
    lmscalls_route(event, action) {
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
            this.lmsopportunity_service.delete_lmsopportunity(callid).then(res => this.lmscalls_LoadTable());
        }
    }
    onCustom_lmscalls_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmscalls");
            let formname = objbomenuaction.actionname;
        });
    }
    lmscalls_Paging(val) {
        debugger;
        this.tbl_lmscalls.source.setPaging(1, val, true);
    }
    handle_lmscalls_GridSelected(event) {
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
    show_lmssecondarycontacts_Checkbox() {
        debugger;
        if (this.tbl_lmssecondarycontacts.source.settings['selectMode'] == 'multi')
            this.tbl_lmssecondarycontacts.source.settings['selectMode'] = 'single';
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
        if (this.tbl_lmssecondarycontacts.source.settings != null)
            this.tbl_lmssecondarycontacts.source.settings['hideSubHeader'] = !this.tbl_lmssecondarycontacts.source.settings['hideSubHeader'];
        this.tbl_lmssecondarycontacts.source.initGrid();
    }
    show_lmssecondarycontacts_InActive() {
    }
    enable_lmssecondarycontacts_InActive() {
    }
    Set_lmssecondarycontacts_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmssecondarycontacts) {
                var clone = this.sharedService.clone(this.tbl_lmssecondarycontacts.source.settings);
                if (clone.columns['branchid'] != undefined)
                    clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_branchid.value)), }, };
                if (clone.columns['branchid'] != undefined)
                    clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_branchid.value)), }, };
                this.tbl_lmssecondarycontacts.source.settings = clone;
                this.tbl_lmssecondarycontacts.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmssecondarycontacts.source.settings);
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_opportunityid.value)), }, };
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_opportunityid.value)), }, };
                this.tbl_lmssecondarycontacts.source.settings = clone;
                this.tbl_lmssecondarycontacts.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmssecondarycontacts.source.settings);
                if (clone.columns['secondarycontactid'] != undefined)
                    clone.columns['secondarycontactid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_secondarycontactid.value)), }, };
                if (clone.columns['secondarycontactid'] != undefined)
                    clone.columns['secondarycontactid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_secondarycontactid.value)), }, };
                this.tbl_lmssecondarycontacts.source.settings = clone;
                this.tbl_lmssecondarycontacts.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmssecondarycontacts.source.settings);
                if (clone.columns['campaignid'] != undefined)
                    clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_campaignid.value)), }, };
                if (clone.columns['campaignid'] != undefined)
                    clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmssecondarycontacts_campaignid.value)), }, };
                this.tbl_lmssecondarycontacts.source.settings = clone;
                this.tbl_lmssecondarycontacts.source.initGrid();
            }
            this.bfilterPopulate_lmssecondarycontacts = true;
        });
    }
    lmssecondarycontacts_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
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
                edit: true,
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
    lmssecondarycontacts_LoadTable(lmssecondarycontacts = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmssecondarycontacts_ID) >= 0) {
            if (this.tbl_lmssecondarycontacts != undefined)
                this.tbl_lmssecondarycontacts.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
            if (this.tbl_lmssecondarycontacts != undefined)
                this.tbl_lmssecondarycontacts.source.load(lmssecondarycontacts);
            if (this.tbl_lmssecondarycontacts != undefined)
                this.tbl_lmssecondarycontacts.source.setPaging(1, 20, true);
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
    lmssecondarycontacts_route(event, action) {
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
            this.lmsopportunity_service.delete_lmsopportunity(secondarycontactid).then(res => this.lmssecondarycontacts_LoadTable());
        }
    }
    onCustom_lmssecondarycontacts_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmssecondarycontacts");
            let formname = objbomenuaction.actionname;
        });
    }
    lmssecondarycontacts_Paging(val) {
        debugger;
        this.tbl_lmssecondarycontacts.source.setPaging(1, val, true);
    }
    handle_lmssecondarycontacts_GridSelected(event) {
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
    show_lmsreminders_Checkbox() {
        debugger;
        if (this.tbl_lmsreminders.source.settings['selectMode'] == 'multi')
            this.tbl_lmsreminders.source.settings['selectMode'] = 'single';
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
        if (this.tbl_lmsreminders.source.settings != null)
            this.tbl_lmsreminders.source.settings['hideSubHeader'] = !this.tbl_lmsreminders.source.settings['hideSubHeader'];
        this.tbl_lmsreminders.source.initGrid();
    }
    show_lmsreminders_InActive() {
    }
    enable_lmsreminders_InActive() {
    }
    Set_lmsreminders_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmsreminders) {
            }
            this.bfilterPopulate_lmsreminders = true;
        });
    }
    lmsreminders_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
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
                edit: true,
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
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
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
    lmsreminders_LoadTable(lmsreminders = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsreminders_ID) >= 0) {
            if (this.tbl_lmsreminders != undefined)
                this.tbl_lmsreminders.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
            if (this.tbl_lmsreminders != undefined)
                this.tbl_lmsreminders.source.load(lmsreminders);
            if (this.tbl_lmsreminders != undefined)
                this.tbl_lmsreminders.source.setPaging(1, 20, true);
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
    lmsreminders_route(event, action) {
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
            this.lmsopportunity_service.delete_lmsopportunity(reminderid).then(res => this.lmsreminders_LoadTable());
        }
    }
    onCustom_lmsreminders_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmsreminders");
            let formname = objbomenuaction.actionname;
        });
    }
    lmsreminders_Paging(val) {
        debugger;
        this.tbl_lmsreminders.source.setPaging(1, val, true);
    }
    handle_lmsreminders_GridSelected(event) {
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
    show_lmsquotes_Checkbox() {
        debugger;
        if (this.tbl_lmsquotes.source.settings['selectMode'] == 'multi')
            this.tbl_lmsquotes.source.settings['selectMode'] = 'single';
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
        if (this.tbl_lmsquotes.source.settings != null)
            this.tbl_lmsquotes.source.settings['hideSubHeader'] = !this.tbl_lmsquotes.source.settings['hideSubHeader'];
        this.tbl_lmsquotes.source.initGrid();
    }
    show_lmsquotes_InActive() {
    }
    enable_lmsquotes_InActive() {
    }
    Set_lmsquotes_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmsquotes) {
                var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_opportunityid.value)), }, };
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_opportunityid.value)), }, };
                this.tbl_lmsquotes.source.settings = clone;
                this.tbl_lmsquotes.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
                if (clone.columns['currency'] != undefined)
                    clone.columns['currency'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_currency.value)), }, };
                if (clone.columns['currency'] != undefined)
                    clone.columns['currency'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_currency.value)), }, };
                this.tbl_lmsquotes.source.settings = clone;
                this.tbl_lmsquotes.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
                if (clone.columns['taxid'] != undefined)
                    clone.columns['taxid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_taxid.value)), }, };
                if (clone.columns['taxid'] != undefined)
                    clone.columns['taxid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_taxid.value)), }, };
                this.tbl_lmsquotes.source.settings = clone;
                this.tbl_lmsquotes.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
                if (clone.columns['paymenttermid'] != undefined)
                    clone.columns['paymenttermid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_paymenttermid.value)), }, };
                if (clone.columns['paymenttermid'] != undefined)
                    clone.columns['paymenttermid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_paymenttermid.value)), }, };
                this.tbl_lmsquotes.source.settings = clone;
                this.tbl_lmsquotes.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
                if (clone.columns['termid'] != undefined)
                    clone.columns['termid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_termid.value)), }, };
                if (clone.columns['termid'] != undefined)
                    clone.columns['termid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_termid.value)), }, };
                this.tbl_lmsquotes.source.settings = clone;
                this.tbl_lmsquotes.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
                if (clone.columns['leadsource'] != undefined)
                    clone.columns['leadsource'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_leadsource.value)), }, };
                if (clone.columns['leadsource'] != undefined)
                    clone.columns['leadsource'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_leadsource.value)), }, };
                this.tbl_lmsquotes.source.settings = clone;
                this.tbl_lmsquotes.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsquotes.source.settings);
                if (clone.columns['quotestatus'] != undefined)
                    clone.columns['quotestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_quotestatus.value)), }, };
                if (clone.columns['quotestatus'] != undefined)
                    clone.columns['quotestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotes_quotestatus.value)), }, };
                this.tbl_lmsquotes.source.settings = clone;
                this.tbl_lmsquotes.source.initGrid();
            }
            this.bfilterPopulate_lmsquotes = true;
        });
    }
    lmsquotes_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
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
                edit: true,
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
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
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
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
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
    lmsquotes_LoadTable(lmsquotes = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotes_ID) >= 0) {
            if (this.tbl_lmsquotes != undefined)
                this.tbl_lmsquotes.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
            if (this.tbl_lmsquotes != undefined)
                this.tbl_lmsquotes.source.load(lmsquotes);
            if (this.tbl_lmsquotes != undefined)
                this.tbl_lmsquotes.source.setPaging(1, 20, true);
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
    lmsquotes_route(event, action) {
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
            this.lmsopportunity_service.delete_lmsopportunity(quoteid).then(res => this.lmsquotes_LoadTable());
        }
    }
    onCustom_lmsquotes_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmsquotes");
            let formname = objbomenuaction.actionname;
        });
    }
    lmsquotes_Paging(val) {
        debugger;
        this.tbl_lmsquotes.source.setPaging(1, val, true);
    }
    handle_lmsquotes_GridSelected(event) {
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
    show_boexpenses_Checkbox() {
        debugger;
        if (this.tbl_boexpenses.source.settings['selectMode'] == 'multi')
            this.tbl_boexpenses.source.settings['selectMode'] = 'single';
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
        if (this.tbl_boexpenses.source.settings != null)
            this.tbl_boexpenses.source.settings['hideSubHeader'] = !this.tbl_boexpenses.source.settings['hideSubHeader'];
        this.tbl_boexpenses.source.initGrid();
    }
    show_boexpenses_InActive() {
    }
    enable_boexpenses_InActive() {
    }
    Set_boexpenses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_boexpenses) {
                var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
                if (clone.columns['requesteduserid'] != undefined)
                    clone.columns['requesteduserid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_requesteduserid.value)), }, };
                if (clone.columns['requesteduserid'] != undefined)
                    clone.columns['requesteduserid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_requesteduserid.value)), }, };
                this.tbl_boexpenses.source.settings = clone;
                this.tbl_boexpenses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
                if (clone.columns['expensetype'] != undefined)
                    clone.columns['expensetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_expensetype.value)), }, };
                if (clone.columns['expensetype'] != undefined)
                    clone.columns['expensetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_expensetype.value)), }, };
                this.tbl_boexpenses.source.settings = clone;
                this.tbl_boexpenses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
                if (clone.columns['expensecategory'] != undefined)
                    clone.columns['expensecategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_expensecategory.value)), }, };
                if (clone.columns['expensecategory'] != undefined)
                    clone.columns['expensecategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_expensecategory.value)), }, };
                this.tbl_boexpenses.source.settings = clone;
                this.tbl_boexpenses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
                if (clone.columns['currency'] != undefined)
                    clone.columns['currency'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_currency.value)), }, };
                if (clone.columns['currency'] != undefined)
                    clone.columns['currency'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_currency.value)), }, };
                this.tbl_boexpenses.source.settings = clone;
                this.tbl_boexpenses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
                if (clone.columns['basecurrency'] != undefined)
                    clone.columns['basecurrency'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_basecurrency.value)), }, };
                if (clone.columns['basecurrency'] != undefined)
                    clone.columns['basecurrency'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_basecurrency.value)), }, };
                this.tbl_boexpenses.source.settings = clone;
                this.tbl_boexpenses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boexpenses.source.settings);
                if (clone.columns['costcenterid'] != undefined)
                    clone.columns['costcenterid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_costcenterid.value)), }, };
                if (clone.columns['costcenterid'] != undefined)
                    clone.columns['costcenterid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boexpenses_costcenterid.value)), }, };
                this.tbl_boexpenses.source.settings = clone;
                this.tbl_boexpenses.source.initGrid();
            }
            this.bfilterPopulate_boexpenses = true;
        });
    }
    boexpenses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
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
                edit: true,
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
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
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
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
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
    boexpenses_LoadTable(boexpenses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boexpenses_ID) >= 0) {
            if (this.tbl_boexpenses != undefined)
                this.tbl_boexpenses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_24__.LocalDataSource();
            if (this.tbl_boexpenses != undefined)
                this.tbl_boexpenses.source.load(boexpenses);
            if (this.tbl_boexpenses != undefined)
                this.tbl_boexpenses.source.setPaging(1, 20, true);
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
    boexpenses_route(event, action) {
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
            this.lmsopportunity_service.delete_lmsopportunity(expenseid).then(res => this.boexpenses_LoadTable());
        }
    }
    onCustom_boexpenses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "boexpenses");
            let formname = objbomenuaction.actionname;
        });
    }
    boexpenses_Paging(val) {
        debugger;
        this.tbl_boexpenses.source.setPaging(1, val, true);
    }
    handle_boexpenses_GridSelected(event) {
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
};
lmsopportunityComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_25__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_26__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_27__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_28__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_18__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_29__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_30__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_30__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_30__.DialogService },
    { type: _service_lmsopportunity_service__WEBPACK_IMPORTED_MODULE_1__.lmsopportunityService },
    { type: _service_lmsopportunityproduct_service__WEBPACK_IMPORTED_MODULE_6__.lmsopportunityproductService },
    { type: _service_lmscall_service__WEBPACK_IMPORTED_MODULE_8__.lmscallService },
    { type: _service_lmssecondarycontact_service__WEBPACK_IMPORTED_MODULE_10__.lmssecondarycontactService },
    { type: _service_lmsquote_service__WEBPACK_IMPORTED_MODULE_13__.lmsquoteService },
    { type: _service_boexpense_service__WEBPACK_IMPORTED_MODULE_15__.boexpenseService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_21__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_16__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_17__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_31__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_28__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_32__.NgxSpinnerService }
];
lmsopportunityComponent.propDecorators = {
    tbl_lmsopportunityproducts: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_20__.ViewChild, args: ['tbl_lmsopportunityproducts', { static: false },] }],
    tbl_lmscalls: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_20__.ViewChild, args: ['tbl_lmscalls', { static: false },] }],
    tbl_lmssecondarycontacts: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_20__.ViewChild, args: ['tbl_lmssecondarycontacts', { static: false },] }],
    tbl_lmsreminders: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_20__.ViewChild, args: ['tbl_lmsreminders', { static: false },] }],
    tbl_lmsquotes: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_20__.ViewChild, args: ['tbl_lmsquotes', { static: false },] }],
    tbl_boexpenses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_20__.ViewChild, args: ['tbl_boexpenses', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_20__.ViewChild, args: ['fileattachment', { static: false },] }]
};
lmsopportunityComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_23__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_20__.Component)({
        selector: 'app-lmsopportunity',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsopportunity_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_27__.KeyboardShortcutsService]
    })
], lmsopportunityComponent);



/***/ }),

/***/ 86382:
/*!*********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsopportunity/lmsopportunity.module.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsopportunityModule": () => (/* binding */ lmsopportunityModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _lmsopportunity_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lmsopportunity.routing */ 41370);
/* harmony import */ var _lmsopportunity_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmsopportunity.component */ 98436);
/* harmony import */ var _lmsquote_lmsquote_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lmsquote/lmsquote.module */ 31122);
/* harmony import */ var _lmscall_lmscall_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lmscall/lmscall.module */ 36396);
/* harmony import */ var _lmsopportunityproduct_lmsopportunityproduct_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lmsopportunityproduct/lmsopportunityproduct.module */ 43069);
/* harmony import */ var _lmsreminder_lmsreminder_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../lmsreminder/lmsreminder.module */ 9742);
/* harmony import */ var _lmssecondarycontact_lmssecondarycontact_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../lmssecondarycontact/lmssecondarycontact.module */ 69244);
/* harmony import */ var _boexpense_boexpense_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../boexpense/boexpense.module */ 56671);












let lmsopportunityModule = class lmsopportunityModule {
};
lmsopportunityModule = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _lmsopportunity_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _lmsquote_lmsquote_module__WEBPACK_IMPORTED_MODULE_4__.lmsquoteModule, _lmscall_lmscall_module__WEBPACK_IMPORTED_MODULE_5__.lmscallModule, _lmsopportunityproduct_lmsopportunityproduct_module__WEBPACK_IMPORTED_MODULE_6__.lmsopportunityproductModule, _lmsreminder_lmsreminder_module__WEBPACK_IMPORTED_MODULE_7__.lmsreminderModule, _lmssecondarycontact_lmssecondarycontact_module__WEBPACK_IMPORTED_MODULE_8__.lmssecondarycontactModule, _boexpense_boexpense_module__WEBPACK_IMPORTED_MODULE_9__.boexpenseModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_11__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_lmsopportunity_component__WEBPACK_IMPORTED_MODULE_3__.lmsopportunityComponent]
    })
], lmsopportunityModule);



/***/ }),

/***/ 41370:
/*!**********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsopportunity/lmsopportunity.routing.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _lmsopportunity_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lmsopportunity.component */ 98436);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'lmsopportunities', children: [
            { path: '', component: _lmsopportunity_component__WEBPACK_IMPORTED_MODULE_0__.lmsopportunityComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _lmsopportunity_component__WEBPACK_IMPORTED_MODULE_0__.lmsopportunityComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _lmsopportunity_component__WEBPACK_IMPORTED_MODULE_0__.lmsopportunityComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _lmsopportunity_component__WEBPACK_IMPORTED_MODULE_0__.lmsopportunityComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 92089:
/*!************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsquote/lmsquote.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsquoteComponent": () => (/* binding */ lmsquoteComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsquote_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmsquote.component.html */ 68972);
/* harmony import */ var _service_lmsquote_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmsquote.service */ 63006);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_lmsquotedetail_lmsquotedetail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../pages/forms/lmsquotedetail/lmsquotedetail.component */ 946);
/* harmony import */ var _service_lmsquotedetail_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../service/lmsquotedetail.service */ 51816);
/* harmony import */ var _pages_forms_lmsquotepaymentterm_lmsquotepaymentterm_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../pages/forms/lmsquotepaymentterm/lmsquotepaymentterm.component */ 38777);
/* harmony import */ var _service_lmsquotepaymentterm_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../service/lmsquotepaymentterm.service */ 86304);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions



//Shortcuts

//translator







//primeng services



//session,application constants




//custom fields & attachments


let lmsquoteComponent = class lmsquoteComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmsquote_service, lmsquotedetail_service, lmsquotepaymentterm_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmsquote_service = lmsquote_service;
        this.lmsquotedetail_service = lmsquotedetail_service;
        this.lmsquotepaymentterm_service = lmsquotepaymentterm_service;
        this.fb = fb;
        this.sharedService = sharedService;
        this.sessionService = sessionService;
        this.toastr = toastr;
        this.customfieldservice = customfieldservice;
        this.sanitizer = sanitizer;
        this.currentRoute = currentRoute;
        this.spinner = spinner;
        this.bmyrecord = false;
        this.hidelist = [];
        this.objvalues = [];
        this.viewHtml = ''; //stores html view of the screen
        this.showview = false; //view or edit mode
        this.theme = ""; //current theme
        //formdata: any;//current form data
        this.shortcuts = []; //keyboard keys
        this.showSubmit = true; //button to show
        this.showGoWorkFlow = false;
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_lmsquotes = false;
        this.bfilterPopulate_lmsquotedetails = false;
        this.bfilterPopulate_lmsquotepaymentterms = false;
        this.lmsquote_menuactions = [];
        this.lmsquotedetail_menuactions = [];
        this.lmsquotepaymentterm_menuactions = [];
        this.opportunityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.taxid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_11__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_11__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_lmsquotedetail_IDs = "";
        this.lmsquotedetails_ID = "1";
        this.Deleted_lmsquotepaymentterm_IDs = "";
        this.lmsquotepaymentterms_ID = "2";
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
        this.lmsquote_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            branchid: [null],
            leadid: [null],
            opportunityid: [null],
            opportunityiddesc: [null],
            quoteid: [null],
            reference: [null],
            quotedate: [null],
            details: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.required])],
            assignedto: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.required])],
            quoteamount: [null],
            currency: [null],
            currencydesc: [null],
            expirationdate: [null],
            taxid: [null],
            taxiddesc: [null],
            shippingruleid: [null],
            totalamount: [null],
            taxamount: [null],
            charges: [null],
            paymenttermid: [null],
            paymenttermiddesc: [null],
            termid: [null],
            termiddesc: [null],
            terms: [null],
            comments: [null],
            campaignid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.required])],
            leadsource: [null],
            leadsourcedesc: [null],
            supplierquotationid: [null],
            customfield: [null],
            attachment: [null],
            quotestatus: [null],
            quotestatusdesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmsquote_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmsquote_Form.dirty && this.lmsquote_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_15__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_15__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_15__.Observable.of(true);
    }
    //check Unique fields
    //navigation buttons
    first() {
        if (this.pkList.length > 0)
            this.PopulateScreen(this.pkList[0].pkcol);
    }
    last() {
        if (this.pkList.length > 0)
            this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }
    prev() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.quoteid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.quoteid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.quoteid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            //session & theme
            this.themeService.theme.subscribe((val) => {
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
            if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null)
                this.showview = this.maindata.showview;
            if (this.maindata != null && this.maindata.ScreenType != undefined && this.maindata.ScreenType != null) {
                this.viewHtml = '';
            }
            if (this.data != null && this.data.event != null && this.data.event.data != null)
                this.data = this.data.event.data;
            if (this.currentRoute.snapshot.paramMap.get('sourceKey') != null) {
                this.sourceKey = this.currentRoute.snapshot.paramMap.get('sourceKey');
            }
            let lmsquoteid = null;
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
            this.formid = lmsquoteid;
            //alert(lmsquoteid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_lmsquotedetails_TableConfig();
                setTimeout(() => {
                    //this.Set_lmsquotedetails_TableDropDownConfig();
                });
                this.Set_lmsquotepaymentterms_TableConfig();
                setTimeout(() => {
                    //this.Set_lmsquotepaymentterms_TableDropDownConfig();
                });
                this.FillCustomField();
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.lmsquote_service.getDefaultData().then(res => {
                this.opportunityid_List = res.list_opportunityid.value;
                this.currency_List = res.list_currency.value;
                this.taxid_List = res.list_taxid.value;
                this.paymenttermid_List = res.list_paymenttermid.value;
                this.termid_List = res.list_termid.value;
                this.leadsource_List = res.list_leadsource.value;
                this.quotestatus_List = res.list_quotestatus.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmsquote_service.get_lmsquotes_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmsquote_Form.markAsUntouched();
            this.lmsquote_Form.markAsPristine();
        });
    }
    onSelected_opportunityid(opportunityidDetail) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmsquote_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,
            });
        }
    }
    onSelected_taxid(taxidDetail) {
        if (taxidDetail.value && taxidDetail) {
            this.lmsquote_Form.patchValue({
                taxid: taxidDetail.value,
                taxiddesc: taxidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.lmsquote_Form != null)
            this.lmsquote_Form.reset();
        this.lmsquote_Form.patchValue({});
        this.lmsquote_Form.patchValue({
            quotedate: this.ngbDateParserFormatter.parse(new Date().toString()),
            expirationdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        });
        setTimeout(() => {
            this.lmsquotedetails_LoadTable();
            this.lmsquotepaymentterms_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let quoteid = this.lmsquote_Form.get('quoteid').value;
        if (quoteid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmsquote_service.delete_lmsquote(quoteid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmsquote_Form.patchValue({
            quoteid: null
        });
        if (this.formData.quoteid != null)
            this.formData.quoteid = null;
        for (let i = 0; i < this.tbl_lmsquotedetails.source.length; i++) {
            this.tbl_lmsquotedetails.source[i].quotedetailid = null;
        }
        for (let i = 0; i < this.tbl_lmsquotepaymentterms.source.length; i++) {
            this.tbl_lmsquotepaymentterms.source[i].paymenttermid = null;
        }
    }
    PopulateFromMainScreen(mainscreendata, bdisable) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {
                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        {}
                    else if (key == "quotedate")
                        this.lmsquote_Form.patchValue({ "quotedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "assignedto")
                        this.lmsquote_Form.patchValue({ "assignedto": mainscreendata[key] });
                    else if (key == "expirationdate")
                        this.lmsquote_Form.patchValue({ "expirationdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmsquote_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmsquote_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmsquote_Form.controls[key] != undefined) {
                                this.lmsquote_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("lmsquotes", this.CustomFormName, "", "", this.customFieldJson).then(res => {
                this.customFieldServiceList = res;
                if (this.customFieldServiceList != undefined)
                    this.customFieldVisible = (this.customFieldServiceList.fields.length > 0) ? true : false;
                return res;
            });
        });
    }
    onClose() {
        this.dialogRef.close(this.objvalues);
    }
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.details != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.details != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    opportunityid_onChange(evt) {
        let e = evt.value;
    }
    currency_onChange(evt) {
        let e = this.f.currency.value;
        this.lmsquote_Form.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
    }
    taxid_onChange(evt) {
        let e = evt.value;
    }
    paymenttermid_onChange(evt) {
        let e = evt.value;
        this.lmsquote_Form.patchValue({ paymenttermiddesc: evt.options[evt.options.selectedIndex].text });
    }
    termid_onChange(evt) {
        let e = evt.value;
        this.lmsquote_Form.patchValue({ termiddesc: evt.options[evt.options.selectedIndex].text });
    }
    leadsource_onChange(evt) {
        let e = this.f.leadsource.value;
        this.lmsquote_Form.patchValue({ leadsourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    quotestatus_onChange(evt) {
        let e = this.f.quotestatus.value;
        this.lmsquote_Form.patchValue({ quotestatusdesc: evt.options[evt.options.selectedIndex].text });
    }
    attachmentuploader(e) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileAttachmentList.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentFieldJson == null)
                this.attachmentFieldJson = [];
            max = Array.of(this.attachmentFieldJson).length;
            attachmentobj = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.KeyValuePair((this.attachmentFieldJson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentFieldJson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null)
                max = Array.of(this.attachmentlist).length;
            attachmentobj = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    edit_lmsquotes() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmsquote_service.get_lmsquotes_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmsquote;
                let formproperty = res.lmsquote.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmsquote.pkcol;
                this.formid = res.lmsquote.quoteid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmsquote;
        this.formid = res.lmsquote.quoteid;
        this.pkcol = res.lmsquote.pkcol;
        this.bmyrecord = false;
        if (res.lmsquote.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmsquote_Form.patchValue({
            branchid: res.lmsquote.branchid,
            leadid: res.lmsquote.leadid,
            opportunityid: res.lmsquote.opportunityid,
            opportunityiddesc: res.lmsquote.opportunityiddesc,
            quoteid: res.lmsquote.quoteid,
            reference: res.lmsquote.reference,
            quotedate: this.ngbDateParserFormatter.parse(res.lmsquote.quotedate),
            details: res.lmsquote.details,
            assignedto: JSON.parse(res.lmsquote.assignedto),
            quoteamount: res.lmsquote.quoteamount,
            currency: res.lmsquote.currency,
            currencydesc: res.lmsquote.currencydesc,
            expirationdate: this.ngbDateParserFormatter.parse(res.lmsquote.expirationdate),
            taxid: res.lmsquote.taxid,
            taxiddesc: res.lmsquote.taxiddesc,
            shippingruleid: res.lmsquote.shippingruleid,
            totalamount: res.lmsquote.totalamount,
            taxamount: res.lmsquote.taxamount,
            charges: res.lmsquote.charges,
            paymenttermid: res.lmsquote.paymenttermid,
            paymenttermiddesc: res.lmsquote.paymenttermiddesc,
            termid: res.lmsquote.termid,
            termiddesc: res.lmsquote.termiddesc,
            terms: res.lmsquote.terms,
            comments: res.lmsquote.comments,
            campaignid: res.lmsquote.campaignid,
            leadsource: res.lmsquote.leadsource,
            leadsourcedesc: res.lmsquote.leadsourcedesc,
            supplierquotationid: res.lmsquote.supplierquotationid,
            customfield: res.lmsquote.customfield,
            attachment: JSON.parse(res.lmsquote.attachment),
            quotestatus: res.lmsquote.quotestatus,
            quotestatusdesc: res.lmsquote.quotestatusdesc,
            status: res.lmsquote.status,
            statusdesc: res.lmsquote.statusdesc,
        });
        this.lmsquote_menuactions = res.lmsquote_menuactions;
        this.lmsquotedetail_menuactions = res.lmsquotedetail_menuactions;
        this.lmsquotedetails_visiblelist = res.lmsquotedetails_visiblelist;
        this.lmsquotepaymentterm_menuactions = res.lmsquotepaymentterm_menuactions;
        this.lmsquotepaymentterms_visiblelist = res.lmsquotepaymentterms_visiblelist;
        if (this.lmsquote_Form.get('customfield').value != null && this.lmsquote_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.lmsquote_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmsquote_Form.get('attachment').value != null && this.lmsquote_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.lmsquote_Form.get('attachment').value);
        //Child Tables if any
        this.Set_lmsquotedetails_TableConfig();
        this.lmsquotedetails_LoadTable(res.lmsquotedetails);
        this.Set_lmsquotepaymentterms_TableConfig();
        this.lmsquotepaymentterms_LoadTable(res.lmsquotepaymentterms);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmsquote_Form.controls) {
            let val = this.lmsquote_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmsquote_Form.controls[key] != null) {
                if (false) {}
                else if (false) {}
                else if (false) {}
                else
                    ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
            }
        }
        var re = /##(\w+)##/g;
        ret = ret.replace(re, '');
        return ret;
    }
    onSubmitDataDlg(bclear) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.lmsquote_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.lmsquote_Form.getRawValue();
            obj.quotedate = new Date(this.lmsquote_Form.get('quotedate').value ? this.ngbDateParserFormatter.format(this.lmsquote_Form.get('quotedate').value) + '  UTC' : null);
            if (this.lmsquote_Form.get('assignedto').value != null)
                obj.assignedto = JSON.stringify(this.lmsquote_Form.get('assignedto').value);
            obj.expirationdate = new Date(this.lmsquote_Form.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.lmsquote_Form.get('expirationdate').value) + '  UTC' : null);
            if (customfields != null)
                obj.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            obj.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(obj);
            yield this.sharedService.upload(this.fileAttachmentList);
            this.attachmentlist = [];
            if (this.fileattachment)
                this.fileattachment.clear();
            this.objvalues.push(obj);
            this.dialogRef.close(this.objvalues);
            setTimeout(() => {
                //this.dialogRef.destroy();
            }, 200);
        });
    }
    //This has to come from bomenuactions & procedures
    afterAction(mode) {
        let formname = "";
        let query = "";
        if (mode == "new")
            this.router.navigate(['/home/' + formname + '/' + formname + query]);
        else if (mode == "refresh")
            this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
    }
    onSubmitData(bclear) {
        var _a, _b, _c, _d;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.lmsquote_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.lmsquote_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmsquote_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmsquote_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmsquote_Form.controls[key] != null) {
                            this.formData[key] = this.lmsquote_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            this.formData.quotedate = new Date(this.lmsquote_Form.get('quotedate').value ? this.ngbDateParserFormatter.format(this.lmsquote_Form.get('quotedate').value) + '  UTC' : null);
            if (this.lmsquote_Form.get('assignedto').value != null)
                this.formData.assignedto = JSON.stringify(this.lmsquote_Form.get('assignedto').value);
            this.formData.expirationdate = new Date(this.lmsquote_Form.get('expirationdate').value ? this.ngbDateParserFormatter.format(this.lmsquote_Form.get('expirationdate').value) + '  UTC' : null);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_lmsquotedetail_IDs = this.Deleted_lmsquotedetail_IDs;
            this.formData.Deleted_lmsquotepaymentterm_IDs = this.Deleted_lmsquotepaymentterm_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.lmsquote_service.saveOrUpdate_lmsquotes(this.formData, (_b = (_a = this.tbl_lmsquotedetails) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_lmsquotepaymentterms) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_lmsquotedetails.source) {
                    for (let i = 0; i < this.tbl_lmsquotedetails.source.data.length; i++) {
                        if (this.tbl_lmsquotedetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmsquotedetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmsquotepaymentterms.source) {
                    for (let i = 0; i < this.tbl_lmsquotepaymentterms.source.data.length; i++) {
                        if (this.tbl_lmsquotepaymentterms.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmsquotepaymentterms.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmsquote);
                if (!bclear)
                    this.showview = true;
                if (document.getElementById("contentAreascroll") != undefined)
                    document.getElementById("contentAreascroll").scrollTop = 0;
                if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.dialogRef.close(this.objvalues);
                    return;
                }
                else {
                    if (document.getElementById("contentAreascroll") != undefined)
                        document.getElementById("contentAreascroll").scrollTop = 0;
                }
                this.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.objvalues.push(res.lmsquote);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsquote_Form.markAsUntouched();
                this.lmsquote_Form.markAsPristine();
            }), err => {
                debugger;
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            });
        });
    }
    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_lmsquotedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
        this.tbl_lmsquotepaymentterms.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
    }
    AddOrEdit_lmsquotedetail(event, quotedetailid, quoteid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmsquotedetail_lmsquotedetail_component__WEBPACK_IMPORTED_MODULE_4__.lmsquotedetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, quotedetailid, quoteid, visiblelist: this.lmsquotedetails_visiblelist, hidelist: this.lmsquotedetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmsquotedetails.source.add(res[i]);
                    }
                    this.tbl_lmsquotedetails.source.refresh();
                }
                else {
                    this.tbl_lmsquotedetails.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmsquotedetail(event, childID, i) {
        if (childID != null)
            this.Deleted_lmsquotedetail_IDs += childID + ",";
        this.tbl_lmsquotedetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmsquotepaymentterm(event, paymenttermid, quoteid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmsquotepaymentterm_lmsquotepaymentterm_component__WEBPACK_IMPORTED_MODULE_6__.lmsquotepaymenttermComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, paymenttermid, quoteid, visiblelist: this.lmsquotepaymentterms_visiblelist, hidelist: this.lmsquotepaymentterms_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmsquotepaymentterms.source.add(res[i]);
                    }
                    this.tbl_lmsquotepaymentterms.source.refresh();
                }
                else {
                    this.tbl_lmsquotepaymentterms.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmsquotepaymentterm(event, childID, i) {
        if (childID != null)
            this.Deleted_lmsquotepaymentterm_IDs += childID + ",";
        this.tbl_lmsquotepaymentterms.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_lmsquotedetails_Checkbox() {
        debugger;
        if (this.tbl_lmsquotedetails.source.settings['selectMode'] == 'multi')
            this.tbl_lmsquotedetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsquotedetails.source.settings['selectMode'] = 'multi';
        this.tbl_lmsquotedetails.source.initGrid();
    }
    delete_lmsquotedetails_All() {
        this.tbl_lmsquotedetails.source.settings['selectMode'] = 'single';
    }
    show_lmsquotedetails_Filter() {
        setTimeout(() => {
            //  this.Set_lmsquotedetails_TableDropDownConfig();
        });
        if (this.tbl_lmsquotedetails.source.settings != null)
            this.tbl_lmsquotedetails.source.settings['hideSubHeader'] = !this.tbl_lmsquotedetails.source.settings['hideSubHeader'];
        this.tbl_lmsquotedetails.source.initGrid();
    }
    show_lmsquotedetails_InActive() {
    }
    enable_lmsquotedetails_InActive() {
    }
    Set_lmsquotedetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmsquotedetails) {
                var clone = this.sharedService.clone(this.tbl_lmsquotedetails.source.settings);
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_opportunityid.value)), }, };
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_opportunityid.value)), }, };
                this.tbl_lmsquotedetails.source.settings = clone;
                this.tbl_lmsquotedetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsquotedetails.source.settings);
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_productid.value)), }, };
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_productid.value)), }, };
                this.tbl_lmsquotedetails.source.settings = clone;
                this.tbl_lmsquotedetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsquotedetails.source.settings);
                if (clone.columns['uom'] != undefined)
                    clone.columns['uom'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_uom.value)), }, };
                if (clone.columns['uom'] != undefined)
                    clone.columns['uom'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotedetails_uom.value)), }, };
                this.tbl_lmsquotedetails.source.settings = clone;
                this.tbl_lmsquotedetails.source.initGrid();
            }
            this.bfilterPopulate_lmsquotedetails = true;
        });
    }
    lmsquotedetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmsquotedetails_TableConfig() {
        this.lmsquotedetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true,
                delete: !this.showview,
                position: 'left',
                custom: this.lmsquotedetail_menuactions
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
    lmsquotedetails_LoadTable(lmsquotedetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotedetails_ID) >= 0) {
            if (this.tbl_lmsquotedetails != undefined)
                this.tbl_lmsquotedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
            if (this.tbl_lmsquotedetails != undefined)
                this.tbl_lmsquotedetails.source.load(lmsquotedetails);
            if (this.tbl_lmsquotedetails != undefined)
                this.tbl_lmsquotedetails.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmsquotedetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsquote_service.lmsquotedetails.length == 0)
    {
        this.tbl_lmsquotedetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmsquotedetail();
        this.lmsquote_service.lmsquotedetails.push(obj);
        this.tbl_lmsquotedetails.source.refresh();
        if ((this.lmsquote_service.lmsquotedetails.length / this.tbl_lmsquotedetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsquotedetails.source.getPaging().page)
        {
            this.tbl_lmsquotedetails.source.setPage((this.lmsquote_service.lmsquotedetails.length / this.tbl_lmsquotedetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmsquotedetails.source.grid.edit(this.tbl_lmsquotedetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmsquotedetails.source.data.indexOf(event.data);
    this.onDelete_lmsquotedetail(event,event.data.quotedetailid,((this.tbl_lmsquotedetails.source.getPaging().page-1) *this.tbl_lmsquotedetails.source.getPaging().perPage)+index);
    this.tbl_lmsquotedetails.source.refresh();
    break;
    }
    }
    
    */
    lmsquotedetails_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmsquotedetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmsquotedetail(event, event.data.quotedetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmsquotedetail(event, event.data.quotedetailid, ((this.tbl_lmsquotedetails.source.getPaging().page - 1) * this.tbl_lmsquotedetails.source.getPaging().perPage) + event.index);
                this.tbl_lmsquotedetails.source.refresh();
                break;
        }
    }
    lmsquotedetails_onDelete(obj) {
        let quotedetailid = obj.data.quotedetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsquote_service.delete_lmsquote(quotedetailid).then(res => this.lmsquotedetails_LoadTable());
        }
    }
    onCustom_lmsquotedetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmsquotedetails");
            let formname = objbomenuaction.actionname;
        });
    }
    lmsquotedetails_Paging(val) {
        debugger;
        this.tbl_lmsquotedetails.source.setPaging(1, val, true);
    }
    handle_lmsquotedetails_GridSelected(event) {
        this.lmsquotedetails_selectedindex = this.tbl_lmsquotedetails.source.findIndex(i => i.quotedetailid === event.data.quotedetailid);
    }
    Is_lmsquotedetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotedetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_lmsquotepaymentterms_Checkbox() {
        debugger;
        if (this.tbl_lmsquotepaymentterms.source.settings['selectMode'] == 'multi')
            this.tbl_lmsquotepaymentterms.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsquotepaymentterms.source.settings['selectMode'] = 'multi';
        this.tbl_lmsquotepaymentterms.source.initGrid();
    }
    delete_lmsquotepaymentterms_All() {
        this.tbl_lmsquotepaymentterms.source.settings['selectMode'] = 'single';
    }
    show_lmsquotepaymentterms_Filter() {
        setTimeout(() => {
            //  this.Set_lmsquotepaymentterms_TableDropDownConfig();
        });
        if (this.tbl_lmsquotepaymentterms.source.settings != null)
            this.tbl_lmsquotepaymentterms.source.settings['hideSubHeader'] = !this.tbl_lmsquotepaymentterms.source.settings['hideSubHeader'];
        this.tbl_lmsquotepaymentterms.source.initGrid();
    }
    show_lmsquotepaymentterms_InActive() {
    }
    enable_lmsquotepaymentterms_InActive() {
    }
    Set_lmsquotepaymentterms_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmsquotepaymentterms) {
                var clone = this.sharedService.clone(this.tbl_lmsquotepaymentterms.source.settings);
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_opportunityid.value)), }, };
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_opportunityid.value)), }, };
                this.tbl_lmsquotepaymentterms.source.settings = clone;
                this.tbl_lmsquotepaymentterms.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsquotepaymentterms.source.settings);
                if (clone.columns['quoteid'] != undefined)
                    clone.columns['quoteid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_quoteid.value)), }, };
                if (clone.columns['quoteid'] != undefined)
                    clone.columns['quoteid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_quoteid.value)), }, };
                this.tbl_lmsquotepaymentterms.source.settings = clone;
                this.tbl_lmsquotepaymentterms.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsquotepaymentterms.source.settings);
                if (clone.columns['duedate'] != undefined)
                    clone.columns['duedate'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_duedate.value)), }, };
                if (clone.columns['duedate'] != undefined)
                    clone.columns['duedate'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsquotepaymentterms_duedate.value)), }, };
                this.tbl_lmsquotepaymentterms.source.settings = clone;
                this.tbl_lmsquotepaymentterms.source.initGrid();
            }
            this.bfilterPopulate_lmsquotepaymentterms = true;
        });
    }
    lmsquotepaymentterms_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmsquotepaymentterms_TableConfig() {
        this.lmsquotepaymentterms_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true,
                delete: !this.showview,
                position: 'left',
                custom: this.lmsquotepaymentterm_menuactions
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
                opportunityiddesc: {
                    title: 'Opportunity',
                    type: 'html',
                    filter: true,
                },
                description: {
                    title: 'Description',
                    type: '',
                    filter: true,
                },
                duedatedesc: {
                    title: 'Due Date',
                    type: 'html',
                    filter: true,
                },
                invoicepercentage: {
                    title: 'Invoice Percentage',
                    type: 'number',
                    filter: true,
                },
                paymentamount: {
                    title: 'Payment Amount',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    lmsquotepaymentterms_LoadTable(lmsquotepaymentterms = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotepaymentterms_ID) >= 0) {
            if (this.tbl_lmsquotepaymentterms != undefined)
                this.tbl_lmsquotepaymentterms.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
            if (this.tbl_lmsquotepaymentterms != undefined)
                this.tbl_lmsquotepaymentterms.source.load(lmsquotepaymentterms);
            if (this.tbl_lmsquotepaymentterms != undefined)
                this.tbl_lmsquotepaymentterms.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmsquotepaymentterms_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsquote_service.lmsquotepaymentterms.length == 0)
    {
        this.tbl_lmsquotepaymentterms.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmsquotepaymentterm();
        this.lmsquote_service.lmsquotepaymentterms.push(obj);
        this.tbl_lmsquotepaymentterms.source.refresh();
        if ((this.lmsquote_service.lmsquotepaymentterms.length / this.tbl_lmsquotepaymentterms.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsquotepaymentterms.source.getPaging().page)
        {
            this.tbl_lmsquotepaymentterms.source.setPage((this.lmsquote_service.lmsquotepaymentterms.length / this.tbl_lmsquotepaymentterms.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmsquotepaymentterms.source.grid.edit(this.tbl_lmsquotepaymentterms.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmsquotepaymentterms.source.data.indexOf(event.data);
    this.onDelete_lmsquotepaymentterm(event,event.data.paymenttermid,((this.tbl_lmsquotepaymentterms.source.getPaging().page-1) *this.tbl_lmsquotepaymentterms.source.getPaging().perPage)+index);
    this.tbl_lmsquotepaymentterms.source.refresh();
    break;
    }
    }
    
    */
    lmsquotepaymentterms_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmsquotepaymentterm(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmsquotepaymentterm(event, event.data.paymenttermid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmsquotepaymentterm(event, event.data.paymenttermid, ((this.tbl_lmsquotepaymentterms.source.getPaging().page - 1) * this.tbl_lmsquotepaymentterms.source.getPaging().perPage) + event.index);
                this.tbl_lmsquotepaymentterms.source.refresh();
                break;
        }
    }
    lmsquotepaymentterms_onDelete(obj) {
        let paymenttermid = obj.data.paymenttermid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsquote_service.delete_lmsquote(paymenttermid).then(res => this.lmsquotepaymentterms_LoadTable());
        }
    }
    onCustom_lmsquotepaymentterms_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmsquotepaymentterms");
            let formname = objbomenuaction.actionname;
        });
    }
    lmsquotepaymentterms_Paging(val) {
        debugger;
        this.tbl_lmsquotepaymentterms.source.setPaging(1, val, true);
    }
    handle_lmsquotepaymentterms_GridSelected(event) {
        this.lmsquotepaymentterms_selectedindex = this.tbl_lmsquotepaymentterms.source.findIndex(i => i.paymenttermid === event.data.paymenttermid);
    }
    Is_lmsquotepaymentterms_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsquotepaymentterms_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
lmsquoteComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_18__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_20__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_21__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_10__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_22__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__.DialogService },
    { type: _service_lmsquote_service__WEBPACK_IMPORTED_MODULE_1__.lmsquoteService },
    { type: _service_lmsquotedetail_service__WEBPACK_IMPORTED_MODULE_5__.lmsquotedetailService },
    { type: _service_lmsquotepaymentterm_service__WEBPACK_IMPORTED_MODULE_7__.lmsquotepaymenttermService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_8__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_9__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_12__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_24__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_21__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_25__.NgxSpinnerService }
];
lmsquoteComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['customform', { static: false },] }],
    tbl_lmsquotedetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_lmsquotedetails', { static: false },] }],
    tbl_lmsquotepaymentterms: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_lmsquotepaymentterms', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['fileattachment', { static: false },] }]
};
lmsquoteComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
        selector: 'app-lmsquote',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsquote_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_20__.KeyboardShortcutsService]
    })
], lmsquoteComponent);



/***/ }),

/***/ 31122:
/*!*********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsquote/lmsquote.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsquoteModule": () => (/* binding */ lmsquoteModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _lmsquote_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lmsquote.routing */ 58805);
/* harmony import */ var _lmsquote_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmsquote.component */ 92089);






let lmsquoteModule = class lmsquoteModule {
};
lmsquoteModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _lmsquote_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_lmsquote_component__WEBPACK_IMPORTED_MODULE_3__.lmsquoteComponent]
    })
], lmsquoteModule);



/***/ }),

/***/ 58805:
/*!**********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsquote/lmsquote.routing.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _lmsquote_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lmsquote.component */ 92089);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'lmsquotes', children: [
            { path: '', component: _lmsquote_component__WEBPACK_IMPORTED_MODULE_0__.lmsquoteComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _lmsquote_component__WEBPACK_IMPORTED_MODULE_0__.lmsquoteComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _lmsquote_component__WEBPACK_IMPORTED_MODULE_0__.lmsquoteComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _lmsquote_component__WEBPACK_IMPORTED_MODULE_0__.lmsquoteComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 38777:
/*!**********************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsquotepaymentterm/lmsquotepaymentterm.component.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsquotepaymenttermComponent": () => (/* binding */ lmsquotepaymenttermComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsquotepaymentterm_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmsquotepaymentterm.component.html */ 87394);
/* harmony import */ var _service_lmsquotepaymentterm_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmsquotepaymentterm.service */ 86304);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);









//Shortcuts

//translator



//primeng services



//session,application constants




//custom fields & attachments

let lmsquotepaymenttermComponent = class lmsquotepaymenttermComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmsquotepaymentterm_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmsquotepaymentterm_service = lmsquotepaymentterm_service;
        this.fb = fb;
        this.sharedService = sharedService;
        this.sessionService = sessionService;
        this.toastr = toastr;
        this.sanitizer = sanitizer;
        this.currentRoute = currentRoute;
        this.spinner = spinner;
        this.bmyrecord = false;
        this.hidelist = [];
        this.objvalues = [];
        this.viewHtml = ''; //stores html view of the screen
        this.showview = false; //view or edit mode
        this.theme = ""; //current theme
        //formdata: any;//current form data
        this.shortcuts = []; //keyboard keys
        this.showSubmit = true; //button to show
        this.showGoWorkFlow = false;
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_lmsquotepaymentterms = false;
        this.lmsquotepaymentterm_menuactions = [];
        this.opportunityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete
        this.quoteid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
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
        this.lmsquotepaymentterm_Form = this.fb.group({
            pk: [null],
            paymenttermid: [null],
            branchid: [null],
            leadid: [null],
            opportunityid: [null],
            opportunityiddesc: [null],
            quoteid: [null],
            quoteiddesc: [null],
            description: [null],
            duedate: [null],
            duedatedesc: [null],
            invoicepercentage: [null],
            paymentamount: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmsquotepaymentterm_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmsquotepaymentterm_Form.dirty && this.lmsquotepaymentterm_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_8__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_8__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_8__.Observable.of(true);
    }
    //check Unique fields
    //navigation buttons
    first() {
        if (this.pkList.length > 0)
            this.PopulateScreen(this.pkList[0].pkcol);
    }
    last() {
        if (this.pkList.length > 0)
            this.PopulateScreen(this.pkList[this.pkList.length - 1].pkcol);
    }
    prev() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.paymenttermid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.paymenttermid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.paymenttermid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            //session & theme
            this.themeService.theme.subscribe((val) => {
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
            if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null)
                this.showview = this.maindata.showview;
            if (this.maindata != null && this.maindata.ScreenType != undefined && this.maindata.ScreenType != null) {
                this.viewHtml = '';
            }
            if (this.data != null && this.data.event != null && this.data.event.data != null)
                this.data = this.data.event.data;
            if (this.currentRoute.snapshot.paramMap.get('sourceKey') != null) {
                this.sourceKey = this.currentRoute.snapshot.paramMap.get('sourceKey');
            }
            let lmsquotepaymenttermid = null;
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
            this.formid = lmsquotepaymenttermid;
            //alert(lmsquotepaymenttermid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.lmsquotepaymentterm_service.getDefaultData().then(res => {
                this.opportunityid_List = res.list_opportunityid.value;
                this.quoteid_List = res.list_quoteid.value;
                this.duedate_List = res.list_duedate.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmsquotepaymentterm_service.get_lmsquotepaymentterms_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmsquotepaymentterm_Form.markAsUntouched();
            this.lmsquotepaymentterm_Form.markAsPristine();
        });
    }
    onSelected_opportunityid(opportunityidDetail) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmsquotepaymentterm_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,
            });
        }
    }
    onSelected_quoteid(quoteidDetail) {
        if (quoteidDetail.value && quoteidDetail) {
            this.lmsquotepaymentterm_Form.patchValue({
                quoteid: quoteidDetail.value,
                quoteiddesc: quoteidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.lmsquotepaymentterm_Form != null)
            this.lmsquotepaymentterm_Form.reset();
        this.lmsquotepaymentterm_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let paymenttermid = this.lmsquotepaymentterm_Form.get('paymenttermid').value;
        if (paymenttermid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmsquotepaymentterm_service.delete_lmsquotepaymentterm(paymenttermid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmsquotepaymentterm_Form.patchValue({
            paymenttermid: null
        });
        if (this.formData.paymenttermid != null)
            this.formData.paymenttermid = null;
    }
    PopulateFromMainScreen(mainscreendata, bdisable) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {
                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        {}
                    else if (ctrltype == "string") {
                        this.lmsquotepaymentterm_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmsquotepaymentterm_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmsquotepaymentterm_Form.controls[key] != undefined) {
                                this.lmsquotepaymentterm_Form.controls[key].disable({ onlySelf: true });
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
    opportunityid_onChange(evt) {
        let e = evt.value;
    }
    quoteid_onChange(evt) {
        let e = evt.value;
    }
    duedate_onChange(evt) {
        let e = this.f.duedate.value;
        this.lmsquotepaymentterm_Form.patchValue({ duedatedesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_lmsquotepaymentterms() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmsquotepaymentterm_service.get_lmsquotepaymentterms_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmsquotepaymentterm;
                let formproperty = res.lmsquotepaymentterm.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmsquotepaymentterm.pkcol;
                this.formid = res.lmsquotepaymentterm.paymenttermid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmsquotepaymentterm;
        this.formid = res.lmsquotepaymentterm.paymenttermid;
        this.pkcol = res.lmsquotepaymentterm.pkcol;
        this.bmyrecord = false;
        if (res.lmsquotepaymentterm.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmsquotepaymentterm_Form.patchValue({
            paymenttermid: res.lmsquotepaymentterm.paymenttermid,
            branchid: res.lmsquotepaymentterm.branchid,
            leadid: res.lmsquotepaymentterm.leadid,
            opportunityid: res.lmsquotepaymentterm.opportunityid,
            opportunityiddesc: res.lmsquotepaymentterm.opportunityiddesc,
            quoteid: res.lmsquotepaymentterm.quoteid,
            quoteiddesc: res.lmsquotepaymentterm.quoteiddesc,
            description: res.lmsquotepaymentterm.description,
            duedate: res.lmsquotepaymentterm.duedate,
            duedatedesc: res.lmsquotepaymentterm.duedatedesc,
            invoicepercentage: res.lmsquotepaymentterm.invoicepercentage,
            paymentamount: res.lmsquotepaymentterm.paymentamount,
            status: res.lmsquotepaymentterm.status,
            statusdesc: res.lmsquotepaymentterm.statusdesc,
        });
        this.lmsquotepaymentterm_menuactions = res.lmsquotepaymentterm_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmsquotepaymentterm_Form.controls) {
            let val = this.lmsquotepaymentterm_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmsquotepaymentterm_Form.controls[key] != null) {
                if (false) {}
                else if (false) {}
                else if (false) {}
                else
                    ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
            }
        }
        var re = /##(\w+)##/g;
        ret = ret.replace(re, '');
        return ret;
    }
    onSubmitDataDlg(bclear) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.lmsquotepaymentterm_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.lmsquotepaymentterm_Form.getRawValue();
            console.log(obj);
            this.objvalues.push(obj);
            this.dialogRef.close(this.objvalues);
            setTimeout(() => {
                //this.dialogRef.destroy();
            }, 200);
        });
    }
    //This has to come from bomenuactions & procedures
    afterAction(mode) {
        let formname = "";
        let query = "";
        if (mode == "new")
            this.router.navigate(['/home/' + formname + '/' + formname + query]);
        else if (mode == "refresh")
            this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
    }
    onSubmitData(bclear) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.lmsquotepaymentterm_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.lmsquotepaymentterm_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmsquotepaymentterm_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmsquotepaymentterm_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmsquotepaymentterm_Form.controls[key] != null) {
                            this.formData[key] = this.lmsquotepaymentterm_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.lmsquotepaymentterm_service.saveOrUpdate_lmsquotepaymentterms(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmsquotepaymentterm);
                if (!bclear)
                    this.showview = true;
                if (document.getElementById("contentAreascroll") != undefined)
                    document.getElementById("contentAreascroll").scrollTop = 0;
                if (!bclear && this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.dialogRef.close(this.objvalues);
                    return;
                }
                else {
                    if (document.getElementById("contentAreascroll") != undefined)
                        document.getElementById("contentAreascroll").scrollTop = 0;
                }
                this.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.objvalues.push(res.lmsquotepaymentterm);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsquotepaymentterm_Form.markAsUntouched();
                this.lmsquotepaymentterm_Form.markAsPristine();
            }), err => {
                debugger;
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            });
        });
    }
    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
};
lmsquotepaymenttermComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_lmsquotepaymentterm_service__WEBPACK_IMPORTED_MODULE_1__.lmsquotepaymenttermService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
lmsquotepaymenttermComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-lmsquotepaymentterm',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsquotepaymentterm_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], lmsquotepaymenttermComponent);



/***/ }),

/***/ 85095:
/*!***************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmsopportunity.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsopportunityService": () => (/* binding */ lmsopportunityService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmsopportunityService = class lmsopportunityService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmsopportunities(formData, lmsopportunityproducts, lmscalls, lmssecondarycontacts, lmsreminders, lmsquotes, boexpenses) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { lmsopportunityproducts: lmsopportunityproducts.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmscalls: lmscalls.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmssecondarycontacts: lmssecondarycontacts.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmsreminders: lmsreminders.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmsquotes: lmsquotes.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), boexpenses: boexpenses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity' + '/getdefaultdata').toPromise();
        }
    }
    get_lmsopportunities_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity').toPromise();
        }
    }
    getListBy_opportunityid(opportunityid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity' + '/opportunityid/' + opportunityid).toPromise();
        }
    }
    getListBy_opportunitystage(opportunitystage) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity' + '/opportunitystage/' + opportunitystage).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity' + '/param/' + key).toPromise();
        }
    }
    get_lmsopportunities_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity' + '/e/' + id).toPromise();
        }
    }
    get_lmsopportunities_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity' + '/' + id).toPromise();
        }
    }
    delete_lmsopportunity(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity' + '/' + id).toPromise();
        }
    }
    getlmsopportunitiesListbyopportunitystage(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity/' + dt + '').toPromise();
        }
    }
    getlmsopportunitiesListbymonthwise(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsopportunity/' + dt + '').toPromise();
        }
    }
    getList_leadid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_leadid').toPromise();
    }
    getList_opportunityid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_opportunityid').toPromise();
    }
    getList_leadby() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_leadby').toPromise();
    }
    getList_opportunitytype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_opportunitytype/').toPromise();
    }
    getList_opportunitystage() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_opportunitystage/').toPromise();
    }
    getList_stagesubcategory(categoryid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_stagesubcategory/categoryid').toPromise();
    }
    getList_opportunitysize() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_opportunitysize/').toPromise();
    }
    getList_nextstep() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_nextstep/').toPromise();
    }
    getList_possibilityofclosure() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_possibilityofclosure/').toPromise();
    }
    getList_leadsource() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_leadsource/').toPromise();
    }
    getList_budget() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_budget/').toPromise();
    }
    getList_criticality() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_criticality/').toPromise();
    }
    getList_priority() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_priority/').toPromise();
    }
    getList_campaignid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_campaignid').toPromise();
    }
    getList_territory() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_territory/').toPromise();
    }
    getList_reasonforloss() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsopportunity' + '/getList_reasonforloss/').toPromise();
    }
};
lmsopportunityService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmsopportunityService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmsopportunityService);



/***/ }),

/***/ 63006:
/*!*********************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmsquote.service.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsquoteService": () => (/* binding */ lmsquoteService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let lmsquoteService = class lmsquoteService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmsquotes(formData, lmsquotedetails, lmsquotepaymentterms) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { lmsquotedetails: lmsquotedetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmsquotepaymentterms: lmsquotepaymentterms.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquote', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquote' + '/getdefaultdata').toPromise();
        }
    }
    get_lmsquotes_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquote').toPromise();
        }
    }
    getListBy_quoteid(quoteid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquote' + '/quoteid/' + quoteid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquote' + '/param/' + key).toPromise();
        }
    }
    get_lmsquotes_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquote' + '/e/' + id).toPromise();
        }
    }
    get_lmsquotes_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquote' + '/' + id).toPromise();
        }
    }
    delete_lmsquote(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquote' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquote')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(lmsquote => new lmsquote(lmsquote.branchid, lmsquote.leadid, lmsquote.opportunityid, lmsquote.opportunityiddesc, lmsquote.quoteid, lmsquote.reference, lmsquote.quotedate, lmsquote.details, lmsquote.assignedto, lmsquote.quoteamount, lmsquote.currency, lmsquote.currencydesc, lmsquote.expirationdate, lmsquote.taxid, lmsquote.taxiddesc, lmsquote.shippingruleid, lmsquote.totalamount, lmsquote.taxamount, lmsquote.charges, lmsquote.paymenttermid, lmsquote.paymenttermiddesc, lmsquote.termid, lmsquote.termiddesc, lmsquote.terms, lmsquote.comments, lmsquote.campaignid, lmsquote.leadsource, lmsquote.leadsourcedesc, lmsquote.supplierquotationid, lmsquote.customfield, lmsquote.attachment, lmsquote.quotestatus, lmsquote.quotestatusdesc, lmsquote.status, "", ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(lmsquote => lmsquote.details.includes(filter.name));
            return response;
        }));
    }
    getList_opportunityid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsquote' + '/getList_opportunityid').toPromise();
    }
    getList_currency() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsquote' + '/getList_currency/').toPromise();
    }
    getList_taxid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsquote' + '/getList_taxid').toPromise();
    }
    getList_paymenttermid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsquote' + '/getList_paymenttermid').toPromise();
    }
    getList_termid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsquote' + '/getList_termid').toPromise();
    }
    getList_leadsource() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsquote' + '/getList_leadsource/').toPromise();
    }
    getList_quotestatus() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsquote' + '/getList_quotestatus/').toPromise();
    }
};
lmsquoteService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmsquoteService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], lmsquoteService);



/***/ }),

/***/ 86304:
/*!********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmsquotepaymentterm.service.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsquotepaymenttermService": () => (/* binding */ lmsquotepaymenttermService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmsquotepaymenttermService = class lmsquotepaymenttermService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmsquotepaymentterms(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquotepaymentterm', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/getdefaultdata').toPromise();
        }
    }
    get_lmsquotepaymentterms_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquotepaymentterm').toPromise();
        }
    }
    getListBy_paymenttermid(paymenttermid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/paymenttermid/' + paymenttermid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/param/' + key).toPromise();
        }
    }
    get_lmsquotepaymentterms_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/e/' + id).toPromise();
        }
    }
    get_lmsquotepaymentterms_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/' + id).toPromise();
        }
    }
    delete_lmsquotepaymentterm(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsquotepaymentterm' + '/' + id).toPromise();
        }
    }
    getList_opportunityid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsquotepaymentterm' + '/getList_opportunityid').toPromise();
    }
    getList_quoteid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsquotepaymentterm' + '/getList_quoteid').toPromise();
    }
    getList_duedate() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsquotepaymentterm' + '/getList_duedate/').toPromise();
    }
};
lmsquotepaymenttermService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmsquotepaymenttermService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmsquotepaymenttermService);



/***/ }),

/***/ 15336:
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmsopportunity/lmsopportunity.component.html ***!
  \*****************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmsopportunity_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Opportunities' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmsopportunities()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmsopportunity_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.opportunityid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.opportunityid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <p-accordion [multiple]='true'>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true)) && maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"branchid\" class=\"control-label\">Branch</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.branchid?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"branchid\" formControlName=\"branchid\" class=\"form-control\">\r\n        </div>\r\n\r\n\r\n        <!--leadid-->\r\n\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('leadid') == -1) && (leadidvisible==undefined || leadidvisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n          style='' class=\"col-3\"><label for=\"leadid\" class=\"control-label\" (click)=\"AddOrEdit_leadid(null)\">Lead</label>\r\n          <select *ngIf=\"!showview\" id=\"leadid\" (change)=\"leadid_onChange($event.target)\" formControlName=\"leadid\"\r\n            class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of leadid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.leadiddesc?.value}}</label>\r\n        </div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('opportunitydetail') == -1) && (opportunitydetailvisible==undefined || opportunitydetailvisible==true))\"\r\n          style='width:1500px' class=\"col-12 \">\r\n          <label for=\"opportunitydetail\" class=\"control-label required\">Opportunity Detail</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.opportunitydetail?.value}}</label>\r\n          <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"opportunitydetail\" required\r\n            formControlName=\"opportunitydetail\" class=\"form-control\">\r\n</textarea>\r\n          <app-field-error-display [displayError]=\"f.opportunitydetail.errors?.required\"\r\n            errorMsg=\"Enter {{'Opportunity Detail' | translate}}\">\r\n          </app-field-error-display>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--leadby-->\r\n\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div *ngIf=\"((hidelist.indexOf('leadby') == -1) && (leadbyvisible==undefined || leadbyvisible==true))\" style=''\r\n          class=\"col-3\"><label for=\"leadby\" class=\"control-label required\" (click)=\"AddOrEdit_leadby(null)\">Lead\r\n            By</label>\r\n          <app-popupselect *ngIf=\"!showview\" [options]=\"leadby_List\" [optionsEvent]=\"leadby_optionsEvent\"\r\n            [form]=\"bousermaster\" (selectItem)=\"onSelected_leadby($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n            formControlName=\"leadby\" id=\"value\" desc=\"label\"></app-popupselect>\r\n          <div class=\"input-group\">\r\n          </div>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.leadbydesc?.value}}</label>\r\n          <app-field-error-display [displayError]=\"f.leadby.errors?.required\"\r\n            errorMsg=\"Enter {{'Lead By' | translate}}\">\r\n          </app-field-error-display>\r\n        </div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <p-accordionTab header='Opportunity Details' [selected]='true'>\r\n\r\n\r\n        <!--opportunitytype-->\r\n\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('opportunitytype') == -1) && (opportunitytypevisible==undefined || opportunitytypevisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"opportunitytype\" class=\"control-label\">Opportunity Type</label>\r\n            <select *ngIf=\"!showview\" id=\"opportunitytype\" (change)=\"opportunitytype_onChange($event.target)\"\r\n              formControlName=\"opportunitytype\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of opportunitytype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.opportunitytypedesc?.value}}</label>\r\n          </div>\r\n\r\n\r\n          <!--opportunitystage-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('opportunitystage') == -1) && (opportunitystagevisible==undefined || opportunitystagevisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"opportunitystage\" class=\"control-label required\"\r\n              (click)=\"AddOrEdit_opportunitystage(null)\" (click)=\"AddOrEdit_opportunitystage(null)\">Opportunity\r\n              Stage</label>\r\n            <select *ngIf=\"!showview\" id=\"opportunitystage\" required (change)=\"opportunitystage_onChange($event.target)\"\r\n              formControlName=\"opportunitystage\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of opportunitystage_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.opportunitystagedesc?.value}}</label>\r\n            <app-field-error-display [displayError]=\"f.opportunitystage.errors?.required\"\r\n              errorMsg=\"Enter {{'Opportunity Stage' | translate}}\">\r\n            </app-field-error-display>\r\n          </div>\r\n\r\n\r\n          <!--stagesubcategory-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('stagesubcategory') == -1) && (stagesubcategoryvisible==undefined || stagesubcategoryvisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"stagesubcategory\" class=\"control-label\"\r\n              (click)=\"AddOrEdit_stagesubcategory(null)\">Sub Category</label>\r\n            <select *ngIf=\"!showview\" id=\"stagesubcategory\" (change)=\"stagesubcategory_onChange($event.target)\"\r\n              formControlName=\"stagesubcategory\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of stagesubcategory_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.stagesubcategorydesc?.value}}</label>\r\n          </div>\r\n\r\n\r\n          <!--opportunitysize-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('opportunitysize') == -1) && (opportunitysizevisible==undefined || opportunitysizevisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"opportunitysize\" class=\"control-label required\">Opportunity Size</label>\r\n            <select *ngIf=\"!showview\" id=\"opportunitysize\" required (change)=\"opportunitysize_onChange($event.target)\"\r\n              formControlName=\"opportunitysize\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of opportunitysize_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.opportunitysizedesc?.value}}</label>\r\n            <app-field-error-display [displayError]=\"f.opportunitysize.errors?.required\"\r\n              errorMsg=\"Enter {{'Opportunity Size' | translate}}\">\r\n            </app-field-error-display>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <!--nextstep-->\r\n\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('nextstep') == -1) && (nextstepvisible==undefined || nextstepvisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"nextstep\" class=\"control-label required\">Next Step</label>\r\n            <select *ngIf=\"!showview\" id=\"nextstep\" required (change)=\"nextstep_onChange($event.target)\"\r\n              formControlName=\"nextstep\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of nextstep_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.nextstepdesc?.value}}</label>\r\n            <app-field-error-display [displayError]=\"f.nextstep.errors?.required\"\r\n              errorMsg=\"Enter {{'Next Step' | translate}}\">\r\n            </app-field-error-display>\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('nextstepdetail') == -1) && (nextstepdetailvisible==undefined || nextstepdetailvisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"nextstepdetail\" class=\"control-label\">Next Step Detail</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.nextstepdetail?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"nextstepdetail\"\r\n              formControlName=\"nextstepdetail\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <!--possibilityofclosure-->\r\n\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('possibilityofclosure') == -1) && (possibilityofclosurevisible==undefined || possibilityofclosurevisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"possibilityofclosure\" class=\"control-label required\">Possibility of\r\n              Closure</label>\r\n            <select *ngIf=\"!showview\" id=\"possibilityofclosure\" required\r\n              (change)=\"possibilityofclosure_onChange($event.target)\" formControlName=\"possibilityofclosure\"\r\n              class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of possibilityofclosure_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.possibilityofclosuredesc?.value}}</label>\r\n            <app-field-error-display [displayError]=\"f.possibilityofclosure.errors?.required\"\r\n              errorMsg=\"Enter {{'Possibility of Closure' | translate}}\">\r\n            </app-field-error-display>\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('dealvalue') == -1) && (dealvaluevisible==undefined || dealvaluevisible==true)) && f.opportunitystage.value =='W'\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"dealvalue\" class=\"control-label\">Deal Value</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.dealvalue?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"dealvalue\" formControlName=\"dealvalue\" class=\"form-control\">\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n      </p-accordionTab>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <p-accordionTab header='Dates' [selected]='true'>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('tenderpublishdate') == -1) && (tenderpublishdatevisible==undefined || tenderpublishdatevisible==true)) && f.opportunitytype.value =='T'\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"tenderpublishdate\" class=\"control-label\">Tender Publish Date</label>\r\n            <label *ngIf=\"showview\"\r\n              class=\"labelview\">{{ngbDateParserFormatter.format(f.tenderpublishdate?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #tenderpublishdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"tenderpublishdateformpicker\"\r\n                id=\"tenderpublishdate\" formControlName=\"tenderpublishdate\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"tenderpublishdateformpicker.toggle()\"\r\n                type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('prebiddate') == -1) && (prebiddatevisible==undefined || prebiddatevisible==true)) && f.opportunitytype.value =='T'\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"prebiddate\" class=\"control-label\">Prebid date</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.prebiddate?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #prebiddateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"prebiddateformpicker\" id=\"prebiddate\"\r\n                formControlName=\"prebiddate\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"prebiddateformpicker.toggle()\"\r\n                type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('submissiondate') == -1) && (submissiondatevisible==undefined || submissiondatevisible==true)) && f.opportunitytype.value =='T'\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"submissiondate\" class=\"control-label\">Submission Date</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.submissiondate?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #submissiondateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"submissiondateformpicker\"\r\n                id=\"submissiondate\" formControlName=\"submissiondate\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"submissiondateformpicker.toggle()\"\r\n                type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('openingdate') == -1) && (openingdatevisible==undefined || openingdatevisible==true)) && f.opportunitytype.value =='T'\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"openingdate\" class=\"control-label\">Opening Date</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.openingdate?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #openingdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"openingdateformpicker\" id=\"openingdate\"\r\n                formControlName=\"openingdate\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"openingdateformpicker.toggle()\"\r\n                type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('finalopeningdate') == -1) && (finalopeningdatevisible==undefined || finalopeningdatevisible==true)) && f.opportunitytype.value =='T'\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"finalopeningdate\" class=\"control-label\">Final Opening Date</label>\r\n            <label *ngIf=\"showview\"\r\n              class=\"labelview\">{{ngbDateParserFormatter.format(f.finalopeningdate?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #finalopeningdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"finalopeningdateformpicker\"\r\n                id=\"finalopeningdate\" formControlName=\"finalopeningdate\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"finalopeningdateformpicker.toggle()\"\r\n                type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('otherdate1') == -1) && (otherdate1visible==undefined || otherdate1visible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"otherdate1\" class=\"control-label\">Other Date1</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.otherdate1?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #otherdate1formpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"otherdate1formpicker\" id=\"otherdate1\"\r\n                formControlName=\"otherdate1\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"otherdate1formpicker.toggle()\"\r\n                type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('otherdatenotes1') == -1) && (otherdatenotes1visible==undefined || otherdatenotes1visible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"otherdatenotes1\" class=\"control-label\">Other Date Notes1</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.otherdatenotes1?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"otherdatenotes1\" formControlName=\"otherdatenotes1\" class=\"form-control\">\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('otherdate2') == -1) && (otherdate2visible==undefined || otherdate2visible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"otherdate2\" class=\"control-label\">Other Date2</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.otherdate2?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #otherdate2formpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"otherdate2formpicker\" id=\"otherdate2\"\r\n                formControlName=\"otherdate2\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"otherdate2formpicker.toggle()\"\r\n                type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('otherdatenotes2') == -1) && (otherdatenotes2visible==undefined || otherdatenotes2visible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"otherdatenotes2\" class=\"control-label\">Other Date Notes2</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.otherdatenotes2?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"otherdatenotes2\" formControlName=\"otherdatenotes2\" class=\"form-control\">\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('otherdate3') == -1) && (otherdate3visible==undefined || otherdate3visible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"otherdate3\" class=\"control-label\">Other Date3</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.otherdate3?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #otherdate3formpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"otherdate3formpicker\" id=\"otherdate3\"\r\n                formControlName=\"otherdate3\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"otherdate3formpicker.toggle()\"\r\n                type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('otherdatenotes3') == -1) && (otherdatenotes3visible==undefined || otherdatenotes3visible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"otherdatenotes3\" class=\"control-label\">Other Date Notes3</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.otherdatenotes3?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"otherdatenotes3\" formControlName=\"otherdatenotes3\" class=\"form-control\">\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('technology') == -1) && (technologyvisible==undefined || technologyvisible==true)) && f.opportunitytype.value =='O'\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"technology\" class=\"control-label\">Technology</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.technology?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"technology\" formControlName=\"technology\" class=\"form-control\">\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('resources') == -1) && (resourcesvisible==undefined || resourcesvisible==true)) && f.opportunitytype.value =='O'\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"resources\" class=\"control-label\">Resources</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.resources?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"resources\" formControlName=\"resources\" class=\"form-control\">\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('monthlybilling') == -1) && (monthlybillingvisible==undefined || monthlybillingvisible==true)) && f.opportunitytype.value =='O'\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"monthlybilling\" class=\"control-label\">Monthly Billing</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.monthlybilling?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"monthlybilling\" formControlName=\"monthlybilling\" class=\"form-control\">\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n      </p-accordionTab>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('requirementdetails') == -1) && (requirementdetailsvisible==undefined || requirementdetailsvisible==true))\"\r\n          style='width:1500px' class=\"col-12 \">\r\n          <label for=\"requirementdetails\" class=\"control-label\">Requirement Details</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.requirementdetails?.value}}</label>\r\n          <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"requirementdetails\"\r\n            formControlName=\"requirementdetails\" class=\"form-control\">\r\n</textarea>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--leadsource-->\r\n\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('leadsource') == -1) && (leadsourcevisible==undefined || leadsourcevisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"leadsource\" class=\"control-label\">Lead Source</label>\r\n          <select *ngIf=\"!showview\" id=\"leadsource\" (change)=\"leadsource_onChange($event.target)\"\r\n            formControlName=\"leadsource\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of leadsource_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.leadsourcedesc?.value}}</label>\r\n        </div>\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('creationdate') == -1) && (creationdatevisible==undefined || creationdatevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"creationdate\" class=\"control-label\">Creation Date</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.creationdate?.value)}}</label>\r\n          <div class=\"input-group\" *ngIf=\"!showview\">\r\n            <input #creationdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n              [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"creationdateformpicker\" id=\"creationdate\"\r\n              formControlName=\"creationdate\" class=\"form-control\">\r\n            <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"creationdateformpicker.toggle()\"\r\n              type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <!--budget-->\r\n\r\n        <div *ngIf=\"((hidelist.indexOf('budget') == -1) && (budgetvisible==undefined || budgetvisible==true))\" style=''\r\n          class=\"col-3\"><label for=\"budget\" class=\"control-label\">Budget</label>\r\n          <select *ngIf=\"!showview\" id=\"budget\" (change)=\"budget_onChange($event.target)\" formControlName=\"budget\"\r\n            class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of budget_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.budgetdesc?.value}}</label>\r\n        </div>\r\n        <div *ngIf=\"((hidelist.indexOf('tat') == -1) && (tatvisible==undefined || tatvisible==true))\" style=''\r\n          class=\"col-3 \">\r\n          <label for=\"tat\" class=\"control-label\">T A T</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.tat?.value}}</label>\r\n          <app-duration *ngIf=\"!showview\" id=\"tat\" readonly formControlName=\"tat\">\r\n          </app-duration>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div *ngIf=\"((hidelist.indexOf('actualtat') == -1) && (actualtatvisible==undefined || actualtatvisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"actualtat\" class=\"control-label\">Actual T A T</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.actualtat?.value}}</label>\r\n          <app-duration *ngIf=\"!showview\" id=\"actualtat\" readonly formControlName=\"actualtat\">\r\n          </app-duration>\r\n        </div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('assignedto') == -1) && (assignedtovisible==undefined || assignedtovisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"assignedto\" class=\"control-label\">Assigned To</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.assignedto?.value}}</label>\r\n          <app-useraccess *ngIf=\"!showview\" id=\"assignedto\" formControlName=\"assignedto\">\r\n          </app-useraccess>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--criticality-->\r\n\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('criticality') == -1) && (criticalityvisible==undefined || criticalityvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"criticality\" class=\"control-label\">Criticality</label>\r\n          <select *ngIf=\"!showview\" id=\"criticality\" (change)=\"criticality_onChange($event.target)\"\r\n            formControlName=\"criticality\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of criticality_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.criticalitydesc?.value}}</label>\r\n        </div>\r\n\r\n\r\n        <!--priority-->\r\n\r\n        <div *ngIf=\"((hidelist.indexOf('priority') == -1) && (priorityvisible==undefined || priorityvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"priority\" class=\"control-label\">Priority</label>\r\n          <select *ngIf=\"!showview\" id=\"priority\" (change)=\"priority_onChange($event.target)\" formControlName=\"priority\"\r\n            class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of priority_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.prioritydesc?.value}}</label>\r\n        </div>\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('expectedclosuredate') == -1) && (expectedclosuredatevisible==undefined || expectedclosuredatevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"expectedclosuredate\" class=\"control-label\">Expected Closure Date</label>\r\n          <label *ngIf=\"showview\"\r\n            class=\"labelview\">{{ngbDateParserFormatter.format(f.expectedclosuredate?.value)}}</label>\r\n          <div class=\"input-group\" *ngIf=\"!showview\">\r\n            <input #expectedclosuredateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n              [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"expectedclosuredateformpicker\"\r\n              id=\"expectedclosuredate\" formControlName=\"expectedclosuredate\" class=\"form-control\">\r\n            <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"expectedclosuredateformpicker.toggle()\"\r\n              type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n          </div>\r\n        </div>\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('expectedvalue') == -1) && (expectedvaluevisible==undefined || expectedvaluevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"expectedvalue\" class=\"control-label\">Expected Value</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.expectedvalue?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"expectedvalue\" formControlName=\"expectedvalue\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('successrate') == -1) && (successratevisible==undefined || successratevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"successrate\" class=\"control-label\">Success Rate</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.successrate?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"successrate\" formControlName=\"successrate\" class=\"form-control\">\r\n        </div>\r\n\r\n\r\n        <!--campaignid-->\r\n\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('campaignid') == -1) && (campaignidvisible==undefined || campaignidvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"campaignid\" class=\"control-label\"\r\n            (click)=\"AddOrEdit_campaignid(null)\">Campaign</label>\r\n          <select *ngIf=\"!showview\" id=\"campaignid\" (change)=\"campaignid_onChange($event.target)\"\r\n            formControlName=\"campaignid\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of campaignid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.campaigniddesc?.value}}</label>\r\n        </div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div *ngIf=\"((hidelist.indexOf('notes') == -1) && (notesvisible==undefined || notesvisible==true))\" style=''\r\n          class=\"col-3 \">\r\n          <label for=\"notes\" class=\"control-label\">Notes</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.notes?.value}}</label>\r\n          <app-comment *ngIf=\"!showview\" id=\"notes\" formControlName=\"notes\" [label]=\"'Notes'\">\r\n          </app-comment>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('decisionmaker') == -1) && (decisionmakervisible==undefined || decisionmakervisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"decisionmaker\" class=\"control-label\">Decision Maker</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.decisionmaker?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"decisionmaker\" formControlName=\"decisionmaker\" class=\"form-control\">\r\n        </div>\r\n\r\n\r\n        <!--territory-->\r\n\r\n        <div *ngIf=\"((hidelist.indexOf('territory') == -1) && (territoryvisible==undefined || territoryvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"territory\" class=\"control-label\">Territory</label>\r\n          <select *ngIf=\"!showview\" id=\"territory\" (change)=\"territory_onChange($event.target)\"\r\n            formControlName=\"territory\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of territory_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.territorydesc?.value}}</label>\r\n        </div>\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('competitors') == -1) && (competitorsvisible==undefined || competitorsvisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"competitors\" class=\"control-label\">Competitors</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.competitors?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"competitors\" formControlName=\"competitors\" class=\"form-control\">\r\n        </div>\r\n        <div *ngIf=\"((hidelist.indexOf('winner') == -1) && (winnervisible==undefined || winnervisible==true))\" style=''\r\n          class=\"col-3 \">\r\n          <label for=\"winner\" class=\"control-label\">Winner</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.winner?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"winner\" formControlName=\"winner\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--reasonforloss-->\r\n\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('reasonforloss') == -1) && (reasonforlossvisible==undefined || reasonforlossvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"reasonforloss\" class=\"control-label\">Reason For Loss</label>\r\n          <select *ngIf=\"!showview\" id=\"reasonforloss\" (change)=\"reasonforloss_onChange($event.target)\"\r\n            formControlName=\"reasonforloss\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of reasonforloss_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.reasonforlossdesc?.value}}</label>\r\n        </div>\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('closeddate') == -1) && (closeddatevisible==undefined || closeddatevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"closeddate\" class=\"control-label\">Closed Date</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.closeddate?.value)}}</label>\r\n          <div class=\"input-group\" *ngIf=\"!showview\">\r\n            <input #closeddateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n              [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"closeddateformpicker\" id=\"closeddate\"\r\n              formControlName=\"closeddate\" class=\"form-control\">\r\n            <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"closeddateformpicker.toggle()\" type=\"button\"><i\r\n                class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"((hidelist.indexOf('contactid') == -1) && (contactidvisible==undefined || contactidvisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"contactid\" class=\"control-label\">Contact</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.contactid?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"contactid\" formControlName=\"contactid\" class=\"form-control\">\r\n        </div>\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('lastcontactdate') == -1) && (lastcontactdatevisible==undefined || lastcontactdatevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"lastcontactdate\" class=\"control-label\">Last Contact Date</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.lastcontactdate?.value)}}</label>\r\n          <div class=\"input-group\" *ngIf=\"!showview\">\r\n            <input #lastcontactdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n              [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"lastcontactdateformpicker\"\r\n              id=\"lastcontactdate\" formControlName=\"lastcontactdate\" class=\"form-control\">\r\n            <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"lastcontactdateformpicker.toggle()\"\r\n              type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </p-accordion>\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n    <!-- child table lmsopportunityproducts-->\r\n    <div [ngClass]=\"Is_lmsopportunityproducts_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Products' | translate}}\r\n        <select class='child' id=\"lmsopportunityproductsPagingdropdown\"\r\n          (change)=\"lmsopportunityproducts_Paging($event.target.value)\" [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]=''\r\n                  (click)=\"lmsopportunityproducttoggleOption();lmsopportunityproducts_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmsopportunityproductsFilter()\"><i\r\n                    class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmsopportunityproducts_route(null, 'create')\"><i\r\n            class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmsopportunityproducts (userRowSelect)=\"handle_lmsopportunityproducts_GridSelected($event)\"\r\n        [settings]=\"lmsopportunityproducts_settings\" (custom)=\"onCustom_lmsopportunityproducts_Action($event)\"\r\n        [source]=\"tbl_lmsopportunityproducts?.source?.data\" (delete)=\"lmsopportunityproducts_route($event,'delete')\"\r\n        (deleteConfirm)=\"lmsopportunityproducts_route($event,'delete')\"\r\n        (create)=\"lmsopportunityproducts_route($event,'create')\"\r\n        (createConfirm)=\"lmsopportunityproducts_beforesave($event)\" (edit)=\"lmsopportunityproducts_route($event,'edit')\"\r\n        (editConfirm)=\"lmsopportunityproducts_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmsopportunityproducts-->\r\n    <!-- child table lmscalls-->\r\n    <div [ngClass]=\"Is_lmscalls_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Activities' | translate}}\r\n        <select class='child' id=\"lmscallsPagingdropdown\" (change)=\"lmscalls_Paging($event.target.value)\" [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]=''\r\n                  (click)=\"lmscalltoggleOption();lmscalls_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmscallsFilter()\"><i class=\"fa fa-filter\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmscalls_route(null, 'create')\"><i class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmscalls (userRowSelect)=\"handle_lmscalls_GridSelected($event)\"\r\n        [settings]=\"lmscalls_settings\" (custom)=\"onCustom_lmscalls_Action($event)\" [source]=\"tbl_lmscalls?.source?.data\"\r\n        (delete)=\"lmscalls_route($event,'delete')\" (deleteConfirm)=\"lmscalls_route($event,'delete')\"\r\n        (create)=\"lmscalls_route($event,'create')\" (createConfirm)=\"lmscalls_beforesave($event)\"\r\n        (edit)=\"lmscalls_route($event,'edit')\" (editConfirm)=\"lmscalls_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmscalls-->\r\n    <!-- child table lmssecondarycontacts-->\r\n    <div [ngClass]=\"Is_lmssecondarycontacts_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Secondary Contacts' | translate}}\r\n        <select class='child' id=\"lmssecondarycontactsPagingdropdown\"\r\n          (change)=\"lmssecondarycontacts_Paging($event.target.value)\" [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]=''\r\n                  (click)=\"lmssecondarycontacttoggleOption();lmssecondarycontacts_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmssecondarycontactsFilter()\"><i\r\n                    class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmssecondarycontacts_route(null, 'create')\"><i\r\n            class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmssecondarycontacts (userRowSelect)=\"handle_lmssecondarycontacts_GridSelected($event)\"\r\n        [settings]=\"lmssecondarycontacts_settings\" (custom)=\"onCustom_lmssecondarycontacts_Action($event)\"\r\n        [source]=\"tbl_lmssecondarycontacts?.source?.data\" (delete)=\"lmssecondarycontacts_route($event,'delete')\"\r\n        (deleteConfirm)=\"lmssecondarycontacts_route($event,'delete')\"\r\n        (create)=\"lmssecondarycontacts_route($event,'create')\" (createConfirm)=\"lmssecondarycontacts_beforesave($event)\"\r\n        (edit)=\"lmssecondarycontacts_route($event,'edit')\" (editConfirm)=\"lmssecondarycontacts_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmssecondarycontacts-->\r\n    <!-- child table lmsreminders-->\r\n    <div [ngClass]=\"Is_lmsreminders_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Reminders' | translate}}\r\n        <select class='child' id=\"lmsremindersPagingdropdown\" (change)=\"lmsreminders_Paging($event.target.value)\"\r\n          [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]=''\r\n                  (click)=\"lmsremindertoggleOption();lmsreminders_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmsremindersFilter()\"><i class=\"fa fa-filter\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmsreminders_route(null, 'create')\"><i class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmsreminders (userRowSelect)=\"handle_lmsreminders_GridSelected($event)\"\r\n        [settings]=\"lmsreminders_settings\" (custom)=\"onCustom_lmsreminders_Action($event)\"\r\n        [source]=\"tbl_lmsreminders?.source?.data\" (delete)=\"lmsreminders_route($event,'delete')\"\r\n        (deleteConfirm)=\"lmsreminders_route($event,'delete')\" (create)=\"lmsreminders_route($event,'create')\"\r\n        (createConfirm)=\"lmsreminders_beforesave($event)\" (edit)=\"lmsreminders_route($event,'edit')\"\r\n        (editConfirm)=\"lmsreminders_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmsreminders-->\r\n    <!-- child table lmsquotes-->\r\n    <div [ngClass]=\"Is_lmsquotes_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Quotes' | translate}}\r\n        <select class='child' id=\"lmsquotesPagingdropdown\" (change)=\"lmsquotes_Paging($event.target.value)\"\r\n          [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]=''\r\n                  (click)=\"lmsquotetoggleOption();lmsquotes_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmsquotesFilter()\"><i class=\"fa fa-filter\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmsquotes_route(null, 'create')\"><i class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmsquotes (userRowSelect)=\"handle_lmsquotes_GridSelected($event)\"\r\n        [settings]=\"lmsquotes_settings\" (custom)=\"onCustom_lmsquotes_Action($event)\"\r\n        [source]=\"tbl_lmsquotes?.source?.data\" (delete)=\"lmsquotes_route($event,'delete')\"\r\n        (deleteConfirm)=\"lmsquotes_route($event,'delete')\" (create)=\"lmsquotes_route($event,'create')\"\r\n        (createConfirm)=\"lmsquotes_beforesave($event)\" (edit)=\"lmsquotes_route($event,'edit')\"\r\n        (editConfirm)=\"lmsquotes_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmsquotes-->\r\n    <!-- child table boexpenses-->\r\n    <div [ngClass]=\"Is_boexpenses_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Expenses' | translate}}\r\n        <select class='child' id=\"boexpensesPagingdropdown\" (change)=\"boexpenses_Paging($event.target.value)\"\r\n          [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]=''\r\n                  (click)=\"boexpensetoggleOption();boexpenses_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showboexpensesFilter()\"><i class=\"fa fa-filter\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"boexpenses_route(null, 'create')\"><i class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_boexpenses (userRowSelect)=\"handle_boexpenses_GridSelected($event)\"\r\n        [settings]=\"boexpenses_settings\" (custom)=\"onCustom_boexpenses_Action($event)\"\r\n        [source]=\"tbl_boexpenses?.source?.data\" (delete)=\"boexpenses_route($event,'delete')\"\r\n        (deleteConfirm)=\"boexpenses_route($event,'delete')\" (create)=\"boexpenses_route($event,'create')\"\r\n        (createConfirm)=\"boexpenses_beforesave($event)\" (edit)=\"boexpenses_route($event,'edit')\"\r\n        (editConfirm)=\"boexpenses_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table boexpenses-->\r\n  </div>\r\n</form>");

/***/ }),

/***/ 68972:
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmsquote/lmsquote.component.html ***!
  \*****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmsquote_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Quotes' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmsquotes()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmsquote_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.quoteid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.quoteid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true)) && maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"branchid\" class=\"control-label\">Branch</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.branchid?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"branchid\" formControlName=\"branchid\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('leadid') == -1) && (leadidvisible==undefined || leadidvisible==true)) && maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"leadid\" class=\"control-label\">Lead</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.leadid?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"leadid\" formControlName=\"leadid\" class=\"form-control\">\r\n              </div>\r\n\r\n\r\n              <!--opportunityid-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('opportunityid') == -1) && (opportunityidvisible==undefined || opportunityidvisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n                style='' class=\"col-3\"><label for=\"opportunityid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_opportunityid(null)\">Opportunity</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"opportunityid_List\"\r\n                  [optionsEvent]=\"opportunityid_optionsEvent\" [form]=\"lmsopportunity\"\r\n                  (selectItem)=\"onSelected_opportunityid($event)\" [reportid]='vm3i3' [menuid]='vm3i3'\r\n                  formControlName=\"opportunityid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.opportunityiddesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('reference') == -1) && (referencevisible==undefined || referencevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"reference\" class=\"control-label\">Reference</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.reference?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"reference\" readonly formControlName=\"reference\" class=\"form-control\">\r\n                <ngx-barcode [bc-value]='f.reference.value' [bc-display-value]='true'></ngx-barcode>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('quotedate') == -1) && (quotedatevisible==undefined || quotedatevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"quotedate\" class=\"control-label\">Quote Date</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.quotedate?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #quotedateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"quotedateformpicker\" id=\"quotedate\"\r\n                    formControlName=\"quotedate\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"quotedateformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('details') == -1) && (detailsvisible==undefined || detailsvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"details\" class=\"control-label required\">Details</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.details?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"details\" required\r\n                  formControlName=\"details\" class=\"form-control\">\r\n</textarea>\r\n                <app-field-error-display [displayError]=\"f.details.errors?.required\"\r\n                  errorMsg=\"Enter {{'Details' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('assignedto') == -1) && (assignedtovisible==undefined || assignedtovisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"assignedto\" class=\"control-label required\">Assigned To</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.assignedto?.value}}</label>\r\n                <app-useraccess *ngIf=\"!showview\" id=\"assignedto\" required formControlName=\"assignedto\">\r\n                </app-useraccess>\r\n                <app-field-error-display [displayError]=\"f.assignedto.errors?.required\"\r\n                  errorMsg=\"Enter {{'Assigned To' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('quoteamount') == -1) && (quoteamountvisible==undefined || quoteamountvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"quoteamount\" class=\"control-label\">Quote Amount</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.quoteamount?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"quoteamount\" formControlName=\"quoteamount\" class=\"form-control\">\r\n              </div>\r\n\r\n\r\n              <!--currency-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('currency') == -1) && (currencyvisible==undefined || currencyvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"currency\" class=\"control-label\">Currency</label>\r\n                <select *ngIf=\"!showview\" id=\"currency\" (change)=\"currency_onChange($event.target)\"\r\n                  formControlName=\"currency\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of currency_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.currencydesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('expirationdate') == -1) && (expirationdatevisible==undefined || expirationdatevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"expirationdate\" class=\"control-label\">Expiration Date</label>\r\n                <label *ngIf=\"showview\"\r\n                  class=\"labelview\">{{ngbDateParserFormatter.format(f.expirationdate?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #expirationdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"expirationdateformpicker\"\r\n                    id=\"expirationdate\" formControlName=\"expirationdate\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"expirationdateformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--taxid-->\r\n\r\n              <div *ngIf=\"((hidelist.indexOf('taxid') == -1) && (taxidvisible==undefined || taxidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"taxid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_taxid(null)\">Tax</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"taxid_List\" [optionsEvent]=\"taxid_optionsEvent\"\r\n                  [form]=\"erptaxmaster\" (selectItem)=\"onSelected_taxid($event)\" [reportid]='wjjyy' [menuid]='wjjyy'\r\n                  formControlName=\"taxid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.taxiddesc?.value}}</label>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('shippingruleid') == -1) && (shippingruleidvisible==undefined || shippingruleidvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"shippingruleid\" class=\"control-label\">Shipping Rule</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.shippingruleid?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"shippingruleid\" formControlName=\"shippingruleid\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('totalamount') == -1) && (totalamountvisible==undefined || totalamountvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"totalamount\" class=\"control-label\">Total Amount</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.totalamount?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"totalamount\" formControlName=\"totalamount\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('taxamount') == -1) && (taxamountvisible==undefined || taxamountvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"taxamount\" class=\"control-label\">Tax Amount</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.taxamount?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"taxamount\" formControlName=\"taxamount\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('charges') == -1) && (chargesvisible==undefined || chargesvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"charges\" class=\"control-label\">Charges</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.charges?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"charges\" formControlName=\"charges\" class=\"form-control\">\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <!--paymenttermid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('paymenttermid') == -1) && (paymenttermidvisible==undefined || paymenttermidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"paymenttermid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_paymenttermid(null)\">Payment Term</label>\r\n                <select *ngIf=\"!showview\" id=\"paymenttermid\" (change)=\"paymenttermid_onChange($event.target)\"\r\n                  formControlName=\"paymenttermid\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of paymenttermid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.paymenttermiddesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--termid-->\r\n\r\n              <div *ngIf=\"((hidelist.indexOf('termid') == -1) && (termidvisible==undefined || termidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"termid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_termid(null)\">Term</label>\r\n                <select *ngIf=\"!showview\" id=\"termid\" (change)=\"termid_onChange($event.target)\" formControlName=\"termid\"\r\n                  class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of termid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.termiddesc?.value}}</label>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('terms') == -1) && (termsvisible==undefined || termsvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"terms\" class=\"control-label\">Terms</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.terms?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"terms\"\r\n                  formControlName=\"terms\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('comments') == -1) && (commentsvisible==undefined || commentsvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"comments\" class=\"control-label\">Comments</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.comments?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"comments\"\r\n                  formControlName=\"comments\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('campaignid') == -1) && (campaignidvisible==undefined || campaignidvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"campaignid\" class=\"control-label required\">Campaign</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.campaignid?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"campaignid\" required formControlName=\"campaignid\" class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.campaignid.errors?.required\"\r\n                  errorMsg=\"Enter {{'Campaign' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n\r\n\r\n              <!--leadsource-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('leadsource') == -1) && (leadsourcevisible==undefined || leadsourcevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"leadsource\" class=\"control-label\">Lead Source</label>\r\n                <select *ngIf=\"!showview\" id=\"leadsource\" (change)=\"leadsource_onChange($event.target)\"\r\n                  formControlName=\"leadsource\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of leadsource_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.leadsourcedesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('supplierquotationid') == -1) && (supplierquotationidvisible==undefined || supplierquotationidvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"supplierquotationid\" class=\"control-label\">Supplier Quotation</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.supplierquotationid?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"supplierquotationid\" formControlName=\"supplierquotationid\"\r\n                  class=\"form-control\">\r\n              </div>\r\n\r\n\r\n              <!--quotestatus-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('quotestatus') == -1) && (quotestatusvisible==undefined || quotestatusvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"quotestatus\" class=\"control-label\">Quote Status</label>\r\n                <select *ngIf=\"!showview\" id=\"quotestatus\" (change)=\"quotestatus_onChange($event.target)\"\r\n                  formControlName=\"quotestatus\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of quotestatus_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.quotestatusdesc?.value}}</label>\r\n              </div>\r\n            </div>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <!-- child table lmsquotedetails-->\r\n          <div [ngClass]=\"Is_lmsquotedetails_Visible()\">\r\n            <!--End-->\r\n            <h4 class=\"form-group sticky1  columns left\">{{'Details' | translate}}\r\n              <select class='child' id=\"lmsquotedetailsPagingdropdown\"\r\n                (change)=\"lmsquotedetails_Paging($event.target.value)\" [value]='20'>\r\n                <option value='20'>20</option>\r\n                <option value='50'>50</option>\r\n                <option value='100'>100</option>\r\n              </select>\r\n              <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                <li class=\"dropdown\">\r\n                  <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                    aria-expanded='false'> <span class='caret'></span></a>\r\n                  <ul class=\"dropdown-menu\">\r\n                    <li><a class=\"dropdown-item\" [routerLink]=''\r\n                        (click)=\"lmsquotedetailtoggleOption();lmsquotedetails_route(null, 'create')\"><i\r\n                          class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    <li role=\"separator\" class=\"divider\">\r\n                      <hr>\r\n                    </li>\r\n                    <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmsquotedetailsFilter()\"><i\r\n                          class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                    <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                          aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                  </ul>\r\n                </li>\r\n              </ul>\r\n              <a class=\"rightside\" [routerLink]='' (click)=\"lmsquotedetails_route(null, 'create')\"><i\r\n                  class=\"fa fa-plus\"></i></a>\r\n            </h4>\r\n            <ng2-smart-table #tbl_lmsquotedetails (userRowSelect)=\"handle_lmsquotedetails_GridSelected($event)\"\r\n              [settings]=\"lmsquotedetails_settings\" (custom)=\"onCustom_lmsquotedetails_Action($event)\"\r\n              [source]=\"tbl_lmsquotedetails?.source?.data\" (delete)=\"lmsquotedetails_route($event,'delete')\"\r\n              (deleteConfirm)=\"lmsquotedetails_route($event,'delete')\" (create)=\"lmsquotedetails_route($event,'create')\"\r\n              (createConfirm)=\"lmsquotedetails_beforesave($event)\" (edit)=\"lmsquotedetails_route($event,'edit')\"\r\n              (editConfirm)=\"lmsquotedetails_beforesave($event)\">\r\n            </ng2-smart-table>\r\n          </div>\r\n          <!--End of child table lmsquotedetails-->\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Quote Payment Terms</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table lmsquotepaymentterms-->\r\n            <div [ngClass]=\"Is_lmsquotepaymentterms_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Quote Payment Terms' | translate}}\r\n                <select class='child' id=\"lmsquotepaymenttermsPagingdropdown\"\r\n                  (change)=\"lmsquotepaymentterms_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"lmsquotepaymenttermtoggleOption();lmsquotepaymentterms_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmsquotepaymenttermsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"lmsquotepaymentterms_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_lmsquotepaymentterms\r\n                (userRowSelect)=\"handle_lmsquotepaymentterms_GridSelected($event)\"\r\n                [settings]=\"lmsquotepaymentterms_settings\" (custom)=\"onCustom_lmsquotepaymentterms_Action($event)\"\r\n                [source]=\"tbl_lmsquotepaymentterms?.source?.data\" (delete)=\"lmsquotepaymentterms_route($event,'delete')\"\r\n                (deleteConfirm)=\"lmsquotepaymentterms_route($event,'delete')\"\r\n                (create)=\"lmsquotepaymentterms_route($event,'create')\"\r\n                (createConfirm)=\"lmsquotepaymentterms_beforesave($event)\"\r\n                (edit)=\"lmsquotepaymentterms_route($event,'edit')\"\r\n                (editConfirm)=\"lmsquotepaymentterms_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table lmsquotepaymentterms-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 87394:
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmsquotepaymentterm/lmsquotepaymentterm.component.html ***!
  \***************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmsquotepaymentterm_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Quote Payment Terms' |\r\n        translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmsquotepaymentterms()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmsquotepaymentterm_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.paymenttermid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.paymenttermid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true)) && maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"branchid\" class=\"control-label\">Branch</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.branchid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"branchid\" formControlName=\"branchid\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('leadid') == -1) && (leadidvisible==undefined || leadidvisible==true)) && maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"leadid\" class=\"control-label\">Lead</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.leadid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"leadid\" formControlName=\"leadid\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--opportunityid-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('opportunityid') == -1) && (opportunityidvisible==undefined || opportunityidvisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n        style='' class=\"col-3\"><label for=\"opportunityid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_opportunityid(null)\">Opportunity</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"opportunityid_List\" [optionsEvent]=\"opportunityid_optionsEvent\"\r\n          [form]=\"lmsopportunity\" (selectItem)=\"onSelected_opportunityid($event)\" [reportid]='vm3i3' [menuid]='vm3i3'\r\n          formControlName=\"opportunityid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.opportunityiddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--quoteid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('quoteid') == -1) && (quoteidvisible==undefined || quoteidvisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"quoteid\" class=\"control-label\" (click)=\"AddOrEdit_quoteid(null)\">Quote</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"quoteid_List\" [optionsEvent]=\"quoteid_optionsEvent\"\r\n          [form]=\"erpsupplierquotationmaster\" (selectItem)=\"onSelected_quoteid($event)\" [reportid]='ewn6s'\r\n          [menuid]='ewn6s' formControlName=\"quoteid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.quoteiddesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('description') == -1) && (descriptionvisible==undefined || descriptionvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"description\" class=\"control-label\">Description</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.description?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"description\" formControlName=\"description\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--duedate-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('duedate') == -1) && (duedatevisible==undefined || duedatevisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"duedate\" class=\"control-label\">Due Date</label>\r\n        <select *ngIf=\"!showview\" id=\"duedate\" (change)=\"duedate_onChange($event.target)\" formControlName=\"duedate\"\r\n          class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of duedate_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.duedatedesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('invoicepercentage') == -1) && (invoicepercentagevisible==undefined || invoicepercentagevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"invoicepercentage\" class=\"control-label\">Invoice Percentage</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.invoicepercentage?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"invoicepercentage\" formControlName=\"invoicepercentage\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('paymentamount') == -1) && (paymentamountvisible==undefined || paymentamountvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"paymentamount\" class=\"control-label\">Payment Amount</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.paymentamount?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"paymentamount\" formControlName=\"paymentamount\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_lmsopportunity_lmsopportunity_module_ts.js.map