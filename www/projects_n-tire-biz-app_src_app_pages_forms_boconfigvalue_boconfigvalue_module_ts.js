"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_boconfigvalue_boconfigvalue_module_ts"],{

/***/ 90338:
/*!**********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boconfigvalue/boconfigvalue.component.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boconfigvalueComponent": () => (/* binding */ boconfigvalueComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boconfigvalue_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boconfigvalue.component.html */ 99662);
/* harmony import */ var _service_boconfigvalue_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/boconfigvalue.service */ 29391);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_bosubconfigvalue_bosubconfigvalue_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../pages/forms/bosubconfigvalue/bosubconfigvalue.component */ 51266);
/* harmony import */ var _service_bosubconfigvalue_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../service/bosubconfigvalue.service */ 75172);
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

let boconfigvalueComponent = class boconfigvalueComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, boconfigvalue_service, bosubconfigvalue_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.boconfigvalue_service = boconfigvalue_service;
        this.bosubconfigvalue_service = bosubconfigvalue_service;
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
        this.bfilterPopulate_boconfigvalues = false;
        this.bfilterPopulate_bosubconfigvalues = false;
        this.boconfigvalue_menuactions = [];
        this.bosubconfigvalue_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_bosubconfigvalue_IDs = "";
        this.bosubconfigvalues_ID = "1";
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
        this.boconfigvalue_Form = this.fb.group({
            pk: [null],
            configid: [null],
            param: [null],
            configkey: [null],
            configtext: [null],
            orderno: [null],
            htmlcode: [null],
            param1: [null],
            param2: [null],
            helptext: [null],
            flag: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.boconfigvalue_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.boconfigvalue_Form.dirty && this.boconfigvalue_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.configid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.configid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.configid && pkDetail) {
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
            let boconfigvalueid = null;
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
            this.formid = boconfigvalueid;
            //alert(boconfigvalueid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bosubconfigvalues_TableConfig();
                setTimeout(() => {
                    //this.Set_bosubconfigvalues_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.boconfigvalue_service.getDefaultData().then(res => {
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.boconfigvalue_service.get_boconfigvalues_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.boconfigvalue_Form.markAsUntouched();
            this.boconfigvalue_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.boconfigvalue_Form != null)
            this.boconfigvalue_Form.reset();
        this.boconfigvalue_Form.patchValue({});
        setTimeout(() => {
            this.bosubconfigvalues_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let configid = this.boconfigvalue_Form.get('configid').value;
        if (configid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boconfigvalue_service.delete_boconfigvalue(configid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boconfigvalue_Form.patchValue({
            configid: null
        });
        if (this.formData.configid != null)
            this.formData.configid = null;
        for (let i = 0; i < this.tbl_bosubconfigvalues.source.length; i++) {
            this.tbl_bosubconfigvalues.source[i].subcategoryid = null;
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
                    else if (ctrltype == "string") {
                        this.boconfigvalue_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boconfigvalue_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boconfigvalue_Form.controls[key] != undefined) {
                                this.boconfigvalue_Form.controls[key].disable({ onlySelf: true });
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
    edit_boconfigvalues() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.boconfigvalue_service.get_boconfigvalues_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.boconfigvalue;
                let formproperty = res.boconfigvalue.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.boconfigvalue.pkcol;
                this.formid = res.boconfigvalue.configid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.boconfigvalue;
        this.formid = res.boconfigvalue.configid;
        this.pkcol = res.boconfigvalue.pkcol;
        this.bmyrecord = false;
        if (res.boconfigvalue.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boconfigvalue_Form.patchValue({
            configid: res.boconfigvalue.configid,
            param: res.boconfigvalue.param,
            configkey: res.boconfigvalue.configkey,
            configtext: res.boconfigvalue.configtext,
            orderno: res.boconfigvalue.orderno,
            htmlcode: res.boconfigvalue.htmlcode,
            param1: res.boconfigvalue.param1,
            param2: res.boconfigvalue.param2,
            helptext: res.boconfigvalue.helptext,
            flag: res.boconfigvalue.flag,
            status: res.boconfigvalue.status,
            statusdesc: res.boconfigvalue.statusdesc,
        });
        this.boconfigvalue_menuactions = res.boconfigvalue_menuactions;
        this.bosubconfigvalue_menuactions = res.bosubconfigvalue_menuactions;
        this.bosubconfigvalues_visiblelist = res.bosubconfigvalues_visiblelist;
        //Child Tables if any
        this.Set_bosubconfigvalues_TableConfig();
        this.bosubconfigvalues_LoadTable(res.bosubconfigvalues);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.boconfigvalue_Form.controls) {
            let val = this.boconfigvalue_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.boconfigvalue_Form.controls[key] != null) {
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
            if (!this.boconfigvalue_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.boconfigvalue_Form.getRawValue();
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
            // Object.keys(this.boconfigvalue_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.boconfigvalue_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.boconfigvalue_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.boconfigvalue_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.boconfigvalue_Form.controls[key] != null) {
                            this.formData[key] = this.boconfigvalue_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.Deleted_bosubconfigvalue_IDs = this.Deleted_bosubconfigvalue_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.boconfigvalue_service.saveOrUpdate_boconfigvalues(this.formData, (_b = (_a = this.tbl_bosubconfigvalues) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_bosubconfigvalues.source) {
                    for (let i = 0; i < this.tbl_bosubconfigvalues.source.data.length; i++) {
                        if (this.tbl_bosubconfigvalues.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bosubconfigvalues.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.boconfigvalue);
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
                        this.objvalues.push(res.boconfigvalue);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boconfigvalue_Form.markAsUntouched();
                this.boconfigvalue_Form.markAsPristine();
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
        this.tbl_bosubconfigvalues.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource();
    }
    AddOrEdit_bosubconfigvalue(event, subcategoryid, configid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_bosubconfigvalue_bosubconfigvalue_component__WEBPACK_IMPORTED_MODULE_3__.bosubconfigvalueComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, subcategoryid, configid, visiblelist: this.bosubconfigvalues_visiblelist, hidelist: this.bosubconfigvalues_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bosubconfigvalues.source.add(res[i]);
                    }
                    this.tbl_bosubconfigvalues.source.refresh();
                }
                else {
                    this.tbl_bosubconfigvalues.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_bosubconfigvalue(event, childID, i) {
        if (childID != null)
            this.Deleted_bosubconfigvalue_IDs += childID + ",";
        this.tbl_bosubconfigvalues.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_bosubconfigvalues_Checkbox() {
        debugger;
        if (this.tbl_bosubconfigvalues.source.settings['selectMode'] == 'multi')
            this.tbl_bosubconfigvalues.source.settings['selectMode'] = 'single';
        else
            this.tbl_bosubconfigvalues.source.settings['selectMode'] = 'multi';
        this.tbl_bosubconfigvalues.source.initGrid();
    }
    delete_bosubconfigvalues_All() {
        this.tbl_bosubconfigvalues.source.settings['selectMode'] = 'single';
    }
    show_bosubconfigvalues_Filter() {
        setTimeout(() => {
            //  this.Set_bosubconfigvalues_TableDropDownConfig();
        });
        if (this.tbl_bosubconfigvalues.source.settings != null)
            this.tbl_bosubconfigvalues.source.settings['hideSubHeader'] = !this.tbl_bosubconfigvalues.source.settings['hideSubHeader'];
        this.tbl_bosubconfigvalues.source.initGrid();
    }
    show_bosubconfigvalues_InActive() {
    }
    enable_bosubconfigvalues_InActive() {
    }
    Set_bosubconfigvalues_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bosubconfigvalues) {
                var clone = this.sharedService.clone(this.tbl_bosubconfigvalues.source.settings);
                if (clone.columns['configkey'] != undefined)
                    clone.columns['configkey'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bosubconfigvalues_configkey.value)), }, };
                if (clone.columns['configkey'] != undefined)
                    clone.columns['configkey'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bosubconfigvalues_configkey.value)), }, };
                this.tbl_bosubconfigvalues.source.settings = clone;
                this.tbl_bosubconfigvalues.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bosubconfigvalues.source.settings);
                if (clone.columns['subconfigcode'] != undefined)
                    clone.columns['subconfigcode'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bosubconfigvalues_subconfigcode.value)), }, };
                if (clone.columns['subconfigcode'] != undefined)
                    clone.columns['subconfigcode'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bosubconfigvalues_subconfigcode.value)), }, };
                this.tbl_bosubconfigvalues.source.settings = clone;
                this.tbl_bosubconfigvalues.source.initGrid();
            }
            this.bfilterPopulate_bosubconfigvalues = true;
        });
    }
    bosubconfigvalues_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bosubconfigvalues_TableConfig() {
        this.bosubconfigvalues_settings = {
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
                custom: this.bosubconfigvalue_menuactions
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
                subconfigcodedesc: {
                    title: 'Sub Config Code',
                    type: 'html',
                    filter: true,
                },
                subcategoryname: {
                    title: 'Sub Category Name',
                    type: '',
                    filter: true,
                },
                orderno: {
                    title: 'Order No',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    bosubconfigvalues_LoadTable(bosubconfigvalues = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bosubconfigvalues_ID) >= 0) {
            if (this.tbl_bosubconfigvalues != undefined)
                this.tbl_bosubconfigvalues.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource();
            if (this.tbl_bosubconfigvalues != undefined)
                this.tbl_bosubconfigvalues.source.load(bosubconfigvalues);
            if (this.tbl_bosubconfigvalues != undefined)
                this.tbl_bosubconfigvalues.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    bosubconfigvalues_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boconfigvalue_service.bosubconfigvalues.length == 0)
    {
        this.tbl_bosubconfigvalues.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bosubconfigvalue();
        this.boconfigvalue_service.bosubconfigvalues.push(obj);
        this.tbl_bosubconfigvalues.source.refresh();
        if ((this.boconfigvalue_service.bosubconfigvalues.length / this.tbl_bosubconfigvalues.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bosubconfigvalues.source.getPaging().page)
        {
            this.tbl_bosubconfigvalues.source.setPage((this.boconfigvalue_service.bosubconfigvalues.length / this.tbl_bosubconfigvalues.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bosubconfigvalues.source.grid.edit(this.tbl_bosubconfigvalues.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bosubconfigvalues.source.data.indexOf(event.data);
    this.onDelete_bosubconfigvalue(event,event.data.subcategoryid,((this.tbl_bosubconfigvalues.source.getPaging().page-1) *this.tbl_bosubconfigvalues.source.getPaging().perPage)+index);
    this.tbl_bosubconfigvalues.source.refresh();
    break;
    }
    }
    
    */
    bosubconfigvalues_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_bosubconfigvalue(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bosubconfigvalue(event, event.data.subcategoryid, this.formid);
                break;
            case 'delete':
                this.onDelete_bosubconfigvalue(event, event.data.subcategoryid, ((this.tbl_bosubconfigvalues.source.getPaging().page - 1) * this.tbl_bosubconfigvalues.source.getPaging().perPage) + event.index);
                this.tbl_bosubconfigvalues.source.refresh();
                break;
        }
    }
    bosubconfigvalues_onDelete(obj) {
        let subcategoryid = obj.data.subcategoryid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boconfigvalue_service.delete_boconfigvalue(subcategoryid).then(res => this.bosubconfigvalues_LoadTable());
        }
    }
    onCustom_bosubconfigvalues_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bosubconfigvalues");
            let formname = objbomenuaction.actionname;
        });
    }
    bosubconfigvalues_Paging(val) {
        debugger;
        this.tbl_bosubconfigvalues.source.setPaging(1, val, true);
    }
    handle_bosubconfigvalues_GridSelected(event) {
        this.bosubconfigvalues_selectedindex = this.tbl_bosubconfigvalues.source.findIndex(i => i.subcategoryid === event.data.subcategoryid);
    }
    Is_bosubconfigvalues_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bosubconfigvalues_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
boconfigvalueComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DialogService },
    { type: _service_boconfigvalue_service__WEBPACK_IMPORTED_MODULE_1__.boconfigvalueService },
    { type: _service_bosubconfigvalue_service__WEBPACK_IMPORTED_MODULE_4__.bosubconfigvalueService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_21__.NgxSpinnerService }
];
boconfigvalueComponent.propDecorators = {
    tbl_bosubconfigvalues: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['tbl_bosubconfigvalues', { static: false },] }]
};
boconfigvalueComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-boconfigvalue',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boconfigvalue_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService]
    })
], boconfigvalueComponent);



