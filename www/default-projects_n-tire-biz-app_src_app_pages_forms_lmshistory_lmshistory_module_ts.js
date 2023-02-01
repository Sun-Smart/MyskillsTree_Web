"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_lmshistory_lmshistory_module_ts"],{

/***/ 72530:
/*!****************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmshistory/lmshistory.component.ts ***!
  \****************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmshistoryComponent": () => (/* binding */ lmshistoryComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmshistory_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmshistory.component.html */ 87843);
/* harmony import */ var _service_lmshistory_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmshistory.service */ 6469);
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


let lmshistoryComponent = class lmshistoryComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmshistory_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_lmshistories = false;
        this.lmshistory_menuactions = [];
        this.branchid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.branchlocationid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.opportunityid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.callid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
        this.leadby_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_9__.EventEmitter(); //autocomplete
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
        this.lmshistory_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            historyid: [null],
            branchid: [null],
            branchiddesc: [null],
            branchlocationid: [null],
            branchlocationiddesc: [null],
            leadid: [null],
            leadiddesc: [null],
            opportunityid: [null],
            opportunityiddesc: [null],
            callid: [null],
            calliddesc: [null],
            productid: [null],
            productiddesc: [null],
            campaignid: [null],
            campaigniddesc: [null],
            leadby: [null],
            leadbydesc: [null],
            currentowner: [null],
            leadresponse: [null],
            leadresponsedesc: [null],
            nextcalldate: [null],
            nextaction: [null],
            nextactiondesc: [null],
            actiondatetime: [null],
            previousremarks: [null],
            leadscore: [null],
            leadsource: [null],
            leadsourcedesc: [null],
            leadstage: [null],
            leadstagedesc: [null],
            criticality: [null],
            criticalitydesc: [null],
            expectedvalue: [null],
            attachment: [null],
            customfield: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmshistory_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmshistory_Form.dirty && this.lmshistory_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.historyid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.historyid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.historyid && pkDetail) {
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
            let lmshistoryid = null;
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
            this.formid = lmshistoryid;
            //alert(lmshistoryid);
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
            this.lmshistory_service.getDefaultData().then(res => {
                this.branchid_List = res.list_branchid.value;
                this.leadid_List = res.list_leadid.value;
                this.opportunityid_List = res.list_opportunityid.value;
                this.callid_List = res.list_callid.value;
                this.productid_List = res.list_productid.value;
                this.campaignid_List = res.list_campaignid.value;
                this.leadby_List = res.list_leadby.value;
                this.leadresponse_List = res.list_leadresponse.value;
                this.nextaction_List = res.list_nextaction.value;
                this.leadsource_List = res.list_leadsource.value;
                this.leadstage_List = res.list_leadstage.value;
                this.criticality_List = res.list_criticality.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmshistory_service.get_lmshistories_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmshistory_Form.markAsUntouched();
            this.lmshistory_Form.markAsPristine();
        });
    }
    onSelected_branchid(branchidDetail) {
        if (branchidDetail.value && branchidDetail) {
            this.lmshistory_Form.patchValue({
                branchid: branchidDetail.value,
                branchiddesc: branchidDetail.label,
            });
            this.lmshistory_service.getList_branchlocationid(branchidDetail.value).then(res => {
                this.branchlocationid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_branchlocationid(branchlocationidDetail) {
        if (branchlocationidDetail.value && branchlocationidDetail) {
            this.lmshistory_Form.patchValue({
                branchlocationid: branchlocationidDetail.value,
                branchlocationiddesc: branchlocationidDetail.label,
            });
        }
    }
    onSelected_opportunityid(opportunityidDetail) {
        if (opportunityidDetail.value && opportunityidDetail) {
            this.lmshistory_Form.patchValue({
                opportunityid: opportunityidDetail.value,
                opportunityiddesc: opportunityidDetail.label,
            });
        }
    }
    onSelected_callid(callidDetail) {
        if (callidDetail.value && callidDetail) {
            this.lmshistory_Form.patchValue({
                callid: callidDetail.value,
                calliddesc: callidDetail.label,
            });
        }
    }
    onSelected_leadby(leadbyDetail) {
        if (leadbyDetail.value && leadbyDetail) {
            this.lmshistory_Form.patchValue({
                leadby: leadbyDetail.value,
                leadbydesc: leadbyDetail.label,
            });
        }
    }
    resetForm() {
        if (this.lmshistory_Form != null)
            this.lmshistory_Form.reset();
        this.lmshistory_Form.patchValue({
            branchid: this.sessionData.branchid,
            branchiddesc: this.sessionData.branchiddesc,
            leadby: this.sessionData.userid,
            leadbydesc: this.sessionData.username,
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let historyid = this.lmshistory_Form.get('historyid').value;
        if (historyid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmshistory_service.delete_lmshistory(historyid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmshistory_Form.patchValue({
            historyid: null
        });
        if (this.formData.historyid != null)
            this.formData.historyid = null;
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
                    else if (key == "currentowner")
                        this.lmshistory_Form.patchValue({ "currentowner": mainscreendata[key] });
                    else if (key == "nextcalldate")
                        this.lmshistory_Form.patchValue({ "nextcalldate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "actiondatetime")
                        this.lmshistory_Form.patchValue({ "actiondatetime": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.lmshistory_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmshistory_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmshistory_Form.controls[key] != undefined) {
                                this.lmshistory_Form.controls[key].disable({ onlySelf: true });
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
            return this.customfieldservice.getcustomfieldconfigurationsByTable("lmshistories", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
        this.lmshistory_Form.patchValue({ leadiddesc: evt.options[evt.options.selectedIndex].text });
    }
    opportunityid_onChange(evt) {
        let e = evt.value;
    }
    callid_onChange(evt) {
        let e = evt.value;
    }
    productid_onChange(evt) {
        let e = evt.value;
        this.lmshistory_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
    }
    campaignid_onChange(evt) {
        let e = evt.value;
        this.lmshistory_Form.patchValue({ campaigniddesc: evt.options[evt.options.selectedIndex].text });
    }
    leadby_onChange(evt) {
        let e = evt.value;
    }
    leadresponse_onChange(evt) {
        let e = this.f.leadresponse.value;
        this.lmshistory_Form.patchValue({ leadresponsedesc: evt.options[evt.options.selectedIndex].text });
    }
    nextaction_onChange(evt) {
        let e = this.f.nextaction.value;
        this.lmshistory_Form.patchValue({ nextactiondesc: evt.options[evt.options.selectedIndex].text });
    }
    leadsource_onChange(evt) {
        let e = this.f.leadsource.value;
        this.lmshistory_Form.patchValue({ leadsourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    leadstage_onChange(evt) {
        let e = this.f.leadstage.value;
        this.lmshistory_Form.patchValue({ leadstagedesc: evt.options[evt.options.selectedIndex].text });
    }
    criticality_onChange(evt) {
        let e = this.f.criticality.value;
        this.lmshistory_Form.patchValue({ criticalitydesc: evt.options[evt.options.selectedIndex].text });
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
    edit_lmshistories() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmshistory_service.get_lmshistories_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmshistory;
                let formproperty = res.lmshistory.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmshistory.pkcol;
                this.formid = res.lmshistory.historyid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmshistory;
        this.formid = res.lmshistory.historyid;
        this.pkcol = res.lmshistory.pkcol;
        this.bmyrecord = false;
        if (res.lmshistory.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmshistory_Form.patchValue({
            historyid: res.lmshistory.historyid,
            branchid: res.lmshistory.branchid,
            branchiddesc: res.lmshistory.branchiddesc,
            branchlocationid: res.lmshistory.branchlocationid,
            branchlocationiddesc: res.lmshistory.branchlocationiddesc,
            leadid: res.lmshistory.leadid,
            leadiddesc: res.lmshistory.leadiddesc,
            opportunityid: res.lmshistory.opportunityid,
            opportunityiddesc: res.lmshistory.opportunityiddesc,
            callid: res.lmshistory.callid,
            calliddesc: res.lmshistory.calliddesc,
            productid: res.lmshistory.productid,
            productiddesc: res.lmshistory.productiddesc,
            campaignid: res.lmshistory.campaignid,
            campaigniddesc: res.lmshistory.campaigniddesc,
            leadby: res.lmshistory.leadby,
            leadbydesc: res.lmshistory.leadbydesc,
            currentowner: JSON.parse(res.lmshistory.currentowner),
            leadresponse: res.lmshistory.leadresponse,
            leadresponsedesc: res.lmshistory.leadresponsedesc,
            nextcalldate: this.ngbDateParserFormatter.parse(res.lmshistory.nextcalldate),
            nextaction: res.lmshistory.nextaction,
            nextactiondesc: res.lmshistory.nextactiondesc,
            actiondatetime: this.ngbDateParserFormatter.parse(res.lmshistory.actiondatetime),
            previousremarks: res.lmshistory.previousremarks,
            leadscore: res.lmshistory.leadscore,
            leadsource: res.lmshistory.leadsource,
            leadsourcedesc: res.lmshistory.leadsourcedesc,
            leadstage: res.lmshistory.leadstage,
            leadstagedesc: res.lmshistory.leadstagedesc,
            criticality: res.lmshistory.criticality,
            criticalitydesc: res.lmshistory.criticalitydesc,
            expectedvalue: res.lmshistory.expectedvalue,
            attachment: JSON.parse(res.lmshistory.attachment),
            customfield: res.lmshistory.customfield,
            status: res.lmshistory.status,
            statusdesc: res.lmshistory.statusdesc,
        });
        this.lmshistory_menuactions = res.lmshistory_menuactions;
        if (this.lmshistory_Form.get('customfield').value != null && this.lmshistory_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.lmshistory_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmshistory_Form.get('attachment').value != null && this.lmshistory_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.lmshistory_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.branchid.value && this.f.branchid.value != "" && this.f.branchid.value != null)
                this.lmshistory_service.getList_branchlocationid(this.f.branchid.value).then(res => {
                    this.branchlocationid_List = res;
                }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmshistory_Form.controls) {
            let val = this.lmshistory_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmshistory_Form.controls[key] != null) {
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
            if (!this.lmshistory_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.lmshistory_Form.getRawValue();
            if (this.lmshistory_Form.get('currentowner').value != null)
                obj.currentowner = JSON.stringify(this.lmshistory_Form.get('currentowner').value);
            obj.nextcalldate = new Date(this.lmshistory_Form.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmshistory_Form.get('nextcalldate').value) + '  UTC' : null);
            obj.actiondatetime = new Date(this.lmshistory_Form.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmshistory_Form.get('actiondatetime').value) + '  UTC' : null);
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
            // Object.keys(this.lmshistory_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.lmshistory_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmshistory_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmshistory_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmshistory_Form.controls[key] != null) {
                            this.formData[key] = this.lmshistory_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            if (this.lmshistory_Form.get('currentowner').value != null)
                this.formData.currentowner = JSON.stringify(this.lmshistory_Form.get('currentowner').value);
            this.formData.nextcalldate = new Date(this.lmshistory_Form.get('nextcalldate').value ? this.ngbDateParserFormatter.format(this.lmshistory_Form.get('nextcalldate').value) + '  UTC' : null);
            this.formData.actiondatetime = new Date(this.lmshistory_Form.get('actiondatetime').value ? this.ngbDateParserFormatter.format(this.lmshistory_Form.get('actiondatetime').value) + '  UTC' : null);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.lmshistory_service.saveOrUpdate_lmshistories(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmshistory);
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
                        this.objvalues.push(res.lmshistory);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmshistory_Form.markAsUntouched();
                this.lmshistory_Form.markAsPristine();
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
lmshistoryComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_12__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_13__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_16__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_17__.DialogService },
    { type: _service_lmshistory_service__WEBPACK_IMPORTED_MODULE_1__.lmshistoryService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_18__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_8__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_19__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_15__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_20__.NgxSpinnerService }
];
lmshistoryComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['customform', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_9__.ViewChild, args: ['fileattachment', { static: false },] }]
};
lmshistoryComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_11__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_9__.Component)({
        selector: 'app-lmshistory',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmshistory_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_14__.KeyboardShortcutsService]
    })
], lmshistoryComponent);



/***/ }),

/***/ 7013:
/*!*************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmshistory/lmshistory.module.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmshistoryModule": () => (/* binding */ lmshistoryModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _lmshistory_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lmshistory.routing */ 14376);
/* harmony import */ var _lmshistory_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmshistory.component */ 72530);






let lmshistoryModule = class lmshistoryModule {
};
lmshistoryModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _lmshistory_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_lmshistory_component__WEBPACK_IMPORTED_MODULE_3__.lmshistoryComponent]
    })
], lmshistoryModule);



/***/ }),

