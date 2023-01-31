"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_boreport_boreport_module_ts"],{

/***/ 88830:
/*!************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreport/boreport.component.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportComponent": () => (/* binding */ boreportComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boreport_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boreport.component.html */ 72809);
/* harmony import */ var _service_boreport_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/boreport.service */ 54979);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_boreportdetail_boreportdetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./../../../pages/forms/boreportdetail/boreportdetail.component */ 61005);
/* harmony import */ var _service_boreportdetail_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../service/boreportdetail.service */ 53045);
/* harmony import */ var _pages_forms_boreportothertable_boreportothertable_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/boreportothertable/boreportothertable.component */ 46482);
/* harmony import */ var _service_boreportothertable_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/boreportothertable.service */ 44853);
/* harmony import */ var _pages_forms_boreportcolumn_boreportcolumn_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/boreportcolumn/boreportcolumn.component */ 33062);
/* harmony import */ var _service_boreportcolumn_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../service/boreportcolumn.service */ 18089);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);










//Shortcuts

//translator









//primeng services



//session,application constants




//custom fields & attachments

let boreportComponent = class boreportComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, boreport_service, boreportdetail_service, boreportothertable_service, boreportcolumn_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.boreport_service = boreport_service;
        this.boreportdetail_service = boreportdetail_service;
        this.boreportothertable_service = boreportothertable_service;
        this.boreportcolumn_service = boreportcolumn_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_boreports = false;
        this.bfilterPopulate_boreportdetails = false;
        this.bfilterPopulate_boreportothertables = false;
        this.bfilterPopulate_boreportcolumns = false;
        this.boreport_menuactions = [];
        this.boreportdetail_menuactions = [];
        this.boreportothertable_menuactions = [];
        this.boreportcolumn_menuactions = [];
        this.dashboardid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_boreportdetail_IDs = "";
        this.boreportdetails_ID = "1";
        this.Deleted_boreportothertable_IDs = "";
        this.boreportothertables_ID = "2";
        this.Deleted_boreportcolumn_IDs = "";
        this.boreportcolumns_ID = "3";
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
        this.boreport_Form = this.fb.group({
            reportid: [null],
            reportcode: [null],
            actionkey: [null],
            reportname: [null],
            reportmodule: [null],
            reportmoduledesc: [null],
            reporttype: [null],
            reporttypedesc: [null],
            columns: [null],
            sidefilter: [null],
            sidefilters: [null],
            maintablename: [null],
            maintablealias: [null],
            maintableidentityfield: [null],
            pk: [null],
            query: [null],
            wherecondition: [null],
            cardtype: [null],
            html: [null],
            calendar: [null],
            kanbanview: [null],
            kanbankey: [null],
            datefilter: [null],
            datefiltercolumnname: [null],
            datefiltertype: [null],
            datefiltertypedesc: [null],
            groupby: [null],
            groupbytext: [null],
            groupby2: [null],
            groupby2text: [null],
            groupbyrelationship: [null],
            groupbyrelationshipdesc: [null],
            sortby1: [null],
            sortby2: [null],
            sortby3: [null],
            parentid: [null],
            parentdescription: [null],
            detailtablename: [null],
            detailtablealias: [null],
            jointype: [null],
            jointypedesc: [null],
            detailtableidentityfield: [null],
            detailtablefk: [null],
            detailtableconcatenate: [null],
            detailtableheader: [null],
            detailtablefooter: [null],
            detailtablequery: [null],
            masterdetailwhere: [null],
            numrows: [null],
            reportoutputtype: [null],
            reportoutputtypedesc: [null],
            noheader: [null],
            header: [null],
            footer: [null],
            headerquery: [null],
            footerquery: [null],
            headerquery1: [null],
            footerquery1: [null],
            headerquery2: [null],
            footerquery2: [null],
            headerquery3: [null],
            footerquery3: [null],
            headerquery4: [null],
            footerquery4: [null],
            headerquery5: [null],
            footerquery5: [null],
            header1: [null],
            footer1: [null],
            header2: [null],
            footer2: [null],
            header3: [null],
            footer3: [null],
            header4: [null],
            footer4: [null],
            header5: [null],
            footer5: [null],
            status: [null],
            statusdesc: [null],
            css: [null],
            viewhtmltype: [null],
            viewhtmltypedesc: [null],
            viewhtml: [null],
            viewcss: [null],
            reporthtml: [null],
            workflowhtmltype: [null],
            workflowhtmltypedesc: [null],
            workflowhtml: [null],
            component: [null],
            alternateview: [null],
            recordtype: [null],
            recordtypedesc: [null],
            userfield: [null],
            employeefield: [null],
            userfiltertype: [null],
            rolefield: [null],
            dashboardid: [null],
            dashboardiddesc: [null],
            tableheader: [null],
            reportjsondata: [null],
            helptext: [null],
            filters: [null],
            filtercolumns: [null],
        });
    }
    get f() { return this.boreport_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.boreport_Form.dirty && this.boreport_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.reportid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.reportid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.reportid && pkDetail) {
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
            let boreportid = null;
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
            this.formid = boreportid;
            //alert(boreportid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_boreportdetails_TableConfig();
                setTimeout(() => {
                    //this.Set_boreportdetails_TableDropDownConfig();
                });
                this.Set_boreportothertables_TableConfig();
                setTimeout(() => {
                    //this.Set_boreportothertables_TableDropDownConfig();
                });
                this.Set_boreportcolumns_TableConfig();
                setTimeout(() => {
                    //this.Set_boreportcolumns_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.boreport_service.getDefaultData().then(res => {
                this.reportmodule_List = res.list_reportmodule.value;
                this.reporttype_List = res.list_reporttype.value;
                this.datefiltertype_List = res.list_datefiltertype.value;
                this.groupbyrelationship_List = res.list_groupbyrelationship.value;
                this.jointype_List = res.list_jointype.value;
                this.reportoutputtype_List = res.list_reportoutputtype.value;
                this.viewhtmltype_List = res.list_viewhtmltype.value;
                this.workflowhtmltype_List = res.list_workflowhtmltype.value;
                this.recordtype_List = res.list_recordtype.value;
                this.dashboardid_List = res.list_dashboardid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.boreport_service.get_boreports_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.boreport_Form.markAsUntouched();
            this.boreport_Form.markAsPristine();
        });
    }
    onSelected_dashboardid(dashboardidDetail) {
        if (dashboardidDetail.value && dashboardidDetail) {
            this.boreport_Form.patchValue({
                dashboardid: dashboardidDetail.value,
                dashboardiddesc: dashboardidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.boreport_Form != null)
            this.boreport_Form.reset();
        this.boreport_Form.patchValue({});
        setTimeout(() => {
            this.boreportdetails_LoadTable();
            this.boreportothertables_LoadTable();
            this.boreportcolumns_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let reportid = this.boreport_Form.get('reportid').value;
        if (reportid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boreport_service.delete_boreport(reportid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boreport_Form.patchValue({
            reportid: null
        });
        if (this.formData.reportid != null)
            this.formData.reportid = null;
        for (let i = 0; i < this.tbl_boreportdetails.source.length; i++) {
            this.tbl_boreportdetails.source[i].reportdetailid = null;
        }
        for (let i = 0; i < this.tbl_boreportothertables.source.length; i++) {
            this.tbl_boreportothertables.source[i].othertableid = null;
        }
        for (let i = 0; i < this.tbl_boreportcolumns.source.length; i++) {
            this.tbl_boreportcolumns.source[i].reportcolumnid = null;
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
                        this.boreport_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boreport_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boreport_Form.controls[key] != undefined) {
                                this.boreport_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.reportname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.reportname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    reportmodule_onChange(evt) {
        let e = this.f.reportmodule.value;
        this.boreport_Form.patchValue({ reportmoduledesc: evt.options[evt.options.selectedIndex].text });
    }
    reporttype_onChange(evt) {
        let e = this.f.reporttype.value;
        this.boreport_Form.patchValue({ reporttypedesc: evt.options[evt.options.selectedIndex].text });
    }
    datefiltertype_onChange(evt) {
        let e = this.f.datefiltertype.value;
        this.boreport_Form.patchValue({ datefiltertypedesc: evt.options[evt.options.selectedIndex].text });
    }
    groupbyrelationship_onChange(evt) {
        let e = this.f.groupbyrelationship.value;
        this.boreport_Form.patchValue({ groupbyrelationshipdesc: evt.options[evt.options.selectedIndex].text });
    }
    jointype_onChange(evt) {
        let e = this.f.jointype.value;
        this.boreport_Form.patchValue({ jointypedesc: evt.options[evt.options.selectedIndex].text });
    }
    reportoutputtype_onChange(evt) {
        let e = this.f.reportoutputtype.value;
        this.boreport_Form.patchValue({ reportoutputtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    viewhtmltype_onChange(evt) {
        let e = this.f.viewhtmltype.value;
        this.boreport_Form.patchValue({ viewhtmltypedesc: evt.options[evt.options.selectedIndex].text });
    }
    workflowhtmltype_onChange(evt) {
        let e = this.f.workflowhtmltype.value;
        this.boreport_Form.patchValue({ workflowhtmltypedesc: evt.options[evt.options.selectedIndex].text });
    }
    recordtype_onChange(evt) {
        let e = this.f.recordtype.value;
        this.boreport_Form.patchValue({ recordtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    dashboardid_onChange(evt) {
        let e = evt.value;
    }
    edit_boreports() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.boreport_service.get_boreports_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.boreport;
                let formproperty = res.boreport.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.boreport.pkcol;
                this.formid = res.boreport.reportid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.boreport;
        this.formid = res.boreport.reportid;
        this.pkcol = res.boreport.pkcol;
        this.bmyrecord = false;
        if (res.boreport.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boreport_Form.patchValue({
            reportid: res.boreport.reportid,
            reportcode: res.boreport.reportcode,
            actionkey: res.boreport.actionkey,
            reportname: res.boreport.reportname,
            reportmodule: res.boreport.reportmodule,
            reportmoduledesc: res.boreport.reportmoduledesc,
            reporttype: res.boreport.reporttype,
            reporttypedesc: res.boreport.reporttypedesc,
            columns: res.boreport.columns,
            sidefilter: res.boreport.sidefilter,
            sidefilters: res.boreport.sidefilters,
            maintablename: res.boreport.maintablename,
            maintablealias: res.boreport.maintablealias,
            maintableidentityfield: res.boreport.maintableidentityfield,
            pk: res.boreport.pk,
            query: res.boreport.query,
            wherecondition: res.boreport.wherecondition,
            cardtype: res.boreport.cardtype,
            html: res.boreport.html,
            calendar: res.boreport.calendar,
            kanbanview: res.boreport.kanbanview,
            kanbankey: res.boreport.kanbankey,
            datefilter: res.boreport.datefilter,
            datefiltercolumnname: res.boreport.datefiltercolumnname,
            datefiltertype: res.boreport.datefiltertype,
            datefiltertypedesc: res.boreport.datefiltertypedesc,
            groupby: res.boreport.groupby,
            groupbytext: res.boreport.groupbytext,
            groupby2: res.boreport.groupby2,
            groupby2text: res.boreport.groupby2text,
            groupbyrelationship: res.boreport.groupbyrelationship,
            groupbyrelationshipdesc: res.boreport.groupbyrelationshipdesc,
            sortby1: res.boreport.sortby1,
            sortby2: res.boreport.sortby2,
            sortby3: res.boreport.sortby3,
            parentid: res.boreport.parentid,
            parentdescription: res.boreport.parentdescription,
            detailtablename: res.boreport.detailtablename,
            detailtablealias: res.boreport.detailtablealias,
            jointype: res.boreport.jointype,
            jointypedesc: res.boreport.jointypedesc,
            detailtableidentityfield: res.boreport.detailtableidentityfield,
            detailtablefk: res.boreport.detailtablefk,
            detailtableconcatenate: res.boreport.detailtableconcatenate,
            detailtableheader: res.boreport.detailtableheader,
            detailtablefooter: res.boreport.detailtablefooter,
            detailtablequery: res.boreport.detailtablequery,
            masterdetailwhere: res.boreport.masterdetailwhere,
            numrows: res.boreport.numrows,
            reportoutputtype: res.boreport.reportoutputtype,
            reportoutputtypedesc: res.boreport.reportoutputtypedesc,
            noheader: res.boreport.noheader,
            header: res.boreport.header,
            footer: res.boreport.footer,
            headerquery: res.boreport.headerquery,
            footerquery: res.boreport.footerquery,
            headerquery1: res.boreport.headerquery1,
            footerquery1: res.boreport.footerquery1,
            headerquery2: res.boreport.headerquery2,
            footerquery2: res.boreport.footerquery2,
            headerquery3: res.boreport.headerquery3,
            footerquery3: res.boreport.footerquery3,
            headerquery4: res.boreport.headerquery4,
            footerquery4: res.boreport.footerquery4,
            headerquery5: res.boreport.headerquery5,
            footerquery5: res.boreport.footerquery5,
            header1: res.boreport.header1,
            footer1: res.boreport.footer1,
            header2: res.boreport.header2,
            footer2: res.boreport.footer2,
            header3: res.boreport.header3,
            footer3: res.boreport.footer3,
            header4: res.boreport.header4,
            footer4: res.boreport.footer4,
            header5: res.boreport.header5,
            footer5: res.boreport.footer5,
            status: res.boreport.status,
            statusdesc: res.boreport.statusdesc,
            css: res.boreport.css,
            viewhtmltype: res.boreport.viewhtmltype,
            viewhtmltypedesc: res.boreport.viewhtmltypedesc,
            viewhtml: res.boreport.viewhtml,
            viewcss: res.boreport.viewcss,
            reporthtml: res.boreport.reporthtml,
            workflowhtmltype: res.boreport.workflowhtmltype,
            workflowhtmltypedesc: res.boreport.workflowhtmltypedesc,
            workflowhtml: res.boreport.workflowhtml,
            component: res.boreport.component,
            alternateview: res.boreport.alternateview,
            recordtype: res.boreport.recordtype,
            recordtypedesc: res.boreport.recordtypedesc,
            userfield: res.boreport.userfield,
            employeefield: res.boreport.employeefield,
            userfiltertype: res.boreport.userfiltertype,
            rolefield: res.boreport.rolefield,
            dashboardid: res.boreport.dashboardid,
            dashboardiddesc: res.boreport.dashboardiddesc,
            tableheader: res.boreport.tableheader,
            reportjsondata: res.boreport.reportjsondata,
            helptext: res.boreport.helptext,
            filters: res.boreport.filters,
            filtercolumns: res.boreport.filtercolumns,
        });
        this.boreport_menuactions = res.boreport_menuactions;
        this.boreportdetail_menuactions = res.boreportdetail_menuactions;
        this.boreportdetails_visiblelist = res.boreportdetails_visiblelist;
        this.boreportothertable_menuactions = res.boreportothertable_menuactions;
        this.boreportothertables_visiblelist = res.boreportothertables_visiblelist;
        this.boreportcolumn_menuactions = res.boreportcolumn_menuactions;
        this.boreportcolumns_visiblelist = res.boreportcolumns_visiblelist;
        //Child Tables if any
        this.Set_boreportdetails_TableConfig();
        this.boreportdetails_LoadTable(res.boreportdetails);
        this.Set_boreportothertables_TableConfig();
        this.boreportothertables_LoadTable(res.boreportothertables);
        this.Set_boreportcolumns_TableConfig();
        this.boreportcolumns_LoadTable(res.boreportcolumns);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.boreport_Form.controls) {
            let val = this.boreport_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.boreport_Form.controls[key] != null) {
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
            if (!this.boreport_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.boreport_Form.getRawValue();
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
        var _a, _b, _c, _d, _e, _f;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.boreport_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.boreport_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.boreport_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.boreport_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.boreport_Form.controls[key] != null) {
                            this.formData[key] = this.boreport_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.Deleted_boreportdetail_IDs = this.Deleted_boreportdetail_IDs;
            this.formData.Deleted_boreportothertable_IDs = this.Deleted_boreportothertable_IDs;
            this.formData.Deleted_boreportcolumn_IDs = this.Deleted_boreportcolumn_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.boreport_service.saveOrUpdate_boreports(this.formData, (_b = (_a = this.tbl_boreportdetails) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_boreportothertables) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data, (_f = (_e = this.tbl_boreportcolumns) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_boreportdetails.source) {
                    for (let i = 0; i < this.tbl_boreportdetails.source.data.length; i++) {
                        if (this.tbl_boreportdetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_boreportdetails.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_boreportothertables.source) {
                    for (let i = 0; i < this.tbl_boreportothertables.source.data.length; i++) {
                        if (this.tbl_boreportothertables.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_boreportothertables.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_boreportcolumns.source) {
                    for (let i = 0; i < this.tbl_boreportcolumns.source.data.length; i++) {
                        if (this.tbl_boreportcolumns.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_boreportcolumns.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.boreport);
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
                        this.objvalues.push(res.boreport);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boreport_Form.markAsUntouched();
                this.boreport_Form.markAsPristine();
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
        this.tbl_boreportdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
        this.tbl_boreportothertables.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
        this.tbl_boreportcolumns.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
    }
    AddOrEdit_boreportdetail(event, reportdetailid, reportid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_boreportdetail_boreportdetail_component__WEBPACK_IMPORTED_MODULE_3__.boreportdetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, reportdetailid, reportid, visiblelist: this.boreportdetails_visiblelist, hidelist: this.boreportdetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boreportdetails.source.add(res[i]);
                    }
                    this.tbl_boreportdetails.source.refresh();
                }
                else {
                    this.tbl_boreportdetails.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_boreportdetail(event, childID, i) {
        if (childID != null)
            this.Deleted_boreportdetail_IDs += childID + ",";
        this.tbl_boreportdetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_boreportothertable(event, othertableid, reportid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_boreportothertable_boreportothertable_component__WEBPACK_IMPORTED_MODULE_5__.boreportothertableComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, othertableid, reportid, visiblelist: this.boreportothertables_visiblelist, hidelist: this.boreportothertables_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boreportothertables.source.add(res[i]);
                    }
                    this.tbl_boreportothertables.source.refresh();
                }
                else {
                    this.tbl_boreportothertables.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_boreportothertable(event, childID, i) {
        if (childID != null)
            this.Deleted_boreportothertable_IDs += childID + ",";
        this.tbl_boreportothertables.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_boreportcolumn(event, reportcolumnid, reportid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_boreportcolumn_boreportcolumn_component__WEBPACK_IMPORTED_MODULE_7__.boreportcolumnComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, reportcolumnid, reportid, visiblelist: this.boreportcolumns_visiblelist, hidelist: this.boreportcolumns_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boreportcolumns.source.add(res[i]);
                    }
                    this.tbl_boreportcolumns.source.refresh();
                }
                else {
                    this.tbl_boreportcolumns.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_boreportcolumn(event, childID, i) {
        if (childID != null)
            this.Deleted_boreportcolumn_IDs += childID + ",";
        this.tbl_boreportcolumns.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    MakeAllHide() {
        /*for(let i=0;i<this.boreportservice.boreportcolumns.length;i++)
        {
            this.boreportservice.boreportcolumns[i].hide=true;
        }
        */
        // this.onSubmitData(false);
        this.router.navigate(['/home/corporatedashboard']);
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_boreportdetails_Checkbox() {
        debugger;
        if (this.tbl_boreportdetails.source.settings['selectMode'] == 'multi')
            this.tbl_boreportdetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_boreportdetails.source.settings['selectMode'] = 'multi';
        this.tbl_boreportdetails.source.initGrid();
    }
    delete_boreportdetails_All() {
        this.tbl_boreportdetails.source.settings['selectMode'] = 'single';
    }
    show_boreportdetails_Filter() {
        setTimeout(() => {
            //  this.Set_boreportdetails_TableDropDownConfig();
        });
        if (this.tbl_boreportdetails.source.settings != null)
            this.tbl_boreportdetails.source.settings['hideSubHeader'] = !this.tbl_boreportdetails.source.settings['hideSubHeader'];
        this.tbl_boreportdetails.source.initGrid();
    }
    show_boreportdetails_InActive() {
    }
    enable_boreportdetails_InActive() {
    }
    Set_boreportdetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_boreportdetails) {
                var clone = this.sharedService.clone(this.tbl_boreportdetails.source.settings);
                if (clone.columns['separator'] != undefined)
                    clone.columns['separator'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportdetails_separator.value)), }, };
                if (clone.columns['separator'] != undefined)
                    clone.columns['separator'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportdetails_separator.value)), }, };
                this.tbl_boreportdetails.source.settings = clone;
                this.tbl_boreportdetails.source.initGrid();
            }
            this.bfilterPopulate_boreportdetails = true;
        });
    }
    boreportdetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_boreportdetails_TableConfig() {
        this.boreportdetails_settings = {
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
                custom: this.boreportdetail_menuactions
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
                tablename: {
                    title: 'Table Name',
                    type: '',
                    filter: true,
                },
                formula: {
                    title: 'Formula',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                separatordesc: {
                    title: 'Separator',
                    type: 'html',
                    filter: true,
                },
                header: {
                    title: 'Header',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                footer: {
                    title: 'Footer',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                wherecondition: {
                    title: 'Where Condition',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                alias: {
                    title: 'Alias',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    boreportdetails_LoadTable(boreportdetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportdetails_ID) >= 0) {
            if (this.tbl_boreportdetails != undefined)
                this.tbl_boreportdetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
            if (this.tbl_boreportdetails != undefined)
                this.tbl_boreportdetails.source.load(boreportdetails);
            if (this.tbl_boreportdetails != undefined)
                this.tbl_boreportdetails.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    boreportdetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boreport_service.boreportdetails.length == 0)
    {
        this.tbl_boreportdetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boreportdetail();
        this.boreport_service.boreportdetails.push(obj);
        this.tbl_boreportdetails.source.refresh();
        if ((this.boreport_service.boreportdetails.length / this.tbl_boreportdetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boreportdetails.source.getPaging().page)
        {
            this.tbl_boreportdetails.source.setPage((this.boreport_service.boreportdetails.length / this.tbl_boreportdetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boreportdetails.source.grid.edit(this.tbl_boreportdetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boreportdetails.source.data.indexOf(event.data);
    this.onDelete_boreportdetail(event,event.data.reportdetailid,((this.tbl_boreportdetails.source.getPaging().page-1) *this.tbl_boreportdetails.source.getPaging().perPage)+index);
    this.tbl_boreportdetails.source.refresh();
    break;
    }
    }
    
    */
    boreportdetails_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_boreportdetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boreportdetail(event, event.data.reportdetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_boreportdetail(event, event.data.reportdetailid, ((this.tbl_boreportdetails.source.getPaging().page - 1) * this.tbl_boreportdetails.source.getPaging().perPage) + event.index);
                this.tbl_boreportdetails.source.refresh();
                break;
        }
    }
    boreportdetails_onDelete(obj) {
        let reportdetailid = obj.data.reportdetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boreport_service.delete_boreport(reportdetailid).then(res => this.boreportdetails_LoadTable());
        }
    }
    onCustom_boreportdetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "boreportdetails");
            let formname = objbomenuaction.actionname;
        });
    }
    boreportdetails_Paging(val) {
        debugger;
        this.tbl_boreportdetails.source.setPaging(1, val, true);
    }
    handle_boreportdetails_GridSelected(event) {
        this.boreportdetails_selectedindex = this.tbl_boreportdetails.source.findIndex(i => i.reportdetailid === event.data.reportdetailid);
    }
    Is_boreportdetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportdetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_boreportothertables_Checkbox() {
        debugger;
        if (this.tbl_boreportothertables.source.settings['selectMode'] == 'multi')
            this.tbl_boreportothertables.source.settings['selectMode'] = 'single';
        else
            this.tbl_boreportothertables.source.settings['selectMode'] = 'multi';
        this.tbl_boreportothertables.source.initGrid();
    }
    delete_boreportothertables_All() {
        this.tbl_boreportothertables.source.settings['selectMode'] = 'single';
    }
    show_boreportothertables_Filter() {
        setTimeout(() => {
            //  this.Set_boreportothertables_TableDropDownConfig();
        });
        if (this.tbl_boreportothertables.source.settings != null)
            this.tbl_boreportothertables.source.settings['hideSubHeader'] = !this.tbl_boreportothertables.source.settings['hideSubHeader'];
        this.tbl_boreportothertables.source.initGrid();
    }
    show_boreportothertables_InActive() {
    }
    enable_boreportothertables_InActive() {
    }
    Set_boreportothertables_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_boreportothertables) {
                var clone = this.sharedService.clone(this.tbl_boreportothertables.source.settings);
                if (clone.columns['jointype'] != undefined)
                    clone.columns['jointype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportothertables_jointype.value)), }, };
                if (clone.columns['jointype'] != undefined)
                    clone.columns['jointype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportothertables_jointype.value)), }, };
                this.tbl_boreportothertables.source.settings = clone;
                this.tbl_boreportothertables.source.initGrid();
            }
            this.bfilterPopulate_boreportothertables = true;
        });
    }
    boreportothertables_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_boreportothertables_TableConfig() {
        this.boreportothertables_settings = {
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
                custom: this.boreportothertable_menuactions
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
                tablename: {
                    title: 'Table Name',
                    type: '',
                    filter: true,
                },
                tablealias: {
                    title: 'Table Alias',
                    type: '',
                    filter: true,
                },
                jointypedesc: {
                    title: 'Join Type',
                    type: 'html',
                    filter: true,
                },
                wherecondition: {
                    title: 'Where Condition',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
            },
        };
    }
    boreportothertables_LoadTable(boreportothertables = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportothertables_ID) >= 0) {
            if (this.tbl_boreportothertables != undefined)
                this.tbl_boreportothertables.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
            if (this.tbl_boreportothertables != undefined)
                this.tbl_boreportothertables.source.load(boreportothertables);
            if (this.tbl_boreportothertables != undefined)
                this.tbl_boreportothertables.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    boreportothertables_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boreport_service.boreportothertables.length == 0)
    {
        this.tbl_boreportothertables.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boreportothertable();
        this.boreport_service.boreportothertables.push(obj);
        this.tbl_boreportothertables.source.refresh();
        if ((this.boreport_service.boreportothertables.length / this.tbl_boreportothertables.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boreportothertables.source.getPaging().page)
        {
            this.tbl_boreportothertables.source.setPage((this.boreport_service.boreportothertables.length / this.tbl_boreportothertables.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boreportothertables.source.grid.edit(this.tbl_boreportothertables.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boreportothertables.source.data.indexOf(event.data);
    this.onDelete_boreportothertable(event,event.data.othertableid,((this.tbl_boreportothertables.source.getPaging().page-1) *this.tbl_boreportothertables.source.getPaging().perPage)+index);
    this.tbl_boreportothertables.source.refresh();
    break;
    }
    }
    
    */
    boreportothertables_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_boreportothertable(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boreportothertable(event, event.data.othertableid, this.formid);
                break;
            case 'delete':
                this.onDelete_boreportothertable(event, event.data.othertableid, ((this.tbl_boreportothertables.source.getPaging().page - 1) * this.tbl_boreportothertables.source.getPaging().perPage) + event.index);
                this.tbl_boreportothertables.source.refresh();
                break;
        }
    }
    boreportothertables_onDelete(obj) {
        let othertableid = obj.data.othertableid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boreport_service.delete_boreport(othertableid).then(res => this.boreportothertables_LoadTable());
        }
    }
    onCustom_boreportothertables_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "boreportothertables");
            let formname = objbomenuaction.actionname;
        });
    }
    boreportothertables_Paging(val) {
        debugger;
        this.tbl_boreportothertables.source.setPaging(1, val, true);
    }
    handle_boreportothertables_GridSelected(event) {
        this.boreportothertables_selectedindex = this.tbl_boreportothertables.source.findIndex(i => i.othertableid === event.data.othertableid);
    }
    Is_boreportothertables_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportothertables_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_boreportcolumns_Checkbox() {
        debugger;
        if (this.tbl_boreportcolumns.source.settings['selectMode'] == 'multi')
            this.tbl_boreportcolumns.source.settings['selectMode'] = 'single';
        else
            this.tbl_boreportcolumns.source.settings['selectMode'] = 'multi';
        this.tbl_boreportcolumns.source.initGrid();
    }
    delete_boreportcolumns_All() {
        this.tbl_boreportcolumns.source.settings['selectMode'] = 'single';
    }
    show_boreportcolumns_Filter() {
        setTimeout(() => {
            //  this.Set_boreportcolumns_TableDropDownConfig();
        });
        if (this.tbl_boreportcolumns.source.settings != null)
            this.tbl_boreportcolumns.source.settings['hideSubHeader'] = !this.tbl_boreportcolumns.source.settings['hideSubHeader'];
        this.tbl_boreportcolumns.source.initGrid();
    }
    show_boreportcolumns_InActive() {
    }
    enable_boreportcolumns_InActive() {
    }
    Set_boreportcolumns_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_boreportcolumns) {
                var clone = this.sharedService.clone(this.tbl_boreportcolumns.source.settings);
                if (clone.columns['datatype'] != undefined)
                    clone.columns['datatype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportcolumns_datatype.value)), }, };
                if (clone.columns['datatype'] != undefined)
                    clone.columns['datatype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportcolumns_datatype.value)), }, };
                this.tbl_boreportcolumns.source.settings = clone;
                this.tbl_boreportcolumns.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boreportcolumns.source.settings);
                if (clone.columns['filtertype'] != undefined)
                    clone.columns['filtertype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportcolumns_filtertype.value)), }, };
                if (clone.columns['filtertype'] != undefined)
                    clone.columns['filtertype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boreportcolumns_filtertype.value)), }, };
                this.tbl_boreportcolumns.source.settings = clone;
                this.tbl_boreportcolumns.source.initGrid();
            }
            this.bfilterPopulate_boreportcolumns = true;
        });
    }
    boreportcolumns_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_boreportcolumns_TableConfig() {
        this.boreportcolumns_settings = {
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
                custom: this.boreportcolumn_menuactions
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
                tablealias: {
                    title: 'Table Alias',
                    type: '',
                    filter: true,
                },
                field: {
                    title: 'Field',
                    type: '',
                    filter: true,
                },
                header: {
                    title: 'Header',
                    type: '',
                    filter: true,
                },
                columnalias: {
                    title: 'Column Alias',
                    type: '',
                    filter: true,
                },
                hide: {
                    title: 'Hide',
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
                derived: {
                    title: 'Derived',
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
                datatypedesc: {
                    title: 'Datatype',
                    type: 'html',
                    filter: true,
                },
                fkfilter: {
                    title: 'F K Filter',
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
                filtertypedesc: {
                    title: 'Filter Type',
                    type: 'html',
                    filter: true,
                },
                width: {
                    title: 'Width',
                    type: 'number',
                    filter: true,
                },
                nofilter: {
                    title: 'No Filter',
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
                groupby: {
                    title: 'Group By',
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
                sum: {
                    title: 'Sum',
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
                count: {
                    title: 'Count',
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
                colhtml: {
                    title: 'Col H T M L',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                poptitle: {
                    title: 'Pop Title',
                    type: '',
                    filter: true,
                },
                link: {
                    title: 'Link',
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
                linkurl: {
                    title: 'Link U R L',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                service: {
                    title: 'Service',
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
                servicename: {
                    title: 'Service Name',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                sp: {
                    title: 'S P',
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
                spname: {
                    title: 'S P Name',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                alert: {
                    title: 'Alert',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                caps: {
                    title: 'Caps',
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
                bold: {
                    title: 'Bold',
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
                italic: {
                    title: 'Italic',
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
                strikethrough: {
                    title: 'Strikethrough',
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
                bgcolor: {
                    title: 'B G Color',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                forecolor: {
                    title: 'Fore Color',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                conditionstyle: {
                    title: 'Condition Style',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                performancestatusvalues: {
                    title: 'Performance Status Values',
                    type: '',
                    filter: true,
                },
                notsortable: {
                    title: 'Not Sortable',
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
                sequence: {
                    title: 'Sequence',
                    type: 'number',
                    filter: true,
                },
                sumcondition: {
                    title: 'Sum Condition',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                countcondition: {
                    title: 'Count Condition',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                min: {
                    title: 'Min',
                    type: 'number',
                    filter: true,
                },
                max: {
                    title: 'Max',
                    type: 'number',
                    filter: true,
                },
                maxchars: {
                    title: 'Max Chars',
                    type: 'number',
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
    boreportcolumns_LoadTable(boreportcolumns = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportcolumns_ID) >= 0) {
            if (this.tbl_boreportcolumns != undefined)
                this.tbl_boreportcolumns.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
            if (this.tbl_boreportcolumns != undefined)
                this.tbl_boreportcolumns.source.load(boreportcolumns);
            if (this.tbl_boreportcolumns != undefined)
                this.tbl_boreportcolumns.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    boreportcolumns_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boreport_service.boreportcolumns.length == 0)
    {
        this.tbl_boreportcolumns.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boreportcolumn();
        this.boreport_service.boreportcolumns.push(obj);
        this.tbl_boreportcolumns.source.refresh();
        if ((this.boreport_service.boreportcolumns.length / this.tbl_boreportcolumns.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boreportcolumns.source.getPaging().page)
        {
            this.tbl_boreportcolumns.source.setPage((this.boreport_service.boreportcolumns.length / this.tbl_boreportcolumns.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boreportcolumns.source.grid.edit(this.tbl_boreportcolumns.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boreportcolumns.source.data.indexOf(event.data);
    this.onDelete_boreportcolumn(event,event.data.reportcolumnid,((this.tbl_boreportcolumns.source.getPaging().page-1) *this.tbl_boreportcolumns.source.getPaging().perPage)+index);
    this.tbl_boreportcolumns.source.refresh();
    break;
    }
    }
    
    */
    boreportcolumns_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_boreportcolumn(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boreportcolumn(event, event.data.reportcolumnid, this.formid);
                break;
            case 'delete':
                this.onDelete_boreportcolumn(event, event.data.reportcolumnid, ((this.tbl_boreportcolumns.source.getPaging().page - 1) * this.tbl_boreportcolumns.source.getPaging().perPage) + event.index);
                this.tbl_boreportcolumns.source.refresh();
                break;
        }
    }
    boreportcolumns_onDelete(obj) {
        let reportcolumnid = obj.data.reportcolumnid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boreport_service.delete_boreport(reportcolumnid).then(res => this.boreportcolumns_LoadTable());
        }
    }
    onCustom_boreportcolumns_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "boreportcolumns");
            let formname = objbomenuaction.actionname;
        });
    }
    boreportcolumns_Paging(val) {
        debugger;
        this.tbl_boreportcolumns.source.setPaging(1, val, true);
    }
    handle_boreportcolumns_GridSelected(event) {
        this.boreportcolumns_selectedindex = this.tbl_boreportcolumns.source.findIndex(i => i.reportcolumnid === event.data.reportcolumnid);
    }
    boreportcolumns_moveUp() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            this.boreportcolumns_move(-1);
        });
    }
    boreportcolumns_move(val) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            let index = ((this.tbl_boreportcolumns.source.getPaging().page - 1) * this.tbl_boreportcolumns.source.getPaging().perPage) + this.boreportcolumns_selectedindex;
            if (index >= 0) {
                var current = this.tbl_boreportcolumns.source.data[index];
                var tmp = this.tbl_boreportcolumns.source.data[index + val];
                this.tbl_boreportcolumns.source.data[index + val] = this.tbl_boreportcolumns.source.data[index];
                this.tbl_boreportcolumns.source.data[index] = tmp;
                this.tbl_boreportcolumns.source.data[index + val].sequence = index + val;
                this.tbl_boreportcolumns.source.data[index].sequence = index;
                this.tbl_boreportcolumns.source.refresh();
                this.boreportcolumns_selectedindex = this.tbl_boreportcolumns.source.data.findIndex(i => i.reportcolumnid === current.reportcolumnid);
                this.tbl_boreportcolumns.source.grid.getRows().forEach((row) => {
                    if (current.reportcolumnid == row.data.reportcolumnid) {
                        this.tbl_boreportcolumns.source.grid.selectRow(row);
                    }
                });
            }
        });
    }
    boreportcolumns_moveDown() {
        return this.boreportcolumns_move(1);
    }
    Is_boreportcolumns_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boreportcolumns_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
boreportComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_17__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_20__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_11__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DialogService },
    { type: _service_boreport_service__WEBPACK_IMPORTED_MODULE_1__.boreportService },
    { type: _service_boreportdetail_service__WEBPACK_IMPORTED_MODULE_4__.boreportdetailService },
    { type: _service_boreportothertable_service__WEBPACK_IMPORTED_MODULE_6__.boreportothertableService },
    { type: _service_boreportcolumn_service__WEBPACK_IMPORTED_MODULE_8__.boreportcolumnService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_9__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_10__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_24__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_20__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_25__.NgxSpinnerService }
];
boreportComponent.propDecorators = {
    tbl_boreportdetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_boreportdetails', { static: false },] }],
    tbl_boreportothertables: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_boreportothertables', { static: false },] }],
    tbl_boreportcolumns: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_boreportcolumns', { static: false },] }]
};
boreportComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
        selector: 'app-boreport',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boreport_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__.KeyboardShortcutsService]
    })
], boreportComponent);



/***/ }),

/***/ 60794:
/*!*********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreport/boreport.module.ts ***!
  \*********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportModule": () => (/* binding */ boreportModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _boreport_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boreport.routing */ 89043);
/* harmony import */ var _boreport_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boreport.component */ 88830);
/* harmony import */ var _boreportcolumn_boreportcolumn_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../boreportcolumn/boreportcolumn.module */ 43189);
/* harmony import */ var _boreportdetail_boreportdetail_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../boreportdetail/boreportdetail.module */ 43961);
/* harmony import */ var _boreportothertable_boreportothertable_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../boreportothertable/boreportothertable.module */ 73384);









let boreportModule = class boreportModule {
};
boreportModule = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _boreport_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _boreportcolumn_boreportcolumn_module__WEBPACK_IMPORTED_MODULE_4__.boreportcolumnModule, _boreportdetail_boreportdetail_module__WEBPACK_IMPORTED_MODULE_5__.boreportdetailModule, _boreportothertable_boreportothertable_module__WEBPACK_IMPORTED_MODULE_6__.boreportothertableModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_8__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_boreport_component__WEBPACK_IMPORTED_MODULE_3__.boreportComponent]
    })
], boreportModule);



/***/ }),

/***/ 89043:
/*!**********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreport/boreport.routing.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _boreport_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boreport.component */ 88830);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'boreports', children: [
            { path: '', component: _boreport_component__WEBPACK_IMPORTED_MODULE_0__.boreportComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _boreport_component__WEBPACK_IMPORTED_MODULE_0__.boreportComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _boreport_component__WEBPACK_IMPORTED_MODULE_0__.boreportComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _boreport_component__WEBPACK_IMPORTED_MODULE_0__.boreportComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 33062:
/*!************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportcolumn/boreportcolumn.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportcolumnComponent": () => (/* binding */ boreportcolumnComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boreportcolumn_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boreportcolumn.component.html */ 71852);
/* harmony import */ var _service_boreportcolumn_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/boreportcolumn.service */ 18089);
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

let boreportcolumnComponent = class boreportcolumnComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, boreportcolumn_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.boreportcolumn_service = boreportcolumn_service;
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
        this.bfilterPopulate_boreportcolumns = false;
        this.boreportcolumn_menuactions = [];
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
        this.boreportcolumn_Form = this.fb.group({
            pk: [null],
            reportcolumnid: [null],
            reportid: [null],
            tablealias: [null],
            field: [null],
            header: [null],
            columnalias: [null],
            hide: [null],
            derived: [null],
            datatype: [null],
            datatypedesc: [null],
            fkfilter: [null],
            filtertype: [null],
            filtertypedesc: [null],
            width: [null],
            nofilter: [null],
            groupby: [null],
            sum: [null],
            count: [null],
            colhtml: [null],
            poptitle: [null],
            link: [null],
            linkurl: [null],
            service: [null],
            servicename: [null],
            sp: [null],
            spname: [null],
            alert: [null],
            caps: [null],
            bold: [null],
            italic: [null],
            strikethrough: [null],
            bgcolor: [null],
            forecolor: [null],
            conditionstyle: [null],
            performancestatusvalues: [null],
            status: [null],
            statusdesc: [null],
            notsortable: [null],
            sequence: [null],
            sumcondition: [null],
            countcondition: [null],
            min: [null],
            max: [null],
            maxchars: [null],
            helptext: [null],
        });
    }
    get f() { return this.boreportcolumn_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.boreportcolumn_Form.dirty && this.boreportcolumn_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.reportcolumnid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.reportcolumnid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.reportcolumnid && pkDetail) {
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
            let boreportcolumnid = null;
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
            this.formid = boreportcolumnid;
            //alert(boreportcolumnid);
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
            this.boreportcolumn_service.getDefaultData().then(res => {
                this.datatype_List = res.list_datatype.value;
                this.filtertype_List = res.list_filtertype.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.boreportcolumn_service.get_boreportcolumns_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.boreportcolumn_Form.markAsUntouched();
            this.boreportcolumn_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.boreportcolumn_Form != null)
            this.boreportcolumn_Form.reset();
        this.boreportcolumn_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let reportcolumnid = this.boreportcolumn_Form.get('reportcolumnid').value;
        if (reportcolumnid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boreportcolumn_service.delete_boreportcolumn(reportcolumnid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boreportcolumn_Form.patchValue({
            reportcolumnid: null
        });
        if (this.formData.reportcolumnid != null)
            this.formData.reportcolumnid = null;
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
                        this.boreportcolumn_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boreportcolumn_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boreportcolumn_Form.controls[key] != undefined) {
                                this.boreportcolumn_Form.controls[key].disable({ onlySelf: true });
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
    datatype_onChange(evt) {
        let e = this.f.datatype.value;
        this.boreportcolumn_Form.patchValue({ datatypedesc: evt.options[evt.options.selectedIndex].text });
    }
    filtertype_onChange(evt) {
        let e = this.f.filtertype.value;
        this.boreportcolumn_Form.patchValue({ filtertypedesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_boreportcolumns() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.boreportcolumn_service.get_boreportcolumns_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.boreportcolumn;
                let formproperty = res.boreportcolumn.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.boreportcolumn.pkcol;
                this.formid = res.boreportcolumn.reportcolumnid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.boreportcolumn;
        this.formid = res.boreportcolumn.reportcolumnid;
        this.pkcol = res.boreportcolumn.pkcol;
        this.bmyrecord = false;
        if (res.boreportcolumn.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boreportcolumn_Form.patchValue({
            reportcolumnid: res.boreportcolumn.reportcolumnid,
            reportid: res.boreportcolumn.reportid,
            tablealias: res.boreportcolumn.tablealias,
            field: res.boreportcolumn.field,
            header: res.boreportcolumn.header,
            columnalias: res.boreportcolumn.columnalias,
            hide: res.boreportcolumn.hide,
            derived: res.boreportcolumn.derived,
            datatype: res.boreportcolumn.datatype,
            datatypedesc: res.boreportcolumn.datatypedesc,
            fkfilter: res.boreportcolumn.fkfilter,
            filtertype: res.boreportcolumn.filtertype,
            filtertypedesc: res.boreportcolumn.filtertypedesc,
            width: res.boreportcolumn.width,
            nofilter: res.boreportcolumn.nofilter,
            groupby: res.boreportcolumn.groupby,
            sum: res.boreportcolumn.sum,
            count: res.boreportcolumn.count,
            colhtml: res.boreportcolumn.colhtml,
            poptitle: res.boreportcolumn.poptitle,
            link: res.boreportcolumn.link,
            linkurl: res.boreportcolumn.linkurl,
            service: res.boreportcolumn.service,
            servicename: res.boreportcolumn.servicename,
            sp: res.boreportcolumn.sp,
            spname: res.boreportcolumn.spname,
            alert: res.boreportcolumn.alert,
            caps: res.boreportcolumn.caps,
            bold: res.boreportcolumn.bold,
            italic: res.boreportcolumn.italic,
            strikethrough: res.boreportcolumn.strikethrough,
            bgcolor: res.boreportcolumn.bgcolor,
            forecolor: res.boreportcolumn.forecolor,
            conditionstyle: res.boreportcolumn.conditionstyle,
            performancestatusvalues: res.boreportcolumn.performancestatusvalues,
            status: res.boreportcolumn.status,
            statusdesc: res.boreportcolumn.statusdesc,
            notsortable: res.boreportcolumn.notsortable,
            sequence: res.boreportcolumn.sequence,
            sumcondition: res.boreportcolumn.sumcondition,
            countcondition: res.boreportcolumn.countcondition,
            min: res.boreportcolumn.min,
            max: res.boreportcolumn.max,
            maxchars: res.boreportcolumn.maxchars,
            helptext: res.boreportcolumn.helptext,
        });
        this.boreportcolumn_menuactions = res.boreportcolumn_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.boreportcolumn_Form.controls) {
            let val = this.boreportcolumn_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.boreportcolumn_Form.controls[key] != null) {
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
            if (!this.boreportcolumn_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.boreportcolumn_Form.getRawValue();
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
            // Object.keys(this.boreportcolumn_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.boreportcolumn_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.boreportcolumn_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.boreportcolumn_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.boreportcolumn_Form.controls[key] != null) {
                            this.formData[key] = this.boreportcolumn_Form.controls[key].value;
                        }
                    }
                }
            }
            debugger;
            console.log(this.formData);
            this.spinner.show();
            this.boreportcolumn_service.saveOrUpdate_boreportcolumns(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.boreportcolumn);
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
                        this.objvalues.push(res.boreportcolumn);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boreportcolumn_Form.markAsUntouched();
                this.boreportcolumn_Form.markAsPristine();
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
boreportcolumnComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_boreportcolumn_service__WEBPACK_IMPORTED_MODULE_1__.boreportcolumnService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
boreportcolumnComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-boreportcolumn',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boreportcolumn_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], boreportcolumnComponent);



/***/ }),

/***/ 43189:
/*!*********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportcolumn/boreportcolumn.module.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportcolumnModule": () => (/* binding */ boreportcolumnModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _boreportcolumn_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boreportcolumn.routing */ 31896);
/* harmony import */ var _boreportcolumn_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boreportcolumn.component */ 33062);






let boreportcolumnModule = class boreportcolumnModule {
};
boreportcolumnModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _boreportcolumn_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_boreportcolumn_component__WEBPACK_IMPORTED_MODULE_3__.boreportcolumnComponent]
    })
], boreportcolumnModule);



/***/ }),

/***/ 31896:
/*!**********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportcolumn/boreportcolumn.routing.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _boreportcolumn_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boreportcolumn.component */ 33062);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'boreportcolumns', children: [
            { path: '', component: _boreportcolumn_component__WEBPACK_IMPORTED_MODULE_0__.boreportcolumnComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _boreportcolumn_component__WEBPACK_IMPORTED_MODULE_0__.boreportcolumnComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _boreportcolumn_component__WEBPACK_IMPORTED_MODULE_0__.boreportcolumnComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _boreportcolumn_component__WEBPACK_IMPORTED_MODULE_0__.boreportcolumnComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 61005:
/*!************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportdetail/boreportdetail.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportdetailComponent": () => (/* binding */ boreportdetailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boreportdetail_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boreportdetail.component.html */ 44781);
/* harmony import */ var _service_boreportdetail_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/boreportdetail.service */ 53045);
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

let boreportdetailComponent = class boreportdetailComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, boreportdetail_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.boreportdetail_service = boreportdetail_service;
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
        this.bfilterPopulate_boreportdetails = false;
        this.boreportdetail_menuactions = [];
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
        this.boreportdetail_Form = this.fb.group({
            pk: [null],
            reportdetailid: [null],
            reportid: [null],
            tablename: [null],
            formula: [null],
            separator: [null],
            separatordesc: [null],
            header: [null],
            footer: [null],
            wherecondition: [null],
            alias: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.boreportdetail_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.boreportdetail_Form.dirty && this.boreportdetail_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.reportdetailid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.reportdetailid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.reportdetailid && pkDetail) {
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
            let boreportdetailid = null;
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
            this.formid = boreportdetailid;
            //alert(boreportdetailid);
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
            this.boreportdetail_service.getDefaultData().then(res => {
                this.separator_List = res.list_separator.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.boreportdetail_service.get_boreportdetails_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.boreportdetail_Form.markAsUntouched();
            this.boreportdetail_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.boreportdetail_Form != null)
            this.boreportdetail_Form.reset();
        this.boreportdetail_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let reportdetailid = this.boreportdetail_Form.get('reportdetailid').value;
        if (reportdetailid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boreportdetail_service.delete_boreportdetail(reportdetailid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boreportdetail_Form.patchValue({
            reportdetailid: null
        });
        if (this.formData.reportdetailid != null)
            this.formData.reportdetailid = null;
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
                        this.boreportdetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boreportdetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boreportdetail_Form.controls[key] != undefined) {
                                this.boreportdetail_Form.controls[key].disable({ onlySelf: true });
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
    separator_onChange(evt) {
        let e = this.f.separator.value;
        this.boreportdetail_Form.patchValue({ separatordesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_boreportdetails() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.boreportdetail_service.get_boreportdetails_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.boreportdetail;
                let formproperty = res.boreportdetail.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.boreportdetail.pkcol;
                this.formid = res.boreportdetail.reportdetailid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.boreportdetail;
        this.formid = res.boreportdetail.reportdetailid;
        this.pkcol = res.boreportdetail.pkcol;
        this.bmyrecord = false;
        if (res.boreportdetail.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boreportdetail_Form.patchValue({
            reportdetailid: res.boreportdetail.reportdetailid,
            reportid: res.boreportdetail.reportid,
            tablename: res.boreportdetail.tablename,
            formula: res.boreportdetail.formula,
            separator: res.boreportdetail.separator,
            separatordesc: res.boreportdetail.separatordesc,
            header: res.boreportdetail.header,
            footer: res.boreportdetail.footer,
            wherecondition: res.boreportdetail.wherecondition,
            alias: res.boreportdetail.alias,
            status: res.boreportdetail.status,
            statusdesc: res.boreportdetail.statusdesc,
        });
        this.boreportdetail_menuactions = res.boreportdetail_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.boreportdetail_Form.controls) {
            let val = this.boreportdetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.boreportdetail_Form.controls[key] != null) {
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
            if (!this.boreportdetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.boreportdetail_Form.getRawValue();
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
            // Object.keys(this.boreportdetail_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.boreportdetail_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.boreportdetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.boreportdetail_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.boreportdetail_Form.controls[key] != null) {
                            this.formData[key] = this.boreportdetail_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.boreportdetail_service.saveOrUpdate_boreportdetails(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.boreportdetail);
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
                        this.objvalues.push(res.boreportdetail);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boreportdetail_Form.markAsUntouched();
                this.boreportdetail_Form.markAsPristine();
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
boreportdetailComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_boreportdetail_service__WEBPACK_IMPORTED_MODULE_1__.boreportdetailService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
boreportdetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-boreportdetail',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boreportdetail_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], boreportdetailComponent);



/***/ }),

/***/ 43961:
/*!*********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportdetail/boreportdetail.module.ts ***!
  \*********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportdetailModule": () => (/* binding */ boreportdetailModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _boreportdetail_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boreportdetail.routing */ 1860);
/* harmony import */ var _boreportdetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boreportdetail.component */ 61005);






let boreportdetailModule = class boreportdetailModule {
};
boreportdetailModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _boreportdetail_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_boreportdetail_component__WEBPACK_IMPORTED_MODULE_3__.boreportdetailComponent]
    })
], boreportdetailModule);



/***/ }),

/***/ 1860:
/*!**********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportdetail/boreportdetail.routing.ts ***!
  \**********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _boreportdetail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boreportdetail.component */ 61005);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'boreportdetails', children: [
            { path: '', component: _boreportdetail_component__WEBPACK_IMPORTED_MODULE_0__.boreportdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _boreportdetail_component__WEBPACK_IMPORTED_MODULE_0__.boreportdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _boreportdetail_component__WEBPACK_IMPORTED_MODULE_0__.boreportdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _boreportdetail_component__WEBPACK_IMPORTED_MODULE_0__.boreportdetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 46482:
/*!********************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportothertable/boreportothertable.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportothertableComponent": () => (/* binding */ boreportothertableComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boreportothertable_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boreportothertable.component.html */ 58602);
/* harmony import */ var _service_boreportothertable_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/boreportothertable.service */ 44853);
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

let boreportothertableComponent = class boreportothertableComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, boreportothertable_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.boreportothertable_service = boreportothertable_service;
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
        this.bfilterPopulate_boreportothertables = false;
        this.boreportothertable_menuactions = [];
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
        this.boreportothertable_Form = this.fb.group({
            pk: [null],
            othertableid: [null],
            reportid: [null],
            tablename: [null],
            tablealias: [null],
            jointype: [null],
            jointypedesc: [null],
            wherecondition: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.boreportothertable_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.boreportothertable_Form.dirty && this.boreportothertable_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.othertableid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.othertableid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.othertableid && pkDetail) {
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
            let boreportothertableid = null;
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
            this.formid = boreportothertableid;
            //alert(boreportothertableid);
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
            this.boreportothertable_service.getDefaultData().then(res => {
                this.jointype_List = res.list_jointype.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.boreportothertable_service.get_boreportothertables_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.boreportothertable_Form.markAsUntouched();
            this.boreportothertable_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.boreportothertable_Form != null)
            this.boreportothertable_Form.reset();
        this.boreportothertable_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let othertableid = this.boreportothertable_Form.get('othertableid').value;
        if (othertableid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boreportothertable_service.delete_boreportothertable(othertableid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boreportothertable_Form.patchValue({
            othertableid: null
        });
        if (this.formData.othertableid != null)
            this.formData.othertableid = null;
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
                        this.boreportothertable_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boreportothertable_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boreportothertable_Form.controls[key] != undefined) {
                                this.boreportothertable_Form.controls[key].disable({ onlySelf: true });
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
    jointype_onChange(evt) {
        let e = this.f.jointype.value;
        this.boreportothertable_Form.patchValue({ jointypedesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_boreportothertables() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.boreportothertable_service.get_boreportothertables_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.boreportothertable;
                let formproperty = res.boreportothertable.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.boreportothertable.pkcol;
                this.formid = res.boreportothertable.othertableid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.boreportothertable;
        this.formid = res.boreportothertable.othertableid;
        this.pkcol = res.boreportothertable.pkcol;
        this.bmyrecord = false;
        if (res.boreportothertable.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boreportothertable_Form.patchValue({
            othertableid: res.boreportothertable.othertableid,
            reportid: res.boreportothertable.reportid,
            tablename: res.boreportothertable.tablename,
            tablealias: res.boreportothertable.tablealias,
            jointype: res.boreportothertable.jointype,
            jointypedesc: res.boreportothertable.jointypedesc,
            wherecondition: res.boreportothertable.wherecondition,
            status: res.boreportothertable.status,
            statusdesc: res.boreportothertable.statusdesc,
        });
        this.boreportothertable_menuactions = res.boreportothertable_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.boreportothertable_Form.controls) {
            let val = this.boreportothertable_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.boreportothertable_Form.controls[key] != null) {
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
            if (!this.boreportothertable_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.boreportothertable_Form.getRawValue();
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
            // Object.keys(this.boreportothertable_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.boreportothertable_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.boreportothertable_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.boreportothertable_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.boreportothertable_Form.controls[key] != null) {
                            this.formData[key] = this.boreportothertable_Form.controls[key].value;
                        }
                    }
                }
            }
            console.log(this.formData);
            this.spinner.show();
            this.boreportothertable_service.saveOrUpdate_boreportothertables(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.boreportothertable);
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
                        this.objvalues.push(res.boreportothertable);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boreportothertable_Form.markAsUntouched();
                this.boreportothertable_Form.markAsPristine();
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
boreportothertableComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_boreportothertable_service__WEBPACK_IMPORTED_MODULE_1__.boreportothertableService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
boreportothertableComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-boreportothertable',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boreportothertable_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], boreportothertableComponent);



/***/ }),

/***/ 73384:
/*!*****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportothertable/boreportothertable.module.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportothertableModule": () => (/* binding */ boreportothertableModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _boreportothertable_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boreportothertable.routing */ 24244);
/* harmony import */ var _boreportothertable_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boreportothertable.component */ 46482);






let boreportothertableModule = class boreportothertableModule {
};
boreportothertableModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _boreportothertable_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_boreportothertable_component__WEBPACK_IMPORTED_MODULE_3__.boreportothertableComponent]
    })
], boreportothertableModule);



