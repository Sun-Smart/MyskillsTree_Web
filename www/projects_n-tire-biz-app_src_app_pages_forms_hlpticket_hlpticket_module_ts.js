"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_hlpticket_hlpticket_module_ts"],{

/***/ 30641:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/hlpplannedaction/hlpplannedaction.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hlpplannedactionComponent": () => (/* binding */ hlpplannedactionComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_hlpplannedaction_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./hlpplannedaction.component.html */ 94507);
/* harmony import */ var _service_hlpplannedaction_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/hlpplannedaction.service */ 52809);
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

let hlpplannedactionComponent = class hlpplannedactionComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, hlpplannedaction_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.hlpplannedaction_service = hlpplannedaction_service;
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
        this.bfilterPopulate_hlpplannedactions = false;
        this.hlpplannedaction_menuactions = [];
        this.ticketid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete
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
        this.hlpplannedaction_Form = this.fb.group({
            pk: [null],
            planid: [null],
            actionid: [null],
            ticketid: [null],
            ticketiddesc: [null],
            plannedaction: [null],
            assignto: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hlpplannedaction_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.hlpplannedaction_Form.dirty && this.hlpplannedaction_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.planid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.planid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.planid && pkDetail) {
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
            let hlpplannedactionid = null;
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
            this.formid = hlpplannedactionid;
            //alert(hlpplannedactionid);
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
            this.hlpplannedaction_service.getDefaultData().then(res => {
                this.ticketid_List = res.list_ticketid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.hlpplannedaction_service.get_hlpplannedactions_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.hlpplannedaction_Form.markAsUntouched();
            this.hlpplannedaction_Form.markAsPristine();
        });
    }
    onSelected_ticketid(ticketidDetail) {
        if (ticketidDetail.value && ticketidDetail) {
            this.hlpplannedaction_Form.patchValue({
                ticketid: ticketidDetail.value,
                ticketiddesc: ticketidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.hlpplannedaction_Form != null)
            this.hlpplannedaction_Form.reset();
        this.hlpplannedaction_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let planid = this.hlpplannedaction_Form.get('planid').value;
        if (planid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hlpplannedaction_service.delete_hlpplannedaction(planid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.hlpplannedaction_Form.patchValue({
            planid: null
        });
        if (this.formData.planid != null)
            this.formData.planid = null;
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
                        this.hlpplannedaction_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.hlpplannedaction_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.hlpplannedaction_Form.controls[key] != undefined) {
                                this.hlpplannedaction_Form.controls[key].disable({ onlySelf: true });
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
    ticketid_onChange(evt) {
        let e = evt.value;
    }
    edit_hlpplannedactions() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.hlpplannedaction_service.get_hlpplannedactions_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.hlpplannedaction;
                let formproperty = res.hlpplannedaction.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.hlpplannedaction.pkcol;
                this.formid = res.hlpplannedaction.planid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.hlpplannedaction;
        this.formid = res.hlpplannedaction.planid;
        this.pkcol = res.hlpplannedaction.pkcol;
        this.bmyrecord = false;
        if (res.hlpplannedaction.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hlpplannedaction_Form.patchValue({
            planid: res.hlpplannedaction.planid,
            actionid: res.hlpplannedaction.actionid,
            ticketid: res.hlpplannedaction.ticketid,
            ticketiddesc: res.hlpplannedaction.ticketiddesc,
            plannedaction: res.hlpplannedaction.plannedaction,
            assignto: res.hlpplannedaction.assignto,
            status: res.hlpplannedaction.status,
            statusdesc: res.hlpplannedaction.statusdesc,
        });
        this.hlpplannedaction_menuactions = res.hlpplannedaction_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.hlpplannedaction_Form.controls) {
            let val = this.hlpplannedaction_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.hlpplannedaction_Form.controls[key] != null) {
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
            if (!this.hlpplannedaction_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.hlpplannedaction_Form.getRawValue();
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
            // Object.keys(this.hlpplannedaction_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.hlpplannedaction_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.hlpplannedaction_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.hlpplannedaction_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.hlpplannedaction_Form.controls[key] != null) {
                            this.formData[key] = this.hlpplannedaction_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.hlpplannedaction_service.saveOrUpdate_hlpplannedactions(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.hlpplannedaction);
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
                        this.objvalues.push(res.hlpplannedaction);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.hlpplannedaction_Form.markAsUntouched();
                this.hlpplannedaction_Form.markAsPristine();
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
hlpplannedactionComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_hlpplannedaction_service__WEBPACK_IMPORTED_MODULE_1__.hlpplannedactionService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
hlpplannedactionComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-hlpplannedaction',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_hlpplannedaction_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], hlpplannedactionComponent);



/***/ }),

/***/ 56834:
/*!*************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/hlpplannedaction/hlpplannedaction.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hlpplannedactionModule": () => (/* binding */ hlpplannedactionModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _hlpplannedaction_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hlpplannedaction.routing */ 26954);
/* harmony import */ var _hlpplannedaction_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hlpplannedaction.component */ 30641);






let hlpplannedactionModule = class hlpplannedactionModule {
};
hlpplannedactionModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _hlpplannedaction_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_hlpplannedaction_component__WEBPACK_IMPORTED_MODULE_3__.hlpplannedactionComponent]
    })
], hlpplannedactionModule);



/***/ }),

/***/ 26954:
/*!**************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/hlpplannedaction/hlpplannedaction.routing.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _hlpplannedaction_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hlpplannedaction.component */ 30641);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'hlpplannedactions', children: [
            { path: '', component: _hlpplannedaction_component__WEBPACK_IMPORTED_MODULE_0__.hlpplannedactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _hlpplannedaction_component__WEBPACK_IMPORTED_MODULE_0__.hlpplannedactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _hlpplannedaction_component__WEBPACK_IMPORTED_MODULE_0__.hlpplannedactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _hlpplannedaction_component__WEBPACK_IMPORTED_MODULE_0__.hlpplannedactionComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 48009:
/*!**************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/hlpticket/hlpticket.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hlpticketComponent": () => (/* binding */ hlpticketComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_hlpticket_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./hlpticket.component.html */ 63773);
/* harmony import */ var _service_hlpticket_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/hlpticket.service */ 49600);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _n_tire_help_desk_app_src_app_pages_forms_hlpticketdetail_hlpticketdetail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-help-desk-app/src/app/pages/forms/hlpticketdetail/hlpticketdetail.component */ 37983);
/* harmony import */ var _n_tire_help_desk_app_src_app_service_hlpticketdetail_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-help-desk-app/src/app/service/hlpticketdetail.service */ 71080);
/* harmony import */ var _pages_forms_hlpplannedaction_hlpplannedaction_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../pages/forms/hlpplannedaction/hlpplannedaction.component */ 30641);
/* harmony import */ var _service_hlpplannedaction_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../service/hlpplannedaction.service */ 52809);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
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


let hlpticketComponent = class hlpticketComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, hlpticket_service, hlpticketdetail_service, hlpplannedaction_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.hlpticket_service = hlpticket_service;
        this.hlpticketdetail_service = hlpticketdetail_service;
        this.hlpplannedaction_service = hlpplannedaction_service;
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
        this.bfilterPopulate_hlptickets = false;
        this.bfilterPopulate_hlpticketdetails = false;
        this.bfilterPopulate_hlpplannedactions = false;
        this.hlpticket_menuactions = [];
        this.hlpticketdetail_menuactions = [];
        this.hlpplannedaction_menuactions = [];
        this.branchid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.requestor_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.sla_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.completedby_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_11__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_11__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_hlpticketdetail_IDs = "";
        this.hlpticketdetails_ID = "1";
        this.Deleted_hlpplannedaction_IDs = "";
        this.hlpplannedactions_ID = "2";
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
    canDeactivate() {
        debugger;
        if (this.hlpticket_Form.dirty && this.hlpticket_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.ticketid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.ticketid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.ticketid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
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
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
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
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.hlpticket_Form.markAsUntouched();
            this.hlpticket_Form.markAsPristine();
        });
    }
    onSelected_branchid(branchidDetail) {
        if (branchidDetail.value && branchidDetail) {
            this.hlpticket_Form.patchValue({
                branchid: branchidDetail.value,
                branchiddesc: branchidDetail.label,
            });
        }
    }
    onSelected_requestor(requestorDetail) {
        if (requestorDetail.value && requestorDetail) {
            this.hlpticket_Form.patchValue({
                requestor: requestorDetail.value,
                requestordesc: requestorDetail.label,
            });
        }
    }
    onSelected_sla(slaDetail) {
        if (slaDetail.value && slaDetail) {
            this.hlpticket_Form.patchValue({
                sla: slaDetail.value,
                sladesc: slaDetail.label,
            });
        }
    }
    onSelected_completedby(completedbyDetail) {
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
                }).catch((err) => { this.spinner.hide(); console.log(err); });
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
        if (this.formData.ticketid != null)
            this.formData.ticketid = null;
        for (let i = 0; i < this.tbl_hlpticketdetails.source.length; i++) {
            this.tbl_hlpticketdetails.source[i].ticketdetailid = null;
        }
        for (let i = 0; i < this.tbl_hlpplannedactions.source.length; i++) {
            this.tbl_hlpplannedactions.source[i].planid = null;
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
                    else if (key == "ticketdate")
                        this.hlpticket_Form.patchValue({ "ticketdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "incidentdate")
                        this.hlpticket_Form.patchValue({ "incidentdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "incidenttime")
                        this.hlpticket_Form.patchValue({ "incidenttime": new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(mainscreendata[key]) });
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
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("hlptickets", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    sourcefield_onChange(evt) {
        let e = this.f.sourcefield.value;
        this.hlpticket_Form.patchValue({ sourcefielddesc: evt.options[evt.options.selectedIndex].text });
    }
    branchid_onChange(evt) {
        let e = evt.value;
    }
    departmentid_onChange(evt) {
        let e = evt.value;
        this.hlpticket_Form.patchValue({ departmentiddesc: evt.options[evt.options.selectedIndex].text });
    }
    requestortype_onChange(evt) {
        let e = this.f.requestortype.value;
        this.hlpticket_Form.patchValue({ requestortypedesc: evt.options[evt.options.selectedIndex].text });
    }
    requestor_onChange(evt) {
        let e = evt.value;
    }
    tickettype_onChange(evt) {
        let e = this.f.tickettype.value;
        this.hlpticket_Form.patchValue({ tickettypedesc: evt.options[evt.options.selectedIndex].text });
    }
    priority_onChange(evt) {
        let e = this.f.priority.value;
        this.hlpticket_Form.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    criticality_onChange(evt) {
        let e = this.f.criticality.value;
        this.hlpticket_Form.patchValue({ criticalitydesc: evt.options[evt.options.selectedIndex].text });
    }
    impact_onChange(evt) {
        let e = this.f.impact.value;
        this.hlpticket_Form.patchValue({ impactdesc: evt.options[evt.options.selectedIndex].text });
    }
    risk_onChange(evt) {
        let e = this.f.risk.value;
        this.hlpticket_Form.patchValue({ riskdesc: evt.options[evt.options.selectedIndex].text });
    }
    sla_onChange(evt) {
        let e = evt.value;
    }
    source_onChange(evt) {
        let e = this.f.source.value;
        this.hlpticket_Form.patchValue({ sourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    category_onChange(evt) {
        let e = evt.value;
        this.hlpticket_Form.patchValue({ categorydesc: evt.options[evt.options.selectedIndex].text });
        setTimeout(() => {
            if (this.f.category.value && this.f.category.value != "" && this.f.category.value != null)
                this.hlpticket_service.getList_subcategory(this.f.category.value).then(res => this.subcategory_List = res);
        });
    }
    subcategory_onChange(evt) {
        let e = evt.value;
        this.hlpticket_Form.patchValue({ subcategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    stage_onChange(evt) {
        let e = this.f.stage.value;
        this.hlpticket_Form.patchValue({ stagedesc: evt.options[evt.options.selectedIndex].text });
    }
    completedby_onChange(evt) {
        let e = evt.value;
    }
    rca_onChange(evt) {
        let e = evt.value;
        this.hlpticket_Form.patchValue({ rcadesc: evt.options[evt.options.selectedIndex].text });
    }
    solution_onChange(evt) {
        let e = evt.value;
        this.hlpticket_Form.patchValue({ solutiondesc: evt.options[evt.options.selectedIndex].text });
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
    edit_hlptickets() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.hlpticket_service.get_hlptickets_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.hlpticket;
                let formproperty = res.hlpticket.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.hlpticket.pkcol;
                this.formid = res.hlpticket.ticketid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.hlpticket;
        this.formid = res.hlpticket.ticketid;
        this.pkcol = res.hlpticket.pkcol;
        this.bmyrecord = false;
        if (res.hlpticket.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        var incidenttimeTime = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(res.hlpticket.incidenttime);
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
        if (this.hlpticket_Form.get('customfield').value != null && this.hlpticket_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.hlpticket_Form.get('customfield').value);
        this.FillCustomField();
        if (this.hlpticket_Form.get('attachment').value != null && this.hlpticket_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.hlpticket_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.category.value && this.f.category.value != "" && this.f.category.value != null)
                this.hlpticket_service.getList_subcategory(this.f.category.value).then(res => {
                    this.subcategory_List = res;
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
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.hlpticket_Form.controls) {
            let val = this.hlpticket_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.hlpticket_Form.controls[key] != null) {
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
            if (this.hlpticket_Form.get('assignedto').value != null)
                obj.assignedto = JSON.stringify(this.hlpticket_Form.get('assignedto').value);
            if (this.hlpticket_Form.get('tags').value != null)
                obj.tags = JSON.stringify(this.hlpticket_Form.get('tags').value);
            if (this.hlpticket_Form.get('remarks').value != null)
                obj.remarks = JSON.stringify(this.hlpticket_Form.get('remarks').value);
            obj.solutiongivenon = new Date(this.hlpticket_Form.get('solutiongivenon').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('solutiongivenon').value) + '  UTC' : null);
            obj.startdate = new Date(this.hlpticket_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('startdate').value) + '  UTC' : null);
            obj.completeddate = new Date(this.hlpticket_Form.get('completeddate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('completeddate').value) + '  UTC' : null);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
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
            if (strError != "")
                return this.sharedService.alert(strError);
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
            if (this.hlpticket_Form.get('assignedto').value != null)
                this.formData.assignedto = JSON.stringify(this.hlpticket_Form.get('assignedto').value);
            if (this.hlpticket_Form.get('tags').value != null)
                this.formData.tags = JSON.stringify(this.hlpticket_Form.get('tags').value);
            if (this.hlpticket_Form.get('remarks').value != null)
                this.formData.remarks = JSON.stringify(this.hlpticket_Form.get('remarks').value);
            this.formData.solutiongivenon = new Date(this.hlpticket_Form.get('solutiongivenon').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('solutiongivenon').value) + '  UTC' : null);
            this.formData.startdate = new Date(this.hlpticket_Form.get('startdate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('startdate').value) + '  UTC' : null);
            this.formData.completeddate = new Date(this.hlpticket_Form.get('completeddate').value ? this.ngbDateParserFormatter.format(this.hlpticket_Form.get('completeddate').value) + '  UTC' : null);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_hlpticketdetail_IDs = this.Deleted_hlpticketdetail_IDs;
            this.formData.Deleted_hlpplannedaction_IDs = this.Deleted_hlpplannedaction_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.hlpticket_service.saveOrUpdate_hlptickets(this.formData, (_b = (_a = this.tbl_hlpticketdetails) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_hlpplannedactions) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_hlpticketdetails.source) {
                    for (let i = 0; i < this.tbl_hlpticketdetails.source.data.length; i++) {
                        if (this.tbl_hlpticketdetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_hlpticketdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_hlpplannedactions.source) {
                    for (let i = 0; i < this.tbl_hlpplannedactions.source.data.length; i++) {
                        if (this.tbl_hlpplannedactions.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_hlpplannedactions.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.hlpticket);
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
                        this.objvalues.push(res.hlpticket);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.hlpticket_Form.markAsUntouched();
                this.hlpticket_Form.markAsPristine();
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
        this.tbl_hlpticketdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
        this.tbl_hlpplannedactions.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
    }
    AddOrEdit_hlpticketdetail(event, ticketdetailid, ticketid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_n_tire_help_desk_app_src_app_pages_forms_hlpticketdetail_hlpticketdetail_component__WEBPACK_IMPORTED_MODULE_4__.hlpticketdetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, ticketdetailid, ticketid, visiblelist: this.hlpticketdetails_visiblelist, hidelist: this.hlpticketdetails_hidelist, ScreenType: 2, sourcereference: this.hlpticket_Form.get('sourcereference').value, sourcefield: this.hlpticket_Form.get('sourcefield').value, sourcefielddesc: this.hlpticket_Form.get('sourcefielddesc').value },
        }).onClose.subscribe(res => {
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
    onDelete_hlpticketdetail(event, childID, i) {
        if (childID != null)
            this.Deleted_hlpticketdetail_IDs += childID + ",";
        this.tbl_hlpticketdetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_hlpplannedaction(event, planid, ticketid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_hlpplannedaction_hlpplannedaction_component__WEBPACK_IMPORTED_MODULE_6__.hlpplannedactionComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, planid, ticketid, visiblelist: this.hlpplannedactions_visiblelist, hidelist: this.hlpplannedactions_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
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
    onDelete_hlpplannedaction(event, childID, i) {
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
    show_hlpticketdetails_Checkbox() {
        debugger;
        if (this.tbl_hlpticketdetails.source.settings['selectMode'] == 'multi')
            this.tbl_hlpticketdetails.source.settings['selectMode'] = 'single';
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
        if (this.tbl_hlpticketdetails.source.settings != null)
            this.tbl_hlpticketdetails.source.settings['hideSubHeader'] = !this.tbl_hlpticketdetails.source.settings['hideSubHeader'];
        this.tbl_hlpticketdetails.source.initGrid();
    }
    show_hlpticketdetails_InActive() {
    }
    enable_hlpticketdetails_InActive() {
    }
    Set_hlpticketdetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_hlpticketdetails) {
                var clone = this.sharedService.clone(this.tbl_hlpticketdetails.source.settings);
                if (clone.columns['ticketid'] != undefined)
                    clone.columns['ticketid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpticketdetails_ticketid.value)), }, };
                if (clone.columns['ticketid'] != undefined)
                    clone.columns['ticketid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpticketdetails_ticketid.value)), }, };
                this.tbl_hlpticketdetails.source.settings = clone;
                this.tbl_hlpticketdetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_hlpticketdetails.source.settings);
                if (clone.columns['actionuser'] != undefined)
                    clone.columns['actionuser'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpticketdetails_actionuser.value)), }, };
                if (clone.columns['actionuser'] != undefined)
                    clone.columns['actionuser'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpticketdetails_actionuser.value)), }, };
                this.tbl_hlpticketdetails.source.settings = clone;
                this.tbl_hlpticketdetails.source.initGrid();
            }
            this.bfilterPopulate_hlpticketdetails = true;
        });
    }
    hlpticketdetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_hlpticketdetails_TableConfig() {
        this.hlpticketdetails_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                edit: true,
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
                colhtml: {
                    title: '',
                    type: 'html',
                    filter: true,
                    editor: {
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
    hlpticketdetails_LoadTable(hlpticketdetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.hlpticketdetails_ID) >= 0) {
            if (this.tbl_hlpticketdetails != undefined)
                this.tbl_hlpticketdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
            if (this.tbl_hlpticketdetails != undefined)
                this.tbl_hlpticketdetails.source.load(hlpticketdetails);
            if (this.tbl_hlpticketdetails != undefined)
                this.tbl_hlpticketdetails.source.setPaging(1, 20, true);
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
    hlpticketdetails_route(event, action) {
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
            this.hlpticket_service.delete_hlpticket(ticketdetailid).then(res => this.hlpticketdetails_LoadTable());
        }
    }
    onCustom_hlpticketdetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "hlpticketdetails");
            let formname = objbomenuaction.actionname;
        });
    }
    hlpticketdetails_Paging(val) {
        debugger;
        this.tbl_hlpticketdetails.source.setPaging(1, val, true);
    }
    handle_hlpticketdetails_GridSelected(event) {
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
    show_hlpplannedactions_Checkbox() {
        debugger;
        if (this.tbl_hlpplannedactions.source.settings['selectMode'] == 'multi')
            this.tbl_hlpplannedactions.source.settings['selectMode'] = 'single';
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
        if (this.tbl_hlpplannedactions.source.settings != null)
            this.tbl_hlpplannedactions.source.settings['hideSubHeader'] = !this.tbl_hlpplannedactions.source.settings['hideSubHeader'];
        this.tbl_hlpplannedactions.source.initGrid();
    }
    show_hlpplannedactions_InActive() {
    }
    enable_hlpplannedactions_InActive() {
    }
    Set_hlpplannedactions_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_hlpplannedactions) {
                var clone = this.sharedService.clone(this.tbl_hlpplannedactions.source.settings);
                if (clone.columns['ticketid'] != undefined)
                    clone.columns['ticketid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpplannedactions_ticketid.value)), }, };
                if (clone.columns['ticketid'] != undefined)
                    clone.columns['ticketid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_hlpplannedactions_ticketid.value)), }, };
                this.tbl_hlpplannedactions.source.settings = clone;
                this.tbl_hlpplannedactions.source.initGrid();
            }
            this.bfilterPopulate_hlpplannedactions = true;
        });
    }
    hlpplannedactions_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
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
                edit: true,
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
    hlpplannedactions_LoadTable(hlpplannedactions = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.hlpplannedactions_ID) >= 0) {
            if (this.tbl_hlpplannedactions != undefined)
                this.tbl_hlpplannedactions.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
            if (this.tbl_hlpplannedactions != undefined)
                this.tbl_hlpplannedactions.source.load(hlpplannedactions);
            if (this.tbl_hlpplannedactions != undefined)
                this.tbl_hlpplannedactions.source.setPaging(1, 20, true);
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
    hlpplannedactions_route(event, action) {
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
            this.hlpticket_service.delete_hlpticket(planid).then(res => this.hlpplannedactions_LoadTable());
        }
    }
    onCustom_hlpplannedactions_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "hlpplannedactions");
            let formname = objbomenuaction.actionname;
        });
    }
    hlpplannedactions_Paging(val) {
        debugger;
        this.tbl_hlpplannedactions.source.setPaging(1, val, true);
    }
    handle_hlpplannedactions_GridSelected(event) {
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
};
hlpticketComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_17__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_20__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_10__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DialogService },
    { type: _service_hlpticket_service__WEBPACK_IMPORTED_MODULE_1__.hlpticketService },
    { type: _n_tire_help_desk_app_src_app_service_hlpticketdetail_service__WEBPACK_IMPORTED_MODULE_5__.hlpticketdetailService },
    { type: _service_hlpplannedaction_service__WEBPACK_IMPORTED_MODULE_7__.hlpplannedactionService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_8__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_9__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_12__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_24__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_20__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_25__.NgxSpinnerService }
];
hlpticketComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['customform', { static: false },] }],
    tbl_hlpticketdetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_hlpticketdetails', { static: false },] }],
    tbl_hlpplannedactions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_hlpplannedactions', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['fileattachment', { static: false },] }]
};
hlpticketComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
        selector: 'app-hlpticket',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_hlpticket_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__.KeyboardShortcutsService]
    })
], hlpticketComponent);



