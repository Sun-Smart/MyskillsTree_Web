"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_bocompanymaster_bocompanymaster_module_ts"],{

/***/ 36119:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bocompanyholiday/bocompanyholiday.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bocompanyholidayComponent": () => (/* binding */ bocompanyholidayComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bocompanyholiday_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bocompanyholiday.component.html */ 29526);
/* harmony import */ var _service_bocompanyholiday_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bocompanyholiday.service */ 1519);
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

let bocompanyholidayComponent = class bocompanyholidayComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bocompanyholiday_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bocompanyholiday_service = bocompanyholiday_service;
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
        this.bfilterPopulate_bocompanyholidays = false;
        this.bocompanyholiday_menuactions = [];
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
        this.bocompanyholiday_Form = this.fb.group({
            pk: [null],
            holidayid: [null],
            financialyearid: [null],
            financialyeariddesc: [null],
            holidaydate: [null],
            holidayday: [null],
            holidaydaydesc: [null],
            reason: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bocompanyholiday_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bocompanyholiday_Form.dirty && this.bocompanyholiday_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.holidayid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.holidayid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.holidayid && pkDetail) {
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
            let bocompanyholidayid = null;
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
            this.formid = bocompanyholidayid;
            //alert(bocompanyholidayid);
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
            this.bocompanyholiday_service.getDefaultData().then(res => {
                this.financialyearid_List = res.list_financialyearid.value;
                this.holidayday_List = res.list_holidayday.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bocompanyholiday_service.get_bocompanyholidays_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bocompanyholiday_Form.markAsUntouched();
            this.bocompanyholiday_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.bocompanyholiday_Form != null)
            this.bocompanyholiday_Form.reset();
        this.bocompanyholiday_Form.patchValue({
            financialyearid: this.sessionData.finyearid,
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let holidayid = this.bocompanyholiday_Form.get('holidayid').value;
        if (holidayid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bocompanyholiday_service.delete_bocompanyholiday(holidayid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bocompanyholiday_Form.patchValue({
            holidayid: null
        });
        if (this.formData.holidayid != null)
            this.formData.holidayid = null;
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
                    else if (key == "holidaydate")
                        this.bocompanyholiday_Form.patchValue({ "holidaydate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.bocompanyholiday_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bocompanyholiday_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bocompanyholiday_Form.controls[key] != undefined) {
                                this.bocompanyholiday_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.holidaydate != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.holidaydate != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    financialyearid_onChange(evt) {
        let e = evt.value;
        this.bocompanyholiday_Form.patchValue({ financialyeariddesc: evt.options[evt.options.selectedIndex].text });
    }
    holidayday_onChange(evt) {
        let e = this.f.holidayday.value;
        this.bocompanyholiday_Form.patchValue({ holidaydaydesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_bocompanyholidays() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bocompanyholiday_service.get_bocompanyholidays_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bocompanyholiday;
                let formproperty = res.bocompanyholiday.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bocompanyholiday.pkcol;
                this.formid = res.bocompanyholiday.holidayid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bocompanyholiday;
        this.formid = res.bocompanyholiday.holidayid;
        this.pkcol = res.bocompanyholiday.pkcol;
        this.bmyrecord = false;
        if (res.bocompanyholiday.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bocompanyholiday_Form.patchValue({
            holidayid: res.bocompanyholiday.holidayid,
            financialyearid: res.bocompanyholiday.financialyearid,
            financialyeariddesc: res.bocompanyholiday.financialyeariddesc,
            holidaydate: this.ngbDateParserFormatter.parse(res.bocompanyholiday.holidaydate),
            holidayday: res.bocompanyholiday.holidayday,
            holidaydaydesc: res.bocompanyholiday.holidaydaydesc,
            reason: res.bocompanyholiday.reason,
            status: res.bocompanyholiday.status,
            statusdesc: res.bocompanyholiday.statusdesc,
        });
        this.bocompanyholiday_menuactions = res.bocompanyholiday_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bocompanyholiday_Form.controls) {
            let val = this.bocompanyholiday_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bocompanyholiday_Form.controls[key] != null) {
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
            if (!this.bocompanyholiday_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bocompanyholiday_Form.getRawValue();
            obj.holidaydate = new Date(this.bocompanyholiday_Form.get('holidaydate').value ? this.ngbDateParserFormatter.format(this.bocompanyholiday_Form.get('holidaydate').value) + '  UTC' : null);
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
            // Object.keys(this.bocompanyholiday_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bocompanyholiday_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bocompanyholiday_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bocompanyholiday_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bocompanyholiday_Form.controls[key] != null) {
                            this.formData[key] = this.bocompanyholiday_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.holidaydate = new Date(this.bocompanyholiday_Form.get('holidaydate').value ? this.ngbDateParserFormatter.format(this.bocompanyholiday_Form.get('holidaydate').value) + '  UTC' : null);
            console.log(this.formData);
            this.spinner.show();
            this.bocompanyholiday_service.saveOrUpdate_bocompanyholidays(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bocompanyholiday);
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
                        this.objvalues.push(res.bocompanyholiday);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bocompanyholiday_Form.markAsUntouched();
                this.bocompanyholiday_Form.markAsPristine();
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
bocompanyholidayComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_bocompanyholiday_service__WEBPACK_IMPORTED_MODULE_1__.bocompanyholidayService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
bocompanyholidayComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-bocompanyholiday',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bocompanyholiday_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], bocompanyholidayComponent);



/***/ }),

/***/ 13284:
/*!*************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bocompanyholiday/bocompanyholiday.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bocompanyholidayModule": () => (/* binding */ bocompanyholidayModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _bocompanyholiday_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bocompanyholiday.routing */ 30256);
/* harmony import */ var _bocompanyholiday_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bocompanyholiday.component */ 36119);






let bocompanyholidayModule = class bocompanyholidayModule {
};
bocompanyholidayModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _bocompanyholiday_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_bocompanyholiday_component__WEBPACK_IMPORTED_MODULE_3__.bocompanyholidayComponent]
    })
], bocompanyholidayModule);



/***/ }),

/***/ 30256:
/*!**************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bocompanyholiday/bocompanyholiday.routing.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _bocompanyholiday_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bocompanyholiday.component */ 36119);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'bocompanyholidays', children: [
            { path: '', component: _bocompanyholiday_component__WEBPACK_IMPORTED_MODULE_0__.bocompanyholidayComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _bocompanyholiday_component__WEBPACK_IMPORTED_MODULE_0__.bocompanyholidayComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _bocompanyholiday_component__WEBPACK_IMPORTED_MODULE_0__.bocompanyholidayComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _bocompanyholiday_component__WEBPACK_IMPORTED_MODULE_0__.bocompanyholidayComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 56177:
/*!**************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bocompanymaster/bocompanymaster.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bocompanymasterComponent": () => (/* binding */ bocompanymasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bocompanymaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bocompanymaster.component.html */ 34424);
/* harmony import */ var _service_bocompanymaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bocompanymaster.service */ 27476);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component */ 55163);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_bocompanyholiday_bocompanyholiday_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/bocompanyholiday/bocompanyholiday.component */ 36119);
/* harmony import */ var _service_bocompanyholiday_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/bocompanyholiday.service */ 1519);
/* harmony import */ var _pages_forms_bofinancialyear_bofinancialyear_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/bofinancialyear/bofinancialyear.component */ 96922);
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

//child table



//Shortcuts

//translator






//primeng services



//session,application constants




//custom fields & attachments


