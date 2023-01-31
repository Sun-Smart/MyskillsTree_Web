"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_lmscampaigntask_lmscampaigntask_component_ts"],{

/***/ 79414:
/*!**************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmscampaigntask/lmscampaigntask.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscampaigntaskComponent": () => (/* binding */ lmscampaigntaskComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmscampaigntask_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmscampaigntask.component.html */ 37046);
/* harmony import */ var _service_lmscampaigntask_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmscampaigntask.service */ 30163);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_lmscampaigntaskresponse_lmscampaigntaskresponse_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../pages/forms/lmscampaigntaskresponse/lmscampaigntaskresponse.component */ 46451);
/* harmony import */ var _service_lmscampaigntaskresponse_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../service/lmscampaigntaskresponse.service */ 91459);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions



//Shortcuts

//translator





//primeng services



//session,application constants




//custom fields & attachments


let lmscampaigntaskComponent = class lmscampaigntaskComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmscampaigntask_service, lmscampaigntaskresponse_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmscampaigntask_service = lmscampaigntask_service;
        this.lmscampaigntaskresponse_service = lmscampaigntaskresponse_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_lmscampaigntasks = false;
        this.bfilterPopulate_lmscampaigntaskresponses = false;
        this.lmscampaigntask_menuactions = [];
        this.lmscampaigntaskresponse_menuactions = [];
        this.campaignid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_11__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_9__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_9__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_lmscampaigntaskresponse_IDs = "";
        this.lmscampaigntaskresponses_ID = "1";
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
        this.lmscampaigntask_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            productid: [null],
            productiddesc: [null],
            campaignid: [null],
            campaigniddesc: [null],
            campaigncode: [null],
            campaigntype: [null],
            campaigntypedesc: [null],
            targettype: [null],
            targettypedesc: [null],
            taskid: [null],
            subject: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required])],
            description: [null],
            advantages: [null],
            disadvantages: [null],
            assignto: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_12__.Validators.required])],
            assigneddate: [null],
            targetdate: [null],
            priority: [null],
            prioritydesc: [null],
            dailytarget: [null],
            actualachieved: [null],
            estimatedcost: [null],
            actualcost: [null],
            successpercentage: [null],
            performancestatus: [null],
            performancestatusdesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmscampaigntask_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmscampaigntask_Form.dirty && this.lmscampaigntask_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_13__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_13__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_13__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.taskid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.taskid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.taskid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
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
            let lmscampaigntaskid = null;
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
            this.formid = lmscampaigntaskid;
            //alert(lmscampaigntaskid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_lmscampaigntaskresponses_TableConfig();
                setTimeout(() => {
                    //this.Set_lmscampaigntaskresponses_TableDropDownConfig();
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
            this.lmscampaigntask_service.getDefaultData().then(res => {
                this.productid_List = res.list_productid.value;
                this.campaignid_List = res.list_campaignid.value;
                this.campaigntype_List = res.list_campaigntype.value;
                this.targettype_List = res.list_targettype.value;
                this.priority_List = res.list_priority.value;
                this.performancestatus_List = res.list_performancestatus.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmscampaigntask_service.get_lmscampaigntasks_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmscampaigntask_Form.markAsUntouched();
            this.lmscampaigntask_Form.markAsPristine();
        });
    }
    onSelected_campaignid(campaignidDetail) {
        if (campaignidDetail.value && campaignidDetail) {
            this.lmscampaigntask_Form.patchValue({
                campaignid: campaignidDetail.value,
                campaigniddesc: campaignidDetail.label,
            });
            this.lmscampaigntask_Form.patchValue({ campaigncode: campaignidDetail.campaigncode });
            this.lmscampaigntask_Form.patchValue({ campaigntype: campaignidDetail.campaigntype });
            this.lmscampaigntask_Form.patchValue({ targettype: campaignidDetail.targettype });
        }
    }
    resetForm() {
        if (this.lmscampaigntask_Form != null)
            this.lmscampaigntask_Form.reset();
        this.lmscampaigntask_Form.patchValue({});
        setTimeout(() => {
            this.lmscampaigntaskresponses_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let taskid = this.lmscampaigntask_Form.get('taskid').value;
        if (taskid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmscampaigntask_service.delete_lmscampaigntask(taskid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmscampaigntask_Form.patchValue({
            taskid: null
        });
        if (this.formData.taskid != null)
            this.formData.taskid = null;
        for (let i = 0; i < this.tbl_lmscampaigntaskresponses.source.length; i++) {
            this.tbl_lmscampaigntaskresponses.source[i].responseid = null;
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
                    else if (key == "assignto")
                        this.lmscampaigntask_Form.patchValue({ "assignto": mainscreendata[key] });
                    else if (key == "assigneddate")
                        this.lmscampaigntask_Form.patchValue({ "assigneddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "targetdate")
                        this.lmscampaigntask_Form.patchValue({ "targetdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmscampaigntask_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmscampaigntask_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmscampaigntask_Form.controls[key] != undefined) {
                                this.lmscampaigntask_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("lmscampaigntasks", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    productid_onChange(evt) {
        let e = evt.value;
        this.lmscampaigntask_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
    }
    campaignid_onChange(evt) {
        let e = evt.value;
    }
    campaigntype_onChange(evt) {
        let e = this.f.campaigntype.value;
        this.lmscampaigntask_Form.patchValue({ campaigntypedesc: evt.options[evt.options.selectedIndex].text });
    }
    targettype_onChange(evt) {
        let e = this.f.targettype.value;
        this.lmscampaigntask_Form.patchValue({ targettypedesc: evt.options[evt.options.selectedIndex].text });
    }
    priority_onChange(evt) {
        let e = this.f.priority.value;
        this.lmscampaigntask_Form.patchValue({ prioritydesc: evt.options[evt.options.selectedIndex].text });
    }
    performancestatus_onChange(evt) {
        let e = this.f.performancestatus.value;
        this.lmscampaigntask_Form.patchValue({ performancestatusdesc: evt.options[evt.options.selectedIndex].text });
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
    edit_lmscampaigntasks() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmscampaigntask_service.get_lmscampaigntasks_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmscampaigntask;
                let formproperty = res.lmscampaigntask.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmscampaigntask.pkcol;
                this.formid = res.lmscampaigntask.taskid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmscampaigntask;
        this.formid = res.lmscampaigntask.taskid;
        this.pkcol = res.lmscampaigntask.pkcol;
        this.bmyrecord = false;
        if (res.lmscampaigntask.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmscampaigntask_Form.patchValue({
            productid: res.lmscampaigntask.productid,
            productiddesc: res.lmscampaigntask.productiddesc,
            campaignid: res.lmscampaigntask.campaignid,
            campaigniddesc: res.lmscampaigntask.campaigniddesc,
            campaigncode: res.lmscampaigntask.campaigncode,
            campaigntype: res.lmscampaigntask.campaigntype,
            campaigntypedesc: res.lmscampaigntask.campaigntypedesc,
            targettype: res.lmscampaigntask.targettype,
            targettypedesc: res.lmscampaigntask.targettypedesc,
            taskid: res.lmscampaigntask.taskid,
            subject: res.lmscampaigntask.subject,
            description: res.lmscampaigntask.description,
            advantages: res.lmscampaigntask.advantages,
            disadvantages: res.lmscampaigntask.disadvantages,
            assignto: JSON.parse(res.lmscampaigntask.assignto),
            assigneddate: this.ngbDateParserFormatter.parse(res.lmscampaigntask.assigneddate),
            targetdate: this.ngbDateParserFormatter.parse(res.lmscampaigntask.targetdate),
            priority: res.lmscampaigntask.priority,
            prioritydesc: res.lmscampaigntask.prioritydesc,
            dailytarget: res.lmscampaigntask.dailytarget,
            actualachieved: res.lmscampaigntask.actualachieved,
            estimatedcost: res.lmscampaigntask.estimatedcost,
            actualcost: res.lmscampaigntask.actualcost,
            successpercentage: res.lmscampaigntask.successpercentage,
            performancestatus: res.lmscampaigntask.performancestatus,
            performancestatusdesc: res.lmscampaigntask.performancestatusdesc,
            customfield: res.lmscampaigntask.customfield,
            attachment: JSON.parse(res.lmscampaigntask.attachment),
            status: res.lmscampaigntask.status,
            statusdesc: res.lmscampaigntask.statusdesc,
        });
        this.lmscampaigntask_menuactions = res.lmscampaigntask_menuactions;
        this.lmscampaigntaskresponse_menuactions = res.lmscampaigntaskresponse_menuactions;
        this.lmscampaigntaskresponses_visiblelist = res.lmscampaigntaskresponses_visiblelist;
        if (this.lmscampaigntask_Form.get('customfield').value != null && this.lmscampaigntask_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.lmscampaigntask_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmscampaigntask_Form.get('attachment').value != null && this.lmscampaigntask_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.lmscampaigntask_Form.get('attachment').value);
        //Child Tables if any
        this.Set_lmscampaigntaskresponses_TableConfig();
        this.lmscampaigntaskresponses_LoadTable(res.lmscampaigntaskresponses);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmscampaigntask_Form.controls) {
            let val = this.lmscampaigntask_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmscampaigntask_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.lmscampaigntask_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.lmscampaigntask_Form.getRawValue();
            if (this.lmscampaigntask_Form.get('assignto').value != null)
                obj.assignto = JSON.stringify(this.lmscampaigntask_Form.get('assignto').value);
            obj.assigneddate = new Date(this.lmscampaigntask_Form.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntask_Form.get('assigneddate').value) + '  UTC' : null);
            obj.targetdate = new Date(this.lmscampaigntask_Form.get('targetdate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntask_Form.get('targetdate').value) + '  UTC' : null);
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
        var _a, _b;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.lmscampaigntask_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.lmscampaigntask_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmscampaigntask_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmscampaigntask_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmscampaigntask_Form.controls[key] != null) {
                            this.formData[key] = this.lmscampaigntask_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            if (this.lmscampaigntask_Form.get('assignto').value != null)
                this.formData.assignto = JSON.stringify(this.lmscampaigntask_Form.get('assignto').value);
            this.formData.assigneddate = new Date(this.lmscampaigntask_Form.get('assigneddate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntask_Form.get('assigneddate').value) + '  UTC' : null);
            this.formData.targetdate = new Date(this.lmscampaigntask_Form.get('targetdate').value ? this.ngbDateParserFormatter.format(this.lmscampaigntask_Form.get('targetdate').value) + '  UTC' : null);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_lmscampaigntaskresponse_IDs = this.Deleted_lmscampaigntaskresponse_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.lmscampaigntask_service.saveOrUpdate_lmscampaigntasks(this.formData, (_b = (_a = this.tbl_lmscampaigntaskresponses) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_lmscampaigntaskresponses.source) {
                    for (let i = 0; i < this.tbl_lmscampaigntaskresponses.source.data.length; i++) {
                        if (this.tbl_lmscampaigntaskresponses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmscampaigntaskresponses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmscampaigntask);
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
                        this.objvalues.push(res.lmscampaigntask);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmscampaigntask_Form.markAsUntouched();
                this.lmscampaigntask_Form.markAsPristine();
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
        this.tbl_lmscampaigntaskresponses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource();
    }
    AddOrEdit_lmscampaigntaskresponse(event, responseid, taskid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmscampaigntaskresponse_lmscampaigntaskresponse_component__WEBPACK_IMPORTED_MODULE_4__.lmscampaigntaskresponseComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, responseid, taskid, visiblelist: this.lmscampaigntaskresponses_visiblelist, hidelist: this.lmscampaigntaskresponses_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmscampaigntaskresponses.source.add(res[i]);
                    }
                    this.tbl_lmscampaigntaskresponses.source.refresh();
                }
                else {
                    this.tbl_lmscampaigntaskresponses.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmscampaigntaskresponse(event, childID, i) {
        if (childID != null)
            this.Deleted_lmscampaigntaskresponse_IDs += childID + ",";
        this.tbl_lmscampaigntaskresponses.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_lmscampaigntaskresponses_Checkbox() {
        debugger;
        if (this.tbl_lmscampaigntaskresponses.source.settings['selectMode'] == 'multi')
            this.tbl_lmscampaigntaskresponses.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmscampaigntaskresponses.source.settings['selectMode'] = 'multi';
        this.tbl_lmscampaigntaskresponses.source.initGrid();
    }
    delete_lmscampaigntaskresponses_All() {
        this.tbl_lmscampaigntaskresponses.source.settings['selectMode'] = 'single';
    }
    show_lmscampaigntaskresponses_Filter() {
        setTimeout(() => {
            //  this.Set_lmscampaigntaskresponses_TableDropDownConfig();
        });
        if (this.tbl_lmscampaigntaskresponses.source.settings != null)
            this.tbl_lmscampaigntaskresponses.source.settings['hideSubHeader'] = !this.tbl_lmscampaigntaskresponses.source.settings['hideSubHeader'];
        this.tbl_lmscampaigntaskresponses.source.initGrid();
    }
    show_lmscampaigntaskresponses_InActive() {
    }
    enable_lmscampaigntaskresponses_InActive() {
    }
    Set_lmscampaigntaskresponses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmscampaigntaskresponses) {
                var clone = this.sharedService.clone(this.tbl_lmscampaigntaskresponses.source.settings);
                if (clone.columns['campaigntype'] != undefined)
                    clone.columns['campaigntype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntaskresponses_campaigntype.value)), }, };
                if (clone.columns['campaigntype'] != undefined)
                    clone.columns['campaigntype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscampaigntaskresponses_campaigntype.value)), }, };
                this.tbl_lmscampaigntaskresponses.source.settings = clone;
                this.tbl_lmscampaigntaskresponses.source.initGrid();
            }
            this.bfilterPopulate_lmscampaigntaskresponses = true;
        });
    }
    lmscampaigntaskresponses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmscampaigntaskresponses_TableConfig() {
        this.lmscampaigntaskresponses_settings = {
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
                custom: this.lmscampaigntaskresponse_menuactions
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
                productid: {
                    title: 'Product',
                    type: 'number',
                    filter: true,
                },
                campaignid: {
                    title: 'Campaign',
                    type: 'number',
                    filter: true,
                },
                campaigncode: {
                    title: 'Campaign Code',
                    type: '',
                    filter: true,
                },
                campaigntypedesc: {
                    title: 'Campaign Type',
                    type: 'html',
                    filter: true,
                },
                responsedetail: {
                    title: 'Response Detail',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
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
            },
        };
    }
    lmscampaigntaskresponses_LoadTable(lmscampaigntaskresponses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaigntaskresponses_ID) >= 0) {
            if (this.tbl_lmscampaigntaskresponses != undefined)
                this.tbl_lmscampaigntaskresponses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource();
            if (this.tbl_lmscampaigntaskresponses != undefined)
                this.tbl_lmscampaigntaskresponses.source.load(lmscampaigntaskresponses);
            if (this.tbl_lmscampaigntaskresponses != undefined)
                this.tbl_lmscampaigntaskresponses.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmscampaigntaskresponses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmscampaigntask_service.lmscampaigntaskresponses.length == 0)
    {
        this.tbl_lmscampaigntaskresponses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmscampaigntaskresponse();
        this.lmscampaigntask_service.lmscampaigntaskresponses.push(obj);
        this.tbl_lmscampaigntaskresponses.source.refresh();
        if ((this.lmscampaigntask_service.lmscampaigntaskresponses.length / this.tbl_lmscampaigntaskresponses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscampaigntaskresponses.source.getPaging().page)
        {
            this.tbl_lmscampaigntaskresponses.source.setPage((this.lmscampaigntask_service.lmscampaigntaskresponses.length / this.tbl_lmscampaigntaskresponses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmscampaigntaskresponses.source.grid.edit(this.tbl_lmscampaigntaskresponses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmscampaigntaskresponses.source.data.indexOf(event.data);
    this.onDelete_lmscampaigntaskresponse(event,event.data.responseid,((this.tbl_lmscampaigntaskresponses.source.getPaging().page-1) *this.tbl_lmscampaigntaskresponses.source.getPaging().perPage)+index);
    this.tbl_lmscampaigntaskresponses.source.refresh();
    break;
    }
    }
    
    */
    lmscampaigntaskresponses_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmscampaigntaskresponse(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmscampaigntaskresponse(event, event.data.responseid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmscampaigntaskresponse(event, event.data.responseid, ((this.tbl_lmscampaigntaskresponses.source.getPaging().page - 1) * this.tbl_lmscampaigntaskresponses.source.getPaging().perPage) + event.index);
                this.tbl_lmscampaigntaskresponses.source.refresh();
                break;
        }
    }
    lmscampaigntaskresponses_onDelete(obj) {
        let responseid = obj.data.responseid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmscampaigntask_service.delete_lmscampaigntask(responseid).then(res => this.lmscampaigntaskresponses_LoadTable());
        }
    }
    onCustom_lmscampaigntaskresponses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmscampaigntaskresponses");
            let formname = objbomenuaction.actionname;
        });
    }
    lmscampaigntaskresponses_Paging(val) {
        debugger;
        this.tbl_lmscampaigntaskresponses.source.setPaging(1, val, true);
    }
    handle_lmscampaigntaskresponses_GridSelected(event) {
        this.lmscampaigntaskresponses_selectedindex = this.tbl_lmscampaigntaskresponses.source.findIndex(i => i.responseid === event.data.responseid);
    }
    Is_lmscampaigntaskresponses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscampaigntaskresponses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
lmscampaigntaskComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_16__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_19__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_8__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_20__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DialogService },
    { type: _service_lmscampaigntask_service__WEBPACK_IMPORTED_MODULE_1__.lmscampaigntaskService },
    { type: _service_lmscampaigntaskresponse_service__WEBPACK_IMPORTED_MODULE_5__.lmscampaigntaskresponseService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_12__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_6__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_7__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_10__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_22__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_19__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_23__.NgxSpinnerService }
];
lmscampaigntaskComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ViewChild, args: ['customform', { static: false },] }],
    tbl_lmscampaigntaskresponses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ViewChild, args: ['tbl_lmscampaigntaskresponses', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_11__.ViewChild, args: ['fileattachment', { static: false },] }]
};
lmscampaigntaskComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_11__.Component)({
        selector: 'app-lmscampaigntask',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmscampaigntask_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__.KeyboardShortcutsService]
    })
], lmscampaigntaskComponent);



/***/ }),

/***/ 30163:
/*!****************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmscampaigntask.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmscampaigntaskService": () => (/* binding */ lmscampaigntaskService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmscampaigntaskService = class lmscampaigntaskService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmscampaigntasks(formData, lmscampaigntaskresponses) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { lmscampaigntaskresponses: lmscampaigntaskresponses.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaigntask', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaigntask' + '/getdefaultdata').toPromise();
        }
    }
    get_lmscampaigntasks_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaigntask').toPromise();
        }
    }
    getListBy_taskid(taskid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaigntask' + '/taskid/' + taskid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaigntask' + '/param/' + key).toPromise();
        }
    }
    get_lmscampaigntasks_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaigntask' + '/e/' + id).toPromise();
        }
    }
    get_lmscampaigntasks_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaigntask' + '/' + id).toPromise();
        }
    }
    delete_lmscampaigntask(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmscampaigntask' + '/' + id).toPromise();
        }
    }
    getList_productid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_productid').toPromise();
    }
    getList_campaignid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_campaignid').toPromise();
    }
    getList_campaigntype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_campaigntype/').toPromise();
    }
    getList_targettype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_targettype/').toPromise();
    }
    getList_priority() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_priority/').toPromise();
    }
    getList_performancestatus() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmscampaigntask' + '/getList_performancestatus/').toPromise();
    }
};
lmscampaigntaskService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmscampaigntaskService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmscampaigntaskService);



