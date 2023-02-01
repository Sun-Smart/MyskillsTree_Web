"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_bomenuaction_bomenuaction_component_ts"],{

/***/ 21189:
/*!********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bomenuaction/bomenuaction.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bomenuactionComponent": () => (/* binding */ bomenuactionComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bomenuaction_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bomenuaction.component.html */ 60060);
/* harmony import */ var _service_bomenuaction_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bomenuaction.service */ 46407);
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

let bomenuactionComponent = class bomenuactionComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bomenuaction_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bomenuaction_service = bomenuaction_service;
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
        this.bfilterPopulate_bomenuactions = false;
        this.bomenuaction_menuactions = [];
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
        this.bomenuaction_Form = this.fb.group({
            pk: [null],
            actionid: [null],
            menuid: [null],
            description: [null],
            rowselecttype: [null],
            rowselecttypedesc: [null],
            actionicon: [null],
            actiontype: [null],
            actiontypedesc: [null],
            servicename: [null],
            actionname: [null],
            actioncondition: [null],
            actionbutton: [null],
            actionbuttonlocation: [null],
            actionhelp: [null],
            actionrequestorfield: [null],
            actionassigneduserfield: [null],
            notificationtext: [null],
            actionrequestoremailfield: [null],
            actionassigneduseremailfield: [null],
            actionstatus: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bomenuaction_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bomenuaction_Form.dirty && this.bomenuaction_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.actionid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.actionid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.actionid && pkDetail) {
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
            let bomenuactionid = null;
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
            this.formid = bomenuactionid;
            //alert(bomenuactionid);
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
            this.bomenuaction_service.getDefaultData().then(res => {
                this.rowselecttype_List = res.list_rowselecttype.value;
                this.actiontype_List = res.list_actiontype.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bomenuaction_service.get_bomenuactions_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bomenuaction_Form.markAsUntouched();
            this.bomenuaction_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.bomenuaction_Form != null)
            this.bomenuaction_Form.reset();
        this.bomenuaction_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let actionid = this.bomenuaction_Form.get('actionid').value;
        if (actionid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bomenuaction_service.delete_bomenuaction(actionid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bomenuaction_Form.patchValue({
            actionid: null
        });
        if (this.formData.actionid != null)
            this.formData.actionid = null;
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
                        this.bomenuaction_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bomenuaction_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bomenuaction_Form.controls[key] != undefined) {
                                this.bomenuaction_Form.controls[key].disable({ onlySelf: true });
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
    rowselecttype_onChange(evt) {
        let e = this.f.rowselecttype.value;
        this.bomenuaction_Form.patchValue({ rowselecttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    actiontype_onChange(evt) {
        let e = this.f.actiontype.value;
        this.bomenuaction_Form.patchValue({ actiontypedesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_bomenuactions() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bomenuaction_service.get_bomenuactions_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bomenuaction;
                let formproperty = res.bomenuaction.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bomenuaction.pkcol;
                this.formid = res.bomenuaction.actionid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bomenuaction;
        this.formid = res.bomenuaction.actionid;
        this.pkcol = res.bomenuaction.pkcol;
        this.bmyrecord = false;
        if (res.bomenuaction.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bomenuaction_Form.patchValue({
            actionid: res.bomenuaction.actionid,
            menuid: res.bomenuaction.menuid,
            description: res.bomenuaction.description,
            rowselecttype: res.bomenuaction.rowselecttype,
            rowselecttypedesc: res.bomenuaction.rowselecttypedesc,
            actionicon: res.bomenuaction.actionicon,
            actiontype: res.bomenuaction.actiontype,
            actiontypedesc: res.bomenuaction.actiontypedesc,
            servicename: res.bomenuaction.servicename,
            actionname: res.bomenuaction.actionname,
            actioncondition: res.bomenuaction.actioncondition,
            actionbutton: res.bomenuaction.actionbutton,
            actionbuttonlocation: res.bomenuaction.actionbuttonlocation,
            actionhelp: res.bomenuaction.actionhelp,
            actionrequestorfield: res.bomenuaction.actionrequestorfield,
            actionassigneduserfield: res.bomenuaction.actionassigneduserfield,
            notificationtext: res.bomenuaction.notificationtext,
            actionrequestoremailfield: res.bomenuaction.actionrequestoremailfield,
            actionassigneduseremailfield: res.bomenuaction.actionassigneduseremailfield,
            actionstatus: res.bomenuaction.actionstatus,
            status: res.bomenuaction.status,
            statusdesc: res.bomenuaction.statusdesc,
        });
        this.bomenuaction_menuactions = res.bomenuaction_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bomenuaction_Form.controls) {
            let val = this.bomenuaction_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bomenuaction_Form.controls[key] != null) {
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
            if (!this.bomenuaction_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bomenuaction_Form.getRawValue();
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
            // Object.keys(this.bomenuaction_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bomenuaction_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bomenuaction_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bomenuaction_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bomenuaction_Form.controls[key] != null) {
                            this.formData[key] = this.bomenuaction_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.bomenuaction_service.saveOrUpdate_bomenuactions(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bomenuaction);
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
                        this.objvalues.push(res.bomenuaction);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bomenuaction_Form.markAsUntouched();
                this.bomenuaction_Form.markAsPristine();
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
bomenuactionComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_bomenuaction_service__WEBPACK_IMPORTED_MODULE_1__.bomenuactionService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
bomenuactionComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-bomenuaction',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bomenuaction_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], bomenuactionComponent);



/***/ }),

/***/ 60060:
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bomenuaction/bomenuaction.component.html ***!
  \*************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bomenuaction_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Menu Actions' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bomenuactions()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bomenuaction_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.actionid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.actionid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('menuid') == -1) && (menuidvisible==undefined || menuidvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"menuid\" class=\"control-label\">Menu</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.menuid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"menuid\" formControlName=\"menuid\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('description') == -1) && (descriptionvisible==undefined || descriptionvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"description\" class=\"control-label\">Description</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.description?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"description\" formControlName=\"description\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--rowselecttype-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('rowselecttype') == -1) && (rowselecttypevisible==undefined || rowselecttypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"rowselecttype\" class=\"control-label\">Row Select Type</label>\r\n        <select *ngIf=\"!showview\" id=\"rowselecttype\" (change)=\"rowselecttype_onChange($event.target)\"\r\n          formControlName=\"rowselecttype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of rowselecttype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.rowselecttypedesc?.value}}</label>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('actionicon') == -1) && (actioniconvisible==undefined || actioniconvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actionicon\" class=\"control-label\">Action Icon</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actionicon?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"actionicon\" formControlName=\"actionicon\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--actiontype-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('actiontype') == -1) && (actiontypevisible==undefined || actiontypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"actiontype\" class=\"control-label\">Action Type</label>\r\n        <select *ngIf=\"!showview\" id=\"actiontype\" (change)=\"actiontype_onChange($event.target)\"\r\n          formControlName=\"actiontype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of actiontype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actiontypedesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('servicename') == -1) && (servicenamevisible==undefined || servicenamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"servicename\" class=\"control-label\">Service Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.servicename?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"servicename\" formControlName=\"servicename\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('actionname') == -1) && (actionnamevisible==undefined || actionnamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actionname\" class=\"control-label\">Action Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actionname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"actionname\" formControlName=\"actionname\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('actioncondition') == -1) && (actionconditionvisible==undefined || actionconditionvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actioncondition\" class=\"control-label\">Action Condition</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actioncondition?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"actioncondition\" formControlName=\"actioncondition\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('actionbutton') == -1) && (actionbuttonvisible==undefined || actionbuttonvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"actionbutton\" class=\"control-label\">Action Button</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.actionbutton?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"actionbutton\" formControlName=\"actionbutton\"\r\n            class=\"form-control\">\r\n        </div>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('actionbuttonlocation') == -1) && (actionbuttonlocationvisible==undefined || actionbuttonlocationvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actionbuttonlocation\" class=\"control-label\">Action Button Location</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actionbuttonlocation?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"actionbuttonlocation\" formControlName=\"actionbuttonlocation\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('actionhelp') == -1) && (actionhelpvisible==undefined || actionhelpvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"actionhelp\" class=\"control-label\">Action Help</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actionhelp?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"actionhelp\"\r\n          formControlName=\"actionhelp\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('actionrequestorfield') == -1) && (actionrequestorfieldvisible==undefined || actionrequestorfieldvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actionrequestorfield\" class=\"control-label\">Action Requestor Field</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actionrequestorfield?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"actionrequestorfield\" formControlName=\"actionrequestorfield\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('actionassigneduserfield') == -1) && (actionassigneduserfieldvisible==undefined || actionassigneduserfieldvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actionassigneduserfield\" class=\"control-label\">Action Assigned User Field</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actionassigneduserfield?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"actionassigneduserfield\" formControlName=\"actionassigneduserfield\"\r\n          class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('notificationtext') == -1) && (notificationtextvisible==undefined || notificationtextvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"notificationtext\" class=\"control-label\">Notification Text</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.notificationtext?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"notificationtext\"\r\n          formControlName=\"notificationtext\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('actionrequestoremailfield') == -1) && (actionrequestoremailfieldvisible==undefined || actionrequestoremailfieldvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actionrequestoremailfield\" class=\"control-label\">Action Requestor Email Field</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actionrequestoremailfield?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"actionrequestoremailfield\" formControlName=\"actionrequestoremailfield\"\r\n          class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('actionassigneduseremailfield') == -1) && (actionassigneduseremailfieldvisible==undefined || actionassigneduseremailfieldvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actionassigneduseremailfield\" class=\"control-label\">Action Assigned User Email Field</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actionassigneduseremailfield?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"actionassigneduseremailfield\" formControlName=\"actionassigneduseremailfield\"\r\n          class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('actionstatus') == -1) && (actionstatusvisible==undefined || actionstatusvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actionstatus\" class=\"control-label\">Action Status</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.actionstatus?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"actionstatus\" formControlName=\"actionstatus\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_bomenuaction_bomenuaction_component_ts.js.map