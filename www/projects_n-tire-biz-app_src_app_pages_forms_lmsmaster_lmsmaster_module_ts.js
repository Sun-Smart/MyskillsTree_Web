"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_lmsmaster_lmsmaster_module_ts"],{

/***/ 52792:
/*!**************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsmaster/lmsmaster.component.ts ***!
  \**************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsmasterComponent": () => (/* binding */ lmsmasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsmaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./lmsmaster.component.html */ 81599);
/* harmony import */ var _service_lmsmaster_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./../../../service/lmsmaster.service */ 43765);
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
/* harmony import */ var _pages_forms_lmsopportunity_lmsopportunity_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./../../../pages/forms/lmsopportunity/lmsopportunity.component */ 98436);
/* harmony import */ var _service_lmsopportunity_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../service/lmsopportunity.service */ 85095);
/* harmony import */ var _pages_forms_lmscall_lmscall_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../pages/forms/lmscall/lmscall.component */ 41592);
/* harmony import */ var _service_lmscall_service__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../service/lmscall.service */ 63156);
/* harmony import */ var _pages_forms_lmscorporatesecondarycontact_lmscorporatesecondarycontact_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../../pages/forms/lmscorporatesecondarycontact/lmscorporatesecondarycontact.component */ 18248);
/* harmony import */ var _service_lmscorporatesecondarycontact_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../../service/lmscorporatesecondarycontact.service */ 82003);
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


