"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_mstprofilecompletionmaster_mstprofilecompletionma-279546"],{

/***/ 14892:
/*!************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstprofilecompletionmaster/mstprofilecompletionmaster.component.ts ***!
  \************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstprofilecompletionmasterComponent": () => (/* binding */ mstprofilecompletionmasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstprofilecompletionmaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./mstprofilecompletionmaster.component.html */ 52907);
/* harmony import */ var _service_mstprofilecompletionmaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/mstprofilecompletionmaster.service */ 3684);
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

let mstprofilecompletionmasterComponent = class mstprofilecompletionmasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, mstprofilecompletionmaster_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.mstprofilecompletionmaster_service = mstprofilecompletionmaster_service;
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
        this.bfilterPopulate_mstprofilecompletionmasters = false;
        this.mstprofilecompletionmaster_menuactions = [];
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
        this.mstprofilecompletionmaster_Form = this.fb.group({
            pk: [null],
            profileid: [null],
            generalinformation: [null],
            education: [null],
            career: [null],
            skill: [null],
            photo: [null],
            language: [null],
            geography: [null],
            achievements: [null],
            displayprofile: [null],
            statuscrimp: [null],
            reference: [null],
            worksdone: [null],
            socialmedia: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.mstprofilecompletionmaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.mstprofilecompletionmaster_Form.dirty && this.mstprofilecompletionmaster_Form.touched) {
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
            this.resetForm();
            yield this.PopulateScreen();
            //autocomplete
            this.mstprofilecompletionmaster_service.get_mstprofilecompletionmasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.mstprofilecompletionmaster_Form.markAsUntouched();
            this.mstprofilecompletionmaster_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.mstprofilecompletionmaster_Form != null)
            this.mstprofilecompletionmaster_Form.reset();
        this.mstprofilecompletionmaster_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let profileid = this.mstprofilecompletionmaster_Form.get('profileid').value;
        if (profileid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstprofilecompletionmaster_service.delete_mstprofilecompletionmaster(profileid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.mstprofilecompletionmaster_Form.patchValue({
            profileid: null
        });
        if (this.formData.profileid != null)
            this.formData.profileid = null;
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
                        this.mstprofilecompletionmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstprofilecompletionmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstprofilecompletionmaster_Form.controls[key] != undefined) {
                                this.mstprofilecompletionmaster_Form.controls[key].disable({ onlySelf: true });
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
    edit_mstprofilecompletionmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.mstprofilecompletionmaster_service.get_mstprofilecompletionmasters_ByEID().then(res => {
                this.spinner.hide();
                this.formData = res.mstprofilecompletionmaster;
                let formproperty = res.mstprofilecompletionmaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.mstprofilecompletionmaster.pkcol;
                this.formid = res.mstprofilecompletionmaster.profileid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.mstprofilecompletionmaster;
        this.formid = res.mstprofilecompletionmaster.profileid;
        this.pkcol = res.mstprofilecompletionmaster.pkcol;
        this.bmyrecord = false;
        if (res.mstprofilecompletionmaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.mstprofilecompletionmaster_Form.patchValue({
            profileid: res.mstprofilecompletionmaster.profileid,
            generalinformation: res.mstprofilecompletionmaster.generalinformation,
            education: res.mstprofilecompletionmaster.education,
            career: res.mstprofilecompletionmaster.career,
            skill: res.mstprofilecompletionmaster.skill,
            photo: res.mstprofilecompletionmaster.photo,
            language: res.mstprofilecompletionmaster.language,
            geography: res.mstprofilecompletionmaster.geography,
            achievements: res.mstprofilecompletionmaster.achievements,
            displayprofile: res.mstprofilecompletionmaster.displayprofile,
            statuscrimp: res.mstprofilecompletionmaster.statuscrimp,
            reference: res.mstprofilecompletionmaster.reference,
            worksdone: res.mstprofilecompletionmaster.worksdone,
            socialmedia: res.mstprofilecompletionmaster.socialmedia,
            status: res.mstprofilecompletionmaster.status,
            statusdesc: res.mstprofilecompletionmaster.statusdesc,
        });
        this.mstprofilecompletionmaster_menuactions = res.mstprofilecompletionmaster_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.mstprofilecompletionmaster_Form.controls) {
            let val = this.mstprofilecompletionmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.mstprofilecompletionmaster_Form.controls[key] != null) {
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
            if (!this.mstprofilecompletionmaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.mstprofilecompletionmaster_Form.getRawValue();
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
            // Object.keys(this.mstprofilecompletionmaster_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.mstprofilecompletionmaster_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.mstprofilecompletionmaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.mstprofilecompletionmaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.mstprofilecompletionmaster_Form.controls[key] != null) {
                            this.formData[key] = this.mstprofilecompletionmaster_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.mstprofilecompletionmaster_service.saveOrUpdate_mstprofilecompletionmasters(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.mstprofilecompletionmaster);
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
                        this.objvalues.push(res.mstprofilecompletionmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstprofilecompletionmaster_Form.markAsUntouched();
                this.mstprofilecompletionmaster_Form.markAsPristine();
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
mstprofilecompletionmasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_mstprofilecompletionmaster_service__WEBPACK_IMPORTED_MODULE_1__.mstprofilecompletionmasterService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
mstprofilecompletionmasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-mstprofilecompletionmaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstprofilecompletionmaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], mstprofilecompletionmasterComponent);



/***/ }),

/***/ 88123:
/*!*********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstprofilecompletionmaster/mstprofilecompletionmaster.module.ts ***!
  \*********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstprofilecompletionmasterModule": () => (/* binding */ mstprofilecompletionmasterModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstprofilecompletionmaster_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstprofilecompletionmaster.routing */ 45574);
/* harmony import */ var _mstprofilecompletionmaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstprofilecompletionmaster.component */ 14892);






let mstprofilecompletionmasterModule = class mstprofilecompletionmasterModule {
};
mstprofilecompletionmasterModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstprofilecompletionmaster_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstprofilecompletionmaster_component__WEBPACK_IMPORTED_MODULE_3__.mstprofilecompletionmasterComponent]
    })
], mstprofilecompletionmasterModule);



