"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_lmscampaignmaster_lmscampaignmaster_module_ts"],{

/***/ 42076:
/*!******************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscampaignmaster/lmscampaignmaster.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscampaignmasterComponent": () => (/* binding */ lmscampaignmasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmscampaignmaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmscampaignmaster.component.html */ 29064);
/* harmony import */ var _service_lmscampaignmaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmscampaignmaster.service */ 6393);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component */ 55163);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_lmscampaigntask_lmscampaigntask_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/lmscampaigntask/lmscampaigntask.component */ 79414);
/* harmony import */ var _service_lmscampaigntask_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/lmscampaigntask.service */ 30163);
/* harmony import */ var _pages_forms_lmscampaignlocation_lmscampaignlocation_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/lmscampaignlocation/lmscampaignlocation.component */ 20341);
/* harmony import */ var _service_lmscampaignlocation_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../service/lmscampaignlocation.service */ 48131);
/* harmony import */ var _pages_forms_lmspost_lmspost_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../../pages/forms/lmspost/lmspost.component */ 59989);
/* harmony import */ var _service_lmspost_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../../service/lmspost.service */ 33197);
/* harmony import */ var _bobranchmaster_bobranchmaster_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../bobranchmaster/bobranchmaster.component */ 18035);
/* harmony import */ var _service_bobranchmaster_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../../../service/bobranchmaster.service */ 31866);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions

//child table



//Shortcuts

//translator











//primeng services



//session,application constants




//custom fields & attachments


