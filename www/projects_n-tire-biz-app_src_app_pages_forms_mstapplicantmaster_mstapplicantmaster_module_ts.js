"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_mstapplicantmaster_mstapplicantmaster_module_ts"],{

/***/ 58272:
/*!********************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantmaster/mstapplicantmaster.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantmasterComponent": () => (/* binding */ mstapplicantmasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstapplicantmaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./mstapplicantmaster.component.html */ 84397);
/* harmony import */ var _service_mstapplicantmaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/mstapplicantmaster.service */ 88315);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_43__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_mstapplicantgeographypreference_mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantgeographypreference/mstapplicantgeographypreference.component */ 74616);
/* harmony import */ var _service_mstapplicantgeographypreference_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../service/mstapplicantgeographypreference.service */ 85861);
/* harmony import */ var _pages_forms_mstapplicantskilldetail_mstapplicantskilldetailgrid_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetailgrid.component */ 60818);
/* harmony import */ var _pages_forms_mstapplicantcareerdetail_mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantcareerdetail/mstapplicantcareerdetail.component */ 6403);
/* harmony import */ var _service_mstapplicantcareerdetail_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../service/mstapplicantcareerdetail.service */ 70818);
/* harmony import */ var _pages_forms_mstapplicantreferencedetail_mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantreferencedetail/mstapplicantreferencedetail.component */ 17130);
/* harmony import */ var _service_mstapplicantreferencedetail_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../../service/mstapplicantreferencedetail.service */ 43162);
/* harmony import */ var _pages_forms_mstapplicantskilldetail_mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.component */ 33474);
/* harmony import */ var _service_mstapplicantskilldetail_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../../../service/mstapplicantskilldetail.service */ 8773);
/* harmony import */ var _pages_forms_mstapplicantworkreference_mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantworkreference/mstapplicantworkreference.component */ 68225);
/* harmony import */ var _service_mstapplicantworkreference_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../../../service/mstapplicantworkreference.service */ 85827);
/* harmony import */ var _pages_forms_mstapplicantsocialmediadetail_mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantsocialmediadetail/mstapplicantsocialmediadetail.component */ 95343);
/* harmony import */ var _service_mstapplicantsocialmediadetail_service__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./../../../service/mstapplicantsocialmediadetail.service */ 30017);
/* harmony import */ var _pages_forms_mstapplicantachievementdetail_mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantachievementdetail/mstapplicantachievementdetail.component */ 42850);
/* harmony import */ var _service_mstapplicantachievementdetail_service__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./../../../service/mstapplicantachievementdetail.service */ 65955);
/* harmony import */ var _pages_forms_mstapplicantlanguagedetail_mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantlanguagedetail/mstapplicantlanguagedetail.component */ 22115);
/* harmony import */ var _service_mstapplicantlanguagedetail_service__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./../../../service/mstapplicantlanguagedetail.service */ 63832);
/* harmony import */ var _pages_forms_mstapplicanteducationdetail_mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicanteducationdetail/mstapplicanteducationdetail.component */ 41294);
/* harmony import */ var _service_mstapplicanteducationdetail_service__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./../../../service/mstapplicanteducationdetail.service */ 7210);
/* harmony import */ var _pages_forms_mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./../../../pages/forms/mstjobstatus/mstjobstatus.component */ 83793);
/* harmony import */ var _service_mstjobstatus_service__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./../../../service/mstjobstatus.service */ 60934);
/* harmony import */ var _pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component */ 49342);
/* harmony import */ var _service_mstapplicantreferencerequest_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./../../../service/mstapplicantreferencerequest.service */ 73017);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_44__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _pages_forms_boreportviewer_boreportviewer_component__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! ./../../../pages/forms/boreportviewer/boreportviewer.component */ 15731);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions



//Shortcuts

//translator


























//primeng services



//session,application constants




//custom fields & attachments