let lmsmasterComponent = class lmsmasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, lmsmaster_service, lmsopportunity_service, lmscall_service, lmscorporatesecondarycontact_service, fb, sharedService, sessionService, toastr, customfieldservice, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.lmsmaster_service = lmsmaster_service;
        this.lmsopportunity_service = lmsopportunity_service;
        this.lmscall_service = lmscall_service;
        this.lmscorporatesecondarycontact_service = lmscorporatesecondarycontact_service;
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
        this.bfilterPopulate_lmsmasters = false;
        this.bfilterPopulate_lmsopportunities = false;
        this.bfilterPopulate_lmscalls = false;
        this.bfilterPopulate_lmscorporatesecondarycontacts = false;
        this.lmsmaster_menuactions = [];
        this.lmsopportunity_menuactions = [];
        this.lmscall_menuactions = [];
        this.lmscorporatesecondarycontact_menuactions = [];
        this.branchid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete
        this.branchlocationid_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete
        this.leadowner_optionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.customFieldVisible = true;
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_14__.AppConstants.AttachmentURL;
        this.URL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_14__.AppConstants.UploadURL;
        this.attachmentlist = [];
        this.fileAttachmentList = [];
        this.attachmentFieldJson = [];
        this.attachmentVisible = true;
        this.companynamevisible = false;
        this.websitevisible = false;
        this.secondarycontactsvisible = false;
        this.Deleted_lmsopportunity_IDs = "";
        this.lmsopportunities_ID = "1";
        this.Deleted_lmscall_IDs = "";
        this.lmscalls_ID = "2";
        this.Deleted_lmscorporatesecondarycontact_IDs = "";
        this.lmscorporatesecondarycontacts_ID = "3";
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
        this.lmsmaster_Form = this.fb.group({
            pk: [null],
            ImageName: [null],
            branchid: [null],
            branchiddesc: [null],
            branchlocationid: [null],
            branchlocationiddesc: [null],
            leadid: [null],
            iscorporate: [null],
            iscorporatedesc: [null],
            companyname: [null],
            leadowner: [null],
            leadownerdesc: [null],
            firstname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.required])],
            lastname: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.required])],
            emailid: [null, _angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.compose([_angular_forms__WEBPACK_IMPORTED_MODULE_17__.Validators.required])],
            companytypeid: [null],
            companytypeiddesc: [null],
            categoryid: [null],
            categoryiddesc: [null],
            subcategoryid: [null],
            subcategoryiddesc: [null],
            groupname: [null],
            groupnamedesc: [null],
            salutation: [null],
            salutationdesc: [null],
            designation: [null],
            designationdesc: [null],
            contactno: [null],
            address: [null],
            website: [null],
            datecreated: [null],
            leadtype: [null],
            leadtypedesc: [null],
            leadsource: [null],
            leadsourcedesc: [null],
            leaddate: [null],
            nextcontactduedate: [null],
            campaignid: [null],
            campaigniddesc: [null],
            rating: [null],
            segment: [null],
            segmentdesc: [null],
            businessvertical: [null],
            businessverticaldesc: [null],
            revenue: [null],
            revenuedesc: [null],
            employees: [null],
            employeesdesc: [null],
            language: [null],
            languagedesc: [null],
            crosssellopportunity: [null],
            successrate: [null],
            businessvalue: [null],
            subscribedemail: [null],
            shippingaddress: [null],
            billingaddress: [null],
            photo: [null],
            thumbnail: [null],
            paymentterms: [null],
            paymenttermsdesc: [null],
            socialmedia: [null],
            leadstatus: [null],
            leadstatusdesc: [null],
            notes: [null],
            customfield: [null],
            attachment: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.lmsmaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.lmsmaster_Form.dirty && this.lmsmaster_Form.touched) {
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
    emailidexists(e) {
        debugger;
        let pos = this.pkList.map(function (e) { return e.emailid.toString().toLowerCase(); }).indexOf(e.target.value.toString().toLowerCase());
        if (pos >= 0 && this.pkList[pos].leadid.toString() != this.formid.toString()) {
            if (confirm("This Email value exists in the database.Do you want to display the record ? ")) {
                this.PopulateScreen(this.pkList[pos].pkcol);
                return true;
            }
            else {
                e.stopPropagation();
                e.preventDefault();
                e.target.focus();
                e.target.markAsDirty();
                return false;
            }
        }
        return true;
    }
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
        let pos = this.pkList.map(function (e) { return e.leadid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.leadid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.leadid && pkDetail) {
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
            let lmsmasterid = null;
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
            this.formid = lmsmasterid;
            //alert(lmsmasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_lmsopportunities_TableConfig();
                setTimeout(() => {
                    //this.Set_lmsopportunities_TableDropDownConfig();
                });
                this.Set_lmscalls_TableConfig();
                setTimeout(() => {
                    //this.Set_lmscalls_TableDropDownConfig();
                });
                this.Set_lmscorporatesecondarycontacts_TableConfig();
                setTimeout(() => {
                    //this.Set_lmscorporatesecondarycontacts_TableDropDownConfig();
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
            this.lmsmaster_service.getDefaultData().then(res => {
                this.branchid_List = res.list_branchid.value;
                this.iscorporate_List = res.list_iscorporate.value;
                this.leadowner_List = res.list_leadowner.value;
                this.companytypeid_List = res.list_companytypeid.value;
                this.categoryid_List = res.list_categoryid.value;
                this.groupname_List = res.list_groupname.value;
                this.salutation_List = res.list_salutation.value;
                this.designation_List = res.list_designation.value;
                this.leadtype_List = res.list_leadtype.value;
                this.leadsource_List = res.list_leadsource.value;
                this.campaignid_List = res.list_campaignid.value;
                this.segment_List = res.list_segment.value;
                this.businessvertical_List = res.list_businessvertical.value;
                this.revenue_List = res.list_revenue.value;
                this.employees_List = res.list_employees.value;
                this.language_List = res.list_language.value;
                this.paymentterms_List = res.list_paymentterms.value;
                this.leadstatus_List = res.list_leadstatus.value;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.lmsmaster_service.get_lmsmasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched 
            this.lmsmaster_Form.markAsUntouched();
            this.lmsmaster_Form.markAsPristine();
        });
    }
    onSelected_branchid(branchidDetail) {
        if (branchidDetail.value && branchidDetail) {
            this.lmsmaster_Form.patchValue({
                branchid: branchidDetail.value,
                branchiddesc: branchidDetail.label,
            });
            this.lmsmaster_service.getList_branchlocationid(branchidDetail.value).then(res => {
                this.branchlocationid_List = res;
            }).catch((err) => { this.spinner.hide(); console.log(err); });
        }
    }
    onSelected_branchlocationid(branchlocationidDetail) {
        if (branchlocationidDetail.value && branchlocationidDetail) {
            this.lmsmaster_Form.patchValue({
                branchlocationid: branchlocationidDetail.value,
                branchlocationiddesc: branchlocationidDetail.label,
            });
        }
    }
    onSelected_leadowner(leadownerDetail) {
        if (leadownerDetail.value && leadownerDetail) {
            this.lmsmaster_Form.patchValue({
                leadowner: leadownerDetail.value,
                leadownerdesc: leadownerDetail.label,
            });
        }
    }
    getphoto() {
        debugger;
        if (this.photo.getAttachmentList().length > 0) {
            let file = this.photo.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }
    getthumbnail() {
        debugger;
        if (this.thumbnail.getAttachmentList().length > 0) {
            let file = this.thumbnail.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }
    resetForm() {
        if (this.lmsmaster_Form != null)
            this.lmsmaster_Form.reset();
        this.lmsmaster_Form.patchValue({
            branchid: this.sessionData.branchid,
            branchiddesc: this.sessionData.branchiddesc,
            leadowner: this.sessionData.userid,
            leadownerdesc: this.sessionData.username,
        });
        this.lmsmaster_Form.patchValue({
            leadowner: this.sessionData.userid,
            datecreated: this.ngbDateParserFormatter.parse(new Date().toString()),
            leaddate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
            nextcontactduedate: this.ngbDateParserFormatter.parse(new Date().toISOString()),
        });
        setTimeout(() => {
            this.lmsopportunities_LoadTable();
            this.lmscalls_LoadTable();
            this.lmscorporatesecondarycontacts_LoadTable();
        });
        this.customfieldservice.reset(document);
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        this.companynamevisible = false;
        this.websitevisible = false;
        this.secondarycontactsvisible = false;
    }
    onDelete() {
        let leadid = this.lmsmaster_Form.get('leadid').value;
        if (leadid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.lmsmaster_service.delete_lmsmaster(leadid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.lmsmaster_Form.patchValue({
            leadid: null
        });
        if (this.formData.leadid != null)
            this.formData.leadid = null;
        for (let i = 0; i < this.tbl_lmsopportunities.source.length; i++) {
            this.tbl_lmsopportunities.source[i].opportunityid = null;
        }
        for (let i = 0; i < this.tbl_lmscalls.source.length; i++) {
            this.tbl_lmscalls.source[i].callid = null;
        }
        for (let i = 0; i < this.tbl_lmscorporatesecondarycontacts.source.length; i++) {
            this.tbl_lmscorporatesecondarycontacts.source[i].secondarycontactid = null;
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
                    else if (key == "datecreated")
                        this.lmsmaster_Form.patchValue({ "datecreated": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "leaddate")
                        this.lmsmaster_Form.patchValue({ "leaddate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "nextcontactduedate")
                        this.lmsmaster_Form.patchValue({ "nextcontactduedate": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (key == "shippingaddress")
                        this.lmsmaster_Form.patchValue({ "shippingaddress": mainscreendata[key] });
                    else if (key == "billingaddress")
                        this.lmsmaster_Form.patchValue({ "billingaddress": mainscreendata[key] });
                    else if (ctrltype == "string") {
                        this.lmsmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.lmsmaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.lmsmaster_Form.controls[key] != undefined) {
                                this.lmsmaster_Form.controls[key].disable({ onlySelf: true });
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
            return this.customfieldservice.getcustomfieldconfigurationsByTable("lmsmasters", this.CustomFormName, "", "", this.customFieldJson).then(res => {
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
    iscorporate_onChange(evt) {
        let e = this.f.iscorporate.value;
        this.secondarycontactsvisible = false;
        if (this.f.iscorporate.value == 'Y')
            this.secondarycontactsvisible = true;
        this.lmsmaster_Form.patchValue({ iscorporatedesc: evt.options[evt.options.selectedIndex].text });
    }
    leadowner_onChange(evt) {
        let e = evt.value;
    }
    companytypeid_onChange(evt) {
        let e = evt.value;
        this.lmsmaster_Form.patchValue({ companytypeiddesc: evt.options[evt.options.selectedIndex].text });
    }
    categoryid_onChange(evt) {
        let e = evt.value;
        this.lmsmaster_Form.patchValue({ categoryiddesc: evt.options[evt.options.selectedIndex].text });
        setTimeout(() => {
            if (this.f.categoryid.value && this.f.categoryid.value != "" && this.f.categoryid.value != null)
                this.lmsmaster_service.getList_subcategoryid(this.f.categoryid.value).then(res => this.subcategoryid_List = res);
        });
    }
    subcategoryid_onChange(evt) {
        let e = evt.value;
        this.lmsmaster_Form.patchValue({ subcategoryiddesc: evt.options[evt.options.selectedIndex].text });
    }
    groupname_onChange(evt) {
        let e = this.f.groupname.value;
        this.lmsmaster_Form.patchValue({ groupnamedesc: evt.options[evt.options.selectedIndex].text });
    }
    salutation_onChange(evt) {
        let e = this.f.salutation.value;
        this.lmsmaster_Form.patchValue({ salutationdesc: evt.options[evt.options.selectedIndex].text });
    }
    designation_onChange(evt) {
        let e = evt.value;
        this.lmsmaster_Form.patchValue({ designationdesc: evt.options[evt.options.selectedIndex].text });
    }
    leadtype_onChange(evt) {
        let e = this.f.leadtype.value;
        this.lmsmaster_Form.patchValue({ leadtypedesc: evt.options[evt.options.selectedIndex].text });
    }
    leadsource_onChange(evt) {
        let e = this.f.leadsource.value;
        this.lmsmaster_Form.patchValue({ leadsourcedesc: evt.options[evt.options.selectedIndex].text });
    }
    campaignid_onChange(evt) {
        let e = evt.value;
        this.lmsmaster_Form.patchValue({ campaigniddesc: evt.options[evt.options.selectedIndex].text });
    }
    segment_onChange(evt) {
        let e = this.f.segment.value;
        this.lmsmaster_Form.patchValue({ segmentdesc: evt.options[evt.options.selectedIndex].text });
    }
    businessvertical_onChange(evt) {
        let e = this.f.businessvertical.value;
        this.lmsmaster_Form.patchValue({ businessverticaldesc: evt.options[evt.options.selectedIndex].text });
    }
    revenue_onChange(evt) {
        let e = this.f.revenue.value;
        this.lmsmaster_Form.patchValue({ revenuedesc: evt.options[evt.options.selectedIndex].text });
    }
    employees_onChange(evt) {
        let e = this.f.employees.value;
        this.lmsmaster_Form.patchValue({ employeesdesc: evt.options[evt.options.selectedIndex].text });
    }
    language_onChange(evt) {
        let e = this.f.language.value;
        this.lmsmaster_Form.patchValue({ languagedesc: evt.options[evt.options.selectedIndex].text });
    }
    paymentterms_onChange(evt) {
        let e = this.f.paymentterms.value;
        this.lmsmaster_Form.patchValue({ paymenttermsdesc: evt.options[evt.options.selectedIndex].text });
    }
    leadstatus_onChange(evt) {
        let e = this.f.leadstatus.value;
        this.lmsmaster_Form.patchValue({ leadstatusdesc: evt.options[evt.options.selectedIndex].text });
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
    edit_lmsmasters() {
        this.showview = false;
        setTimeout(() => {
            if (this.photo != null && this.photo != undefined)
                this.photo.setattachmentlist(this.lmsmaster_Form.get('photo').value);
            if (this.thumbnail != null && this.thumbnail != undefined)
                this.thumbnail.setattachmentlist(this.lmsmaster_Form.get('thumbnail').value);
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.lmsmaster_service.get_lmsmasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.lmsmaster;
                let formproperty = res.lmsmaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.lmsmaster.pkcol;
                this.formid = res.lmsmaster.leadid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.lmsmaster;
        this.formid = res.lmsmaster.leadid;
        this.pkcol = res.lmsmaster.pkcol;
        this.bmyrecord = false;
        if (res.lmsmaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.lmsmaster_Form.patchValue({
            branchid: res.lmsmaster.branchid,
            branchiddesc: res.lmsmaster.branchiddesc,
            branchlocationid: res.lmsmaster.branchlocationid,
            branchlocationiddesc: res.lmsmaster.branchlocationiddesc,
            leadid: res.lmsmaster.leadid,
            iscorporate: res.lmsmaster.iscorporate,
            iscorporatedesc: res.lmsmaster.iscorporatedesc,
            companyname: res.lmsmaster.companyname,
            leadowner: res.lmsmaster.leadowner,
            leadownerdesc: res.lmsmaster.leadownerdesc,
            firstname: res.lmsmaster.firstname,
            lastname: res.lmsmaster.lastname,
            emailid: res.lmsmaster.emailid,
            companytypeid: res.lmsmaster.companytypeid,
            companytypeiddesc: res.lmsmaster.companytypeiddesc,
            categoryid: res.lmsmaster.categoryid,
            categoryiddesc: res.lmsmaster.categoryiddesc,
            subcategoryid: res.lmsmaster.subcategoryid,
            subcategoryiddesc: res.lmsmaster.subcategoryiddesc,
            groupname: res.lmsmaster.groupname,
            groupnamedesc: res.lmsmaster.groupnamedesc,
            salutation: res.lmsmaster.salutation,
            salutationdesc: res.lmsmaster.salutationdesc,
            designation: res.lmsmaster.designation,
            designationdesc: res.lmsmaster.designationdesc,
            contactno: res.lmsmaster.contactno,
            address: res.lmsmaster.address,
            website: res.lmsmaster.website,
            datecreated: this.ngbDateParserFormatter.parse(res.lmsmaster.datecreated),
            leadtype: res.lmsmaster.leadtype,
            leadtypedesc: res.lmsmaster.leadtypedesc,
            leadsource: res.lmsmaster.leadsource,
            leadsourcedesc: res.lmsmaster.leadsourcedesc,
            leaddate: this.ngbDateParserFormatter.parse(res.lmsmaster.leaddate),
            nextcontactduedate: this.ngbDateParserFormatter.parse(res.lmsmaster.nextcontactduedate),
            campaignid: res.lmsmaster.campaignid,
            campaigniddesc: res.lmsmaster.campaigniddesc,
            rating: res.lmsmaster.rating,
            segment: res.lmsmaster.segment,
            segmentdesc: res.lmsmaster.segmentdesc,
            businessvertical: res.lmsmaster.businessvertical,
            businessverticaldesc: res.lmsmaster.businessverticaldesc,
            revenue: res.lmsmaster.revenue,
            revenuedesc: res.lmsmaster.revenuedesc,
            employees: res.lmsmaster.employees,
            employeesdesc: res.lmsmaster.employeesdesc,
            language: res.lmsmaster.language,
            languagedesc: res.lmsmaster.languagedesc,
            crosssellopportunity: res.lmsmaster.crosssellopportunity,
            successrate: res.lmsmaster.successrate,
            businessvalue: res.lmsmaster.businessvalue,
            subscribedemail: res.lmsmaster.subscribedemail,
            shippingaddress: JSON.parse(res.lmsmaster.shippingaddress),
            billingaddress: JSON.parse(res.lmsmaster.billingaddress),
            photo: JSON.parse(res.lmsmaster.photo),
            thumbnail: JSON.parse(res.lmsmaster.thumbnail),
            paymentterms: res.lmsmaster.paymentterms,
            paymenttermsdesc: res.lmsmaster.paymenttermsdesc,
            socialmedia: res.lmsmaster.socialmedia,
            leadstatus: res.lmsmaster.leadstatus,
            leadstatusdesc: res.lmsmaster.leadstatusdesc,
            notes: res.lmsmaster.notes,
            customfield: res.lmsmaster.customfield,
            attachment: JSON.parse(res.lmsmaster.attachment),
            status: res.lmsmaster.status,
            statusdesc: res.lmsmaster.statusdesc,
        });
        this.companynamevisible = false;
        this.websitevisible = false;
        this.secondarycontactsvisible = false;
        //hide list
        if (res.visiblelist != undefined && res.visiblelist.indexOf("companyname") >= 0)
            this.companynamevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("companyname") >= 0)
            this.companynamevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("website") >= 0)
            this.websitevisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("website") >= 0)
            this.websitevisible = false;
        if (res.visiblelist != undefined && res.visiblelist.indexOf("secondarycontacts") >= 0)
            this.secondarycontactsvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("secondarycontacts") >= 0)
            this.secondarycontactsvisible = false;
        this.lmsmaster_menuactions = res.lmsmaster_menuactions;
        this.lmsopportunity_menuactions = res.lmsopportunity_menuactions;
        this.lmsopportunities_visiblelist = res.lmsopportunities_visiblelist;
        this.lmscall_menuactions = res.lmscall_menuactions;
        this.lmscalls_visiblelist = res.lmscalls_visiblelist;
        this.lmscorporatesecondarycontact_menuactions = res.lmscorporatesecondarycontact_menuactions;
        this.lmscorporatesecondarycontacts_visiblelist = res.lmscorporatesecondarycontacts_visiblelist;
        if (this.lmsmaster_Form.get('customfield').value != null && this.lmsmaster_Form.get('customfield').value != "")
            this.customFieldJson = JSON.parse(this.lmsmaster_Form.get('customfield').value);
        this.FillCustomField();
        if (this.lmsmaster_Form.get('photo').value != null && this.lmsmaster_Form.get('photo').value != "" && this.photo != null && this.photo != undefined)
            this.photo.setattachmentlist(this.lmsmaster_Form.get('photo').value);
        if (this.lmsmaster_Form.get('thumbnail').value != null && this.lmsmaster_Form.get('thumbnail').value != "" && this.thumbnail != null && this.thumbnail != undefined)
            this.thumbnail.setattachmentlist(this.lmsmaster_Form.get('thumbnail').value);
        if (this.lmsmaster_Form.get('attachment').value != null && this.lmsmaster_Form.get('attachment').value != "" && this.fileattachment != null && this.fileattachment != undefined)
            this.fileattachment.setattachmentlist(this.lmsmaster_Form.get('attachment').value);
        setTimeout(() => {
            if (this.f.branchid.value && this.f.branchid.value != "" && this.f.branchid.value != null)
                this.lmsmaster_service.getList_branchlocationid(this.f.branchid.value).then(res => {
                    this.branchlocationid_List = res;
                }).catch((err) => { console.log(err); });
        });
        setTimeout(() => {
            if (this.f.categoryid.value && this.f.categoryid.value != "" && this.f.categoryid.value != null)
                this.lmsmaster_service.getList_subcategoryid(this.f.categoryid.value).then(res => {
                    this.subcategoryid_List = res;
                }).catch((err) => { console.log(err); });
        });
        //Child Tables if any
        this.Set_lmsopportunities_TableConfig();
        this.lmsopportunities_LoadTable(res.lmsopportunities);
        this.Set_lmscalls_TableConfig();
        this.lmscalls_LoadTable(res.lmscalls);
        this.Set_lmscorporatesecondarycontacts_TableConfig();
        this.lmscorporatesecondarycontacts_LoadTable(res.lmscorporatesecondarycontacts);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.lmsmaster_Form.controls) {
            let val = this.lmsmaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.lmsmaster_Form.controls[key] != null) {
                if (key == "photo" || key == "thumbnail") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0)
                        ret = ret.replace(new RegExp('##' + key + '##', 'g'), _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_14__.AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
                }
                else if (key == "rating") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != undefined)
                        ret = ret.replace(new RegExp('##' + key + '##', 'g'), "<div class='Stars' style='--rating:" + this.formData[key] + "></div>");
                }
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
            if (!this.lmsmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            var obj = this.lmsmaster_Form.getRawValue();
            obj.datecreated = new Date(this.lmsmaster_Form.get('datecreated').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('datecreated').value) + '  UTC' : null);
            obj.leaddate = new Date(this.lmsmaster_Form.get('leaddate').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('leaddate').value) + '  UTC' : null);
            obj.nextcontactduedate = new Date(this.lmsmaster_Form.get('nextcontactduedate').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('nextcontactduedate').value) + '  UTC' : null);
            if (this.lmsmaster_Form.get('shippingaddress').value != null)
                obj.shippingaddress = JSON.stringify(this.lmsmaster_Form.get('shippingaddress').value);
            if (this.lmsmaster_Form.get('billingaddress').value != null)
                obj.billingaddress = JSON.stringify(this.lmsmaster_Form.get('billingaddress').value);
            if (customfields != null)
                obj.customfield = JSON.stringify(customfields);
            if (this.photo.getAttachmentList() != null)
                obj.photo = JSON.stringify(this.photo.getAttachmentList());
            if (this.photo.getAttachmentList() != null)
                obj.photo = JSON.stringify(this.photo.getAttachmentList());
            if (this.fileattachment.getAttachmentList() != null)
                obj.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            obj.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(obj);
            if (!confirm('Do you want to want to save?')) {
                return;
            }
            yield this.sharedService.upload(this.photo.getAllFiles());
            yield this.sharedService.upload(this.thumbnail.getAllFiles());
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
            // Object.keys(this.lmsmaster_Form.controls).forEach(key => {
            //   const controlErrors: ValidationErrors = this.lmsmaster_Form.get(key).errors;
            //   if (controlErrors != null) {
            //     Object.keys(controlErrors).forEach(keyError => {
            //       strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //     });
            //   }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.lmsmaster_Form.valid || (this.customform != undefined && this.customform.form != undefined && !this.customform.form.valid)) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.lmsmaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.lmsmaster_Form.controls[key] != null) {
                            this.formData[key] = this.lmsmaster_Form.controls[key].value;
                        }
                    }
                }
            }
            var customfields = this.customfieldservice.getCustomValues(document);
            this.formData.datecreated = new Date(this.lmsmaster_Form.get('datecreated').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('datecreated').value) + '  UTC' : null);
            this.formData.leaddate = new Date(this.lmsmaster_Form.get('leaddate').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('leaddate').value) + '  UTC' : null);
            this.formData.nextcontactduedate = new Date(this.lmsmaster_Form.get('nextcontactduedate').value ? this.ngbDateParserFormatter.format(this.lmsmaster_Form.get('nextcontactduedate').value) + '  UTC' : null);
            if (this.lmsmaster_Form.get('shippingaddress').value != null)
                this.formData.shippingaddress = JSON.stringify(this.lmsmaster_Form.get('shippingaddress').value);
            if (this.lmsmaster_Form.get('billingaddress').value != null)
                this.formData.billingaddress = JSON.stringify(this.lmsmaster_Form.get('billingaddress').value);
            this.formData.photo = this.lmsmaster_Form.get('photo').value;
            this.formData.thumbnail = this.lmsmaster_Form.get('thumbnail').value;
            if (customfields != null)
                this.formData.customfield = JSON.stringify(customfields);
            if (this.fileattachment.getAttachmentList() != null)
                this.formData.attachment = JSON.stringify(this.fileattachment.getAttachmentList());
            this.formData.Deleted_lmsopportunity_IDs = this.Deleted_lmsopportunity_IDs;
            this.formData.Deleted_lmscall_IDs = this.Deleted_lmscall_IDs;
            this.formData.Deleted_lmscorporatesecondarycontact_IDs = this.Deleted_lmscorporatesecondarycontact_IDs;
            if (this.photo.getAttachmentList() != null)
                this.formData.photo = JSON.stringify(this.photo.getAttachmentList());
            if (this.photo.getAttachmentList() != null)
                this.formData.photo = JSON.stringify(this.photo.getAttachmentList());
            this.fileAttachmentList = this.fileattachment.getAllFiles();
            console.log(this.formData);
            this.spinner.show();
            this.lmsmaster_service.saveOrUpdate_lmsmasters(this.formData, (_b = (_a = this.tbl_lmsopportunities) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_lmscalls) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data, (_f = (_e = this.tbl_lmscorporatesecondarycontacts) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.photo.getAllFiles());
                yield this.sharedService.upload(this.thumbnail.getAllFiles());
                yield this.sharedService.upload(this.fileAttachmentList);
                this.attachmentlist = [];
                if (this.fileattachment)
                    this.fileattachment.clear();
                if (this.tbl_lmsopportunities.source) {
                    for (let i = 0; i < this.tbl_lmsopportunities.source.data.length; i++) {
                        if (this.tbl_lmsopportunities.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmsopportunities.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmscalls.source) {
                    for (let i = 0; i < this.tbl_lmscalls.source.data.length; i++) {
                        if (this.tbl_lmscalls.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmscalls.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_lmscorporatesecondarycontacts.source) {
                    for (let i = 0; i < this.tbl_lmscorporatesecondarycontacts.source.data.length; i++) {
                        if (this.tbl_lmscorporatesecondarycontacts.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_lmscorporatesecondarycontacts.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.objvalues.push(res.lmsmaster);
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
                        this.objvalues.push(res.lmsmaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.lmsmaster_Form.markAsUntouched();
                this.lmsmaster_Form.markAsPristine();
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
        this.tbl_lmsopportunities.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
        this.tbl_lmscalls.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
        this.tbl_lmscorporatesecondarycontacts.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
    }
    AddOrEdit_lmsopportunity(event, opportunityid, leadid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmsopportunity_lmsopportunity_component__WEBPACK_IMPORTED_MODULE_5__.lmsopportunityComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, opportunityid, leadid, visiblelist: this.lmsopportunities_visiblelist, hidelist: this.lmsopportunities_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmsopportunities.source.add(res[i]);
                    }
                    this.tbl_lmsopportunities.source.refresh();
                }
                else {
                    this.tbl_lmsopportunities.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmsopportunity(event, childID, i) {
        if (childID != null)
            this.Deleted_lmsopportunity_IDs += childID + ",";
        this.tbl_lmsopportunities.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmscall(event, callid, leadid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmscall_lmscall_component__WEBPACK_IMPORTED_MODULE_7__.lmscallComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, callid, leadid, visiblelist: this.lmscalls_visiblelist, hidelist: this.lmscalls_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmscalls.source.add(res[i]);
                    }
                    this.tbl_lmscalls.source.refresh();
                }
                else {
                    this.tbl_lmscalls.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmscall(event, childID, i) {
        if (childID != null)
            this.Deleted_lmscall_IDs += childID + ",";
        this.tbl_lmscalls.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_lmscorporatesecondarycontact(event, secondarycontactid, leadid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_lmscorporatesecondarycontact_lmscorporatesecondarycontact_component__WEBPACK_IMPORTED_MODULE_9__.lmscorporatesecondarycontactComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, secondarycontactid, leadid, visiblelist: this.lmscorporatesecondarycontacts_visiblelist, hidelist: this.lmscorporatesecondarycontacts_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_lmscorporatesecondarycontacts.source.add(res[i]);
                    }
                    this.tbl_lmscorporatesecondarycontacts.source.refresh();
                }
                else {
                    this.tbl_lmscorporatesecondarycontacts.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_lmscorporatesecondarycontact(event, childID, i) {
        if (childID != null)
            this.Deleted_lmscorporatesecondarycontact_IDs += childID + ",";
        this.tbl_lmscorporatesecondarycontacts.source.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_lmsopportunities_Checkbox() {
        debugger;
        if (this.tbl_lmsopportunities.source.settings['selectMode'] == 'multi')
            this.tbl_lmsopportunities.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmsopportunities.source.settings['selectMode'] = 'multi';
        this.tbl_lmsopportunities.source.initGrid();
    }
    delete_lmsopportunities_All() {
        this.tbl_lmsopportunities.source.settings['selectMode'] = 'single';
    }
    show_lmsopportunities_Filter() {
        setTimeout(() => {
            //  this.Set_lmsopportunities_TableDropDownConfig();
        });
        if (this.tbl_lmsopportunities.source.settings != null)
            this.tbl_lmsopportunities.source.settings['hideSubHeader'] = !this.tbl_lmsopportunities.source.settings['hideSubHeader'];
        this.tbl_lmsopportunities.source.initGrid();
    }
    show_lmsopportunities_InActive() {
    }
    enable_lmsopportunities_InActive() {
    }
    Set_lmsopportunities_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmsopportunities) {
                var clone = this.sharedService.clone(this.tbl_lmsopportunities.source.settings);
                if (clone.columns['leadby'] != undefined)
                    clone.columns['leadby'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_leadby.value)), }, };
                if (clone.columns['leadby'] != undefined)
                    clone.columns['leadby'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_leadby.value)), }, };
                this.tbl_lmsopportunities.source.settings = clone;
                this.tbl_lmsopportunities.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsopportunities.source.settings);
                if (clone.columns['possibilityofclosure'] != undefined)
                    clone.columns['possibilityofclosure'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_possibilityofclosure.value)), }, };
                if (clone.columns['possibilityofclosure'] != undefined)
                    clone.columns['possibilityofclosure'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_possibilityofclosure.value)), }, };
                this.tbl_lmsopportunities.source.settings = clone;
                this.tbl_lmsopportunities.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmsopportunities.source.settings);
                if (clone.columns['nextstep'] != undefined)
                    clone.columns['nextstep'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_nextstep.value)), }, };
                if (clone.columns['nextstep'] != undefined)
                    clone.columns['nextstep'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmsopportunities_nextstep.value)), }, };
                this.tbl_lmsopportunities.source.settings = clone;
                this.tbl_lmsopportunities.source.initGrid();
            }
            this.bfilterPopulate_lmsopportunities = true;
        });
    }
    lmsopportunities_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmsopportunities_TableConfig() {
        this.lmsopportunities_settings = {
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
                opportunitydetail: {
                    title: 'Opportunity Detail',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                possibilityofclosuredesc: {
                    title: 'Possibility Of Closure',
                    type: 'html',
                    filter: true,
                },
            },
        };
    }
    lmsopportunities_LoadTable(lmsopportunities = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsopportunities_ID) >= 0) {
            if (this.tbl_lmsopportunities != undefined)
                this.tbl_lmsopportunities.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
            if (this.tbl_lmsopportunities != undefined)
                this.tbl_lmsopportunities.source.load(lmsopportunities);
            if (this.tbl_lmsopportunities != undefined)
                this.tbl_lmsopportunities.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmsopportunities_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsmaster_service.lmsopportunities.length == 0)
    {
        this.tbl_lmsopportunities.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmsopportunity();
        this.lmsmaster_service.lmsopportunities.push(obj);
        this.tbl_lmsopportunities.source.refresh();
        if ((this.lmsmaster_service.lmsopportunities.length / this.tbl_lmsopportunities.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmsopportunities.source.getPaging().page)
        {
            this.tbl_lmsopportunities.source.setPage((this.lmsmaster_service.lmsopportunities.length / this.tbl_lmsopportunities.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmsopportunities.source.grid.edit(this.tbl_lmsopportunities.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmsopportunities.source.data.indexOf(event.data);
    this.onDelete_lmsopportunity(event,event.data.opportunityid,((this.tbl_lmsopportunities.source.getPaging().page-1) *this.tbl_lmsopportunities.source.getPaging().perPage)+index);
    this.tbl_lmsopportunities.source.refresh();
    break;
    }
    }
    
    */
    lmsopportunities_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmsopportunity(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmsopportunity(event, event.data.opportunityid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmsopportunity(event, event.data.opportunityid, ((this.tbl_lmsopportunities.source.getPaging().page - 1) * this.tbl_lmsopportunities.source.getPaging().perPage) + event.index);
                this.tbl_lmsopportunities.source.refresh();
                break;
        }
    }
    lmsopportunities_onDelete(obj) {
        let opportunityid = obj.data.opportunityid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsmaster_service.delete_lmsmaster(opportunityid).then(res => this.lmsopportunities_LoadTable());
        }
    }
    onCustom_lmsopportunities_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmsopportunities");
            let formname = objbomenuaction.actionname;
        });
    }
    lmsopportunities_Paging(val) {
        debugger;
        this.tbl_lmsopportunities.source.setPaging(1, val, true);
    }
    handle_lmsopportunities_GridSelected(event) {
        this.lmsopportunities_selectedindex = this.tbl_lmsopportunities.source.findIndex(i => i.opportunityid === event.data.opportunityid);
    }
    Is_lmsopportunities_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmsopportunities_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_lmscalls_Checkbox() {
        debugger;
        if (this.tbl_lmscalls.source.settings['selectMode'] == 'multi')
            this.tbl_lmscalls.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmscalls.source.settings['selectMode'] = 'multi';
        this.tbl_lmscalls.source.initGrid();
    }
    delete_lmscalls_All() {
        this.tbl_lmscalls.source.settings['selectMode'] = 'single';
    }
    show_lmscalls_Filter() {
        setTimeout(() => {
            //  this.Set_lmscalls_TableDropDownConfig();
        });
        if (this.tbl_lmscalls.source.settings != null)
            this.tbl_lmscalls.source.settings['hideSubHeader'] = !this.tbl_lmscalls.source.settings['hideSubHeader'];
        this.tbl_lmscalls.source.initGrid();
    }
    show_lmscalls_InActive() {
    }
    enable_lmscalls_InActive() {
    }
    Set_lmscalls_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmscalls) {
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['branchid'] != undefined)
                    clone.columns['branchid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_branchid.value)), }, };
                if (clone.columns['branchid'] != undefined)
                    clone.columns['branchid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_branchid.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['leadid'] != undefined)
                    clone.columns['leadid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadid.value)), }, };
                if (clone.columns['leadid'] != undefined)
                    clone.columns['leadid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadid.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_opportunityid.value)), }, };
                if (clone.columns['opportunityid'] != undefined)
                    clone.columns['opportunityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_opportunityid.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['callid'] != undefined)
                    clone.columns['callid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_callid.value)), }, };
                if (clone.columns['callid'] != undefined)
                    clone.columns['callid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_callid.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['campaignid'] != undefined)
                    clone.columns['campaignid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_campaignid.value)), }, };
                if (clone.columns['campaignid'] != undefined)
                    clone.columns['campaignid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_campaignid.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['leadby'] != undefined)
                    clone.columns['leadby'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadby.value)), }, };
                if (clone.columns['leadby'] != undefined)
                    clone.columns['leadby'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_leadby.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['currentowner'] != undefined)
                    clone.columns['currentowner'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_currentowner.value)), }, };
                if (clone.columns['currentowner'] != undefined)
                    clone.columns['currentowner'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_currentowner.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['activitytype'] != undefined)
                    clone.columns['activitytype'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_activitytype.value)), }, };
                if (clone.columns['activitytype'] != undefined)
                    clone.columns['activitytype'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_activitytype.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_lmscalls.source.settings);
                if (clone.columns['nextaction'] != undefined)
                    clone.columns['nextaction'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_nextaction.value)), }, };
                if (clone.columns['nextaction'] != undefined)
                    clone.columns['nextaction'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscalls_nextaction.value)), }, };
                this.tbl_lmscalls.source.settings = clone;
                this.tbl_lmscalls.source.initGrid();
            }
            this.bfilterPopulate_lmscalls = true;
        });
    }
    lmscalls_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmscalls_TableConfig() {
        this.lmscalls_settings = {
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
                eventdate: {
                    title: 'Event Date',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_4__.SmartTableDatepickerComponent,
                    },
                },
                activitytypedesc: {
                    title: 'Activity Type',
                    type: 'html',
                    filter: true,
                },
                attendedusers: {
                    title: 'Attended Users',
                    type: '',
                    filter: true,
                    valuePrepareFunction: (cell, row) => {
                        let ret = this.sharedService.ParseUserAccess(cell);
                        return ret;
                    },
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
                score: {
                    title: 'Score',
                    type: 'number',
                    filter: true,
                },
            },
        };
    }
    lmscalls_LoadTable(lmscalls = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscalls_ID) >= 0) {
            if (this.tbl_lmscalls != undefined)
                this.tbl_lmscalls.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
            if (this.tbl_lmscalls != undefined)
                this.tbl_lmscalls.source.load(lmscalls);
            if (this.tbl_lmscalls != undefined)
                this.tbl_lmscalls.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmscalls_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsmaster_service.lmscalls.length == 0)
    {
        this.tbl_lmscalls.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmscall();
        this.lmsmaster_service.lmscalls.push(obj);
        this.tbl_lmscalls.source.refresh();
        if ((this.lmsmaster_service.lmscalls.length / this.tbl_lmscalls.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscalls.source.getPaging().page)
        {
            this.tbl_lmscalls.source.setPage((this.lmsmaster_service.lmscalls.length / this.tbl_lmscalls.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmscalls.source.grid.edit(this.tbl_lmscalls.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_lmscalls.source.data.indexOf(event.data);
    this.onDelete_lmscall(event,event.data.callid,((this.tbl_lmscalls.source.getPaging().page-1) *this.tbl_lmscalls.source.getPaging().perPage)+index);
    this.tbl_lmscalls.source.refresh();
    break;
    }
    }
    
    */
    lmscalls_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmscall(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmscall(event, event.data.callid, this.formid);
                break;
            case 'delete':
                this.onDelete_lmscall(event, event.data.callid, ((this.tbl_lmscalls.source.getPaging().page - 1) * this.tbl_lmscalls.source.getPaging().perPage) + event.index);
                this.tbl_lmscalls.source.refresh();
                break;
        }
    }
    lmscalls_onDelete(obj) {
        let callid = obj.data.callid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsmaster_service.delete_lmsmaster(callid).then(res => this.lmscalls_LoadTable());
        }
    }
    onCustom_lmscalls_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmscalls");
            let formname = objbomenuaction.actionname;
        });
    }
    lmscalls_Paging(val) {
        debugger;
        this.tbl_lmscalls.source.setPaging(1, val, true);
    }
    handle_lmscalls_GridSelected(event) {
        this.lmscalls_selectedindex = this.tbl_lmscalls.source.findIndex(i => i.callid === event.data.callid);
    }
    Is_lmscalls_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscalls_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_lmscorporatesecondarycontacts_Checkbox() {
        debugger;
        if (this.tbl_lmscorporatesecondarycontacts.source.settings['selectMode'] == 'multi')
            this.tbl_lmscorporatesecondarycontacts.source.settings['selectMode'] = 'single';
        else
            this.tbl_lmscorporatesecondarycontacts.source.settings['selectMode'] = 'multi';
        this.tbl_lmscorporatesecondarycontacts.source.initGrid();
    }
    delete_lmscorporatesecondarycontacts_All() {
        this.tbl_lmscorporatesecondarycontacts.source.settings['selectMode'] = 'single';
    }
    show_lmscorporatesecondarycontacts_Filter() {
        setTimeout(() => {
            //  this.Set_lmscorporatesecondarycontacts_TableDropDownConfig();
        });
        if (this.tbl_lmscorporatesecondarycontacts.source.settings != null)
            this.tbl_lmscorporatesecondarycontacts.source.settings['hideSubHeader'] = !this.tbl_lmscorporatesecondarycontacts.source.settings['hideSubHeader'];
        this.tbl_lmscorporatesecondarycontacts.source.initGrid();
    }
    show_lmscorporatesecondarycontacts_InActive() {
    }
    enable_lmscorporatesecondarycontacts_InActive() {
    }
    Set_lmscorporatesecondarycontacts_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_lmscorporatesecondarycontacts) {
                var clone = this.sharedService.clone(this.tbl_lmscorporatesecondarycontacts.source.settings);
                if (clone.columns['designation'] != undefined)
                    clone.columns['designation'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscorporatesecondarycontacts_designation.value)), }, };
                if (clone.columns['designation'] != undefined)
                    clone.columns['designation'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_lmscorporatesecondarycontacts_designation.value)), }, };
                this.tbl_lmscorporatesecondarycontacts.source.settings = clone;
                this.tbl_lmscorporatesecondarycontacts.source.initGrid();
            }
            this.bfilterPopulate_lmscorporatesecondarycontacts = true;
        });
    }
    lmscorporatesecondarycontacts_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_lmscorporatesecondarycontacts_TableConfig() {
        this.lmscorporatesecondarycontacts_settings = {
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
                custom: this.lmscorporatesecondarycontact_menuactions
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
                emailid: {
                    title: 'Email',
                    type: '',
                    filter: true,
                },
                lastname: {
                    title: 'Last Name',
                    type: '',
                    filter: true,
                },
                companyname: {
                    title: 'Company Name',
                    type: '',
                    filter: true,
                },
                designationdesc: {
                    title: 'Designation',
                    type: 'html',
                    filter: true,
                },
                officephone: {
                    title: 'Office Phone',
                    type: '',
                    filter: true,
                },
                mobile: {
                    title: 'Mobile',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    lmscorporatesecondarycontacts_LoadTable(lmscorporatesecondarycontacts = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscorporatesecondarycontacts_ID) >= 0) {
            if (this.tbl_lmscorporatesecondarycontacts != undefined)
                this.tbl_lmscorporatesecondarycontacts.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_20__.LocalDataSource();
            if (this.tbl_lmscorporatesecondarycontacts != undefined)
                this.tbl_lmscorporatesecondarycontacts.source.load(lmscorporatesecondarycontacts);
            if (this.tbl_lmscorporatesecondarycontacts != undefined)
                this.tbl_lmscorporatesecondarycontacts.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    lmscorporatesecondarycontacts_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.lmsmaster_service.lmscorporatesecondarycontacts.length == 0)
    {
        this.tbl_lmscorporatesecondarycontacts.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new lmscorporatesecondarycontact();
        this.lmsmaster_service.lmscorporatesecondarycontacts.push(obj);
        this.tbl_lmscorporatesecondarycontacts.source.refresh();
        if ((this.lmsmaster_service.lmscorporatesecondarycontacts.length / this.tbl_lmscorporatesecondarycontacts.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_lmscorporatesecondarycontacts.source.getPaging().page)
        {
            this.tbl_lmscorporatesecondarycontacts.source.setPage((this.lmsmaster_service.lmscorporatesecondarycontacts.length / this.tbl_lmscorporatesecondarycontacts.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_lmscorporatesecondarycontacts.source.grid.edit(this.tbl_lmscorporatesecondarycontacts.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    if (confirm('Do you want to want to delete?')) {
    let index = this.tbl_lmscorporatesecondarycontacts.source.data.indexOf(event.data);
    this.onDelete_lmscorporatesecondarycontact(event,event.data.secondarycontactid,((this.tbl_lmscorporatesecondarycontacts.source.getPaging().page-1) *this.tbl_lmscorporatesecondarycontacts.source.getPaging().perPage)+index);
    this.tbl_lmscorporatesecondarycontacts.source.refresh();
    }
    break;
    }
    }
    
    */
    lmscorporatesecondarycontacts_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_lmscorporatesecondarycontact(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_lmscorporatesecondarycontact(event, event.data.secondarycontactid, this.formid);
                break;
            case 'delete':
                if (confirm('Do you want to want to delete?')) {
                    this.onDelete_lmscorporatesecondarycontact(event, event.data.secondarycontactid, ((this.tbl_lmscorporatesecondarycontacts.source.getPaging().page - 1) * this.tbl_lmscorporatesecondarycontacts.source.getPaging().perPage) + event.index);
                    this.tbl_lmscorporatesecondarycontacts.source.refresh();
                }
                break;
        }
    }
    lmscorporatesecondarycontacts_onDelete(obj) {
        let secondarycontactid = obj.data.secondarycontactid;
        if (confirm('Are you sure to delete this record ?')) {
            this.lmsmaster_service.delete_lmsmaster(secondarycontactid).then(res => this.lmscorporatesecondarycontacts_LoadTable());
        }
    }
    onCustom_lmscorporatesecondarycontacts_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "lmscorporatesecondarycontacts");
            let formname = objbomenuaction.actionname;
        });
    }
    lmscorporatesecondarycontacts_Paging(val) {
        debugger;
        this.tbl_lmscorporatesecondarycontacts.source.setPaging(1, val, true);
    }
    handle_lmscorporatesecondarycontacts_GridSelected(event) {
        this.lmscorporatesecondarycontacts_selectedindex = this.tbl_lmscorporatesecondarycontacts.source.findIndex(i => i.secondarycontactid === event.data.secondarycontactid);
    }
    Is_lmscorporatesecondarycontacts_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.lmscorporatesecondarycontacts_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
lmsmasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_21__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_22__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_23__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_24__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_13__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_25__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_26__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_26__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_26__.DialogService },
    { type: _service_lmsmaster_service__WEBPACK_IMPORTED_MODULE_1__.lmsmasterService },
    { type: _service_lmsopportunity_service__WEBPACK_IMPORTED_MODULE_6__.lmsopportunityService },
    { type: _service_lmscall_service__WEBPACK_IMPORTED_MODULE_8__.lmscallService },
    { type: _service_lmscorporatesecondarycontact_service__WEBPACK_IMPORTED_MODULE_10__.lmscorporatesecondarycontactService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_17__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_11__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_12__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_2__.ToastService },
    { type: _n_tire_biz_app_src_app_service_customfieldconfiguration_service__WEBPACK_IMPORTED_MODULE_15__.customfieldconfigurationService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_24__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_28__.NgxSpinnerService }
];
lmsmasterComponent.propDecorators = {
    customform: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['customform', { static: false },] }],
    tbl_lmsopportunities: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['tbl_lmsopportunities', { static: false },] }],
    tbl_lmscalls: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['tbl_lmscalls', { static: false },] }],
    tbl_lmscorporatesecondarycontacts: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['tbl_lmscorporatesecondarycontacts', { static: false },] }],
    fileattachment: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['fileattachment', { static: false },] }],
    photo: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['photo', { static: false },] }],
    thumbnail: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['thumbnail', { static: false },] }]
};
lmsmasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_19__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_16__.Component)({
        selector: 'app-lmsmaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_lmsmaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_23__.KeyboardShortcutsService]
    })
], lmsmasterComponent);



