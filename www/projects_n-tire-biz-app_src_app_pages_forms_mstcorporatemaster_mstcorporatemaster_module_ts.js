"use strict";
(self["webpackChunkn_tire_angular"] = self["webpackChunkn_tire_angular"] || []).push([["projects_n-tire-biz-app_src_app_pages_forms_mstcorporatemaster_mstcorporatemaster_module_ts"],{

/***/ 48444:
/*!********************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatemaster/mstcorporatemaster.component.ts ***!
  \********************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstcorporatemasterComponent": () => (/* binding */ mstcorporatemasterComponent)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstcorporatemaster_component_html__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./mstcorporatemaster.component.html */ 68406);
/* harmony import */ var E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstcorporatemaster_mstcorporatemaster_component_ts_css_E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_inline_resource_js_data_CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5tc3RfY29yX2J0bnsKICAgICAgICAgIHBhZGRpbmc6IDRweCA2cHggIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3X2J0bnsKICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3c3VibWl0ewogICAgICAgICAgbWFyZ2luLXRvcDogNHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgfQogICAg_E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstcorporatemaster_mstcorporatemaster_component_ts__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatemaster/mstcorporatemaster.component.ts.css!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5tc3RfY29yX2J0bnsKICAgICAgICAgIHBhZGRpbmc6IDRweCA2cHggIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3X2J0bnsKICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3c3VibWl0ewogICAgICAgICAgbWFyZ2luLXRvcDogNHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgfQogICAg!./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatemaster/mstcorporatemaster.component.ts */ 67813);
/* harmony import */ var _service_mstcorporatemaster_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./../../../service/mstcorporatemaster.service */ 28880);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/toast.service */ 82301);
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! @angular/common */ 54364);
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__ = __webpack_require__(/*! @angular/platform-browser */ 71570);
/* harmony import */ var _corporate_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../corporate.component */ 37630);
/* harmony import */ var _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/custom/smart-table-datepicker.component */ 55163);
/* harmony import */ var ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ng2-smart-table */ 98391);
/* harmony import */ var _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @ng-bootstrap/ng-bootstrap */ 81288);
/* harmony import */ var ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ng-keyboard-shortcuts */ 76198);
/* harmony import */ var _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! @ngx-translate/core */ 70325);
/* harmony import */ var _pages_forms_mstcorporatelocation_mstcorporatelocation_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./../../../pages/forms/mstcorporatelocation/mstcorporatelocation.component */ 79116);
/* harmony import */ var _service_mstcorporatelocation_service__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../../../service/mstcorporatelocation.service */ 63723);
/* harmony import */ var _pages_forms_mstjobrequirement_mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./../../../pages/forms/mstjobrequirement/mstjobrequirement.component */ 99457);
/* harmony import */ var _service_mstjobrequirement_service__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./../../../service/mstjobrequirement.service */ 33446);
/* harmony import */ var _pages_forms_mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./../../../pages/forms/mstjobstatus/mstjobstatus.component */ 83793);
/* harmony import */ var _service_mstjobstatus_service__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./../../../service/mstjobstatus.service */ 60934);
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! rxjs */ 25160);
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! @angular/forms */ 1707);
/* harmony import */ var primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! primeng/dynamicDialog */ 35981);
/* harmony import */ var _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/service/shared.service */ 70041);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/session.service */ 57318);
/* harmony import */ var ngx_spinner__WEBPACK_IMPORTED_MODULE_28__ = __webpack_require__(/*! ngx-spinner */ 85991);
/* harmony import */ var _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/core/services/theme.service */ 8482);
/* harmony import */ var _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/shared/helper */ 52538);









//Dropdown - nvarchar(5) - Backoffice -> Fixed Values menu

//child table



//Shortcuts

//translator









//primeng services



//session,application constants




//custom fields & attachments

