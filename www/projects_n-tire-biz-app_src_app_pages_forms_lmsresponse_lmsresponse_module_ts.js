"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_lmsresponse_lmsresponse_module_ts"],{

/***/ 63031:
/*!******************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsresponse/lmsresponse.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsresponseComponent": () => (/* binding */ lmsresponseComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsresponse_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmsresponse.component.html */ 68912);
/* harmony import */ var _service_lmsresponse_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmsresponse.service */ 63450);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_lmssubresponse_lmssubresponse_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../pages/forms/lmssubresponse/lmssubresponse.component */ 78006);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions



//Shortcuts

//translator




//primeng services



//session,application constants




//custom fields & attachments

let lmsresponseComponent = class lmsresponseComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmsresponse_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmsresponse_service = lmsresponse_service;
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
        this.bfilterPopulate_lmsresponses = false;
        this.bfilterPopulate_lmssubresponses = false;
        this.lmsresponse_menuactions = [];
        this.lmssubresponse_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_lmssubresponse_IDs = "";
        this.lmssubresponses_ID = "1";
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
        this.lmsresponse_Form = this.fb.group({
            pk: [null],
            responseid: [null],
            productgroupid: [null],
            productgroupiddesc: [null],
            baseresponse: [null],
            baseresponsedesc: [null],
            customresponse: [null],
            counter: [null],
            movetotrash: [null],
            workflowrole: [null],
            workflowroledesc: [null],
            colorcode: [null],
            colorcodedesc: [null],
            tathours: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmsresponse_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmsresponse_Form.dirty && this.lmsresponse_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.responseid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.responseid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.responseid && pkDetail) {
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
            let lmsresponseid = null;
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
            this.formid = lmsresponseid;
            //alert(lmsresponseid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_lmssubresponses_TableConfig();
                setTimeout(() => {
                    //this.Set_lmssubresponses_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.lmsresponse_service.getDefaultData().then(res => {
                this.productgroupid_List = res.list_productgroupid.value;
                this.baseresponse_List = res.list_baseresponse.value;
                this.workflowrole_List = res.list_workflowrole.value;
                this.colorcode_List = res.list_colorcode.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmsresponse_service.get_lmsresponses_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmsresponse_Form.markAsUntouched();
            this.lmsresponse_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.lmsresponse_Form != null)
            this.lmsresponse_Form.reset();
        this.lmsresponse_Form.patchValue({});
        setTimeout(() => {
            this.lmssubresponses_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let responseid = this.lmsresponse_Form.get('responseid').value;
        if (responseid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmsresponse_service.delete_lmsresponse(responseid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmsresponse_Form.patchValue({
            responseid: null
        });
        if (this.formData.responseid != null)
            this.formData.responseid = null;
        for (let i = 0; i < this.tbl_lmssubresponses.source.length; i++) {
            this.tbl_lmssubresponses.source[i].subresponseid = null;
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
                    else if (key == "tathours")
                        this.lmsresponse_Form.patchValue({ "tathours": new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmsresponse_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmsresponse_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmsresponse_Form.controls[key] != undefined) {
                                this.lmsresponse_Form.controls[key].disable({ onlySelf: true });
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
        this.lmsresponse_Form.patchValue({ productgroupiddesc: evt.options[evt.options.selectedIndex].text });
    }
    baseresponse_onChange(evt) {
        let e = this.f.baseresponse.value;
        this.lmsresponse_Form.patchValue({ baseresponsedesc: evt.options[evt.options.selectedIndex].text });
    }
    workflowrole_onChange(evt) {
        let e = evt.value;
        this.lmsresponse_Form.patchValue({ workflowroledesc: evt.options[evt.options.selectedIndex].text });
    }
    colorcode_onChange(evt) {
        let e = this.f.colorcode.value;
        this.lmsresponse_Form.patchValue({ colorcodedesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_lmsresponses() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmsresponse_service.get_lmsresponses_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmsresponse;
                let formproperty = res.lmsresponse.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmsresponse.pkcol;
                this.formid = res.lmsresponse.responseid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmsresponse;
        this.formid = res.lmsresponse.responseid;
        this.pkcol = res.lmsresponse.pkcol;
        this.bmyrecord = false;
        if (res.lmsresponse.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        var tathoursTime = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(res.lmsresponse.tathours);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmsresponse_Form.patchValue({
            responseid: res.lmsresponse.responseid,
            productgroupid: res.lmsresponse.productgroupid,
            productgroupiddesc: res.lmsresponse.productgroupiddesc,
            baseresponse: res.lmsresponse.baseresponse,
            baseresponsedesc: res.lmsresponse.baseresponsedesc,
            customresponse: res.lmsresponse.customresponse,
            counter: res.lmsresponse.counter,
            movetotrash: res.lmsresponse.movetotrash,
            workflowrole: res.lmsresponse.workflowrole,
            workflowroledesc: res.lmsresponse.workflowroledesc,
            colorcode: res.lmsresponse.colorcode,
            colorcodedesc: res.lmsresponse.colorcodedesc,
            tathours: tathoursTime,
            status: res.lmsresponse.status,
            statusdesc: res.lmsresponse.statusdesc,
        });
        this.lmsresponse_menuactions = res.lmsresponse_menuactions;
        this.lmssubresponse_menuactions = res.lmssubresponse_menuactions;
        this.lmssubresponses_visiblelist = res.lmssubresponses_visiblelist;
        //Child Tables if any
        this.Set_lmssubresponses_TableConfig();
        this.lmssubresponses_LoadTable(res.lmssubresponses);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmsresponse_Form.controls) {
            let val = this.lmsresponse_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmsresponse_Form.controls[key] != null) {
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
            if (!this.lmsresponse_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.lmsresponse_Form.getRawValue();
            obj.tathours = (this.lmsresponse_Form.get('tathours').value == null ? 0 : this.lmsresponse_Form.get('tathours').value.hour) + ':' + (this.lmsresponse_Form.get('tathours').value == null ? 0 : this.lmsresponse_Form.get('tathours').value.minute + ":00");
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
        var _a, _b;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.lmsresponse_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.lmsresponse_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmsresponse_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmsresponse_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmsresponse_Form.controls[key] != null) {
                            this.formData[key] = this.lmsresponse_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.tathours = (this.lmsresponse_Form.get('tathours').value == null ? 0 : this.lmsresponse_Form.get('tathours').value.hour) + ':' + (this.lmsresponse_Form.get('tathours').value == null ? 0 : this.lmsresponse_Form.get('tathours').value.minute + ":00");
            this.formData.Deleted_lmssubresponse_IDs = this.Deleted_lmssubresponse_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.lmsresponse_service.saveOrUpdate_lmsresponses(this.formData, (_b = (_a = this.tbl_lmssubresponses) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_lmssubresponses.source) {
                    for (let i = 0; i < this.tbl_lmssubresponses.source.data.length; i++) {
                        if (this.tbl_lmssubresponses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmssubresponses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmsresponse);
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
                        this.objvalues.push(res.lmsresponse);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsresponse_Form.markAsUntouched();
                this.lmsresponse_Form.markAsPristine();
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
        this.tbl_lmssubresponses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource();
    }
    AddOrEdit_lmssubresponse(event, subresponseid, responseid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmssubresponse_lmssubresponse_component__WEBPACK_IMPORTED_MODULE_4__.lmssubresponseComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, subresponseid, responseid, visiblelist: this.lmssubresponses_visiblelist, hidelist: this.lmssubresponses_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmssubresponses.source.add(res[i]);
                    }
                    this.tbl_lmssubresponses.source.refresh();
                }
                else {
                    this.tbl_lmssubresponses.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmssubresponse(event, childID, i) {
        if (childID != null)
            this.Deleted_lmssubresponse_IDs += childID + ",";
        this.tbl_lmssubresponses.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_lmssubresponses_Checkbox() {
        debugger;
        if (this.tbl_lmssubresponses.source.settings['selectMode'] == 'multi')
            this.tbl_lmssubresponses.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmssubresponses.source.settings['selectMode'] = 'multi';
        this.tbl_lmssubresponses.source.initGrid();
    }
    delete_lmssubresponses_All() {
        this.tbl_lmssubresponses.source.settings['selectMode'] = 'single';
    }
    show_lmssubresponses_Filter() {
        setTimeout(() => {
            //  this.Set_lmssubresponses_TableDropDownConfig();
        });
        if (this.tbl_lmssubresponses.source.settings != null)
            this.tbl_lmssubresponses.source.settings['hideSubHeader'] = !this.tbl_lmssubresponses.source.settings['hideSubHeader'];
        this.tbl_lmssubresponses.source.initGrid();
    }
    show_lmssubresponses_InActive() {
    }
    enable_lmssubresponses_InActive() {
    }
    Set_lmssubresponses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmssubresponses) {
            }
            this.bfilterPopulate_lmssubresponses = true;
        });
    }
    lmssubresponses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmssubresponses_TableConfig() {
        this.lmssubresponses_settings = {
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
                custom: this.lmssubresponse_menuactions
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
                productgroupid: {
                    title: 'Product Group',
                    type: 'number',
                    filter: true,
                },
                baseresponse: {
                    title: 'Base Response',
                    type: '',
                    filter: true,
                },
                subresponse: {
                    title: 'Sub Response',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    lmssubresponses_LoadTable(lmssubresponses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmssubresponses_ID) >= 0) {
            if (this.tbl_lmssubresponses != undefined)
                this.tbl_lmssubresponses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource();
            if (this.tbl_lmssubresponses != undefined)
                this.tbl_lmssubresponses.source.load(lmssubresponses);
            if (this.tbl_lmssubresponses != undefined)
                this.tbl_lmssubresponses.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmssubresponses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsresponse_service.lmssubresponses.length == 0)
    {
        this.tbl_lmssubresponses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmssubresponse();
        this.lmsresponse_service.lmssubresponses.push(obj);
        this.tbl_lmssubresponses.source.refresh();
        if ((this.lmsresponse_service.lmssubresponses.length / this.tbl_lmssubresponses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmssubresponses.source.getPaging().page)
        {
            this.tbl_lmssubresponses.source.setPage((this.lmsresponse_service.lmssubresponses.length / this.tbl_lmssubresponses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmssubresponses.source.grid.edit(this.tbl_lmssubresponses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmssubresponses.source.data.indexOf(event.data);
    this.onDelete_lmssubresponse(event,event.data.subresponseid,((this.tbl_lmssubresponses.source.getPaging().page-1) *this.tbl_lmssubresponses.source.getPaging().perPage)+index);
    this.tbl_lmssubresponses.source.refresh();
    break;
    }
    }
    
    */
    lmssubresponses_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmssubresponse(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmssubresponse(event, event.data.subresponseid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmssubresponse(event, event.data.subresponseid, ((this.tbl_lmssubresponses.source.getPaging().page - 1) * this.tbl_lmssubresponses.source.getPaging().perPage) + event.index);
                this.tbl_lmssubresponses.source.refresh();
                break;
        }
    }
    lmssubresponses_onDelete(obj) {
        let subresponseid = obj.data.subresponseid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsresponse_service.delete_lmsresponse(subresponseid).then(res => this.lmssubresponses_LoadTable());
        }
    }
    onCustom_lmssubresponses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmssubresponses");
            let formname = objbomenuaction.actionname;
        });
    }
    lmssubresponses_Paging(val) {
        debugger;
        this.tbl_lmssubresponses.source.setPaging(1, val, true);
    }
    handle_lmssubresponses_GridSelected(event) {
        this.lmssubresponses_selectedindex = this.tbl_lmssubresponses.source.findIndex(i => i.subresponseid === event.data.subresponseid);
    }
    Is_lmssubresponses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmssubresponses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
lmsresponseComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DialogService },
    { type: _service_lmsresponse_service__WEBPACK_IMPORTED_MODULE_1__.lmsresponseService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_21__.NgxSpinnerService }
];
lmsresponseComponent.propDecorators = {
    tbl_lmssubresponses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['tbl_lmssubresponses', { static: false },] }]
};
lmsresponseComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-lmsresponse',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsresponse_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService]
    })
], lmsresponseComponent);



/***/ }),

/***/ 1952:
/*!***************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsresponse/lmsresponse.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsresponseModule": () => (/* binding */ lmsresponseModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _lmsresponse_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lmsresponse.routing */ 27456);
/* harmony import */ var _lmsresponse_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmsresponse.component */ 63031);






let lmsresponseModule = class lmsresponseModule {
};
lmsresponseModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _lmsresponse_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_lmsresponse_component__WEBPACK_IMPORTED_MODULE_3__.lmsresponseComponent]
    })
], lmsresponseModule);



