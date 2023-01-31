"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_mstjobrequirement_mstjobrequirement_compo-b12bcb"],{

/***/ 99457:
/*!******************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstjobrequirement/mstjobrequirement.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstjobrequirementComponent": () => (/* binding */ mstjobrequirementComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstjobrequirement_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./mstjobrequirement.component.html */ 80606);
/* harmony import */ var E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstjobrequirement_mstjobrequirement_component_ts_css_E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_inline_resource_js_data_CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5qb2JfcmVfYnRuewogICAgICAgICAgcGFkZGluZzogNHB4IDZweCAhaW1wb3J0YW50OwogICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcCAhaW1wb3J0YW50OwogICAgICAgIH0KICAgICAgICAubW9iaWxlX3ZpZXdfYnRuewogICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OwogICAgICAgIH0KICAgIH0KICAgIA_3D_3D_E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstjobrequirement_mstjobrequirement_component_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects/n-tire-biz-app/src/app/pages/forms/mstjobrequirement/mstjobrequirement.component.ts.css!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5qb2JfcmVfYnRuewogICAgICAgICAgcGFkZGluZzogNHB4IDZweCAhaW1wb3J0YW50OwogICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcCAhaW1wb3J0YW50OwogICAgICAgIH0KICAgICAgICAubW9iaWxlX3ZpZXdfYnRuewogICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OwogICAgICAgIH0KICAgIH0KICAgIA%3D%3D!./projects/n-tire-biz-app/src/app/pages/forms/mstjobrequirement/mstjobrequirement.component.ts */ 30678);
/* harmony import */ var _service_mstjobrequirement_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../service/mstjobrequirement.service */ 33446);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component */ 55163);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../pages/forms/mstjobstatus/mstjobstatus.component */ 83793);
/* harmony import */ var _service_mstjobstatus_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../service/mstjobstatus.service */ 60934);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);









//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions

//child table



//Shortcuts

//translator





//primeng services



//session,application constants




//custom fields & attachments