let mstcorporatemasterComponent = class mstcorporatemasterComponent {
    constructor(nav, translate, keyboard, router, themeService, ngbDateParserFormatter, dialogRef, dynamicconfig, dialog, mstcorporatemaster_service, mstcorporatelocation_service, mstjobrequirement_service, mstjobstatus_service, fb, sharedService, sessionService, toastr, sanitizer, currentRoute, spinner) {
        this.nav = nav;
        this.translate = translate;
        this.keyboard = keyboard;
        this.router = router;
        this.themeService = themeService;
        this.ngbDateParserFormatter = ngbDateParserFormatter;
        this.dialogRef = dialogRef;
        this.dynamicconfig = dynamicconfig;
        this.dialog = dialog;
        this.mstcorporatemaster_service = mstcorporatemaster_service;
        this.mstcorporatelocation_service = mstcorporatelocation_service;
        this.mstjobrequirement_service = mstjobrequirement_service;
        this.mstjobstatus_service = mstjobstatus_service;
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
        this.pkoptionsEvent = new _angular_core__WEBPACK_IMPORTED_MODULE_16__.EventEmitter(); //autocomplete of pk
        this.toolbarVisible = true;
        this.CustomFormName = "";
        this.CustomFormField = "";
        this.CustomFormFieldValue = "";
        this.isSubmitted = false;
        this.ShowTableslist = [];
        this.bfilterPopulate_mstcorporatemasters = false;
        this.bfilterPopulate_mstcorporatelocations = false;
        this.bfilterPopulate_mstjobrequirements = false;
        this.bfilterPopulate_mstjobstatuses = false;
        this.mstcorporatemaster_menuactions = [];
        this.mstcorporatelocation_menuactions = [];
        this.mstjobrequirement_menuactions = [];
        this.mstjobstatus_menuactions = [];
        this.exportTime = { hour: 7, minute: 15, meriden: 'PM', format: 24 };
        this.AttachmentURL = _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_15__.AppConstants.AttachmentURL;
        this.useridvisible = false;
        this.showApplicantmenu = false;
        this.showAdminMenuaccess = false;
        this.showCorporateMenuaccess = false;
        this.Deleted_mstcorporatelocation_IDs = "";
        this.mstcorporatelocations_ID = "1";
        this.Deleted_mstjobrequirement_IDs = "";
        this.mstjobrequirements_ID = "2";
        this.Deleted_mstjobstatus_IDs = "";
        this.mstjobstatuses_ID = "3";
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
        this.mstcorporatemaster_Form = this.fb.group({
            pk: [null],
            corporateid: [null],
            companyname: [null],
            tlnumber: [null],
            taxregistrationnumber: [null],
            licensevalidto: [null],
            kycupload: [null],
            userid: [null],
            status: [null],
            statusdesc: [null],
        });
    }
    get f() { return this.mstcorporatemaster_Form.controls; }
    //when child screens are clicked - it will be made invisible
    ToolBar(prop) {
        this.toolbarVisible = prop;
    }
    //function called when we navigate to other page.defined in routing
    canDeactivate() {
        debugger;
        if (this.mstcorporatemaster_Form.dirty && this.mstcorporatemaster_Form.touched) {
            if (confirm('Do you want to exit the page?')) {
                return rxjs__WEBPACK_IMPORTED_MODULE_17__.Observable.of(true).delay(1000);
            }
            else {
                return rxjs__WEBPACK_IMPORTED_MODULE_17__.Observable.of(false);
            }
        }
        return rxjs__WEBPACK_IMPORTED_MODULE_17__.Observable.of(true);
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
        let pos = this.pkList.map(function (e) { return e.corporateid.toString(); }).indexOf(this.formid.toString());
        if (pos > 0)
            this.PopulateScreen(this.pkList[pos - 1].pkcol);
    }
    next() {
        debugger;
        let pos = this.pkList.map(function (e) { return e.corporateid.toString(); }).indexOf(this.formid.toString());
        if (pos >= 0 && pos != this.pkList.length)
            this.PopulateScreen(this.pkList[pos + 1].pkcol);
    }
    //on searching in pk autocomplete
    onSelectedpk(pkDetail) {
        if (pkDetail.corporateid && pkDetail) {
            this.PopulateScreen(pkDetail.pkcol);
        }
    }
    // initialize
    ngOnInit() {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            if (this.sessionService.getItem('role') == '1') {
                this.userrole = 'Admin';
                this.showAdminMenuaccess = true;
                this.showApplicantmenu = false;
                this.showCorporateMenuaccess = false;
            }
            else if (this.sessionService.getItem('role') == '2') {
                this.userrole = 'Applicant';
                this.showApplicantmenu = true;
                this.showAdminMenuaccess = false;
                this.showCorporateMenuaccess = false;
            }
            else if (this.sessionService.getItem('role') == '3') {
                this.userrole = 'Corporate';
                this.showCorporateMenuaccess = true;
                this.showApplicantmenu = false;
                this.showAdminMenuaccess = false;
            }
            this.sessionService.setItem("choosefileforprofile", "ok");
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
            let mstcorporatemasterid = null;
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
            this.formid = mstcorporatemasterid;
            //alert(mstcorporatemasterid);
            //if pk is empty - go to resetting form.fill default values.otherwise, fetch records
            if (this.pkcol == null) {
                this.Set_mstcorporatelocations_TableConfig();
                setTimeout(() => {
                    //this.Set_mstcorporatelocations_TableDropDownConfig();
                });
                this.Set_mstjobrequirements_TableConfig();
                setTimeout(() => {
                    //this.Set_mstjobrequirements_TableDropDownConfig();
                });
                this.Set_mstjobstatuses_TableConfig();
                setTimeout(() => {
                    //this.Set_mstjobstatuses_TableDropDownConfig();
                });
                this.resetForm();
            }
            else {
                if (this.maindata == undefined || this.maindata == null || this.maindata.save == true)
                    yield this.PopulateScreen(this.pkcol);
                //get the record from api
                //foreign keys
            }
            this.mstcorporatemaster_service.getDefaultData().then(res => {
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //autocomplete
            this.mstcorporatemaster_service.get_mstcorporatemasters_List().then(res => {
                this.pkList = res;
                this.pkoptionsEvent.emit(this.pkList);
            }).catch((err) => { this.spinner.hide(); console.log(err); });
            //setting the flag that the screen is not touched
            this.mstcorporatemaster_Form.markAsUntouched();
            this.mstcorporatemaster_Form.markAsPristine();
        });
    }
    getkycupload() {
        debugger;
        if (this.kycupload.getAttachmentList().length > 0) {
            let file = this.kycupload.getAttachmentList()[0];
            this.sharedService.geturl(file.filekey, file.type);
        }
    }
    resetForm() {
        if (this.mstcorporatemaster_Form != null)
            this.mstcorporatemaster_Form.reset();
        this.mstcorporatemaster_Form.patchValue({});
        setTimeout(() => {
            this.mstcorporatelocations_LoadTable();
            this.mstjobrequirements_LoadTable();
            this.mstjobstatuses_LoadTable();
        });
        this.PopulateFromMainScreen(this.data, false);
        this.PopulateFromMainScreen(this.dynamicconfig.data, true);
        this.useridvisible = false;
    }
    onDelete() {
        let corporateid = this.mstcorporatemaster_Form.get('corporateid').value;
        if (corporateid != null) {
            if (confirm('Are you sure to delete this record ?')) {
                this.mstcorporatemaster_service.delete_mstcorporatemaster(corporateid).then(res => {
                    this.resetForm();
                }).catch((err) => { this.spinner.hide(); console.log(err); });
            }
        }
        else {
            this.toastr.addSingle("error", "", "select a record");
        }
    }
    onCopy() {
        this.mstcorporatemaster_Form.patchValue({
            corporateid: null
        });
        if (this.formData.corporateid != null)
            this.formData.corporateid = null;
        for (let i = 0; i < this.tbl_mstcorporatelocations.source.length; i++) {
            this.tbl_mstcorporatelocations.source[i].locationid = null;
        }
        for (let i = 0; i < this.tbl_mstjobrequirements.source.length; i++) {
            this.tbl_mstjobrequirements.source[i].jobid = null;
        }
        for (let i = 0; i < this.tbl_mstjobstatuses.source.length; i++) {
            this.tbl_mstjobstatuses.source[i].viewid = null;
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
                    else if (key == "licensevalidto")
                        this.mstcorporatemaster_Form.patchValue({ "licensevalidto": this.ngbDateParserFormatter.parse(mainscreendata[key]) });
                    else if (ctrltype == "string") {
                        this.mstcorporatemaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    else {
                        this.mstcorporatemaster_Form.patchValue({ [key]: mainscreendata[key] });
                    }
                    {
                        {
                            if (bdisable && this.mstcorporatemaster_Form.controls[key] != undefined) {
                                this.mstcorporatemaster_Form.controls[key].disable({ onlySelf: true });
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
    goBack() {
        // this.router.navigate(["/home/ + CorporateDashboardComponent"])
        this.router.navigate(['/home/corporatedashboard']);
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
    edit_mstcorporatemasters() {
        this.showview = false;
        setTimeout(() => {
            if (this.kycupload != null && this.kycupload != undefined)
                this.kycupload.setattachmentlist(this.mstcorporatemaster_Form.get('kycupload').value);
        });
        return false;
    }
    PopulateScreen(pkcol) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            this.spinner.show();
            this.mstcorporatemaster_service.get_mstcorporatemasters_ByEID(pkcol).then(res => {
                this.spinner.hide();
                this.formData = res.mstcorporatemaster;
                let formproperty = res.mstcorporatemaster.formproperty;
                if (formproperty && formproperty.edit == false)
                    this.showview = true;
                this.pkcol = res.mstcorporatemaster.pkcol;
                this.formid = res.mstcorporatemaster.corporateid;
                this.FillData(res);
            }).catch((err) => { console.log(err); });
        });
    }
    FillData(res) {
        this.formData = res.mstcorporatemaster;
        this.formid = res.mstcorporatemaster.corporateid;
        this.pkcol = res.mstcorporatemaster.pkcol;
        this.bmyrecord = false;
        if (res.mstcorporatemaster.applicantid == this.sessionService.getItem('applicantid'))
            this.bmyrecord = true;
        console.log(res);
        //console.log(res.order);
        //console.log(res.orderDetails);
        this.mstcorporatemaster_Form.patchValue({
            corporateid: res.mstcorporatemaster.corporateid,
            companyname: res.mstcorporatemaster.companyname,
            tlnumber: res.mstcorporatemaster.tlnumber,
            taxregistrationnumber: res.mstcorporatemaster.taxregistrationnumber,
            licensevalidto: this.ngbDateParserFormatter.parse(res.mstcorporatemaster.licensevalidto),
            kycupload: JSON.parse(res.mstcorporatemaster.kycupload),
            userid: res.mstcorporatemaster.userid,
            status: res.mstcorporatemaster.status,
            statusdesc: res.mstcorporatemaster.statusdesc,
        });
        this.useridvisible = false;
        //hide list
        if (res.visiblelist != undefined && res.visiblelist.indexOf("userid") >= 0)
            this.useridvisible = true;
        if (res.hidelist != undefined && res.hidelist.indexOf("userid") >= 0)
            this.useridvisible = false;
        this.mstcorporatemaster_menuactions = res.mstcorporatemaster_menuactions;
        this.mstcorporatelocation_menuactions = res.mstcorporatelocation_menuactions;
        this.mstcorporatelocations_visiblelist = res.mstcorporatelocations_visiblelist;
        this.mstjobrequirement_menuactions = res.mstjobrequirement_menuactions;
        this.mstjobrequirements_visiblelist = res.mstjobrequirements_visiblelist;
        this.mstjobstatus_menuactions = res.mstjobstatus_menuactions;
        this.mstjobstatuses_visiblelist = res.mstjobstatuses_visiblelist;
        if (this.mstcorporatemaster_Form.get('kycupload').value != null && this.mstcorporatemaster_Form.get('kycupload').value != "" && this.kycupload != null && this.kycupload != undefined)
            this.kycupload.setattachmentlist(this.mstcorporatemaster_Form.get('kycupload').value);
        //Child Tables if any
        this.Set_mstcorporatelocations_TableConfig();
        this.mstcorporatelocations_LoadTable(res.mstcorporatelocations);
        this.Set_mstjobrequirements_TableConfig();
        this.mstjobrequirements_LoadTable(res.mstjobrequirements);
        this.Set_mstjobstatuses_TableConfig();
        this.mstjobstatuses_LoadTable(res.mstjobstatuses);
    }
    validate() {
        let ret = true;
        return ret;
    }
    getHtml(html) {
        let ret = "";
        ret = html;
        for (let key in this.mstcorporatemaster_Form.controls) {
            let val = this.mstcorporatemaster_Form.controls[key].value;
            if (val == 'null' || val == null || val == undefined)
                val = '';
            if (this.mstcorporatemaster_Form.controls[key] != null) {
                if (key == "kycupload") {
                    if (this.formData != null && this.formData[key] != null && this.formData[key] != '[]' && this.formData[key] != undefined && this.formData[key].length > 0)
                        ret = ret.replace(new RegExp('##' + key + '##', 'g'), _n_tire_biz_app_src_app_shared_helper__WEBPACK_IMPORTED_MODULE_15__.AppConstants.AttachmentURL + JSON.parse(this.formData[key])[0]["name"]);
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            this.isSubmitted = true;
            if (!this.mstcorporatemaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            var obj = this.mstcorporatemaster_Form.getRawValue();
            obj.licensevalidto = new Date(this.mstcorporatemaster_Form.get('licensevalidto').value ? this.ngbDateParserFormatter.format(this.mstcorporatemaster_Form.get('licensevalidto').value) + '  UTC' : null);
            if (this.kycupload.getAttachmentList() != null)
                obj.kycupload = JSON.stringify(this.kycupload.getAttachmentList());
            console.log(obj);
            yield this.sharedService.upload(this.kycupload.getAllFiles());
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
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            debugger;
            this.isSubmitted = true;
            let strError = "";
            // Object.keys(this.mstcorporatemaster_Form.controls).forEach(key => {
            //     const controlErrors: ValidationErrors = this.mstcorporatemaster_Form.get(key).errors;
            //     if (controlErrors != null) {
            //         Object.keys(controlErrors).forEach(keyError => {
            //             strError += 'control: ' + key + ', Error: ' + keyError + '<BR>';
            //         });
            //     }
            // });
            if (strError != "")
                return this.sharedService.alert(strError);
            if (!this.mstcorporatemaster_Form.valid) {
                this.toastr.addSingle("error", "", "Enter the required fields");
                return;
            }
            if (!this.validate()) {
                return;
            }
            this.formData = this.mstcorporatemaster_Form.getRawValue();
            if (this.dynamicconfig.data != null) {
                for (let key in this.dynamicconfig.data) {
                    if (key != 'visiblelist' && key != 'hidelist') {
                        if (this.mstcorporatemaster_Form.controls[key] != null) {
                            this.formData[key] = this.mstcorporatemaster_Form.controls[key].value;
                        }
                    }
                }
            }
            this.formData.licensevalidto = new Date(this.mstcorporatemaster_Form.get('licensevalidto').value ? this.ngbDateParserFormatter.format(this.mstcorporatemaster_Form.get('licensevalidto').value) + '  UTC' : null);
            this.formData.kycupload = this.mstcorporatemaster_Form.get('kycupload').value;
            this.formData.Deleted_mstcorporatelocation_IDs = this.Deleted_mstcorporatelocation_IDs;
            this.formData.Deleted_mstjobrequirement_IDs = this.Deleted_mstjobrequirement_IDs;
            this.formData.Deleted_mstjobstatus_IDs = this.Deleted_mstjobstatus_IDs;
            if (this.kycupload.getAttachmentList() != null)
                this.formData.kycupload = JSON.stringify(this.kycupload.getAttachmentList());
            console.log(this.formData);
            this.spinner.show();
            this.mstcorporatemaster_service.saveOrUpdate_mstcorporatemasters(this.formData, (_b = (_a = this.tbl_mstcorporatelocations) === null || _a === void 0 ? void 0 : _a.source) === null || _b === void 0 ? void 0 : _b.data, (_d = (_c = this.tbl_mstjobrequirements) === null || _c === void 0 ? void 0 : _c.source) === null || _d === void 0 ? void 0 : _d.data, (_f = (_e = this.tbl_mstjobstatuses) === null || _e === void 0 ? void 0 : _e.source) === null || _f === void 0 ? void 0 : _f.data).subscribe((res) => (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
                yield this.sharedService.upload(this.kycupload.getAllFiles());
                if (this.tbl_mstcorporatelocations.source) {
                    for (let i = 0; i < this.tbl_mstcorporatelocations.source.data.length; i++) {
                        if (this.tbl_mstcorporatelocations.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstcorporatelocations.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstjobrequirements.source) {
                    for (let i = 0; i < this.tbl_mstjobrequirements.source.data.length; i++) {
                        if (this.tbl_mstjobrequirements.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstjobrequirements.source.data[i].fileAttachmentList);
                    }
                }
                if (this.tbl_mstjobstatuses.source) {
                    for (let i = 0; i < this.tbl_mstjobstatuses.source.data.length; i++) {
                        if (this.tbl_mstjobstatuses.source.data[i].fileAttachmentList)
                            yield this.sharedService.upload(this.tbl_mstjobstatuses.source.data[i].fileAttachmentList);
                    }
                }
                this.spinner.hide();
                debugger;
                this.toastr.addSingle("success", "", "Successfully saved");
                this.mstcorporatemaster_Form.reset();
                this.objvalues.push(res.mstcorporatemaster);
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
                        this.objvalues.push(res.mstcorporatemaster);
                        this.dialogRef.close(this.objvalues);
                    }
                    else {
                        this.FillData(res);
                    }
                }
                this.mstcorporatemaster_Form.markAsUntouched();
                this.mstcorporatemaster_Form.markAsPristine();
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
        this.tbl_mstcorporatelocations.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
        this.tbl_mstjobrequirements.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
        this.tbl_mstjobstatuses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
    }
    AddOrEdit_mstcorporatelocation(event, locationid, corporateid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstcorporatelocation_mstcorporatelocation_component__WEBPACK_IMPORTED_MODULE_6__.mstcorporatelocationComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, locationid, corporateid, visiblelist: this.mstcorporatelocations_visiblelist, hidelist: this.mstcorporatelocations_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstcorporatelocations.source.add(res[i]);
                    }
                    this.tbl_mstcorporatelocations.source.refresh();
                }
                else {
                    this.tbl_mstcorporatelocations.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_mstcorporatelocation(event, childID, i) {
        if (childID != null)
            this.Deleted_mstcorporatelocation_IDs += childID + ",";
        this.tbl_mstcorporatelocations.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstjobrequirement(event, jobid, corporateid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstjobrequirement_mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_8__.mstjobrequirementComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, jobid, corporateid, visiblelist: this.mstjobrequirements_visiblelist, hidelist: this.mstjobrequirements_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstjobrequirements.source.add(res[i]);
                    }
                    this.tbl_mstjobrequirements.source.refresh();
                }
                else {
                    this.tbl_mstjobrequirements.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_mstjobrequirement(event, childID, i) {
        if (childID != null)
            this.Deleted_mstjobrequirement_IDs += childID + ",";
        this.tbl_mstjobrequirements.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    AddOrEdit_mstjobstatus(event, viewid, corporateid) {
        let add = false;
        if (event == null)
            add = true;
        let childsave = false;
        if (this.pkcol != undefined && this.pkcol != null)
            childsave = true;
        this.dialog.open(_pages_forms_mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_10__.mstjobstatusComponent, {
            data: { showview: false, save: childsave, maindatapkcol: this.pkcol, event, viewid, corporateid, visiblelist: this.mstjobstatuses_visiblelist, hidelist: this.mstjobstatuses_hidelist, ScreenType: 2 },
        }).onClose.subscribe(res => {
            if (res) {
                if (add) {
                    for (let i = 0; i < res.length; i++) {
                        this.tbl_mstjobstatuses.source.add(res[i]);
                    }
                    this.tbl_mstjobstatuses.source.refresh();
                }
                else {
                    this.tbl_mstjobstatuses.source.update(event.data, res[0]);
                }
            }
        });
    }
    onDelete_mstjobstatus(event, childID, i) {
        // let viewID = event.data.viewid;
        // // alert(viewID);
        // if (confirm('Do you want to delete this record?')) {
        //     this.mstcorporatemaster_service.delete_mstcorporatemaster(viewID).then(res => {
        //         this.mstcorporatemaster_service.getListBy_corporateid(this.applicantid).then(res => {
        //             this.ngOnInit();
        //             this.mstjobstatuses_LoadTable(res);
        //         });
        //     })
        // } else {
        //     return;
        // }
        let viewid = event.data.viewid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstcorporatemaster_service.delete_mstcorporatemaster(viewid).then(res => this.mstjobstatuses_LoadTable(res));
        }
        // if (childID != null)
        //     this.Deleted_mstjobstatus_IDs += childID + ",";
        // this.tbl_mstjobstatuses.source.data.splice(i, 1);
        //this.updateGrandTotal();
    }
    PrevForm() {
        let formid = this.sessionService.getItem("key");
        let prevform = this.sessionService.getItem("prevform");
        this.router.navigate(["/home/" + prevform + "/" + prevform + "/edit/" + formid]);
    }
    show_mstcorporatelocations_Checkbox() {
        debugger;
        if (this.tbl_mstcorporatelocations.source.settings['selectMode'] == 'multi')
            this.tbl_mstcorporatelocations.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstcorporatelocations.source.settings['selectMode'] = 'multi';
        this.tbl_mstcorporatelocations.source.initGrid();
    }
    delete_mstcorporatelocations_All() {
        this.tbl_mstcorporatelocations.source.settings['selectMode'] = 'single';
    }
    show_mstcorporatelocations_Filter() {
        setTimeout(() => {
            //  this.Set_mstcorporatelocations_TableDropDownConfig();
        });
        if (this.tbl_mstcorporatelocations.source.settings != null)
            this.tbl_mstcorporatelocations.source.settings['hideSubHeader'] = !this.tbl_mstcorporatelocations.source.settings['hideSubHeader'];
        this.tbl_mstcorporatelocations.source.initGrid();
    }
    show_mstcorporatelocations_InActive() {
    }
    enable_mstcorporatelocations_InActive() {
    }
    Set_mstcorporatelocations_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstcorporatelocations) {
                var clone = this.sharedService.clone(this.tbl_mstcorporatelocations.source.settings);
                if (clone.columns['countryid'] != undefined)
                    clone.columns['countryid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_countryid.value)), }, };
                if (clone.columns['countryid'] != undefined)
                    clone.columns['countryid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_countryid.value)), }, };
                this.tbl_mstcorporatelocations.source.settings = clone;
                this.tbl_mstcorporatelocations.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstcorporatelocations.source.settings);
                if (clone.columns['stateid'] != undefined)
                    clone.columns['stateid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_stateid.value)), }, };
                if (clone.columns['stateid'] != undefined)
                    clone.columns['stateid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_stateid.value)), }, };
                this.tbl_mstcorporatelocations.source.settings = clone;
                this.tbl_mstcorporatelocations.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstcorporatelocations.source.settings);
                if (clone.columns['cityid'] != undefined)
                    clone.columns['cityid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_cityid.value)), }, };
                if (clone.columns['cityid'] != undefined)
                    clone.columns['cityid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstcorporatelocations_cityid.value)), }, };
                this.tbl_mstcorporatelocations.source.settings = clone;
                this.tbl_mstcorporatelocations.source.initGrid();
            }
            this.bfilterPopulate_mstcorporatelocations = true;
        });
    }
    mstcorporatelocations_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstcorporatelocations_TableConfig() {
        this.mstcorporatelocations_settings = {
            hideSubHeader: true,
            mode: 'internal',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true,
                delete: !this.showview,
                position: 'left',
                custom: this.mstcorporatelocation_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                // deleteButtonContent: '<i class="nb-trash"></i>',
                // confirmDelete: true,
                deleteButtonContent: '',
                confirmDelete: false,
            },
            columns: {
                // branchid: {
                //     title: '',
                //     filter: false,
                // },
                countryiddesc: {
                    title: 'Country',
                    type: 'html',
                    filter: true,
                },
                stateiddesc: {
                    title: 'State',
                    type: 'html',
                    filter: true,
                },
                cityiddesc: {
                    title: 'City',
                    type: 'html',
                    filter: true,
                },
                address1: {
                    title: 'Address1',
                    type: '',
                    filter: true,
                },
                address2: {
                    title: 'Address2',
                    type: '',
                    filter: true,
                },
                pincode: {
                    title: 'Pin Code',
                    type: '',
                    filter: true,
                },
                contactperson: {
                    title: 'Contact Person',
                    type: '',
                    filter: true,
                },
                designation: {
                    title: 'Designation',
                    type: '',
                    filter: true,
                },
                emailid: {
                    title: 'Email',
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
    mstcorporatelocations_LoadTable(mstcorporatelocations = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstcorporatelocations_ID) >= 0) {
            if (this.tbl_mstcorporatelocations != undefined)
                this.tbl_mstcorporatelocations.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
            if (this.tbl_mstcorporatelocations != undefined)
                this.tbl_mstcorporatelocations.source.load(mstcorporatelocations);
            if (this.tbl_mstcorporatelocations != undefined)
                this.tbl_mstcorporatelocations.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    mstcorporatelocations_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstcorporatemaster_service.mstcorporatelocations.length == 0)
    {
        this.tbl_mstcorporatelocations.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstcorporatelocation();
        this.mstcorporatemaster_service.mstcorporatelocations.push(obj);
        this.tbl_mstcorporatelocations.source.refresh();
        if ((this.mstcorporatemaster_service.mstcorporatelocations.length / this.tbl_mstcorporatelocations.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstcorporatelocations.source.getPaging().page)
        {
            this.tbl_mstcorporatelocations.source.setPage((this.mstcorporatemaster_service.mstcorporatelocations.length / this.tbl_mstcorporatelocations.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstcorporatelocations.source.grid.edit(this.tbl_mstcorporatelocations.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstcorporatelocations.source.data.indexOf(event.data);
    this.onDelete_mstcorporatelocation(event,event.data.locationid,((this.tbl_mstcorporatelocations.source.getPaging().page-1) *this.tbl_mstcorporatelocations.source.getPaging().perPage)+index);
    this.tbl_mstcorporatelocations.source.refresh();
    break;
    }
    }

    */
    mstcorporatelocations_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_mstcorporatelocation(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstcorporatelocation(event, event.data.locationid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstcorporatelocation(event, event.data.locationid, ((this.tbl_mstcorporatelocations.source.getPaging().page - 1) * this.tbl_mstcorporatelocations.source.getPaging().perPage) + event.index);
                this.tbl_mstcorporatelocations.source.refresh();
                break;
        }
    }
    mstcorporatelocations_onDelete(obj) {
        let locationid = obj.data.locationid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstcorporatemaster_service.delete_mstcorporatemaster(locationid).then(res => this.mstcorporatelocations_LoadTable());
        }
    }
    onCustom_mstcorporatelocations_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstcorporatelocations");
            let formname = objbomenuaction.actionname;
        });
    }
    mstcorporatelocations_Paging(val) {
        debugger;
        this.tbl_mstcorporatelocations.source.setPaging(1, val, true);
    }
    handle_mstcorporatelocations_GridSelected(event) {
        this.mstcorporatelocations_selectedindex = this.tbl_mstcorporatelocations.source.findIndex(i => i.locationid === event.data.locationid);
    }
    Is_mstcorporatelocations_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstcorporatelocations_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_mstjobrequirements_Checkbox() {
        debugger;
        if (this.tbl_mstjobrequirements.source.settings['selectMode'] == 'multi')
            this.tbl_mstjobrequirements.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstjobrequirements.source.settings['selectMode'] = 'multi';
        this.tbl_mstjobrequirements.source.initGrid();
    }
    delete_mstjobrequirements_All() {
        this.tbl_mstjobrequirements.source.settings['selectMode'] = 'single';
    }
    show_mstjobrequirements_Filter() {
        setTimeout(() => {
            //  this.Set_mstjobrequirements_TableDropDownConfig();
        });
        if (this.tbl_mstjobrequirements.source.settings != null)
            this.tbl_mstjobrequirements.source.settings['hideSubHeader'] = !this.tbl_mstjobrequirements.source.settings['hideSubHeader'];
        this.tbl_mstjobrequirements.source.initGrid();
    }
    show_mstjobrequirements_InActive() {
    }
    enable_mstjobrequirements_InActive() {
    }
    Set_mstjobrequirements_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstjobrequirements) {
                var clone = this.sharedService.clone(this.tbl_mstjobrequirements.source.settings);
                if (clone.columns['locations'] != undefined)
                    clone.columns['locations'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_locations.value)), }, };
                if (clone.columns['locations'] != undefined)
                    clone.columns['locations'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_locations.value)), }, };
                this.tbl_mstjobrequirements.source.settings = clone;
                this.tbl_mstjobrequirements.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstjobrequirements.source.settings);
                if (clone.columns['skills'] != undefined)
                    clone.columns['skills'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_skills.value)), }, };
                if (clone.columns['skills'] != undefined)
                    clone.columns['skills'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_skills.value)), }, };
                this.tbl_mstjobrequirements.source.settings = clone;
                this.tbl_mstjobrequirements.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstjobrequirements.source.settings);
                if (clone.columns['education'] != undefined)
                    clone.columns['education'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_education.value)), }, };
                if (clone.columns['education'] != undefined)
                    clone.columns['education'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_education.value)), }, };
                this.tbl_mstjobrequirements.source.settings = clone;
                this.tbl_mstjobrequirements.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstjobrequirements.source.settings);
                if (clone.columns['language'] != undefined)
                    clone.columns['language'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_language.value)), }, };
                if (clone.columns['language'] != undefined)
                    clone.columns['language'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobrequirements_language.value)), }, };
                this.tbl_mstjobrequirements.source.settings = clone;
                this.tbl_mstjobrequirements.source.initGrid();
            }
            this.bfilterPopulate_mstjobrequirements = true;
        });
    }
    mstjobrequirements_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstjobrequirements_TableConfig() {
        this.mstjobrequirements_settings = {
            hideSubHeader: true,
            mode: 'internal',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true,
                // delete: !this.showview,
                position: 'left',
                // custom: this.mstjobrequirement_menuactions
                custom: ""
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                // deleteButtonContent: '<i class="nb-trash"></i>',
                // confirmDelete: true,
                deleteButtonContent: '',
                confirmDelete: false,
            },
            columns: {
                jobdescription: {
                    title: 'Job Description',
                    type: '',
                    filter: true,
                },
                jobrequirement: {
                    title: 'Job Requirement',
                    type: '',
                    filter: true,
                },
                numberofpositions: {
                    title: 'Number Of Positions',
                    type: 'number',
                    filter: true,
                },
                tobefilledbefore: {
                    title: 'To Be Filled Before',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_5__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_5__.SmartTableDatepickerComponent,
                    },
                },
                experiencefrom: {
                    title: 'Experience From',
                    type: 'number',
                    filter: true,
                },
                experienceto: {
                    title: 'Experience To',
                    type: 'number',
                    filter: true,
                },
                // locationsdesc: {
                //     title: 'Locations',
                //     type: 'html',
                //     filter: true,
                // },
                // skillsdesc: {
                //     title: 'Skills',
                //     type: 'html',
                //     filter: true,
                // },
                // educationdesc: {
                //     title: 'Education',
                //     type: 'html',
                //     filter: true,
                // },
                // languagedesc: {
                //     title: 'Language',
                //     type: 'html',
                //     filter: true,
                // },
                referenceavailability: {
                    title: 'Reference Availability',
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
                referencevalidation: {
                    title: 'Reference Validation',
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
    mstjobrequirements_LoadTable(mstjobrequirements = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobrequirements_ID) >= 0) {
            if (this.tbl_mstjobrequirements != undefined)
                this.tbl_mstjobrequirements.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
            if (this.tbl_mstjobrequirements != undefined)
                this.tbl_mstjobrequirements.source.load(mstjobrequirements);
            if (this.tbl_mstjobrequirements != undefined)
                this.tbl_mstjobrequirements.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    mstjobrequirements_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstcorporatemaster_service.mstjobrequirements.length == 0)
    {
        this.tbl_mstjobrequirements.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstjobrequirement();
        this.mstcorporatemaster_service.mstjobrequirements.push(obj);
        this.tbl_mstjobrequirements.source.refresh();
        if ((this.mstcorporatemaster_service.mstjobrequirements.length / this.tbl_mstjobrequirements.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstjobrequirements.source.getPaging().page)
        {
            this.tbl_mstjobrequirements.source.setPage((this.mstcorporatemaster_service.mstjobrequirements.length / this.tbl_mstjobrequirements.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstjobrequirements.source.grid.edit(this.tbl_mstjobrequirements.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstjobrequirements.source.data.indexOf(event.data);
    this.onDelete_mstjobrequirement(event,event.data.jobid,((this.tbl_mstjobrequirements.source.getPaging().page-1) *this.tbl_mstjobrequirements.source.getPaging().perPage)+index);
    this.tbl_mstjobrequirements.source.refresh();
    break;
    }
    }

    */
    mstjobrequirements_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_mstjobrequirement(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstjobrequirement(event, event.data.jobid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstjobrequirement(event, event.data.jobid, ((this.tbl_mstjobrequirements.source.getPaging().page - 1) * this.tbl_mstjobrequirements.source.getPaging().perPage) + event.index);
                this.tbl_mstjobrequirements.source.refresh();
                break;
        }
    }
    mstjobrequirements_onDelete(obj) {
        let jobid = obj.data.jobid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstcorporatemaster_service.delete_mstcorporatemaster(jobid).then(res => this.mstjobrequirements_LoadTable());
        }
    }
    onCustom_mstjobrequirements_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstjobrequirements");
            let formname = objbomenuaction.actionname;
        });
    }
    mstjobrequirements_Paging(val) {
        debugger;
        this.tbl_mstjobrequirements.source.setPaging(1, val, true);
    }
    handle_mstjobrequirements_GridSelected(event) {
        this.mstjobrequirements_selectedindex = this.tbl_mstjobrequirements.source.findIndex(i => i.jobid === event.data.jobid);
    }
    Is_mstjobrequirements_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobrequirements_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
    show_mstjobstatuses_Checkbox() {
        debugger;
        if (this.tbl_mstjobstatuses.source.settings['selectMode'] == 'multi')
            this.tbl_mstjobstatuses.source.settings['selectMode'] = 'single';
        else
            this.tbl_mstjobstatuses.source.settings['selectMode'] = 'multi';
        this.tbl_mstjobstatuses.source.initGrid();
    }
    delete_mstjobstatuses_All() {
        this.tbl_mstjobstatuses.source.settings['selectMode'] = 'single';
    }
    show_mstjobstatuses_Filter() {
        setTimeout(() => {
            //  this.Set_mstjobstatuses_TableDropDownConfig();
        });
        if (this.tbl_mstjobstatuses.source.settings != null)
            this.tbl_mstjobstatuses.source.settings['hideSubHeader'] = !this.tbl_mstjobstatuses.source.settings['hideSubHeader'];
        this.tbl_mstjobstatuses.source.initGrid();
    }
    show_mstjobstatuses_InActive() {
    }
    enable_mstjobstatuses_InActive() {
    }
    Set_mstjobstatuses_TableDropDownConfig(res) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            if (!this.bfilterPopulate_mstjobstatuses) {
                var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_applicantid.value)), }, };
                if (clone.columns['applicantid'] != undefined)
                    clone.columns['applicantid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_applicantid.value)), }, };
                this.tbl_mstjobstatuses.source.settings = clone;
                this.tbl_mstjobstatuses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
                if (clone.columns['corporateid'] != undefined)
                    clone.columns['corporateid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_corporateid.value)), }, };
                if (clone.columns['corporateid'] != undefined)
                    clone.columns['corporateid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_corporateid.value)), }, };
                this.tbl_mstjobstatuses.source.settings = clone;
                this.tbl_mstjobstatuses.source.initGrid();
                var clone = this.sharedService.clone(this.tbl_mstjobstatuses.source.settings);
                if (clone.columns['jobid'] != undefined)
                    clone.columns['jobid'].filter = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_jobid.value)), }, };
                if (clone.columns['jobid'] != undefined)
                    clone.columns['jobid'].editor = { type: 'list', config: { selectText: 'Select...', list: JSON.parse(JSON.stringify(res.list_mstjobstatuses_jobid.value)), }, };
                this.tbl_mstjobstatuses.source.settings = clone;
                this.tbl_mstjobstatuses.source.initGrid();
            }
            this.bfilterPopulate_mstjobstatuses = true;
        });
    }
    mstjobstatuses_beforesave(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            event.confirm.resolve(event.newData);
        });
    }
    Set_mstjobstatuses_TableConfig() {
        this.mstjobstatuses_settings = {
            hideSubHeader: true,
            mode: 'internal',
            selectMode: 'single',
            actions: {
                columnTitle: '',
                width: '300px',
                add: !this.showview,
                edit: true,
                delete: !this.showview,
                position: 'left',
                custom: this.mstjobstatus_menuactions
            },
            add: {
                addButtonContent: '<i class="nb-plus"></i>',
                createButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmCreate: true,
            },
            edit: {
                editButtonContent: '<i class="fa fa-edit"></i>',
                saveButtonContent: '<i class="nb-checkmark"></i>',
                cancelButtonContent: '<i class="nb-close"></i>',
                confirmSave: true,
            },
            delete: {
                // deleteButtonContent: '<i class="nb-trash"></i>',
                // confirmDelete: true,
                deleteButtonContent: '',
                confirmDelete: false,
            },
            columns: {
                applicantiddesc: {
                    title: 'Applicant',
                    type: 'html',
                    filter: true,
                },
                viewdatetime: {
                    title: 'View Date Time',
                    type: 'custom',
                    renderComponent: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_5__.SmartTableDatepickerRenderComponent,
                    editor: {
                        type: 'custom',
                        component: _n_tire_biz_app_src_app_custom_smart_table_datepicker_component__WEBPACK_IMPORTED_MODULE_5__.SmartTableDatepickerComponent,
                    },
                },
                intereststatus: {
                    title: 'Interest Status',
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
                comments: {
                    title: 'Comments',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                allcomments: {
                    title: 'All Comments',
                    type: 'html',
                    filter: true,
                    editor: {
                        type: 'textarea',
                    },
                },
                jobiddesc: {
                    title: 'Job',
                    type: 'html',
                    filter: true,
                },
                hiringstatus: {
                    title: 'Hiring Status',
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
                ctcoffered: {
                    title: 'C T C Offered',
                    type: '',
                    filter: true,
                },
            },
        };
    }
    mstjobstatuses_LoadTable(mstjobstatuses = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource()) {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobstatuses_ID) >= 0) {
            if (this.tbl_mstjobstatuses != undefined)
                this.tbl_mstjobstatuses.source = new ng2_smart_table__WEBPACK_IMPORTED_MODULE_19__.LocalDataSource();
            if (this.tbl_mstjobstatuses != undefined)
                this.tbl_mstjobstatuses.source.load(mstjobstatuses);
            if (this.tbl_mstjobstatuses != undefined)
                this.tbl_mstjobstatuses.source.setPaging(1, 20, true);
        }
    }
    //external to inline
    /*
    mstjobstatuses_route(event:any,action:any) {
    switch ( action) {
    case 'create':
    if (this.mstcorporatemaster_service.mstjobstatuses.length == 0)
    {
        this.tbl_mstjobstatuses.source.grid.createFormShown = true;
    }
    else
    {
        let obj = new mstjobstatus();
        this.mstcorporatemaster_service.mstjobstatuses.push(obj);
        this.tbl_mstjobstatuses.source.refresh();
        if ((this.mstcorporatemaster_service.mstjobstatuses.length / this.tbl_mstjobstatuses.source.getPaging().perPage).toFixed(0) + 1 != this.tbl_mstjobstatuses.source.getPaging().page)
        {
            this.tbl_mstjobstatuses.source.setPage((this.mstcorporatemaster_service.mstjobstatuses.length / this.tbl_mstjobstatuses.source.getPaging().perPage).toFixed(0) + 1);
        }
        setTimeout(() => {
            this.tbl_mstjobstatuses.source.grid.edit(this.tbl_mstjobstatuses.source.grid.getLastRow());
        });
    }
    break;
    case 'delete':
    let index = this.tbl_mstjobstatuses.source.data.indexOf(event.data);
    this.onDelete_mstjobstatus(event,event.data.viewid,((this.tbl_mstjobstatuses.source.getPaging().page-1) *this.tbl_mstjobstatuses.source.getPaging().perPage)+index);
    this.tbl_mstjobstatuses.source.refresh();
    break;
    }
    }

    */
    mstjobstatuses_route(event, action) {
        var addparam = "";
        if (this.currentRoute.snapshot.paramMap.get('tableid') != null) {
            addparam = "/show/" + this.currentRoute.snapshot.paramMap.get('tableid');
        }
        switch (action) {
            case 'create':
                this.AddOrEdit_mstjobstatus(event, null, this.formid);
                break;
            case 'view':
                break;
            case 'edit':
                this.AddOrEdit_mstjobstatus(event, event.data.viewid, this.formid);
                break;
            case 'delete':
                this.onDelete_mstjobstatus(event, event.data.viewid, ((this.tbl_mstjobstatuses.source.getPaging().page - 1) * this.tbl_mstjobstatuses.source.getPaging().perPage) + event.index);
                this.tbl_mstjobstatuses.source.refresh();
                break;
        }
    }
    mstjobstatuses_onDelete(obj) {
        let viewid = obj.data.viewid;
        if (confirm('Are you sure to delete this record ?')) {
            this.mstcorporatemaster_service.delete_mstcorporatemaster(viewid).then(res => this.mstjobstatuses_LoadTable());
        }
    }
    onCustom_mstjobstatuses_Action(event) {
        return (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__awaiter)(this, void 0, void 0, function* () {
            let objbomenuaction = yield this.sharedService.onCustomAction(event, "mstjobstatuses");
            let formname = objbomenuaction.actionname;
        });
    }
    mstjobstatuses_Paging(val) {
        debugger;
        this.tbl_mstjobstatuses.source.setPaging(1, val, true);
    }
    handle_mstjobstatuses_GridSelected(event) {
        this.mstjobstatuses_selectedindex = this.tbl_mstjobstatuses.source.findIndex(i => i.viewid === event.data.viewid);
    }
    Is_mstjobstatuses_Visible() {
        if (this.ShowTableslist == null || this.ShowTableslist.length == 0 || this.ShowTableslist.indexOf(this.mstjobstatuses_ID) >= 0) {
            return "tbl smart-table-container";
        }
        else {
            return "hide";
        }
    }
};
mstcorporatemasterComponent.ctorParameters = () => [
    { type: _angular_common__WEBPACK_IMPORTED_MODULE_20__.Location },
    { type: _ngx_translate_core__WEBPACK_IMPORTED_MODULE_21__.TranslateService },
    { type: ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_22__.KeyboardShortcutsService },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_23__.Router },
    { type: _n_tire_biz_app_src_app_pages_core_services_theme_service__WEBPACK_IMPORTED_MODULE_14__.ThemeService },
    { type: _ng_bootstrap_ng_bootstrap__WEBPACK_IMPORTED_MODULE_24__.NgbDateParserFormatter },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_25__.DynamicDialogRef },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_25__.DynamicDialogConfig },
    { type: primeng_dynamicDialog__WEBPACK_IMPORTED_MODULE_25__.DialogService },
    { type: _service_mstcorporatemaster_service__WEBPACK_IMPORTED_MODULE_2__.mstcorporatemasterService },
    { type: _service_mstcorporatelocation_service__WEBPACK_IMPORTED_MODULE_7__.mstcorporatelocationService },
    { type: _service_mstjobrequirement_service__WEBPACK_IMPORTED_MODULE_9__.mstjobrequirementService },
    { type: _service_mstjobstatus_service__WEBPACK_IMPORTED_MODULE_11__.mstjobstatusService },
    { type: _angular_forms__WEBPACK_IMPORTED_MODULE_26__.FormBuilder },
    { type: _n_tire_biz_app_src_app_service_shared_service__WEBPACK_IMPORTED_MODULE_12__.SharedService },
    { type: _n_tire_biz_app_src_app_pages_core_services_session_service__WEBPACK_IMPORTED_MODULE_13__.SessionService },
    { type: _n_tire_biz_app_src_app_pages_core_services_toast_service__WEBPACK_IMPORTED_MODULE_3__.ToastService },
    { type: _angular_platform_browser__WEBPACK_IMPORTED_MODULE_27__.DomSanitizer },
    { type: _angular_router__WEBPACK_IMPORTED_MODULE_23__.ActivatedRoute },
    { type: ngx_spinner__WEBPACK_IMPORTED_MODULE_28__.NgxSpinnerService }
];
mstcorporatemasterComponent.propDecorators = {
    tbl_mstcorporatelocations: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['tbl_mstcorporatelocations', { static: false },] }],
    tbl_mstjobrequirements: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['tbl_mstjobrequirements', { static: false },] }],
    tbl_mstjobstatuses: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['tbl_mstjobstatuses', { static: false },] }],
    kycupload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_16__.ViewChild, args: ['kycupload', { static: false },] }]
};
mstcorporatemasterComponent = (0,tslib__WEBPACK_IMPORTED_MODULE_18__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_16__.Component)({
        selector: 'app-mstcorporatemaster',
        template: _E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_direct_resource_js_mstcorporatemaster_component_html__WEBPACK_IMPORTED_MODULE_0__.default,
        providers: [ng_keyboard_shortcuts__WEBPACK_IMPORTED_MODULE_22__.KeyboardShortcutsService, _corporate_component__WEBPACK_IMPORTED_MODULE_4__.CorporateDashboardComponent],
        styles: [E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstcorporatemaster_mstcorporatemaster_component_ts_css_E_FinalMSTGit_MyskillsTree_Web_node_modules_ngtools_webpack_src_loaders_inline_resource_js_data_CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5tc3RfY29yX2J0bnsKICAgICAgICAgIHBhZGRpbmc6IDRweCA2cHggIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3X2J0bnsKICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3c3VibWl0ewogICAgICAgICAgbWFyZ2luLXRvcDogNHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgfQogICAg_E_FinalMSTGit_MyskillsTree_Web_projects_n_tire_biz_app_src_app_pages_forms_mstcorporatemaster_mstcorporatemaster_component_ts__WEBPACK_IMPORTED_MODULE_1__]
    })
], mstcorporatemasterComponent);



