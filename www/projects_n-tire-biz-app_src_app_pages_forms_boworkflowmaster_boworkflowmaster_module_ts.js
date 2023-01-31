"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_boworkflowmaster_boworkflowmaster_module_ts"],{

/***/ 65841:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boworkflowmaster/boworkflowmaster.component.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boworkflowmasterComponent": () => (/* binding */ boworkflowmasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boworkflowmaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boworkflowmaster.component.html */ 85986);
/* harmony import */ var _service_boworkflowmaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/boworkflowmaster.service */ 23654);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component */ 55163);
/* harmony import */ var _n_tire_biz_app_src_app_custom_duration_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/duration.component */ 98922);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_boworkflow_boworkflow_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/boworkflow/boworkflow.component */ 53401);
/* harmony import */ var _service_boworkflow_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/boworkflow.service */ 75021);
/* harmony import */ var _pages_forms_boworkflowstep_boworkflowstep_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/boworkflowstep/boworkflowstep.component */ 44372);
/* harmony import */ var _service_boworkflowstep_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../service/boworkflowstep.service */ 27935);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);








//child table

//Custom control



//Shortcuts

//translator







//primeng services



//session,application constants




//custom fields & attachments

let boworkflowmasterComponent = class boworkflowmasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, boworkflowmaster_service, boworkflow_service, boworkflowstep_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.boworkflowmaster_service = boworkflowmaster_service;
        this.boworkflow_service = boworkflow_service;
        this.boworkflowstep_service = boworkflowstep_service;
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
        this.bfilterPopulate_boworkflowmasters = false;
        this.bfilterPopulate_boworkflows = false;
        this.bfilterPopulate_boworkflowsteps = false;
        this.boworkflowmaster_menuactions = [];
        this.boworkflow_menuactions = [];
        this.boworkflowstep_menuactions = [];
        this.menucode_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.tablecode_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_13__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.Deleted_boworkflow_IDs = "";
        this.boworkflows_ID = "1";
        this.Deleted_boworkflowstep_IDs = "";
        this.boworkflowsteps_ID = "2";
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
        this.boworkflowmaster_Form = this.fb.group({
            pk: [null],
            workflowmasterid: [null],
            description: [null],
            menucode: [null],
            menucodedesc: [null],
            tablecode: [null],
            tablecodedesc: [null],
            workflowhtml: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.boworkflowmaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.boworkflowmaster_Form.dirty && this.boworkflowmaster_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.workflowmasterid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.workflowmasterid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.workflowmasterid && pkDetail) {
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
            let boworkflowmasterid = null;
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
            this.formid = boworkflowmasterid;
            //alert(boworkflowmasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_boworkflows_TableConfig();
                setTimeout(() => {
                    //this.Set_boworkflows_TableDropDownConfig();
                });
                this.Set_boworkflowsteps_TableConfig();
                setTimeout(() => {
                    //this.Set_boworkflowsteps_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys 
            }
            this.boworkflowmaster_service.getDefaultData().then(res => {
                this.menucode_List = res.list_menucode.value;
                this.tablecode_List = res.list_tablecode.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.boworkflowmaster_service.get_boworkflowmasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.boworkflowmaster_Form.markAsUntouched();
            this.boworkflowmaster_Form.markAsPristine();
        });
    }
    onSelected_menucode(menucodeDetail) {
        if (menucodeDetail.value && menucodeDetail) {
            this.boworkflowmaster_Form.patchValue({
                menucode: menucodeDetail.value,
                menucodedesc: menucodeDetail.label,
            });
        }
    }
    onSelected_tablecode(tablecodeDetail) {
        if (tablecodeDetail.value && tablecodeDetail) {
            this.boworkflowmaster_Form.patchValue({
                tablecode: tablecodeDetail.value,
                tablecodedesc: tablecodeDetail.label,
            });
        }
    }
    resetForm() {
        if (this.boworkflowmaster_Form != null)
            this.boworkflowmaster_Form.reset();
        this.boworkflowmaster_Form.patchValue({});
        setTimeout(() => {
            this.boworkflows_LoadTable();
            this.boworkflowsteps_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let workflowmasterid = this.boworkflowmaster_Form.get('workflowmasterid').value;
        if (workflowmasterid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boworkflowmaster_service.delete_boworkflowmaster(workflowmasterid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boworkflowmaster_Form.patchValue({
            workflowmasterid: null
        });
        if (this.formData.workflowmasterid != null)
            this.formData.workflowmasterid = null;
        for (let i = 0; i < this.tbl_boworkflows.source.length; i++) {
            this.tbl_boworkflows.source[i].workflowid = null;
        }
        for (let i = 0; i < this.tbl_boworkflowsteps.source.length; i++) {
            this.tbl_boworkflowsteps.source[i].workflowstepid = null;
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
                        this.boworkflowmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boworkflowmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boworkflowmaster_Form.controls[key] != undefined) {
                                this.boworkflowmaster_Form.controls[key].disable({ onlySelf: true });
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
    menucode_onChange(evt) {
        let e = evt.value;
    }
    tablecode_onChange(evt) {
        let e = evt.value;
    }
    edit_boworkflowmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.boworkflowmaster_service.get_boworkflowmasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.boworkflowmaster;
                let formproperty = res.boworkflowmaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.boworkflowmaster.pkcol;
                this.formid = res.boworkflowmaster.workflowmasterid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.boworkflowmaster;
        this.formid = res.boworkflowmaster.workflowmasterid;
        this.pkcol = res.boworkflowmaster.pkcol;
        this.bmyrecord = false;
        if (res.boworkflowmaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boworkflowmaster_Form.patchValue({
            workflowmasterid: res.boworkflowmaster.workflowmasterid,
            description: res.boworkflowmaster.description,
            menucode: res.boworkflowmaster.menucode,
            menucodedesc: res.boworkflowmaster.menucodedesc,
            tablecode: res.boworkflowmaster.tablecode,
            tablecodedesc: res.boworkflowmaster.tablecodedesc,
            workflowhtml: res.boworkflowmaster.workflowhtml,
            status: res.boworkflowmaster.status,
            statusdesc: res.boworkflowmaster.statusdesc,
        });
        this.boworkflowmaster_menuactions = res.boworkflowmaster_menuactions;
        this.boworkflow_menuactions = res.boworkflow_menuactions;
        this.boworkflows_visiblelist = res.boworkflows_visiblelist;
        this.boworkflowstep_menuactions = res.boworkflowstep_menuactions;
        this.boworkflowsteps_visiblelist = res.boworkflowsteps_visiblelist;
        //Child Tables if any
        this.Set_boworkflows_TableConfig();
        this.boworkflows_LoadTable(res.boworkflows);
        this.Set_boworkflowsteps_TableConfig();
        this.boworkflowsteps_LoadTable(res.boworkflowsteps);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.boworkflowmaster_Form.controls) {
            let val = this.boworkflowmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.boworkflowmaster_Form.controls[key] != null) {
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
            if (!this.boworkflowmaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.boworkflowmaster_Form.getRawValue();
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
        var _a, _b, _c, _d;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.boworkflowmaster_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.boworkflowmaster_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.boworkflowmaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.boworkflowmaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.boworkflowmaster_Form.controls[key] != null) {
                            this.formData[key] = this.boworkflowmaster_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.Deleted_boworkflow_IDs = this.Deleted_boworkflow_IDs;
            this.formData.Deleted_boworkflowstep_IDs = this.Deleted_boworkflowstep_IDs;
            console.log(this.formData);
            this.spinner.show();
            this.boworkflowmaster_service.saveOrUpdate_boworkflowmasters(this.formData, (_b = (_a = this.tbl_boworkflows) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_boworkflowsteps) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
                if (this.tbl_boworkflows.source) {
                    for (let i = 0; i < this.tbl_boworkflows.source.data.length; i++) {
                        if (this.tbl_boworkflows.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_boworkflows.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_boworkflowsteps.source) {
                    for (let i = 0; i < this.tbl_boworkflowsteps.source.data.length; i++) {
                        if (this.tbl_boworkflowsteps.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_boworkflowsteps.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.boworkflowmaster);
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
                        this.objvalues.push(res.boworkflowmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boworkflowmaster_Form.markAsUntouched();
                this.boworkflowmaster_Form.markAsPristine();
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
        this.tbl_boworkflows.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
        this.tbl_boworkflowsteps.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
    }
    AddOrEdit_boworkflow(event, workflowid, workflowmasterid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_boworkflow_boworkflow_component__WEBPACK_IMPORTED_MODULE_5__.boworkflowComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workflowid, workflowmasterid, visiblelist: this.boworkflows_visiblelist, hidelist: this.boworkflows_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boworkflows.source.add(res[i]);
                    }
                    this.tbl_boworkflows.source.refresh();
                }
                else {
                    this.tbl_boworkflows.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_boworkflow(event, childID, i) {
        if (childID != null)
            this.Deleted_boworkflow_IDs += childID + ",";
        this.tbl_boworkflows.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_boworkflowstep(event, workflowstepid, workflowmasterid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_boworkflowstep_boworkflowstep_component__WEBPACK_IMPORTED_MODULE_7__.boworkflowstepComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, workflowstepid, workflowmasterid, visiblelist: this.boworkflowsteps_visiblelist, hidelist: this.boworkflowsteps_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boworkflowsteps.source.add(res[i]);
                    }
                    this.tbl_boworkflowsteps.source.refresh();
                }
                else {
                    this.tbl_boworkflowsteps.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_boworkflowstep(event, childID, i) {
        if (childID != null)
            this.Deleted_boworkflowstep_IDs += childID + ",";
        this.tbl_boworkflowsteps.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_boworkflows_Checkbox() {
        debugger;
        if (this.tbl_boworkflows.source.settings['selectMode'] == 'multi')
            this.tbl_boworkflows.source.settings['selectMode'] = 'single';
        else
            this.tbl_boworkflows.source.settings['selectMode'] = 'multi';
        this.tbl_boworkflows.source.initGrid();
    }
    delete_boworkflows_All() {
        this.tbl_boworkflows.source.settings['selectMode'] = 'single';
    }
    show_boworkflows_Filter() {
        setTimeout(() => {
            //  this.Set_boworkflows_TableDropDownConfig();
        });
        if (this.tbl_boworkflows.source.settings != null)
            this.tbl_boworkflows.source.settings['hideSubHeader'] = !this.tbl_boworkflows.source.settings['hideSubHeader'];
        this.tbl_boworkflows.source.initGrid();
    }
    show_boworkflows_InActive() {
    }
    enable_boworkflows_InActive() {
    }
    Set_boworkflows_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_boworkflows) {
                var clone = this.sharedService.clone(this.tbl_boworkflows.source.settings);
                if (clone.columns['currentapproved'] != undefined)
                    clone.columns['currentapproved'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_currentapproved.value)), }, };
                if (clone.columns['currentapproved'] != undefined)
                    clone.columns['currentapproved'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_currentapproved.value)), }, };
                this.tbl_boworkflows.source.settings = clone;
                this.tbl_boworkflows.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boworkflows.source.settings);
                if (clone.columns['standardrating'] != undefined)
                    clone.columns['standardrating'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_standardrating.value)), }, };
                if (clone.columns['standardrating'] != undefined)
                    clone.columns['standardrating'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_standardrating.value)), }, };
                this.tbl_boworkflows.source.settings = clone;
                this.tbl_boworkflows.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boworkflows.source.settings);
                if (clone.columns['performancerating'] != undefined)
                    clone.columns['performancerating'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_performancerating.value)), }, };
                if (clone.columns['performancerating'] != undefined)
                    clone.columns['performancerating'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_performancerating.value)), }, };
                this.tbl_boworkflows.source.settings = clone;
                this.tbl_boworkflows.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boworkflows.source.settings);
                if (clone.columns['performancestatus'] != undefined)
                    clone.columns['performancestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_performancestatus.value)), }, };
                if (clone.columns['performancestatus'] != undefined)
                    clone.columns['performancestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_performancestatus.value)), }, };
                this.tbl_boworkflows.source.settings = clone;
                this.tbl_boworkflows.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boworkflows.source.settings);
                if (clone.columns['workflowstatus'] != undefined)
                    clone.columns['workflowstatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_workflowstatus.value)), }, };
                if (clone.columns['workflowstatus'] != undefined)
                    clone.columns['workflowstatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflows_workflowstatus.value)), }, };
                this.tbl_boworkflows.source.settings = clone;
                this.tbl_boworkflows.source.initGrid();
            }
            this.bfilterPopulate_boworkflows = true;
        });
    }
    boworkflows_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_boworkflows_TableConfig() {
        this.boworkflows_settings = {
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
                custom: this.boworkflow_menuactions
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
                currentstepno: {
                    title: 'Current Step No',
                    type: 'number',
                    filter: true,
                },
                modulename: {
                    title: 'Module Name',
                    type: '',
                    filter: true,
                },
                pkvalue: {
                    title: 'P K Value',
                    type: 'number',
                    filter: true,
                },
                currentapproveddesc: {
                    title: 'Current Approved',
                    type: 'html',
                    filter: true,
                },
                currentapprovers: {
                    title: 'Current Approvers',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                nextapprovers: {
                    title: 'Next Approvers',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                assigneddatetime: {
                    title: 'Assigned Date Time',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_3__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_3__.SmartTableDatepickerComponent,
                    },
                },
                closeddatetime: {
                    title: 'Closed Date Time',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_3__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_3__.SmartTableDatepickerComponent,
                    },
                },
                standardratingdesc: {
                    title: 'Standard Rating',
                    type: 'html',
                    filter: true,
                },
                performanceratingdesc: {
                    title: 'Performance Rating',
                    type: 'html',
                    filter: true,
                },
                performancestatusdesc: {
                    title: 'Performance Status',
                    type: 'html',
                    filter: true,
                },
                exception: {
                    title: 'Exception',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                approvedusers: {
                    title: 'Approved Users',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                approvedcondition: {
                    title: 'Approved Condition',
                    type: '',
                    filter: true,
                },
                tathours: {
                    title: 'T A T Hours',
                    type: '',
                    filter: true,
                    renderComponent: _n_tire_biz_app_src_app_custom_duration_component__WEBPACK_IMPORTED_MODULE_4__.durationComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_duration_component__WEBPACK_IMPORTED_MODULE_4__.durationComponent,
                    },
                },
                totalactualtime: {
                    title: 'Total Actual Time',
                    type: '',
                    filter: true,
                    renderComponent: _n_tire_biz_app_src_app_custom_duration_component__WEBPACK_IMPORTED_MODULE_4__.durationComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_duration_component__WEBPACK_IMPORTED_MODULE_4__.durationComponent,
                    },
                },
                processid: {
                    title: 'Process',
                    type: 'number',
                    filter: true,
                },
                workflowdetails: {
                    title: 'Work Flow Details',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                comments: {
                    title: 'Comments',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseComment(cell);
                        return ret;
                    },
                },
                history: {
                    title: 'History',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                lastapprover: {
                    title: 'Last Approver',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                cc: {
                    title: 'C C',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                customfield: {
                    title: 'Custom Field',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.getCustomValue(cell);
                        return ret;
                    },
                },
                attachment: {
                    title: 'Attachment',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.getAttachmentValue(cell);
                        return ret;
                    },
                },
                workflowstatusdesc: {
                    title: 'Work Flow Status',
                    type: 'html',
                    filter: true,
                },
            },
        };
    }
    boworkflows_LoadTable(boworkflows = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflows_ID) >= 0) {
            if (this.tbl_boworkflows != undefined)
                this.tbl_boworkflows.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
            if (this.tbl_boworkflows != undefined)
                this.tbl_boworkflows.source.load(boworkflows);
            if (this.tbl_boworkflows != undefined)
                this.tbl_boworkflows.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    boworkflows_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boworkflowmaster_service.boworkflows.length == 0)
    {
        this.tbl_boworkflows.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boworkflow();
        this.boworkflowmaster_service.boworkflows.push(obj);
        this.tbl_boworkflows.source.refresh();
        if ((this.boworkflowmaster_service.boworkflows.length / this.tbl_boworkflows.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boworkflows.source.getPaging().page)
        {
            this.tbl_boworkflows.source.setPage((this.boworkflowmaster_service.boworkflows.length / this.tbl_boworkflows.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boworkflows.source.grid.edit(this.tbl_boworkflows.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boworkflows.source.data.indexOf(event.data);
    this.onDelete_boworkflow(event,event.data.workflowid,((this.tbl_boworkflows.source.getPaging().page-1) *this.tbl_boworkflows.source.getPaging().perPage)+index);
    this.tbl_boworkflows.source.refresh();
    break;
    }
    }
    
    */
    boworkflows_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_boworkflow(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boworkflow(event, event.data.workflowid, this.formid);
                break;
            case 'delete':
                this.onDelete_boworkflow(event, event.data.workflowid, ((this.tbl_boworkflows.source.getPaging().page - 1) * this.tbl_boworkflows.source.getPaging().perPage) + event.index);
                this.tbl_boworkflows.source.refresh();
                break;
        }
    }
    boworkflows_onDelete(obj) {
        let workflowid = obj.data.workflowid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boworkflowmaster_service.delete_boworkflowmaster(workflowid).then(res => this.boworkflows_LoadTable());
        }
    }
    onCustom_boworkflows_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "boworkflows");
            let formname = objbomenuaction.actionname;
        });
    }
    boworkflows_Paging(val) {
        debugger;
        this.tbl_boworkflows.source.setPaging(1, val, true);
    }
    handle_boworkflows_GridSelected(event) {
        this.boworkflows_selectedindex = this.tbl_boworkflows.source.findIndex(i => i.workflowid === event.data.workflowid);
    }
    Is_boworkflows_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflows_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_boworkflowsteps_Checkbox() {
        debugger;
        if (this.tbl_boworkflowsteps.source.settings['selectMode'] == 'multi')
            this.tbl_boworkflowsteps.source.settings['selectMode'] = 'single';
        else
            this.tbl_boworkflowsteps.source.settings['selectMode'] = 'multi';
        this.tbl_boworkflowsteps.source.initGrid();
    }
    delete_boworkflowsteps_All() {
        this.tbl_boworkflowsteps.source.settings['selectMode'] = 'single';
    }
    show_boworkflowsteps_Filter() {
        setTimeout(() => {
            //  this.Set_boworkflowsteps_TableDropDownConfig();
        });
        if (this.tbl_boworkflowsteps.source.settings != null)
            this.tbl_boworkflowsteps.source.settings['hideSubHeader'] = !this.tbl_boworkflowsteps.source.settings['hideSubHeader'];
        this.tbl_boworkflowsteps.source.initGrid();
    }
    show_boworkflowsteps_InActive() {
    }
    enable_boworkflowsteps_InActive() {
    }
    Set_boworkflowsteps_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_boworkflowsteps) {
                var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
                if (clone.columns['task'] != undefined)
                    clone.columns['task'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_task.value)), }, };
                if (clone.columns['task'] != undefined)
                    clone.columns['task'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_task.value)), }, };
                this.tbl_boworkflowsteps.source.settings = clone;
                this.tbl_boworkflowsteps.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
                if (clone.columns['yesstep'] != undefined)
                    clone.columns['yesstep'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_yesstep.value)), }, };
                if (clone.columns['yesstep'] != undefined)
                    clone.columns['yesstep'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_yesstep.value)), }, };
                this.tbl_boworkflowsteps.source.settings = clone;
                this.tbl_boworkflowsteps.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
                if (clone.columns['nostep'] != undefined)
                    clone.columns['nostep'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_nostep.value)), }, };
                if (clone.columns['nostep'] != undefined)
                    clone.columns['nostep'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_nostep.value)), }, };
                this.tbl_boworkflowsteps.source.settings = clone;
                this.tbl_boworkflowsteps.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
                if (clone.columns['workflowuserfieldtype'] != undefined)
                    clone.columns['workflowuserfieldtype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_workflowuserfieldtype.value)), }, };
                if (clone.columns['workflowuserfieldtype'] != undefined)
                    clone.columns['workflowuserfieldtype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_workflowuserfieldtype.value)), }, };
                this.tbl_boworkflowsteps.source.settings = clone;
                this.tbl_boworkflowsteps.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
                if (clone.columns['parentid'] != undefined)
                    clone.columns['parentid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_parentid.value)), }, };
                if (clone.columns['parentid'] != undefined)
                    clone.columns['parentid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_parentid.value)), }, };
                this.tbl_boworkflowsteps.source.settings = clone;
                this.tbl_boworkflowsteps.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_boworkflowsteps.source.settings);
                if (clone.columns['customfieldid'] != undefined)
                    clone.columns['customfieldid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_customfieldid.value)), }, };
                if (clone.columns['customfieldid'] != undefined)
                    clone.columns['customfieldid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_boworkflowsteps_customfieldid.value)), }, };
                this.tbl_boworkflowsteps.source.settings = clone;
                this.tbl_boworkflowsteps.source.initGrid();
            }
            this.bfilterPopulate_boworkflowsteps = true;
        });
    }
    boworkflowsteps_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_boworkflowsteps_TableConfig() {
        this.boworkflowsteps_settings = {
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
                custom: this.boworkflowstep_menuactions
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
                stepno: {
                    title: 'Step No',
                    type: 'number',
                    filter: true,
                },
                stepname: {
                    title: 'Step Name',
                    type: '',
                    filter: true,
                },
                tat: {
                    title: 'T A T',
                    type: '',
                    filter: true,
                },
                taskdesc: {
                    title: 'Task',
                    type: 'html',
                    filter: true,
                },
                condition: {
                    title: 'Condition',
                    type: '',
                    filter: true,
                },
                yesstepdesc: {
                    title: 'Yes Step',
                    type: 'html',
                    filter: true,
                },
                nostepdesc: {
                    title: 'No Step',
                    type: 'html',
                    filter: true,
                },
                approver: {
                    title: 'Approver',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                workflowuserfieldtypedesc: {
                    title: 'Work Flow User Field Type',
                    type: 'html',
                    filter: true,
                },
                workflowuserfieldname: {
                    title: 'Work Flow User Field Name',
                    type: '',
                    filter: true,
                },
                parentiddesc: {
                    title: 'Parent',
                    type: 'html',
                    filter: true,
                },
                noedittransaction: {
                    title: 'No Edit Transaction',
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
                autoapproval: {
                    title: 'Auto Approval',
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
                autodenial: {
                    title: 'Auto Denial',
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
                waitduration: {
                    title: 'Wait Duration',
                    type: '',
                    filter: true,
                },
                remainderduration: {
                    title: 'Remainder Duration',
                    type: '',
                    filter: true,
                },
                escalationuser: {
                    title: 'Escalation User',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                cc: {
                    title: 'C C',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                customfieldiddesc: {
                    title: 'Custom Field',
                    type: 'html',
                    filter: true,
                },
            },
        };
    }
    boworkflowsteps_LoadTable(boworkflowsteps = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflowsteps_ID) >= 0) {
            if (this.tbl_boworkflowsteps != undefined)
                this.tbl_boworkflowsteps.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_16__.LocalDataSource();
            if (this.tbl_boworkflowsteps != undefined)
                this.tbl_boworkflowsteps.source.load(boworkflowsteps);
            if (this.tbl_boworkflowsteps != undefined)
                this.tbl_boworkflowsteps.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    boworkflowsteps_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boworkflowmaster_service.boworkflowsteps.length == 0)
    {
        this.tbl_boworkflowsteps.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boworkflowstep();
        this.boworkflowmaster_service.boworkflowsteps.push(obj);
        this.tbl_boworkflowsteps.source.refresh();
        if ((this.boworkflowmaster_service.boworkflowsteps.length / this.tbl_boworkflowsteps.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boworkflowsteps.source.getPaging().page)
        {
            this.tbl_boworkflowsteps.source.setPage((this.boworkflowmaster_service.boworkflowsteps.length / this.tbl_boworkflowsteps.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boworkflowsteps.source.grid.edit(this.tbl_boworkflowsteps.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boworkflowsteps.source.data.indexOf(event.data);
    this.onDelete_boworkflowstep(event,event.data.workflowstepid,((this.tbl_boworkflowsteps.source.getPaging().page-1) *this.tbl_boworkflowsteps.source.getPaging().perPage)+index);
    this.tbl_boworkflowsteps.source.refresh();
    break;
    }
    }
    
    */
    boworkflowsteps_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_boworkflowstep(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boworkflowstep(event, event.data.workflowstepid, this.formid);
                break;
            case 'delete':
                this.onDelete_boworkflowstep(event, event.data.workflowstepid, ((this.tbl_boworkflowsteps.source.getPaging().page - 1) * this.tbl_boworkflowsteps.source.getPaging().perPage) + event.index);
                this.tbl_boworkflowsteps.source.refresh();
                break;
        }
    }
    boworkflowsteps_onDelete(obj) {
        let workflowstepid = obj.data.workflowstepid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boworkflowmaster_service.delete_boworkflowmaster(workflowstepid).then(res => this.boworkflowsteps_LoadTable());
        }
    }
    onCustom_boworkflowsteps_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "boworkflowsteps");
            let formname = objbomenuaction.actionname;
        });
    }
    boworkflowsteps_Paging(val) {
        debugger;
        this.tbl_boworkflowsteps.source.setPaging(1, val, true);
    }
    handle_boworkflowsteps_GridSelected(event) {
        this.boworkflowsteps_selectedindex = this.tbl_boworkflowsteps.source.findIndex(i => i.workflowstepid === event.data.workflowstepid);
    }
    Is_boworkflowsteps_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boworkflowsteps_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
boworkflowmasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_17__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_18__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_20__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_11__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_21__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_22__.DialogService },
    { type: _service_boworkflowmaster_service__WEBPACK_IMPORTED_MODULE_1__.boworkflowmasterService },
    { type: _service_boworkflow_service__WEBPACK_IMPORTED_MODULE_6__.boworkflowService },
    { type: _service_boworkflowstep_service__WEBPACK_IMPORTED_MODULE_8__.boworkflowstepService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_23__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_9__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_10__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_24__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_20__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_25__.NgxSpinnerService }
];
boworkflowmasterComponent.propDecorators = {
    tbl_boworkflows: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_boworkflows', { static: false },] }],
    tbl_boworkflowsteps: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_13__.ViewChild, args: ['tbl_boworkflowsteps', { static: false },] }]
};
boworkflowmasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_15__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_13__.Component)({
        selector: 'app-boworkflowmaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boworkflowmaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_19__.KeyboardShortcutsService]
    })
], boworkflowmasterComponent);



