"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_bobranchmaster_bobranchmaster_component_t-9a16c7"],{

/***/ 52571:
/*!**************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bobranchholiday/bobranchholiday.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bobranchholidayComponent": () => (/* binding */ bobranchholidayComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bobranchholiday_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bobranchholiday.component.html */ 50277);
/* harmony import */ var _service_bobranchholiday_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bobranchholiday.service */ 85984);
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

let bobranchholidayComponent = class bobranchholidayComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bobranchholiday_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bobranchholiday_service = bobranchholiday_service;
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
        this.bfilterPopulate_bobranchholidays = false;
        this.bobranchholiday_menuactions = [];
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
        this.bobranchholiday_Form = this.fb.group({
            pk: [null],
            branchholidayid: [null],
            branchid: [null],
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
    get f() { return this.bobranchholiday_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bobranchholiday_Form.dirty && this.bobranchholiday_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.branchholidayid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.branchholidayid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.branchholidayid && pkDetail) {
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
            let bobranchholidayid = null;
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
            this.formid = bobranchholidayid;
            //alert(bobranchholidayid);
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
            this.bobranchholiday_service.getDefaultData().then(res => {
                this.financialyearid_List = res.list_financialyearid.value;
                this.holidayday_List = res.list_holidayday.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bobranchholiday_service.get_bobranchholidays_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bobranchholiday_Form.markAsUntouched();
            this.bobranchholiday_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.bobranchholiday_Form != null)
            this.bobranchholiday_Form.reset();
        this.bobranchholiday_Form.patchValue({
            financialyearid: this.sessionData.finyearid,
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let branchholidayid = this.bobranchholiday_Form.get('branchholidayid').value;
        if (branchholidayid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bobranchholiday_service.delete_bobranchholiday(branchholidayid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bobranchholiday_Form.patchValue({
            branchholidayid: null
        });
        if (this.formData.branchholidayid != null)
            this.formData.branchholidayid = null;
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
                        this.bobranchholiday_Form.patchValue({ "holidaydate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.bobranchholiday_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bobranchholiday_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bobranchholiday_Form.controls[key] != undefined) {
                                this.bobranchholiday_Form.controls[key].disable({ onlySelf: true });
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
    financialyearid_onChange(evt) {
        let e = evt.value;
        this.bobranchholiday_Form.patchValue({ financialyeariddesc: evt.options[evt.options.selectedIndex].text });
    }
    holidayday_onChange(evt) {
        let e = this.f.holidayday.value;
        this.bobranchholiday_Form.patchValue({ holidaydaydesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_bobranchholidays() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bobranchholiday_service.get_bobranchholidays_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bobranchholiday;
                let formproperty = res.bobranchholiday.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bobranchholiday.pkcol;
                this.formid = res.bobranchholiday.branchholidayid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bobranchholiday;
        this.formid = res.bobranchholiday.branchholidayid;
        this.pkcol = res.bobranchholiday.pkcol;
        this.bmyrecord = false;
        if (res.bobranchholiday.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bobranchholiday_Form.patchValue({
            branchholidayid: res.bobranchholiday.branchholidayid,
            branchid: res.bobranchholiday.branchid,
            financialyearid: res.bobranchholiday.financialyearid,
            financialyeariddesc: res.bobranchholiday.financialyeariddesc,
            holidaydate: this.ngbDateParserFormatter.parse(res.bobranchholiday.holidaydate),
            holidayday: res.bobranchholiday.holidayday,
            holidaydaydesc: res.bobranchholiday.holidaydaydesc,
            reason: res.bobranchholiday.reason,
            status: res.bobranchholiday.status,
            statusdesc: res.bobranchholiday.statusdesc,
        });
        this.bobranchholiday_menuactions = res.bobranchholiday_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bobranchholiday_Form.controls) {
            let val = this.bobranchholiday_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bobranchholiday_Form.controls[key] != null) {
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
            if (!this.bobranchholiday_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bobranchholiday_Form.getRawValue();
            obj.holidaydate = new Date(this.bobranchholiday_Form.get('holidaydate').value ? this.ngbDateParserFormatter.format(this.bobranchholiday_Form.get('holidaydate').value) + '  UTC' : null);
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
            // Object.keys(this.bobranchholiday_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bobranchholiday_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bobranchholiday_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bobranchholiday_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bobranchholiday_Form.controls[key] != null) {
                            this.formData[key] = this.bobranchholiday_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.holidaydate = new Date(this.bobranchholiday_Form.get('holidaydate').value ? this.ngbDateParserFormatter.format(this.bobranchholiday_Form.get('holidaydate').value) + '  UTC' : null);
            console.log(this.formData);
            this.spinner.show();
            this.bobranchholiday_service.saveOrUpdate_bobranchholidays(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bobranchholiday);
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
                        this.objvalues.push(res.bobranchholiday);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bobranchholiday_Form.markAsUntouched();
                this.bobranchholiday_Form.markAsPristine();
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
bobranchholidayComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_bobranchholiday_service__WEBPACK_IMPORTED_MODULE_1__.bobranchholidayService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
bobranchholidayComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-bobranchholiday',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bobranchholiday_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], bobranchholidayComponent);



/***/ }),

/***/ 79589:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bobranchlocationComponent": () => (/* binding */ bobranchlocationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bobranchlocation_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bobranchlocation.component.html */ 50779);
/* harmony import */ var _service_bobranchlocation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bobranchlocation.service */ 97127);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_bobranchsublocation_bobranchsublocation_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../pages/forms/bobranchsublocation/bobranchsublocation.component */ 85436);
/* harmony import */ var _service_bobranchsublocation_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../service/bobranchsublocation.service */ 70907);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);










//Shortcuts

//translator





//primeng services



//session,application constants




//custom fields & attachments

let bobranchlocationComponent = class bobranchlocationComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bobranchlocation_service, bobranchsublocation_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bobranchlocation_service = bobranchlocation_service;
        this.bobranchsublocation_service = bobranchsublocation_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_bobranchlocations = false;
        this.bfilterPopulate_bobranchsublocations = false;
        this.bobranchlocation_menuactions = [];
        this.bobranchsublocation_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_bobranchsublocation_IDs = "";
        this.bobranchsublocations_ID = "1";
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
        this.bobranchlocation_Form = this.fb.group({
            pk: [null],
            branchid: [null],
            locationid: [null],
            locationcode: [null],
            locationcodedesc: [null],
            locationname: [null],
            tag: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bobranchlocation_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bobranchlocation_Form.dirty && this.bobranchlocation_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_10__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_10__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_10__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.locationid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.locationid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.locationid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
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
            let bobranchlocationid = null;
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
            this.formid = bobranchlocationid;
            //alert(bobranchlocationid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bobranchsublocations_TableConfig();
                setTimeout(() => {
                    //this.Set_bobranchsublocations_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.bobranchlocation_service.getDefaultData().then(res => {
                this.locationcode_List = res.list_locationcode.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bobranchlocation_service.get_bobranchlocations_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bobranchlocation_Form.markAsUntouched();
            this.bobranchlocation_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.bobranchlocation_Form != null)
            this.bobranchlocation_Form.reset();
        this.bobranchlocation_Form.patchValue({});
        setTimeout(() => {
            this.bobranchsublocations_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let locationid = this.bobranchlocation_Form.get('locationid').value;
        if (locationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bobranchlocation_service.delete_bobranchlocation(locationid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bobranchlocation_Form.patchValue({
            locationid: null
        });
        if (this.formData.locationid != null)
            this.formData.locationid = null;
        for (let i = 0; i < this.tbl_bobranchsublocations.source.length; i++) {
            this.tbl_bobranchsublocations.source[i].sublocationid = null;
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
                    else if (key == "tag")
                        this.bobranchlocation_Form.patchValue({ "tag": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.bobranchlocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bobranchlocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bobranchlocation_Form.controls[key] != undefined) {
                                this.bobranchlocation_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.locationname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.locationname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    locationcode_onChange(evt) {
        let e = this.f.locationcode.value;
        this.bobranchlocation_Form.patchValue({ locationcodedesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_bobranchlocations() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bobranchlocation_service.get_bobranchlocations_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bobranchlocation;
                let formproperty = res.bobranchlocation.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bobranchlocation.pkcol;
                this.formid = res.bobranchlocation.locationid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bobranchlocation;
        this.formid = res.bobranchlocation.locationid;
        this.pkcol = res.bobranchlocation.pkcol;
        this.bmyrecord = false;
        if (res.bobranchlocation.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bobranchlocation_Form.patchValue({
            branchid: res.bobranchlocation.branchid,
            locationid: res.bobranchlocation.locationid,
            locationcode: res.bobranchlocation.locationcode,
            locationcodedesc: res.bobranchlocation.locationcodedesc,
            locationname: res.bobranchlocation.locationname,
            tag: JSON.parse(res.bobranchlocation.tag),
            status: res.bobranchlocation.status,
            statusdesc: res.bobranchlocation.statusdesc,
        });
        this.bobranchlocation_menuactions = res.bobranchlocation_menuactions;
        this.bobranchsublocation_menuactions = res.bobranchsublocation_menuactions;
        this.bobranchsublocations_visiblelist = res.bobranchsublocations_visiblelist;
        //Child Tables if any
        this.Set_bobranchsublocations_TableConfig();
        this.bobranchsublocations_LoadTable(res.bobranchsublocations);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bobranchlocation_Form.controls) {
            let val = this.bobranchlocation_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bobranchlocation_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.bobranchlocation_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bobranchlocation_Form.getRawValue();
            if (this.bobranchlocation_Form.get('tag').value != null)
                obj.tag = JSON.stringify(this.bobranchlocation_Form.get('tag').value);
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
        var _a, _b;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.bobranchlocation_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bobranchlocation_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bobranchlocation_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bobranchlocation_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bobranchlocation_Form.controls[key] != null) {
                            this.formData[key] = this.bobranchlocation_Form.controls[key].value;
                        }
                    }
                }
            }
            if (this.bobranchlocation_Form.get('tag').value != null)
                this.formData.tag = JSON.stringify(this.bobranchlocation_Form.get('tag').value);
            this.formData.Deleted_bobranchsublocation_IDs = this.Deleted_bobranchsublocation_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.bobranchlocation_service.saveOrUpdate_bobranchlocations(this.formData, (_b = (_a = this.tbl_bobranchsublocations) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_bobranchsublocations.source) {
                    for (let i = 0; i < this.tbl_bobranchsublocations.source.data.length; i++) {
                        if (this.tbl_bobranchsublocations.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bobranchsublocations.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bobranchlocation);
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
                        this.objvalues.push(res.bobranchlocation);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bobranchlocation_Form.markAsUntouched();
                this.bobranchlocation_Form.markAsPristine();
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
        this.tbl_bobranchsublocations.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource();
    }
    AddOrEdit_bobranchsublocation(event, sublocationid, locationid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_bobranchsublocation_bobranchsublocation_component__WEBPACK_IMPORTED_MODULE_3__.bobranchsublocationComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, sublocationid, locationid, visiblelist: this.bobranchsublocations_visiblelist, hidelist: this.bobranchsublocations_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bobranchsublocations.source.add(res[i]);
                    }
                    this.tbl_bobranchsublocations.source.refresh();
                }
                else {
                    this.tbl_bobranchsublocations.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_bobranchsublocation(event, childID, i) {
        if (childID != null)
            this.Deleted_bobranchsublocation_IDs += childID + ",";
        this.tbl_bobranchsublocations.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_bobranchsublocations_Checkbox() {
        debugger;
        if (this.tbl_bobranchsublocations.source.settings['selectMode'] == 'multi')
            this.tbl_bobranchsublocations.source.settings['selectMode'] = 'single';
        else
            this.tbl_bobranchsublocations.source.settings['selectMode'] = 'multi';
        this.tbl_bobranchsublocations.source.initGrid();
    }
    delete_bobranchsublocations_All() {
        this.tbl_bobranchsublocations.source.settings['selectMode'] = 'single';
    }
    show_bobranchsublocations_Filter() {
        setTimeout(() => {
            //  this.Set_bobranchsublocations_TableDropDownConfig();
        });
        if (this.tbl_bobranchsublocations.source.settings != null)
            this.tbl_bobranchsublocations.source.settings['hideSubHeader'] = !this.tbl_bobranchsublocations.source.settings['hideSubHeader'];
        this.tbl_bobranchsublocations.source.initGrid();
    }
    show_bobranchsublocations_InActive() {
    }
    enable_bobranchsublocations_InActive() {
    }
    Set_bobranchsublocations_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bobranchsublocations) {
                var clone = this.sharedService.clone(this.tbl_bobranchsublocations.source.settings);
                if (clone.columns['locationid'] != undefined)
                    clone.columns['locationid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchsublocations_locationid.value)), }, };
                if (clone.columns['locationid'] != undefined)
                    clone.columns['locationid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchsublocations_locationid.value)), }, };
                this.tbl_bobranchsublocations.source.settings = clone;
                this.tbl_bobranchsublocations.source.initGrid();
            }
            this.bfilterPopulate_bobranchsublocations = true;
        });
    }
    bobranchsublocations_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bobranchsublocations_TableConfig() {
        this.bobranchsublocations_settings = {
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
                custom: this.bobranchsublocation_menuactions
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
                locationname: {
                    title: 'Location Name',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    bobranchsublocations_LoadTable(bobranchsublocations = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchsublocations_ID) >= 0) {
            if (this.tbl_bobranchsublocations != undefined)
                this.tbl_bobranchsublocations.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource();
            if (this.tbl_bobranchsublocations != undefined)
                this.tbl_bobranchsublocations.source.load(bobranchsublocations);
            if (this.tbl_bobranchsublocations != undefined)
                this.tbl_bobranchsublocations.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    bobranchsublocations_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bobranchlocation_service.bobranchsublocations.length == 0)
    {
        this.tbl_bobranchsublocations.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bobranchsublocation();
        this.bobranchlocation_service.bobranchsublocations.push(obj);
        this.tbl_bobranchsublocations.source.refresh();
        if ((this.bobranchlocation_service.bobranchsublocations.length / this.tbl_bobranchsublocations.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bobranchsublocations.source.getPaging().page)
        {
            this.tbl_bobranchsublocations.source.setPage((this.bobranchlocation_service.bobranchsublocations.length / this.tbl_bobranchsublocations.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bobranchsublocations.source.grid.edit(this.tbl_bobranchsublocations.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bobranchsublocations.source.data.indexOf(event.data);
    this.onDelete_bobranchsublocation(event,event.data.sublocationid,((this.tbl_bobranchsublocations.source.getPaging().page-1) *this.tbl_bobranchsublocations.source.getPaging().perPage)+index);
    this.tbl_bobranchsublocations.source.refresh();
    break;
    }
    }
    
    */
    bobranchsublocations_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_bobranchsublocation(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bobranchsublocation(event, event.data.sublocationid, this.formid);
                break;
            case 'delete':
                this.onDelete_bobranchsublocation(event, event.data.sublocationid, ((this.tbl_bobranchsublocations.source.getPaging().page - 1) * this.tbl_bobranchsublocations.source.getPaging().perPage) + event.index);
                this.tbl_bobranchsublocations.source.refresh();
                break;
        }
    }
    bobranchsublocations_onDelete(obj) {
        let sublocationid = obj.data.sublocationid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bobranchlocation_service.delete_bobranchlocation(sublocationid).then(res => this.bobranchsublocations_LoadTable());
        }
    }
    onCustom_bobranchsublocations_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bobranchsublocations");
            let formname = objbomenuaction.actionname;
        });
    }
    bobranchsublocations_Paging(val) {
        debugger;
        this.tbl_bobranchsublocations.source.setPaging(1, val, true);
    }
    handle_bobranchsublocations_GridSelected(event) {
        this.bobranchsublocations_selectedindex = this.tbl_bobranchsublocations.source.findIndex(i => i.sublocationid === event.data.sublocationid);
    }
    Is_bobranchsublocations_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchsublocations_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
bobranchlocationComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DialogService },
    { type: _service_bobranchlocation_service__WEBPACK_IMPORTED_MODULE_1__.bobranchlocationService },
    { type: _service_bobranchsublocation_service__WEBPACK_IMPORTED_MODULE_4__.bobranchsublocationService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_21__.NgxSpinnerService }
];
bobranchlocationComponent.propDecorators = {
    tbl_bobranchsublocations: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['tbl_bobranchsublocations', { static: false },] }]
};
bobranchlocationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-bobranchlocation',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bobranchlocation_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService]
    })
], bobranchlocationComponent);



/***/ }),

/***/ 18035:
/*!************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bobranchmasterComponent": () => (/* binding */ bobranchmasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bobranchmaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bobranchmaster.component.html */ 24089);
/* harmony import */ var _service_bobranchmaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bobranchmaster.service */ 31866);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component */ 55163);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_bobranchholiday_bobranchholiday_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/bobranchholiday/bobranchholiday.component */ 52571);
/* harmony import */ var _service_bobranchholiday_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/bobranchholiday.service */ 85984);
/* harmony import */ var _pages_forms_bobranchlocation_bobranchlocation_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/bobranchlocation/bobranchlocation.component */ 79589);
/* harmony import */ var _pages_forms_bousermaster_bousermaster_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../pages/forms/bousermaster/bousermaster.component */ 80717);
/* harmony import */ var _service_bobranchlocation_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../../service/bobranchlocation.service */ 97127);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions

//child table



//Shortcuts

//translator








//primeng services



//session,application constants




//custom fields & attachments


let bobranchmasterComponent = class bobranchmasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bobranchmaster_service, bobranchholiday_service, 
    //private bousermaster_service: bousermasterService,
    bobranchlocation_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bobranchmaster_service = bobranchmaster_service;
        this.bobranchholiday_service = bobranchholiday_service;
        this.bobranchlocation_service = bobranchlocation_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_15__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_bobranchmasters = false;
        this.bfilterPopulate_bobranchholidays = false;
        this.bfilterPopulate_bouserbranchaccesses = false;
        this.bfilterPopulate_bobranchlocations = false;
        this.bobranchmaster_menuactions = [];
        this.bobranchholiday_menuactions = [];
        this.bouserbranchaccess_menuactions = [];
        this.bobranchlocation_menuactions = [];
        this.countryid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_15__.EventEmitter(); //autocomplete
        this.stateid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_15__.EventEmitter(); //autocomplete
        this.cityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_15__.EventEmitter(); //autocomplete
        this.locationid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_15__.EventEmitter(); //autocomplete
        this.salesdirector_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_15__.EventEmitter(); //autocomplete
        this.customersuccessdirector_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_15__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_13__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_13__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_bobranchholiday_IDs = "";
        this.bobranchholidays_ID = "1";
        this.Deleted_bouserbranchaccess_IDs = "";
        this.bouserbranchaccesses_ID = "2";
        this.Deleted_bobranchlocation_IDs = "";
        this.bobranchlocations_ID = "3";
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
        this.bobranchmaster_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            branchid: [null],
            branchcode: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.required])],
            branchname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.required])],
            thumbnail: [null],
            address1: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.required])],
            address2: [null],
            countryid: [null],
            countryiddesc: [null],
            stateid: [null],
            stateiddesc: [null],
            cityid: [null],
            cityiddesc: [null],
            locationid: [null],
            locationiddesc: [null],
            pin: [null],
            latlong: [null],
            starttime: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.required])],
            endtime: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_16__.Validators.required])],
            weekoff1: [null],
            weekoff1desc: [null],
            weekoff2: [null],
            weekoff2desc: [null],
            remarks: [null],
            totalregions: [null],
            accounts: [null],
            salespeople: [null],
            resourceallocation: [null],
            resourceallocationdesc: [null],
            growthopportunity: [null],
            growthopportunitydesc: [null],
            salesdirector: [null],
            salesdirectordesc: [null],
            customersuccessdirector: [null],
            customersuccessdirectordesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bobranchmaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bobranchmaster_Form.dirty && this.bobranchmaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_17__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_17__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_17__.Observable.of(true);
    }
    //check Unique fields
    branchcodeexists(e) {
        debugger;
        let pos = this.pkList.map(function (e) { return e.branchcode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
        if (pos >= 0 && this.pkList[pos].branchid.toString() != this.formid.toString()) {
            if (confirm("This Branch Code value exists in the database.Do you want to display the record ? ")) {
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
    branchnameexists(e) {
        debugger;
        let pos = this.pkList.map(function (e) { return e.branchname.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
        if (pos >= 0 && this.pkList[pos].branchid.toString() != this.formid.toString()) {
            if (confirm("This Branch Name value exists in the database.Do you want to display the record ? ")) {
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
        let pos = this.pkList.map(function (e) { return e.branchid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.branchid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.branchid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
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
            let bobranchmasterid = null;
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
            this.formid = bobranchmasterid;
            //alert(bobranchmasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bobranchholidays_TableConfig();
                setTimeout(() => {
                    //this.Set_bobranchholidays_TableDropDownConfig();
                });
                this.Set_bouserbranchaccesses_TableConfig();
                setTimeout(() => {
                    //this.Set_bouserbranchaccesses_TableDropDownConfig();
                });
                this.Set_bobranchlocations_TableConfig();
                setTimeout(() => {
                    //this.Set_bobranchlocations_TableDropDownConfig();
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
            this.bobranchmaster_service.getDefaultData().then(res => {
                this.countryid_List = res.list_countryid.value;
                this.weekoff1_List = res.list_weekoff1.value;
                this.weekoff2_List = res.list_weekoff2.value;
                this.resourceallocation_List = res.list_resourceallocation.value;
                this.growthopportunity_List = res.list_growthopportunity.value;
                this.salesdirector_List = res.list_salesdirector.value;
                this.customersuccessdirector_List = res.list_customersuccessdirector.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bobranchmaster_service.get_bobranchmasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bobranchmaster_Form.markAsUntouched();
            this.bobranchmaster_Form.markAsPristine();
        });
    }
    onSelected_countryid(countryidDetail) {
        if (countryidDetail.value && countryidDetail) {
            this.bobranchmaster_Form.patchValue({
                countryid: countryidDetail.value,
                countryiddesc: countryidDetail.label,
            });
            this.bobranchmaster_service.getList_stateid(countryidDetail.value).then(res => {
                this.stateid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_stateid(stateidDetail) {
        if (stateidDetail.value && stateidDetail) {
            this.bobranchmaster_Form.patchValue({
                stateid: stateidDetail.value,
                stateiddesc: stateidDetail.label,
            });
            this.bobranchmaster_service.getList_cityid(stateidDetail.value).then(res => {
                this.cityid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_cityid(cityidDetail) {
        if (cityidDetail.value && cityidDetail) {
            this.bobranchmaster_Form.patchValue({
                cityid: cityidDetail.value,
                cityiddesc: cityidDetail.label,
            });
            this.bobranchmaster_service.getList_locationid(cityidDetail.value).then(res => {
                this.locationid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_locationid(locationidDetail) {
        if (locationidDetail.value && locationidDetail) {
            this.bobranchmaster_Form.patchValue({
                locationid: locationidDetail.value,
                locationiddesc: locationidDetail.label,
            });
        }
    }
    onSelected_salesdirector(salesdirectorDetail) {
        if (salesdirectorDetail.value && salesdirectorDetail) {
            this.bobranchmaster_Form.patchValue({
                salesdirector: salesdirectorDetail.value,
                salesdirectordesc: salesdirectorDetail.label,
            });
        }
    }
    onSelected_customersuccessdirector(customersuccessdirectorDetail) {
        if (customersuccessdirectorDetail.value && customersuccessdirectorDetail) {
            this.bobranchmaster_Form.patchValue({
                customersuccessdirector: customersuccessdirectorDetail.value,
                customersuccessdirectordesc: customersuccessdirectorDetail.label,
            });
        }
    }
    resetForm() {
        if (this.bobranchmaster_Form != null)
            this.bobranchmaster_Form.reset();
        this.bobranchmaster_Form.patchValue({
            salesdirector: this.sessionData.userid,
            salesdirectordesc: this.sessionData.username,
            customersuccessdirector: this.sessionData.userid,
            customersuccessdirectordesc: this.sessionData.username,
        });
        setTimeout(() => {
            this.bobranchholidays_LoadTable();
            this.Insertbouserbranchaccesses = [];
            this.bouserbranchaccesses_LoadTable();
            this.bobranchlocations_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let branchid = this.bobranchmaster_Form.get('branchid').value;
        if (branchid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bobranchmaster_service.delete_bobranchmaster(branchid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bobranchmaster_Form.patchValue({
            branchid: null
        });
        if (this.formData.branchid != null)
            this.formData.branchid = null;
        for (let i = 0; i < this.tbl_bobranchholidays.source.length; i++) {
            this.tbl_bobranchholidays.source[i].branchholidayid = null;
        }
        for (let i = 0; i < this.tbl_bouserbranchaccesses.source.length; i++) {
            this.tbl_bouserbranchaccesses.source[i].accessid = null;
        }
        for (let i = 0; i < this.tbl_bobranchlocations.source.length; i++) {
            this.tbl_bobranchlocations.source[i].locationid = null;
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
                    else if (key == "starttime")
                        this.bobranchmaster_Form.patchValue({ "starttime": new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(mainscreendata[key]) });
                    else if (key == "endtime")
                        this.bobranchmaster_Form.patchValue({ "endtime": new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.bobranchmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bobranchmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bobranchmaster_Form.controls[key] != undefined) {
                                this.bobranchmaster_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("bobranchmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.branchname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.branchname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
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
    weekoff1_onChange(evt) {
        let e = this.f.weekoff1.value;
        this.bobranchmaster_Form.patchValue({ weekoff1desc: evt.options[evt.options.selectedIndex].text });
    }
    weekoff2_onChange(evt) {
        let e = this.f.weekoff2.value;
        this.bobranchmaster_Form.patchValue({ weekoff2desc: evt.options[evt.options.selectedIndex].text });
    }
    resourceallocation_onChange(evt) {
        let e = this.f.resourceallocation.value;
        this.bobranchmaster_Form.patchValue({ resourceallocationdesc: evt.options[evt.options.selectedIndex].text });
    }
    growthopportunity_onChange(evt) {
        let e = this.f.growthopportunity.value;
        this.bobranchmaster_Form.patchValue({ growthopportunitydesc: evt.options[evt.options.selectedIndex].text });
    }
    salesdirector_onChange(evt) {
        let e = evt.value;
    }
    customersuccessdirector_onChange(evt) {
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
    edit_bobranchmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bobranchmaster_service.get_bobranchmasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bobranchmaster;
                let formproperty = res.bobranchmaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bobranchmaster.pkcol;
                this.formid = res.bobranchmaster.branchid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bobranchmaster;
        this.formid = res.bobranchmaster.branchid;
        this.pkcol = res.bobranchmaster.pkcol;
        this.bmyrecord = false;
        if (res.bobranchmaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        var starttimeTime = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(res.bobranchmaster.starttime);
        var endtimeTime = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(res.bobranchmaster.endtime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bobranchmaster_Form.patchValue({
            branchid: res.bobranchmaster.branchid,
            branchcode: res.bobranchmaster.branchcode,
            branchname: res.bobranchmaster.branchname,
            thumbnail: res.bobranchmaster.thumbnail,
            address1: res.bobranchmaster.address1,
            address2: res.bobranchmaster.address2,
            countryid: res.bobranchmaster.countryid,
            countryiddesc: res.bobranchmaster.countryiddesc,
            stateid: res.bobranchmaster.stateid,
            stateiddesc: res.bobranchmaster.stateiddesc,
            cityid: res.bobranchmaster.cityid,
            cityiddesc: res.bobranchmaster.cityiddesc,
            locationid: res.bobranchmaster.locationid,
            locationiddesc: res.bobranchmaster.locationiddesc,
            pin: res.bobranchmaster.pin,
            latlong: res.bobranchmaster.latlong,
            starttime: starttimeTime,
            endtime: endtimeTime,
            weekoff1: res.bobranchmaster.weekoff1,
            weekoff1desc: res.bobranchmaster.weekoff1desc,
            weekoff2: res.bobranchmaster.weekoff2,
            weekoff2desc: res.bobranchmaster.weekoff2desc,
            remarks: res.bobranchmaster.remarks,
            totalregions: res.bobranchmaster.totalregions,
            accounts: res.bobranchmaster.accounts,
            salespeople: res.bobranchmaster.salespeople,
            resourceallocation: res.bobranchmaster.resourceallocation,
            resourceallocationdesc: res.bobranchmaster.resourceallocationdesc,
            growthopportunity: res.bobranchmaster.growthopportunity,
            growthopportunitydesc: res.bobranchmaster.growthopportunitydesc,
            salesdirector: res.bobranchmaster.salesdirector,
            salesdirectordesc: res.bobranchmaster.salesdirectordesc,
            customersuccessdirector: res.bobranchmaster.customersuccessdirector,
            customersuccessdirectordesc: res.bobranchmaster.customersuccessdirectordesc,
            customfield: res.bobranchmaster.customfield,
            attachment: JSON.parse(res.bobranchmaster.attachment),
            status: res.bobranchmaster.status,
            statusdesc: res.bobranchmaster.statusdesc,
        });
        this.bobranchmaster_menuactions = res.bobranchmaster_menuactions;
        this.bobranchholiday_menuactions = res.bobranchholiday_menuactions;
        this.bobranchholidays_visiblelist = res.bobranchholidays_visiblelist;
        this.bouserbranchaccess_menuactions = res.bouserbranchaccess_menuactions;
        this.bouserbranchaccesses_visiblelist = res.bouserbranchaccesses_visiblelist;
        this.bobranchlocation_menuactions = res.bobranchlocation_menuactions;
        this.bobranchlocations_visiblelist = res.bobranchlocations_visiblelist;
        if (this.bobranchmaster_Form.get('customfield').value != null && this.bobranchmaster_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.bobranchmaster_Form.get('customfield').value);
        this.FillCustomField();
        if (this.bobranchmaster_Form.get('attachment').value != null && this.bobranchmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.bobranchmaster_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.countryid.value && this.f.countryid.value != "" && this.f.countryid.value != null)
                this.bobranchmaster_service.getList_stateid(this.f.countryid.value).then(res => {
                    this.stateid_List = res;
                }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.stateid.value && this.f.stateid.value != "" && this.f.stateid.value != null)
                this.bobranchmaster_service.getList_cityid(this.f.stateid.value).then(res => {
                    this.cityid_List = res;
                }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.cityid.value && this.f.cityid.value != "" && this.f.cityid.value != null)
                this.bobranchmaster_service.getList_locationid(this.f.cityid.value).then(res => {
                    this.locationid_List = res;
                }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        this.Set_bobranchholidays_TableConfig();
        this.bobranchholidays_LoadTable(res.bobranchholidays);
        this.Set_bouserbranchaccesses_TableConfig();
        this.bouserbranchaccesses_LoadTable(res.bouserbranchaccesses);
        this.Insertbouserbranchaccesses = [];
        this.Set_bobranchlocations_TableConfig();
        this.bobranchlocations_LoadTable(res.bobranchlocations);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bobranchmaster_Form.controls) {
            let val = this.bobranchmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bobranchmaster_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.bobranchmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.bobranchmaster_Form.getRawValue();
            obj.starttime = (this.bobranchmaster_Form.get('starttime').value == null ? 0 : this.bobranchmaster_Form.get('starttime').value.hour) + ':' + (this.bobranchmaster_Form.get('starttime').value == null ? 0 : this.bobranchmaster_Form.get('starttime').value.minute + ":00");
            obj.endtime = (this.bobranchmaster_Form.get('endtime').value == null ? 0 : this.bobranchmaster_Form.get('endtime').value.hour) + ':' + (this.bobranchmaster_Form.get('endtime').value == null ? 0 : this.bobranchmaster_Form.get('endtime').value.minute + ":00");
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
        var _a, _b, _c, _d, _e, _f;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.bobranchmaster_Form.controls).forEach(key => {
            //   const controlErrors: ValidationErrors = this.bobranchmaster_Form.get(key).errors;
            //   if (controlErrors != null) {
            //     Object.keys(controlErrors).forEach(keyError => {
            //       strError += ' ' + key + '' + keyError + '';
            //     });
            //   }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bobranchmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bobranchmaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bobranchmaster_Form.controls[key] != null) {
                            this.formData[key] = this.bobranchmaster_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            this.formData.starttime = (this.bobranchmaster_Form.get('starttime').value == null ? 0 : this.bobranchmaster_Form.get('starttime').value.hour) + ':' + (this.bobranchmaster_Form.get('starttime').value == null ? 0 : this.bobranchmaster_Form.get('starttime').value.minute + ":00");
            this.formData.endtime = (this.bobranchmaster_Form.get('endtime').value == null ? 0 : this.bobranchmaster_Form.get('endtime').value.hour) + ':' + (this.bobranchmaster_Form.get('endtime').value == null ? 0 : this.bobranchmaster_Form.get('endtime').value.minute + ":00");
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_bobranchholiday_IDs = this.Deleted_bobranchholiday_IDs;
            this.formData.Deleted_bouserbranchaccess_IDs = this.Deleted_bouserbranchaccess_IDs;
            this.formData.Deleted_bobranchlocation_IDs = this.Deleted_bobranchlocation_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.bobranchmaster_service.saveOrUpdate_bobranchmasters(this.formData, (_b = (_a = this.tbl_bobranchholidays) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_bouserbranchaccesses) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data, this.Insertbouserbranchaccesses, (_f = (_e = this.tbl_bobranchlocations) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_bobranchholidays.source) {
                    for (let i = 0; i < this.tbl_bobranchholidays.source.data.length; i++) {
                        if (this.tbl_bobranchholidays.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bobranchholidays.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_bouserbranchaccesses.source) {
                    for (let i = 0; i < this.tbl_bouserbranchaccesses.source.data.length; i++) {
                        if (this.tbl_bouserbranchaccesses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bouserbranchaccesses.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_bobranchlocations.source) {
                    for (let i = 0; i < this.tbl_bobranchlocations.source.data.length; i++) {
                        if (this.tbl_bobranchlocations.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bobranchlocations.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bobranchmaster);
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
                        this.objvalues.push(res.bobranchmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bobranchmaster_Form.markAsUntouched();
                this.bobranchmaster_Form.markAsPristine();
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
        this.tbl_bobranchholidays.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
        this.tbl_bouserbranchaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
        this.tbl_bobranchlocations.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
    }
    AddOrEdit_bobranchholiday(event, branchholidayid, branchid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_bobranchholiday_bobranchholiday_component__WEBPACK_IMPORTED_MODULE_5__.bobranchholidayComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, branchholidayid, branchid, visiblelist: this.bobranchholidays_visiblelist, hidelist: this.bobranchholidays_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bobranchholidays.source.add(res[i]);
                    }
                    this.tbl_bobranchholidays.source.refresh();
                }
                else {
                    this.tbl_bobranchholidays.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_bobranchholiday(event, childID, i) {
        if (childID != null)
            this.Deleted_bobranchholiday_IDs += childID + ",";
        this.tbl_bobranchholidays.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_bobranchlocation(event, locationid, branchid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_bobranchlocation_bobranchlocation_component__WEBPACK_IMPORTED_MODULE_7__.bobranchlocationComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, locationid, branchid, visiblelist: this.bobranchlocations_visiblelist, hidelist: this.bobranchlocations_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bobranchlocations.source.add(res[i]);
                    }
                    this.tbl_bobranchlocations.source.refresh();
                }
                else {
                    this.tbl_bobranchlocations.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_bobranchlocation(event, childID, i) {
        if (childID != null)
            this.Deleted_bobranchlocation_IDs += childID + ",";
        this.tbl_bobranchlocations.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_bobranchholidays_Checkbox() {
        debugger;
        if (this.tbl_bobranchholidays.source.settings['selectMode'] == 'multi')
            this.tbl_bobranchholidays.source.settings['selectMode'] = 'single';
        else
            this.tbl_bobranchholidays.source.settings['selectMode'] = 'multi';
        this.tbl_bobranchholidays.source.initGrid();
    }
    delete_bobranchholidays_All() {
        this.tbl_bobranchholidays.source.settings['selectMode'] = 'single';
    }
    show_bobranchholidays_Filter() {
        setTimeout(() => {
            //  this.Set_bobranchholidays_TableDropDownConfig();
        });
        if (this.tbl_bobranchholidays.source.settings != null)
            this.tbl_bobranchholidays.source.settings['hideSubHeader'] = !this.tbl_bobranchholidays.source.settings['hideSubHeader'];
        this.tbl_bobranchholidays.source.initGrid();
    }
    show_bobranchholidays_InActive() {
    }
    enable_bobranchholidays_InActive() {
    }
    Set_bobranchholidays_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bobranchholidays) {
                var clone = this.sharedService.clone(this.tbl_bobranchholidays.source.settings);
                if (clone.columns['financialyearid'] != undefined)
                    clone.columns['financialyearid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchholidays_financialyearid.value)), }, };
                if (clone.columns['financialyearid'] != undefined)
                    clone.columns['financialyearid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchholidays_financialyearid.value)), }, };
                this.tbl_bobranchholidays.source.settings = clone;
                this.tbl_bobranchholidays.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bobranchholidays.source.settings);
                if (clone.columns['holidayday'] != undefined)
                    clone.columns['holidayday'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchholidays_holidayday.value)), }, };
                if (clone.columns['holidayday'] != undefined)
                    clone.columns['holidayday'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchholidays_holidayday.value)), }, };
                this.tbl_bobranchholidays.source.settings = clone;
                this.tbl_bobranchholidays.source.initGrid();
            }
            this.bfilterPopulate_bobranchholidays = true;
        });
    }
    bobranchholidays_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bobranchholidays_TableConfig() {
        this.bobranchholidays_settings = {
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
                custom: this.bobranchholiday_menuactions
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
    bobranchholidays_LoadTable(bobranchholidays = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchholidays_ID) >= 0) {
            if (this.tbl_bobranchholidays != undefined)
                this.tbl_bobranchholidays.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
            if (this.tbl_bobranchholidays != undefined)
                this.tbl_bobranchholidays.source.load(bobranchholidays);
            if (this.tbl_bobranchholidays != undefined)
                this.tbl_bobranchholidays.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    bobranchholidays_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bobranchmaster_service.bobranchholidays.length == 0)
    {
        this.tbl_bobranchholidays.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bobranchholiday();
        this.bobranchmaster_service.bobranchholidays.push(obj);
        this.tbl_bobranchholidays.source.refresh();
        if ((this.bobranchmaster_service.bobranchholidays.length / this.tbl_bobranchholidays.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bobranchholidays.source.getPaging().page)
        {
            this.tbl_bobranchholidays.source.setPage((this.bobranchmaster_service.bobranchholidays.length / this.tbl_bobranchholidays.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bobranchholidays.source.grid.edit(this.tbl_bobranchholidays.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bobranchholidays.source.data.indexOf(event.data);
    this.onDelete_bobranchholiday(event,event.data.branchholidayid,((this.tbl_bobranchholidays.source.getPaging().page-1) *this.tbl_bobranchholidays.source.getPaging().perPage)+index);
    this.tbl_bobranchholidays.source.refresh();
    break;
    }
    }
    
    */
    bobranchholidays_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_bobranchholiday(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bobranchholiday(event, event.data.branchholidayid, this.formid);
                break;
            case 'delete':
                this.onDelete_bobranchholiday(event, event.data.branchholidayid, ((this.tbl_bobranchholidays.source.getPaging().page - 1) * this.tbl_bobranchholidays.source.getPaging().perPage) + event.index);
                this.tbl_bobranchholidays.source.refresh();
                break;
        }
    }
    bobranchholidays_onDelete(obj) {
        let branchholidayid = obj.data.branchholidayid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bobranchmaster_service.delete_bobranchmaster(branchholidayid).then(res => this.bobranchholidays_LoadTable());
        }
    }
    onCustom_bobranchholidays_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bobranchholidays");
            let formname = objbomenuaction.actionname;
        });
    }
    bobranchholidays_Paging(val) {
        debugger;
        this.tbl_bobranchholidays.source.setPaging(1, val, true);
    }
    handle_bobranchholidays_GridSelected(event) {
        this.bobranchholidays_selectedindex = this.tbl_bobranchholidays.source.findIndex(i => i.branchholidayid === event.data.branchholidayid);
    }
    Is_bobranchholidays_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchholidays_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bobranchholidays
    //start of Grid Codes bouserbranchaccesses
    onCustom_bouserbranchaccesses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            switch (event.action) {
                case 'viewrecord':
                    let val = event.data.pkcol;
                    this.dialog.open(_pages_forms_bousermaster_bousermaster_component__WEBPACK_IMPORTED_MODULE_8__.bousermasterComponent, {
                        data: { showview: false, pkcol: val, ScreenType: 2 },
                    }).onClose.subscribe(res => {
                    });
                    break;
            }
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bouserbranchaccesses");
            let formname = objbomenuaction.actionname;
        });
    }
    show_bouserbranchaccesses_Checkbox() {
        debugger;
        if (this.tbl_bouserbranchaccesses.source.settings['selectMode'] == 'multi')
            this.tbl_bouserbranchaccesses.source.settings['selectMode'] = 'single';
        else
            this.tbl_bouserbranchaccesses.source.settings['selectMode'] = 'multi';
        this.tbl_bouserbranchaccesses.source.initGrid();
    }
    delete_bouserbranchaccesses_All() {
        this.tbl_bouserbranchaccesses.source.settings['selectMode'] = 'single';
    }
    show_bouserbranchaccesses_Filter() {
        setTimeout(() => {
            //  this.Set_bouserbranchaccesses_TableDropDownConfig();
        });
        if (this.tbl_bouserbranchaccesses.source.settings != null)
            this.tbl_bouserbranchaccesses.source.settings['hideSubHeader'] = !this.tbl_bouserbranchaccesses.source.settings['hideSubHeader'];
        this.tbl_bouserbranchaccesses.source.initGrid();
    }
    show_bouserbranchaccesses_InActive() {
    }
    enable_bouserbranchaccesses_InActive() {
    }
    Set_bouserbranchaccesses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bouserbranchaccesses) {
            }
            this.bfilterPopulate_bouserbranchaccesses = true;
        });
    }
    bouserbranchaccesses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bouserbranchaccesses_TableConfig() {
        this.bouserbranchaccesses_settings = {
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
                userid: {
                    title: 'User',
                    type: '',
                },
                usercode: {
                    title: 'Usercode',
                    type: '',
                },
                username: {
                    title: 'Username',
                    type: '',
                },
            },
        };
    }
    bouserbranchaccesses_LoadTable(bouserbranchaccesses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bouserbranchaccesses_ID) >= 0) {
            if (this.tbl_bouserbranchaccesses != undefined)
                this.tbl_bouserbranchaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
            if (this.tbl_bouserbranchaccesses != undefined)
                this.tbl_bouserbranchaccesses.source.load(bouserbranchaccesses);
            setTimeout(() => {
                if (this.tbl_bouserbranchaccesses.source != null) {
                    this.tbl_bouserbranchaccesses.source.grid.getRows().forEach((row) => {
                        if (row.data.accessid != null && row.data.accessid != "") {
                            this.Insertbouserbranchaccesses.push(row.data);
                            this.tbl_bouserbranchaccesses.source.grid.multipleSelectRow(row);
                        }
                    });
                }
            });
        }
    }
    //external to inline
    /*
    bouserbranchaccesses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bobranchmaster_service.bouserbranchaccesses.length == 0)
    {
        this.tbl_bouserbranchaccesses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bouserbranchaccess();
        this.bobranchmaster_service.bouserbranchaccesses.push(obj);
        this.tbl_bouserbranchaccesses.source.refresh();
        if ((this.bobranchmaster_service.bouserbranchaccesses.length / this.tbl_bouserbranchaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bouserbranchaccesses.source.getPaging().page)
        {
            this.tbl_bouserbranchaccesses.source.setPage((this.bobranchmaster_service.bouserbranchaccesses.length / this.tbl_bouserbranchaccesses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bouserbranchaccesses.source.grid.edit(this.tbl_bouserbranchaccesses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bouserbranchaccesses.source.data.indexOf(event.data);
    this.onDelete_bouserbranchaccess(event,event.data.accessid,((this.tbl_bouserbranchaccesses.source.getPaging().page-1) *this.tbl_bouserbranchaccesses.source.getPaging().perPage)+index);
    this.tbl_bouserbranchaccesses.source.refresh();
    break;
    }
    }
    
    */
    bouserbranchaccesses_Paging(val) {
        debugger;
        this.tbl_bouserbranchaccesses.source.setPaging(1, val, true);
    }
    handle_bouserbranchaccesses_GridSelected(event) {
        debugger;
        if (event.isSelected) {
            if (event.data.accessid == null || event.data.accessid == "") {
                var obj = { branchid: this.formid, userid: event.data.userid };
                this.Insertbouserbranchaccesses.push(obj);
            }
            else {
                var deletedids = this.Deleted_bouserbranchaccess_IDs.split(',');
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
                this.Deleted_bouserbranchaccess_IDs += event.data.accessid + ",";
        }
    }
    Is_bouserbranchaccesses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bouserbranchaccesses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_bobranchlocations_Checkbox() {
        debugger;
        if (this.tbl_bobranchlocations.source.settings['selectMode'] == 'multi')
            this.tbl_bobranchlocations.source.settings['selectMode'] = 'single';
        else
            this.tbl_bobranchlocations.source.settings['selectMode'] = 'multi';
        this.tbl_bobranchlocations.source.initGrid();
    }
    delete_bobranchlocations_All() {
        this.tbl_bobranchlocations.source.settings['selectMode'] = 'single';
    }
    show_bobranchlocations_Filter() {
        setTimeout(() => {
            //  this.Set_bobranchlocations_TableDropDownConfig();
        });
        if (this.tbl_bobranchlocations.source.settings != null)
            this.tbl_bobranchlocations.source.settings['hideSubHeader'] = !this.tbl_bobranchlocations.source.settings['hideSubHeader'];
        this.tbl_bobranchlocations.source.initGrid();
    }
    show_bobranchlocations_InActive() {
    }
    enable_bobranchlocations_InActive() {
    }
    Set_bobranchlocations_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bobranchlocations) {
                var clone = this.sharedService.clone(this.tbl_bobranchlocations.source.settings);
                if (clone.columns['locationcode'] != undefined)
                    clone.columns['locationcode'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchlocations_locationcode.value)), }, };
                if (clone.columns['locationcode'] != undefined)
                    clone.columns['locationcode'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bobranchlocations_locationcode.value)), }, };
                this.tbl_bobranchlocations.source.settings = clone;
                this.tbl_bobranchlocations.source.initGrid();
            }
            this.bfilterPopulate_bobranchlocations = true;
        });
    }
    bobranchlocations_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bobranchlocations_TableConfig() {
        this.bobranchlocations_settings = {
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
                custom: this.bobranchlocation_menuactions
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
                locationcodedesc: {
                    title: 'Location Code',
                    type: 'html',
                    filter: true,
                },
                locationname: {
                    title: 'Location Name',
                    type: '',
                    filter: true,
                },
                tag: {
                    title: 'Tag',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    bobranchlocations_LoadTable(bobranchlocations = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchlocations_ID) >= 0) {
            if (this.tbl_bobranchlocations != undefined)
                this.tbl_bobranchlocations.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
            if (this.tbl_bobranchlocations != undefined)
                this.tbl_bobranchlocations.source.load(bobranchlocations);
            if (this.tbl_bobranchlocations != undefined)
                this.tbl_bobranchlocations.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    bobranchlocations_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bobranchmaster_service.bobranchlocations.length == 0)
    {
        this.tbl_bobranchlocations.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bobranchlocation();
        this.bobranchmaster_service.bobranchlocations.push(obj);
        this.tbl_bobranchlocations.source.refresh();
        if ((this.bobranchmaster_service.bobranchlocations.length / this.tbl_bobranchlocations.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bobranchlocations.source.getPaging().page)
        {
            this.tbl_bobranchlocations.source.setPage((this.bobranchmaster_service.bobranchlocations.length / this.tbl_bobranchlocations.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bobranchlocations.source.grid.edit(this.tbl_bobranchlocations.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bobranchlocations.source.data.indexOf(event.data);
    this.onDelete_bobranchlocation(event,event.data.locationid,((this.tbl_bobranchlocations.source.getPaging().page-1) *this.tbl_bobranchlocations.source.getPaging().perPage)+index);
    this.tbl_bobranchlocations.source.refresh();
    break;
    }
    }
    
    */
    bobranchlocations_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_bobranchlocation(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bobranchlocation(event, event.data.locationid, this.formid);
                break;
            case 'delete':
                this.onDelete_bobranchlocation(event, event.data.locationid, ((this.tbl_bobranchlocations.source.getPaging().page - 1) * this.tbl_bobranchlocations.source.getPaging().perPage) + event.index);
                this.tbl_bobranchlocations.source.refresh();
                break;
        }
    }
    bobranchlocations_onDelete(obj) {
        let locationid = obj.data.locationid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bobranchmaster_service.delete_bobranchmaster(locationid).then(res => this.bobranchlocations_LoadTable());
        }
    }
    onCustom_bobranchlocations_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bobranchlocations");
            let formname = objbomenuaction.actionname;
        });
    }
    bobranchlocations_Paging(val) {
        debugger;
        this.tbl_bobranchlocations.source.setPaging(1, val, true);
    }
    handle_bobranchlocations_GridSelected(event) {
        this.bobranchlocations_selectedindex = this.tbl_bobranchlocations.source.findIndex(i => i.locationid === event.data.locationid);
    }
    Is_bobranchlocations_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bobranchlocations_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
bobranchmasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_20__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_22__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_23__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_12__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_24__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_25__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_25__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_25__.DialogService },
    { type: _service_bobranchmaster_service__WEBPACK_IMPORTED_MODULE_1__.bobranchmasterService },
    { type: _service_bobranchholiday_service__WEBPACK_IMPORTED_MODULE_6__.bobranchholidayService },
    { type: _service_bobranchlocation_service__WEBPACK_IMPORTED_MODULE_9__.bobranchlocationService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_10__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_11__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_14__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_26__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_23__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_27__.NgxSpinnerService }
];
bobranchmasterComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild, args: ['customform', { static: false },] }],
    tbl_bobranchholidays: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild, args: ['tbl_bobranchholidays', { static: false },] }],
    tbl_bouserbranchaccesses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild, args: ['tbl_bouserbranchaccesses', { static: false },] }],
    tbl_bobranchlocations: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild, args: ['tbl_bobranchlocations', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_15__.ViewChild, args: ['fileattachment', { static: false },] }]
};
bobranchmasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.Component)({
        selector: 'app-bobranchmaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bobranchmaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_22__.KeyboardShortcutsService]
    })
], bobranchmasterComponent);



/***/ }),

/***/ 85436:
/*!**********************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bobranchsublocation/bobranchsublocation.component.ts ***!
  \**********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bobranchsublocationComponent": () => (/* binding */ bobranchsublocationComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bobranchsublocation_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bobranchsublocation.component.html */ 15430);
/* harmony import */ var _service_bobranchsublocation_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bobranchsublocation.service */ 70907);
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

let bobranchsublocationComponent = class bobranchsublocationComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bobranchsublocation_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bobranchsublocation_service = bobranchsublocation_service;
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
        this.bfilterPopulate_bobranchsublocations = false;
        this.bobranchsublocation_menuactions = [];
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
        this.bobranchsublocation_Form = this.fb.group({
            pk: [null],
            branchid: [null],
            sublocationid: [null],
            locationid: [null],
            locationiddesc: [null],
            locationname: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bobranchsublocation_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bobranchsublocation_Form.dirty && this.bobranchsublocation_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.sublocationid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.sublocationid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.sublocationid && pkDetail) {
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
            let bobranchsublocationid = null;
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
            this.formid = bobranchsublocationid;
            //alert(bobranchsublocationid);
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
            this.bobranchsublocation_service.getDefaultData().then(res => {
                this.locationid_List = res.list_locationid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bobranchsublocation_service.get_bobranchsublocations_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bobranchsublocation_Form.markAsUntouched();
            this.bobranchsublocation_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.bobranchsublocation_Form != null)
            this.bobranchsublocation_Form.reset();
        this.bobranchsublocation_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let sublocationid = this.bobranchsublocation_Form.get('sublocationid').value;
        if (sublocationid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bobranchsublocation_service.delete_bobranchsublocation(sublocationid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bobranchsublocation_Form.patchValue({
            sublocationid: null
        });
        if (this.formData.sublocationid != null)
            this.formData.sublocationid = null;
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
                        this.bobranchsublocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bobranchsublocation_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bobranchsublocation_Form.controls[key] != undefined) {
                                this.bobranchsublocation_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.locationname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.locationname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    locationid_onChange(evt) {
        let e = evt.value;
        this.bobranchsublocation_Form.patchValue({ locationiddesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_bobranchsublocations() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bobranchsublocation_service.get_bobranchsublocations_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bobranchsublocation;
                let formproperty = res.bobranchsublocation.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bobranchsublocation.pkcol;
                this.formid = res.bobranchsublocation.sublocationid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bobranchsublocation;
        this.formid = res.bobranchsublocation.sublocationid;
        this.pkcol = res.bobranchsublocation.pkcol;
        this.bmyrecord = false;
        if (res.bobranchsublocation.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bobranchsublocation_Form.patchValue({
            branchid: res.bobranchsublocation.branchid,
            sublocationid: res.bobranchsublocation.sublocationid,
            locationid: res.bobranchsublocation.locationid,
            locationiddesc: res.bobranchsublocation.locationiddesc,
            locationname: res.bobranchsublocation.locationname,
            status: res.bobranchsublocation.status,
            statusdesc: res.bobranchsublocation.statusdesc,
        });
        this.bobranchsublocation_menuactions = res.bobranchsublocation_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bobranchsublocation_Form.controls) {
            let val = this.bobranchsublocation_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bobranchsublocation_Form.controls[key] != null) {
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
            if (!this.bobranchsublocation_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bobranchsublocation_Form.getRawValue();
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
            // Object.keys(this.bobranchsublocation_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bobranchsublocation_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += '' + key + '' + keyError + '';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bobranchsublocation_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bobranchsublocation_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bobranchsublocation_Form.controls[key] != null) {
                            this.formData[key] = this.bobranchsublocation_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.bobranchsublocation_service.saveOrUpdate_bobranchsublocations(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bobranchsublocation);
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
                        this.objvalues.push(res.bobranchsublocation);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bobranchsublocation_Form.markAsUntouched();
                this.bobranchsublocation_Form.markAsPristine();
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
bobranchsublocationComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_bobranchsublocation_service__WEBPACK_IMPORTED_MODULE_1__.bobranchsublocationService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
bobranchsublocationComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-bobranchsublocation',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bobranchsublocation_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], bobranchsublocationComponent);



/***/ }),

/***/ 80717:
/*!********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bousermaster/bousermaster.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bousermasterComponent": () => (/* binding */ bousermasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bousermaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bousermaster.component.html */ 90917);
/* harmony import */ var _service_bousermaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bousermaster.service */ 17272);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _bomenumaster_bomenumaster_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../bomenumaster/bomenumaster.component */ 66064);
/* harmony import */ var _service_bomenumaster_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../service/bomenumaster.service */ 49673);
/* harmony import */ var _pages_forms_bobranchmaster_bobranchmaster_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../pages/forms/bobranchmaster/bobranchmaster.component */ 18035);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions



//Shortcuts

//translator






//primeng services



//session,application constants




//custom fields & attachments


let bousermasterComponent = class bousermasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bousermaster_service, bomenumaster_service, 
    //private bobranchmaster_service: bobranchmasterService,
    fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bousermaster_service = bousermaster_service;
        this.bomenumaster_service = bomenumaster_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_bousermasters = false;
        this.bfilterPopulate_bousermenuaccesses = false;
        this.bfilterPopulate_bouserbranchaccesses = false;
        this.bousermaster_menuactions = [];
        this.bousermenuaccess_menuactions = [];
        this.bouserbranchaccess_menuactions = [];
        this.branchid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.reportingto_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.role_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.countryid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.stateid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.cityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.approvallevel_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.approvallevel1_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.approvallevel2_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.approvallevel3_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.approvallevel4_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.approvallevel5_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_10__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_10__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_bousermenuaccess_IDs = "";
        this.bousermenuaccesses_ID = "1";
        this.Deleted_bouserbranchaccess_IDs = "";
        this.bouserbranchaccesses_ID = "2";
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
        this.bousermaster_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            userid: [null],
            sourcefield: [null],
            sourcereference: [null],
            userroleid: [null],
            userroleiddesc: [null],
            branchid: [null],
            branchiddesc: [null],
            departmentid: [null],
            departmentiddesc: [null],
            usercode: [null],
            username: [null],
            shortname: [null],
            bio: [null],
            avatar: [null],
            designation: [null],
            designationdesc: [null],
            reportingto: [null],
            reportingtodesc: [null],
            role: [null],
            roledesc: [null],
            emailid: [null],
            mobilenumber: [null],
            password: [null],
            nextloginchangepassword: [null],
            validityfrom: [null],
            validityto: [null],
            educationid: [null],
            educationiddesc: [null],
            usersignature: [null],
            userphoto: [null],
            thumbnail: [null],
            emailpassword: [null],
            emailsignature: [null],
            dateofbirth: [null],
            defaultpage: [null],
            defaultlanguage: [null],
            defaultlanguagedesc: [null],
            layoutpage: [null],
            theme: [null],
            gender: [null],
            genderdesc: [null],
            nationality: [null],
            nationalitydesc: [null],
            bloodgroup: [null],
            bloodgroupdesc: [null],
            religion: [null],
            religiondesc: [null],
            maritalstatus: [null],
            maritalstatusdesc: [null],
            referencenumber: [null],
            address1: [null],
            address2: [null],
            countryid: [null],
            countryiddesc: [null],
            stateid: [null],
            stateiddesc: [null],
            cityid: [null],
            cityiddesc: [null],
            zipcode: [null],
            emergencycontactperson: [null],
            relationship: [null],
            cpphonenumber: [null],
            emailnotifications: [null],
            whatsappnotifications: [null],
            employeespecificapproval: [null],
            autoapproval: [null],
            approvallevel: [null],
            approvalleveldesc: [null],
            approvallevel1: [null],
            approvallevel1desc: [null],
            approvallevel2: [null],
            approvallevel2desc: [null],
            approvallevel3: [null],
            approvallevel3desc: [null],
            approvallevel4: [null],
            approvallevel4desc: [null],
            approvallevel5: [null],
            approvallevel5desc: [null],
            approvalleveltype1: [null],
            approvalleveltype1desc: [null],
            approvalleveltype2: [null],
            approvalleveltype2desc: [null],
            approvalleveltype3: [null],
            approvalleveltype3desc: [null],
            approvalleveltype4: [null],
            approvalleveltype4desc: [null],
            approvalleveltype5: [null],
            approvalleveltype5desc: [null],
            twitter: [null],
            facebook: [null],
            linkedin: [null],
            skype: [null],
            googleplus: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
            employeeid: [null],
        });
    }
    get f() { return this.bousermaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bousermaster_Form.dirty && this.bousermaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_13__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_13__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_13__.Observable.of(true);
    }
    //check Unique fields
    emailidexists(e) {
        debugger;
        let pos = this.pkList.map(function (e) { return e.emailid.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
        if (pos >= 0 && this.pkList[pos].userid.toString() != this.formid.toString()) {
            if (confirm("This Email value exists in the database.Do you want to display the record ? ")) {
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
    mobilenumberexists(e) {
        debugger;
        let pos = this.pkList.map(function (e) { return e.mobilenumber.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
        if (pos >= 0 && this.pkList[pos].userid.toString() != this.formid.toString()) {
            if (confirm("This Mobile Number value exists in the database.Do you want to display the record ? ")) {
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
    usercodeexists(e) {
        debugger;
        let pos = this.pkList.map(function (e) { return e.usercode.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
        if (pos >= 0 && this.pkList[pos].userid.toString() != this.formid.toString()) {
            if (confirm("This User Code value exists in the database.Do you want to display the record ? ")) {
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
        let pos = this.pkList.map(function (e) { return e.userid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.userid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.userid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
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
            let bousermasterid = null;
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
            this.formid = bousermasterid;
            //alert(bousermasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bousermenuaccesses_TableConfig();
                setTimeout(() => {
                    //this.Set_bousermenuaccesses_TableDropDownConfig();
                });
                this.Set_bouserbranchaccesses_TableConfig();
                setTimeout(() => {
                    //this.Set_bouserbranchaccesses_TableDropDownConfig();
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
            this.bousermaster_service.getDefaultData().then(res => {
                this.userroleid_List = res.list_userroleid.value;
                this.branchid_List = res.list_branchid.value;
                this.departmentid_List = res.list_departmentid.value;
                this.designation_List = res.list_designation.value;
                this.reportingto_List = res.list_reportingto.value;
                this.role_List = res.list_role.value;
                this.educationid_List = res.list_educationid.value;
                this.defaultlanguage_List = res.list_defaultlanguage.value;
                this.gender_List = res.list_gender.value;
                this.nationality_List = res.list_nationality.value;
                this.bloodgroup_List = res.list_bloodgroup.value;
                this.religion_List = res.list_religion.value;
                this.maritalstatus_List = res.list_maritalstatus.value;
                this.countryid_List = res.list_countryid.value;
                this.stateid_List = res.list_stateid.value;
                this.cityid_List = res.list_cityid.value;
                this.approvallevel_List = res.list_approvallevel.value;
                this.approvallevel1_List = res.list_approvallevel1.value;
                this.approvallevel2_List = res.list_approvallevel2.value;
                this.approvallevel3_List = res.list_approvallevel3.value;
                this.approvallevel4_List = res.list_approvallevel4.value;
                this.approvallevel5_List = res.list_approvallevel5.value;
                this.approvalleveltype1_List = res.list_approvalleveltype1.value;
                this.approvalleveltype2_List = res.list_approvalleveltype2.value;
                this.approvalleveltype3_List = res.list_approvalleveltype3.value;
                this.approvalleveltype4_List = res.list_approvalleveltype4.value;
                this.approvalleveltype5_List = res.list_approvalleveltype5.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bousermaster_service.get_bousermasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bousermaster_Form.markAsUntouched();
            this.bousermaster_Form.markAsPristine();
        });
    }
    onSelected_branchid(branchidDetail) {
        if (branchidDetail.value && branchidDetail) {
            this.bousermaster_Form.patchValue({
                branchid: branchidDetail.value,
                branchiddesc: branchidDetail.label,
            });
        }
    }
    onSelected_reportingto(reportingtoDetail) {
        if (reportingtoDetail.value && reportingtoDetail) {
            this.bousermaster_Form.patchValue({
                reportingto: reportingtoDetail.value,
                reportingtodesc: reportingtoDetail.label,
            });
        }
    }
    onSelected_role(roleDetail) {
        if (roleDetail.value && roleDetail) {
            this.bousermaster_Form.patchValue({
                role: roleDetail.value,
                roledesc: roleDetail.label,
            });
        }
    }
    onSelected_countryid(countryidDetail) {
        if (countryidDetail.value && countryidDetail) {
            this.bousermaster_Form.patchValue({
                countryid: countryidDetail.value,
                countryiddesc: countryidDetail.label,
            });
        }
    }
    onSelected_stateid(stateidDetail) {
        if (stateidDetail.value && stateidDetail) {
            this.bousermaster_Form.patchValue({
                stateid: stateidDetail.value,
                stateiddesc: stateidDetail.label,
            });
        }
    }
    onSelected_cityid(cityidDetail) {
        if (cityidDetail.value && cityidDetail) {
            this.bousermaster_Form.patchValue({
                cityid: cityidDetail.value,
                cityiddesc: cityidDetail.label,
            });
        }
    }
    onSelected_approvallevel(approvallevelDetail) {
        if (approvallevelDetail.value && approvallevelDetail) {
            this.bousermaster_Form.patchValue({
                approvallevel: approvallevelDetail.value,
                approvalleveldesc: approvallevelDetail.label,
            });
        }
    }
    onSelected_approvallevel1(approvallevel1Detail) {
        if (approvallevel1Detail.value && approvallevel1Detail) {
            this.bousermaster_Form.patchValue({
                approvallevel1: approvallevel1Detail.value,
                approvallevel1desc: approvallevel1Detail.label,
            });
        }
    }
    onSelected_approvallevel2(approvallevel2Detail) {
        if (approvallevel2Detail.value && approvallevel2Detail) {
            this.bousermaster_Form.patchValue({
                approvallevel2: approvallevel2Detail.value,
                approvallevel2desc: approvallevel2Detail.label,
            });
        }
    }
    onSelected_approvallevel3(approvallevel3Detail) {
        if (approvallevel3Detail.value && approvallevel3Detail) {
            this.bousermaster_Form.patchValue({
                approvallevel3: approvallevel3Detail.value,
                approvallevel3desc: approvallevel3Detail.label,
            });
        }
    }
    onSelected_approvallevel4(approvallevel4Detail) {
        if (approvallevel4Detail.value && approvallevel4Detail) {
            this.bousermaster_Form.patchValue({
                approvallevel4: approvallevel4Detail.value,
                approvallevel4desc: approvallevel4Detail.label,
            });
        }
    }
    onSelected_approvallevel5(approvallevel5Detail) {
        if (approvallevel5Detail.value && approvallevel5Detail) {
            this.bousermaster_Form.patchValue({
                approvallevel5: approvallevel5Detail.value,
                approvallevel5desc: approvallevel5Detail.label,
            });
        }
    }
    getuserphoto() {
        debugger;
        if (this.userphoto.getAttachmentList().length > 0) {
            let file = this.userphoto.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }
    getusersignature() {
        debugger;
        if (this.usersignature.getAttachmentList().length > 0) {
            let file = this.usersignature.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }
    resetForm() {
        if (this.bousermaster_Form != null)
            this.bousermaster_Form.reset();
        this.bousermaster_Form.patchValue({
            branchid: this.sessionData.branchid,
            branchiddesc: this.sessionData.branchiddesc,
            reportingto: this.sessionData.userid,
            reportingtodesc: this.sessionData.username,
            approvallevel: this.sessionData.userid,
            approvalleveldesc: this.sessionData.username,
            approvallevel1: this.sessionData.userid,
            approvallevel1desc: this.sessionData.username,
            approvallevel2: this.sessionData.userid,
            approvallevel2desc: this.sessionData.username,
            approvallevel3: this.sessionData.userid,
            approvallevel3desc: this.sessionData.username,
            approvallevel4: this.sessionData.userid,
            approvallevel4desc: this.sessionData.username,
            approvallevel5: this.sessionData.userid,
            approvallevel5desc: this.sessionData.username,
        });
        this.bousermaster_Form.patchValue({
            validityfrom: this.ngbDateParserFormatter.parse(new Date().toString()),
            validityto: this.ngbDateParserFormatter.parse(this.sharedService.addMonths(new Date(), 6).toString()),
            educationid: 6,
            dateofbirth: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            defaultlanguage: 11,
        });
        setTimeout(() => {
            this.Insertbousermenuaccesses = [];
            this.bousermenuaccesses_LoadTable();
            this.Insertbouserbranchaccesses = [];
            this.bouserbranchaccesses_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.data != null) {
            this.bousermaster_Form.patchValue({
                sourcefield: this.data.sourcefield, sourcereference: this.data.sourcereference
            });
        }
    }
    onDelete() {
        let userid = this.bousermaster_Form.get('userid').value;
        if (userid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bousermaster_service.delete_bousermaster(userid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bousermaster_Form.patchValue({
            userid: null
        });
        if (this.formData.userid != null)
            this.formData.userid = null;
        for (let i = 0; i < this.tbl_bousermenuaccesses.source.length; i++) {
            this.tbl_bousermenuaccesses.source[i].usermenuaccessid = null;
        }
        for (let i = 0; i < this.tbl_bouserbranchaccesses.source.length; i++) {
            this.tbl_bouserbranchaccesses.source[i].accessid = null;
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
                    else if (key == "validityfrom")
                        this.bousermaster_Form.patchValue({ "validityfrom": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "validityto")
                        this.bousermaster_Form.patchValue({ "validityto": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "dateofbirth")
                        this.bousermaster_Form.patchValue({ "dateofbirth": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.bousermaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bousermaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bousermaster_Form.controls[key] != undefined) {
                                this.bousermaster_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("bousermasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
        this.router.navigate(['/home/boreportviewer/e99kq']);
    }
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.username != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.username != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    userroleid_onChange(evt) {
        let e = evt.value;
        this.bousermaster_Form.patchValue({ userroleiddesc: evt.options[evt.options.selectedIndex].text });
    }
    branchid_onChange(evt) {
        let e = evt.value;
    }
    departmentid_onChange(evt) {
        let e = evt.value;
        this.bousermaster_Form.patchValue({ departmentiddesc: evt.options[evt.options.selectedIndex].text });
    }
    designation_onChange(evt) {
        let e = evt.value;
        this.bousermaster_Form.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
    }
    reportingto_onChange(evt) {
        let e = evt.value;
    }
    role_onChange(evt) {
        let e = evt.value;
    }
    educationid_onChange(evt) {
        let e = evt.value;
        this.bousermaster_Form.patchValue({ educationiddesc: evt.options[evt.options.selectedIndex].text });
    }
    defaultlanguage_onChange(evt) {
        let e = evt.value;
        this.bousermaster_Form.patchValue({ defaultlanguagedesc: evt.options[evt.options.selectedIndex].text });
    }
    gender_onChange(evt) {
        let e = this.f.gender.value;
        this.bousermaster_Form.patchValue({ genderdesc: evt.options[evt.options.selectedIndex].text });
    }
    nationality_onChange(evt) {
        let e = this.f.nationality.value;
        this.bousermaster_Form.patchValue({ nationalitydesc: evt.options[evt.options.selectedIndex].text });
    }
    bloodgroup_onChange(evt) {
        let e = this.f.bloodgroup.value;
        this.bousermaster_Form.patchValue({ bloodgroupdesc: evt.options[evt.options.selectedIndex].text });
    }
    religion_onChange(evt) {
        let e = this.f.religion.value;
        this.bousermaster_Form.patchValue({ religiondesc: evt.options[evt.options.selectedIndex].text });
    }
    maritalstatus_onChange(evt) {
        let e = this.f.maritalstatus.value;
        this.bousermaster_Form.patchValue({ maritalstatusdesc: evt.options[evt.options.selectedIndex].text });
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
    approvallevel_onChange(evt) {
        let e = evt.value;
    }
    approvallevel1_onChange(evt) {
        let e = evt.value;
    }
    approvallevel2_onChange(evt) {
        let e = evt.value;
    }
    approvallevel3_onChange(evt) {
        let e = evt.value;
    }
    approvallevel4_onChange(evt) {
        let e = evt.value;
    }
    approvallevel5_onChange(evt) {
        let e = evt.value;
    }
    approvalleveltype1_onChange(evt) {
        let e = this.f.approvalleveltype1.value;
        this.bousermaster_Form.patchValue({ approvalleveltype1desc: evt.options[evt.options.selectedIndex].text });
    }
    approvalleveltype2_onChange(evt) {
        let e = this.f.approvalleveltype2.value;
        this.bousermaster_Form.patchValue({ approvalleveltype2desc: evt.options[evt.options.selectedIndex].text });
    }
    approvalleveltype3_onChange(evt) {
        let e = this.f.approvalleveltype3.value;
        this.bousermaster_Form.patchValue({ approvalleveltype3desc: evt.options[evt.options.selectedIndex].text });
    }
    approvalleveltype4_onChange(evt) {
        let e = this.f.approvalleveltype4.value;
        this.bousermaster_Form.patchValue({ approvalleveltype4desc: evt.options[evt.options.selectedIndex].text });
    }
    approvalleveltype5_onChange(evt) {
        let e = this.f.approvalleveltype5.value;
        this.bousermaster_Form.patchValue({ approvalleveltype5desc: evt.options[evt.options.selectedIndex].text });
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
    edit_bousermasters() {
        this.showview = false;
        setTimeout(() => {
            if (this.userphoto != null && this.userphoto != undefined)
                this.userphoto.setattachmentlist(this.bousermaster_Form.get('userphoto').value);
            if (this.usersignature != null && this.usersignature != undefined)
                this.usersignature.setattachmentlist(this.bousermaster_Form.get('usersignature').value);
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bousermaster_service.get_bousermasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bousermaster;
                let formproperty = res.bousermaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bousermaster.pkcol;
                this.formid = res.bousermaster.userid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bousermaster;
        this.formid = res.bousermaster.userid;
        this.pkcol = res.bousermaster.pkcol;
        this.bmyrecord = false;
        if (res.bousermaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bousermaster_Form.patchValue({
            userid: res.bousermaster.userid,
            sourcefield: res.bousermaster.sourcefield,
            sourcereference: res.bousermaster.sourcereference,
            userroleid: res.bousermaster.userroleid,
            userroleiddesc: res.bousermaster.userroleiddesc,
            branchid: res.bousermaster.branchid,
            branchiddesc: res.bousermaster.branchiddesc,
            departmentid: res.bousermaster.departmentid,
            departmentiddesc: res.bousermaster.departmentiddesc,
            usercode: res.bousermaster.usercode,
            username: res.bousermaster.username,
            shortname: res.bousermaster.shortname,
            bio: res.bousermaster.bio,
            avatar: res.bousermaster.avatar,
            designation: res.bousermaster.designation,
            designationdesc: res.bousermaster.designationdesc,
            reportingto: res.bousermaster.reportingto,
            reportingtodesc: res.bousermaster.reportingtodesc,
            role: res.bousermaster.role,
            roledesc: res.bousermaster.roledesc,
            emailid: res.bousermaster.emailid,
            mobilenumber: res.bousermaster.mobilenumber,
            password: res.bousermaster.password,
            nextloginchangepassword: res.bousermaster.nextloginchangepassword,
            validityfrom: this.ngbDateParserFormatter.parse(res.bousermaster.validityfrom),
            validityto: this.ngbDateParserFormatter.parse(res.bousermaster.validityto),
            educationid: res.bousermaster.educationid,
            educationiddesc: res.bousermaster.educationiddesc,
            usersignature: JSON.parse(res.bousermaster.usersignature),
            userphoto: JSON.parse(res.bousermaster.userphoto),
            thumbnail: res.bousermaster.thumbnail,
            emailpassword: res.bousermaster.emailpassword,
            emailsignature: res.bousermaster.emailsignature,
            dateofbirth: this.ngbDateParserFormatter.parse(res.bousermaster.dateofbirth),
            defaultpage: res.bousermaster.defaultpage,
            defaultlanguage: res.bousermaster.defaultlanguage,
            defaultlanguagedesc: res.bousermaster.defaultlanguagedesc,
            layoutpage: res.bousermaster.layoutpage,
            theme: res.bousermaster.theme,
            gender: res.bousermaster.gender,
            genderdesc: res.bousermaster.genderdesc,
            nationality: res.bousermaster.nationality,
            nationalitydesc: res.bousermaster.nationalitydesc,
            bloodgroup: res.bousermaster.bloodgroup,
            bloodgroupdesc: res.bousermaster.bloodgroupdesc,
            religion: res.bousermaster.religion,
            religiondesc: res.bousermaster.religiondesc,
            maritalstatus: res.bousermaster.maritalstatus,
            maritalstatusdesc: res.bousermaster.maritalstatusdesc,
            referencenumber: res.bousermaster.referencenumber,
            address1: res.bousermaster.address1,
            address2: res.bousermaster.address2,
            countryid: res.bousermaster.countryid,
            countryiddesc: res.bousermaster.countryiddesc,
            stateid: res.bousermaster.stateid,
            stateiddesc: res.bousermaster.stateiddesc,
            cityid: res.bousermaster.cityid,
            cityiddesc: res.bousermaster.cityiddesc,
            zipcode: res.bousermaster.zipcode,
            emergencycontactperson: res.bousermaster.emergencycontactperson,
            relationship: res.bousermaster.relationship,
            cpphonenumber: res.bousermaster.cpphonenumber,
            emailnotifications: res.bousermaster.emailnotifications,
            whatsappnotifications: res.bousermaster.whatsappnotifications,
            employeespecificapproval: res.bousermaster.employeespecificapproval,
            autoapproval: res.bousermaster.autoapproval,
            approvallevel: res.bousermaster.approvallevel,
            approvalleveldesc: res.bousermaster.approvalleveldesc,
            approvallevel1: res.bousermaster.approvallevel1,
            approvallevel1desc: res.bousermaster.approvallevel1desc,
            approvallevel2: res.bousermaster.approvallevel2,
            approvallevel2desc: res.bousermaster.approvallevel2desc,
            approvallevel3: res.bousermaster.approvallevel3,
            approvallevel3desc: res.bousermaster.approvallevel3desc,
            approvallevel4: res.bousermaster.approvallevel4,
            approvallevel4desc: res.bousermaster.approvallevel4desc,
            approvallevel5: res.bousermaster.approvallevel5,
            approvallevel5desc: res.bousermaster.approvallevel5desc,
            approvalleveltype1: res.bousermaster.approvalleveltype1,
            approvalleveltype1desc: res.bousermaster.approvalleveltype1desc,
            approvalleveltype2: res.bousermaster.approvalleveltype2,
            approvalleveltype2desc: res.bousermaster.approvalleveltype2desc,
            approvalleveltype3: res.bousermaster.approvalleveltype3,
            approvalleveltype3desc: res.bousermaster.approvalleveltype3desc,
            approvalleveltype4: res.bousermaster.approvalleveltype4,
            approvalleveltype4desc: res.bousermaster.approvalleveltype4desc,
            approvalleveltype5: res.bousermaster.approvalleveltype5,
            approvalleveltype5desc: res.bousermaster.approvalleveltype5desc,
            twitter: res.bousermaster.twitter,
            facebook: res.bousermaster.facebook,
            linkedin: res.bousermaster.linkedin,
            skype: res.bousermaster.skype,
            googleplus: res.bousermaster.googleplus,
            customfield: res.bousermaster.customfield,
            attachment: JSON.parse(res.bousermaster.attachment),
            status: res.bousermaster.status,
            statusdesc: res.bousermaster.statusdesc,
            employeeid: res.bousermaster.employeeid,
        });
        this.bousermaster_menuactions = res.bousermaster_menuactions;
        this.bousermenuaccess_menuactions = res.bousermenuaccess_menuactions;
        this.bousermenuaccesses_visiblelist = res.bousermenuaccesses_visiblelist;
        this.bouserbranchaccess_menuactions = res.bouserbranchaccess_menuactions;
        this.bouserbranchaccesses_visiblelist = res.bouserbranchaccesses_visiblelist;
        if (this.bousermaster_Form.get('customfield').value != null && this.bousermaster_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.bousermaster_Form.get('customfield').value);
        this.FillCustomField();
        if (this.bousermaster_Form.get('userphoto').value != null && this.bousermaster_Form.get('userphoto').value != "" && this.userphoto != null && this.userphoto != undefined)
            this.userphoto.setattachmentlist(this.bousermaster_Form.get('userphoto').value);
        if (this.bousermaster_Form.get('usersignature').value != null && this.bousermaster_Form.get('usersignature').value != "" && this.usersignature != null && this.usersignature != undefined)
            this.usersignature.setattachmentlist(this.bousermaster_Form.get('usersignature').value);
        if (this.bousermaster_Form.get('attachment').value != null && this.bousermaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.bousermaster_Form.get('attachment').value);
        //Child Tables if any
        this.Set_bousermenuaccesses_TableConfig();
        this.bousermenuaccesses_LoadTable(res.bousermenuaccesses);
        this.Insertbousermenuaccesses = [];
        this.Set_bouserbranchaccesses_TableConfig();
        this.bouserbranchaccesses_LoadTable(res.bouserbranchaccesses);
        this.Insertbouserbranchaccesses = [];
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bousermaster_Form.controls) {
            let val = this.bousermaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bousermaster_Form.controls[key] != null) {
                if (key == "userphoto" || key == "usersignature") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0)
                        ret = ret.replace(new RegExp('##' + key + '##', 'g'), _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_10__.AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
                }
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.bousermaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.bousermaster_Form.getRawValue();
            obj.validityfrom = new Date(this.bousermaster_Form.get('validityfrom').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('validityfrom').value) + '  UTC' : null);
            obj.validityto = new Date(this.bousermaster_Form.get('validityto').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('validityto').value) + '  UTC' : null);
            obj.dateofbirth = new Date(this.bousermaster_Form.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('dateofbirth').value) + '  UTC' : null);
            if (customfields != null)
                obj.customfield = JSON.stringify(customfields);
            if (this.userphoto.getAttachmentList() != null)
                obj.userphoto = JSON.stringify(this.userphoto.getAttachmentList());
            if (this.userphoto.getAttachmentList() != null)
                obj.userphoto = JSON.stringify(this.userphoto.getAttachmentList());
            if (this.fileattachment.getAttachmentList() != null)
                obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            obj.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(obj);
            if (!confirm('Do you want to want to save?')) {
                return;
            }
            yield this.sharedService.upload(this.userphoto.getAllFiles());
            yield this.sharedService.upload(this.usersignature.getAllFiles());
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.bousermaster_Form.controls).forEach(key => {
            //   const controlErrors: ValidationErrors = this.bousermaster_Form.get(key).errors;
            //   if (controlErrors != null) {
            //     Object.keys(controlErrors).forEach(keyError => {
            //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //     });
            //   }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bousermaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bousermaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bousermaster_Form.controls[key] != null) {
                            this.formData[key] = this.bousermaster_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            this.formData.validityfrom = new Date(this.bousermaster_Form.get('validityfrom').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('validityfrom').value) + '  UTC' : null);
            this.formData.validityto = new Date(this.bousermaster_Form.get('validityto').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('validityto').value) + '  UTC' : null);
            this.formData.usersignature = this.bousermaster_Form.get('usersignature').value;
            this.formData.userphoto = this.bousermaster_Form.get('userphoto').value;
            this.formData.dateofbirth = new Date(this.bousermaster_Form.get('dateofbirth').value ? this.ngbDateParserFormatter.format(this.bousermaster_Form.get('dateofbirth').value) + '  UTC' : null);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_bousermenuaccess_IDs = this.Deleted_bousermenuaccess_IDs;
            this.formData.Deleted_bouserbranchaccess_IDs = this.Deleted_bouserbranchaccess_IDs;
            if (this.userphoto.getAttachmentList() != null)
                this.formData.userphoto = JSON.stringify(this.userphoto.getAttachmentList());
            if (this.userphoto.getAttachmentList() != null)
                this.formData.userphoto = JSON.stringify(this.userphoto.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.bousermaster_service.saveOrUpdate_bousermasters(this.formData, (_b = (_a = this.tbl_bousermenuaccesses) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, this.Insertbousermenuaccesses, (_d = (_c = this.tbl_bouserbranchaccesses) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data, this.Insertbouserbranchaccesses).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.userphoto.getAllFiles());
                yield this.sharedService.upload(this.usersignature.getAllFiles());
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_bousermenuaccesses.source) {
                    for (let i = 0; i < this.tbl_bousermenuaccesses.source.data.length; i++) {
                        if (this.tbl_bousermenuaccesses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bousermenuaccesses.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_bouserbranchaccesses.source) {
                    for (let i = 0; i < this.tbl_bouserbranchaccesses.source.data.length; i++) {
                        if (this.tbl_bouserbranchaccesses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bouserbranchaccesses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bousermaster);
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
                        this.objvalues.push(res.bousermaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bousermaster_Form.markAsUntouched();
                this.bousermaster_Form.markAsPristine();
            }), err => {
                debugger;
                this.spinner.hide();
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            });
        });
    }
    viewemployeeid() {
        /*
        this.dialog.open(hrmsemployeeComponent,
          {
            data: { showview: false,save:true,pkcol:this.sharedService.pk_encode(this.bousermaster_Form.get('employeeid').value), ScreenType: 2 },
          }
        ).onClose.subscribe(res => {
        });
        */
    }
    //dropdown edit from the screen itself -> One screen like Reportviewer
    clearList() {
        this.tbl_bousermenuaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource();
        this.tbl_bouserbranchaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    //start of Grid Codes bousermenuaccesses
    onCustom_bousermenuaccesses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            switch (event.action) {
                case 'viewrecord':
                    let val = event.data.pkcol;
                    this.dialog.open(_bomenumaster_bomenumaster_component__WEBPACK_IMPORTED_MODULE_4__.bomenumasterComponent, {
                        data: { showview: false, pkcol: val, ScreenType: 2 },
                    }).onClose.subscribe(res => {
                    });
                    break;
            }
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bousermenuaccesses");
            let formname = objbomenuaction.actionname;
        });
    }
    show_bousermenuaccesses_Checkbox() {
        debugger;
        if (this.tbl_bousermenuaccesses.source.settings['selectMode'] == 'multi')
            this.tbl_bousermenuaccesses.source.settings['selectMode'] = 'single';
        else
            this.tbl_bousermenuaccesses.source.settings['selectMode'] = 'multi';
        this.tbl_bousermenuaccesses.source.initGrid();
    }
    delete_bousermenuaccesses_All() {
        this.tbl_bousermenuaccesses.source.settings['selectMode'] = 'single';
    }
    show_bousermenuaccesses_Filter() {
        setTimeout(() => {
            //  this.Set_bousermenuaccesses_TableDropDownConfig();
        });
        if (this.tbl_bousermenuaccesses.source.settings != null)
            this.tbl_bousermenuaccesses.source.settings['hideSubHeader'] = !this.tbl_bousermenuaccesses.source.settings['hideSubHeader'];
        this.tbl_bousermenuaccesses.source.initGrid();
    }
    show_bousermenuaccesses_InActive() {
    }
    enable_bousermenuaccesses_InActive() {
    }
    Set_bousermenuaccesses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bousermenuaccesses) {
            }
            this.bfilterPopulate_bousermenuaccesses = true;
        });
    }
    bousermenuaccesses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bousermenuaccesses_TableConfig() {
        this.bousermenuaccesses_settings = {
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
                usermenuaccessid: {
                    title: 'User Menu Access',
                    type: '',
                },
                menuid: {
                    title: 'Menu',
                    type: '',
                },
                menudescription: {
                    title: 'Menudescription',
                    type: '',
                },
                menuurl: {
                    title: 'Menuurl',
                    type: '',
                },
                parentid: {
                    title: 'Parentid',
                    type: '',
                },
            },
        };
    }
    bousermenuaccesses_LoadTable(bousermenuaccesses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousermenuaccesses_ID) >= 0) {
            if (this.tbl_bousermenuaccesses != undefined)
                this.tbl_bousermenuaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource();
            if (this.tbl_bousermenuaccesses != undefined)
                this.tbl_bousermenuaccesses.source.load(bousermenuaccesses);
            setTimeout(() => {
                if (this.tbl_bousermenuaccesses.source != null) {
                    this.tbl_bousermenuaccesses.source.grid.getRows().forEach((row) => {
                        if (row.data.usermenuaccessid != null && row.data.usermenuaccessid != "") {
                            this.Insertbousermenuaccesses.push(row.data);
                            this.tbl_bousermenuaccesses.source.grid.multipleSelectRow(row);
                        }
                    });
                }
            });
        }
    }
    //external to inline
    /*
    bousermenuaccesses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bousermaster_service.bousermenuaccesses.length == 0)
    {
        this.tbl_bousermenuaccesses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bousermenuaccess();
        this.bousermaster_service.bousermenuaccesses.push(obj);
        this.tbl_bousermenuaccesses.source.refresh();
        if ((this.bousermaster_service.bousermenuaccesses.length / this.tbl_bousermenuaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bousermenuaccesses.source.getPaging().page)
        {
            this.tbl_bousermenuaccesses.source.setPage((this.bousermaster_service.bousermenuaccesses.length / this.tbl_bousermenuaccesses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bousermenuaccesses.source.grid.edit(this.tbl_bousermenuaccesses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bousermenuaccesses.source.data.indexOf(event.data);
    this.onDelete_bousermenuaccess(event,event.data.usermenuaccessid,((this.tbl_bousermenuaccesses.source.getPaging().page-1) *this.tbl_bousermenuaccesses.source.getPaging().perPage)+index);
    this.tbl_bousermenuaccesses.source.refresh();
    break;
    }
    }
    
    */
    bousermenuaccesses_Paging(val) {
        debugger;
        this.tbl_bousermenuaccesses.source.setPaging(1, val, true);
    }
    handle_bousermenuaccesses_GridSelected(event) {
        debugger;
        if (event.isSelected) {
            if (event.data.usermenuaccessid == null || event.data.usermenuaccessid == "") {
                var obj = { userid: this.formid, menuid: event.data.menuid };
                this.Insertbousermenuaccesses.push(obj);
            }
            else {
                var deletedids = this.Deleted_bousermenuaccess_IDs.split(',');
                let i = 0;
                deletedids.forEach(id => {
                    if (id == event.data.usermenuaccessid) {
                        deletedids.splice(i, 1);
                    }
                    i++;
                });
                deletedids.join(",");
            }
        }
        else {
            if (event.data.usermenuaccessid != null && event.data.usermenuaccessid != "")
                this.Deleted_bousermenuaccess_IDs += event.data.usermenuaccessid + ",";
        }
    }
    Is_bousermenuaccesses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bousermenuaccesses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    //end of Grid Codes bousermenuaccesses
    //start of Grid Codes bouserbranchaccesses
    onCustom_bouserbranchaccesses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            switch (event.action) {
                case 'viewrecord':
                    let val = event.data.pkcol;
                    this.dialog.open(_pages_forms_bobranchmaster_bobranchmaster_component__WEBPACK_IMPORTED_MODULE_6__.bobranchmasterComponent, {
                        data: { showview: false, pkcol: val, ScreenType: 2 },
                    }).onClose.subscribe(res => {
                    });
                    break;
            }
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bouserbranchaccesses");
            let formname = objbomenuaction.actionname;
        });
    }
    show_bouserbranchaccesses_Checkbox() {
        debugger;
        if (this.tbl_bouserbranchaccesses.source.settings['selectMode'] == 'multi')
            this.tbl_bouserbranchaccesses.source.settings['selectMode'] = 'single';
        else
            this.tbl_bouserbranchaccesses.source.settings['selectMode'] = 'multi';
        this.tbl_bouserbranchaccesses.source.initGrid();
    }
    delete_bouserbranchaccesses_All() {
        this.tbl_bouserbranchaccesses.source.settings['selectMode'] = 'single';
    }
    show_bouserbranchaccesses_Filter() {
        setTimeout(() => {
            //  this.Set_bouserbranchaccesses_TableDropDownConfig();
        });
        if (this.tbl_bouserbranchaccesses.source.settings != null)
            this.tbl_bouserbranchaccesses.source.settings['hideSubHeader'] = !this.tbl_bouserbranchaccesses.source.settings['hideSubHeader'];
        this.tbl_bouserbranchaccesses.source.initGrid();
    }
    show_bouserbranchaccesses_InActive() {
    }
    enable_bouserbranchaccesses_InActive() {
    }
    Set_bouserbranchaccesses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bouserbranchaccesses) {
            }
            this.bfilterPopulate_bouserbranchaccesses = true;
        });
    }
    bouserbranchaccesses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bouserbranchaccesses_TableConfig() {
        this.bouserbranchaccesses_settings = {
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
                branchcode: {
                    title: 'Branchcode',
                    type: '',
                },
                branchname: {
                    title: 'Branchname',
                    type: '',
                },
            },
        };
    }
    bouserbranchaccesses_LoadTable(bouserbranchaccesses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bouserbranchaccesses_ID) >= 0) {
            if (this.tbl_bouserbranchaccesses != undefined)
                this.tbl_bouserbranchaccesses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource();
            if (this.tbl_bouserbranchaccesses != undefined)
                this.tbl_bouserbranchaccesses.source.load(bouserbranchaccesses);
            setTimeout(() => {
                if (this.tbl_bouserbranchaccesses.source != null) {
                    this.tbl_bouserbranchaccesses.source.grid.getRows().forEach((row) => {
                        if (row.data.accessid != null && row.data.accessid != "") {
                            this.Insertbouserbranchaccesses.push(row.data);
                            this.tbl_bouserbranchaccesses.source.grid.multipleSelectRow(row);
                        }
                    });
                }
            });
        }
    }
    //external to inline
    /*
    bouserbranchaccesses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bousermaster_service.bouserbranchaccesses.length == 0)
    {
        this.tbl_bouserbranchaccesses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bouserbranchaccess();
        this.bousermaster_service.bouserbranchaccesses.push(obj);
        this.tbl_bouserbranchaccesses.source.refresh();
        if ((this.bousermaster_service.bouserbranchaccesses.length / this.tbl_bouserbranchaccesses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bouserbranchaccesses.source.getPaging().page)
        {
            this.tbl_bouserbranchaccesses.source.setPage((this.bousermaster_service.bouserbranchaccesses.length / this.tbl_bouserbranchaccesses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bouserbranchaccesses.source.grid.edit(this.tbl_bouserbranchaccesses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bouserbranchaccesses.source.data.indexOf(event.data);
    this.onDelete_bouserbranchaccess(event,event.data.accessid,((this.tbl_bouserbranchaccesses.source.getPaging().page-1) *this.tbl_bouserbranchaccesses.source.getPaging().perPage)+index);
    this.tbl_bouserbranchaccesses.source.refresh();
    break;
    }
    }
    
    */
    bouserbranchaccesses_Paging(val) {
        debugger;
        this.tbl_bouserbranchaccesses.source.setPaging(1, val, true);
    }
    handle_bouserbranchaccesses_GridSelected(event) {
        debugger;
        if (event.isSelected) {
            if (event.data.accessid == null || event.data.accessid == "") {
                var obj = { userid: this.formid, branchid: event.data.branchid };
                this.Insertbouserbranchaccesses.push(obj);
            }
            else {
                var deletedids = this.Deleted_bouserbranchaccess_IDs.split(',');
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
                this.Deleted_bouserbranchaccess_IDs += event.data.accessid + ",";
        }
    }
    Is_bouserbranchaccesses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bouserbranchaccesses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
bousermasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_16__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_19__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_9__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_20__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DialogService },
    { type: _service_bousermaster_service__WEBPACK_IMPORTED_MODULE_1__.bousermasterService },
    { type: _service_bomenumaster_service__WEBPACK_IMPORTED_MODULE_5__.bomenumasterService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_22__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_7__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_8__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_11__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_19__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_24__.NgxSpinnerService }
];
bousermasterComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['customform', { static: false },] }],
    tbl_bousermenuaccesses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['tbl_bousermenuaccesses', { static: false },] }],
    tbl_bouserbranchaccesses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['tbl_bouserbranchaccesses', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['fileattachment', { static: false },] }],
    userphoto: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['userphoto', { static: false },] }],
    usersignature: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['usersignature', { static: false },] }]
};
bousermasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
        selector: 'app-bousermaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bousermaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__.KeyboardShortcutsService]
    })
], bousermasterComponent);