let mstjobrequirementComponent = class mstjobrequirementComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, mstjobrequirement_service, mstjobstatus_service, fb, sharedService, sessionService, toastr, sanitizer, config, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.mstjobrequirement_service = mstjobrequirement_service;
        this.mstjobstatus_service = mstjobstatus_service;
        this.fb = fb;
        this.sharedService = sharedService;
        this.sessionService = sessionService;
        this.toastr = toastr;
        this.sanitizer = sanitizer;
        this.config = config;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_mstjobrequirements = false;
        this.bfilterPopulate_mstjobstatuses = false;
        this.mstjobrequirement_menuactions = [];
        this.mstjobstatus_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_11__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_11__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.showApplicantmenu = false;
        this.showAdminMenuaccess = false;
        this.showCorporateMenuaccess = false;
        this.Deleted_mstjobstatus_IDs = "";
        this.mstjobstatuses_ID = "1";
        this.minDate = undefined;
        this.showloc = true;
        this.showskill = true;
        this.showedu = true;
        this.showlan = true;
        const current = new Date();
        this.minDate = {
            year: current.getFullYear(),
            month: current.getMonth() + 1,
            day: current.getDate()
        };
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
        this.mstjobrequirement_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            jobid: [null],
            corporateid: [null],
            jobdescription: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required])],
            jobrequirement: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required])],
            numberofpositions: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_13__.Validators.required])],
            tobefilledbefore: [null],
            experiencefrom: [null],
            experienceto: [null],
            locations: [null],
            skills: [null],
            education: [null],
            language: [null],
            referenceavailability: [null],
            referencevalidation: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.mstjobrequirement_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.mstjobrequirement_Form.dirty && this.mstjobrequirement_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_14__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_14__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_14__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.jobid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.jobid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.jobid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            if (this.sessionService.getItem('role') == '1') {
                this.userrole = 'Admin';
                this.showAdminMenuaccess = true;
                this.showApplicantmenu = false;
                this.showCorporateMenuaccess = false;
            }
            else if (this.sessionService.getItem('role') == '2') {
                this.userrole = 'Applicant';
                this.showApplicantmenu = true;
                this.showAdminMenuaccess = false;
                this.showCorporateMenuaccess = false;
            }
            else if (this.sessionService.getItem('role') == '3') {
                this.userrole = 'Corporate';
                this.showCorporateMenuaccess = true;
                this.showApplicantmenu = false;
                this.showAdminMenuaccess = false;
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
            let mstjobrequirementid = null;
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
            this.formid = mstjobrequirementid;
            //alert(mstjobrequirementid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_mstjobstatuses_TableConfig();
                setTimeout(() => {
                    //this.Set_mstjobstatuses_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys
            }
            this.mstjobrequirement_service.getDefaultData().then(res => {
                debugger;
                console.log('getDefaultData() ', res.list_skills.value);
                this.locations_List = res.list_locations.value;
                this.skills_List = res.list_skills.value;
                this.education_List = res.list_education.value;
                this.language_List = res.list_language.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.mstjobrequirement_service.get_mstjobrequirements_List().then(res => {
                debugger;
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
                this.showedu = res.mstjobrequirement.educationdesc,
                    this.showlan = res.mstjobrequirement.languagedesc,
                    this.showloc = res.mstjobrequirement.locationdesc,
                    this.showskill = res.mstjobrequirement.skilldesc;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched
            this.mstjobrequirement_Form.markAsUntouched();
            this.mstjobrequirement_Form.markAsPristine();
            // let result = this.router.routerState.snapshot.url.match("view");
            // console.log('result ', result)
            // console.log(result[0]);
            // if (result[0] == "mstapplicantreferencerequestsaccepted") {
            //     this.showloc = true;
            //     this.showskill = true;
            //     this.showedu = true;
            //     this.showlan = true;
            // } else {
            //     this.showloc = false;
            //     this.showskill = false;
            //     this.showedu = false;
            //     this.showlan = false;
            // }
        });
    }
    resetForm() {
        if (this.mstjobrequirement_Form != null)
            this.mstjobrequirement_Form.reset();
        this.mstjobrequirement_Form.patchValue({});
        setTimeout(() => {
            this.mstjobstatuses_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let jobid = this.mstjobrequirement_Form.get('jobid').value;
        if (jobid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstjobrequirement_service.delete_mstjobrequirement(jobid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.mstjobrequirement_Form.patchValue({
            jobid: null
        });
        if (this.formData.jobid != null)
            this.formData.jobid = null;
        for (let i = 0; i < this.tbl_mstjobstatuses.source.length; i++) {
            this.tbl_mstjobstatuses.source[i].viewid = null;
        }
    }
    PopulateFromMainScreen(mainscreendata, bdisable) {
        debugger;
        if (mainscreendata != null) {
            for (let key in mainscreendata) {
                if (key != 'visiblelist' && key != 'hidelist' && key != 'event') {
                    let jsonstring = "";
                    let json = null;
                    let ctrltype = typeof (mainscreendata[key]);
                    if (false)
                        {}
                    else if (key == "tobefilledbefore")
                        this.mstjobrequirement_Form.patchValue({ "tobefilledbefore": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.mstjobrequirement_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstjobrequirement_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstjobrequirement_Form.controls[key] != undefined) {
                                this.mstjobrequirement_Form.controls[key].disable({ onlySelf: true });
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
        this.router.navigate(['/home/boreportviewer/jobq']);
    }
    onSubmitAndWait() {
        debugger;
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
        debugger;
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
    locations_onChange(event) {
        // let e = evt.value;
        this.locations_results = this.locations_List.filter(v => (v.label || '').toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
        // this.mstjobrequirement_Form.patchValue({ locationsdesc: evt.options[evt.options.selectedIndex].text });
    }
    skills_onChange(event) {
        // if(this.skills_List != undefined && this.skills_List != null)nam
        this.skills_results = this.skills_List.filter(v => (v.label || '').toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
        // let e = evt.value;
        // this.mstjobrequirement_Form.patchValue({ skillsdesc: evt.options[evt.options.selectedIndex].text });
    }
    education_onChange(event) {
        // let e = evt.value;
        this.education_results = this.education_List.filter(v => (v.label || '').toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
        // this.mstjobrequirement_Form.patchValue({ educationdesc: evt.options[evt.options.selectedIndex].text });
    }
    language_onChange(event) {
        // let e = this.f.language.value as any;
        this.language_results = this.language_List.filter(v => (v.label || '').toLowerCase().indexOf(event.query.toLowerCase()) > -1).slice(0, 10);
        // this.mstjobrequirement_Form.patchValue({ languagedesc: evt.options[evt.options.selectedIndex].text });
    }
    attachmentuploader(e) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileAttachmentList.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentFieldJson == null)
                this.attachmentFieldJson = [];
            max = Array.of(this.attachmentFieldJson).length;
            attachmentobj = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_4__.KeyValuePair((this.attachmentFieldJson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentFieldJson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null)
                max = Array.of(this.attachmentlist).length;
            attachmentobj = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_4__.KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    edit_mstjobrequirements() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.spinner.show();
            this.mstjobrequirement_service.get_mstjobrequirements_ByEID(pkcol).then(res => {
                this.spinner.hide();
                debugger;
                this.formData = res.mstjobrequirement;
                let formproperty = res.mstjobrequirement.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.mstjobrequirement.pkcol;
                this.formid = res.mstjobrequirement.jobid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        debugger;
        this.formData = res.mstjobrequirement;
        this.formid = res.mstjobrequirement.jobid;
        this.pkcol = res.mstjobrequirement.pkcol;
        this.bmyrecord = false;
        if (res.mstjobrequirement.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        // this.showedu = res.mstjobrequirement.educationdesc;
        // this.showlan = res.mstjobrequirement.languagedesc;
        // this.showloc = res.mstjobrequirement.locationdesc;
        // this.showskill = res.mstjobrequirement.skilldesc;
        console.log('res ', res.mstjobrequirement.educationdesc);
        console.log('res ', res.mstjobrequirement.languagedesc);
        console.log('res ', res.mstjobrequirement.locationdesc);
        console.log('res ', res.mstjobrequirement.skilldesc);
        // //console.log(res.order);
        // console.log('res.mstjobrequirement ', res.mstjobrequirement);
        debugger;
        this.mstjobrequirement_Form.patchValue({
            jobid: res.mstjobrequirement.jobid,
            corporateid: res.mstjobrequirement.corporateid,
            jobdescription: res.mstjobrequirement.jobdescription,
            jobrequirement: res.mstjobrequirement.jobrequirement,
            numberofpositions: res.mstjobrequirement.numberofpositions,
            tobefilledbefore: this.ngbDateParserFormatter.parse(res.mstjobrequirement.tobefilledbefore),
            experiencefrom: res.mstjobrequirement.experiencefrom,
            experienceto: res.mstjobrequirement.experienceto,
            locations: res.mstjobrequirement.locations,
            skills: res.mstjobrequirement.skills,
            education: res.mstjobrequirement.education,
            language: res.mstjobrequirement.language,
            referenceavailability: res.mstjobrequirement.referenceavailability,
            referencevalidation: res.mstjobrequirement.referencevalidation,
            attachment: JSON.parse(res.mstjobrequirement.attachment),
            status: res.mstjobrequirement.status,
            statusdesc: res.mstjobrequirement.statusdesc,
            educationdesc: res.mstjobrequirement.educationdesc,
            languagedesc: res.mstjobrequirement.languagedesc,
            locationdesc: res.mstjobrequirement.locationdesc,
            skilldesc: res.mstjobrequirement.skilldesc
        });
        setTimeout(() => {
            this.getSkillsDescription();
            this.getLanguageDescription();
            this.getlocationDescription();
            this.geteducationDescription();
        }, 400);
        debugger;
        this.mstjobrequirement = res.mstjobrequirement;
        this.mstjobrequirement_menuactions = res.mstjobrequirement_menuactions;
        this.mstjobstatus_menuactions = res.mstjobstatus_menuactions;
        this.mstjobstatuses_visiblelist = res.mstjobstatuses_visiblelist;
        if (this.mstjobrequirement_Form.get('attachment').value != null && this.mstjobrequirement_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.mstjobrequirement_Form.get('attachment').value);
        //Child Tables if any
        this.Set_mstjobstatuses_TableConfig();
        this.mstjobstatuses_LoadTable(res.mstjobstatuses);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getSkillsDescription() {
        debugger;
        let skillsdescription = [];
        for (let i = 0; i < this.skills_List.length; i++) {
            for (let j = 0; j < this.mstjobrequirement_Form.get('skills').value.length; j++) {
                if (this.skills_List[i].value.toString() == this.mstjobrequirement_Form.get('skills').value[j].toString()) {
                    skillsdescription.push(this.skills_List[i]);
                }
            }
        }
        this.mstjobrequirement_Form.patchValue({ skills: skillsdescription });
    }
    getLanguageDescription() {
        debugger;
        let languagedescription = [];
        for (let i = 0; i < this.language_List.length; i++) {
            for (let j = 0; j < this.mstjobrequirement_Form.get('language').value.length; j++) {
                if (this.language_List[i].value.toString() == this.mstjobrequirement_Form.get('language').value[j].toString()) {
                    languagedescription.push(this.language_List[i]);
                }
            }
        }
        this.mstjobrequirement_Form.patchValue({ language: languagedescription });
    }
    geteducationDescription() {
        debugger;
        let educationdescription = [];
        for (let i = 0; i < this.education_List.length; i++) {
            for (let j = 0; j < this.mstjobrequirement_Form.get('education').value.length; j++) {
                if (this.education_List[i].value.toString() == this.mstjobrequirement_Form.get('education').value[j].toString()) {
                    educationdescription.push(this.education_List[i]);
                }
            }
        }
        this.mstjobrequirement_Form.patchValue({ education: educationdescription });
    }
    getlocationDescription() {
        debugger;
        let locationdescription = [];
        for (let i = 0; i < this.locations_List.length; i++) {
            for (let j = 0; j < this.mstjobrequirement_Form.get('locations').value.length; j++) {
                if (this.locations_List[i].value.toString() == this.mstjobrequirement_Form.get('locations').value[j].toString()) {
                    locationdescription.push(this.locations_List[i]);
                }
            }
        }
        this.mstjobrequirement_Form.patchValue({ locations: locationdescription });
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.mstjobrequirement_Form.controls) {
            let val = this.mstjobrequirement_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.mstjobrequirement_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.mstjobrequirement_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.mstjobrequirement_Form.getRawValue();
            obj.tobefilledbefore = new Date(this.mstjobrequirement_Form.get('tobefilledbefore').value ? this.ngbDateParserFormatter.format(this.mstjobrequirement_Form.get('tobefilledbefore').value) + '  UTC' : null);
            obj.locations = null;
            if (this.mstjobrequirement_Form.get('locations').value != null)
                obj.locationsstring = JSON.stringify(this.mstjobrequirement_Form.get('locations').value);
            obj.skills = null;
            if (this.mstjobrequirement_Form.get('skills').value != null)
                obj.skillsstring = JSON.stringify(this.mstjobrequirement_Form.get('skills').value);
            // if (this.mstjobrequirement_Form.get('skills').value != null) obj.skillsstring = JSON.stringify(this.mstjobrequirement_Form.get('skills').value);
            obj.education = null;
            if (this.mstjobrequirement_Form.get('education').value != null)
                obj.educationstring = JSON.stringify(this.mstjobrequirement_Form.get('education').value);
            obj.language = null;
            if (this.mstjobrequirement_Form.get('language').value != null)
                obj.languagestring = JSON.stringify(this.mstjobrequirement_Form.get('language').value);
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
    getSkills(skills_List) {
        debugger;
        let skills = [];
        for (let i = 0; i < skills_List.length; i++) {
            skills.push(skills_List[i].value.toString());
        }
        return skills;
    }
    getLocation(locations_List) {
        debugger;
        let locations = [];
        for (let i = 0; i < locations_List.length; i++) {
            locations.push(locations_List[i].value.toString());
        }
        return locations;
    }
    getEducation(education_List) {
        debugger;
        let education = [];
        for (let i = 0; i < education_List.length; i++) {
            education.push(education_List[i].value.toString());
        }
        return education;
    }
    getLanguage(language_List) {
        debugger;
        let language = [];
        for (let i = 0; i < language_List.length; i++) {
            language.push(language_List[i].value.toString());
        }
        return language;
    }
    onSubmitData(bclear) {
        var _a, _b;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            if (!this.mstjobrequirement_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            // Object.keys(this.mstjobrequirement_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.mstjobrequirement_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.validate()) {
                return;
            }
            this.formData = this.mstjobrequirement_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.mstjobrequirement_Form.controls[key] != null) {
                            this.formData[key] = this.mstjobrequirement_Form.controls[key].value;
                        }
                    }
                }
            }
            var obj = this.mstjobrequirement_Form.getRawValue();
            this.formData.tobefilledbefore = new Date(this.mstjobrequirement_Form.get('tobefilledbefore').value ? this.ngbDateParserFormatter.format(this.mstjobrequirement_Form.get('tobefilledbefore').value) + '  UTC' : null);
            this.formData.locations = null;
            if (this.mstjobrequirement_Form.get('locations').value != null)
                this.formData.locationsstring = JSON.stringify(this.getLocation(this.mstjobrequirement_Form.get('locations').value));
            this.formData.skills = null;
            if (this.mstjobrequirement_Form.get('skills').value != null)
                this.formData.skillsstring = JSON.stringify(this.getSkills(this.mstjobrequirement_Form.get('skills').value));
            this.formData.education = null;
            if (this.mstjobrequirement_Form.get('education').value != null)
                this.formData.educationstring = JSON.stringify(this.getEducation(this.mstjobrequirement_Form.get('education').value));
            this.formData.language = null;
            if (this.mstjobrequirement_Form.get('language').value != null)
                this.formData.languagestring = JSON.stringify(this.getLanguage(this.mstjobrequirement_Form.get('language').value));
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_mstjobstatus_IDs = this.Deleted_mstjobstatus_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.mstjobrequirement_service.saveOrUpdate_mstjobrequirements(this.formData, (_b = (_a = this.tbl_mstjobstatuses) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_mstjobstatuses.source) {
                    for (let i = 0; i < this.tbl_mstjobstatuses.source.data.length; i++) {
                        if (this.tbl_mstjobstatuses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstjobstatuses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.mstjobrequirement);
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
                        this.objvalues.push(res.mstjobrequirement);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstjobrequirement_Form.markAsUntouched();
                this.mstjobrequirement_Form.markAsPristine();
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
        this.tbl_mstjobstatuses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
    }
    AddOrEdit_mstjobstatus(event, viewid, jobid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_6__.mstjobstatusComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, viewid, jobid, visiblelist: this.mstjobstatuses_visiblelist, hidelist: this.mstjobstatuses_hidelist, ScreenType: 2 },
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
        this.tbl_mstjobstatuses.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_mstjobstatuses_Checkbox() {
        debugger;
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
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
                add: !this.showview,
                edit: true,
                delete: !this.showview,
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
                applicantiddesc: {
                    title: 'Applicant',
                    type: 'html',
                    filter: true,
                },
                corporateiddesc: {
                    title: 'Corporate',
                    type: 'html',
                    filter: true,
                },
                viewdatetime: {
                    title: 'View Date Time',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_5__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_5__.SmartTableDatepickerComponent,
                    },
                },
                intereststatus: {
                    title: 'Interest Status',
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
                comments: {
                    title: 'Comments',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                allcomments: {
                    title: 'All Comments',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                hiringstatus: {
                    title: 'Hiring Status',
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
                ctcoffered: {
                    title: 'C T C Offered',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    mstjobstatuses_LoadTable(mstjobstatuses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobstatuses_ID) >= 0) {
            if (this.tbl_mstjobstatuses != undefined)
                this.tbl_mstjobstatuses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
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
    if (this.mstjobrequirement_service.mstjobstatuses.length == 0)
    {
        this.tbl_mstjobstatuses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstjobstatus();
        this.mstjobrequirement_service.mstjobstatuses.push(obj);
        this.tbl_mstjobstatuses.source.refresh();
        if ((this.mstjobrequirement_service.mstjobstatuses.length / this.tbl_mstjobstatuses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstjobstatuses.source.getPaging().page)
        {
            this.tbl_mstjobstatuses.source.setPage((this.mstjobrequirement_service.mstjobstatuses.length / this.tbl_mstjobstatuses.source.getPaging().perPage).toFixed(0) + 1);
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
            this.mstjobrequirement_service.delete_mstjobrequirement(viewid).then(res => this.mstjobstatuses_LoadTable());
        }
    }
    onCustom_mstjobstatuses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstjobstatuses");
            let formname = objbomenuaction.actionname;
        });
    }
    mstjobstatuses_Paging(val) {
        debugger;
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
};
mstjobrequirementComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_17__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_20__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_10__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DialogService },
    { type: _service_mstjobrequirement_service__WEBPACK_IMPORTED_MODULE_2__.mstjobrequirementService },
    { type: _service_mstjobstatus_service__WEBPACK_IMPORTED_MODULE_7__.mstjobstatusService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_13__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_8__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_9__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__.DomSanitizer },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbDatepickerConfig },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_20__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_24__.NgxSpinnerService }
];
mstjobrequirementComponent.propDecorators = {
    tbl_mstjobstatuses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['tbl_mstjobstatuses', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['fileattachment', { static: false },] }]
};
mstjobrequirementComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
        selector: 'app-mstjobrequirement',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstjobrequirement_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__.KeyboardShortcutsService],
        styles: [E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstjobrequirement_mstjobrequirement_component_ts_css_E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_inline_resource_js_data_CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5qb2JfcmVfYnRuewogICAgICAgICAgcGFkZGluZzogNHB4IDZweCAhaW1wb3J0YW50OwogICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcCAhaW1wb3J0YW50OwogICAgICAgIH0KICAgICAgICAubW9iaWxlX3ZpZXdfYnRuewogICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OwogICAgICAgIH0KICAgIH0KICAgIA_3D_3D_E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstjobrequirement_mstjobrequirement_component_ts__WEBPACK_IMPORTED_MODULE_1__]
    })
], mstjobrequirementComponent);



/***/ }),

/***/ 33446:
/*!******************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/mstjobrequirement.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstjobrequirementService": () => (/* binding */ mstjobrequirementService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let mstjobrequirementService = class mstjobrequirementService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_mstjobrequirements(formData, mstjobstatuses) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { mstjobstatuses: mstjobstatuses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstjobrequirement', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstjobrequirement' + '/getdefaultdata').toPromise();
        }
    }
    get_mstjobrequirements_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstjobrequirement').toPromise();
        }
    }
    getListBy_jobid(jobid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstjobrequirement' + '/jobid/' + jobid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstjobrequirement' + '/param/' + key).toPromise();
        }
    }
    get_mstjobrequirements_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstjobrequirement' + '/e/' + id).toPromise();
        }
    }
    get_mstjobrequirements_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstjobrequirement' + '/' + id).toPromise();
        }
    }
    delete_mstjobrequirement(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstjobrequirement' + '/' + id).toPromise();
        }
    }
    getList_locations() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/mstjobrequirement' + '/getList_locations').toPromise();
    }
    getList_skills() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/mstjobrequirement' + '/getList_skills').toPromise();
    }
    getList_education() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/mstjobrequirement' + '/getList_education').toPromise();
    }
    getList_language() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/mstjobrequirement' + '/getList_language/').toPromise();
    }
};
mstjobrequirementService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
mstjobrequirementService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], mstjobrequirementService);