/***/ }),

/***/ 81450:
/*!*****************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatemaster/mstcorporatemaster.module.ts ***!
  \*****************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "mstcorporatemasterModule": () => (/* binding */ mstcorporatemasterModule)
/* harmony export */ });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! tslib */ 3786);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/core */ 2316);
/* harmony import */ var _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/appcommon.module */ 60521);
/* harmony import */ var _n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/forms/boreportviewer/boreportviewer.module */ 26528);
/* harmony import */ var _mstcorporatemaster_routing__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./mstcorporatemaster.routing */ 48875);
/* harmony import */ var _mstcorporatemaster_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./mstcorporatemaster.component */ 48444);
/* harmony import */ var _mstcorporatelocation_mstcorporatelocation_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ../mstcorporatelocation/mstcorporatelocation.component */ 79116);
/* harmony import */ var _mstjobrequirement_mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ../mstjobrequirement/mstjobrequirement.component */ 99457);
/* harmony import */ var _mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../mstjobstatus/mstjobstatus.component */ 83793);









let mstcorporatemasterModule = class mstcorporatemasterModule {
};
mstcorporatemasterModule = (0,tslib__WEBPACK_IMPORTED_MODULE_7__.__decorate)([
    (0,_angular_core__WEBPACK_IMPORTED_MODULE_8__.NgModule)({
        exports: [
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        imports: [_n_tire_biz_app_src_app_pages_forms_boreportviewer_boreportviewer_module__WEBPACK_IMPORTED_MODULE_1__.boreportviewerModule,
            _mstcorporatemaster_routing__WEBPACK_IMPORTED_MODULE_2__.routing,
            _n_tire_biz_app_src_app_appcommon_module__WEBPACK_IMPORTED_MODULE_0__.NgCommonModule
        ],
        schemas: [_angular_core__WEBPACK_IMPORTED_MODULE_8__.CUSTOM_ELEMENTS_SCHEMA],
        declarations: [_mstcorporatemaster_component__WEBPACK_IMPORTED_MODULE_3__.mstcorporatemasterComponent, _mstjobrequirement_mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_5__.mstjobrequirementComponent, _mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_6__.mstjobstatusComponent, _mstcorporatelocation_mstcorporatelocation_component__WEBPACK_IMPORTED_MODULE_4__.mstcorporatelocationComponent],
        entryComponents: [_mstjobrequirement_mstjobrequirement_component__WEBPACK_IMPORTED_MODULE_5__.mstjobrequirementComponent, _mstjobstatus_mstjobstatus_component__WEBPACK_IMPORTED_MODULE_6__.mstjobstatusComponent, _mstcorporatelocation_mstcorporatelocation_component__WEBPACK_IMPORTED_MODULE_4__.mstcorporatelocationComponent]
    })
], mstcorporatemasterModule);



/***/ }),