/***/ }),

/***/ 85984:
/*!****************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bobranchholiday.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bobranchholidayService": () => (/* binding */ bobranchholidayService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let bobranchholidayService = class bobranchholidayService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bobranchholidays(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchholiday', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchholiday' + '/getdefaultdata').toPromise();
        }
    }
    get_bobranchholidays_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchholiday').toPromise();
        }
    }
    getListBy_branchholidayid(branchholidayid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchholiday' + '/branchholidayid/' + branchholidayid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchholiday' + '/param/' + key).toPromise();
        }
    }
    get_bobranchholidays_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchholiday' + '/e/' + id).toPromise();
        }
    }
    get_bobranchholidays_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchholiday' + '/' + id).toPromise();
        }
    }
    delete_bobranchholiday(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchholiday' + '/' + id).toPromise();
        }
    }
    getList_financialyearid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchholiday' + '/getList_financialyearid').toPromise();
    }
    getList_holidayday() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchholiday' + '/getList_holidayday/').toPromise();
    }
};
bobranchholidayService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bobranchholidayService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], bobranchholidayService);



/***/ }),

/***/ 97127:
/*!*****************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bobranchlocation.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bobranchlocationService": () => (/* binding */ bobranchlocationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let bobranchlocationService = class bobranchlocationService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bobranchlocations(formData, bobranchsublocations) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { bobranchsublocations: bobranchsublocations.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchlocation', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchlocation' + '/getdefaultdata').toPromise();
        }
    }
    get_bobranchlocations_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchlocation').toPromise();
        }
    }
    getListBy_locationid(locationid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchlocation' + '/locationid/' + locationid).toPromise();
        }
    }
    getListBy_branchid(branchid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchlocation' + '/branchid/' + branchid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchlocation' + '/param/' + key).toPromise();
        }
    }
    get_bobranchlocations_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchlocation' + '/e/' + id).toPromise();
        }
    }
    get_bobranchlocations_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchlocation' + '/' + id).toPromise();
        }
    }
    delete_bobranchlocation(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchlocation' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchlocation')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bobranchlocation => new bobranchlocation(bobranchlocation.branchid, bobranchlocation.locationid, bobranchlocation.locationcode, bobranchlocation.locationcodedesc, bobranchlocation.locationname, bobranchlocation.tag, bobranchlocation.status, ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bobranchlocation => bobranchlocation.locationname.includes(filter.name));
            return response;
        }));
    }
    getList_locationcode() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchlocation' + '/getList_locationcode/').toPromise();
    }
};
bobranchlocationService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bobranchlocationService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bobranchlocationService);



