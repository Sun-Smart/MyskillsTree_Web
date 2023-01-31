"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_crmcustomermaster_crmcustomermaster_module_ts"],{

/***/ 7908:
/*!******************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.component.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomermasterComponent": () => (/* binding */ crmcustomermasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_crmcustomermaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./crmcustomermaster.component.html */ 29710);
/* harmony import */ var _service_crmcustomermaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/crmcustomermaster.service */ 71661);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _n_tire_biz_app_src_app_shared_general_validator__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/general.validator */ 95113);
/* harmony import */ var _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component */ 55163);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_crmcustomeraccountmaster_crmcustomeraccountmaster_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/crmcustomeraccountmaster/crmcustomeraccountmaster.component */ 26546);
/* harmony import */ var _service_crmcustomeraccountmaster_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/crmcustomeraccountmaster.service */ 11811);
/* harmony import */ var _pages_forms_crmcustomerkycmaster_crmcustomerkycmaster_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/crmcustomerkycmaster/crmcustomerkycmaster.component */ 19538);
/* harmony import */ var _service_crmcustomerkycmaster_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../service/crmcustomerkycmaster.service */ 34034);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/customfieldconfiguration.service */ 87420);








//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu
//Custom error functions

//child table



//Shortcuts

//translator







//primeng services



//session,application constants




//custom fields & attachments