/***/ 48875:
/*!******************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatemaster/mstcorporatemaster.routing.ts ***!
  \******************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "routing": () => (/* binding */ routing)
/* harmony export */ });
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ 71258);
/* harmony import */ var _mstcorporatemaster_component__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./mstcorporatemaster.component */ 48444);
/* harmony import */ var _n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../../../../../../n-tire-biz-app/src/app/pages/common/unsaved-changes */ 73184);



const routes = [
    {
        path: 'mstcorporatemasters', children: [
            { path: '', component: _mstcorporatemaster_component__WEBPACK_IMPORTED_MODULE_0__.mstcorporatemasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id', component: _mstcorporatemaster_component__WEBPACK_IMPORTED_MODULE_0__.mstcorporatemasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'edit/:id/source/:sourcekey/:sourceid', component: _mstcorporatemaster_component__WEBPACK_IMPORTED_MODULE_0__.mstcorporatemasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'formtemplate/:templateid', component: _mstcorporatemaster_component__WEBPACK_IMPORTED_MODULE_0__.mstcorporatemasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
            { path: 'usersource/:usersource', component: _mstcorporatemaster_component__WEBPACK_IMPORTED_MODULE_0__.mstcorporatemasterComponent, canDeactivate: [_n_tire_biz_app_src_app_pages_common_unsaved_changes__WEBPACK_IMPORTED_MODULE_1__.CanDeactivateGuard] },
        ]
    }
];
const routing = _angular_router__WEBPACK_IMPORTED_MODULE_2__.RouterModule.forChild(routes);


/***/ }),

