"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_boexpense_boexpense_module_ts"],{

/***/ 52584:
/*!**************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boexpense/boexpense.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boexpenseComponent": () => (/* binding */ boexpenseComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boexpense_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boexpense.component.html */ 27109);
/* harmony import */ var _service_boexpense_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/boexpense.service */ 69045);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_boexpensedetail_boexpensedetail_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./../../../pages/forms/boexpensedetail/boexpensedetail.component */ 76696);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions



//Shortcuts

//translator




//primeng services



//session,application constants




//custom fields & attachments


let boexpenseComponent = class boexpenseComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, boexpense_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.boexpense_service = boexpense_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_10__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_boexpenses = false;
        this.bfilterPopulate_boexpensedetails = false;
        this.boexpense_menuactions = [];
        this.boexpensedetail_menuactions = [];
        this.requesteduserid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_10__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_8__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_8__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_boexpensedetail_IDs = "";
        this.boexpensedetails_ID = "1";
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
        this.boexpense_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            expenseid: [null],
            sourcefield: [null],
            sourcereference: [null],
            expensedate: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required])],
            requesteduserid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required])],
            requesteduseriddesc: [null],
            expensetype: [null],
            expensetypedesc: [null],
            expensecategory: [null],
            expensecategorydesc: [null],
            expensedescription: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required])],
            currency: [null],
            currencydesc: [null],
            amount: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_11__.Validators.required])],
            tax: [null],
            othercharges: [null],
            totalamount: [null],
            merchant: [null],
            reference: [null],
            receiptattached: [null],
            billable: [null],
            reimbursedamount: [null],
            reimburseddate: [null],
            referencenumber: [null],
            basecurrency: [null],
            basecurrencydesc: [null],
            baseamount: [null],
            notes: [null],
            costcenterid: [null],
            costcenteriddesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.boexpense_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.boexpense_Form.dirty && this.boexpense_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_12__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_12__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_12__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.expenseid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.expenseid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.expenseid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
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
            let boexpenseid = null;
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
            this.formid = boexpenseid;
            //alert(boexpenseid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_boexpensedetails_TableConfig();
                setTimeout(() => {
                    //this.Set_boexpensedetails_TableDropDownConfig();
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
            this.boexpense_service.getDefaultData().then(res => {
                this.requesteduserid_List = res.list_requesteduserid.value;
                this.expensetype_List = res.list_expensetype.value;
                this.expensecategory_List = res.list_expensecategory.value;
                this.currency_List = res.list_currency.value;
                this.basecurrency_List = res.list_basecurrency.value;
                this.costcenterid_List = res.list_costcenterid.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.boexpense_service.get_boexpenses_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.boexpense_Form.markAsUntouched();
            this.boexpense_Form.markAsPristine();
        });
    }
    onSelected_requesteduserid(requesteduseridDetail) {
        if (requesteduseridDetail.value && requesteduseridDetail) {
            this.boexpense_Form.patchValue({
                requesteduserid: requesteduseridDetail.value,
                requesteduseriddesc: requesteduseridDetail.label,
            });
        }
    }
    resetForm() {
        if (this.boexpense_Form != null)
            this.boexpense_Form.reset();
        this.boexpense_Form.patchValue({
            requesteduserid: this.sessionData.userid,
            requesteduseriddesc: this.sessionData.username,
        });
        setTimeout(() => {
            this.boexpensedetails_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.data != null) {
            this.boexpense_Form.patchValue({
                sourcefield: this.data.sourcefield, sourcereference: this.data.sourcereference
            });
        }
    }
    onDelete() {
        let expenseid = this.boexpense_Form.get('expenseid').value;
        if (expenseid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boexpense_service.delete_boexpense(expenseid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boexpense_Form.patchValue({
            expenseid: null
        });
        if (this.formData.expenseid != null)
            this.formData.expenseid = null;
        for (let i = 0; i < this.tbl_boexpensedetails.source.length; i++) {
            this.tbl_boexpensedetails.source[i].expensedetailid = null;
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
                    else if (key == "expensedate")
                        this.boexpense_Form.patchValue({ "expensedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "reimburseddate")
                        this.boexpense_Form.patchValue({ "reimburseddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "notes")
                        this.boexpense_Form.patchValue({ "notes": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.boexpense_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boexpense_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boexpense_Form.controls[key] != undefined) {
                                this.boexpense_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("boexpenses", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    requesteduserid_onChange(evt) {
        let e = evt.value;
    }
    expensetype_onChange(evt) {
        let e = this.f.expensetype.value;
        this.boexpense_Form.patchValue({ expensetypedesc: evt.options[evt.options.selectedIndex].text });
    }
    expensecategory_onChange(evt) {
        let e = this.f.expensecategory.value;
        this.boexpense_Form.patchValue({ expensecategorydesc: evt.options[evt.options.selectedIndex].text });
    }
    currency_onChange(evt) {
        let e = this.f.currency.value;
        this.boexpense_Form.patchValue({ currencydesc: evt.options[evt.options.selectedIndex].text });
    }
    basecurrency_onChange(evt) {
        let e = this.f.basecurrency.value;
        this.boexpense_Form.patchValue({ basecurrencydesc: evt.options[evt.options.selectedIndex].text });
    }
    costcenterid_onChange(evt) {
        let e = evt.value;
        this.boexpense_Form.patchValue({ costcenteriddesc: evt.options[evt.options.selectedIndex].text });
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
    edit_boexpenses() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.boexpense_service.get_boexpenses_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.boexpense;
                let formproperty = res.boexpense.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.boexpense.pkcol;
                this.formid = res.boexpense.expenseid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.boexpense;
        this.formid = res.boexpense.expenseid;
        this.pkcol = res.boexpense.pkcol;
        this.bmyrecord = false;
        if (res.boexpense.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boexpense_Form.patchValue({
            expenseid: res.boexpense.expenseid,
            sourcefield: res.boexpense.sourcefield,
            sourcereference: res.boexpense.sourcereference,
            expensedate: this.ngbDateParserFormatter.parse(res.boexpense.expensedate),
            requesteduserid: res.boexpense.requesteduserid,
            requesteduseriddesc: res.boexpense.requesteduseriddesc,
            expensetype: res.boexpense.expensetype,
            expensetypedesc: res.boexpense.expensetypedesc,
            expensecategory: res.boexpense.expensecategory,
            expensecategorydesc: res.boexpense.expensecategorydesc,
            expensedescription: res.boexpense.expensedescription,
            currency: res.boexpense.currency,
            currencydesc: res.boexpense.currencydesc,
            amount: res.boexpense.amount,
            tax: res.boexpense.tax,
            othercharges: res.boexpense.othercharges,
            totalamount: res.boexpense.totalamount,
            merchant: res.boexpense.merchant,
            reference: res.boexpense.reference,
            receiptattached: res.boexpense.receiptattached,
            billable: res.boexpense.billable,
            reimbursedamount: res.boexpense.reimbursedamount,
            reimburseddate: this.ngbDateParserFormatter.parse(res.boexpense.reimburseddate),
            referencenumber: res.boexpense.referencenumber,
            basecurrency: res.boexpense.basecurrency,
            basecurrencydesc: res.boexpense.basecurrencydesc,
            baseamount: res.boexpense.baseamount,
            notes: JSON.parse(res.boexpense.notes),
            costcenterid: res.boexpense.costcenterid,
            costcenteriddesc: res.boexpense.costcenteriddesc,
            customfield: res.boexpense.customfield,
            attachment: JSON.parse(res.boexpense.attachment),
            status: res.boexpense.status,
            statusdesc: res.boexpense.statusdesc,
        });
        this.boexpense_menuactions = res.boexpense_menuactions;
        this.boexpensedetail_menuactions = res.boexpensedetail_menuactions;
        this.boexpensedetails_visiblelist = res.boexpensedetails_visiblelist;
        if (this.boexpense_Form.get('customfield').value != null && this.boexpense_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.boexpense_Form.get('customfield').value);
        this.FillCustomField();
        if (this.boexpense_Form.get('attachment').value != null && this.boexpense_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.boexpense_Form.get('attachment').value);
        //Child Tables if any
        this.Set_boexpensedetails_TableConfig();
        this.boexpensedetails_LoadTable(res.boexpensedetails);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.boexpense_Form.controls) {
            let val = this.boexpense_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.boexpense_Form.controls[key] != null) {
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.boexpense_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.boexpense_Form.getRawValue();
            obj.expensedate = new Date(this.boexpense_Form.get('expensedate').value ? this.ngbDateParserFormatter.format(this.boexpense_Form.get('expensedate').value) + '  UTC' : null);
            obj.reimburseddate = new Date(this.boexpense_Form.get('reimburseddate').value ? this.ngbDateParserFormatter.format(this.boexpense_Form.get('reimburseddate').value) + '  UTC' : null);
            if (this.boexpense_Form.get('notes').value != null)
                obj.notes = JSON.stringify(this.boexpense_Form.get('notes').value);
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
        var _a, _b;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.boexpense_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.boexpense_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.boexpense_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.boexpense_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.boexpense_Form.controls[key] != null) {
                            this.formData[key] = this.boexpense_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            this.formData.expensedate = new Date(this.boexpense_Form.get('expensedate').value ? this.ngbDateParserFormatter.format(this.boexpense_Form.get('expensedate').value) + '  UTC' : null);
            this.formData.reimburseddate = new Date(this.boexpense_Form.get('reimburseddate').value ? this.ngbDateParserFormatter.format(this.boexpense_Form.get('reimburseddate').value) + '  UTC' : null);
            if (this.boexpense_Form.get('notes').value != null)
                this.formData.notes = JSON.stringify(this.boexpense_Form.get('notes').value);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_boexpensedetail_IDs = this.Deleted_boexpensedetail_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.boexpense_service.saveOrUpdate_boexpenses(this.formData, (_b = (_a = this.tbl_boexpensedetails) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_boexpensedetails.source) {
                    for (let i = 0; i < this.tbl_boexpensedetails.source.data.length; i++) {
                        if (this.tbl_boexpensedetails.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_boexpensedetails.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.boexpense);
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
                        this.objvalues.push(res.boexpense);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boexpense_Form.markAsUntouched();
                this.boexpense_Form.markAsPristine();
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
        this.tbl_boexpensedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_14__.LocalDataSource();
    }
    AddOrEdit_boexpensedetail(event, expensedetailid, expenseid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_boexpensedetail_boexpensedetail_component__WEBPACK_IMPORTED_MODULE_4__.boexpensedetailComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, expensedetailid, expenseid, visiblelist: this.boexpensedetails_visiblelist, hidelist: this.boexpensedetails_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_boexpensedetails.source.add(res[i]);
                    }
                    this.tbl_boexpensedetails.source.refresh();
                }
                else {
                    this.tbl_boexpensedetails.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_boexpensedetail(event, childID, i) {
        if (childID != null)
            this.Deleted_boexpensedetail_IDs += childID + ",";
        this.tbl_boexpensedetails.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_boexpensedetails_Checkbox() {
        debugger;
        if (this.tbl_boexpensedetails.source.settings['selectMode'] == 'multi')
            this.tbl_boexpensedetails.source.settings['selectMode'] = 'single';
        else
            this.tbl_boexpensedetails.source.settings['selectMode'] = 'multi';
        this.tbl_boexpensedetails.source.initGrid();
    }
    delete_boexpensedetails_All() {
        this.tbl_boexpensedetails.source.settings['selectMode'] = 'single';
    }
    show_boexpensedetails_Filter() {
        setTimeout(() => {
            //  this.Set_boexpensedetails_TableDropDownConfig();
        });
        if (this.tbl_boexpensedetails.source.settings != null)
            this.tbl_boexpensedetails.source.settings['hideSubHeader'] = !this.tbl_boexpensedetails.source.settings['hideSubHeader'];
        this.tbl_boexpensedetails.source.initGrid();
    }
    show_boexpensedetails_InActive() {
    }
    enable_boexpensedetails_InActive() {
    }
    Set_boexpensedetails_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_boexpensedetails) {
            }
            this.bfilterPopulate_boexpensedetails = true;
        });
    }
    boexpensedetails_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_boexpensedetails_TableConfig() {
        this.boexpensedetails_settings = {
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
                custom: this.boexpensedetail_menuactions
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
                expenseid: {
                    title: 'Expense',
                    type: 'number',
                    filter: true,
                },
                sourcereference: {
                    title: 'Source Reference',
                    type: 'number',
                    filter: true,
                },
                item: {
                    title: 'Item',
                    type: 'number',
                    filter: true,
                },
                description: {
                    title: 'Description',
                    type: '',
                    filter: true,
                },
                amount: {
                    title: 'Amount',
                    type: 'number',
                    filter: true,
                },
                costcenterid: {
                    title: 'Cost Center',
                    type: 'number',
                    filter: true,
                },
                notes: {
                    title: 'Notes',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
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
    boexpensedetails_LoadTable(boexpensedetails = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_14__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boexpensedetails_ID) >= 0) {
            if (this.tbl_boexpensedetails != undefined)
                this.tbl_boexpensedetails.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_14__.LocalDataSource();
            if (this.tbl_boexpensedetails != undefined)
                this.tbl_boexpensedetails.source.load(boexpensedetails);
            if (this.tbl_boexpensedetails != undefined)
                this.tbl_boexpensedetails.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    boexpensedetails_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.boexpense_service.boexpensedetails.length == 0)
    {
        this.tbl_boexpensedetails.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new boexpensedetail();
        this.boexpense_service.boexpensedetails.push(obj);
        this.tbl_boexpensedetails.source.refresh();
        if ((this.boexpense_service.boexpensedetails.length / this.tbl_boexpensedetails.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_boexpensedetails.source.getPaging().page)
        {
            this.tbl_boexpensedetails.source.setPage((this.boexpense_service.boexpensedetails.length / this.tbl_boexpensedetails.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_boexpensedetails.source.grid.edit(this.tbl_boexpensedetails.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_boexpensedetails.source.data.indexOf(event.data);
    this.onDelete_boexpensedetail(event,event.data.expensedetailid,((this.tbl_boexpensedetails.source.getPaging().page-1) *this.tbl_boexpensedetails.source.getPaging().perPage)+index);
    this.tbl_boexpensedetails.source.refresh();
    break;
    }
    }
    
    */
    boexpensedetails_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_boexpensedetail(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_boexpensedetail(event, event.data.expensedetailid, this.formid);
                break;
            case 'delete':
                this.onDelete_boexpensedetail(event, event.data.expensedetailid, ((this.tbl_boexpensedetails.source.getPaging().page - 1) * this.tbl_boexpensedetails.source.getPaging().perPage) + event.index);
                this.tbl_boexpensedetails.source.refresh();
                break;
        }
    }
    boexpensedetails_onDelete(obj) {
        let expensedetailid = obj.data.expensedetailid;
        if (confirm('Are you sure to delete this record ?')) {
            this.boexpense_service.delete_boexpense(expensedetailid).then(res => this.boexpensedetails_LoadTable());
        }
    }
    onCustom_boexpensedetails_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "boexpensedetails");
            let formname = objbomenuaction.actionname;
        });
    }
    boexpensedetails_Paging(val) {
        debugger;
        this.tbl_boexpensedetails.source.setPaging(1, val, true);
    }
    handle_boexpensedetails_GridSelected(event) {
        this.boexpensedetails_selectedindex = this.tbl_boexpensedetails.source.findIndex(i => i.expensedetailid === event.data.expensedetailid);
    }
    Is_boexpensedetails_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.boexpensedetails_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
boexpenseComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_15__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_16__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_17__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_18__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_7__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_19__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_20__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_20__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_20__.DialogService },
    { type: _service_boexpense_service__WEBPACK_IMPORTED_MODULE_1__.boexpenseService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_11__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_5__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_6__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_9__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_21__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_18__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_22__.NgxSpinnerService }
];
boexpenseComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['customform', { static: false },] }],
    tbl_boexpensedetails: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['tbl_boexpensedetails', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_10__.ViewChild, args: ['fileattachment', { static: false },] }]
};
boexpenseComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_13__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_10__.Component)({
        selector: 'app-boexpense',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boexpense_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_17__.KeyboardShortcutsService]
    })
], boexpenseComponent);



/***/ }),

/***/ 56671:
/*!***********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boexpense/boexpense.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boexpenseModule": () => (/* binding */ boexpenseModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _boexpense_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boexpense.routing */ 5034);
/* harmony import */ var _boexpense_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boexpense.component */ 52584);
/* harmony import */ var _boexpensedetail_boexpensedetail_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../boexpensedetail/boexpensedetail.module */ 68900);







