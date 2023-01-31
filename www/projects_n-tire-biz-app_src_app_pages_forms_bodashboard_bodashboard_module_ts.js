"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_bodashboard_bodashboard_module_ts"],{

/***/ 95872:
/*!******************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bodashboard/bodashboard.component.ts ***!
  \******************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bodashboardComponent": () => (/* binding */ bodashboardComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bodashboard_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bodashboard.component.html */ 58944);
/* harmony import */ var _service_bodashboard_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bodashboard.service */ 57678);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_bodashboarddetail_bodashboarddetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../pages/forms/bodashboarddetail/bodashboarddetail.component */ 16759);
/* harmony import */ var _service_bodashboarddetail_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../service/bodashboarddetail.service */ 92592);
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

let bodashboardComponent = class bodashboardComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bodashboard_service, bodashboarddetail_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bodashboard_service = bodashboard_service;
        this.bodashboarddetail_service = bodashboarddetail_service;
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
        this.bfilterPopulate_bodashboards = false;
        this.bfilterPopulate_bodashboarddetails = false;
        this.bodashboard_menuactions = [];
        this.bodashboarddetail_menuactions = [];
        this.dashboardid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_bodashboarddetail_IDs = "";
        this.bodashboarddetails_ID = "1";
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
        this.bodashboard_Form = this.fb.group({
            pk: [null],
            dashboardid: [null],
            dashboardiddesc: [null],
            dashboardname: [null],
            rows: [null],
            cols: [null],
            design: [null],
            remarks: [null],
            userid: [null],
            module: [null],
            helptext: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bodashboard_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bodashboard_Form.dirty && this.bodashboard_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.dashboardid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.dashboardid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.dashboardid && pkDetail) {
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
            let bodashboardid = null;
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
            this.formid = bodashboardid;
            //alert(bodashboardid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_bodashboarddetails_TableConfig();
                setTimeout(() => {
                    //this.Set_bodashboarddetails_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.bodashboard_service.getDefaultData().then(res => {
                this.dashboardid_List = res.list_dashboardid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bodashboard_service.get_bodashboards_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bodashboard_Form.markAsUntouched();
            this.bodashboard_Form.markAsPristine();
        });
    }
    onSelected_dashboardid(dashboardidDetail) {
        if (dashboardidDetail.value && dashboardidDetail) {
            this.bodashboard_Form.patchValue({
                dashboardid: dashboardidDetail.value,
                dashboardiddesc: dashboardidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.bodashboard_Form != null)
            this.bodashboard_Form.reset();
        this.bodashboard_Form.patchValue({});
        setTimeout(() => {
            this.bodashboarddetails_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let dashboardid = this.bodashboard_Form.get('dashboardid').value;
        if (dashboardid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bodashboard_service.delete_bodashboard(dashboardid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bodashboard_Form.patchValue({
            dashboardid: null
        });
        if (this.formData.dashboardid != null)
            this.formData.dashboardid = null;
        for (let i = 0; i < this.tbl_bodashboarddetails.source.length; i++) {
            this.tbl_bodashboarddetails.source[i].dashboarddetailid = null;
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
                        this.bodashboard_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bodashboard_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bodashboard_Form.controls[key] != undefined) {
                                this.bodashboard_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.dashboardname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.dashboardname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    dashboardid_onChange(evt) {
        let e = evt.value;
    }
    edit_bodashboards() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bodashboard_service.get_bodashboards_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bodashboard;
                let formproperty = res.bodashboard.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bodashboard.pkcol;
                this.formid = res.bodashboard.dashboardid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bodashboard;
        this.formid = res.bodashboard.dashboardid;
        this.pkcol = res.bodashboard.pkcol;
        this.bmyrecord = false;
        if (res.bodashboard.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bodashboard_Form.patchValue({
            dashboardid: res.bodashboard.dashboardid,
            dashboardiddesc: res.bodashboard.dashboardiddesc,
            dashboardname: res.bodashboard.dashboardname,
            rows: res.bodashboard.rows,
            cols: res.bodashboard.cols,
            design: res.bodashboard.design,
            remarks: res.bodashboard.remarks,
            userid: res.bodashboard.userid,
            module: res.bodashboard.module,
            helptext: res.bodashboard.helptext,
            status: res.bodashboard.status,
            statusdesc: res.bodashboard.statusdesc,
        });
        this.bodashboard_menuactions = res.bodashboard_menuactions;
        this.bodashboarddetail_menuactions = res.bodashboarddetail_menuactions;
        this.bodashboarddetails_visiblelist = res.bodashboarddetails_visiblelist;
        //Child Tables if any
        this.Set_bodashboarddetails_TableConfig();
        this.bodashboarddetails_LoadTable(res.bodashboarddetails);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bodashboard_Form.controls) {
            let val = this.bodashboard_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bodashboard_Form.controls[key] != null) {
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
            if (!this.bodashboard_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bodashboard_Form.getRawValue();
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
            // Object.keys(this.bodashboard_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bodashboard_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bodashboard_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bodashboard_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bodashboard_Form.controls[key] != null) {
                            this.formData[key] = this.bodashboard_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.Deleted_bodashboarddetail_IDs = this.Deleted_bodashboarddetail_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.bodashboard_service.saveOrUpdate_bodashboards(this.formData, (_b = (_a = this.tbl_bodashboarddetails) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_bodashboarddetails.source) {
                    for (let i = 0; i < this.tbl_bodashboarddetails.source.data.length; i++) {
                        if (this.tbl_bodashboarddetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_bodashboarddetails.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bodashboard);
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
                        this.objvalues.push(res.bodashboard);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bodashboard_Form.markAsUntouched();
                this.bodashboard_Form.markAsPristine();
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
        this.tbl_bodashboarddetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource();
    }
    AddOrEdit_bodashboarddetail(event, dashboarddetailid, dashboardid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_bodashboarddetail_bodashboarddetail_component__WEBPACK_IMPORTED_MODULE_3__.bodashboarddetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, dashboarddetailid, dashboardid, visiblelist: this.bodashboarddetails_visiblelist, hidelist: this.bodashboarddetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_bodashboarddetails.source.add(res[i]);
                    }
                    this.tbl_bodashboarddetails.source.refresh();
                }
                else {
                    this.tbl_bodashboarddetails.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_bodashboarddetail(event, childID, i) {
        if (childID != null)
            this.Deleted_bodashboarddetail_IDs += childID + ",";
        this.tbl_bodashboarddetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_bodashboarddetails_Checkbox() {
        debugger;
        if (this.tbl_bodashboarddetails.source.settings['selectMode'] == 'multi')
            this.tbl_bodashboarddetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_bodashboarddetails.source.settings['selectMode'] = 'multi';
        this.tbl_bodashboarddetails.source.initGrid();
    }
    delete_bodashboarddetails_All() {
        this.tbl_bodashboarddetails.source.settings['selectMode'] = 'single';
    }
    show_bodashboarddetails_Filter() {
        setTimeout(() => {
            //  this.Set_bodashboarddetails_TableDropDownConfig();
        });
        if (this.tbl_bodashboarddetails.source.settings != null)
            this.tbl_bodashboarddetails.source.settings['hideSubHeader'] = !this.tbl_bodashboarddetails.source.settings['hideSubHeader'];
        this.tbl_bodashboarddetails.source.initGrid();
    }
    show_bodashboarddetails_InActive() {
    }
    enable_bodashboarddetails_InActive() {
    }
    Set_bodashboarddetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_bodashboarddetails) {
                var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
                if (clone.columns['dashboardid'] != undefined)
                    clone.columns['dashboardid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_dashboardid.value)), }, };
                if (clone.columns['dashboardid'] != undefined)
                    clone.columns['dashboardid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_dashboardid.value)), }, };
                this.tbl_bodashboarddetails.source.settings = clone;
                this.tbl_bodashboarddetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
                if (clone.columns['charttype'] != undefined)
                    clone.columns['charttype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_charttype.value)), }, };
                if (clone.columns['charttype'] != undefined)
                    clone.columns['charttype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_charttype.value)), }, };
                this.tbl_bodashboarddetails.source.settings = clone;
                this.tbl_bodashboarddetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
                if (clone.columns['parameter1type'] != undefined)
                    clone.columns['parameter1type'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter1type.value)), }, };
                if (clone.columns['parameter1type'] != undefined)
                    clone.columns['parameter1type'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter1type.value)), }, };
                this.tbl_bodashboarddetails.source.settings = clone;
                this.tbl_bodashboarddetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
                if (clone.columns['parameter1datetype'] != undefined)
                    clone.columns['parameter1datetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter1datetype.value)), }, };
                if (clone.columns['parameter1datetype'] != undefined)
                    clone.columns['parameter1datetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter1datetype.value)), }, };
                this.tbl_bodashboarddetails.source.settings = clone;
                this.tbl_bodashboarddetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
                if (clone.columns['parameter2type'] != undefined)
                    clone.columns['parameter2type'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter2type.value)), }, };
                if (clone.columns['parameter2type'] != undefined)
                    clone.columns['parameter2type'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter2type.value)), }, };
                this.tbl_bodashboarddetails.source.settings = clone;
                this.tbl_bodashboarddetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
                if (clone.columns['parameter2datetype'] != undefined)
                    clone.columns['parameter2datetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter2datetype.value)), }, };
                if (clone.columns['parameter2datetype'] != undefined)
                    clone.columns['parameter2datetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter2datetype.value)), }, };
                this.tbl_bodashboarddetails.source.settings = clone;
                this.tbl_bodashboarddetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
                if (clone.columns['parameter3type'] != undefined)
                    clone.columns['parameter3type'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter3type.value)), }, };
                if (clone.columns['parameter3type'] != undefined)
                    clone.columns['parameter3type'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter3type.value)), }, };
                this.tbl_bodashboarddetails.source.settings = clone;
                this.tbl_bodashboarddetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
                if (clone.columns['parameter3datetype'] != undefined)
                    clone.columns['parameter3datetype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter3datetype.value)), }, };
                if (clone.columns['parameter3datetype'] != undefined)
                    clone.columns['parameter3datetype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_parameter3datetype.value)), }, };
                this.tbl_bodashboarddetails.source.settings = clone;
                this.tbl_bodashboarddetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
                if (clone.columns['menuid'] != undefined)
                    clone.columns['menuid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_menuid.value)), }, };
                if (clone.columns['menuid'] != undefined)
                    clone.columns['menuid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_menuid.value)), }, };
                this.tbl_bodashboarddetails.source.settings = clone;
                this.tbl_bodashboarddetails.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_bodashboarddetails.source.settings);
                if (clone.columns['reportid'] != undefined)
                    clone.columns['reportid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_reportid.value)), }, };
                if (clone.columns['reportid'] != undefined)
                    clone.columns['reportid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_bodashboarddetails_reportid.value)), }, };
                this.tbl_bodashboarddetails.source.settings = clone;
                this.tbl_bodashboarddetails.source.initGrid();
            }
            this.bfilterPopulate_bodashboarddetails = true;
        });
    }
    bodashboarddetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_bodashboarddetails_TableConfig() {
        this.bodashboarddetails_settings = {
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
                custom: this.bodashboarddetail_menuactions
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
                dashboardname: {
                    title: 'Dashboard Name',
                    type: '',
                    filter: true,
                },
                title: {
                    title: 'Title',
                    type: '',
                    filter: true,
                },
                row: {
                    title: 'Row',
                    type: 'number',
                    filter: true,
                },
                col: {
                    title: 'Col',
                    type: 'number',
                    filter: true,
                },
                charttypedesc: {
                    title: 'Chart Type',
                    type: 'html',
                    filter: true,
                },
                tablename: {
                    title: 'Table Name',
                    type: '',
                    filter: true,
                },
                recordname: {
                    title: 'Record Name',
                    type: '',
                    filter: true,
                },
                parameter: {
                    title: 'Parameter',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                name: {
                    title: 'Name',
                    type: '',
                    filter: true,
                },
                value: {
                    title: 'Value',
                    type: '',
                    filter: true,
                },
                parameter1variable: {
                    title: 'Parameter1 Variable',
                    type: '',
                    filter: true,
                },
                parameter1typedesc: {
                    title: 'Parameter1 Type',
                    type: 'html',
                    filter: true,
                },
                parameter1datetypedesc: {
                    title: 'Parameter1 Date Type',
                    type: 'html',
                    filter: true,
                },
                parameter2variable: {
                    title: 'Parameter2 Variable',
                    type: '',
                    filter: true,
                },
                parameter2typedesc: {
                    title: 'Parameter2 Type',
                    type: 'html',
                    filter: true,
                },
                parameter2datetypedesc: {
                    title: 'Parameter2 Date Type',
                    type: 'html',
                    filter: true,
                },
                parameter3variable: {
                    title: 'Parameter3 Variable',
                    type: '',
                    filter: true,
                },
                parameter3typedesc: {
                    title: 'Parameter3 Type',
                    type: 'html',
                    filter: true,
                },
                parameter3datetypedesc: {
                    title: 'Parameter3 Date Type',
                    type: 'html',
                    filter: true,
                },
                backgroundcolor: {
                    title: 'Background Color',
                    type: '',
                    filter: true,
                },
                hoverbackgroundcolor: {
                    title: 'Hover Background Color',
                    type: '',
                    filter: true,
                },
                bordercolor: {
                    title: 'Border Color',
                    type: '',
                    filter: true,
                },
                menuiddesc: {
                    title: 'Menu',
                    type: 'html',
                    filter: true,
                },
                reportiddesc: {
                    title: 'Report',
                    type: 'html',
                    filter: true,
                },
                helptext: {
                    title: 'Help Text',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
            },
        };
    }
    bodashboarddetails_LoadTable(bodashboarddetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bodashboarddetails_ID) >= 0) {
            if (this.tbl_bodashboarddetails != undefined)
                this.tbl_bodashboarddetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_12__.LocalDataSource();
            if (this.tbl_bodashboarddetails != undefined)
                this.tbl_bodashboarddetails.source.load(bodashboarddetails);
            if (this.tbl_bodashboarddetails != undefined)
                this.tbl_bodashboarddetails.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    bodashboarddetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.bodashboard_service.bodashboarddetails.length == 0)
    {
        this.tbl_bodashboarddetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new bodashboarddetail();
        this.bodashboard_service.bodashboarddetails.push(obj);
        this.tbl_bodashboarddetails.source.refresh();
        if ((this.bodashboard_service.bodashboarddetails.length / this.tbl_bodashboarddetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_bodashboarddetails.source.getPaging().page)
        {
            this.tbl_bodashboarddetails.source.setPage((this.bodashboard_service.bodashboarddetails.length / this.tbl_bodashboarddetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_bodashboarddetails.source.grid.edit(this.tbl_bodashboarddetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_bodashboarddetails.source.data.indexOf(event.data);
    this.onDelete_bodashboarddetail(event,event.data.dashboarddetailid,((this.tbl_bodashboarddetails.source.getPaging().page-1) *this.tbl_bodashboarddetails.source.getPaging().perPage)+index);
    this.tbl_bodashboarddetails.source.refresh();
    break;
    }
    }
    
    */
    bodashboarddetails_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_bodashboarddetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_bodashboarddetail(event, event.data.dashboarddetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_bodashboarddetail(event, event.data.dashboarddetailid, ((this.tbl_bodashboarddetails.source.getPaging().page - 1) * this.tbl_bodashboarddetails.source.getPaging().perPage) + event.index);
                this.tbl_bodashboarddetails.source.refresh();
                break;
        }
    }
    bodashboarddetails_onDelete(obj) {
        let dashboarddetailid = obj.data.dashboarddetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.bodashboard_service.delete_bodashboard(dashboarddetailid).then(res => this.bodashboarddetails_LoadTable());
        }
    }
    onCustom_bodashboarddetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "bodashboarddetails");
            let formname = objbomenuaction.actionname;
        });
    }
    bodashboarddetails_Paging(val) {
        debugger;
        this.tbl_bodashboarddetails.source.setPaging(1, val, true);
    }
    handle_bodashboarddetails_GridSelected(event) {
        this.bodashboarddetails_selectedindex = this.tbl_bodashboarddetails.source.findIndex(i => i.dashboarddetailid === event.data.dashboarddetailid);
    }
    Is_bodashboarddetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.bodashboarddetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
bodashboardComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_13__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_14__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_17__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_18__.DialogService },
    { type: _service_bodashboard_service__WEBPACK_IMPORTED_MODULE_1__.bodashboardService },
    { type: _service_bodashboarddetail_service__WEBPACK_IMPORTED_MODULE_4__.bodashboarddetailService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_19__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_20__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_16__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_21__.NgxSpinnerService }
];
bodashboardComponent.propDecorators = {
    tbl_bodashboarddetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['tbl_bodashboarddetails', { static: false },] }]
};
bodashboardComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-bodashboard',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bodashboard_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_15__.KeyboardShortcutsService]
    })
], bodashboardComponent);