/***/ 68406:
/*!*************************************************************************************************************************************************************************!*\
  !*** ./node_modules/@ngtools/webpack/src/loaders/direct-resource.js!./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatemaster/mstcorporatemaster.component.html ***!
  \*************************************************************************************************************************************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = ("<i class=\"fa fa-step-backward\" *ngIf=\"sourceKey\" (click)=\"nav.back()\"></i>\r\n<ngx-spinner></ngx-spinner>\r\n<form [formGroup]=\"mstcorporatemaster_Form\" (ngSubmit)=\"onSubmit()\" [ngClass]=\"theme\">\r\n  <div class=\"row second\"\r\n  [ngClass]=\"{'report-admin-bgColor': this.userrole=='Admin','report-applicant-bgColor':this.userrole=='Applicant','report-coporate-bgColor':this.userrole=='Corporate'}\">\r\n    <div class=\"col-4\" style=\"display: flex;justify-content: initial;align-items: center;\">\r\n    <h1 class=\"   mainheader left \" style=\"margin: 0px; color: gray !important;\">\r\n      <a href='#/home/{{p_currenturl}}' style=\"margin: auto;\">{{'Corporate Masters' | translate}}</a>\r\n    </h1>\r\n  </div>\r\n  <div class=\"col-4\"></div>\r\n  <div class='col-4  sticky1 second' style=\"display: flex;justify-content: end;align-items: center;\" role='toolbar' aria-label='Toolbar with button groups'>\r\n      <!--btn-toolbar-->\r\n      <!-- <div class='col'></div> -->\r\n      <div class='dropdown d-inline-block btn-dropdown show'>\r\n\r\n        <ul class='nav nav-pills  input-group '>\r\n          <li><a class='alert-info' [routerLink]='' *ngIf='showview' (click)=\"edit_mstcorporatemasters()\"><i\r\n                class=\"nb-edit\"></i>Edit</a></li>\r\n          <li class='nav-item actionheader col' *ngIf='maindata==null || maindata==undefined'>\r\n            <a [routerLink]='' (click)='first()'><i class='fa fa-fast-backward'\r\n                aria-hidden='true'></i></a>&nbsp;&nbsp;&nbsp;&nbsp;<a [routerLink]='' (click)='prev()'><i\r\n                class='fa fa-step-backward' aria-hidden='true'></i></a>&nbsp;&nbsp;\r\n            <app-popupselect [options]='pkList' [optionsEvent]='pkoptionsEvent' [form]='pkform'\r\n              (selectItem)='onSelectedpk($event)' [reportid]=31 [menuid]=31 formControlName='pk' id='pk' desc=''>\r\n            </app-popupselect>\r\n\r\n            <a [routerLink]='' (click)='next()'><i class='fa fa-step-forward' aria-hidden='true'></i></a>&nbsp;&nbsp; <a\r\n              [routerLink]='' (click)='last()'><i class='fa fa-fast-forward' aria-hidden='true'></i></a>\r\n\r\n          </li>\r\n          <li *ngIf='!showview && (maindata==null || maindata==undefined)' class='nav-item dropdown  actionheader'>\r\n            <ul class=\"nav navbar-nav1\">\r\n              <li *ngIf=' (maindata==null || maindata==undefined)' class=\"dropdown\">\r\n                <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                  aria-expanded='false'> <span class='caret'></span>Actions</a>\r\n                <ul class=\"dropdown-menu\">\r\n                  <li><a class='dropdown-item' *ngIf='ScreenType!=2' [routerLink]='' (click)='resetForm()'><i\r\n                        class='fa fa-plus' aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onSubmit()'><i class='fa fa-save'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Save</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onDelete()'><i class='fa fa-trash'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Delete</a></li>\r\n\r\n                  <li role=\"separator\" class=\"divider\">\r\n                    <hr>\r\n                  </li>\r\n\r\n                  <li><a class='dropdown-item' [routerLink]='' (click)='onCopy()'><i class='fa fa-copy'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Copy</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-clipboard'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Clipboard</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-print'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Print</a></li>\r\n                  <li><a class='dropdown-item' [routerLink]=''><i class='fa fa-envelope'\r\n                        aria-hidden='true'></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n\r\n\r\n                </ul>\r\n              </li>\r\n            </ul>\r\n          </li>\r\n          <ng-container *ngFor=\"let action of mstcorporatemaster_menuactions\">\r\n            <li><a class=\"alert-action\" [routerLink]='' (click)=\"onChangeAction(action.actionid)\"><i class=\"fa fa-new\"\r\n                  aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;{{action.description}}</a></li>\r\n          </ng-container>\r\n\r\n        <!-- </ul>\r\n      </div>\r\n    </div>\r\n    <div class='col-4' style=\"display: flex;justify-content: end;align-items: center;\">\r\n      <button *ngIf=\"!showview\" (click)=\"onSubmitAndWait()\" class=\"popup-add-button mst_cor_btn\">\r\n        <i class=\"fa fa-database\"></i>Submit\r\n        <app-action *ngIf=\"f.jobid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n          [value]=\"f.jobid.value\" [status]=\"f.status.value\"></app-action>\r\n      </button>\r\n      <button *ngIf='data.pkcol==null || maindata.ScreenType==null' (click)=\"onSubmitAndWait()\"\r\n      class=\"popup-add-button mobile_view_btn\">\r\n      <i class=\"fa fa-share-square\"></i> Submit & Clear\r\n        <app-action *ngIf=\"f.corporateid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n        [value]=\"f.corporateid.value\" [status]=\"f.status.value\"></app-action>\r\n      </button>\r\n      <button class=\"popup-add-button mobile_view_btn\"\r\n        *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\"\r\n        (click)=\"onClose()\">\r\n        <i class=\"fa fa-close\"></i>Close\r\n      </button>\r\n      <ul style=\"display: none;\"> -->\r\n\r\n\r\n          <li class='nav-item actionheader' *ngIf=\"!showview\">\r\n            <!-- <a class=\"alert-success  popup-add-button\" [routerLink]=''(click)=\"goBack()\" ><i class=\"fa fa-arrow-left\" aria-hidden=\"true\"></i>\r\n              Back</a> -->\r\n            <a class=\"alert-success  popup-add-button mobile_viewsubmit\" [routerLink]='' (click)=\"onSubmitAndWait()\"><i class=\"fa fa-database\"></i>\r\n              Submit</a>\r\n            <a class=\"alert-primary  popup-add-button mobile_view_btn\" *ngIf='data.pkcol==null || maindata.ScreenType==null' [routerLink]=''\r\n              (click)=\"onSubmit()\"><i class=\"fa fa-share-square\"></i> Submit & Clear</a>\r\n            <app-action *ngIf=\"f.corporateid.value != null\" (afterAction)=\"afterAction($event)\" [menuid]=\"p_menuid\"\r\n              [value]=\"f.corporateid.value\" [status]=\"f.status.value\"></app-action>\r\n          </li>\r\n          <li class='nav-item actionheader'\r\n            *ngIf=\"maindata!=undefined && maindata!=null && (maindata.ScreenType==1 || maindata.ScreenType==2)\">\r\n            <a class=\"alert-danger mobile_view_btn\" [routerLink]='' (click)=\"onClose()\"><i class=\"fa fa-close\"></i> Close</a>\r\n          </li>\r\n\r\n        </ul>\r\n      </div>\r\n    </div>\r\n  </div>\r\n  <div class=\"container\"\r\n    id=\"{{maindata ==undefined || maindata==null || maindata.ScreenType!=2?'contentAreascroll':'contentArea1'}}\">\r\n    <div class=\"w-5\" *ngIf=\"showFormType=='1'\" style=\"margin-top:10px!important\">\r\n      <div (click)=\"PrevForm()\"><i title=\"Form\" class=\"fa fa-file\"></i></div>\r\n    </div>\r\n    <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n    </div>\r\n    <ngb-tabset class=\"tabset1\" [destroyOnHide]=\"false\">\r\n      <div *ngIf=\"(viewHtml != '' && showview)\" [innerHTML]='getHtml(viewHtml)'>\r\n\r\n      </div>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(true)\">Master</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('companyname') == -1) && (companynamevisible==undefined || companynamevisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"companyname\" class=\"control-label\">Company Name</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.companyname?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"companyname\" formControlName=\"companyname\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('tlnumber') == -1) && (tlnumbervisible==undefined || tlnumbervisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"tlnumber\" class=\"control-label\">T L Number</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.tlnumber?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"tlnumber\" formControlName=\"tlnumber\" class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('taxregistrationnumber') == -1) && (taxregistrationnumbervisible==undefined || taxregistrationnumbervisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"taxregistrationnumber\" class=\"control-label\">Tax Registration Number</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.taxregistrationnumber?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"taxregistrationnumber\" type=\"number\" formControlName=\"taxregistrationnumber\"\r\n                  class=\"form-control\">\r\n              </div>\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('licensevalidto') == -1) && (licensevalidtovisible==undefined || licensevalidtovisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"licensevalidto\" class=\"control-label\">License Valid To</label>\r\n                <label *ngIf=\"showview\"\r\n                  class=\"labelview\">{{ngbDateParserFormatter.format(f.licensevalidto?.value)}}</label>\r\n                <div class=\"input-group\" *ngIf=\"!showview\">\r\n                  <input #licensevalidtoformpicker=\"ngbDatepicker\" [minDate]='{year: 1950, month:1, day: 1}'\r\n                    [maxDate]='{year: 2050, month:12, day: 31}' ngbDatepicker name=\"licensevalidtoformpicker\"\r\n                    id=\"licensevalidto\" formControlName=\"licensevalidto\" class=\"form-control\">\r\n                  <button class=\"input-group-addon\" *ngIf=\"!showview\" (click)=\"licensevalidtoformpicker.toggle()\"\r\n                    type=\"button\"><i class=\"fa fa-calendar\" aria-hidden=\"true\"></i></button>\r\n                </div>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div\r\n                *ngIf=\"((hidelist.indexOf('kycupload') == -1) && (kycuploadvisible==undefined || kycuploadvisible==true))\"\r\n                style='width:1500px' class=\"col-12 \">\r\n                <label for=\"kycupload\" class=\"control-label\">K Y C Upload</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.kycupload?.value[0]?.name}}</label>\r\n                <app-attachment #kycupload formControlName=\"kycupload\" [showremove]='bmyrecord'\r\n                  [SessionData]=\"sessionData\"></app-attachment>\r\n                <button type=\"button\" class=\"btn\" *ngIf=\"kycupload.getAttachmentList().length > 0\"\r\n                  (click)=\"getkycupload()\" style=\"    margin-left: 5px !important;\r\n                  margin-top: 18px !important;\">Open File</button>\r\n              </div>\r\n            </div>\r\n            <div *ngIf=\"(viewHtml == '' || !showview)\" class=\"form-group row\">\r\n              <div *ngIf=\"((hidelist.indexOf('userid') == -1) && (useridvisible==undefined || useridvisible==true))\"\r\n                style='' class=\"col-3 education_view_mobile\">\r\n                <label for=\"userid\" class=\"control-label\">User</label>\r\n                <label *ngIf=\"showview\" class=\"labelview\">{{f.userid?.value}}</label>\r\n                <input *ngIf=\"!showview\" id=\"userid\" formControlName=\"userid\" class=\"form-control\">\r\n              </div>\r\n            </div>\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Corporate Locations</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstcorporatelocations-->\r\n            <div [ngClass]=\"Is_mstcorporatelocations_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Corporate Locations' | translate}}\r\n                <select class='child' id=\"mstcorporatelocationsPagingdropdown\"\r\n                  (change)=\"mstcorporatelocations_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstcorporatelocationtoggleOption();mstcorporatelocations_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showmstcorporatelocationsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstcorporatelocations_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstcorporatelocations\r\n                (userRowSelect)=\"handle_mstcorporatelocations_GridSelected($event)\"\r\n                [settings]=\"mstcorporatelocations_settings\" (custom)=\"onCustom_mstcorporatelocations_Action($event)\"\r\n                [source]=\"tbl_mstcorporatelocations?.source?.data\"\r\n                (delete)=\"mstcorporatelocations_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstcorporatelocations_route($event,'delete')\"\r\n                (create)=\"mstcorporatelocations_route($event,'create')\"\r\n                (createConfirm)=\"mstcorporatelocations_beforesave($event)\"\r\n                (edit)=\"mstcorporatelocations_route($event,'edit')\"\r\n                (editConfirm)=\"mstcorporatelocations_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstcorporatelocations-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Job Requirements</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstjobrequirements-->\r\n            <div [ngClass]=\"Is_mstjobrequirements_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Job Requirements' | translate}}\r\n                <select class='child' id=\"mstjobrequirementsPagingdropdown\"\r\n                  (change)=\"mstjobrequirements_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstjobrequirementtoggleOption();mstjobrequirements_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showmstjobrequirementsFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <a class=\"rightside\" [routerLink]='' (click)=\"mstjobrequirements_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a>\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstjobrequirements (userRowSelect)=\"handle_mstjobrequirements_GridSelected($event)\"\r\n                [settings]=\"mstjobrequirements_settings\" (custom)=\"onCustom_mstjobrequirements_Action($event)\"\r\n                [source]=\"tbl_mstjobrequirements?.source?.data\" (delete)=\"mstjobrequirements_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstjobrequirements_route($event,'delete')\"\r\n                (create)=\"mstjobrequirements_route($event,'create')\"\r\n                (createConfirm)=\"mstjobrequirements_beforesave($event)\" (edit)=\"mstjobrequirements_route($event,'edit')\"\r\n                (editConfirm)=\"mstjobrequirements_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstjobrequirements-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n      <ngb-tab>\r\n        <ng-template ngbTabTitle>\r\n          <div (click)=\"ToolBar(false)\">Job Statuses</div>\r\n        </ng-template>\r\n        <ng-template ngbTabContent>\r\n          <p-accordion [multiple]='true'>\r\n            <!-- child table mstjobstatuses-->\r\n            <div [ngClass]=\"Is_mstjobstatuses_Visible()\">\r\n              <!--End-->\r\n              <h4 class=\"form-group sticky1  columns left\">{{'Job Statuses' | translate}}\r\n                <select class='child' id=\"mstjobstatusesPagingdropdown\"\r\n                  (change)=\"mstjobstatuses_Paging($event.target.value)\" [value]='20'>\r\n                  <option value='20'>20</option>\r\n                  <option value='50'>50</option>\r\n                  <option value='100'>100</option>\r\n                </select>\r\n                <ul class=\"nav navbar-nav1\" style='display:none'>\r\n                  <li class=\"dropdown\">\r\n                    <a [routerLink]='' class='dropdown-toggle' data-toggle='dropdown' role='button' aria-haspopup='true'\r\n                      aria-expanded='false'> <span class='caret'></span></a>\r\n                    <ul class=\"dropdown-menu\">\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''\r\n                          (click)=\"mstjobstatustoggleOption();mstjobstatuses_route(null, 'create')\"><i\r\n                            class=\"fa fa-plus\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;New</a></li>\r\n                      <li role=\"separator\" class=\"divider\">\r\n                        <hr>\r\n                      </li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]='' (click)=\"showmstjobstatusesFilter()\"><i\r\n                            class=\"fa fa-filter\" aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Filter</a></li>\r\n                      <li><a class=\"dropdown-item\" [routerLink]=''><i class=\"fa fa-envelope\"\r\n                            aria-hidden=\"true\"></i>&nbsp;&nbsp;&nbsp;Mail</a></li>\r\n                    </ul>\r\n                  </li>\r\n                </ul>\r\n                <!-- <a class=\"rightside\" [routerLink]='' (click)=\"mstjobstatuses_route(null, 'create')\"><i\r\n                    class=\"fa fa-plus\"></i></a> -->\r\n              </h4>\r\n              <ng2-smart-table #tbl_mstjobstatuses (userRowSelect)=\"handle_mstjobstatuses_GridSelected($event)\"\r\n                [settings]=\"mstjobstatuses_settings\" (custom)=\"onCustom_mstjobstatuses_Action($event)\"\r\n                [source]=\"tbl_mstjobstatuses?.source?.data\" (delete)=\"mstjobstatuses_route($event,'delete')\"\r\n                (deleteConfirm)=\"mstjobstatuses_route($event,'delete')\" (create)=\"mstjobstatuses_route($event,'create')\"\r\n                (createConfirm)=\"mstjobstatuses_beforesave($event)\" (edit)=\"mstjobstatuses_route($event,'edit')\"\r\n                (editConfirm)=\"mstjobstatuses_beforesave($event)\">\r\n              </ng2-smart-table>\r\n            </div>\r\n            <!--End of child table mstjobstatuses-->\r\n          </p-accordion>\r\n        </ng-template>\r\n      </ngb-tab>\r\n    </ngb-tabset>\r\n  </div>\r\n</form>\r\n");

/***/ }),