/***/ }),

/***/ 31866:
/*!***************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bobranchmaster.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bobranchmasterService": () => (/* binding */ bobranchmasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let bobranchmasterService = class bobranchmasterService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bobranchmasters(formData, bobranchholidays, bouserbranchaccesses, Insertbouserbranchaccesses, bobranchlocations) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { bobranchholidays: bobranchholidays.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), bouserbranchaccesses: Insertbouserbranchaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), bobranchlocations: bobranchlocations.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchmaster', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchmaster' + '/getdefaultdata').toPromise();
        }
    }
    get_bobranchmasters_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchmaster').toPromise();
        }
    }
    getListBy_branchid(branchid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchmaster' + '/branchid/' + branchid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchmaster' + '/param/' + key).toPromise();
        }
    }
    get_bobranchmasters_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchmaster' + '/e/' + id).toPromise();
        }
    }
    get_bobranchmasters_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchmaster' + '/' + id).toPromise();
        }
    }
    delete_bobranchmaster(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchmaster' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchmaster')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bobranchmaster => new bobranchmaster(bobranchmaster.branchid, bobranchmaster.branchcode, bobranchmaster.branchname, bobranchmaster.thumbnail, bobranchmaster.address1, bobranchmaster.address2, bobranchmaster.countryid, bobranchmaster.countryiddesc, bobranchmaster.stateid, bobranchmaster.stateiddesc, bobranchmaster.cityid, bobranchmaster.cityiddesc, bobranchmaster.locationid, bobranchmaster.locationiddesc, bobranchmaster.pin, bobranchmaster.latlong, bobranchmaster.starttime, bobranchmaster.endtime, bobranchmaster.weekoff1, bobranchmaster.weekoff1desc, bobranchmaster.weekoff2, bobranchmaster.weekoff2desc, bobranchmaster.remarks, bobranchmaster.totalregions, bobranchmaster.accounts, bobranchmaster.salespeople, bobranchmaster.resourceallocation, bobranchmaster.resourceallocationdesc, bobranchmaster.growthopportunity, bobranchmaster.growthopportunitydesc, bobranchmaster.salesdirector, bobranchmaster.salesdirectordesc, bobranchmaster.customersuccessdirector, bobranchmaster.customersuccessdirectordesc, bobranchmaster.customfield, bobranchmaster.attachment, bobranchmaster.status, "", "", ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bobranchmaster => bobranchmaster.branchname.includes(filter.name));
            return response;
        }));
    }
    getList_countryid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_countryid').toPromise();
    }
    getList_stateid(countryid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_stateid/countryid').toPromise();
    }
    getList_cityid(stateid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_cityid/stateid').toPromise();
    }
    getList_locationid(cityid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_locationid/cityid').toPromise();
    }
    getList_weekoff1() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_weekoff1/').toPromise();
    }
    getList_weekoff2() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_weekoff2/').toPromise();
    }
    getList_resourceallocation() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_resourceallocation/').toPromise();
    }
    getList_growthopportunity() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_growthopportunity/').toPromise();
    }
    getList_salesdirector() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_salesdirector').toPromise();
    }
    getList_customersuccessdirector() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchmaster' + '/getList_customersuccessdirector').toPromise();
    }
};
bobranchmasterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bobranchmasterService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bobranchmasterService);



