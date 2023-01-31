"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["default-projects_n-tire-biz-app_src_app_pages_forms_crmcustomeraccountmaster_crmcustomeraccou-40e7ff"],{

/***/ 26546:
/*!********************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/crmcustomeraccountmaster/crmcustomeraccountmaster.component.ts ***!
  \********************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomeraccountmasterComponent": () => (/* binding */ crmcustomeraccountmasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_crmcustomeraccountmaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./crmcustomeraccountmaster.component.html */ 59705);
/* harmony import */ var _service_crmcustomeraccountmaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/crmcustomeraccountmaster.service */ 11811);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component */ 55163);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_crmcustomeraccounttransaction_crmcustomeraccounttransaction_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/crmcustomeraccounttransaction/crmcustomeraccounttransaction.component */ 61298);
/* harmony import */ var _service_crmcustomeraccounttransaction_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/crmcustomeraccounttransaction.service */ 10963);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions

//child table



//Shortcuts

//translator





//primeng services



//session,application constants




//custom fields & attachments


let crmcustomeraccountmasterComponent = class crmcustomeraccountmasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, crmcustomeraccountmaster_service, crmcustomeraccounttransaction_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.crmcustomeraccountmaster_service = crmcustomeraccountmaster_service;
        this.crmcustomeraccounttransaction_service = crmcustomeraccounttransaction_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_crmcustomeraccountmasters = false;
        this.bfilterPopulate_crmcustomeraccounttransactions = false;
        this.crmcustomeraccountmaster_menuactions = [];
        this.crmcustomeraccounttransaction_menuactions = [];
        this.customerid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_12__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_10__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_10__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_crmcustomeraccounttransaction_IDs = "";
        this.crmcustomeraccounttransactions_ID = "1";
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
        this.crmcustomeraccountmaster_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            accountid: [null],
            customerid: [null],
            customeriddesc: [null],
            cifnumber: [null],
            accountnumber: [null],
            productid: [null],
            productiddesc: [null],
            accountopendate: [null],
            holdingtype: [null],
            holdingtypedesc: [null],
            customerholding: [null],
            customerholdingdesc: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.crmcustomeraccountmaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.crmcustomeraccountmaster_Form.dirty && this.crmcustomeraccountmaster_Form.touched) {
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
        let pos = this.pkList.map(function (e) { return e.accountid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.accountid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.accountid && pkDetail) {
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
            let crmcustomeraccountmasterid = null;
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
            this.formid = crmcustomeraccountmasterid;
            //alert(crmcustomeraccountmasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_crmcustomeraccounttransactions_TableConfig();
                setTimeout(() => {
                    //this.Set_crmcustomeraccounttransactions_TableDropDownConfig();
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
            this.crmcustomeraccountmaster_service.getDefaultData().then(res => {
                this.customerid_List = res.list_customerid.value;
                this.productid_List = res.list_productid.value;
                this.holdingtype_List = res.list_holdingtype.value;
                this.customerholding_List = res.list_customerholding.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.crmcustomeraccountmaster_service.get_crmcustomeraccountmasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.crmcustomeraccountmaster_Form.markAsUntouched();
            this.crmcustomeraccountmaster_Form.markAsPristine();
        });
    }
    onSelected_customerid(customeridDetail) {
        if (customeridDetail.value && customeridDetail) {
            this.crmcustomeraccountmaster_Form.patchValue({
                customerid: customeridDetail.value,
                customeriddesc: customeridDetail.label,
            });
        }
    }
    resetForm() {
        if (this.crmcustomeraccountmaster_Form != null)
            this.crmcustomeraccountmaster_Form.reset();
        this.crmcustomeraccountmaster_Form.patchValue({});
        setTimeout(() => {
            this.crmcustomeraccounttransactions_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let accountid = this.crmcustomeraccountmaster_Form.get('accountid').value;
        if (accountid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.crmcustomeraccountmaster_service.delete_crmcustomeraccountmaster(accountid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.crmcustomeraccountmaster_Form.patchValue({
            accountid: null
        });
        if (this.formData.accountid != null)
            this.formData.accountid = null;
        for (let i = 0; i < this.tbl_crmcustomeraccounttransactions.source.length; i++) {
            this.tbl_crmcustomeraccounttransactions.source[i].transactionid = null;
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
                    else if (key == "accountopendate")
                        this.crmcustomeraccountmaster_Form.patchValue({ "accountopendate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.crmcustomeraccountmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.crmcustomeraccountmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.crmcustomeraccountmaster_Form.controls[key] != undefined) {
                                this.crmcustomeraccountmaster_Form.controls[key].disable({ onlySelf: true });
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
            return this.customfieldservice.getcustomfieldconfigurationsByTable("crmcustomeraccountmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.accountnumber != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.accountnumber != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    customerid_onChange(evt) {
        let e = evt.value;
    }
    productid_onChange(evt) {
        let e = evt.value;
        this.crmcustomeraccountmaster_Form.patchValue({ productiddesc: evt.options[evt.options.selectedIndex].text });
    }
    holdingtype_onChange(evt) {
        let e = this.f.holdingtype.value;
        this.crmcustomeraccountmaster_Form.patchValue({ holdingtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    customerholding_onChange(evt) {
        let e = this.f.customerholding.value;
        this.crmcustomeraccountmaster_Form.patchValue({ customerholdingdesc: evt.options[evt.options.selectedIndex].text });
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
    edit_crmcustomeraccountmasters() {
        this.showview = false;
        setTimeout(() => {
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.crmcustomeraccountmaster_service.get_crmcustomeraccountmasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.crmcustomeraccountmaster;
                let formproperty = res.crmcustomeraccountmaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.crmcustomeraccountmaster.pkcol;
                this.formid = res.crmcustomeraccountmaster.accountid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.crmcustomeraccountmaster;
        this.formid = res.crmcustomeraccountmaster.accountid;
        this.pkcol = res.crmcustomeraccountmaster.pkcol;
        this.bmyrecord = false;
        if (res.crmcustomeraccountmaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.crmcustomeraccountmaster_Form.patchValue({
            accountid: res.crmcustomeraccountmaster.accountid,
            customerid: res.crmcustomeraccountmaster.customerid,
            customeriddesc: res.crmcustomeraccountmaster.customeriddesc,
            cifnumber: res.crmcustomeraccountmaster.cifnumber,
            accountnumber: res.crmcustomeraccountmaster.accountnumber,
            productid: res.crmcustomeraccountmaster.productid,
            productiddesc: res.crmcustomeraccountmaster.productiddesc,
            accountopendate: this.ngbDateParserFormatter.parse(res.crmcustomeraccountmaster.accountopendate),
            holdingtype: res.crmcustomeraccountmaster.holdingtype,
            holdingtypedesc: res.crmcustomeraccountmaster.holdingtypedesc,
            customerholding: res.crmcustomeraccountmaster.customerholding,
            customerholdingdesc: res.crmcustomeraccountmaster.customerholdingdesc,
            customfield: res.crmcustomeraccountmaster.customfield,
            attachment: JSON.parse(res.crmcustomeraccountmaster.attachment),
            status: res.crmcustomeraccountmaster.status,
            statusdesc: res.crmcustomeraccountmaster.statusdesc,
        });
        this.crmcustomeraccountmaster_menuactions = res.crmcustomeraccountmaster_menuactions;
        this.crmcustomeraccounttransaction_menuactions = res.crmcustomeraccounttransaction_menuactions;
        this.crmcustomeraccounttransactions_visiblelist = res.crmcustomeraccounttransactions_visiblelist;
        if (this.crmcustomeraccountmaster_Form.get('customfield').value != null && this.crmcustomeraccountmaster_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.crmcustomeraccountmaster_Form.get('customfield').value);
        this.FillCustomField();
        if (this.crmcustomeraccountmaster_Form.get('attachment').value != null && this.crmcustomeraccountmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.crmcustomeraccountmaster_Form.get('attachment').value);
        //Child Tables if any
        this.Set_crmcustomeraccounttransactions_TableConfig();
        this.crmcustomeraccounttransactions_LoadTable(res.crmcustomeraccounttransactions);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.crmcustomeraccountmaster_Form.controls) {
            let val = this.crmcustomeraccountmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.crmcustomeraccountmaster_Form.controls[key] != null) {
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
            if (!this.crmcustomeraccountmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.crmcustomeraccountmaster_Form.getRawValue();
            obj.accountopendate = new Date(this.crmcustomeraccountmaster_Form.get('accountopendate').value ? this.ngbDateParserFormatter.format(this.crmcustomeraccountmaster_Form.get('accountopendate').value) + '  UTC' : null);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.crmcustomeraccountmaster_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.crmcustomeraccountmaster_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.crmcustomeraccountmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.crmcustomeraccountmaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.crmcustomeraccountmaster_Form.controls[key] != null) {
                            this.formData[key] = this.crmcustomeraccountmaster_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            this.formData.accountopendate = new Date(this.crmcustomeraccountmaster_Form.get('accountopendate').value ? this.ngbDateParserFormatter.format(this.crmcustomeraccountmaster_Form.get('accountopendate').value) + '  UTC' : null);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_crmcustomeraccounttransaction_IDs = this.Deleted_crmcustomeraccounttransaction_IDs;
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.crmcustomeraccountmaster_service.saveOrUpdate_crmcustomeraccountmasters(this.formData, (_b = (_a = this.tbl_crmcustomeraccounttransactions) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_crmcustomeraccounttransactions.source) {
                    for (let i = 0; i < this.tbl_crmcustomeraccounttransactions.source.data.length; i++) {
                        if (this.tbl_crmcustomeraccounttransactions.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_crmcustomeraccounttransactions.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.crmcustomeraccountmaster);
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
                        this.objvalues.push(res.crmcustomeraccountmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.crmcustomeraccountmaster_Form.markAsUntouched();
                this.crmcustomeraccountmaster_Form.markAsPristine();
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
        this.tbl_crmcustomeraccounttransactions.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource();
    }
    AddOrEdit_crmcustomeraccounttransaction(event, transactionid, accountid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_crmcustomeraccounttransaction_crmcustomeraccounttransaction_component__WEBPACK_IMPORTED_MODULE_5__.crmcustomeraccounttransactionComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, transactionid, accountid, visiblelist: this.crmcustomeraccounttransactions_visiblelist, hidelist: this.crmcustomeraccounttransactions_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_crmcustomeraccounttransactions.source.add(res[i]);
                    }
                    this.tbl_crmcustomeraccounttransactions.source.refresh();
                }
                else {
                    this.tbl_crmcustomeraccounttransactions.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_crmcustomeraccounttransaction(event, childID, i) {
        if (childID != null)
            this.Deleted_crmcustomeraccounttransaction_IDs += childID + ",";
        this.tbl_crmcustomeraccounttransactions.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_crmcustomeraccounttransactions_Checkbox() {
        debugger;
        if (this.tbl_crmcustomeraccounttransactions.source.settings['selectMode'] == 'multi')
            this.tbl_crmcustomeraccounttransactions.source.settings['selectMode'] = 'single';
        else
            this.tbl_crmcustomeraccounttransactions.source.settings['selectMode'] = 'multi';
        this.tbl_crmcustomeraccounttransactions.source.initGrid();
    }
    delete_crmcustomeraccounttransactions_All() {
        this.tbl_crmcustomeraccounttransactions.source.settings['selectMode'] = 'single';
    }
    show_crmcustomeraccounttransactions_Filter() {
        setTimeout(() => {
            //  this.Set_crmcustomeraccounttransactions_TableDropDownConfig();
        });
        if (this.tbl_crmcustomeraccounttransactions.source.settings != null)
            this.tbl_crmcustomeraccounttransactions.source.settings['hideSubHeader'] = !this.tbl_crmcustomeraccounttransactions.source.settings['hideSubHeader'];
        this.tbl_crmcustomeraccounttransactions.source.initGrid();
    }
    show_crmcustomeraccounttransactions_InActive() {
    }
    enable_crmcustomeraccounttransactions_InActive() {
    }
    Set_crmcustomeraccounttransactions_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_crmcustomeraccounttransactions) {
                var clone = this.sharedService.clone(this.tbl_crmcustomeraccounttransactions.source.settings);
                if (clone.columns['customerid'] != undefined)
                    clone.columns['customerid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccounttransactions_customerid.value)), }, };
                if (clone.columns['customerid'] != undefined)
                    clone.columns['customerid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccounttransactions_customerid.value)), }, };
                this.tbl_crmcustomeraccounttransactions.source.settings = clone;
                this.tbl_crmcustomeraccounttransactions.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_crmcustomeraccounttransactions.source.settings);
                if (clone.columns['transactiontype'] != undefined)
                    clone.columns['transactiontype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccounttransactions_transactiontype.value)), }, };
                if (clone.columns['transactiontype'] != undefined)
                    clone.columns['transactiontype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccounttransactions_transactiontype.value)), }, };
                this.tbl_crmcustomeraccounttransactions.source.settings = clone;
                this.tbl_crmcustomeraccounttransactions.source.initGrid();
            }
            this.bfilterPopulate_crmcustomeraccounttransactions = true;
        });
    }
    crmcustomeraccounttransactions_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_crmcustomeraccounttransactions_TableConfig() {
        this.crmcustomeraccounttransactions_settings = {
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
                custom: this.crmcustomeraccounttransaction_menuactions
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
                customeriddesc: {
                    title: 'Customer',
                    type: 'html',
                    filter: true,
                },
                cifnumber: {
                    title: 'C I F Number',
                    type: '',
                    filter: true,
                },
                accountnumber: {
                    title: 'Account Number',
                    type: '',
                    filter: true,
                },
                date: {
                    title: 'Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                description: {
                    title: 'Description',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                amount: {
                    title: 'Amount',
                    type: '',
                    filter: true,
                },
                transactiontypedesc: {
                    title: 'Transaction Type',
                    type: 'html',
                    filter: true,
                },
                closingbalance: {
                    title: 'Closing Balance',
                    type: '',
                    filter: true,
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
    crmcustomeraccounttransactions_LoadTable(crmcustomeraccounttransactions = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomeraccounttransactions_ID) >= 0) {
            if (this.tbl_crmcustomeraccounttransactions != undefined)
                this.tbl_crmcustomeraccounttransactions.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_15__.LocalDataSource();
            if (this.tbl_crmcustomeraccounttransactions != undefined)
                this.tbl_crmcustomeraccounttransactions.source.load(crmcustomeraccounttransactions);
            if (this.tbl_crmcustomeraccounttransactions != undefined)
                this.tbl_crmcustomeraccounttransactions.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    crmcustomeraccounttransactions_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.crmcustomeraccountmaster_service.crmcustomeraccounttransactions.length == 0)
    {
        this.tbl_crmcustomeraccounttransactions.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new crmcustomeraccounttransaction();
        this.crmcustomeraccountmaster_service.crmcustomeraccounttransactions.push(obj);
        this.tbl_crmcustomeraccounttransactions.source.refresh();
        if ((this.crmcustomeraccountmaster_service.crmcustomeraccounttransactions.length / this.tbl_crmcustomeraccounttransactions.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_crmcustomeraccounttransactions.source.getPaging().page)
        {
            this.tbl_crmcustomeraccounttransactions.source.setPage((this.crmcustomeraccountmaster_service.crmcustomeraccounttransactions.length / this.tbl_crmcustomeraccounttransactions.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_crmcustomeraccounttransactions.source.grid.edit(this.tbl_crmcustomeraccounttransactions.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_crmcustomeraccounttransactions.source.data.indexOf(event.data);
    this.onDelete_crmcustomeraccounttransaction(event,event.data.transactionid,((this.tbl_crmcustomeraccounttransactions.source.getPaging().page-1) *this.tbl_crmcustomeraccounttransactions.source.getPaging().perPage)+index);
    this.tbl_crmcustomeraccounttransactions.source.refresh();
    break;
    }
    }
    
    */
    crmcustomeraccounttransactions_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_crmcustomeraccounttransaction(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_crmcustomeraccounttransaction(event, event.data.transactionid, this.formid);
                break;
            case 'delete':
                this.onDelete_crmcustomeraccounttransaction(event, event.data.transactionid, ((this.tbl_crmcustomeraccounttransactions.source.getPaging().page - 1) * this.tbl_crmcustomeraccounttransactions.source.getPaging().perPage) + event.index);
                this.tbl_crmcustomeraccounttransactions.source.refresh();
                break;
        }
    }
    crmcustomeraccounttransactions_onDelete(obj) {
        let transactionid = obj.data.transactionid;
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomeraccountmaster_service.delete_crmcustomeraccountmaster(transactionid).then(res => this.crmcustomeraccounttransactions_LoadTable());
        }
    }
    onCustom_crmcustomeraccounttransactions_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "crmcustomeraccounttransactions");
            let formname = objbomenuaction.actionname;
        });
    }
    crmcustomeraccounttransactions_Paging(val) {
        debugger;
        this.tbl_crmcustomeraccounttransactions.source.setPaging(1, val, true);
    }
    handle_crmcustomeraccounttransactions_GridSelected(event) {
        this.crmcustomeraccounttransactions_selectedindex = this.tbl_crmcustomeraccounttransactions.source.findIndex(i => i.transactionid === event.data.transactionid);
    }
    Is_crmcustomeraccounttransactions_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomeraccounttransactions_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
crmcustomeraccountmasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_16__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_17__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_19__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_9__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_20__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_21__.DialogService },
    { type: _service_crmcustomeraccountmaster_service__WEBPACK_IMPORTED_MODULE_1__.crmcustomeraccountmasterService },
    { type: _service_crmcustomeraccounttransaction_service__WEBPACK_IMPORTED_MODULE_6__.crmcustomeraccounttransactionService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_22__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_7__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_8__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_11__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_23__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_19__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_24__.NgxSpinnerService }
];
crmcustomeraccountmasterComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['customform', { static: false },] }],
    tbl_crmcustomeraccounttransactions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['tbl_crmcustomeraccounttransactions', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_12__.ViewChild, args: ['fileattachment', { static: false },] }]
};
crmcustomeraccountmasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_14__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_12__.Component)({
        selector: 'app-crmcustomeraccountmaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_crmcustomeraccountmaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_18__.KeyboardShortcutsService]
    })
], crmcustomeraccountmasterComponent);



/***/ }),

/***/ 11811:
/*!*************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/crmcustomeraccountmaster.service.ts ***!
  \*************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomeraccountmasterService": () => (/* binding */ crmcustomeraccountmasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let crmcustomeraccountmasterService = class crmcustomeraccountmasterService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_crmcustomeraccountmasters(formData, crmcustomeraccounttransactions) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { crmcustomeraccounttransactions: crmcustomeraccounttransactions.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomeraccountmaster', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/getdefaultdata').toPromise();
        }
    }
    get_crmcustomeraccountmasters_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomeraccountmaster').toPromise();
        }
    }
    getListBy_accountid(accountid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/accountid/' + accountid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/param/' + key).toPromise();
        }
    }
    get_crmcustomeraccountmasters_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/e/' + id).toPromise();
        }
    }
    get_crmcustomeraccountmasters_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/' + id).toPromise();
        }
    }
    delete_crmcustomeraccountmaster(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomeraccountmaster' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomeraccountmaster')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(crmcustomeraccountmaster => new crmcustomeraccountmaster(crmcustomeraccountmaster.accountid, crmcustomeraccountmaster.customerid, crmcustomeraccountmaster.customeriddesc, crmcustomeraccountmaster.cifnumber, crmcustomeraccountmaster.accountnumber, crmcustomeraccountmaster.productid, crmcustomeraccountmaster.productiddesc, crmcustomeraccountmaster.accountopendate, crmcustomeraccountmaster.holdingtype, crmcustomeraccountmaster.holdingtypedesc, crmcustomeraccountmaster.customerholding, crmcustomeraccountmaster.customerholdingdesc, crmcustomeraccountmaster.customfield, crmcustomeraccountmaster.attachment, crmcustomeraccountmaster.status, ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(crmcustomeraccountmaster => crmcustomeraccountmaster.accountnumber.includes(filter.name));
            return response;
        }));
    }
    getList_customerid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomeraccountmaster' + '/getList_customerid').toPromise();
    }
    getList_productid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomeraccountmaster' + '/getList_productid').toPromise();
    }
    getList_holdingtype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomeraccountmaster' + '/getList_holdingtype/').toPromise();
    }
    getList_customerholding() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomeraccountmaster' + '/getList_customerholding/').toPromise();
    }
};
crmcustomeraccountmasterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
crmcustomeraccountmasterService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], crmcustomeraccountmasterService);