/***/ }),

/***/ 10367:
/*!***********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/hlpticket/hlpticket.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hlpticketModule": () => (/* binding */ hlpticketModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _hlpticket_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./hlpticket.routing */ 92848);
/* harmony import */ var _hlpticket_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./hlpticket.component */ 48009);
/* harmony import */ var _hlpticketdetail_hlpticketdetail_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../hlpticketdetail/hlpticketdetail.module */ 64535);
/* harmony import */ var _hlpplannedaction_hlpplannedaction_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../hlpplannedaction/hlpplannedaction.module */ 56834);








let hlpticketModule = class hlpticketModule {
};
hlpticketModule = (0,tslib__WEBPACK_IMPORTED_MODULE_6__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _hlpticket_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _hlpplannedaction_hlpplannedaction_module__WEBPACK_IMPORTED_MODULE_5__.hlpplannedactionModule, _hlpticketdetail_hlpticketdetail_module__WEBPACK_IMPORTED_MODULE_4__.hlpticketdetailModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_7__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_hlpticket_component__WEBPACK_IMPORTED_MODULE_3__.hlpticketComponent],
        entryComponents: []
    })
], hlpticketModule);



/***/ }),

/***/ 92848:
/*!************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/hlpticket/hlpticket.routing.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _hlpticket_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./hlpticket.component */ 48009);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'hlptickets', children: [
            { path: '', component: _hlpticket_component__WEBPACK_IMPORTED_MODULE_0__.hlpticketComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _hlpticket_component__WEBPACK_IMPORTED_MODULE_0__.hlpticketComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _hlpticket_component__WEBPACK_IMPORTED_MODULE_0__.hlpticketComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _hlpticket_component__WEBPACK_IMPORTED_MODULE_0__.hlpticketComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 52809:
/*!*****************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/hlpplannedaction.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hlpplannedactionService": () => (/* binding */ hlpplannedactionService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let hlpplannedactionService = class hlpplannedactionService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_hlpplannedactions(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpplannedaction', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpplannedaction' + '/getdefaultdata').toPromise();
        }
    }
    get_hlpplannedactions_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpplannedaction').toPromise();
        }
    }
    getListBy_planid(planid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpplannedaction' + '/planid/' + planid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpplannedaction' + '/param/' + key).toPromise();
        }
    }
    get_hlpplannedactions_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpplannedaction' + '/e/' + id).toPromise();
        }
    }
    get_hlpplannedactions_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpplannedaction' + '/' + id).toPromise();
        }
    }
    delete_hlpplannedaction(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpplannedaction' + '/' + id).toPromise();
        }
    }
    getList_ticketid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpplannedaction' + '/getList_ticketid').toPromise();
    }
};
hlpplannedactionService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
hlpplannedactionService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], hlpplannedactionService);



/***/ }),

/***/ 49600:
/*!**********************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/hlpticket.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hlpticketService": () => (/* binding */ hlpticketService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let hlpticketService = class hlpticketService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_hlptickets(formData, hlpticketdetails, hlpplannedactions) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { hlpticketdetails: hlpticketdetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), hlpplannedactions: hlpplannedactions.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket' + '/getdefaultdata').toPromise();
        }
    }
    get_hlptickets_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket').toPromise();
        }
    }
    getListBy_ticketid(ticketid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket' + '/ticketid/' + ticketid).toPromise();
        }
    }
    getListBy_sourcereference(sourcereference) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket' + '/sourcereference/' + sourcereference).toPromise();
        }
    }
    getListBy_criticality(criticality) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket' + '/criticality/' + criticality).toPromise();
        }
    }
    getListBy_source(source) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket' + '/source/' + source).toPromise();
        }
    }
    getListBy_category(category) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket' + '/category/' + category).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket' + '/param/' + key).toPromise();
        }
    }
    get_hlptickets_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket' + '/e/' + id).toPromise();
        }
    }
    get_hlptickets_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket' + '/' + id).toPromise();
        }
    }
    delete_hlpticket(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket' + '/' + id).toPromise();
        }
    }
    gethlpticketsListbycriticality(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket/' + dt + '').toPromise();
        }
    }
    gethlpticketsListbystatus(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket/' + dt + '').toPromise();
        }
    }
    gethlpticketsListbycategory(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket/' + dt + '').toPromise();
        }
    }
    gethlpticketsListbytickettype(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket/' + dt + '').toPromise();
        }
    }
    gethlpticketsListbymonthwise(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket/' + dt + '').toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/hlpticket')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(hlpticket => new hlpticket(hlpticket.ticketid, hlpticket.sourcefield, hlpticket.sourcefielddesc, hlpticket.sourcereference, hlpticket.branchid, hlpticket.branchiddesc, hlpticket.departmentid, hlpticket.departmentiddesc, hlpticket.requestortype, hlpticket.requestortypedesc, hlpticket.requestor, hlpticket.requestordesc, hlpticket.item, hlpticket.ticketdate, hlpticket.incidentdate, hlpticket.incidenttime, hlpticket.incidentduration, hlpticket.duedate, hlpticket.assignedto, hlpticket.tickettype, hlpticket.tickettypedesc, hlpticket.priority, hlpticket.prioritydesc, hlpticket.criticality, hlpticket.criticalitydesc, hlpticket.impact, hlpticket.impactdesc, hlpticket.risk, hlpticket.riskdesc, hlpticket.sla, hlpticket.sladesc, hlpticket.slabreached, hlpticket.source, hlpticket.sourcedesc, hlpticket.ticketreference, hlpticket.category, hlpticket.categorydesc, hlpticket.subcategory, hlpticket.subcategorydesc, hlpticket.tags, hlpticket.subject, hlpticket.ticketdetails, hlpticket.impacteditems, hlpticket.impactedservices, hlpticket.impactedproducts, hlpticket.impactdetails, hlpticket.remarks, hlpticket.stage, hlpticket.stagedesc, hlpticket.completedby, hlpticket.completedbydesc, hlpticket.linkedtickets, hlpticket.rca, hlpticket.rcadesc, hlpticket.rcadetails, hlpticket.solution, hlpticket.solutiondesc, hlpticket.solutiondetails, hlpticket.solutiongivenon, hlpticket.startdate, hlpticket.completeddate, hlpticket.lessonslearned, hlpticket.history, hlpticket.customfield, hlpticket.attachment, hlpticket.status, "", ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(hlpticket => hlpticket.subject.includes(filter.name));
            return response;
        }));
    }
    getList_sourcefield() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_sourcefield/').toPromise();
    }
    getList_branchid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_branchid').toPromise();
    }
    getList_departmentid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_departmentid').toPromise();
    }
    getList_requestortype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_requestortype/').toPromise();
    }
    getList_requestor() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_requestor').toPromise();
    }
    getList_tickettype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_tickettype/').toPromise();
    }
    getList_priority() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_priority/').toPromise();
    }
    getList_criticality() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_criticality/').toPromise();
    }
    getList_impact() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_impact/').toPromise();
    }
    getList_risk() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_risk/').toPromise();
    }
    getList_sla() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_sla').toPromise();
    }
    getList_source() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_source/').toPromise();
    }
    getList_category() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_category').toPromise();
    }
    getList_subcategory(categoryid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_subcategory/categoryid').toPromise();
    }
    getList_stage() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_stage/').toPromise();
    }
    getList_completedby() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_completedby').toPromise();
    }
    getList_rca() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_rca/').toPromise();
    }
    getList_solution() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/hlpticket' + '/getList_solution/').toPromise();
    }
};
hlpticketService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
hlpticketService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], hlpticketService);



/***/ }),

/***/ 9819:
/*!*********************************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/custom/openfile.component.ts ***!
  \*********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "openfileComponent": () => (/* binding */ openfileComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ 71570);





let openfileComponent = class openfileComponent {
    constructor(dynamicconfig, sanitizer, dialogRef) {
        this.dynamicconfig = dynamicconfig;
        this.sanitizer = sanitizer;
        this.dialogRef = dialogRef;
        debugger;
        this.data = dynamicconfig.data;
        this.url = this.sanitizer.bypassSecurityTrustResourceUrl(this.data.url);
    }
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__awaiter)(this, void 0, void 0, function* () {
        });
    }
    onClose() {
        this.dialogRef.close();
    }
};
openfileComponent.ctorParameters = () => [
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_1__.DynamicDialogConfig },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__.DomSanitizer },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_1__.DynamicDialogRef }
];
openfileComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_3__.Component)({
        selector: 'openfile-App',
        template: `  
    <a class="nav-link active right"  [routerLink]=''  (click)="onClose()"   ><i class="fa fa-close"></i> Close</a>
    <iframe [src]="url" width="800px" height="800px"></iframe> 
                `,
    })
], openfileComponent);



/***/ }),

/***/ 71358:
/*!*******************************************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/pages/core/services/session.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SessionService": () => (/* binding */ SessionService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ 2316);