/***/ }),

/***/ 70907:
/*!********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bobranchsublocation.service.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bobranchsublocationService": () => (/* binding */ bobranchsublocationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let bobranchsublocationService = class bobranchsublocationService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bobranchsublocations(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchsublocation', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchsublocation' + '/getdefaultdata').toPromise();
        }
    }
    get_bobranchsublocations_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchsublocation').toPromise();
        }
    }
    getListBy_sublocationid(sublocationid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchsublocation' + '/sublocationid/' + sublocationid).toPromise();
        }
    }
    getListBy_locationid(locationid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchsublocation' + '/locationid/' + locationid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchsublocation' + '/param/' + key).toPromise();
        }
    }
    get_bobranchsublocations_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchsublocation' + '/e/' + id).toPromise();
        }
    }
    get_bobranchsublocations_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchsublocation' + '/' + id).toPromise();
        }
    }
    delete_bobranchsublocation(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchsublocation' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bobranchsublocation')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bobranchsublocation => new bobranchsublocation(bobranchsublocation.branchid, bobranchsublocation.sublocationid, bobranchsublocation.locationid, bobranchsublocation.locationiddesc, bobranchsublocation.locationname, bobranchsublocation.status))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bobranchsublocation => bobranchsublocation.locationname.includes(filter.name));
            return response;
        }));
    }
    getList_locationid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bobranchsublocation' + '/getList_locationid').toPromise();
    }
};
bobranchsublocationService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bobranchsublocationService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bobranchsublocationService);