/***/ }),

/***/ 25886:
/*!***********************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsmaster/lmsmaster.module.ts ***!
  \***********************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsmasterModule": () => (/* binding */ lmsmasterModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _lmsmaster_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./lmsmaster.routing */ 99448);
/* harmony import */ var _lmsmaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./lmsmaster.component */ 52792);
/* harmony import */ var _lmscorporatesecondarycontact_lmscorporatesecondarycontact_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../lmscorporatesecondarycontact/lmscorporatesecondarycontact.module */ 46154);
/* harmony import */ var _lmsopportunity_lmsopportunity_module__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../lmsopportunity/lmsopportunity.module */ 86382);
/* harmony import */ var _lmscall_lmscall_module__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../lmscall/lmscall.module */ 36396);









let lmsmasterModule = class lmsmasterModule {
};
lmsmasterModule = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _lmsmaster_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule, _lmscorporatesecondarycontact_lmscorporatesecondarycontact_module__WEBPACK_IMPORTED_MODULE_4__.lmscorporatesecondarycontactModule, _lmsopportunity_lmsopportunity_module__WEBPACK_IMPORTED_MODULE_5__.lmsopportunityModule, _lmscall_lmscall_module__WEBPACK_IMPORTED_MODULE_6__.lmscallModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_8__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_lmsmaster_component__WEBPACK_IMPORTED_MODULE_3__.lmsmasterComponent]
    })
], lmsmasterModule);