/***/ 14376:
/*!**************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmshistory/lmshistory.routing.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _lmshistory_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lmshistory.component */ 72530);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'lmshistorys', children: [
            { path: '', component: _lmshistory_component__WEBPACK_IMPORTED_MODULE_0__.lmshistoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _lmshistory_component__WEBPACK_IMPORTED_MODULE_0__.lmshistoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _lmshistory_component__WEBPACK_IMPORTED_MODULE_0__.lmshistoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _lmshistory_component__WEBPACK_IMPORTED_MODULE_0__.lmshistoryComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 6469:
/*!***********************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmshistory.service.ts ***!
  \***********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmshistoryService": () => (/* binding */ lmshistoryService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmshistoryService = class lmshistoryService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmshistories(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmshistory', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmshistory' + '/getdefaultdata').toPromise();
        }
    }
    get_lmshistories_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmshistory').toPromise();
        }
    }
    getListBy_historyid(historyid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmshistory' + '/historyid/' + historyid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmshistory' + '/param/' + key).toPromise();
        }
    }
    get_lmshistories_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmshistory' + '/e/' + id).toPromise();
        }
    }
    get_lmshistories_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmshistory' + '/' + id).toPromise();
        }
    }
    delete_lmshistory(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmshistory' + '/' + id).toPromise();
        }
    }
    getList_branchid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_branchid').toPromise();
    }
    getList_branchlocationid(branchid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_branchlocationid/branchid').toPromise();
    }
    getList_leadid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_leadid').toPromise();
    }
    getList_opportunityid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_opportunityid').toPromise();
    }
    getList_callid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_callid').toPromise();
    }
    getList_productid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_productid').toPromise();
    }
    getList_campaignid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_campaignid').toPromise();
    }
    getList_leadby() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_leadby').toPromise();
    }
    getList_leadresponse() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_leadresponse/').toPromise();
    }
    getList_nextaction() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_nextaction/').toPromise();
    }
    getList_leadsource() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_leadsource/').toPromise();
    }
    getList_leadstage() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_leadstage/').toPromise();
    }
    getList_criticality() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmshistory' + '/getList_criticality/').toPromise();
    }
};
lmshistoryService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmshistoryService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmshistoryService);