let SessionService = class SessionService {
    /**
     * set session storage item
     * @param key
     * @param value
     */
    setItem(key, value) {
        localStorage.setItem(key, value);
    }
    urlBase64Decode(str) {
        let output = str.replace(/-/g, '+').replace(/_/g, '/');
        switch (output.length % 4) {
            case 0:
                break;
            case 2:
                output += '==';
                break;
            case 3:
                output += '=';
                break;
            default:
                // tslint:disable-next-line:no-string-throw
                throw 'Illegal base64url string!';
        }
        return decodeURIComponent(window.escape(window.atob(output)));
    }
    /**
     * get session storage item
     * @param key
     */
    getItem(key) {
        //debugger;
        var value = localStorage.getItem(key);
        return value;
    }
    setViewHtml(value) {
        if (value == null)
            value = "";
        console.log(value);
        //this.sharedService.alert(value)
        this.setItem('viewhtml', value);
        //this.viewhtml= value;
    }
    getViewHtml() {
        for (let i = 0; i < localStorage.length; i++) {
            let key = localStorage.key(i);
            let value = localStorage.getItem(key);
            console.log(key);
            console.log(value);
        }
        let viewhtml = this.getItem('viewhtml');
        if (viewhtml == null)
            viewhtml = "";
        if (viewhtml == undefined)
            viewhtml = "";
        return viewhtml;
    }
    getSession() {
        //debugger;
        var token = localStorage.getItem("currentUser");
        let value = "";
        if (token != null && token != undefined) {
            const parts = token.split('.');
            if (parts.length !== 3) {
                // debugger;
                throw new Error('JWT must have 3 parts');
            }
            const decoded = this.urlBase64Decode(parts[1]);
            if (!decoded) {
                throw new Error('Cannot decode the token');
            }
            value = JSON.parse(decoded);
        }
        return value;
    }
    /**
     * remove session storage item
     * @param key
     */
    removeItem(key) {
        localStorage.removeItem(key);
    }
    /**
     * remove all session storage items
     */
    clear() {
        localStorage.clear();
    }
};
SessionService = (0,tslib__WEBPACK_IMPORTED_MODULE_0__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_1__.Injectable)()
    /**
     * Session storage service
     * Provides methods to get, set, remove, clear session storage items.
     */
], SessionService);



/***/ }),

/***/ 52337:
/*!*****************************************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/pages/core/services/toast.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "ToastService": () => (/* binding */ ToastService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! primeng/api */ 46976);



let ToastService = class ToastService {
    constructor(messageService) {
        this.messageService = messageService;
    }
    /**
     * add single toast message
     * @param severity Severity level of the message, valid values are "success", "info", "warn" and "error"
     * @param summary Summary text of the message.
     * @param detail Detail text of the message.
     */
    addSingle(severity, summary, detail) {
        this.messageService.add({ severity: severity, summary: summary, detail: detail });
        // alert(detail);
    }
    /**
     * add multiple toast messages
     * @param messages
     * array of message type {severity:'success', summary:'Service Message', detail:'Via MessageService'}
     */
    addMultiple(messages) {
        this.messageService.addAll(messages);
    }
    /**
     * clear all toast messages
     */
    clear() {
        this.messageService.clear();
    }
};
ToastService.ctorParameters = () => [
    { type: primeng_api__WEBPACK_IMPORTED_MODULE_0__.MessageService }
];
ToastService = (0,tslib__WEBPACK_IMPORTED_MODULE_1__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_2__.Injectable)()
    /**
     * Toast service class
     * This class provides methods to add single, multiple alerts as a toast
     */
], ToastService);



/***/ }),

/***/ 41709:
/*!*************************************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/service/boconfigvalue.service.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boconfigvalueService": () => (/* binding */ boconfigvalueService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/helper */ 30923);
/* harmony import */ var _pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/core/services/session.service */ 71358);





let boconfigvalueService = class boconfigvalueService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
        this.bosubconfigvalues = [];
    }
    valid() {
        return true;
    }
    saveOrUpdateboconfigvalues() {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, this.formData), { bosubconfigvalues: this.bosubconfigvalues.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/boconfigvalue', body);
        }
    }
    saveOrUpdateboconfigvaluesList() {
        if (this.valid()) {
            var body = {
                list: this.list,
            };
            return this.http.post(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/boconfigvalue', body);
        }
    }
    getboconfigvaluesList() {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/boconfigvalue').toPromise();
        }
    }
    getListByconfigid(configid) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/boconfigvalue' + '/configid/' + configid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/boconfigvalue' + '/param/' + key).toPromise();
        }
    }
    getboconfigvaluesByEID(id) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/boconfigvalue' + '/e/' + id).toPromise();
        }
    }
    getboconfigvaluesByID(id) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/boconfigvalue' + '/' + id).toPromise();
        }
    }
    deleteboconfigvalue(id) {
        if (this.valid()) {
            return this.http.delete(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/boconfigvalue' + '/' + id).toPromise();
        }
    }
    clearList() {
        this.bosubconfigvalues = [];
    }
    refreshList() {
        if (this.valid()) {
            this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/boconfigvalue')
                .toPromise()
                .then(res => this.list = res);
        }
    }
};
boconfigvalueService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
boconfigvalueService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], boconfigvalueService);



/***/ }),

/***/ 95892:
/*!************************************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/service/bomenuaction.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bomenuactionService": () => (/* binding */ bomenuactionService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/helper */ 30923);
/* harmony import */ var _pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/core/services/session.service */ 71358);





let bomenuactionService = class bomenuactionService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdatebomenuactions() {
        if (this.valid()) {
            var body = Object.assign({}, this.formData);
            return this.http.post(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bomenuaction', body);
        }
    }
    saveOrUpdatebomenuactionsList() {
        if (this.valid()) {
            var body = {
                list: this.list,
            };
            return this.http.post(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bomenuaction', body);
        }
    }
    getbomenuactionsList() {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bomenuaction').toPromise();
        }
    }
    getListByactionid(actionid) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bomenuaction' + '/actionid/' + actionid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bomenuaction' + '/param/' + key).toPromise();
        }
    }
    getbomenuactionsByEID(id) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bomenuaction' + '/e/' + id).toPromise();
        }
    }
    getbomenuactionsByID(id) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bomenuaction' + '/' + id).toPromise();
        }
    }
    deletebomenuaction(id) {
        if (this.valid()) {
            return this.http.delete(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bomenuaction' + '/' + id).toPromise();
        }
    }
    clearList() {
    }
    refreshList() {
        if (this.valid()) {
            this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bomenuaction')
                .toPromise()
                .then(res => this.list = res);
        }
    }
};
bomenuactionService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bomenuactionService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], bomenuactionService);



/***/ }),

/***/ 48680:
/*!************************************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/service/bousermaster.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bousermasterService": () => (/* binding */ bousermasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/helper */ 30923);
/* harmony import */ var _pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/core/services/session.service */ 71358);






let bousermasterService = class bousermasterService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
        this.bouserbranchaccesses = [];
        this.Insertbouserbranchaccesses = [];
        this.bousermenuaccesses = [];
        this.Insertbousermenuaccesses = [];
    }
    valid() {
        return true;
    }
    saveOrUpdatebousermasters() {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, this.formData), { bouserbranchaccesses: this.Insertbouserbranchaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), bousermenuaccesses: this.Insertbousermenuaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster', body);
        }
    }
    saveOrUpdatebousermastersList() {
        if (this.valid()) {
            var body = {
                list: this.list,
            };
            return this.http.post(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster', body);
        }
    }
    getbousermastersList() {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster').toPromise();
        }
    }
    getListByuserid(userid) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster' + '/userid/' + userid).toPromise();
        }
    }
    getListBysourcereference(sourcereference) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster' + '/sourcereference/' + sourcereference).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster' + '/param/' + key).toPromise();
        }
    }
    getbousermastersByEID(id) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster' + '/e/' + id).toPromise();
        }
    }
    getbousermastersByID(id) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster' + '/' + id).toPromise();
        }
    }
    deletebousermaster(id) {
        if (this.valid()) {
            return this.http.delete(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster' + '/' + id).toPromise();
        }
    }
    clearList() {
        this.bouserbranchaccesses = [];
        this.bousermenuaccesses = [];
    }
    refreshList() {
        if (this.valid()) {
            this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster')
                .toPromise()
                .then(res => this.list = res);
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bousermaster')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bousermaster => new bousermaster(bousermaster.userid, bousermaster.sourcefield, bousermaster.sourcereference, bousermaster.userroleid, bousermaster.userroleiddesc, bousermaster.branchid, bousermaster.branchiddesc, bousermaster.departmentid, bousermaster.departmentiddesc, bousermaster.usercode, bousermaster.username, bousermaster.shortname, bousermaster.bio, bousermaster.avatar, bousermaster.designation, bousermaster.designationdesc, bousermaster.reportingto, bousermaster.reportingtodesc, bousermaster.role, bousermaster.roledesc, bousermaster.emailid, bousermaster.mobilenumber, bousermaster.password, bousermaster.nextloginchangepassword, bousermaster.validityfrom, bousermaster.validityto, bousermaster.educationid, bousermaster.educationiddesc, bousermaster.usersignature, bousermaster.userphoto, bousermaster.thumbnail, bousermaster.emailpassword, bousermaster.emailsignature, bousermaster.dateofbirth, bousermaster.defaultpage, bousermaster.defaultlanguage, bousermaster.defaultlanguagedesc, bousermaster.layoutpage, bousermaster.theme, bousermaster.gender, bousermaster.genderdesc, bousermaster.nationality, bousermaster.nationalitydesc, bousermaster.bloodgroup, bousermaster.bloodgroupdesc, bousermaster.religion, bousermaster.religiondesc, bousermaster.maritalstatus, bousermaster.maritalstatusdesc, bousermaster.referencenumber, bousermaster.address1, bousermaster.address2, bousermaster.countryid, bousermaster.countryiddesc, bousermaster.stateid, bousermaster.stateiddesc, bousermaster.cityid, bousermaster.cityiddesc, bousermaster.zipcode, bousermaster.emergencycontactperson, bousermaster.relationship, bousermaster.cpphonenumber, bousermaster.emailnotifications, bousermaster.whatsappnotifications, bousermaster.employeespecificapproval, bousermaster.autoapproval, bousermaster.approvallevel, bousermaster.approvalleveldesc, bousermaster.approvallevel1, bousermaster.approvallevel1desc, bousermaster.approvallevel2, bousermaster.approvallevel2desc, bousermaster.approvallevel3, bousermaster.approvallevel3desc, bousermaster.approvallevel4, bousermaster.approvallevel4desc, bousermaster.approvallevel5, bousermaster.approvallevel5desc, bousermaster.approvalleveltype1, bousermaster.approvalleveltype1desc, bousermaster.approvalleveltype2, bousermaster.approvalleveltype2desc, bousermaster.approvalleveltype3, bousermaster.approvalleveltype3desc, bousermaster.approvalleveltype4, bousermaster.approvalleveltype4desc, bousermaster.approvalleveltype5, bousermaster.approvalleveltype5desc, bousermaster.twitter, bousermaster.facebook, bousermaster.linkedin, bousermaster.skype, bousermaster.googleplus, bousermaster.customfield, bousermaster.attachment, bousermaster.status, bousermaster.employeeid, "", ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bousermaster => bousermaster.username.includes(filter.name));
            return response;
        }));
    }
    login(email, pwd) {
        var body = {
            Username: email,
            Password: pwd
        };
        debugger;
        return this.http.get(this.rootURL + "/Token?email=" + email + "&Password=" + pwd).toPromise();
    }
};
bousermasterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bousermasterService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bousermasterService);



/***/ }),

/***/ 18497:
/*!****************************************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/service/bouserrolemaster.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bouserrolemasterService": () => (/* binding */ bouserrolemasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../shared/helper */ 30923);
/* harmony import */ var _pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../pages/core/services/session.service */ 71358);






let bouserrolemasterService = class bouserrolemasterService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
        this.bousertypemenuaccesses = [];
        this.Insertbousertypemenuaccesses = [];
        this.bouserrolemasters = [];
        this.hrmsinterviewrolescorings = [];
    }
    valid() {
        return true;
    }
    saveOrUpdatebouserrolemasters() {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, this.formData), { bousertypemenuaccesses: this.Insertbousertypemenuaccesses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), bouserrolemasters: this.bouserrolemasters.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), hrmsinterviewrolescorings: this.hrmsinterviewrolescorings.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bouserrolemaster', body);
        }
    }
    saveOrUpdatebouserrolemastersList() {
        if (this.valid()) {
            var body = {
                list: this.list,
            };
            return this.http.post(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bouserrolemaster', body);
        }
    }
    getbouserrolemastersList() {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bouserrolemaster').toPromise();
        }
    }
    getListByuserroleid(userroleid) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bouserrolemaster' + '/userroleid/' + userroleid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bouserrolemaster' + '/param/' + key).toPromise();
        }
    }
    getbouserrolemastersByEID(id) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bouserrolemaster' + '/e/' + id).toPromise();
        }
    }
    getbouserrolemastersByID(id) {
        if (this.valid()) {
            return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bouserrolemaster' + '/' + id).toPromise();
        }
    }
    deletebouserrolemaster(id) {
        if (this.valid()) {
            return this.http.delete(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bouserrolemaster' + '/' + id).toPromise();
        }
    }
    clearList() {
        this.bousertypemenuaccesses = [];
        this.bouserrolemasters = [];
        this.hrmsinterviewrolescorings = [];
    }
    refreshList() {
        if (this.valid()) {
            this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bouserrolemaster')
                .toPromise()
                .then(res => this.list = res);
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/bouserrolemaster')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bouserrolemaster => new bouserrolemaster(bouserrolemaster.userroleid, bouserrolemaster.userrole, bouserrolemaster.thumbnail, bouserrolemaster.musthaveskills, bouserrolemaster.preferredskills, bouserrolemaster.keywords, bouserrolemaster.dealbreakers, bouserrolemaster.softskills, bouserrolemaster.additionalnotes, bouserrolemaster.salary, bouserrolemaster.screeningprocess, bouserrolemaster.phoneinterviewers, bouserrolemaster.onsiteinterviewprocess, bouserrolemaster.points, bouserrolemaster.advertisementtitle1, bouserrolemaster.advertisementdetails1, bouserrolemaster.advertisementtitle2, bouserrolemaster.advertisementdetails2, bouserrolemaster.advertisementtitle3, bouserrolemaster.advertisementdetails3, bouserrolemaster.status, "", "", ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bouserrolemaster => bouserrolemaster.userrole.includes(filter.name));
            return response;
        }));
    }
};
bouserrolemasterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bouserrolemasterService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bouserrolemasterService);



/***/ }),

/***/ 7655:
/*!************************************************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/service/customfieldconfiguration.service.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "customfieldconfigurationService": () => (/* binding */ customfieldconfigurationService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-bo-app/src/app/shared/helper */ 30923);
/* harmony import */ var _n_tire_bo_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-bo-app/src/app/pages/core/services/session.service */ 71358);