let lmscampaignmasterComponent = class lmscampaignmasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmscampaignmaster_service, lmscampaigntask_service, lmscampaignlocation_service, lmspost_service, bobranchmaster_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmscampaignmaster_service = lmscampaignmaster_service;
        this.lmscampaigntask_service = lmscampaigntask_service;
        this.lmscampaignlocation_service = lmscampaignlocation_service;
        this.lmspost_service = lmspost_service;
        this.bobranchmaster_service = bobranchmaster_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_18__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_lmscampaignmasters = false;
        this.bfilterPopulate_lmscampaigntasks = false;
        this.bfilterPopulate_lmscampaignlocations = false;
        this.bfilterPopulate_lmsposts = false;
        this.bfilterPopulate_lmscampaignnoaccesses = false;
        this.lmscampaignmaster_menuactions = [];
        this.lmscampaigntask_menuactions = [];
        this.lmscampaignlocation_menuactions = [];
        this.lmspost_menuactions = [];
        this.Insertlmscampaignnoaccesses = [];
        this.lmscampaignnoaccess_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_16__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_16__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_lmscampaigntask_IDs = "";
        this.lmscampaigntasks_ID = "1";
        this.Deleted_lmscampaignlocation_IDs = "";
        this.lmscampaignlocations_ID = "2";
        this.Deleted_lmspost_IDs = "";
        this.lmsposts_ID = "3";
        this.Deleted_lmscampaignnoaccess_IDs = "";
        this.lmscampaignnoaccesses_ID = "4";
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
        this.lmscampaignmaster_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            productid: [null],
            productiddesc: [null],
            campaignid: [null],
            campaigncode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required])],
            campaignname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required])],
            campaigntype: [null],
            campaigntypedesc: [null],
            campaignowner: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required])],
            validfrom: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_19__.Validators.required])],
            validto: [null],
            startdate: [null],
            enddate: [null],
            details: [null],
            campaignscript: [null],
            territory: [null],
            territorydesc: [null],
            priority: [null],
            prioritydesc: [null],
            businessgoal: [null],
            businessgoaldesc: [null],
            targetmarket: [null],
            targetmarketdesc: [null],
            targetaudience: [null],
            targetaudiencedesc: [null],
            targetindustry: [null],
            targetindustrydesc: [null],
            strategy: [null],
            strategydesc: [null],
            targettype: [null],
            targettypedesc: [null],
            expectedofferaction: [null],
            expectedofferactiondesc: [null],
            expectedsales: [null],
            expectedrevenue: [null],
            expectedprofit: [null],
            expectedroi: [null],
            dailytarget: [null],
            actualachieved: [null],
            performancestatus: [null],
            performancestatusdesc: [null],
            budgetcost: [null],
            actualcost: [null],
            mediabudget: [null],
            actualmediacost: [null],
            phonenumber: [null],
            uniquephonenumber: [null],
            landingpage: [null],
            uniquelandingpage: [null],
            websitelinksavailable: [null],
            numberofpages: [null],
            enquiryresponsibility: [null],
            emailresponsibility: [null],
            campaignemail: [null],
            trackinboundcalls: [null],
            trackvisitors: [null],
            trackingdetails: [null],
            handlingvolumes: [null],
            trainingrequirement: [null],
            afterenquiry: [null],
            emailresponsetat: [null],
            afteremail: [null],
            customfield: [null],
            attachment: [null],
            campaignstatus: [null],
            campaignstatusdesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmscampaignmaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmscampaignmaster_Form.dirty && this.lmscampaignmaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_20__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_20__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_20__.Observable.of(true);
    }
    //check Unique fields
    campaigncodeexists(e) {
        debugger;
        let pos = this.pkList.map(function (e) { return e.campaigncode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
        if (pos >= 0 && this.pkList[pos].campaignid.toString() != this.formid.toString()) {
            if (confirm("This Campaign Code value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }
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
        let pos = this.pkList.map(function (e) { return e.campaignid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.campaignid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.campaignid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
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
            let lmscampaignmasterid = null;
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
            this.formid = lmscampaignmasterid;
            //alert(lmscampaignmasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_lmscampaigntasks_TableConfig();
                setTimeout(() => {
                    //this.Set_lmscampaigntasks_TableDropDownConfig();
                });
                this.Set_lmscampaignlocations_TableConfig();
                setTimeout(() => {
                    //this.Set_lmscampaignlocations_TableDropDownConfig();
                });
                this.Set_lmsposts_TableConfig();
                setTimeout(() => {
                    //this.Set_lmsposts_TableDropDownConfig();
                });
                this.Set_lmscampaignnoaccesses_TableConfig();
                setTimeout(() => {
                    //this.Set_lmscampaignnoaccesses_TableDropDownConfig();
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
            this.lmscampaignmaster_service.getDefaultData().then(res => {
                this.productid_List = res.list_productid.value;
                this.campaigntype_List = res.list_campaigntype.value;
                this.territory_List = res.list_territory.value;
                this.priority_List = res.list_priority.value;
                this.businessgoal_List = res.list_businessgoal.value;
                this.targetmarket_List = res.list_targetmarket.value;
                this.targetaudience_List = res.list_targetaudience.value;
                this.targetindustry_List = res.list_targetindustry.value;
                this.strategy_List = res.list_strategy.value;
                this.targettype_List = res.list_targettype.value;
                this.expectedofferaction_List = res.list_expectedofferaction.value;
                this.performancestatus_List = res.list_performancestatus.value;
                this.campaignstatus_List = res.list_campaignstatus.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmscampaignmaster_service.get_lmscampaignmasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmscampaignmaster_Form.markAsUntouched();
            this.lmscampaignmaster_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.lmscampaignmaster_Form != null)
            this.lmscampaignmaster_Form.reset();
        this.lmscampaignmaster_Form.patchValue({});
        setTimeout(() => {
            this.lmscampaigntasks_LoadTable();
            this.lmscampaignlocations_LoadTable();
            this.lmsposts_LoadTable();
            this.Insertlmscampaignnoaccesses = [];
            this.lmscampaignnoaccesses_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let campaignid = this.lmscampaignmaster_Form.get('campaignid').value;
        if (campaignid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmscampaignmaster_service.delete_lmscampaignmaster(campaignid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmscampaignmaster_Form.patchValue({
            campaignid: null
        });
        if (this.formData.campaignid != null)
            this.formData.campaignid = null;
        for (let i = 0; i < this.tbl_lmscampaigntasks.source.length; i++) {
            this.tbl_lmscampaigntasks.source[i].taskid = null;
        }
        for (let i = 0; i < this.tbl_lmscampaignlocations.source.length; i++) {
            this.tbl_lmscampaignlocations.source[i].locationid = null;
        }
        for (let i = 0; i < this.tbl_lmsposts.source.length; i++) {
            this.tbl_lmsposts.source[i].postid = null;
        }
        for (let i = 0; i < this.tbl_lmscampaignnoaccesses.source.length; i++) {
            this.tbl_lmscampaignnoaccesses.source[i].accessid = null;
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
                    else if (key == "campaignowner")
                        this.lmscampaignmaster_Form.patchValue({ "campaignowner": mainscreendata[key] });
                    else if (key == "validfrom")
                        this.lmscampaignmaster_Form.patchValue({ "validfrom": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "validto")
                        this.lmscampaignmaster_Form.patchValue({ "validto": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "startdate")
                        this.lmscampaignmaster_Form.patchValue({ "startdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "enddate")
                        this.lmscampaignmaster_Form.patchValue({ "enddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "enquiryresponsibility")
                        this.lmscampaignmaster_Form.patchValue({ "enquiryresponsibility": mainscreendata[key] });
                    else if (key == "emailresponsibility")
                        this.lmscampaignmaster_Form.patchValue({ "emailresponsibility": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.lmscampaignmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmscampaignmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmscampaignmaster_Form.controls[key] != undefined) {
                                this.lmscampaignmaster_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("lmscampaignmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    productid_onChange(evt) {
        let e = evt.value;
        this.lmscampaignmaster_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
    }
    campaigntype_onChange(evt) {
        let e = this.f.campaigntype.value;
        this.lmscampaignmaster_Form.patchValue({ campaigntypedesc: evt.options[evt.options.selectedIndex].text });
    }
    territory_onChange(evt) {
        let e = this.f.territory.value;
        this.lmscampaignmaster_Form.patchValue({ territorydesc: evt.options[evt.options.selectedIndex].text });
    }
    priority_onChange(evt) {
        let e = this.f.priority.value;
        this.lmscampaignmaster_Form.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    businessgoal_onChange(evt) {
        let e = this.f.businessgoal.value;
        this.lmscampaignmaster_Form.patchValue({ businessgoaldesc: evt.options[evt.options.selectedIndex].text });
    }
    targetmarket_onChange(evt) {
        let e = this.f.targetmarket.value;
        this.lmscampaignmaster_Form.patchValue({ targetmarketdesc: evt.options[evt.options.selectedIndex].text });
    }
    targetaudience_onChange(evt) {
        let e = this.f.targetaudience.value;
        this.lmscampaignmaster_Form.patchValue({ targetaudiencedesc: evt.options[evt.options.selectedIndex].text });
    }
    targetindustry_onChange(evt) {
        let e = this.f.targetindustry.value;
        this.lmscampaignmaster_Form.patchValue({ targetindustrydesc: evt.options[evt.options.selectedIndex].text });
    }
    strategy_onChange(evt) {
        let e = this.f.strategy.value;
        this.lmscampaignmaster_Form.patchValue({ strategydesc: evt.options[evt.options.selectedIndex].text });
    }
    targettype_onChange(evt) {
        let e = this.f.targettype.value;
        this.lmscampaignmaster_Form.patchValue({ targettypedesc: evt.options[evt.options.selectedIndex].text });
    }
    expectedofferaction_onChange(evt) {
        let e = this.f.expectedofferaction.value;
        this.lmscampaignmaster_Form.patchValue({ expectedofferactiondesc: evt.options[evt.options.selectedIndex].text });
    }
    performancestatus_onChange(evt) {
        let e = this.f.performancestatus.value;
        this.lmscampaignmaster_Form.patchValue({ performancestatusdesc: evt.options[evt.options.selectedIndex].text });
    }
    campaignstatus_onChange(evt) {
        let e = this.f.campaignstatus.value;
        this.lmscampaignmaster_Form.patchValue({ campaignstatusdesc: evt.options[evt.options.selectedIndex].text });
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
    edit_lmscampaignmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmscampaignmaster_service.get_lmscampaignmasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmscampaignmaster;
                let formproperty = res.lmscampaignmaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmscampaignmaster.pkcol;
                this.formid = res.lmscampaignmaster.campaignid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmscampaignmaster;
        this.formid = res.lmscampaignmaster.campaignid;
        this.pkcol = res.lmscampaignmaster.pkcol;
        this.bmyrecord = false;
        if (res.lmscampaignmaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmscampaignmaster_Form.patchValue({
            productid: res.lmscampaignmaster.productid,
            productiddesc: res.lmscampaignmaster.productiddesc,
            campaignid: res.lmscampaignmaster.campaignid,
            campaigncode: res.lmscampaignmaster.campaigncode,
            campaignname: res.lmscampaignmaster.campaignname,
            campaigntype: res.lmscampaignmaster.campaigntype,
            campaigntypedesc: res.lmscampaignmaster.campaigntypedesc,
            campaignowner: JSON.parse(res.lmscampaignmaster.campaignowner),
            validfrom: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.validfrom),
            validto: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.validto),
            startdate: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.startdate),
            enddate: this.ngbDateParserFormatter.parse(res.lmscampaignmaster.enddate),
            details: res.lmscampaignmaster.details,
            campaignscript: res.lmscampaignmaster.campaignscript,
            territory: res.lmscampaignmaster.territory,
            territorydesc: res.lmscampaignmaster.territorydesc,
            priority: res.lmscampaignmaster.priority,
            prioritydesc: res.lmscampaignmaster.prioritydesc,
            businessgoal: res.lmscampaignmaster.businessgoal,
            businessgoaldesc: res.lmscampaignmaster.businessgoaldesc,
            targetmarket: res.lmscampaignmaster.targetmarket,
            targetmarketdesc: res.lmscampaignmaster.targetmarketdesc,
            targetaudience: res.lmscampaignmaster.targetaudience,
            targetaudiencedesc: res.lmscampaignmaster.targetaudiencedesc,
            targetindustry: res.lmscampaignmaster.targetindustry,
            targetindustrydesc: res.lmscampaignmaster.targetindustrydesc,
            strategy: res.lmscampaignmaster.strategy,
            strategydesc: res.lmscampaignmaster.strategydesc,
            targettype: res.lmscampaignmaster.targettype,
            targettypedesc: res.lmscampaignmaster.targettypedesc,
            expectedofferaction: res.lmscampaignmaster.expectedofferaction,
            expectedofferactiondesc: res.lmscampaignmaster.expectedofferactiondesc,
            expectedsales: res.lmscampaignmaster.expectedsales,
            expectedrevenue: res.lmscampaignmaster.expectedrevenue,
            expectedprofit: res.lmscampaignmaster.expectedprofit,
            expectedroi: res.lmscampaignmaster.expectedroi,
            dailytarget: res.lmscampaignmaster.dailytarget,
            actualachieved: res.lmscampaignmaster.actualachieved,
            performancestatus: res.lmscampaignmaster.performancestatus,
            performancestatusdesc: res.lmscampaignmaster.performancestatusdesc,
            budgetcost: res.lmscampaignmaster.budgetcost,
            actualcost: res.lmscampaignmaster.actualcost,
            mediabudget: res.lmscampaignmaster.mediabudget,
            actualmediacost: res.lmscampaignmaster.actualmediacost,
            phonenumber: res.lmscampaignmaster.phonenumber,
            uniquephonenumber: res.lmscampaignmaster.uniquephonenumber,
            landingpage: res.lmscampaignmaster.landingpage,
            uniquelandingpage: res.lmscampaignmaster.uniquelandingpage,
            websitelinksavailable: res.lmscampaignmaster.websitelinksavailable,
            numberofpages: res.lmscampaignmaster.numberofpages,
            enquiryresponsibility: JSON.parse(res.lmscampaignmaster.enquiryresponsibility),
            emailresponsibility: JSON.parse(res.lmscampaignmaster.emailresponsibility),
            campaignemail: res.lmscampaignmaster.campaignemail,
            trackinboundcalls: res.lmscampaignmaster.trackinboundcalls,
            trackvisitors: res.lmscampaignmaster.trackvisitors,
            trackingdetails: res.lmscampaignmaster.trackingdetails,
            handlingvolumes: res.lmscampaignmaster.handlingvolumes,
            trainingrequirement: res.lmscampaignmaster.trainingrequirement,
            afterenquiry: res.lmscampaignmaster.afterenquiry,
            emailresponsetat: res.lmscampaignmaster.emailresponsetat,
            afteremail: res.lmscampaignmaster.afteremail,
            customfield: res.lmscampaignmaster.customfield,
            attachment: JSON.parse(res.lmscampaignmaster.attachment),
            campaignstatus: res.lmscampaignmaster.campaignstatus,
            campaignstatusdesc: res.lmscampaignmaster.campaignstatusdesc,
            status: res.lmscampaignmaster.status,
            statusdesc: res.lmscampaignmaster.statusdesc,
        });
        this.lmscampaignmaster_menuactions = res.lmscampaignmaster_menuactions;
        this.lmscampaigntask_menuactions = res.lmscampaigntask_menuactions;
        this.lmscampaigntasks_visiblelist = res.lmscampaigntasks_visiblelist;
        this.lmscampaignlocation_menuactions = res.lmscampaignlocation_menuactions;
        this.lmscampaignlocations_visiblelist = res.lmscampaignlocations_visiblelist;
        this.lmspost_menuactions = res.lmspost_menuactions;
        this.lmsposts_visiblelist = res.lmsposts_visiblelist;
        this.lmscampaignnoaccess_menuactions = res.lmscampaignnoaccess_menuactions;
        this.lmscampaignnoaccesses_visiblelist = res.lmscampaignnoaccesses_visiblelist;
        if (this.lmscampaignmaster_Form.get('customfield').value != null && this.lmscampaignmaster_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.lmscampaignmaster_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmscampaignmaster_Form.get('attachment').value != null && this.lmscampaignmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.lmscampaignmaster_Form.get('attachment').value);
        //Child Tables if any
        this.Set_lmscampaigntasks_TableConfig();
        this.lmscampaigntasks_LoadTable(res.lmscampaigntasks);
        this.Set_lmscampaignlocations_TableConfig();
        this.lmscampaignlocations_LoadTable(res.lmscampaignlocations);
        this.Set_lmsposts_TableConfig();
        this.lmsposts_LoadTable(res.lmsposts);
        this.Set_lmscampaignnoaccesses_TableConfig();
        this.lmscampaignnoaccesses_LoadTable(res.lmscampaignnoaccesses);
        this.Insertlmscampaignnoaccesses = [];
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmscampaignmaster_Form.controls) {
            let val = this.lmscampaignmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmscampaignmaster_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.lmscampaignmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.lmscampaignmaster_Form.getRawValue();
            if (this.lmscampaignmaster_Form.get('campaignowner').value != null)
                obj.campaignowner = JSON.stringify(this.lmscampaignmaster_Form.get('campaignowner').value);
            obj.validfrom = new Date(this.lmscampaignmaster_Form.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('validfrom').value) + '  UTC' : null);
            obj.validto = new Date(this.lmscampaignmaster_Form.get('validto').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('validto').value) + '  UTC' : null);
            obj.startdate = new Date(this.lmscampaignmaster_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('startdate').value) + '  UTC' : null);
            obj.enddate = new Date(this.lmscampaignmaster_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('enddate').value) + '  UTC' : null);
            if (this.lmscampaignmaster_Form.get('enquiryresponsibility').value != null)
                obj.enquiryresponsibility = JSON.stringify(this.lmscampaignmaster_Form.get('enquiryresponsibility').value);
            if (this.lmscampaignmaster_Form.get('emailresponsibility').value != null)
                obj.emailresponsibility = JSON.stringify(this.lmscampaignmaster_Form.get('emailresponsibility').value);
            if (customfields != null)
                obj.customfield = JSON.stringify(customfields);
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
        var _a, _b, _c, _d, _e, _f, _g, _h;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.lmscampaignmaster_Form.controls).forEach(key => {
            //   const controlErrors: ValidationErrors = this.lmscampaignmaster_Form.get(key).errors;
            //   if (controlErrors != null) {
            //     Object.keys(controlErrors).forEach(keyError => {
            //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //     });
            //   }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmscampaignmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmscampaignmaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmscampaignmaster_Form.controls[key] != null) {
                            this.formData[key] = this.lmscampaignmaster_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            if (this.lmscampaignmaster_Form.get('campaignowner').value != null)
                this.formData.campaignowner = JSON.stringify(this.lmscampaignmaster_Form.get('campaignowner').value);
            this.formData.validfrom = new Date(this.lmscampaignmaster_Form.get('validfrom').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('validfrom').value) + '  UTC' : null);
            this.formData.validto = new Date(this.lmscampaignmaster_Form.get('validto').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('validto').value) + '  UTC' : null);
            this.formData.startdate = new Date(this.lmscampaignmaster_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('startdate').value) + '  UTC' : null);
            this.formData.enddate = new Date(this.lmscampaignmaster_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.lmscampaignmaster_Form.get('enddate').value) + '  UTC' : null);
            if (this.lmscampaignmaster_Form.get('enquiryresponsibility').value != null)
                this.formData.enquiryresponsibility = JSON.stringify(this.lmscampaignmaster_Form.get('enquiryresponsibility').value);
            if (this.lmscampaignmaster_Form.get('emailresponsibility').value != null)
                this.formData.emailresponsibility = JSON.stringify(this.lmscampaignmaster_Form.get('emailresponsibility').value);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_lmscampaigntask_IDs = this.Deleted_lmscampaigntask_IDs;
            this.formData.Deleted_lmscampaignlocation_IDs = this.Deleted_lmscampaignlocation_IDs;
            this.formData.Deleted_lmspost_IDs = this.Deleted_lmspost_IDs;
            this.formData.Deleted_lmscampaignnoaccess_IDs = this.Deleted_lmscampaignnoaccess_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.lmscampaignmaster_service.saveOrUpdate_lmscampaignmasters(this.formData, (_b = (_a = this.tbl_lmscampaigntasks) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_lmscampaignlocations) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data, (_f = (_e = this.tbl_lmsposts) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.data, (_h = (_g = this.tbl_lmscampaignnoaccesses) === null || _g === void 0 ? void 0 : _g.source) === null || _h === void 0 ? void 0 : _h.data, this.Insertlmscampaignnoaccesses).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_lmscampaigntasks.source) {
                    for (let i = 0; i < this.tbl_lmscampaigntasks.source.data.length; i++) {
                        if (this.tbl_lmscampaigntasks.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmscampaigntasks.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmscampaignlocations.source) {
                    for (let i = 0; i < this.tbl_lmscampaignlocations.source.data.length; i++) {
                        if (this.tbl_lmscampaignlocations.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmscampaignlocations.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmsposts.source) {
                    for (let i = 0; i < this.tbl_lmsposts.source.data.length; i++) {
                        if (this.tbl_lmsposts.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmsposts.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmscampaignnoaccesses.source) {
                    for (let i = 0; i < this.tbl_lmscampaignnoaccesses.source.data.length; i++) {
                        if (this.tbl_lmscampaignnoaccesses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmscampaignnoaccesses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmscampaignmaster);
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
                        this.objvalues.push(res.lmscampaignmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmscampaignmaster_Form.markAsUntouched();
                this.lmscampaignmaster_Form.markAsPristine();
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
        this.tbl_lmscampaigntasks.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource();
        this.tbl_lmscampaignlocations.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource();
        this.tbl_lmsposts.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource();
        this.tbl_lmscampaignnoaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource();
    }
    AddOrEdit_lmscampaigntask(event, taskid, campaignid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmscampaigntask_lmscampaigntask_component__WEBPACK_IMPORTED_MODULE_5__.lmscampaigntaskComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, taskid, campaignid, visiblelist: this.lmscampaigntasks_visiblelist, hidelist: this.lmscampaigntasks_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmscampaigntasks.source.add(res[i]);
                    }
                    this.tbl_lmscampaigntasks.source.refresh();
                }
                else {
                    this.tbl_lmscampaigntasks.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmscampaigntask(event, childID, i) {
        if (childID != null)
            this.Deleted_lmscampaigntask_IDs += childID + ",";
        this.tbl_lmscampaigntasks.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmscampaignlocation(event, locationid, campaignid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmscampaignlocation_lmscampaignlocation_component__WEBPACK_IMPORTED_MODULE_7__.lmscampaignlocationComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, locationid, campaignid, visiblelist: this.lmscampaignlocations_visiblelist, hidelist: this.lmscampaignlocations_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmscampaignlocations.source.add(res[i]);
                    }
                    this.tbl_lmscampaignlocations.source.refresh();
                }
                else {
                    this.tbl_lmscampaignlocations.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmscampaignlocation(event, childID, i) {
        if (childID != null)
            this.Deleted_lmscampaignlocation_IDs += childID + ",";
        this.tbl_lmscampaignlocations.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmspost(event, postid, campaignid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmspost_lmspost_component__WEBPACK_IMPORTED_MODULE_9__.lmspostComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, postid, campaignid, visiblelist: this.lmsposts_visiblelist, hidelist: this.lmsposts_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmsposts.source.add(res[i]);
                    }
                    this.tbl_lmsposts.source.refresh();
                }
                else {
                    this.tbl_lmsposts.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmspost(event, childID, i) {
        if (childID != null)
            this.Deleted_lmspost_IDs += childID + ",";
        this.tbl_lmsposts.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_lmscampaigntasks_Checkbox() {
        debugger;
        if (this.tbl_lmscampaigntasks.source.settings['selectMode'] == 'multi')
            this.tbl_lmscampaigntasks.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmscampaigntasks.source.settings['selectMode'] = 'multi';
        this.tbl_lmscampaigntasks.source.initGrid();
    }
    delete_lmscampaigntasks_All() {
        this.tbl_lmscampaigntasks.source.settings['selectMode'] = 'single';
    }
    show_lmscampaigntasks_Filter() {
        setTimeout(() => {
            //  this.Set_lmscampaigntasks_TableDropDownConfig();
        });
        if (this.tbl_lmscampaigntasks.source.settings != null)
            this.tbl_lmscampaigntasks.source.settings['hideSubHeader'] = !this.tbl_lmscampaigntasks.source.settings['hideSubHeader'];
        this.tbl_lmscampaigntasks.source.initGrid();
    }
    show_lmscampaigntasks_InActive() {
    }
    enable_lmscampaigntasks_InActive() {
    }
    Set_lmscampaigntasks_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmscampaigntasks) {
                var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_productid.value)), }, };
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_productid.value)), }, };
                this.tbl_lmscampaigntasks.source.settings = clone;
                this.tbl_lmscampaigntasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
                if (clone.columns['campaignid'] != undefined)
                    clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_campaignid.value)), }, };
                if (clone.columns['campaignid'] != undefined)
                    clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_campaignid.value)), }, };
                this.tbl_lmscampaigntasks.source.settings = clone;
                this.tbl_lmscampaigntasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
                if (clone.columns['campaigntype'] != undefined)
                    clone.columns['campaigntype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_campaigntype.value)), }, };
                if (clone.columns['campaigntype'] != undefined)
                    clone.columns['campaigntype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_campaigntype.value)), }, };
                this.tbl_lmscampaigntasks.source.settings = clone;
                this.tbl_lmscampaigntasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
                if (clone.columns['targettype'] != undefined)
                    clone.columns['targettype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_targettype.value)), }, };
                if (clone.columns['targettype'] != undefined)
                    clone.columns['targettype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_targettype.value)), }, };
                this.tbl_lmscampaigntasks.source.settings = clone;
                this.tbl_lmscampaigntasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
                if (clone.columns['priority'] != undefined)
                    clone.columns['priority'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_priority.value)), }, };
                if (clone.columns['priority'] != undefined)
                    clone.columns['priority'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_priority.value)), }, };
                this.tbl_lmscampaigntasks.source.settings = clone;
                this.tbl_lmscampaigntasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscampaigntasks.source.settings);
                if (clone.columns['performancestatus'] != undefined)
                    clone.columns['performancestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_performancestatus.value)), }, };
                if (clone.columns['performancestatus'] != undefined)
                    clone.columns['performancestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntasks_performancestatus.value)), }, };
                this.tbl_lmscampaigntasks.source.settings = clone;
                this.tbl_lmscampaigntasks.source.initGrid();
            }
            this.bfilterPopulate_lmscampaigntasks = true;
        });
    }
    lmscampaigntasks_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmscampaigntasks_TableConfig() {
        this.lmscampaigntasks_settings = {
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
                custom: this.lmscampaigntask_menuactions
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
                productiddesc: {
                    title: 'Product',
                    type: 'html',
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
                targettypedesc: {
                    title: 'Target Type',
                    type: 'html',
                    filter: true,
                },
                subject: {
                    title: 'Subject',
                    type: '',
                    filter: true,
                },
                description: {
                    title: 'Description',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                advantages: {
                    title: 'Advantages',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                disadvantages: {
                    title: 'Disadvantages',
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
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                assigneddate: {
                    title: 'Assigned Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                targetdate: {
                    title: 'Target Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                prioritydesc: {
                    title: 'Priority',
                    type: 'html',
                    filter: true,
                },
                dailytarget: {
                    title: 'Daily Target',
                    type: 'number',
                    filter: true,
                },
                actualachieved: {
                    title: 'Actual Achieved',
                    type: 'number',
                    filter: true,
                },
                estimatedcost: {
                    title: 'Estimated Cost',
                    type: 'number',
                    filter: true,
                },
                actualcost: {
                    title: 'Actual Cost',
                    type: 'number',
                    filter: true,
                },
                successpercentage: {
                    title: 'Success Percentage',
                    type: 'number',
                    filter: true,
                },
                performancestatusdesc: {
                    title: 'Performance Status',
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
    lmscampaigntasks_LoadTable(lmscampaigntasks = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaigntasks_ID) >= 0) {
            if (this.tbl_lmscampaigntasks != undefined)
                this.tbl_lmscampaigntasks.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource();
            if (this.tbl_lmscampaigntasks != undefined)
                this.tbl_lmscampaigntasks.source.load(lmscampaigntasks);
            if (this.tbl_lmscampaigntasks != undefined)
                this.tbl_lmscampaigntasks.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmscampaigntasks_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscampaignmaster_service.lmscampaigntasks.length == 0)
    {
        this.tbl_lmscampaigntasks.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmscampaigntask();
        this.lmscampaignmaster_service.lmscampaigntasks.push(obj);
        this.tbl_lmscampaigntasks.source.refresh();
        if ((this.lmscampaignmaster_service.lmscampaigntasks.length / this.tbl_lmscampaigntasks.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscampaigntasks.source.getPaging().page)
        {
            this.tbl_lmscampaigntasks.source.setPage((this.lmscampaignmaster_service.lmscampaigntasks.length / this.tbl_lmscampaigntasks.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmscampaigntasks.source.grid.edit(this.tbl_lmscampaigntasks.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmscampaigntasks.source.data.indexOf(event.data);
    this.onDelete_lmscampaigntask(event,event.data.taskid,((this.tbl_lmscampaigntasks.source.getPaging().page-1) *this.tbl_lmscampaigntasks.source.getPaging().perPage)+index);
    this.tbl_lmscampaigntasks.source.refresh();
    break;
    }
    }
    
    */
    lmscampaigntasks_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmscampaigntask(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmscampaigntask(event, event.data.taskid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmscampaigntask(event, event.data.taskid, ((this.tbl_lmscampaigntasks.source.getPaging().page - 1) * this.tbl_lmscampaigntasks.source.getPaging().perPage) + event.index);
                this.tbl_lmscampaigntasks.source.refresh();
                break;
        }
    }
    lmscampaigntasks_onDelete(obj) {
        let taskid = obj.data.taskid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscampaignmaster_service.delete_lmscampaignmaster(taskid).then(res => this.lmscampaigntasks_LoadTable());
        }
    }
    onCustom_lmscampaigntasks_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmscampaigntasks");
            let formname = objbomenuaction.actionname;
        });
    }
    lmscampaigntasks_Paging(val) {
        debugger;
        this.tbl_lmscampaigntasks.source.setPaging(1, val, true);
    }
    handle_lmscampaigntasks_GridSelected(event) {
        this.lmscampaigntasks_selectedindex = this.tbl_lmscampaigntasks.source.findIndex(i => i.taskid === event.data.taskid);
    }
    Is_lmscampaigntasks_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaigntasks_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_lmscampaignlocations_Checkbox() {
        debugger;
        if (this.tbl_lmscampaignlocations.source.settings['selectMode'] == 'multi')
            this.tbl_lmscampaignlocations.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmscampaignlocations.source.settings['selectMode'] = 'multi';
        this.tbl_lmscampaignlocations.source.initGrid();
    }
    delete_lmscampaignlocations_All() {
        this.tbl_lmscampaignlocations.source.settings['selectMode'] = 'single';
    }
    show_lmscampaignlocations_Filter() {
        setTimeout(() => {
            //  this.Set_lmscampaignlocations_TableDropDownConfig();
        });
        if (this.tbl_lmscampaignlocations.source.settings != null)
            this.tbl_lmscampaignlocations.source.settings['hideSubHeader'] = !this.tbl_lmscampaignlocations.source.settings['hideSubHeader'];
        this.tbl_lmscampaignlocations.source.initGrid();
    }
    show_lmscampaignlocations_InActive() {
    }
    enable_lmscampaignlocations_InActive() {
    }
    Set_lmscampaignlocations_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmscampaignlocations) {
                var clone = this.sharedService.clone(this.tbl_lmscampaignlocations.source.settings);
                if (clone.columns['locationid'] != undefined)
                    clone.columns['locationid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaignlocations_locationid.value)), }, };
                if (clone.columns['locationid'] != undefined)
                    clone.columns['locationid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaignlocations_locationid.value)), }, };
                this.tbl_lmscampaignlocations.source.settings = clone;
                this.tbl_lmscampaignlocations.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscampaignlocations.source.settings);
                if (clone.columns['responsibilityid'] != undefined)
                    clone.columns['responsibilityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaignlocations_responsibilityid.value)), }, };
                if (clone.columns['responsibilityid'] != undefined)
                    clone.columns['responsibilityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaignlocations_responsibilityid.value)), }, };
                this.tbl_lmscampaignlocations.source.settings = clone;
                this.tbl_lmscampaignlocations.source.initGrid();
            }
            this.bfilterPopulate_lmscampaignlocations = true;
        });
    }
    lmscampaignlocations_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmscampaignlocations_TableConfig() {
        this.lmscampaignlocations_settings = {
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
                custom: this.lmscampaignlocation_menuactions
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
                locationname: {
                    title: 'Location Name',
                    type: '',
                    filter: true,
                },
                responsibilityiddesc: {
                    title: 'Responsibility',
                    type: 'html',
                    filter: true,
                },
                validfrom: {
                    title: 'Valid From',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                validto: {
                    title: 'Valid To',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
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
    lmscampaignlocations_LoadTable(lmscampaignlocations = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaignlocations_ID) >= 0) {
            if (this.tbl_lmscampaignlocations != undefined)
                this.tbl_lmscampaignlocations.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource();
            if (this.tbl_lmscampaignlocations != undefined)
                this.tbl_lmscampaignlocations.source.load(lmscampaignlocations);
            if (this.tbl_lmscampaignlocations != undefined)
                this.tbl_lmscampaignlocations.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmscampaignlocations_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscampaignmaster_service.lmscampaignlocations.length == 0)
    {
        this.tbl_lmscampaignlocations.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmscampaignlocation();
        this.lmscampaignmaster_service.lmscampaignlocations.push(obj);
        this.tbl_lmscampaignlocations.source.refresh();
        if ((this.lmscampaignmaster_service.lmscampaignlocations.length / this.tbl_lmscampaignlocations.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscampaignlocations.source.getPaging().page)
        {
            this.tbl_lmscampaignlocations.source.setPage((this.lmscampaignmaster_service.lmscampaignlocations.length / this.tbl_lmscampaignlocations.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmscampaignlocations.source.grid.edit(this.tbl_lmscampaignlocations.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmscampaignlocations.source.data.indexOf(event.data);
    this.onDelete_lmscampaignlocation(event,event.data.locationid,((this.tbl_lmscampaignlocations.source.getPaging().page-1) *this.tbl_lmscampaignlocations.source.getPaging().perPage)+index);
    this.tbl_lmscampaignlocations.source.refresh();
    break;
    }
    }
    
    */
    lmscampaignlocations_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmscampaignlocation(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmscampaignlocation(event, event.data.locationid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmscampaignlocation(event, event.data.locationid, ((this.tbl_lmscampaignlocations.source.getPaging().page - 1) * this.tbl_lmscampaignlocations.source.getPaging().perPage) + event.index);
                this.tbl_lmscampaignlocations.source.refresh();
                break;
        }
    }
    lmscampaignlocations_onDelete(obj) {
        let locationid = obj.data.locationid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscampaignmaster_service.delete_lmscampaignmaster(locationid).then(res => this.lmscampaignlocations_LoadTable());
        }
    }
    onCustom_lmscampaignlocations_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmscampaignlocations");
            let formname = objbomenuaction.actionname;
        });
    }
    lmscampaignlocations_Paging(val) {
        debugger;
        this.tbl_lmscampaignlocations.source.setPaging(1, val, true);
    }
    handle_lmscampaignlocations_GridSelected(event) {
        this.lmscampaignlocations_selectedindex = this.tbl_lmscampaignlocations.source.findIndex(i => i.locationid === event.data.locationid);
    }
    Is_lmscampaignlocations_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaignlocations_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_lmsposts_Checkbox() {
        debugger;
        if (this.tbl_lmsposts.source.settings['selectMode'] == 'multi')
            this.tbl_lmsposts.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsposts.source.settings['selectMode'] = 'multi';
        this.tbl_lmsposts.source.initGrid();
    }
    delete_lmsposts_All() {
        this.tbl_lmsposts.source.settings['selectMode'] = 'single';
    }
    show_lmsposts_Filter() {
        setTimeout(() => {
            //  this.Set_lmsposts_TableDropDownConfig();
        });
        if (this.tbl_lmsposts.source.settings != null)
            this.tbl_lmsposts.source.settings['hideSubHeader'] = !this.tbl_lmsposts.source.settings['hideSubHeader'];
        this.tbl_lmsposts.source.initGrid();
    }
    show_lmsposts_InActive() {
    }
    enable_lmsposts_InActive() {
    }
    Set_lmsposts_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmsposts) {
                var clone = this.sharedService.clone(this.tbl_lmsposts.source.settings);
                if (clone.columns['userid'] != undefined)
                    clone.columns['userid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_userid.value)), }, };
                if (clone.columns['userid'] != undefined)
                    clone.columns['userid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_userid.value)), }, };
                this.tbl_lmsposts.source.settings = clone;
                this.tbl_lmsposts.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsposts.source.settings);
                if (clone.columns['campaigntype'] != undefined)
                    clone.columns['campaigntype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_campaigntype.value)), }, };
                if (clone.columns['campaigntype'] != undefined)
                    clone.columns['campaigntype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_campaigntype.value)), }, };
                this.tbl_lmsposts.source.settings = clone;
                this.tbl_lmsposts.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsposts.source.settings);
                if (clone.columns['campaignstatus'] != undefined)
                    clone.columns['campaignstatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_campaignstatus.value)), }, };
                if (clone.columns['campaignstatus'] != undefined)
                    clone.columns['campaignstatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsposts_campaignstatus.value)), }, };
                this.tbl_lmsposts.source.settings = clone;
                this.tbl_lmsposts.source.initGrid();
            }
            this.bfilterPopulate_lmsposts = true;
        });
    }
    lmsposts_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmsposts_TableConfig() {
        this.lmsposts_settings = {
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
                custom: this.lmspost_menuactions
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
                useriddesc: {
                    title: 'User',
                    type: 'html',
                    filter: true,
                },
                senderemail: {
                    title: 'Sender Email',
                    type: '',
                    filter: true,
                },
                scheduledate: {
                    title: 'Schedule Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                scheduletime: {
                    title: 'Schedule Time',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                contenttext: {
                    title: 'Content Text',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                campaigntypedesc: {
                    title: 'Campaign Type',
                    type: 'html',
                    filter: true,
                },
                recipientgroup: {
                    title: 'Recipient Group',
                    type: '',
                    filter: true,
                },
                testgroup: {
                    title: 'Test Group',
                    type: '',
                    filter: true,
                },
                sendunsubscribelink: {
                    title: 'Send Unsubscribe Link',
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
                campaignstatusdesc: {
                    title: 'Campaign Status',
                    type: 'html',
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
            },
        };
    }
    lmsposts_LoadTable(lmsposts = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsposts_ID) >= 0) {
            if (this.tbl_lmsposts != undefined)
                this.tbl_lmsposts.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource();
            if (this.tbl_lmsposts != undefined)
                this.tbl_lmsposts.source.load(lmsposts);
            if (this.tbl_lmsposts != undefined)
                this.tbl_lmsposts.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmsposts_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscampaignmaster_service.lmsposts.length == 0)
    {
        this.tbl_lmsposts.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmspost();
        this.lmscampaignmaster_service.lmsposts.push(obj);
        this.tbl_lmsposts.source.refresh();
        if ((this.lmscampaignmaster_service.lmsposts.length / this.tbl_lmsposts.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsposts.source.getPaging().page)
        {
            this.tbl_lmsposts.source.setPage((this.lmscampaignmaster_service.lmsposts.length / this.tbl_lmsposts.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmsposts.source.grid.edit(this.tbl_lmsposts.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmsposts.source.data.indexOf(event.data);
    this.onDelete_lmspost(event,event.data.postid,((this.tbl_lmsposts.source.getPaging().page-1) *this.tbl_lmsposts.source.getPaging().perPage)+index);
    this.tbl_lmsposts.source.refresh();
    break;
    }
    }
    
    */
    lmsposts_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmspost(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmspost(event, event.data.postid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmspost(event, event.data.postid, ((this.tbl_lmsposts.source.getPaging().page - 1) * this.tbl_lmsposts.source.getPaging().perPage) + event.index);
                this.tbl_lmsposts.source.refresh();
                break;
        }
    }
    lmsposts_onDelete(obj) {
        let postid = obj.data.postid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscampaignmaster_service.delete_lmscampaignmaster(postid).then(res => this.lmsposts_LoadTable());
        }
    }
    onCustom_lmsposts_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmsposts");
            let formname = objbomenuaction.actionname;
        });
    }
    lmsposts_Paging(val) {
        debugger;
        this.tbl_lmsposts.source.setPaging(1, val, true);
    }
    handle_lmsposts_GridSelected(event) {
        this.lmsposts_selectedindex = this.tbl_lmsposts.source.findIndex(i => i.postid === event.data.postid);
    }
    Is_lmsposts_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsposts_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes lmsposts
    //start of Grid Codes lmscampaignnoaccesses
    onCustom_lmscampaignnoaccesses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            switch (event.action) {
                case 'viewrecord':
                    let val = event.data.pkcol;
                    this.dialog.open(_bobranchmaster_bobranchmaster_component__WEBPACK_IMPORTED_MODULE_11__.bobranchmasterComponent, {
                        data: { showview: false, pkcol: val, ScreenType: 2 },
                    }).onClose.subscribe(res => {
                    });
                    break;
            }
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmscampaignnoaccesses");
            let formname = objbomenuaction.actionname;
        });
    }
    show_lmscampaignnoaccesses_Checkbox() {
        debugger;
        if (this.tbl_lmscampaignnoaccesses.source.settings['selectMode'] == 'multi')
            this.tbl_lmscampaignnoaccesses.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmscampaignnoaccesses.source.settings['selectMode'] = 'multi';
        this.tbl_lmscampaignnoaccesses.source.initGrid();
    }
    delete_lmscampaignnoaccesses_All() {
        this.tbl_lmscampaignnoaccesses.source.settings['selectMode'] = 'single';
    }
    show_lmscampaignnoaccesses_Filter() {
        setTimeout(() => {
            //  this.Set_lmscampaignnoaccesses_TableDropDownConfig();
        });
        if (this.tbl_lmscampaignnoaccesses.source.settings != null)
            this.tbl_lmscampaignnoaccesses.source.settings['hideSubHeader'] = !this.tbl_lmscampaignnoaccesses.source.settings['hideSubHeader'];
        this.tbl_lmscampaignnoaccesses.source.initGrid();
    }
    show_lmscampaignnoaccesses_InActive() {
    }
    enable_lmscampaignnoaccesses_InActive() {
    }
    Set_lmscampaignnoaccesses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmscampaignnoaccesses) {
            }
            this.bfilterPopulate_lmscampaignnoaccesses = true;
        });
    }
    lmscampaignnoaccesses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmscampaignnoaccesses_TableConfig() {
        this.lmscampaignnoaccesses_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'multi',
            actions: {
                columnTitle: '',
                width: '300px',
                add: false,
                edit: false,
                delete: false,
                position: 'right',
                custom: [
                    { name: 'viewrecord', title: '<i class="fa fa-external-link"></i>' }
                ],
            },
            columns: {
                accessid: {
                    title: 'Access',
                    type: '',
                },
                branchid: {
                    title: 'Branch',
                    type: '',
                },
            },
        };
    }
    lmscampaignnoaccesses_LoadTable(lmscampaignnoaccesses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaignnoaccesses_ID) >= 0) {
            if (this.tbl_lmscampaignnoaccesses != undefined)
                this.tbl_lmscampaignnoaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_22__.LocalDataSource();
            if (this.tbl_lmscampaignnoaccesses != undefined)
                this.tbl_lmscampaignnoaccesses.source.load(lmscampaignnoaccesses);
            setTimeout(() => {
                if (this.tbl_lmscampaignnoaccesses.source != null) {
                    this.tbl_lmscampaignnoaccesses.source.grid.getRows().forEach((row) => {
                        if (row.data.accessid != null && row.data.accessid != "") {
                            this.Insertlmscampaignnoaccesses.push(row.data);
                            this.tbl_lmscampaignnoaccesses.source.grid.multipleSelectRow(row);
                        }
                    });
                }
            });
        }
    }
    //external to inline
    /*
    lmscampaignnoaccesses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscampaignmaster_service.lmscampaignnoaccesses.length == 0)
    {
        this.tbl_lmscampaignnoaccesses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmscampaignnoaccess();
        this.lmscampaignmaster_service.lmscampaignnoaccesses.push(obj);
        this.tbl_lmscampaignnoaccesses.source.refresh();
        if ((this.lmscampaignmaster_service.lmscampaignnoaccesses.length / this.tbl_lmscampaignnoaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscampaignnoaccesses.source.getPaging().page)
        {
            this.tbl_lmscampaignnoaccesses.source.setPage((this.lmscampaignmaster_service.lmscampaignnoaccesses.length / this.tbl_lmscampaignnoaccesses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmscampaignnoaccesses.source.grid.edit(this.tbl_lmscampaignnoaccesses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmscampaignnoaccesses.source.data.indexOf(event.data);
    this.onDelete_lmscampaignnoaccess(event,event.data.accessid,((this.tbl_lmscampaignnoaccesses.source.getPaging().page-1) *this.tbl_lmscampaignnoaccesses.source.getPaging().perPage)+index);
    this.tbl_lmscampaignnoaccesses.source.refresh();
    break;
    }
    }
    
    */
    lmscampaignnoaccesses_Paging(val) {
        debugger;
        this.tbl_lmscampaignnoaccesses.source.setPaging(1, val, true);
    }
    handle_lmscampaignnoaccesses_GridSelected(event) {
        debugger;
        if (event.isSelected) {
            if (event.data.accessid == null || event.data.accessid == "") {
                var obj = { campaignid: this.formid, branchid: event.data.branchid };
                this.Insertlmscampaignnoaccesses.push(obj);
            }
            else {
                var deletedids = this.Deleted_lmscampaignnoaccess_IDs.split(',');
                let i = 0;
                deletedids.forEach(id => {
                    if (id == event.data.accessid) {
                        deletedids.splice(i, 1);
                    }
                    i++;
                });
                deletedids.join(",");
            }
        }
        else {
            if (event.data.accessid != null && event.data.accessid != "")
                this.Deleted_lmscampaignnoaccess_IDs += event.data.accessid + ",";
        }
    }
    Is_lmscampaignnoaccesses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaignnoaccesses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
lmscampaignmasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_23__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_24__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_25__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_26__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_15__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_27__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_28__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_28__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_28__.DialogService },
    { type: _service_lmscampaignmaster_service__WEBPACK_IMPORTED_MODULE_1__.lmscampaignmasterService },
    { type: _service_lmscampaigntask_service__WEBPACK_IMPORTED_MODULE_6__.lmscampaigntaskService },
    { type: _service_lmscampaignlocation_service__WEBPACK_IMPORTED_MODULE_8__.lmscampaignlocationService },
    { type: _service_lmspost_service__WEBPACK_IMPORTED_MODULE_10__.lmspostService },
    { type: _service_bobranchmaster_service__WEBPACK_IMPORTED_MODULE_12__.bobranchmasterService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_13__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_14__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_17__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_29__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_26__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_30__.NgxSpinnerService }
];
lmscampaignmasterComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild, args: ['customform', { static: false },] }],
    tbl_lmscampaigntasks: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild, args: ['tbl_lmscampaigntasks', { static: false },] }],
    tbl_lmscampaignlocations: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild, args: ['tbl_lmscampaignlocations', { static: false },] }],
    tbl_lmsposts: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild, args: ['tbl_lmsposts', { static: false },] }],
    tbl_lmscampaignnoaccesses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild, args: ['tbl_lmscampaignnoaccesses', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_18__.ViewChild, args: ['fileattachment', { static: false },] }]
};
lmscampaignmasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_21__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_18__.Component)({
        selector: 'app-lmscampaignmaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmscampaignmaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_25__.KeyboardShortcutsService]
    })
], lmscampaignmasterComponent);