let bocompanymasterComponent = class bocompanymasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bocompanymaster_service, bocompanyholiday_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bocompanymaster_service = bocompanymaster_service;
        this.bocompanyholiday_service = bocompanyholiday_service;
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
        this.bfilterPopulate_bocompanymasters = false;
        this.bfilterPopulate_bocompanyholidays = false;
        this.bfilterPopulate_bofinancialyears = false;
        this.bocompanymaster_menuactions = [];
        this.bocompanyholiday_menuactions = [];
        this.bofinancialyear_menuactions = [];
        this.countryid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.stateid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.cityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.locationid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.shippingcountryid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.shippingstateid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.shippingcityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_11__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_11__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_bocompanyholiday_IDs = "";
        this.bocompanyholidays_ID = "1";
        this.Deleted_bofinancialyear_IDs = "";
        this.bofinancialyears_ID = "2";
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
        this.bocompanymaster_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            companyid: [null],
            code: [null],
            companyname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.required])],
            registrationnumber: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.required])],
            companytype: [null],
            companytypedesc: [null],
            companylogo: [null],
            website: [null],
            phone: [null],
            email: [null],
            address1: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_14__.Validators.required])],
            address2: [null],
            countryid: [null],
            countryiddesc: [null],
            stateid: [null],
            stateiddesc: [null],
            cityid: [null],
            cityiddesc: [null],
            locationid: [null],
            locationiddesc: [null],
            pincode: [null],
            contactname: [null],
            designation: [null],
            designationdesc: [null],
            cpphone: [null],
            cpemail: [null],
            incorporationdate: [null],
            businesssegment: [null],
            businesssegmentdesc: [null],
            details: [null],
            services: [null],
            startdate: [null],
            enddate: [null],
            bankid: [null],
            chartofaccounts: [null],
            shippingaddress1: [null],
            shippingaddress2: [null],
            shippingcountryid: [null],
            shippingcountryiddesc: [null],
            shippingstateid: [null],
            shippingstateiddesc: [null],
            shippingcityid: [null],
            shippingcityiddesc: [null],
            shippingpincode: [null],
            basecurrency: [null],
            basecurrencydesc: [null],
            gstregistrationtype: [null],
            gstregistrationtypedesc: [null],
            gstinnumber: [null],
            pannumber: [null],
            trnnumber: [null],
            tan: [null],
            cst: [null],
            salestax: [null],
            servicetax: [null],
            tin: [null],
            localtax: [null],
            accountstartdate: [null],
            numberofusers: [null],
            starttime: [null],
            endtime: [null],
            weekoff1: [null],
            weekoff1desc: [null],
            weekoff2: [null],
            weekoff2desc: [null],
            facebookaccountname: [null],
            facebookaccounturl: [null],
            twitteraccountname: [null],
            twitteraccounturl: [null],
            linkedinaccountname: [null],
            linkedinaccounturl: [null],
            instagramaccountname: [null],
            instagramaccounturl: [null],
            brandname: [null],
            mailingemailaddress: [null],
            mailingsendername: [null],
            localization: [null],
            localizationdesc: [null],
            timezone: [null],
            timezonedesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bocompanymaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bocompanymaster_Form.dirty && this.bocompanymaster_Form.touched) {
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
    companynameexists(e) {
        debugger;
        let pos = this.pkList.map(function (e) { return e.companyname.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
        if (pos >= 0 && this.pkList[pos].companyid.toString() != this.formid.toString()) {
            if (confirm("This Company Name value exists in the database.Do you want to display the record ? ")) {
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
    registrationnumberexists(e) {
        debugger;
        let pos = this.pkList.map(function (e) { return e.registrationnumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
        if (pos >= 0 && this.pkList[pos].companyid.toString() != this.formid.toString()) {
            if (confirm("This Registration Number value exists in the database.Do you want to display the record ? ")) {
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
        let pos = this.pkList.map(function (e) { return e.companyid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.companyid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.companyid && pkDetail) {
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
            let bocompanymasterid = null;
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
            this.formid = bocompanymasterid;
            //alert(bocompanymasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bocompanyholidays_TableConfig();
                setTimeout(() => {
                    //this.Set_bocompanyholidays_TableDropDownConfig();
                });
                this.Set_bofinancialyears_TableConfig();
                setTimeout(() => {
                    //this.Set_bofinancialyears_TableDropDownConfig();
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
            this.bocompanymaster_service.getDefaultData().then(res => {
                this.companytype_List = res.list_companytype.value;
                this.countryid_List = res.list_countryid.value;
                this.designation_List = res.list_designation.value;
                this.businesssegment_List = res.list_businesssegment.value;
                this.shippingcountryid_List = res.list_shippingcountryid.value;
                this.shippingstateid_List = res.list_shippingstateid.value;
                this.shippingcityid_List = res.list_shippingcityid.value;
                this.basecurrency_List = res.list_basecurrency.value;
                this.gstregistrationtype_List = res.list_gstregistrationtype.value;
                this.weekoff1_List = res.list_weekoff1.value;
                this.weekoff2_List = res.list_weekoff2.value;
                this.localization_List = res.list_localization.value;
                this.timezone_List = res.list_timezone.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bocompanymaster_service.get_bocompanymasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bocompanymaster_Form.markAsUntouched();
            this.bocompanymaster_Form.markAsPristine();
        });
    }
    onSelected_countryid(countryidDetail) {
        if (countryidDetail.value && countryidDetail) {
            this.bocompanymaster_Form.patchValue({
                countryid: countryidDetail.value,
                countryiddesc: countryidDetail.label,
            });
            this.bocompanymaster_service.getList_stateid(countryidDetail.value).then(res => {
                this.stateid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_stateid(stateidDetail) {
        if (stateidDetail.value && stateidDetail) {
            this.bocompanymaster_Form.patchValue({
                stateid: stateidDetail.value,
                stateiddesc: stateidDetail.label,
            });
            this.bocompanymaster_service.getList_cityid(stateidDetail.value).then(res => {
                this.cityid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_cityid(cityidDetail) {
        if (cityidDetail.value && cityidDetail) {
            this.bocompanymaster_Form.patchValue({
                cityid: cityidDetail.value,
                cityiddesc: cityidDetail.label,
            });
            this.bocompanymaster_service.getList_locationid(cityidDetail.value).then(res => {
                this.locationid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_locationid(locationidDetail) {
        if (locationidDetail.value && locationidDetail) {
            this.bocompanymaster_Form.patchValue({
                locationid: locationidDetail.value,
                locationiddesc: locationidDetail.label,
            });
        }
    }
    onSelected_shippingcountryid(shippingcountryidDetail) {
        if (shippingcountryidDetail.value && shippingcountryidDetail) {
            this.bocompanymaster_Form.patchValue({
                shippingcountryid: shippingcountryidDetail.value,
                shippingcountryiddesc: shippingcountryidDetail.label,
            });
        }
    }
    onSelected_shippingstateid(shippingstateidDetail) {
        if (shippingstateidDetail.value && shippingstateidDetail) {
            this.bocompanymaster_Form.patchValue({
                shippingstateid: shippingstateidDetail.value,
                shippingstateiddesc: shippingstateidDetail.label,
            });
        }
    }
    onSelected_shippingcityid(shippingcityidDetail) {
        if (shippingcityidDetail.value && shippingcityidDetail) {
            this.bocompanymaster_Form.patchValue({
                shippingcityid: shippingcityidDetail.value,
                shippingcityiddesc: shippingcityidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.bocompanymaster_Form != null)
            this.bocompanymaster_Form.reset();
        this.bocompanymaster_Form.patchValue({});
        this.bocompanymaster_Form.patchValue({
            companyname: "xxxx",
            countryid: 1,
            stateid: 1,
            incorporationdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            startdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            enddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            accountstartdate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        });
        setTimeout(() => {
            this.bocompanyholidays_LoadTable();
            this.bofinancialyears_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let companyid = this.bocompanymaster_Form.get('companyid').value;
        if (companyid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bocompanymaster_service.delete_bocompanymaster(companyid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bocompanymaster_Form.patchValue({
            companyid: null
        });
        if (this.formData.companyid != null)
            this.formData.companyid = null;
        for (let i = 0; i < this.tbl_bocompanyholidays.source.length; i++) {
            this.tbl_bocompanyholidays.source[i].holidayid = null;
        }
        for (let i = 0; i < this.tbl_bofinancialyears.source.length; i++) {
            this.tbl_bofinancialyears.source[i].finyearid = null;
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
                    else if (key == "incorporationdate")
                        this.bocompanymaster_Form.patchValue({ "incorporationdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "startdate")
                        this.bocompanymaster_Form.patchValue({ "startdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "enddate")
                        this.bocompanymaster_Form.patchValue({ "enddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "accountstartdate")
                        this.bocompanymaster_Form.patchValue({ "accountstartdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "starttime")
                        this.bocompanymaster_Form.patchValue({ "starttime": new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(mainscreendata[key]) });
                    else if (key == "endtime")
                        this.bocompanymaster_Form.patchValue({ "endtime": new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.bocompanymaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bocompanymaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bocompanymaster_Form.controls[key] != undefined) {
                                this.bocompanymaster_Form.controls[key].disable({ onlySelf: true });
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
            return this.customfieldservice.getcustomfieldconfigurationsByTable("bocompanymasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    goBack() {
        this.router.navigate(['/home/boreportviewer/whwfe']);
    }
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.companyname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.companyname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    companytype_onChange(evt) {
        let e = this.f.companytype.value;
        this.bocompanymaster_Form.patchValue({ companytypedesc: evt.options[evt.options.selectedIndex].text });
    }
    countryid_onChange(evt) {
        let e = evt.value;
    }
    stateid_onChange(evt) {
        let e = evt.value;
    }
    cityid_onChange(evt) {
        let e = evt.value;
    }
    locationid_onChange(evt) {
        let e = evt.value;
    }
    designation_onChange(evt) {
        let e = evt.value;
        this.bocompanymaster_Form.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
    }
    businesssegment_onChange(evt) {
        let e = this.f.businesssegment.value;
        this.bocompanymaster_Form.patchValue({ businesssegmentdesc: evt.options[evt.options.selectedIndex].text });
    }
    shippingcountryid_onChange(evt) {
        let e = evt.value;
    }
    shippingstateid_onChange(evt) {
        let e = evt.value;
    }
    shippingcityid_onChange(evt) {
        let e = evt.value;
    }
    basecurrency_onChange(evt) {
        let e = this.f.basecurrency.value;
        this.bocompanymaster_Form.patchValue({ basecurrencydesc: evt.options[evt.options.selectedIndex].text });
    }
    gstregistrationtype_onChange(evt) {
        let e = this.f.gstregistrationtype.value;
        this.bocompanymaster_Form.patchValue({ gstregistrationtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    weekoff1_onChange(evt) {
        let e = this.f.weekoff1.value;
        this.bocompanymaster_Form.patchValue({ weekoff1desc: evt.options[evt.options.selectedIndex].text });
    }
    weekoff2_onChange(evt) {
        let e = this.f.weekoff2.value;
        this.bocompanymaster_Form.patchValue({ weekoff2desc: evt.options[evt.options.selectedIndex].text });
    }
    localization_onChange(evt) {
        let e = this.f.localization.value;
        this.bocompanymaster_Form.patchValue({ localizationdesc: evt.options[evt.options.selectedIndex].text });
    }
    timezone_onChange(evt) {
        let e = this.f.timezone.value;
        this.bocompanymaster_Form.patchValue({ timezonedesc: evt.options[evt.options.selectedIndex].text });
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
    edit_bocompanymasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bocompanymaster_service.get_bocompanymasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bocompanymaster;
                let formproperty = res.bocompanymaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bocompanymaster.pkcol;
                this.formid = res.bocompanymaster.companyid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bocompanymaster;
        this.formid = res.bocompanymaster.companyid;
        this.pkcol = res.bocompanymaster.pkcol;
        this.bmyrecord = false;
        if (res.bocompanymaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        var starttimeTime = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(res.bocompanymaster.starttime);
        var endtimeTime = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(res.bocompanymaster.endtime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bocompanymaster_Form.patchValue({
            companyid: res.bocompanymaster.companyid,
            code: res.bocompanymaster.code,
            companyname: res.bocompanymaster.companyname,
            registrationnumber: res.bocompanymaster.registrationnumber,
            companytype: res.bocompanymaster.companytype,
            companytypedesc: res.bocompanymaster.companytypedesc,
            companylogo: res.bocompanymaster.companylogo,
            website: res.bocompanymaster.website,
            phone: res.bocompanymaster.phone,
            email: res.bocompanymaster.email,
            address1: res.bocompanymaster.address1,
            address2: res.bocompanymaster.address2,
            countryid: res.bocompanymaster.countryid,
            countryiddesc: res.bocompanymaster.countryiddesc,
            stateid: res.bocompanymaster.stateid,
            stateiddesc: res.bocompanymaster.stateiddesc,
            cityid: res.bocompanymaster.cityid,
            cityiddesc: res.bocompanymaster.cityiddesc,
            locationid: res.bocompanymaster.locationid,
            locationiddesc: res.bocompanymaster.locationiddesc,
            pincode: res.bocompanymaster.pincode,
            contactname: res.bocompanymaster.contactname,
            designation: res.bocompanymaster.designation,
            designationdesc: res.bocompanymaster.designationdesc,
            cpphone: res.bocompanymaster.cpphone,
            cpemail: res.bocompanymaster.cpemail,
            incorporationdate: this.ngbDateParserFormatter.parse(res.bocompanymaster.incorporationdate),
            businesssegment: res.bocompanymaster.businesssegment,
            businesssegmentdesc: res.bocompanymaster.businesssegmentdesc,
            details: res.bocompanymaster.details,
            services: res.bocompanymaster.services,
            startdate: this.ngbDateParserFormatter.parse(res.bocompanymaster.startdate),
            enddate: this.ngbDateParserFormatter.parse(res.bocompanymaster.enddate),
            bankid: res.bocompanymaster.bankid,
            chartofaccounts: res.bocompanymaster.chartofaccounts,
            shippingaddress1: res.bocompanymaster.shippingaddress1,
            shippingaddress2: res.bocompanymaster.shippingaddress2,
            shippingcountryid: res.bocompanymaster.shippingcountryid,
            shippingcountryiddesc: res.bocompanymaster.shippingcountryiddesc,
            shippingstateid: res.bocompanymaster.shippingstateid,
            shippingstateiddesc: res.bocompanymaster.shippingstateiddesc,
            shippingcityid: res.bocompanymaster.shippingcityid,
            shippingcityiddesc: res.bocompanymaster.shippingcityiddesc,
            shippingpincode: res.bocompanymaster.shippingpincode,
            basecurrency: res.bocompanymaster.basecurrency,
            basecurrencydesc: res.bocompanymaster.basecurrencydesc,
            gstregistrationtype: res.bocompanymaster.gstregistrationtype,
            gstregistrationtypedesc: res.bocompanymaster.gstregistrationtypedesc,
            gstinnumber: res.bocompanymaster.gstinnumber,
            pannumber: res.bocompanymaster.pannumber,
            trnnumber: res.bocompanymaster.trnnumber,
            tan: res.bocompanymaster.tan,
            cst: res.bocompanymaster.cst,
            salestax: res.bocompanymaster.salestax,
            servicetax: res.bocompanymaster.servicetax,
            tin: res.bocompanymaster.tin,
            localtax: res.bocompanymaster.localtax,
            accountstartdate: this.ngbDateParserFormatter.parse(res.bocompanymaster.accountstartdate),
            numberofusers: res.bocompanymaster.numberofusers,
            starttime: starttimeTime,
            endtime: endtimeTime,
            weekoff1: res.bocompanymaster.weekoff1,
            weekoff1desc: res.bocompanymaster.weekoff1desc,
            weekoff2: res.bocompanymaster.weekoff2,
            weekoff2desc: res.bocompanymaster.weekoff2desc,
            facebookaccountname: res.bocompanymaster.facebookaccountname,
            facebookaccounturl: res.bocompanymaster.facebookaccounturl,
            twitteraccountname: res.bocompanymaster.twitteraccountname,
            twitteraccounturl: res.bocompanymaster.twitteraccounturl,
            linkedinaccountname: res.bocompanymaster.linkedinaccountname,
            linkedinaccounturl: res.bocompanymaster.linkedinaccounturl,
            instagramaccountname: res.bocompanymaster.instagramaccountname,
            instagramaccounturl: res.bocompanymaster.instagramaccounturl,
            brandname: res.bocompanymaster.brandname,
            mailingemailaddress: res.bocompanymaster.mailingemailaddress,
            mailingsendername: res.bocompanymaster.mailingsendername,
            localization: res.bocompanymaster.localization,
            localizationdesc: res.bocompanymaster.localizationdesc,
            timezone: res.bocompanymaster.timezone,
            timezonedesc: res.bocompanymaster.timezonedesc,
            customfield: res.bocompanymaster.customfield,
            attachment: JSON.parse(res.bocompanymaster.attachment),
            status: res.bocompanymaster.status,
            statusdesc: res.bocompanymaster.statusdesc,
        });
        this.bocompanymaster_menuactions = res.bocompanymaster_menuactions;
        this.bocompanyholiday_menuactions = res.bocompanyholiday_menuactions;
        this.bocompanyholidays_visiblelist = res.bocompanyholidays_visiblelist;
        this.bofinancialyear_menuactions = res.bofinancialyear_menuactions;
        this.bofinancialyears_visiblelist = res.bofinancialyears_visiblelist;
        if (this.bocompanymaster_Form.get('customfield').value != null && this.bocompanymaster_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.bocompanymaster_Form.get('customfield').value);
        this.FillCustomField();
        if (this.bocompanymaster_Form.get('attachment').value != null && this.bocompanymaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.bocompanymaster_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.countryid.value && this.f.countryid.value != "" && this.f.countryid.value != null)
                this.bocompanymaster_service.getList_stateid(this.f.countryid.value).then(res => {
                    this.stateid_List = res;
                }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.stateid.value && this.f.stateid.value != "" && this.f.stateid.value != null)
                this.bocompanymaster_service.getList_cityid(this.f.stateid.value).then(res => {
                    this.cityid_List = res;
                }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.cityid.value && this.f.cityid.value != "" && this.f.cityid.value != null)
                this.bocompanymaster_service.getList_locationid(this.f.cityid.value).then(res => {
                    this.locationid_List = res;
                }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        this.Set_bocompanyholidays_TableConfig();
        this.bocompanyholidays_LoadTable(res.bocompanyholidays);
        this.Set_bofinancialyears_TableConfig();
        this.bofinancialyears_LoadTable(res.bofinancialyears);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bocompanymaster_Form.controls) {
            let val = this.bocompanymaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bocompanymaster_Form.controls[key] != null) {
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
            if (!this.bocompanymaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.bocompanymaster_Form.getRawValue();
            obj.incorporationdate = new Date(this.bocompanymaster_Form.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('incorporationdate').value) + '  UTC' : null);
            obj.startdate = new Date(this.bocompanymaster_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('startdate').value) + '  UTC' : null);
            obj.enddate = new Date(this.bocompanymaster_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('enddate').value) + '  UTC' : null);
            obj.accountstartdate = new Date(this.bocompanymaster_Form.get('accountstartdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('accountstartdate').value) + '  UTC' : null);
            obj.starttime = (this.bocompanymaster_Form.get('starttime').value == null ? 0 : this.bocompanymaster_Form.get('starttime').value.hour) + ':' + (this.bocompanymaster_Form.get('starttime').value == null ? 0 : this.bocompanymaster_Form.get('starttime').value.minute + ":00");
            obj.endtime = (this.bocompanymaster_Form.get('endtime').value == null ? 0 : this.bocompanymaster_Form.get('endtime').value.hour) + ':' + (this.bocompanymaster_Form.get('endtime').value == null ? 0 : this.bocompanymaster_Form.get('endtime').value.minute + ":00");
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
        var _a, _b, _c, _d;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.bocompanymaster_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bocompanymaster_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bocompanymaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bocompanymaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bocompanymaster_Form.controls[key] != null) {
                            this.formData[key] = this.bocompanymaster_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            this.formData.incorporationdate = new Date(this.bocompanymaster_Form.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('incorporationdate').value) + '  UTC' : null);
            this.formData.startdate = new Date(this.bocompanymaster_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('startdate').value) + '  UTC' : null);
            this.formData.enddate = new Date(this.bocompanymaster_Form.get('enddate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('enddate').value) + '  UTC' : null);
            this.formData.accountstartdate = new Date(this.bocompanymaster_Form.get('accountstartdate').value ? this.ngbDateParserFormatter.format(this.bocompanymaster_Form.get('accountstartdate').value) + '  UTC' : null);
            this.formData.starttime = (this.bocompanymaster_Form.get('starttime').value == null ? 0 : this.bocompanymaster_Form.get('starttime').value.hour) + ':' + (this.bocompanymaster_Form.get('starttime').value == null ? 0 : this.bocompanymaster_Form.get('starttime').value.minute + ":00");
            this.formData.endtime = (this.bocompanymaster_Form.get('endtime').value == null ? 0 : this.bocompanymaster_Form.get('endtime').value.hour) + ':' + (this.bocompanymaster_Form.get('endtime').value == null ? 0 : this.bocompanymaster_Form.get('endtime').value.minute + ":00");
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_bocompanyholiday_IDs = this.Deleted_bocompanyholiday_IDs;
            this.formData.Deleted_bofinancialyear_IDs = this.Deleted_bofinancialyear_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.bocompanymaster_service.saveOrUpdate_bocompanymasters(this.formData, (_b = (_a = this.tbl_bocompanyholidays) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_bofinancialyears) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_bocompanyholidays.source) {
                    for (let i = 0; i < this.tbl_bocompanyholidays.source.data.length; i++) {
                        if (this.tbl_bocompanyholidays.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bocompanyholidays.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_bofinancialyears.source) {
                    for (let i = 0; i < this.tbl_bofinancialyears.source.data.length; i++) {
                        if (this.tbl_bofinancialyears.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bofinancialyears.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bocompanymaster);
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
                        this.objvalues.push(res.bocompanymaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bocompanymaster_Form.markAsUntouched();
                this.bocompanymaster_Form.markAsPristine();
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
        this.tbl_bocompanyholidays.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
        this.tbl_bofinancialyears.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
    }
    AddOrEdit_bocompanyholiday(event, holidayid, companyid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_bocompanyholiday_bocompanyholiday_component__WEBPACK_IMPORTED_MODULE_5__.bocompanyholidayComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, holidayid, companyid, visiblelist: this.bocompanyholidays_visiblelist, hidelist: this.bocompanyholidays_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bocompanyholidays.source.add(res[i]);
                    }
                    this.tbl_bocompanyholidays.source.refresh();
                }
                else {
                    this.tbl_bocompanyholidays.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_bocompanyholiday(event, childID, i) {
        if (childID != null)
            this.Deleted_bocompanyholiday_IDs += childID + ",";
        this.tbl_bocompanyholidays.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_bofinancialyear(event, finyearid, companyid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_bofinancialyear_bofinancialyear_component__WEBPACK_IMPORTED_MODULE_7__.bofinancialyearComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, finyearid, companyid, visiblelist: this.bofinancialyears_visiblelist, hidelist: this.bofinancialyears_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bofinancialyears.source.add(res[i]);
                    }
                    this.tbl_bofinancialyears.source.refresh();
                }
                else {
                    this.tbl_bofinancialyears.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_bofinancialyear(event, childID, i) {
        if (childID != null)
            this.Deleted_bofinancialyear_IDs += childID + ",";
        this.tbl_bofinancialyears.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_bocompanyholidays_Checkbox() {
        debugger;
        if (this.tbl_bocompanyholidays.source.settings['selectMode'] == 'multi')
            this.tbl_bocompanyholidays.source.settings['selectMode'] = 'single';
        else
            this.tbl_bocompanyholidays.source.settings['selectMode'] = 'multi';
        this.tbl_bocompanyholidays.source.initGrid();
    }
    delete_bocompanyholidays_All() {
        this.tbl_bocompanyholidays.source.settings['selectMode'] = 'single';
    }
    show_bocompanyholidays_Filter() {
        setTimeout(() => {
            //  this.Set_bocompanyholidays_TableDropDownConfig();
        });
        if (this.tbl_bocompanyholidays.source.settings != null)
            this.tbl_bocompanyholidays.source.settings['hideSubHeader'] = !this.tbl_bocompanyholidays.source.settings['hideSubHeader'];
        this.tbl_bocompanyholidays.source.initGrid();
    }
    show_bocompanyholidays_InActive() {
    }
    enable_bocompanyholidays_InActive() {
    }
    Set_bocompanyholidays_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bocompanyholidays) {
                var clone = this.sharedService.clone(this.tbl_bocompanyholidays.source.settings);
                if (clone.columns['financialyearid'] != undefined)
                    clone.columns['financialyearid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bocompanyholidays_financialyearid.value)), }, };
                if (clone.columns['financialyearid'] != undefined)
                    clone.columns['financialyearid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bocompanyholidays_financialyearid.value)), }, };
                this.tbl_bocompanyholidays.source.settings = clone;
                this.tbl_bocompanyholidays.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bocompanyholidays.source.settings);
                if (clone.columns['holidayday'] != undefined)
                    clone.columns['holidayday'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bocompanyholidays_holidayday.value)), }, };
                if (clone.columns['holidayday'] != undefined)
                    clone.columns['holidayday'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bocompanyholidays_holidayday.value)), }, };
                this.tbl_bocompanyholidays.source.settings = clone;
                this.tbl_bocompanyholidays.source.initGrid();
            }
            this.bfilterPopulate_bocompanyholidays = true;
        });
    }
    bocompanyholidays_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bocompanyholidays_TableConfig() {
        this.bocompanyholidays_settings = {
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
                custom: this.bocompanyholiday_menuactions
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
                financialyeariddesc: {
                    title: 'Financial Year',
                    type: 'html',
                    filter: true,
                },
                holidaydate: {
                    title: 'Holiday Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                holidaydaydesc: {
                    title: 'Holiday Day',
                    type: 'html',
                    filter: true,
                },
                reason: {
                    title: 'Reason',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    bocompanyholidays_LoadTable(bocompanyholidays = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bocompanyholidays_ID) >= 0) {
            if (this.tbl_bocompanyholidays != undefined)
                this.tbl_bocompanyholidays.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
            if (this.tbl_bocompanyholidays != undefined)
                this.tbl_bocompanyholidays.source.load(bocompanyholidays);
            if (this.tbl_bocompanyholidays != undefined)
                this.tbl_bocompanyholidays.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    bocompanyholidays_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bocompanymaster_service.bocompanyholidays.length == 0)
    {
        this.tbl_bocompanyholidays.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bocompanyholiday();
        this.bocompanymaster_service.bocompanyholidays.push(obj);
        this.tbl_bocompanyholidays.source.refresh();
        if ((this.bocompanymaster_service.bocompanyholidays.length / this.tbl_bocompanyholidays.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bocompanyholidays.source.getPaging().page)
        {
            this.tbl_bocompanyholidays.source.setPage((this.bocompanymaster_service.bocompanyholidays.length / this.tbl_bocompanyholidays.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bocompanyholidays.source.grid.edit(this.tbl_bocompanyholidays.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bocompanyholidays.source.data.indexOf(event.data);
    this.onDelete_bocompanyholiday(event,event.data.holidayid,((this.tbl_bocompanyholidays.source.getPaging().page-1) *this.tbl_bocompanyholidays.source.getPaging().perPage)+index);
    this.tbl_bocompanyholidays.source.refresh();
    break;
    }
    }
    
    */
    bocompanyholidays_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_bocompanyholiday(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bocompanyholiday(event, event.data.holidayid, this.formid);
                break;
            case 'delete':
                this.onDelete_bocompanyholiday(event, event.data.holidayid, ((this.tbl_bocompanyholidays.source.getPaging().page - 1) * this.tbl_bocompanyholidays.source.getPaging().perPage) + event.index);
                this.tbl_bocompanyholidays.source.refresh();
                break;
        }
    }
    bocompanyholidays_onDelete(obj) {
        let holidayid = obj.data.holidayid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bocompanymaster_service.delete_bocompanymaster(holidayid).then(res => this.bocompanyholidays_LoadTable());
        }
    }
    onCustom_bocompanyholidays_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bocompanyholidays");
            let formname = objbomenuaction.actionname;
        });
    }
    bocompanyholidays_Paging(val) {
        debugger;
        this.tbl_bocompanyholidays.source.setPaging(1, val, true);
    }
    handle_bocompanyholidays_GridSelected(event) {
        this.bocompanyholidays_selectedindex = this.tbl_bocompanyholidays.source.findIndex(i => i.holidayid === event.data.holidayid);
    }
    Is_bocompanyholidays_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bocompanyholidays_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_bofinancialyears_Checkbox() {
        debugger;
        if (this.tbl_bofinancialyears.source.settings['selectMode'] == 'multi')
            this.tbl_bofinancialyears.source.settings['selectMode'] = 'single';
        else
            this.tbl_bofinancialyears.source.settings['selectMode'] = 'multi';
        this.tbl_bofinancialyears.source.initGrid();
    }
    delete_bofinancialyears_All() {
        this.tbl_bofinancialyears.source.settings['selectMode'] = 'single';
    }
    show_bofinancialyears_Filter() {
        setTimeout(() => {
            //  this.Set_bofinancialyears_TableDropDownConfig();
        });
        if (this.tbl_bofinancialyears.source.settings != null)
            this.tbl_bofinancialyears.source.settings['hideSubHeader'] = !this.tbl_bofinancialyears.source.settings['hideSubHeader'];
        this.tbl_bofinancialyears.source.initGrid();
    }
    show_bofinancialyears_InActive() {
    }
    enable_bofinancialyears_InActive() {
    }
    Set_bofinancialyears_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bofinancialyears) {
            }
            this.bfilterPopulate_bofinancialyears = true;
        });
    }
    bofinancialyears_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bofinancialyears_TableConfig() {
        this.bofinancialyears_settings = {
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
                custom: this.bofinancialyear_menuactions
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
                finyearname: {
                    title: 'Fin Year Name',
                    type: '',
                    filter: true,
                },
                startdate: {
                    title: 'Start Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                enddate: {
                    title: 'End Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                currentyear: {
                    title: 'Current Year',
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
            },
        };
    }
    bofinancialyears_LoadTable(bofinancialyears = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bofinancialyears_ID) >= 0) {
            if (this.tbl_bofinancialyears != undefined)
                this.tbl_bofinancialyears.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
            if (this.tbl_bofinancialyears != undefined)
                this.tbl_bofinancialyears.source.load(bofinancialyears);
            if (this.tbl_bofinancialyears != undefined)
                this.tbl_bofinancialyears.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    bofinancialyears_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bocompanymaster_service.bofinancialyears.length == 0)
    {
        this.tbl_bofinancialyears.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bofinancialyear();
        this.bocompanymaster_service.bofinancialyears.push(obj);
        this.tbl_bofinancialyears.source.refresh();
        if ((this.bocompanymaster_service.bofinancialyears.length / this.tbl_bofinancialyears.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bofinancialyears.source.getPaging().page)
        {
            this.tbl_bofinancialyears.source.setPage((this.bocompanymaster_service.bofinancialyears.length / this.tbl_bofinancialyears.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bofinancialyears.source.grid.edit(this.tbl_bofinancialyears.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bofinancialyears.source.data.indexOf(event.data);
    this.onDelete_bofinancialyear(event,event.data.finyearid,((this.tbl_bofinancialyears.source.getPaging().page-1) *this.tbl_bofinancialyears.source.getPaging().perPage)+index);
    this.tbl_bofinancialyears.source.refresh();
    break;
    }
    }
    
    */
    bofinancialyears_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_bofinancialyear(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bofinancialyear(event, event.data.finyearid, this.formid);
                break;
            case 'delete':
                this.onDelete_bofinancialyear(event, event.data.finyearid, ((this.tbl_bofinancialyears.source.getPaging().page - 1) * this.tbl_bofinancialyears.source.getPaging().perPage) + event.index);
                this.tbl_bofinancialyears.source.refresh();
                break;
        }
    }
    bofinancialyears_onDelete(obj) {
        let finyearid = obj.data.finyearid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bocompanymaster_service.delete_bocompanymaster(finyearid).then(res => this.bofinancialyears_LoadTable());
        }
    }
    onCustom_bofinancialyears_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bofinancialyears");
            let formname = objbomenuaction.actionname;
        });
    }
    bofinancialyears_Paging(val) {
        debugger;
        this.tbl_bofinancialyears.source.setPaging(1, val, true);
    }
    handle_bofinancialyears_GridSelected(event) {
        this.bofinancialyears_selectedindex = this.tbl_bofinancialyears.source.findIndex(i => i.finyearid === event.data.finyearid);
    }
    Is_bofinancialyears_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bofinancialyears_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
bocompanymasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_18__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_20__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_21__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_10__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_22__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__.DialogService },
    { type: _service_bocompanymaster_service__WEBPACK_IMPORTED_MODULE_1__.bocompanymasterService },
    { type: _service_bocompanyholiday_service__WEBPACK_IMPORTED_MODULE_6__.bocompanyholidayService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_14__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_8__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_9__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_12__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_24__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_21__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_25__.NgxSpinnerService }
];
bocompanymasterComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['customform', { static: false },] }],
    tbl_bocompanyholidays: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_bocompanyholidays', { static: false },] }],
    tbl_bofinancialyears: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_bofinancialyears', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['fileattachment', { static: false },] }]
};
bocompanymasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
        selector: 'app-bocompanymaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bocompanymaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_20__.KeyboardShortcutsService]
    })
], bocompanymasterComponent);



/***/ }),

/***/ 2864:
/*!***********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bocompanymaster/bocompanymaster.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bocompanymasterModule": () => (/* binding */ bocompanymasterModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _bocompanymaster_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bocompanymaster.routing */ 49380);
/* harmony import */ var _bocompanymaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bocompanymaster.component */ 56177);
/* harmony import */ var _bocompanyholiday_bocompanyholiday_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bocompanyholiday/bocompanyholiday.module */ 13284);
/* harmony import */ var _bofinancialyear_bofinancialyear_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../bofinancialyear/bofinancialyear.module */ 46207);
/* harmony import */ var _bouserrolemaster_bouserrolemaster_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../bouserrolemaster/bouserrolemaster.module */ 13007);









let bocompanymasterModule = class bocompanymasterModule {
};
bocompanymasterModule = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule, _bocompanyholiday_bocompanyholiday_module__WEBPACK_IMPORTED_MODULE_4__.bocompanyholidayModule, _bofinancialyear_bofinancialyear_module__WEBPACK_IMPORTED_MODULE_5__.bofinancialyearModule, _bouserrolemaster_bouserrolemaster_module__WEBPACK_IMPORTED_MODULE_6__.bouserrolemasterModule,
            _bocompanymaster_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_8__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_bocompanymaster_component__WEBPACK_IMPORTED_MODULE_3__.bocompanymasterComponent]
    })
], bocompanymasterModule);



/***/ }),

/***/ 49380:
/*!************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bocompanymaster/bocompanymaster.routing.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _bocompanymaster_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bocompanymaster.component */ 56177);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'bocompanymasters', children: [
            { path: '', component: _bocompanymaster_component__WEBPACK_IMPORTED_MODULE_0__.bocompanymasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _bocompanymaster_component__WEBPACK_IMPORTED_MODULE_0__.bocompanymasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _bocompanymaster_component__WEBPACK_IMPORTED_MODULE_0__.bocompanymasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _bocompanymaster_component__WEBPACK_IMPORTED_MODULE_0__.bocompanymasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 1519:
/*!*****************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bocompanyholiday.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bocompanyholidayService": () => (/* binding */ bocompanyholidayService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let bocompanyholidayService = class bocompanyholidayService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bocompanyholidays(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanyholiday', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanyholiday' + '/getdefaultdata').toPromise();
        }
    }
    get_bocompanyholidays_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanyholiday').toPromise();
        }
    }
    getListBy_holidayid(holidayid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanyholiday' + '/holidayid/' + holidayid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanyholiday' + '/param/' + key).toPromise();
        }
    }
    get_bocompanyholidays_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanyholiday' + '/e/' + id).toPromise();
        }
    }
    get_bocompanyholidays_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanyholiday' + '/' + id).toPromise();
        }
    }
    delete_bocompanyholiday(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanyholiday' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanyholiday')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bocompanyholiday => new bocompanyholiday(bocompanyholiday.holidayid, bocompanyholiday.financialyearid, bocompanyholiday.financialyeariddesc, bocompanyholiday.holidaydate, bocompanyholiday.holidayday, bocompanyholiday.holidaydaydesc, bocompanyholiday.reason, bocompanyholiday.status))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bocompanyholiday => bocompanyholiday.holidaydate.includes(filter.name));
            return response;
        }));
    }
    getList_financialyearid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanyholiday' + '/getList_financialyearid').toPromise();
    }
    getList_holidayday() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanyholiday' + '/getList_holidayday/').toPromise();
    }
};
bocompanyholidayService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bocompanyholidayService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bocompanyholidayService);



/***/ }),