/***/ }),

/***/ 45574:
/*!**********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstprofilecompletionmaster/mstprofilecompletionmaster.routing.ts ***!
  \**********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstprofilecompletionmaster_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstprofilecompletionmaster.component */ 14892);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstprofilecompletionmasters', children: [
            { path: '', component: _mstprofilecompletionmaster_component__WEBPACK_IMPORTED_MODULE_0__.mstprofilecompletionmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', pathMatch: 'prefix', component: _mstprofilecompletionmaster_component__WEBPACK_IMPORTED_MODULE_0__.mstprofilecompletionmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid/menu/:menuhide', pathMatch: 'prefix', component: _mstprofilecompletionmaster_component__WEBPACK_IMPORTED_MODULE_0__.mstprofilecompletionmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstprofilecompletionmaster_component__WEBPACK_IMPORTED_MODULE_0__.mstprofilecompletionmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstprofilecompletionmaster_component__WEBPACK_IMPORTED_MODULE_0__.mstprofilecompletionmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 3684:
/*!***************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/mstprofilecompletionmaster.service.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstprofilecompletionmasterService": () => (/* binding */ mstprofilecompletionmasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let mstprofilecompletionmasterService = class mstprofilecompletionmasterService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_mstprofilecompletionmasters(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstprofilecompletionmaster', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstprofilecompletionmaster' + '/getdefaultdata').toPromise();
        }
    }
    get_mstprofilecompletionmasters_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstprofilecompletionmaster').toPromise();
        }
    }
    getListBy_profileid(profileid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstprofilecompletionmaster' + '/profileid/' + profileid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstprofilecompletionmaster' + '/param/' + key).toPromise();
        }
    }
    get_mstprofilecompletionmasters_ByEID() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstprofilecompletionmaster').toPromise();
        }
    }
    get_mstprofilecompletionmasters_ByID() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstprofilecompletionmaster').toPromise();
        }
    }
    delete_mstprofilecompletionmaster(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/mstprofilecompletionmaster' + '/' + id).toPromise();
        }
    }
};
mstprofilecompletionmasterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
mstprofilecompletionmasterService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], mstprofilecompletionmasterService);



/***/ }),

/***/ 52907:
/*!*****************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/mstprofilecompletionmaster/mstprofilecompletionmaster.component.html ***!
  \*****************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"mstprofilecompletionmaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Profile Completion Masters' |\r\n        translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <ng-container *ngFor=\"let action of mstprofilecompletionmaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <app-action *ngIf=\"f.profileid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.profileid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('generalinformation') == -1) && (generalinformationvisible==undefined || generalinformationvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"generalinformation\" class=\"control-label\">General Information</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.generalinformation?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"generalinformation\" formControlName=\"generalinformation\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('education') == -1) && (educationvisible==undefined || educationvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"education\" class=\"control-label\">Education</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.education?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"education\" formControlName=\"education\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('career') == -1) && (careervisible==undefined || careervisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"career\" class=\"control-label\">Career</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.career?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"career\" formControlName=\"career\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('skill') == -1) && (skillvisible==undefined || skillvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"skill\" class=\"control-label\">Skill</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.skill?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"skill\" formControlName=\"skill\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('photo') == -1) && (photovisible==undefined || photovisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"photo\" class=\"control-label\">Photo</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.photo?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"photo\" formControlName=\"photo\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('language') == -1) && (languagevisible==undefined || languagevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"language\" class=\"control-label\">Language</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.language?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"language\" formControlName=\"language\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('geography') == -1) && (geographyvisible==undefined || geographyvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"geography\" class=\"control-label\">Geography</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.geography?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"geography\" formControlName=\"geography\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('achievements') == -1) && (achievementsvisible==undefined || achievementsvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"achievements\" class=\"control-label\">Achievements</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.achievements?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"achievements\" formControlName=\"achievements\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('displayprofile') == -1) && (displayprofilevisible==undefined || displayprofilevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"displayprofile\" class=\"control-label\">Display Profile</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.displayprofile?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"displayprofile\" formControlName=\"displayprofile\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('statuscrimp') == -1) && (statuscrimpvisible==undefined || statuscrimpvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"statuscrimp\" class=\"control-label\">Status Crimp</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.statuscrimp?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"statuscrimp\" formControlName=\"statuscrimp\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('reference') == -1) && (referencevisible==undefined || referencevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"reference\" class=\"control-label\">Reference</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.reference?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"reference\" formControlName=\"reference\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('worksdone') == -1) && (worksdonevisible==undefined || worksdonevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"worksdone\" class=\"control-label\">Works Done</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.worksdone?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"worksdone\" formControlName=\"worksdone\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('socialmedia') == -1) && (socialmediavisible==undefined || socialmediavisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"socialmedia\" class=\"control-label\">Social Media</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.socialmedia?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"socialmedia\" formControlName=\"socialmedia\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_mstprofilecompletionmaster_mstprofilecompletionma-279546.js.map