/***/ 67813:
/*!****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatemaster/mstcorporatemaster.component.ts.css!=!./node_modules/@ngtools/webpack/src/loaders/inline-resource.js?data=CiAgICBAbWVkaWEgb25seSBzY3JlZW4gYW5kIChtYXgtd2lkdGg6IDYwMHB4KSB7CiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7CiAgICAgICAgICBtaW4td2lkdGg6IDEwMCUgIWltcG9ydGFudDsKICAgICAgICAgIG1hcmdpbjogMHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgICAgIC5tc3RfY29yX2J0bnsKICAgICAgICAgIHBhZGRpbmc6IDRweCA2cHggIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3X2J0bnsKICAgICAgICAgIGRpc3BsYXk6IG5vbmUgIWltcG9ydGFudDsKICAgICAgICB9CiAgICAgICAgLm1vYmlsZV92aWV3c3VibWl0ewogICAgICAgICAgbWFyZ2luLXRvcDogNHB4ICFpbXBvcnRhbnQ7CiAgICAgICAgfQogICAgfQogICAg!./projects/n-tire-biz-app/src/app/pages/forms/mstcorporatemaster/mstcorporatemaster.component.ts ***!
  \****************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************************/
/***/ ((module) => {

module.exports = "\n    @media only screen and (max-width: 600px) {\n      .education_view_mobile{\n          min-width: 100% !important;\n          margin: 0px !important;\n        }\n        .mst_cor_btn{\n          padding: 4px 6px !important;\n        }\n        .mobile_view_btn{\n          display: none !important;\n        }\n        .mobile_viewsubmit{\n          margin-top: 4px !important;\n        }\n    }\n    \n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1zdGNvcnBvcmF0ZW1hc3Rlci5jb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtJQUNJO01BQ0U7VUFDSSwwQkFBMEI7VUFDMUIsc0JBQXNCO1FBQ3hCO1FBQ0E7VUFDRSwyQkFBMkI7UUFDN0I7UUFDQTtVQUNFLHdCQUF3QjtRQUMxQjtRQUNBO1VBQ0UsMEJBQTBCO1FBQzVCO0lBQ0oiLCJmaWxlIjoibXN0Y29ycG9yYXRlbWFzdGVyLmNvbXBvbmVudC50cyIsInNvdXJjZXNDb250ZW50IjpbIlxuICAgIEBtZWRpYSBvbmx5IHNjcmVlbiBhbmQgKG1heC13aWR0aDogNjAwcHgpIHtcbiAgICAgIC5lZHVjYXRpb25fdmlld19tb2JpbGV7XG4gICAgICAgICAgbWluLXdpZHRoOiAxMDAlICFpbXBvcnRhbnQ7XG4gICAgICAgICAgbWFyZ2luOiAwcHggIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgICAgICAubXN0X2Nvcl9idG57XG4gICAgICAgICAgcGFkZGluZzogNHB4IDZweCAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgICAgIC5tb2JpbGVfdmlld19idG57XG4gICAgICAgICAgZGlzcGxheTogbm9uZSAhaW1wb3J0YW50O1xuICAgICAgICB9XG4gICAgICAgIC5tb2JpbGVfdmlld3N1Ym1pdHtcbiAgICAgICAgICBtYXJnaW4tdG9wOiA0cHggIWltcG9ydGFudDtcbiAgICAgICAgfVxuICAgIH1cbiAgICAiXX0= */";

/***/ })

}]);
//# sourceMappingURL=projects_n-tire-biz-app_src_app_pages_forms_mstcorporatemaster_mstcorporatemaster_module_ts.js.map