/***/ }),

/***/ 73293:
/*!*************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boworkflowmaster/boworkflowmaster.module.ts ***!
  \*************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boworkflowmasterModule": () => (/* binding */ boworkflowmasterModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _boworkflowmaster_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boworkflowmaster.routing */ 57298);
/* harmony import */ var _boworkflowmaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boworkflowmaster.component */ 65841);






let boworkflowmasterModule = class boworkflowmasterModule {
};
boworkflowmasterModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _boworkflowmaster_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_boworkflowmaster_component__WEBPACK_IMPORTED_MODULE_3__.boworkflowmasterComponent]
    })
], boworkflowmasterModule);



/***/ }),

/***/ 57298:
/*!**************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boworkflowmaster/boworkflowmaster.routing.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _boworkflowmaster_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boworkflowmaster.component */ 65841);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'boworkflowmasters', children: [
            { path: '', component: _boworkflowmaster_component__WEBPACK_IMPORTED_MODULE_0__.boworkflowmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _boworkflowmaster_component__WEBPACK_IMPORTED_MODULE_0__.boworkflowmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _boworkflowmaster_component__WEBPACK_IMPORTED_MODULE_0__.boworkflowmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _boworkflowmaster_component__WEBPACK_IMPORTED_MODULE_0__.boworkflowmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 44372:
/*!************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boworkflowstep/boworkflowstep.component.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boworkflowstepComponent": () => (/* binding */ boworkflowstepComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boworkflowstep_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boworkflowstep.component.html */ 70538);
/* harmony import */ var _service_boworkflowstep_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/boworkflowstep.service */ 27935);
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