/***/ }),

/***/ 87843:
/*!*********************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmshistory/lmshistory.component.html ***!
  \*********************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmshistory_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Histories' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmshistories()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmshistory_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.historyid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.historyid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n\r\n\r\n    <!--branchid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"branchid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_branchid(null)\">Branch</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"branchid_List\" [optionsEvent]=\"branchid_optionsEvent\"\r\n          [form]=\"bobranchmaster\" (selectItem)=\"onSelected_branchid($event)\" [reportid]='bxg94' [menuid]='bxg94'\r\n          formControlName=\"branchid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.branchiddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--branchlocationid-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('branchlocationid') == -1) && (branchlocationidvisible==undefined || branchlocationidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"branchlocationid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_branchlocationid(null)\">Branch Location</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"branchlocationid_List\"\r\n          [optionsEvent]=\"branchlocationid_optionsEvent\" [form]=\"bobranchlocation\"\r\n          (selectItem)=\"onSelected_branchlocationid($event)\" [reportid]='fcx84' [menuid]='fcx84'\r\n          formControlName=\"branchlocationid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.branchlocationiddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--leadid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('leadid') == -1) && (leadidvisible==undefined || leadidvisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"leadid\" class=\"control-label\" (click)=\"AddOrEdit_leadid(null)\">Lead</label>\r\n        <select *ngIf=\"!showview\" id=\"leadid\" (change)=\"leadid_onChange($event.target)\" formControlName=\"leadid\"\r\n          class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of leadid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.leadiddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--opportunityid-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('opportunityid') == -1) && (opportunityidvisible==undefined || opportunityidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"opportunityid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_opportunityid(null)\">Opportunity</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"opportunityid_List\" [optionsEvent]=\"opportunityid_optionsEvent\"\r\n          [form]=\"lmsopportunity\" (selectItem)=\"onSelected_opportunityid($event)\" [reportid]='vm3i3' [menuid]='vm3i3'\r\n          formControlName=\"opportunityid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.opportunityiddesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--callid-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('callid') == -1) && (callidvisible==undefined || callidvisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"callid\" class=\"control-label\" (click)=\"AddOrEdit_callid(null)\">Call</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"callid_List\" [optionsEvent]=\"callid_optionsEvent\" [form]=\"lmscall\"\r\n          (selectItem)=\"onSelected_callid($event)\" [reportid]='ie7uk' [menuid]='ie7uk' formControlName=\"callid\"\r\n          id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.calliddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--productid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('productid') == -1) && (productidvisible==undefined || productidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"productid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_productid(null)\">Product</label>\r\n        <select *ngIf=\"!showview\" id=\"productid\" (change)=\"productid_onChange($event.target)\"\r\n          formControlName=\"productid\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of productid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.productiddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--campaignid-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('campaignid') == -1) && (campaignidvisible==undefined || campaignidvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"campaignid\" class=\"control-label\"\r\n          (click)=\"AddOrEdit_campaignid(null)\">Campaign</label>\r\n        <select *ngIf=\"!showview\" id=\"campaignid\" (change)=\"campaignid_onChange($event.target)\"\r\n          formControlName=\"campaignid\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of campaignid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.campaigniddesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--leadby-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('leadby') == -1) && (leadbyvisible==undefined || leadbyvisible==true))\" style=''\r\n        class=\"col-3\"><label for=\"leadby\" class=\"control-label\" (click)=\"AddOrEdit_leadby(null)\">Lead By</label>\r\n        <app-popupselect *ngIf=\"!showview\" [options]=\"leadby_List\" [optionsEvent]=\"leadby_optionsEvent\"\r\n          [form]=\"bousermaster\" (selectItem)=\"onSelected_leadby($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n          formControlName=\"leadby\" id=\"value\" desc=\"label\"></app-popupselect>\r\n        <div class=\"input-group\">\r\n        </div>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.leadbydesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('currentowner') == -1) && (currentownervisible==undefined || currentownervisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"currentowner\" class=\"control-label\">Current Owner</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.currentowner?.value}}</label>\r\n        <app-useraccess *ngIf=\"!showview\" id=\"currentowner\" formControlName=\"currentowner\"\r\n          (change)=\"currentowner_onChange($event.target)\">\r\n        </app-useraccess>\r\n      </div>\r\n    </div>\r\n\r\n\r\n    <!--leadresponse-->\r\n\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('leadresponse') == -1) && (leadresponsevisible==undefined || leadresponsevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"leadresponse\" class=\"control-label\">Lead Response</label>\r\n        <select *ngIf=\"!showview\" id=\"leadresponse\" (change)=\"leadresponse_onChange($event.target)\"\r\n          formControlName=\"leadresponse\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of leadresponse_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.leadresponsedesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('nextcalldate') == -1) && (nextcalldatevisible==undefined || nextcalldatevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"nextcalldate\" class=\"control-label\">Next Call Date</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.nextcalldate?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"!showview\">\r\n          <input #nextcalldateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n            [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"nextcalldateformpicker\" id=\"nextcalldate\"\r\n            formControlName=\"nextcalldate\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"nextcalldateformpicker.toggle()\" type=\"button\"><i\r\n              class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--nextaction-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('nextaction') == -1) && (nextactionvisible==undefined || nextactionvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"nextaction\" class=\"control-label\">Next Action</label>\r\n        <select *ngIf=\"!showview\" id=\"nextaction\" (change)=\"nextaction_onChange($event.target)\"\r\n          formControlName=\"nextaction\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of nextaction_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.nextactiondesc?.value}}</label>\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('actiondatetime') == -1) && (actiondatetimevisible==undefined || actiondatetimevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"actiondatetime\" class=\"control-label\">Action Date Time</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.actiondatetime?.value)}}</label>\r\n        <div class=\"input-group\" *ngIf=\"!showview\">\r\n          <input #actiondatetimeformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n            [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"actiondatetimeformpicker\"\r\n            id=\"actiondatetime\" formControlName=\"actiondatetime\" class=\"form-control\">\r\n          <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"actiondatetimeformpicker.toggle()\"\r\n            type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n        </div>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('previousremarks') == -1) && (previousremarksvisible==undefined || previousremarksvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"previousremarks\" class=\"control-label\">Previous Remarks</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.previousremarks?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"previousremarks\"\r\n          formControlName=\"previousremarks\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('leadscore') == -1) && (leadscorevisible==undefined || leadscorevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"leadscore\" class=\"control-label\">Lead Score</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.leadscore?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"leadscore\" formControlName=\"leadscore\" class=\"form-control\">\r\n      </div>\r\n\r\n\r\n      <!--leadsource-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('leadsource') == -1) && (leadsourcevisible==undefined || leadsourcevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"leadsource\" class=\"control-label\">Source</label>\r\n        <select *ngIf=\"!showview\" id=\"leadsource\" (change)=\"leadsource_onChange($event.target)\"\r\n          formControlName=\"leadsource\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of leadsource_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.leadsourcedesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--leadstage-->\r\n\r\n      <div *ngIf=\"((hidelist.indexOf('leadstage') == -1) && (leadstagevisible==undefined || leadstagevisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"leadstage\" class=\"control-label\">Stage</label>\r\n        <select *ngIf=\"!showview\" id=\"leadstage\" (change)=\"leadstage_onChange($event.target)\"\r\n          formControlName=\"leadstage\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of leadstage_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.leadstagedesc?.value}}</label>\r\n      </div>\r\n\r\n\r\n      <!--criticality-->\r\n\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('criticality') == -1) && (criticalityvisible==undefined || criticalityvisible==true))\"\r\n        style='' class=\"col-3\"><label for=\"criticality\" class=\"control-label\">Criticality</label>\r\n        <select *ngIf=\"!showview\" id=\"criticality\" (change)=\"criticality_onChange($event.target)\"\r\n          formControlName=\"criticality\" class=\"form-control\">\r\n          <option [ngValue]=\"null\" selected>-Select-</option>\r\n          <option *ngFor=\"let item of criticality_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n        </select>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.criticalitydesc?.value}}</label>\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('expectedvalue') == -1) && (expectedvaluevisible==undefined || expectedvaluevisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"expectedvalue\" class=\"control-label\">Expected Value</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.expectedvalue?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"expectedvalue\" formControlName=\"expectedvalue\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div class='full-width'\r\n      *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab header='CustomField' [selected]='false'>\r\n          <div class=\"sticky\"\r\n            *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n            Custom Fields</div>\r\n          <div class=\"form-group row\"\r\n            *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n            <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n          </div>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_lmshistory_lmshistory_module_ts.js.map