let mstapplicantmasterComponent = class mstapplicantmasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, mstapplicantmaster_service, mstapplicantgeographypreference_service, mstapplicantcareerdetail_service, mstapplicantreferencedetail_service, mstapplicantskilldetail_service, mstapplicantworkreference_service, mstapplicantsocialmediadetail_service, mstapplicantachievementdetail_service, mstapplicantlanguagedetail_service, mstapplicanteducationdetail_service, mstjobstatus_service, mstapplicantreferencerequest_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.mstapplicantmaster_service = mstapplicantmaster_service;
        this.mstapplicantgeographypreference_service = mstapplicantgeographypreference_service;
        this.mstapplicantcareerdetail_service = mstapplicantcareerdetail_service;
        this.mstapplicantreferencedetail_service = mstapplicantreferencedetail_service;
        this.mstapplicantskilldetail_service = mstapplicantskilldetail_service;
        this.mstapplicantworkreference_service = mstapplicantworkreference_service;
        this.mstapplicantsocialmediadetail_service = mstapplicantsocialmediadetail_service;
        this.mstapplicantachievementdetail_service = mstapplicantachievementdetail_service;
        this.mstapplicantlanguagedetail_service = mstapplicantlanguagedetail_service;
        this.mstapplicanteducationdetail_service = mstapplicanteducationdetail_service;
        this.mstjobstatus_service = mstjobstatus_service;
        this.mstapplicantreferencerequest_service = mstapplicantreferencerequest_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_32__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_mstapplicantmasters = false;
        this.bfilterPopulate_mstapplicantgeographypreferences = false;
        this.bfilterPopulate_mstapplicantcareerdetails = false;
        this.bfilterPopulate_mstapplicantreferencedetails = false;
        this.bfilterPopulate_mstapplicantskilldetails = false;
        this.bfilterPopulate_mstapplicantworkreferences = false;
        this.bfilterPopulate_mstapplicantsocialmediadetails = false;
        this.bfilterPopulate_mstapplicantachievementdetails = false;
        this.bfilterPopulate_mstapplicantlanguagedetails = false;
        this.bfilterPopulate_mstapplicanteducationdetails = false;
        this.bfilterPopulate_mstjobstatuses = false;
        this.bfilterPopulate_mstapplicantreferencerequests = false;
        this.mstapplicantmaster_menuactions = [];
        this.mstapplicantgeographypreference_menuactions = [];
        this.mstapplicantcareerdetail_menuactions = [];
        this.mstapplicantreferencedetail_menuactions = [];
        this.mstapplicantskilldetail_menuactions = [];
        this.mstapplicantworkreference_menuactions = [];
        this.mstapplicantsocialmediadetail_menuactions = [];
        this.mstapplicantachievementdetail_menuactions = [];
        this.mstapplicantlanguagedetail_menuactions = [];
        this.mstapplicanteducationdetail_menuactions = [];
        this.mstjobstatus_menuactions = [];
        this.mstapplicantreferencerequest_menuactions = [];
        this.country_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_32__.EventEmitter(); //autocomplete
        this.state_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_32__.EventEmitter(); //autocomplete
        this.city_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_32__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_30__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_30__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.profilecompletionvisible = false;
        this.Deleted_mstapplicantgeographypreference_IDs = "";
        this.mstapplicantgeographypreferences_ID = "1";
        this.Deleted_mstapplicantcareerdetail_IDs = "";
        this.mstapplicantcareerdetails_ID = "2";
        this.Deleted_mstapplicantreferencedetail_IDs = "";
        this.mstapplicantreferencedetails_ID = "3";
        this.Deleted_mstapplicantskilldetail_IDs = "";
        this.mstapplicantskilldetails_ID = "4";
        this.Deleted_mstapplicantworkreference_IDs = "";
        this.mstapplicantworkreferences_ID = "5";
        this.Deleted_mstapplicantsocialmediadetail_IDs = "";
        this.mstapplicantsocialmediadetails_ID = "6";
        this.Deleted_mstapplicantachievementdetail_IDs = "";
        this.mstapplicantachievementdetails_ID = "7";
        this.Deleted_mstapplicantlanguagedetail_IDs = "";
        this.mstapplicantlanguagedetails_ID = "8";
        this.Deleted_mstapplicanteducationdetail_IDs = "";
        this.mstapplicanteducationdetails_ID = "9";
        this.Deleted_mstjobstatus_IDs = "";
        this.mstjobstatuses_ID = "10";
        this.Deleted_mstapplicantreferencerequest_IDs = "";
        this.mstapplicantreferencerequests_ID = "11";
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
            firstname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.pattern(/^[a-zA-Z ]*$/)])],
            lastname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.pattern(/^[a-zA-Z ]*$/)])],
            emailid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.required])],
            mobilenumber: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.required])],
            applicanttype: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.required])],
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
            zipcode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_33__.Validators.pattern(/^[1-9][0-9]{5}$/)])],
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
        if (this.sessionService.getItem("role") == 2)
            this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1)
            this.IsAdmin = true;
    }
    get f() { return this.mstapplicantmaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        //debugger;;
        if (this.mstapplicantmaster_Form.dirty && this.mstapplicantmaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_34__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_34__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_34__.Observable.of(true);
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
        //debugger;;
        let pos = this.pkList.map(function (e) { return e.applicantid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        //debugger;;
        let pos = this.pkList.map(function (e) { return e.applicantid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.applicantid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
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
            //debugger;;
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
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
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
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched
            this.mstapplicantmaster_Form.markAsUntouched();
            this.mstapplicantmaster_Form.markAsPristine();
        });
    }
    onSelected_country(countryDetail) {
        if (countryDetail.value && countryDetail) {
            this.mstapplicantmaster_Form.patchValue({
                country: countryDetail.value,
                countrydesc: countryDetail.label,
            });
            this.mstapplicantmaster_service.getList_state(countryDetail.value).then(res => {
                this.state_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_state(stateDetail) {
        if (stateDetail.value && stateDetail) {
            this.mstapplicantmaster_Form.patchValue({
                state: stateDetail.value,
                statedesc: stateDetail.label,
            });
            this.mstapplicantmaster_service.getList_city(stateDetail.value).then(res => {
                this.city_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_city(cityDetail) {
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
        this.mstapplicantmaster_Form.patchValue({});
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
                }).catch((err) => { this.spinner.hide(); console.log(err); });
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
        if (this.formData.applicantid != null)
            this.formData.applicantid = null;
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
    PopulateFromMainScreen(mainscreendata, bdisable) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {
                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        {}
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
    goBack() {
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
    applicanttype_onChange(evt) {
        let e = this.f.applicanttype.value;
        this.mstapplicantmaster_Form.patchValue({ applicanttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    gender_onChange(evt) {
        let e = this.f.gender.value;
        this.mstapplicantmaster_Form.patchValue({ genderdesc: evt.options[evt.options.selectedIndex].text });
    }
    country_onChange(evt) {
        let e = evt.value;
    }
    state_onChange(evt) {
        let e = evt.value;
    }
    city_onChange(evt) {
        let e = evt.value;
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
    edit_mstapplicantmasters() {
        this.showview = false;
        setTimeout(() => {
            if (this.profilephoto != null && this.profilephoto != undefined)
                this.profilephoto.setattachmentlist(this.mstapplicantmaster_Form.get('profilephoto').value);
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.spinner.show();
            this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.mstapplicantmaster;
                let formproperty = res.mstapplicantmaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.mstapplicantmaster.pkcol;
                this.formid = res.mstapplicantmaster.applicantid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        debugger;
        this.formData = res.mstapplicantmaster;
        this.formid = res.mstapplicantmaster.applicantid;
        this.pkcol = res.mstapplicantmaster.pkcol;
        this.bmyrecord = false;
        if (res.mstapplicantmaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
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
        if (res.visiblelist != undefined && res.visiblelist.indexOf("profilecompletion") >= 0)
            this.profilecompletionvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("profilecompletion") >= 0)
            this.profilecompletionvisible = false;
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
        if (this.mstapplicantmaster_Form.get('profilephoto').value != null && this.mstapplicantmaster_Form.get('profilephoto').value != "" && this.profilephoto != null && this.profilephoto != undefined)
            this.profilephoto.setattachmentlist(this.mstapplicantmaster_Form.get('profilephoto').value);
        if (this.mstapplicantmaster_Form.get('attachment').value != null && this.mstapplicantmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.mstapplicantmaster_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.country.value && this.f.country.value != "" && this.f.country.value != null)
                this.mstapplicantmaster_service.getList_state(this.f.country.value).then(res => {
                    this.state_List = res;
                }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.state.value && this.f.state.value != "" && this.f.state.value != null)
                this.mstapplicantmaster_service.getList_city(this.f.state.value).then(res => {
                    this.city_List = res;
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
    getHtml(html) {
        var _a, _b, _c, _d, _e, _f;
        let ret = "";
        ret = html;
        if (((_a = this.mstapplicantmaster_Form.controls['briefintroduction']) === null || _a === void 0 ? void 0 : _a.value) != null)
            ret = ret.replace(new RegExp('##briefintroduction##', 'g'), (_c = (_b = this.mstapplicantmaster_Form.controls['briefintroduction']) === null || _b === void 0 ? void 0 : _b.value) === null || _c === void 0 ? void 0 : _c.substring(0, 250));
        if (((_d = this.mstapplicantmaster_Form.controls['statuscrimp']) === null || _d === void 0 ? void 0 : _d.value) != null)
            ret = ret.replace(new RegExp('##statuscrimp##', 'g'), (_f = (_e = this.mstapplicantmaster_Form.controls['statuscrimp']) === null || _e === void 0 ? void 0 : _e.value) === null || _f === void 0 ? void 0 : _f.substring(0, 250));
        for (let key in this.mstapplicantmaster_Form.controls) {
            let val = this.mstapplicantmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.mstapplicantmaster_Form.controls[key] != null) {
                if (key == "profilephoto") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0)
                        ret = ret.replace(new RegExp('##' + key + '##', 'g'), _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_30__.AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
                }
                else if (false) {}
                else if (key == "profilecompletion") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined)
                        ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='progress--circle progress--" + this.formData[key] + "'><div class='progress__number'>" + this.formData[key] + "%</div></div>");
                }
                else
                    ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
            }
        }
        var re = /##(\w+)##/g;
        ret = ret.replace(re, '');
        return ret;
    }
    onSubmitDataDlg(bclear) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.mstapplicantmaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.mstapplicantmaster_Form.getRawValue();
            obj.dob = new Date(this.mstapplicantmaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.mstapplicantmaster_Form.get('dob').value) + '  UTC' : null);
            if (this.profilephoto.getAttachmentList() != null)
                obj.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
            if (this.fileattachment.getAttachmentList() != null)
                obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            obj.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(obj);
            yield this.sharedService.upload(this.profilephoto.getAllFiles());
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
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
            if (strError != "")
                return this.sharedService.alert(strError);
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
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
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
            if (this.profilephoto.getAttachmentList() != null)
                this.formData.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.mstapplicantmaster_service.saveOrUpdate_mstapplicantmasters(this.formData, (_b = (_a = this.tbl_mstapplicantgeographypreferences) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_mstapplicantcareerdetails) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data, (_f = (_e = this.tbl_mstapplicantreferencedetails) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.data, (_h = (_g = this.tbl_mstapplicantskilldetails) === null || _g === void 0 ? void 0 : _g.source) === null || _h === void 0 ? void 0 : _h.data, (_k = (_j = this.tbl_mstapplicantworkreferences) === null || _j === void 0 ? void 0 : _j.source) === null || _k === void 0 ? void 0 : _k.data, (_m = (_l = this.tbl_mstapplicantsocialmediadetails) === null || _l === void 0 ? void 0 : _l.source) === null || _m === void 0 ? void 0 : _m.data, (_p = (_o = this.tbl_mstapplicantachievementdetails) === null || _o === void 0 ? void 0 : _o.source) === null || _p === void 0 ? void 0 : _p.data, (_r = (_q = this.tbl_mstapplicantlanguagedetails) === null || _q === void 0 ? void 0 : _q.source) === null || _r === void 0 ? void 0 : _r.data, (_t = (_s = this.tbl_mstapplicanteducationdetails) === null || _s === void 0 ? void 0 : _s.source) === null || _t === void 0 ? void 0 : _t.data, (_v = (_u = this.tbl_mstjobstatuses) === null || _u === void 0 ? void 0 : _u.source) === null || _v === void 0 ? void 0 : _v.data, (_x = (_w = this.tbl_mstapplicantreferencerequests) === null || _w === void 0 ? void 0 : _w.source) === null || _x === void 0 ? void 0 : _x.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.profilephoto.getAllFiles());
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_mstapplicantgeographypreferences.source) {
                    for (let i = 0; i < this.tbl_mstapplicantgeographypreferences.source.data.length; i++) {
                        if (this.tbl_mstapplicantgeographypreferences.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantgeographypreferences.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantcareerdetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantcareerdetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantcareerdetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantcareerdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantreferencedetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantreferencedetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantreferencedetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantreferencedetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantskilldetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantskilldetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantskilldetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantskilldetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantworkreferences.source) {
                    for (let i = 0; i < this.tbl_mstapplicantworkreferences.source.data.length; i++) {
                        if (this.tbl_mstapplicantworkreferences.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantworkreferences.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantsocialmediadetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantsocialmediadetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantsocialmediadetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantsocialmediadetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantachievementdetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantachievementdetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantachievementdetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantachievementdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantlanguagedetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantlanguagedetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantlanguagedetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantlanguagedetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicanteducationdetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicanteducationdetails.source.data.length; i++) {
                        if (this.tbl_mstapplicanteducationdetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicanteducationdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstjobstatuses.source) {
                    for (let i = 0; i < this.tbl_mstjobstatuses.source.data.length; i++) {
                        if (this.tbl_mstjobstatuses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstjobstatuses.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantreferencerequests.source) {
                    for (let i = 0; i < this.tbl_mstapplicantreferencerequests.source.data.length; i++) {
                        if (this.tbl_mstapplicantreferencerequests.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantreferencerequests.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                //debugger;;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.router.navigate(['/home/mstapplicantmasters/mstapplicantmasters/view/' + this.pkcol]);
                this.objvalues.push(res.mstapplicantmaster);
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
                        this.objvalues.push(res.mstapplicantmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstapplicantmaster_Form.markAsUntouched();
                this.mstapplicantmaster_Form.markAsPristine();
            }), err => {
                //debugger;;
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            });
        });
    }
    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_mstapplicantgeographypreferences.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
        this.tbl_mstapplicantcareerdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
        this.tbl_mstapplicantreferencedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
        this.tbl_mstapplicantskilldetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
        this.tbl_mstapplicantworkreferences.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
        this.tbl_mstapplicantsocialmediadetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
        this.tbl_mstapplicantachievementdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
        this.tbl_mstapplicantlanguagedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
        this.tbl_mstapplicanteducationdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
        this.tbl_mstjobstatuses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
        this.tbl_mstapplicantreferencerequests.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
    }
    AddOrEdit_mstapplicantgeographypreference(event, geographypreferenceid, applicantid) {
        //debugger;;
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantgeographypreference_mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantgeographypreferenceComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, geographypreferenceid, applicantid, visiblelist: this.mstapplicantgeographypreferences_visiblelist, hidelist: this.mstapplicantgeographypreferences_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantgeographypreference(event, childID, i) {
        if (childID != null)
            this.Deleted_mstapplicantgeographypreference_IDs += childID + ",";
        this.tbl_mstapplicantgeographypreferences.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantcareerdetail(event, careerid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantcareerdetail_mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_7__.mstapplicantcareerdetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, careerid, applicantid, visiblelist: this.mstapplicantcareerdetails_visiblelist, hidelist: this.mstapplicantcareerdetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantcareerdetail(event, childID, i) {
        if (childID != null)
            this.Deleted_mstapplicantcareerdetail_IDs += childID + ",";
        this.tbl_mstapplicantcareerdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantreferencedetail(event, referenceid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantreferencedetail_mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_9__.mstapplicantreferencedetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, referenceid, applicantid, visiblelist: this.mstapplicantreferencedetails_visiblelist, hidelist: this.mstapplicantreferencedetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantreferencedetail(event, childID, i) {
        if (childID != null)
            this.Deleted_mstapplicantreferencedetail_IDs += childID + ",";
        this.tbl_mstapplicantreferencedetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantskilldetail(event, skillid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantskilldetail_mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_11__.mstapplicantskilldetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, skillid, applicantid, visiblelist: this.mstapplicantskilldetails_visiblelist, hidelist: this.mstapplicantskilldetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantskilldetail(event, childID, i) {
        if (childID != null)
            this.Deleted_mstapplicantskilldetail_IDs += childID + ",";
        this.tbl_mstapplicantskilldetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantworkreference(event, workreferenceid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantworkreference_mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_13__.mstapplicantworkreferenceComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workreferenceid, applicantid, visiblelist: this.mstapplicantworkreferences_visiblelist, hidelist: this.mstapplicantworkreferences_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantworkreference(event, childID, i) {
        debugger;
        if (childID != null)
            this.Deleted_mstapplicantworkreference_IDs += childID + ",";
        this.tbl_mstapplicantworkreferences.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantsocialmediadetail(event, socialrefid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantsocialmediadetail_mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_15__.mstapplicantsocialmediadetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, socialrefid, applicantid, visiblelist: this.mstapplicantsocialmediadetails_visiblelist, hidelist: this.mstapplicantsocialmediadetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantsocialmediadetail(event, childID, i) {
        if (childID != null)
            this.Deleted_mstapplicantsocialmediadetail_IDs += childID + ",";
        this.tbl_mstapplicantsocialmediadetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantachievementdetail(event, achievementid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantachievementdetail_mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_17__.mstapplicantachievementdetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, achievementid, applicantid, visiblelist: this.mstapplicantachievementdetails_visiblelist, hidelist: this.mstapplicantachievementdetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantachievementdetail(event, childID, i) {
        if (childID != null)
            this.Deleted_mstapplicantachievementdetail_IDs += childID + ",";
        this.tbl_mstapplicantachievementdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantlanguagedetail(event, languageid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantlanguagedetail_mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_19__.mstapplicantlanguagedetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, languageid, applicantid, visiblelist: this.mstapplicantlanguagedetails_visiblelist, hidelist: this.mstapplicantlanguagedetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantlanguagedetail(event, childID, i) {
        if (childID != null)
            this.Deleted_mstapplicantlanguagedetail_IDs += childID + ",";
        this.tbl_mstapplicantlanguagedetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicanteducationdetail(event, educationid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicanteducationdetail_mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_21__.mstapplicanteducationdetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, educationid, applicantid, visiblelist: this.mstapplicanteducationdetails_visiblelist, hidelist: this.mstapplicanteducationdetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicanteducationdetail(event, childID, i) {
        if (childID != null)
            this.Deleted_mstapplicanteducationdetail_IDs += childID + ",";
        this.tbl_mstapplicanteducationdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    showGeographyPreferences() {
        this.dialog.open(_pages_forms_boreportviewer_boreportviewer_component__WEBPACK_IMPORTED_MODULE_31__.BOReportViewerComponent, {
            data: { ScreenType: 2, reportcode: 'agp' }
        });
    }
    showSkills() {
        this.dialog.open(_pages_forms_mstapplicantskilldetail_mstapplicantskilldetailgrid_component__WEBPACK_IMPORTED_MODULE_6__.mstapplicantskilldetailgridComponent, {
            data: { ScreenType: 2, applicantid: this.formid, save: true }
        });
    }
    AddOrEdit_mstjobstatus(event, viewid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_23__.mstjobstatusComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, viewid, applicantid, visiblelist: this.mstjobstatuses_visiblelist, hidelist: this.mstjobstatuses_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstjobstatus(event, childID, i) {
        if (childID != null)
            this.Deleted_mstjobstatus_IDs += childID + ",";
        this.tbl_mstjobstatuses.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantreferencerequest(event, requestid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_25__.mstapplicantreferencerequestComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, requestid, applicantid, visiblelist: this.mstapplicantreferencerequests_visiblelist, hidelist: this.mstapplicantreferencerequests_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantreferencerequest(event, childID, i) {
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
    show_mstapplicantgeographypreferences_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantgeographypreferences.source.settings != null)
            this.tbl_mstapplicantgeographypreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantgeographypreferences.source.settings['hideSubHeader'];
        this.tbl_mstapplicantgeographypreferences.source.initGrid();
    }
    show_mstapplicantgeographypreferences_InActive() {
    }
    enable_mstapplicantgeographypreferences_InActive() {
    }
    Set_mstapplicantgeographypreferences_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantgeographypreferences) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantgeographypreferences.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_applicantid.value)), }, };
                this.tbl_mstapplicantgeographypreferences.source.settings = clone;
                this.tbl_mstapplicantgeographypreferences.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantgeographypreferences.source.settings);
                if (clone.columns['country'] != undefined)
                    clone.columns['country'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_country.value)), }, };
                if (clone.columns['country'] != undefined)
                    clone.columns['country'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_country.value)), }, };
                this.tbl_mstapplicantgeographypreferences.source.settings = clone;
                this.tbl_mstapplicantgeographypreferences.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantgeographypreferences = true;
        });
    }
    mstapplicantgeographypreferences_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantgeographypreferences_TableConfig() {
        this.mstapplicantgeographypreferences_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantgeographypreferences_LoadTable(mstapplicantgeographypreferences = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        //debugger;;
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantgeographypreferences_ID) >= 0) {
            if (this.tbl_mstapplicantgeographypreferences != undefined)
                this.tbl_mstapplicantgeographypreferences.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstapplicantgeographypreferences != undefined)
                this.tbl_mstapplicantgeographypreferences.source.load(mstapplicantgeographypreferences);
            if (this.tbl_mstapplicantgeographypreferences != undefined)
                this.tbl_mstapplicantgeographypreferences.source.setPaging(1, 20, true);
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
    mstapplicantgeographypreferences_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(geographypreferenceid).then(res => this.mstapplicantgeographypreferences_LoadTable());
        }
    }
    onCustom_mstapplicantgeographypreferences_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantgeographypreferences");
            let formname = objbomenuaction.actionname;
        });
    }
    mstapplicantgeographypreferences_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantgeographypreferences.source.setPaging(1, val, true);
    }
    handle_mstapplicantgeographypreferences_GridSelected(event) {
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
    show_mstapplicantcareerdetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantcareerdetails.source.settings != null)
            this.tbl_mstapplicantcareerdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantcareerdetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantcareerdetails.source.initGrid();
    }
    show_mstapplicantcareerdetails_InActive() {
    }
    enable_mstapplicantcareerdetails_InActive() {
    }
    Set_mstapplicantcareerdetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantcareerdetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_applicantid.value)), }, };
                this.tbl_mstapplicantcareerdetails.source.settings = clone;
                this.tbl_mstapplicantcareerdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
                if (clone.columns['category'] != undefined)
                    clone.columns['category'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_category.value)), }, };
                if (clone.columns['category'] != undefined)
                    clone.columns['category'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_category.value)), }, };
                this.tbl_mstapplicantcareerdetails.source.settings = clone;
                this.tbl_mstapplicantcareerdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
                if (clone.columns['skills'] != undefined)
                    clone.columns['skills'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_skills.value)), }, };
                if (clone.columns['skills'] != undefined)
                    clone.columns['skills'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_skills.value)), }, };
                this.tbl_mstapplicantcareerdetails.source.settings = clone;
                this.tbl_mstapplicantcareerdetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantcareerdetails = true;
        });
    }
    mstapplicantcareerdetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantcareerdetails_TableConfig() {
        this.mstapplicantcareerdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        //debugger;;
                        cell = this.mstapplicantcareerdetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));
                        divrow["fromdate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["fromdate"]));
                        divrow["todate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["todate"]));
                        if (row["todate"] == "1970-01-01T00:00:00")
                            divrow["todate"] = "Till Date";
                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantcareerdetails_LoadTable(mstapplicantcareerdetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantcareerdetails_ID) >= 0) {
            if (this.tbl_mstapplicantcareerdetails != undefined)
                this.tbl_mstapplicantcareerdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstapplicantcareerdetails != undefined)
                this.tbl_mstapplicantcareerdetails.source.load(mstapplicantcareerdetails);
            if (this.tbl_mstapplicantcareerdetails != undefined)
                this.tbl_mstapplicantcareerdetails.source.setPaging(1, 20, true);
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
    mstapplicantcareerdetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(careerid).then(res => this.mstapplicantcareerdetails_LoadTable());
        }
    }
    onCustom_mstapplicantcareerdetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            let referencesourcedetails = 'Company Name:' + event.data.companyname + '<BR>' + 'Designation: ' + event.data.designation + '<BR>' + 'From Date: ' + event.data.fromdate + '<BR>' + 'To Date: ' + event.data.todate + '<BR>' + 'Currently Working: ' + event.data.currentlyworking + '<BR>' + 'Remarks: ' + event.data.remarks;
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantcareerdetails");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_25__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 317, requestmasterid: event.data.careerid, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicantcareerdetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantcareerdetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantcareerdetails_GridSelected(event) {
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
    show_mstapplicantreferencedetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantreferencedetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantreferencedetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantreferencedetails.source.settings != null)
            this.tbl_mstapplicantreferencedetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantreferencedetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantreferencedetails.source.initGrid();
    }
    show_mstapplicantreferencedetails_InActive() {
    }
    enable_mstapplicantreferencedetails_InActive() {
    }
    Set_mstapplicantreferencedetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantreferencedetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencedetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_applicantid.value)), }, };
                this.tbl_mstapplicantreferencedetails.source.settings = clone;
                this.tbl_mstapplicantreferencedetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencedetails.source.settings);
                if (clone.columns['referencetype'] != undefined)
                    clone.columns['referencetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referencetype.value)), }, };
                if (clone.columns['referencetype'] != undefined)
                    clone.columns['referencetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referencetype.value)), }, };
                this.tbl_mstapplicantreferencedetails.source.settings = clone;
                this.tbl_mstapplicantreferencedetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencedetails.source.settings);
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referenceacceptance.value)), }, };
                this.tbl_mstapplicantreferencedetails.source.settings = clone;
                this.tbl_mstapplicantreferencedetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantreferencedetails = true;
        });
    }
    mstapplicantreferencedetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantreferencedetails_TableConfig() {
        this.mstapplicantreferencedetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantreferencedetails_LoadTable(mstapplicantreferencedetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantreferencedetails_ID) >= 0) {
            if (this.tbl_mstapplicantreferencedetails != undefined)
                this.tbl_mstapplicantreferencedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstapplicantreferencedetails != undefined)
                this.tbl_mstapplicantreferencedetails.source.load(mstapplicantreferencedetails);
            if (this.tbl_mstapplicantreferencedetails != undefined)
                this.tbl_mstapplicantreferencedetails.source.setPaging(1, 20, true);
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
    mstapplicantreferencedetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(referenceid).then(res => this.mstapplicantreferencedetails_LoadTable());
        }
    }
    onCustom_mstapplicantreferencedetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            let referencesourcedetails = 'Reference Type: ' + event.data.referencetypedesc + '<BR>' + 'Reference Name: ' + event.data.referencename + '<BR>' + 'Company Name: ' + event.data.companyname + '<BR>' + 'Designation: ' + event.data.designation + '<BR>' + 'Mobile: ' + event.data.mobilenumber + '<BR>' + 'Email: ' + event.data.email + '<BR>' + 'Known Duration: ' + event.data.knownduration + '<BR>' + 'Is Relative; ' + event.data.isrelative + '<BR>' + 'Remarks: ' + event.data.remarks;
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantreferencedetails");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_25__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 318, requestmasterid: event.data.referenceid, contactemailid: event.data.email, requestedcontact: event.data.referencename, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicantreferencedetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantreferencedetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantreferencedetails_GridSelected(event) {
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
    show_mstapplicantskilldetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantskilldetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantskilldetails.source.settings != null)
            this.tbl_mstapplicantskilldetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantskilldetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantskilldetails.source.initGrid();
    }
    show_mstapplicantskilldetails_InActive() {
    }
    enable_mstapplicantskilldetails_InActive() {
    }
    Set_mstapplicantskilldetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantskilldetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_applicantid.value)), }, };
                this.tbl_mstapplicantskilldetails.source.settings = clone;
                this.tbl_mstapplicantskilldetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
                if (clone.columns['skillcategory'] != undefined)
                    clone.columns['skillcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_skillcategory.value)), }, };
                if (clone.columns['skillcategory'] != undefined)
                    clone.columns['skillcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_skillcategory.value)), }, };
                this.tbl_mstapplicantskilldetails.source.settings = clone;
                this.tbl_mstapplicantskilldetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_referenceacceptance.value)), }, };
                this.tbl_mstapplicantskilldetails.source.settings = clone;
                this.tbl_mstapplicantskilldetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantskilldetails = true;
        });
    }
    mstapplicantskilldetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantskilldetails_TableConfig() {
        this.mstapplicantskilldetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantskilldetails_LoadTable(mstapplicantskilldetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantskilldetails_ID) >= 0) {
            if (this.tbl_mstapplicantskilldetails != undefined)
                this.tbl_mstapplicantskilldetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstapplicantskilldetails != undefined)
                this.tbl_mstapplicantskilldetails.source.load(mstapplicantskilldetails);
            if (this.tbl_mstapplicantskilldetails != undefined)
                this.tbl_mstapplicantskilldetails.source.setPaging(1, 20, true);
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
    mstapplicantskilldetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(skillid).then(res => this.mstapplicantskilldetails_LoadTable());
        }
    }
    onCustom_mstapplicantskilldetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            let referencesourcedetails = 'Sub Category: ' + event.data.subcategoryiddesc + '<BR>' + 'Skill Category: ' + event.data.skillcategorydesc + '<BR>' + 'Self Rating: ' + event.data.selfrating + '<BR>' + 'Remarks: ' + event.data.remarks;
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantskilldetails");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_25__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicantskilldetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantskilldetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantskilldetails_GridSelected(event) {
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
    show_mstapplicantworkreferences_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantworkreferences.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantworkreferences.source.settings != null)
            this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'];
        this.tbl_mstapplicantworkreferences.source.initGrid();
    }
    show_mstapplicantworkreferences_InActive() {
    }
    enable_mstapplicantworkreferences_InActive() {
    }
    Set_mstapplicantworkreferences_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantworkreferences) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantworkreferences.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantworkreferences_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantworkreferences_applicantid.value)), }, };
                this.tbl_mstapplicantworkreferences.source.settings = clone;
                this.tbl_mstapplicantworkreferences.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantworkreferences = true;
        });
    }
    mstapplicantworkreferences_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantworkreferences_TableConfig() {
        this.mstapplicantworkreferences_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantworkreferences_LoadTable(mstapplicantworkreferences = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantworkreferences_ID) >= 0) {
            if (this.tbl_mstapplicantworkreferences != undefined)
                this.tbl_mstapplicantworkreferences.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstapplicantworkreferences != undefined)
                this.tbl_mstapplicantworkreferences.source.load(mstapplicantworkreferences);
            if (this.tbl_mstapplicantworkreferences != undefined)
                this.tbl_mstapplicantworkreferences.source.setPaging(1, 20, true);
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
    mstapplicantworkreferences_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(workreferenceid).then(res => this.mstapplicantworkreferences_LoadTable());
        }
    }
    onCustom_mstapplicantworkreferences_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            let referencesourcedetails = 'Work Topic: ' + event.data.worktopic + '<BR>' + 'Work Description: ' + event.data.workdescription + '<BR>' + 'Reference URL: ' + event.data.referenceurl + '<BR>' + 'Remarks: ' + event.data.remarks;
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantworkreferences");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_25__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 320, requestmasterid: event.data.workreferenceid, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicantworkreferences_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantworkreferences.source.setPaging(1, val, true);
    }
    handle_mstapplicantworkreferences_GridSelected(event) {
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
    show_mstapplicantsocialmediadetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantsocialmediadetails.source.settings != null)
            this.tbl_mstapplicantsocialmediadetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantsocialmediadetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantsocialmediadetails.source.initGrid();
    }
    show_mstapplicantsocialmediadetails_InActive() {
    }
    enable_mstapplicantsocialmediadetails_InActive() {
    }
    Set_mstapplicantsocialmediadetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantsocialmediadetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantsocialmediadetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_applicantid.value)), }, };
                this.tbl_mstapplicantsocialmediadetails.source.settings = clone;
                this.tbl_mstapplicantsocialmediadetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantsocialmediadetails.source.settings);
                if (clone.columns['socialmedianame'] != undefined)
                    clone.columns['socialmedianame'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_socialmedianame.value)), }, };
                if (clone.columns['socialmedianame'] != undefined)
                    clone.columns['socialmedianame'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_socialmedianame.value)), }, };
                this.tbl_mstapplicantsocialmediadetails.source.settings = clone;
                this.tbl_mstapplicantsocialmediadetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantsocialmediadetails = true;
        });
    }
    mstapplicantsocialmediadetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantsocialmediadetails_TableConfig() {
        this.mstapplicantsocialmediadetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantsocialmediadetails_LoadTable(mstapplicantsocialmediadetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantsocialmediadetails_ID) >= 0) {
            if (this.tbl_mstapplicantsocialmediadetails != undefined)
                this.tbl_mstapplicantsocialmediadetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstapplicantsocialmediadetails != undefined)
                this.tbl_mstapplicantsocialmediadetails.source.load(mstapplicantsocialmediadetails);
            if (this.tbl_mstapplicantsocialmediadetails != undefined)
                this.tbl_mstapplicantsocialmediadetails.source.setPaging(1, 20, true);
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
    mstapplicantsocialmediadetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(socialrefid).then(res => this.mstapplicantsocialmediadetails_LoadTable());
        }
    }
    onCustom_mstapplicantsocialmediadetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantsocialmediadetails");
            let formname = objbomenuaction.actionname;
        });
    }
    mstapplicantsocialmediadetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantsocialmediadetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantsocialmediadetails_GridSelected(event) {
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
    show_mstapplicantachievementdetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantachievementdetails.source.settings != null)
            this.tbl_mstapplicantachievementdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantachievementdetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantachievementdetails.source.initGrid();
    }
    show_mstapplicantachievementdetails_InActive() {
    }
    enable_mstapplicantachievementdetails_InActive() {
    }
    Set_mstapplicantachievementdetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantachievementdetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_applicantid.value)), }, };
                this.tbl_mstapplicantachievementdetails.source.settings = clone;
                this.tbl_mstapplicantachievementdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
                if (clone.columns['masterdataid'] != undefined)
                    clone.columns['masterdataid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_masterdataid.value)), }, };
                if (clone.columns['masterdataid'] != undefined)
                    clone.columns['masterdataid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_masterdataid.value)), }, };
                this.tbl_mstapplicantachievementdetails.source.settings = clone;
                this.tbl_mstapplicantachievementdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_referenceacceptance.value)), }, };
                this.tbl_mstapplicantachievementdetails.source.settings = clone;
                this.tbl_mstapplicantachievementdetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantachievementdetails = true;
        });
    }
    mstapplicantachievementdetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantachievementdetails_TableConfig() {
        this.mstapplicantachievementdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantachievementdetails_LoadTable(mstapplicantachievementdetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantachievementdetails_ID) >= 0) {
            if (this.tbl_mstapplicantachievementdetails != undefined)
                this.tbl_mstapplicantachievementdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstapplicantachievementdetails != undefined)
                this.tbl_mstapplicantachievementdetails.source.load(mstapplicantachievementdetails);
            if (this.tbl_mstapplicantachievementdetails != undefined)
                this.tbl_mstapplicantachievementdetails.source.setPaging(1, 20, true);
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
    mstapplicantachievementdetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(achievementid).then(res => this.mstapplicantachievementdetails_LoadTable());
        }
    }
    onCustom_mstapplicantachievementdetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            let referencesourcedetails = 'Achievements: ' + event.data.masterdataiddesc + '<BR>' + 'Details: ' + event.data.achievementdetails;
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantachievementdetails");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_25__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 319, requestmasterid: event.data.achievementid, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicantachievementdetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantachievementdetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantachievementdetails_GridSelected(event) {
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
    show_mstapplicantlanguagedetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantlanguagedetails.source.settings != null)
            this.tbl_mstapplicantlanguagedetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantlanguagedetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantlanguagedetails.source.initGrid();
    }
    show_mstapplicantlanguagedetails_InActive() {
    }
    enable_mstapplicantlanguagedetails_InActive() {
    }
    Set_mstapplicantlanguagedetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantlanguagedetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantlanguagedetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_applicantid.value)), }, };
                this.tbl_mstapplicantlanguagedetails.source.settings = clone;
                this.tbl_mstapplicantlanguagedetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantlanguagedetails.source.settings);
                if (clone.columns['language'] != undefined)
                    clone.columns['language'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_language.value)), }, };
                if (clone.columns['language'] != undefined)
                    clone.columns['language'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_language.value)), }, };
                this.tbl_mstapplicantlanguagedetails.source.settings = clone;
                this.tbl_mstapplicantlanguagedetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantlanguagedetails = true;
        });
    }
    mstapplicantlanguagedetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantlanguagedetails_TableConfig() {
        this.mstapplicantlanguagedetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantlanguagedetails_LoadTable(mstapplicantlanguagedetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantlanguagedetails_ID) >= 0) {
            if (this.tbl_mstapplicantlanguagedetails != undefined)
                this.tbl_mstapplicantlanguagedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstapplicantlanguagedetails != undefined)
                this.tbl_mstapplicantlanguagedetails.source.load(mstapplicantlanguagedetails);
            if (this.tbl_mstapplicantlanguagedetails != undefined)
                this.tbl_mstapplicantlanguagedetails.source.setPaging(1, 20, true);
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
    mstapplicantlanguagedetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(languageid).then(res => this.mstapplicantlanguagedetails_LoadTable());
        }
    }
    onCustom_mstapplicantlanguagedetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantlanguagedetails");
            let formname = objbomenuaction.actionname;
        });
    }
    mstapplicantlanguagedetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantlanguagedetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantlanguagedetails_GridSelected(event) {
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
    show_mstapplicanteducationdetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicanteducationdetails.source.settings != null)
            this.tbl_mstapplicanteducationdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicanteducationdetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicanteducationdetails.source.initGrid();
    }
    show_mstapplicanteducationdetails_InActive() {
    }
    enable_mstapplicanteducationdetails_InActive() {
    }
    Set_mstapplicanteducationdetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicanteducationdetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_applicantid.value)), }, };
                this.tbl_mstapplicanteducationdetails.source.settings = clone;
                this.tbl_mstapplicanteducationdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
                if (clone.columns['educationcategory'] != undefined)
                    clone.columns['educationcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_educationcategory.value)), }, };
                if (clone.columns['educationcategory'] != undefined)
                    clone.columns['educationcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_educationcategory.value)), }, };
                this.tbl_mstapplicanteducationdetails.source.settings = clone;
                this.tbl_mstapplicanteducationdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_referenceacceptance.value)), }, };
                this.tbl_mstapplicanteducationdetails.source.settings = clone;
                this.tbl_mstapplicanteducationdetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicanteducationdetails = true;
        });
    }
    mstapplicanteducationdetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicanteducationdetails_TableConfig() {
        this.mstapplicanteducationdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicanteducationdetails_LoadTable(mstapplicanteducationdetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicanteducationdetails_ID) >= 0) {
            if (this.tbl_mstapplicanteducationdetails != undefined)
                this.tbl_mstapplicanteducationdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstapplicanteducationdetails != undefined)
                this.tbl_mstapplicanteducationdetails.source.load(mstapplicanteducationdetails);
            if (this.tbl_mstapplicanteducationdetails != undefined)
                this.tbl_mstapplicanteducationdetails.source.setPaging(1, 20, true);
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
    mstapplicanteducationdetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(educationid).then(res => this.mstapplicanteducationdetails_LoadTable());
        }
    }
    onCustom_mstapplicanteducationdetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            let referencesourcedetails = 'Category: ' + event.data.educationcategorydesc + '<BR>' + 'Sub Category: ' + event.data.educationsubcategory + '<BR>'
                + 'Course: ' + event.data.coursename + '<BR>' + 'Institution: ' + event.data.institutionname + '<BR>' + 'From Year: ' + event.data.fromyear + '<BR>'
                + 'To Year: ' + event.data.toyear + '<BR>' + 'Percentage: ' + event.data.percentage + '<BR>' + 'Remarks: ' + event.data.remarks;
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicanteducationdetails");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_25__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 315, requestmasterid: event.data.educationid, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicanteducationdetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicanteducationdetails.source.setPaging(1, val, true);
    }
    handle_mstapplicanteducationdetails_GridSelected(event) {
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
    show_mstjobstatuses_Checkbox() {
        //debugger;;
        if (this.tbl_mstjobstatuses.source.settings['selectMode'] == 'multi')
            this.tbl_mstjobstatuses.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstjobstatuses.source.settings != null)
            this.tbl_mstjobstatuses.source.settings['hideSubHeader'] = !this.tbl_mstjobstatuses.source.settings['hideSubHeader'];
        this.tbl_mstjobstatuses.source.initGrid();
    }
    show_mstjobstatuses_InActive() {
    }
    enable_mstjobstatuses_InActive() {
    }
    Set_mstjobstatuses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstjobstatuses) {
                var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_applicantid.value)), }, };
                this.tbl_mstjobstatuses.source.settings = clone;
                this.tbl_mstjobstatuses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
                if (clone.columns['corporateid'] != undefined)
                    clone.columns['corporateid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_corporateid.value)), }, };
                if (clone.columns['corporateid'] != undefined)
                    clone.columns['corporateid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_corporateid.value)), }, };
                this.tbl_mstjobstatuses.source.settings = clone;
                this.tbl_mstjobstatuses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
                if (clone.columns['jobid'] != undefined)
                    clone.columns['jobid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_jobid.value)), }, };
                if (clone.columns['jobid'] != undefined)
                    clone.columns['jobid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_jobid.value)), }, };
                this.tbl_mstjobstatuses.source.settings = clone;
                this.tbl_mstjobstatuses.source.initGrid();
            }
            this.bfilterPopulate_mstjobstatuses = true;
        });
    }
    mstjobstatuses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstjobstatuses_TableConfig() {
        this.mstjobstatuses_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstjobstatuses_LoadTable(mstjobstatuses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobstatuses_ID) >= 0) {
            if (this.tbl_mstjobstatuses != undefined)
                this.tbl_mstjobstatuses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstjobstatuses != undefined)
                this.tbl_mstjobstatuses.source.load(mstjobstatuses);
            if (this.tbl_mstjobstatuses != undefined)
                this.tbl_mstjobstatuses.source.setPaging(1, 20, true);
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
    mstjobstatuses_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(viewid).then(res => this.mstjobstatuses_LoadTable());
        }
    }
    onCustom_mstjobstatuses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstjobstatuses");
            let formname = objbomenuaction.actionname;
        });
    }
    mstjobstatuses_Paging(val) {
        //debugger;;
        this.tbl_mstjobstatuses.source.setPaging(1, val, true);
    }
    handle_mstjobstatuses_GridSelected(event) {
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
    show_mstapplicantreferencerequests_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantreferencerequests.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantreferencerequests.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantreferencerequests.source.settings != null)
            this.tbl_mstapplicantreferencerequests.source.settings['hideSubHeader'] = !this.tbl_mstapplicantreferencerequests.source.settings['hideSubHeader'];
        this.tbl_mstapplicantreferencerequests.source.initGrid();
    }
    show_mstapplicantreferencerequests_InActive() {
    }
    enable_mstapplicantreferencerequests_InActive() {
    }
    Set_mstapplicantreferencerequests_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantreferencerequests) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequests.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_applicantid.value)), }, };
                this.tbl_mstapplicantreferencerequests.source.settings = clone;
                this.tbl_mstapplicantreferencerequests.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequests.source.settings);
                if (clone.columns['requestmasterdatatypeid'] != undefined)
                    clone.columns['requestmasterdatatypeid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_requestmasterdatatypeid.value)), }, };
                if (clone.columns['requestmasterdatatypeid'] != undefined)
                    clone.columns['requestmasterdatatypeid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_requestmasterdatatypeid.value)), }, };
                this.tbl_mstapplicantreferencerequests.source.settings = clone;
                this.tbl_mstapplicantreferencerequests.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequests.source.settings);
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_referenceacceptance.value)), }, };
                this.tbl_mstapplicantreferencerequests.source.settings = clone;
                this.tbl_mstapplicantreferencerequests.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantreferencerequests = true;
        });
    }
    mstapplicantreferencerequests_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantreferencerequests_TableConfig() {
        this.mstapplicantreferencerequests_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantreferencerequests_LoadTable(mstapplicantreferencerequests = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantreferencerequests_ID) >= 0) {
            if (this.tbl_mstapplicantreferencerequests != undefined)
                this.tbl_mstapplicantreferencerequests.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_36__.LocalDataSource();
            if (this.tbl_mstapplicantreferencerequests != undefined)
                this.tbl_mstapplicantreferencerequests.source.load(mstapplicantreferencerequests);
            if (this.tbl_mstapplicantreferencerequests != undefined)
                this.tbl_mstapplicantreferencerequests.source.setPaging(1, 20, true);
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
    mstapplicantreferencerequests_route(event, action) {
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
                    alert("Request is rejected.Cannot Delete");
                }
                else if (event.data.referenceacceptance == "A") {
                    alert("Request is accepted.Cannot Delete");
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(requestid).then(res => this.mstapplicantreferencerequests_LoadTable());
        }
    }
    onCustom_mstapplicantreferencerequests_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantreferencerequests");
            let formname = objbomenuaction.actionname;
        });
    }
    mstapplicantreferencerequests_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantreferencerequests.source.setPaging(1, val, true);
    }
    handle_mstapplicantreferencerequests_GridSelected(event) {
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
};
mstapplicantmasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_37__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_38__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_39__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_40__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_29__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_41__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_42__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_42__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_42__.DialogService },
    { type: _service_mstapplicantmaster_service__WEBPACK_IMPORTED_MODULE_1__.mstapplicantmasterService },
    { type: _service_mstapplicantgeographypreference_service__WEBPACK_IMPORTED_MODULE_5__.mstapplicantgeographypreferenceService },
    { type: _service_mstapplicantcareerdetail_service__WEBPACK_IMPORTED_MODULE_8__.mstapplicantcareerdetailService },
    { type: _service_mstapplicantreferencedetail_service__WEBPACK_IMPORTED_MODULE_10__.mstapplicantreferencedetailService },
    { type: _service_mstapplicantskilldetail_service__WEBPACK_IMPORTED_MODULE_12__.mstapplicantskilldetailService },
    { type: _service_mstapplicantworkreference_service__WEBPACK_IMPORTED_MODULE_14__.mstapplicantworkreferenceService },
    { type: _service_mstapplicantsocialmediadetail_service__WEBPACK_IMPORTED_MODULE_16__.mstapplicantsocialmediadetailService },
    { type: _service_mstapplicantachievementdetail_service__WEBPACK_IMPORTED_MODULE_18__.mstapplicantachievementdetailService },
    { type: _service_mstapplicantlanguagedetail_service__WEBPACK_IMPORTED_MODULE_20__.mstapplicantlanguagedetailService },
    { type: _service_mstapplicanteducationdetail_service__WEBPACK_IMPORTED_MODULE_22__.mstapplicanteducationdetailService },
    { type: _service_mstjobstatus_service__WEBPACK_IMPORTED_MODULE_24__.mstjobstatusService },
    { type: _service_mstapplicantreferencerequest_service__WEBPACK_IMPORTED_MODULE_26__.mstapplicantreferencerequestService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_33__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_27__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_28__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_43__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_40__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_44__.NgxSpinnerService }
];
mstapplicantmasterComponent.propDecorators = {
    tbl_mstapplicantgeographypreferences: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstapplicantgeographypreferences', { static: false },] }],
    tbl_mstapplicantcareerdetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstapplicantcareerdetails', { static: false },] }],
    tbl_mstapplicantreferencedetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstapplicantreferencedetails', { static: false },] }],
    tbl_mstapplicantskilldetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstapplicantskilldetails', { static: false },] }],
    tbl_mstapplicantworkreferences: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstapplicantworkreferences', { static: false },] }],
    tbl_mstapplicantsocialmediadetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstapplicantsocialmediadetails', { static: false },] }],
    tbl_mstapplicantachievementdetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstapplicantachievementdetails', { static: false },] }],
    tbl_mstapplicantlanguagedetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstapplicantlanguagedetails', { static: false },] }],
    tbl_mstapplicanteducationdetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstapplicanteducationdetails', { static: false },] }],
    tbl_mstjobstatuses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstjobstatuses', { static: false },] }],
    tbl_mstapplicantreferencerequests: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['tbl_mstapplicantreferencerequests', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['fileattachment', { static: false },] }],
    profilephoto: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_32__.ViewChild, args: ['profilephoto', { static: false },] }]
};
mstapplicantmasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_35__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_32__.Component)({
        selector: 'app-mstapplicantmaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstapplicantmaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_39__.KeyboardShortcutsService]
    })
], mstapplicantmasterComponent);