/***/ }),

/***/ 24244:
/*!******************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boreportothertable/boreportothertable.routing.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _boreportothertable_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boreportothertable.component */ 46482);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'boreportothertables', children: [
            { path: '', component: _boreportothertable_component__WEBPACK_IMPORTED_MODULE_0__.boreportothertableComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _boreportothertable_component__WEBPACK_IMPORTED_MODULE_0__.boreportothertableComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _boreportothertable_component__WEBPACK_IMPORTED_MODULE_0__.boreportothertableComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _boreportothertable_component__WEBPACK_IMPORTED_MODULE_0__.boreportothertableComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 18089:
/*!***************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/boreportcolumn.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportcolumnService": () => (/* binding */ boreportcolumnService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let boreportcolumnService = class boreportcolumnService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_boreportcolumns(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportcolumn', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportcolumn' + '/getdefaultdata').toPromise();
        }
    }
    get_boreportcolumns_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportcolumn').toPromise();
        }
    }
    getListBy_reportcolumnid(reportcolumnid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportcolumn' + '/reportcolumnid/' + reportcolumnid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportcolumn' + '/param/' + key).toPromise();
        }
    }
    get_boreportcolumns_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportcolumn' + '/e/' + id).toPromise();
        }
    }
    get_boreportcolumns_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportcolumn' + '/' + id).toPromise();
        }
    }
    delete_boreportcolumn(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportcolumn' + '/' + id).toPromise();
        }
    }
    getList_datatype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boreportcolumn' + '/getList_datatype/').toPromise();
    }
    getList_filtertype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boreportcolumn' + '/getList_filtertype/').toPromise();
    }
};
boreportcolumnService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
boreportcolumnService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], boreportcolumnService);