let customfieldconfigurationService = class customfieldconfigurationService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.SessionUser = { companyid: 0, userid: 0, usercode: '', username: '', language: '' };
        this.rootURL = _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL;
    }
    valid() {
        var sessionuser = JSON.parse(this.sessionService.getItem("currentUser"));
        if (sessionuser != null) {
            this.SessionUser = sessionuser;
            return true;
        }
        return false;
    }
    saveOrUpdatecustomfieldconfigurations() {
        {
            var body = Object.assign(Object.assign({}, this.formData), { SessionUser: this.SessionUser });
            return this.http.post(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/customfieldconfiguration', body);
        }
    }
    saveOrUpdatecustomfieldconfigurationsList() {
        {
            var body = Object.assign(Object.assign({}, this.list), { SessionUser: this.SessionUser });
            return this.http.post(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/customfieldconfiguration', body);
        }
    }
    getcustomfieldconfigurationsList() {
        {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/customfieldconfiguration').toPromise();
        }
    }
    getList(key) {
        {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/customfieldconfiguration' + '/param/' + key).toPromise();
        }
    }
    getcustomfieldconfigurationsByID(id) {
        {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/customfieldconfiguration' + '/' + id).toPromise();
        }
    }
    getcustomfieldconfigurationsByTable(id, formname = "", CustomFormField = "", CustomFormFieldValue = "", customfieldjson = "") {
        {
            var body = {
                key: id,
                CustomFormName: formname,
                CustomFormField: CustomFormField,
                CustomFormFieldValue: CustomFormFieldValue
            };
            /*
            let strCondition = "";
            if (formname != "") {
              strCondition = "/" + formname;
            }
            else {
              strCondition = "/~";
            }
            if (CustomFormField != "") {
              strCondition = strCondition + "/" + CustomFormField;
            }
            else {
              strCondition += "/~";
            }
            if (CustomFormFieldValue != "") {
              strCondition = strCondition + "/" + CustomFormFieldValue;
            }
            else {
              strCondition += "/~";
            }
            */
            let list1 = [];
            //debugger;
            //console.log(AppConstants.ntireboURL + '/customfieldconfiguration' + '/table/' + id + strCondition);
            return this.http.post(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/customfieldconfiguration' + '/table', body).toPromise().then((res) => {
                //debugger;
                if (res != null) {
                    console.log(res);
                    ////debugger;
                    let dynamicfields = res.bodynamicformdetail;
                    if (customfieldjson.CustomField != undefined && customfieldjson.CustomField != null)
                        customfieldjson = customfieldjson.CustomField;
                    for (let j = 0; j < dynamicfields.length; j++) {
                        let fld = dynamicfields[j];
                        let type = 'text';
                        let val = '';
                        if (customfieldjson != null && customfieldjson[fld.fieldname] != null) {
                            val = customfieldjson[fld.fieldname];
                        }
                        let fld_required = false;
                        if (fld.required == true)
                            fld_required = true;
                        if (fld.controltype == "C")
                            type = "checkbox";
                        if (fld.controltype == "R")
                            type = "radio";
                        if (fld.controltype == "D")
                            type = "dropdown";
                        let ddlist = [];
                        let lines;
                        if (fld.controltype == "D" || fld.controltype == "R") {
                            lines = fld.configurations.split(',');
                            for (let i = 0; i < lines.length; i++) {
                                let Texts;
                                Texts = lines[i].split(':');
                                ddlist.push({ key: Texts[0], label: Texts[1] });
                            }
                        }
                        if (fld.controltype == "D") {
                            list1.push({ type: type, name: fld.fieldname, label: fld.fieldname, required: fld_required, value: val, options: ddlist, configurations: fld.configurations });
                        }
                        else if (fld.controltype == "C") {
                            ddlist.push({ key: fld.fieldname, label: fld.fieldname });
                            list1.push({ type: type, name: fld.fieldname, label: fld.fieldname, required: fld_required, value: val, options: ddlist, configurations: fld.configurations });
                        }
                        else if (fld.controltype == "R") {
                            list1.push({ type: type, name: fld.fieldname, label: fld.fieldname, required: fld_required, value: val, options: ddlist, configurations: fld.configurations });
                        }
                        else if (fld.controltype == "F") {
                            list1.push({ type: 'file', name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
                        }
                        else if (fld.controltype == "M") {
                            list1.push({ type: 'text', multiline: true, mobilenumber: false, email: false, name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
                        }
                        else if (fld.controltype == "E") {
                            list1.push({ type: 'text', email: true, name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
                        }
                        else if (fld.controltype == "sec") {
                            list1.push({ type: 'sec', name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
                        }
                        else if (fld.controltype == "MN") {
                            list1.push({ type: 'text', mobilenumber: true, name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
                        }
                        else {
                            list1.push({ type: type, multiline: false, mobilenumber: false, email: false, name: fld.fieldname, label: fld.fieldname, value: val, required: fld_required, configurations: fld.configurations });
                        }
                    }
                }
                this.list = list1;
                if (res == null)
                    return null;
                let dynamicform = res.bodynamicform;
                let customfields = {
                    fields: this.list,
                    formhtml: dynamicform.formhtml,
                    cols: dynamicform.cols,
                    templatehtml: dynamicform.templatehtml
                };
                return (customfields);
            });
        }
        //
    }
    reset(document) {
        var customfields = {};
        if (this.list != null) {
            this.list.forEach((value) => {
                var objName = value.name;
                var objValue1 = (document.all[value.name]);
                if (objValue1 != undefined && objValue1 != null) {
                    document.all[value.name].value = "";
                }
            });
        }
    }
    getCustomValues(document) {
        //debugger;
        var customfields = {};
        if (this.list != null) {
            this.list.forEach((value) => {
                var objName = value.name;
                var objValue1 = (document.all[value.name]);
                if (objValue1 != undefined && objValue1 != null) {
                    var objValue = objValue1.value;
                    if (value.mobilenumber != undefined && value.mobilenumber != null && value.mobilenumber != false) {
                        customfields[objName] = objValue1.firstElementChild.lastElementChild.value;
                    }
                    else {
                        customfields[objName] = objValue;
                    }
                }
            });
        }
        return customfields;
    }
    deletecustomfieldconfiguration(id) {
        {
            return this.http.delete(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/customfieldconfiguration' + '/' + id).toPromise();
        }
    }
    clearList() {
    }
    refreshList() {
        {
            this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/customfieldconfiguration')
                .toPromise()
                .then((res) => this.list = res);
        }
    }
};
customfieldconfigurationService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_bo_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
customfieldconfigurationService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], customfieldconfigurationService);



/***/ }),

/***/ 98499:
/*!******************************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/service/shared.service.ts ***!
  \******************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "SharedService": () => (/* binding */ SharedService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-bo-app/src/app/shared/helper */ 30923);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _service_bousermaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../service/bousermaster.service */ 48680);
/* harmony import */ var _service_bouserrolemaster_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../service/bouserrolemaster.service */ 18497);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! jszip */ 17284);
/* harmony import */ var jszip__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(jszip__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _custom_openfile_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../custom/openfile.component */ 9819);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var _service_bomenuaction_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../service/bomenuaction.service */ 95892);
/* harmony import */ var _pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../pages/core/services/session.service */ 71358);
/* harmony import */ var primeng_api__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! primeng/api */ 46976);
















let SharedService = class SharedService {
    constructor(router, http, translate, sanitizer, bousermasterservice, bomenuactionservice, sessionService, bouserrolemasterservice, messageService, ngbDateParserFormatter, dialog) {
        this.router = router;
        this.http = http;
        this.translate = translate;
        this.sanitizer = sanitizer;
        this.bousermasterservice = bousermasterservice;
        this.bomenuactionservice = bomenuactionservice;
        this.sessionService = sessionService;
        this.bouserrolemasterservice = bouserrolemasterservice;
        this.messageService = messageService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialog = dialog;
        this.rootURL = _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL;
        this.uploadURL = _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.UploadURL;
        this.AttachmentURL = "http://localhost:5002/Resources/images1/";
        this.tablepaging = [
            { key: '20', value: '20' },
            { key: '50', value: '50' },
            { key: '100', value: '100' }
        ];
        // this.FillData();
    }
    get useraccesslistusers() { return this.useraccesslistusersval; }
    ;
    get useraccesslistroles() { return this.useraccesslistrolesval; }
    ;
    OpenURL(url, menucode, menuid) {
        debugger;
        if (url != null && url != "") {
            this.menuid = menuid;
            this.menucode = menucode;
            this.currenturl = url;
            this.router.navigate([url]);
        }
    }
    alert(message) {
        debugger;
        //alert(message);
        this.messageService.add({ severity: 'success', summary: message, detail: message });
    }
    FillData() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            yield this.bousermasterservice.getbousermastersList().then((res) => {
                debugger;
                this.useraccesslistusersval = res;
            });
            yield this.bouserrolemasterservice.getbouserrolemastersList().then((res) => {
                this.useraccesslistrolesval = res;
            });
        });
    }
    getUser(userid) {
        if (this.useraccesslistusersval == null || this.useraccesslistusersval == undefined) {
            this.FillData();
        }
        return this.useraccesslistusersval.filter(x => x.userid == userid)[0];
    }
    getRole(roleid) {
        if (this.useraccesslistusersval == null || this.useraccesslistusersval == undefined) {
            this.FillData();
        }
        return this.useraccesslistrolesval.filter(x => x.userroleid == roleid)[0];
    }
    clone(obj) {
        if (null == obj || "object" != typeof obj)
            return obj;
        var copy = obj.constructor();
        for (var attr in obj) {
            if (obj.hasOwnProperty(attr))
                copy[attr] = obj[attr];
        }
        return copy;
    }
    HtmlValue(row, cell) {
        debugger;
        for (const key in row) {
            let val = row[key];
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (cell != undefined) {
                if (key == "attachment") {
                    debugger;
                    cell = cell.replace(new RegExp('##' + key + '##', 'g'), this.getAttachmentValue(val));
                }
                else
                    cell = cell.replace(new RegExp('##' + key + '##', 'g'), val);
            }
        }
        var re = /##(\w+)##/g;
        cell = cell.replace(re, '');
        return this.sanitizer.bypassSecurityTrustHtml(cell);
    }
    onCustomAction(event, modulename) {
        debugger;
        let actionid = event.action;
        return this.bomenuactionservice.getListByactionid(actionid).then((res) => {
            let objbomenuaction = res[0];
            console.log(objbomenuaction);
            var action = { actionid: actionid, actionname: event.action, modulename: 'mstapplicantachievementdetails', actiontype: objbomenuaction.actiontype };
            if (objbomenuaction.actiontype == "D") {
                return objbomenuaction;
            }
            else {
                this.action(null, action, event.data.achievementid, this.sessionService.getSession().userid, null, null).then((res) => {
                    debugger;
                    console.log(res);
                    this.alert(res.resultOutput);
                    if (res.gotopage != undefined && res.gotopage != null && res.gotopage != "") {
                        let formname = res.gotopage;
                        let recordid = res.gotoid;
                        this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + recordid]);
                    }
                });
            }
        });
    }
    action(menuid, action, pk, SessionUser, modulename, dialogdata = null) {
        debugger;
        let v_dialogdata = null;
        if (dialogdata != null)
            v_dialogdata = JSON.stringify(dialogdata);
        if (action.modulename != undefined)
            modulename = action.modulename;
        let actionids = [];
        actionids.push(pk);
        {
            var body = {
                menuid: "" + menuid,
                actionid: "" + action.actionid,
                ids: actionids,
                formid: 0,
                actionname: action.actionname,
                SessionUser: SessionUser,
                fkname: '',
                fkname1: '',
                fk: 0,
                fk1: 0,
                modulename: modulename,
                dialogdata: v_dialogdata
            };
            if (action.actiontype == "P") {
                return this.http.post(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/ReportViewer/runprocedure', body).toPromise();
            }
            else {
                return this.http.post(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntireboURL + '/' + action.servicename + '/' + action.actionname, body).toPromise();
            }
        }
    }
    getAttachmentValue(cell) {
        debugger;
        if (cell != null && cell != undefined && cell != "") {
            let cellval = JSON.parse(cell);
            let retval = "";
            try {
                if (cellval != null && cellval != undefined && cellval != "" && cellval != "{}" && cellval != "[]") {
                    cellval.forEach(element => {
                        retval += element.name + ' ';
                    });
                }
            }
            catch (err) {
                console.log(err);
            }
            return retval;
        }
    }
    getCustomValue(cell) {
        debugger;
        let cellval = cell;
        let retval = "";
        try {
            if (cellval != null && cellval != undefined && cellval != "" && cellval != "{}" && cellval != "[]") {
                cellval.forEach(element => {
                    retval += element.name + ' ';
                });
            }
        }
        catch (err) {
            console.log(err);
        }
        return retval;
    }
    ParseComment(cell) {
        debugger;
        let ret = "";
        if (cell == null || cell == undefined || cell == "")
            return "";
        try {
            if (cell != "" && cell != "null" && cell != null && cell != undefined) {
                let comments = JSON.parse(cell);
                for (let comment of comments) {
                    //if (ret != "") ret += "\r\n";
                    let dt = this.ngbDateParserFormatter.parse(comment.currentDate); // 
                    ret += "<p class='nogap'><span class='frontcolor'>" + dt.year + "-" + dt.month + "-" + dt.day + "</span> : " + comment.commentTxt + "</p>";
                    //replyComment
                }
                return ret;
            }
        }
        catch (err) {
            console.log(err);
        }
        return ret;
    }
    ParseUserAccess(cell) {
        let ret = this.ParseUserAccessDetails(cell);
        return ret;
    }
    ParseUserAccessDetails(cell) {
        if (cell == null || cell == undefined || cell == "")
            return "";
        debugger;
        let ret = "";
        let json1;
        let json;
        console.log(cell);
        try {
            json1 = JSON.parse(cell);
            console.log(json1);
            try {
                json = JSON.parse(json1);
            }
            catch (e) {
                json = json1;
            }
            /* json1=json;
               try {
                 json=JSON.parse(json1);
               } catch (e:any) {
                   json=json1;
               }*/
            console.log(json);
            let users = json.user;
            let roles = json.role;
            console.log(users);
            console.log(roles);
            if (users != undefined) {
                for (let i = 0; i < users.length; i++) {
                    let obj = this.getUser(users[i]);
                    ret += obj.username;
                }
            }
            console.log(ret);
            if (roles != undefined) {
                for (let i = 0; i < roles.length; i++) {
                    let obj = this.getRole(roles[i]);
                    ret += obj.userrole;
                }
            }
            console.log(ret);
        }
        catch (e) {
        }
        return ret;
    }
    //
    addMonths(d, val) {
        return d.setMonth(d.getMonth() + val);
    }
    ;
    addDays(d, val) {
        return d.setDate(d.getDay() + val);
    }
    ;
    /*
    getList(key:string) {
    
        return this.http.get(AppConstants.ntireboURL + '/umssectionmaster'+'/param/'+key).toPromise();
    
      }
    */
    dataURItoBlob(dataURI) {
        // convert base64/URLEncoded data component to raw binary data held in a string
        var byteString;
        if (dataURI.split(',')[0].indexOf('base64') >= 0)
            byteString = atob(dataURI.split(',')[1]);
        else
            byteString = unescape(dataURI.split(',')[1]);
        // separate out the mime component
        var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
        // write the bytes of the string to a typed array
        var ia = new Uint8Array(byteString.length);
        for (var i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        return new Blob([ia], { type: mimeString });
    }
    //
    showAttachment(e, filename) {
        //debugger;
        e.preventDefault();
        window.open('http://localhost:5002/Resources/images1/' + filename, '', 'width=200, height=100');
        return false;
    }
    geturl(filename, filetype) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.dialog.open(_custom_openfile_component__WEBPACK_IMPORTED_MODULE_4__.openfileComponent, {
                data: { url: _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.AttachmentURL + filename, ScreenType: 2 },
                header: filename
            });
            return;
            return fetch(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.AttachmentURL + filename)
                .then((res) => res.blob()) // Gets the response and returns it as a blob
                .then((blob) => (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
                return jszip__WEBPACK_IMPORTED_MODULE_3__.loadAsync(blob).then(function (zip) {
                    console.log(zip.files);
                    var url; //  = this.createObjectURL(zip.files[0]);
                    let file = zip.files;
                    Object.keys(zip.files).forEach((filename) => (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
                        return window.URL.createObjectURL(new Blob([zip.file(filename).async('blob')], {
                            type: filetype
                        }));
                        //.then(async (blob) => {
                        console.log(blob);
                        console.log("data:" + filetype + ";base64," + blob);
                        //return "data:"+filetype+";base64,"+blob;
                        var file = new Blob([blob], {
                            type: filetype
                        });
                        url = window.URL.createObjectURL(file); //blob
                        return url;
                        window.open(url);
                        // });  
                    }));
                    //url= window.URL.createObjectURL( file._data );
                    //window.open(url);
                    // folder1/
                    // folder1/folder2/
                    // folder1/folder2/folder3/
                    // folder1/folder2/folder3/file1.txt
                });
            }));
            //return AppConstants.AttachmentURL + filename;
        });
    }
    upload(files, folderid = 0) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            const formData = new FormData();
            formData.append("folderid", folderid.toString());
            if (files.length > 0) {
                for (let file of files) {
                    formData.append(file.name, file);
                }
                //const headers = new HttpHeaders().set('Content-Type', 'multipart/form-data');
                //headers:headers
                const uploadReq = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpRequest('POST', this.uploadURL, formData, {
                    reportProgress: true
                });
                this.http.request(uploadReq).subscribe(event => {
                    if (event.type === _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpEventType.UploadProgress) {
                        this.progress = Math.round(100 * event.loaded / event.total);
                        console.log(this.progress);
                    }
                });
            }
            //    return this.http.post(this.uploadURL, formData).toPromise();
        });
    }
};
SharedService.ctorParameters = () => [
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_9__.Router },
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__.HttpClient },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_10__.TranslateService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_11__.DomSanitizer },
    { type: _service_bousermaster_service__WEBPACK_IMPORTED_MODULE_1__.bousermasterService },
    { type: _service_bomenuaction_service__WEBPACK_IMPORTED_MODULE_5__.bomenuactionService },
    { type: _pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _service_bouserrolemaster_service__WEBPACK_IMPORTED_MODULE_2__.bouserrolemasterService },
    { type: primeng_api__WEBPACK_IMPORTED_MODULE_12__.MessageService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_13__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_14__.DialogService }
];
SharedService = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_15__.Injectable)()
], SharedService);