/***/ }),

/***/ 27456:
/*!****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsresponse/lmsresponse.routing.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _lmsresponse_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lmsresponse.component */ 63031);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'lmsresponses', children: [
            { path: '', component: _lmsresponse_component__WEBPACK_IMPORTED_MODULE_0__.lmsresponseComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _lmsresponse_component__WEBPACK_IMPORTED_MODULE_0__.lmsresponseComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _lmsresponse_component__WEBPACK_IMPORTED_MODULE_0__.lmsresponseComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _lmsresponse_component__WEBPACK_IMPORTED_MODULE_0__.lmsresponseComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 63450:
/*!************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmsresponse.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsresponseService": () => (/* binding */ lmsresponseService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmsresponseService = class lmsresponseService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmsresponses(formData, lmssubresponses) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { lmssubresponses: lmssubresponses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsresponse', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsresponse' + '/getdefaultdata').toPromise();
        }
    }
    get_lmsresponses_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsresponse').toPromise();
        }
    }
    getListBy_responseid(responseid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsresponse' + '/responseid/' + responseid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsresponse' + '/param/' + key).toPromise();
        }
    }
    get_lmsresponses_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsresponse' + '/e/' + id).toPromise();
        }
    }
    get_lmsresponses_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsresponse' + '/' + id).toPromise();
        }
    }
    delete_lmsresponse(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsresponse' + '/' + id).toPromise();
        }
    }
    getList_productgroupid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsresponse' + '/getList_productgroupid/').toPromise();
    }
    getList_baseresponse() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsresponse' + '/getList_baseresponse/').toPromise();
    }
    getList_workflowrole() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsresponse' + '/getList_workflowrole').toPromise();
    }
    getList_colorcode() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsresponse' + '/getList_colorcode/').toPromise();
    }
};
lmsresponseService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmsresponseService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmsresponseService);



