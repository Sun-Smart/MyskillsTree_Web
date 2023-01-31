"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_lmsassign_lmsassign_module_ts"],{

/***/ 6523:
/*!**************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsassign/lmsassign.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsassignComponent": () => (/* binding */ lmsassignComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsassign_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmsassign.component.html */ 35796);
/* harmony import */ var _service_lmsassign_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmsassign.service */ 54591);
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

let lmsassignComponent = class lmsassignComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmsassign_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmsassign_service = lmsassign_service;
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
        this.bfilterPopulate_lmsassigns = false;
        this.lmsassign_menuactions = [];
        this.assignuser_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete
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
        this.lmsassign_Form = this.fb.group({
            pk: [null],
            productgroupid: [null],
            productgroupiddesc: [null],
            productid: [null],
            productiddesc: [null],
            source: [null],
            sourcedesc: [null],
            assigntype: [null],
            assigntypedesc: [null],
            assignuser: [null],
            assignuserdesc: [null],
            assignrole: [null],
            assignroledesc: [null],
            assignid: [null],
            skillratefrom: [null],
            skillrateto: [null],
            certified: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmsassign_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmsassign_Form.dirty && this.lmsassign_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.assignid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.assignid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.assignid && pkDetail) {
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
            let lmsassignid = null;
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
            this.formid = lmsassignid;
            //alert(lmsassignid);
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
            this.lmsassign_service.getDefaultData().then(res => {
                this.productgroupid_List = res.list_productgroupid.value;
                this.productid_List = res.list_productid.value;
                this.source_List = res.list_source.value;
                this.assigntype_List = res.list_assigntype.value;
                this.assignuser_List = res.list_assignuser.value;
                this.assignrole_List = res.list_assignrole.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmsassign_service.get_lmsassigns_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmsassign_Form.markAsUntouched();
            this.lmsassign_Form.markAsPristine();
        });
    }
    onSelected_assignuser(assignuserDetail) {
        if (assignuserDetail.value && assignuserDetail) {
            this.lmsassign_Form.patchValue({
                assignuser: assignuserDetail.value,
                assignuserdesc: assignuserDetail.label,
            });
        }
    }
    resetForm() {
        if (this.lmsassign_Form != null)
            this.lmsassign_Form.reset();
        this.lmsassign_Form.patchValue({
            assignuser: this.sessionData.userid,
            assignuserdesc: this.sessionData.username,
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let assignid = this.lmsassign_Form.get('assignid').value;
        if (assignid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmsassign_service.delete_lmsassign(assignid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmsassign_Form.patchValue({
            assignid: null
        });
        if (this.formData.assignid != null)
            this.formData.assignid = null;
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
                        this.lmsassign_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmsassign_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmsassign_Form.controls[key] != undefined) {
                                this.lmsassign_Form.controls[key].disable({ onlySelf: true });
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
    productgroupid_onChange(evt) {
        let e = evt.value;
        this.lmsassign_Form.patchValue({ productgroupiddesc: evt.options[evt.options.selectedIndex].text });
    }
    productid_onChange(evt) {
        let e = evt.value;
        this.lmsassign_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
    }
    source_onChange(evt) {
        let e = this.f.source.value;
        this.lmsassign_Form.patchValue({ sourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    assigntype_onChange(evt) {
        let e = this.f.assigntype.value;
        this.lmsassign_Form.patchValue({ assigntypedesc: evt.options[evt.options.selectedIndex].text });
    }
    assignuser_onChange(evt) {
        let e = evt.value;
    }
    assignrole_onChange(evt) {
        let e = evt.value;
        this.lmsassign_Form.patchValue({ assignroledesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_lmsassigns() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmsassign_service.get_lmsassigns_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmsassign;
                let formproperty = res.lmsassign.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmsassign.pkcol;
                this.formid = res.lmsassign.assignid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmsassign;
        this.formid = res.lmsassign.assignid;
        this.pkcol = res.lmsassign.pkcol;
        this.bmyrecord = false;
        if (res.lmsassign.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmsassign_Form.patchValue({
            productgroupid: res.lmsassign.productgroupid,
            productgroupiddesc: res.lmsassign.productgroupiddesc,
            productid: res.lmsassign.productid,
            productiddesc: res.lmsassign.productiddesc,
            source: res.lmsassign.source,
            sourcedesc: res.lmsassign.sourcedesc,
            assigntype: res.lmsassign.assigntype,
            assigntypedesc: res.lmsassign.assigntypedesc,
            assignuser: res.lmsassign.assignuser,
            assignuserdesc: res.lmsassign.assignuserdesc,
            assignrole: res.lmsassign.assignrole,
            assignroledesc: res.lmsassign.assignroledesc,
            assignid: res.lmsassign.assignid,
            skillratefrom: res.lmsassign.skillratefrom,
            skillrateto: res.lmsassign.skillrateto,
            certified: res.lmsassign.certified,
            status: res.lmsassign.status,
            statusdesc: res.lmsassign.statusdesc,
        });
        this.lmsassign_menuactions = res.lmsassign_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmsassign_Form.controls) {
            let val = this.lmsassign_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmsassign_Form.controls[key] != null) {
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
            if (!this.lmsassign_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.lmsassign_Form.getRawValue();
            console.log(obj);
            if (!confirm('Do you want to want to save?')) {
                return;
            }
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
            // Object.keys(this.lmsassign_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.lmsassign_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmsassign_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmsassign_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmsassign_Form.controls[key] != null) {
                            this.formData[key] = this.lmsassign_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.lmsassign_service.saveOrUpdate_lmsassigns(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmsassign);
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
                        this.objvalues.push(res.lmsassign);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsassign_Form.markAsUntouched();
                this.lmsassign_Form.markAsPristine();
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
lmsassignComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_lmsassign_service__WEBPACK_IMPORTED_MODULE_1__.lmsassignService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
lmsassignComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-lmsassign',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsassign_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], lmsassignComponent);



/***/ }),

/***/ 7526:
/*!***********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsassign/lmsassign.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsassignModule": () => (/* binding */ lmsassignModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _lmsassign_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lmsassign.routing */ 12756);
/* harmony import */ var _lmsassign_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmsassign.component */ 6523);






let lmsassignModule = class lmsassignModule {
};
lmsassignModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _lmsassign_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_lmsassign_component__WEBPACK_IMPORTED_MODULE_3__.lmsassignComponent]
    })
], lmsassignModule);



/***/ }),

/***/ 12756:
/*!************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsassign/lmsassign.routing.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _lmsassign_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lmsassign.component */ 6523);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'lmsassigns', children: [
            { path: '', component: _lmsassign_component__WEBPACK_IMPORTED_MODULE_0__.lmsassignComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _lmsassign_component__WEBPACK_IMPORTED_MODULE_0__.lmsassignComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _lmsassign_component__WEBPACK_IMPORTED_MODULE_0__.lmsassignComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _lmsassign_component__WEBPACK_IMPORTED_MODULE_0__.lmsassignComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 54591:
/*!**********************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmsassign.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsassignService": () => (/* binding */ lmsassignService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmsassignService = class lmsassignService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmsassigns(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsassign', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsassign' + '/getdefaultdata').toPromise();
        }
    }
    get_lmsassigns_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsassign').toPromise();
        }
    }
    getListBy_assignid(assignid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsassign' + '/assignid/' + assignid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsassign' + '/param/' + key).toPromise();
        }
    }
    get_lmsassigns_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsassign' + '/e/' + id).toPromise();
        }
    }
    get_lmsassigns_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsassign' + '/' + id).toPromise();
        }
    }
    delete_lmsassign(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsassign' + '/' + id).toPromise();
        }
    }
    getList_productgroupid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsassign' + '/getList_productgroupid/').toPromise();
    }
    getList_productid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsassign' + '/getList_productid').toPromise();
    }
    getList_source() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsassign' + '/getList_source/').toPromise();
    }
    getList_assigntype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsassign' + '/getList_assigntype/').toPromise();
    }
    getList_assignuser() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsassign' + '/getList_assignuser').toPromise();
    }
    getList_assignrole() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsassign' + '/getList_assignrole').toPromise();
    }
};
lmsassignService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmsassignService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmsassignService);