/***/ }),

/***/ 33639:
/*!********************************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/shared/general.validator.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "KeyValuePair": () => (/* binding */ KeyValuePair),
/* harmony export */   "MustMatch": () => (/* binding */ MustMatch),
/* harmony export */   "DateCompare": () => (/* binding */ DateCompare),
/* harmony export */   "Time": () => (/* binding */ Time),
/* harmony export */   "MustDisable": () => (/* binding */ MustDisable),
/* harmony export */   "MustEnable": () => (/* binding */ MustEnable),
/* harmony export */   "MustVisible1": () => (/* binding */ MustVisible1)
/* harmony export */ });
class KeyValuePair {
    constructor(key, value) {
        this.key = key;
        this.value = value;
    }
}
// custom validator to check that two fields match
function MustMatch(controlName, matchingControlName) {
    return (formGroup) => {
        const control = formGroup.controls[controlName];
        const matchingControl = formGroup.controls[matchingControlName];
        if (matchingControl.errors && !matchingControl.errors.mustMatch) {
            // return if another validator has already found an error on the matchingControl
            return;
        }
        // set error on matchingControl if validation fails
        if (control.value !== matchingControl.value) {
            matchingControl.setErrors({ mustMatch: true });
        }
        else {
            matchingControl.setErrors(null);
        }
    };
}
function DateCompare(controlFromDate, controlToDate, errorMsg) {
    return (formGroup) => {
        //debugger;
        const fromcontrol = formGroup.controls[controlFromDate];
        const toControl = formGroup.controls[controlToDate];
        // return null if controls haven't initialised yet
        if (!fromcontrol || !toControl) {
            return null;
        }
        // return null if another validator has already found an error on the matchingControl
        if (toControl.errors && !toControl.errors.mustGreater) {
            return null;
        }
        //debugger;
        if (fromcontrol.value != null && fromcontrol.value != undefined && toControl.value != null && toControl.value != undefined) {
            let d1 = new Date(fromcontrol.value.year, fromcontrol.value.month, fromcontrol.value.day);
            let d2 = new Date(toControl.value.year, toControl.value.month, toControl.value.day);
            ////debugger;
            // set error on matchingControl if validation fails
            if (d1 > d2) {
                formGroup.controls[controlFromDate].setErrors({ mustGreater: true });
            }
            else {
                formGroup.controls[controlFromDate].setErrors(null);
            }
        }
        //toControl.setErrors(null);
    };
}
class Time {
    constructor(dStr) {
        if (dStr != null) {
            this.hour = Number.parseInt(dStr.substr(0, dStr.indexOf(":")));
            this.minute = Number.parseInt(dStr.substr(dStr.indexOf(":") + 1));
            this.second = 0;
        }
        return this;
    }
}
function MustDisable(maincontrol, val, dependantcontrol) {
    ////debugger;
    // return null if controls haven't initialised yet
    if (!maincontrol || !dependantcontrol) {
        return null;
    }
    if (maincontrol.value == val) {
        dependantcontrol.disable();
    }
    else {
        dependantcontrol.enable();
    }
}
function MustEnable(maincontrol, val, dependantcontrol) {
    ////debugger;
    // return null if controls haven't initialised yet
    if (!maincontrol || !dependantcontrol) {
        return null;
    }
    if (maincontrol.value == val) {
        dependantcontrol.enable();
    }
    else {
        dependantcontrol.disable();
    }
}
function MustVisible1(formGroup, maincontrolname, val, dependantcontrolname) {
    //  return (formGroup: FormGroup) => {
    ////debugger;
    const maincontrol = formGroup.controls[maincontrolname];
    const dependantcontrol = formGroup.controls[dependantcontrolname];
    // return null if controls haven't initialised yet
    if (!maincontrol || !dependantcontrol) {
        return null;
    }
    /*
            // set error on matchingControl if validation fails
            if (d1>d2 ) {
                formGroup.controls[controlToDate].setErrors({ mustGreater: true });
            } else {
                formGroup.controls[controlToDate].setErrors(null);
            }
            
    */
    //toControl.setErrors(null);
    //    }
}


/***/ }),

/***/ 30923:
/*!*********************************************************!*\
  !*** ./projects/n-tire-bo-app/src/app/shared/helper.ts ***!
  \*********************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "AppConstants": () => (/* binding */ AppConstants),
/* harmony export */   "AppFunctions": () => (/* binding */ AppFunctions)
/* harmony export */ });
//df27be02.ngrok.iof9d471fe.ngrok.io
class AppConstants {
    static get baseURL() { return "http://localhost:7002/api"; }
    static get ntireboURL() { return "http://localhost:7002/api"; }
    static get ntirebizURL() { return "http://localhost:7025/api"; }
    static get UploadURL() { return "http://localhost:7002/api/file/upload"; }
    static get AttachmentURL() { return "http://localhost:5002/"; }
    /*
    public static get baseURL(): string { return "http://ssbo.loca.lt/api"; }
    public static get ntireboURL(): string { return "http://ssbo.loca.lt/api"; }
    public static get ntirebizURL(): string { return "http://ssbiz.loca.lt/api"; }
    public static get UploadURL(): string { return "http://ssbo.loca.lt/api/file/upload"; }
    public static get AttachmentURL(): string { return "http://ssattachment.loca.lt/"; }
    */
    static get ntirecamsURL() { return "http://localhost:7003/api"; }
    static get ntiredashboardsURL() { return "http://localhost:7002/api"; }
    static get ntirecontentURL() { return "http://localhost:8001/api/v1/namespaces/default/services/ntirecontent-service/proxy/api"; }
    static get ntireprojectURL() { return "http://localhost:8001/api/v1/namespaces/default/services/ntireproject-service/proxy/api"; }
    static get ntiredmsURL() { return "http://localhost:7008/api"; }
    static get ntireprocurementURL() { return "http://localhost:7019/api"; }
    static get ntirevisitorURL() { return "http://localhost:7024/api"; }
    static get ntirehrmsURL() { return "http://localhost:7013/api"; }
    static get ntirelegalURL() { return "http://localhost:7016/api"; }
    static get ntirelearnURL() { return "http://localhost:8001/api/v1/namespaces/default/services/ntirelearn-service/proxy/api"; }
    static get ntirefleetURL() { return "http://localhost:8001/api/v1/namespaces/default/services/ntirefleet-service/proxy/api"; }
    static get ntirefinanceURL() { return "http://localhost:7009/api"; }
    static get ntireitURL() { return "http://localhost:8001/api/v1/namespaces/default/services/ntireit-service/proxy/api"; }
    static get ntirecrmURL() { return "http://localhost:7006/api"; }
    // public static get ntireboURL(): string { return "http://localhost:8001/api/v1/namespaces/default/services/ntirebo-service/proxy/api"; }
    static get ntirehospitalURL() { return "http://localhost:8001/api/v1/namespaces/default/services/ntirehospital-service/proxy/api"; }
    static get ntirecommerceURL() { return "http://localhost:8001/api/v1/namespaces/default/services/ntirecommerce-service/proxy/api"; }
    static get ntireloyaltyURL() { return "http://localhost:7017/api"; }
    //public static get ntirecamsURL(): string { return "http://localhost:8001/api/v1/namespaces/default/services/ntirecams-service/proxy/api"; }
    static get ntirepropertyURL() { return "http://localhost:7021/api"; }
    static get ntirehelpdeskURL() { return "http://localhost:7011/api"; }
}
class AppFunctions {
    constructor() {
        //this.useraccesslistusers=await this.bousermasterservice.getbousermastersList();
        //this.useraccesslistroles=await this.bouserrolemasterservice.getbouserrolemastersList()
    }
}


/***/ }),

/***/ 37983:
/*!********************************************************************************************************!*\
  !*** ./projects/n-tire-help-desk-app/src/app/pages/forms/hlpticketdetail/hlpticketdetail.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hlpticketdetailComponent": () => (/* binding */ hlpticketdetailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_hlpticketdetail_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./hlpticketdetail.component.html */ 66767);
/* harmony import */ var _service_hlpticketdetail_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/hlpticketdetail.service */ 71080);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_bo_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-bo-app/src/app/pages/core/services/toast.service */ 52337);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _n_tire_bo_app_src_app_service_boconfigvalue_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-bo-app/src/app/service/boconfigvalue.service */ 41709);
/* harmony import */ var _n_tire_bo_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-bo-app/src/app/shared/general.validator */ 33639);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _service_hlpticket_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../service/hlpticket.service */ 4148);
/* harmony import */ var _n_tire_bo_app_src_app_service_bousermaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-bo-app/src/app/service/bousermaster.service */ 48680);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs/operators */ 80639);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs/operators */ 33927);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_bo_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-bo-app/src/app/service/shared.service */ 98499);
/* harmony import */ var _n_tire_bo_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-bo-app/src/app/pages/core/services/session.service */ 71358);
/* harmony import */ var _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../n-tire-bo-app/src/app/shared/helper */ 30923);
/* harmony import */ var _n_tire_bo_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../n-tire-bo-app/src/app/service/customfieldconfiguration.service */ 7655);








//Custom error functions


//Shortcuts

//translator



//popups
//detail table services



//primeng services



//session,application constants


//custom fields & attachments