/***/ }),

/***/ 37046:
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmscampaigntask/lmscampaigntask.component.html ***!
  \*******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmscampaigntask_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Campaign Tasks' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmscampaigntasks()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmscampaigntask_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.taskid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.taskid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n\r\n\r\n            <!--productid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('productid') == -1) && (productidvisible==undefined || productidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"productid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_productid(null)\">Product</label>\r\n                <select *ngIf=\"!showview\" id=\"productid\" (change)=\"productid_onChange($event.target)\"\r\n                  formControlName=\"productid\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of productid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.productiddesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--campaignid-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('campaignid') == -1) && (campaignidvisible==undefined || campaignidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"campaignid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_campaignid(null)\">Campaign</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"campaignid_List\" [optionsEvent]=\"campaignid_optionsEvent\"\r\n                  [form]=\"lmscampaignmaster\" (selectItem)=\"onSelected_campaignid($event)\" [reportid]='qisei'\r\n                  [menuid]='qisei' formControlName=\"campaignid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.campaigniddesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('campaigncode') == -1) && (campaigncodevisible==undefined || campaigncodevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"campaigncode\" class=\"control-label\">Campaign Code</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.campaigncode?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"campaigncode\" formControlName=\"campaigncode\" class=\"form-control\">\r\n              </div>\r\n\r\n\r\n              <!--campaigntype-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('campaigntype') == -1) && (campaigntypevisible==undefined || campaigntypevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"campaigntype\" class=\"control-label\">Campaign Type</label>\r\n                <select *ngIf=\"!showview\" id=\"campaigntype\" (change)=\"campaigntype_onChange($event.target)\"\r\n                  formControlName=\"campaigntype\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of campaigntype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.campaigntypedesc?.value}}</label>\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <!--targettype-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('targettype') == -1) && (targettypevisible==undefined || targettypevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"targettype\" class=\"control-label\">Target Type</label>\r\n                <select *ngIf=\"!showview\" id=\"targettype\" (change)=\"targettype_onChange($event.target)\"\r\n                  formControlName=\"targettype\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of targettype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.targettypedesc?.value}}</label>\r\n              </div>\r\n              <div *ngIf=\"((hidelist.indexOf('subject') == -1) && (subjectvisible==undefined || subjectvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"subject\" class=\"control-label required\">Subject</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.subject?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"subject\" required formControlName=\"subject\" class=\"form-control\">\r\n                <app-field-error-display [displayError]=\"f.subject.errors?.required\"\r\n                  errorMsg=\"Enter {{'Subject' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('description') == -1) && (descriptionvisible==undefined || descriptionvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"description\" class=\"control-label\">Description</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.description?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"description\"\r\n                  formControlName=\"description\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('advantages') == -1) && (advantagesvisible==undefined || advantagesvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"advantages\" class=\"control-label\">Advantages</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.advantages?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"advantages\"\r\n                  formControlName=\"advantages\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('disadvantages') == -1) && (disadvantagesvisible==undefined || disadvantagesvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"disadvantages\" class=\"control-label\">Disadvantages</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.disadvantages?.value}}</label>\r\n                <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"disadvantages\"\r\n                  formControlName=\"disadvantages\" class=\"form-control\">\r\n</textarea>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('assignto') == -1) && (assigntovisible==undefined || assigntovisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"assignto\" class=\"control-label required\">Assign To</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.assignto?.value}}</label>\r\n                <app-useraccess *ngIf=\"!showview\" id=\"assignto\" required formControlName=\"assignto\"\r\n                  (change)=\"assignto_onChange($event.target)\">\r\n                </app-useraccess>\r\n                <app-field-error-display [displayError]=\"f.assignto.errors?.required\"\r\n                  errorMsg=\"Enter {{'Assign To' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('assigneddate') == -1) && (assigneddatevisible==undefined || assigneddatevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"assigneddate\" class=\"control-label\">Assigned Date</label>\r\n                <label *ngIf=\"showview\"\r\n                  class=\"labelview\">{{ngbDateParserFormatter.format(f.assigneddate?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #assigneddateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"assigneddateformpicker\"\r\n                    id=\"assigneddate\" formControlName=\"assigneddate\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"assigneddateformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('targetdate') == -1) && (targetdatevisible==undefined || targetdatevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"targetdate\" class=\"control-label\">Target Date</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.targetdate?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #targetdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"targetdateformpicker\"\r\n                    id=\"targetdate\" formControlName=\"targetdate\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"targetdateformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--priority-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('priority') == -1) && (priorityvisible==undefined || priorityvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"priority\" class=\"control-label\">Priority</label>\r\n                <select *ngIf=\"!showview\" id=\"priority\" (change)=\"priority_onChange($event.target)\"\r\n                  formControlName=\"priority\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of priority_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.prioritydesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('dailytarget') == -1) && (dailytargetvisible==undefined || dailytargetvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"dailytarget\" class=\"control-label\">Daily Target</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.dailytarget?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"dailytarget\" formControlName=\"dailytarget\" class=\"form-control\">\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('actualachieved') == -1) && (actualachievedvisible==undefined || actualachievedvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"actualachieved\" class=\"control-label\">Actual Achieved</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.actualachieved?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"actualachieved\" formControlName=\"actualachieved\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('estimatedcost') == -1) && (estimatedcostvisible==undefined || estimatedcostvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"estimatedcost\" class=\"control-label\">Estimated Cost</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.estimatedcost?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"estimatedcost\" formControlName=\"estimatedcost\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('actualcost') == -1) && (actualcostvisible==undefined || actualcostvisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"actualcost\" class=\"control-label\">Actual Cost</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.actualcost?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"actualcost\" formControlName=\"actualcost\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('successpercentage') == -1) && (successpercentagevisible==undefined || successpercentagevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"successpercentage\" class=\"control-label\">Success Percentage</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.successpercentage?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"successpercentage\" formControlName=\"successpercentage\"\r\n                  class=\"form-control\">\r\n              </div>\r\n            </div>\r\n\r\n\r\n            <!--performancestatus-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('performancestatus') == -1) && (performancestatusvisible==undefined || performancestatusvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"performancestatus\" class=\"control-label\">Performance Status</label>\r\n                <select *ngIf=\"!showview\" id=\"performancestatus\" (change)=\"performancestatus_onChange($event.target)\"\r\n                  formControlName=\"performancestatus\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of performancestatus_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.performancestatusdesc?.value}}</label>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Task Responses</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table lmscampaigntaskresponses-->\r\n            <div [ngClass]=\"Is_lmscampaigntaskresponses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Task Responses' | translate}}\r\n                <select class='child' id=\"lmscampaigntaskresponsesPagingdropdown\"\r\n                  (change)=\"lmscampaigntaskresponses_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"lmscampaigntaskresponsetoggleOption();lmscampaigntaskresponses_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmscampaigntaskresponsesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"lmscampaigntaskresponses_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_lmscampaigntaskresponses\r\n                (userRowSelect)=\"handle_lmscampaigntaskresponses_GridSelected($event)\"\r\n                [settings]=\"lmscampaigntaskresponses_settings\"\r\n                (custom)=\"onCustom_lmscampaigntaskresponses_Action($event)\"\r\n                [source]=\"tbl_lmscampaigntaskresponses?.source?.data\"\r\n                (delete)=\"lmscampaigntaskresponses_route($event,'delete')\"\r\n                (deleteConfirm)=\"lmscampaigntaskresponses_route($event,'delete')\"\r\n                (create)=\"lmscampaigntaskresponses_route($event,'create')\"\r\n                (createConfirm)=\"lmscampaigntaskresponses_beforesave($event)\"\r\n                (edit)=\"lmscampaigntaskresponses_route($event,'edit')\"\r\n                (editConfirm)=\"lmscampaigntaskresponses_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table lmscampaigntaskresponses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_lmscampaigntask_lmscampaigntask_component_ts.js.map