/***/ }),

/***/ 50277:
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bobranchholiday/bobranchholiday.component.html ***!
  \*******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bobranchholiday_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Branch Holidays' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bobranchholidays()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bobranchholiday_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.branchholidayid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.branchholidayid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"branchid\" class=\"control-label\">Branch</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.branchid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"branchid\" formControlName=\"branchid\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--financialyearid-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('financialyearid') == -1) && (financialyearidvisible==undefined || financialyearidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"financialyearid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_financialyearid(null)\">Financial Year</label>\r\n        <select *ngIf=\"!showview\" id=\"financialyearid\" (change)=\"financialyearid_onChange($event.target)\"\r\n          formControlName=\"financialyearid\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of financialyearid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.financialyeariddesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('holidaydate') == -1) && (holidaydatevisible==undefined || holidaydatevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"holidaydate\" class=\"control-label\">Holiday Date</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.holidaydate?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"!showview\">\r\n          <input #holidaydateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n            [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"holidaydateformpicker\" id=\"holidaydate\"\r\n            formControlName=\"holidaydate\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"holidaydateformpicker.toggle()\" type=\"button\"><i\r\n              class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--holidayday-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('holidayday') == -1) && (holidaydayvisible==undefined || holidaydayvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"holidayday\" class=\"control-label\">Holiday Day</label>\r\n        <select *ngIf=\"!showview\" id=\"holidayday\" (change)=\"holidayday_onChange($event.target)\"\r\n          formControlName=\"holidayday\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of holidayday_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.holidaydaydesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('reason') == -1) && (reasonvisible==undefined || reasonvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"reason\" class=\"control-label\">Reason</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.reason?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"reason\" formControlName=\"reason\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 50779:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bobranchlocation/bobranchlocation.component.html ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bobranchlocation_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Branch locations' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bobranchlocations()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bobranchlocation_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.locationid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.locationid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"branchid\" class=\"control-label\">Branch</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.branchid?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"branchid\" formControlName=\"branchid\" class=\"form-control\">\r\n              </div>\r\n\r\n\r\n              <!--locationcode-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('locationcode') == -1) && (locationcodevisible==undefined || locationcodevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"locationcode\" class=\"control-label\">Location Code</label>\r\n                <select *ngIf=\"!showview\" id=\"locationcode\" (change)=\"locationcode_onChange($event.target)\"\r\n                  formControlName=\"locationcode\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of locationcode_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.locationcodedesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('locationname') == -1) && (locationnamevisible==undefined || locationnamevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"locationname\" class=\"control-label\">Location Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.locationname?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"locationname\" formControlName=\"locationname\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('tag') == -1) && (tagvisible==undefined || tagvisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <label for=\"tag\" class=\"control-label\">Tag</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.tag?.value}}</label>\r\n                <tag-input *ngIf=\"!showview\" id=\"tag\" formControlName=\"tag\" class=\"form-control\">\r\n                </tag-input>\r\n              </div>\r\n            </div>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Sub Locations</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bobranchsublocations-->\r\n            <div [ngClass]=\"Is_bobranchsublocations_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Sub Locations' | translate}}\r\n                <select class='child' id=\"bobranchsublocationsPagingdropdown\"\r\n                  (change)=\"bobranchsublocations_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"bobranchsublocationtoggleOption();bobranchsublocations_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbobranchsublocationsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"bobranchsublocations_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bobranchsublocations\r\n                (userRowSelect)=\"handle_bobranchsublocations_GridSelected($event)\"\r\n                [settings]=\"bobranchsublocations_settings\" (custom)=\"onCustom_bobranchsublocations_Action($event)\"\r\n                [source]=\"tbl_bobranchsublocations?.source?.data\" (delete)=\"bobranchsublocations_route($event,'delete')\"\r\n                (deleteConfirm)=\"bobranchsublocations_route($event,'delete')\"\r\n                (create)=\"bobranchsublocations_route($event,'create')\"\r\n                (createConfirm)=\"bobranchsublocations_beforesave($event)\"\r\n                (edit)=\"bobranchsublocations_route($event,'edit')\"\r\n                (editConfirm)=\"bobranchsublocations_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bobranchsublocations-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 24089:
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bobranchmaster/bobranchmaster.component.html ***!
  \*****************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bobranchmaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Branch Masters' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bobranchmasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bobranchmaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.branchid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.branchid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Branch Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('branchcode') == -1) && (branchcodevisible==undefined || branchcodevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"branchcode\" class=\"control-label required\">Branch Code</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.branchcode?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"branchcode\" required formControlName=\"branchcode\" class=\"form-control\">\r\n                  <app-field-error-display [displayError]=\"f.branchcode.errors?.required\"\r\n                    errorMsg=\"Enter {{'Branch Code' | translate}}\">\r\n                  </app-field-error-display>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('branchname') == -1) && (branchnamevisible==undefined || branchnamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"branchname\" class=\"control-label required\">Branch Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.branchname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"branchname\" required formControlName=\"branchname\" class=\"form-control\">\r\n                  <app-field-error-display [displayError]=\"f.branchname.errors?.required\"\r\n                    errorMsg=\"Enter {{'Branch Name' | translate}}\">\r\n                  </app-field-error-display>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('thumbnail') == -1) && (thumbnailvisible==undefined || thumbnailvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"thumbnail\" class=\"control-label\">Thumbnail</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.thumbnail?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"thumbnail\" formControlName=\"thumbnail\" class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Location Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('address1') == -1) && (address1visible==undefined || address1visible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"address1\" class=\"control-label required\">Address1</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.address1?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"address1\" required formControlName=\"address1\" class=\"form-control\">\r\n                  <app-field-error-display [displayError]=\"f.address1.errors?.required\"\r\n                    errorMsg=\"Enter {{'Address1' | translate}}\">\r\n                  </app-field-error-display>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('address2') == -1) && (address2visible==undefined || address2visible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"address2\" class=\"control-label\">Address2</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.address2?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"address2\" formControlName=\"address2\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--countryid-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('countryid') == -1) && (countryidvisible==undefined || countryidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"countryid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_countryid(null)\">Country</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"countryid_List\" [optionsEvent]=\"countryid_optionsEvent\"\r\n                    [form]=\"bocountry\" (selectItem)=\"onSelected_countryid($event)\" [reportid]='wc9rn' [menuid]='wc9rn'\r\n                    formControlName=\"countryid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.countryiddesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--stateid-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('stateid') == -1) && (stateidvisible==undefined || stateidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"stateid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_stateid(null)\">State</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"stateid_List\" [optionsEvent]=\"stateid_optionsEvent\"\r\n                    [form]=\"bostate\" (selectItem)=\"onSelected_stateid($event)\" [reportid]='tyo5r' [menuid]='tyo5r'\r\n                    formControlName=\"stateid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.stateiddesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--cityid-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('cityid') == -1) && (cityidvisible==undefined || cityidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"cityid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_cityid(null)\">City</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"cityid_List\" [optionsEvent]=\"cityid_optionsEvent\"\r\n                    [form]=\"bocity\" (selectItem)=\"onSelected_cityid($event)\" [reportid]='kbg3n' [menuid]='kbg3n'\r\n                    formControlName=\"cityid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.cityiddesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--locationid-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('locationid') == -1) && (locationidvisible==undefined || locationidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"locationid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_locationid(null)\">Location</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"locationid_List\"\r\n                    [optionsEvent]=\"locationid_optionsEvent\" [form]=\"bolocation\"\r\n                    (selectItem)=\"onSelected_locationid($event)\" [reportid]='fiimk' [menuid]='fiimk'\r\n                    formControlName=\"locationid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.locationiddesc?.value}}</label>\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('pin') == -1) && (pinvisible==undefined || pinvisible==true))\" style=''\r\n                  class=\"col-3 \">\r\n                  <label for=\"pin\" class=\"control-label\">P I N</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.pin?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"pin\" formControlName=\"pin\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('latlong') == -1) && (latlongvisible==undefined || latlongvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"latlong\" class=\"control-label\">Latlong</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.latlong?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"latlong\" formControlName=\"latlong\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Work Timing Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('starttime') == -1) && (starttimevisible==undefined || starttimevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"starttime\" class=\"control-label required\">Start Time</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.starttime?.value}}</label>\r\n                  <ngb-timepicker *ngIf=\"!showview\" class=\"form-control timepicker\" formControlName=\"starttime\"\r\n                    required></ngb-timepicker>\r\n                  <app-field-error-display [displayError]=\"f.starttime.errors?.required\"\r\n                    errorMsg=\"Enter {{'Start Time' | translate}}\">\r\n                  </app-field-error-display>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('endtime') == -1) && (endtimevisible==undefined || endtimevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"endtime\" class=\"control-label required\">End Time</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.endtime?.value}}</label>\r\n                  <ngb-timepicker *ngIf=\"!showview\" class=\"form-control timepicker\" formControlName=\"endtime\" required>\r\n                  </ngb-timepicker>\r\n                  <app-field-error-display [displayError]=\"f.endtime.errors?.required\"\r\n                    errorMsg=\"Enter {{'End Time' | translate}}\">\r\n                  </app-field-error-display>\r\n                </div>\r\n\r\n\r\n                <!--weekoff1-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('weekoff1') == -1) && (weekoff1visible==undefined || weekoff1visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"weekoff1\" class=\"control-label\">Week Off1</label>\r\n                  <select *ngIf=\"!showview\" id=\"weekoff1\" (change)=\"weekoff1_onChange($event.target)\"\r\n                    formControlName=\"weekoff1\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of weekoff1_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.weekoff1desc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--weekoff2-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('weekoff2') == -1) && (weekoff2visible==undefined || weekoff2visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"weekoff2\" class=\"control-label\">Week Off2</label>\r\n                  <select *ngIf=\"!showview\" id=\"weekoff2\" (change)=\"weekoff2_onChange($event.target)\"\r\n                    formControlName=\"weekoff2\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of weekoff2_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.weekoff2desc?.value}}</label>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('remarks') == -1) && (remarksvisible==undefined || remarksvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"remarks\" class=\"control-label\">Remarks</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.remarks?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"remarks\"\r\n                    formControlName=\"remarks\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('totalregions') == -1) && (totalregionsvisible==undefined || totalregionsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"totalregions\" class=\"control-label\">Total Regions</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.totalregions?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"totalregions\" formControlName=\"totalregions\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('accounts') == -1) && (accountsvisible==undefined || accountsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"accounts\" class=\"control-label\">Accounts</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.accounts?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"accounts\" formControlName=\"accounts\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('salespeople') == -1) && (salespeoplevisible==undefined || salespeoplevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"salespeople\" class=\"control-label\">Sales People</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.salespeople?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"salespeople\" formControlName=\"salespeople\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--resourceallocation-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('resourceallocation') == -1) && (resourceallocationvisible==undefined || resourceallocationvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"resourceallocation\" class=\"control-label\">Resource\r\n                    Allocation</label>\r\n                  <select *ngIf=\"!showview\" id=\"resourceallocation\"\r\n                    (change)=\"resourceallocation_onChange($event.target)\" formControlName=\"resourceallocation\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of resourceallocation_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.resourceallocationdesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--growthopportunity-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('growthopportunity') == -1) && (growthopportunityvisible==undefined || growthopportunityvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"growthopportunity\" class=\"control-label\">Growth Opportunity</label>\r\n                  <select *ngIf=\"!showview\" id=\"growthopportunity\" (change)=\"growthopportunity_onChange($event.target)\"\r\n                    formControlName=\"growthopportunity\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of growthopportunity_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.growthopportunitydesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--salesdirector-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('salesdirector') == -1) && (salesdirectorvisible==undefined || salesdirectorvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"salesdirector\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_salesdirector(null)\">Sales Director</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"salesdirector_List\"\r\n                    [optionsEvent]=\"salesdirector_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_salesdirector($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"salesdirector\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.salesdirectordesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--customersuccessdirector-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('customersuccessdirector') == -1) && (customersuccessdirectorvisible==undefined || customersuccessdirectorvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"customersuccessdirector\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_customersuccessdirector(null)\">Customer Success Director</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"customersuccessdirector_List\"\r\n                    [optionsEvent]=\"customersuccessdirector_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_customersuccessdirector($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"customersuccessdirector\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.customersuccessdirectordesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Branch Holidays</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bobranchholidays-->\r\n            <div [ngClass]=\"Is_bobranchholidays_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Branch Holidays' | translate}}\r\n                <select class='child' id=\"bobranchholidaysPagingdropdown\"\r\n                  (change)=\"bobranchholidays_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"bobranchholidaytoggleOption();bobranchholidays_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbobranchholidaysFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"bobranchholidays_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bobranchholidays (userRowSelect)=\"handle_bobranchholidays_GridSelected($event)\"\r\n                [settings]=\"bobranchholidays_settings\" (custom)=\"onCustom_bobranchholidays_Action($event)\"\r\n                [source]=\"tbl_bobranchholidays?.source?.data\" (delete)=\"bobranchholidays_route($event,'delete')\"\r\n                (deleteConfirm)=\"bobranchholidays_route($event,'delete')\"\r\n                (create)=\"bobranchholidays_route($event,'create')\" (createConfirm)=\"bobranchholidays_beforesave($event)\"\r\n                (edit)=\"bobranchholidays_route($event,'edit')\" (editConfirm)=\"bobranchholidays_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bobranchholidays-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">UserBranch Access</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bouserbranchaccesses-->\r\n            <div [ngClass]=\"Is_bouserbranchaccesses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'UserBranch Access' | translate}}\r\n                <select class='child' id=\"bouserbranchaccessesPagingdropdown\"\r\n                  (change)=\"bouserbranchaccesses_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbouserbranchaccessesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bouserbranchaccesses\r\n                (userRowSelect)=\"handle_bouserbranchaccesses_GridSelected($event)\"\r\n                [settings]=\"bouserbranchaccesses_settings\" (custom)=\"onCustom_bouserbranchaccesses_Action($event)\"\r\n                [source]=\"tbl_bouserbranchaccesses?.source?.data\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bouserbranchaccesses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Branch locations</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bobranchlocations-->\r\n            <div [ngClass]=\"Is_bobranchlocations_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Branch locations' | translate}}\r\n                <select class='child' id=\"bobranchlocationsPagingdropdown\"\r\n                  (change)=\"bobranchlocations_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"bobranchlocationtoggleOption();bobranchlocations_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbobranchlocationsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"bobranchlocations_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bobranchlocations (userRowSelect)=\"handle_bobranchlocations_GridSelected($event)\"\r\n                [settings]=\"bobranchlocations_settings\" (custom)=\"onCustom_bobranchlocations_Action($event)\"\r\n                [source]=\"tbl_bobranchlocations?.source?.data\" (delete)=\"bobranchlocations_route($event,'delete')\"\r\n                (deleteConfirm)=\"bobranchlocations_route($event,'delete')\"\r\n                (create)=\"bobranchlocations_route($event,'create')\"\r\n                (createConfirm)=\"bobranchlocations_beforesave($event)\" (edit)=\"bobranchlocations_route($event,'edit')\"\r\n                (editConfirm)=\"bobranchlocations_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bobranchlocations-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 15430:
/*!***************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bobranchsublocation/bobranchsublocation.component.html ***!
  \***************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bobranchsublocation_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Sub Locations' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bobranchsublocations()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bobranchsublocation_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.sublocationid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.sublocationid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true)) && maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"branchid\" class=\"control-label\">Branch</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.branchid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"branchid\" formControlName=\"branchid\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--locationid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('locationid') == -1) && (locationidvisible==undefined || locationidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"locationid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_locationid(null)\">Location</label>\r\n        <select *ngIf=\"!showview\" id=\"locationid\" (change)=\"locationid_onChange($event.target)\"\r\n          formControlName=\"locationid\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of locationid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.locationiddesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('locationname') == -1) && (locationnamevisible==undefined || locationnamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"locationname\" class=\"control-label\">Location Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.locationname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"locationname\" formControlName=\"locationname\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 90917:
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bousermaster/bousermaster.component.html ***!
  \*************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bousermaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second bgcolor\" >\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'User Master' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bousermasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bousermaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' [routerLink]=''(click)=\"goBack()\" ><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i>\r\n              Back</a>\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.userid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.userid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n\r\n\r\n            <!--userroleid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('userroleid') == -1) && (userroleidvisible==undefined || userroleidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"userroleid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_userroleid(null)\">User Role</label>\r\n                <select *ngIf=\"!showview\" id=\"userroleid\" (change)=\"userroleid_onChange($event.target)\"\r\n                  formControlName=\"userroleid\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of userroleid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.userroleiddesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--branchid-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"branchid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_branchid(null)\">Branch</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"branchid_List\" [optionsEvent]=\"branchid_optionsEvent\"\r\n                  [form]=\"bobranchmaster\" (selectItem)=\"onSelected_branchid($event)\" [reportid]='bxg94' [menuid]='bxg94'\r\n                  formControlName=\"branchid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.branchiddesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--departmentid-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('departmentid') == -1) && (departmentidvisible==undefined || departmentidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"departmentid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_departmentid(null)\" (click)=\"AddOrEdit_departmentid(null)\">Department</label>\r\n                <select *ngIf=\"!showview\" id=\"departmentid\" (change)=\"departmentid_onChange($event.target)\"\r\n                  formControlName=\"departmentid\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of departmentid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.departmentiddesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('usercode') == -1) && (usercodevisible==undefined || usercodevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"usercode\" class=\"control-label\">User Code</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.usercode?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"usercode\" formControlName=\"usercode\" class=\"form-control\">\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('username') == -1) && (usernamevisible==undefined || usernamevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"username\" class=\"control-label\">User Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.username?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"username\" formControlName=\"username\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('shortname') == -1) && (shortnamevisible==undefined || shortnamevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"shortname\" class=\"control-label\">Short Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.shortname?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"shortname\" formControlName=\"shortname\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('bio') == -1) && (biovisible==undefined || biovisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"bio\" class=\"control-label\">Bio</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.bio?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"bio\"\r\n                  formControlName=\"bio\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('avatar') == -1) && (avatarvisible==undefined || avatarvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"avatar\" class=\"control-label\">Avatar</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.avatar?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"avatar\" formControlName=\"avatar\" class=\"form-control\">\r\n              </div>\r\n\r\n\r\n              <!--designation-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('designation') == -1) && (designationvisible==undefined || designationvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"designation\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_designation(null)\" (click)=\"AddOrEdit_designation(null)\">Designation</label>\r\n                <select *ngIf=\"!showview\" id=\"designation\" (change)=\"designation_onChange($event.target)\"\r\n                  formControlName=\"designation\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of designation_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.designationdesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--reportingto-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('reportingto') == -1) && (reportingtovisible==undefined || reportingtovisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"reportingto\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_reportingto(null)\">Reporting To</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"reportingto_List\"\r\n                  [optionsEvent]=\"reportingto_optionsEvent\" [form]=\"bousermaster\"\r\n                  (selectItem)=\"onSelected_reportingto($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                  formControlName=\"reportingto\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.reportingtodesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--role-->\r\n\r\n              <div *ngIf=\"((hidelist.indexOf('role') == -1) && (rolevisible==undefined || rolevisible==true))\" style=''\r\n                class=\"col-3\"><label for=\"role\" class=\"control-label\" (click)=\"AddOrEdit_role(null)\">Role</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"role_List\" [optionsEvent]=\"role_optionsEvent\"\r\n                  [form]=\"bouserrolemaster\" (selectItem)=\"onSelected_role($event)\" [reportid]='tnf39' [menuid]='tnf39'\r\n                  formControlName=\"role\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.roledesc?.value}}</label>\r\n              </div>\r\n            </div>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Contact Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('emailid') == -1) && (emailidvisible==undefined || emailidvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"emailid\" class=\"control-label\">Email</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.emailid?.value}}</label>\r\n                  <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"emailid\" formControlName=\"emailid\"\r\n                    class=\"form-control\">\r\n                  <app-field-error-display [displayError]=\"f.emailid.errors!=null && f.emailid.errors?.email\"\r\n                    errorMsg=\"Enter valid email\">\r\n                  </app-field-error-display>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('mobilenumber') == -1) && (mobilenumbervisible==undefined || mobilenumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"mobilenumber\" class=\"control-label\">Mobile Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.mobilenumber?.value}}</label>\r\n                  <int-phone-prefix *ngIf=\"!showview\" id=\"mobilenumber\" formControlName=\"mobilenumber\" [locale]=\"'en'\"\r\n                    [defaultCountry]=\"'ae'\" class=\"form-control telephone\">\r\n                  </int-phone-prefix>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('password') == -1) && (passwordvisible==undefined || passwordvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"password\" class=\"control-label\">Password</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.password?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"password\" formControlName=\"password\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('nextloginchangepassword') == -1) && (nextloginchangepasswordvisible==undefined || nextloginchangepasswordvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"nextloginchangepassword\" class=\"control-label\">Next Login Change Password</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.nextloginchangepassword?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"nextloginchangepassword\"\r\n                      formControlName=\"nextloginchangepassword\" class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('validityfrom') == -1) && (validityfromvisible==undefined || validityfromvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"validityfrom\" class=\"control-label\">Validity From</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.validityfrom?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #validityfromformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"validityfromformpicker\"\r\n                      id=\"validityfrom\" formControlName=\"validityfrom\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"validityfromformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('validityto') == -1) && (validitytovisible==undefined || validitytovisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"validityto\" class=\"control-label\">Validity To</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.validityto?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #validitytoformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"validitytoformpicker\"\r\n                      id=\"validityto\" formControlName=\"validityto\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"validitytoformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <!--educationid-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('educationid') == -1) && (educationidvisible==undefined || educationidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"educationid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_educationid(null)\" (click)=\"AddOrEdit_educationid(null)\">Education</label>\r\n                  <select *ngIf=\"!showview\" id=\"educationid\" (change)=\"educationid_onChange($event.target)\"\r\n                    formControlName=\"educationid\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of educationid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.educationiddesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('usersignature') == -1) && (usersignaturevisible==undefined || usersignaturevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"usersignature\" class=\"control-label\">User Signature</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.usersignature?.value[0]?.name}}</label>\r\n                  <app-attachment #usersignature formControlName=\"usersignature\" [showremove]='bmyrecord'\r\n                    [SessionData]=\"sessionData\"></app-attachment>\r\n                  <button type=\"button\" class=\"btn\" *ngIf=\"usersignature.getAttachmentList().length > 0\"\r\n                    (click)=\"getusersignature()\">Open File</button>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('userphoto') == -1) && (userphotovisible==undefined || userphotovisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"userphoto\" class=\"control-label\">User Photo</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.userphoto?.value[0]?.name}}</label>\r\n                  <app-attachment #userphoto formControlName=\"userphoto\" [showremove]='bmyrecord'\r\n                    [SessionData]=\"sessionData\"></app-attachment>\r\n                  <button type=\"button\" class=\"btn\" *ngIf=\"userphoto.getAttachmentList().length > 0\"\r\n                    (click)=\"getuserphoto()\">Open File</button>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('thumbnail') == -1) && (thumbnailvisible==undefined || thumbnailvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"thumbnail\" class=\"control-label\">Thumb Nail</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.thumbnail?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"thumbnail\" formControlName=\"thumbnail\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('emailpassword') == -1) && (emailpasswordvisible==undefined || emailpasswordvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"emailpassword\" class=\"control-label\">Email Password</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.emailpassword?.value}}</label>\r\n                  <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"emailpassword\"\r\n                    formControlName=\"emailpassword\" class=\"form-control\">\r\n                  <app-field-error-display\r\n                    [displayError]=\"f.emailpassword.errors!=null && f.emailpassword.errors?.email\"\r\n                    errorMsg=\"Enter valid email\">\r\n                  </app-field-error-display>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('emailsignature') == -1) && (emailsignaturevisible==undefined || emailsignaturevisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"emailsignature\" class=\"control-label\">Email Signature</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.emailsignature?.value}}</label>\r\n                  <textarea type=\"email\" [email]=\"true\" autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\"\r\n                    *ngIf=\"!showview\" id=\"emailsignature\" formControlName=\"emailsignature\" class=\"form-control\">\r\n</textarea>\r\n                  <app-field-error-display\r\n                    [displayError]=\"f.emailsignature.errors!=null && f.emailsignature.errors?.email\"\r\n                    errorMsg=\"Enter valid email\">\r\n                  </app-field-error-display>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('dateofbirth') == -1) && (dateofbirthvisible==undefined || dateofbirthvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"dateofbirth\" class=\"control-label\">Date of Birth</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.dateofbirth?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #dateofbirthformpicker=\"ngbDatepicker\" [minDate]='{year: 1950, month:1, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"dateofbirthformpicker\"\r\n                      id=\"dateofbirth\" formControlName=\"dateofbirth\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"dateofbirthformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('defaultpage') == -1) && (defaultpagevisible==undefined || defaultpagevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"defaultpage\" class=\"control-label\">Default Page</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.defaultpage?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"defaultpage\" formControlName=\"defaultpage\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--defaultlanguage-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('defaultlanguage') == -1) && (defaultlanguagevisible==undefined || defaultlanguagevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"defaultlanguage\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_defaultlanguage(null)\" (click)=\"AddOrEdit_defaultlanguage(null)\">Default\r\n                    Language</label>\r\n                  <select *ngIf=\"!showview\" id=\"defaultlanguage\" (change)=\"defaultlanguage_onChange($event.target)\"\r\n                    formControlName=\"defaultlanguage\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of defaultlanguage_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.defaultlanguagedesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('layoutpage') == -1) && (layoutpagevisible==undefined || layoutpagevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"layoutpage\" class=\"control-label\">Layout Page</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.layoutpage?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"layoutpage\" formControlName=\"layoutpage\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('theme') == -1) && (themevisible==undefined || themevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"theme\" class=\"control-label\">Theme</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.theme?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"theme\" formControlName=\"theme\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--gender-->\r\n\r\n                <div *ngIf=\"((hidelist.indexOf('gender') == -1) && (gendervisible==undefined || gendervisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"gender\" class=\"control-label\">Gender</label>\r\n                  <select *ngIf=\"!showview\" id=\"gender\" (change)=\"gender_onChange($event.target)\"\r\n                    formControlName=\"gender\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of gender_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.genderdesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--nationality-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('nationality') == -1) && (nationalityvisible==undefined || nationalityvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"nationality\" class=\"control-label\">Nationality</label>\r\n                  <select *ngIf=\"!showview\" id=\"nationality\" (change)=\"nationality_onChange($event.target)\"\r\n                    formControlName=\"nationality\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of nationality_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.nationalitydesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--bloodgroup-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('bloodgroup') == -1) && (bloodgroupvisible==undefined || bloodgroupvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"bloodgroup\" class=\"control-label\">Blood Group</label>\r\n                  <select *ngIf=\"!showview\" id=\"bloodgroup\" (change)=\"bloodgroup_onChange($event.target)\"\r\n                    formControlName=\"bloodgroup\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of bloodgroup_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.bloodgroupdesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--religion-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('religion') == -1) && (religionvisible==undefined || religionvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"religion\" class=\"control-label\">Religion</label>\r\n                  <select *ngIf=\"!showview\" id=\"religion\" (change)=\"religion_onChange($event.target)\"\r\n                    formControlName=\"religion\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of religion_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.religiondesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--maritalstatus-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('maritalstatus') == -1) && (maritalstatusvisible==undefined || maritalstatusvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"maritalstatus\" class=\"control-label\">Marital Status</label>\r\n                  <select *ngIf=\"!showview\" id=\"maritalstatus\" (change)=\"maritalstatus_onChange($event.target)\"\r\n                    formControlName=\"maritalstatus\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of maritalstatus_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.maritalstatusdesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('referencenumber') == -1) && (referencenumbervisible==undefined || referencenumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"referencenumber\" class=\"control-label\">Reference Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.referencenumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"referencenumber\" formControlName=\"referencenumber\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('address1') == -1) && (address1visible==undefined || address1visible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"address1\" class=\"control-label\">Address1</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.address1?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"address1\" formControlName=\"address1\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('address2') == -1) && (address2visible==undefined || address2visible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"address2\" class=\"control-label\">Address2</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.address2?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"address2\" formControlName=\"address2\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--countryid-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('countryid') == -1) && (countryidvisible==undefined || countryidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"countryid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_countryid(null)\">Country</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"countryid_List\" [optionsEvent]=\"countryid_optionsEvent\"\r\n                    [form]=\"bocountry\" (selectItem)=\"onSelected_countryid($event)\" [reportid]='wc9rn' [menuid]='wc9rn'\r\n                    formControlName=\"countryid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.countryiddesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--stateid-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('stateid') == -1) && (stateidvisible==undefined || stateidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"stateid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_stateid(null)\">State</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"stateid_List\" [optionsEvent]=\"stateid_optionsEvent\"\r\n                    [form]=\"bostate\" (selectItem)=\"onSelected_stateid($event)\" [reportid]='tyo5r' [menuid]='tyo5r'\r\n                    formControlName=\"stateid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.stateiddesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--cityid-->\r\n\r\n                <div *ngIf=\"((hidelist.indexOf('cityid') == -1) && (cityidvisible==undefined || cityidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"cityid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_cityid(null)\">City</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"cityid_List\" [optionsEvent]=\"cityid_optionsEvent\"\r\n                    [form]=\"bocity\" (selectItem)=\"onSelected_cityid($event)\" [reportid]='kbg3n' [menuid]='kbg3n'\r\n                    formControlName=\"cityid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.cityiddesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('zipcode') == -1) && (zipcodevisible==undefined || zipcodevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"zipcode\" class=\"control-label\">Zip Code</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.zipcode?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"zipcode\" formControlName=\"zipcode\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('emergencycontactperson') == -1) && (emergencycontactpersonvisible==undefined || emergencycontactpersonvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"emergencycontactperson\" class=\"control-label\">Emergency Contact Person</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.emergencycontactperson?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"emergencycontactperson\" formControlName=\"emergencycontactperson\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('relationship') == -1) && (relationshipvisible==undefined || relationshipvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"relationship\" class=\"control-label\">Relationship</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.relationship?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"relationship\" formControlName=\"relationship\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('cpphonenumber') == -1) && (cpphonenumbervisible==undefined || cpphonenumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"cpphonenumber\" class=\"control-label\">C P Phone Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.cpphonenumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" type=\"number\" onKeyPress=\"if(this.value.length==15) return false;\" id=\"cpphonenumber\" formControlName=\"cpphonenumber\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('emailnotifications') == -1) && (emailnotificationsvisible==undefined || emailnotificationsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"emailnotifications\" class=\"control-label\">Email Notifications</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.emailnotifications?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"emailnotifications\"\r\n                      formControlName=\"emailnotifications\" class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('whatsappnotifications') == -1) && (whatsappnotificationsvisible==undefined || whatsappnotificationsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"whatsappnotifications\" class=\"control-label\">Whats App Notifications</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.whatsappnotifications?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"whatsappnotifications\"\r\n                      formControlName=\"whatsappnotifications\" class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('employeespecificapproval') == -1) && (employeespecificapprovalvisible==undefined || employeespecificapprovalvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"employeespecificapproval\" class=\"control-label\">Employee Specific Approval</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.employeespecificapproval?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"employeespecificapproval\"\r\n                      formControlName=\"employeespecificapproval\" class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('autoapproval') == -1) && (autoapprovalvisible==undefined || autoapprovalvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"autoapproval\" class=\"control-label\">Auto Approval</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.autoapproval?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"autoapproval\" formControlName=\"autoapproval\"\r\n                      class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--approvallevel-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvallevel') == -1) && (approvallevelvisible==undefined || approvallevelvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvallevel\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_approvallevel(null)\">Approval Level</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"approvallevel_List\"\r\n                    [optionsEvent]=\"approvallevel_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_approvallevel($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"approvallevel\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvalleveldesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--approvallevel1-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvallevel1') == -1) && (approvallevel1visible==undefined || approvallevel1visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvallevel1\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_approvallevel1(null)\">Approval Level1</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"approvallevel1_List\"\r\n                    [optionsEvent]=\"approvallevel1_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_approvallevel1($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"approvallevel1\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvallevel1desc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--approvallevel2-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvallevel2') == -1) && (approvallevel2visible==undefined || approvallevel2visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvallevel2\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_approvallevel2(null)\">Approval Level2</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"approvallevel2_List\"\r\n                    [optionsEvent]=\"approvallevel2_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_approvallevel2($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"approvallevel2\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvallevel2desc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--approvallevel3-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvallevel3') == -1) && (approvallevel3visible==undefined || approvallevel3visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvallevel3\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_approvallevel3(null)\">Approval Level3</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"approvallevel3_List\"\r\n                    [optionsEvent]=\"approvallevel3_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_approvallevel3($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"approvallevel3\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvallevel3desc?.value}}</label>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--approvallevel4-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvallevel4') == -1) && (approvallevel4visible==undefined || approvallevel4visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvallevel4\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_approvallevel4(null)\">Approval Level4</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"approvallevel4_List\"\r\n                    [optionsEvent]=\"approvallevel4_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_approvallevel4($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"approvallevel4\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvallevel4desc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--approvallevel5-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvallevel5') == -1) && (approvallevel5visible==undefined || approvallevel5visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvallevel5\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_approvallevel5(null)\">Approval Level5</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"approvallevel5_List\"\r\n                    [optionsEvent]=\"approvallevel5_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_approvallevel5($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"approvallevel5\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvallevel5desc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--approvalleveltype1-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvalleveltype1') == -1) && (approvalleveltype1visible==undefined || approvalleveltype1visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvalleveltype1\" class=\"control-label\">Approval Level\r\n                    Type1</label>\r\n                  <select *ngIf=\"!showview\" id=\"approvalleveltype1\"\r\n                    (change)=\"approvalleveltype1_onChange($event.target)\" formControlName=\"approvalleveltype1\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of approvalleveltype1_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvalleveltype1desc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--approvalleveltype2-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvalleveltype2') == -1) && (approvalleveltype2visible==undefined || approvalleveltype2visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvalleveltype2\" class=\"control-label\">Approval Level\r\n                    Type2</label>\r\n                  <select *ngIf=\"!showview\" id=\"approvalleveltype2\"\r\n                    (change)=\"approvalleveltype2_onChange($event.target)\" formControlName=\"approvalleveltype2\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of approvalleveltype2_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvalleveltype2desc?.value}}</label>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--approvalleveltype3-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvalleveltype3') == -1) && (approvalleveltype3visible==undefined || approvalleveltype3visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvalleveltype3\" class=\"control-label\">Approval Level\r\n                    Type3</label>\r\n                  <select *ngIf=\"!showview\" id=\"approvalleveltype3\"\r\n                    (change)=\"approvalleveltype3_onChange($event.target)\" formControlName=\"approvalleveltype3\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of approvalleveltype3_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvalleveltype3desc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--approvalleveltype4-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvalleveltype4') == -1) && (approvalleveltype4visible==undefined || approvalleveltype4visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvalleveltype4\" class=\"control-label\">Approval Level\r\n                    Type4</label>\r\n                  <select *ngIf=\"!showview\" id=\"approvalleveltype4\"\r\n                    (change)=\"approvalleveltype4_onChange($event.target)\" formControlName=\"approvalleveltype4\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of approvalleveltype4_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvalleveltype4desc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--approvalleveltype5-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('approvalleveltype5') == -1) && (approvalleveltype5visible==undefined || approvalleveltype5visible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"approvalleveltype5\" class=\"control-label\">Approval Level\r\n                    Type5</label>\r\n                  <select *ngIf=\"!showview\" id=\"approvalleveltype5\"\r\n                    (change)=\"approvalleveltype5_onChange($event.target)\" formControlName=\"approvalleveltype5\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of approvalleveltype5_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.approvalleveltype5desc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('twitter') == -1) && (twittervisible==undefined || twittervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"twitter\" class=\"control-label\">Twitter</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.twitter?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"twitter\" formControlName=\"twitter\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('facebook') == -1) && (facebookvisible==undefined || facebookvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"facebook\" class=\"control-label\">Facebook</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.facebook?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"facebook\" formControlName=\"facebook\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('linkedin') == -1) && (linkedinvisible==undefined || linkedinvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"linkedin\" class=\"control-label\">Linked In</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.linkedin?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"linkedin\" formControlName=\"linkedin\" class=\"form-control\">\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('skype') == -1) && (skypevisible==undefined || skypevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"skype\" class=\"control-label\">Skype</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.skype?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"skype\" formControlName=\"skype\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('googleplus') == -1) && (googleplusvisible==undefined || googleplusvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"googleplus\" class=\"control-label\">Google Plus</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.googleplus?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"googleplus\" formControlName=\"googleplus\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('employeeid') == -1) && (employeeidvisible==undefined || employeeidvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <button class=\"btn btn-link\" (click)=\"viewemployeeid()\" type=\"button\"><i\r\n                      class=\"fa fa-external-link\"></i> employeeid</button>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.employeeid?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">UserMenu Access</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bousermenuaccesses-->\r\n            <div [ngClass]=\"Is_bousermenuaccesses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'UserMenu Access' | translate}}\r\n                <select class='child' id=\"bousermenuaccessesPagingdropdown\"\r\n                  (change)=\"bousermenuaccesses_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbousermenuaccessesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bousermenuaccesses (userRowSelect)=\"handle_bousermenuaccesses_GridSelected($event)\"\r\n                [settings]=\"bousermenuaccesses_settings\" (custom)=\"onCustom_bousermenuaccesses_Action($event)\"\r\n                [source]=\"tbl_bousermenuaccesses?.source?.data\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bousermenuaccesses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">UserBranch Access</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bouserbranchaccesses-->\r\n            <div [ngClass]=\"Is_bouserbranchaccesses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'UserBranch Access' | translate}}\r\n                <select class='child' id=\"bouserbranchaccessesPagingdropdown\"\r\n                  (change)=\"bouserbranchaccesses_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbouserbranchaccessesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bouserbranchaccesses\r\n                (userRowSelect)=\"handle_bouserbranchaccesses_GridSelected($event)\"\r\n                [settings]=\"bouserbranchaccesses_settings\" (custom)=\"onCustom_bouserbranchaccesses_Action($event)\"\r\n                [source]=\"tbl_bouserbranchaccesses?.source?.data\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bouserbranchaccesses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_bobranchmaster_bobranchmaster_component_t-9a16c7.js.map