let hlpticketdetailComponent = class hlpticketdetailComponent {
    constructor(nav, translate, keyboard, router, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, hlpticketdetailservice, fb, sharedService, sessionService, toastr, 
    //private dialog: NbDialogService,
    configservice, hlpticketservice, bousermasterservice, customfieldservice, currentRoute) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.hlpticketdetailservice = hlpticketdetailservice;
        this.fb = fb;
        this.sharedService = sharedService;
        this.sessionService = sessionService;
        this.toastr = toastr;
        this.configservice = configservice;
        this.hlpticketservice = hlpticketservice;
        this.bousermasterservice = bousermasterservice;
        this.customfieldservice = customfieldservice;
        this.currentRoute = currentRoute;
        this.hidelist = [];
        this.viewhtml = ''; //stores html view of the screen
        this.showview = false; //view or edit mode
        this.theme = ""; //current theme
        //formdata: any;//current form data
        this.shortcuts = []; //keyboard keys
        this.showsubmit = true; //button to show
        this.showGoWorkFlow = false;
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter(); //autocomplete of pk
        this.toolbarvisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.data3 = [];
        this.bfilterPopulatehlpticketdetails = false;
        this.datahlpticketdetailsticketid3 = [];
        this.datahlpticketdetailsactionuser3 = [];
        this.ticketidoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter(); //autocomplete
        this.actionuseroptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customfieldvisible = true;
        this.AttachmentURL = _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_9__.AppConstants.AttachmentURL;
        this.URL = _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_9__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileattachmentlist = [];
        this.attachmentfieldjson = [];
        this.attachmentvisible = true;
        this.translate = this.sharedService.translate;
        this.data = dynamicconfig;
        this.pmenuid = sharedService.menuid;
        this.pcurrenturl = sharedService.currenturl;
        this.keyboard.add([
            {
                key: 'cmd l',
                command: () => this.router.navigate(["/home/" + this.pcurrenturl]),
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
        this.hlpticketdetailForm = this.fb.group({
            pk: [null],
            ImageName: [null],
            ticketdetailid: [null],
            ticketid: [null],
            ticketiddesc: [null],
            sourcefield: [null],
            sourcereference: [null],
            assignedto: [null],
            actionuser: [null],
            actionuserdesc: [null],
            assigneddate: [null],
            actiondate: [null],
            tatends: [null],
            actionremarks: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.hlpticketdetailForm.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarvisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.hlpticketdetailForm.dirty && this.hlpticketdetailForm.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_12__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_12__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_12__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.ticketdetailid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.ticketdetailid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.ticketdetailid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            //session & theme
            this.sessiondata = this.sessionService.getSession();
            if (this.sessiondata != null) {
                this.SESSIONUSERID = this.sessiondata.userid;
            }
            this.theme = this.sessionService.getItem('selected-theme');
            this.viewhtml = this.sessionService.getViewHtml();
            debugger;
            //getting data - from list page, from other screen through dialog
            if (this.data != null && this.data.data != null) {
                this.data = this.data.data;
                this.maindata = this.data;
            }
            if (this.maindata != null && this.maindata.showview != undefined && this.maindata.showview != null)
                this.showview = this.maindata.showview;
            if (this.data != null && this.data.event != null && this.data.event.data != null)
                this.data = this.data.event.data;
            if (this.currentRoute.snapshot.paramMap.get('sourcekey') != null) {
                this.sourcekey = this.currentRoute.snapshot.paramMap.get('sourcekey');
            }
            let hlpticketdetailid = null;
            //if view button(eye) is clicked
            if (this.currentRoute.snapshot.paramMap.get('viewid') != null) {
                this.pkcol = this.currentRoute.snapshot.paramMap.get('viewid');
                this.showview = true;
                //this.viewhtml=this.sessionService.getViewHtml();
            }
            else if (this.currentRoute.snapshot.paramMap.get('usersource') != null) {
                this.pkcol = this.sessionService.getItem('usersource');
            }
            else if (this.data != null && this.data.pkcol != null) {
                this.pkcol = this.data.pkcol;
            }
            else {
                this.pkcol = this.currentRoute.snapshot.paramMap.get('id');
                this.showformtype = this.currentRoute.snapshot.paramMap.get('showformtype');
            }
            //copy the data from previous dialog 
            this.PopulateFromMainScreen(this.data, false);
            this.PopulateFromMainScreen(this.dynamicconfig.data, true);
            if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
                this.ShowTableslist = this.currentRoute.snapshot.paramMap.get('tableid').split(',');
            }
            this.formid = hlpticketdetailid;
            //this.sharedService.alert(hlpticketdetailid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.FillCustomField();
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.hlpticketservice.gethlpticketsList().then(res => {
                this.ticketidList = res;
                if (this.hlpticketdetailservice.formData && this.hlpticketdetailservice.formData.ticketid) {
                    this.ticketidoptionsEvent.emit(this.ticketidList);
                    this.hlpticketdetailForm.patchValue({
                        ticketid: this.hlpticketdetailservice.formData.ticketid,
                        ticketiddesc: this.hlpticketdetailservice.formData.ticketiddesc,
                    });
                }
                {
                    let arrticketid = this.ticketidList.filter(v => v.ticketid == this.hlpticketdetailForm.get('ticketid').value);
                    let objticketid;
                    if (arrticketid.length > 0)
                        objticketid = arrticketid[0];
                    if (objticketid) {
                    }
                }
            }).catch((err) => { console.log(err); });
            this.ticketid_hlpticketsoptions = (text$) => text$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.debounceTime)(200), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.map)(value => value.length < 2 ? []
                : this.ticketidList.filter(v => v.subject.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10)));
            this.ticketid_hlpticketsformatter = (result) => result.subject;
            this.bousermasterservice.getbousermastersList().then(res => {
                this.actionuserList = res;
                if (this.hlpticketdetailservice.formData && this.hlpticketdetailservice.formData.actionuser) {
                    this.actionuseroptionsEvent.emit(this.actionuserList);
                    this.hlpticketdetailForm.patchValue({
                        actionuser: this.hlpticketdetailservice.formData.actionuser,
                        actionuserdesc: this.hlpticketdetailservice.formData.actionuserdesc,
                    });
                }
                {
                    let arractionuser = this.actionuserList.filter(v => v.userid == this.hlpticketdetailForm.get('actionuser').value);
                    let objactionuser;
                    if (arractionuser.length > 0)
                        objactionuser = arractionuser[0];
                    if (objactionuser) {
                    }
                }
            }).catch((err) => { console.log(err); });
            this.actionuser_bousermastersoptions = (text$) => text$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.debounceTime)(200), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.map)(value => value.length < 2 ? []
                : this.actionuserList.filter(v => v.username.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10)));
            this.actionuser_bousermastersformatter = (result) => result.username;
            //autocomplete
            this.hlpticketdetailservice.gethlpticketdetailsList().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { console.log(err); });
            this.pk_tbloptions = (text$) => text$.pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_14__.debounceTime)(200), (0,rxjs_operators__WEBPACK_IMPORTED_MODULE_15__.map)(value => value.length < 2 ? []
                : this.pkList.filter(v => v.pkcol.toString().toLowerCase().indexOf(value.toLowerCase()) > -1).slice(0, 10)));
            this.pk_tblformatter = (result) => result.pkcol;
            //setting the flag that the screen is not touched 
            this.hlpticketdetailForm.markAsUntouched();
            this.hlpticketdetailForm.markAsPristine();
        });
    }
    onSelectedticketid(ticketidDetail) {
        if (ticketidDetail.ticketid && ticketidDetail) {
            this.hlpticketdetailForm.patchValue({
                ticketid: ticketidDetail.ticketid,
                ticketiddesc: ticketidDetail.subject,
            });
        }
    }
    onSelectedactionuser(actionuserDetail) {
        if (actionuserDetail.userid && actionuserDetail) {
            this.hlpticketdetailForm.patchValue({
                actionuser: actionuserDetail.userid,
                actionuserdesc: actionuserDetail.username,
            });
        }
    }
    resetForm() {
        if (this.hlpticketdetailForm != null)
            this.hlpticketdetailForm.reset();
        this.hlpticketdetailForm.patchValue({
            actionuser: this.sessiondata.userid,
            actionuserdesc: this.sessiondata.username,
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.data != null) {
            this.hlpticketdetailForm.patchValue({
                sourcefield: this.data.sourcefield, sourcereference: this.data.sourcereference
            });
        }
    }
    onDelete() {
        let ticketdetailid = this.hlpticketdetailForm.get('ticketdetailid').value;
        if (ticketdetailid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.hlpticketdetailservice.deletehlpticketdetail(ticketdetailid).then(res => {
                    this.resetForm();
                }).catch((err) => { console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.hlpticketdetailForm.patchValue({
            ticketdetailid: null
        });
        if (this.hlpticketdetailservice.formData.ticketdetailid != null)
            this.hlpticketdetailservice.formData.ticketdetailid = null;
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
                    else if (key == "assignedto")
                        this.hlpticketdetailForm.patchValue({ "assignedto": mainscreendata[key] });
                    else if (key == "assigneddate")
                        this.hlpticketdetailForm.patchValue({ "assigneddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "actiondate")
                        this.hlpticketdetailForm.patchValue({ "actiondate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "tatends")
                        this.hlpticketdetailForm.patchValue({ "tatends": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.hlpticketdetailForm.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.hlpticketdetailForm.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.hlpticketdetailForm.controls[key] != undefined) {
                                this.hlpticketdetailForm.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("hlpticketdetails", this.CustomFormName, "", "", this.customfieldjson).then(res => {
                this.customfieldservicelist = res;
                if (this.customfieldservicelist != undefined)
                    this.customfieldvisible = (this.customfieldservicelist.fields.length > 0) ? true : false;
                return res;
            });
        });
    }
    onClose() {
        this.dialogRef.close();
    }
    onSubmitAndWait() {
        if (this.maindata == undefined || this.maindata.pkcol != '' || this.maindata.save == true) {
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
        if (this.maindata == undefined || this.maindata.pkcol != '' || this.maindata.save == true) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    ticketdetailidonChange(evt) {
        let e = evt.value;
    }
    ticketidonChange(evt) {
        let e = evt.value;
    }
    sourcefieldonChange(evt) {
        let e = evt.value;
    }
    sourcereferenceonChange(evt) {
        let e = evt.value;
    }
    assignedtoonChange(evt) {
        let e = evt.value;
    }
    actionuseronChange(evt) {
        let e = evt.value;
    }
    assigneddateonChange(evt) {
        let e = evt.value;
    }
    actiondateonChange(evt) {
        let e = evt.value;
    }
    tatendsonChange(evt) {
        let e = evt.value;
    }
    actionremarksonChange(evt) {
        let e = evt.value;
    }
    customfieldonChange(evt) {
        let e = evt.value;
    }
    attachmentonChange(evt) {
        let e = evt.value;
    }
    statusonChange(evt) {
        let e = evt.value;
    }
    attachmentuploader(e) {
        for (let i = 0; i < e.files.length; i++) {
            this.fileattachmentlist.push(e.files[i]);
            let max = 0;
            let attachmentobj = null;
            if (this.attachmentfieldjson == null)
                this.attachmentfieldjson = [];
            max = Array.of(this.attachmentfieldjson).length;
            attachmentobj = new _n_tire_bo_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_4__.KeyValuePair((this.attachmentfieldjson.length + 1 + max).toString(), e.files[i].name);
            this.attachmentfieldjson.push(attachmentobj);
            max = 0;
            if (this.attachmentlist != null)
                max = Array.of(this.attachmentlist).length;
            attachmentobj = new _n_tire_bo_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_4__.KeyValuePair((this.attachmentlist.length + 1 + max).toString(), e.files[i].name);
            this.attachmentlist.push(attachmentobj);
        }
    }
    edithlpticketdetails() {
        this.showview = false;
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            this.hlpticketdetailservice.gethlpticketdetailsByEID(pkcol).then(res => {
                this.hlpticketdetailservice.formData = res.hlpticketdetail;
                let formproperty = res.hlpticketdetail.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.hlpticketdetail.pkcol;
                this.formid = res.hlpticketdetail.ticketdetailid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.hlpticketdetailservice.formData = res.hlpticketdetail;
        this.formid = res.hlpticketdetail.ticketdetailid;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.hlpticketdetailForm.patchValue({
            ticketdetailid: res.hlpticketdetail.ticketdetailid,
            ticketid: res.hlpticketdetail.ticketid,
            ticketiddesc: res.hlpticketdetail.ticketiddesc,
            sourcefield: res.hlpticketdetail.sourcefield,
            sourcereference: res.hlpticketdetail.sourcereference,
            assignedto: JSON.parse(res.hlpticketdetail.assignedto),
            actionuser: res.hlpticketdetail.actionuser,
            actionuserdesc: res.hlpticketdetail.actionuserdesc,
            assigneddate: this.ngbDateParserFormatter.parse(res.hlpticketdetail.assigneddate),
            actiondate: this.ngbDateParserFormatter.parse(res.hlpticketdetail.actiondate),
            tatends: this.ngbDateParserFormatter.parse(res.hlpticketdetail.tatends),
            actionremarks: res.hlpticketdetail.actionremarks,
            customfield: res.hlpticketdetail.customfield,
            attachment: JSON.parse(res.hlpticketdetail.attachment),
            status: res.hlpticketdetail.status,
            statusdesc: res.hlpticketdetail.statusdesc,
        });
        if (this.hlpticketdetailForm.get('customfield').value != null && this.hlpticketdetailForm.get('customfield').value != "")
            this.customfieldjson = JSON.parse(this.hlpticketdetailForm.get('customfield').value);
        this.FillCustomField();
        if (this.hlpticketdetailForm.get('attachment').value != null && this.hlpticketdetailForm.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.hlpticketdetailForm.get('attachment').value);
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.hlpticketdetailForm.controls) {
            if (this.hlpticketdetailForm.controls[key] != null) {
                if (false) {}
                else if (false) {}
                else if (false) {}
                else
                    ret = ret.replace(new RegExp('##' + key + '##', 'g'), this.hlpticketdetailForm.controls[key].value);
            }
        }
        return ret;
    }
    onSubmitDataDlg(bclear) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.hlpticketdetailForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.hlpticketdetailForm.value;
            if (this.hlpticketdetailForm.get('assignedto').value != null)
                obj.assignedto = JSON.stringify(this.hlpticketdetailForm.get('assignedto').value);
            obj.assigneddate = new Date(this.hlpticketdetailForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('assigneddate').value) + '  UTC' : null);
            obj.actiondate = new Date(this.hlpticketdetailForm.get('actiondate').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('actiondate').value) + '  UTC' : null);
            obj.tatends = new Date(this.hlpticketdetailForm.get('tatends').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('tatends').value) + '  UTC' : null);
            if (customfields != null)
                obj.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getattachmentlist() != null)
                obj.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
            obj.fileattachmentlist = this.fileattachment.getAllFiles();
            console.log(obj);
            yield this.sharedService.upload(this.fileattachmentlist);
            this.attachmentlist = [];
            if (this.fileattachment)
                this.fileattachment.clear();
            this.dialogRef.close(obj);
            setTimeout(() => {
                //this.dialogRef.destroy();
            }, 200);
        });
    }
    //This has to come from bomenuactions & procedures
    afteraction(mode) {
        let formname = "";
        let query = "";
        if (mode == "new")
            this.router.navigate(['/home/' + formname + '/' + formname + query]);
        else if (mode == "refresh")
            this.router.navigate(['/home/' + formname + '/' + formname + '/edit/' + this.formid + query]);
    }
    hlpticketdetailtoggleOption() {
        this.hlpticketdetailshowOption = this.hlpticketdetailshowOption === true ? false : true;
    }
    onSubmitData(bclear) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            Object.keys(this.hlpticketdetailForm.controls).forEach(key => {
                const controlErrors = this.hlpticketdetailForm.get(key).errors;
                if (controlErrors != null) {
                    Object.keys(controlErrors).forEach(keyError => {
                        strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
                    });
                }
            });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.hlpticketdetailForm.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.hlpticketdetailservice.formData = this.hlpticketdetailForm.value;
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.hlpticketdetailForm.controls[key] != null) {
                            this.hlpticketdetailservice.formData[key] = this.hlpticketdetailForm.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            if (this.hlpticketdetailForm.get('assignedto').value != null)
                this.hlpticketdetailservice.formData.assignedto = JSON.stringify(this.hlpticketdetailForm.get('assignedto').value);
            this.hlpticketdetailservice.formData.assigneddate = new Date(this.hlpticketdetailForm.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('assigneddate').value) + '  UTC' : null);
            this.hlpticketdetailservice.formData.actiondate = new Date(this.hlpticketdetailForm.get('actiondate').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('actiondate').value) + '  UTC' : null);
            this.hlpticketdetailservice.formData.tatends = new Date(this.hlpticketdetailForm.get('tatends').value ? this.ngbDateParserFormatter.format(this.hlpticketdetailForm.get('tatends').value) + '  UTC' : null);
            if (customfields != null)
                this.hlpticketdetailservice.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getattachmentlist() != null)
                this.hlpticketdetailservice.formData.attachment = JSON.stringify(this.fileattachment.getattachmentlist());
            this.fileattachmentlist = this.fileattachment.getAllFiles();
            console.log(this.hlpticketdetailservice.formData);
            this.hlpticketdetailservice.formData = this.hlpticketdetailForm.value;
            this.hlpticketdetailservice.saveOrUpdatehlpticketdetails().subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileattachmentlist);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.showview = true;
                document.getElementById("contentArea1").scrollTop = 0;
                if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                    this.dialogRef.close(res.hlpticketdetail);
                    return;
                }
                else {
                    document.getElementById("contentArea1").scrollTop = 0;
                }
                this.hlpticketdetailservice.clearList();
                if (bclear) {
                    this.resetForm();
                }
                else {
                    if (this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2)) {
                        this.dialogRef.close(res.hlpticketdetail);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.hlpticketdetailForm.markAsUntouched();
                this.hlpticketdetailForm.markAsPristine();
            }), err => {
                debugger;
                this.toastr.addSingle("error", "", err.error);
                console.log(err);
            });
        });
    }
    //dropdown edit from the screen itself -> One screen like Reportviewer
    AddOrEditticketid(ticketid) {
        /*let ScreenType='2';
        this.dialog.open(hlpticketComponent,
        {
        data: {ticketid:this.hlpticketdetailForm.get('ticketid').value, ScreenType:2 }
        }
        ).onClose.subscribe(res => {
        });*/
    }
    AddOrEditactionuser(userid) {
        /*let ScreenType='2';
        this.dialog.open(bousermasterComponent,
        {
        data: {userid:this.hlpticketdetailForm.get('actionuser').value, ScreenType:2 }
        }
        ).onClose.subscribe(res => {
        });*/
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
};
hlpticketdetailComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_16__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_19__.Router },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_20__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DialogService },
    { type: _service_hlpticketdetail_service__WEBPACK_IMPORTED_MODULE_1__.hlpticketdetailService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_22__.FormBuilder },
    { type: _n_tire_bo_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_7__.SharedService },
    { type: _n_tire_bo_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_8__.SessionService },
    { type: _n_tire_bo_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_bo_app_src_app_service_boconfigvalue_service__WEBPACK_IMPORTED_MODULE_3__.boconfigvalueService },
    { type: _service_hlpticket_service__WEBPACK_IMPORTED_MODULE_5__.hlpticketService },
    { type: _n_tire_bo_app_src_app_service_bousermaster_service__WEBPACK_IMPORTED_MODULE_6__.bousermasterService },
    { type: _n_tire_bo_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_10__.customfieldconfigurationService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_19__.ActivatedRoute }
];
hlpticketdetailComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ViewChild, args: ['customform', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ViewChild, args: ['fileattachment', { static: false },] }]
};
hlpticketdetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
        selector: 'app-hlpticketdetail',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_hlpticketdetail_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__.KeyboardShortcutsService]
    })
], hlpticketdetailComponent);



/***/ }),

/***/ 4148:
/*!****************************************************************************!*\
  !*** ./projects/n-tire-help-desk-app/src/app/service/hlpticket.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hlpticketService": () => (/* binding */ hlpticketService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-bo-app/src/app/shared/helper */ 30923);
/* harmony import */ var _n_tire_bo_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-bo-app/src/app/pages/core/services/session.service */ 71358);






