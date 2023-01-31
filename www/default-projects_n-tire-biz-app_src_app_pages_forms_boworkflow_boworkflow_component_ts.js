"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_boworkflow_boworkflow_component_ts"],{

/***/ 53401:
/*!****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boworkflow/boworkflow.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boworkflowComponent": () => (/* binding */ boworkflowComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boworkflow_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boworkflow.component.html */ 43276);
/* harmony import */ var _service_boworkflow_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/boworkflow.service */ 75021);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions


//Shortcuts

//translator



//primeng services



//session,application constants




//custom fields & attachments


let boworkflowComponent = class boworkflowComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, boworkflow_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.boworkflow_service = boworkflow_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_boworkflows = false;
        this.boworkflow_menuactions = [];
        this.currentapproved_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
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
        this.boworkflow_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            workflowid: [null],
            workflowmasterid: [null],
            currentstepno: [null],
            modulename: [null],
            pkvalue: [null],
            currentapproved: [null],
            currentapproveddesc: [null],
            currentapprovers: [null],
            nextapprovers: [null],
            assigneddatetime: [null],
            closeddatetime: [null],
            standardrating: [null],
            standardratingdesc: [null],
            performancerating: [null],
            performanceratingdesc: [null],
            performancestatus: [null],
            performancestatusdesc: [null],
            exception: [null],
            approvedusers: [null],
            approvedcondition: [null],
            tathours: [null],
            totalactualtime: [null],
            processid: [null],
            workflowdetails: [null],
            comments: [null],
            history: [null],
            lastapprover: [null],
            cc: [null],
            customfield: [null],
            attachment: [null],
            workflowstatus: [null],
            workflowstatusdesc: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.boworkflow_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.boworkflow_Form.dirty && this.boworkflow_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.workflowid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.workflowid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.workflowid && pkDetail) {
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
            let boworkflowid = null;
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
            this.formid = boworkflowid;
            //alert(boworkflowid);
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
            this.boworkflow_service.getDefaultData().then(res => {
                this.currentapproved_List = res.list_currentapproved.value;
                this.standardrating_List = res.list_standardrating.value;
                this.performancerating_List = res.list_performancerating.value;
                this.performancestatus_List = res.list_performancestatus.value;
                this.workflowstatus_List = res.list_workflowstatus.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.boworkflow_service.get_boworkflows_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.boworkflow_Form.markAsUntouched();
            this.boworkflow_Form.markAsPristine();
        });
    }
    onSelected_currentapproved(currentapprovedDetail) {
        if (currentapprovedDetail.value && currentapprovedDetail) {
            this.boworkflow_Form.patchValue({
                currentapproved: currentapprovedDetail.value,
                currentapproveddesc: currentapprovedDetail.label,
            });
        }
    }
    resetForm() {
        if (this.boworkflow_Form != null)
            this.boworkflow_Form.reset();
        this.boworkflow_Form.patchValue({
            currentapproved: this.sessionData.userid,
            currentapproveddesc: this.sessionData.username,
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let workflowid = this.boworkflow_Form.get('workflowid').value;
        if (workflowid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boworkflow_service.delete_boworkflow(workflowid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boworkflow_Form.patchValue({
            workflowid: null
        });
        if (this.formData.workflowid != null)
            this.formData.workflowid = null;
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
                    else if (key == "currentapprovers")
                        this.boworkflow_Form.patchValue({ "currentapprovers": mainscreendata[key] });
                    else if (key == "nextapprovers")
                        this.boworkflow_Form.patchValue({ "nextapprovers": mainscreendata[key] });
                    else if (key == "assigneddatetime")
                        this.boworkflow_Form.patchValue({ "assigneddatetime": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "closeddatetime")
                        this.boworkflow_Form.patchValue({ "closeddatetime": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "approvedusers")
                        this.boworkflow_Form.patchValue({ "approvedusers": mainscreendata[key] });
                    else if (key == "comments")
                        this.boworkflow_Form.patchValue({ "comments": mainscreendata[key] });
                    else if (key == "lastapprover")
                        this.boworkflow_Form.patchValue({ "lastapprover": mainscreendata[key] });
                    else if (key == "cc")
                        this.boworkflow_Form.patchValue({ "cc": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.boworkflow_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boworkflow_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boworkflow_Form.controls[key] != undefined) {
                                this.boworkflow_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("boworkflows", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    currentapproved_onChange(evt) {
        let e = evt.value;
    }
    standardrating_onChange(evt) {
        let e = this.f.standardrating.value;
        this.boworkflow_Form.patchValue({ standardratingdesc: evt.options[evt.options.selectedIndex].text });
    }
    performancerating_onChange(evt) {
        let e = this.f.performancerating.value;
        this.boworkflow_Form.patchValue({ performanceratingdesc: evt.options[evt.options.selectedIndex].text });
    }
    performancestatus_onChange(evt) {
        let e = this.f.performancestatus.value;
        this.boworkflow_Form.patchValue({ performancestatusdesc: evt.options[evt.options.selectedIndex].text });
    }
    workflowstatus_onChange(evt) {
        let e = this.f.workflowstatus.value;
        this.boworkflow_Form.patchValue({ workflowstatusdesc: evt.options[evt.options.selectedIndex].text });
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
    edit_boworkflows() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.boworkflow_service.get_boworkflows_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.boworkflow;
                let formproperty = res.boworkflow.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.boworkflow.pkcol;
                this.formid = res.boworkflow.workflowid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.boworkflow;
        this.formid = res.boworkflow.workflowid;
        this.pkcol = res.boworkflow.pkcol;
        this.bmyrecord = false;
        if (res.boworkflow.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boworkflow_Form.patchValue({
            workflowid: res.boworkflow.workflowid,
            workflowmasterid: res.boworkflow.workflowmasterid,
            currentstepno: res.boworkflow.currentstepno,
            modulename: res.boworkflow.modulename,
            pkvalue: res.boworkflow.pkvalue,
            currentapproved: res.boworkflow.currentapproved,
            currentapproveddesc: res.boworkflow.currentapproveddesc,
            currentapprovers: JSON.parse(res.boworkflow.currentapprovers),
            nextapprovers: JSON.parse(res.boworkflow.nextapprovers),
            assigneddatetime: this.ngbDateParserFormatter.parse(res.boworkflow.assigneddatetime),
            closeddatetime: this.ngbDateParserFormatter.parse(res.boworkflow.closeddatetime),
            standardrating: res.boworkflow.standardrating,
            standardratingdesc: res.boworkflow.standardratingdesc,
            performancerating: res.boworkflow.performancerating,
            performanceratingdesc: res.boworkflow.performanceratingdesc,
            performancestatus: res.boworkflow.performancestatus,
            performancestatusdesc: res.boworkflow.performancestatusdesc,
            exception: res.boworkflow.exception,
            approvedusers: JSON.parse(res.boworkflow.approvedusers),
            approvedcondition: res.boworkflow.approvedcondition,
            tathours: res.boworkflow.tathours,
            totalactualtime: res.boworkflow.totalactualtime,
            processid: res.boworkflow.processid,
            workflowdetails: res.boworkflow.workflowdetails,
            comments: JSON.parse(res.boworkflow.comments),
            history: res.boworkflow.history,
            lastapprover: JSON.parse(res.boworkflow.lastapprover),
            cc: JSON.parse(res.boworkflow.cc),
            customfield: res.boworkflow.customfield,
            attachment: JSON.parse(res.boworkflow.attachment),
            workflowstatus: res.boworkflow.workflowstatus,
            workflowstatusdesc: res.boworkflow.workflowstatusdesc,
            status: res.boworkflow.status,
            statusdesc: res.boworkflow.statusdesc,
        });
        this.boworkflow_menuactions = res.boworkflow_menuactions;
        if (this.boworkflow_Form.get('customfield').value != null && this.boworkflow_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.boworkflow_Form.get('customfield').value);
        this.FillCustomField();
        if (this.boworkflow_Form.get('attachment').value != null && this.boworkflow_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.boworkflow_Form.get('attachment').value);
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.boworkflow_Form.controls) {
            let val = this.boworkflow_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.boworkflow_Form.controls[key] != null) {
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
            if (!this.boworkflow_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.boworkflow_Form.getRawValue();
            if (this.boworkflow_Form.get('currentapprovers').value != null)
                obj.currentapprovers = JSON.stringify(this.boworkflow_Form.get('currentapprovers').value);
            if (this.boworkflow_Form.get('nextapprovers').value != null)
                obj.nextapprovers = JSON.stringify(this.boworkflow_Form.get('nextapprovers').value);
            obj.assigneddatetime = new Date(this.boworkflow_Form.get('assigneddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflow_Form.get('assigneddatetime').value) + '  UTC' : null);
            obj.closeddatetime = new Date(this.boworkflow_Form.get('closeddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflow_Form.get('closeddatetime').value) + '  UTC' : null);
            if (this.boworkflow_Form.get('approvedusers').value != null)
                obj.approvedusers = JSON.stringify(this.boworkflow_Form.get('approvedusers').value);
            if (this.boworkflow_Form.get('comments').value != null)
                obj.comments = JSON.stringify(this.boworkflow_Form.get('comments').value);
            if (this.boworkflow_Form.get('lastapprover').value != null)
                obj.lastapprover = JSON.stringify(this.boworkflow_Form.get('lastapprover').value);
            if (this.boworkflow_Form.get('cc').value != null)
                obj.cc = JSON.stringify(this.boworkflow_Form.get('cc').value);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.boworkflow_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.boworkflow_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.boworkflow_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.boworkflow_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.boworkflow_Form.controls[key] != null) {
                            this.formData[key] = this.boworkflow_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            if (this.boworkflow_Form.get('currentapprovers').value != null)
                this.formData.currentapprovers = JSON.stringify(this.boworkflow_Form.get('currentapprovers').value);
            if (this.boworkflow_Form.get('nextapprovers').value != null)
                this.formData.nextapprovers = JSON.stringify(this.boworkflow_Form.get('nextapprovers').value);
            this.formData.assigneddatetime = new Date(this.boworkflow_Form.get('assigneddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflow_Form.get('assigneddatetime').value) + '  UTC' : null);
            this.formData.closeddatetime = new Date(this.boworkflow_Form.get('closeddatetime').value ? this.ngbDateParserFormatter.format(this.boworkflow_Form.get('closeddatetime').value) + '  UTC' : null);
            if (this.boworkflow_Form.get('approvedusers').value != null)
                this.formData.approvedusers = JSON.stringify(this.boworkflow_Form.get('approvedusers').value);
            if (this.boworkflow_Form.get('comments').value != null)
                this.formData.comments = JSON.stringify(this.boworkflow_Form.get('comments').value);
            if (this.boworkflow_Form.get('lastapprover').value != null)
                this.formData.lastapprover = JSON.stringify(this.boworkflow_Form.get('lastapprover').value);
            if (this.boworkflow_Form.get('cc').value != null)
                this.formData.cc = JSON.stringify(this.boworkflow_Form.get('cc').value);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.boworkflow_service.saveOrUpdate_boworkflows(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.boworkflow);
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
                        this.objvalues.push(res.boworkflow);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boworkflow_Form.markAsUntouched();
                this.boworkflow_Form.markAsPristine();
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
boworkflowComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_12__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DialogService },
    { type: _service_boworkflow_service__WEBPACK_IMPORTED_MODULE_1__.boworkflowService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_18__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_8__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_20__.NgxSpinnerService }
];
boworkflowComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['customform', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['fileattachment', { static: false },] }]
};
boworkflowComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-boworkflow',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boworkflow_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService]
    })
], boworkflowComponent);



/***/ }),

/***/ 43276:
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boworkflow/boworkflow.component.html ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"boworkflow_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Workflow' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_boworkflows()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of boworkflow_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.workflowid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.workflowid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('workflowmasterid') == -1) && (workflowmasteridvisible==undefined || workflowmasteridvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"workflowmasterid\" class=\"control-label\">Work Flow Master</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.workflowmasterid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"workflowmasterid\" formControlName=\"workflowmasterid\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('currentstepno') == -1) && (currentstepnovisible==undefined || currentstepnovisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"currentstepno\" class=\"control-label\">Current Step No</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.currentstepno?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"currentstepno\" formControlName=\"currentstepno\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('modulename') == -1) && (modulenamevisible==undefined || modulenamevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"modulename\" class=\"control-label\">Module Name</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.modulename?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"modulename\" formControlName=\"modulename\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('pkvalue') == -1) && (pkvaluevisible==undefined || pkvaluevisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"pkvalue\" class=\"control-label\">P K Value</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.pkvalue?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"pkvalue\" formControlName=\"pkvalue\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--currentapproved-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('currentapproved') == -1) && (currentapprovedvisible==undefined || currentapprovedvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"currentapproved\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_currentapproved(null)\">Current Approved</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"currentapproved_List\"\r\n          [optionsEvent]=\"currentapproved_optionsEvent\" [form]=\"bousermaster\"\r\n          (selectItem)=\"onSelected_currentapproved($event)\" [reportid]='' [menuid]='' formControlName=\"currentapproved\"\r\n          id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.currentapproveddesc?.value}}</label>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('currentapprovers') == -1) && (currentapproversvisible==undefined || currentapproversvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"currentapprovers\" class=\"control-label\">Current Approvers</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.currentapprovers?.value}}</label>\r\n        <app-useraccess *ngIf=\"!showview\" id=\"currentapprovers\" formControlName=\"currentapprovers\">\r\n        </app-useraccess>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('nextapprovers') == -1) && (nextapproversvisible==undefined || nextapproversvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"nextapprovers\" class=\"control-label\">Next Approvers</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.nextapprovers?.value}}</label>\r\n        <app-useraccess *ngIf=\"!showview\" id=\"nextapprovers\" formControlName=\"nextapprovers\">\r\n        </app-useraccess>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('assigneddatetime') == -1) && (assigneddatetimevisible==undefined || assigneddatetimevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"assigneddatetime\" class=\"control-label\">Assigned Date Time</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.assigneddatetime?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"!showview\">\r\n          <input #assigneddatetimeformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n            [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"assigneddatetimeformpicker\"\r\n            id=\"assigneddatetime\" formControlName=\"assigneddatetime\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"assigneddatetimeformpicker.toggle()\"\r\n            type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('closeddatetime') == -1) && (closeddatetimevisible==undefined || closeddatetimevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"closeddatetime\" class=\"control-label\">Closed Date Time</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.closeddatetime?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"!showview\">\r\n          <input #closeddatetimeformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n            [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"closeddatetimeformpicker\"\r\n            id=\"closeddatetime\" formControlName=\"closeddatetime\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"closeddatetimeformpicker.toggle()\"\r\n            type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--standardrating-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('standardrating') == -1) && (standardratingvisible==undefined || standardratingvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"standardrating\" class=\"control-label\">Standard Rating</label>\r\n        <select *ngIf=\"!showview\" id=\"standardrating\" (change)=\"standardrating_onChange($event.target)\"\r\n          formControlName=\"standardrating\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of standardrating_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.standardratingdesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--performancerating-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('performancerating') == -1) && (performanceratingvisible==undefined || performanceratingvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"performancerating\" class=\"control-label\">Performance Rating</label>\r\n        <select *ngIf=\"!showview\" id=\"performancerating\" (change)=\"performancerating_onChange($event.target)\"\r\n          formControlName=\"performancerating\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of performancerating_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.performanceratingdesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--performancestatus-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('performancestatus') == -1) && (performancestatusvisible==undefined || performancestatusvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"performancestatus\" class=\"control-label\">Performance Status</label>\r\n        <select *ngIf=\"!showview\" id=\"performancestatus\" (change)=\"performancestatus_onChange($event.target)\"\r\n          formControlName=\"performancestatus\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of performancestatus_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.performancestatusdesc?.value}}</label>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('exception') == -1) && (exceptionvisible==undefined || exceptionvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"exception\" class=\"control-label\">Exception</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.exception?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"exception\"\r\n          formControlName=\"exception\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('approvedusers') == -1) && (approvedusersvisible==undefined || approvedusersvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"approvedusers\" class=\"control-label\">Approved Users</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.approvedusers?.value}}</label>\r\n        <app-useraccess *ngIf=\"!showview\" id=\"approvedusers\" formControlName=\"approvedusers\">\r\n        </app-useraccess>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('approvedcondition') == -1) && (approvedconditionvisible==undefined || approvedconditionvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"approvedcondition\" class=\"control-label\">Approved Condition</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.approvedcondition?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"approvedcondition\" formControlName=\"approvedcondition\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('tathours') == -1) && (tathoursvisible==undefined || tathoursvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"tathours\" class=\"control-label\">T A T Hours</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.tathours?.value}}</label>\r\n        <app-duration *ngIf=\"!showview\" id=\"tathours\" formControlName=\"tathours\">\r\n        </app-duration>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('totalactualtime') == -1) && (totalactualtimevisible==undefined || totalactualtimevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"totalactualtime\" class=\"control-label\">Total Actual Time</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.totalactualtime?.value}}</label>\r\n        <app-duration *ngIf=\"!showview\" id=\"totalactualtime\" formControlName=\"totalactualtime\">\r\n        </app-duration>\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('processid') == -1) && (processidvisible==undefined || processidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"processid\" class=\"control-label\">Process</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.processid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"processid\" formControlName=\"processid\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('workflowdetails') == -1) && (workflowdetailsvisible==undefined || workflowdetailsvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"workflowdetails\" class=\"control-label\">Work Flow Details</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.workflowdetails?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"workflowdetails\"\r\n          formControlName=\"workflowdetails\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('comments') == -1) && (commentsvisible==undefined || commentsvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"comments\" class=\"control-label\">Comments</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.comments?.value}}</label>\r\n        <app-comment *ngIf=\"!showview\" id=\"comments\" formControlName=\"comments\" [label]=\"'Comments'\">\r\n        </app-comment>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div class=\"help-tip\">\r\n        <p> {{f.history?.value}}</p>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('lastapprover') == -1) && (lastapprovervisible==undefined || lastapprovervisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"lastapprover\" class=\"control-label\">Last Approver</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.lastapprover?.value}}</label>\r\n        <app-useraccess *ngIf=\"!showview\" id=\"lastapprover\" formControlName=\"lastapprover\"\r\n          (change)=\"lastapprover_onChange($event.target)\">\r\n        </app-useraccess>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('cc') == -1) && (ccvisible==undefined || ccvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"cc\" class=\"control-label\">C C</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.cc?.value}}</label>\r\n        <app-useraccess *ngIf=\"!showview\" id=\"cc\" formControlName=\"cc\" (change)=\"cc_onChange($event.target)\">\r\n        </app-useraccess>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--workflowstatus-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('workflowstatus') == -1) && (workflowstatusvisible==undefined || workflowstatusvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"workflowstatus\" class=\"control-label\">Workflow Status</label>\r\n        <select *ngIf=\"!showview\" id=\"workflowstatus\" (change)=\"workflowstatus_onChange($event.target)\"\r\n          formControlName=\"workflowstatus\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of workflowstatus_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.workflowstatusdesc?.value}}</label>\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div class='full-width'\r\n      *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab header='CustomField' [selected]='false'>\r\n          <div class=\"sticky\"\r\n            *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n            Custom Fields</div>\r\n          <div class=\"form-group row\"\r\n            *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n            <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n          </div>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_boworkflow_boworkflow_component_ts.js.map