/***/ }),

/***/ 15471:
/*!*******************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boconfigvalue/boconfigvalue.module.ts ***!
  \*******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boconfigvalueModule": () => (/* binding */ boconfigvalueModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _boconfigvalue_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boconfigvalue.routing */ 23465);
/* harmony import */ var _boconfigvalue_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boconfigvalue.component */ 90338);
/* harmony import */ var _bosubconfigvalue_bosubconfigvalue_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bosubconfigvalue/bosubconfigvalue.module */ 85269);







let boconfigvalueModule = class boconfigvalueModule {
};
boconfigvalueModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _boconfigvalue_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _bosubconfigvalue_bosubconfigvalue_module__WEBPACK_IMPORTED_MODULE_4__.bosubconfigvalueModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_boconfigvalue_component__WEBPACK_IMPORTED_MODULE_3__.boconfigvalueComponent]
    })
], boconfigvalueModule);



/***/ }),

/***/ 23465:
/*!********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boconfigvalue/boconfigvalue.routing.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _boconfigvalue_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boconfigvalue.component */ 90338);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'boconfigvalues', children: [
            { path: '', component: _boconfigvalue_component__WEBPACK_IMPORTED_MODULE_0__.boconfigvalueComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _boconfigvalue_component__WEBPACK_IMPORTED_MODULE_0__.boconfigvalueComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _boconfigvalue_component__WEBPACK_IMPORTED_MODULE_0__.boconfigvalueComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _boconfigvalue_component__WEBPACK_IMPORTED_MODULE_0__.boconfigvalueComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 51266:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bosubconfigvalue/bosubconfigvalue.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bosubconfigvalueComponent": () => (/* binding */ bosubconfigvalueComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bosubconfigvalue_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bosubconfigvalue.component.html */ 63752);
/* harmony import */ var _service_bosubconfigvalue_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bosubconfigvalue.service */ 75172);
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

let bosubconfigvalueComponent = class bosubconfigvalueComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bosubconfigvalue_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bosubconfigvalue_service = bosubconfigvalue_service;
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
        this.bfilterPopulate_bosubconfigvalues = false;
        this.bosubconfigvalue_menuactions = [];
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
        this.bosubconfigvalue_Form = this.fb.group({
            pk: [null],
            subcategoryid: [null],
            configkey: [null],
            configkeydesc: [null],
            subconfigcode: [null],
            subconfigcodedesc: [null],
            subcategoryname: [null],
            orderno: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bosubconfigvalue_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bosubconfigvalue_Form.dirty && this.bosubconfigvalue_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.subcategoryid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.subcategoryid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.subcategoryid && pkDetail) {
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
            let bosubconfigvalueid = null;
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
            this.formid = bosubconfigvalueid;
            //alert(bosubconfigvalueid);
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
            this.bosubconfigvalue_service.getDefaultData().then(res => {
                this.configkey_List = res.list_configkey.value;
                this.subconfigcode_List = res.list_subconfigcode.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bosubconfigvalue_service.get_bosubconfigvalues_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bosubconfigvalue_Form.markAsUntouched();
            this.bosubconfigvalue_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.bosubconfigvalue_Form != null)
            this.bosubconfigvalue_Form.reset();
        this.bosubconfigvalue_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let subcategoryid = this.bosubconfigvalue_Form.get('subcategoryid').value;
        if (subcategoryid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bosubconfigvalue_service.delete_bosubconfigvalue(subcategoryid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bosubconfigvalue_Form.patchValue({
            subcategoryid: null
        });
        if (this.formData.subcategoryid != null)
            this.formData.subcategoryid = null;
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
                        this.bosubconfigvalue_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bosubconfigvalue_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bosubconfigvalue_Form.controls[key] != undefined) {
                                this.bosubconfigvalue_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.subcategoryname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.subcategoryname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    configkey_onChange(evt) {
        let e = this.f.configkey.value;
        this.bosubconfigvalue_Form.patchValue({ configkeydesc: evt.options[evt.options.selectedIndex].text });
    }
    subconfigcode_onChange(evt) {
        let e = this.f.subconfigcode.value;
        this.bosubconfigvalue_Form.patchValue({ subconfigcodedesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_bosubconfigvalues() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bosubconfigvalue_service.get_bosubconfigvalues_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bosubconfigvalue;
                let formproperty = res.bosubconfigvalue.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bosubconfigvalue.pkcol;
                this.formid = res.bosubconfigvalue.subcategoryid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bosubconfigvalue;
        this.formid = res.bosubconfigvalue.subcategoryid;
        this.pkcol = res.bosubconfigvalue.pkcol;
        this.bmyrecord = false;
        if (res.bosubconfigvalue.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bosubconfigvalue_Form.patchValue({
            subcategoryid: res.bosubconfigvalue.subcategoryid,
            configkey: res.bosubconfigvalue.configkey,
            configkeydesc: res.bosubconfigvalue.configkeydesc,
            subconfigcode: res.bosubconfigvalue.subconfigcode,
            subconfigcodedesc: res.bosubconfigvalue.subconfigcodedesc,
            subcategoryname: res.bosubconfigvalue.subcategoryname,
            orderno: res.bosubconfigvalue.orderno,
            status: res.bosubconfigvalue.status,
            statusdesc: res.bosubconfigvalue.statusdesc,
        });
        this.bosubconfigvalue_menuactions = res.bosubconfigvalue_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bosubconfigvalue_Form.controls) {
            let val = this.bosubconfigvalue_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bosubconfigvalue_Form.controls[key] != null) {
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
            if (!this.bosubconfigvalue_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bosubconfigvalue_Form.getRawValue();
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
            // Object.keys(this.bosubconfigvalue_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bosubconfigvalue_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bosubconfigvalue_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bosubconfigvalue_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bosubconfigvalue_Form.controls[key] != null) {
                            this.formData[key] = this.bosubconfigvalue_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.bosubconfigvalue_service.saveOrUpdate_bosubconfigvalues(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bosubconfigvalue);
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
                        this.objvalues.push(res.bosubconfigvalue);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bosubconfigvalue_Form.markAsUntouched();
                this.bosubconfigvalue_Form.markAsPristine();
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
bosubconfigvalueComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_bosubconfigvalue_service__WEBPACK_IMPORTED_MODULE_1__.bosubconfigvalueService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
bosubconfigvalueComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-bosubconfigvalue',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bosubconfigvalue_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], bosubconfigvalueComponent);



/***/ }),

/***/ 85269:
/*!*************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bosubconfigvalue/bosubconfigvalue.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bosubconfigvalueModule": () => (/* binding */ bosubconfigvalueModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _bosubconfigvalue_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bosubconfigvalue.routing */ 65745);
/* harmony import */ var _bosubconfigvalue_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bosubconfigvalue.component */ 51266);






let bosubconfigvalueModule = class bosubconfigvalueModule {
};
bosubconfigvalueModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _bosubconfigvalue_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_bosubconfigvalue_component__WEBPACK_IMPORTED_MODULE_3__.bosubconfigvalueComponent]
    })
], bosubconfigvalueModule);



/***/ }),