let hlpticketService = class hlpticketService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
        this.hlpplannedactions = [];
        this.hlpticketdetails = [];
    }
    valid() {
        return true;
    }
    saveOrUpdatehlptickets() {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, this.formData), { hlpplannedactions: this.hlpplannedactions.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), hlpticketdetails: this.hlpticketdetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket', body);
        }
    }
    saveOrUpdatehlpticketsList() {
        if (this.valid()) {
            var body = {
                list: this.list,
            };
            return this.http.post(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket', body);
        }
    }
    gethlpticketsList() {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket').toPromise();
        }
    }
    getListByticketid(ticketid) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket' + '/ticketid/' + ticketid).toPromise();
        }
    }
    getListBysourcereference(sourcereference) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket' + '/sourcereference/' + sourcereference).toPromise();
        }
    }
    getListBycriticality(criticality) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket' + '/criticality/' + criticality).toPromise();
        }
    }
    getListBysource(source) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket' + '/source/' + source).toPromise();
        }
    }
    getListBycategory(category) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket' + '/category/' + category).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket' + '/param/' + key).toPromise();
        }
    }
    gethlpticketsByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket' + '/e/' + id).toPromise();
        }
    }
    gethlpticketsByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket' + '/' + id).toPromise();
        }
    }
    deletehlpticket(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket' + '/' + id).toPromise();
        }
    }
    clearList() {
        this.hlpplannedactions = [];
        this.hlpticketdetails = [];
    }
    refreshList() {
        if (this.valid()) {
            this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket')
                .toPromise()
                .then(res => this.list = res);
        }
    }
    gethlpticketsListbycriticality(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket/' + dt + '').toPromise();
        }
    }
    gethlpticketsListbystatus(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket/' + dt + '').toPromise();
        }
    }
    gethlpticketsListbycategory(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket/' + dt + '').toPromise();
        }
    }
    gethlpticketsListbytickettype(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket/' + dt + '').toPromise();
        }
    }
    gethlpticketsListbymonthwise(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket/' + dt + '').toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticket')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(hlpticket => new hlpticket(hlpticket.ticketid, hlpticket.sourcefield, hlpticket.sourcefielddesc, hlpticket.sourcereference, hlpticket.branchid, hlpticket.branchiddesc, hlpticket.departmentid, hlpticket.departmentiddesc, hlpticket.requestortype, hlpticket.requestortypedesc, hlpticket.requestor, hlpticket.requestordesc, hlpticket.item, hlpticket.ticketdate, hlpticket.incidentdate, hlpticket.incidenttime, hlpticket.incidentduration, hlpticket.duedate, hlpticket.assignedto, hlpticket.tickettype, hlpticket.tickettypedesc, hlpticket.priority, hlpticket.prioritydesc, hlpticket.criticality, hlpticket.criticalitydesc, hlpticket.impact, hlpticket.impactdesc, hlpticket.risk, hlpticket.riskdesc, hlpticket.sla, hlpticket.sladesc, hlpticket.slabreached, hlpticket.source, hlpticket.sourcedesc, hlpticket.ticketreference, hlpticket.category, hlpticket.categorydesc, hlpticket.subcategory, hlpticket.subcategorydesc, hlpticket.tags, hlpticket.subject, hlpticket.ticketdetails, hlpticket.impacteditems, hlpticket.impactedservices, hlpticket.impactedproducts, hlpticket.impactdetails, hlpticket.remarks, hlpticket.stage, hlpticket.stagedesc, hlpticket.completedby, hlpticket.completedbydesc, hlpticket.linkedtickets, hlpticket.rca, hlpticket.rcadesc, hlpticket.rcadetails, hlpticket.solution, hlpticket.solutiondesc, hlpticket.solutiondetails, hlpticket.solutiongivenon, hlpticket.startdate, hlpticket.completeddate, hlpticket.lessonslearned, hlpticket.history, hlpticket.customfield, hlpticket.attachment, hlpticket.status, "", ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(hlpticket => hlpticket.subject.includes(filter.name));
            return response;
        }));
    }
};
hlpticketService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_bo_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
hlpticketService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], hlpticketService);



/***/ }),

/***/ 71080:
/*!**********************************************************************************!*\
  !*** ./projects/n-tire-help-desk-app/src/app/service/hlpticketdetail.service.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "hlpticketdetailService": () => (/* binding */ hlpticketdetailService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-bo-app/src/app/shared/helper */ 30923);
/* harmony import */ var _n_tire_bo_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-bo-app/src/app/pages/core/services/session.service */ 71358);





let hlpticketdetailService = class hlpticketdetailService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdatehlpticketdetails() {
        if (this.valid()) {
            var body = Object.assign({}, this.formData);
            return this.http.post(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticketdetail', body);
        }
    }
    saveOrUpdatehlpticketdetailsList() {
        if (this.valid()) {
            var body = {
                list: this.list,
            };
            return this.http.post(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticketdetail', body);
        }
    }
    gethlpticketdetailsList() {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticketdetail').toPromise();
        }
    }
    getListByticketdetailid(ticketdetailid) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticketdetail' + '/ticketdetailid/' + ticketdetailid).toPromise();
        }
    }
    getListBysourcereference(sourcereference) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticketdetail' + '/sourcereference/' + sourcereference).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticketdetail' + '/param/' + key).toPromise();
        }
    }
    gethlpticketdetailsByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticketdetail' + '/e/' + id).toPromise();
        }
    }
    gethlpticketdetailsByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticketdetail' + '/' + id).toPromise();
        }
    }
    deletehlpticketdetail(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticketdetail' + '/' + id).toPromise();
        }
    }
    clearList() {
    }
    refreshList() {
        if (this.valid()) {
            this.http.get(_n_tire_bo_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirehelpdeskURL + '/hlpticketdetail')
                .toPromise()
                .then(res => this.list = res);
        }
    }
};
hlpticketdetailService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_bo_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
hlpticketdetailService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], hlpticketdetailService);



/***/ }),