/***/ }),

/***/ 74693:
/*!*****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantmaster/mstapplicantmaster.module.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantmasterModule": () => (/* binding */ mstapplicantmasterModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstapplicantmaster_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstapplicantmaster.routing */ 41901);
/* harmony import */ var _mstapplicantmaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstapplicantmaster.component */ 58272);
/* harmony import */ var _mstapplicantmasterview_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./mstapplicantmasterview.component */ 5483);
/* harmony import */ var _pages_forms_mstapplicantworkreference_mstapplicantworkreference_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantworkreference/mstapplicantworkreference.module */ 38404);
/* harmony import */ var _pages_forms_mstapplicantsocialmediadetail_mstapplicantsocialmediadetail_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantsocialmediadetail/mstapplicantsocialmediadetail.module */ 84531);
/* harmony import */ var _pages_forms_mstapplicantskilldetail_mstapplicantskilldetail_module__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.module */ 50223);
/* harmony import */ var _pages_forms_mstapplicantgeographypreference_mstapplicantgeographypreference_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantgeographypreference/mstapplicantgeographypreference.module */ 58055);
/* harmony import */ var _pages_forms_mstapplicanteducationdetail_mstapplicanteducationdetail_module__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicanteducationdetail/mstapplicanteducationdetail.module */ 59330);
/* harmony import */ var _pages_forms_mstapplicantcareerdetail_mstapplicantcareerdetail_module__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantcareerdetail/mstapplicantcareerdetail.module */ 35563);
/* harmony import */ var _pages_forms_mstapplicantlanguagedetail_mstapplicantlanguagedetail_module__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantlanguagedetail/mstapplicantlanguagedetail.module */ 58707);
/* harmony import */ var _pages_forms_mstapplicantreferencedetail_mstapplicantreferencedetail_module__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantreferencedetail/mstapplicantreferencedetail.module */ 56643);
/* harmony import */ var _pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_module__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.module */ 3868);
/* harmony import */ var _pages_forms_mstapplicantachievementdetail_mstapplicantachievementdetail_module__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantachievementdetail/mstapplicantachievementdetail.module */ 68834);
/* harmony import */ var _pages_forms_mstjobstatus_mstjobstatus_module__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../../pages/forms/mstjobstatus/mstjobstatus.module */ 56282);
/* harmony import */ var _mstapplicantmastermain_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./mstapplicantmastermain.component */ 47706);
/* harmony import */ var _mstresumeapplicant_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./mstresumeapplicant.component */ 80497);




















let mstapplicantmasterModule = class mstapplicantmasterModule {
};
mstapplicantmasterModule = (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_19__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstapplicantmaster_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _pages_forms_mstapplicantworkreference_mstapplicantworkreference_module__WEBPACK_IMPORTED_MODULE_5__.mstapplicantworkreferenceModule, _pages_forms_mstapplicantsocialmediadetail_mstapplicantsocialmediadetail_module__WEBPACK_IMPORTED_MODULE_6__.mstapplicantsocialmediadetailModule, _pages_forms_mstjobstatus_mstjobstatus_module__WEBPACK_IMPORTED_MODULE_15__.mstjobstatusModule,
            _pages_forms_mstapplicantskilldetail_mstapplicantskilldetail_module__WEBPACK_IMPORTED_MODULE_7__.mstapplicantskilldetailModule, _pages_forms_mstapplicantgeographypreference_mstapplicantgeographypreference_module__WEBPACK_IMPORTED_MODULE_8__.mstapplicantgeographypreferenceModule, _pages_forms_mstapplicanteducationdetail_mstapplicanteducationdetail_module__WEBPACK_IMPORTED_MODULE_9__.mstapplicanteducationdetailModule, _pages_forms_mstapplicantcareerdetail_mstapplicantcareerdetail_module__WEBPACK_IMPORTED_MODULE_10__.mstapplicantcareerdetailModule,
            _pages_forms_mstapplicantlanguagedetail_mstapplicantlanguagedetail_module__WEBPACK_IMPORTED_MODULE_11__.mstapplicantlanguagedetailModule, _pages_forms_mstapplicantreferencedetail_mstapplicantreferencedetail_module__WEBPACK_IMPORTED_MODULE_12__.mstapplicantreferencedetailModule, _pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_module__WEBPACK_IMPORTED_MODULE_13__.mstapplicantreferencerequestModule, _pages_forms_mstapplicantachievementdetail_mstapplicantachievementdetail_module__WEBPACK_IMPORTED_MODULE_14__.mstapplicantachievementdetailModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_19__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [
            _mstapplicantmaster_component__WEBPACK_IMPORTED_MODULE_3__.mstapplicantmasterComponent,
            _mstapplicantmasterview_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantmasterviewComponent,
            _mstapplicantmastermain_component__WEBPACK_IMPORTED_MODULE_16__.mstapplicantmastermainComponent,
            _mstresumeapplicant_component__WEBPACK_IMPORTED_MODULE_17__.mstresumeapplicantComponent
        ]
    })
], mstapplicantmasterModule);



/***/ }),

/***/ 41901:
/*!******************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantmaster/mstapplicantmaster.routing.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstapplicantmaster_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstapplicantmaster.component */ 58272);
/* harmony import */ var _mstapplicantmasterview_component__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./mstapplicantmasterview.component */ 5483);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);




const routes = [
    {
        path: 'mstapplicantmasters', children: [
            { path: 'edit/:id/source/:sourcekey/:sourceid', pathMatch: 'prefix', component: _mstapplicantmaster_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] },
            { path: 'edit/:id', pathMatch: 'prefix', component: _mstapplicantmaster_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] },
            { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantmaster_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstapplicantmasterview_component__WEBPACK_IMPORTED_MODULE_1__.mstapplicantmasterviewComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstapplicantmasterview_component__WEBPACK_IMPORTED_MODULE_1__.mstapplicantmasterviewComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] },
            { path: 'usersource/:usersource', pathMatch: 'prefix', component: _mstapplicantmasterview_component__WEBPACK_IMPORTED_MODULE_1__.mstapplicantmasterviewComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] },
            // { path: 'edit/:id', pathMatch: 'prefix', component: mstapplicantmastermainComponent, canDeactivate: [CanDeactivateGuard] },
            // { path: 'edit/:id/menu/:menuhide', pathMatch: 'prefix', component: mstapplicantmastermainComponent, canDeactivate: [CanDeactivateGuard] },
            { path: '', pathMatch: 'prefix', component: _mstapplicantmaster_component__WEBPACK_IMPORTED_MODULE_0__.mstapplicantmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_2__.CanDeactivateGuard] },
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_3__.RouterModule.forChild(routes);


/***/ }),

/***/ 5483:
/*!************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantmaster/mstapplicantmasterview.component.ts ***!
  \************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstapplicantmasterviewComponent": () => (/* binding */ mstapplicantmasterviewComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_33__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstapplicantmasterview_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./mstapplicantmasterview.component.html */ 5164);
/* harmony import */ var _service_mstapplicantmaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/mstapplicantmaster.service */ 88315);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_30__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_38__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_35__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_41__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_39__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_37__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_36__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_mstapplicantgeographypreference_mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantgeographypreference/mstapplicantgeographypreference.component */ 74616);
/* harmony import */ var _service_mstapplicantgeographypreference_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../service/mstapplicantgeographypreference.service */ 85861);
/* harmony import */ var _pages_forms_mstapplicantcareerdetail_mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantcareerdetail/mstapplicantcareerdetail.component */ 6403);
/* harmony import */ var _service_mstapplicantcareerdetail_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../service/mstapplicantcareerdetail.service */ 70818);
/* harmony import */ var _pages_forms_mstapplicantreferencedetail_mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantreferencedetail/mstapplicantreferencedetail.component */ 17130);
/* harmony import */ var _service_mstapplicantreferencedetail_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../../service/mstapplicantreferencedetail.service */ 43162);
/* harmony import */ var _pages_forms_mstapplicantskilldetail_mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantskilldetail/mstapplicantskilldetail.component */ 33474);
/* harmony import */ var _service_mstapplicantskilldetail_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../../service/mstapplicantskilldetail.service */ 8773);
/* harmony import */ var _pages_forms_mstapplicantworkreference_mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantworkreference/mstapplicantworkreference.component */ 68225);
/* harmony import */ var _service_mstapplicantworkreference_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./../../../service/mstapplicantworkreference.service */ 85827);
/* harmony import */ var _pages_forms_mstapplicantsocialmediadetail_mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantsocialmediadetail/mstapplicantsocialmediadetail.component */ 95343);
/* harmony import */ var _service_mstapplicantsocialmediadetail_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./../../../service/mstapplicantsocialmediadetail.service */ 30017);
/* harmony import */ var _pages_forms_mstapplicantachievementdetail_mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantachievementdetail/mstapplicantachievementdetail.component */ 42850);
/* harmony import */ var _service_mstapplicantachievementdetail_service__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./../../../service/mstapplicantachievementdetail.service */ 65955);
/* harmony import */ var _pages_forms_mstapplicantlanguagedetail_mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantlanguagedetail/mstapplicantlanguagedetail.component */ 22115);
/* harmony import */ var _service_mstapplicantlanguagedetail_service__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./../../../service/mstapplicantlanguagedetail.service */ 63832);
/* harmony import */ var _pages_forms_mstapplicanteducationdetail_mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicanteducationdetail/mstapplicanteducationdetail.component */ 41294);
/* harmony import */ var _service_mstapplicanteducationdetail_service__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./../../../service/mstapplicanteducationdetail.service */ 7210);
/* harmony import */ var _pages_forms_mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./../../../pages/forms/mstjobstatus/mstjobstatus.component */ 83793);
/* harmony import */ var _service_mstjobstatus_service__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./../../../service/mstjobstatus.service */ 60934);
/* harmony import */ var _pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ./../../../pages/forms/mstapplicantreferencerequest/mstapplicantreferencerequest.component */ 49342);
/* harmony import */ var _service_mstapplicantreferencerequest_service__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ./../../../service/mstapplicantreferencerequest.service */ 73017);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_32__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_31__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_40__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_42__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_29__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions



//Shortcuts

//translator

























//primeng services



//session,application constants




//custom fields & attachments