/***/ 65745:
/*!**************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bosubconfigvalue/bosubconfigvalue.routing.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _bosubconfigvalue_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bosubconfigvalue.component */ 51266);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'bosubconfigvalues', children: [
            { path: '', component: _bosubconfigvalue_component__WEBPACK_IMPORTED_MODULE_0__.bosubconfigvalueComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _bosubconfigvalue_component__WEBPACK_IMPORTED_MODULE_0__.bosubconfigvalueComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _bosubconfigvalue_component__WEBPACK_IMPORTED_MODULE_0__.bosubconfigvalueComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _bosubconfigvalue_component__WEBPACK_IMPORTED_MODULE_0__.bosubconfigvalueComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 75172:
/*!*****************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bosubconfigvalue.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bosubconfigvalueService": () => (/* binding */ bosubconfigvalueService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let bosubconfigvalueService = class bosubconfigvalueService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bosubconfigvalues(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bosubconfigvalue', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bosubconfigvalue' + '/getdefaultdata').toPromise();
        }
    }
    get_bosubconfigvalues_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bosubconfigvalue').toPromise();
        }
    }
    getListBy_subcategoryid(subcategoryid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bosubconfigvalue' + '/subcategoryid/' + subcategoryid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bosubconfigvalue' + '/param/' + key).toPromise();
        }
    }
    get_bosubconfigvalues_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bosubconfigvalue' + '/e/' + id).toPromise();
        }
    }
    get_bosubconfigvalues_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bosubconfigvalue' + '/' + id).toPromise();
        }
    }
    delete_bosubconfigvalue(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bosubconfigvalue' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bosubconfigvalue')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bosubconfigvalue => new bosubconfigvalue(bosubconfigvalue.subcategoryid, bosubconfigvalue.configkey, bosubconfigvalue.configkeydesc, bosubconfigvalue.subconfigcode, bosubconfigvalue.subconfigcodedesc, bosubconfigvalue.subcategoryname, bosubconfigvalue.orderno, bosubconfigvalue.status))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bosubconfigvalue => bosubconfigvalue.subcategoryname.includes(filter.name));
            return response;
        }));
    }
    getList_configkey() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bosubconfigvalue' + '/getList_configkey/').toPromise();
    }
    getList_subconfigcode() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bosubconfigvalue' + '/getList_subconfigcode/').toPromise();
    }
};
bosubconfigvalueService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bosubconfigvalueService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bosubconfigvalueService);



