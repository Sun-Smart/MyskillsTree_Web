"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_lmscall_lmscall_module_ts"],{

/***/ 41592:
/*!**********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscall/lmscall.component.ts ***!
  \**********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscallComponent": () => (/* binding */ lmscallComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmscall_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmscall.component.html */ 91276);
/* harmony import */ var _service_lmscall_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmscall.service */ 63156);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component */ 55163);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_lmstask_lmstask_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/lmstask/lmstask.component */ 12903);
/* harmony import */ var _service_lmstask_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/lmstask.service */ 86871);
/* harmony import */ var _pages_forms_lmsreminder_lmsreminder_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/lmsreminder/lmsreminder.component */ 25148);
/* harmony import */ var _service_lmsreminder_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../service/lmsreminder.service */ 92444);
/* harmony import */ var _pages_forms_lmshistory_lmshistory_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../../pages/forms/lmshistory/lmshistory.component */ 72530);
/* harmony import */ var _service_lmshistory_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../../service/lmshistory.service */ 6469);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions

//child table



//Shortcuts

//translator









//primeng services



//session,application constants




//custom fields & attachments


let lmscallComponent = class lmscallComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmscall_service, lmstask_service, lmsreminder_service, lmshistory_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmscall_service = lmscall_service;
        this.lmstask_service = lmstask_service;
        this.lmsreminder_service = lmsreminder_service;
        this.lmshistory_service = lmshistory_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_lmscalls = false;
        this.bfilterPopulate_lmstasks = false;
        this.bfilterPopulate_lmsreminders = false;
        this.bfilterPopulate_lmshistories = false;
        this.lmscall_menuactions = [];
        this.lmstask_menuactions = [];
        this.lmsreminder_menuactions = [];
        this.lmshistory_menuactions = [];
        this.branchid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete
        this.branchlocationid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete
        this.opportunityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete
        this.callid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete
        this.leadby_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete
        this.currentowner_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_14__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_14__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_lmstask_IDs = "";
        this.lmstasks_ID = "1";
        this.Deleted_lmsreminder_IDs = "";
        this.lmsreminders_ID = "2";
        this.Deleted_lmshistory_IDs = "";
        this.lmshistories_ID = "3";
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
        this.lmscall_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            branchid: [null],
            branchiddesc: [null],
            branchlocationid: [null],
            branchlocationiddesc: [null],
            eventdate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.required])],
            eventtime: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.required])],
            eventenddate: [null],
            eventendtime: [null],
            leadid: [null],
            leadiddesc: [null],
            opportunityid: [null],
            opportunityiddesc: [null],
            callid: [null],
            calliddesc: [null],
            agenda: [null],
            campaignid: [null],
            campaigniddesc: [null],
            leadby: [null],
            leadbydesc: [null],
            currentowner: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.required])],
            currentownerdesc: [null],
            activitytype: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.required])],
            activitytypedesc: [null],
            attendedusers: [null],
            clientusers: [null],
            nextcalldate: [null],
            nextaction: [null],
            nextactiondesc: [null],
            actiondatetime: [null],
            score: [null],
            remarks: [null],
            attachment: [null],
            customfield: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmscall_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmscall_Form.dirty && this.lmscall_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_18__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_18__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_18__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.callid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.callid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.callid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
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
            let lmscallid = null;
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
            this.formid = lmscallid;
            //alert(lmscallid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_lmstasks_TableConfig();
                setTimeout(() => {
                    //this.Set_lmstasks_TableDropDownConfig();
                });
                this.Set_lmsreminders_TableConfig();
                setTimeout(() => {
                    //this.Set_lmsreminders_TableDropDownConfig();
                });
                this.Set_lmshistories_TableConfig();
                setTimeout(() => {
                    //this.Set_lmshistories_TableDropDownConfig();
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
            this.lmscall_service.getDefaultData().then(res => {
                this.branchid_List = res.list_branchid.value;
                this.leadid_List = res.list_leadid.value;
                this.opportunityid_List = res.list_opportunityid.value;
                this.callid_List = res.list_callid.value;
                this.campaignid_List = res.list_campaignid.value;
                this.leadby_List = res.list_leadby.value;
                this.currentowner_List = res.list_currentowner.value;
                this.activitytype_List = res.list_activitytype.value;
                this.nextaction_List = res.list_nextaction.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmscall_service.get_lmscalls_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmscall_Form.markAsUntouched();
            this.lmscall_Form.markAsPristine();
        });
    }
    onSelected_branchid(branchidDetail) {
        if (branchidDetail.value && branchidDetail) {
            this.lmscall_Form.patchValue({
                branchid: branchidDetail.value,
                branchiddesc: branchidDetail.label,
            });
            this.lmscall_service.getList_branchlocationid(branchidDetail.value).then(res => {
                this.branchlocationid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_branchlocationid(branchlocationidDetail) {
        if (branchlocationidDetail.value && branchlocationidDetail) {
            this.lmscall_Form.patchValue({
                branchlocationid: branchlocationidDetail.value,
                branchlocationiddesc: branchlocationidDetail.label,
            });
        }
    }
    onSelected_opportunityid(opportunityidDetail) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmscall_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,
            });
        }
    }
    onSelected_callid(callidDetail) {
        if (callidDetail.value && callidDetail) {
            this.lmscall_Form.patchValue({
                callid: callidDetail.value,
                calliddesc: callidDetail.label,
            });
        }
    }
    onSelected_leadby(leadbyDetail) {
        if (leadbyDetail.value && leadbyDetail) {
            this.lmscall_Form.patchValue({
                leadby: leadbyDetail.value,
                leadbydesc: leadbyDetail.label,
            });
        }
    }
    onSelected_currentowner(currentownerDetail) {
        if (currentownerDetail.value && currentownerDetail) {
            this.lmscall_Form.patchValue({
                currentowner: currentownerDetail.value,
                currentownerdesc: currentownerDetail.label,
            });
        }
    }
    resetForm() {
        if (this.lmscall_Form != null)
            this.lmscall_Form.reset();
        this.lmscall_Form.patchValue({
            branchid: this.sessionData.branchid,
            branchiddesc: this.sessionData.branchiddesc,
            leadby: this.sessionData.userid,
            leadbydesc: this.sessionData.username,
            currentowner: this.sessionData.userid,
            currentownerdesc: this.sessionData.username,
        });
        this.lmscall_Form.patchValue({
            eventdate: this.ngbDateParserFormatter.parse(new Date().toString()),
            eventtime: new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(new Date().getHours().toString() + ":" + new Date().getMinutes().toString()),
            eventenddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            currentowner: this.sessionData.userid,
            nextcalldate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            actiondatetime: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        });
        setTimeout(() => {
            this.lmstasks_LoadTable();
            this.lmsreminders_LoadTable();
            this.lmshistories_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let callid = this.lmscall_Form.get('callid').value;
        if (callid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmscall_service.delete_lmscall(callid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmscall_Form.patchValue({
            callid: null
        });
        if (this.formData.callid != null)
            this.formData.callid = null;
        for (let i = 0; i < this.tbl_lmstasks.source.length; i++) {
            this.tbl_lmstasks.source[i].taskid = null;
        }
        for (let i = 0; i < this.tbl_lmsreminders.source.length; i++) {
            this.tbl_lmsreminders.source[i].reminderid = null;
        }
        for (let i = 0; i < this.tbl_lmshistories.source.length; i++) {
            this.tbl_lmshistories.source[i].historyid = null;
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
                    else if (key == "eventdate")
                        this.lmscall_Form.patchValue({ "eventdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "eventtime")
                        this.lmscall_Form.patchValue({ "eventtime": new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(mainscreendata[key]) });
                    else if (key == "eventenddate")
                        this.lmscall_Form.patchValue({ "eventenddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "eventendtime")
                        this.lmscall_Form.patchValue({ "eventendtime": new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(mainscreendata[key]) });
                    else if (key == "attendedusers")
                        this.lmscall_Form.patchValue({ "attendedusers": mainscreendata[key] });
                    else if (key == "nextcalldate")
                        this.lmscall_Form.patchValue({ "nextcalldate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "actiondatetime")
                        this.lmscall_Form.patchValue({ "actiondatetime": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "remarks")
                        this.lmscall_Form.patchValue({ "remarks": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.lmscall_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmscall_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmscall_Form.controls[key] != undefined) {
                                this.lmscall_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("lmscalls", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    branchid_onChange(evt) {
        let e = evt.value;
    }
    branchlocationid_onChange(evt) {
        let e = evt.value;
    }
    leadid_onChange(evt) {
        let e = evt.value;
        this.lmscall_Form.patchValue({ leadiddesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunityid_onChange(evt) {
        let e = evt.value;
    }
    callid_onChange(evt) {
        let e = evt.value;
    }
    campaignid_onChange(evt) {
        let e = evt.value;
        this.lmscall_Form.patchValue({ campaigniddesc: evt.options[evt.options.selectedIndex].text });
    }
    leadby_onChange(evt) {
        let e = evt.value;
    }
    currentowner_onChange(evt) {
        let e = evt.value;
    }
    activitytype_onChange(evt) {
        let e = this.f.activitytype.value;
        this.lmscall_Form.patchValue({ activitytypedesc: evt.options[evt.options.selectedIndex].text });
    }
    nextaction_onChange(evt) {
        let e = this.f.nextaction.value;
        this.lmscall_Form.patchValue({ nextactiondesc: evt.options[evt.options.selectedIndex].text });
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
    edit_lmscalls() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmscall_service.get_lmscalls_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmscall;
                let formproperty = res.lmscall.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmscall.pkcol;
                this.formid = res.lmscall.callid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmscall;
        this.formid = res.lmscall.callid;
        this.pkcol = res.lmscall.pkcol;
        this.bmyrecord = false;
        if (res.lmscall.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        var eventtimeTime = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(res.lmscall.eventtime);
        var eventendtimeTime = new _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__.Time(res.lmscall.eventendtime);
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmscall_Form.patchValue({
            branchid: res.lmscall.branchid,
            branchiddesc: res.lmscall.branchiddesc,
            branchlocationid: res.lmscall.branchlocationid,
            branchlocationiddesc: res.lmscall.branchlocationiddesc,
            eventdate: this.ngbDateParserFormatter.parse(res.lmscall.eventdate),
            eventtime: eventtimeTime,
            eventenddate: this.ngbDateParserFormatter.parse(res.lmscall.eventenddate),
            eventendtime: eventendtimeTime,
            leadid: res.lmscall.leadid,
            leadiddesc: res.lmscall.leadiddesc,
            opportunityid: res.lmscall.opportunityid,
            opportunityiddesc: res.lmscall.opportunityiddesc,
            callid: res.lmscall.callid,
            calliddesc: res.lmscall.calliddesc,
            agenda: res.lmscall.agenda,
            campaignid: res.lmscall.campaignid,
            campaigniddesc: res.lmscall.campaigniddesc,
            leadby: res.lmscall.leadby,
            leadbydesc: res.lmscall.leadbydesc,
            currentowner: res.lmscall.currentowner,
            currentownerdesc: res.lmscall.currentownerdesc,
            activitytype: res.lmscall.activitytype,
            activitytypedesc: res.lmscall.activitytypedesc,
            attendedusers: JSON.parse(res.lmscall.attendedusers),
            clientusers: res.lmscall.clientusers,
            nextcalldate: this.ngbDateParserFormatter.parse(res.lmscall.nextcalldate),
            nextaction: res.lmscall.nextaction,
            nextactiondesc: res.lmscall.nextactiondesc,
            actiondatetime: this.ngbDateParserFormatter.parse(res.lmscall.actiondatetime),
            score: res.lmscall.score,
            remarks: JSON.parse(res.lmscall.remarks),
            attachment: JSON.parse(res.lmscall.attachment),
            customfield: res.lmscall.customfield,
            status: res.lmscall.status,
            statusdesc: res.lmscall.statusdesc,
        });
        this.lmscall_menuactions = res.lmscall_menuactions;
        this.lmstask_menuactions = res.lmstask_menuactions;
        this.lmstasks_visiblelist = res.lmstasks_visiblelist;
        this.lmsreminder_menuactions = res.lmsreminder_menuactions;
        this.lmsreminders_visiblelist = res.lmsreminders_visiblelist;
        this.lmshistory_menuactions = res.lmshistory_menuactions;
        this.lmshistories_visiblelist = res.lmshistories_visiblelist;
        if (this.lmscall_Form.get('customfield').value != null && this.lmscall_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.lmscall_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmscall_Form.get('attachment').value != null && this.lmscall_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.lmscall_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.branchid.value && this.f.branchid.value != "" && this.f.branchid.value != null)
                this.lmscall_service.getList_branchlocationid(this.f.branchid.value).then(res => {
                    this.branchlocationid_List = res;
                }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        this.Set_lmstasks_TableConfig();
        this.lmstasks_LoadTable(res.lmstasks);
        this.Set_lmsreminders_TableConfig();
        this.lmsreminders_LoadTable(res.lmsreminders);
        this.Set_lmshistories_TableConfig();
        this.lmshistories_LoadTable(res.lmshistories);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmscall_Form.controls) {
            let val = this.lmscall_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmscall_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.lmscall_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.lmscall_Form.getRawValue();
            obj.eventdate = new Date(this.lmscall_Form.get('eventdate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('eventdate').value) + '  UTC' : null);
            obj.eventtime = (this.lmscall_Form.get('eventtime').value == null ? 0 : this.lmscall_Form.get('eventtime').value.hour) + ':' + (this.lmscall_Form.get('eventtime').value == null ? 0 : this.lmscall_Form.get('eventtime').value.minute + ":00");
            obj.eventenddate = new Date(this.lmscall_Form.get('eventenddate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('eventenddate').value) + '  UTC' : null);
            obj.eventendtime = (this.lmscall_Form.get('eventendtime').value == null ? 0 : this.lmscall_Form.get('eventendtime').value.hour) + ':' + (this.lmscall_Form.get('eventendtime').value == null ? 0 : this.lmscall_Form.get('eventendtime').value.minute + ":00");
            if (this.lmscall_Form.get('attendedusers').value != null)
                obj.attendedusers = JSON.stringify(this.lmscall_Form.get('attendedusers').value);
            obj.nextcalldate = new Date(this.lmscall_Form.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('nextcalldate').value) + '  UTC' : null);
            obj.actiondatetime = new Date(this.lmscall_Form.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('actiondatetime').value) + '  UTC' : null);
            if (this.lmscall_Form.get('remarks').value != null)
                obj.remarks = JSON.stringify(this.lmscall_Form.get('remarks').value);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.lmscall_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.lmscall_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmscall_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmscall_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmscall_Form.controls[key] != null) {
                            this.formData[key] = this.lmscall_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            this.formData.eventdate = new Date(this.lmscall_Form.get('eventdate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('eventdate').value) + '  UTC' : null);
            this.formData.eventtime = (this.lmscall_Form.get('eventtime').value == null ? 0 : this.lmscall_Form.get('eventtime').value.hour) + ':' + (this.lmscall_Form.get('eventtime').value == null ? 0 : this.lmscall_Form.get('eventtime').value.minute + ":00");
            this.formData.eventenddate = new Date(this.lmscall_Form.get('eventenddate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('eventenddate').value) + '  UTC' : null);
            this.formData.eventendtime = (this.lmscall_Form.get('eventendtime').value == null ? 0 : this.lmscall_Form.get('eventendtime').value.hour) + ':' + (this.lmscall_Form.get('eventendtime').value == null ? 0 : this.lmscall_Form.get('eventendtime').value.minute + ":00");
            if (this.lmscall_Form.get('attendedusers').value != null)
                this.formData.attendedusers = JSON.stringify(this.lmscall_Form.get('attendedusers').value);
            this.formData.nextcalldate = new Date(this.lmscall_Form.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('nextcalldate').value) + '  UTC' : null);
            this.formData.actiondatetime = new Date(this.lmscall_Form.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmscall_Form.get('actiondatetime').value) + '  UTC' : null);
            if (this.lmscall_Form.get('remarks').value != null)
                this.formData.remarks = JSON.stringify(this.lmscall_Form.get('remarks').value);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            this.formData.Deleted_lmstask_IDs = this.Deleted_lmstask_IDs;
            this.formData.Deleted_lmsreminder_IDs = this.Deleted_lmsreminder_IDs;
            this.formData.Deleted_lmshistory_IDs = this.Deleted_lmshistory_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.lmscall_service.saveOrUpdate_lmscalls(this.formData, (_b = (_a = this.tbl_lmstasks) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_lmsreminders) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data, (_f = (_e = this.tbl_lmshistories) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_lmstasks.source) {
                    for (let i = 0; i < this.tbl_lmstasks.source.data.length; i++) {
                        if (this.tbl_lmstasks.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmstasks.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmsreminders.source) {
                    for (let i = 0; i < this.tbl_lmsreminders.source.data.length; i++) {
                        if (this.tbl_lmsreminders.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmsreminders.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmshistories.source) {
                    for (let i = 0; i < this.tbl_lmshistories.source.data.length; i++) {
                        if (this.tbl_lmshistories.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmshistories.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmscall);
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
                        this.objvalues.push(res.lmscall);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmscall_Form.markAsUntouched();
                this.lmscall_Form.markAsPristine();
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
        this.tbl_lmstasks.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
        this.tbl_lmsreminders.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
        this.tbl_lmshistories.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
    }
    AddOrEdit_lmstask(event, taskid, callid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmstask_lmstask_component__WEBPACK_IMPORTED_MODULE_5__.lmstaskComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, taskid, callid, visiblelist: this.lmstasks_visiblelist, hidelist: this.lmstasks_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmstasks.source.add(res[i]);
                    }
                    this.tbl_lmstasks.source.refresh();
                }
                else {
                    this.tbl_lmstasks.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmstask(event, childID, i) {
        if (childID != null)
            this.Deleted_lmstask_IDs += childID + ",";
        this.tbl_lmstasks.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmsreminder(event, reminderid, callid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmsreminder_lmsreminder_component__WEBPACK_IMPORTED_MODULE_7__.lmsreminderComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, reminderid, callid, visiblelist: this.lmsreminders_visiblelist, hidelist: this.lmsreminders_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmsreminders.source.add(res[i]);
                    }
                    this.tbl_lmsreminders.source.refresh();
                }
                else {
                    this.tbl_lmsreminders.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmsreminder(event, childID, i) {
        if (childID != null)
            this.Deleted_lmsreminder_IDs += childID + ",";
        this.tbl_lmsreminders.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmshistory(event, historyid, callid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmshistory_lmshistory_component__WEBPACK_IMPORTED_MODULE_9__.lmshistoryComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, historyid, callid, visiblelist: this.lmshistories_visiblelist, hidelist: this.lmshistories_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmshistories.source.add(res[i]);
                    }
                    this.tbl_lmshistories.source.refresh();
                }
                else {
                    this.tbl_lmshistories.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmshistory(event, childID, i) {
        if (childID != null)
            this.Deleted_lmshistory_IDs += childID + ",";
        this.tbl_lmshistories.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_lmstasks_Checkbox() {
        debugger;
        if (this.tbl_lmstasks.source.settings['selectMode'] == 'multi')
            this.tbl_lmstasks.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmstasks.source.settings['selectMode'] = 'multi';
        this.tbl_lmstasks.source.initGrid();
    }
    delete_lmstasks_All() {
        this.tbl_lmstasks.source.settings['selectMode'] = 'single';
    }
    show_lmstasks_Filter() {
        setTimeout(() => {
            //  this.Set_lmstasks_TableDropDownConfig();
        });
        if (this.tbl_lmstasks.source.settings != null)
            this.tbl_lmstasks.source.settings['hideSubHeader'] = !this.tbl_lmstasks.source.settings['hideSubHeader'];
        this.tbl_lmstasks.source.initGrid();
    }
    show_lmstasks_InActive() {
    }
    enable_lmstasks_InActive() {
    }
    Set_lmstasks_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmstasks) {
                var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
                if (clone.columns['leadid'] != undefined)
                    clone.columns['leadid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_leadid.value)), }, };
                if (clone.columns['leadid'] != undefined)
                    clone.columns['leadid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_leadid.value)), }, };
                this.tbl_lmstasks.source.settings = clone;
                this.tbl_lmstasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_opportunityid.value)), }, };
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_opportunityid.value)), }, };
                this.tbl_lmstasks.source.settings = clone;
                this.tbl_lmstasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
                if (clone.columns['assignto'] != undefined)
                    clone.columns['assignto'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_assignto.value)), }, };
                if (clone.columns['assignto'] != undefined)
                    clone.columns['assignto'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_assignto.value)), }, };
                this.tbl_lmstasks.source.settings = clone;
                this.tbl_lmstasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
                if (clone.columns['priority'] != undefined)
                    clone.columns['priority'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_priority.value)), }, };
                if (clone.columns['priority'] != undefined)
                    clone.columns['priority'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_priority.value)), }, };
                this.tbl_lmstasks.source.settings = clone;
                this.tbl_lmstasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
                if (clone.columns['taskstatus'] != undefined)
                    clone.columns['taskstatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_taskstatus.value)), }, };
                if (clone.columns['taskstatus'] != undefined)
                    clone.columns['taskstatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_taskstatus.value)), }, };
                this.tbl_lmstasks.source.settings = clone;
                this.tbl_lmstasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
                if (clone.columns['performancestatus'] != undefined)
                    clone.columns['performancestatus'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_performancestatus.value)), }, };
                if (clone.columns['performancestatus'] != undefined)
                    clone.columns['performancestatus'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_performancestatus.value)), }, };
                this.tbl_lmstasks.source.settings = clone;
                this.tbl_lmstasks.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmstasks.source.settings);
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_productid.value)), }, };
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmstasks_productid.value)), }, };
                this.tbl_lmstasks.source.settings = clone;
                this.tbl_lmstasks.source.initGrid();
            }
            this.bfilterPopulate_lmstasks = true;
        });
    }
    lmstasks_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmstasks_TableConfig() {
        this.lmstasks_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: false,
                edit: false,
                delete: false,
                position: 'right',
            },
            columns: {
                subject: {
                    title: 'Subject',
                    type: '',
                    filter: true,
                },
                assigntodesc: {
                    title: 'Assign To',
                    type: 'html',
                    filter: true,
                },
                assigneddate: {
                    title: 'Assigned Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                prioritydesc: {
                    title: 'Priority',
                    type: 'html',
                    filter: true,
                },
                actualcloseddate: {
                    title: 'Actual Closed Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                taskstatusdesc: {
                    title: 'Task Status',
                    type: 'html',
                    filter: true,
                },
            },
        };
    }
    lmstasks_LoadTable(lmstasks = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmstasks_ID) >= 0) {
            if (this.tbl_lmstasks != undefined)
                this.tbl_lmstasks.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
            if (this.tbl_lmstasks != undefined)
                this.tbl_lmstasks.source.load(lmstasks);
            if (this.tbl_lmstasks != undefined)
                this.tbl_lmstasks.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmstasks_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscall_service.lmstasks.length == 0)
    {
        this.tbl_lmstasks.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmstask();
        this.lmscall_service.lmstasks.push(obj);
        this.tbl_lmstasks.source.refresh();
        if ((this.lmscall_service.lmstasks.length / this.tbl_lmstasks.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmstasks.source.getPaging().page)
        {
            this.tbl_lmstasks.source.setPage((this.lmscall_service.lmstasks.length / this.tbl_lmstasks.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmstasks.source.grid.edit(this.tbl_lmstasks.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmstasks.source.data.indexOf(event.data);
    this.onDelete_lmstask(event,event.data.taskid,((this.tbl_lmstasks.source.getPaging().page-1) *this.tbl_lmstasks.source.getPaging().perPage)+index);
    this.tbl_lmstasks.source.refresh();
    break;
    }
    }
    
    */
    lmstasks_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmstask(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmstask(event, event.data.taskid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmstask(event, event.data.taskid, ((this.tbl_lmstasks.source.getPaging().page - 1) * this.tbl_lmstasks.source.getPaging().perPage) + event.index);
                this.tbl_lmstasks.source.refresh();
                break;
        }
    }
    lmstasks_onDelete(obj) {
        let taskid = obj.data.taskid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscall_service.delete_lmscall(taskid).then(res => this.lmstasks_LoadTable());
        }
    }
    onCustom_lmstasks_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmstasks");
            let formname = objbomenuaction.actionname;
        });
    }
    lmstasks_Paging(val) {
        debugger;
        this.tbl_lmstasks.source.setPaging(1, val, true);
    }
    handle_lmstasks_GridSelected(event) {
        this.lmstasks_selectedindex = this.tbl_lmstasks.source.findIndex(i => i.taskid === event.data.taskid);
    }
    Is_lmstasks_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmstasks_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_lmsreminders_Checkbox() {
        debugger;
        if (this.tbl_lmsreminders.source.settings['selectMode'] == 'multi')
            this.tbl_lmsreminders.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsreminders.source.settings['selectMode'] = 'multi';
        this.tbl_lmsreminders.source.initGrid();
    }
    delete_lmsreminders_All() {
        this.tbl_lmsreminders.source.settings['selectMode'] = 'single';
    }
    show_lmsreminders_Filter() {
        setTimeout(() => {
            //  this.Set_lmsreminders_TableDropDownConfig();
        });
        if (this.tbl_lmsreminders.source.settings != null)
            this.tbl_lmsreminders.source.settings['hideSubHeader'] = !this.tbl_lmsreminders.source.settings['hideSubHeader'];
        this.tbl_lmsreminders.source.initGrid();
    }
    show_lmsreminders_InActive() {
    }
    enable_lmsreminders_InActive() {
    }
    Set_lmsreminders_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmsreminders) {
            }
            this.bfilterPopulate_lmsreminders = true;
        });
    }
    lmsreminders_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmsreminders_TableConfig() {
        this.lmsreminders_settings = {
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
                custom: this.lmsreminder_menuactions
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
                leadid: {
                    title: 'Lead',
                    type: 'number',
                    filter: true,
                },
                opportunityid: {
                    title: 'Opportunity',
                    type: 'number',
                    filter: true,
                },
                remindertext: {
                    title: 'Reminder Text',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                reminderstartdatetime: {
                    title: 'Reminder Start Date Time',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                frequencyhours: {
                    title: 'Frequency Hours',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    lmsreminders_LoadTable(lmsreminders = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsreminders_ID) >= 0) {
            if (this.tbl_lmsreminders != undefined)
                this.tbl_lmsreminders.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
            if (this.tbl_lmsreminders != undefined)
                this.tbl_lmsreminders.source.load(lmsreminders);
            if (this.tbl_lmsreminders != undefined)
                this.tbl_lmsreminders.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmsreminders_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscall_service.lmsreminders.length == 0)
    {
        this.tbl_lmsreminders.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmsreminder();
        this.lmscall_service.lmsreminders.push(obj);
        this.tbl_lmsreminders.source.refresh();
        if ((this.lmscall_service.lmsreminders.length / this.tbl_lmsreminders.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsreminders.source.getPaging().page)
        {
            this.tbl_lmsreminders.source.setPage((this.lmscall_service.lmsreminders.length / this.tbl_lmsreminders.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmsreminders.source.grid.edit(this.tbl_lmsreminders.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmsreminders.source.data.indexOf(event.data);
    this.onDelete_lmsreminder(event,event.data.reminderid,((this.tbl_lmsreminders.source.getPaging().page-1) *this.tbl_lmsreminders.source.getPaging().perPage)+index);
    this.tbl_lmsreminders.source.refresh();
    break;
    }
    }
    
    */
    lmsreminders_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmsreminder(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmsreminder(event, event.data.reminderid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmsreminder(event, event.data.reminderid, ((this.tbl_lmsreminders.source.getPaging().page - 1) * this.tbl_lmsreminders.source.getPaging().perPage) + event.index);
                this.tbl_lmsreminders.source.refresh();
                break;
        }
    }
    lmsreminders_onDelete(obj) {
        let reminderid = obj.data.reminderid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscall_service.delete_lmscall(reminderid).then(res => this.lmsreminders_LoadTable());
        }
    }
    onCustom_lmsreminders_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmsreminders");
            let formname = objbomenuaction.actionname;
        });
    }
    lmsreminders_Paging(val) {
        debugger;
        this.tbl_lmsreminders.source.setPaging(1, val, true);
    }
    handle_lmsreminders_GridSelected(event) {
        this.lmsreminders_selectedindex = this.tbl_lmsreminders.source.findIndex(i => i.reminderid === event.data.reminderid);
    }
    Is_lmsreminders_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsreminders_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_lmshistories_Checkbox() {
        debugger;
        if (this.tbl_lmshistories.source.settings['selectMode'] == 'multi')
            this.tbl_lmshistories.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmshistories.source.settings['selectMode'] = 'multi';
        this.tbl_lmshistories.source.initGrid();
    }
    delete_lmshistories_All() {
        this.tbl_lmshistories.source.settings['selectMode'] = 'single';
    }
    show_lmshistories_Filter() {
        setTimeout(() => {
            //  this.Set_lmshistories_TableDropDownConfig();
        });
        if (this.tbl_lmshistories.source.settings != null)
            this.tbl_lmshistories.source.settings['hideSubHeader'] = !this.tbl_lmshistories.source.settings['hideSubHeader'];
        this.tbl_lmshistories.source.initGrid();
    }
    show_lmshistories_InActive() {
    }
    enable_lmshistories_InActive() {
    }
    Set_lmshistories_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmshistories) {
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['branchid'] != undefined)
                    clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_branchid.value)), }, };
                if (clone.columns['branchid'] != undefined)
                    clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_branchid.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['leadid'] != undefined)
                    clone.columns['leadid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadid.value)), }, };
                if (clone.columns['leadid'] != undefined)
                    clone.columns['leadid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadid.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_opportunityid.value)), }, };
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_opportunityid.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['callid'] != undefined)
                    clone.columns['callid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_callid.value)), }, };
                if (clone.columns['callid'] != undefined)
                    clone.columns['callid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_callid.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_productid.value)), }, };
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_productid.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['campaignid'] != undefined)
                    clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_campaignid.value)), }, };
                if (clone.columns['campaignid'] != undefined)
                    clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_campaignid.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['leadby'] != undefined)
                    clone.columns['leadby'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadby.value)), }, };
                if (clone.columns['leadby'] != undefined)
                    clone.columns['leadby'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadby.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['leadresponse'] != undefined)
                    clone.columns['leadresponse'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadresponse.value)), }, };
                if (clone.columns['leadresponse'] != undefined)
                    clone.columns['leadresponse'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadresponse.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['nextaction'] != undefined)
                    clone.columns['nextaction'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_nextaction.value)), }, };
                if (clone.columns['nextaction'] != undefined)
                    clone.columns['nextaction'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_nextaction.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['leadsource'] != undefined)
                    clone.columns['leadsource'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadsource.value)), }, };
                if (clone.columns['leadsource'] != undefined)
                    clone.columns['leadsource'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadsource.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['leadstage'] != undefined)
                    clone.columns['leadstage'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadstage.value)), }, };
                if (clone.columns['leadstage'] != undefined)
                    clone.columns['leadstage'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_leadstage.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmshistories.source.settings);
                if (clone.columns['criticality'] != undefined)
                    clone.columns['criticality'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_criticality.value)), }, };
                if (clone.columns['criticality'] != undefined)
                    clone.columns['criticality'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmshistories_criticality.value)), }, };
                this.tbl_lmshistories.source.settings = clone;
                this.tbl_lmshistories.source.initGrid();
            }
            this.bfilterPopulate_lmshistories = true;
        });
    }
    lmshistories_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmshistories_TableConfig() {
        this.lmshistories_settings = {
            hideSubHeader: true,
            mode: 'external',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: false,
                edit: false,
                delete: false,
                position: 'right',
            },
            columns: {
                branchiddesc: {
                    title: 'Branch',
                    type: 'html',
                    filter: true,
                },
                branchlocationiddesc: {
                    title: 'Branch Location',
                    type: 'html',
                    filter: true,
                },
                leadiddesc: {
                    title: 'Lead',
                    type: 'html',
                    filter: true,
                },
                opportunityiddesc: {
                    title: 'Opportunity',
                    type: 'html',
                    filter: true,
                },
                productiddesc: {
                    title: 'Product',
                    type: 'html',
                    filter: true,
                },
                campaigniddesc: {
                    title: 'Campaign',
                    type: 'html',
                    filter: true,
                },
                leadbydesc: {
                    title: 'Lead By',
                    type: 'html',
                    filter: true,
                },
                currentowner: {
                    title: 'Current Owner',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
                },
                leadresponsedesc: {
                    title: 'Lead Response',
                    type: 'html',
                    filter: true,
                },
                nextcalldate: {
                    title: 'Next Call Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                nextactiondesc: {
                    title: 'Next Action',
                    type: 'html',
                    filter: true,
                },
                actiondatetime: {
                    title: 'Action Date Time',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                previousremarks: {
                    title: 'Previous Remarks',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                leadscore: {
                    title: 'Lead Score',
                    type: 'number',
                    filter: true,
                },
                leadsourcedesc: {
                    title: 'Lead Source',
                    type: 'html',
                    filter: true,
                },
                leadstagedesc: {
                    title: 'Lead Stage',
                    type: 'html',
                    filter: true,
                },
                criticalitydesc: {
                    title: 'Criticality',
                    type: 'html',
                    filter: true,
                },
                expectedvalue: {
                    title: 'Expected Value',
                    type: '',
                    filter: true,
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
            },
        };
    }
    lmshistories_LoadTable(lmshistories = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmshistories_ID) >= 0) {
            if (this.tbl_lmshistories != undefined)
                this.tbl_lmshistories.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
            if (this.tbl_lmshistories != undefined)
                this.tbl_lmshistories.source.load(lmshistories);
            if (this.tbl_lmshistories != undefined)
                this.tbl_lmshistories.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmshistories_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscall_service.lmshistories.length == 0)
    {
        this.tbl_lmshistories.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmshistory();
        this.lmscall_service.lmshistories.push(obj);
        this.tbl_lmshistories.source.refresh();
        if ((this.lmscall_service.lmshistories.length / this.tbl_lmshistories.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmshistories.source.getPaging().page)
        {
            this.tbl_lmshistories.source.setPage((this.lmscall_service.lmshistories.length / this.tbl_lmshistories.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmshistories.source.grid.edit(this.tbl_lmshistories.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmshistories.source.data.indexOf(event.data);
    this.onDelete_lmshistory(event,event.data.historyid,((this.tbl_lmshistories.source.getPaging().page-1) *this.tbl_lmshistories.source.getPaging().perPage)+index);
    this.tbl_lmshistories.source.refresh();
    break;
    }
    }
    
    */
    lmshistories_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmshistory(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmshistory(event, event.data.historyid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmshistory(event, event.data.historyid, ((this.tbl_lmshistories.source.getPaging().page - 1) * this.tbl_lmshistories.source.getPaging().perPage) + event.index);
                this.tbl_lmshistories.source.refresh();
                break;
        }
    }
    lmshistories_onDelete(obj) {
        let historyid = obj.data.historyid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscall_service.delete_lmscall(historyid).then(res => this.lmshistories_LoadTable());
        }
    }
    onCustom_lmshistories_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmshistories");
            let formname = objbomenuaction.actionname;
        });
    }
    lmshistories_Paging(val) {
        debugger;
        this.tbl_lmshistories.source.setPaging(1, val, true);
    }
    handle_lmshistories_GridSelected(event) {
        this.lmshistories_selectedindex = this.tbl_lmshistories.source.findIndex(i => i.historyid === event.data.historyid);
    }
    Is_lmshistories_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmshistories_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
lmscallComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_21__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_23__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_24__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_13__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_25__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_26__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_26__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_26__.DialogService },
    { type: _service_lmscall_service__WEBPACK_IMPORTED_MODULE_1__.lmscallService },
    { type: _service_lmstask_service__WEBPACK_IMPORTED_MODULE_6__.lmstaskService },
    { type: _service_lmsreminder_service__WEBPACK_IMPORTED_MODULE_8__.lmsreminderService },
    { type: _service_lmshistory_service__WEBPACK_IMPORTED_MODULE_10__.lmshistoryService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_11__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_12__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_15__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_24__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_28__.NgxSpinnerService }
];
lmscallComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['customform', { static: false },] }],
    tbl_lmstasks: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['tbl_lmstasks', { static: false },] }],
    tbl_lmsreminders: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['tbl_lmsreminders', { static: false },] }],
    tbl_lmshistories: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['tbl_lmshistories', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['fileattachment', { static: false },] }]
};
lmscallComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_16__.Component)({
        selector: 'app-lmscall',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmscall_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_23__.KeyboardShortcutsService]
    })
], lmscallComponent);