/***/ }),

/***/ 53045:
/*!***************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/boreportdetail.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportdetailService": () => (/* binding */ boreportdetailService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let boreportdetailService = class boreportdetailService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_boreportdetails(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportdetail', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportdetail' + '/getdefaultdata').toPromise();
        }
    }
    get_boreportdetails_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportdetail').toPromise();
        }
    }
    getListBy_reportdetailid(reportdetailid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportdetail' + '/reportdetailid/' + reportdetailid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportdetail' + '/param/' + key).toPromise();
        }
    }
    get_boreportdetails_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportdetail' + '/e/' + id).toPromise();
        }
    }
    get_boreportdetails_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportdetail' + '/' + id).toPromise();
        }
    }
    delete_boreportdetail(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportdetail' + '/' + id).toPromise();
        }
    }
    getList_separator() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boreportdetail' + '/getList_separator/').toPromise();
    }
};
boreportdetailService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
boreportdetailService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], boreportdetailService);



/***/ }),

/***/ 44853:
/*!*******************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/boreportothertable.service.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boreportothertableService": () => (/* binding */ boreportothertableService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let boreportothertableService = class boreportothertableService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_boreportothertables(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportothertable', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportothertable' + '/getdefaultdata').toPromise();
        }
    }
    get_boreportothertables_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportothertable').toPromise();
        }
    }
    getListBy_othertableid(othertableid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportothertable' + '/othertableid/' + othertableid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportothertable' + '/param/' + key).toPromise();
        }
    }
    get_boreportothertables_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportothertable' + '/e/' + id).toPromise();
        }
    }
    get_boreportothertables_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportothertable' + '/' + id).toPromise();
        }
    }
    delete_boreportothertable(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boreportothertable' + '/' + id).toPromise();
        }
    }
    getList_jointype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boreportothertable' + '/getList_jointype/').toPromise();
    }
};
boreportothertableService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
boreportothertableService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], boreportothertableService);