let boworkflowstepComponent = class boworkflowstepComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, boworkflowstep_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.boworkflowstep_service = boworkflowstep_service;
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
        this.bfilterPopulate_boworkflowsteps = false;
        this.boworkflowstep_menuactions = [];
        this.yesstep_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete
        this.nostep_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete
        this.parentid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_7__.EventEmitter(); //autocomplete
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
        this.boworkflowstep_Form = this.fb.group({
            pk: [null],
            workflowstepid: [null],
            workflowmasterid: [null],
            stepno: [null],
            stepname: [null],
            tat: [null],
            task: [null],
            taskdesc: [null],
            condition: [null],
            yesstep: [null],
            yesstepdesc: [null],
            nostep: [null],
            nostepdesc: [null],
            approver: [null],
            workflowuserfieldtype: [null],
            workflowuserfieldtypedesc: [null],
            workflowuserfieldname: [null],
            parentid: [null],
            parentiddesc: [null],
            noedittransaction: [null],
            autoapproval: [null],
            autodenial: [null],
            waitduration: [null],
            remainderduration: [null],
            escalationuser: [null],
            cc: [null],
            customfieldid: [null],
            customfieldiddesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.boworkflowstep_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.boworkflowstep_Form.dirty && this.boworkflowstep_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.workflowstepid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.workflowstepid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.workflowstepid && pkDetail) {
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
            let boworkflowstepid = null;
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
            this.formid = boworkflowstepid;
            //alert(boworkflowstepid);
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
            this.boworkflowstep_service.getDefaultData().then(res => {
                this.task_List = res.list_task.value;
                this.yesstep_List = res.list_yesstep.value;
                this.nostep_List = res.list_nostep.value;
                this.workflowuserfieldtype_List = res.list_workflowuserfieldtype.value;
                this.parentid_List = res.list_parentid.value;
                this.customfieldid_List = res.list_customfieldid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.boworkflowstep_service.get_boworkflowsteps_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.boworkflowstep_Form.markAsUntouched();
            this.boworkflowstep_Form.markAsPristine();
        });
    }
    onSelected_yesstep(yesstepDetail) {
        if (yesstepDetail.value && yesstepDetail) {
            this.boworkflowstep_Form.patchValue({
                yesstep: yesstepDetail.value,
                yesstepdesc: yesstepDetail.label,
            });
        }
    }
    onSelected_nostep(nostepDetail) {
        if (nostepDetail.value && nostepDetail) {
            this.boworkflowstep_Form.patchValue({
                nostep: nostepDetail.value,
                nostepdesc: nostepDetail.label,
            });
        }
    }
    onSelected_parentid(parentidDetail) {
        if (parentidDetail.value && parentidDetail) {
            this.boworkflowstep_Form.patchValue({
                parentid: parentidDetail.value,
                parentiddesc: parentidDetail.label,
            });
        }
    }
    resetForm() {
        if (this.boworkflowstep_Form != null)
            this.boworkflowstep_Form.reset();
        this.boworkflowstep_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let workflowstepid = this.boworkflowstep_Form.get('workflowstepid').value;
        if (workflowstepid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boworkflowstep_service.delete_boworkflowstep(workflowstepid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boworkflowstep_Form.patchValue({
            workflowstepid: null
        });
        if (this.formData.workflowstepid != null)
            this.formData.workflowstepid = null;
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
                    else if (key == "approver")
                        this.boworkflowstep_Form.patchValue({ "approver": mainscreendata[key] });
                    else if (key == "escalationuser")
                        this.boworkflowstep_Form.patchValue({ "escalationuser": mainscreendata[key] });
                    else if (key == "cc")
                        this.boworkflowstep_Form.patchValue({ "cc": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.boworkflowstep_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boworkflowstep_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boworkflowstep_Form.controls[key] != undefined) {
                                this.boworkflowstep_Form.controls[key].disable({ onlySelf: true });
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.stepname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.stepname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    task_onChange(evt) {
        let e = this.f.task.value;
        this.boworkflowstep_Form.patchValue({ taskdesc: evt.options[evt.options.selectedIndex].text });
    }
    yesstep_onChange(evt) {
        let e = evt.value;
    }
    nostep_onChange(evt) {
        let e = evt.value;
    }
    workflowuserfieldtype_onChange(evt) {
        let e = this.f.workflowuserfieldtype.value;
        this.boworkflowstep_Form.patchValue({ workflowuserfieldtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    parentid_onChange(evt) {
        let e = evt.value;
    }
    customfieldid_onChange(evt) {
        let e = evt.value;
        this.boworkflowstep_Form.patchValue({ customfieldiddesc: evt.options[evt.options.selectedIndex].text });
    }
    edit_boworkflowsteps() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.boworkflowstep_service.get_boworkflowsteps_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.boworkflowstep;
                let formproperty = res.boworkflowstep.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.boworkflowstep.pkcol;
                this.formid = res.boworkflowstep.workflowstepid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.boworkflowstep;
        this.formid = res.boworkflowstep.workflowstepid;
        this.pkcol = res.boworkflowstep.pkcol;
        this.bmyrecord = false;
        if (res.boworkflowstep.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boworkflowstep_Form.patchValue({
            workflowstepid: res.boworkflowstep.workflowstepid,
            workflowmasterid: res.boworkflowstep.workflowmasterid,
            stepno: res.boworkflowstep.stepno,
            stepname: res.boworkflowstep.stepname,
            tat: res.boworkflowstep.tat,
            task: res.boworkflowstep.task,
            taskdesc: res.boworkflowstep.taskdesc,
            condition: res.boworkflowstep.condition,
            yesstep: res.boworkflowstep.yesstep,
            yesstepdesc: res.boworkflowstep.yesstepdesc,
            nostep: res.boworkflowstep.nostep,
            nostepdesc: res.boworkflowstep.nostepdesc,
            approver: JSON.parse(res.boworkflowstep.approver),
            workflowuserfieldtype: res.boworkflowstep.workflowuserfieldtype,
            workflowuserfieldtypedesc: res.boworkflowstep.workflowuserfieldtypedesc,
            workflowuserfieldname: res.boworkflowstep.workflowuserfieldname,
            parentid: res.boworkflowstep.parentid,
            parentiddesc: res.boworkflowstep.parentiddesc,
            noedittransaction: res.boworkflowstep.noedittransaction,
            autoapproval: res.boworkflowstep.autoapproval,
            autodenial: res.boworkflowstep.autodenial,
            waitduration: res.boworkflowstep.waitduration,
            remainderduration: res.boworkflowstep.remainderduration,
            escalationuser: JSON.parse(res.boworkflowstep.escalationuser),
            cc: JSON.parse(res.boworkflowstep.cc),
            customfieldid: res.boworkflowstep.customfieldid,
            customfieldiddesc: res.boworkflowstep.customfieldiddesc,
            status: res.boworkflowstep.status,
            statusdesc: res.boworkflowstep.statusdesc,
        });
        this.boworkflowstep_menuactions = res.boworkflowstep_menuactions;
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.boworkflowstep_Form.controls) {
            let val = this.boworkflowstep_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.boworkflowstep_Form.controls[key] != null) {
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
            if (!this.boworkflowstep_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.boworkflowstep_Form.getRawValue();
            if (this.boworkflowstep_Form.get('approver').value != null)
                obj.approver = JSON.stringify(this.boworkflowstep_Form.get('approver').value);
            if (this.boworkflowstep_Form.get('escalationuser').value != null)
                obj.escalationuser = JSON.stringify(this.boworkflowstep_Form.get('escalationuser').value);
            if (this.boworkflowstep_Form.get('cc').value != null)
                obj.cc = JSON.stringify(this.boworkflowstep_Form.get('cc').value);
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
            // Object.keys(this.boworkflowstep_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.boworkflowstep_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.boworkflowstep_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.boworkflowstep_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.boworkflowstep_Form.controls[key] != null) {
                            this.formData[key] = this.boworkflowstep_Form.controls[key].value;
                        }
                    }
                }
            }
            if (this.boworkflowstep_Form.get('approver').value != null)
                this.formData.approver = JSON.stringify(this.boworkflowstep_Form.get('approver').value);
            if (this.boworkflowstep_Form.get('escalationuser').value != null)
                this.formData.escalationuser = JSON.stringify(this.boworkflowstep_Form.get('escalationuser').value);
            if (this.boworkflowstep_Form.get('cc').value != null)
                this.formData.cc = JSON.stringify(this.boworkflowstep_Form.get('cc').value);
            console.log(this.formData);
            this.spinner.show();
            this.boworkflowstep_service.saveOrUpdate_boworkflowsteps(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__awaiter)(this, void 0, void 0, function* () {
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.boworkflowstep);
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
                        this.objvalues.push(res.boworkflowstep);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boworkflowstep_Form.markAsUntouched();
                this.boworkflowstep_Form.markAsPristine();
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
boworkflowstepComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_10__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_11__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_5__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_14__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_15__.DialogService },
    { type: _service_boworkflowstep_service__WEBPACK_IMPORTED_MODULE_1__.boworkflowstepService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_16__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_3__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_4__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_17__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_13__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_18__.NgxSpinnerService }
];
boworkflowstepComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_9__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_7__.Component)({
        selector: 'app-boworkflowstep',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boworkflowstep_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_12__.KeyboardShortcutsService]
    })
], boworkflowstepComponent);



/***/ }),