/***/ }),

/***/ 35796:
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmsassign/lmsassign.component.html ***!
  \*******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmsassign_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Assign' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmsassigns()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmsassign_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.assignid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.assignid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n\r\n\r\n    <!--productgroupid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('productgroupid') == -1) && (productgroupidvisible==undefined || productgroupidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"productgroupid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_productgroupid(null)\" (click)=\"AddOrEdit_productgroupid(null)\">Product Group</label>\r\n        <select *ngIf=\"!showview\" id=\"productgroupid\" (change)=\"productgroupid_onChange($event.target)\"\r\n          formControlName=\"productgroupid\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of productgroupid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.productgroupiddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--productid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('productid') == -1) && (productidvisible==undefined || productidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"productid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_productid(null)\">Product</label>\r\n        <select *ngIf=\"!showview\" id=\"productid\" (change)=\"productid_onChange($event.target)\"\r\n          formControlName=\"productid\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of productid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.productiddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--source-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('source') == -1) && (sourcevisible==undefined || sourcevisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"source\" class=\"control-label\">Source</label>\r\n        <select *ngIf=\"!showview\" id=\"source\" (change)=\"source_onChange($event.target)\" formControlName=\"source\"\r\n          class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of source_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.sourcedesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--assigntype-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('assigntype') == -1) && (assigntypevisible==undefined || assigntypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"assigntype\" class=\"control-label\">Assign Type</label>\r\n        <select *ngIf=\"!showview\" id=\"assigntype\" (change)=\"assigntype_onChange($event.target)\"\r\n          formControlName=\"assigntype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of assigntype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.assigntypedesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--assignuser-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('assignuser') == -1) && (assignuservisible==undefined || assignuservisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"assignuser\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_assignuser(null)\">User</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"assignuser_List\" [optionsEvent]=\"assignuser_optionsEvent\"\r\n          [form]=\"bousermaster\" (selectItem)=\"onSelected_assignuser($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n          formControlName=\"assignuser\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.assignuserdesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--assignrole-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('assignrole') == -1) && (assignrolevisible==undefined || assignrolevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"assignrole\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_assignrole(null)\">Role</label>\r\n        <select *ngIf=\"!showview\" id=\"assignrole\" (change)=\"assignrole_onChange($event.target)\"\r\n          formControlName=\"assignrole\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of assignrole_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.assignroledesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('skillratefrom') == -1) && (skillratefromvisible==undefined || skillratefromvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"skillratefrom\" class=\"control-label\">Skill Ratefrom</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.skillratefrom?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"skillratefrom\" formControlName=\"skillratefrom\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('skillrateto') == -1) && (skillratetovisible==undefined || skillratetovisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"skillrateto\" class=\"control-label\">Skill Rate To</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.skillrateto?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"skillrateto\" formControlName=\"skillrateto\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('certified') == -1) && (certifiedvisible==undefined || certifiedvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"certified\" class=\"control-label\">Certified</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.certified?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"certified\" formControlName=\"certified\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_lmsassign_lmsassign_module_ts.js.map