let boexpenseModule = class boexpenseModule {
};
boexpenseModule = (0,tslib__WEBPACK_IMPORTED_MODULE_5__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_6__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _boexpense_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _boexpensedetail_boexpensedetail_module__WEBPACK_IMPORTED_MODULE_4__.boexpensedetailModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_6__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_boexpense_component__WEBPACK_IMPORTED_MODULE_3__.boexpenseComponent]
    })
], boexpenseModule);



/***/ }),

/***/ 5034:
/*!************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boexpense/boexpense.routing.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _boexpense_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boexpense.component */ 52584);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'boexpenses', children: [
            { path: '', component: _boexpense_component__WEBPACK_IMPORTED_MODULE_0__.boexpenseComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _boexpense_component__WEBPACK_IMPORTED_MODULE_0__.boexpenseComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _boexpense_component__WEBPACK_IMPORTED_MODULE_0__.boexpenseComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _boexpense_component__WEBPACK_IMPORTED_MODULE_0__.boexpenseComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 76696:
/*!**************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boexpensedetail/boexpensedetail.component.ts ***!
  \**************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boexpensedetailComponent": () => (/* binding */ boexpensedetailComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boexpensedetail_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./boexpensedetail.component.html */ 32597);
/* harmony import */ var _service_boexpensedetail_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/boexpensedetail.service */ 36403);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions


//Shortcuts

//translator



//primeng services



//session,application constants




//custom fields & attachments

let boexpensedetailComponent = class boexpensedetailComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, boexpensedetail_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.boexpensedetail_service = boexpensedetail_service;
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
        this.bfilterPopulate_boexpensedetails = false;
        this.boexpensedetail_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
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
        this.boexpensedetail_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            expenseid: [null],
            expensedetailid: [null],
            sourcefield: [null],
            sourcereference: [null],
            item: [null],
            description: [null],
            amount: [null],
            costcenterid: [null],
            notes: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.boexpensedetail_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.boexpensedetail_Form.dirty && this.boexpensedetail_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.expensedetailid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.expensedetailid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.expensedetailid && pkDetail) {
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
            let boexpensedetailid = null;
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
            this.formid = boexpensedetailid;
            //alert(boexpensedetailid);
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
            this.boexpensedetail_service.getDefaultData().then(res => {
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.boexpensedetail_service.get_boexpensedetails_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.boexpensedetail_Form.markAsUntouched();
            this.boexpensedetail_Form.markAsPristine();
        });
    }
    resetForm() {
        if (this.boexpensedetail_Form != null)
            this.boexpensedetail_Form.reset();
        this.boexpensedetail_Form.patchValue({});
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        if (this.data != null) {
            this.boexpensedetail_Form.patchValue({
                sourcefield: this.data.sourcefield, sourcereference: this.data.sourcereference
            });
        }
    }
    onDelete() {
        let expensedetailid = this.boexpensedetail_Form.get('expensedetailid').value;
        if (expensedetailid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.boexpensedetail_service.delete_boexpensedetail(expensedetailid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.boexpensedetail_Form.patchValue({
            expensedetailid: null
        });
        if (this.formData.expensedetailid != null)
            this.formData.expensedetailid = null;
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
                        this.boexpensedetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.boexpensedetail_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.boexpensedetail_Form.controls[key] != undefined) {
                                this.boexpensedetail_Form.controls[key].disable({ onlySelf: true });
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
    edit_boexpensedetails() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.boexpensedetail_service.get_boexpensedetails_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.boexpensedetail;
                let formproperty = res.boexpensedetail.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.boexpensedetail.pkcol;
                this.formid = res.boexpensedetail.expensedetailid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.boexpensedetail;
        this.formid = res.boexpensedetail.expensedetailid;
        this.pkcol = res.boexpensedetail.pkcol;
        this.bmyrecord = false;
        if (res.boexpensedetail.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.boexpensedetail_Form.patchValue({
            expenseid: res.boexpensedetail.expenseid,
            expensedetailid: res.boexpensedetail.expensedetailid,
            sourcefield: res.boexpensedetail.sourcefield,
            sourcereference: res.boexpensedetail.sourcereference,
            item: res.boexpensedetail.item,
            description: res.boexpensedetail.description,
            amount: res.boexpensedetail.amount,
            costcenterid: res.boexpensedetail.costcenterid,
            notes: res.boexpensedetail.notes,
            attachment: JSON.parse(res.boexpensedetail.attachment),
            status: res.boexpensedetail.status,
            statusdesc: res.boexpensedetail.statusdesc,
        });
        this.boexpensedetail_menuactions = res.boexpensedetail_menuactions;
        if (this.boexpensedetail_Form.get('attachment').value != null && this.boexpensedetail_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.boexpensedetail_Form.get('attachment').value);
        //Child Tables if any
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.boexpensedetail_Form.controls) {
            let val = this.boexpensedetail_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.boexpensedetail_Form.controls[key] != null) {
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
            if (!this.boexpensedetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.boexpensedetail_Form.getRawValue();
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.boexpensedetail_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.boexpensedetail_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.boexpensedetail_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.boexpensedetail_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.boexpensedetail_Form.controls[key] != null) {
                            this.formData[key] = this.boexpensedetail_Form.controls[key].value;
                        }
                    }
                }
            }
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.boexpensedetail_service.saveOrUpdate_boexpensedetails(this.formData).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.boexpensedetail);
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
                        this.objvalues.push(res.boexpensedetail);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.boexpensedetail_Form.markAsUntouched();
                this.boexpensedetail_Form.markAsPristine();
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
boexpensedetailComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_11__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_12__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_13__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_6__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_15__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_16__.DialogService },
    { type: _service_boexpensedetail_service__WEBPACK_IMPORTED_MODULE_1__.boexpensedetailService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_4__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_5__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_18__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_14__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_19__.NgxSpinnerService }
];
boexpensedetailComponent.propDecorators = {
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_8__.ViewChild, args: ['fileattachment', { static: false },] }]
};
boexpensedetailComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_10__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.Component)({
        selector: 'app-boexpensedetail',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_boexpensedetail_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_13__.KeyboardShortcutsService]
    })
], boexpensedetailComponent);