let mstapplicantmasterviewComponent = class mstapplicantmasterviewComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, mstapplicantmaster_service, mstapplicantgeographypreference_service, mstapplicantcareerdetail_service, mstapplicantreferencedetail_service, mstapplicantskilldetail_service, mstapplicantworkreference_service, mstapplicantsocialmediadetail_service, mstapplicantachivement_service, mstapplicantlanguagedetail_service, mstapplicanteducationdetail_service, mstjobstatus_service, mstapplicantreferencerequestService, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.mstapplicantmaster_service = mstapplicantmaster_service;
        this.mstapplicantgeographypreference_service = mstapplicantgeographypreference_service;
        this.mstapplicantcareerdetail_service = mstapplicantcareerdetail_service;
        this.mstapplicantreferencedetail_service = mstapplicantreferencedetail_service;
        this.mstapplicantskilldetail_service = mstapplicantskilldetail_service;
        this.mstapplicantworkreference_service = mstapplicantworkreference_service;
        this.mstapplicantsocialmediadetail_service = mstapplicantsocialmediadetail_service;
        this.mstapplicantachivement_service = mstapplicantachivement_service;
        this.mstapplicantlanguagedetail_service = mstapplicantlanguagedetail_service;
        this.mstapplicanteducationdetail_service = mstapplicanteducationdetail_service;
        this.mstjobstatus_service = mstjobstatus_service;
        this.mstapplicantreferencerequestService = mstapplicantreferencerequestService;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_30__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_mstapplicantmasters = false;
        this.bfilterPopulate_mstapplicantgeographypreferences = false;
        this.bfilterPopulate_mstapplicantcareerdetails = false;
        this.bfilterPopulate_mstapplicantreferencedetails = false;
        this.bfilterPopulate_mstapplicantskilldetails = false;
        this.bfilterPopulate_mstapplicantworkreferences = false;
        this.bfilterPopulate_mstapplicantsocialmediadetails = false;
        this.bfilterPopulate_mstapplicantachievementdetails = false;
        this.bfilterPopulate_mstapplicantlanguagedetails = false;
        this.bfilterPopulate_mstapplicanteducationdetails = false;
        this.bfilterPopulate_mstjobstatuses = false;
        this.bfilterPopulate_mstapplicantreferencerequests = false;
        this.mstapplicantmaster_menuactions = [];
        this.mstapplicantgeographypreference_menuactions = [];
        this.mstapplicantcareerdetail_menuactions = [];
        this.mstapplicantreferencedetail_menuactions = [];
        this.mstapplicantskilldetail_menuactions = [];
        this.mstapplicantworkreference_menuactions = [];
        this.mstapplicantsocialmediadetail_menuactions = [];
        this.mstapplicantachievementdetail_menuactions = [];
        this.mstapplicantlanguagedetail_menuactions = [];
        this.mstapplicanteducationdetail_menuactions = [];
        this.mstjobstatus_menuactions = [];
        this.mstapplicantreferencerequest_menuactions = [];
        this.country_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_30__.EventEmitter(); //autocomplete
        this.state_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_30__.EventEmitter(); //autocomplete
        this.city_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_30__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_29__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_29__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.profilecompletionvisible = false;
        this.Deleted_mstapplicantgeographypreference_IDs = "";
        this.mstapplicantgeographypreferences_ID = "1";
        this.Deleted_mstapplicantcareerdetail_IDs = "";
        this.mstapplicantcareerdetails_ID = "2";
        this.Deleted_mstapplicantreferencedetail_IDs = "";
        this.mstapplicantreferencedetails_ID = "3";
        this.Deleted_mstapplicantskilldetail_IDs = "";
        this.mstapplicantskilldetails_ID = "4";
        this.Deleted_mstapplicantworkreference_IDs = "";
        this.mstapplicantworkreferences_ID = "5";
        this.Deleted_mstapplicantsocialmediadetail_IDs = "";
        this.mstapplicantsocialmediadetails_ID = "6";
        this.Deleted_mstapplicantachievementdetail_IDs = "";
        this.mstapplicantachievementdetails_ID = "7";
        this.Deleted_mstapplicantlanguagedetail_IDs = "";
        this.mstapplicantlanguagedetails_ID = "8";
        this.Deleted_mstapplicanteducationdetail_IDs = "";
        this.mstapplicanteducationdetails_ID = "9";
        this.Deleted_mstjobstatus_IDs = "";
        this.mstjobstatuses_ID = "10";
        this.Deleted_mstapplicantreferencerequest_IDs = "";
        this.mstapplicantreferencerequests_ID = "11";
        this.isReadMore = true;
        this.readMoreBtn = true;
        this.translate = this.sharedService.translate;
        this.applicantid = this.sessionService.getItem("applicantid");
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
            firstname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.pattern(/^[a-zA-Z ]*$/)])],
            lastname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.required, _angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.pattern(/^[a-zA-Z ]*$/)])],
            emailid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.required])],
            mobilenumber: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.required])],
            applicanttype: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.required])],
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
            zipcode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_31__.Validators.pattern(/^[1-9][0-9]{5}$/)])],
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
        if (this.sessionService.getItem("role") == 2)
            this.IsApplicant = true;
        if (this.sessionService.getItem("role") == 1)
            this.IsAdmin = true;
    }
    get f() { return this.mstapplicantmaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        //debugger;;
        if (this.mstapplicantmaster_Form.dirty && this.mstapplicantmaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_32__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_32__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_32__.Observable.of(true);
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
        //debugger;;
        let pos = this.pkList.map(function (e) { return e.applicantid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        //debugger;;
        let pos = this.pkList.map(function (e) { return e.applicantid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.applicantid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.applicantid = this.currentRoute.snapshot.paramMap.get('id');
            if (this.sessionService.getItem("role") == '1') {
                this.userrole = 'Admin';
                this.isadmin = true;
            }
            else if (localStorage.getItem("role") == '3') {
                this.userrole = 'Corporate';
                this.iseditbuttonshow = false;
            }
            else if (localStorage.getItem("role") == '2') {
                this.userrole = 'Applicant';
                this.iseditbuttonshow = true;
            }
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
            //debugger;;
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
            //         this.viewHtml = `<div class="" style="background-image:url('assets/images/E.png')!important;background-repeat: repeat !important;border-radius: 5px !important;">
            // <div class="designrow">
            //     <div class="row designrow main-box" style="background-image:url('assets/images/##applicanttype##.png')!important;background-repeat: repeat !important;border-radius: 5px !important;">
            //         <div class="designrow main-content">
            //             <div class="row designrow">
            //               <!--  <div class="dp-container col-2"><img class="dp" src="##profilephoto##"></div> -->
            //                 <div class="col">
            //                 <!--     <h2><b>##firstname## ##lastname##</b></h2>
            //                     <br>
            //                     <font color='green'>
            //                         <h3>##emailid## | ##mobilenumber##</h3>
            //                     </font>-->
            //                     <font color='white'>
            //                         <h3>##applicantreference## | ##applicanttypedesc## | ##applicanttype##.png</h3>
            //                     </font>
            //                     <h3><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;##citydesc##</h3>
            //                 </div>
            //                 <div class="col-1 right top">##profilecompletion##</div>
            //             </div>
            //             <div class="row designrow">
            //             <font color='white'><h4>##statuscrimp##</h4></font>
            //         </div>
            //         </div>
            //     </div>
            // </div>
            // </div>
            // <div class="row">
            //     <h5>##briefintroduction##</h5>
            // </div>
            // `;
            //New code
            this.viewHtml = `<div class="" style="background-image:url('assets/images/E.png')!important;background-repeat: no-repeat !important;border-radius: 5px !important;">
<div class="designrow">
    <div class="row designrow main-box" style="background-image:url('assets/images/##applicanttype##.png')!important;background-repeat: no-repeat !important;border-radius: 5px !important;">
        <div class="designrow main-content">
            <div class="row designrow">
              <!--  <div class="dp-container col-2"><img class="dp" src="##profilephoto##"></div> -->
                <div class="col">
                <!--     <h2><b>##firstname## ##lastname##</b></h2>
                    <br>
                    <font color='green'>
                        <h3>##emailid## | ##mobilenumber##</h3>
                    </font>-->
                    <font color='white'>
                    <!-- <h3>##applicantreference## | ##applicanttypedesc## | ##applicanttype##.png</h3> -->
                    </font>
                    <!-- <h3><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;##citydesc##</h3> -->
                </div>
                <div class="col-1 right top">##profilecompletion##</div>
            </div>
            <div class="row designrow">
            <!--  <font color='white'><h4>##statuscrimp##</h4></font> -->
        </div>
        </div>
    </div>
</div>
</div>
<div class="row">
<h3>##applicantreference## | ##applicanttypedesc## </h3>
<h3><i class="fa fa-map-marker" aria-hidden="true"></i>&nbsp;&nbsp;##citydesc##</h3>
</div>
<div class="row">
<h4>##statuscrimp##</h4><br>
</div>
<div class="row">
<h5>##briefintroduction##</h5>
</div>
`;
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
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
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
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched
            this.mstapplicantmaster_Form.markAsUntouched();
            this.mstapplicantmaster_Form.markAsPristine();
        });
    }
    onSelected_country(countryDetail) {
        if (countryDetail.value && countryDetail) {
            this.mstapplicantmaster_Form.patchValue({
                country: countryDetail.value,
                countrydesc: countryDetail.label,
            });
            this.mstapplicantmaster_service.getList_state(countryDetail.value).then(res => {
                this.state_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_state(stateDetail) {
        if (stateDetail.value && stateDetail) {
            this.mstapplicantmaster_Form.patchValue({
                state: stateDetail.value,
                statedesc: stateDetail.label,
            });
            this.mstapplicantmaster_service.getList_city(stateDetail.value).then(res => {
                this.city_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_city(cityDetail) {
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
        ret += `<div class='geo-card1'>
    <label style="color:gray;font-weight:300;">Country</label> : <label style="color:#000;font-weight:bold;">##countrydesc##</label><br/>
    <label style="color:gray;font-weight:300;">City</label> : <label style="color:#000;font-weight:bold;">##citydesc##</label><br/>
<!--<h3 class='profile__section__item__sub'>##countrydesc## - ##citydesc##</h3>-->
<label style="color:gray;font-weight:300;">Remarks</label> : <label style="color:#000;font-weight:bold;">##remarks##</label>
</div>
`;
        return ret;
    }
    mstapplicantcareerdetailshtml() {
        let ret = "";
        ret += `<div class='career-card1'>
    <label style="color:gray;font-weight:300;">Company Name</label> : <label style="color:#000;font-weight:bold;">##companyname##</label><br/>
    <label style="color:gray;font-weight:300;">Designation</label> : <label style="color:#000;font-weight:bold;">##designation##</label><br/>
    <label style="color:gray;font-weight:300;">From Date</label> : <label style="color:#000;font-weight:bold;">##fromdate##</label> - 
    <label style="color:gray;font-weight:300;">To Date</label> : <label style="color:#000;font-weight:bold;">##todate##</label><br/>
    <label style="color:gray;font-weight:300;">Remarks</label> : <label style="color:#000;font-weight:bold;">##remarks##</label><br/>

<!--<h2>##companyname## - ##designation##</h2>
<h3 class='profile__section__item__sub'>##fromdate## - ##todate##</h3>
<p>##remarks##</p>-->
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
        ret += `<div class='skill-card1'>
    <label style="color:gray;font-weight:300;">Skill Category</label> : <label style="color:#000;font-weight:bold;">##skillcategorydesc##</label><br/>
    <label style="color:gray;font-weight:300;">Sub Category</label> : <label style="color:#000;font-weight:bold;">##subcategoryiddesc##</label><br/>
    <label style="color:gray;font-weight:300;">Self Rating</label> : <label style="color:#000;font-weight:bold;">##selfrating##</label><br/>
    <label style="color:gray;font-weight:300;">Remarks</label> : <label style="color:#000;font-weight:bold;">##remarks##</label>

<!--<h2>##skillcategorydesc## ##subcategoryiddesc##</h2>
<h3 class='profile__section__item__sub'>##selfrating##</h3>
<p>##remarks##</p>-->

</div>
`;
        return ret;
    }
    mstapplicantworkreferenceshtml() {
        let ret = "";
        ret += `<div class='project-card1'>
    <label style="color:gray;font-weight:300;">Work Topic</label> : <label style="color:#000;font-weight:bold;">##worktopic##</label><br/>
    <label style="color:gray;font-weight:300;">Reference Url</label> : <label style="color:#000;font-weight:bold;">##referenceurl##</label><br/>
    <label style="color:gray;font-weight:300;">Work Description</label> : <label style="color:#000;font-weight:bold;">##workdescription##</label><br/>
    <label style="color:gray;font-weight:300;">Remarks</label> : <label style="color:#000;font-weight:bold;">##remarks##</label>

<!--<h2>##worktopic## - ##referenceurl##</h2>
<h3 class='profile__section__item__sub'>##workdescription##</h3>
<p>##remarks##</p>-->
</div>
`;
        return ret;
    }
    mstapplicantsocialmediadetailshtml() {
        let ret = "";
        ret += `<div class='socialmedia-card1'>
    <label style="color:gray;font-weight:300;">Social Media Description</label> : <label style="color:#000;font-weight:bold;">##socialmedianamedesc##</label><br/>
    <label style="color:gray;font-weight:300;">Handle Name</label> : <label style="color:#000;font-weight:bold;">##handlename##</label><br/>
    <label style="color:gray;font-weight:300;">URL</label> : <label style="color:#000;font-weight:bold;">##url##</label><br/>
    <label style="color:gray;font-weight:300;">Remarks</label> : <label style="color:#000;font-weight:bold;">##remarks##</label>

<!--<h2>##socialmedianamedesc## - ##handlename##</h2>
<h3 class='profile__section__item__sub'><a href='##url##' target='_blank'>##url##</a></h3>
<p>##remarks##</p>-->
</div>
`;
        return ret;
    }
    mstapplicantachievementdetailshtml() {
        let ret = "";
        ret += `<div class='achievement-card1'>

    <!--<label style="color:gray;font-weight:300;">Category</label> : <label style="color:#000;font-weight:bold;">##masterdatatypeiddesc##</label><br/>-->
    <label style="color:gray;font-weight:300;">Category</label> : <label style="color:#000;font-weight:bold;">##masterdataiddesc##</label><br/>
    <label style="color:gray;font-weight:300;">Achievement Details</label> : <label style="color:#000;font-weight:bold;">##achievementdetails##</label><br/>
    <!--<label style="color:gray;font-weight:300;">Self Rating</label> : <label style="color:#000;font-weight:bold;">##selfrating##</label><br/>
    <label style="color:gray;font-weight:300;">Remarks</label> : <label style="color:#000;font-weight:bold;">##remarks##</label><br/>-->


        <!--<div class="row">
        <div class="col-6">
       <h2>##masterdatatypeiddesc##  ##masterdataiddesc##</h2>
        </div>

        <div class="col-6">
        <h2 class='profile_sectionitem_sub'>##achievementdetails##  ##selfrating##</h2>
        <p>##remarks##</p>
        </div>
        </div>-->
</div>
`;
        return ret;
    }
    mstapplicantlanguagedetailshtml() {
        let ret = "";
        ret += `<div class='language-card1'>

    <label style="color:gray;font-weight:300;">Language</label> : <label style="color:#000;font-weight:bold;">##languagedesc##</label> - 
    <label style="color:gray;font-weight:300;">Overall Rating</label> : <label style="color:#000;font-weight:bold;">##overallrating##</label><br/>
    <label style="color:gray;font-weight:300;">Read</label> : <label style="color:#000;font-size: small;;">##readproficiency##</label>  
    <label style="color:gray;font-weight:300;">Write</label> : <label style="color:#000;font-size: small;;">##writeproficiency##</label>  
    <label style="color:gray;font-weight:300;">Speak</label> : <label style="color:#000;font-size: small;;">##speakproficiency##</label><br/> 
    <label style="color:gray;font-weight:300;">Remarks</label> : <label style="color:#000;font-weight:bold;">##remarks##</label>  
    <!--<label style="color:gray;font-weight:300;">Mobile Number</label> : <label style="color:#000;font-weight:bold;">##mobilenumber##</label>  
    <label style="color:gray;font-weight:300;">Email</label> : <label style="color:#000;font-weight:bold;">##email##</label>  
    <label style="color:gray;font-weight:300;">Known Duration</label> : <label style="color:#000;font-weight:bold;">##knownduration##</label>
    <label style="color:gray;font-weight:300;">Attachment</label> : <label style="color:#000;font-weight:bold;">##attachment##</label>-->


<!--<h2>##languagedesc## - ##overallrating##</h2>
<h3 class='profile__section__item__sub'>Read ##readproficiency## Write ##writeproficiency## Speak: ##speakproficiency##</h3>
<h3 class='profile__section__item__sub'>##mobilenumber## - ##email## ##knownduration##</h3>
<p>##remarks##</p>
<p>##attachment##</p>-->
</div>
`;
        return ret;
    }
    mstapplicanteducationdetailshtml() {
        let ret = "";
        ret += `<div class='table-card1'>
    <label style="color:gray;font-weight:300;">From Year</label> : <label style="color:#000;font-weight:bold;">##fromyear##</label> - 
    <label style="color:gray;font-weight:300;">To Year</label> : <label style="color:#000;font-weight:bold;">##toyear##</label><br/>
    <label style="color:gray;font-weight:300;">Institution Name</label> : <label style="color:#000;font-weight:bold;">##institutionname##</label><br/>
    <label style="color:gray;font-weight:300;">Course Name</label> : <label style="color:#000;font-weight:bold;">##coursename##</label><br/>
    <label style="color:gray;font-weight:300;">Remarks</label> : <label style="color:#000;font-weight:bold;">##remarks##</label><br/>


<!--<div class='row' >
<div class='col-4  bold' style="margin-top: 15px !important;">##fromyear##</div>
<div class='col-4 center' style='display:block'>
<h2 class='navy'>##institutionname##</h2>
<br>
<h2>##coursename##</h2>
<br>
<h3 class='profile__section__item__sub'>##percentage##%</h3>
<br>
##remarks##
</div>
<div class='col-4 bold' style="margin-top: 15px !important;">##toyear##</div>
</div>
</div>-->
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
<h3 class='profile__section__item__sub'>##requestreferencedate## - ##requestedcontactdesc## ##contactdesignationdesc##</h3>
<h3 class='profile__section__item__sub'>##contactemailid## - ##contactmobile## ##contactuseriddesc##</h3>
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
        this.mstapplicantmaster_Form.patchValue({});
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
                }).catch((err) => { this.spinner.hide(); console.log(err); });
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
        if (this.formData.applicantid != null)
            this.formData.applicantid = null;
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
    PopulateFromMainScreen(mainscreendata, bdisable) {
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {
                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        {}
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
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true) {
            this.onSubmitData(false);
            this.readMoreBtn = true;
        }
        else if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
            this.onSubmitDataDlg(false);
            this.readMoreBtn = true;
        }
        else {
            this.onSubmitData(false);
            this.readMoreBtn = true;
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
    applicanttype_onChange(evt) {
        let e = this.f.applicanttype.value;
        this.mstapplicantmaster_Form.patchValue({ applicanttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    gender_onChange(evt) {
        let e = this.f.gender.value;
        this.mstapplicantmaster_Form.patchValue({ genderdesc: evt.options[evt.options.selectedIndex].text });
    }
    country_onChange(evt) {
        let e = evt.value;
    }
    state_onChange(evt) {
        let e = evt.value;
    }
    city_onChange(evt) {
        let e = evt.value;
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
    edit_mstapplicantmasters() {
        this.showview = false;
        this.readMoreBtn = false;
        this.router.navigate(['/home/bodashboardviewer/' + this.sessionService.getItem("usersource")]);
        /*
    this.showview=false;
    setTimeout(() => {
    if( this.profilephoto!=null && this.profilephoto!=undefined)this.profilephoto.setattachmentlist(this.mstapplicantmaster_Form.get('profilephoto').value);
    });
    return false;
    */
        // this.router.navigate(['/home/mstapplicantmasters/mstapplicantmasters/edit/' + this.pkcol]);
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.mstapplicantmaster_service.get_mstapplicantmasters_ByEID(pkcol).then(res => {
                debugger;
                this.spinner.hide();
                this.formData = res.mstapplicantmaster;
                let formproperty = res.mstapplicantmaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.showview = true;
                this.pkcol = res.mstapplicantmaster.pkcol;
                this.formid = res.mstapplicantmaster.applicantid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        debugger;
        this.formData = res.mstapplicantmaster;
        this.formid = res.mstapplicantmaster.applicantid;
        this.pkcol = res.mstapplicantmaster.pkcol;
        this.bmyrecord = false;
        this.showview = true;
        if (res.mstapplicantmaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        if (res.mstapplicantmaster.briefintroduction.length > 0 || res.mstapplicantmaster.statuscrimp.length > 0) {
            this.readMoreBtn = true;
        }
        // if(res.mstapplicantmaster.briefintroduction.length > 0){
        //     this.readMoreBtn = true;
        else {
            this.readMoreBtn = false;
        }
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
        if (res.visiblelist != undefined && res.visiblelist.indexOf("profilecompletion") >= 0)
            this.profilecompletionvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("profilecompletion") >= 0)
            this.profilecompletionvisible = false;
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
        if (this.mstapplicantmaster_Form.get('profilephoto').value != null && this.mstapplicantmaster_Form.get('profilephoto').value != "" && this.profilephoto != null && this.profilephoto != undefined)
            this.profilephoto.setattachmentlist(this.mstapplicantmaster_Form.get('profilephoto').value);
        if (this.mstapplicantmaster_Form.get('attachment').value != null && this.mstapplicantmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.mstapplicantmaster_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.country.value && this.f.country.value != "" && this.f.country.value != null)
                this.mstapplicantmaster_service.getList_state(this.f.country.value).then(res => {
                    this.state_List = res;
                }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.state.value && this.f.state.value != "" && this.f.state.value != null)
                this.mstapplicantmaster_service.getList_city(this.f.state.value).then(res => {
                    this.city_List = res;
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
    getHtml(html) {
        var _a, _b, _c, _d;
        let ret = "";
        ret = this.sharedService.ParseCommon(html);
        if (((_a = this.mstapplicantmaster_Form.controls['briefintroduction']) === null || _a === void 0 ? void 0 : _a.value) != null)
            ret = ret.replace(new RegExp('##briefintroduction##', 'g'), (_b = this.mstapplicantmaster_Form.controls['briefintroduction']) === null || _b === void 0 ? void 0 : _b.value);
        if (((_c = this.mstapplicantmaster_Form.controls['statuscrimp']) === null || _c === void 0 ? void 0 : _c.value) != null)
            ret = ret.replace(new RegExp('##statuscrimp##', 'g'), (_d = this.mstapplicantmaster_Form.controls['statuscrimp']) === null || _d === void 0 ? void 0 : _d.value);
        for (let key in this.mstapplicantmaster_Form.controls) {
            let val = this.mstapplicantmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.mstapplicantmaster_Form.controls[key] != null) {
                if (key == "profilephoto") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0)
                        ret = ret.replace(new RegExp('##' + key + '##', 'g'), _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_29__.AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
                }
                else if (false) {}
                else if (key == "profilecompletion") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined)
                        ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='progress--circle progress--" + this.formData[key] + "'><div class='progress__number'>" + this.formData[key] + "%</div></div>");
                }
                else
                    ret = ret.replace(new RegExp('##' + key + '##', 'g'), val);
            }
        }
        var re = /##(\w+)##/g;
        ret = ret.replace(re, '');
        // console.log(ret);
        return this.sanitizer.bypassSecurityTrustHtml(ret);
        //return ret;
    }
    onSubmitDataDlg(bclear) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.mstapplicantmaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.mstapplicantmaster_Form.getRawValue();
            obj.dob = new Date(this.mstapplicantmaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.mstapplicantmaster_Form.get('dob').value) + '  UTC' : null);
            if (this.profilephoto.getAttachmentList() != null)
                obj.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
            if (this.fileattachment.getAttachmentList() != null)
                obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            obj.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(obj);
            yield this.sharedService.upload(this.profilephoto.getAllFiles());
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v, _w, _x;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
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
            if (strError != "")
                return this.sharedService.alert(strError);
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
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
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
            if (this.profilephoto.getAttachmentList() != null)
                this.formData.profilephoto = JSON.stringify(this.profilephoto.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.mstapplicantmaster_service.saveOrUpdate_mstapplicantmasters(this.formData, (_b = (_a = this.tbl_mstapplicantgeographypreferences) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_mstapplicantcareerdetails) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data, (_f = (_e = this.tbl_mstapplicantreferencedetails) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.data, (_h = (_g = this.tbl_mstapplicantskilldetails) === null || _g === void 0 ? void 0 : _g.source) === null || _h === void 0 ? void 0 : _h.data, (_k = (_j = this.tbl_mstapplicantworkreferences) === null || _j === void 0 ? void 0 : _j.source) === null || _k === void 0 ? void 0 : _k.data, (_m = (_l = this.tbl_mstapplicantsocialmediadetails) === null || _l === void 0 ? void 0 : _l.source) === null || _m === void 0 ? void 0 : _m.data, (_p = (_o = this.tbl_mstapplicantachievementdetails) === null || _o === void 0 ? void 0 : _o.source) === null || _p === void 0 ? void 0 : _p.data, (_r = (_q = this.tbl_mstapplicantlanguagedetails) === null || _q === void 0 ? void 0 : _q.source) === null || _r === void 0 ? void 0 : _r.data, (_t = (_s = this.tbl_mstapplicanteducationdetails) === null || _s === void 0 ? void 0 : _s.source) === null || _t === void 0 ? void 0 : _t.data, (_v = (_u = this.tbl_mstjobstatuses) === null || _u === void 0 ? void 0 : _u.source) === null || _v === void 0 ? void 0 : _v.data, (_x = (_w = this.tbl_mstapplicantreferencerequests) === null || _w === void 0 ? void 0 : _w.source) === null || _x === void 0 ? void 0 : _x.data).subscribe(
            // this.mstapplicantmaster_service.saveOrUpdate_mstapplicantmasters(this.formData, this.tbl_mstapplicantgeographypreferences?.source?.data, this.tbl_mstapplicantcareerdetails?.source?.data, this.tbl_mstapplicantreferencedetails?.source?.data, this.tbl_mstapplicantskilldetails?.source?.data, this.tbl_mstapplicantworkreferences?.source?.data, this.tbl_mstapplicantsocialmediadetails?.source?.data, this.tbl_mstapplicantachievementdetails?.source?.data, this.tbl_mstapplicantlanguagedetails?.source?.data, this.tbl_mstapplicanteducationdetails?.source?.data, this.tbl_mstjobstatuses?.source?.data, this.tbl_mstapplicantreferencerequests?.source?.data,).subscribe(
            (res) => (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.profilephoto.getAllFiles());
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_mstapplicantgeographypreferences.source) {
                    for (let i = 0; i < this.tbl_mstapplicantgeographypreferences.source.data.length; i++) {
                        if (this.tbl_mstapplicantgeographypreferences.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantgeographypreferences.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantcareerdetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantcareerdetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantcareerdetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantcareerdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantreferencedetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantreferencedetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantreferencedetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantreferencedetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantskilldetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantskilldetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantskilldetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantskilldetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantworkreferences.source) {
                    for (let i = 0; i < this.tbl_mstapplicantworkreferences.source.data.length; i++) {
                        if (this.tbl_mstapplicantworkreferences.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantworkreferences.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantsocialmediadetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantsocialmediadetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantsocialmediadetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantsocialmediadetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantachievementdetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantachievementdetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantachievementdetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantachievementdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantlanguagedetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicantlanguagedetails.source.data.length; i++) {
                        if (this.tbl_mstapplicantlanguagedetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantlanguagedetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicanteducationdetails.source) {
                    for (let i = 0; i < this.tbl_mstapplicanteducationdetails.source.data.length; i++) {
                        if (this.tbl_mstapplicanteducationdetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicanteducationdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstjobstatuses.source) {
                    for (let i = 0; i < this.tbl_mstjobstatuses.source.data.length; i++) {
                        if (this.tbl_mstjobstatuses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstjobstatuses.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstapplicantreferencerequests.source) {
                    for (let i = 0; i < this.tbl_mstapplicantreferencerequests.source.data.length; i++) {
                        if (this.tbl_mstapplicantreferencerequests.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstapplicantreferencerequests.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                //debugger;;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.router.navigate(['/home/mstapplicantmasters/mstapplicantmasters/view/' + this.pkcol]);
                this.objvalues.push(res.mstapplicantmaster);
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
                        this.objvalues.push(res.mstapplicantmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstapplicantmaster_Form.markAsUntouched();
                this.mstapplicantmaster_Form.markAsPristine();
            }), err => {
                //debugger;;
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            });
        });
    }
    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_mstapplicantgeographypreferences.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
        this.tbl_mstapplicantcareerdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
        this.tbl_mstapplicantreferencedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
        this.tbl_mstapplicantskilldetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
        this.tbl_mstapplicantworkreferences.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
        this.tbl_mstapplicantsocialmediadetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
        this.tbl_mstapplicantachievementdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
        this.tbl_mstapplicantlanguagedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
        this.tbl_mstapplicanteducationdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
        this.tbl_mstjobstatuses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
        this.tbl_mstapplicantreferencerequests.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
    }
    AddOrEdit_mstapplicantgeographypreference(event, geographypreferenceid, applicantid) {
        debugger;
        ;
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantgeographypreference_mstapplicantgeographypreference_component__WEBPACK_IMPORTED_MODULE_4__.mstapplicantgeographypreferenceComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, geographypreferenceid, applicantid, visiblelist: this.mstapplicantgeographypreferences_visiblelist, hidelist: this.mstapplicantgeographypreferences_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantgeographypreference(event, childID, i) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantgeographypreference_service.delete_mstapplicantgeographypreference(childID).then(res => {
                this.tbl_mstapplicantgeographypreferences.source.refresh();
                this.ngOnInit();
                // this.mstapplicantgeographypreference_service.getDefaultData().then(res => {
                //     this.mstapplicantgeographypreferences_LoadTable(res);
                // });
            });
        }
        else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantgeographypreference_IDs += childID + ",";
        // this.tbl_mstapplicantgeographypreferences.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantcareerdetail(event, careerid, applicantid) {
        debugger;
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantcareerdetail_mstapplicantcareerdetail_component__WEBPACK_IMPORTED_MODULE_6__.mstapplicantcareerdetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, careerid, applicantid, visiblelist: this.mstapplicantcareerdetails_visiblelist, hidelist: this.mstapplicantcareerdetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantcareerdetail(event, childID, i) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantcareerdetail_service.delete_mstapplicantcareerdetail(childID).then(res => {
                this.tbl_mstapplicantcareerdetails.source.refresh();
                this.ngOnInit();
                // this.mstapplicantcareerdetail_service.getDefaultData().then(res => {
                //     this.mstapplicantcareerdetails_LoadTable(res);
                // });
            });
        }
        else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantcareerdetail_IDs += childID + ",";
        // this.tbl_mstapplicantcareerdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantreferencedetail(event, referenceid, applicantid) {
        debugger;
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantreferencedetail_mstapplicantreferencedetail_component__WEBPACK_IMPORTED_MODULE_8__.mstapplicantreferencedetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, referenceid, applicantid, visiblelist: this.mstapplicantreferencedetails_visiblelist, hidelist: this.mstapplicantreferencedetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantreferencedetail(event, childID, i) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantreferencedetail_service.delete_mstapplicantreferencedetail(childID).then(res => {
                // this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByEID(this.applicantid).then(res => {
                this.tbl_mstapplicantreferencedetails.source.refresh();
                this.ngOnInit();
                // this.mstapplicantskilldetails_LoadTable(res);
                // });
            });
        }
        else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantreferencedetail_IDs += childID + ",";
        // this.tbl_mstapplicantreferencedetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantskilldetail(event, skillid, applicantid) {
        debugger;
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantskilldetail_mstapplicantskilldetail_component__WEBPACK_IMPORTED_MODULE_10__.mstapplicantskilldetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, skillid, applicantid, visiblelist: this.mstapplicantskilldetails_visiblelist, hidelist: this.mstapplicantskilldetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantskilldetail(event, childID, i) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantskilldetail_service.delete_mstapplicantskilldetail(childID).then(res => {
                // this.mstapplicantskilldetail_service.get_mstapplicantskilldetails_ByEID(this.applicantid).then(res => {
                this.tbl_mstapplicantskilldetails.source.refresh();
                this.ngOnInit();
                // this.mstapplicantskilldetails_LoadTable(res);
                // });
            });
        }
        else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantskilldetail_IDs += childID + ",";
        // this.tbl_mstapplicantskilldetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantworkreference(event, workreferenceid, applicantid) {
        debugger;
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantworkreference_mstapplicantworkreference_component__WEBPACK_IMPORTED_MODULE_12__.mstapplicantworkreferenceComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workreferenceid, applicantid, visiblelist: this.mstapplicantworkreferences_visiblelist, hidelist: this.mstapplicantworkreferences_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantworkreference(event, childID, i) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantworkreference_service.delete_mstapplicantworkreference(childID).then(res => {
                this.tbl_mstapplicantworkreferences.source.refresh();
                this.ngOnInit();
                // this.mstapplicantworkreference_service.getDefaultData().then(res => {
                //     debugger;
                // this.mstapplicantworkreferences_LoadTable(res);
                // });
            });
        }
        else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantworkreference_IDs += childID + ",";
        // this.tbl_mstapplicantworkreferences.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantsocialmediadetail(event, socialrefid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantsocialmediadetail_mstapplicantsocialmediadetail_component__WEBPACK_IMPORTED_MODULE_14__.mstapplicantsocialmediadetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, socialrefid, applicantid, visiblelist: this.mstapplicantsocialmediadetails_visiblelist, hidelist: this.mstapplicantsocialmediadetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantsocialmediadetail(event, childID, i) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantsocialmediadetail_service.delete_mstapplicantsocialmediadetail(childID).then(res => {
                this.tbl_mstapplicantsocialmediadetails.source.refresh();
                this.ngOnInit();
                // this.mstapplicantsocialmediadetail_service.getDefaultData().then(res => {
                //     this.mstapplicantsocialmediadetails_LoadTable(res);
                //     });
            });
        }
        else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantsocialmediadetail_IDs += childID + ",";
        // this.tbl_mstapplicantsocialmediadetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantachievementdetail(event, achievementid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantachievementdetail_mstapplicantachievementdetail_component__WEBPACK_IMPORTED_MODULE_16__.mstapplicantachievementdetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, achievementid, applicantid, visiblelist: this.mstapplicantachievementdetails_visiblelist, hidelist: this.mstapplicantachievementdetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantachievementdetail(event, childID, i) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantachivement_service.delete_mstapplicantachievementdetail(childID).then(res => {
                this.tbl_mstapplicantachievementdetails.source.refresh();
                this.ngOnInit();
                // this.mstapplicantachivement_service.getDefaultData().then(res => {
                //     this.mstapplicantachievementdetails_LoadTable(res);
                // });
            });
        }
        else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantachievementdetail_IDs += childID + ",";
        // this.tbl_mstapplicantachievementdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantlanguagedetail(event, languageid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantlanguagedetail_mstapplicantlanguagedetail_component__WEBPACK_IMPORTED_MODULE_18__.mstapplicantlanguagedetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, languageid, applicantid, visiblelist: this.mstapplicantlanguagedetails_visiblelist, hidelist: this.mstapplicantlanguagedetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantlanguagedetail(event, childID, i) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantlanguagedetail_service.delete_mstapplicantlanguagedetail(childID).then(res => {
                this.tbl_mstapplicantlanguagedetails.source.refresh();
                this.ngOnInit();
                // this.mstapplicantlanguagedetail_service.get_mstapplicantlanguagedetails_ByApplicantID(this.applicantid).then(res => {
                //     this.mstapplicantlanguagedetails_LoadTable(res);
                //     });
            });
        }
        else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantlanguagedetail_IDs += childID + ",";
        // this.tbl_mstapplicantlanguagedetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicanteducationdetail(event, educationid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicanteducationdetail_mstapplicanteducationdetail_component__WEBPACK_IMPORTED_MODULE_20__.mstapplicanteducationdetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, educationid, applicantid, visiblelist: this.mstapplicanteducationdetails_visiblelist, hidelist: this.mstapplicanteducationdetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicanteducationdetail(event, childID, i) {
        console.log('event call on delete');
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicanteducationdetail_service.delete_mstapplicanteducationdetail(childID).then(res => {
                this.tbl_mstapplicanteducationdetails.source.refresh();
                this.ngOnInit();
                // this.mstapplicanteducationdetail_service.get_mstapplicanteducationdetails_ByID(this.applicantid).then(res => {
                //     this.mstapplicanteducationdetails_LoadTable(res);
                //     });
            });
        }
        else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicanteducationdetail_IDs += childID + ",";
        // this.tbl_mstapplicanteducationdetails.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstjobstatus(event, viewid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_22__.mstjobstatusComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, viewid, applicantid, visiblelist: this.mstjobstatuses_visiblelist, hidelist: this.mstjobstatuses_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstjobstatus(event, childID, i) {
        if (childID != null)
            this.Deleted_mstjobstatus_IDs += childID + ",";
        this.tbl_mstjobstatuses.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstapplicantreferencerequest(event, requestid, applicantid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_24__.mstapplicantreferencerequestComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, requestid, applicantid, visiblelist: this.mstapplicantreferencerequests_visiblelist, hidelist: this.mstapplicantreferencerequests_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_mstapplicantreferencerequest(event, childID, i) {
        if (confirm('Do you want to delete this record?')) {
            this.mstapplicantreferencerequestService.delete_mstapplicantreferencerequest(childID).then(res => {
                this.tbl_mstapplicantreferencerequests.source.refresh();
                this.ngOnInit();
                // this.mstapplicantreferencerequestService.get_mstapplicantreferencerequests_ByApplicantID(this.applicantid).then(res => {
                //     // this.mstapplicantskilldetails_LoadTable(res);
                //     this.mstapplicantreferencerequests_LoadTable(res);
                // });
            });
        }
        else {
            return;
        }
        // if (childID != null)
        //     this.Deleted_mstapplicantreferencerequest_IDs += childID + ",";
        // this.tbl_mstapplicantreferencerequests.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_mstapplicantgeographypreferences_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantgeographypreferences.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantgeographypreferences.source.settings != null)
            this.tbl_mstapplicantgeographypreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantgeographypreferences.source.settings['hideSubHeader'];
        this.tbl_mstapplicantgeographypreferences.source.initGrid();
    }
    show_mstapplicantgeographypreferences_InActive() {
    }
    enable_mstapplicantgeographypreferences_InActive() {
    }
    Set_mstapplicantgeographypreferences_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantgeographypreferences) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantgeographypreferences.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_applicantid.value)), }, };
                this.tbl_mstapplicantgeographypreferences.source.settings = clone;
                this.tbl_mstapplicantgeographypreferences.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantgeographypreferences.source.settings);
                if (clone.columns['country'] != undefined)
                    clone.columns['country'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_country.value)), }, };
                if (clone.columns['country'] != undefined)
                    clone.columns['country'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantgeographypreferences_country.value)), }, };
                this.tbl_mstapplicantgeographypreferences.source.settings = clone;
                this.tbl_mstapplicantgeographypreferences.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantgeographypreferences = true;
        });
    }
    mstapplicantgeographypreferences_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantgeographypreferences_TableConfig() {
        this.mstapplicantgeographypreferences_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                delete: false,
                position: 'right',
                // custom: this.mstapplicantgeographypreference_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantgeographypreferences_LoadTable(mstapplicantgeographypreferences = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        //debugger;;
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantgeographypreferences_ID) >= 0) {
            if (this.tbl_mstapplicantgeographypreferences != undefined)
                this.tbl_mstapplicantgeographypreferences.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstapplicantgeographypreferences != undefined)
                this.tbl_mstapplicantgeographypreferences.source.load(mstapplicantgeographypreferences);
            if (this.tbl_mstapplicantgeographypreferences != undefined)
                this.tbl_mstapplicantgeographypreferences.source.setPaging(1, 20, true);
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
    mstapplicantgeographypreferences_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(geographypreferenceid).then(res => {
                this.tbl_mstapplicantgeographypreferences.source.refresh();
                this.ngOnInit();
            });
        }
    }
    onCustom_mstapplicantgeographypreferences_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantgeographypreferences");
            let formname = objbomenuaction.actionname;
        });
    }
    mstapplicantgeographypreferences_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantgeographypreferences.source.setPaging(1, val, true);
    }
    handle_mstapplicantgeographypreferences_GridSelected(event) {
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
    show_mstapplicantcareerdetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantcareerdetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantcareerdetails.source.settings != null)
            this.tbl_mstapplicantcareerdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantcareerdetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantcareerdetails.source.initGrid();
    }
    show_mstapplicantcareerdetails_InActive() {
    }
    enable_mstapplicantcareerdetails_InActive() {
    }
    Set_mstapplicantcareerdetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantcareerdetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_applicantid.value)), }, };
                this.tbl_mstapplicantcareerdetails.source.settings = clone;
                this.tbl_mstapplicantcareerdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
                if (clone.columns['category'] != undefined)
                    clone.columns['category'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_category.value)), }, };
                if (clone.columns['category'] != undefined)
                    clone.columns['category'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_category.value)), }, };
                this.tbl_mstapplicantcareerdetails.source.settings = clone;
                this.tbl_mstapplicantcareerdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantcareerdetails.source.settings);
                if (clone.columns['skills'] != undefined)
                    clone.columns['skills'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_skills.value)), }, };
                if (clone.columns['skills'] != undefined)
                    clone.columns['skills'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantcareerdetails_skills.value)), }, };
                this.tbl_mstapplicantcareerdetails.source.settings = clone;
                this.tbl_mstapplicantcareerdetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantcareerdetails = true;
        });
    }
    mstapplicantcareerdetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantcareerdetails_TableConfig() {
        this.mstapplicantcareerdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                delete: false,
                position: 'right',
                // custom: this.mstapplicantcareerdetail_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        //debugger;;
                        cell = this.mstapplicantcareerdetailshtml();
                        var divrow = JSON.parse(JSON.stringify(row));
                        divrow["fromdate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["fromdate"]));
                        divrow["todate"] = this.ngbDateParserFormatter.format(this.ngbDateParserFormatter.parse(row["todate"]));
                        if (row["todate"] == "1970-01-01T00:00:00")
                            divrow["todate"] = "Till Date";
                        return this.sharedService.HtmlValue(divrow, cell);
                    },
                },
            },
        };
    }
    mstapplicantcareerdetails_LoadTable(mstapplicantcareerdetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantcareerdetails_ID) >= 0) {
            if (this.tbl_mstapplicantcareerdetails != undefined)
                this.tbl_mstapplicantcareerdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstapplicantcareerdetails != undefined)
                this.tbl_mstapplicantcareerdetails.source.load(mstapplicantcareerdetails);
            if (this.tbl_mstapplicantcareerdetails != undefined)
                this.tbl_mstapplicantcareerdetails.source.setPaging(1, 20, true);
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
    mstapplicantcareerdetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(careerid).then(res => this.mstapplicantcareerdetails_LoadTable());
        }
    }
    onCustom_mstapplicantcareerdetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            let careerdetails = '<ul class="list-group"  style="background: #0368b7 !important;"><li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Company Name: ' + event.data.companyname + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Designation: ' + event.data.designation + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> From Date: ' + event.data.fromdate + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> To Date: ' + event.data.todate + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Currently Working: ' + event.data.currentlyworking + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>';
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantcareerdetails");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_24__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: careerdetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 317, requestmasterid: event.data.careerid, ScreenType: 2, save: true }
                    // data: { applicantid: event.data.applicantid, requestmasterdatatypeid: 317, requestmasterid: event.data.careerid, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicantcareerdetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantcareerdetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantcareerdetails_GridSelected(event) {
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
    show_mstapplicantreferencedetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantreferencedetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantreferencedetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantreferencedetails.source.settings != null)
            this.tbl_mstapplicantreferencedetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantreferencedetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantreferencedetails.source.initGrid();
    }
    show_mstapplicantreferencedetails_InActive() {
    }
    enable_mstapplicantreferencedetails_InActive() {
    }
    Set_mstapplicantreferencedetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantreferencedetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencedetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_applicantid.value)), }, };
                this.tbl_mstapplicantreferencedetails.source.settings = clone;
                this.tbl_mstapplicantreferencedetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencedetails.source.settings);
                if (clone.columns['referencetype'] != undefined)
                    clone.columns['referencetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referencetype.value)), }, };
                if (clone.columns['referencetype'] != undefined)
                    clone.columns['referencetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referencetype.value)), }, };
                this.tbl_mstapplicantreferencedetails.source.settings = clone;
                this.tbl_mstapplicantreferencedetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencedetails.source.settings);
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencedetails_referenceacceptance.value)), }, };
                this.tbl_mstapplicantreferencedetails.source.settings = clone;
                this.tbl_mstapplicantreferencedetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantreferencedetails = true;
        });
    }
    mstapplicantreferencedetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantreferencedetails_TableConfig() {
        this.mstapplicantreferencedetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                delete: false,
                position: 'right',
                // custom: this.mstapplicantreferencedetail_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantreferencedetails_LoadTable(mstapplicantreferencedetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantreferencedetails_ID) >= 0) {
            if (this.tbl_mstapplicantreferencedetails != undefined)
                this.tbl_mstapplicantreferencedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstapplicantreferencedetails != undefined)
                this.tbl_mstapplicantreferencedetails.source.load(mstapplicantreferencedetails);
            if (this.tbl_mstapplicantreferencedetails != undefined)
                this.tbl_mstapplicantreferencedetails.source.setPaging(1, 20, true);
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
    mstapplicantreferencedetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(referenceid).then(res => this.mstapplicantreferencedetails_LoadTable());
        }
    }
    onCustom_mstapplicantreferencedetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            let referencesourcedetails = '<ul class="list-group"  style="background: #0368b7 !important;"><li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Reference Type: ' + event.data.referencetypedesc + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Reference Name: ' + event.data.referencename + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Company Name: ' + event.data.companyname + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Designation: ' + event.data.designation + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Mobile: ' + event.data.mobilenumber + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Email: ' + event.data.email + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Known Duration: ' + event.data.knownduration + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Is Relative: ' + event.data.isrelative + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li></ul>';
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantreferencedetails");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_24__.mstapplicantreferencerequestComponent, {
                    // data: { applicantid: event.data.applicantid, requestmasterdatatypeid: 318, requestmasterid: event.data.achievementid, contactemailid: event.data.email, requestedcontact: event.data.referencename, ScreenType: 2, save: true }
                    data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 318, requestmasterid: event.data.referenceid, contactemailid: event.data.email, requestedcontact: event.data.referencename, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicantreferencedetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantreferencedetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantreferencedetails_GridSelected(event) {
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
    show_mstapplicantskilldetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantskilldetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantskilldetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantskilldetails.source.settings != null)
            this.tbl_mstapplicantskilldetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantskilldetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantskilldetails.source.initGrid();
    }
    show_mstapplicantskilldetails_InActive() {
    }
    enable_mstapplicantskilldetails_InActive() {
    }
    Set_mstapplicantskilldetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantskilldetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_applicantid.value)), }, };
                this.tbl_mstapplicantskilldetails.source.settings = clone;
                this.tbl_mstapplicantskilldetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
                if (clone.columns['skillcategory'] != undefined)
                    clone.columns['skillcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_skillcategory.value)), }, };
                if (clone.columns['skillcategory'] != undefined)
                    clone.columns['skillcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_skillcategory.value)), }, };
                this.tbl_mstapplicantskilldetails.source.settings = clone;
                this.tbl_mstapplicantskilldetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantskilldetails.source.settings);
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantskilldetails_referenceacceptance.value)), }, };
                this.tbl_mstapplicantskilldetails.source.settings = clone;
                this.tbl_mstapplicantskilldetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantskilldetails = true;
        });
    }
    mstapplicantskilldetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantskilldetails_TableConfig() {
        this.mstapplicantskilldetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                delete: false,
                position: 'right',
                // custom: this.mstapplicantskilldetail_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantskilldetails_LoadTable(mstapplicantskilldetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantskilldetails_ID) >= 0) {
            if (this.tbl_mstapplicantskilldetails != undefined)
                this.tbl_mstapplicantskilldetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstapplicantskilldetails != undefined)
                this.tbl_mstapplicantskilldetails.source.load(mstapplicantskilldetails);
            if (this.tbl_mstapplicantskilldetails != undefined)
                this.tbl_mstapplicantskilldetails.source.setPaging(1, 20, true);
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
    mstapplicantskilldetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(skillid).then(res => this.mstapplicantskilldetails_LoadTable());
        }
    }
    onCustom_mstapplicantskilldetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            let skillsdetails = '<ul class="list-group"  style="background: #0368b7 !important;"><li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Sub Category: ' + event.data.subcategoryiddesc + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Skill Category: ' + event.data.skillcategorydesc + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Self Rating: ' + event.data.selfrating + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>';
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantskilldetails");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_24__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: skillsdetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 2, save: true }
                    // data: { referencesourcedetails: referencesourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 318, requestmasterid: event.data.referenceid, contactemailid: event.data.email, requestedcontact: event.data.referencename, ScreenType: 2, save: true }
                    // data: { skillsdetails:skillsdetails,applicantid: event.data.applicantid, requestmasterdatatypeid: 316, requestmasterid: event.data.skillid, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicantskilldetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantskilldetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantskilldetails_GridSelected(event) {
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
    show_mstapplicantworkreferences_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantworkreferences.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantworkreferences.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantworkreferences.source.settings != null)
            this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'] = !this.tbl_mstapplicantworkreferences.source.settings['hideSubHeader'];
        this.tbl_mstapplicantworkreferences.source.initGrid();
    }
    show_mstapplicantworkreferences_InActive() {
    }
    enable_mstapplicantworkreferences_InActive() {
    }
    Set_mstapplicantworkreferences_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantworkreferences) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantworkreferences.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantworkreferences_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantworkreferences_applicantid.value)), }, };
                this.tbl_mstapplicantworkreferences.source.settings = clone;
                this.tbl_mstapplicantworkreferences.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantworkreferences = true;
        });
    }
    mstapplicantworkreferences_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantworkreferences_TableConfig() {
        this.mstapplicantworkreferences_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                delete: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                position: 'right',
                // custom: this.mstapplicantworkreference_menuactions
                custom: ""
                // custom: [{
                //     name: 'reference',
                //     title: `<i class="icon-references" aria-hidden="true"></i>`,
                // }],
            },
            // actions: {
            //     columnTitle: '',
            //     width: '300px',
            //     edit: true, // true,
            //     // delete: (this.IsApplicant || this.IsAdmin),
            //     delete: true,
            //     position: 'right',
            //     custom: this.mstapplicantworkreference_menuactions
            //     // custom: ""
            // },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantworkreferences_LoadTable(mstapplicantworkreferences = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantworkreferences_ID) >= 0) {
            if (this.tbl_mstapplicantworkreferences != undefined)
                this.tbl_mstapplicantworkreferences.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstapplicantworkreferences != undefined)
                this.tbl_mstapplicantworkreferences.source.load(mstapplicantworkreferences);
            if (this.tbl_mstapplicantworkreferences != undefined)
                this.tbl_mstapplicantworkreferences.source.setPaging(1, 20, true);
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
    mstapplicantworkreferences_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(workreferenceid).then(res => this.mstapplicantworkreferences_LoadTable());
        }
    }
    onCustom_mstapplicantworkreferences_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            let workreferences = '<ul class="list-group"  style="background: #0368b7 !important;"><li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Work Topic: ' + event.data.worktopic + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;overflow: auto !important;white-space: nowrap  !important;"> Work Description: ' + event.data.workdescription + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Reference URL:: ' + event.data.referenceurl + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>';
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantworkreferences");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_24__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: workreferences, applicantid: event.data.applicantid, requestmasterdatatypeid: 320, requestmasterid: event.data.workreferenceid, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    // async onCustom_mstapplicantworkreferences_Action(event: any) {
    //     let objbomenuaction = await this.sharedService.onCustomAction(event, "mstapplicantworkreferences");
    //     let formname = (objbomenuaction as any).actionname;
    // }
    mstapplicantworkreferences_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantworkreferences.source.setPaging(1, val, true);
    }
    handle_mstapplicantworkreferences_GridSelected(event) {
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
    show_mstapplicantsocialmediadetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantsocialmediadetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantsocialmediadetails.source.settings != null)
            this.tbl_mstapplicantsocialmediadetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantsocialmediadetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantsocialmediadetails.source.initGrid();
    }
    show_mstapplicantsocialmediadetails_InActive() {
    }
    enable_mstapplicantsocialmediadetails_InActive() {
    }
    Set_mstapplicantsocialmediadetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantsocialmediadetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantsocialmediadetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_applicantid.value)), }, };
                this.tbl_mstapplicantsocialmediadetails.source.settings = clone;
                this.tbl_mstapplicantsocialmediadetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantsocialmediadetails.source.settings);
                if (clone.columns['socialmedianame'] != undefined)
                    clone.columns['socialmedianame'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_socialmedianame.value)), }, };
                if (clone.columns['socialmedianame'] != undefined)
                    clone.columns['socialmedianame'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantsocialmediadetails_socialmedianame.value)), }, };
                this.tbl_mstapplicantsocialmediadetails.source.settings = clone;
                this.tbl_mstapplicantsocialmediadetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantsocialmediadetails = true;
        });
    }
    mstapplicantsocialmediadetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantsocialmediadetails_TableConfig() {
        this.mstapplicantsocialmediadetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                delete: false,
                position: 'right',
                // custom: this.mstapplicantsocialmediadetail_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantsocialmediadetails_LoadTable(mstapplicantsocialmediadetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantsocialmediadetails_ID) >= 0) {
            if (this.tbl_mstapplicantsocialmediadetails != undefined)
                this.tbl_mstapplicantsocialmediadetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstapplicantsocialmediadetails != undefined)
                this.tbl_mstapplicantsocialmediadetails.source.load(mstapplicantsocialmediadetails);
            if (this.tbl_mstapplicantsocialmediadetails != undefined)
                this.tbl_mstapplicantsocialmediadetails.source.setPaging(1, 20, true);
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
    mstapplicantsocialmediadetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(socialrefid).then(res => this.mstapplicantsocialmediadetails_LoadTable());
        }
    }
    onCustom_mstapplicantsocialmediadetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantsocialmediadetails");
            let formname = objbomenuaction.actionname;
        });
    }
    mstapplicantsocialmediadetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantsocialmediadetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantsocialmediadetails_GridSelected(event) {
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
    show_mstapplicantachievementdetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantachievementdetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantachievementdetails.source.settings != null)
            this.tbl_mstapplicantachievementdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantachievementdetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantachievementdetails.source.initGrid();
    }
    show_mstapplicantachievementdetails_InActive() {
    }
    enable_mstapplicantachievementdetails_InActive() {
    }
    Set_mstapplicantachievementdetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantachievementdetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_applicantid.value)), }, };
                this.tbl_mstapplicantachievementdetails.source.settings = clone;
                this.tbl_mstapplicantachievementdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
                if (clone.columns['masterdataid'] != undefined)
                    clone.columns['masterdataid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_masterdataid.value)), }, };
                if (clone.columns['masterdataid'] != undefined)
                    clone.columns['masterdataid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_masterdataid.value)), }, };
                this.tbl_mstapplicantachievementdetails.source.settings = clone;
                this.tbl_mstapplicantachievementdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantachievementdetails.source.settings);
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantachievementdetails_referenceacceptance.value)), }, };
                this.tbl_mstapplicantachievementdetails.source.settings = clone;
                this.tbl_mstapplicantachievementdetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantachievementdetails = true;
        });
    }
    mstapplicantachievementdetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantachievementdetails_TableConfig() {
        this.mstapplicantachievementdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                delete: false,
                position: 'right',
                // custom: this.mstapplicantachievementdetail_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantachievementdetails_LoadTable(mstapplicantachievementdetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantachievementdetails_ID) >= 0) {
            if (this.tbl_mstapplicantachievementdetails != undefined)
                this.tbl_mstapplicantachievementdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstapplicantachievementdetails != undefined)
                this.tbl_mstapplicantachievementdetails.source.load(mstapplicantachievementdetails);
            if (this.tbl_mstapplicantachievementdetails != undefined)
                this.tbl_mstapplicantachievementdetails.source.setPaging(1, 20, true);
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
    mstapplicantachievementdetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(achievementid).then(res => this.mstapplicantachievementdetails_LoadTable());
        }
    }
    onCustom_mstapplicantachievementdetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            let achievementdet = '<ul class="list-group"  style="background: #0368b7 !important;"><li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Achievements: ' + event.data.masterdataiddesc + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Details: ' + event.data.achievementdetails + '</li>';
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantachievementdetails");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_24__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: achievementdet, applicantid: event.data.applicantid, requestmasterdatatypeid: 317, requestmasterid: event.data.careerid, ScreenType: 2, save: true }
                    // data: { applicantid: event.data.applicantid, requestmasterdatatypeid: 319, requestmasterid: event.data.achievementid, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicantachievementdetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantachievementdetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantachievementdetails_GridSelected(event) {
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
    show_mstapplicantlanguagedetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantlanguagedetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantlanguagedetails.source.settings != null)
            this.tbl_mstapplicantlanguagedetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicantlanguagedetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicantlanguagedetails.source.initGrid();
    }
    show_mstapplicantlanguagedetails_InActive() {
    }
    enable_mstapplicantlanguagedetails_InActive() {
    }
    Set_mstapplicantlanguagedetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantlanguagedetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantlanguagedetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_applicantid.value)), }, };
                this.tbl_mstapplicantlanguagedetails.source.settings = clone;
                this.tbl_mstapplicantlanguagedetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantlanguagedetails.source.settings);
                if (clone.columns['language'] != undefined)
                    clone.columns['language'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_language.value)), }, };
                if (clone.columns['language'] != undefined)
                    clone.columns['language'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantlanguagedetails_language.value)), }, };
                this.tbl_mstapplicantlanguagedetails.source.settings = clone;
                this.tbl_mstapplicantlanguagedetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantlanguagedetails = true;
        });
    }
    mstapplicantlanguagedetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantlanguagedetails_TableConfig() {
        this.mstapplicantlanguagedetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                delete: false,
                position: 'right',
                // custom: this.mstapplicantlanguagedetail_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantlanguagedetails_LoadTable(mstapplicantlanguagedetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantlanguagedetails_ID) >= 0) {
            if (this.tbl_mstapplicantlanguagedetails != undefined)
                this.tbl_mstapplicantlanguagedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstapplicantlanguagedetails != undefined)
                this.tbl_mstapplicantlanguagedetails.source.load(mstapplicantlanguagedetails);
            if (this.tbl_mstapplicantlanguagedetails != undefined)
                this.tbl_mstapplicantlanguagedetails.source.setPaging(1, 20, true);
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
    mstapplicantlanguagedetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(languageid).then(res => this.mstapplicantlanguagedetails_LoadTable());
        }
    }
    onCustom_mstapplicantlanguagedetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantlanguagedetails");
            let formname = objbomenuaction.actionname;
        });
    }
    mstapplicantlanguagedetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantlanguagedetails.source.setPaging(1, val, true);
    }
    handle_mstapplicantlanguagedetails_GridSelected(event) {
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
    show_mstapplicanteducationdetails_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicanteducationdetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicanteducationdetails.source.settings != null)
            this.tbl_mstapplicanteducationdetails.source.settings['hideSubHeader'] = !this.tbl_mstapplicanteducationdetails.source.settings['hideSubHeader'];
        this.tbl_mstapplicanteducationdetails.source.initGrid();
    }
    show_mstapplicanteducationdetails_InActive() {
    }
    enable_mstapplicanteducationdetails_InActive() {
    }
    Set_mstapplicanteducationdetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicanteducationdetails) {
                var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_applicantid.value)), }, };
                this.tbl_mstapplicanteducationdetails.source.settings = clone;
                this.tbl_mstapplicanteducationdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
                if (clone.columns['educationcategory'] != undefined)
                    clone.columns['educationcategory'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_educationcategory.value)), }, };
                if (clone.columns['educationcategory'] != undefined)
                    clone.columns['educationcategory'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_educationcategory.value)), }, };
                this.tbl_mstapplicanteducationdetails.source.settings = clone;
                this.tbl_mstapplicanteducationdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicanteducationdetails.source.settings);
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicanteducationdetails_referenceacceptance.value)), }, };
                this.tbl_mstapplicanteducationdetails.source.settings = clone;
                this.tbl_mstapplicanteducationdetails.source.initGrid();
            }
            this.bfilterPopulate_mstapplicanteducationdetails = true;
        });
    }
    mstapplicanteducationdetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicanteducationdetails_TableConfig() {
        this.mstapplicanteducationdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                delete: false,
                position: 'right',
                // custom: this.mstapplicanteducationdetail_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicanteducationdetails_LoadTable(mstapplicanteducationdetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicanteducationdetails_ID) >= 0) {
            if (this.tbl_mstapplicanteducationdetails != undefined)
                this.tbl_mstapplicanteducationdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstapplicanteducationdetails != undefined)
                this.tbl_mstapplicanteducationdetails.source.load(mstapplicanteducationdetails);
            if (this.tbl_mstapplicanteducationdetails != undefined)
                this.tbl_mstapplicanteducationdetails.source.setPaging(1, 20, true);
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
    mstapplicanteducationdetails_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(educationid).then(res => this.mstapplicanteducationdetails_LoadTable());
        }
    }
    onCustom_mstapplicanteducationdetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            let educationsourcedetails = '<ul class="list-group"  style="background: #0368b7 !important;"><li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Category: ' + event.data.educationcategorydesc + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Sub Category: ' + event.data.educationsubcategorydesc + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Course: ' + event.data.coursename + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Institution: ' + event.data.institutionname + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> From Year: ' + event.data.fromyear + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> To Year: ' + event.data.toyear + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Percentage: ' + event.data.percentage + '</li>'
                + '<li class="list-group-item" style="background: #0368b7 !important;color: #fff;"> Remarks: ' + event.data.remarks + '</li>';
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicanteducationdetails");
            let formname = objbomenuaction.actionname;
            if (formname == "mstapplicantreferencerequests") {
                this.dialog.open(_pages_forms_mstapplicantreferencerequest_mstapplicantreferencerequest_component__WEBPACK_IMPORTED_MODULE_24__.mstapplicantreferencerequestComponent, {
                    data: { referencesourcedetails: educationsourcedetails, applicantid: event.data.applicantid, requestmasterdatatypeid: 315, requestmasterid: event.data.educationid, ScreenType: 2, save: true }
                    // data: { applicantid: event.data.applicantid, requestmasterdatatypeid: 315, requestmasterid: event.data.careerid, ScreenType: 2, save: true }
                }).onClose.subscribe(res => {
                });
            }
        });
    }
    mstapplicanteducationdetails_Paging(val) {
        //debugger;;
        this.tbl_mstapplicanteducationdetails.source.setPaging(1, val, true);
    }
    handle_mstapplicanteducationdetails_GridSelected(event) {
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
    show_mstjobstatuses_Checkbox() {
        //debugger;;
        if (this.tbl_mstjobstatuses.source.settings['selectMode'] == 'multi')
            this.tbl_mstjobstatuses.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstjobstatuses.source.settings != null)
            this.tbl_mstjobstatuses.source.settings['hideSubHeader'] = !this.tbl_mstjobstatuses.source.settings['hideSubHeader'];
        this.tbl_mstjobstatuses.source.initGrid();
    }
    show_mstjobstatuses_InActive() {
    }
    enable_mstjobstatuses_InActive() {
    }
    Set_mstjobstatuses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstjobstatuses) {
                var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_applicantid.value)), }, };
                this.tbl_mstjobstatuses.source.settings = clone;
                this.tbl_mstjobstatuses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
                if (clone.columns['corporateid'] != undefined)
                    clone.columns['corporateid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_corporateid.value)), }, };
                if (clone.columns['corporateid'] != undefined)
                    clone.columns['corporateid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_corporateid.value)), }, };
                this.tbl_mstjobstatuses.source.settings = clone;
                this.tbl_mstjobstatuses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
                if (clone.columns['jobid'] != undefined)
                    clone.columns['jobid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_jobid.value)), }, };
                if (clone.columns['jobid'] != undefined)
                    clone.columns['jobid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_jobid.value)), }, };
                this.tbl_mstjobstatuses.source.settings = clone;
                this.tbl_mstjobstatuses.source.initGrid();
            }
            this.bfilterPopulate_mstjobstatuses = true;
        });
    }
    mstjobstatuses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstjobstatuses_TableConfig() {
        this.mstjobstatuses_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                delete: false,
                position: 'right',
                // custom: this.mstjobstatus_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstjobstatuses_LoadTable(mstjobstatuses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobstatuses_ID) >= 0) {
            if (this.tbl_mstjobstatuses != undefined)
                this.tbl_mstjobstatuses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstjobstatuses != undefined)
                this.tbl_mstjobstatuses.source.load(mstjobstatuses);
            if (this.tbl_mstjobstatuses != undefined)
                this.tbl_mstjobstatuses.source.setPaging(1, 20, true);
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
    mstjobstatuses_route(event, action) {
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
            this.mstapplicantmaster_service.delete_mstapplicantmaster(viewid).then(res => this.mstjobstatuses_LoadTable());
        }
    }
    onCustom_mstjobstatuses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstjobstatuses");
            let formname = objbomenuaction.actionname;
        });
    }
    mstjobstatuses_Paging(val) {
        //debugger;;
        this.tbl_mstjobstatuses.source.setPaging(1, val, true);
    }
    handle_mstjobstatuses_GridSelected(event) {
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
    show_mstapplicantreferencerequests_Checkbox() {
        //debugger;;
        if (this.tbl_mstapplicantreferencerequests.source.settings['selectMode'] == 'multi')
            this.tbl_mstapplicantreferencerequests.source.settings['selectMode'] = 'single';
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
        if (this.tbl_mstapplicantreferencerequests.source.settings != null)
            this.tbl_mstapplicantreferencerequests.source.settings['hideSubHeader'] = !this.tbl_mstapplicantreferencerequests.source.settings['hideSubHeader'];
        this.tbl_mstapplicantreferencerequests.source.initGrid();
    }
    show_mstapplicantreferencerequests_InActive() {
    }
    enable_mstapplicantreferencerequests_InActive() {
    }
    Set_mstapplicantreferencerequests_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstapplicantreferencerequests) {
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequests.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_applicantid.value)), }, };
                this.tbl_mstapplicantreferencerequests.source.settings = clone;
                this.tbl_mstapplicantreferencerequests.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequests.source.settings);
                if (clone.columns['requestmasterdatatypeid'] != undefined)
                    clone.columns['requestmasterdatatypeid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_requestmasterdatatypeid.value)), }, };
                if (clone.columns['requestmasterdatatypeid'] != undefined)
                    clone.columns['requestmasterdatatypeid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_requestmasterdatatypeid.value)), }, };
                this.tbl_mstapplicantreferencerequests.source.settings = clone;
                this.tbl_mstapplicantreferencerequests.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstapplicantreferencerequests.source.settings);
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_referenceacceptance.value)), }, };
                if (clone.columns['referenceacceptance'] != undefined)
                    clone.columns['referenceacceptance'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstapplicantreferencerequests_referenceacceptance.value)), }, };
                this.tbl_mstapplicantreferencerequests.source.settings = clone;
                this.tbl_mstapplicantreferencerequests.source.initGrid();
            }
            this.bfilterPopulate_mstapplicantreferencerequests = true;
        });
    }
    mstapplicantreferencerequests_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstapplicantreferencerequests_TableConfig() {
        this.mstapplicantreferencerequests_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: false,
                // delete: (this.IsApplicant || this.IsAdmin),
                delete: false,
                position: 'right',
                // custom: this.mstapplicantreferencerequest_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: false,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit commonEditicon" title="Edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: false,
            },
            delete: {
                deleteButtonContent: '<i class="fa fa-trash-o commonDeleteicon" title="Delete"></i>',
                confirmDelete: false,
            },
            columns: {
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    mstapplicantreferencerequests_LoadTable(mstapplicantreferencerequests = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstapplicantreferencerequests_ID) >= 0) {
            if (this.tbl_mstapplicantreferencerequests != undefined)
                this.tbl_mstapplicantreferencerequests.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_34__.LocalDataSource();
            if (this.tbl_mstapplicantreferencerequests != undefined)
                this.tbl_mstapplicantreferencerequests.source.load(mstapplicantreferencerequests);
            if (this.tbl_mstapplicantreferencerequests != undefined)
                this.tbl_mstapplicantreferencerequests.source.setPaging(1, 20, true);
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
    mstapplicantreferencerequests_route(event, action) {
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
                this.onDelete_mstapplicantreferencerequest(event, event.data.requestid, ((this.tbl_mstapplicantreferencerequests.source.getPaging().page - 1) * this.tbl_mstapplicantreferencerequests.source.getPaging().perPage) + event.index);
                this.tbl_mstapplicantreferencerequests.source.refresh();
                break;
        }
    }
    mstapplicantreferencerequests_onDelete(obj) {
        let requestid = obj.data.requestid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstapplicantmaster_service.delete_mstapplicantmaster(requestid).then(res => this.mstapplicantreferencerequests_LoadTable());
        }
    }
    onCustom_mstapplicantreferencerequests_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstapplicantreferencerequests");
            let formname = objbomenuaction.actionname;
        });
    }
    mstapplicantreferencerequests_Paging(val) {
        //debugger;;
        this.tbl_mstapplicantreferencerequests.source.setPaging(1, val, true);
    }
    handle_mstapplicantreferencerequests_GridSelected(event) {
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
};
mstapplicantmasterviewComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_35__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_36__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_37__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_38__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_28__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_39__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_40__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_40__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_40__.DialogService },
    { type: _service_mstapplicantmaster_service__WEBPACK_IMPORTED_MODULE_1__.mstapplicantmasterService },
    { type: _service_mstapplicantgeographypreference_service__WEBPACK_IMPORTED_MODULE_5__.mstapplicantgeographypreferenceService },
    { type: _service_mstapplicantcareerdetail_service__WEBPACK_IMPORTED_MODULE_7__.mstapplicantcareerdetailService },
    { type: _service_mstapplicantreferencedetail_service__WEBPACK_IMPORTED_MODULE_9__.mstapplicantreferencedetailService },
    { type: _service_mstapplicantskilldetail_service__WEBPACK_IMPORTED_MODULE_11__.mstapplicantskilldetailService },
    { type: _service_mstapplicantworkreference_service__WEBPACK_IMPORTED_MODULE_13__.mstapplicantworkreferenceService },
    { type: _service_mstapplicantsocialmediadetail_service__WEBPACK_IMPORTED_MODULE_15__.mstapplicantsocialmediadetailService },
    { type: _service_mstapplicantachievementdetail_service__WEBPACK_IMPORTED_MODULE_17__.mstapplicantachievementdetailService },
    { type: _service_mstapplicantlanguagedetail_service__WEBPACK_IMPORTED_MODULE_19__.mstapplicantlanguagedetailService },
    { type: _service_mstapplicanteducationdetail_service__WEBPACK_IMPORTED_MODULE_21__.mstapplicanteducationdetailService },
    { type: _service_mstjobstatus_service__WEBPACK_IMPORTED_MODULE_23__.mstjobstatusService },
    { type: _service_mstapplicantreferencerequest_service__WEBPACK_IMPORTED_MODULE_25__.mstapplicantreferencerequestService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_31__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_26__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_27__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_41__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_38__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_42__.NgxSpinnerService }
];
mstapplicantmasterviewComponent.propDecorators = {
    tbl_mstapplicantgeographypreferences: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstapplicantgeographypreferences', { static: false },] }],
    tbl_mstapplicantcareerdetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstapplicantcareerdetails', { static: false },] }],
    tbl_mstapplicantreferencedetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstapplicantreferencedetails', { static: false },] }],
    tbl_mstapplicantskilldetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstapplicantskilldetails', { static: false },] }],
    tbl_mstapplicantworkreferences: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstapplicantworkreferences', { static: false },] }],
    tbl_mstapplicantsocialmediadetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstapplicantsocialmediadetails', { static: false },] }],
    tbl_mstapplicantachievementdetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstapplicantachievementdetails', { static: false },] }],
    tbl_mstapplicantlanguagedetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstapplicantlanguagedetails', { static: false },] }],
    tbl_mstapplicanteducationdetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstapplicanteducationdetails', { static: false },] }],
    tbl_mstjobstatuses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstjobstatuses', { static: false },] }],
    tbl_mstapplicantreferencerequests: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['tbl_mstapplicantreferencerequests', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['fileattachment', { static: false },] }],
    profilephoto: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewChild, args: ['profilephoto', { static: false },] }]
};
mstapplicantmasterviewComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_33__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_30__.Component)({
        selector: 'app-mstapplicantmaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstapplicantmasterview_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_37__.KeyboardShortcutsService],
        encapsulation: _angular_core__WEBPACK_IMPORTED_MODULE_30__.ViewEncapsulation.None,
    })
], mstapplicantmasterviewComponent);