/***/ }),

/***/ 8343:
/*!***************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bodashboard/bodashboard.module.ts ***!
  \***************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bodashboardModule": () => (/* binding */ bodashboardModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _bodashboard_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./bodashboard.routing */ 6742);
/* harmony import */ var _bodashboard_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./bodashboard.component */ 95872);
/* harmony import */ var _bodashboarddetail_bodashboarddetail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../bodashboarddetail/bodashboarddetail.component */ 16759);







let bodashboardModule = class bodashboardModule {
};
bodashboardModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _bodashboard_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_bodashboard_component__WEBPACK_IMPORTED_MODULE_3__.bodashboardComponent, _bodashboarddetail_bodashboarddetail_component__WEBPACK_IMPORTED_MODULE_4__.bodashboarddetailComponent],
        entryComponents: [_bodashboarddetail_bodashboarddetail_component__WEBPACK_IMPORTED_MODULE_4__.bodashboarddetailComponent]
    })
], bodashboardModule);



/***/ }),

/***/ 6742:
/*!****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bodashboard/bodashboard.routing.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _bodashboard_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./bodashboard.component */ 95872);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'bodashboards', children: [
            { path: '', component: _bodashboard_component__WEBPACK_IMPORTED_MODULE_0__.bodashboardComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _bodashboard_component__WEBPACK_IMPORTED_MODULE_0__.bodashboardComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _bodashboard_component__WEBPACK_IMPORTED_MODULE_0__.bodashboardComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _bodashboard_component__WEBPACK_IMPORTED_MODULE_0__.bodashboardComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 16759:
/*!******************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/bodashboarddetail/bodashboarddetail.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bodashboarddetailComponent": () => (/* binding */ bodashboarddetailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bodashboarddetail_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./bodashboarddetail.component.html */ 98763);
/* harmony import */ var _service_bodashboarddetail_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/bodashboarddetail.service */ 92592);
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