/***/ }),

/***/ 97295:
/*!***************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscampaignmaster/lmscampaignmaster.module.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscampaignmasterModule": () => (/* binding */ lmscampaignmasterModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _lmscampaignmaster_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lmscampaignmaster.routing */ 46006);
/* harmony import */ var _lmscampaignmaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmscampaignmaster.component */ 42076);






let lmscampaignmasterModule = class lmscampaignmasterModule {
};
lmscampaignmasterModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _lmscampaignmaster_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_lmscampaignmaster_component__WEBPACK_IMPORTED_MODULE_3__.lmscampaignmasterComponent]
    })
], lmscampaignmasterModule);



/***/ }),

/***/ 46006:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscampaignmaster/lmscampaignmaster.routing.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _lmscampaignmaster_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lmscampaignmaster.component */ 42076);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'lmscampaignmasters', children: [
            { path: '', component: _lmscampaignmaster_component__WEBPACK_IMPORTED_MODULE_0__.lmscampaignmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _lmscampaignmaster_component__WEBPACK_IMPORTED_MODULE_0__.lmscampaignmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _lmscampaignmaster_component__WEBPACK_IMPORTED_MODULE_0__.lmscampaignmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _lmscampaignmaster_component__WEBPACK_IMPORTED_MODULE_0__.lmscampaignmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 59989:
/*!**********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmspost/lmspost.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmspostComponent": () => (/* binding */ lmspostComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmspost_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmspost.component.html */ 18902);
/* harmony import */ var _service_lmspost_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmspost.service */ 33197);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions


//Shortcuts

//translator



//primeng services



//session,application constants




//custom fields & attachments

let lmspostComponent = class lmspostComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmspost_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmspost_service = lmspost_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_lmsposts = false;
        this.lmspost_menuactions = [];
        this.userid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
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
        this.lmspost_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            postid: [null],
            campaignid: [null],
            userid: [null],
            useriddesc: [null],
            senderemail: [null],
            scheduledate: [null],
            scheduletime: [null],
            contenttext: [null],
            campaigntype: [null],
            campaigntypedesc: [null],
            recipientgroup: [null],
            testgroup: [null],
            sendunsubscribelink: [null],
            campaignstatus: [null],
            campaignstatusdesc: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmspost_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmspost_Form.dirty && this.lmspost_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_9__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_9__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_9__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.postid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.postid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.postid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
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
            let lmspostid = null;
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
            this.formid = lmspostid;
            //alert(lmspostid);
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
            this.lmspost_service.getDefaultData().then(res => {
                this.userid_List = res.list_userid.value;
                this.campaigntype_List = res.list_campaigntype.value;
                this.campaignstatus_List = res.list_campaignstatus.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmspost_service.get_lmsposts_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmspost_Form.markAsUntouched();
            this.lmspost_Form.markAsPristine();
        });
    }
    onSelected_userid(useridDetail) {
        if (useridDetail.value && useridDetail) {
            this.lmspost_Form.patchValue({
                userid: useridDetail.value,
                useriddesc: useridDetail.label,
            });
        }
    }
    resetForm() {
        if (this.lmspost_Form != null)
            this.lmspost_Form.reset();
        this.lmspost_Form.patchValue({
            userid: this.sessionData.userid,
            useriddesc: this.sessionData.username,
        });
        this.lmspost_Form.patchValue({
            userid: this.sessionData.userid,
            scheduledate: this.ngbDateParserFormatter.parse(new Date().toString()),
            scheduletime: new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(new Date().getHours().toString() + ":" + new Date().getMinutes().toString()),
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let postid = this.lmspost_Form.get('postid').value;
        if (postid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmspost_service.delete_lmspost(postid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmspost_Form.patchValue({
            postid: null
        });
        if (this.formData.postid != null)
            this.formData.postid = null;
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
                    else if (key == "scheduledate")
                        this.lmspost_Form.patchValue({ "scheduledate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "scheduletime")
                        this.lmspost_Form.patchValue({ "scheduletime": new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmspost_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmspost_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmspost_Form.controls[key] != undefined) {
                                this.lmspost_Form.controls[key].disable({ onlySelf: true });
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
    userid_onChange(evt) {
        let e = evt.value;
    }
    campaigntype_onChange(evt) {
        let e = this.f.campaigntype.value;
        this.lmspost_Form.patchValue({ campaigntypedesc: evt.options[evt.options.selectedIndex].text });
    }
    campaignstatus_onChange(evt) {
        let e = this.f.campaignstatus.value;
        this.lmspost_Form.patchValue({ campaignstatusdesc: evt.options[evt.options.selectedIndex].text });
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
    edit_lmsposts() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmspost_service.get_lmsposts_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmspost;
                let formproperty = res.lmspost.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmspost.pkcol;
                this.formid = res.lmspost.postid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmspost;
        this.formid = res.lmspost.postid;
        this.pkcol = res.lmspost.pkcol;
        this.bmyrecord = false;
        if (res.lmspost.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        var scheduletimeTime = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(res.lmspost.scheduletime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmspost_Form.patchValue({
            postid: res.lmspost.postid,
            campaignid: res.lmspost.campaignid,
            userid: res.lmspost.userid,
            useriddesc: res.lmspost.useriddesc,
            senderemail: res.lmspost.senderemail,
            scheduledate: this.ngbDateParserFormatter.parse(res.lmspost.scheduledate),
            scheduletime: scheduletimeTime,
            contenttext: res.lmspost.contenttext,
            campaigntype: res.lmspost.campaigntype,
            campaigntypedesc: res.lmspost.campaigntypedesc,
            recipientgroup: res.lmspost.recipientgroup,
            testgroup: res.lmspost.testgroup,
            sendunsubscribelink: res.lmspost.sendunsubscribelink,
            campaignstatus: res.lmspost.campaignstatus,
            campaignstatusdesc: res.lmspost.campaignstatusdesc,
            attachment: JSON.parse(res.lmspost.attachment),
            status: res.lmspost.status,
            statusdesc: res.lmspost.statusdesc,
        });
        this.lmspost_menuactions = res.lmspost_menuactions;
        if (this.lmspost_Form.get('attachment').value != null && this.lmspost_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.lmspost_Form.get('attachment').value);
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmspost_Form.controls) {
            let val = this.lmspost_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmspost_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.lmspost_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.lmspost_Form.getRawValue();
            obj.scheduledate = new Date(this.lmspost_Form.get('scheduledate').value ? this.ngbDateParserFormatter.format(this.lmspost_Form.get('scheduledate').value) + '  UTC' : null);
            obj.scheduletime = (this.lmspost_Form.get('scheduletime').value == null ? 0 : this.lmspost_Form.get('scheduletime').value.hour) + ':' + (this.lmspost_Form.get('scheduletime').value == null ? 0 : this.lmspost_Form.get('scheduletime').value.minute + ":00");
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.lmspost_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.lmspost_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmspost_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmspost_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmspost_Form.controls[key] != null) {
                            this.formData[key] = this.lmspost_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.scheduledate = new Date(this.lmspost_Form.get('scheduledate').value ? this.ngbDateParserFormatter.format(this.lmspost_Form.get('scheduledate').value) + '  UTC' : null);
            this.formData.scheduletime = (this.lmspost_Form.get('scheduletime').value == null ? 0 : this.lmspost_Form.get('scheduletime').value.hour) + ':' + (this.lmspost_Form.get('scheduletime').value == null ? 0 : this.lmspost_Form.get('scheduletime').value.minute + ":00");
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.lmspost_service.saveOrUpdate_lmsposts(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmspost);
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
                        this.objvalues.push(res.lmspost);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmspost_Form.markAsUntouched();
                this.lmspost_Form.markAsPristine();
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
lmspostComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_11__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_13__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__.DialogService },
    { type: _service_lmspost_service__WEBPACK_IMPORTED_MODULE_1__.lmspostService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_19__.NgxSpinnerService }
];
lmspostComponent.propDecorators = {
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild, args: ['fileattachment', { static: false },] }]
};
lmspostComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-lmspost',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmspost_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_13__.KeyboardShortcutsService]
    })
], lmspostComponent);



/***/ }),

/***/ 6393:
/*!******************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmscampaignmaster.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscampaignmasterService": () => (/* binding */ lmscampaignmasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmscampaignmasterService = class lmscampaignmasterService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmscampaignmasters(formData, lmscampaigntasks, lmscampaignlocations, lmsposts, lmscampaignnoaccesses, Insertlmscampaignnoaccesses) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { lmscampaigntasks: lmscampaigntasks.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmscampaignlocations: lmscampaignlocations.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmsposts: lmsposts.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmscampaignnoaccesses: Insertlmscampaignnoaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignmaster', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignmaster' + '/getdefaultdata').toPromise();
        }
    }
    get_lmscampaignmasters_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignmaster').toPromise();
        }
    }
    getListBy_campaignid(campaignid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignmaster' + '/campaignid/' + campaignid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignmaster' + '/param/' + key).toPromise();
        }
    }
    get_lmscampaignmasters_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignmaster' + '/e/' + id).toPromise();
        }
    }
    get_lmscampaignmasters_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignmaster' + '/' + id).toPromise();
        }
    }
    delete_lmscampaignmaster(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaignmaster' + '/' + id).toPromise();
        }
    }
    getList_productid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_productid').toPromise();
    }
    getList_campaigntype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_campaigntype/').toPromise();
    }
    getList_territory() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_territory/').toPromise();
    }
    getList_priority() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_priority/').toPromise();
    }
    getList_businessgoal() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_businessgoal/').toPromise();
    }
    getList_targetmarket() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_targetmarket/').toPromise();
    }
    getList_targetaudience() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_targetaudience/').toPromise();
    }
    getList_targetindustry() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_targetindustry/').toPromise();
    }
    getList_strategy() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_strategy/').toPromise();
    }
    getList_targettype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_targettype/').toPromise();
    }
    getList_expectedofferaction() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_expectedofferaction/').toPromise();
    }
    getList_performancestatus() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_performancestatus/').toPromise();
    }
    getList_campaignstatus() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaignmaster' + '/getList_campaignstatus/').toPromise();
    }
};
lmscampaignmasterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmscampaignmasterService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmscampaignmasterService);