/***/ 27476:
/*!****************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bocompanymaster.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bocompanymasterService": () => (/* binding */ bocompanymasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let bocompanymasterService = class bocompanymasterService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bocompanymasters(formData, bocompanyholidays, bofinancialyears) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { bocompanyholidays: bocompanyholidays.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), bofinancialyears: bofinancialyears.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanymaster', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanymaster' + '/getdefaultdata').toPromise();
        }
    }
    get_bocompanymasters_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanymaster').toPromise();
        }
    }
    getListBy_companyid(companyid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanymaster' + '/companyid/' + companyid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanymaster' + '/param/' + key).toPromise();
        }
    }
    get_bocompanymasters_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanymaster' + '/e/' + id).toPromise();
        }
    }
    get_bocompanymasters_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanymaster' + '/' + id).toPromise();
        }
    }
    delete_bocompanymaster(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanymaster' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bocompanymaster')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bocompanymaster => new bocompanymaster(bocompanymaster.companyid, bocompanymaster.code, bocompanymaster.companyname, bocompanymaster.registrationnumber, bocompanymaster.companytype, bocompanymaster.companytypedesc, bocompanymaster.companylogo, bocompanymaster.website, bocompanymaster.phone, bocompanymaster.email, bocompanymaster.address1, bocompanymaster.address2, bocompanymaster.countryid, bocompanymaster.countryiddesc, bocompanymaster.stateid, bocompanymaster.stateiddesc, bocompanymaster.cityid, bocompanymaster.cityiddesc, bocompanymaster.locationid, bocompanymaster.locationiddesc, bocompanymaster.pincode, bocompanymaster.contactname, bocompanymaster.designation, bocompanymaster.designationdesc, bocompanymaster.cpphone, bocompanymaster.cpemail, bocompanymaster.incorporationdate, bocompanymaster.businesssegment, bocompanymaster.businesssegmentdesc, bocompanymaster.details, bocompanymaster.services, bocompanymaster.startdate, bocompanymaster.enddate, bocompanymaster.bankid, bocompanymaster.chartofaccounts, bocompanymaster.shippingaddress1, bocompanymaster.shippingaddress2, bocompanymaster.shippingcountryid, bocompanymaster.shippingcountryiddesc, bocompanymaster.shippingstateid, bocompanymaster.shippingstateiddesc, bocompanymaster.shippingcityid, bocompanymaster.shippingcityiddesc, bocompanymaster.shippingpincode, bocompanymaster.basecurrency, bocompanymaster.basecurrencydesc, bocompanymaster.gstregistrationtype, bocompanymaster.gstregistrationtypedesc, bocompanymaster.gstinnumber, bocompanymaster.pannumber, bocompanymaster.trnnumber, bocompanymaster.tan, bocompanymaster.cst, bocompanymaster.salestax, bocompanymaster.servicetax, bocompanymaster.tin, bocompanymaster.localtax, bocompanymaster.accountstartdate, bocompanymaster.numberofusers, bocompanymaster.starttime, bocompanymaster.endtime, bocompanymaster.weekoff1, bocompanymaster.weekoff1desc, bocompanymaster.weekoff2, bocompanymaster.weekoff2desc, bocompanymaster.facebookaccountname, bocompanymaster.facebookaccounturl, bocompanymaster.twitteraccountname, bocompanymaster.twitteraccounturl, bocompanymaster.linkedinaccountname, bocompanymaster.linkedinaccounturl, bocompanymaster.instagramaccountname, bocompanymaster.instagramaccounturl, bocompanymaster.brandname, bocompanymaster.mailingemailaddress, bocompanymaster.mailingsendername, bocompanymaster.localization, bocompanymaster.localizationdesc, bocompanymaster.timezone, bocompanymaster.timezonedesc, bocompanymaster.customfield, bocompanymaster.attachment, bocompanymaster.status, "", ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bocompanymaster => bocompanymaster.companyname.includes(filter.name));
            return response;
        }));
    }
    getList_companytype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_companytype/').toPromise();
    }
    getList_countryid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_countryid').toPromise();
    }
    getList_stateid(countryid) {
        // return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_stateid/countryid').toPromise();
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_stateid/' + countryid).toPromise();
    }
    getList_cityid(stateid) {
        // return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_cityid/stateid').toPromise();
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_cityid/' + stateid).toPromise();
    }
    getList_locationid(cityid) {
        // return this.http.get(AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_locationid/cityid').toPromise();
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_locationid/' + cityid).toPromise();
    }
    getList_designation() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_designation').toPromise();
    }
    getList_businesssegment() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_businesssegment/').toPromise();
    }
    getList_shippingcountryid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_shippingcountryid').toPromise();
    }
    getList_shippingstateid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_shippingstateid').toPromise();
    }
    getList_shippingcityid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_shippingcityid').toPromise();
    }
    getList_basecurrency() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_basecurrency/').toPromise();
    }
    getList_gstregistrationtype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_gstregistrationtype/').toPromise();
    }
    getList_weekoff1() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_weekoff1/').toPromise();
    }
    getList_weekoff2() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_weekoff2/').toPromise();
    }
    getList_localization() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_localization/').toPromise();
    }
    getList_timezone() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bocompanymaster' + '/getList_timezone/').toPromise();
    }
};
bocompanymasterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bocompanymasterService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bocompanymasterService);