let bodashboarddetailComponent = class bodashboarddetailComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, bodashboarddetail_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.bodashboarddetail_service = bodashboarddetail_service;
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
        this.bfilterPopulate_bodashboarddetails = false;
        this.bodashboarddetail_menuactions = [];
        this.dashboardid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete
        this.menuid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete
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
        this.bodashboarddetail_Form = this.fb.group({
            pk: [null],
            dashboarddetailid: [null],
            dashboardid: [null],
            dashboardiddesc: [null],
            dashboardname: [null],
            title: [null],
            row: [null],
            col: [null],
            charttype: [null],
            charttypedesc: [null],
            tablename: [null],
            recordname: [null],
            parameter: [null],
            name: [null],
            value: [null],
            parameter1variable: [null],
            parameter1type: [null],
            parameter1typedesc: [null],
            parameter1datetype: [null],
            parameter1datetypedesc: [null],
            parameter2variable: [null],
            parameter2type: [null],
            parameter2typedesc: [null],
            parameter2datetype: [null],
            parameter2datetypedesc: [null],
            parameter3variable: [null],
            parameter3type: [null],
            parameter3typedesc: [null],
            parameter3datetype: [null],
            parameter3datetypedesc: [null],
            backgroundcolor: [null],
            hoverbackgroundcolor: [null],
            bordercolor: [null],
            menuid: [null],
            menuiddesc: [null],
            reportid: [null],
            reportiddesc: [null],
            helptext: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.bodashboarddetail_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.bodashboarddetail_Form.dirty && this.bodashboarddetail_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.dashboarddetailid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.dashboarddetailid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.dashboarddetailid && pkDetail) {
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
            let bodashboarddetailid = null;
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
            this.formid = bodashboarddetailid;
            //alert(bodashboarddetailid);
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
            this.bodashboarddetail_service.getDefaultData().then(res => {
                this.dashboardid_List = res.list_dashboardid.value;
                this.charttype_List = res.list_charttype.value;
                this.parameter1type_List = res.list_parameter1type.value;
                this.parameter1datetype_List = res.list_parameter1datetype.value;
                this.parameter2type_List = res.list_parameter2type.value;
                this.parameter2datetype_List = res.list_parameter2datetype.value;
                this.parameter3type_List = res.list_parameter3type.value;
                this.parameter3datetype_List = res.list_parameter3datetype.value;
                this.menuid_List = res.list_menuid.value;
                this.reportid_List = res.list_reportid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.bodashboarddetail_service.get_bodashboarddetails_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.bodashboarddetail_Form.markAsUntouched();
            this.bodashboarddetail_Form.markAsPristine();
        });
    }
    onSelected_dashboardid(dashboardidDetail) {
        if (dashboardidDetail.value && dashboardidDetail) {
            this.bodashboarddetail_Form.patchValue({
                dashboardid: dashboardidDetail.value,
                dashboardiddesc: dashboardidDetail.label,
            });
        }
    }
    onSelected_menuid(menuidDetail) {
        if (menuidDetail.value && menuidDetail) {
            this.bodashboarddetail_Form.patchValue({
                menuid: menuidDetail.value,
                menuiddesc: menuidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.bodashboarddetail_Form != null)
            this.bodashboarddetail_Form.reset();
        this.bodashboarddetail_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let dashboarddetailid = this.bodashboarddetail_Form.get('dashboarddetailid').value;
        if (dashboarddetailid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.bodashboarddetail_service.delete_bodashboarddetail(dashboarddetailid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.bodashboarddetail_Form.patchValue({
            dashboarddetailid: null
        });
        if (this.formData.dashboarddetailid != null)
            this.formData.dashboarddetailid = null;
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
                        this.bodashboarddetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.bodashboarddetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.bodashboarddetail_Form.controls[key] != undefined) {
                                this.bodashboarddetail_Form.controls[key].disable({ onlySelf: true });
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
    dashboardid_onChange(evt) {
        let e = evt.value;
    }
    charttype_onChange(evt) {
        let e = this.f.charttype.value;
        this.bodashboarddetail_Form.patchValue({ charttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter1type_onChange(evt) {
        let e = evt.value;
        this.bodashboarddetail_Form.patchValue({ parameter1typedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter1datetype_onChange(evt) {
        let e = this.f.parameter1datetype.value;
        this.bodashboarddetail_Form.patchValue({ parameter1datetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter2type_onChange(evt) {
        let e = evt.value;
        this.bodashboarddetail_Form.patchValue({ parameter2typedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter2datetype_onChange(evt) {
        let e = this.f.parameter2datetype.value;
        this.bodashboarddetail_Form.patchValue({ parameter2datetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter3type_onChange(evt) {
        let e = evt.value;
        this.bodashboarddetail_Form.patchValue({ parameter3typedesc: evt.options[evt.options.selectedIndex].text });
    }
    parameter3datetype_onChange(evt) {
        let e = this.f.parameter3datetype.value;
        this.bodashboarddetail_Form.patchValue({ parameter3datetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    menuid_onChange(evt) {
        let e = evt.value;
    }
    reportid_onChange(evt) {
        let e = this.f.reportid.value;
        this.bodashboarddetail_Form.patchValue({ reportiddesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_bodashboarddetails() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.bodashboarddetail_service.get_bodashboarddetails_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.bodashboarddetail;
                let formproperty = res.bodashboarddetail.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.bodashboarddetail.pkcol;
                this.formid = res.bodashboarddetail.dashboarddetailid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.bodashboarddetail;
        this.formid = res.bodashboarddetail.dashboarddetailid;
        this.pkcol = res.bodashboarddetail.pkcol;
        this.bmyrecord = false;
        if (res.bodashboarddetail.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.bodashboarddetail_Form.patchValue({
            dashboarddetailid: res.bodashboarddetail.dashboarddetailid,
            dashboardid: res.bodashboarddetail.dashboardid,
            dashboardiddesc: res.bodashboarddetail.dashboardiddesc,
            dashboardname: res.bodashboarddetail.dashboardname,
            title: res.bodashboarddetail.title,
            row: res.bodashboarddetail.row,
            col: res.bodashboarddetail.col,
            charttype: res.bodashboarddetail.charttype,
            charttypedesc: res.bodashboarddetail.charttypedesc,
            tablename: res.bodashboarddetail.tablename,
            recordname: res.bodashboarddetail.recordname,
            parameter: res.bodashboarddetail.parameter,
            name: res.bodashboarddetail.name,
            value: res.bodashboarddetail.value,
            parameter1variable: res.bodashboarddetail.parameter1variable,
            parameter1type: res.bodashboarddetail.parameter1type,
            parameter1typedesc: res.bodashboarddetail.parameter1typedesc,
            parameter1datetype: res.bodashboarddetail.parameter1datetype,
            parameter1datetypedesc: res.bodashboarddetail.parameter1datetypedesc,
            parameter2variable: res.bodashboarddetail.parameter2variable,
            parameter2type: res.bodashboarddetail.parameter2type,
            parameter2typedesc: res.bodashboarddetail.parameter2typedesc,
            parameter2datetype: res.bodashboarddetail.parameter2datetype,
            parameter2datetypedesc: res.bodashboarddetail.parameter2datetypedesc,
            parameter3variable: res.bodashboarddetail.parameter3variable,
            parameter3type: res.bodashboarddetail.parameter3type,
            parameter3typedesc: res.bodashboarddetail.parameter3typedesc,
            parameter3datetype: res.bodashboarddetail.parameter3datetype,
            parameter3datetypedesc: res.bodashboarddetail.parameter3datetypedesc,
            backgroundcolor: res.bodashboarddetail.backgroundcolor,
            hoverbackgroundcolor: res.bodashboarddetail.hoverbackgroundcolor,
            bordercolor: res.bodashboarddetail.bordercolor,
            menuid: res.bodashboarddetail.menuid,
            menuiddesc: res.bodashboarddetail.menuiddesc,
            reportid: res.bodashboarddetail.reportid,
            reportiddesc: res.bodashboarddetail.reportiddesc,
            helptext: res.bodashboarddetail.helptext,
            status: res.bodashboarddetail.status,
            statusdesc: res.bodashboarddetail.statusdesc,
        });
        this.bodashboarddetail_menuactions = res.bodashboarddetail_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.bodashboarddetail_Form.controls) {
            let val = this.bodashboarddetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.bodashboarddetail_Form.controls[key] != null) {
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
            if (!this.bodashboarddetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.bodashboarddetail_Form.getRawValue();
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
            // Object.keys(this.bodashboarddetail_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.bodashboarddetail_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.bodashboarddetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.bodashboarddetail_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.bodashboarddetail_Form.controls[key] != null) {
                            this.formData[key] = this.bodashboarddetail_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.bodashboarddetail_service.saveOrUpdate_bodashboarddetails(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.bodashboarddetail);
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
                        this.objvalues.push(res.bodashboarddetail);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.bodashboarddetail_Form.markAsUntouched();
                this.bodashboarddetail_Form.markAsPristine();
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
bodashboarddetailComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_bodashboarddetail_service__WEBPACK_IMPORTED_MODULE_1__.bodashboarddetailService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
bodashboarddetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-bodashboarddetail',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_bodashboarddetail_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], bodashboarddetailComponent);



/***/ }),

/***/ 57678:
/*!************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bodashboard.service.ts ***!
  \************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bodashboardService": () => (/* binding */ bodashboardService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let bodashboardService = class bodashboardService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bodashboards(formData, bodashboarddetails) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { bodashboarddetails: bodashboarddetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboard', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboard' + '/getdefaultdata').toPromise();
        }
    }
    get_bodashboards_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboard').toPromise();
        }
    }
    getListBy_dashboardid(dashboardid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboard' + '/dashboardid/' + dashboardid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboard' + '/param/' + key).toPromise();
        }
    }
    get_bodashboards_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboard' + '/e/' + id).toPromise();
        }
    }
    get_bodashboards_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboard' + '/' + id).toPromise();
        }
    }
    delete_bodashboard(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboard' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboard')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(bodashboard => new bodashboard(bodashboard.dashboardid, bodashboard.dashboardiddesc, bodashboard.dashboardname, bodashboard.rows, bodashboard.cols, bodashboard.design, bodashboard.remarks, bodashboard.userid, bodashboard.module, bodashboard.helptext, bodashboard.status, ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(bodashboard => bodashboard.dashboardname.includes(filter.name));
            return response;
        }));
    }
    getList_dashboardid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboard' + '/getList_dashboardid').toPromise();
    }
};
bodashboardService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bodashboardService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], bodashboardService);



/***/ }),

/***/ 92592:
/*!******************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/bodashboarddetail.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "bodashboarddetailService": () => (/* binding */ bodashboarddetailService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let bodashboarddetailService = class bodashboarddetailService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_bodashboarddetails(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboarddetail', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboarddetail' + '/getdefaultdata').toPromise();
        }
    }
    get_bodashboarddetails_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboarddetail').toPromise();
        }
    }
    getListBy_dashboarddetailid(dashboarddetailid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboarddetail' + '/dashboarddetailid/' + dashboarddetailid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboarddetail' + '/param/' + key).toPromise();
        }
    }
    get_bodashboarddetails_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboarddetail' + '/e/' + id).toPromise();
        }
    }
    get_bodashboarddetails_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboarddetail' + '/' + id).toPromise();
        }
    }
    delete_bodashboarddetail(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/bodashboarddetail' + '/' + id).toPromise();
        }
    }
    getList_dashboardid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_dashboardid').toPromise();
    }
    getList_charttype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_charttype/').toPromise();
    }
    getList_parameter1type() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter1type').toPromise();
    }
    getList_parameter1datetype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter1datetype/').toPromise();
    }
    getList_parameter2type() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter2type').toPromise();
    }
    getList_parameter2datetype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter2datetype/').toPromise();
    }
    getList_parameter3type() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter3type').toPromise();
    }
    getList_parameter3datetype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_parameter3datetype/').toPromise();
    }
    getList_menuid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_menuid').toPromise();
    }
    getList_reportid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/bodashboarddetail' + '/getList_reportid/').toPromise();
    }
};
bodashboarddetailService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
bodashboarddetailService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], bodashboarddetailService);