let crmcustomermasterComponent = class crmcustomermasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, crmcustomermaster_service, crmcustomeraccountmaster_service, crmcustomerkycmaster_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.crmcustomermaster_service = crmcustomermaster_service;
        this.crmcustomeraccountmaster_service = crmcustomeraccountmaster_service;
        this.crmcustomerkycmaster_service = crmcustomerkycmaster_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_14__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_crmcustomermasters = false;
        this.bfilterPopulate_crmcustomeraccountmasters = false;
        this.bfilterPopulate_crmcustomerkycmasters = false;
        this.crmcustomermaster_menuactions = [];
        this.crmcustomeraccountmaster_menuactions = [];
        this.crmcustomerkycmaster_menuactions = [];
        this.basebranchid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_14__.EventEmitter(); //autocomplete
        this.relationshipmanager_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_14__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_12__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_12__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.Deleted_crmcustomeraccountmaster_IDs = "";
        this.crmcustomeraccountmasters_ID = "1";
        this.Deleted_crmcustomerkycmaster_IDs = "";
        this.crmcustomerkycmasters_ID = "2";
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
        this.crmcustomermaster_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            customerid: [null],
            basebranchid: [null],
            basebranchiddesc: [null],
            customertype: [null],
            customertypedesc: [null],
            customergroup: [null],
            customergroupdesc: [null],
            categoryid: [null],
            categoryiddesc: [null],
            subcategoryid: [null],
            subcategoryiddesc: [null],
            territory: [null],
            territorydesc: [null],
            customercode: [null],
            companyname: [null],
            companytype: [null],
            companytypedesc: [null],
            incorporationdate: [null],
            businesssegment: [null],
            businesssegmentdesc: [null],
            companylogo: [null],
            thumbnail: [null],
            website: [null],
            mobilenumber: [null],
            officephone: [null],
            email: [null],
            metatags: [null],
            firstname: [null],
            lastname: [null],
            gender: [null],
            genderdesc: [null],
            dob: [null],
            emailid: [null],
            residencephone: [null],
            relationshipmanager: [null],
            relationshipmanagerdesc: [null],
            address: [null],
            shippingaddress: [null],
            billingcurrency: [null],
            billingcurrencydesc: [null],
            openingbalance: [null],
            asondate: [null],
            creditdays: [null],
            creditlimit: [null],
            accountstartfrom: [null],
            servicelevel: [null],
            slastartdate: [null],
            slaenddate: [null],
            gstregistrationtype: [null],
            gstregistrationtypedesc: [null],
            gstinnumber: [null],
            pannumber: [null],
            trnnumber: [null],
            tan: [null],
            cst: [null],
            salestax: [null],
            servicetax: [null],
            tin: [null],
            localtax: [null],
            itfilings: [null],
            lifetimevalue: [null],
            averageordervalue: [null],
            totalorders: [null],
            totalordervalue: [null],
            lastorderdate: [null],
            lastordervalue: [null],
            loyaltynumber: [null],
            pointsearned: [null],
            activepoints: [null],
            usedpoints: [null],
            expiredpoints: [null],
            lockedpoints: [null],
            blockedpoints: [null],
            pointsearnedincurrency: [null],
            activepointsincurrency: [null],
            usedpointsincurrency: [null],
            expiredpointsincurrency: [null],
            lockedpointsincurrency: [null],
            blockedpointsincurrency: [null],
            allocationmethod: [null],
            allocationmethoddesc: [null],
            customfield: [null],
            attachment: [null],
            cifnumber: [null],
            outstandingamt: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.crmcustomermaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.crmcustomermaster_Form.dirty && this.crmcustomermaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_15__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_15__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_15__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.customerid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.customerid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.customerid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
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
            let crmcustomermasterid = null;
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
            this.formid = crmcustomermasterid;
            //alert(crmcustomermasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_crmcustomeraccountmasters_TableConfig();
                setTimeout(() => {
                    //this.Set_crmcustomeraccountmasters_TableDropDownConfig();
                });
                this.Set_crmcustomerkycmasters_TableConfig();
                setTimeout(() => {
                    //this.Set_crmcustomerkycmasters_TableDropDownConfig();
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
            this.crmcustomermaster_service.getDefaultData().then(res => {
                this.basebranchid_List = res.list_basebranchid.value;
                this.customertype_List = res.list_customertype.value;
                this.customergroup_List = res.list_customergroup.value;
                this.categoryid_List = res.list_categoryid.value;
                this.territory_List = res.list_territory.value;
                this.companytype_List = res.list_companytype.value;
                this.businesssegment_List = res.list_businesssegment.value;
                this.gender_List = res.list_gender.value;
                this.relationshipmanager_List = res.list_relationshipmanager.value;
                this.billingcurrency_List = res.list_billingcurrency.value;
                this.gstregistrationtype_List = res.list_gstregistrationtype.value;
                this.allocationmethod_List = res.list_allocationmethod.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.crmcustomermaster_service.get_crmcustomermasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.crmcustomermaster_Form.markAsUntouched();
            this.crmcustomermaster_Form.markAsPristine();
        });
    }
    onSelected_basebranchid(basebranchidDetail) {
        if (basebranchidDetail.value && basebranchidDetail) {
            this.crmcustomermaster_Form.patchValue({
                basebranchid: basebranchidDetail.value,
                basebranchiddesc: basebranchidDetail.label,
            });
        }
    }
    onSelected_relationshipmanager(relationshipmanagerDetail) {
        if (relationshipmanagerDetail.value && relationshipmanagerDetail) {
            this.crmcustomermaster_Form.patchValue({
                relationshipmanager: relationshipmanagerDetail.value,
                relationshipmanagerdesc: relationshipmanagerDetail.label,
            });
        }
    }
    getthumbnail() {
        debugger;
        if (this.thumbnail.getAttachmentList().length > 0) {
            let file = this.thumbnail.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }
    getcompanylogo() {
        debugger;
        if (this.companylogo.getAttachmentList().length > 0) {
            let file = this.companylogo.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }
    resetForm() {
        if (this.crmcustomermaster_Form != null)
            this.crmcustomermaster_Form.reset();
        this.crmcustomermaster_Form.patchValue({
            basebranchid: this.sessionData.branchid,
            basebranchiddesc: this.sessionData.branchiddesc,
            relationshipmanager: this.sessionData.userid,
            relationshipmanagerdesc: this.sessionData.username,
        });
        setTimeout(() => {
            this.crmcustomeraccountmasters_LoadTable();
            this.crmcustomerkycmasters_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
    }
    onDelete() {
        let customerid = this.crmcustomermaster_Form.get('customerid').value;
        if (customerid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.crmcustomermaster_service.delete_crmcustomermaster(customerid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.crmcustomermaster_Form.patchValue({
            customerid: null
        });
        if (this.formData.customerid != null)
            this.formData.customerid = null;
        for (let i = 0; i < this.tbl_crmcustomeraccountmasters.source.length; i++) {
            this.tbl_crmcustomeraccountmasters.source[i].accountid = null;
        }
        for (let i = 0; i < this.tbl_crmcustomerkycmasters.source.length; i++) {
            this.tbl_crmcustomerkycmasters.source[i].kycid = null;
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
                    else if (key == "incorporationdate")
                        this.crmcustomermaster_Form.patchValue({ "incorporationdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "metatags")
                        this.crmcustomermaster_Form.patchValue({ "metatags": mainscreendata[key] });
                    else if (key == "dob")
                        this.crmcustomermaster_Form.patchValue({ "dob": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "address")
                        this.crmcustomermaster_Form.patchValue({ "address": mainscreendata[key] });
                    else if (key == "shippingaddress")
                        this.crmcustomermaster_Form.patchValue({ "shippingaddress": mainscreendata[key] });
                    else if (key == "asondate")
                        this.crmcustomermaster_Form.patchValue({ "asondate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "accountstartfrom")
                        this.crmcustomermaster_Form.patchValue({ "accountstartfrom": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "slastartdate")
                        this.crmcustomermaster_Form.patchValue({ "slastartdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "slaenddate")
                        this.crmcustomermaster_Form.patchValue({ "slaenddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "lastorderdate")
                        this.crmcustomermaster_Form.patchValue({ "lastorderdate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.crmcustomermaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.crmcustomermaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.crmcustomermaster_Form.controls[key] != undefined) {
                                this.crmcustomermaster_Form.controls[key].disable({ onlySelf: true });
                                this.hidelist.push(key);
                            }
                        }
                    }
                }
            }
        }
    }
    FillCustomField() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            return this.customfieldservice.getcustomfieldconfigurationsByTable("crmcustomermasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.lastname != null) {
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
        if (this.maindata == undefined || (this.maindata.maindatapkcol != '' && this.maindata.maindatapkcol != null && this.maindata.maindatapkcol != undefined) || this.maindata.save == true || this.formData.lastname != null) {
            this.onSubmitData(true);
        }
        else if ((this.maindata != null && (this.maindata.ScreenType == 1 || this.maindata.ScreenType == 2))) {
            this.onSubmitDataDlg(true);
        }
        else {
            this.onSubmitData(true);
        }
    }
    basebranchid_onChange(evt) {
        let e = evt.value;
    }
    customertype_onChange(evt) {
        let e = this.f.customertype.value;
        this.crmcustomermaster_Form.patchValue({ customertypedesc: evt.options[evt.options.selectedIndex].text });
    }
    customergroup_onChange(evt) {
        let e = this.f.customergroup.value;
        this.crmcustomermaster_Form.patchValue({ customergroupdesc: evt.options[evt.options.selectedIndex].text });
    }
    categoryid_onChange(evt) {
        let e = evt.value;
        this.crmcustomermaster_Form.patchValue({ categoryiddesc: evt.options[evt.options.selectedIndex].text });
        setTimeout(() => {
            if (this.f.categoryid.value && this.f.categoryid.value != "" && this.f.categoryid.value != null)
                this.crmcustomermaster_service.getList_subcategoryid(this.f.categoryid.value).then(res => this.subcategoryid_List = res);
        });
    }
    subcategoryid_onChange(evt) {
        let e = evt.value;
        this.crmcustomermaster_Form.patchValue({ subcategoryiddesc: evt.options[evt.options.selectedIndex].text });
    }
    territory_onChange(evt) {
        let e = evt.value;
        this.crmcustomermaster_Form.patchValue({ territorydesc: evt.options[evt.options.selectedIndex].text });
    }
    companytype_onChange(evt) {
        let e = this.f.companytype.value;
        this.crmcustomermaster_Form.patchValue({ companytypedesc: evt.options[evt.options.selectedIndex].text });
    }
    businesssegment_onChange(evt) {
        let e = this.f.businesssegment.value;
        this.crmcustomermaster_Form.patchValue({ businesssegmentdesc: evt.options[evt.options.selectedIndex].text });
    }
    gender_onChange(evt) {
        let e = this.f.gender.value;
        this.crmcustomermaster_Form.patchValue({ genderdesc: evt.options[evt.options.selectedIndex].text });
    }
    relationshipmanager_onChange(evt) {
        let e = evt.value;
    }
    billingcurrency_onChange(evt) {
        let e = this.f.billingcurrency.value;
        this.crmcustomermaster_Form.patchValue({ billingcurrencydesc: evt.options[evt.options.selectedIndex].text });
    }
    gstregistrationtype_onChange(evt) {
        let e = this.f.gstregistrationtype.value;
        this.crmcustomermaster_Form.patchValue({ gstregistrationtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    allocationmethod_onChange(evt) {
        let e = this.f.allocationmethod.value;
        this.crmcustomermaster_Form.patchValue({ allocationmethoddesc: evt.options[evt.options.selectedIndex].text });
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
    edit_crmcustomermasters() {
        this.showview = false;
        setTimeout(() => {
            if (this.thumbnail != null && this.thumbnail != undefined)
                this.thumbnail.setattachmentlist(this.crmcustomermaster_Form.get('thumbnail').value);
            if (this.companylogo != null && this.companylogo != undefined)
                this.companylogo.setattachmentlist(this.crmcustomermaster_Form.get('companylogo').value);
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.crmcustomermaster_service.get_crmcustomermasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.crmcustomermaster;
                let formproperty = res.crmcustomermaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.crmcustomermaster.pkcol;
                this.formid = res.crmcustomermaster.customerid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.crmcustomermaster;
        this.formid = res.crmcustomermaster.customerid;
        this.pkcol = res.crmcustomermaster.pkcol;
        this.bmyrecord = false;
        if (res.crmcustomermaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.crmcustomermaster_Form.patchValue({
            customerid: res.crmcustomermaster.customerid,
            basebranchid: res.crmcustomermaster.basebranchid,
            basebranchiddesc: res.crmcustomermaster.basebranchiddesc,
            customertype: res.crmcustomermaster.customertype,
            customertypedesc: res.crmcustomermaster.customertypedesc,
            customergroup: res.crmcustomermaster.customergroup,
            customergroupdesc: res.crmcustomermaster.customergroupdesc,
            categoryid: res.crmcustomermaster.categoryid,
            categoryiddesc: res.crmcustomermaster.categoryiddesc,
            subcategoryid: res.crmcustomermaster.subcategoryid,
            subcategoryiddesc: res.crmcustomermaster.subcategoryiddesc,
            territory: res.crmcustomermaster.territory,
            territorydesc: res.crmcustomermaster.territorydesc,
            customercode: res.crmcustomermaster.customercode,
            companyname: res.crmcustomermaster.companyname,
            companytype: res.crmcustomermaster.companytype,
            companytypedesc: res.crmcustomermaster.companytypedesc,
            incorporationdate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.incorporationdate),
            businesssegment: res.crmcustomermaster.businesssegment,
            businesssegmentdesc: res.crmcustomermaster.businesssegmentdesc,
            companylogo: JSON.parse(res.crmcustomermaster.companylogo),
            thumbnail: JSON.parse(res.crmcustomermaster.thumbnail),
            website: res.crmcustomermaster.website,
            mobilenumber: res.crmcustomermaster.mobilenumber,
            officephone: res.crmcustomermaster.officephone,
            email: res.crmcustomermaster.email,
            metatags: JSON.parse(res.crmcustomermaster.metatags),
            firstname: res.crmcustomermaster.firstname,
            lastname: res.crmcustomermaster.lastname,
            gender: res.crmcustomermaster.gender,
            genderdesc: res.crmcustomermaster.genderdesc,
            dob: this.ngbDateParserFormatter.parse(res.crmcustomermaster.dob),
            emailid: res.crmcustomermaster.emailid,
            residencephone: res.crmcustomermaster.residencephone,
            relationshipmanager: res.crmcustomermaster.relationshipmanager,
            relationshipmanagerdesc: res.crmcustomermaster.relationshipmanagerdesc,
            address: JSON.parse(res.crmcustomermaster.address),
            shippingaddress: JSON.parse(res.crmcustomermaster.shippingaddress),
            billingcurrency: res.crmcustomermaster.billingcurrency,
            billingcurrencydesc: res.crmcustomermaster.billingcurrencydesc,
            openingbalance: res.crmcustomermaster.openingbalance,
            asondate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.asondate),
            creditdays: res.crmcustomermaster.creditdays,
            creditlimit: res.crmcustomermaster.creditlimit,
            accountstartfrom: this.ngbDateParserFormatter.parse(res.crmcustomermaster.accountstartfrom),
            servicelevel: res.crmcustomermaster.servicelevel,
            slastartdate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.slastartdate),
            slaenddate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.slaenddate),
            gstregistrationtype: res.crmcustomermaster.gstregistrationtype,
            gstregistrationtypedesc: res.crmcustomermaster.gstregistrationtypedesc,
            gstinnumber: res.crmcustomermaster.gstinnumber,
            pannumber: res.crmcustomermaster.pannumber,
            trnnumber: res.crmcustomermaster.trnnumber,
            tan: res.crmcustomermaster.tan,
            cst: res.crmcustomermaster.cst,
            salestax: res.crmcustomermaster.salestax,
            servicetax: res.crmcustomermaster.servicetax,
            tin: res.crmcustomermaster.tin,
            localtax: res.crmcustomermaster.localtax,
            itfilings: res.crmcustomermaster.itfilings,
            lifetimevalue: res.crmcustomermaster.lifetimevalue,
            averageordervalue: res.crmcustomermaster.averageordervalue,
            totalorders: res.crmcustomermaster.totalorders,
            totalordervalue: res.crmcustomermaster.totalordervalue,
            lastorderdate: this.ngbDateParserFormatter.parse(res.crmcustomermaster.lastorderdate),
            lastordervalue: res.crmcustomermaster.lastordervalue,
            loyaltynumber: res.crmcustomermaster.loyaltynumber,
            pointsearned: res.crmcustomermaster.pointsearned,
            activepoints: res.crmcustomermaster.activepoints,
            usedpoints: res.crmcustomermaster.usedpoints,
            expiredpoints: res.crmcustomermaster.expiredpoints,
            lockedpoints: res.crmcustomermaster.lockedpoints,
            blockedpoints: res.crmcustomermaster.blockedpoints,
            pointsearnedincurrency: res.crmcustomermaster.pointsearnedincurrency,
            activepointsincurrency: res.crmcustomermaster.activepointsincurrency,
            usedpointsincurrency: res.crmcustomermaster.usedpointsincurrency,
            expiredpointsincurrency: res.crmcustomermaster.expiredpointsincurrency,
            lockedpointsincurrency: res.crmcustomermaster.lockedpointsincurrency,
            blockedpointsincurrency: res.crmcustomermaster.blockedpointsincurrency,
            allocationmethod: res.crmcustomermaster.allocationmethod,
            allocationmethoddesc: res.crmcustomermaster.allocationmethoddesc,
            customfield: res.crmcustomermaster.customfield,
            attachment: JSON.parse(res.crmcustomermaster.attachment),
            cifnumber: res.crmcustomermaster.cifnumber,
            outstandingamt: res.crmcustomermaster.outstandingamt,
            status: res.crmcustomermaster.status,
            statusdesc: res.crmcustomermaster.statusdesc,
        });
        this.crmcustomermaster_menuactions = res.crmcustomermaster_menuactions;
        this.crmcustomeraccountmaster_menuactions = res.crmcustomeraccountmaster_menuactions;
        this.crmcustomeraccountmasters_visiblelist = res.crmcustomeraccountmasters_visiblelist;
        this.crmcustomerkycmaster_menuactions = res.crmcustomerkycmaster_menuactions;
        this.crmcustomerkycmasters_visiblelist = res.crmcustomerkycmasters_visiblelist;
        if (this.crmcustomermaster_Form.get('customfield').value != null && this.crmcustomermaster_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.crmcustomermaster_Form.get('customfield').value);
        this.FillCustomField();
        if (this.crmcustomermaster_Form.get('thumbnail').value != null && this.crmcustomermaster_Form.get('thumbnail').value != "" && this.thumbnail != null && this.thumbnail != undefined)
            this.thumbnail.setattachmentlist(this.crmcustomermaster_Form.get('thumbnail').value);
        if (this.crmcustomermaster_Form.get('companylogo').value != null && this.crmcustomermaster_Form.get('companylogo').value != "" && this.companylogo != null && this.companylogo != undefined)
            this.companylogo.setattachmentlist(this.crmcustomermaster_Form.get('companylogo').value);
        if (this.crmcustomermaster_Form.get('attachment').value != null && this.crmcustomermaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.crmcustomermaster_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.categoryid.value && this.f.categoryid.value != "" && this.f.categoryid.value != null)
                this.crmcustomermaster_service.getList_subcategoryid(this.f.categoryid.value).then(res => {
                    this.subcategoryid_List = res;
                }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        this.Set_crmcustomeraccountmasters_TableConfig();
        this.crmcustomeraccountmasters_LoadTable(res.crmcustomeraccountmasters);
        this.Set_crmcustomerkycmasters_TableConfig();
        this.crmcustomerkycmasters_LoadTable(res.crmcustomerkycmasters);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.crmcustomermaster_Form.controls) {
            let val = this.crmcustomermaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.crmcustomermaster_Form.controls[key] != null) {
                if (key == "thumbnail" || key == "companylogo") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0)
                        ret = ret.replace(new RegExp('##' + key + '##', 'g'), _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_12__.AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
                }
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.crmcustomermaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.crmcustomermaster_Form.getRawValue();
            obj.incorporationdate = new Date(this.crmcustomermaster_Form.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('incorporationdate').value) + '  UTC' : null);
            if (this.crmcustomermaster_Form.get('metatags').value != null)
                obj.metatags = JSON.stringify(this.crmcustomermaster_Form.get('metatags').value);
            obj.dob = new Date(this.crmcustomermaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('dob').value) + '  UTC' : null);
            if (this.crmcustomermaster_Form.get('address').value != null)
                obj.address = JSON.stringify(this.crmcustomermaster_Form.get('address').value);
            if (this.crmcustomermaster_Form.get('shippingaddress').value != null)
                obj.shippingaddress = JSON.stringify(this.crmcustomermaster_Form.get('shippingaddress').value);
            obj.asondate = new Date(this.crmcustomermaster_Form.get('asondate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('asondate').value) + '  UTC' : null);
            obj.accountstartfrom = new Date(this.crmcustomermaster_Form.get('accountstartfrom').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('accountstartfrom').value) + '  UTC' : null);
            obj.slastartdate = new Date(this.crmcustomermaster_Form.get('slastartdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('slastartdate').value) + '  UTC' : null);
            obj.slaenddate = new Date(this.crmcustomermaster_Form.get('slaenddate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('slaenddate').value) + '  UTC' : null);
            obj.lastorderdate = new Date(this.crmcustomermaster_Form.get('lastorderdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('lastorderdate').value) + '  UTC' : null);
            if (customfields != null)
                obj.customfield = JSON.stringify(customfields);
            if (this.thumbnail.getAttachmentList() != null)
                obj.thumbnail = JSON.stringify(this.thumbnail.getAttachmentList());
            if (this.thumbnail.getAttachmentList() != null)
                obj.thumbnail = JSON.stringify(this.thumbnail.getAttachmentList());
            if (this.fileattachment.getAttachmentList() != null)
                obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            obj.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(obj);
            yield this.sharedService.upload(this.thumbnail.getAllFiles());
            yield this.sharedService.upload(this.companylogo.getAllFiles());
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
        var _a, _b, _c, _d;
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.crmcustomermaster_Form.controls).forEach(key => {
            //   const controlErrors: ValidationErrors = this.crmcustomermaster_Form.get(key).errors;
            //   if (controlErrors != null) {
            //     Object.keys(controlErrors).forEach(keyError => {
            //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //     });
            //   }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.crmcustomermaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.crmcustomermaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.crmcustomermaster_Form.controls[key] != null) {
                            this.formData[key] = this.crmcustomermaster_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            this.formData.incorporationdate = new Date(this.crmcustomermaster_Form.get('incorporationdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('incorporationdate').value) + '  UTC' : null);
            if (this.crmcustomermaster_Form.get('metatags').value != null)
                this.formData.metatags = JSON.stringify(this.crmcustomermaster_Form.get('metatags').value);
            this.formData.dob = new Date(this.crmcustomermaster_Form.get('dob').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('dob').value) + '  UTC' : null);
            if (this.crmcustomermaster_Form.get('address').value != null)
                this.formData.address = JSON.stringify(this.crmcustomermaster_Form.get('address').value);
            if (this.crmcustomermaster_Form.get('shippingaddress').value != null)
                this.formData.shippingaddress = JSON.stringify(this.crmcustomermaster_Form.get('shippingaddress').value);
            this.formData.asondate = new Date(this.crmcustomermaster_Form.get('asondate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('asondate').value) + '  UTC' : null);
            this.formData.accountstartfrom = new Date(this.crmcustomermaster_Form.get('accountstartfrom').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('accountstartfrom').value) + '  UTC' : null);
            this.formData.slastartdate = new Date(this.crmcustomermaster_Form.get('slastartdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('slastartdate').value) + '  UTC' : null);
            this.formData.slaenddate = new Date(this.crmcustomermaster_Form.get('slaenddate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('slaenddate').value) + '  UTC' : null);
            this.formData.lastorderdate = new Date(this.crmcustomermaster_Form.get('lastorderdate').value ? this.ngbDateParserFormatter.format(this.crmcustomermaster_Form.get('lastorderdate').value) + '  UTC' : null);
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_crmcustomeraccountmaster_IDs = this.Deleted_crmcustomeraccountmaster_IDs;
            this.formData.Deleted_crmcustomerkycmaster_IDs = this.Deleted_crmcustomerkycmaster_IDs;
            if (this.thumbnail.getAttachmentList() != null)
                this.formData.thumbnail = JSON.stringify(this.thumbnail.getAttachmentList());
            if (this.thumbnail.getAttachmentList() != null)
                this.formData.thumbnail = JSON.stringify(this.thumbnail.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.crmcustomermaster_service.saveOrUpdate_crmcustomermasters(this.formData, (_b = (_a = this.tbl_crmcustomeraccountmasters) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_crmcustomerkycmasters) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.thumbnail.getAllFiles());
                yield this.sharedService.upload(this.companylogo.getAllFiles());
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_crmcustomeraccountmasters.source) {
                    for (let i = 0; i < this.tbl_crmcustomeraccountmasters.source.data.length; i++) {
                        if (this.tbl_crmcustomeraccountmasters.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_crmcustomeraccountmasters.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_crmcustomerkycmasters.source) {
                    for (let i = 0; i < this.tbl_crmcustomerkycmasters.source.data.length; i++) {
                        if (this.tbl_crmcustomerkycmasters.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_crmcustomerkycmasters.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.crmcustomermaster);
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
                        this.objvalues.push(res.crmcustomermaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.crmcustomermaster_Form.markAsUntouched();
                this.crmcustomermaster_Form.markAsPristine();
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
        this.tbl_crmcustomeraccountmasters.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
        this.tbl_crmcustomerkycmasters.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
    }
    AddOrEdit_crmcustomeraccountmaster(event, accountid, customerid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_crmcustomeraccountmaster_crmcustomeraccountmaster_component__WEBPACK_IMPORTED_MODULE_5__.crmcustomeraccountmasterComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, accountid, customerid, visiblelist: this.crmcustomeraccountmasters_visiblelist, hidelist: this.crmcustomeraccountmasters_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_crmcustomeraccountmasters.source.add(res[i]);
                    }
                    this.tbl_crmcustomeraccountmasters.source.refresh();
                }
                else {
                    this.tbl_crmcustomeraccountmasters.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_crmcustomeraccountmaster(event, childID, i) {
        if (childID != null)
            this.Deleted_crmcustomeraccountmaster_IDs += childID + ",";
        this.tbl_crmcustomeraccountmasters.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_crmcustomerkycmaster(event, kycid, customerid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_crmcustomerkycmaster_crmcustomerkycmaster_component__WEBPACK_IMPORTED_MODULE_7__.crmcustomerkycmasterComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, kycid, customerid, visiblelist: this.crmcustomerkycmasters_visiblelist, hidelist: this.crmcustomerkycmasters_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_crmcustomerkycmasters.source.add(res[i]);
                    }
                    this.tbl_crmcustomerkycmasters.source.refresh();
                }
                else {
                    this.tbl_crmcustomerkycmasters.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_crmcustomerkycmaster(event, childID, i) {
        if (childID != null)
            this.Deleted_crmcustomerkycmaster_IDs += childID + ",";
        this.tbl_crmcustomerkycmasters.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_crmcustomeraccountmasters_Checkbox() {
        debugger;
        if (this.tbl_crmcustomeraccountmasters.source.settings['selectMode'] == 'multi')
            this.tbl_crmcustomeraccountmasters.source.settings['selectMode'] = 'single';
        else
            this.tbl_crmcustomeraccountmasters.source.settings['selectMode'] = 'multi';
        this.tbl_crmcustomeraccountmasters.source.initGrid();
    }
    delete_crmcustomeraccountmasters_All() {
        this.tbl_crmcustomeraccountmasters.source.settings['selectMode'] = 'single';
    }
    show_crmcustomeraccountmasters_Filter() {
        setTimeout(() => {
            //  this.Set_crmcustomeraccountmasters_TableDropDownConfig();
        });
        if (this.tbl_crmcustomeraccountmasters.source.settings != null)
            this.tbl_crmcustomeraccountmasters.source.settings['hideSubHeader'] = !this.tbl_crmcustomeraccountmasters.source.settings['hideSubHeader'];
        this.tbl_crmcustomeraccountmasters.source.initGrid();
    }
    show_crmcustomeraccountmasters_InActive() {
    }
    enable_crmcustomeraccountmasters_InActive() {
    }
    Set_crmcustomeraccountmasters_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_crmcustomeraccountmasters) {
                var clone = this.sharedService.clone(this.tbl_crmcustomeraccountmasters.source.settings);
                if (clone.columns['customerid'] != undefined)
                    clone.columns['customerid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_customerid.value)), }, };
                if (clone.columns['customerid'] != undefined)
                    clone.columns['customerid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_customerid.value)), }, };
                this.tbl_crmcustomeraccountmasters.source.settings = clone;
                this.tbl_crmcustomeraccountmasters.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_crmcustomeraccountmasters.source.settings);
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_productid.value)), }, };
                if (clone.columns['productid'] != undefined)
                    clone.columns['productid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_productid.value)), }, };
                this.tbl_crmcustomeraccountmasters.source.settings = clone;
                this.tbl_crmcustomeraccountmasters.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_crmcustomeraccountmasters.source.settings);
                if (clone.columns['holdingtype'] != undefined)
                    clone.columns['holdingtype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_holdingtype.value)), }, };
                if (clone.columns['holdingtype'] != undefined)
                    clone.columns['holdingtype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_holdingtype.value)), }, };
                this.tbl_crmcustomeraccountmasters.source.settings = clone;
                this.tbl_crmcustomeraccountmasters.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_crmcustomeraccountmasters.source.settings);
                if (clone.columns['customerholding'] != undefined)
                    clone.columns['customerholding'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_customerholding.value)), }, };
                if (clone.columns['customerholding'] != undefined)
                    clone.columns['customerholding'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomeraccountmasters_customerholding.value)), }, };
                this.tbl_crmcustomeraccountmasters.source.settings = clone;
                this.tbl_crmcustomeraccountmasters.source.initGrid();
            }
            this.bfilterPopulate_crmcustomeraccountmasters = true;
        });
    }
    crmcustomeraccountmasters_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_crmcustomeraccountmasters_TableConfig() {
        this.crmcustomeraccountmasters_settings = {
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
                custom: this.crmcustomeraccountmaster_menuactions
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
                productiddesc: {
                    title: 'Product',
                    type: 'html',
                    filter: true,
                },
                accountopendate: {
                    title: 'Account Open Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                holdingtypedesc: {
                    title: 'Holding Type',
                    type: 'html',
                    filter: true,
                },
                customerholdingdesc: {
                    title: 'Customer Holding',
                    type: 'html',
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
    crmcustomeraccountmasters_LoadTable(crmcustomeraccountmasters = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomeraccountmasters_ID) >= 0) {
            if (this.tbl_crmcustomeraccountmasters != undefined)
                this.tbl_crmcustomeraccountmasters.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
            if (this.tbl_crmcustomeraccountmasters != undefined)
                this.tbl_crmcustomeraccountmasters.source.load(crmcustomeraccountmasters);
            if (this.tbl_crmcustomeraccountmasters != undefined)
                this.tbl_crmcustomeraccountmasters.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    crmcustomeraccountmasters_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.crmcustomermaster_service.crmcustomeraccountmasters.length == 0)
    {
        this.tbl_crmcustomeraccountmasters.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new crmcustomeraccountmaster();
        this.crmcustomermaster_service.crmcustomeraccountmasters.push(obj);
        this.tbl_crmcustomeraccountmasters.source.refresh();
        if ((this.crmcustomermaster_service.crmcustomeraccountmasters.length / this.tbl_crmcustomeraccountmasters.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_crmcustomeraccountmasters.source.getPaging().page)
        {
            this.tbl_crmcustomeraccountmasters.source.setPage((this.crmcustomermaster_service.crmcustomeraccountmasters.length / this.tbl_crmcustomeraccountmasters.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_crmcustomeraccountmasters.source.grid.edit(this.tbl_crmcustomeraccountmasters.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_crmcustomeraccountmasters.source.data.indexOf(event.data);
    this.onDelete_crmcustomeraccountmaster(event,event.data.accountid,((this.tbl_crmcustomeraccountmasters.source.getPaging().page-1) *this.tbl_crmcustomeraccountmasters.source.getPaging().perPage)+index);
    this.tbl_crmcustomeraccountmasters.source.refresh();
    break;
    }
    }
    
    */
    crmcustomeraccountmasters_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_crmcustomeraccountmaster(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_crmcustomeraccountmaster(event, event.data.accountid, this.formid);
                break;
            case 'delete':
                this.onDelete_crmcustomeraccountmaster(event, event.data.accountid, ((this.tbl_crmcustomeraccountmasters.source.getPaging().page - 1) * this.tbl_crmcustomeraccountmasters.source.getPaging().perPage) + event.index);
                this.tbl_crmcustomeraccountmasters.source.refresh();
                break;
        }
    }
    crmcustomeraccountmasters_onDelete(obj) {
        let accountid = obj.data.accountid;
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomermaster_service.delete_crmcustomermaster(accountid).then(res => this.crmcustomeraccountmasters_LoadTable());
        }
    }
    onCustom_crmcustomeraccountmasters_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "crmcustomeraccountmasters");
            let formname = objbomenuaction.actionname;
        });
    }
    crmcustomeraccountmasters_Paging(val) {
        debugger;
        this.tbl_crmcustomeraccountmasters.source.setPaging(1, val, true);
    }
    handle_crmcustomeraccountmasters_GridSelected(event) {
        this.crmcustomeraccountmasters_selectedindex = this.tbl_crmcustomeraccountmasters.source.findIndex(i => i.accountid === event.data.accountid);
    }
    Is_crmcustomeraccountmasters_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomeraccountmasters_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_crmcustomerkycmasters_Checkbox() {
        debugger;
        if (this.tbl_crmcustomerkycmasters.source.settings['selectMode'] == 'multi')
            this.tbl_crmcustomerkycmasters.source.settings['selectMode'] = 'single';
        else
            this.tbl_crmcustomerkycmasters.source.settings['selectMode'] = 'multi';
        this.tbl_crmcustomerkycmasters.source.initGrid();
    }
    delete_crmcustomerkycmasters_All() {
        this.tbl_crmcustomerkycmasters.source.settings['selectMode'] = 'single';
    }
    show_crmcustomerkycmasters_Filter() {
        setTimeout(() => {
            //  this.Set_crmcustomerkycmasters_TableDropDownConfig();
        });
        if (this.tbl_crmcustomerkycmasters.source.settings != null)
            this.tbl_crmcustomerkycmasters.source.settings['hideSubHeader'] = !this.tbl_crmcustomerkycmasters.source.settings['hideSubHeader'];
        this.tbl_crmcustomerkycmasters.source.initGrid();
    }
    show_crmcustomerkycmasters_InActive() {
    }
    enable_crmcustomerkycmasters_InActive() {
    }
    Set_crmcustomerkycmasters_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_crmcustomerkycmasters) {
                var clone = this.sharedService.clone(this.tbl_crmcustomerkycmasters.source.settings);
                if (clone.columns['customerid'] != undefined)
                    clone.columns['customerid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomerkycmasters_customerid.value)), }, };
                if (clone.columns['customerid'] != undefined)
                    clone.columns['customerid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomerkycmasters_customerid.value)), }, };
                this.tbl_crmcustomerkycmasters.source.settings = clone;
                this.tbl_crmcustomerkycmasters.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_crmcustomerkycmasters.source.settings);
                if (clone.columns['identityname'] != undefined)
                    clone.columns['identityname'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomerkycmasters_identityname.value)), }, };
                if (clone.columns['identityname'] != undefined)
                    clone.columns['identityname'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_crmcustomerkycmasters_identityname.value)), }, };
                this.tbl_crmcustomerkycmasters.source.settings = clone;
                this.tbl_crmcustomerkycmasters.source.initGrid();
            }
            this.bfilterPopulate_crmcustomerkycmasters = true;
        });
    }
    crmcustomerkycmasters_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_crmcustomerkycmasters_TableConfig() {
        this.crmcustomerkycmasters_settings = {
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
                custom: this.crmcustomerkycmaster_menuactions
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
                identitynamedesc: {
                    title: 'Identity Name',
                    type: 'html',
                    filter: true,
                },
                identitynumber: {
                    title: 'Identity Number',
                    type: '',
                    filter: true,
                },
                issuedate: {
                    title: 'Issue Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                expirydate: {
                    title: 'Expiry Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                renewalrequired: {
                    title: 'Renewal Required',
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
    crmcustomerkycmasters_LoadTable(crmcustomerkycmasters = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomerkycmasters_ID) >= 0) {
            if (this.tbl_crmcustomerkycmasters != undefined)
                this.tbl_crmcustomerkycmasters.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_17__.LocalDataSource();
            if (this.tbl_crmcustomerkycmasters != undefined)
                this.tbl_crmcustomerkycmasters.source.load(crmcustomerkycmasters);
            if (this.tbl_crmcustomerkycmasters != undefined)
                this.tbl_crmcustomerkycmasters.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    crmcustomerkycmasters_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.crmcustomermaster_service.crmcustomerkycmasters.length == 0)
    {
        this.tbl_crmcustomerkycmasters.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new crmcustomerkycmaster();
        this.crmcustomermaster_service.crmcustomerkycmasters.push(obj);
        this.tbl_crmcustomerkycmasters.source.refresh();
        if ((this.crmcustomermaster_service.crmcustomerkycmasters.length / this.tbl_crmcustomerkycmasters.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_crmcustomerkycmasters.source.getPaging().page)
        {
            this.tbl_crmcustomerkycmasters.source.setPage((this.crmcustomermaster_service.crmcustomerkycmasters.length / this.tbl_crmcustomerkycmasters.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_crmcustomerkycmasters.source.grid.edit(this.tbl_crmcustomerkycmasters.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_crmcustomerkycmasters.source.data.indexOf(event.data);
    this.onDelete_crmcustomerkycmaster(event,event.data.kycid,((this.tbl_crmcustomerkycmasters.source.getPaging().page-1) *this.tbl_crmcustomerkycmasters.source.getPaging().perPage)+index);
    this.tbl_crmcustomerkycmasters.source.refresh();
    break;
    }
    }
    
    */
    crmcustomerkycmasters_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_crmcustomerkycmaster(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_crmcustomerkycmaster(event, event.data.kycid, this.formid);
                break;
            case 'delete':
                this.onDelete_crmcustomerkycmaster(event, event.data.kycid, ((this.tbl_crmcustomerkycmasters.source.getPaging().page - 1) * this.tbl_crmcustomerkycmasters.source.getPaging().perPage) + event.index);
                this.tbl_crmcustomerkycmasters.source.refresh();
                break;
        }
    }
    crmcustomerkycmasters_onDelete(obj) {
        let kycid = obj.data.kycid;
        if (confirm('Are you sure to delete this record ?')) {
            this.crmcustomermaster_service.delete_crmcustomermaster(kycid).then(res => this.crmcustomerkycmasters_LoadTable());
        }
    }
    onCustom_crmcustomerkycmasters_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "crmcustomerkycmasters");
            let formname = objbomenuaction.actionname;
        });
    }
    crmcustomerkycmasters_Paging(val) {
        debugger;
        this.tbl_crmcustomerkycmasters.source.setPaging(1, val, true);
    }
    handle_crmcustomerkycmasters_GridSelected(event) {
        this.crmcustomerkycmasters_selectedindex = this.tbl_crmcustomerkycmasters.source.findIndex(i => i.kycid === event.data.kycid);
    }
    Is_crmcustomerkycmasters_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.crmcustomerkycmasters_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
crmcustomermasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_18__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_19__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_20__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_21__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_11__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_22__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_23__.DialogService },
    { type: _service_crmcustomermaster_service__WEBPACK_IMPORTED_MODULE_1__.crmcustomermasterService },
    { type: _service_crmcustomeraccountmaster_service__WEBPACK_IMPORTED_MODULE_6__.crmcustomeraccountmasterService },
    { type: _service_crmcustomerkycmaster_service__WEBPACK_IMPORTED_MODULE_8__.crmcustomerkycmasterService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_24__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_9__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_10__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_13__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_25__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_21__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_26__.NgxSpinnerService }
];
crmcustomermasterComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.ViewChild, args: ['customform', { static: false },] }],
    tbl_crmcustomeraccountmasters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.ViewChild, args: ['tbl_crmcustomeraccountmasters', { static: false },] }],
    tbl_crmcustomerkycmasters: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.ViewChild, args: ['tbl_crmcustomerkycmasters', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.ViewChild, args: ['fileattachment', { static: false },] }],
    thumbnail: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.ViewChild, args: ['thumbnail', { static: false },] }],
    companylogo: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_14__.ViewChild, args: ['companylogo', { static: false },] }]
};
crmcustomermasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_16__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_14__.Component)({
        selector: 'app-crmcustomermaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_crmcustomermaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_20__.KeyboardShortcutsService]
    })
], crmcustomermasterComponent);



/***/ }),

