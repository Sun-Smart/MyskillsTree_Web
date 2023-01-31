"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_bomasterdata_bomasterdata_module_ts"],{

/***/ 46878:
/*!********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bomasterdata/bomasterdata.component.ts ***!
  \********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bomasterdataComponent": () => (/* binding */ bomasterdataComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bomasterdata_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bomasterdata.component.html */ 36910);
/* harmony import */ var _service_bomasterdata_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bomasterdata.service */ 24260);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_bosubcategorymaster_bosubcategorymaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../pages/forms/bosubcategorymaster/bosubcategorymaster.component */ 63610);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);










//Shortcuts

//translator




//primeng services



//session,application constants




//custom fields & attachments

let bomasterdataComponent = class bomasterdataComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bomasterdata_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bomasterdata_service = bomasterdata_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_8__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_bomasterdatas = false;
        this.bfilterPopulate_bosubcategorymasters = false;
        this.bomasterdata_menuactions = [];
        this.bosubcategorymaster_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_bosubcategorymaster_IDs = "";
        this.bosubcategorymasters_ID = "1";
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
        this.bomasterdata_Form = this.fb.group({
            pk: [null],
            masterdataid: [null],
            masterdatatypeid: [null],
            masterdatatypeiddesc: [null],
            masterdatacode: [null],
            masterdatadescription: [null],
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
    get f() { return this.bomasterdata_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bomasterdata_Form.dirty && this.bomasterdata_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_9__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_9__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_9__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.masterdataid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.masterdataid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.masterdataid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
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
            let bomasterdataid = null;
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
            this.formid = bomasterdataid;
            //alert(bomasterdataid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bosubcategorymasters_TableConfig();
                setTimeout(() => {
                    //this.Set_bosubcategorymasters_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.bomasterdata_service.getDefaultData().then(res => {
                this.masterdatatypeid_List = res.list_masterdatatypeid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bomasterdata_service.get_bomasterdatas_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bomasterdata_Form.markAsUntouched();
            this.bomasterdata_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.bomasterdata_Form != null)
            this.bomasterdata_Form.reset();
        this.bomasterdata_Form.patchValue({});
        setTimeout(() => {
            this.bosubcategorymasters_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let masterdataid = this.bomasterdata_Form.get('masterdataid').value;
        if (masterdataid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bomasterdata_service.delete_bomasterdata(masterdataid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bomasterdata_Form.patchValue({
            masterdataid: null
        });
        if (this.formData.masterdataid != null)
            this.formData.masterdataid = null;
        for (let i = 0; i < this.tbl_bosubcategorymasters.source.length; i++) {
            this.tbl_bosubcategorymasters.source[i].subcategoryid = null;
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
                        this.bomasterdata_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bomasterdata_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bomasterdata_Form.controls[key] != undefined) {
                                this.bomasterdata_Form.controls[key].disable({ onlySelf: true });
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
        this.router.navigate(['/home/boreportviewer/aj5qt']);
    }
    onSubmitAndWait() {
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.masterdatadescription != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.masterdatadescription != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    masterdatatypeid_onChange(evt) {
        let e = evt.value;
        this.bomasterdata_Form.patchValue({ masterdatatypeiddesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_bomasterdatas() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bomasterdata_service.get_bomasterdatas_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bomasterdata;
                let formproperty = res.bomasterdata.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bomasterdata.pkcol;
                this.formid = res.bomasterdata.masterdataid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bomasterdata;
        this.formid = res.bomasterdata.masterdataid;
        this.pkcol = res.bomasterdata.pkcol;
        this.bmyrecord = false;
        if (res.bomasterdata.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bomasterdata_Form.patchValue({
            masterdataid: res.bomasterdata.masterdataid,
            masterdatatypeid: res.bomasterdata.masterdatatypeid,
            masterdatatypeiddesc: res.bomasterdata.masterdatatypeiddesc,
            masterdatacode: res.bomasterdata.masterdatacode,
            masterdatadescription: res.bomasterdata.masterdatadescription,
            orderno: res.bomasterdata.orderno,
            htmlcode: res.bomasterdata.htmlcode,
            param1: res.bomasterdata.param1,
            param2: res.bomasterdata.param2,
            helptext: res.bomasterdata.helptext,
            flag: res.bomasterdata.flag,
            status: res.bomasterdata.status,
            statusdesc: res.bomasterdata.statusdesc,
        });
        this.bomasterdata_menuactions = res.bomasterdata_menuactions;
        this.bosubcategorymaster_menuactions = res.bosubcategorymaster_menuactions;
        this.bosubcategorymasters_visiblelist = res.bosubcategorymasters_visiblelist;
        //Child Tables if any
        this.Set_bosubcategorymasters_TableConfig();
        this.bosubcategorymasters_LoadTable(res.bosubcategorymasters);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bomasterdata_Form.controls) {
            let val = this.bomasterdata_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bomasterdata_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.bomasterdata_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bomasterdata_Form.getRawValue();
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.bomasterdata_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bomasterdata_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bomasterdata_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bomasterdata_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bomasterdata_Form.controls[key] != null) {
                            this.formData[key] = this.bomasterdata_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.Deleted_bosubcategorymaster_IDs = this.Deleted_bosubcategorymaster_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.bomasterdata_service.saveOrUpdate_bomasterdatas(this.formData, (_b = (_a = this.tbl_bosubcategorymasters) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_bosubcategorymasters.source) {
                    for (let i = 0; i < this.tbl_bosubcategorymasters.source.data.length; i++) {
                        if (this.tbl_bosubcategorymasters.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bosubcategorymasters.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bomasterdata);
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
                        this.objvalues.push(res.bomasterdata);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bomasterdata_Form.markAsUntouched();
                this.bomasterdata_Form.markAsPristine();
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
        this.tbl_bosubcategorymasters.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_11__.LocalDataSource();
    }
    AddOrEdit_bosubcategorymaster(event, subcategoryid, masterdataid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_bosubcategorymaster_bosubcategorymaster_component__WEBPACK_IMPORTED_MODULE_3__.bosubcategorymasterComponent, {
            // data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, subcategoryid, masterdataid, visiblelist: this.bosubcategorymasters_visiblelist, hidelist: this.bosubcategorymasters_hidelist, ScreenType: 2 },
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, subcategoryid, categoryid: masterdataid, visiblelist: this.bosubcategorymasters_visiblelist, hidelist: this.bosubcategorymasters_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bosubcategorymasters.source.add(res[i]);
                    }
                    this.tbl_bosubcategorymasters.source.refresh();
                }
                else {
                    this.tbl_bosubcategorymasters.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_bosubcategorymaster(event, childID, i) {
        if (childID != null)
            this.Deleted_bosubcategorymaster_IDs += childID + ",";
        this.tbl_bosubcategorymasters.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_bosubcategorymasters_Checkbox() {
        debugger;
        if (this.tbl_bosubcategorymasters.source.settings['selectMode'] == 'multi')
            this.tbl_bosubcategorymasters.source.settings['selectMode'] = 'single';
        else
            this.tbl_bosubcategorymasters.source.settings['selectMode'] = 'multi';
        this.tbl_bosubcategorymasters.source.initGrid();
    }
    delete_bosubcategorymasters_All() {
        this.tbl_bosubcategorymasters.source.settings['selectMode'] = 'single';
    }
    show_bosubcategorymasters_Filter() {
        setTimeout(() => {
            //  this.Set_bosubcategorymasters_TableDropDownConfig();
        });
        if (this.tbl_bosubcategorymasters.source.settings != null)
            this.tbl_bosubcategorymasters.source.settings['hideSubHeader'] = !this.tbl_bosubcategorymasters.source.settings['hideSubHeader'];
        this.tbl_bosubcategorymasters.source.initGrid();
    }
    show_bosubcategorymasters_InActive() {
    }
    enable_bosubcategorymasters_InActive() {
    }
    Set_bosubcategorymasters_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bosubcategorymasters) {
            }
            this.bfilterPopulate_bosubcategorymasters = true;
        });
    }
    bosubcategorymasters_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bosubcategorymasters_TableConfig() {
        this.bosubcategorymasters_settings = {
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
                custom: this.bosubcategorymaster_menuactions
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
    bosubcategorymasters_LoadTable(bosubcategorymasters = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_11__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bosubcategorymasters_ID) >= 0) {
            if (this.tbl_bosubcategorymasters != undefined)
                this.tbl_bosubcategorymasters.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_11__.LocalDataSource();
            if (this.tbl_bosubcategorymasters != undefined)
                this.tbl_bosubcategorymasters.source.load(bosubcategorymasters);
            if (this.tbl_bosubcategorymasters != undefined)
                this.tbl_bosubcategorymasters.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    bosubcategorymasters_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bomasterdata_service.bosubcategorymasters.length == 0)
    {
        this.tbl_bosubcategorymasters.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bosubcategorymaster();
        this.bomasterdata_service.bosubcategorymasters.push(obj);
        this.tbl_bosubcategorymasters.source.refresh();
        if ((this.bomasterdata_service.bosubcategorymasters.length / this.tbl_bosubcategorymasters.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bosubcategorymasters.source.getPaging().page)
        {
            this.tbl_bosubcategorymasters.source.setPage((this.bomasterdata_service.bosubcategorymasters.length / this.tbl_bosubcategorymasters.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bosubcategorymasters.source.grid.edit(this.tbl_bosubcategorymasters.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bosubcategorymasters.source.data.indexOf(event.data);
    this.onDelete_bosubcategorymaster(event,event.data.subcategoryid,((this.tbl_bosubcategorymasters.source.getPaging().page-1) *this.tbl_bosubcategorymasters.source.getPaging().perPage)+index);
    this.tbl_bosubcategorymasters.source.refresh();
    break;
    }
    }
    
    */
    bosubcategorymasters_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_bosubcategorymaster(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bosubcategorymaster(event, event.data.subcategoryid, this.formid);
                break;
            case 'delete':
                this.onDelete_bosubcategorymaster(event, event.data.subcategoryid, ((this.tbl_bosubcategorymasters.source.getPaging().page - 1) * this.tbl_bosubcategorymasters.source.getPaging().perPage) + event.index);
                this.tbl_bosubcategorymasters.source.refresh();
                break;
        }
    }
    bosubcategorymasters_onDelete(obj) {
        let subcategoryid = obj.data.subcategoryid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bomasterdata_service.delete_bomasterdata(subcategoryid).then(res => this.bosubcategorymasters_LoadTable());
        }
    }
    onCustom_bosubcategorymasters_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bosubcategorymasters");
            let formname = objbomenuaction.actionname;
        });
    }
    bosubcategorymasters_Paging(val) {
        debugger;
        this.tbl_bosubcategorymasters.source.setPaging(1, val, true);
    }
    handle_bosubcategorymasters_GridSelected(event) {
        this.bosubcategorymasters_selectedindex = this.tbl_bosubcategorymasters.source.findIndex(i => i.subcategoryid === event.data.subcategoryid);
    }
    Is_bosubcategorymasters_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bosubcategorymasters_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
bomasterdataComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_12__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DialogService },
    { type: _service_bomasterdata_service__WEBPACK_IMPORTED_MODULE_1__.bomasterdataService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_18__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_20__.NgxSpinnerService }
];
bomasterdataComponent.propDecorators = {
    tbl_bosubcategorymasters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild, args: ['tbl_bosubcategorymasters', { static: false },] }]
};
bomasterdataComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-bomasterdata',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bomasterdata_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService]
    })
], bomasterdataComponent);



/***/ }),

/***/ 80459:
/*!*****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bomasterdata/bomasterdata.module.ts ***!
  \*****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bomasterdataModule": () => (/* binding */ bomasterdataModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _bomasterdata_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bomasterdata.routing */ 90037);
/* harmony import */ var _bomasterdata_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bomasterdata.component */ 46878);
/* harmony import */ var _bosubcategorymaster_bosubcategorymaster_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bosubcategorymaster/bosubcategorymaster.module */ 4228);