/***/ }),

/***/ 36396:
/*!*******************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscall/lmscall.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscallModule": () => (/* binding */ lmscallModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _lmscall_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lmscall.routing */ 50312);
/* harmony import */ var _lmscall_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmscall.component */ 41592);
/* harmony import */ var _lmstask_lmstask_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lmstask/lmstask.module */ 5062);
/* harmony import */ var _lmshistory_lmshistory_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lmshistory/lmshistory.module */ 7013);
/* harmony import */ var _lmsreminder_lmsreminder_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lmsreminder/lmsreminder.module */ 9742);









let lmscallModule = class lmscallModule {
};
lmscallModule = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _lmscall_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _lmshistory_lmshistory_module__WEBPACK_IMPORTED_MODULE_5__.lmshistoryModule, _lmsreminder_lmsreminder_module__WEBPACK_IMPORTED_MODULE_6__.lmsreminderModule, _lmstask_lmstask_module__WEBPACK_IMPORTED_MODULE_4__.lmstaskModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_8__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_lmscall_component__WEBPACK_IMPORTED_MODULE_3__.lmscallComponent]
    })
], lmscallModule);



/***/ }),

/***/ 50312:
/*!********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscall/lmscall.routing.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _lmscall_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lmscall.component */ 41592);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'lmscalls', children: [
            { path: '', component: _lmscall_component__WEBPACK_IMPORTED_MODULE_0__.lmscallComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _lmscall_component__WEBPACK_IMPORTED_MODULE_0__.lmscallComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _lmscall_component__WEBPACK_IMPORTED_MODULE_0__.lmscallComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _lmscall_component__WEBPACK_IMPORTED_MODULE_0__.lmscallComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 5062:
/*!*******************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmstask/lmstask.module.ts ***!
  \*******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmstaskModule": () => (/* binding */ lmstaskModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _lmstask_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lmstask.routing */ 47070);
/* harmony import */ var _lmstask_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmstask.component */ 12903);