/***/ }),

/***/ 84397:
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantmaster/mstapplicantmaster.component.html ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"mstapplicantmaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <div class='col  sticky1 second bgcolor' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_mstapplicantmasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='(maindata==null || maindata==undefined) && !bSingleRecord'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <!--\r\n          <ng-container *ngFor=\"let action of mstapplicantmaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n        -->\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success popup-add-button\" [routerLink]=''(click)=\"goBack()\" ><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i>\r\n              Back</a>\r\n\r\n            <a class=\"alert-success popup-add-button\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary popup-add-button\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.applicantid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.applicantid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Maser</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n          </p-accordion>\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div\r\n              *ngIf=\"((hidelist.indexOf('firstname') == -1) && (firstnamevisible==undefined || firstnamevisible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"firstname\" class=\"control-label required\">First Name</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.firstname?.value}}</label>\r\n              <input *ngIf=\"!showview\" id=\"firstname\" required formControlName=\"firstname\" class=\"form-control\">\r\n              <app-field-error-display [displayError]=\"f.firstname.errors?.required\"\r\n                errorMsg=\"Enter {{'First Name' | translate}}\">\r\n              </app-field-error-display>\r\n              <app-field-error-display [displayError]=\"f.firstname.errors?.pattern\"\r\n                errorMsg=\"{{'First Name' | translate}} not valid\">\r\n              </app-field-error-display>\r\n            </div>\r\n            <div *ngIf=\"((hidelist.indexOf('lastname') == -1) && (lastnamevisible==undefined || lastnamevisible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"lastname\" class=\"control-label required\">Last Name</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.lastname?.value}}</label>\r\n              <input *ngIf=\"!showview\" id=\"lastname\" required formControlName=\"lastname\" class=\"form-control\">\r\n              <app-field-error-display [displayError]=\"f.lastname.errors?.required\"\r\n                errorMsg=\"Enter {{'Last Name' | translate}}\">\r\n              </app-field-error-display>\r\n              <app-field-error-display [displayError]=\"f.lastname.errors?.pattern\"\r\n                errorMsg=\"{{'Last Name' | translate}} not valid\">\r\n              </app-field-error-display>\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div *ngIf=\"((hidelist.indexOf('emailid') == -1) && (emailidvisible==undefined || emailidvisible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"emailid\" class=\"control-label required\">Email</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.emailid?.value}}</label>\r\n              <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"emailid\" required formControlName=\"emailid\"\r\n                class=\"form-control\">\r\n              <app-field-error-display [displayError]=\"f.emailid.errors!=null && f.emailid.errors?.email\"\r\n                errorMsg=\"Enter valid email\">\r\n              </app-field-error-display>\r\n              <app-field-error-display [displayError]=\"f.emailid.errors?.required\"\r\n                errorMsg=\"Enter {{'Email' | translate}}\">\r\n              </app-field-error-display>\r\n            </div>\r\n            <div\r\n              *ngIf=\"((hidelist.indexOf('mobilenumber') == -1) && (mobilenumbervisible==undefined || mobilenumbervisible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"mobilenumber\" class=\"control-label required\">Mobile Number</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.mobilenumber?.value}}</label>\r\n              <int-phone-prefix *ngIf=\"!showview\" id=\"mobilenumber\" required formControlName=\"mobilenumber\"\r\n                [locale]=\"'en'\" [defaultCountry]=\"'ae'\" class=\"form-control telephone\">\r\n              </int-phone-prefix>\r\n              <app-field-error-display [displayError]=\"f.mobilenumber.errors?.required\"\r\n                errorMsg=\"Enter {{'Mobile Number' | translate}}\">\r\n              </app-field-error-display>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <!--applicanttype-->\r\n\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div\r\n              *ngIf=\"((hidelist.indexOf('applicanttype') == -1) && (applicanttypevisible==undefined || applicanttypevisible==true))\"\r\n              style='' class=\"col-6\"><label for=\"applicanttype\" class=\"control-label required\">Type</label>\r\n              <select *ngIf=\"!showview\" id=\"applicanttype\" required (change)=\"applicanttype_onChange($event.target)\"\r\n                formControlName=\"applicanttype\" class=\"form-control\">\r\n                <option [ngValue]=\"null\" selected>-Select-</option>\r\n                <option *ngFor=\"let item of applicanttype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n              </select>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.applicanttypedesc?.value}}</label>\r\n              <app-field-error-display [displayError]=\"f.applicanttype.errors?.required\"\r\n                errorMsg=\"Enter {{'Type' | translate}}\">\r\n              </app-field-error-display>\r\n            </div>\r\n\r\n\r\n            <!--gender-->\r\n\r\n            <div *ngIf=\"((hidelist.indexOf('gender') == -1) && (gendervisible==undefined || gendervisible==true))\"\r\n              style='' class=\"col-6\"><label for=\"gender\" class=\"control-label\">Gender</label>\r\n              <select *ngIf=\"!showview\" id=\"gender\" (change)=\"gender_onChange($event.target)\" formControlName=\"gender\"\r\n                class=\"form-control\">\r\n                <option [ngValue]=\"null\" selected>-Select-</option>\r\n                <option *ngFor=\"let item of gender_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n              </select>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.genderdesc?.value}}</label>\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div *ngIf=\"((hidelist.indexOf('dob') == -1) && (dobvisible==undefined || dobvisible==true))\" style=''\r\n              class=\"col-6 \">\r\n              <label for=\"dob\" class=\"control-label\">D O B</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.dob?.value)}}</label>\r\n              <div class=\"input-group\" *ngIf=\"!showview\">\r\n                <input #dobformpicker=\"ngbDatepicker\" [minDate]='{year: 1950, month:1, day: 1}'\r\n                  [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"dobformpicker\" id=\"dob\"\r\n                  formControlName=\"dob\" class=\"form-control\">\r\n                <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"dobformpicker.toggle()\" type=\"button\"><i\r\n                    class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"((hidelist.indexOf('address1') == -1) && (address1visible==undefined || address1visible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"address1\" class=\"control-label\">Address1</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.address1?.value}}</label>\r\n              <input *ngIf=\"!showview\" id=\"address1\" formControlName=\"address1\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div *ngIf=\"((hidelist.indexOf('address2') == -1) && (address2visible==undefined || address2visible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"address2\" class=\"control-label\">Address2</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.address2?.value}}</label>\r\n              <input *ngIf=\"!showview\" id=\"address2\" formControlName=\"address2\" class=\"form-control\">\r\n            </div>\r\n            <div *ngIf=\"((hidelist.indexOf('address3') == -1) && (address3visible==undefined || address3visible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"address3\" class=\"control-label\">Address3</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.address3?.value}}</label>\r\n              <input *ngIf=\"!showview\" id=\"address3\" formControlName=\"address3\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <!--country-->\r\n\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div *ngIf=\"((hidelist.indexOf('country') == -1) && (countryvisible==undefined || countryvisible==true))\"\r\n              style='' class=\"col-6\"><label for=\"country\" class=\"control-label\"\r\n                (click)=\"AddOrEdit_country(null)\">Country</label>\r\n              <app-popupselect *ngIf=\"!showview\" [options]=\"country_List\" [optionsEvent]=\"country_optionsEvent\"\r\n                [form]=\"bocountry\" (selectItem)=\"onSelected_country($event)\" [reportid]='wc9rn' [menuid]='wc9rn'\r\n                formControlName=\"country\" id=\"value\" desc=\"label\"></app-popupselect>\r\n              <div class=\"input-group\">\r\n              </div>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.countrydesc?.value}}</label>\r\n            </div>\r\n\r\n\r\n            <!--state-->\r\n\r\n            <div *ngIf=\"((hidelist.indexOf('state') == -1) && (statevisible==undefined || statevisible==true))\" style=''\r\n              class=\"col-6\"><label for=\"state\" class=\"control-label\" (click)=\"AddOrEdit_state(null)\">State</label>\r\n              <app-popupselect *ngIf=\"!showview\" [options]=\"state_List\" [optionsEvent]=\"state_optionsEvent\"\r\n                [form]=\"bostate\" (selectItem)=\"onSelected_state($event)\" [reportid]='tyo5r' [menuid]='tyo5r'\r\n                formControlName=\"state\" id=\"value\" desc=\"label\"></app-popupselect>\r\n              <div class=\"input-group\">\r\n              </div>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.statedesc?.value}}</label>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <!--city-->\r\n\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div *ngIf=\"((hidelist.indexOf('city') == -1) && (cityvisible==undefined || cityvisible==true))\" style=''\r\n              class=\"col-6\"><label for=\"city\" class=\"control-label\" (click)=\"AddOrEdit_city(null)\">City</label>\r\n              <app-popupselect *ngIf=\"!showview\" [options]=\"city_List\" [optionsEvent]=\"city_optionsEvent\"\r\n                [form]=\"bocity\" (selectItem)=\"onSelected_city($event)\" [reportid]='kbg3n' [menuid]='kbg3n'\r\n                formControlName=\"city\" id=\"value\" desc=\"label\"></app-popupselect>\r\n              <div class=\"input-group\">\r\n              </div>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.citydesc?.value}}</label>\r\n            </div>\r\n            <div *ngIf=\"((hidelist.indexOf('zipcode') == -1) && (zipcodevisible==undefined || zipcodevisible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"zipcode\" class=\"control-label\">Zip Code</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.zipcode?.value}}</label>\r\n              <input *ngIf=\"!showview\" id=\"zipcode\" formControlName=\"zipcode\" class=\"form-control\">\r\n              <app-field-error-display [displayError]=\"f.zipcode.errors?.pattern\"\r\n                errorMsg=\"{{'Zip Code' | translate}} not valid\">\r\n              </app-field-error-display>\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div\r\n              *ngIf=\"((hidelist.indexOf('recoveryemailid') == -1) && (recoveryemailidvisible==undefined || recoveryemailidvisible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"recoveryemailid\" class=\"control-label\">Recovery Email</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.recoveryemailid?.value}}</label>\r\n              <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"recoveryemailid\"\r\n                formControlName=\"recoveryemailid\" class=\"form-control\">\r\n              <app-field-error-display\r\n                [displayError]=\"f.recoveryemailid.errors!=null && f.recoveryemailid.errors?.email\"\r\n                errorMsg=\"Enter valid email\">\r\n              </app-field-error-display>\r\n            </div>\r\n            <div\r\n              *ngIf=\"((hidelist.indexOf('profilephoto') == -1) && (profilephotovisible==undefined || profilephotovisible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"profilephoto\" class=\"control-label\">Photo</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.profilephoto?.value[0]?.name}}</label>\r\n              <app-attachment #profilephoto formControlName=\"profilephoto\" [showremove]='bmyrecord'\r\n                [SessionData]=\"sessionData\"></app-attachment>\r\n              <button type=\"button\" class=\"btn\" *ngIf=\"profilephoto.getAttachmentList().length > 0\"\r\n                (click)=\"getprofilephoto()\" style=\"margin: 15px;\r\n                margin-left: 5px;\">Open File</button>\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div\r\n              *ngIf=\"((hidelist.indexOf('briefintroduction') == -1) && (briefintroductionvisible==undefined || briefintroductionvisible==true))\"\r\n              style='width:1500px' class=\"col-12 \">\r\n              <label for=\"briefintroduction\" class=\"control-label\">Brief Introduction</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.briefintroduction?.value}}</label>\r\n              <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"briefintroduction\"\r\n                formControlName=\"briefintroduction\" class=\"form-control\">\r\n</textarea>\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div\r\n              *ngIf=\"((hidelist.indexOf('statuscrimp') == -1) && (statuscrimpvisible==undefined || statuscrimpvisible==true))\"\r\n              style='width:1500px' class=\"col-12 \">\r\n              <label for=\"statuscrimp\" class=\"control-label\">Status Crimp</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.statuscrimp?.value}}</label>\r\n              <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"statuscrimp\"\r\n                formControlName=\"statuscrimp\" class=\"form-control\">\r\n</textarea>\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n            <div\r\n              *ngIf=\"((hidelist.indexOf('availableforjob') == -1) && (availableforjobvisible==undefined || availableforjobvisible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <div class=\"columnchk\">\r\n                <label for=\"availableforjob\" class=\"control-label\">Available For Job</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.availableforjob?.value}}</label>\r\n                <input type=\"checkbox\" *ngIf=\"!showview\" id=\"availableforjob\" formControlName=\"availableforjob\"\r\n                  class=\"\">\r\n              </div>\r\n            </div>\r\n            <div\r\n              *ngIf=\"((hidelist.indexOf('profilecompletion') == -1) && (profilecompletionvisible==undefined || profilecompletionvisible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"profilecompletion\" class=\"control-label\">Profile Completion</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.profilecompletion?.value}}</label>\r\n              <p-progressBar *ngIf=\"!showview\" id=\"profilecompletion\" formControlName=\"profilecompletion\"\r\n                class=\"form-control\">\r\n              </p-progressBar>\r\n            </div>\r\n            <div\r\n              *ngIf=\"((hidelist.indexOf('applicantreference') == -1) && (applicantreferencevisible==undefined || applicantreferencevisible==true))\"\r\n              style='' class=\"col-6 \">\r\n              <label for=\"applicantreference\" class=\"control-label\">Reference</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.applicantreference?.value}}</label>\r\n              <input *ngIf=\"!showview\" id=\"applicantreference\" readonly formControlName=\"applicantreference\"\r\n                class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Geography Preferences</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstapplicantgeographypreferences-->\r\n            <!--\r\n            <div [ngClass]=\"Is_mstapplicantgeographypreferences_Visible()\">\r\n\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Geography Preferences' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantgeographypreferences_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantgeographypreferences_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantgeographypreferences\r\n                (userRowSelect)=\"handle_mstapplicantgeographypreferences_GridSelected($event)\"\r\n                [settings]=\"mstapplicantgeographypreferences_settings\"\r\n                (custom)=\"onCustom_mstapplicantgeographypreferences_Action($event)\"\r\n                [source]=\"tbl_mstapplicantgeographypreferences?.source?.data\"\r\n                (delete)=\"mstapplicantgeographypreferences_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantgeographypreferences_route($event,'delete')\"\r\n                (create)=\"mstapplicantgeographypreferences_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantgeographypreferences_beforesave($event)\"\r\n                (edit)=\"mstapplicantgeographypreferences_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantgeographypreferences_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n\r\n          -->\r\n            <!--End of child table mstapplicantgeographypreferences-->\r\n\r\n\r\n            <button class=\"btn-style\" (click)=\"showGeographyPreferences()\" type=\"button\">Where are you located?</button>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Career Details</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstapplicantcareerdetails-->\r\n            <div [ngClass]=\"Is_mstapplicantcareerdetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Career Details' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantcareerdetails_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantcareerdetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantcareerdetails\r\n                (userRowSelect)=\"handle_mstapplicantcareerdetails_GridSelected($event)\"\r\n                [settings]=\"mstapplicantcareerdetails_settings\"\r\n                (custom)=\"onCustom_mstapplicantcareerdetails_Action($event)\"\r\n                [source]=\"tbl_mstapplicantcareerdetails?.source?.data\"\r\n                (delete)=\"mstapplicantcareerdetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantcareerdetails_route($event,'delete')\"\r\n                (create)=\"mstapplicantcareerdetails_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantcareerdetails_beforesave($event)\"\r\n                (edit)=\"mstapplicantcareerdetails_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantcareerdetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicantcareerdetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <!-- <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Other References</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div [ngClass]=\"Is_mstapplicantreferencedetails_Visible()\">\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Other References' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantreferencedetails_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantreferencedetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantreferencedetails\r\n                (userRowSelect)=\"handle_mstapplicantreferencedetails_GridSelected($event)\"\r\n                [settings]=\"mstapplicantreferencedetails_settings\"\r\n                (custom)=\"onCustom_mstapplicantreferencedetails_Action($event)\"\r\n                [source]=\"tbl_mstapplicantreferencedetails?.source?.data\"\r\n                (delete)=\"mstapplicantreferencedetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantreferencedetails_route($event,'delete')\"\r\n                (create)=\"mstapplicantreferencedetails_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantreferencedetails_beforesave($event)\"\r\n                (edit)=\"mstapplicantreferencedetails_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantreferencedetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab> -->\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Skill Details</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <button class=\"btn-style\" (click)=\"showSkills()\" type=\"button\">What are your skills?</button>\r\n            <!-- child table mstapplicantskilldetails-->\r\n            <!--\r\n            <div [ngClass]=\"Is_mstapplicantskilldetails_Visible()\">\r\n\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Skill Details' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantskilldetails_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantskilldetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantskilldetails\r\n                (userRowSelect)=\"handle_mstapplicantskilldetails_GridSelected($event)\"\r\n                [settings]=\"mstapplicantskilldetails_settings\"\r\n                (custom)=\"onCustom_mstapplicantskilldetails_Action($event)\"\r\n                [source]=\"tbl_mstapplicantskilldetails?.source?.data\"\r\n                (delete)=\"mstapplicantskilldetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantskilldetails_route($event,'delete')\"\r\n                (create)=\"mstapplicantskilldetails_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantskilldetails_beforesave($event)\"\r\n                (edit)=\"mstapplicantskilldetails_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantskilldetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n          -->\r\n            <!--End of child table mstapplicantskilldetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Projects</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstapplicantworkreferences-->\r\n            <div [ngClass]=\"Is_mstapplicantworkreferences_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Projects' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantworkreferences_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantworkreferences_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantworkreferences\r\n                (userRowSelect)=\"handle_mstapplicantworkreferences_GridSelected($event)\"\r\n                [settings]=\"mstapplicantworkreferences_settings\"\r\n                (custom)=\"onCustom_mstapplicantworkreferences_Action($event)\"\r\n                [source]=\"tbl_mstapplicantworkreferences?.source?.data\"\r\n                (delete)=\"mstapplicantworkreferences_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantworkreferences_route($event,'delete')\"\r\n                (create)=\"mstapplicantworkreferences_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantworkreferences_beforesave($event)\"\r\n                (edit)=\"mstapplicantworkreferences_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantworkreferences_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicantworkreferences-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">SocialMedia Details</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstapplicantsocialmediadetails-->\r\n            <div [ngClass]=\"Is_mstapplicantsocialmediadetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'SocialMedia Details' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantsocialmediadetails_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantsocialmediadetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantsocialmediadetails\r\n                (userRowSelect)=\"handle_mstapplicantsocialmediadetails_GridSelected($event)\"\r\n                [settings]=\"mstapplicantsocialmediadetails_settings\"\r\n                (custom)=\"onCustom_mstapplicantsocialmediadetails_Action($event)\"\r\n                [source]=\"tbl_mstapplicantsocialmediadetails?.source?.data\"\r\n                (delete)=\"mstapplicantsocialmediadetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantsocialmediadetails_route($event,'delete')\"\r\n                (create)=\"mstapplicantsocialmediadetails_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantsocialmediadetails_beforesave($event)\"\r\n                (edit)=\"mstapplicantsocialmediadetails_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantsocialmediadetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicantsocialmediadetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Achievement Details</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstapplicantachievementdetails-->\r\n            <div [ngClass]=\"Is_mstapplicantachievementdetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Achievement Details' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantachievementdetails_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantachievementdetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantachievementdetails\r\n                (userRowSelect)=\"handle_mstapplicantachievementdetails_GridSelected($event)\"\r\n                [settings]=\"mstapplicantachievementdetails_settings\"\r\n                (custom)=\"onCustom_mstapplicantachievementdetails_Action($event)\"\r\n                [source]=\"tbl_mstapplicantachievementdetails?.source?.data\"\r\n                (delete)=\"mstapplicantachievementdetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantachievementdetails_route($event,'delete')\"\r\n                (create)=\"mstapplicantachievementdetails_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantachievementdetails_beforesave($event)\"\r\n                (edit)=\"mstapplicantachievementdetails_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantachievementdetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicantachievementdetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Language Details</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstapplicantlanguagedetails-->\r\n            <div [ngClass]=\"Is_mstapplicantlanguagedetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Language Details' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantlanguagedetails_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantlanguagedetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantlanguagedetails\r\n                (userRowSelect)=\"handle_mstapplicantlanguagedetails_GridSelected($event)\"\r\n                [settings]=\"mstapplicantlanguagedetails_settings\"\r\n                (custom)=\"onCustom_mstapplicantlanguagedetails_Action($event)\"\r\n                [source]=\"tbl_mstapplicantlanguagedetails?.source?.data\"\r\n                (delete)=\"mstapplicantlanguagedetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantlanguagedetails_route($event,'delete')\"\r\n                (create)=\"mstapplicantlanguagedetails_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantlanguagedetails_beforesave($event)\"\r\n                (edit)=\"mstapplicantlanguagedetails_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantlanguagedetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicantlanguagedetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Education Details</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstapplicanteducationdetails-->\r\n            <div [ngClass]=\"Is_mstapplicanteducationdetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Education Details' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicanteducationdetails_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicanteducationdetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicanteducationdetails\r\n                (userRowSelect)=\"handle_mstapplicanteducationdetails_GridSelected($event)\"\r\n                [settings]=\"mstapplicanteducationdetails_settings\"\r\n                (custom)=\"onCustom_mstapplicanteducationdetails_Action($event)\"\r\n                [source]=\"tbl_mstapplicanteducationdetails?.source?.data\"\r\n                (delete)=\"mstapplicanteducationdetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicanteducationdetails_route($event,'delete')\"\r\n                (create)=\"mstapplicanteducationdetails_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicanteducationdetails_beforesave($event)\"\r\n                (edit)=\"mstapplicanteducationdetails_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicanteducationdetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicanteducationdetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab *ngIf=\"Ismstjobstatuses_div_Visible\">\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Job Statuses</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstjobstatuses-->\r\n            <div [ngClass]=\"Is_mstjobstatuses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Job Statuses' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"mstjobstatuses_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstjobstatuses_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstjobstatuses (userRowSelect)=\"handle_mstjobstatuses_GridSelected($event)\"\r\n                [settings]=\"mstjobstatuses_settings\" (custom)=\"onCustom_mstjobstatuses_Action($event)\"\r\n                [source]=\"tbl_mstjobstatuses?.source?.data\" (delete)=\"mstjobstatuses_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstjobstatuses_route($event,'delete')\" (create)=\"mstjobstatuses_route($event,'create')\"\r\n                (createConfirm)=\"mstjobstatuses_beforesave($event)\" (edit)=\"mstjobstatuses_route($event,'edit')\"\r\n                (editConfirm)=\"mstjobstatuses_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstjobstatuses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab *ngIf=\"Ismstapplicantreferencerequests_div_Visible\">\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Reference Requests</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstapplicantreferencerequests-->\r\n            <div [ngClass]=\"Is_mstapplicantreferencerequests_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Reference Requests' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantreferencerequests_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantreferencerequests_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantreferencerequests\r\n                (userRowSelect)=\"handle_mstapplicantreferencerequests_GridSelected($event)\"\r\n                [settings]=\"mstapplicantreferencerequests_settings\"\r\n                (custom)=\"onCustom_mstapplicantreferencerequests_Action($event)\"\r\n                [source]=\"tbl_mstapplicantreferencerequests?.source?.data\"\r\n                (delete)=\"mstapplicantreferencerequests_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantreferencerequests_route($event,'delete')\"\r\n                (create)=\"mstapplicantreferencerequests_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantreferencerequests_beforesave($event)\"\r\n                (edit)=\"mstapplicantreferencerequests_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantreferencerequests_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicantreferencerequests-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ 5164:
/*!*****************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/mstapplicantmaster/mstapplicantmasterview.component.html ***!
  \*****************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<div class='full-height'>\r\n  <div>\r\n    <i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n    <ngx-spinner></ngx-spinner>\r\n    <form [formGroup]=\"mstapplicantmaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n      <div class=\"row second\">\r\n        <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'\r\n        [ngClass]=\"{'adminbgColor': this.userrole=='Admin','applicantbgColor':this.userrole=='Applicant','corporatebgColor':this.userrole=='Corporate'}\">\r\n          <!--btn-toolbar-->\r\n          <div class='col'></div>\r\n          <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n            <ul class='nav nav-pills  input-group' style=\"margin-right: 68px !important;\">\r\n              <li *ngIf=\"iseditbuttonshow\"><a class='alert-info  popup-add-button' [routerLink]='' *ngIf='showview'\r\n                  (click)=\"edit_mstapplicantmasters()\"><i class=\"nb-edit\"></i>Edit</a></li>\r\n              <li class='nav-item actionheader col' *ngIf='(maindata==null || maindata==undefined)  && !bSingleRecord'>\r\n                <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                    aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                    class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n                <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n                  (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n                </app-popupselect>\r\n\r\n                <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward'\r\n                    aria-hidden='true'></i></a>&nbsp;&nbsp; <a [routerLink]='' (click)='last()'><i\r\n                    class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n              </li>\r\n              <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dro`pdown  actionheader'>\r\n                <ul class=\"nav navbar-nav1\">\r\n                  <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                            class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                            aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                      <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                            aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n\r\n                      <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                            aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                      <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                            aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                      <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                            aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                      <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                            aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n              </li>\r\n              <!--\r\n              <ng-container *ngFor=\"let action of mstapplicantmaster_menuactions\">\r\n                <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i\r\n                      class=\"fa fa-new\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n              </ng-container>-->\r\n              <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n                <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n                  Submit</a>\r\n                <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n                  (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n                <app-action *ngIf=\"f.applicantid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n                  [value]=\"f.applicantid.value\" [status]=\"f.status.value\"></app-action>\r\n              </li>\r\n              <li class='nav-item actionheader'\r\n                *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n                <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n              </li>\r\n\r\n            </ul>\r\n          </div>\r\n        </div>\r\n      </div>\r\n      <div class=\"container\"\r\n        id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\" style=\"height: 89% !important;\">\r\n        <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n          <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n        </div>\r\n\r\n\r\n\r\n      </div>\r\n      <div class='row full-height'\r\n        id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n        <div class='col-6 designcol'>\r\n          <div class='row designrow'>\r\n            <!---->\r\n            <div class=\"col-12\" *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'\r\n              [ngClass]=\"{'limitTextHeight': isReadMore}\" style=\"padding: 0;margin: 0;\">\r\n\r\n            </div>\r\n            <a href=\"javascript:void(0);\" id=\"showReadBtn\" *ngIf=\"this.readMoreBtn\" class=\"readMoreBtn\"\r\n              (click)=\"isReadMore=!isReadMore\">\r\n              {{ isReadMore ? 'Show More': 'Show Less' }}\r\n            </a>\r\n            <div class='full-width' *ngIf=\"attachmentVisible\">\r\n              <p-accordion [multiple]='true'>\r\n                <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                  <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                    [SessionData]=\"sessionData\"></app-attachment>\r\n                </p-accordionTab>\r\n              </p-accordion>\r\n            </div>\r\n\r\n          </div>\r\n          <div class='row designrow'>\r\n            <!-- child table mstapplicantgeographypreferences-->\r\n            <div [ngClass]=\"Is_mstapplicantgeographypreferences_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'Geography Preferences' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantgeographypreferencetoggleOption();mstapplicantgeographypreferences_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantgeographypreferences_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a> -->\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantgeographypreferences\r\n                (userRowSelect)=\"handle_mstapplicantgeographypreferences_GridSelected($event)\"\r\n                [settings]=\"mstapplicantgeographypreferences_settings\"\r\n                (custom)=\"onCustom_mstapplicantgeographypreferences_Action($event)\"\r\n                [source]=\"tbl_mstapplicantgeographypreferences?.source?.data\"\r\n                (delete)=\"mstapplicantgeographypreferences_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantgeographypreferences_route($event,'delete')\"\r\n                (create)=\"mstapplicantgeographypreferences_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantgeographypreferences_beforesave($event)\"\r\n                (edit)=\"mstapplicantgeographypreferences_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantgeographypreferences_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicantgeographypreferences-->\r\n\r\n          </div>\r\n          <div class='row designrow'>\r\n            <!-- child table mstapplicanteducationdetails-->\r\n            <div [ngClass]=\"Is_mstapplicanteducationdetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'Education Details' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                     aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicanteducationdetailtoggleOption();mstapplicanteducationdetails_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicanteducationdetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a> -->\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicanteducationdetails\r\n                (userRowSelect)=\"handle_mstapplicanteducationdetails_GridSelected($event)\"\r\n                [settings]=\"mstapplicanteducationdetails_settings\"\r\n                (custom)=\"onCustom_mstapplicanteducationdetails_Action($event)\"\r\n                [source]=\"tbl_mstapplicanteducationdetails?.source?.data\"\r\n                (delete)=\"mstapplicanteducationdetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicanteducationdetails_route($event,'delete')\"\r\n                (create)=\"mstapplicanteducationdetails_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicanteducationdetails_beforesave($event)\"\r\n                (edit)=\"mstapplicanteducationdetails_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicanteducationdetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicanteducationdetails-->\r\n\r\n          </div>\r\n          <div class='row designrow'>\r\n            <!-- child table mstapplicantachievementdetails-->\r\n            <div [ngClass]=\"Is_mstapplicantachievementdetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'Achievement Details' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantachievementdetailtoggleOption();mstapplicantachievementdetails_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantachievementdetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a> -->\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantachievementdetails\r\n                (userRowSelect)=\"handle_mstapplicantachievementdetails_GridSelected($event)\"\r\n                [settings]=\"mstapplicantachievementdetails_settings\"\r\n                (custom)=\"onCustom_mstapplicantachievementdetails_Action($event)\"\r\n                [source]=\"tbl_mstapplicantachievementdetails?.source?.data\"\r\n                (delete)=\"mstapplicantachievementdetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantachievementdetails_route($event,'delete')\"\r\n                (create)=\"mstapplicantachievementdetails_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantachievementdetails_beforesave($event)\"\r\n                (edit)=\"mstapplicantachievementdetails_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantachievementdetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicantachievementdetails-->\r\n\r\n          </div>\r\n\r\n          <div class='row designrow'>\r\n            <!-- child table mstapplicantlanguagedetails-->\r\n            <div [ngClass]=\"Is_mstapplicantlanguagedetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'Language Details' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstapplicantlanguagedetailtoggleOption();mstapplicantlanguagedetails_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantlanguagedetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a> -->\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstapplicantlanguagedetails\r\n                (userRowSelect)=\"handle_mstapplicantlanguagedetails_GridSelected($event)\"\r\n                [settings]=\"mstapplicantlanguagedetails_settings\"\r\n                (custom)=\"onCustom_mstapplicantlanguagedetails_Action($event)\"\r\n                [source]=\"tbl_mstapplicantlanguagedetails?.source?.data\"\r\n                (delete)=\"mstapplicantlanguagedetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstapplicantlanguagedetails_route($event,'delete')\"\r\n                (create)=\"mstapplicantlanguagedetails_route($event,'create')\"\r\n                (createConfirm)=\"mstapplicantlanguagedetails_beforesave($event)\"\r\n                (edit)=\"mstapplicantlanguagedetails_route($event,'edit')\"\r\n                (editConfirm)=\"mstapplicantlanguagedetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstapplicantlanguagedetails-->\r\n\r\n          </div>\r\n\r\n        </div>\r\n        <div class='col-6 designcol'>\r\n\r\n          <div class='row designrow fullwidth'>\r\n            <div class='row designrow'>\r\n              <!-- child table mstapplicantskilldetails-->\r\n              <div [ngClass]=\"Is_mstapplicantskilldetails_Visible()\">\r\n                <!--End-->\r\n                <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'Skill Details' | translate}}\r\n                  <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                    <li class=\"dropdown\">\r\n                      <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button'\r\n                        aria-haspopup='true' aria-expanded='false'> <span class='caret'></span></a>\r\n                      <ul class=\"dropdown-menu\">\r\n                        <li><a class=\"dropdown-item\" [routerLink]=''\r\n                            (click)=\"mstapplicantskilldetailtoggleOption();mstapplicantskilldetails_route(null, 'create')\"><i\r\n                              class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      </ul>\r\n                    </li>\r\n                  </ul>\r\n                  <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantskilldetails_route(null, 'create')\"><i\r\n                      class=\"fa fa-plus\"></i></a> -->\r\n                </h4>\r\n                <ng2-smart-table #tbl_mstapplicantskilldetails\r\n                  (userRowSelect)=\"handle_mstapplicantskilldetails_GridSelected($event)\"\r\n                  [settings]=\"mstapplicantskilldetails_settings\"\r\n                  (custom)=\"onCustom_mstapplicantskilldetails_Action($event)\"\r\n                  [source]=\"tbl_mstapplicantskilldetails?.source?.data\"\r\n                  (delete)=\"mstapplicantskilldetails_route($event,'delete')\"\r\n                  (deleteConfirm)=\"mstapplicantskilldetails_route($event,'delete')\"\r\n                  (create)=\"mstapplicantskilldetails_route($event,'create')\"\r\n                  (createConfirm)=\"mstapplicantskilldetails_beforesave($event)\"\r\n                  (edit)=\"mstapplicantskilldetails_route($event,'edit')\"\r\n                  (editConfirm)=\"mstapplicantskilldetails_beforesave($event)\">\r\n                </ng2-smart-table>\r\n              </div>\r\n              <!--End of child table mstapplicantskilldetails-->\r\n\r\n            </div>\r\n\r\n\r\n\r\n\r\n\r\n\r\n\r\n            <div class='row designrow'>\r\n              <!-- child table mstapplicantcareerdetails-->\r\n              <div [ngClass]=\"Is_mstapplicantcareerdetails_Visible()\">\r\n                <!--End-->\r\n                <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'Career Details' | translate}}\r\n                  <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                    <li class=\"dropdown\">\r\n                      <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button'\r\n                        aria-haspopup='true' aria-expanded='false'> <span class='caret'></span></a>\r\n                      <ul class=\"dropdown-menu\">\r\n                        <li><a class=\"dropdown-item\" [routerLink]=''\r\n                            (click)=\"mstapplicantcareerdetailtoggleOption();mstapplicantcareerdetails_route(null, 'create')\"><i\r\n                              class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      </ul>\r\n                    </li>\r\n                  </ul>\r\n                  <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantcareerdetails_route(null, 'create')\"><i\r\n                      class=\"fa fa-plus\"></i></a> -->\r\n                </h4>\r\n                <ng2-smart-table #tbl_mstapplicantcareerdetails\r\n                  (userRowSelect)=\"handle_mstapplicantcareerdetails_GridSelected($event)\"\r\n                  [settings]=\"mstapplicantcareerdetails_settings\"\r\n                  (custom)=\"onCustom_mstapplicantcareerdetails_Action($event)\"\r\n                  [source]=\"tbl_mstapplicantcareerdetails?.source?.data\"\r\n                  (delete)=\"mstapplicantcareerdetails_route($event,'delete')\"\r\n                  (deleteConfirm)=\"mstapplicantcareerdetails_route($event,'delete')\"\r\n                  (create)=\"mstapplicantcareerdetails_route($event,'create')\"\r\n                  (createConfirm)=\"mstapplicantcareerdetails_beforesave($event)\"\r\n                  (edit)=\"mstapplicantcareerdetails_route($event,'edit')\"\r\n                  (editConfirm)=\"mstapplicantcareerdetails_beforesave($event)\">\r\n                </ng2-smart-table>\r\n              </div>\r\n              <!--End of child table mstapplicantcareerdetails-->\r\n\r\n            </div>\r\n            <div class='row designrow'>\r\n              <!-- child table mstapplicantworkreferences-->\r\n              <div [ngClass]=\"Is_mstapplicantworkreferences_Visible()\">\r\n                <!--End-->\r\n                <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'Projects' | translate}}\r\n                  <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                    <li class=\"dropdown\">\r\n                      <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button'\r\n                        aria-haspopup='true' aria-expanded='false'> <span class='caret'></span></a>\r\n                      <ul class=\"dropdown-menu\">\r\n                        <li><a class=\"dropdown-item\" [routerLink]=''\r\n                            (click)=\"mstapplicantworkreferencetoggleOption();mstapplicantworkreferences_route(null, 'create')\"><i\r\n                              class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      </ul>\r\n                    </li>\r\n                  </ul>\r\n                  <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantworkreferences_route(null, 'create')\"><i\r\n                      class=\"fa fa-plus\"></i></a> -->\r\n                </h4>\r\n                <ng2-smart-table #tbl_mstapplicantworkreferences\r\n                  (userRowSelect)=\"handle_mstapplicantworkreferences_GridSelected($event)\"\r\n                  [settings]=\"mstapplicantworkreferences_settings\"\r\n                  (custom)=\"onCustom_mstapplicantworkreferences_Action($event)\"\r\n                  [source]=\"tbl_mstapplicantworkreferences?.source?.data\"\r\n                  (delete)=\"mstapplicantworkreferences_route($event,'delete')\"\r\n                  (deleteConfirm)=\"mstapplicantworkreferences_route($event,'delete')\"\r\n                  (create)=\"mstapplicantworkreferences_route($event,'create')\"\r\n                  (createConfirm)=\"mstapplicantworkreferences_beforesave($event)\"\r\n                  (edit)=\"mstapplicantworkreferences_route($event,'edit')\"\r\n                  (editConfirm)=\"mstapplicantworkreferences_beforesave($event)\">\r\n                </ng2-smart-table>\r\n              </div>\r\n              <!--End of child table mstapplicantworkreferences-->\r\n\r\n            </div>\r\n            <div class='designrow'>\r\n              <!-- child table mstapplicantsocialmediadetails-->\r\n              <div [ngClass]=\"Is_mstapplicantsocialmediadetails_Visible()\">\r\n                <!--End-->\r\n                <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'SocialMedia Details' | translate}}\r\n                  <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                    <li class=\"dropdown\">\r\n                      <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button'\r\n                        aria-haspopup='true' aria-expanded='false'> <span class='caret'></span></a>\r\n                      <ul class=\"dropdown-menu\">\r\n                        <li><a class=\"dropdown-item\" [routerLink]=''\r\n                            (click)=\"mstapplicantsocialmediadetailtoggleOption();mstapplicantsocialmediadetails_route(null, 'create')\"><i\r\n                              class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      </ul>\r\n                    </li>\r\n                  </ul>\r\n                  <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantsocialmediadetails_route(null, 'create')\"><i\r\n                      class=\"fa fa-plus\"></i></a> -->\r\n                </h4>\r\n                <ng2-smart-table #tbl_mstapplicantsocialmediadetails\r\n                  (userRowSelect)=\"handle_mstapplicantsocialmediadetails_GridSelected($event)\"\r\n                  [settings]=\"mstapplicantsocialmediadetails_settings\"\r\n                  (custom)=\"onCustom_mstapplicantsocialmediadetails_Action($event)\"\r\n                  [source]=\"tbl_mstapplicantsocialmediadetails?.source?.data\"\r\n                  (delete)=\"mstapplicantsocialmediadetails_route($event,'delete')\"\r\n                  (deleteConfirm)=\"mstapplicantsocialmediadetails_route($event,'delete')\"\r\n                  (create)=\"mstapplicantsocialmediadetails_route($event,'create')\"\r\n                  (createConfirm)=\"mstapplicantsocialmediadetails_beforesave($event)\"\r\n                  (edit)=\"mstapplicantsocialmediadetails_route($event,'edit')\"\r\n                  (editConfirm)=\"mstapplicantsocialmediadetails_beforesave($event)\">\r\n                </ng2-smart-table>\r\n              </div>\r\n              <!--End of child table mstapplicantsocialmediadetails-->\r\n\r\n            </div>\r\n            <div class='row designrow' style=\"display: none!important;\">\r\n              <!-- child table mstapplicantreferencedetails-->\r\n              <div [ngClass]=\"Is_mstapplicantreferencedetails_Visible()\">\r\n                <!--End-->\r\n                <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'Reference Details' | translate}}\r\n                  <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                    <li class=\"dropdown\">\r\n                      <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button'\r\n                        aria-haspopup='true' aria-expanded='false'> <span class='caret'></span></a>\r\n                      <ul class=\"dropdown-menu\">\r\n                        <li><a class=\"dropdown-item\" [routerLink]=''\r\n                            (click)=\"mstapplicantreferencedetailtoggleOption();mstapplicantreferencedetails_route(null, 'create')\"><i\r\n                              class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      </ul>\r\n                    </li>\r\n                  </ul>\r\n                  <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantreferencedetails_route(null, 'create')\"><i\r\n                      class=\"fa fa-plus\"></i></a> -->\r\n                </h4>\r\n                <ng2-smart-table #tbl_mstapplicantreferencedetails\r\n                  (userRowSelect)=\"handle_mstapplicantreferencedetails_GridSelected($event)\"\r\n                  [settings]=\"mstapplicantreferencedetails_settings\"\r\n                  (custom)=\"onCustom_mstapplicantreferencedetails_Action($event)\"\r\n                  [source]=\"tbl_mstapplicantreferencedetails?.source?.data\"\r\n                  (delete)=\"mstapplicantreferencedetails_route($event,'delete')\"\r\n                  (deleteConfirm)=\"mstapplicantreferencedetails_route($event,'delete')\"\r\n                  (create)=\"mstapplicantreferencedetails_route($event,'create')\"\r\n                  (createConfirm)=\"mstapplicantreferencedetails_beforesave($event)\"\r\n                  (edit)=\"mstapplicantreferencedetails_route($event,'edit')\"\r\n                  (editConfirm)=\"mstapplicantreferencedetails_beforesave($event)\">\r\n                </ng2-smart-table>\r\n              </div>\r\n              <!--End of child table mstapplicantreferencedetails-->\r\n\r\n            </div>\r\n            <div class='row designrow' *ngIf=\"Ismstapplicantreferencerequests_div_Visible\">\r\n              <!-- child table mstapplicantreferencerequests-->\r\n              <div [ngClass]=\"Is_mstapplicantreferencerequests_Visible()\">\r\n                <!--End-->\r\n                <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'Reference Requests' | translate}}\r\n                  <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                    <li class=\"dropdown\">\r\n                      <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button'\r\n                        aria-haspopup='true' aria-expanded='false'> <span class='caret'></span></a>\r\n                      <ul class=\"dropdown-menu\">\r\n                        <li><a class=\"dropdown-item\" [routerLink]=''\r\n                            (click)=\"mstapplicantreferencerequesttoggleOption();mstapplicantreferencerequests_route(null, 'create')\"><i\r\n                              class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      </ul>\r\n                    </li>\r\n                  </ul>\r\n                  <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstapplicantreferencerequests_route(null, 'create')\"><i\r\n                      class=\"fa fa-plus\"></i></a> -->\r\n                </h4>\r\n                <ng2-smart-table #tbl_mstapplicantreferencerequests\r\n                  (userRowSelect)=\"handle_mstapplicantreferencerequests_GridSelected($event)\"\r\n                  [settings]=\"mstapplicantreferencerequests_settings\"\r\n                  (custom)=\"onCustom_mstapplicantreferencerequests_Action($event)\"\r\n                  [source]=\"tbl_mstapplicantreferencerequests?.source?.data\"\r\n                  (delete)=\"mstapplicantreferencerequests_route($event,'delete')\"\r\n                  (deleteConfirm)=\"mstapplicantreferencerequests_route($event,'delete')\"\r\n                  (create)=\"mstapplicantreferencerequests_route($event,'create')\"\r\n                  (createConfirm)=\"mstapplicantreferencerequests_beforesave($event)\"\r\n                  (edit)=\"mstapplicantreferencerequests_route($event,'edit')\"\r\n                  (editConfirm)=\"mstapplicantreferencerequests_beforesave($event)\">\r\n                </ng2-smart-table>\r\n              </div>\r\n              <!--End of child table mstapplicantreferencerequests-->\r\n\r\n            </div>\r\n            <div class='row designrow' *ngIf=\"Ismstjobstatuses_div_Visible\">\r\n              <!-- child table mstjobstatuses-->\r\n              <div [ngClass]=\"Is_mstjobstatuses_Visible()\">\r\n                <!--End-->\r\n                <h4 class=\"form-group show-Pfl-Hdr-Lbl  columns left\">{{'Job Statuses' | translate}}\r\n                  <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                    <li class=\"dropdown\">\r\n                      <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button'\r\n                        aria-haspopup='true' aria-expanded='false'> <span class='caret'></span></a>\r\n                      <ul class=\"dropdown-menu\">\r\n                        <li><a class=\"dropdown-item\" [routerLink]=''\r\n                            (click)=\"mstjobstatustoggleOption();mstjobstatuses_route(null, 'create')\"><i\r\n                              class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      </ul>\r\n                    </li>\r\n                  </ul>\r\n                  <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstjobstatuses_route(null, 'create')\"><i\r\n                      class=\"fa fa-plus\"></i></a> -->\r\n                </h4>\r\n                <ng2-smart-table #tbl_mstjobstatuses (userRowSelect)=\"handle_mstjobstatuses_GridSelected($event)\"\r\n                  [settings]=\"mstjobstatuses_settings\" (custom)=\"onCustom_mstjobstatuses_Action($event)\"\r\n                  [source]=\"tbl_mstjobstatuses?.source?.data\" (delete)=\"mstjobstatuses_route($event,'delete')\"\r\n                  (deleteConfirm)=\"mstjobstatuses_route($event,'delete')\"\r\n                  (create)=\"mstjobstatuses_route($event,'create')\" (createConfirm)=\"mstjobstatuses_beforesave($event)\"\r\n                  (edit)=\"mstjobstatuses_route($event,'edit')\" (editConfirm)=\"mstjobstatuses_beforesave($event)\">\r\n                </ng2-smart-table>\r\n              </div>\r\n              <!--End of child table mstjobstatuses-->\r\n\r\n            </div>\r\n\r\n          </div>\r\n        </div>\r\n      </div>\r\n    </form>\r\n  </div>\r\n</div>\r\n");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_mstapplicantmaster_mstapplicantmaster_module_ts.js.map