let bomasterdataModule = class bomasterdataModule {
};
bomasterdataModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _bomasterdata_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _bosubcategorymaster_bosubcategorymaster_module__WEBPACK_IMPORTED_MODULE_4__.bosubcategorymasterModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_bomasterdata_component__WEBPACK_IMPORTED_MODULE_3__.bomasterdataComponent]
    })
], bomasterdataModule);



/***/ }),

/***/ 90037:
/*!******************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bomasterdata/bomasterdata.routing.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _bomasterdata_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bomasterdata.component */ 46878);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'bomasterdatas', children: [
            { path: '', component: _bomasterdata_component__WEBPACK_IMPORTED_MODULE_0__.bomasterdataComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _bomasterdata_component__WEBPACK_IMPORTED_MODULE_0__.bomasterdataComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _bomasterdata_component__WEBPACK_IMPORTED_MODULE_0__.bomasterdataComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _bomasterdata_component__WEBPACK_IMPORTED_MODULE_0__.bomasterdataComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 24260:
/*!*************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bomasterdata.service.ts ***!
  \*************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bomasterdataService": () => (/* binding */ bomasterdataService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let bomasterdataService = class bomasterdataService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bomasterdatas(formData, bosubcategorymasters) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { bosubcategorymasters: bosubcategorymasters.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdata', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdata' + '/getdefaultdata').toPromise();
        }
    }
    get_bomasterdatas_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdata').toPromise();
        }
    }
    getListBy_masterdataid(masterdataid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdata' + '/masterdataid/' + masterdataid).toPromise();
        }
    }
    getList(key) {
        debugger;
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdata' + '/param/' + key).toPromise();
        }
    }
    get_bomasterdatas_ByEID(id) {
        debugger;
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdata' + '/e/' + id).toPromise();
        }
    }
    get_bomasterdatas_ByID(id) {
        debugger;
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdata' + '/' + id).toPromise();
        }
    }
    delete_bomasterdata(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdata' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bomasterdata')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bomasterdata => new bomasterdata(bomasterdata.masterdataid, bomasterdata.masterdatatypeid, bomasterdata.masterdatatypeiddesc, bomasterdata.masterdatacode, bomasterdata.masterdatadescription, bomasterdata.orderno, bomasterdata.htmlcode, bomasterdata.param1, bomasterdata.param2, bomasterdata.helptext, bomasterdata.flag, bomasterdata.status, ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bomasterdata => bomasterdata.masterdatadescription.includes(filter.name));
            return response;
        }));
    }
    getList_masterdatatypeid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bomasterdata' + '/getList_masterdatatypeid').toPromise();
    }
};
bomasterdataService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bomasterdataService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bomasterdataService);