let lmstaskModule = class lmstaskModule {
};
lmstaskModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _lmstask_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_lmstask_component__WEBPACK_IMPORTED_MODULE_3__.lmstaskComponent]
    })
], lmstaskModule);



/***/ }),

/***/ 47070:
/*!********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmstask/lmstask.routing.ts ***!
  \********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _lmstask_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lmstask.component */ 12903);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'lmstasks', children: [
            { path: '', component: _lmstask_component__WEBPACK_IMPORTED_MODULE_0__.lmstaskComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _lmstask_component__WEBPACK_IMPORTED_MODULE_0__.lmstaskComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _lmstask_component__WEBPACK_IMPORTED_MODULE_0__.lmstaskComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _lmstask_component__WEBPACK_IMPORTED_MODULE_0__.lmstaskComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 63156:
/*!********************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmscall.service.ts ***!
  \********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscallService": () => (/* binding */ lmscallService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmscallService = class lmscallService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmscalls(formData, lmstasks, lmsreminders, lmshistories) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { lmstasks: lmstasks.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmsreminders: lmsreminders.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmshistories: lmshistories.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall' + '/getdefaultdata').toPromise();
        }
    }
    get_lmscalls_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall').toPromise();
        }
    }
    getListBy_callid(callid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall' + '/callid/' + callid).toPromise();
        }
    }
    getListBy_activitytype(activitytype) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall' + '/activitytype/' + activitytype).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall' + '/param/' + key).toPromise();
        }
    }
    get_lmscalls_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall' + '/e/' + id).toPromise();
        }
    }
    get_lmscalls_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall' + '/' + id).toPromise();
        }
    }
    delete_lmscall(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall' + '/' + id).toPromise();
        }
    }
    getlmscallsListbyactivitytype(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall/' + dt + '').toPromise();
        }
    }
    getlmscallsListbymonthwise(dt) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscall/' + dt + '').toPromise();
        }
    }
    getList_branchid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscall' + '/getList_branchid').toPromise();
    }
    getList_branchlocationid(branchid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscall' + '/getList_branchlocationid/branchid').toPromise();
    }
    getList_leadid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscall' + '/getList_leadid').toPromise();
    }
    getList_opportunityid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscall' + '/getList_opportunityid').toPromise();
    }
    getList_callid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscall' + '/getList_callid').toPromise();
    }
    getList_campaignid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscall' + '/getList_campaignid').toPromise();
    }
    getList_leadby() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscall' + '/getList_leadby').toPromise();
    }
    getList_currentowner() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscall' + '/getList_currentowner').toPromise();
    }
    getList_activitytype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscall' + '/getList_activitytype/').toPromise();
    }
    getList_nextaction() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscall' + '/getList_nextaction/').toPromise();
    }
};
lmscallService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmscallService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmscallService);