/***/ }),

/***/ 68900:
/*!***********************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boexpensedetail/boexpensedetail.module.ts ***!
  \***********************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boexpensedetailModule": () => (/* binding */ boexpensedetailModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _boexpensedetail_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./boexpensedetail.routing */ 89926);
/* harmony import */ var _boexpensedetail_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./boexpensedetail.component */ 76696);






let boexpensedetailModule = class boexpensedetailModule {
};
boexpensedetailModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _boexpensedetail_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_boexpensedetail_component__WEBPACK_IMPORTED_MODULE_3__.boexpensedetailComponent]
    })
], boexpensedetailModule);



/***/ }),

/***/ 89926:
/*!************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/boexpensedetail/boexpensedetail.routing.ts ***!
  \************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _boexpensedetail_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./boexpensedetail.component */ 76696);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'boexpensedetails', children: [
            { path: '', component: _boexpensedetail_component__WEBPACK_IMPORTED_MODULE_0__.boexpensedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _boexpensedetail_component__WEBPACK_IMPORTED_MODULE_0__.boexpensedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _boexpensedetail_component__WEBPACK_IMPORTED_MODULE_0__.boexpensedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _boexpensedetail_component__WEBPACK_IMPORTED_MODULE_0__.boexpensedetailComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 69045:
/*!**********************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/boexpense.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boexpenseService": () => (/* binding */ boexpenseService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let boexpenseService = class boexpenseService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_boexpenses(formData, boexpensedetails) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { boexpensedetails: boexpensedetails.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpense', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpense' + '/getdefaultdata').toPromise();
        }
    }
    get_boexpenses_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpense').toPromise();
        }
    }
    getListBy_expenseid(expenseid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpense' + '/expenseid/' + expenseid).toPromise();
        }
    }
    getListBy_sourcereference(sourcereference) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpense' + '/sourcereference/' + sourcereference).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpense' + '/param/' + key).toPromise();
        }
    }
    get_boexpenses_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpense' + '/e/' + id).toPromise();
        }
    }
    get_boexpenses_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpense' + '/' + id).toPromise();
        }
    }
    delete_boexpense(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpense' + '/' + id).toPromise();
        }
    }
    getList_requesteduserid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boexpense' + '/getList_requesteduserid').toPromise();
    }
    getList_expensetype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boexpense' + '/getList_expensetype/').toPromise();
    }
    getList_expensecategory() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boexpense' + '/getList_expensecategory/').toPromise();
    }
    getList_currency() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boexpense' + '/getList_currency/').toPromise();
    }
    getList_basecurrency() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boexpense' + '/getList_basecurrency/').toPromise();
    }
    getList_costcenterid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/boexpense' + '/getList_costcenterid').toPromise();
    }
};
boexpenseService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
boexpenseService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], boexpenseService);