/***/ 13608:
/*!***************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.module.ts ***!
  \***************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomermasterModule": () => (/* binding */ crmcustomermasterModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _crmcustomermaster_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./crmcustomermaster.routing */ 60929);
/* harmony import */ var _crmcustomermaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./crmcustomermaster.component */ 7908);






let crmcustomermasterModule = class crmcustomermasterModule {
};
crmcustomermasterModule = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _crmcustomermaster_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_5__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_crmcustomermaster_component__WEBPACK_IMPORTED_MODULE_3__.crmcustomermasterComponent]
    })
], crmcustomermasterModule);



/***/ }),

/***/ 60929:
/*!****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.routing.ts ***!
  \****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _crmcustomermaster_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./crmcustomermaster.component */ 7908);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'crmcustomermasters', children: [
            { path: '', component: _crmcustomermaster_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomermasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _crmcustomermaster_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomermasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _crmcustomermaster_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomermasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _crmcustomermaster_component__WEBPACK_IMPORTED_MODULE_0__.crmcustomermasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 71661:
/*!******************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/crmcustomermaster.service.ts ***!
  \******************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "crmcustomermasterService": () => (/* binding */ crmcustomermasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ 98636);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);






let crmcustomermasterService = class crmcustomermasterService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_crmcustomermasters(formData, crmcustomeraccountmasters, crmcustomerkycmasters) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { crmcustomeraccountmasters: crmcustomeraccountmasters.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), crmcustomerkycmasters: crmcustomerkycmasters.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomermaster', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomermaster' + '/getdefaultdata').toPromise();
        }
    }
    get_crmcustomermasters_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomermaster').toPromise();
        }
    }
    getListBy_customerid(customerid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomermaster' + '/customerid/' + customerid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomermaster' + '/param/' + key).toPromise();
        }
    }
    get_crmcustomermasters_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomermaster' + '/e/' + id).toPromise();
        }
    }
    get_crmcustomermasters_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomermaster' + '/' + id).toPromise();
        }
    }
    delete_crmcustomermaster(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomermaster' + '/' + id).toPromise();
        }
    }
    search(filter = { name: '' }, page = 1) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/crmcustomermaster')
            .pipe((0,rxjs_operators__WEBPACK_IMPORTED_MODULE_2__.tap)((response) => {
            console.log(response);
            //debugger;
            var response1;
            response1 = response;
            response.results = response1.map(crmcustomermaster => new crmcustomermaster(crmcustomermaster.customerid, crmcustomermaster.basebranchid, crmcustomermaster.basebranchiddesc, crmcustomermaster.customertype, crmcustomermaster.customertypedesc, crmcustomermaster.customergroup, crmcustomermaster.customergroupdesc, crmcustomermaster.categoryid, crmcustomermaster.categoryiddesc, crmcustomermaster.subcategoryid, crmcustomermaster.subcategoryiddesc, crmcustomermaster.territory, crmcustomermaster.territorydesc, crmcustomermaster.customercode, crmcustomermaster.companyname, crmcustomermaster.companytype, crmcustomermaster.companytypedesc, crmcustomermaster.incorporationdate, crmcustomermaster.businesssegment, crmcustomermaster.businesssegmentdesc, crmcustomermaster.companylogo, crmcustomermaster.thumbnail, crmcustomermaster.website, crmcustomermaster.mobilenumber, crmcustomermaster.officephone, crmcustomermaster.email, crmcustomermaster.metatags, crmcustomermaster.firstname, crmcustomermaster.lastname, crmcustomermaster.gender, crmcustomermaster.genderdesc, crmcustomermaster.dob, crmcustomermaster.emailid, crmcustomermaster.residencephone, crmcustomermaster.relationshipmanager, crmcustomermaster.relationshipmanagerdesc, crmcustomermaster.address, crmcustomermaster.shippingaddress, crmcustomermaster.billingcurrency, crmcustomermaster.billingcurrencydesc, crmcustomermaster.openingbalance, crmcustomermaster.asondate, crmcustomermaster.creditdays, crmcustomermaster.creditlimit, crmcustomermaster.accountstartfrom, crmcustomermaster.servicelevel, crmcustomermaster.slastartdate, crmcustomermaster.slaenddate, crmcustomermaster.gstregistrationtype, crmcustomermaster.gstregistrationtypedesc, crmcustomermaster.gstinnumber, crmcustomermaster.pannumber, crmcustomermaster.trnnumber, crmcustomermaster.tan, crmcustomermaster.cst, crmcustomermaster.salestax, crmcustomermaster.servicetax, crmcustomermaster.tin, crmcustomermaster.localtax, crmcustomermaster.itfilings, crmcustomermaster.lifetimevalue, crmcustomermaster.averageordervalue, crmcustomermaster.totalorders, crmcustomermaster.totalordervalue, crmcustomermaster.lastorderdate, crmcustomermaster.lastordervalue, crmcustomermaster.loyaltynumber, crmcustomermaster.pointsearned, crmcustomermaster.activepoints, crmcustomermaster.usedpoints, crmcustomermaster.expiredpoints, crmcustomermaster.lockedpoints, crmcustomermaster.blockedpoints, crmcustomermaster.pointsearnedincurrency, crmcustomermaster.activepointsincurrency, crmcustomermaster.usedpointsincurrency, crmcustomermaster.expiredpointsincurrency, crmcustomermaster.lockedpointsincurrency, crmcustomermaster.blockedpointsincurrency, crmcustomermaster.allocationmethod, crmcustomermaster.allocationmethoddesc, crmcustomermaster.customfield, crmcustomermaster.attachment, crmcustomermaster.cifnumber, crmcustomermaster.outstandingamt, crmcustomermaster.status, "", ""))
                // Not filtering in the server since in-memory-web-api has somewhat restricted api
                .filter(crmcustomermaster => crmcustomermaster.lastname.includes(filter.name));
            return response;
        }));
    }
    getList_basebranchid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_basebranchid').toPromise();
    }
    getList_customertype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_customertype/').toPromise();
    }
    getList_customergroup() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_customergroup/').toPromise();
    }
    getList_categoryid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_categoryid').toPromise();
    }
    getList_subcategoryid(categoryid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_subcategoryid/categoryid').toPromise();
    }
    getList_territory() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_territory').toPromise();
    }
    getList_companytype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_companytype/').toPromise();
    }
    getList_businesssegment() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_businesssegment/').toPromise();
    }
    getList_gender() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_gender/').toPromise();
    }
    getList_relationshipmanager() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_relationshipmanager').toPromise();
    }
    getList_billingcurrency() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_billingcurrency/').toPromise();
    }
    getList_gstregistrationtype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_gstregistrationtype/').toPromise();
    }
    getList_allocationmethod() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/crmcustomermaster' + '/getList_allocationmethod/').toPromise();
    }
};
crmcustomermasterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_3__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
crmcustomermasterService = (0,tslib__WEBPACK_IMPORTED_MODULE_4__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_5__.Injectable)({
        providedIn: 'root'
    })
], crmcustomermasterService);