/***/ }),

/***/ 36910:
/*!*************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bomasterdata/bomasterdata.component.html ***!
  \*************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bomasterdata_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second common_title_style\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'MasterData' | translate}}</a></h1>\r\n    <div class='col  sticky1 second common_header_clr' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bomasterdatas()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bomasterdata_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader common_title_style' *ngIf=\"!showview\">\r\n            <!-- <a class=\"alert-success\" [routerLink]=''>  -->\r\n              <!-- <button type=\"button\" class=\"btn btn-outline-primary popup-add-button \" style=\"border-color: #fff !important;margin: 5px;\r\n              padding: 3px;\r\n              color: #fff;\" [routerLink]=''(click)=\"goBack()\" >Back</button>&nbsp; -->\r\n            <button type=\"button\" class=\"btn btn-outline-primary popup-add-button \" style=\"border-color: #fff !important;margin: 5px;\r\n              padding: 3px;\r\n              color: #fff;\" (click)=\"onSubmitAndWait()\">Submit</button>&nbsp;\r\n            <!-- <a class=\"alert-primary common_title_style\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a> -->\r\n            <button type=\"button\" class=\"btn btn-outline-primary popup-add-button \" *ngIf='data.pkcol==null || maindata.ScreenType==null'\r\n              style=\"border-color: #fff !important;\r\n              color: #fff;margin: 5px;\r\n    padding: 3px;\" (click)=\"onSubmit()\">Submit & Clear</button>&nbsp;\r\n            <app-action *ngIf=\"f.masterdataid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.masterdataid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <i class='nav-item actionheader common_title_style'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\"\r\n            class=\"fa fa-times-circle close_common_icon2\" (click)=\"onClose()\"></i>\r\n\r\n\r\n          <!-- <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.masterdataid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.masterdataid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li> -->\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n\r\n\r\n            <!--masterdatatypeid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('masterdatatypeid') == -1) && (masterdatatypeidvisible==undefined || masterdatatypeidvisible==true))\"\r\n                style='' class=\"col-4\"><label for=\"masterdatatypeid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_masterdatatypeid(null)\">Master Datatype</label>\r\n                <select *ngIf=\"!showview\" id=\"masterdatatypeid\" (change)=\"masterdatatypeid_onChange($event.target)\"\r\n                  formControlName=\"masterdatatypeid\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of masterdatatypeid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.masterdatatypeiddesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('masterdatacode') == -1) && (masterdatacodevisible==undefined || masterdatacodevisible==true))\"\r\n                style='' class=\"col-4 \">\r\n                <label for=\"masterdatacode\" class=\"control-label\">Masterdata Code</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.masterdatacode?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"masterdatacode\" formControlName=\"masterdatacode\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('masterdatadescription') == -1) && (masterdatadescriptionvisible==undefined || masterdatadescriptionvisible==true))\"\r\n                style='' class=\"col-4 \">\r\n                <label for=\"masterdatadescription\" class=\"control-label\">Masterdata Description</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.masterdatadescription?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"masterdatadescription\" formControlName=\"masterdatadescription\"\r\n                  class=\"form-control\">\r\n              </div>\r\n              <!-- <div *ngIf=\"((hidelist.indexOf('orderno') == -1) && (ordernovisible==undefined || ordernovisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"orderno\" class=\"control-label\">Order No</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.orderno?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"orderno\" formControlName=\"orderno\" class=\"form-control\">\r\n              </div> -->\r\n            </div>\r\n            <!-- <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('htmlcode') == -1) && (htmlcodevisible==undefined || htmlcodevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"htmlcode\" class=\"control-label\">H T M L Code</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.htmlcode?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"htmlcode\" formControlName=\"htmlcode\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('param1') == -1) && (param1visible==undefined || param1visible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"param1\" class=\"control-label\">Param1</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.param1?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"param1\" formControlName=\"param1\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('param2') == -1) && (param2visible==undefined || param2visible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"param2\" class=\"control-label\">Param2</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.param2?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"param2\" formControlName=\"param2\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('helptext') == -1) && (helptextvisible==undefined || helptextvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"helptext\" class=\"control-label\">Help Text</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.helptext?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"helptext\"\r\n                  formControlName=\"helptext\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('flag') == -1) && (flagvisible==undefined || flagvisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <label for=\"flag\" class=\"control-label\">Flag</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.flag?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"flag\" formControlName=\"flag\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div> -->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">SubCategory Masters</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bosubcategorymasters-->\r\n            <div [ngClass]=\"Is_bosubcategorymasters_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'SubCategory Masters' | translate}}\r\n                <select class='child' id=\"bosubcategorymastersPagingdropdown\"\r\n                  (change)=\"bosubcategorymasters_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"bosubcategorymastertoggleOption();bosubcategorymasters_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbosubcategorymastersFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"bosubcategorymasters_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bosubcategorymasters\r\n                (userRowSelect)=\"handle_bosubcategorymasters_GridSelected($event)\"\r\n                [settings]=\"bosubcategorymasters_settings\" (custom)=\"onCustom_bosubcategorymasters_Action($event)\"\r\n                [source]=\"tbl_bosubcategorymasters?.source?.data\" (delete)=\"bosubcategorymasters_route($event,'delete')\"\r\n                (deleteConfirm)=\"bosubcategorymasters_route($event,'delete')\"\r\n                (create)=\"bosubcategorymasters_route($event,'create')\"\r\n                (createConfirm)=\"bosubcategorymasters_beforesave($event)\"\r\n                (edit)=\"bosubcategorymasters_route($event,'edit')\"\r\n                (editConfirm)=\"bosubcategorymasters_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bosubcategorymasters-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>\r\n");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_bomasterdata_bomasterdata_module_ts.js.map