/***/ }),

/***/ 59705:
/*!*************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/crmcustomeraccountmaster/crmcustomeraccountmaster.component.html ***!
  \*************************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"crmcustomeraccountmaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Accounts' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_crmcustomeraccountmasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of crmcustomeraccountmaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.accountid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.accountid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n\r\n\r\n            <!--customerid-->\r\n\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('customerid') == -1) && (customeridvisible==undefined || customeridvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"customerid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_customerid(null)\">Customer</label>\r\n                <app-popupselect *ngIf=\"!showview\" [options]=\"customerid_List\" [optionsEvent]=\"customerid_optionsEvent\"\r\n                  [form]=\"crmcustomermaster\" (selectItem)=\"onSelected_customerid($event)\" [reportid]='pofgf'\r\n                  [menuid]='pofgf' formControlName=\"customerid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                <div class=\"input-group\">\r\n                </div>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.customeriddesc?.value}}</label>\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('cifnumber') == -1) && (cifnumbervisible==undefined || cifnumbervisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"cifnumber\" class=\"control-label\">C I F Number</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.cifnumber?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"cifnumber\" formControlName=\"cifnumber\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('accountnumber') == -1) && (accountnumbervisible==undefined || accountnumbervisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"accountnumber\" class=\"control-label\">Account Number</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.accountnumber?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"accountnumber\" formControlName=\"accountnumber\" class=\"form-control\">\r\n              </div>\r\n\r\n\r\n              <!--productid-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('productid') == -1) && (productidvisible==undefined || productidvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"productid\" class=\"control-label\"\r\n                  (click)=\"AddOrEdit_productid(null)\">Product</label>\r\n                <select *ngIf=\"!showview\" id=\"productid\" (change)=\"productid_onChange($event.target)\"\r\n                  formControlName=\"productid\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of productid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.productiddesc?.value}}</label>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('accountopendate') == -1) && (accountopendatevisible==undefined || accountopendatevisible==true))\"\r\n                style='' class=\"col-3 \">\r\n                <label for=\"accountopendate\" class=\"control-label\">Account Open Date</label>\r\n                <label *ngIf=\"showview\"\r\n                  class=\"labelview\">{{ngbDateParserFormatter.format(f.accountopendate?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #accountopendateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"accountopendateformpicker\"\r\n                    id=\"accountopendate\" formControlName=\"accountopendate\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"accountopendateformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--holdingtype-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('holdingtype') == -1) && (holdingtypevisible==undefined || holdingtypevisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"holdingtype\" class=\"control-label\">Holding Type</label>\r\n                <select *ngIf=\"!showview\" id=\"holdingtype\" (change)=\"holdingtype_onChange($event.target)\"\r\n                  formControlName=\"holdingtype\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of holdingtype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.holdingtypedesc?.value}}</label>\r\n              </div>\r\n\r\n\r\n              <!--customerholding-->\r\n\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('customerholding') == -1) && (customerholdingvisible==undefined || customerholdingvisible==true))\"\r\n                style='' class=\"col-3\"><label for=\"customerholding\" class=\"control-label\">Customer Holding</label>\r\n                <select *ngIf=\"!showview\" id=\"customerholding\" (change)=\"customerholding_onChange($event.target)\"\r\n                  formControlName=\"customerholding\" class=\"form-control\">\r\n                  <option [ngValue]=\"null\" selected>-Select-</option>\r\n                  <option *ngFor=\"let item of customerholding_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                </select>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.customerholdingdesc?.value}}</label>\r\n              </div>\r\n              <div class=\"col\"></div>\r\n            </div>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Transactions</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table crmcustomeraccounttransactions-->\r\n            <div [ngClass]=\"Is_crmcustomeraccounttransactions_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Transactions' | translate}}\r\n                <select class='child' id=\"crmcustomeraccounttransactionsPagingdropdown\"\r\n                  (change)=\"crmcustomeraccounttransactions_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"crmcustomeraccounttransactiontoggleOption();crmcustomeraccounttransactions_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"showcrmcustomeraccounttransactionsFilter()\"><i class=\"fa fa-filter\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"crmcustomeraccounttransactions_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_crmcustomeraccounttransactions\r\n                (userRowSelect)=\"handle_crmcustomeraccounttransactions_GridSelected($event)\"\r\n                [settings]=\"crmcustomeraccounttransactions_settings\"\r\n                (custom)=\"onCustom_crmcustomeraccounttransactions_Action($event)\"\r\n                [source]=\"tbl_crmcustomeraccounttransactions?.source?.data\"\r\n                (delete)=\"crmcustomeraccounttransactions_route($event,'delete')\"\r\n                (deleteConfirm)=\"crmcustomeraccounttransactions_route($event,'delete')\"\r\n                (create)=\"crmcustomeraccounttransactions_route($event,'create')\"\r\n                (createConfirm)=\"crmcustomeraccounttransactions_beforesave($event)\"\r\n                (edit)=\"crmcustomeraccounttransactions_route($event,'edit')\"\r\n                (editConfirm)=\"crmcustomeraccounttransactions_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table crmcustomeraccounttransactions-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=default-projects_n-tire-biz-app_src_app_pages_forms_crmcustomeraccountmaster_crmcustomeraccou-40e7ff.js.map