/***/ }),

/***/ 68912:
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmsresponse/lmsresponse.component.html ***!
  \***********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmsresponse_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Responses' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmsresponses()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmsresponse_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.responseid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.responseid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n\r\n\r\n            <!--productgroupid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('productgroupid') == -1) && (productgroupidvisible==undefined || productgroupidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"productgroupid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_productgroupid(null)\" (click)=\"AddOrEdit_productgroupid(null)\">Product\r\n                  Group</label>\r\n                <select *ngIf=\"!showview\" id=\"productgroupid\" (change)=\"productgroupid_onChange($event.target)\"\r\n                  formControlName=\"productgroupid\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of productgroupid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.productgroupiddesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--baseresponse-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('baseresponse') == -1) && (baseresponsevisible==undefined || baseresponsevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"baseresponse\" class=\"control-label\">Base Response</label>\r\n                <select *ngIf=\"!showview\" id=\"baseresponse\" (change)=\"baseresponse_onChange($event.target)\"\r\n                  formControlName=\"baseresponse\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of baseresponse_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.baseresponsedesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('customresponse') == -1) && (customresponsevisible==undefined || customresponsevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"customresponse\" class=\"control-label\">Custom Response</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.customresponse?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"customresponse\" formControlName=\"customresponse\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('counter') == -1) && (countervisible==undefined || countervisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"counter\" class=\"control-label\">Counter</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.counter?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"counter\" formControlName=\"counter\" class=\"form-control\">\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('movetotrash') == -1) && (movetotrashvisible==undefined || movetotrashvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"movetotrash\" class=\"control-label\">Move To Trash</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.movetotrash?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"movetotrash\" formControlName=\"movetotrash\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--workflowrole-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('workflowrole') == -1) && (workflowrolevisible==undefined || workflowrolevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"workflowrole\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_workflowrole(null)\">Work Flow Role</label>\r\n                <select *ngIf=\"!showview\" id=\"workflowrole\" (change)=\"workflowrole_onChange($event.target)\"\r\n                  formControlName=\"workflowrole\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of workflowrole_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.workflowroledesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--colorcode-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('colorcode') == -1) && (colorcodevisible==undefined || colorcodevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"colorcode\" class=\"control-label\">Color Code</label>\r\n                <select *ngIf=\"!showview\" id=\"colorcode\" (change)=\"colorcode_onChange($event.target)\"\r\n                  formControlName=\"colorcode\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of colorcode_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.colorcodedesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('tathours') == -1) && (tathoursvisible==undefined || tathoursvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"tathours\" class=\"control-label\">T A T Hours</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.tathours?.value}}</label>\r\n                <ngb-timepicker *ngIf=\"!showview\" class=\"form-control timepicker\" formControlName=\"tathours\">\r\n                </ngb-timepicker>\r\n              </div>\r\n            </div>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Sub Responses</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table lmssubresponses-->\r\n            <div [ngClass]=\"Is_lmssubresponses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Sub Responses' | translate}}\r\n                <select class='child' id=\"lmssubresponsesPagingdropdown\"\r\n                  (change)=\"lmssubresponses_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"lmssubresponsetoggleOption();lmssubresponses_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmssubresponsesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"lmssubresponses_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_lmssubresponses (userRowSelect)=\"handle_lmssubresponses_GridSelected($event)\"\r\n                [settings]=\"lmssubresponses_settings\" (custom)=\"onCustom_lmssubresponses_Action($event)\"\r\n                [source]=\"tbl_lmssubresponses?.source?.data\" (delete)=\"lmssubresponses_route($event,'delete')\"\r\n                (deleteConfirm)=\"lmssubresponses_route($event,'delete')\"\r\n                (create)=\"lmssubresponses_route($event,'create')\" (createConfirm)=\"lmssubresponses_beforesave($event)\"\r\n                (edit)=\"lmssubresponses_route($event,'edit')\" (editConfirm)=\"lmssubresponses_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table lmssubresponses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_lmsresponse_lmsresponse_module_ts.js.map