/***/ }),

/***/ 36403:
/*!****************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/boexpensedetail.service.ts ***!
  \****************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "boexpensedetailService": () => (/* binding */ boexpensedetailService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let boexpensedetailService = class boexpensedetailService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_boexpensedetails(formData) {
        if (this.valid()) {
            var body = Object.assign({}, formData);
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpensedetail', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpensedetail' + '/getdefaultdata').toPromise();
        }
    }
    get_boexpensedetails_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpensedetail').toPromise();
        }
    }
    getListBy_expensedetailid(expensedetailid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpensedetail' + '/expensedetailid/' + expensedetailid).toPromise();
        }
    }
    getListBy_sourcereference(sourcereference) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpensedetail' + '/sourcereference/' + sourcereference).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpensedetail' + '/param/' + key).toPromise();
        }
    }
    get_boexpensedetails_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpensedetail' + '/e/' + id).toPromise();
        }
    }
    get_boexpensedetails_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpensedetail' + '/' + id).toPromise();
        }
    }
    delete_boexpensedetail(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/boexpensedetail' + '/' + id).toPromise();
        }
    }
};
boexpensedetailService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
boexpensedetailService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], boexpensedetailService);



/***/ }),

/***/ 27109:
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boexpense/boexpense.component.html ***!
  \*******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"boexpense_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Expenses' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_boexpenses()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of boexpense_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.expenseid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.expenseid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('expensedate') == -1) && (expensedatevisible==undefined || expensedatevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"expensedate\" class=\"control-label required\">Expense Date</label>\r\n                <label *ngIf=\"showview\"\r\n                  class=\"labelview\">{{ngbDateParserFormatter.format(f.expensedate?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #expensedateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"expensedateformpicker\"\r\n                    id=\"expensedate\" required formControlName=\"expensedate\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"expensedateformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n                <app-field-error-display [displayError]=\"f.expensedate.errors?.required\"\r\n                  errorMsg=\"Enter {{'Expense Date' | translate}}\">\r\n                </app-field-error-display>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Basic Info' [selected]='true'>\r\n\r\n\r\n              <!--requesteduserid-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('requesteduserid') == -1) && (requesteduseridvisible==undefined || requesteduseridvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"requesteduserid\" class=\"control-label required\"\r\n                    (click)=\"AddOrEdit_requesteduserid(null)\">Requested User</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"requesteduserid_List\"\r\n                    [optionsEvent]=\"requesteduserid_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_requesteduserid($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"requesteduserid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.requesteduseriddesc?.value}}</label>\r\n                  <app-field-error-display [displayError]=\"f.requesteduserid.errors?.required\"\r\n                    errorMsg=\"Enter {{'Requested User' | translate}}\">\r\n                  </app-field-error-display>\r\n                </div>\r\n\r\n\r\n                <!--expensetype-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('expensetype') == -1) && (expensetypevisible==undefined || expensetypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"expensetype\" class=\"control-label\">Expense Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"expensetype\" (change)=\"expensetype_onChange($event.target)\"\r\n                    formControlName=\"expensetype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of expensetype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.expensetypedesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--expensecategory-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('expensecategory') == -1) && (expensecategoryvisible==undefined || expensecategoryvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"expensecategory\" class=\"control-label\">Category</label>\r\n                  <select *ngIf=\"!showview\" id=\"expensecategory\" (change)=\"expensecategory_onChange($event.target)\"\r\n                    formControlName=\"expensecategory\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of expensecategory_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.expensecategorydesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('expensedescription') == -1) && (expensedescriptionvisible==undefined || expensedescriptionvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"expensedescription\" class=\"control-label required\">Description</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.expensedescription?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"expensedescription\" required formControlName=\"expensedescription\"\r\n                    class=\"form-control\">\r\n                  <app-field-error-display [displayError]=\"f.expensedescription.errors?.required\"\r\n                    errorMsg=\"Enter {{'Description' | translate}}\">\r\n                  </app-field-error-display>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Amount' [selected]='true'>\r\n\r\n\r\n              <!--currency-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('currency') == -1) && (currencyvisible==undefined || currencyvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"currency\" class=\"control-label\">Currency</label>\r\n                  <select *ngIf=\"!showview\" id=\"currency\" (change)=\"currency_onChange($event.target)\"\r\n                    formControlName=\"currency\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of currency_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.currencydesc?.value}}</label>\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('amount') == -1) && (amountvisible==undefined || amountvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"amount\" class=\"control-label required\">Amount</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.amount?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"amount\" required formControlName=\"amount\" class=\"form-control\">\r\n                  <app-field-error-display [displayError]=\"f.amount.errors?.required\"\r\n                    errorMsg=\"Enter {{'Amount' | translate}}\">\r\n                  </app-field-error-display>\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('tax') == -1) && (taxvisible==undefined || taxvisible==true))\" style=''\r\n                  class=\"col-3 \">\r\n                  <label for=\"tax\" class=\"control-label\">Tax</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.tax?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"tax\" formControlName=\"tax\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('othercharges') == -1) && (otherchargesvisible==undefined || otherchargesvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"othercharges\" class=\"control-label\">Other Charges</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.othercharges?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"othercharges\" formControlName=\"othercharges\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('totalamount') == -1) && (totalamountvisible==undefined || totalamountvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"totalamount\" class=\"control-label\">Total Amount</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.totalamount?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"totalamount\" formControlName=\"totalamount\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('merchant') == -1) && (merchantvisible==undefined || merchantvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"merchant\" class=\"control-label\">Merchant</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.merchant?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"merchant\" formControlName=\"merchant\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('reference') == -1) && (referencevisible==undefined || referencevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"reference\" class=\"control-label\">Reference</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.reference?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"reference\" formControlName=\"reference\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('receiptattached') == -1) && (receiptattachedvisible==undefined || receiptattachedvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"receiptattached\" class=\"control-label\">Receipt Attached</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.receiptattached?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"receiptattached\" formControlName=\"receiptattached\"\r\n                      class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('billable') == -1) && (billablevisible==undefined || billablevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <div class=\"columnchk\">\r\n                    <label for=\"billable\" class=\"control-label\">Billable</label>\r\n                    <label *ngIf=\"showview\" class=\"labelview\">{{f.billable?.value}}</label>\r\n                    <input type=\"checkbox\" *ngIf=\"!showview\" id=\"billable\" formControlName=\"billable\"\r\n                      class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('reimbursedamount') == -1) && (reimbursedamountvisible==undefined || reimbursedamountvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"reimbursedamount\" class=\"control-label\">Reimbursed Amount</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.reimbursedamount?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"reimbursedamount\" formControlName=\"reimbursedamount\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('reimburseddate') == -1) && (reimburseddatevisible==undefined || reimburseddatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"reimburseddate\" class=\"control-label\">Reimbursed Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.reimburseddate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #reimburseddateformpicker=\"ngbDatepicker\" [minDate]='{year: 1950, month:1, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"reimburseddateformpicker\"\r\n                      id=\"reimburseddate\" formControlName=\"reimburseddate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"reimburseddateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('referencenumber') == -1) && (referencenumbervisible==undefined || referencenumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"referencenumber\" class=\"control-label\">Reference Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.referencenumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"referencenumber\" formControlName=\"referencenumber\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--basecurrency-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('basecurrency') == -1) && (basecurrencyvisible==undefined || basecurrencyvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"basecurrency\" class=\"control-label\">Base Currency</label>\r\n                  <select *ngIf=\"!showview\" id=\"basecurrency\" (change)=\"basecurrency_onChange($event.target)\"\r\n                    formControlName=\"basecurrency\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of basecurrency_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.basecurrencydesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('baseamount') == -1) && (baseamountvisible==undefined || baseamountvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"baseamount\" class=\"control-label\">Base Amount</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.baseamount?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"baseamount\" formControlName=\"baseamount\" class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('notes') == -1) && (notesvisible==undefined || notesvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"notes\" class=\"control-label\">Notes</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.notes?.value}}</label>\r\n                  <app-comment *ngIf=\"!showview\" id=\"notes\" formControlName=\"notes\" [label]=\"'Notes'\">\r\n                  </app-comment>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--costcenterid-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('costcenterid') == -1) && (costcenteridvisible==undefined || costcenteridvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"costcenterid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_costcenterid(null)\">Cost Center</label>\r\n                  <select *ngIf=\"!showview\" id=\"costcenterid\" (change)=\"costcenterid_onChange($event.target)\"\r\n                    formControlName=\"costcenterid\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of costcenterid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.costcenteriddesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Details</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table boexpensedetails-->\r\n            <div [ngClass]=\"Is_boexpensedetails_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Details' | translate}}\r\n                <select class='child' id=\"boexpensedetailsPagingdropdown\"\r\n                  (change)=\"boexpensedetails_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"boexpensedetailtoggleOption();boexpensedetails_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showboexpensedetailsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"boexpensedetails_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_boexpensedetails (userRowSelect)=\"handle_boexpensedetails_GridSelected($event)\"\r\n                [settings]=\"boexpensedetails_settings\" (custom)=\"onCustom_boexpensedetails_Action($event)\"\r\n                [source]=\"tbl_boexpensedetails?.source?.data\" (delete)=\"boexpensedetails_route($event,'delete')\"\r\n                (deleteConfirm)=\"boexpensedetails_route($event,'delete')\"\r\n                (create)=\"boexpensedetails_route($event,'create')\" (createConfirm)=\"boexpensedetails_beforesave($event)\"\r\n                (edit)=\"boexpensedetails_route($event,'edit')\" (editConfirm)=\"boexpensedetails_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table boexpensedetails-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ }),

/***/ 32597:
/*!*******************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/boexpensedetail/boexpensedetail.component.html ***!
  \*******************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"boexpensedetail_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Expense Details' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_boexpensedetails()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of boexpensedetail_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.expensedetailid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.expensedetailid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('expenseid') == -1) && (expenseidvisible==undefined || expenseidvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"expenseid\" class=\"control-label\">Expense</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.expenseid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"expenseid\" formControlName=\"expenseid\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('item') == -1) && (itemvisible==undefined || itemvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"item\" class=\"control-label\">Item</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.item?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"item\" formControlName=\"item\" class=\"form-control\">\r\n      </div>\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('description') == -1) && (descriptionvisible==undefined || descriptionvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"description\" class=\"control-label\">Description</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.description?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"description\" formControlName=\"description\" class=\"form-control\">\r\n      </div>\r\n      <div *ngIf=\"((hidelist.indexOf('amount') == -1) && (amountvisible==undefined || amountvisible==true))\" style=''\r\n        class=\"col-3 \">\r\n        <label for=\"amount\" class=\"control-label\">Amount</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.amount?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"amount\" formControlName=\"amount\" class=\"form-control\">\r\n      </div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div\r\n        *ngIf=\"((hidelist.indexOf('costcenterid') == -1) && (costcenteridvisible==undefined || costcenteridvisible==true))\"\r\n        style='' class=\"col-3 \">\r\n        <label for=\"costcenterid\" class=\"control-label\">Cost Center</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.costcenterid?.value}}</label>\r\n        <input *ngIf=\"!showview\" id=\"costcenterid\" formControlName=\"costcenterid\" class=\"form-control\">\r\n      </div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n      <div class=\"col\"></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n      <div *ngIf=\"((hidelist.indexOf('notes') == -1) && (notesvisible==undefined || notesvisible==true))\"\r\n        style='width:1500px' class=\"col-12 \">\r\n        <label for=\"notes\" class=\"control-label\">Notes</label>\r\n        <label *ngIf=\"showview\" class=\"labelview\">{{f.notes?.value}}</label>\r\n        <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"notes\"\r\n          formControlName=\"notes\" class=\"form-control\">\r\n</textarea>\r\n      </div>\r\n    </div>\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_boexpense_boexpense_module_ts.js.map