/***/ 23654:
/*!*****************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/boworkflowmaster.service.ts ***!
  \*****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boworkflowmasterService": () => (/* binding */ boworkflowmasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let boworkflowmasterService = class boworkflowmasterService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_boworkflowmasters(formData, boworkflows, boworkflowsteps) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { boworkflows: boworkflows.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), boworkflowsteps: boworkflowsteps.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowmaster', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowmaster' + '/getdefaultdata').toPromise();
        }
    }
    get_boworkflowmasters_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowmaster').toPromise();
        }
    }
    getListBy_workflowmasterid(workflowmasterid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowmaster' + '/workflowmasterid/' + workflowmasterid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowmaster' + '/param/' + key).toPromise();
        }
    }
    get_boworkflowmasters_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowmaster' + '/e/' + id).toPromise();
        }
    }
    get_boworkflowmasters_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowmaster' + '/' + id).toPromise();
        }
    }
    delete_boworkflowmaster(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowmaster' + '/' + id).toPromise();
        }
    }
    getList_menucode() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boworkflowmaster' + '/getList_menucode').toPromise();
    }
    getList_tablecode() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boworkflowmaster' + '/getList_tablecode').toPromise();
    }
};
boworkflowmasterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
boworkflowmasterService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], boworkflowmasterService);