/***/ }),

/***/ 99448:
/*!************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/lmsmaster/lmsmaster.routing.ts ***!
  \************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _lmsmaster_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./lmsmaster.component */ 52792);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'lmsmasters', children: [
            { path: '', component: _lmsmaster_component__WEBPACK_IMPORTED_MODULE_0__.lmsmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _lmsmaster_component__WEBPACK_IMPORTED_MODULE_0__.lmsmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'view/:viewid', component: _lmsmaster_component__WEBPACK_IMPORTED_MODULE_0__.lmsmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _lmsmaster_component__WEBPACK_IMPORTED_MODULE_0__.lmsmasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] }
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 43765:
/*!**********************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/service/lmsmaster.service.ts ***!
  \**********************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "lmsmasterService": () => (/* binding */ lmsmasterService)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common/http */ 53882);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/shared/helper */ 52538);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);





let lmsmasterService = class lmsmasterService {
    constructor(http, sessionService) {
        this.http = http;
        this.sessionService = sessionService;
        this.rootURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.baseURL;
    }
    valid() {
        return true;
    }
    saveOrUpdate_lmsmasters(formData, lmsopportunities, lmscalls, lmscorporatesecondarycontacts) {
        if (this.valid()) {
            var body = Object.assign(Object.assign({}, formData), { lmsopportunities: lmsopportunities.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmscalls: lmscalls.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }), lmscorporatesecondarycontacts: lmscorporatesecondarycontacts.filter(function (el) { return el != undefined && Object.keys(el).length != 0; }) });
            return this.http.post(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsmaster', body);
        }
    }
    getDefaultData() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsmaster' + '/getdefaultdata').toPromise();
        }
    }
    get_lmsmasters_List() {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsmaster').toPromise();
        }
    }
    getListBy_leadid(leadid) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsmaster' + '/leadid/' + leadid).toPromise();
        }
    }
    getList(key) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsmaster' + '/param/' + key).toPromise();
        }
    }
    get_lmsmasters_ByEID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsmaster' + '/e/' + id).toPromise();
        }
    }
    get_lmsmasters_ByID(id) {
        if (this.valid()) {
            return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsmaster' + '/' + id).toPromise();
        }
    }
    delete_lmsmaster(id) {
        if (this.valid()) {
            return this.http.delete(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirebizURL + '/lmsmaster' + '/' + id).toPromise();
        }
    }
    getList_branchid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_branchid').toPromise();
    }
    getList_branchlocationid(branchid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_branchlocationid/branchid').toPromise();
    }
    getList_iscorporate() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_iscorporate/').toPromise();
    }
    getList_leadowner() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_leadowner').toPromise();
    }
    getList_companytypeid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_companytypeid/').toPromise();
    }
    getList_categoryid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_categoryid/').toPromise();
    }
    getList_subcategoryid(categoryid) {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_subcategoryid/categoryid').toPromise();
    }
    getList_groupname() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_groupname/').toPromise();
    }
    getList_salutation() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_salutation/').toPromise();
    }
    getList_designation() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_designation').toPromise();
    }
    getList_leadtype() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_leadtype/').toPromise();
    }
    getList_leadsource() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_leadsource/').toPromise();
    }
    getList_campaignid() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_campaignid').toPromise();
    }
    getList_segment() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_segment/').toPromise();
    }
    getList_businessvertical() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_businessvertical/').toPromise();
    }
    getList_revenue() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_revenue/').toPromise();
    }
    getList_employees() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_employees/').toPromise();
    }
    getList_language() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_language/').toPromise();
    }
    getList_paymentterms() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_paymentterms/').toPromise();
    }
    getList_leadstatus() {
        return this.http.get(_n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_0__.AppConstants.ntirecrmURL + '/lmsmaster' + '/getList_leadstatus/').toPromise();
    }
};
lmsmasterService.ctorParameters = () => [
    { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_2__.HttpClient },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_1__.SessionService }
];
lmsmasterService = (0,tslib__WEBPACK_IMPORTED_MODULE_3__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_4__.Injectable)({
        providedIn: 'root'
    })
], lmsmasterService);