/***/ }),

/***/ 99662:
/*!***************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boconfigvalue/boconfigvalue.component.html ***!
  \***************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"boconfigvalue_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'boconfigvalues' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_boconfigvalues()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of boconfigvalue_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.configid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.configid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('param') == -1) && (paramvisible==undefined || paramvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"param\" class=\"control-label\">Param</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.param?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"param\" formControlName=\"param\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('configkey') == -1) && (configkeyvisible==undefined || configkeyvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"configkey\" class=\"control-label\">Config Key</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.configkey?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"configkey\" formControlName=\"configkey\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('configtext') == -1) && (configtextvisible==undefined || configtextvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"configtext\" class=\"control-label\">Config Text</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.configtext?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"configtext\" formControlName=\"configtext\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('orderno') == -1) && (ordernovisible==undefined || ordernovisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"orderno\" class=\"control-label\">Order No</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.orderno?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"orderno\" formControlName=\"orderno\" class=\"form-control\">\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('htmlcode') == -1) && (htmlcodevisible==undefined || htmlcodevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"htmlcode\" class=\"control-label\">H T M L Code</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.htmlcode?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"htmlcode\" formControlName=\"htmlcode\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('param1') == -1) && (param1visible==undefined || param1visible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"param1\" class=\"control-label\">Param1</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.param1?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"param1\" formControlName=\"param1\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('param2') == -1) && (param2visible==undefined || param2visible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"param2\" class=\"control-label\">Param2</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.param2?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"param2\" formControlName=\"param2\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('helptext') == -1) && (helptextvisible==undefined || helptextvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"helptext\" class=\"control-label\">Help Text</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.helptext?.value}}</label>\r\n                <p-editor *ngIf=\"!showview\" id=\"helptext\" formControlName=\"helptext\" [style]=\"{  height: '320' }\">\r\n                </p-editor>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('flag') == -1) && (flagvisible==undefined || flagvisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <label for=\"flag\" class=\"control-label\">Flag</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.flag?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"flag\" formControlName=\"flag\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">SubConfig</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bosubconfigvalues-->\r\n            <div [ngClass]=\"Is_bosubconfigvalues_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'SubConfig' | translate}}\r\n                <select class='child' id=\"bosubconfigvaluesPagingdropdown\"\r\n                  (change)=\"bosubconfigvalues_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"bosubconfigvaluetoggleOption();bosubconfigvalues_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbosubconfigvaluesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"bosubconfigvalues_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bosubconfigvalues (userRowSelect)=\"handle_bosubconfigvalues_GridSelected($event)\"\r\n                [settings]=\"bosubconfigvalues_settings\" (custom)=\"onCustom_bosubconfigvalues_Action($event)\"\r\n                [source]=\"tbl_bosubconfigvalues?.source?.data\" (delete)=\"bosubconfigvalues_route($event,'delete')\"\r\n                (deleteConfirm)=\"bosubconfigvalues_route($event,'delete')\"\r\n                (create)=\"bosubconfigvalues_route($event,'create')\"\r\n                (createConfirm)=\"bosubconfigvalues_beforesave($event)\" (edit)=\"bosubconfigvalues_route($event,'edit')\"\r\n                (editConfirm)=\"bosubconfigvalues_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bosubconfigvalues-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 63752:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bosubconfigvalue/bosubconfigvalue.component.html ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bosubconfigvalue_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'SubConfig' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bosubconfigvalues()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bosubconfigvalue_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.subcategoryid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.subcategoryid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n\r\n\r\n    <!--configkey-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('configkey') == -1) && (configkeyvisible==undefined || configkeyvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"configkey\" class=\"control-label\">Config Key</label>\r\n        <select *ngIf=\"!showview\" id=\"configkey\" (change)=\"configkey_onChange($event.target)\"\r\n          formControlName=\"configkey\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of configkey_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.configkeydesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--subconfigcode-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('subconfigcode') == -1) && (subconfigcodevisible==undefined || subconfigcodevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"subconfigcode\" class=\"control-label\">Sub Config Code</label>\r\n        <select *ngIf=\"!showview\" id=\"subconfigcode\" (change)=\"subconfigcode_onChange($event.target)\"\r\n          formControlName=\"subconfigcode\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of subconfigcode_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.subconfigcodedesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('subcategoryname') == -1) && (subcategorynamevisible==undefined || subcategorynamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"subcategoryname\" class=\"control-label\">Sub Category Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.subcategoryname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"subcategoryname\" formControlName=\"subcategoryname\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('orderno') == -1) && (ordernovisible==undefined || ordernovisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"orderno\" class=\"control-label\">Order No</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.orderno?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"orderno\" formControlName=\"orderno\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_boconfigvalue_boconfigvalue_module_ts.js.map