/***/ }),

/***/ 27935:
/*!***************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/boworkflowstep.service.ts ***!
  \***************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boworkflowstepService": () => (/* binding */ boworkflowstepService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let boworkflowstepService = class boworkflowstepService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_boworkflowsteps(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowstep', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowstep' + '/getdefaultdata').toPromise();
        }
    }
    get_boworkflowsteps_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowstep').toPromise();
        }
    }
    getListBy_workflowstepid(workflowstepid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowstep' + '/workflowstepid/' + workflowstepid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowstep' + '/param/' + key).toPromise();
        }
    }
    get_boworkflowsteps_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowstep' + '/e/' + id).toPromise();
        }
    }
    get_boworkflowsteps_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowstep' + '/' + id).toPromise();
        }
    }
    delete_boworkflowstep(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowstep' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boworkflowstep')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(boworkflowstep => new boworkflowstep(boworkflowstep.workflowstepid, boworkflowstep.workflowmasterid, boworkflowstep.stepno, boworkflowstep.stepname, boworkflowstep.tat, boworkflowstep.task, boworkflowstep.taskdesc, boworkflowstep.condition, boworkflowstep.yesstep, boworkflowstep.yesstepdesc, boworkflowstep.nostep, boworkflowstep.nostepdesc, boworkflowstep.approver, boworkflowstep.workflowuserfieldtype, boworkflowstep.workflowuserfieldtypedesc, boworkflowstep.workflowuserfieldname, boworkflowstep.parentid, boworkflowstep.parentiddesc, boworkflowstep.noedittransaction, boworkflowstep.autoapproval, boworkflowstep.autodenial, boworkflowstep.waitduration, boworkflowstep.remainderduration, boworkflowstep.escalationuser, boworkflowstep.cc, boworkflowstep.customfieldid, boworkflowstep.customfieldiddesc, boworkflowstep.status))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(boworkflowstep => boworkflowstep.stepname.includes(filter.name));
            return response;
        }));
    }
    getList_task() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_task/').toPromise();
    }
    getList_yesstep() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_yesstep').toPromise();
    }
    getList_nostep() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_nostep').toPromise();
    }
    getList_workflowuserfieldtype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_workflowuserfieldtype/').toPromise();
    }
    getList_parentid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_parentid').toPromise();
    }
    getList_customfieldid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boworkflowstep' + '/getList_customfieldid').toPromise();
    }
};
boworkflowstepService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
boworkflowstepService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], boworkflowstepService);