/***/ }),

/***/ 33197:
/*!********************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmspost.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmspostService": () => (/* binding */ lmspostService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmspostService = class lmspostService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmsposts(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmspost', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmspost' + '/getdefaultdata').toPromise();
        }
    }
    get_lmsposts_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmspost').toPromise();
        }
    }
    getListBy_postid(postid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmspost' + '/postid/' + postid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmspost' + '/param/' + key).toPromise();
        }
    }
    get_lmsposts_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmspost' + '/e/' + id).toPromise();
        }
    }
    get_lmsposts_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmspost' + '/' + id).toPromise();
        }
    }
    delete_lmspost(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmspost' + '/' + id).toPromise();
        }
    }
    getList_userid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmspost' + '/getList_userid').toPromise();
    }
    getList_campaigntype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmspost' + '/getList_campaigntype/').toPromise();
    }
    getList_campaignstatus() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmspost' + '/getList_campaignstatus/').toPromise();
    }
};
lmspostService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmspostService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmspostService);



/***/ }),

/***/ 29064:
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmscampaignmaster/lmscampaignmaster.component.html ***!
  \***********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmscampaignmaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Campaign Masters' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmscampaignmasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmscampaignmaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.campaignid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.campaignid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n\r\n\r\n            <!--productid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('productid') == -1) && (productidvisible==undefined || productidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"productid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_productid(null)\">Product</label>\r\n                <select *ngIf=\"!showview\" id=\"productid\" (change)=\"productid_onChange($event.target)\"\r\n                  formControlName=\"productid\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of productid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.productiddesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('campaigncode') == -1) && (campaigncodevisible==undefined || campaigncodevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"campaigncode\" class=\"control-label required\">Campaign Code</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.campaigncode?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"campaigncode\" required formControlName=\"campaigncode\" class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.campaigncode.errors?.required\"\r\n                  errorMsg=\"Enter {{'Campaign Code' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('campaignname') == -1) && (campaignnamevisible==undefined || campaignnamevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"campaignname\" class=\"control-label required\">Campaign Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.campaignname?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"campaignname\" required formControlName=\"campaignname\" class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.campaignname.errors?.required\"\r\n                  errorMsg=\"Enter {{'Campaign Name' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n\r\n\r\n              <!--campaigntype-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('campaigntype') == -1) && (campaigntypevisible==undefined || campaigntypevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"campaigntype\" class=\"control-label\">Campaign Type</label>\r\n                <select *ngIf=\"!showview\" id=\"campaigntype\" (change)=\"campaigntype_onChange($event.target)\"\r\n                  formControlName=\"campaigntype\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of campaigntype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.campaigntypedesc?.value}}</label>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('campaignowner') == -1) && (campaignownervisible==undefined || campaignownervisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"campaignowner\" class=\"control-label required\">Campaign Owner</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.campaignowner?.value}}</label>\r\n                <app-useraccess *ngIf=\"!showview\" id=\"campaignowner\" required formControlName=\"campaignowner\"\r\n                  (change)=\"campaignowner_onChange($event.target)\">\r\n                </app-useraccess>\r\n                <app-field-error-display [displayError]=\"f.campaignowner.errors?.required\"\r\n                  errorMsg=\"Enter {{'Campaign Owner' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('validfrom') == -1) && (validfromvisible==undefined || validfromvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"validfrom\" class=\"control-label required\">Valid From</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.validfrom?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #validfromformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"validfromformpicker\" id=\"validfrom\"\r\n                    required formControlName=\"validfrom\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"validfromformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n                <app-field-error-display [displayError]=\"f.validfrom.errors?.required\"\r\n                  errorMsg=\"Enter {{'Valid From' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('validto') == -1) && (validtovisible==undefined || validtovisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"validto\" class=\"control-label\">Valid To</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.validto?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #validtoformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"validtoformpicker\" id=\"validto\"\r\n                    formControlName=\"validto\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"validtoformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('startdate') == -1) && (startdatevisible==undefined || startdatevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"startdate\" class=\"control-label\">Start Date</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.startdate?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #startdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"startdateformpicker\" id=\"startdate\"\r\n                    formControlName=\"startdate\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"startdateformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('enddate') == -1) && (enddatevisible==undefined || enddatevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"enddate\" class=\"control-label\">End Date</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.enddate?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #enddateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"enddateformpicker\" id=\"enddate\"\r\n                    formControlName=\"enddate\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"enddateformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Information' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('details') == -1) && (detailsvisible==undefined || detailsvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"details\" class=\"control-label\">Details</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.details?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"details\"\r\n                    formControlName=\"details\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('campaignscript') == -1) && (campaignscriptvisible==undefined || campaignscriptvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"campaignscript\" class=\"control-label\">Campaign Script</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.campaignscript?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"campaignscript\"\r\n                    formControlName=\"campaignscript\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Classification' [selected]='true'>\r\n\r\n\r\n              <!--territory-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('territory') == -1) && (territoryvisible==undefined || territoryvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"territory\" class=\"control-label\">Territory</label>\r\n                  <select *ngIf=\"!showview\" id=\"territory\" (change)=\"territory_onChange($event.target)\"\r\n                    formControlName=\"territory\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of territory_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.territorydesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--priority-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('priority') == -1) && (priorityvisible==undefined || priorityvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"priority\" class=\"control-label\">Priority</label>\r\n                  <select *ngIf=\"!showview\" id=\"priority\" (change)=\"priority_onChange($event.target)\"\r\n                    formControlName=\"priority\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of priority_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.prioritydesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--businessgoal-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('businessgoal') == -1) && (businessgoalvisible==undefined || businessgoalvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"businessgoal\" class=\"control-label\">Business Goal</label>\r\n                  <select *ngIf=\"!showview\" id=\"businessgoal\" (change)=\"businessgoal_onChange($event.target)\"\r\n                    formControlName=\"businessgoal\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of businessgoal_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.businessgoaldesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--targetmarket-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('targetmarket') == -1) && (targetmarketvisible==undefined || targetmarketvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"targetmarket\" class=\"control-label\">Target Market</label>\r\n                  <select *ngIf=\"!showview\" id=\"targetmarket\" (change)=\"targetmarket_onChange($event.target)\"\r\n                    formControlName=\"targetmarket\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of targetmarket_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.targetmarketdesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--targetaudience-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('targetaudience') == -1) && (targetaudiencevisible==undefined || targetaudiencevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"targetaudience\" class=\"control-label\">Target Audience</label>\r\n                  <select *ngIf=\"!showview\" id=\"targetaudience\" (change)=\"targetaudience_onChange($event.target)\"\r\n                    formControlName=\"targetaudience\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of targetaudience_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.targetaudiencedesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--targetindustry-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('targetindustry') == -1) && (targetindustryvisible==undefined || targetindustryvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"targetindustry\" class=\"control-label\">Target Industry</label>\r\n                  <select *ngIf=\"!showview\" id=\"targetindustry\" (change)=\"targetindustry_onChange($event.target)\"\r\n                    formControlName=\"targetindustry\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of targetindustry_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.targetindustrydesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Sales' [selected]='true'>\r\n\r\n\r\n              <!--strategy-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('strategy') == -1) && (strategyvisible==undefined || strategyvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"strategy\" class=\"control-label\">Strategy</label>\r\n                  <select *ngIf=\"!showview\" id=\"strategy\" (change)=\"strategy_onChange($event.target)\"\r\n                    formControlName=\"strategy\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of strategy_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.strategydesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--targettype-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('targettype') == -1) && (targettypevisible==undefined || targettypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"targettype\" class=\"control-label\">Target Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"targettype\" (change)=\"targettype_onChange($event.target)\"\r\n                    formControlName=\"targettype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of targettype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.targettypedesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--expectedofferaction-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('expectedofferaction') == -1) && (expectedofferactionvisible==undefined || expectedofferactionvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"expectedofferaction\" class=\"control-label\">Offer Action</label>\r\n                  <select *ngIf=\"!showview\" id=\"expectedofferaction\"\r\n                    (change)=\"expectedofferaction_onChange($event.target)\" formControlName=\"expectedofferaction\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of expectedofferaction_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.expectedofferactiondesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('expectedsales') == -1) && (expectedsalesvisible==undefined || expectedsalesvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"expectedsales\" class=\"control-label\">Expected Sales</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.expectedsales?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"expectedsales\" formControlName=\"expectedsales\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('expectedrevenue') == -1) && (expectedrevenuevisible==undefined || expectedrevenuevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"expectedrevenue\" class=\"control-label\">Expected Revenue</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.expectedrevenue?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"expectedrevenue\" formControlName=\"expectedrevenue\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('expectedprofit') == -1) && (expectedprofitvisible==undefined || expectedprofitvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"expectedprofit\" class=\"control-label\">Expected Profit</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.expectedprofit?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"expectedprofit\" formControlName=\"expectedprofit\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('expectedroi') == -1) && (expectedroivisible==undefined || expectedroivisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"expectedroi\" class=\"control-label\">Expected R O I</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.expectedroi?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"expectedroi\" formControlName=\"expectedroi\" class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Performance' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('dailytarget') == -1) && (dailytargetvisible==undefined || dailytargetvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"dailytarget\" class=\"control-label\">Daily Target</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.dailytarget?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"dailytarget\" formControlName=\"dailytarget\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('actualachieved') == -1) && (actualachievedvisible==undefined || actualachievedvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"actualachieved\" class=\"control-label\">Actual Achieved</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.actualachieved?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"actualachieved\" formControlName=\"actualachieved\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--performancestatus-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('performancestatus') == -1) && (performancestatusvisible==undefined || performancestatusvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"performancestatus\" class=\"control-label\">Performance Status</label>\r\n                  <select *ngIf=\"!showview\" id=\"performancestatus\" (change)=\"performancestatus_onChange($event.target)\"\r\n                    formControlName=\"performancestatus\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of performancestatus_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.performancestatusdesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('budgetcost') == -1) && (budgetcostvisible==undefined || budgetcostvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"budgetcost\" class=\"control-label\">Budget Cost</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.budgetcost?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"budgetcost\" formControlName=\"budgetcost\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('actualcost') == -1) && (actualcostvisible==undefined || actualcostvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"actualcost\" class=\"control-label\">Actual Cost</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.actualcost?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"actualcost\" formControlName=\"actualcost\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('mediabudget') == -1) && (mediabudgetvisible==undefined || mediabudgetvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"mediabudget\" class=\"control-label\">Media Budget</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.mediabudget?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"mediabudget\" formControlName=\"mediabudget\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('actualmediacost') == -1) && (actualmediacostvisible==undefined || actualmediacostvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"actualmediacost\" class=\"control-label\">Actual Media Cost</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.actualmediacost?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"actualmediacost\" formControlName=\"actualmediacost\" class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Campaign Specific Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('phonenumber') == -1) && (phonenumbervisible==undefined || phonenumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"phonenumber\" class=\"control-label\">Phone Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.phonenumber?.value}}</label>\r\n                  <int-phone-prefix *ngIf=\"!showview\" id=\"phonenumber\" formControlName=\"phonenumber\" [locale]=\"'en'\"\r\n                    [defaultCountry]=\"'ae'\" class=\"form-control telephone\">\r\n                  </int-phone-prefix>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('uniquephonenumber') == -1) && (uniquephonenumbervisible==undefined || uniquephonenumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"uniquephonenumber\" class=\"control-label\">Unique Phone Number</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.uniquephonenumber?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"uniquephonenumber\" formControlName=\"uniquephonenumber\"\r\n                      class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('landingpage') == -1) && (landingpagevisible==undefined || landingpagevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"landingpage\" class=\"control-label\">Landing Page</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.landingpage?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"landingpage\" formControlName=\"landingpage\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('uniquelandingpage') == -1) && (uniquelandingpagevisible==undefined || uniquelandingpagevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"uniquelandingpage\" class=\"control-label\">Unique Landing Page</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.uniquelandingpage?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"uniquelandingpage\" formControlName=\"uniquelandingpage\"\r\n                      class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('websitelinksavailable') == -1) && (websitelinksavailablevisible==undefined || websitelinksavailablevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"websitelinksavailable\" class=\"control-label\">Website Links Available</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.websitelinksavailable?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"websitelinksavailable\"\r\n                      formControlName=\"websitelinksavailable\" class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('numberofpages') == -1) && (numberofpagesvisible==undefined || numberofpagesvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"numberofpages\" class=\"control-label\">Number Of Pages</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.numberofpages?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"numberofpages\" formControlName=\"numberofpages\" class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('enquiryresponsibility') == -1) && (enquiryresponsibilityvisible==undefined || enquiryresponsibilityvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"enquiryresponsibility\" class=\"control-label\">Enquiry Responsibility</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.enquiryresponsibility?.value}}</label>\r\n                  <app-useraccess *ngIf=\"!showview\" id=\"enquiryresponsibility\" formControlName=\"enquiryresponsibility\">\r\n                  </app-useraccess>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('emailresponsibility') == -1) && (emailresponsibilityvisible==undefined || emailresponsibilityvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"emailresponsibility\" class=\"control-label\">Email Responsibility</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.emailresponsibility?.value}}</label>\r\n                  <app-useraccess *ngIf=\"!showview\" id=\"emailresponsibility\" formControlName=\"emailresponsibility\">\r\n                  </app-useraccess>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('campaignemail') == -1) && (campaignemailvisible==undefined || campaignemailvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"campaignemail\" class=\"control-label\">Campaign Email</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.campaignemail?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"campaignemail\" formControlName=\"campaignemail\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('trackinboundcalls') == -1) && (trackinboundcallsvisible==undefined || trackinboundcallsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"trackinboundcalls\" class=\"control-label\">Track Inbound Calls</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.trackinboundcalls?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"trackinboundcalls\" formControlName=\"trackinboundcalls\"\r\n                      class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('trackvisitors') == -1) && (trackvisitorsvisible==undefined || trackvisitorsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"trackvisitors\" class=\"control-label\">Track Visitors</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.trackvisitors?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"trackvisitors\" formControlName=\"trackvisitors\"\r\n                      class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('trackingdetails') == -1) && (trackingdetailsvisible==undefined || trackingdetailsvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"trackingdetails\" class=\"control-label\">Tracking Details</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.trackingdetails?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"trackingdetails\"\r\n                    formControlName=\"trackingdetails\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('handlingvolumes') == -1) && (handlingvolumesvisible==undefined || handlingvolumesvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"handlingvolumes\" class=\"control-label\">Handling Volumes</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.handlingvolumes?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"handlingvolumes\"\r\n                    formControlName=\"handlingvolumes\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Script Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('trainingrequirement') == -1) && (trainingrequirementvisible==undefined || trainingrequirementvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"trainingrequirement\" class=\"control-label\">Training Requirement</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.trainingrequirement?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\"\r\n                    id=\"trainingrequirement\" formControlName=\"trainingrequirement\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('afterenquiry') == -1) && (afterenquiryvisible==undefined || afterenquiryvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"afterenquiry\" class=\"control-label\">After Enquiry</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.afterenquiry?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"afterenquiry\"\r\n                    formControlName=\"afterenquiry\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('emailresponsetat') == -1) && (emailresponsetatvisible==undefined || emailresponsetatvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"emailresponsetat\" class=\"control-label\">Response T A T</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.emailresponsetat?.value}}</label>\r\n                  <app-duration *ngIf=\"!showview\" id=\"emailresponsetat\" formControlName=\"emailresponsetat\">\r\n                  </app-duration>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('afteremail') == -1) && (afteremailvisible==undefined || afteremailvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"afteremail\" class=\"control-label\">After Email</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.afteremail?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"afteremail\"\r\n                    formControlName=\"afteremail\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--campaignstatus-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('campaignstatus') == -1) && (campaignstatusvisible==undefined || campaignstatusvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"campaignstatus\" class=\"control-label\">Campaign Status</label>\r\n                  <select *ngIf=\"!showview\" id=\"campaignstatus\" (change)=\"campaignstatus_onChange($event.target)\"\r\n                    formControlName=\"campaignstatus\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of campaignstatus_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.campaignstatusdesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Campaign Tasks</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table lmscampaigntasks-->\r\n            <div [ngClass]=\"Is_lmscampaigntasks_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Campaign Tasks' | translate}}\r\n                <select class='child' id=\"lmscampaigntasksPagingdropdown\"\r\n                  (change)=\"lmscampaigntasks_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"lmscampaigntasktoggleOption();lmscampaigntasks_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmscampaigntasksFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"lmscampaigntasks_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_lmscampaigntasks (userRowSelect)=\"handle_lmscampaigntasks_GridSelected($event)\"\r\n                [settings]=\"lmscampaigntasks_settings\" (custom)=\"onCustom_lmscampaigntasks_Action($event)\"\r\n                [source]=\"tbl_lmscampaigntasks?.source?.data\" (delete)=\"lmscampaigntasks_route($event,'delete')\"\r\n                (deleteConfirm)=\"lmscampaigntasks_route($event,'delete')\"\r\n                (create)=\"lmscampaigntasks_route($event,'create')\" (createConfirm)=\"lmscampaigntasks_beforesave($event)\"\r\n                (edit)=\"lmscampaigntasks_route($event,'edit')\" (editConfirm)=\"lmscampaigntasks_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table lmscampaigntasks-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Campaign Locations</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table lmscampaignlocations-->\r\n            <div [ngClass]=\"Is_lmscampaignlocations_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Campaign Locations' | translate}}\r\n                <select class='child' id=\"lmscampaignlocationsPagingdropdown\"\r\n                  (change)=\"lmscampaignlocations_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"lmscampaignlocationtoggleOption();lmscampaignlocations_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmscampaignlocationsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"lmscampaignlocations_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_lmscampaignlocations\r\n                (userRowSelect)=\"handle_lmscampaignlocations_GridSelected($event)\"\r\n                [settings]=\"lmscampaignlocations_settings\" (custom)=\"onCustom_lmscampaignlocations_Action($event)\"\r\n                [source]=\"tbl_lmscampaignlocations?.source?.data\" (delete)=\"lmscampaignlocations_route($event,'delete')\"\r\n                (deleteConfirm)=\"lmscampaignlocations_route($event,'delete')\"\r\n                (create)=\"lmscampaignlocations_route($event,'create')\"\r\n                (createConfirm)=\"lmscampaignlocations_beforesave($event)\"\r\n                (edit)=\"lmscampaignlocations_route($event,'edit')\"\r\n                (editConfirm)=\"lmscampaignlocations_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table lmscampaignlocations-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Posts</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table lmsposts-->\r\n            <div [ngClass]=\"Is_lmsposts_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Posts' | translate}}\r\n                <select class='child' id=\"lmspostsPagingdropdown\" (change)=\"lmsposts_Paging($event.target.value)\"\r\n                  [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"lmsposttoggleOption();lmsposts_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmspostsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"lmsposts_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_lmsposts (userRowSelect)=\"handle_lmsposts_GridSelected($event)\"\r\n                [settings]=\"lmsposts_settings\" (custom)=\"onCustom_lmsposts_Action($event)\"\r\n                [source]=\"tbl_lmsposts?.source?.data\" (delete)=\"lmsposts_route($event,'delete')\"\r\n                (deleteConfirm)=\"lmsposts_route($event,'delete')\" (create)=\"lmsposts_route($event,'create')\"\r\n                (createConfirm)=\"lmsposts_beforesave($event)\" (edit)=\"lmsposts_route($event,'edit')\"\r\n                (editConfirm)=\"lmsposts_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table lmsposts-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Campaign No Access</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table lmscampaignnoaccesses-->\r\n            <div [ngClass]=\"Is_lmscampaignnoaccesses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Campaign No Access' | translate}}\r\n                <select class='child' id=\"lmscampaignnoaccessesPagingdropdown\"\r\n                  (change)=\"lmscampaignnoaccesses_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmscampaignnoaccessesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n              </h4>\r\n              <ng2-smart-table #tbl_lmscampaignnoaccesses\r\n                (userRowSelect)=\"handle_lmscampaignnoaccesses_GridSelected($event)\"\r\n                [settings]=\"lmscampaignnoaccesses_settings\" (custom)=\"onCustom_lmscampaignnoaccesses_Action($event)\"\r\n                [source]=\"tbl_lmscampaignnoaccesses?.source?.data\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table lmscampaignnoaccesses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 18902:
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmspost/lmspost.component.html ***!
  \***************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmspost_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Posts' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmsposts()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmspost_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.postid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.postid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('campaignid') == -1) && (campaignidvisible==undefined || campaignidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"campaignid\" class=\"control-label\">Campaign</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.campaignid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"campaignid\" formControlName=\"campaignid\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--userid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('userid') == -1) && (useridvisible==undefined || useridvisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"userid\" class=\"control-label\" (click)=\"AddOrEdit_userid(null)\">User</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"userid_List\" [optionsEvent]=\"userid_optionsEvent\"\r\n          [form]=\"bousermaster\" (selectItem)=\"onSelected_userid($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n          formControlName=\"userid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.useriddesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('senderemail') == -1) && (senderemailvisible==undefined || senderemailvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"senderemail\" class=\"control-label\">Sender Email</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.senderemail?.value}}</label>\r\n        <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"senderemail\" formControlName=\"senderemail\"\r\n          class=\"form-control\">\r\n        <app-field-error-display [displayError]=\"f.senderemail.errors!=null && f.senderemail.errors?.email\"\r\n          errorMsg=\"Enter valid email\">\r\n        </app-field-error-display>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('scheduledate') == -1) && (scheduledatevisible==undefined || scheduledatevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"scheduledate\" class=\"control-label\">Schedule Date</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.scheduledate?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"!showview\">\r\n          <input #scheduledateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n            [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"scheduledateformpicker\" id=\"scheduledate\"\r\n            formControlName=\"scheduledate\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"scheduledateformpicker.toggle()\" type=\"button\"><i\r\n              class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('scheduletime') == -1) && (scheduletimevisible==undefined || scheduletimevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"scheduletime\" class=\"control-label\">Schedule Time</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.scheduletime?.value}}</label>\r\n        <ngb-timepicker *ngIf=\"!showview\" class=\"form-control timepicker\" formControlName=\"scheduletime\">\r\n        </ngb-timepicker>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('contenttext') == -1) && (contenttextvisible==undefined || contenttextvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"contenttext\" class=\"control-label\">Content Text</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.contenttext?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"contenttext\"\r\n          formControlName=\"contenttext\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--campaigntype-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('campaigntype') == -1) && (campaigntypevisible==undefined || campaigntypevisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n        style='' class=\"col-3\"><label for=\"campaigntype\" class=\"control-label\">Campaign Type</label>\r\n        <select *ngIf=\"!showview\" id=\"campaigntype\" (change)=\"campaigntype_onChange($event.target)\"\r\n          formControlName=\"campaigntype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of campaigntype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.campaigntypedesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('recipientgroup') == -1) && (recipientgroupvisible==undefined || recipientgroupvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"recipientgroup\" class=\"control-label\">Recipient Group</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.recipientgroup?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"recipientgroup\" formControlName=\"recipientgroup\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('testgroup') == -1) && (testgroupvisible==undefined || testgroupvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"testgroup\" class=\"control-label\">Test Group</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.testgroup?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"testgroup\" formControlName=\"testgroup\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('sendunsubscribelink') == -1) && (sendunsubscribelinkvisible==undefined || sendunsubscribelinkvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"sendunsubscribelink\" class=\"control-label\">Send Unsubscribe Link</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.sendunsubscribelink?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"sendunsubscribelink\" formControlName=\"sendunsubscribelink\"\r\n            class=\"form-control\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--campaignstatus-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('campaignstatus') == -1) && (campaignstatusvisible==undefined || campaignstatusvisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n        style='' class=\"col-3\"><label for=\"campaignstatus\" class=\"control-label\">Campaign Status</label>\r\n        <select *ngIf=\"!showview\" id=\"campaignstatus\" (change)=\"campaignstatus_onChange($event.target)\"\r\n          formControlName=\"campaignstatus\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of campaignstatus_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.campaignstatusdesc?.value}}</label>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_lmscampaignmaster_lmscampaignmaster_module_ts.js.map