/***/ }),

/***/ 29710:
/*!***********************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/crmcustomermaster/crmcustomermaster.component.html ***!
  \***********************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"crmcustomermaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'Customer Master' | translate}}</a>\r\n    </h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_crmcustomermasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of crmcustomermaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.customerid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.customerid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='General Details' [selected]='true'>\r\n\r\n\r\n              <!--basebranchid-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('basebranchid') == -1) && (basebranchidvisible==undefined || basebranchidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"basebranchid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_basebranchid(null)\">Base Branch</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"basebranchid_List\"\r\n                    [optionsEvent]=\"basebranchid_optionsEvent\" [form]=\"bobranchmaster\"\r\n                    (selectItem)=\"onSelected_basebranchid($event)\" [reportid]='bxg94' [menuid]='bxg94'\r\n                    formControlName=\"basebranchid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.basebranchiddesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--customertype-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('customertype') == -1) && (customertypevisible==undefined || customertypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"customertype\" class=\"control-label\">Customer Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"customertype\" (change)=\"customertype_onChange($event.target)\"\r\n                    formControlName=\"customertype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of customertype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.customertypedesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--customergroup-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('customergroup') == -1) && (customergroupvisible==undefined || customergroupvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"customergroup\" class=\"control-label\">Customer Group</label>\r\n                  <select *ngIf=\"!showview\" id=\"customergroup\" (change)=\"customergroup_onChange($event.target)\"\r\n                    formControlName=\"customergroup\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of customergroup_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.customergroupdesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--categoryid-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('categoryid') == -1) && (categoryidvisible==undefined || categoryidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"categoryid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_categoryid(null)\" (click)=\"AddOrEdit_categoryid(null)\">Category</label>\r\n                  <select *ngIf=\"!showview\" id=\"categoryid\" (change)=\"categoryid_onChange($event.target)\"\r\n                    formControlName=\"categoryid\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of categoryid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.categoryiddesc?.value}}</label>\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--subcategoryid-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('subcategoryid') == -1) && (subcategoryidvisible==undefined || subcategoryidvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"subcategoryid\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_subcategoryid(null)\">Sub Category</label>\r\n                  <select *ngIf=\"!showview\" id=\"subcategoryid\" (change)=\"subcategoryid_onChange($event.target)\"\r\n                    formControlName=\"subcategoryid\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of subcategoryid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.subcategoryiddesc?.value}}</label>\r\n                </div>\r\n\r\n\r\n                <!--territory-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('territory') == -1) && (territoryvisible==undefined || territoryvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"territory\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_territory(null)\" (click)=\"AddOrEdit_territory(null)\">Territory</label>\r\n                  <select *ngIf=\"!showview\" id=\"territory\" (change)=\"territory_onChange($event.target)\"\r\n                    formControlName=\"territory\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of territory_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.territorydesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('customercode') == -1) && (customercodevisible==undefined || customercodevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"customercode\" class=\"control-label\">Customer Code</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.customercode?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"customercode\" readonly formControlName=\"customercode\"\r\n                    class=\"form-control\">\r\n                  <ngx-barcode [bc-value]='f.customercode.value' [bc-display-value]='true'></ngx-barcode>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('companyname') == -1) && (companynamevisible==undefined || companynamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"companyname\" class=\"control-label\">Company Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.companyname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"companyname\" formControlName=\"companyname\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n\r\n\r\n              <!--companytype-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('companytype') == -1) && (companytypevisible==undefined || companytypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"companytype\" class=\"control-label\">Company Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"companytype\" (change)=\"companytype_onChange($event.target)\"\r\n                    formControlName=\"companytype\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of companytype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.companytypedesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('incorporationdate') == -1) && (incorporationdatevisible==undefined || incorporationdatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"incorporationdate\" class=\"control-label\">Incorporation Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.incorporationdate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #incorporationdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"incorporationdateformpicker\"\r\n                      id=\"incorporationdate\" formControlName=\"incorporationdate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"incorporationdateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <!--businesssegment-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('businesssegment') == -1) && (businesssegmentvisible==undefined || businesssegmentvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"businesssegment\" class=\"control-label\">Segment</label>\r\n                  <select *ngIf=\"!showview\" id=\"businesssegment\" (change)=\"businesssegment_onChange($event.target)\"\r\n                    formControlName=\"businesssegment\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of businesssegment_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.businesssegmentdesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('companylogo') == -1) && (companylogovisible==undefined || companylogovisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"companylogo\" class=\"control-label\">Logo</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.companylogo?.value[0]?.name}}</label>\r\n                  <app-attachment #companylogo formControlName=\"companylogo\" [showremove]='bmyrecord'\r\n                    [SessionData]=\"sessionData\"></app-attachment>\r\n                  <button type=\"button\" class=\"btn\" *ngIf=\"companylogo.getAttachmentList().length > 0\"\r\n                    (click)=\"getcompanylogo()\">Open File</button>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('thumbnail') == -1) && (thumbnailvisible==undefined || thumbnailvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"thumbnail\" class=\"control-label\">Thumbnail</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.thumbnail?.value[0]?.name}}</label>\r\n                  <app-attachment #thumbnail formControlName=\"thumbnail\" [showremove]='bmyrecord'\r\n                    [SessionData]=\"sessionData\"></app-attachment>\r\n                  <button type=\"button\" class=\"btn\" *ngIf=\"thumbnail.getAttachmentList().length > 0\"\r\n                    (click)=\"getthumbnail()\">Open File</button>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('website') == -1) && (websitevisible==undefined || websitevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"website\" class=\"control-label\">Website</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.website?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"website\" formControlName=\"website\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('mobilenumber') == -1) && (mobilenumbervisible==undefined || mobilenumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"mobilenumber\" class=\"control-label\">Mobile Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.mobilenumber?.value}}</label>\r\n                  <int-phone-prefix *ngIf=\"!showview\" id=\"mobilenumber\" formControlName=\"mobilenumber\" [locale]=\"'en'\"\r\n                    [defaultCountry]=\"'ae'\" class=\"form-control telephone\">\r\n                  </int-phone-prefix>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('officephone') == -1) && (officephonevisible==undefined || officephonevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"officephone\" class=\"control-label\">Office Phone</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.officephone?.value}}</label>\r\n                  <int-phone-prefix *ngIf=\"!showview\" id=\"officephone\" formControlName=\"officephone\" [locale]=\"'en'\"\r\n                    [defaultCountry]=\"'ae'\" class=\"form-control telephone\">\r\n                  </int-phone-prefix>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div *ngIf=\"((hidelist.indexOf('email') == -1) && (emailvisible==undefined || emailvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"email\" class=\"control-label\">Email</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.email?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"email\" formControlName=\"email\" class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('metatags') == -1) && (metatagsvisible==undefined || metatagsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"metatags\" class=\"control-label\">Meta Tags</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.metatags?.value}}</label>\r\n                  <tag-input *ngIf=\"!showview\" id=\"metatags\" formControlName=\"metatags\" class=\"form-control\">\r\n                  </tag-input>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Contact Person' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('firstname') == -1) && (firstnamevisible==undefined || firstnamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"firstname\" class=\"control-label\">First Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.firstname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"firstname\" formControlName=\"firstname\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('lastname') == -1) && (lastnamevisible==undefined || lastnamevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"lastname\" class=\"control-label\">Last Name</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.lastname?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"lastname\" formControlName=\"lastname\" class=\"form-control\">\r\n                </div>\r\n\r\n\r\n                <!--gender-->\r\n\r\n                <div *ngIf=\"((hidelist.indexOf('gender') == -1) && (gendervisible==undefined || gendervisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"gender\" class=\"control-label\">Gender</label>\r\n                  <select *ngIf=\"!showview\" id=\"gender\" (change)=\"gender_onChange($event.target)\"\r\n                    formControlName=\"gender\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of gender_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.genderdesc?.value}}</label>\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('dob') == -1) && (dobvisible==undefined || dobvisible==true))\" style=''\r\n                  class=\"col-3 \">\r\n                  <label for=\"dob\" class=\"control-label\">D O B</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.dob?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #dobformpicker=\"ngbDatepicker\" [minDate]='{year: 1950, month:1, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"dobformpicker\" id=\"dob\"\r\n                      formControlName=\"dob\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"dobformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('emailid') == -1) && (emailidvisible==undefined || emailidvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"emailid\" class=\"control-label\">Email</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.emailid?.value}}</label>\r\n                  <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"emailid\" formControlName=\"emailid\"\r\n                    class=\"form-control\">\r\n                  <app-field-error-display [displayError]=\"f.emailid.errors!=null && f.emailid.errors?.email\"\r\n                    errorMsg=\"Enter valid email\">\r\n                  </app-field-error-display>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('residencephone') == -1) && (residencephonevisible==undefined || residencephonevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"residencephone\" class=\"control-label\">Residence Phone</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.residencephone?.value}}</label>\r\n                  <int-phone-prefix *ngIf=\"!showview\" id=\"residencephone\" formControlName=\"residencephone\"\r\n                    [locale]=\"'en'\" [defaultCountry]=\"'ae'\" class=\"form-control telephone\">\r\n                  </int-phone-prefix>\r\n                </div>\r\n\r\n\r\n                <!--relationshipmanager-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('relationshipmanager') == -1) && (relationshipmanagervisible==undefined || relationshipmanagervisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"relationshipmanager\" class=\"control-label\"\r\n                    (click)=\"AddOrEdit_relationshipmanager(null)\">Relationship Manager</label>\r\n                  <app-popupselect *ngIf=\"!showview\" [options]=\"relationshipmanager_List\"\r\n                    [optionsEvent]=\"relationshipmanager_optionsEvent\" [form]=\"bousermaster\"\r\n                    (selectItem)=\"onSelected_relationshipmanager($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n                    formControlName=\"relationshipmanager\" id=\"value\" desc=\"label\"></app-popupselect>\r\n                  <div class=\"input-group\">\r\n                  </div>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.relationshipmanagerdesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('address') == -1) && (addressvisible==undefined || addressvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"address\" class=\"control-label\">Address</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.address?.value}}</label>\r\n                  <app-address *ngIf=\"!showview\" id=\"address\" formControlName=\"address\">\r\n                  </app-address>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('shippingaddress') == -1) && (shippingaddressvisible==undefined || shippingaddressvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"shippingaddress\" class=\"control-label\">Shipping Address</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.shippingaddress?.value}}</label>\r\n                  <app-address *ngIf=\"!showview\" id=\"shippingaddress\" formControlName=\"shippingaddress\">\r\n                  </app-address>\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Finance Details' [selected]='true'>\r\n\r\n\r\n              <!--billingcurrency-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('billingcurrency') == -1) && (billingcurrencyvisible==undefined || billingcurrencyvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"billingcurrency\" class=\"control-label\">Billing Currency</label>\r\n                  <select *ngIf=\"!showview\" id=\"billingcurrency\" (change)=\"billingcurrency_onChange($event.target)\"\r\n                    formControlName=\"billingcurrency\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of billingcurrency_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.billingcurrencydesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('openingbalance') == -1) && (openingbalancevisible==undefined || openingbalancevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"openingbalance\" class=\"control-label\">Opening Balance</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.openingbalance?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"openingbalance\" formControlName=\"openingbalance\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('asondate') == -1) && (asondatevisible==undefined || asondatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"asondate\" class=\"control-label\">As On Date</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.asondate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #asondateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"asondateformpicker\" id=\"asondate\"\r\n                      formControlName=\"asondate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"asondateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('creditdays') == -1) && (creditdaysvisible==undefined || creditdaysvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"creditdays\" class=\"control-label\">Credit Days</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.creditdays?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"creditdays\" formControlName=\"creditdays\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('creditlimit') == -1) && (creditlimitvisible==undefined || creditlimitvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"creditlimit\" class=\"control-label\">Credit Limit</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.creditlimit?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"creditlimit\" formControlName=\"creditlimit\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('accountstartfrom') == -1) && (accountstartfromvisible==undefined || accountstartfromvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"accountstartfrom\" class=\"control-label\">Account Start From</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.accountstartfrom?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #accountstartfromformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"accountstartfromformpicker\"\r\n                      id=\"accountstartfrom\" formControlName=\"accountstartfrom\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"accountstartfromformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('servicelevel') == -1) && (servicelevelvisible==undefined || servicelevelvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"servicelevel\" class=\"control-label\">Service Level</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.servicelevel?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"servicelevel\" formControlName=\"servicelevel\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('slastartdate') == -1) && (slastartdatevisible==undefined || slastartdatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"slastartdate\" class=\"control-label\">S L A Start Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.slastartdate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #slastartdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"slastartdateformpicker\"\r\n                      id=\"slastartdate\" formControlName=\"slastartdate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"slastartdateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('slaenddate') == -1) && (slaenddatevisible==undefined || slaenddatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"slaenddate\" class=\"control-label\">S L A End Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.slaenddate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #slaenddateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"slaenddateformpicker\"\r\n                      id=\"slaenddate\" formControlName=\"slaenddate\" class=\"form-control\">\r\n                    <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"slaenddateformpicker.toggle()\"\r\n                      type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                  </div>\r\n                </div>\r\n\r\n\r\n                <!--gstregistrationtype-->\r\n\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('gstregistrationtype') == -1) && (gstregistrationtypevisible==undefined || gstregistrationtypevisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"gstregistrationtype\" class=\"control-label\">G S T Registration\r\n                    Type</label>\r\n                  <select *ngIf=\"!showview\" id=\"gstregistrationtype\"\r\n                    (change)=\"gstregistrationtype_onChange($event.target)\" formControlName=\"gstregistrationtype\"\r\n                    class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of gstregistrationtype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.gstregistrationtypedesc?.value}}</label>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('gstinnumber') == -1) && (gstinnumbervisible==undefined || gstinnumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"gstinnumber\" class=\"control-label\">G S T I N Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.gstinnumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"gstinnumber\" formControlName=\"gstinnumber\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('pannumber') == -1) && (pannumbervisible==undefined || pannumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"pannumber\" class=\"control-label\">P A N Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.pannumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"pannumber\" formControlName=\"pannumber\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('trnnumber') == -1) && (trnnumbervisible==undefined || trnnumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"trnnumber\" class=\"control-label\">T R N Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.trnnumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"trnnumber\" formControlName=\"trnnumber\" class=\"form-control\">\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('tan') == -1) && (tanvisible==undefined || tanvisible==true))\" style=''\r\n                  class=\"col-3 \">\r\n                  <label for=\"tan\" class=\"control-label\">T A N</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.tan?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"tan\" formControlName=\"tan\" class=\"form-control\">\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('cst') == -1) && (cstvisible==undefined || cstvisible==true))\" style=''\r\n                  class=\"col-3 \">\r\n                  <label for=\"cst\" class=\"control-label\">C S T</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.cst?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"cst\" formControlName=\"cst\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('salestax') == -1) && (salestaxvisible==undefined || salestaxvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"salestax\" class=\"control-label\">Sales Tax</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.salestax?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"salestax\" formControlName=\"salestax\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('servicetax') == -1) && (servicetaxvisible==undefined || servicetaxvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"servicetax\" class=\"control-label\">Service Tax</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.servicetax?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"servicetax\" formControlName=\"servicetax\" class=\"form-control\">\r\n                </div>\r\n                <div *ngIf=\"((hidelist.indexOf('tin') == -1) && (tinvisible==undefined || tinvisible==true))\" style=''\r\n                  class=\"col-3 \">\r\n                  <label for=\"tin\" class=\"control-label\">T I N</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.tin?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"tin\" formControlName=\"tin\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('localtax') == -1) && (localtaxvisible==undefined || localtaxvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"localtax\" class=\"control-label\">Local Tax</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.localtax?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"localtax\" formControlName=\"localtax\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('itfilings') == -1) && (itfilingsvisible==undefined || itfilingsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"itfilings\" class=\"control-label\">I T Filings</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.itfilings?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"itfilings\" formControlName=\"itfilings\" class=\"form-control\">\r\n                </div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Business Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('lifetimevalue') == -1) && (lifetimevaluevisible==undefined || lifetimevaluevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"lifetimevalue\" class=\"control-label\">Life Time Value</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.lifetimevalue?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"lifetimevalue\" readonly formControlName=\"lifetimevalue\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('averageordervalue') == -1) && (averageordervaluevisible==undefined || averageordervaluevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"averageordervalue\" class=\"control-label\">Average Order Value</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.averageordervalue?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"averageordervalue\" readonly formControlName=\"averageordervalue\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('totalorders') == -1) && (totalordersvisible==undefined || totalordersvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"totalorders\" class=\"control-label\">Total Orders</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.totalorders?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"totalorders\" readonly formControlName=\"totalorders\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('totalordervalue') == -1) && (totalordervaluevisible==undefined || totalordervaluevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"totalordervalue\" class=\"control-label\">Total Order Value</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.totalordervalue?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"totalordervalue\" readonly formControlName=\"totalordervalue\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('lastorderdate') == -1) && (lastorderdatevisible==undefined || lastorderdatevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"lastorderdate\" class=\"control-label\">Last Order Date</label>\r\n                  <label *ngIf=\"showview\"\r\n                    class=\"labelview\">{{ngbDateParserFormatter.format(f.lastorderdate?.value)}}</label>\r\n                  <div class=\"input-group\" *ngIf=\"!showview\">\r\n                    <input #lastorderdateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                      [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"lastorderdateformpicker\"\r\n                      id=\"lastorderdate\" readonly formControlName=\"lastorderdate\" class=\"form-control\">\r\n                  </div>\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('lastordervalue') == -1) && (lastordervaluevisible==undefined || lastordervaluevisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"lastordervalue\" class=\"control-label\">Last Order Value</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.lastordervalue?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"lastordervalue\" readonly formControlName=\"lastordervalue\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('loyaltynumber') == -1) && (loyaltynumbervisible==undefined || loyaltynumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"loyaltynumber\" class=\"control-label\">Loyalty Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.loyaltynumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"loyaltynumber\" formControlName=\"loyaltynumber\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('pointsearned') == -1) && (pointsearnedvisible==undefined || pointsearnedvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"pointsearned\" class=\"control-label\">Points Earned</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.pointsearned?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"pointsearned\" readonly formControlName=\"pointsearned\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('activepoints') == -1) && (activepointsvisible==undefined || activepointsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"activepoints\" class=\"control-label\">Active Points</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.activepoints?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"activepoints\" readonly formControlName=\"activepoints\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('usedpoints') == -1) && (usedpointsvisible==undefined || usedpointsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"usedpoints\" class=\"control-label\">Used Points</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.usedpoints?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"usedpoints\" readonly formControlName=\"usedpoints\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('expiredpoints') == -1) && (expiredpointsvisible==undefined || expiredpointsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"expiredpoints\" class=\"control-label\">Expired Points</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.expiredpoints?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"expiredpoints\" readonly formControlName=\"expiredpoints\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('lockedpoints') == -1) && (lockedpointsvisible==undefined || lockedpointsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"lockedpoints\" class=\"control-label\">Locked Points</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.lockedpoints?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"lockedpoints\" readonly formControlName=\"lockedpoints\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('blockedpoints') == -1) && (blockedpointsvisible==undefined || blockedpointsvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"blockedpoints\" class=\"control-label\">Blocked Points</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.blockedpoints?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"blockedpoints\" readonly formControlName=\"blockedpoints\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('pointsearnedincurrency') == -1) && (pointsearnedincurrencyvisible==undefined || pointsearnedincurrencyvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"pointsearnedincurrency\" class=\"control-label\">Points Earned In Currency</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.pointsearnedincurrency?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"pointsearnedincurrency\" formControlName=\"pointsearnedincurrency\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('activepointsincurrency') == -1) && (activepointsincurrencyvisible==undefined || activepointsincurrencyvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"activepointsincurrency\" class=\"control-label\">Active Points In Currency</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.activepointsincurrency?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"activepointsincurrency\" formControlName=\"activepointsincurrency\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('usedpointsincurrency') == -1) && (usedpointsincurrencyvisible==undefined || usedpointsincurrencyvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"usedpointsincurrency\" class=\"control-label\">Used Points In Currency</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.usedpointsincurrency?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"usedpointsincurrency\" formControlName=\"usedpointsincurrency\"\r\n                    class=\"form-control\">\r\n                </div>\r\n              </div>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('expiredpointsincurrency') == -1) && (expiredpointsincurrencyvisible==undefined || expiredpointsincurrencyvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"expiredpointsincurrency\" class=\"control-label\">Expired Points In Currency</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.expiredpointsincurrency?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"expiredpointsincurrency\" formControlName=\"expiredpointsincurrency\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('lockedpointsincurrency') == -1) && (lockedpointsincurrencyvisible==undefined || lockedpointsincurrencyvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"lockedpointsincurrency\" class=\"control-label\">Locked Points In Currency</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.lockedpointsincurrency?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"lockedpointsincurrency\" formControlName=\"lockedpointsincurrency\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('blockedpointsincurrency') == -1) && (blockedpointsincurrencyvisible==undefined || blockedpointsincurrencyvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"blockedpointsincurrency\" class=\"control-label\">Blocked Points In Currency</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.blockedpointsincurrency?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"blockedpointsincurrency\" formControlName=\"blockedpointsincurrency\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Merchant' [selected]='true'>\r\n\r\n\r\n              <!--allocationmethod-->\r\n\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('allocationmethod') == -1) && (allocationmethodvisible==undefined || allocationmethodvisible==true))\"\r\n                  style='' class=\"col-3\"><label for=\"allocationmethod\" class=\"control-label\">Allocation Method</label>\r\n                  <select *ngIf=\"!showview\" id=\"allocationmethod\" (change)=\"allocationmethod_onChange($event.target)\"\r\n                    formControlName=\"allocationmethod\" class=\"form-control\">\r\n                    <option [ngValue]=\"null\" selected>-Select-</option>\r\n                    <option *ngFor=\"let item of allocationmethod_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n                  </select>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.allocationmethoddesc?.value}}</label>\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <p-accordion [multiple]='true'>\r\n            <p-accordionTab header='Banking Details' [selected]='true'>\r\n              <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('cifnumber') == -1) && (cifnumbervisible==undefined || cifnumbervisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"cifnumber\" class=\"control-label\">C I F Number</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.cifnumber?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"cifnumber\" formControlName=\"cifnumber\" class=\"form-control\">\r\n                </div>\r\n                <div\r\n                  *ngIf=\"((hidelist.indexOf('outstandingamt') == -1) && (outstandingamtvisible==undefined || outstandingamtvisible==true))\"\r\n                  style='' class=\"col-3 \">\r\n                  <label for=\"outstandingamt\" class=\"control-label\">Outstanding Amt</label>\r\n                  <label *ngIf=\"showview\" class=\"labelview\">{{f.outstandingamt?.value}}</label>\r\n                  <input *ngIf=\"!showview\" id=\"outstandingamt\" readonly formControlName=\"outstandingamt\"\r\n                    class=\"form-control\">\r\n                </div>\r\n                <div class=\"col\"></div>\r\n                <div class=\"col\"></div>\r\n              </div>\r\n            </p-accordionTab>\r\n          </p-accordion>\r\n          <div class='full-width'\r\n            *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab header='CustomField' [selected]='false'>\r\n                <div class=\"sticky\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  Custom Fields</div>\r\n                <div class=\"form-group row\"\r\n                  *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n                  <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n                </div>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n          <div class='full-width' *ngIf=\"attachmentVisible\">\r\n            <p-accordion [multiple]='true'>\r\n              <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n                <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\"\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n              </p-accordionTab>\r\n            </p-accordion>\r\n          </div>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Accounts</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table crmcustomeraccountmasters-->\r\n            <div [ngClass]=\"Is_crmcustomeraccountmasters_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Accounts' | translate}}\r\n                <select class='child' id=\"crmcustomeraccountmastersPagingdropdown\"\r\n                  (change)=\"crmcustomeraccountmasters_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"crmcustomeraccountmastertoggleOption();crmcustomeraccountmasters_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showcrmcustomeraccountmastersFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"crmcustomeraccountmasters_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_crmcustomeraccountmasters\r\n                (userRowSelect)=\"handle_crmcustomeraccountmasters_GridSelected($event)\"\r\n                [settings]=\"crmcustomeraccountmasters_settings\"\r\n                (custom)=\"onCustom_crmcustomeraccountmasters_Action($event)\"\r\n                [source]=\"tbl_crmcustomeraccountmasters?.source?.data\"\r\n                (delete)=\"crmcustomeraccountmasters_route($event,'delete')\"\r\n                (deleteConfirm)=\"crmcustomeraccountmasters_route($event,'delete')\"\r\n                (create)=\"crmcustomeraccountmasters_route($event,'create')\"\r\n                (createConfirm)=\"crmcustomeraccountmasters_beforesave($event)\"\r\n                (edit)=\"crmcustomeraccountmasters_route($event,'edit')\"\r\n                (editConfirm)=\"crmcustomeraccountmasters_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table crmcustomeraccountmasters-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">KYC Masters</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table crmcustomerkycmasters-->\r\n            <div [ngClass]=\"Is_crmcustomerkycmasters_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'KYC Masters' | translate}}\r\n                <select class='child' id=\"crmcustomerkycmastersPagingdropdown\"\r\n                  (change)=\"crmcustomerkycmasters_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"crmcustomerkycmastertoggleOption();crmcustomerkycmasters_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showcrmcustomerkycmastersFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"crmcustomerkycmasters_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_crmcustomerkycmasters\r\n                (userRowSelect)=\"handle_crmcustomerkycmasters_GridSelected($event)\"\r\n                [settings]=\"crmcustomerkycmasters_settings\" (custom)=\"onCustom_crmcustomerkycmasters_Action($event)\"\r\n                [source]=\"tbl_crmcustomerkycmasters?.source?.data\"\r\n                (delete)=\"crmcustomerkycmasters_route($event,'delete')\"\r\n                (deleteConfirm)=\"crmcustomerkycmasters_route($event,'delete')\"\r\n                (create)=\"crmcustomerkycmasters_route($event,'create')\"\r\n                (createConfirm)=\"crmcustomerkycmasters_beforesave($event)\"\r\n                (edit)=\"crmcustomerkycmasters_route($event,'edit')\"\r\n                (editConfirm)=\"crmcustomerkycmasters_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table crmcustomerkycmasters-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_crmcustomermaster_crmcustomermaster_module_ts.js.map