/***/ }),

/***/ 85986:
/*!*********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boworkflowmaster/boworkflowmaster.component.html ***!
  \*********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"boworkflowmaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Workflow Masters' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_boworkflowmasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of boworkflowmaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.workflowmasterid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.workflowmasterid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('description') == -1) && (descriptionvisible==undefined || descriptionvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"description\" class=\"control-label\">Description</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.description?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"description\" formControlName=\"description\" class=\"form-control\">\r\n              </div>\r\n\r\n\r\n              <!--menucode-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('menucode') == -1) && (menucodevisible==undefined || menucodevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"menucode\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_menucode(null)\">Menu</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"menucode_List\" [optionsEvent]=\"menucode_optionsEvent\"\r\n                  [form]=\"bomenumaster\" (selectItem)=\"onSelected_menucode($event)\" [reportid]='' [menuid]=''\r\n                  formControlName=\"menucode\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.menucodedesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--tablecode-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('tablecode') == -1) && (tablecodevisible==undefined || tablecodevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"tablecode\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_tablecode(null)\">Table</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"tablecode_List\" [optionsEvent]=\"tablecode_optionsEvent\"\r\n                  [form]=\"systemtable\" (selectItem)=\"onSelected_tablecode($event)\" [reportid]='' [menuid]=''\r\n                  formControlName=\"tablecode\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.tablecodedesc?.value}}</label>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('workflowhtml') == -1) && (workflowhtmlvisible==undefined || workflowhtmlvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"workflowhtml\" class=\"control-label\">Work Flow Html</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.workflowhtml?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"workflowhtml\"\r\n                  formControlName=\"workflowhtml\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Workflow</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table boworkflows-->\r\n            <div [ngClass]=\"Is_boworkflows_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Workflow' | translate}}\r\n                <select class='child' id=\"boworkflowsPagingdropdown\" (change)=\"boworkflows_Paging($event.target.value)\"\r\n                  [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"boworkflowtoggleOption();boworkflows_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showboworkflowsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"boworkflows_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_boworkflows (userRowSelect)=\"handle_boworkflows_GridSelected($event)\"\r\n                [settings]=\"boworkflows_settings\" (custom)=\"onCustom_boworkflows_Action($event)\"\r\n                [source]=\"tbl_boworkflows?.source?.data\" (delete)=\"boworkflows_route($event,'delete')\"\r\n                (deleteConfirm)=\"boworkflows_route($event,'delete')\" (create)=\"boworkflows_route($event,'create')\"\r\n                (createConfirm)=\"boworkflows_beforesave($event)\" (edit)=\"boworkflows_route($event,'edit')\"\r\n                (editConfirm)=\"boworkflows_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table boworkflows-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Workflow Steps</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table boworkflowsteps-->\r\n            <div [ngClass]=\"Is_boworkflowsteps_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Workflow Steps' | translate}}\r\n                <select class='child' id=\"boworkflowstepsPagingdropdown\"\r\n                  (change)=\"boworkflowsteps_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"boworkflowsteptoggleOption();boworkflowsteps_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showboworkflowstepsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"boworkflowsteps_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_boworkflowsteps (userRowSelect)=\"handle_boworkflowsteps_GridSelected($event)\"\r\n                [settings]=\"boworkflowsteps_settings\" (custom)=\"onCustom_boworkflowsteps_Action($event)\"\r\n                [source]=\"tbl_boworkflowsteps?.source?.data\" (delete)=\"boworkflowsteps_route($event,'delete')\"\r\n                (deleteConfirm)=\"boworkflowsteps_route($event,'delete')\"\r\n                (create)=\"boworkflowsteps_route($event,'create')\" (createConfirm)=\"boworkflowsteps_beforesave($event)\"\r\n                (edit)=\"boworkflowsteps_route($event,'edit')\" (editConfirm)=\"boworkflowsteps_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table boworkflowsteps-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 70538:
/*!*****************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boworkflowstep/boworkflowstep.component.html ***!
  \*****************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"boworkflowstep_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Workflow Steps' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_boworkflowsteps()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of boworkflowstep_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.workflowstepid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.workflowstepid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('workflowmasterid') == -1) && (workflowmasteridvisible==undefined || workflowmasteridvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"workflowmasterid\" class=\"control-label\">Work Flow Master</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.workflowmasterid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"workflowmasterid\" formControlName=\"workflowmasterid\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('stepno') == -1) && (stepnovisible==undefined || stepnovisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"stepno\" class=\"control-label\">Step No</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.stepno?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"stepno\" formControlName=\"stepno\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('stepname') == -1) && (stepnamevisible==undefined || stepnamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"stepname\" class=\"control-label\">Step Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.stepname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"stepname\" formControlName=\"stepname\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('tat') == -1) && (tatvisible==undefined || tatvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"tat\" class=\"control-label\">T A T</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.tat?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"tat\" formControlName=\"tat\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--task-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('task') == -1) && (taskvisible==undefined || taskvisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"task\" class=\"control-label\">Task</label>\r\n        <select *ngIf=\"!showview\" id=\"task\" (change)=\"task_onChange($event.target)\" formControlName=\"task\"\r\n          class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of task_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.taskdesc?.value}}</label>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('condition') == -1) && (conditionvisible==undefined || conditionvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"condition\" class=\"control-label\">Condition</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.condition?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"condition\" formControlName=\"condition\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--yesstep-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('yesstep') == -1) && (yesstepvisible==undefined || yesstepvisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"yesstep\" class=\"control-label\" (click)=\"AddOrEdit_yesstep(null)\">Yes Step</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"yesstep_List\" [optionsEvent]=\"yesstep_optionsEvent\"\r\n          [form]=\"boworkflowstep\" (selectItem)=\"onSelected_yesstep($event)\" [reportid]='' [menuid]=''\r\n          formControlName=\"yesstep\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.yesstepdesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--nostep-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('nostep') == -1) && (nostepvisible==undefined || nostepvisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"nostep\" class=\"control-label\" (click)=\"AddOrEdit_nostep(null)\">No Step</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"nostep_List\" [optionsEvent]=\"nostep_optionsEvent\"\r\n          [form]=\"boworkflowstep\" (selectItem)=\"onSelected_nostep($event)\" [reportid]='' [menuid]=''\r\n          formControlName=\"nostep\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.nostepdesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('approver') == -1) && (approvervisible==undefined || approvervisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"approver\" class=\"control-label\">Approver</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.approver?.value}}</label>\r\n        <app-useraccess *ngIf=\"!showview\" id=\"approver\" formControlName=\"approver\">\r\n        </app-useraccess>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--workflowuserfieldtype-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('workflowuserfieldtype') == -1) && (workflowuserfieldtypevisible==undefined || workflowuserfieldtypevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"workflowuserfieldtype\" class=\"control-label\">Work Flow User Field\r\n          Type</label>\r\n        <select *ngIf=\"!showview\" id=\"workflowuserfieldtype\" (change)=\"workflowuserfieldtype_onChange($event.target)\"\r\n          formControlName=\"workflowuserfieldtype\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of workflowuserfieldtype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.workflowuserfieldtypedesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('workflowuserfieldname') == -1) && (workflowuserfieldnamevisible==undefined || workflowuserfieldnamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"workflowuserfieldname\" class=\"control-label\">Work Flow User Field Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.workflowuserfieldname?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"workflowuserfieldname\" formControlName=\"workflowuserfieldname\"\r\n          class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--parentid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('parentid') == -1) && (parentidvisible==undefined || parentidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"parentid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_parentid(null)\">Parent</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"parentid_List\" [optionsEvent]=\"parentid_optionsEvent\"\r\n          [form]=\"boworkflowstep\" (selectItem)=\"onSelected_parentid($event)\" [reportid]='' [menuid]=''\r\n          formControlName=\"parentid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.parentiddesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('noedittransaction') == -1) && (noedittransactionvisible==undefined || noedittransactionvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"noedittransaction\" class=\"control-label\">No Edit Transaction</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.noedittransaction?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"noedittransaction\" formControlName=\"noedittransaction\"\r\n            class=\"form-control\">\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('autoapproval') == -1) && (autoapprovalvisible==undefined || autoapprovalvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"autoapproval\" class=\"control-label\">Auto Approval</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.autoapproval?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"autoapproval\" formControlName=\"autoapproval\"\r\n            class=\"form-control\">\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('autodenial') == -1) && (autodenialvisible==undefined || autodenialvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <div class=\"columnchk\">\r\n          <label for=\"autodenial\" class=\"control-label\">Auto Denial</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.autodenial?.value}}</label>\r\n          <input type=\"checkbox\" *ngIf=\"!showview\" id=\"autodenial\" formControlName=\"autodenial\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('waitduration') == -1) && (waitdurationvisible==undefined || waitdurationvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"waitduration\" class=\"control-label\">Wait Duration</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.waitduration?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"waitduration\" formControlName=\"waitduration\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('remainderduration') == -1) && (remainderdurationvisible==undefined || remainderdurationvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"remainderduration\" class=\"control-label\">Remainder Duration</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.remainderduration?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"remainderduration\" formControlName=\"remainderduration\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('escalationuser') == -1) && (escalationuservisible==undefined || escalationuservisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"escalationuser\" class=\"control-label\">Escalation User</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.escalationuser?.value}}</label>\r\n        <app-useraccess *ngIf=\"!showview\" id=\"escalationuser\" formControlName=\"escalationuser\"\r\n          (change)=\"escalationuser_onChange($event.target)\">\r\n        </app-useraccess>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('cc') == -1) && (ccvisible==undefined || ccvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"cc\" class=\"control-label\">C C</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.cc?.value}}</label>\r\n        <app-useraccess *ngIf=\"!showview\" id=\"cc\" formControlName=\"cc\" (change)=\"cc_onChange($event.target)\">\r\n        </app-useraccess>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--customfieldid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('customfieldid') == -1) && (customfieldidvisible==undefined || customfieldidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"customfieldid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_customfieldid(null)\">Custom Field</label>\r\n        <select *ngIf=\"!showview\" id=\"customfieldid\" (change)=\"customfieldid_onChange($event.target)\"\r\n          formControlName=\"customfieldid\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of customfieldid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.customfieldiddesc?.value}}</label>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_boworkflowmaster_boworkflowmaster_module_ts.js.map