/***/ }),

/***/ 91276:
/*!***************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmscall/lmscall.component.html ***!
  \***************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmscall_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Activities' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmscalls()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmscall_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.callid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.callid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <p-accordion [multiple]='true'>\r\n\r\n\r\n      <!--branchid-->\r\n\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n          style='' class=\"col-3\"><label for=\"branchid\" class=\"control-label\"\r\n            (click)=\"AddOrEdit_branchid(null)\">Branch</label>\r\n          <app-popupselect *ngIf=\"!showview\" [options]=\"branchid_List\" [optionsEvent]=\"branchid_optionsEvent\"\r\n            [form]=\"bobranchmaster\" (selectItem)=\"onSelected_branchid($event)\" [reportid]='bxg94' [menuid]='bxg94'\r\n            formControlName=\"branchid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n          <div class=\"input-group\">\r\n          </div>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.branchiddesc?.value}}</label>\r\n        </div>\r\n\r\n\r\n        <!--branchlocationid-->\r\n\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('branchlocationid') == -1) && (branchlocationidvisible==undefined || branchlocationidvisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n          style='' class=\"col-3\"><label for=\"branchlocationid\" class=\"control-label\"\r\n            (click)=\"AddOrEdit_branchlocationid(null)\">Branch Location</label>\r\n          <app-popupselect *ngIf=\"!showview\" [options]=\"branchlocationid_List\"\r\n            [optionsEvent]=\"branchlocationid_optionsEvent\" [form]=\"bobranchlocation\"\r\n            (selectItem)=\"onSelected_branchlocationid($event)\" [reportid]='fcx84' [menuid]='fcx84'\r\n            formControlName=\"branchlocationid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n          <div class=\"input-group\">\r\n          </div>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.branchlocationiddesc?.value}}</label>\r\n        </div>\r\n        <div *ngIf=\"((hidelist.indexOf('eventdate') == -1) && (eventdatevisible==undefined || eventdatevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"eventdate\" class=\"control-label required\">Event Date</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.eventdate?.value)}}</label>\r\n          <div class=\"input-group\" *ngIf=\"!showview\">\r\n            <input #eventdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n              [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"eventdateformpicker\" id=\"eventdate\"\r\n              required formControlName=\"eventdate\" class=\"form-control\">\r\n            <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"eventdateformpicker.toggle()\" type=\"button\"><i\r\n                class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n          </div>\r\n          <app-field-error-display [displayError]=\"f.eventdate.errors?.required\"\r\n            errorMsg=\"Enter {{'Event Date' | translate}}\">\r\n          </app-field-error-display>\r\n        </div>\r\n        <div *ngIf=\"((hidelist.indexOf('eventtime') == -1) && (eventtimevisible==undefined || eventtimevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"eventtime\" class=\"control-label required\">Event Time</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.eventtime?.value}}</label>\r\n          <ngb-timepicker *ngIf=\"!showview\" class=\"form-control timepicker\" formControlName=\"eventtime\" required>\r\n          </ngb-timepicker>\r\n          <app-field-error-display [displayError]=\"f.eventtime.errors?.required\"\r\n            errorMsg=\"Enter {{'Event Time' | translate}}\">\r\n          </app-field-error-display>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('eventenddate') == -1) && (eventenddatevisible==undefined || eventenddatevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"eventenddate\" class=\"control-label\">Event End Date</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.eventenddate?.value)}}</label>\r\n          <div class=\"input-group\" *ngIf=\"!showview\">\r\n            <input #eventenddateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n              [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"eventenddateformpicker\" id=\"eventenddate\"\r\n              formControlName=\"eventenddate\" class=\"form-control\">\r\n            <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"eventenddateformpicker.toggle()\"\r\n              type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n          </div>\r\n        </div>\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('eventendtime') == -1) && (eventendtimevisible==undefined || eventendtimevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"eventendtime\" class=\"control-label\">Event End Time</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.eventendtime?.value}}</label>\r\n          <ngb-timepicker *ngIf=\"!showview\" class=\"form-control timepicker\" formControlName=\"eventendtime\">\r\n          </ngb-timepicker>\r\n        </div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <p-accordionTab header='Lead Details' [selected]='true'>\r\n\r\n\r\n        <!--leadid-->\r\n\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('leadid') == -1) && (leadidvisible==undefined || leadidvisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n            style='' class=\"col-3\"><label for=\"leadid\" class=\"control-label\"\r\n              (click)=\"AddOrEdit_leadid(null)\">Lead</label>\r\n            <select *ngIf=\"!showview\" id=\"leadid\" (change)=\"leadid_onChange($event.target)\" formControlName=\"leadid\"\r\n              class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of leadid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.leadiddesc?.value}}</label>\r\n          </div>\r\n\r\n\r\n          <!--opportunityid-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('opportunityid') == -1) && (opportunityidvisible==undefined || opportunityidvisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n            style='' class=\"col-3\"><label for=\"opportunityid\" class=\"control-label\"\r\n              (click)=\"AddOrEdit_opportunityid(null)\">Opportunity</label>\r\n            <app-popupselect *ngIf=\"!showview\" [options]=\"opportunityid_List\"\r\n              [optionsEvent]=\"opportunityid_optionsEvent\" [form]=\"lmsopportunity\"\r\n              (selectItem)=\"onSelected_opportunityid($event)\" [reportid]='vm3i3' [menuid]='vm3i3'\r\n              formControlName=\"opportunityid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n            <div class=\"input-group\">\r\n            </div>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.opportunityiddesc?.value}}</label>\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('agenda') == -1) && (agendavisible==undefined || agendavisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"agenda\" class=\"control-label\">Agenda</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.agenda?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"agenda\" formControlName=\"agenda\" class=\"form-control\">\r\n          </div>\r\n\r\n\r\n          <!--campaignid-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('campaignid') == -1) && (campaignidvisible==undefined || campaignidvisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n            style='' class=\"col-3\"><label for=\"campaignid\" class=\"control-label\"\r\n              (click)=\"AddOrEdit_campaignid(null)\">Campaign</label>\r\n            <select *ngIf=\"!showview\" id=\"campaignid\" (change)=\"campaignid_onChange($event.target)\"\r\n              formControlName=\"campaignid\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of campaignid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.campaigniddesc?.value}}</label>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <!--leadby-->\r\n\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('leadby') == -1) && (leadbyvisible==undefined || leadbyvisible==true)) || maindata==undefined || maindata==null || maindata.ScreenType==null\"\r\n            style='' class=\"col-3\"><label for=\"leadby\" class=\"control-label\" (click)=\"AddOrEdit_leadby(null)\">Lead\r\n              By</label>\r\n            <app-popupselect *ngIf=\"!showview\" [options]=\"leadby_List\" [optionsEvent]=\"leadby_optionsEvent\"\r\n              [form]=\"bousermaster\" (selectItem)=\"onSelected_leadby($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n              formControlName=\"leadby\" id=\"value\" desc=\"label\"></app-popupselect>\r\n            <div class=\"input-group\">\r\n            </div>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.leadbydesc?.value}}</label>\r\n          </div>\r\n\r\n\r\n          <!--currentowner-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('currentowner') == -1) && (currentownervisible==undefined || currentownervisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"currentowner\" class=\"control-label required\"\r\n              (click)=\"AddOrEdit_currentowner(null)\">Current Owner</label>\r\n            <app-popupselect *ngIf=\"!showview\" [options]=\"currentowner_List\" [optionsEvent]=\"currentowner_optionsEvent\"\r\n              [form]=\"bousermaster\" (selectItem)=\"onSelected_currentowner($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n              formControlName=\"currentowner\" id=\"value\" desc=\"label\"></app-popupselect>\r\n            <div class=\"input-group\">\r\n            </div>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.currentownerdesc?.value}}</label>\r\n            <app-field-error-display [displayError]=\"f.currentowner.errors?.required\"\r\n              errorMsg=\"Enter {{'Current Owner' | translate}}\">\r\n            </app-field-error-display>\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n      </p-accordionTab>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <p-accordionTab header='Activity' [selected]='false'>\r\n\r\n\r\n        <!--activitytype-->\r\n\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('activitytype') == -1) && (activitytypevisible==undefined || activitytypevisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"activitytype\" class=\"control-label required\">Activity Type</label>\r\n            <select *ngIf=\"!showview\" id=\"activitytype\" required (change)=\"activitytype_onChange($event.target)\"\r\n              formControlName=\"activitytype\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of activitytype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.activitytypedesc?.value}}</label>\r\n            <app-field-error-display [displayError]=\"f.activitytype.errors?.required\"\r\n              errorMsg=\"Enter {{'Activity Type' | translate}}\">\r\n            </app-field-error-display>\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('attendedusers') == -1) && (attendedusersvisible==undefined || attendedusersvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"attendedusers\" class=\"control-label\">Attended Users</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.attendedusers?.value}}</label>\r\n            <app-useraccess *ngIf=\"!showview\" id=\"attendedusers\" formControlName=\"attendedusers\"\r\n              (change)=\"attendedusers_onChange($event.target)\">\r\n            </app-useraccess>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('clientusers') == -1) && (clientusersvisible==undefined || clientusersvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"clientusers\" class=\"control-label\">Client Users</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.clientusers?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"clientusers\" formControlName=\"clientusers\" class=\"form-control\">\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('nextcalldate') == -1) && (nextcalldatevisible==undefined || nextcalldatevisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"nextcalldate\" class=\"control-label\">Next Call Date</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.nextcalldate?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #nextcalldateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"nextcalldateformpicker\"\r\n                id=\"nextcalldate\" formControlName=\"nextcalldate\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"nextcalldateformpicker.toggle()\"\r\n                type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <!--nextaction-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('nextaction') == -1) && (nextactionvisible==undefined || nextactionvisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"nextaction\" class=\"control-label\">Next Action</label>\r\n            <select *ngIf=\"!showview\" id=\"nextaction\" (change)=\"nextaction_onChange($event.target)\"\r\n              formControlName=\"nextaction\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of nextaction_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.nextactiondesc?.value}}</label>\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('actiondatetime') == -1) && (actiondatetimevisible==undefined || actiondatetimevisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"actiondatetime\" class=\"control-label\">Action Date Time</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.actiondatetime?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #actiondatetimeformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"actiondatetimeformpicker\"\r\n                id=\"actiondatetime\" formControlName=\"actiondatetime\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"actiondatetimeformpicker.toggle()\"\r\n                type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('score') == -1) && (scorevisible==undefined || scorevisible==true))\" style=''\r\n            class=\"col-3 \">\r\n            <label for=\"score\" class=\"control-label\">Score</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.score?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"score\" formControlName=\"score\" class=\"form-control\">\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('remarks') == -1) && (remarksvisible==undefined || remarksvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"remarks\" class=\"control-label\">Remarks</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.remarks?.value}}</label>\r\n            <app-comment *ngIf=\"!showview\" id=\"remarks\" formControlName=\"remarks\" [label]=\"'Remarks'\">\r\n            </app-comment>\r\n          </div>\r\n        </div>\r\n      </p-accordionTab>\r\n    </p-accordion>\r\n    <div class='full-width'\r\n      *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab header='CustomField' [selected]='false'>\r\n          <div class=\"sticky\"\r\n            *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n            Custom Fields</div>\r\n          <div class=\"form-group row\"\r\n            *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n            <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n          </div>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n    <!-- child table lmstasks-->\r\n    <div [ngClass]=\"Is_lmstasks_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Tasks' | translate}}\r\n        <select class='child' id=\"lmstasksPagingdropdown\" (change)=\"lmstasks_Paging($event.target.value)\" [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"lmstasks_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmstasksFilter()\"><i class=\"fa fa-filter\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmstasktoggleOption();lmstasks_route(null, 'create')\"><i\r\n            class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmstasks (userRowSelect)=\"handle_lmstasks_GridSelected($event)\"\r\n        [settings]=\"lmstasks_settings\" (custom)=\"onCustom_lmstasks_Action($event)\" [source]=\"tbl_lmstasks?.source?.data\"\r\n        (delete)=\"lmstasks_route($event,'delete')\" (deleteConfirm)=\"lmstasks_route($event,'delete')\"\r\n        (create)=\"lmstasks_route($event,'create')\" (createConfirm)=\"lmstasks_beforesave($event)\"\r\n        (edit)=\"lmstasks_route($event,'edit')\" (editConfirm)=\"lmstasks_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmstasks-->\r\n    <!-- child table lmsreminders-->\r\n    <div [ngClass]=\"Is_lmsreminders_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Reminders' | translate}}\r\n        <select class='child' id=\"lmsremindersPagingdropdown\" (change)=\"lmsreminders_Paging($event.target.value)\"\r\n          [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"lmsreminders_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmsremindersFilter()\"><i class=\"fa fa-filter\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmsreminders_route(null, 'create')\"><i class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmsreminders (userRowSelect)=\"handle_lmsreminders_GridSelected($event)\"\r\n        [settings]=\"lmsreminders_settings\" (custom)=\"onCustom_lmsreminders_Action($event)\"\r\n        [source]=\"tbl_lmsreminders?.source?.data\" (delete)=\"lmsreminders_route($event,'delete')\"\r\n        (deleteConfirm)=\"lmsreminders_route($event,'delete')\" (create)=\"lmsreminders_route($event,'create')\"\r\n        (createConfirm)=\"lmsreminders_beforesave($event)\" (edit)=\"lmsreminders_route($event,'edit')\"\r\n        (editConfirm)=\"lmsreminders_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmsreminders-->\r\n    <!-- child table lmshistories-->\r\n    <div [ngClass]=\"Is_lmshistories_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Histories' | translate}}\r\n        <select class='child' id=\"lmshistoriesPagingdropdown\" (change)=\"lmshistories_Paging($event.target.value)\"\r\n          [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]=''\r\n                  (click)=\"lmshistorytoggleOption();lmshistories_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmshistoriesFilter()\"><i class=\"fa fa-filter\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmshistories_route(null, 'create')\"><i class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmshistories (userRowSelect)=\"handle_lmshistories_GridSelected($event)\"\r\n        [settings]=\"lmshistories_settings\" (custom)=\"onCustom_lmshistories_Action($event)\"\r\n        [source]=\"tbl_lmshistories?.source?.data\" (delete)=\"lmshistories_route($event,'delete')\"\r\n        (deleteConfirm)=\"lmshistories_route($event,'delete')\" (create)=\"lmshistories_route($event,'create')\"\r\n        (createConfirm)=\"lmshistories_beforesave($event)\" (edit)=\"lmshistories_route($event,'edit')\"\r\n        (editConfirm)=\"lmshistories_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmshistories-->\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_lmscall_lmscall_module_ts.js.map