/***/ }),

/***/ 58944:
/*!***********************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bodashboard/bodashboard.component.html ***!
  \***********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bodashboard_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second bgcolor\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'bodashboards' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bodashboards()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bodashboard_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.dashboardid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.dashboardid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('dashboardname') == -1) && (dashboardnamevisible==undefined || dashboardnamevisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"dashboardname\" class=\"control-label\">Dashboard Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.dashboardname?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"dashboardname\"\r\n                  formControlName=\"dashboardname\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('rows') == -1) && (rowsvisible==undefined || rowsvisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <label for=\"rows\" class=\"control-label\">Rows</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.rows?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"rows\" formControlName=\"rows\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('cols') == -1) && (colsvisible==undefined || colsvisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <label for=\"cols\" class=\"control-label\">Cols</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.cols?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"cols\" formControlName=\"cols\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('design') == -1) && (designvisible==undefined || designvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"design\" class=\"control-label\">Design</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.design?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"design\"\r\n                  formControlName=\"design\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('remarks') == -1) && (remarksvisible==undefined || remarksvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"remarks\" class=\"control-label\">Remarks</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.remarks?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"remarks\"\r\n                  formControlName=\"remarks\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('userid') == -1) && (useridvisible==undefined || useridvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"userid\" class=\"control-label\">User</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.userid?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"userid\" formControlName=\"userid\" class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('module') == -1) && (modulevisible==undefined || modulevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"module\" class=\"control-label\">Module</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.module?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"module\" formControlName=\"module\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('helptext') == -1) && (helptextvisible==undefined || helptextvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"helptext\" class=\"control-label\">Help Text</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.helptext?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"helptext\"\r\n                  formControlName=\"helptext\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Dashboard Details</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table bodashboarddetails-->\r\n            <div [ngClass]=\"Is_bodashboarddetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Dashboard Details' | translate}}\r\n                <select class='child' id=\"bodashboarddetailsPagingdropdown\"\r\n                  (change)=\"bodashboarddetails_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"bodashboarddetailtoggleOption();bodashboarddetails_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showbodashboarddetailsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"bodashboarddetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_bodashboarddetails (userRowSelect)=\"handle_bodashboarddetails_GridSelected($event)\"\r\n                [settings]=\"bodashboarddetails_settings\" (custom)=\"onCustom_bodashboarddetails_Action($event)\"\r\n                [source]=\"tbl_bodashboarddetails?.source?.data\" (delete)=\"bodashboarddetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"bodashboarddetails_route($event,'delete')\"\r\n                (create)=\"bodashboarddetails_route($event,'create')\"\r\n                (createConfirm)=\"bodashboarddetails_beforesave($event)\" (edit)=\"bodashboarddetails_route($event,'edit')\"\r\n                (editConfirm)=\"bodashboarddetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table bodashboarddetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 98763:
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/bodashboarddetail/bodashboarddetail.component.html ***!
  \***********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"bodashboarddetail_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second bgcolor\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Dashboard Details' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_bodashboarddetails()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of bodashboarddetail_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.dashboarddetailid.value != null\" (afterAction)=\"afterAction($event)\"\r\n              [menuid]=\"p_menuid\" [value]=\"f.dashboarddetailid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n\r\n\r\n    <!--dashboardid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('dashboardid') == -1) && (dashboardidvisible==undefined || dashboardidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"dashboardid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_dashboardid(null)\">Dashboard</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"dashboardid_List\" [optionsEvent]=\"dashboardid_optionsEvent\"\r\n          [form]=\"bodashboard\" (selectItem)=\"onSelected_dashboardid($event)\" [reportid]='ybg3p' [menuid]='ybg3p'\r\n          formControlName=\"dashboardid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.dashboardiddesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('dashboardname') == -1) && (dashboardnamevisible==undefined || dashboardnamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"dashboardname\" class=\"control-label\">Dashboard Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.dashboardname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"dashboardname\" formControlName=\"dashboardname\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('title') == -1) && (titlevisible==undefined || titlevisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"title\" class=\"control-label\">Title</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.title?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"title\" formControlName=\"title\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('row') == -1) && (rowvisible==undefined || rowvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"row\" class=\"control-label\">Row</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.row?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"row\" formControlName=\"row\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('col') == -1) && (colvisible==undefined || colvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"col\" class=\"control-label\">Col</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.col?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"col\" formControlName=\"col\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--charttype-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('charttype') == -1) && (charttypevisible==undefined || charttypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"charttype\" class=\"control-label\">Chart Type</label>\r\n        <select *ngIf=\"!showview\" id=\"charttype\" (change)=\"charttype_onChange($event.target)\"\r\n          formControlName=\"charttype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of charttype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.charttypedesc?.value}}</label>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('tablename') == -1) && (tablenamevisible==undefined || tablenamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"tablename\" class=\"control-label\">Table Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.tablename?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"tablename\" formControlName=\"tablename\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('recordname') == -1) && (recordnamevisible==undefined || recordnamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"recordname\" class=\"control-label\">Record Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.recordname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"recordname\" formControlName=\"recordname\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('parameter') == -1) && (parametervisible==undefined || parametervisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"parameter\" class=\"control-label\">Parameter</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parameter?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"parameter\"\r\n          formControlName=\"parameter\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('name') == -1) && (namevisible==undefined || namevisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"name\" class=\"control-label\">Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.name?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"name\" formControlName=\"name\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('value') == -1) && (valuevisible==undefined || valuevisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"value\" class=\"control-label\">Value</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.value?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"value\" formControlName=\"value\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('parameter1variable') == -1) && (parameter1variablevisible==undefined || parameter1variablevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"parameter1variable\" class=\"control-label\">Parameter1 Variable</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parameter1variable?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"parameter1variable\" formControlName=\"parameter1variable\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--parameter1type-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('parameter1type') == -1) && (parameter1typevisible==undefined || parameter1typevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"parameter1type\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_parameter1type(null)\">Parameter1 Type</label>\r\n        <select *ngIf=\"!showview\" id=\"parameter1type\" (change)=\"parameter1type_onChange($event.target)\"\r\n          formControlName=\"parameter1type\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of parameter1type_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parameter1typedesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--parameter1datetype-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('parameter1datetype') == -1) && (parameter1datetypevisible==undefined || parameter1datetypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"parameter1datetype\" class=\"control-label\">Parameter1 Date Type</label>\r\n        <select *ngIf=\"!showview\" id=\"parameter1datetype\" (change)=\"parameter1datetype_onChange($event.target)\"\r\n          formControlName=\"parameter1datetype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of parameter1datetype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parameter1datetypedesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('parameter2variable') == -1) && (parameter2variablevisible==undefined || parameter2variablevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"parameter2variable\" class=\"control-label\">Parameter2 Variable</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parameter2variable?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"parameter2variable\" formControlName=\"parameter2variable\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--parameter2type-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('parameter2type') == -1) && (parameter2typevisible==undefined || parameter2typevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"parameter2type\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_parameter2type(null)\">Parameter2 Type</label>\r\n        <select *ngIf=\"!showview\" id=\"parameter2type\" (change)=\"parameter2type_onChange($event.target)\"\r\n          formControlName=\"parameter2type\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of parameter2type_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parameter2typedesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--parameter2datetype-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('parameter2datetype') == -1) && (parameter2datetypevisible==undefined || parameter2datetypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"parameter2datetype\" class=\"control-label\">Parameter2 Date Type</label>\r\n        <select *ngIf=\"!showview\" id=\"parameter2datetype\" (change)=\"parameter2datetype_onChange($event.target)\"\r\n          formControlName=\"parameter2datetype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of parameter2datetype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parameter2datetypedesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('parameter3variable') == -1) && (parameter3variablevisible==undefined || parameter3variablevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"parameter3variable\" class=\"control-label\">Parameter3 Variable</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parameter3variable?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"parameter3variable\" formControlName=\"parameter3variable\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--parameter3type-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('parameter3type') == -1) && (parameter3typevisible==undefined || parameter3typevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"parameter3type\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_parameter3type(null)\">Parameter3 Type</label>\r\n        <select *ngIf=\"!showview\" id=\"parameter3type\" (change)=\"parameter3type_onChange($event.target)\"\r\n          formControlName=\"parameter3type\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of parameter3type_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parameter3typedesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--parameter3datetype-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('parameter3datetype') == -1) && (parameter3datetypevisible==undefined || parameter3datetypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"parameter3datetype\" class=\"control-label\">Parameter3 Date Type</label>\r\n        <select *ngIf=\"!showview\" id=\"parameter3datetype\" (change)=\"parameter3datetype_onChange($event.target)\"\r\n          formControlName=\"parameter3datetype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of parameter3datetype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parameter3datetypedesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('backgroundcolor') == -1) && (backgroundcolorvisible==undefined || backgroundcolorvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"backgroundcolor\" class=\"control-label\">Background Color</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.backgroundcolor?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"backgroundcolor\" formControlName=\"backgroundcolor\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('hoverbackgroundcolor') == -1) && (hoverbackgroundcolorvisible==undefined || hoverbackgroundcolorvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"hoverbackgroundcolor\" class=\"control-label\">Hover Background Color</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.hoverbackgroundcolor?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"hoverbackgroundcolor\" formControlName=\"hoverbackgroundcolor\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('bordercolor') == -1) && (bordercolorvisible==undefined || bordercolorvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"bordercolor\" class=\"control-label\">Border Color</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.bordercolor?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"bordercolor\" formControlName=\"bordercolor\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--menuid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('menuid') == -1) && (menuidvisible==undefined || menuidvisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"menuid\" class=\"control-label\" (click)=\"AddOrEdit_menuid(null)\">Menu</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"menuid_List\" [optionsEvent]=\"menuid_optionsEvent\"\r\n          [form]=\"bomenumaster\" (selectItem)=\"onSelected_menuid($event)\" [reportid]='urtra' [menuid]='urtra'\r\n          formControlName=\"menuid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.menuiddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--reportid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('reportid') == -1) && (reportidvisible==undefined || reportidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"reportid\" class=\"control-label\">Report</label>\r\n        <select *ngIf=\"!showview\" id=\"reportid\" (change)=\"reportid_onChange($event.target)\" formControlName=\"reportid\"\r\n          class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of reportid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.reportiddesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('helptext') == -1) && (helptextvisible==undefined || helptextvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"helptext\" class=\"control-label\">Help Text</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.helptext?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"helptext\"\r\n          formControlName=\"helptext\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_bodashboard_bodashboard_module_ts.js.map