/***/ 94507:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/hlpplannedaction/hlpplannedaction.component.html ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"hlpplannedaction_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Planned Actions' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_hlpplannedactions()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of hlpplannedaction_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.planid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.planid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('actionid') == -1) && (actionidvisible==undefined || actionidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actionid\" class=\"control-label\">Action</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actionid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"actionid\" formControlName=\"actionid\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--ticketid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('ticketid') == -1) && (ticketidvisible==undefined || ticketidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"ticketid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_ticketid(null)\">Ticket</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"ticketid_List\" [optionsEvent]=\"ticketid_optionsEvent\"\r\n          [form]=\"hlpticket\" (selectItem)=\"onSelected_ticketid($event)\" [reportid]='ipad7' [menuid]='ipad7'\r\n          formControlName=\"ticketid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.ticketiddesc?.value}}</label>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('plannedaction') == -1) && (plannedactionvisible==undefined || plannedactionvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"plannedaction\" class=\"control-label\">Planned Action</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.plannedaction?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"plannedaction\"\r\n          formControlName=\"plannedaction\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('assignto') == -1) && (assigntovisible==undefined || assigntovisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"assignto\" class=\"control-label\">Assign To</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.assignto?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"assignto\" formControlName=\"assignto\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 63773:
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/hlpticket/hlpticket.component.html ***!
  \*******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"hlpticket_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Tickets' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_hlptickets()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of hlpticket_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.ticketid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.ticketid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\"><i title=\"Master\" class=\"fa fa-home\"><br>\r\n              <font style='font-size: 1rem;'>Master</font>\r\n            </i></div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n\r\n\r\n            <!--branchid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"branchid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_branchid(null)\">Branch</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"branchid_List\" [optionsEvent]=\"branchid_optionsEvent\"\r\n                  [form]=\"bobranchmaster\" (selectItem)=\"onSelected_branchid($event)\" [reportid]='bxg94' [menuid]='bxg94'\r\n                  formControlName=\"branchid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.branchiddesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--departmentid-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('departmentid') == -1) && (departmentidvisible==undefined || departmentidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"departmentid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_departmentid(null)\" (click)=\"AddOrEdit_departmentid(null)\">Department</label>\r\n                <select *ngIf=\"!showview\" id=\"departmentid\" (change)=\"departmentid_onChange($event.target)\"\r\n                  formControlName=\"departmentid\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of departmentid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.departmentiddesc?.value}}</label>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Ticket Info' [selected]='true'>\r\n\r\n\r\n              <!--requestortype-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('requestortype') == -1) && (requestortypevisible==undefined || requestortypevisible==true))\"\r\n                  style='' class=\"col-4\"><label for=\"requestortype\" class=\"control-label\">Requestor Type</label>\r\n                  <div class=\"form-control\">\r\n                    <ng-container *ngFor=\"let item of requestortype_List\" class=\"p-field-checkbox\">\r\n                      <p-radioButton *ngIf=\"!showview\" id=\"requestortypedesc\" formControlName=\"requestortype\"\r\n                        [inputId]=\"item.configkey\" name=\"requestortype\" [value]=\"item.configkey\"\r\n                        formControlName=\"requestortype\" (onClick)=\"requestortype_onChange($event)\">\r\n                      </p-radioButton>\r\n                      <label [for]=\"item.configkey\">{{item.configtext}}</label>\r\n                    </ng-container>\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.requestortypedesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--requestor-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('requestor') == -1) && (requestorvisible==undefined || requestorvisible==true))\"\r\n                  style='' class=\"col-4\"><label for=\"requestor\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_requestor(null)\">Requestor</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"requestor_List\" [optionsEvent]=\"requestor_optionsEvent\"\r\n                    [form]=\"bousermaster\" (selectItem)=\"onSelected_requestor($event)\" [reportid]='e99kq'\r\n                    [menuid]='e99kq' formControlName=\"requestor\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.requestordesc?.value}}</label>\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('item') == -1) && (itemvisible==undefined || itemvisible==true))\"\r\n                  style='' class=\"col-4 \">\r\n                  <label for=\"item\" class=\"control-label\">Item</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.item?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"item\" formControlName=\"item\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('ticketdate') == -1) && (ticketdatevisible==undefined || ticketdatevisible==true))\"\r\n                  style='' class=\"col-4 \">\r\n                  <label for=\"ticketdate\" class=\"control-label\">Ticket Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.ticketdate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #ticketdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"ticketdateformpicker\"\r\n                      id=\"ticketdate\" formControlName=\"ticketdate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"ticketdateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('incidentdate') == -1) && (incidentdatevisible==undefined || incidentdatevisible==true))\"\r\n                  style='' class=\"col-4 \">\r\n                  <label for=\"incidentdate\" class=\"control-label\">Incident Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.incidentdate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #incidentdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"incidentdateformpicker\"\r\n                      id=\"incidentdate\" formControlName=\"incidentdate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"incidentdateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('incidenttime') == -1) && (incidenttimevisible==undefined || incidenttimevisible==true))\"\r\n                  style='' class=\"col-4 \">\r\n                  <label for=\"incidenttime\" class=\"control-label\">Incident Time</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.incidenttime?.value}}</label>\r\n                  <ngb-timepicker *ngIf=\"!showview\" class=\"form-control timepicker\" formControlName=\"incidenttime\">\r\n                  </ngb-timepicker>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('incidentduration') == -1) && (incidentdurationvisible==undefined || incidentdurationvisible==true))\"\r\n                  style='' class=\"col-4 \">\r\n                  <label for=\"incidentduration\" class=\"control-label\">Incident Duration</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.incidentduration?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"incidentduration\" formControlName=\"incidentduration\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('duedate') == -1) && (duedatevisible==undefined || duedatevisible==true))\"\r\n                  style='' class=\"col-4 \">\r\n                  <label for=\"duedate\" class=\"control-label\">Due Date</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.duedate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #duedateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"duedateformpicker\" id=\"duedate\"\r\n                      formControlName=\"duedate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"duedateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('assignedto') == -1) && (assignedtovisible==undefined || assignedtovisible==true))\"\r\n                  style='' class=\"col-4 \">\r\n                  <label for=\"assignedto\" class=\"control-label\">Assigned To</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.assignedto?.value}}</label>\r\n                  <app-useraccess *ngIf=\"!showview\" id=\"assignedto\" formControlName=\"assignedto\"\r\n                    (change)=\"assignedto_onChange($event.target)\">\r\n                  </app-useraccess>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Classification' [selected]='false'>\r\n\r\n\r\n              <!--tickettype-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('tickettype') == -1) && (tickettypevisible==undefined || tickettypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"tickettype\" class=\"control-label\">Ticket Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"tickettype\" (change)=\"tickettype_onChange($event.target)\"\r\n                    formControlName=\"tickettype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of tickettype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.tickettypedesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--priority-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('priority') == -1) && (priorityvisible==undefined || priorityvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"priority\" class=\"control-label\">Priority</label>\r\n                  <select *ngIf=\"!showview\" id=\"priority\" (change)=\"priority_onChange($event.target)\"\r\n                    formControlName=\"priority\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of priority_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.prioritydesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--criticality-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('criticality') == -1) && (criticalityvisible==undefined || criticalityvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"criticality\" class=\"control-label\">Criticality</label>\r\n                  <select *ngIf=\"!showview\" id=\"criticality\" (change)=\"criticality_onChange($event.target)\"\r\n                    formControlName=\"criticality\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of criticality_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.criticalitydesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--impact-->\r\n\r\n                <div *ngIf=\"((hidelist.indexOf('impact') == -1) && (impactvisible==undefined || impactvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"impact\" class=\"control-label\">Impact</label>\r\n                  <select *ngIf=\"!showview\" id=\"impact\" (change)=\"impact_onChange($event.target)\"\r\n                    formControlName=\"impact\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of impact_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.impactdesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--risk-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('risk') == -1) && (riskvisible==undefined || riskvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"risk\" class=\"control-label\">Risk</label>\r\n                  <select *ngIf=\"!showview\" id=\"risk\" (change)=\"risk_onChange($event.target)\" formControlName=\"risk\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of risk_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.riskdesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--sla-->\r\n\r\n                <div *ngIf=\"((hidelist.indexOf('sla') == -1) && (slavisible==undefined || slavisible==true))\" style=''\r\n                  class=\"col-3\"><label for=\"sla\" class=\"control-label\" (click)=\"AddOrEdit_sla(null)\">S L A</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"sla_List\" [optionsEvent]=\"sla_optionsEvent\"\r\n                    [form]=\"hlpservicelevel\" (selectItem)=\"onSelected_sla($event)\" [reportid]='leve' [menuid]='leve'\r\n                    formControlName=\"sla\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.sladesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('slabreached') == -1) && (slabreachedvisible==undefined || slabreachedvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"slabreached\" class=\"control-label\">S L A Breached</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.slabreached?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"slabreached\" formControlName=\"slabreached\"\r\n                      class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <!--source-->\r\n\r\n                <div *ngIf=\"((hidelist.indexOf('source') == -1) && (sourcevisible==undefined || sourcevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"source\" class=\"control-label\">Ticket Source</label>\r\n                  <select *ngIf=\"!showview\" id=\"source\" (change)=\"source_onChange($event.target)\"\r\n                    formControlName=\"source\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of source_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.sourcedesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('ticketreference') == -1) && (ticketreferencevisible==undefined || ticketreferencevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"ticketreference\" class=\"control-label\">Ticket Reference</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.ticketreference?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"ticketreference\" formControlName=\"ticketreference\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--category-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('category') == -1) && (categoryvisible==undefined || categoryvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"category\" class=\"control-label\" (click)=\"AddOrEdit_category(null)\"\r\n                    (click)=\"AddOrEdit_category(null)\">Category</label>\r\n                  <select *ngIf=\"!showview\" id=\"category\" (change)=\"category_onChange($event.target)\"\r\n                    formControlName=\"category\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of category_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.categorydesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--subcategory-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('subcategory') == -1) && (subcategoryvisible==undefined || subcategoryvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"subcategory\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_subcategory(null)\">Sub Category</label>\r\n                  <select *ngIf=\"!showview\" id=\"subcategory\" (change)=\"subcategory_onChange($event.target)\"\r\n                    formControlName=\"subcategory\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of subcategory_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.subcategorydesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('tags') == -1) && (tagsvisible==undefined || tagsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"tags\" class=\"control-label\">Tags</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.tags?.value}}</label>\r\n                  <tag-input *ngIf=\"!showview\" id=\"tags\" formControlName=\"tags\" class=\"form-control\">\r\n                  </tag-input>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Ticket Description' [selected]='1'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('subject') == -1) && (subjectvisible==undefined || subjectvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"subject\" class=\"control-label\">Subject</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.subject?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"subject\"\r\n                    formControlName=\"subject\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('ticketdetails') == -1) && (ticketdetailsvisible==undefined || ticketdetailsvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"ticketdetails\" class=\"control-label\">Ticket Details</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.ticketdetails?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"ticketdetails\"\r\n                    formControlName=\"ticketdetails\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('impacteditems') == -1) && (impacteditemsvisible==undefined || impacteditemsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"impacteditems\" class=\"control-label\">Impacted Items</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.impacteditems?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"impacteditems\" formControlName=\"impacteditems\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('impactedservices') == -1) && (impactedservicesvisible==undefined || impactedservicesvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"impactedservices\" class=\"control-label\">Impacted Services</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.impactedservices?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"impactedservices\" formControlName=\"impactedservices\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('impactedproducts') == -1) && (impactedproductsvisible==undefined || impactedproductsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"impactedproducts\" class=\"control-label\">Impacted Products</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.impactedproducts?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"impactedproducts\" formControlName=\"impactedproducts\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('impactdetails') == -1) && (impactdetailsvisible==undefined || impactdetailsvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"impactdetails\" class=\"control-label\">Impact Details</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.impactdetails?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"impactdetails\"\r\n                    formControlName=\"impactdetails\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('remarks') == -1) && (remarksvisible==undefined || remarksvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"remarks\" class=\"control-label\">Remarks</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.remarks?.value}}</label>\r\n                  <app-comment *ngIf=\"!showview\" id=\"remarks\" formControlName=\"remarks\" [label]=\"'Remarks'\">\r\n                  </app-comment>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Activity' [selected]='true'>\r\n\r\n\r\n              <!--stage-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('stage') == -1) && (stagevisible==undefined || stagevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"stage\" class=\"control-label\">Stage</label>\r\n                  <select *ngIf=\"!showview\" id=\"stage\" (change)=\"stage_onChange($event.target)\" formControlName=\"stage\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of stage_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.stagedesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--completedby-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('completedby') == -1) && (completedbyvisible==undefined || completedbyvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"completedby\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_completedby(null)\">Completed By</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"completedby_List\"\r\n                    [optionsEvent]=\"completedby_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_completedby($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"completedby\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.completedbydesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('linkedtickets') == -1) && (linkedticketsvisible==undefined || linkedticketsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"linkedtickets\" class=\"control-label\">Linked Tickets</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.linkedtickets?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"linkedtickets\" formControlName=\"linkedtickets\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--rca-->\r\n\r\n                <div *ngIf=\"((hidelist.indexOf('rca') == -1) && (rcavisible==undefined || rcavisible==true))\" style=''\r\n                  class=\"col-3\"><label for=\"rca\" class=\"control-label\" (click)=\"AddOrEdit_rca(null)\"\r\n                    (click)=\"AddOrEdit_rca(null)\">R C A</label>\r\n                  <select *ngIf=\"!showview\" id=\"rca\" (change)=\"rca_onChange($event.target)\" formControlName=\"rca\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of rca_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.rcadesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('rcadetails') == -1) && (rcadetailsvisible==undefined || rcadetailsvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"rcadetails\" class=\"control-label\">R C A Details</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.rcadetails?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"rcadetails\"\r\n                    formControlName=\"rcadetails\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--solution-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('solution') == -1) && (solutionvisible==undefined || solutionvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"solution\" class=\"control-label\" (click)=\"AddOrEdit_solution(null)\"\r\n                    (click)=\"AddOrEdit_solution(null)\">Solution</label>\r\n                  <select *ngIf=\"!showview\" id=\"solution\" (change)=\"solution_onChange($event.target)\"\r\n                    formControlName=\"solution\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of solution_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.solutiondesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('solutiondetails') == -1) && (solutiondetailsvisible==undefined || solutiondetailsvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"solutiondetails\" class=\"control-label\">Solution Details</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.solutiondetails?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"solutiondetails\"\r\n                    formControlName=\"solutiondetails\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('solutiongivenon') == -1) && (solutiongivenonvisible==undefined || solutiongivenonvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"solutiongivenon\" class=\"control-label\">Solution Given On</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.solutiongivenon?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #solutiongivenonformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"solutiongivenonformpicker\"\r\n                      id=\"solutiongivenon\" formControlName=\"solutiongivenon\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"solutiongivenonformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('startdate') == -1) && (startdatevisible==undefined || startdatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"startdate\" class=\"control-label\">Start Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.startdate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #startdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"startdateformpicker\"\r\n                      id=\"startdate\" formControlName=\"startdate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"startdateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('completeddate') == -1) && (completeddatevisible==undefined || completeddatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"completeddate\" class=\"control-label\">Completed Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.completeddate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #completeddateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"completeddateformpicker\"\r\n                      id=\"completeddate\" formControlName=\"completeddate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"completeddateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('lessonslearned') == -1) && (lessonslearnedvisible==undefined || lessonslearnedvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"lessonslearned\" class=\"control-label\">Lessons Learned</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.lessonslearned?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"lessonslearned\"\r\n                    formControlName=\"lessonslearned\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('history') == -1) && (historyvisible==undefined || historyvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"history\" class=\"control-label\">History</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.history?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"history\"\r\n                    formControlName=\"history\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\"><i title=\"Details\" class=\"fa fa-sitemap\"><br>\r\n              <font style='font-size: 1rem;'>Details</font>\r\n            </i></div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table hlpticketdetails-->\r\n            <div [ngClass]=\"Is_hlpticketdetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Details' | translate}}\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"hlpticketdetailtoggleOption();hlpticketdetails_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"hlpticketdetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_hlpticketdetails (userRowSelect)=\"handle_hlpticketdetails_GridSelected($event)\"\r\n                [settings]=\"hlpticketdetails_settings\" (custom)=\"onCustom_hlpticketdetails_Action($event)\"\r\n                [source]=\"tbl_hlpticketdetails?.source?.data\" (delete)=\"hlpticketdetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"hlpticketdetails_route($event,'delete')\"\r\n                (create)=\"hlpticketdetails_route($event,'create')\" (createConfirm)=\"hlpticketdetails_beforesave($event)\"\r\n                (edit)=\"hlpticketdetails_route($event,'edit')\" (editConfirm)=\"hlpticketdetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table hlpticketdetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Planned Actions</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table hlpplannedactions-->\r\n            <div [ngClass]=\"Is_hlpplannedactions_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Planned Actions' | translate}}\r\n                <select class='child' id=\"hlpplannedactionsPagingdropdown\"\r\n                  (change)=\"hlpplannedactions_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"hlpplannedactiontoggleOption();hlpplannedactions_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showhlpplannedactionsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"hlpplannedactions_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_hlpplannedactions (userRowSelect)=\"handle_hlpplannedactions_GridSelected($event)\"\r\n                [settings]=\"hlpplannedactions_settings\" (custom)=\"onCustom_hlpplannedactions_Action($event)\"\r\n                [source]=\"tbl_hlpplannedactions?.source?.data\" (delete)=\"hlpplannedactions_route($event,'delete')\"\r\n                (deleteConfirm)=\"hlpplannedactions_route($event,'delete')\"\r\n                (create)=\"hlpplannedactions_route($event,'create')\"\r\n                (createConfirm)=\"hlpplannedactions_beforesave($event)\" (edit)=\"hlpplannedactions_route($event,'edit')\"\r\n                (editConfirm)=\"hlpplannedactions_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table hlpplannedactions-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 66767:
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-help-desk-app/src/app/pages/forms/hlpticketdetail/hlpticketdetail.component.html ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourcekey\" (click)=\"nav.back()\"></i>\r\n<form  [formGroup]=\"hlpticketdetailForm\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\" >\r\n<div class=\"row second\"  >\r\n<h1  class=\"col-4 columns mainheader left\"><a href='#/home/{{pcurrenturl}}'>{{'Details' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n<li><a class='nav-link active' [routerLink]=''  *ngIf='showview'  (click)=\"edithlpticketdetails()\"><i class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect  [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li  *ngIf='!showview' class='nav-item dropdown  actionheader'>\r\n            <a class='nav-link dropdown-toggle btn-success' (click)='hlpticketdetailtoggleOption()' data-toggle='dropdown'\r\n              [routerLink]='' role='button' aria-haspopup='true' aria-expanded='false'>Actions</a>\r\n\r\n            <div class='dropdown-menu' style='display:block' *ngIf='this.hlpticketdetailshowOption'>\r\n              <div class='dropdown-divider'></div>\r\n\r\n              <a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i class='fa fa-plus'\r\n                  aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a>\r\n              <a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                  aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a>\r\n              <a class='dropdown-item'  [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                  aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a>\r\n\r\n              <div class='dropdown-divider'></div>\r\n\r\n              <a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                  aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a>\r\n              <a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                  aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a>\r\n              <a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                  aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a>\r\n              <a class='dropdown-item' [routerLink]='' ><i class='fa fa-envelope'\r\n                  aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a>\r\n\r\n\r\n            </div>\r\n          </li>\r\n<li class='nav-item actionheader'   *ngIf=\"!showview\">\r\n    <a class=\"nav-link active\" [routerLink]=''  (click)=\"onSubmitAndWait()\"  ><i class=\"fa fa-database\"></i> Submit</a>\r\n    <a class=\"nav-link active\"  [routerLink]='' (click)=\"onSubmit()\" ><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n<app-action *ngIf=\"f.ticketdetailid.value != null\"  (afteraction)=\"afteraction($event)\"   [menuid]=\"pmenuid\" [value]=\"f.ticketdetailid.value\"  [status]=\"f.status.value\"></app-action>\r\n    <a class=\"nav-link active\"  [routerLink]=''  (click)=\"onClose()\"  *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\"  ><i class=\"fa fa-close\"></i> Close</a>\r\n  </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n</div>\r\n<div class=\"container\"     id=\"contentArea1\"  >\r\n<div class=\"w-5\" *ngIf=\"showformtype=='1'\" style=\"margin-top:10px!important\">\r\n<div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n</div>\r\n  <div  *ngIf=\"(viewhtml != '' && showview)\" innerHTML='{{getHtml(viewhtml)}}' >\r\n    \r\n  </div>\r\n\r\n\r\n<!--ticketid-->\r\n\r\n<div   *ngIf=\"(viewhtml == '' || !showview)\" class=\"form-group row\" >\r\n  <div   *ngIf=\"hidelist.indexOf('ticketid') == -1\"  class=\"col\" ><label  for=\"ticketid\" class=\"control-label\" (click)=\"AddOrEditticketid(null)\">Ticket</label>\r\n<app-popupselect  *ngIf=\"!showview\"  [options]=\"ticketidList\"  [optionsEvent]=\"ticketidoptionsEvent\" [form]=\"hlpticket\" (selectItem)=\"onSelectedticketid($event)\"  [reportid]= 'ipad7' [menuid]='ipad7' formControlName=\"ticketid\" id=\"ticketid\" desc=\"subject\" ></app-popupselect>\r\n<div class=\"input-group\">\r\n</div>\r\n      <label *ngIf=\"showview\"     class=\"labelview\">{{f.ticketid?.value}}</label>\r\n  </div>\r\n<div class=\"col\"></div>\r\n<div class=\"col\"></div>\r\n<div class=\"col\"></div>\r\n</div>\r\n<div  *ngIf=\"(viewhtml == '' || !showview)\" class=\"form-group row\" >\r\n  <div   *ngIf=\"hidelist.indexOf('assignedto') == -1\"  class=\"col \" >\r\n<label  for=\"assignedto\" class=\"control-label\">Assigned To</label>\r\n      <label *ngIf=\"showview\"     class=\"labelview\">{{f.assignedto?.value}}</label>\r\n      <app-useraccess   *ngIf=\"!showview\"  id=\"assignedto\"  formControlName=\"assignedto\"\r\n        >\r\n</app-useraccess>\r\n  </div>\r\n</div>\r\n\r\n\r\n<!--actionuser-->\r\n\r\n<div   *ngIf=\"(viewhtml == '' || !showview)\" class=\"form-group row\" >\r\n  <div   *ngIf=\"hidelist.indexOf('actionuser') == -1\"  class=\"col\" ><label  for=\"actionuser\" class=\"control-label\" (click)=\"AddOrEditactionuser(null)\">Action User</label>\r\n<app-popupselect  *ngIf=\"!showview\"  [options]=\"actionuserList\"  [optionsEvent]=\"actionuseroptionsEvent\" [form]=\"bousermaster\" (selectItem)=\"onSelectedactionuser($event)\"  [reportid]= 'e99kq' [menuid]='e99kq' formControlName=\"actionuser\" id=\"userid\" desc=\"username\" ></app-popupselect>\r\n<div class=\"input-group\">\r\n</div>\r\n      <label *ngIf=\"showview\"     class=\"labelview\">{{f.actionuser?.value}}</label>\r\n  </div>\r\n  <div   *ngIf=\"hidelist.indexOf('assigneddate') == -1\"  class=\"col \" >\r\n<label  for=\"assigneddate\" class=\"control-label\">Assigned Date</label>\r\n      <label *ngIf=\"showview\"   class=\"labelview\">{{ngbDateParserFormatter.format(f.assigneddate?.value)}}</label>\r\n<div class=\"input-group\" *ngIf=\"!showview\" >\r\n<input #assigneddateformpicker=\"ngbDatepicker\"      ngbDatepicker name=\"assigneddateformpicker\" id=\"assigneddate\"  formControlName=\"assigneddate\"  class=\"form-control\"   >\r\n<button class=\"input-group-addon\"  *ngIf=\"!showview\"  (click)=\"assigneddateformpicker.toggle()\" type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n</div>\r\n  </div>\r\n  <div   *ngIf=\"hidelist.indexOf('actiondate') == -1\"  class=\"col \" >\r\n<label  for=\"actiondate\" class=\"control-label\">Action Date</label>\r\n      <label *ngIf=\"showview\"   class=\"labelview\">{{ngbDateParserFormatter.format(f.actiondate?.value)}}</label>\r\n<div class=\"input-group\" *ngIf=\"!showview\" >\r\n<input #actiondateformpicker=\"ngbDatepicker\"      ngbDatepicker name=\"actiondateformpicker\" id=\"actiondate\"  formControlName=\"actiondate\"  class=\"form-control\"   >\r\n<button class=\"input-group-addon\"  *ngIf=\"!showview\"  (click)=\"actiondateformpicker.toggle()\" type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n</div>\r\n  </div>\r\n  <div   *ngIf=\"hidelist.indexOf('tatends') == -1\"  class=\"col \" >\r\n<label  for=\"tatends\" class=\"control-label\">T A T Ends</label>\r\n      <label *ngIf=\"showview\"   class=\"labelview\">{{ngbDateParserFormatter.format(f.tatends?.value)}}</label>\r\n<div class=\"input-group\" *ngIf=\"!showview\" >\r\n<input #tatendsformpicker=\"ngbDatepicker\"      ngbDatepicker name=\"tatendsformpicker\" id=\"tatends\"  formControlName=\"tatends\"  class=\"form-control\"   >\r\n<button class=\"input-group-addon\"  *ngIf=\"!showview\"  (click)=\"tatendsformpicker.toggle()\" type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n</div>\r\n  </div>\r\n</div>\r\n<div  *ngIf=\"(viewhtml == '' || !showview)\" class=\"form-group row\" >\r\n  <div   *ngIf=\"hidelist.indexOf('actionremarks') == -1\"  class=\"col \" >\r\n<label  for=\"actionremarks\" class=\"control-label\">Action Remarks</label>\r\n      <label *ngIf=\"showview\"     class=\"labelview\">{{f.actionremarks?.value}}</label>\r\n      <textarea  autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\"  *ngIf=\"!showview\"  id=\"actionremarks\"  formControlName=\"actionremarks\" class=\"form-control\"\r\n        >\r\n</textarea>\r\n  </div>\r\n</div>\r\n<div  class='full-width'  *ngIf=\"customfieldvisible  && customfieldservicelist!=null && customfieldservicelist!=undefined  && customfieldservicelist.fields.length>0\">\r\n<p-accordion [multiple]='true'>\r\n<p-accordionTab header='CustomField'  [selected]='false'>\r\n<div class=\"sticky\" *ngIf=\"customfieldservicelist!=null && customfieldservicelist!=undefined   &&(customfieldservicelist.formhtml!=null || customfieldservicelist.templatehtml!=null || (customfieldservicelist.fields!=[] && customfieldservicelist.fields.length>0))\" >Custom Fields</div>\r\n<div  class=\"form-group row\" *ngIf=\"customfieldservicelist!=null && customfieldservicelist!=undefined   &&(customfieldservicelist.formhtml!=null || customfieldservicelist.templatehtml!=null || (customfieldservicelist.fields!=[] && customfieldservicelist.fields.length>0))\">\r\n<dynamic-form-builder [customfields]=\"customfieldservicelist\" #customform></dynamic-form-builder>\r\n</div>\r\n</p-accordionTab>\r\n</p-accordion>\r\n</div>\r\n<div  class='full-width'  *ngIf=\"attachmentvisible\">\r\n<p-accordion [multiple]='true'>\r\n<p-accordionTab header='Attachment'  [selected]='false'>\r\n<app-attachment #fileattachment  isAttachment=true  formControlName=\"attachment\" [SessionData]=\"sessiondata\"></app-attachment>\r\n</p-accordionTab>\r\n</p-accordion>\r\n</div>\r\n  </div>\r\n</form>\r\n");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_hlpticket_hlpticket_module_ts.js.map