/***/ }),

/***/ 29526:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bocompanyholiday/bocompanyholiday.component.html ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bocompanyholiday_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\" class=\"finpopup\">\r\n  <div class=\"row second bgcolor\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}' style=\"\r\n      display: flex;\r\n      justify-content: center;\r\n      text-align: center;\r\n      margin: auto;\r\n      /* margin-left: -15px; */\r\n      margin-right: 60px;\r\n      margin-top: 5px;\r\n  \">{{'Company Holidays' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bocompanyholidays()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bocompanyholiday_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.holidayid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.holidayid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n\r\n\r\n    <!--financialyearid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('financialyearid') == -1) && (financialyearidvisible==undefined || financialyearidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"financialyearid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_financialyearid(null)\">Financial Year</label>\r\n        <select *ngIf=\"!showview\" id=\"financialyearid\" (change)=\"financialyearid_onChange($event.target)\"\r\n          formControlName=\"financialyearid\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of financialyearid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.financialyeariddesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('holidaydate') == -1) && (holidaydatevisible==undefined || holidaydatevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"holidaydate\" class=\"control-label\">Holiday Date</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.holidaydate?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"!showview\">\r\n          <input #holidaydateformpicker=\"ngbDatepicker\" readonly [minDate]='{year: 1950, month:1, day: 1}'\r\n            [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"holidaydateformpicker\" id=\"holidaydate\"\r\n            formControlName=\"holidaydate\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"holidaydateformpicker.toggle()\" type=\"button\"><i\r\n              class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--holidayday-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('holidayday') == -1) && (holidaydayvisible==undefined || holidaydayvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"holidayday\" class=\"control-label\">Holiday Day</label>\r\n        <select *ngIf=\"!showview\" id=\"holidayday\" readonly (change)=\"holidayday_onChange($event.target)\"\r\n          formControlName=\"holidayday\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of holidayday_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.holidaydaydesc?.value}}</label>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('reason') == -1) && (reasonvisible==undefined || reasonvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"reason\" class=\"control-label\">Reason</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.reason?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"reason\" formControlName=\"reason\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 34424:
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bocompanymaster/bocompanymaster.component.html ***!
  \*******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bocompanymaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second bgcolor\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Company Masters' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bocompanymasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\" style=\"display: none;\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bocompanymaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success popup-add-button\" [routerLink]=''(click)=\"goBack()\" ><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i>\r\n              Back</a>\r\n            <a class=\"alert-success popup-add-button\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary popup-add-button\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.companyid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.companyid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('code') == -1) && (codevisible==undefined || codevisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <label for=\"code\" class=\"control-label\">Code</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.code?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"code\" formControlName=\"code\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('companyname') == -1) && (companynamevisible==undefined || companynamevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"companyname\" class=\"control-label required\">Company Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.companyname?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"companyname\" required formControlName=\"companyname\" class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.companyname.errors?.required\"\r\n                  errorMsg=\"Enter {{'Company Name' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('registrationnumber') == -1) && (registrationnumbervisible==undefined || registrationnumbervisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"registrationnumber\" class=\"control-label required\">Registration Number</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.registrationnumber?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"registrationnumber\" required formControlName=\"registrationnumber\"\r\n                  class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.registrationnumber.errors?.required\"\r\n                  errorMsg=\"Enter {{'Registration Number' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n\r\n\r\n              <!--companytype-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('companytype') == -1) && (companytypevisible==undefined || companytypevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"companytype\" class=\"control-label\">Company Type</label>\r\n                <select *ngIf=\"!showview\" id=\"companytype\" (change)=\"companytype_onChange($event.target)\"\r\n                  formControlName=\"companytype\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of companytype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.companytypedesc?.value}}</label>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <!-- <div\r\n                *ngIf=\"((hidelist.indexOf('companylogo') == -1) && (companylogovisible==undefined || companylogovisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"companylogo\" class=\"control-label\">Company Logo</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.companylogo?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"companylogo\" formControlName=\"companylogo\" class=\"form-control\">\r\n              </div> -->\r\n              <div *ngIf=\"((hidelist.indexOf('website') == -1) && (websitevisible==undefined || websitevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"website\" class=\"control-label\">Website</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.website?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"website\" formControlName=\"website\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('phone') == -1) && (phonevisible==undefined || phonevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"phone\" class=\"control-label\">Phone</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.phone?.value}}</label>\r\n                <int-phone-prefix *ngIf=\"!showview\" id=\"phone\" formControlName=\"phone\" [locale]=\"'en'\"\r\n                  [defaultCountry]=\"'ae'\" class=\"form-control telephone\">\r\n                </int-phone-prefix>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('email') == -1) && (emailvisible==undefined || emailvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"email\" class=\"control-label\">Email</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.email?.value}}</label>\r\n                <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"email\" formControlName=\"email\"\r\n                  class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.email.errors!=null && f.email.errors?.email\"\r\n                  errorMsg=\"Enter valid email\">\r\n                </app-field-error-display>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('address1') == -1) && (address1visible==undefined || address1visible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"address1\" class=\"control-label required\">Address1</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.address1?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"address1\" required formControlName=\"address1\" class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.address1.errors?.required\"\r\n                  errorMsg=\"Enter {{'Address1' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('address2') == -1) && (address2visible==undefined || address2visible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"address2\" class=\"control-label\">Address2</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.address2?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"address2\" formControlName=\"address2\" class=\"form-control\">\r\n              </div>\r\n\r\n\r\n              <!--countryid-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('countryid') == -1) && (countryidvisible==undefined || countryidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"countryid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_countryid(null)\">Country</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"countryid_List\" [optionsEvent]=\"countryid_optionsEvent\"\r\n                  [form]=\"bocountry\" (selectItem)=\"onSelected_countryid($event)\" [reportid]='wc9rn' [menuid]='wc9rn'\r\n                  formControlName=\"countryid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.countryiddesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--stateid-->\r\n\r\n              <div *ngIf=\"((hidelist.indexOf('stateid') == -1) && (stateidvisible==undefined || stateidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"stateid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_stateid(null)\">State</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"stateid_List\" [optionsEvent]=\"stateid_optionsEvent\"\r\n                  [form]=\"bostate\" (selectItem)=\"onSelected_stateid($event)\" [reportid]='tyo5r' [menuid]='tyo5r'\r\n                  formControlName=\"stateid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.stateiddesc?.value}}</label>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <!--cityid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('cityid') == -1) && (cityidvisible==undefined || cityidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"cityid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_cityid(null)\">City</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"cityid_List\" [optionsEvent]=\"cityid_optionsEvent\"\r\n                  [form]=\"bocity\" (selectItem)=\"onSelected_cityid($event)\" [reportid]='kbg3n' [menuid]='kbg3n'\r\n                  formControlName=\"cityid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.cityiddesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--locationid-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('locationid') == -1) && (locationidvisible==undefined || locationidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"locationid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_locationid(null)\">Location</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"locationid_List\" [optionsEvent]=\"locationid_optionsEvent\"\r\n                  [form]=\"bolocation\" (selectItem)=\"onSelected_locationid($event)\" [reportid]='fiimk' [menuid]='fiimk'\r\n                  formControlName=\"locationid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.locationiddesc?.value}}</label>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('pincode') == -1) && (pincodevisible==undefined || pincodevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"pincode\" class=\"control-label\">Pin Code</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.pincode?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"pincode\"  type=\"number\" onKeyPress=\"if(this.value.length==6) return false;\" formControlName=\"pincode\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Contact Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('contactname') == -1) && (contactnamevisible==undefined || contactnamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"contactname\" class=\"control-label\">Contact Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.contactname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"contactname\" formControlName=\"contactname\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--designation-->\r\n\r\n\r\n\r\n\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('designation') == -1) && (designationvisible==undefined || designationvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"designation\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_designation(null)\">Designation</label>\r\n                  <select *ngIf=\"!showview\" id=\"designation\" (change)=\"designation_onChange($event.target)\"\r\n                    formControlName=\"designation\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of designation_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.designationdesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('cpphone') == -1) && (cpphonevisible==undefined || cpphonevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"cpphone\" class=\"control-label\">C P Phone</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.cpphone?.value}}</label>\r\n                  <input *ngIf=\"!showview\" type=\"number\" onKeyPress=\"if(this.value.length==15) return false;\" id=\"cpphone\" formControlName=\"cpphone\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('cpemail') == -1) && (cpemailvisible==undefined || cpemailvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"cpemail\" class=\"control-label\">C P Email</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.cpemail?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"cpemail\" formControlName=\"cpemail\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='More Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('incorporationdate') == -1) && (incorporationdatevisible==undefined || incorporationdatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"incorporationdate\" class=\"control-label\">Incorporation Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.incorporationdate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #incorporationdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"incorporationdateformpicker\"\r\n                      id=\"incorporationdate\" formControlName=\"incorporationdate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"incorporationdateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <!--businesssegment-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('businesssegment') == -1) && (businesssegmentvisible==undefined || businesssegmentvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"businesssegment\" class=\"control-label\">Business Segment</label>\r\n                  <select *ngIf=\"!showview\" id=\"businesssegment\" (change)=\"businesssegment_onChange($event.target)\"\r\n                    formControlName=\"businesssegment\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of businesssegment_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.businesssegmentdesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('details') == -1) && (detailsvisible==undefined || detailsvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"details\" class=\"control-label\">Details</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.details?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"details\"\r\n                    formControlName=\"details\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('services') == -1) && (servicesvisible==undefined || servicesvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"services\" class=\"control-label\">Services</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.services?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"services\"\r\n                    formControlName=\"services\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('startdate') == -1) && (startdatevisible==undefined || startdatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"startdate\" class=\"control-label\">Start Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.startdate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #startdateformpicker=\"ngbDatepicker\" [minDate]='{year: 1950, month:1, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"startdateformpicker\"\r\n                      id=\"startdate\" formControlName=\"startdate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"startdateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('enddate') == -1) && (enddatevisible==undefined || enddatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"enddate\" class=\"control-label\">End Date</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.enddate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #enddateformpicker=\"ngbDatepicker\" [minDate]='{year: 1950, month:1, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"enddateformpicker\" id=\"enddate\"\r\n                      formControlName=\"enddate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"enddateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('bankid') == -1) && (bankidvisible==undefined || bankidvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"bankid\" class=\"control-label\">Bank</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.bankid?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"bankid\" formControlName=\"bankid\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('chartofaccounts') == -1) && (chartofaccountsvisible==undefined || chartofaccountsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"chartofaccounts\" class=\"control-label\">Chart Of Accounts</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.chartofaccounts?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"chartofaccounts\" formControlName=\"chartofaccounts\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('shippingaddress1') == -1) && (shippingaddress1visible==undefined || shippingaddress1visible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"shippingaddress1\" class=\"control-label\">Shipping Address1</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.shippingaddress1?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"shippingaddress1\" formControlName=\"shippingaddress1\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('shippingaddress2') == -1) && (shippingaddress2visible==undefined || shippingaddress2visible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"shippingaddress2\" class=\"control-label\">Shipping Address2</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.shippingaddress2?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"shippingaddress2\" formControlName=\"shippingaddress2\"\r\n                    class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--shippingcountryid-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('shippingcountryid') == -1) && (shippingcountryidvisible==undefined || shippingcountryidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"shippingcountryid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_shippingcountryid(null)\">Shipping Country</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"shippingcountryid_List\"\r\n                    [optionsEvent]=\"shippingcountryid_optionsEvent\" [form]=\"bocountry\"\r\n                    (selectItem)=\"onSelected_shippingcountryid($event)\" [reportid]='wc9rn' [menuid]='wc9rn'\r\n                    formControlName=\"shippingcountryid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.shippingcountryiddesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--shippingstateid-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('shippingstateid') == -1) && (shippingstateidvisible==undefined || shippingstateidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"shippingstateid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_shippingstateid(null)\">Shipping State</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"shippingstateid_List\"\r\n                    [optionsEvent]=\"shippingstateid_optionsEvent\" [form]=\"bostate\"\r\n                    (selectItem)=\"onSelected_shippingstateid($event)\" [reportid]='tyo5r' [menuid]='tyo5r'\r\n                    formControlName=\"shippingstateid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.shippingstateiddesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--shippingcityid-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('shippingcityid') == -1) && (shippingcityidvisible==undefined || shippingcityidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"shippingcityid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_shippingcityid(null)\">Shipping City</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"shippingcityid_List\"\r\n                    [optionsEvent]=\"shippingcityid_optionsEvent\" [form]=\"bocity\"\r\n                    (selectItem)=\"onSelected_shippingcityid($event)\" [reportid]='kbg3n' [menuid]='kbg3n'\r\n                    formControlName=\"shippingcityid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.shippingcityiddesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('shippingpincode') == -1) && (shippingpincodevisible==undefined || shippingpincodevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"shippingpincode\" class=\"control-label\">Shipping Pin Code</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.shippingpincode?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"shippingpincode\" formControlName=\"shippingpincode\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--basecurrency-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('basecurrency') == -1) && (basecurrencyvisible==undefined || basecurrencyvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"basecurrency\" class=\"control-label\">Base Currency</label>\r\n                  <select *ngIf=\"!showview\" id=\"basecurrency\" (change)=\"basecurrency_onChange($event.target)\"\r\n                    formControlName=\"basecurrency\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of basecurrency_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.basecurrencydesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--gstregistrationtype-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('gstregistrationtype') == -1) && (gstregistrationtypevisible==undefined || gstregistrationtypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"gstregistrationtype\" class=\"control-label\">G S T Registration\r\n                    Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"gstregistrationtype\"\r\n                    (change)=\"gstregistrationtype_onChange($event.target)\" formControlName=\"gstregistrationtype\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of gstregistrationtype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.gstregistrationtypedesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('gstinnumber') == -1) && (gstinnumbervisible==undefined || gstinnumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"gstinnumber\" class=\"control-label\">G S T I N Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.gstinnumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"gstinnumber\" formControlName=\"gstinnumber\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('pannumber') == -1) && (pannumbervisible==undefined || pannumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"pannumber\" class=\"control-label\">P A N Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.pannumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"pannumber\" formControlName=\"pannumber\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('trnnumber') == -1) && (trnnumbervisible==undefined || trnnumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"trnnumber\" class=\"control-label\">T R N Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.trnnumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"trnnumber\" formControlName=\"trnnumber\" class=\"form-control\">\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('tan') == -1) && (tanvisible==undefined || tanvisible==true))\" style=''\r\n                  class=\"col-3 \">\r\n                  <label for=\"tan\" class=\"control-label\">T A N</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.tan?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"tan\" formControlName=\"tan\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('cst') == -1) && (cstvisible==undefined || cstvisible==true))\" style=''\r\n                  class=\"col-3 \">\r\n                  <label for=\"cst\" class=\"control-label\">C S T</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.cst?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"cst\" formControlName=\"cst\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('salestax') == -1) && (salestaxvisible==undefined || salestaxvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"salestax\" class=\"control-label\">Sales Tax</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.salestax?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"salestax\" formControlName=\"salestax\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('servicetax') == -1) && (servicetaxvisible==undefined || servicetaxvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"servicetax\" class=\"control-label\">Service Tax</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.servicetax?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"servicetax\" formControlName=\"servicetax\" class=\"form-control\">\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('tin') == -1) && (tinvisible==undefined || tinvisible==true))\" style=''\r\n                  class=\"col-3 \">\r\n                  <label for=\"tin\" class=\"control-label\">T I N</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.tin?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"tin\" formControlName=\"tin\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('localtax') == -1) && (localtaxvisible==undefined || localtaxvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"localtax\" class=\"control-label\">Local Tax</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.localtax?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"localtax\" formControlName=\"localtax\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('accountstartdate') == -1) && (accountstartdatevisible==undefined || accountstartdatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"accountstartdate\" class=\"control-label\">Account Start Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.accountstartdate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #accountstartdateformpicker=\"ngbDatepicker\" [minDate]='{year: 1950, month:1, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"accountstartdateformpicker\"\r\n                      id=\"accountstartdate\" formControlName=\"accountstartdate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"accountstartdateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('numberofusers') == -1) && (numberofusersvisible==undefined || numberofusersvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"numberofusers\" class=\"control-label\">Number Of Users</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.numberofusers?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"numberofusers\" formControlName=\"numberofusers\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('starttime') == -1) && (starttimevisible==undefined || starttimevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"starttime\" class=\"control-label\">Start Time</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.starttime?.value}}</label>\r\n                  <ngb-timepicker *ngIf=\"!showview\" class=\"form-control timepicker\" formControlName=\"starttime\">\r\n                  </ngb-timepicker>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('endtime') == -1) && (endtimevisible==undefined || endtimevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"endtime\" class=\"control-label\">End Time</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.endtime?.value}}</label>\r\n                  <ngb-timepicker *ngIf=\"!showview\" class=\"form-control timepicker\" formControlName=\"endtime\">\r\n                  </ngb-timepicker>\r\n                </div>\r\n\r\n\r\n                <!--weekoff1-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('weekoff1') == -1) && (weekoff1visible==undefined || weekoff1visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"weekoff1\" class=\"control-label\">Week Off1</label>\r\n                  <select *ngIf=\"!showview\" id=\"weekoff1\" (change)=\"weekoff1_onChange($event.target)\"\r\n                    formControlName=\"weekoff1\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of weekoff1_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.weekoff1desc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--weekoff2-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('weekoff2') == -1) && (weekoff2visible==undefined || weekoff2visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"weekoff2\" class=\"control-label\">Week Off2</label>\r\n                  <select *ngIf=\"!showview\" id=\"weekoff2\" (change)=\"weekoff2_onChange($event.target)\"\r\n                    formControlName=\"weekoff2\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of weekoff2_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.weekoff2desc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('facebookaccountname') == -1) && (facebookaccountnamevisible==undefined || facebookaccountnamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"facebookaccountname\" class=\"control-label\">Facebook Account Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.facebookaccountname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"facebookaccountname\" formControlName=\"facebookaccountname\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('facebookaccounturl') == -1) && (facebookaccounturlvisible==undefined || facebookaccounturlvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"facebookaccounturl\" class=\"control-label\">Facebook Account U R L</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.facebookaccounturl?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"facebookaccounturl\" formControlName=\"facebookaccounturl\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('twitteraccountname') == -1) && (twitteraccountnamevisible==undefined || twitteraccountnamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"twitteraccountname\" class=\"control-label\">Twitter Account Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.twitteraccountname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"twitteraccountname\" formControlName=\"twitteraccountname\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('twitteraccounturl') == -1) && (twitteraccounturlvisible==undefined || twitteraccounturlvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"twitteraccounturl\" class=\"control-label\">Twitter Account U R L</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.twitteraccounturl?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"twitteraccounturl\" formControlName=\"twitteraccounturl\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('linkedinaccountname') == -1) && (linkedinaccountnamevisible==undefined || linkedinaccountnamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"linkedinaccountname\" class=\"control-label\">Linkedin Account Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.linkedinaccountname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"linkedinaccountname\" formControlName=\"linkedinaccountname\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('linkedinaccounturl') == -1) && (linkedinaccounturlvisible==undefined || linkedinaccounturlvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"linkedinaccounturl\" class=\"control-label\">Linkedin Account U R L</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.linkedinaccounturl?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"linkedinaccounturl\" formControlName=\"linkedinaccounturl\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('instagramaccountname') == -1) && (instagramaccountnamevisible==undefined || instagramaccountnamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"instagramaccountname\" class=\"control-label\">Instagram Account Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.instagramaccountname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"instagramaccountname\" formControlName=\"instagramaccountname\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('instagramaccounturl') == -1) && (instagramaccounturlvisible==undefined || instagramaccounturlvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"instagramaccounturl\" class=\"control-label\">Instagram Account U R L</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.instagramaccounturl?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"instagramaccounturl\" formControlName=\"instagramaccounturl\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('brandname') == -1) && (brandnamevisible==undefined || brandnamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"brandname\" class=\"control-label\">Brand Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.brandname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"brandname\" formControlName=\"brandname\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('mailingemailaddress') == -1) && (mailingemailaddressvisible==undefined || mailingemailaddressvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"mailingemailaddress\" class=\"control-label\">Mailing Email Address</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.mailingemailaddress?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"mailingemailaddress\" formControlName=\"mailingemailaddress\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('mailingsendername') == -1) && (mailingsendernamevisible==undefined || mailingsendernamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"mailingsendername\" class=\"control-label\">Mailing Sender Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.mailingsendername?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"mailingsendername\" formControlName=\"mailingsendername\"\r\n                    class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--localization-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('localization') == -1) && (localizationvisible==undefined || localizationvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"localization\" class=\"control-label\">Localization</label>\r\n                  <select *ngIf=\"!showview\" id=\"localization\" (change)=\"localization_onChange($event.target)\"\r\n                    formControlName=\"localization\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of localization_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.localizationdesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--timezone-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('timezone') == -1) && (timezonevisible==undefined || timezonevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"timezone\" class=\"control-label\">Time Zone</label>\r\n                  <select *ngIf=\"!showview\" id=\"timezone\" (change)=\"timezone_onChange($event.target)\"\r\n                    formControlName=\"timezone\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of timezone_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.timezonedesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Company Holidays</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bocompanyholidays-->\r\n            <div [ngClass]=\"Is_bocompanyholidays_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Company Holidays' | translate}}\r\n                <select class='child' id=\"bocompanyholidaysPagingdropdown\"\r\n                  (change)=\"bocompanyholidays_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"bocompanyholidaytoggleOption();bocompanyholidays_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbocompanyholidaysFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"bocompanyholidays_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bocompanyholidays (userRowSelect)=\"handle_bocompanyholidays_GridSelected($event)\"\r\n                [settings]=\"bocompanyholidays_settings\" (custom)=\"onCustom_bocompanyholidays_Action($event)\"\r\n                [source]=\"tbl_bocompanyholidays?.source?.data\" (delete)=\"bocompanyholidays_route($event,'delete')\"\r\n                (deleteConfirm)=\"bocompanyholidays_route($event,'delete')\"\r\n                (create)=\"bocompanyholidays_route($event,'create')\"\r\n                (createConfirm)=\"bocompanyholidays_beforesave($event)\" (edit)=\"bocompanyholidays_route($event,'edit')\"\r\n                (editConfirm)=\"bocompanyholidays_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bocompanyholidays-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Financial Years</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bofinancialyears-->\r\n            <div [ngClass]=\"Is_bofinancialyears_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Financial Years' | translate}}\r\n                <select class='child' id=\"bofinancialyearsPagingdropdown\"\r\n                  (change)=\"bofinancialyears_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"bofinancialyeartoggleOption();bofinancialyears_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbofinancialyearsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"bofinancialyears_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bofinancialyears (userRowSelect)=\"handle_bofinancialyears_GridSelected($event)\"\r\n                [settings]=\"bofinancialyears_settings\" (custom)=\"onCustom_bofinancialyears_Action($event)\"\r\n                [source]=\"tbl_bofinancialyears?.source?.data\" (delete)=\"bofinancialyears_route($event,'delete')\"\r\n                (deleteConfirm)=\"bofinancialyears_route($event,'delete')\"\r\n                (create)=\"bofinancialyears_route($event,'create')\" (createConfirm)=\"bofinancialyears_beforesave($event)\"\r\n                (edit)=\"bofinancialyears_route($event,'edit')\" (editConfirm)=\"bofinancialyears_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bofinancialyears-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_bocompanymaster_bocompanymaster_module_ts.js.map