/***/ }),

/***/ 72809:
/*!*****************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boreport/boreport.component.html ***!
  \*****************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"boreport_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second bgcolor\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'boreports' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_boreports()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pkcurrent' id='pkcurrent' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of boreport_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success \" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.reportid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.reportid.value\" [status]=\"f.status.value\"></app-action>\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"MakeAllHide()\"><i class=\"fa fa-close\"></i>Close</a>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('reportcode') == -1) && (reportcodevisible==undefined || reportcodevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"reportcode\" class=\"control-label\">Report Code</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.reportcode?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"reportcode\" formControlName=\"reportcode\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('actionkey') == -1) && (actionkeyvisible==undefined || actionkeyvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"actionkey\" class=\"control-label\">Action Key</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.actionkey?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"actionkey\" formControlName=\"actionkey\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('reportname') == -1) && (reportnamevisible==undefined || reportnamevisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"reportname\" class=\"control-label\">Report Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.reportname?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"reportname\"\r\n                  formControlName=\"reportname\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <!--reportmodule-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('reportmodule') == -1) && (reportmodulevisible==undefined || reportmodulevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"reportmodule\" class=\"control-label\">Report Module</label>\r\n                <select *ngIf=\"!showview\" id=\"reportmodule\" (change)=\"reportmodule_onChange($event.target)\"\r\n                  formControlName=\"reportmodule\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of reportmodule_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.reportmoduledesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--reporttype-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('reporttype') == -1) && (reporttypevisible==undefined || reporttypevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"reporttype\" class=\"control-label\">Report Type</label>\r\n                <select *ngIf=\"!showview\" id=\"reporttype\" (change)=\"reporttype_onChange($event.target)\"\r\n                  formControlName=\"reporttype\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of reporttype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.reporttypedesc?.value}}</label>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('columns') == -1) && (columnsvisible==undefined || columnsvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"columns\" class=\"control-label\">Columns</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.columns?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"columns\"\r\n                  formControlName=\"columns\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('sidefilter') == -1) && (sidefiltervisible==undefined || sidefiltervisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  \r\n                  <label for=\"sidefilter\" class=\"control-label\">Side Filter</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.sidefilter?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"sidefilter\" formControlName=\"sidefilter\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('sidefilters') == -1) && (sidefiltersvisible==undefined || sidefiltersvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"sidefilters\" class=\"control-label\">Side Filters</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.sidefilters?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"sidefilters\" formControlName=\"sidefilters\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('maintablename') == -1) && (maintablenamevisible==undefined || maintablenamevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"maintablename\" class=\"control-label\">Main Table Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.maintablename?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"maintablename\" formControlName=\"maintablename\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('maintablealias') == -1) && (maintablealiasvisible==undefined || maintablealiasvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"maintablealias\" class=\"control-label\">Main Table Alias</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.maintablealias?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"maintablealias\" formControlName=\"maintablealias\" class=\"form-control\">\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('maintableidentityfield') == -1) && (maintableidentityfieldvisible==undefined || maintableidentityfieldvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"maintableidentityfield\" class=\"control-label\">Main Table Identity Field</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.maintableidentityfield?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"maintableidentityfield\" formControlName=\"maintableidentityfield\"\r\n                  class=\"form-control\">\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('pk') == -1) && (pkvisible==undefined || pkvisible==true))\" style=''\r\n                class=\"col-3 \">\r\n                <label for=\"pk\" class=\"control-label\">P K</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.pk?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"pk\" formControlName=\"pk\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('query') == -1) && (queryvisible==undefined || queryvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"query\" class=\"control-label\">Query</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.query?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"query\"\r\n                  formControlName=\"query\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('wherecondition') == -1) && (whereconditionvisible==undefined || whereconditionvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"wherecondition\" class=\"control-label\">Where Condition</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.wherecondition?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"wherecondition\"\r\n                  formControlName=\"wherecondition\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('cardtype') == -1) && (cardtypevisible==undefined || cardtypevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"cardtype\" class=\"control-label\">Card Type</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.cardtype?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"cardtype\" formControlName=\"cardtype\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('html') == -1) && (htmlvisible==undefined || htmlvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"html\" class=\"control-label\">H T M L</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.html?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"html\"\r\n                  formControlName=\"html\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('calendar') == -1) && (calendarvisible==undefined || calendarvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"calendar\" class=\"control-label\">Calendar</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.calendar?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"calendar\" formControlName=\"calendar\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('kanbanview') == -1) && (kanbanviewvisible==undefined || kanbanviewvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <div class=\"columnchk\">\r\n                  <label for=\"kanbanview\" class=\"control-label\">Kanban View</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.kanbanview?.value}}</label>\r\n                  <input type=\"checkbox\" *ngIf=\"!showview\" id=\"kanbanview\" formControlName=\"kanbanview\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('kanbankey') == -1) && (kanbankeyvisible==undefined || kanbankeyvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"kanbankey\" class=\"control-label\">Kanban Key</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.kanbankey?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"kanbankey\" formControlName=\"kanbankey\" class=\"form-control\">\r\n              </div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Date' [selected]='false'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('datefilter') == -1) && (datefiltervisible==undefined || datefiltervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"datefilter\" class=\"control-label\">Date Filter</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.datefilter?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"datefilter\" formControlName=\"datefilter\"\r\n                      class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('datefiltercolumnname') == -1) && (datefiltercolumnnamevisible==undefined || datefiltercolumnnamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"datefiltercolumnname\" class=\"control-label\">Date Filter Column Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.datefiltercolumnname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"datefiltercolumnname\" formControlName=\"datefiltercolumnname\"\r\n                    class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--datefiltertype-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('datefiltertype') == -1) && (datefiltertypevisible==undefined || datefiltertypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"datefiltertype\" class=\"control-label\">Date Filter Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"datefiltertype\" (change)=\"datefiltertype_onChange($event.target)\"\r\n                    formControlName=\"datefiltertype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of datefiltertype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.datefiltertypedesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Group' [selected]='false'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('groupby') == -1) && (groupbyvisible==undefined || groupbyvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"groupby\" class=\"control-label\">Group By</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.groupby?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"groupby\" formControlName=\"groupby\" class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('groupbytext') == -1) && (groupbytextvisible==undefined || groupbytextvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"groupbytext\" class=\"control-label\">Group By Text</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.groupbytext?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"groupbytext\"\r\n                    formControlName=\"groupbytext\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('groupby2') == -1) && (groupby2visible==undefined || groupby2visible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"groupby2\" class=\"control-label\">Group By2</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.groupby2?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"groupby2\" formControlName=\"groupby2\" class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('groupby2text') == -1) && (groupby2textvisible==undefined || groupby2textvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"groupby2text\" class=\"control-label\">Group By2 Text</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.groupby2text?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"groupby2text\"\r\n                    formControlName=\"groupby2text\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--groupbyrelationship-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('groupbyrelationship') == -1) && (groupbyrelationshipvisible==undefined || groupbyrelationshipvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"groupbyrelationship\" class=\"control-label\">Group By\r\n                    Relationship</label>\r\n                  <select *ngIf=\"!showview\" id=\"groupbyrelationship\"\r\n                    (change)=\"groupbyrelationship_onChange($event.target)\" formControlName=\"groupbyrelationship\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of groupbyrelationship_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.groupbyrelationshipdesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Sort' [selected]='false'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('sortby1') == -1) && (sortby1visible==undefined || sortby1visible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"sortby1\" class=\"control-label\">Sort By1</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.sortby1?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"sortby1\" formControlName=\"sortby1\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('sortby2') == -1) && (sortby2visible==undefined || sortby2visible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"sortby2\" class=\"control-label\">Sort By2</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.sortby2?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"sortby2\" formControlName=\"sortby2\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('sortby3') == -1) && (sortby3visible==undefined || sortby3visible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"sortby3\" class=\"control-label\">Sort By3</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.sortby3?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"sortby3\" formControlName=\"sortby3\" class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Parent' [selected]='false'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('parentid') == -1) && (parentidvisible==undefined || parentidvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"parentid\" class=\"control-label\">Parent</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.parentid?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"parentid\" formControlName=\"parentid\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('parentdescription') == -1) && (parentdescriptionvisible==undefined || parentdescriptionvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"parentdescription\" class=\"control-label\">Parent Description</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.parentdescription?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"parentdescription\" formControlName=\"parentdescription\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Detail Table' [selected]='false'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('detailtablename') == -1) && (detailtablenamevisible==undefined || detailtablenamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"detailtablename\" class=\"control-label\">Detail Table Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.detailtablename?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"detailtablename\" formControlName=\"detailtablename\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('detailtablealias') == -1) && (detailtablealiasvisible==undefined || detailtablealiasvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"detailtablealias\" class=\"control-label\">Detail Table Alias</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.detailtablealias?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"detailtablealias\" formControlName=\"detailtablealias\"\r\n                    class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--jointype-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('jointype') == -1) && (jointypevisible==undefined || jointypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"jointype\" class=\"control-label\">Join Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"jointype\" (change)=\"jointype_onChange($event.target)\"\r\n                    formControlName=\"jointype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of jointype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.jointypedesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('detailtableidentityfield') == -1) && (detailtableidentityfieldvisible==undefined || detailtableidentityfieldvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"detailtableidentityfield\" class=\"control-label\">Detail Table Identity Field</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.detailtableidentityfield?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"detailtableidentityfield\" formControlName=\"detailtableidentityfield\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('detailtablefk') == -1) && (detailtablefkvisible==undefined || detailtablefkvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"detailtablefk\" class=\"control-label\">Detail Table F K</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.detailtablefk?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"detailtablefk\" formControlName=\"detailtablefk\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('detailtableconcatenate') == -1) && (detailtableconcatenatevisible==undefined || detailtableconcatenatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"detailtableconcatenate\" class=\"control-label\">Detail Table Concatenate</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.detailtableconcatenate?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"detailtableconcatenate\"\r\n                      formControlName=\"detailtableconcatenate\" class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('detailtableheader') == -1) && (detailtableheadervisible==undefined || detailtableheadervisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"detailtableheader\" class=\"control-label\">Detail Table Header</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.detailtableheader?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"detailtableheader\"\r\n                    formControlName=\"detailtableheader\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('detailtablefooter') == -1) && (detailtablefootervisible==undefined || detailtablefootervisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"detailtablefooter\" class=\"control-label\">Detail Table Footer</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.detailtablefooter?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"detailtablefooter\"\r\n                    formControlName=\"detailtablefooter\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('detailtablequery') == -1) && (detailtablequeryvisible==undefined || detailtablequeryvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"detailtablequery\" class=\"control-label\">Detail Table Query</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.detailtablequery?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"detailtablequery\"\r\n                    formControlName=\"detailtablequery\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('masterdetailwhere') == -1) && (masterdetailwherevisible==undefined || masterdetailwherevisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"masterdetailwhere\" class=\"control-label\">Master Detail Where</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.masterdetailwhere?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"masterdetailwhere\"\r\n                    formControlName=\"masterdetailwhere\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Others' [selected]='false'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('numrows') == -1) && (numrowsvisible==undefined || numrowsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"numrows\" class=\"control-label\">Num Rows</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.numrows?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"numrows\" formControlName=\"numrows\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--reportoutputtype-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('reportoutputtype') == -1) && (reportoutputtypevisible==undefined || reportoutputtypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"reportoutputtype\" class=\"control-label\">Report Output Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"reportoutputtype\" (change)=\"reportoutputtype_onChange($event.target)\"\r\n                    formControlName=\"reportoutputtype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of reportoutputtype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.reportoutputtypedesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('noheader') == -1) && (noheadervisible==undefined || noheadervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"noheader\" class=\"control-label\">No Header</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.noheader?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"noheader\" formControlName=\"noheader\"\r\n                      class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('header') == -1) && (headervisible==undefined || headervisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"header\" class=\"control-label\">Header</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.header?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"header\"\r\n                    formControlName=\"header\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('footer') == -1) && (footervisible==undefined || footervisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footer\" class=\"control-label\">Footer</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footer?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footer\"\r\n                    formControlName=\"footer\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('headerquery') == -1) && (headerqueryvisible==undefined || headerqueryvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"headerquery\" class=\"control-label\">Header Query</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.headerquery?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"headerquery\"\r\n                    formControlName=\"headerquery\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footerquery') == -1) && (footerqueryvisible==undefined || footerqueryvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footerquery\" class=\"control-label\">Footer Query</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footerquery?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footerquery\"\r\n                    formControlName=\"footerquery\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('headerquery1') == -1) && (headerquery1visible==undefined || headerquery1visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"headerquery1\" class=\"control-label\">Header Query1</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.headerquery1?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"headerquery1\"\r\n                    formControlName=\"headerquery1\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footerquery1') == -1) && (footerquery1visible==undefined || footerquery1visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footerquery1\" class=\"control-label\">Footer Query1</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footerquery1?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footerquery1\"\r\n                    formControlName=\"footerquery1\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('headerquery2') == -1) && (headerquery2visible==undefined || headerquery2visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"headerquery2\" class=\"control-label\">Header Query2</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.headerquery2?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"headerquery2\"\r\n                    formControlName=\"headerquery2\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footerquery2') == -1) && (footerquery2visible==undefined || footerquery2visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footerquery2\" class=\"control-label\">Footer Query2</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footerquery2?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footerquery2\"\r\n                    formControlName=\"footerquery2\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('headerquery3') == -1) && (headerquery3visible==undefined || headerquery3visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"headerquery3\" class=\"control-label\">Header Query3</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.headerquery3?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"headerquery3\"\r\n                    formControlName=\"headerquery3\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footerquery3') == -1) && (footerquery3visible==undefined || footerquery3visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footerquery3\" class=\"control-label\">Footer Query3</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footerquery3?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footerquery3\"\r\n                    formControlName=\"footerquery3\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('headerquery4') == -1) && (headerquery4visible==undefined || headerquery4visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"headerquery4\" class=\"control-label\">Header Query4</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.headerquery4?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"headerquery4\"\r\n                    formControlName=\"headerquery4\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footerquery4') == -1) && (footerquery4visible==undefined || footerquery4visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footerquery4\" class=\"control-label\">Footer Query4</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footerquery4?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footerquery4\"\r\n                    formControlName=\"footerquery4\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('headerquery5') == -1) && (headerquery5visible==undefined || headerquery5visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"headerquery5\" class=\"control-label\">Header Query5</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.headerquery5?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"headerquery5\"\r\n                    formControlName=\"headerquery5\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footerquery5') == -1) && (footerquery5visible==undefined || footerquery5visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footerquery5\" class=\"control-label\">Footer Query5</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footerquery5?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footerquery5\"\r\n                    formControlName=\"footerquery5\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('header1') == -1) && (header1visible==undefined || header1visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"header1\" class=\"control-label\">Header1</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.header1?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"header1\"\r\n                    formControlName=\"header1\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footer1') == -1) && (footer1visible==undefined || footer1visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footer1\" class=\"control-label\">Footer1</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footer1?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footer1\"\r\n                    formControlName=\"footer1\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('header2') == -1) && (header2visible==undefined || header2visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"header2\" class=\"control-label\">Header2</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.header2?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"header2\"\r\n                    formControlName=\"header2\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footer2') == -1) && (footer2visible==undefined || footer2visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footer2\" class=\"control-label\">Footer2</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footer2?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footer2\"\r\n                    formControlName=\"footer2\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('header3') == -1) && (header3visible==undefined || header3visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"header3\" class=\"control-label\">Header3</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.header3?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"header3\"\r\n                    formControlName=\"header3\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footer3') == -1) && (footer3visible==undefined || footer3visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footer3\" class=\"control-label\">Footer3</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footer3?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footer3\"\r\n                    formControlName=\"footer3\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('header4') == -1) && (header4visible==undefined || header4visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"header4\" class=\"control-label\">Header4</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.header4?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"header4\"\r\n                    formControlName=\"header4\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footer4') == -1) && (footer4visible==undefined || footer4visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footer4\" class=\"control-label\">Footer4</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footer4?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footer4\"\r\n                    formControlName=\"footer4\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('header5') == -1) && (header5visible==undefined || header5visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"header5\" class=\"control-label\">Header5</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.header5?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"header5\"\r\n                    formControlName=\"header5\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('footer5') == -1) && (footer5visible==undefined || footer5visible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"footer5\" class=\"control-label\">Footer5</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.footer5?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footer5\"\r\n                    formControlName=\"footer5\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('css') == -1) && (cssvisible==undefined || cssvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"css\" class=\"control-label\">C S S</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.css?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"css\"\r\n                    formControlName=\"css\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--viewhtmltype-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('viewhtmltype') == -1) && (viewhtmltypevisible==undefined || viewhtmltypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"viewhtmltype\" class=\"control-label\">View H T M L Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"viewhtmltype\" (change)=\"viewhtmltype_onChange($event.target)\"\r\n                    formControlName=\"viewhtmltype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of viewhtmltype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.viewhtmltypedesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('viewhtml') == -1) && (viewhtmlvisible==undefined || viewhtmlvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"viewhtml\" class=\"control-label\">View Html</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.viewhtml?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"viewhtml\"\r\n                    formControlName=\"viewhtml\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('viewcss') == -1) && (viewcssvisible==undefined || viewcssvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"viewcss\" class=\"control-label\">View C S S</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.viewcss?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"viewcss\"\r\n                    formControlName=\"viewcss\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('reporthtml') == -1) && (reporthtmlvisible==undefined || reporthtmlvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"reporthtml\" class=\"control-label\">Report H T M L</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.reporthtml?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"reporthtml\"\r\n                    formControlName=\"reporthtml\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--workflowhtmltype-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('workflowhtmltype') == -1) && (workflowhtmltypevisible==undefined || workflowhtmltypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"workflowhtmltype\" class=\"control-label\">Work Flow H T M L\r\n                    Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"workflowhtmltype\" (change)=\"workflowhtmltype_onChange($event.target)\"\r\n                    formControlName=\"workflowhtmltype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of workflowhtmltype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.workflowhtmltypedesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('workflowhtml') == -1) && (workflowhtmlvisible==undefined || workflowhtmlvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"workflowhtml\" class=\"control-label\">Work Flow H T M L</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.workflowhtml?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"workflowhtml\"\r\n                    formControlName=\"workflowhtml\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('component') == -1) && (componentvisible==undefined || componentvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"component\" class=\"control-label\">Component</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.component?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"component\" formControlName=\"component\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('alternateview') == -1) && (alternateviewvisible==undefined || alternateviewvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"alternateview\" class=\"control-label\">Alternate View</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.alternateview?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"alternateview\" formControlName=\"alternateview\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--recordtype-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('recordtype') == -1) && (recordtypevisible==undefined || recordtypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"recordtype\" class=\"control-label\">Record Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"recordtype\" (change)=\"recordtype_onChange($event.target)\"\r\n                    formControlName=\"recordtype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of recordtype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.recordtypedesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('userfield') == -1) && (userfieldvisible==undefined || userfieldvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"userfield\" class=\"control-label\">User Field</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.userfield?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"userfield\" formControlName=\"userfield\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('employeefield') == -1) && (employeefieldvisible==undefined || employeefieldvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"employeefield\" class=\"control-label\">Employee Field</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.employeefield?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"employeefield\" formControlName=\"employeefield\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('userfiltertype') == -1) && (userfiltertypevisible==undefined || userfiltertypevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"userfiltertype\" class=\"control-label\">User Filter Type</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.userfiltertype?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"userfiltertype\" formControlName=\"userfiltertype\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('rolefield') == -1) && (rolefieldvisible==undefined || rolefieldvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"rolefield\" class=\"control-label\">Role Field</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.rolefield?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"rolefield\" formControlName=\"rolefield\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--dashboardid-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('dashboardid') == -1) && (dashboardidvisible==undefined || dashboardidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"dashboardid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_dashboardid(null)\">Dashboard</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"dashboardid_List\"\r\n                    [optionsEvent]=\"dashboardid_optionsEvent\" [form]=\"bodashboard\"\r\n                    (selectItem)=\"onSelected_dashboardid($event)\" [reportid]='ybg3p' [menuid]='ybg3p'\r\n                    formControlName=\"dashboardid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.dashboardiddesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('tableheader') == -1) && (tableheadervisible==undefined || tableheadervisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"tableheader\" class=\"control-label\">Table Header</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.tableheader?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"tableheader\"\r\n                    formControlName=\"tableheader\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('reportjsondata') == -1) && (reportjsondatavisible==undefined || reportjsondatavisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"reportjsondata\" class=\"control-label\">Report J S O N Data</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.reportjsondata?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"reportjsondata\"\r\n                    formControlName=\"reportjsondata\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('helptext') == -1) && (helptextvisible==undefined || helptextvisible==true))\"\r\n                  style='width:1500px' class=\"col-12 \">\r\n                  <label for=\"helptext\" class=\"control-label\">Help Text</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.helptext?.value}}</label>\r\n                  <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"helptext\"\r\n                    formControlName=\"helptext\" class=\"form-control\">\r\n</textarea>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('filters') == -1) && (filtersvisible==undefined || filtersvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"filters\" class=\"control-label\">Filters</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.filters?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"filters\" formControlName=\"filters\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('filtercolumns') == -1) && (filtercolumnsvisible==undefined || filtercolumnsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"filtercolumns\" class=\"control-label\">Filter Columns</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.filtercolumns?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"filtercolumns\" formControlName=\"filtercolumns\" class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">boreportdetails</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table boreportdetails-->\r\n            <div [ngClass]=\"Is_boreportdetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'boreportdetails' | translate}}\r\n                <select class='child' id=\"boreportdetailsPagingdropdown\"\r\n                  (change)=\"boreportdetails_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"boreportdetailtoggleOption();boreportdetails_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showboreportdetailsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"boreportdetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_boreportdetails (userRowSelect)=\"handle_boreportdetails_GridSelected($event)\"\r\n                [settings]=\"boreportdetails_settings\" (custom)=\"onCustom_boreportdetails_Action($event)\"\r\n                [source]=\"tbl_boreportdetails?.source?.data\" (delete)=\"boreportdetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"boreportdetails_route($event,'delete')\"\r\n                (create)=\"boreportdetails_route($event,'create')\" (createConfirm)=\"boreportdetails_beforesave($event)\"\r\n                (edit)=\"boreportdetails_route($event,'edit')\" (editConfirm)=\"boreportdetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table boreportdetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">boreportothertables</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table boreportothertables-->\r\n            <div [ngClass]=\"Is_boreportothertables_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'boreportothertables' | translate}}\r\n                <select class='child' id=\"boreportothertablesPagingdropdown\"\r\n                  (change)=\"boreportothertables_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"boreportothertabletoggleOption();boreportothertables_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showboreportothertablesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"boreportothertables_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_boreportothertables\r\n                (userRowSelect)=\"handle_boreportothertables_GridSelected($event)\"\r\n                [settings]=\"boreportothertables_settings\" (custom)=\"onCustom_boreportothertables_Action($event)\"\r\n                [source]=\"tbl_boreportothertables?.source?.data\" (delete)=\"boreportothertables_route($event,'delete')\"\r\n                (deleteConfirm)=\"boreportothertables_route($event,'delete')\"\r\n                (create)=\"boreportothertables_route($event,'create')\"\r\n                (createConfirm)=\"boreportothertables_beforesave($event)\"\r\n                (edit)=\"boreportothertables_route($event,'edit')\"\r\n                (editConfirm)=\"boreportothertables_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table boreportothertables-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Columns</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table boreportcolumns-->\r\n            <div [ngClass]=\"Is_boreportcolumns_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Columns' | translate}}\r\n                <select class='child' id=\"boreportcolumnsPagingdropdown\"\r\n                  (change)=\"boreportcolumns_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"boreportcolumntoggleOption();boreportcolumns_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showboreportcolumnsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"boreportcolumns_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_boreportcolumns (userRowSelect)=\"handle_boreportcolumns_GridSelected($event)\"\r\n                [settings]=\"boreportcolumns_settings\" (custom)=\"onCustom_boreportcolumns_Action($event)\"\r\n                [source]=\"tbl_boreportcolumns?.source?.data\" (delete)=\"boreportcolumns_route($event,'delete')\"\r\n                (deleteConfirm)=\"boreportcolumns_route($event,'delete')\"\r\n                (create)=\"boreportcolumns_route($event,'create')\" (createConfirm)=\"boreportcolumns_beforesave($event)\"\r\n                (edit)=\"boreportcolumns_route($event,'edit')\" (editConfirm)=\"boreportcolumns_beforesave($event)\">\r\n              </ng2-smart-table>\r\n              <button type=\"button\" (click)=\"boreportcolumnsmoveUp()\"><i class=\"fas fa-arrow-up\"></i></button>\r\n              <button type=\"button\" (click)=\"boreportcolumnsmoveDown()\"><i class=\"fas fa-arrow-down\"></i></button>\r\n            </div>\r\n            <!--End of child table boreportcolumns-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 71852:
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boreportcolumn/boreportcolumn.component.html ***!
  \*****************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"boreportcolumn_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second bgcolor\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Columns' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_boreportcolumns()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of boreportcolumn_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.reportcolumnid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.reportcolumnid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('reportid') == -1) && (reportidvisible==undefined || reportidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"reportid\" class=\"control-label\">Report</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.reportid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"reportid\" formControlName=\"reportid\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('tablealias') == -1) && (tablealiasvisible==undefined || tablealiasvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"tablealias\" class=\"control-label\">Table Alias</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.tablealias?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"tablealias\" formControlName=\"tablealias\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('field') == -1) && (fieldvisible==undefined || fieldvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"field\" class=\"control-label\">Field</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.field?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"field\" formControlName=\"field\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('header') == -1) && (headervisible==undefined || headervisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"header\" class=\"control-label\">Header</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.header?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"header\" formControlName=\"header\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('columnalias') == -1) && (columnaliasvisible==undefined || columnaliasvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"columnalias\" class=\"control-label\">Column Alias</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.columnalias?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"columnalias\" formControlName=\"columnalias\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('hide') == -1) && (hidevisible==undefined || hidevisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"hide\" class=\"control-label\">Hide</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.hide?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"hide\" formControlName=\"hide\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('derived') == -1) && (derivedvisible==undefined || derivedvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"derived\" class=\"control-label\">Derived</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.derived?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"derived\" formControlName=\"derived\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--datatype-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('datatype') == -1) && (datatypevisible==undefined || datatypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"datatype\" class=\"control-label\">Datatype</label>\r\n        <select *ngIf=\"!showview\" id=\"datatype\" (change)=\"datatype_onChange($event.target)\" formControlName=\"datatype\"\r\n          class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of datatype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.datatypedesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('fkfilter') == -1) && (fkfiltervisible==undefined || fkfiltervisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"fkfilter\" class=\"control-label\">F K Filter</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.fkfilter?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"fkfilter\" formControlName=\"fkfilter\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--filtertype-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('filtertype') == -1) && (filtertypevisible==undefined || filtertypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"filtertype\" class=\"control-label\">Filter Type</label>\r\n        <select *ngIf=\"!showview\" id=\"filtertype\" (change)=\"filtertype_onChange($event.target)\"\r\n          formControlName=\"filtertype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of filtertype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.filtertypedesc?.value}}</label>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <p-accordion [multiple]='true'>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <p-accordionTab header='Others' [selected]='false'>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('width') == -1) && (widthvisible==undefined || widthvisible==true))\" style=''\r\n            class=\"col-3 \">\r\n            <label for=\"width\" class=\"control-label\">Width</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.width?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"width\" formControlName=\"width\" class=\"form-control\">\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('nofilter') == -1) && (nofiltervisible==undefined || nofiltervisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"nofilter\" class=\"control-label\">No Filter</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.nofilter?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"nofilter\" formControlName=\"nofilter\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('groupby') == -1) && (groupbyvisible==undefined || groupbyvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"groupby\" class=\"control-label\">Group By</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.groupby?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"groupby\" formControlName=\"groupby\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('sum') == -1) && (sumvisible==undefined || sumvisible==true))\" style=''\r\n            class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"sum\" class=\"control-label\">Sum</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.sum?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"sum\" formControlName=\"sum\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('count') == -1) && (countvisible==undefined || countvisible==true))\" style=''\r\n            class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"count\" class=\"control-label\">Count</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.count?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"count\" formControlName=\"count\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('colhtml') == -1) && (colhtmlvisible==undefined || colhtmlvisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"colhtml\" class=\"control-label\">Col H T M L</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.colhtml?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"colhtml\"\r\n              formControlName=\"colhtml\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('poptitle') == -1) && (poptitlevisible==undefined || poptitlevisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"poptitle\" class=\"control-label\">Pop Title</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.poptitle?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"poptitle\" formControlName=\"poptitle\" class=\"form-control\">\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('link') == -1) && (linkvisible==undefined || linkvisible==true))\" style=''\r\n            class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"link\" class=\"control-label\">Link</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.link?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"link\" formControlName=\"link\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('linkurl') == -1) && (linkurlvisible==undefined || linkurlvisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"linkurl\" class=\"control-label\">Link U R L</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.linkurl?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"linkurl\"\r\n              formControlName=\"linkurl\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('service') == -1) && (servicevisible==undefined || servicevisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"service\" class=\"control-label\">Service</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.service?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"service\" formControlName=\"service\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('servicename') == -1) && (servicenamevisible==undefined || servicenamevisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"servicename\" class=\"control-label\">Service Name</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.servicename?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"servicename\"\r\n              formControlName=\"servicename\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('sp') == -1) && (spvisible==undefined || spvisible==true))\" style=''\r\n            class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"sp\" class=\"control-label\">S P</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.sp?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"sp\" formControlName=\"sp\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('spname') == -1) && (spnamevisible==undefined || spnamevisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"spname\" class=\"control-label\">S P Name</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.spname?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"spname\"\r\n              formControlName=\"spname\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('alert') == -1) && (alertvisible==undefined || alertvisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"alert\" class=\"control-label\">Alert</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.alert?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"alert\"\r\n              formControlName=\"alert\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('caps') == -1) && (capsvisible==undefined || capsvisible==true))\" style=''\r\n            class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"caps\" class=\"control-label\">Caps</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.caps?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"caps\" formControlName=\"caps\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('bold') == -1) && (boldvisible==undefined || boldvisible==true))\" style=''\r\n            class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"bold\" class=\"control-label\">Bold</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.bold?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"bold\" formControlName=\"bold\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('italic') == -1) && (italicvisible==undefined || italicvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"italic\" class=\"control-label\">Italic</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.italic?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"italic\" formControlName=\"italic\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('strikethrough') == -1) && (strikethroughvisible==undefined || strikethroughvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"strikethrough\" class=\"control-label\">Strikethrough</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.strikethrough?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"strikethrough\" formControlName=\"strikethrough\"\r\n                class=\"form-control\">\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('bgcolor') == -1) && (bgcolorvisible==undefined || bgcolorvisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"bgcolor\" class=\"control-label\">B G Color</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.bgcolor?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"bgcolor\"\r\n              formControlName=\"bgcolor\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('forecolor') == -1) && (forecolorvisible==undefined || forecolorvisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"forecolor\" class=\"control-label\">Fore Color</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.forecolor?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"forecolor\"\r\n              formControlName=\"forecolor\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('conditionstyle') == -1) && (conditionstylevisible==undefined || conditionstylevisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"conditionstyle\" class=\"control-label\">Condition Style</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.conditionstyle?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"conditionstyle\"\r\n              formControlName=\"conditionstyle\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('performancestatusvalues') == -1) && (performancestatusvaluesvisible==undefined || performancestatusvaluesvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"performancestatusvalues\" class=\"control-label\">Performance Status Values</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.performancestatusvalues?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"performancestatusvalues\" formControlName=\"performancestatusvalues\"\r\n              class=\"form-control\">\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('notsortable') == -1) && (notsortablevisible==undefined || notsortablevisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"notsortable\" class=\"control-label\">Not Sortable</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.notsortable?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"notsortable\" formControlName=\"notsortable\"\r\n                class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('sequence') == -1) && (sequencevisible==undefined || sequencevisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"sequence\" class=\"control-label\">Sequence</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.sequence?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"sequence\" formControlName=\"sequence\" class=\"form-control\">\r\n          </div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('sumcondition') == -1) && (sumconditionvisible==undefined || sumconditionvisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"sumcondition\" class=\"control-label\">Sum Condition</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.sumcondition?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"sumcondition\"\r\n              formControlName=\"sumcondition\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('countcondition') == -1) && (countconditionvisible==undefined || countconditionvisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"countcondition\" class=\"control-label\">Count Condition</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.countcondition?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"countcondition\"\r\n              formControlName=\"countcondition\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('min') == -1) && (minvisible==undefined || minvisible==true))\" style=''\r\n            class=\"col-3 \">\r\n            <label for=\"min\" class=\"control-label\">Min</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.min?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"min\" formControlName=\"min\" class=\"form-control\">\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('max') == -1) && (maxvisible==undefined || maxvisible==true))\" style=''\r\n            class=\"col-3 \">\r\n            <label for=\"max\" class=\"control-label\">Max</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.max?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"max\" formControlName=\"max\" class=\"form-control\">\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('maxchars') == -1) && (maxcharsvisible==undefined || maxcharsvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"maxchars\" class=\"control-label\">Max Chars</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.maxchars?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"maxchars\" formControlName=\"maxchars\" class=\"form-control\">\r\n          </div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('helptext') == -1) && (helptextvisible==undefined || helptextvisible==true))\"\r\n            style='width:1500px' class=\"col-12 \">\r\n            <label for=\"helptext\" class=\"control-label\">Help Text</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.helptext?.value}}</label>\r\n            <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"helptext\"\r\n              formControlName=\"helptext\" class=\"form-control\">\r\n</textarea>\r\n          </div>\r\n        </div>\r\n      </p-accordionTab>\r\n    </p-accordion>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 44781:
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boreportdetail/boreportdetail.component.html ***!
  \*****************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"boreportdetail_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second bgcolor\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'boreportdetails' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_boreportdetails()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of boreportdetail_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.reportdetailid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.reportdetailid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('reportid') == -1) && (reportidvisible==undefined || reportidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"reportid\" class=\"control-label\">Report</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.reportid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"reportid\" formControlName=\"reportid\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('tablename') == -1) && (tablenamevisible==undefined || tablenamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"tablename\" class=\"control-label\">Table Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.tablename?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"tablename\" formControlName=\"tablename\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('formula') == -1) && (formulavisible==undefined || formulavisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"formula\" class=\"control-label\">Formula</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.formula?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"formula\"\r\n          formControlName=\"formula\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--separator-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('separator') == -1) && (separatorvisible==undefined || separatorvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"separator\" class=\"control-label\">Separator</label>\r\n        <select *ngIf=\"!showview\" id=\"separator\" (change)=\"separator_onChange($event.target)\"\r\n          formControlName=\"separator\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of separator_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.separatordesc?.value}}</label>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('header') == -1) && (headervisible==undefined || headervisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"header\" class=\"control-label\">Header</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.header?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"header\"\r\n          formControlName=\"header\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('footer') == -1) && (footervisible==undefined || footervisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"footer\" class=\"control-label\">Footer</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.footer?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"footer\"\r\n          formControlName=\"footer\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('wherecondition') == -1) && (whereconditionvisible==undefined || whereconditionvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"wherecondition\" class=\"control-label\">Where Condition</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.wherecondition?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"wherecondition\"\r\n          formControlName=\"wherecondition\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('alias') == -1) && (aliasvisible==undefined || aliasvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"alias\" class=\"control-label\">Alias</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.alias?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"alias\" formControlName=\"alias\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 58602:
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boreportothertable/boreportothertable.component.html ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"boreportothertable_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second bgcolor\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'boreportothertables' |\r\n        translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_boreportothertables()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of boreportothertable_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.othertableid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.othertableid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('reportid') == -1) && (reportidvisible==undefined || reportidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"reportid\" class=\"control-label\">Report</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.reportid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"reportid\" formControlName=\"reportid\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('tablename') == -1) && (tablenamevisible==undefined || tablenamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"tablename\" class=\"control-label\">Table Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.tablename?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"tablename\" formControlName=\"tablename\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('tablealias') == -1) && (tablealiasvisible==undefined || tablealiasvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"tablealias\" class=\"control-label\">Table Alias</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.tablealias?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"tablealias\" formControlName=\"tablealias\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--jointype-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('jointype') == -1) && (jointypevisible==undefined || jointypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"jointype\" class=\"control-label\">Join Type</label>\r\n        <select *ngIf=\"!showview\" id=\"jointype\" (change)=\"jointype_onChange($event.target)\" formControlName=\"jointype\"\r\n          class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of jointype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.jointypedesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('wherecondition') == -1) && (whereconditionvisible==undefined || whereconditionvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"wherecondition\" class=\"control-label\">Where Condition</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.wherecondition?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"wherecondition\"\r\n          formControlName=\"wherecondition\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_boreport_boreport_module_ts.js.map