/***/ }),

/***/ 81599:
/*!*******************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/lmsmaster/lmsmaster.component.html ***!
  \*******************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"lmsmaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\">\r\n    <h1 class=\"col-4 columns mainheader left\"><a href='#/home/{{p_currenturl}}'>{{'LMS Master' | translate}}</a></h1>\r\n    <div class='col  sticky1 second' role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <div class='col'></div>\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group'>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_lmsmasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of lmsmaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <a class=\"alert-success\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.leadid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.leadid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <p-accordion [multiple]='true'>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <p-accordionTab header='master' [selected]='true'>\r\n\r\n\r\n        <!--branchid-->\r\n\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('branchid') == -1) && (branchidvisible==undefined || branchidvisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"branchid\" class=\"control-label\"\r\n              (click)=\"AddOrEdit_branchid(null)\">Branch</label>\r\n            <app-popupselect *ngIf=\"!showview\" [options]=\"branchid_List\" [optionsEvent]=\"branchid_optionsEvent\"\r\n              [form]=\"bouserbranchaccess\" (selectItem)=\"onSelected_branchid($event)\" [reportid]='oxubv' [menuid]='oxubv'\r\n              formControlName=\"branchid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n            <div class=\"input-group\">\r\n            </div>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.branchiddesc?.value}}</label>\r\n          </div>\r\n\r\n\r\n          <!--branchlocationid-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('branchlocationid') == -1) && (branchlocationidvisible==undefined || branchlocationidvisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"branchlocationid\" class=\"control-label\"\r\n              (click)=\"AddOrEdit_branchlocationid(null)\">Branch Location</label>\r\n            <app-popupselect *ngIf=\"!showview\" [options]=\"branchlocationid_List\"\r\n              [optionsEvent]=\"branchlocationid_optionsEvent\" [form]=\"bobranchlocation\"\r\n              (selectItem)=\"onSelected_branchlocationid($event)\" [reportid]='fcx84' [menuid]='fcx84'\r\n              formControlName=\"branchlocationid\" id=\"value\" desc=\"label\"></app-popupselect>\r\n            <div class=\"input-group\">\r\n            </div>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.branchlocationiddesc?.value}}</label>\r\n          </div>\r\n\r\n\r\n          <!--iscorporate-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('iscorporate') == -1) && (iscorporatevisible==undefined || iscorporatevisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"iscorporate\" class=\"control-label\">Is Corporate?</label>\r\n            <select *ngIf=\"!showview\" id=\"iscorporate\" (change)=\"iscorporate_onChange($event.target)\"\r\n              formControlName=\"iscorporate\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of iscorporate_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.iscorporatedesc?.value}}</label>\r\n          </div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n      </p-accordionTab>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('companyname') == -1) && (companynamevisible==undefined || companynamevisible==true)) && f.iscorporate.value =='Y'\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"companyname\" class=\"control-label\">Company Name</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.companyname?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"companyname\" formControlName=\"companyname\" class=\"form-control\">\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--leadowner-->\r\n\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div *ngIf=\"((hidelist.indexOf('leadowner') == -1) && (leadownervisible==undefined || leadownervisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"leadowner\" class=\"control-label\" (click)=\"AddOrEdit_leadowner(null)\">Lead\r\n            Owner</label>\r\n          <app-popupselect *ngIf=\"!showview\" [options]=\"leadowner_List\" [optionsEvent]=\"leadowner_optionsEvent\"\r\n            [form]=\"bousermaster\" (selectItem)=\"onSelected_leadowner($event)\" [reportid]='e99kq' [menuid]='e99kq'\r\n            formControlName=\"leadowner\" id=\"value\" desc=\"label\"></app-popupselect>\r\n          <div class=\"input-group\">\r\n          </div>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.leadownerdesc?.value}}</label>\r\n        </div>\r\n        <div *ngIf=\"((hidelist.indexOf('firstname') == -1) && (firstnamevisible==undefined || firstnamevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"firstname\" class=\"control-label required\">First Name</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.firstname?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"firstname\" required formControlName=\"firstname\" class=\"form-control\">\r\n          <app-field-error-display [displayError]=\"f.firstname.errors?.required\"\r\n            errorMsg=\"Enter {{'First Name' | translate}}\">\r\n          </app-field-error-display>\r\n        </div>\r\n        <div *ngIf=\"((hidelist.indexOf('lastname') == -1) && (lastnamevisible==undefined || lastnamevisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"lastname\" class=\"control-label required\">Last Name</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.lastname?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"lastname\" required formControlName=\"lastname\" class=\"form-control\">\r\n          <app-field-error-display [displayError]=\"f.lastname.errors?.required\"\r\n            errorMsg=\"Enter {{'Last Name' | translate}}\">\r\n          </app-field-error-display>\r\n        </div>\r\n        <div *ngIf=\"((hidelist.indexOf('emailid') == -1) && (emailidvisible==undefined || emailidvisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"emailid\" class=\"control-label required\">Email</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.emailid?.value}}</label>\r\n          <input type=\"email\" [email]=\"true\" *ngIf=\"!showview\" id=\"emailid\" required formControlName=\"emailid\"\r\n            class=\"form-control\">\r\n          <app-field-error-display [displayError]=\"f.emailid.errors!=null && f.emailid.errors?.email\"\r\n            errorMsg=\"Enter valid email\">\r\n          </app-field-error-display>\r\n          <app-field-error-display [displayError]=\"f.emailid.errors?.required\" errorMsg=\"Enter {{'Email' | translate}}\">\r\n          </app-field-error-display>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--companytypeid-->\r\n\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('companytypeid') == -1) && (companytypeidvisible==undefined || companytypeidvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"companytypeid\" class=\"control-label\"\r\n            (click)=\"AddOrEdit_companytypeid(null)\" (click)=\"AddOrEdit_companytypeid(null)\">Company Type</label>\r\n          <select *ngIf=\"!showview\" id=\"companytypeid\" (change)=\"companytypeid_onChange($event.target)\"\r\n            formControlName=\"companytypeid\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of companytypeid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.companytypeiddesc?.value}}</label>\r\n        </div>\r\n\r\n\r\n        <!--categoryid-->\r\n\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('categoryid') == -1) && (categoryidvisible==undefined || categoryidvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"categoryid\" class=\"control-label\" (click)=\"AddOrEdit_categoryid(null)\"\r\n            (click)=\"AddOrEdit_categoryid(null)\">Category</label>\r\n          <select *ngIf=\"!showview\" id=\"categoryid\" (change)=\"categoryid_onChange($event.target)\"\r\n            formControlName=\"categoryid\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of categoryid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.categoryiddesc?.value}}</label>\r\n        </div>\r\n\r\n\r\n        <!--subcategoryid-->\r\n\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('subcategoryid') == -1) && (subcategoryidvisible==undefined || subcategoryidvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"subcategoryid\" class=\"control-label\"\r\n            (click)=\"AddOrEdit_subcategoryid(null)\">Subcategory</label>\r\n          <select *ngIf=\"!showview\" id=\"subcategoryid\" (change)=\"subcategoryid_onChange($event.target)\"\r\n            formControlName=\"subcategoryid\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of subcategoryid_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.subcategoryiddesc?.value}}</label>\r\n        </div>\r\n\r\n\r\n        <!--groupname-->\r\n\r\n        <div *ngIf=\"((hidelist.indexOf('groupname') == -1) && (groupnamevisible==undefined || groupnamevisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"groupname\" class=\"control-label\">Group</label>\r\n          <select *ngIf=\"!showview\" id=\"groupname\" (change)=\"groupname_onChange($event.target)\"\r\n            formControlName=\"groupname\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of groupname_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.groupnamedesc?.value}}</label>\r\n        </div>\r\n      </div>\r\n\r\n\r\n      <!--salutation-->\r\n\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('salutation') == -1) && (salutationvisible==undefined || salutationvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"salutation\" class=\"control-label\">Salutation</label>\r\n          <select *ngIf=\"!showview\" id=\"salutation\" (change)=\"salutation_onChange($event.target)\"\r\n            formControlName=\"salutation\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of salutation_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.salutationdesc?.value}}</label>\r\n        </div>\r\n\r\n\r\n        <!--designation-->\r\n\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('designation') == -1) && (designationvisible==undefined || designationvisible==true)) || f.iscorporate.value =='Y'\"\r\n          style='' class=\"col-3\"><label for=\"designation\" class=\"control-label\"\r\n            (click)=\"AddOrEdit_designation(null)\">Designation</label>\r\n          <select *ngIf=\"!showview\" id=\"designation\" (change)=\"designation_onChange($event.target)\"\r\n            formControlName=\"designation\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of designation_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.designationdesc?.value}}</label>\r\n        </div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div *ngIf=\"((hidelist.indexOf('contactno') == -1) && (contactnovisible==undefined || contactnovisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"contactno\" class=\"control-label\">Contact No</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.contactno?.value}}</label>\r\n          <app-multipleentry *ngIf=\"!showview\" id=\"contactno\" formControlName=\"contactno\" config=\"phonetype\">\r\n          </app-multipleentry>\r\n        </div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div *ngIf=\"((hidelist.indexOf('address') == -1) && (addressvisible==undefined || addressvisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"address\" class=\"control-label\">Address</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.address?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"address\" formControlName=\"address\" class=\"form-control\">\r\n        </div>\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('website') == -1) && (websitevisible==undefined || websitevisible==true)) && f.iscorporate.value =='Y'\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"website\" class=\"control-label\">Website</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.website?.value}}</label>\r\n          <input *ngIf=\"!showview\" id=\"website\" formControlName=\"website\" class=\"form-control\">\r\n        </div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <p-accordionTab header='Lead Details' [selected]='true'>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('datecreated') == -1) && (datecreatedvisible==undefined || datecreatedvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"datecreated\" class=\"control-label\">Date Created</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.datecreated?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #datecreatedformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"datecreatedformpicker\" id=\"datecreated\"\r\n                readonly formControlName=\"datecreated\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <!--leadtype-->\r\n\r\n          <div *ngIf=\"((hidelist.indexOf('leadtype') == -1) && (leadtypevisible==undefined || leadtypevisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"leadtype\" class=\"control-label\">Lead Type</label>\r\n            <select *ngIf=\"!showview\" id=\"leadtype\" (change)=\"leadtype_onChange($event.target)\"\r\n              formControlName=\"leadtype\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of leadtype_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.leadtypedesc?.value}}</label>\r\n          </div>\r\n\r\n\r\n          <!--leadsource-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('leadsource') == -1) && (leadsourcevisible==undefined || leadsourcevisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"leadsource\" class=\"control-label\">Lead Source</label>\r\n            <select *ngIf=\"!showview\" id=\"leadsource\" (change)=\"leadsource_onChange($event.target)\"\r\n              formControlName=\"leadsource\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of leadsource_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.leadsourcedesc?.value}}</label>\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('leaddate') == -1) && (leaddatevisible==undefined || leaddatevisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"leaddate\" class=\"control-label\">Lead Date</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{ngbDateParserFormatter.format(f.leaddate?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #leaddateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"leaddateformpicker\" id=\"leaddate\"\r\n                formControlName=\"leaddate\" class=\"form-control\">\r\n              <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"leaddateformpicker.toggle()\" type=\"button\"><i\r\n                  class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n            </div>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('nextcontactduedate') == -1) && (nextcontactduedatevisible==undefined || nextcontactduedatevisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"nextcontactduedate\" class=\"control-label\">Next Contact Due Date</label>\r\n            <label *ngIf=\"showview\"\r\n              class=\"labelview\">{{ngbDateParserFormatter.format(f.nextcontactduedate?.value)}}</label>\r\n            <div class=\"input-group\" *ngIf=\"!showview\">\r\n              <input #nextcontactduedateformpicker=\"ngbDatepicker\" [minDate]='{year: 2022, month:3, day: 1}'\r\n                [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"nextcontactduedateformpicker\"\r\n                id=\"nextcontactduedate\" readonly formControlName=\"nextcontactduedate\" class=\"form-control\">\r\n            </div>\r\n          </div>\r\n\r\n\r\n          <!--campaignid-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('campaignid') == -1) && (campaignidvisible==undefined || campaignidvisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"campaignid\" class=\"control-label\"\r\n              (click)=\"AddOrEdit_campaignid(null)\">Campaign</label>\r\n            <input readonly id=\"campaigniddesc\" formControlName=\"campaigniddesc\" class=\"form-control\">\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.campaigniddesc?.value}}</label>\r\n          </div>\r\n          <div *ngIf=\"((hidelist.indexOf('rating') == -1) && (ratingvisible==undefined || ratingvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"rating\" class=\"control-label\">Rating</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.rating?.value}}</label>\r\n            <p-rating *ngIf=\"!showview\" id=\"rating\" formControlName=\"rating\" class=\"form-control\">\r\n            </p-rating>\r\n          </div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n      </p-accordionTab>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <p-accordionTab header='Segment Information' [selected]='true'>\r\n\r\n\r\n        <!--segment-->\r\n\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('segment') == -1) && (segmentvisible==undefined || segmentvisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"segment\" class=\"control-label\">Segment</label>\r\n            <select *ngIf=\"!showview\" id=\"segment\" (change)=\"segment_onChange($event.target)\" formControlName=\"segment\"\r\n              class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of segment_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.segmentdesc?.value}}</label>\r\n          </div>\r\n\r\n\r\n          <!--businessvertical-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('businessvertical') == -1) && (businessverticalvisible==undefined || businessverticalvisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"businessvertical\" class=\"control-label\">Business Vertical</label>\r\n            <select *ngIf=\"!showview\" id=\"businessvertical\" (change)=\"businessvertical_onChange($event.target)\"\r\n              formControlName=\"businessvertical\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of businessvertical_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.businessverticaldesc?.value}}</label>\r\n          </div>\r\n\r\n\r\n          <!--revenue-->\r\n\r\n          <div *ngIf=\"((hidelist.indexOf('revenue') == -1) && (revenuevisible==undefined || revenuevisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"revenue\" class=\"control-label\">Revenue</label>\r\n            <select *ngIf=\"!showview\" id=\"revenue\" (change)=\"revenue_onChange($event.target)\" formControlName=\"revenue\"\r\n              class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of revenue_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.revenuedesc?.value}}</label>\r\n          </div>\r\n\r\n\r\n          <!--employees-->\r\n\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('employees') == -1) && (employeesvisible==undefined || employeesvisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"employees\" class=\"control-label\">Employees</label>\r\n            <select *ngIf=\"!showview\" id=\"employees\" (change)=\"employees_onChange($event.target)\"\r\n              formControlName=\"employees\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of employees_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.employeesdesc?.value}}</label>\r\n          </div>\r\n        </div>\r\n\r\n\r\n        <!--language-->\r\n\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div *ngIf=\"((hidelist.indexOf('language') == -1) && (languagevisible==undefined || languagevisible==true))\"\r\n            style='' class=\"col-3\"><label for=\"language\" class=\"control-label\">Language</label>\r\n            <select *ngIf=\"!showview\" id=\"language\" (change)=\"language_onChange($event.target)\"\r\n              formControlName=\"language\" class=\"form-control\">\r\n              <option [ngValue]=\"null\" selected>-Select-</option>\r\n              <option *ngFor=\"let item of language_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n            </select>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.languagedesc?.value}}</label>\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('crosssellopportunity') == -1) && (crosssellopportunityvisible==undefined || crosssellopportunityvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"crosssellopportunity\" class=\"control-label\">Cross Sell Opportunity</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.crosssellopportunity?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"crosssellopportunity\" formControlName=\"crosssellopportunity\"\r\n                class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('successrate') == -1) && (successratevisible==undefined || successratevisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"successrate\" class=\"control-label\">Success Rate</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.successrate?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"successrate\" formControlName=\"successrate\" class=\"form-control\">\r\n          </div>\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('businessvalue') == -1) && (businessvaluevisible==undefined || businessvaluevisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"businessvalue\" class=\"control-label\">Business Value</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.businessvalue?.value}}</label>\r\n            <input *ngIf=\"!showview\" id=\"businessvalue\" formControlName=\"businessvalue\" class=\"form-control\">\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('subscribedemail') == -1) && (subscribedemailvisible==undefined || subscribedemailvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <div class=\"columnchk\">\r\n              <label for=\"subscribedemail\" class=\"control-label\">Subscribed Email</label>\r\n              <label *ngIf=\"showview\" class=\"labelview\">{{f.subscribedemail?.value}}</label>\r\n              <input type=\"checkbox\" *ngIf=\"!showview\" id=\"subscribedemail\" formControlName=\"subscribedemail\"\r\n                class=\"form-control\">\r\n            </div>\r\n          </div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n          <div class=\"col\"></div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('shippingaddress') == -1) && (shippingaddressvisible==undefined || shippingaddressvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"shippingaddress\" class=\"control-label\">Shipping Address</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.shippingaddress?.value}}</label>\r\n            <app-address *ngIf=\"!showview\" id=\"shippingaddress\" formControlName=\"shippingaddress\">\r\n            </app-address>\r\n          </div>\r\n        </div>\r\n        <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n          <div\r\n            *ngIf=\"((hidelist.indexOf('billingaddress') == -1) && (billingaddressvisible==undefined || billingaddressvisible==true))\"\r\n            style='' class=\"col-3 \">\r\n            <label for=\"billingaddress\" class=\"control-label\">Billing Address</label>\r\n            <label *ngIf=\"showview\" class=\"labelview\">{{f.billingaddress?.value}}</label>\r\n            <app-address *ngIf=\"!showview\" id=\"billingaddress\" formControlName=\"billingaddress\">\r\n            </app-address>\r\n          </div>\r\n        </div>\r\n      </p-accordionTab>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div *ngIf=\"((hidelist.indexOf('photo') == -1) && (photovisible==undefined || photovisible==true))\" style=''\r\n          class=\"col-3 \">\r\n          <label for=\"photo\" class=\"control-label\">Photo</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.photo?.value[0]?.name}}</label>\r\n          <app-attachment #photo formControlName=\"photo\" [showremove]='bmyrecord' [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n          <button type=\"button\" class=\"btn\" *ngIf=\"photo.getAttachmentList().length > 0\" (click)=\"getphoto()\">Open\r\n            File</button>\r\n        </div>\r\n        <div *ngIf=\"((hidelist.indexOf('thumbnail') == -1) && (thumbnailvisible==undefined || thumbnailvisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"thumbnail\" class=\"control-label\">Thumbnail</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.thumbnail?.value[0]?.name}}</label>\r\n          <app-attachment #thumbnail formControlName=\"thumbnail\" [showremove]='bmyrecord' [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n          <button type=\"button\" class=\"btn\" *ngIf=\"thumbnail.getAttachmentList().length > 0\"\r\n            (click)=\"getthumbnail()\">Open File</button>\r\n        </div>\r\n\r\n\r\n        <!--paymentterms-->\r\n\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('paymentterms') == -1) && (paymenttermsvisible==undefined || paymenttermsvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"paymentterms\" class=\"control-label\">Payment Terms</label>\r\n          <select *ngIf=\"!showview\" id=\"paymentterms\" (change)=\"paymentterms_onChange($event.target)\"\r\n            formControlName=\"paymentterms\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of paymentterms_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.paymenttermsdesc?.value}}</label>\r\n        </div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('socialmedia') == -1) && (socialmediavisible==undefined || socialmediavisible==true))\"\r\n          style='' class=\"col-3 \">\r\n          <label for=\"socialmedia\" class=\"control-label\">Social Media</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.socialmedia?.value}}</label>\r\n          <app-multipleentry *ngIf=\"!showview\" id=\"socialmedia\" formControlName=\"socialmedia\" config=\"socialmedia\">\r\n          </app-multipleentry>\r\n        </div>\r\n      </div>\r\n    </p-accordion>\r\n    <p-accordion [multiple]='true'>\r\n\r\n\r\n      <!--leadstatus-->\r\n\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div\r\n          *ngIf=\"((hidelist.indexOf('leadstatus') == -1) && (leadstatusvisible==undefined || leadstatusvisible==true))\"\r\n          style='' class=\"col-3\"><label for=\"leadstatus\" class=\"control-label\">Status</label>\r\n          <select *ngIf=\"!showview\" id=\"leadstatus\" (change)=\"leadstatus_onChange($event.target)\"\r\n            formControlName=\"leadstatus\" class=\"form-control\">\r\n            <option [ngValue]=\"null\" selected>-Select-</option>\r\n            <option *ngFor=\"let item of leadstatus_List\" value=\"{{item.value}}\">{{item.label}}</option>\r\n          </select>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.leadstatusdesc?.value}}</label>\r\n        </div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n        <div class=\"col\"></div>\r\n      </div>\r\n      <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n        <div *ngIf=\"((hidelist.indexOf('notes') == -1) && (notesvisible==undefined || notesvisible==true))\"\r\n          style='width:1500px' class=\"col-12 \">\r\n          <label for=\"notes\" class=\"control-label\">Notes</label>\r\n          <label *ngIf=\"showview\" class=\"labelview\">{{f.notes?.value}}</label>\r\n          <textarea autosize MinRows=\"10\" MaxRows=\"15\" onlyGrow=\"true\" *ngIf=\"!showview\" id=\"notes\"\r\n            formControlName=\"notes\" class=\"form-control\">\r\n</textarea>\r\n        </div>\r\n      </div>\r\n    </p-accordion>\r\n    <div class='full-width'\r\n      *ngIf=\"customFieldVisible  && customFieldServiceList!=null && customFieldServiceList!=undefined  && customFieldServiceList.fields.length>0\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab header='CustomField' [selected]='false'>\r\n          <div class=\"sticky\"\r\n            *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n            Custom Fields</div>\r\n          <div class=\"form-group row\"\r\n            *ngIf=\"customFieldServiceList!=null && customFieldServiceList!=undefined   &&(customFieldServiceList.formhtml!=null || customFieldServiceList.templatehtml!=null || (customFieldServiceList.fields!=[] && customFieldServiceList.fields.length>0))\">\r\n            <dynamic-form-builder [customfields]=\"customFieldServiceList\" #customform></dynamic-form-builder>\r\n          </div>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n    <div class='full-width' *ngIf=\"attachmentVisible\">\r\n      <p-accordion [multiple]='true'>\r\n        <p-accordionTab [header]=\"'Attachment(' + fileattachment.getLength() + ')'\" [selected]='false'>\r\n          <app-attachment #fileattachment isAttachment=true formControlName=\"attachment\" [SessionData]=\"sessionData\">\r\n          </app-attachment>\r\n        </p-accordionTab>\r\n      </p-accordion>\r\n    </div>\r\n    <!-- child table lmsopportunities-->\r\n    <div [ngClass]=\"Is_lmsopportunities_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Opportunities' | translate}}\r\n        <select class='child' id=\"lmsopportunitiesPagingdropdown\"\r\n          (change)=\"lmsopportunities_Paging($event.target.value)\" [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]=''\r\n                  (click)=\"lmsopportunitytoggleOption();lmsopportunities_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmsopportunitiesFilter()\"><i\r\n                    class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmsopportunities_route(null, 'create')\"><i\r\n            class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmsopportunities (userRowSelect)=\"handle_lmsopportunities_GridSelected($event)\"\r\n        [settings]=\"lmsopportunities_settings\" (custom)=\"onCustom_lmsopportunities_Action($event)\"\r\n        [source]=\"tbl_lmsopportunities?.source?.data\" (delete)=\"lmsopportunities_route($event,'delete')\"\r\n        (deleteConfirm)=\"lmsopportunities_route($event,'delete')\" (create)=\"lmsopportunities_route($event,'create')\"\r\n        (createConfirm)=\"lmsopportunities_beforesave($event)\" (edit)=\"lmsopportunities_route($event,'edit')\"\r\n        (editConfirm)=\"lmsopportunities_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmsopportunities-->\r\n    <!-- child table lmscalls-->\r\n    <div [ngClass]=\"Is_lmscalls_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Activities' | translate}}\r\n        <select class='child' id=\"lmscallsPagingdropdown\" (change)=\"lmscalls_Paging($event.target.value)\" [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]=''\r\n                  (click)=\"lmscalltoggleOption();lmscalls_route(null, 'create')\"><i class=\"fa fa-plus\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmscallsFilter()\"><i class=\"fa fa-filter\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmscalls_route(null, 'create')\"><i class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmscalls (userRowSelect)=\"handle_lmscalls_GridSelected($event)\"\r\n        [settings]=\"lmscalls_settings\" (custom)=\"onCustom_lmscalls_Action($event)\" [source]=\"tbl_lmscalls?.source?.data\"\r\n        (delete)=\"lmscalls_route($event,'delete')\" (deleteConfirm)=\"lmscalls_route($event,'delete')\"\r\n        (create)=\"lmscalls_route($event,'create')\" (createConfirm)=\"lmscalls_beforesave($event)\"\r\n        (edit)=\"lmscalls_route($event,'edit')\" (editConfirm)=\"lmscalls_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmscalls-->\r\n    <!-- child table lmscorporatesecondarycontacts-->\r\n    <div [ngClass]=\"Is_lmscorporatesecondarycontacts_Visible()\">\r\n      <!--End-->\r\n      <h4 class=\"form-group sticky1  columns left\">{{'Secondary Contacts' | translate}}\r\n        <select class='child' id=\"lmscorporatesecondarycontactsPagingdropdown\"\r\n          (change)=\"lmscorporatesecondarycontacts_Paging($event.target.value)\" [value]='20'>\r\n          <option value='20'>20</option>\r\n          <option value='50'>50</option>\r\n          <option value='100'>100</option>\r\n        </select>\r\n        <ul class=\"nav navbar-nav1\" style='display:none'>\r\n          <li class=\"dropdown\">\r\n            <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n              aria-expanded='false'> <span class='caret'></span></a>\r\n            <ul class=\"dropdown-menu\">\r\n              <li><a class=\"dropdown-item\" [routerLink]=''\r\n                  (click)=\"lmscorporatesecondarycontacttoggleOption();lmscorporatesecondarycontacts_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n              <li role=\"separator\" class=\"divider\">\r\n                <hr>\r\n              </li>\r\n              <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showlmscorporatesecondarycontactsFilter()\"><i\r\n                    class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n              <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                    aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n            </ul>\r\n          </li>\r\n        </ul>\r\n        <a class=\"rightside\" [routerLink]='' (click)=\"lmscorporatesecondarycontacts_route(null, 'create')\"><i\r\n            class=\"fa fa-plus\"></i></a>\r\n      </h4>\r\n      <ng2-smart-table #tbl_lmscorporatesecondarycontacts\r\n        (userRowSelect)=\"handle_lmscorporatesecondarycontacts_GridSelected($event)\"\r\n        [settings]=\"lmscorporatesecondarycontacts_settings\"\r\n        (custom)=\"onCustom_lmscorporatesecondarycontacts_Action($event)\"\r\n        [source]=\"tbl_lmscorporatesecondarycontacts?.source?.data\"\r\n        (delete)=\"lmscorporatesecondarycontacts_route($event,'delete')\"\r\n        (deleteConfirm)=\"lmscorporatesecondarycontacts_route($event,'delete')\"\r\n        (create)=\"lmscorporatesecondarycontacts_route($event,'create')\"\r\n        (createConfirm)=\"lmscorporatesecondarycontacts_beforesave($event)\"\r\n        (edit)=\"lmscorporatesecondarycontacts_route($event,'edit')\"\r\n        (editConfirm)=\"lmscorporatesecondarycontacts_beforesave($event)\">\r\n      </ng2-smart-table>\r\n    </div>\r\n    <!--End of child table lmscorporatesecondarycontacts-->\r\n  </div>\r\n</form>");

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_lmsmaster_lmsmaster_module_ts.js.map