/***/ }),

/***/ 80606:
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/mstjobrequirement/mstjobrequirement.component.html ***!
  \***********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"mstjobrequirement_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\"\r\n    [ngClass]=\"{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}\">\r\n    <div class=\"col-4\" style=\"display: flex;align-items: center;\">\r\n      <h1 class=\" columns mainheader left\"><a href='#/home/{{p_currenturl}}' style=\"margin: auto;\">{{'Job Requirements'\r\n          | translate}}</a>\r\n      </h1>\r\n    </div>\r\n\r\n    <div class='col-4  sticky1 second' style=\"display: flex;justify-content: end;align-items: center;\" role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <!--<ng-container *ngFor=\"let action of mstjobrequirement_menuactions\">\r\n    <li><a  class=\"alert-action\" [routerLink]=''  (click)=\"onChangeAction(action.actionid)\" ><i class=\"fa fa-new\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n</ng-container>-->\r\n\r\n          <!-- <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li> -->\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n\r\n    <div class='col-4' style=\"display: flex;justify-content: end;align-items: center;\">\r\n\r\n      <button *ngIf='showview' (click)=\"edit_mstjobrequirements()\" class=\"popup-add-button\">\r\n        <i class=\"nb-edit\"></i>Edit\r\n      </button>\r\n      <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n        <!-- <a class=\"alert-success  popup-add-button mobile_view_btn\" [routerLink]=''(click)=\"goBack()\" ><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i>\r\n          Back</a> -->\r\n        <!-- <a class=\"alert-success popup-add-button\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n          Submit</a> -->\r\n        <!-- <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n          (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a> -->\r\n        <app-action *ngIf=\"f.jobid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n          [value]=\"f.jobid.value\" [status]=\"f.status.value\"></app-action>\r\n      </li>\r\n      <button *ngIf=\"!showview\" (click)=\"onSubmitAndWait()\" class=\"popup-add-button job_re_btn\">\r\n        <i class=\"fa fa-database\"></i>Submit\r\n        <app-action *ngIf=\"f.jobid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n          [value]=\"f.jobid.value\" [status]=\"f.status.value\"></app-action>\r\n      </button>\r\n\r\n      <button class=\"popup-add-button job_re_btn\"\r\n        *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\"\r\n        (click)=\"onClose()\">\r\n        <i class=\"fa fa-close\"></i>Close\r\n      </button>\r\n\r\n      <ul style=\"display: none;\">\r\n        <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_mstjobrequirements()\"><i\r\n              class=\"nb-edit\"></i>Edit</a></li>\r\n        <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n          <a class=\"alert-success popup-add-button\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i\r\n              class=\"fa fa-database\"></i>\r\n            Submit</a>\r\n          <!-- <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a> -->\r\n          <app-action *ngIf=\"f.jobid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n            [value]=\"f.jobid.value\" [status]=\"f.status.value\"></app-action>\r\n        </li>\r\n        <li class='nav-item actionheader'\r\n          *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n          <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n        </li>\r\n\r\n      </ul>\r\n    </div>\r\n\r\n  </div>\r\n\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('corporateid') == -1) && (corporateidvisible==undefined || corporateidvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"corporateid\" class=\"control-label\">Corporate</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.corporateid?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"corporateid\" formControlName=\"corporateid\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('jobdescription') == -1) && (jobdescriptionvisible==undefined || jobdescriptionvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"jobdescription\" class=\"control-label required\">Job Description</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.jobdescription?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"jobdescription\" required formControlName=\"jobdescription\"\r\n                  class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.jobdescription.errors?.required\"\r\n                  errorMsg=\"Enter {{'Job Description' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('jobrequirement') == -1) && (jobrequirementvisible==undefined || jobrequirementvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"jobrequirement\" class=\"control-label required\">Job Requirement</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.jobrequirement?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"jobrequirement\" required formControlName=\"jobrequirement\"\r\n                  class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.jobrequirement.errors?.required\"\r\n                  errorMsg=\"Enter {{'Job Requirement' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('numberofpositions') == -1) && (numberofpositionsvisible==undefined || numberofpositionsvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"numberofpositions\" class=\"control-label required\">Number Of Positions</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.numberofpositions?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"numberofpositions\" required formControlName=\"numberofpositions\"\r\n                  class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.numberofpositions.errors?.required\"\r\n                  errorMsg=\"Enter {{'Number Of Positions' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('tobefilledbefore') == -1) && (tobefilledbeforevisible==undefined || tobefilledbeforevisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"tobefilledbefore\" class=\"control-label\">To Be Filled Before</label>\r\n                <label *ngIf=\"showview\"\r\n                  class=\"labelview\">{{ngbDateParserFormatter.format(f.tobefilledbefore?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #tobefilledbeforeformpicker=\"ngbDatepicker\" [minDate]=\"minDate\" readonly ngbDatepicker\r\n                    name=\"tobefilledbeforeformpicker\" id=\"tobefilledbefore\" formControlName=\"tobefilledbefore\"\r\n                    class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"tobefilledbeforeformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('experiencefrom') == -1) && (experiencefromvisible==undefined || experiencefromvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"experiencefrom\" class=\"control-label\">Experience From</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.experiencefrom?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"experiencefrom\" formControlName=\"experiencefrom\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('experienceto') == -1) && (experiencetovisible==undefined || experiencetovisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"experienceto\" class=\"control-label\">Experience To</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.experienceto?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"experienceto\" formControlName=\"experienceto\" class=\"form-control\">\r\n              </div>\r\n\r\n\r\n              <!--locations-->\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('locations') == -1) && (locationsvisible==undefined || locationsvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\"><label for=\"locations\" class=\"control-label\">Locations</label>&nbsp;&nbsp; <br />\r\n                <p-autoComplete formControlName=\"locations\" field=\"label\" [multiple]=\"true\" *ngIf=\"!showview\"\r\n                  [suggestions]=\"locations_results\" (completeMethod)=\"locations_onChange($event)\"></p-autoComplete>\r\n                <!-- <p-multiSelect [options]=\"locations_List\" formControlName=\"locations\" [filter]=\"true\" *ngIf=\"!showview\"\r\n                  id=\"locationsdesc\" (change)=\"locations_onChange($event.target)\" formControlName=\"locations\"\r\n                  class=\"form-control\">\r\n                </p-multiSelect>  -->\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.locations?.label}}</label>\r\n                <label class=\"labelview alignment_label\" *ngIf=\"showview\">{{mstjobrequirement.locationdesc}}</label>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <!--skills-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('skills') == -1) && (skillsvisible==undefined || skillsvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\"><label for=\"skills\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_skills(null)\">Skills</label>&nbsp;&nbsp; <br />\r\n                <p-autoComplete formControlName=\"skills\" field=\"label\" id=\"skillsdesc\" [multiple]=\"true\"\r\n                  *ngIf=\"!showview\" [suggestions]=\"skills_results\"\r\n                  (completeMethod)=\"skills_onChange($event)\"></p-autoComplete>\r\n\r\n                <!-- <p-autoComplete formControlName=\"skills\" field=\"label\" id=\"skillsdesc\" [multiple]=\"true\" *ngIf=\"!showview\" [suggestions]=\"skills_results\"\r\n                  (completeMethod)=\"skills_onChange($event)\"></p-autoComplete> -->\r\n\r\n                <!-- <p-multiSelect [options]=\"skills_List\" formControlName=\"skills\" [filter]=\"true\" *ngIf=\"!showview\"\r\n                  id=\"skillsdesc\" (change)=\"skills_onChange($event.target)\" formControlName=\"skills\"\r\n                  class=\"form-control\">\r\n                </p-multiSelect> -->\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.skills?.label}}</label>\r\n                <label class=\"labelview alignment_label\" *ngIf=\"showview\">{{mstjobrequirement.skilldesc}}</label>\r\n              </div>\r\n\r\n              <!--education-->\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('education') == -1) && (educationvisible==undefined || educationvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\"><label for=\"education\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_education(null)\">Education</label>\r\n                <br />\r\n                <p-autoComplete formControlName=\"education\" field=\"label\" id=\"educationdesc\" [multiple]=\"true\"\r\n                  *ngIf=\"!showview\" [suggestions]=\"education_results\"\r\n                  (completeMethod)=\"education_onChange($event)\"></p-autoComplete>\r\n\r\n\r\n\r\n                <!-- <p-multiSelect [options]=\"education_List\" formControlName=\"education\" [filter]=\"true\" *ngIf=\"!showview\"\r\n                  id=\"educationdesc\" (change)=\"education_onChange($event.target)\" formControlName=\"education\"\r\n                  class=\"form-control\">\r\n                </p-multiSelect>  -->\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.education?.label}}</label>\r\n                <label class=\"labelview alignment_label\" *ngIf=\"showview\">{{mstjobrequirement.educationdesc}}</label>\r\n              </div>\r\n\r\n\r\n              <!--language-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('language') == -1) && (languagevisible==undefined || languagevisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\"><label for=\"language\" class=\"control-label\">Language</label>\r\n                <br />\r\n                <p-autoComplete formControlName=\"language\" field=\"label\" id=\"languagedesc\" [multiple]=\"true\"\r\n                  *ngIf=\"!showview\" [suggestions]=\"language_results\"\r\n                  (completeMethod)=\"language_onChange($event)\"></p-autoComplete>\r\n                <!-- <p-multiSelect [options]=\"language_List\" formControlName=\"language\" [filter]=\"false\" *ngIf=\"!showview\"\r\n                  id=\"languagedesc\" (change)=\"language_onChange($event.target)\" formControlName=\"language\"\r\n                  class=\"form-control\">\r\n                </p-multiSelect> -->\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.language?.label}}</label>\r\n                <label class=\"labelview alignment_label\" *ngIf=\"showview\">{{mstjobrequirement.languagedesc}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('referenceavailability') == -1) && (referenceavailabilityvisible==undefined || referenceavailabilityvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\" style=\"display: flex; justify-content: center;  padding: 31px;\r\n                right: 16px;\r\n            \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"referenceavailability\" class=\"control-label\">Reference Availability</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.referenceavailability?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"referenceavailability\"\r\n                    formControlName=\"referenceavailability\">\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('referencevalidation') == -1) && (referencevalidationvisible==undefined || referencevalidationvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\" style=\"display: flex; justify-content: center;  padding: 31px;\r\n                right: 16px;\r\n            \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"referencevalidation\" class=\"control-label\">Reference Validation</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.referencevalidation?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"referencevalidation\"\r\n                    formControlName=\"referencevalidation\">\r\n                </div>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n          </p-accordion>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Job Statuses</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstjobstatuses-->\r\n            <div [ngClass]=\"Is_mstjobstatuses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Job Statuses' | translate}}\r\n                <select class='child' id=\"mstjobstatusesPagingdropdown\"\r\n                  (change)=\"mstjobstatuses_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstjobstatustoggleOption();mstjobstatuses_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showmstjobstatusesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstjobstatuses_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a> -->\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstjobstatuses (userRowSelect)=\"handle_mstjobstatuses_GridSelected($event)\"\r\n                [settings]=\"mstjobstatuses_settings\" (custom)=\"onCustom_mstjobstatuses_Action($event)\"\r\n                [source]=\"tbl_mstjobstatuses?.source?.data\" (delete)=\"mstjobstatuses_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstjobstatuses_route($event,'delete')\" (create)=\"mstjobstatuses_route($event,'create')\"\r\n                (createConfirm)=\"mstjobstatuses_beforesave($event)\" (edit)=\"mstjobstatuses_route($event,'edit')\"\r\n                (editConfirm)=\"mstjobstatuses_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstjobstatuses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ 30678:
/*!********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstjobrequirement/mstjobrequirement.component.ts.css!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5qb2JfcmVfYnRuewogICAgICAgICAgcGFkZGluZzogNHB4IDZweCAhaW1wb3J0YW50OwogICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcCAhaW1wb3J0YW50OwogICAgICAgIH0KICAgICAgICAubW9iaWxlX3ZpZXdfYnRuewogICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50OwogICAgICAgIH0KICAgIH0KICAgIA%3D%3D!./projects/n-tire-biz-app/src/app/pages/forms/mstjobrequirement/mstjobrequirement.component.ts ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n    @media only screen and (max-width: 600px) {\n      .education_view_mobile{\n          min-width: 100% !important;\n          margin: 0px !important;\n        }\n        .job_re_btn{\n          padding: 4px 6px !important;\n          white-space: nowrap !important;\n        }\n        .mobile_view_btn{\n          display: none !important;\n        }\n    }\n    \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1zdGpvYnJlcXVpcmVtZW50LmNvbXBvbmVudC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiO0lBQ0k7TUFDRTtVQUNJLDBCQUEwQjtVQUMxQixzQkFBc0I7UUFDeEI7UUFDQTtVQUNFLDJCQUEyQjtVQUMzQiw4QkFBOEI7UUFDaEM7UUFDQTtVQUNFLHdCQUF3QjtRQUMxQjtJQUNKIiwiZmlsZSI6Im1zdGpvYnJlcXVpcmVtZW50LmNvbXBvbmVudC50cyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7XG4gICAgICAgICAgbWluLXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgbWFyZ2luOiAwcHggIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAuam9iX3JlX2J0bntcbiAgICAgICAgICBwYWRkaW5nOiA0cHggNnB4ICFpbXBvcnRhbnQ7XG4gICAgICAgICAgd2hpdGUtc3BhY2U6IG5vd3JhcCAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgICAgIC5tb2JpbGVfdmlld19idG57XG4gICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgfVxuICAgICJdfQ== */";

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_mstjobrequirement_mstjobrequirement_compo-b12bcb.js.map